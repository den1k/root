(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [clojure.spec.alpha :as s]
            [uix.core.alpha :as uix])
  #?(:clj (:import clojure.lang.Cons)))

(defn ->resolver-spec [content-spec]
  (let [content-spec    (s/spec content-spec)
        nested-contents (s/coll-of content-spec)
        contents-map    (s/map-of keyword?
                                  (s/or :entity content-spec
                                        :entities nested-contents))]
    (s/spec
     (s/or :content content-spec
           :contents nested-contents
           :content-map contents-map))))

(defn resolve-content
  ([root content-k content] (resolve-content root content-k content identity))
  ([{:as root :keys [resolve-spec contents-hiccup-wrapper]} content-k content f]
   (let [[type] (u/conform! resolve-spec content)]
     (case type
       :content
       (with-meta (f {:content-k content-k
                      :id-or-ent content}) {::type :entity})

       :contents
       (with-meta (into contents-hiccup-wrapper
                        (map-indexed
                         (fn [k ref]
                           (f {:k         k
                               :content-k content-k
                               :id-or-ent ref})))
                        content)
                  {::type :entities})

       :content-map
       (with-meta
        (reduce-kv
         (fn [out k v]
           (assoc out k
                      (resolve-content
                       root
                       content-k
                       v
                       (comp
                        f
                        (fn [{:as x next-key :k}]
                          (assoc x :k (if next-key
                                        [k next-key]
                                        k)
                                   :content-k content-k))))))
         {}
         content)
        {::type :entity-map})))))

(defn resolve-child-content
  ([root ent] (resolve-child-content root ent identity))
  ([{:as root :keys [content-keys content-key->ui-key]} ent f]
   (reduce
    (fn [out chk]
      (let [ch    (chk ent)
            coll? (coll? ch)]
        (if (or (and coll? (not-empty ch)) (and (not coll?) (some? ch)))
          (assoc out (content-key->ui-key chk) (resolve-content root chk ch f))
          out)))
    ent
    content-keys)))

(s/def ::txs-path (s/coll-of keyword?))

(s/def ::op-path
  (s/and #(or (keyword? %) (vector? %))
         (s/conformer
          (fn [x]
            (if (keyword? x)
              [x]
              (and (vector? x) (not-empty x)))))))

(s/def ::partial-tx
  (s/cat :op keyword?
         :path (s/? ::op-path)
         :ent (s/? ::ent/partial-entity)))

(s/def ::partial-txs (s/coll-of ::partial-tx))

(s/def ::partial-txs-or-txs-path
  (s/or :partial-txs ::partial-txs
        :path ::txs-path))

(defn wrap-actions-and-handlers
  [{:as root :keys [dispatch-fn transact entity-actions add-id ->ref]}
   {:as orig-ent :keys [actions handlers parent-id]}]
  (letfn [(resolve-txs [conformed txs-or-txs-path]
            (case (first conformed)
              :partial-txs txs-or-txs-path
              :path (get-in entity-actions txs-or-txs-path)))
          (form-tx [tx]
            (let [{:keys [op path ent]} (u/conform! ::partial-tx tx)]
              (cond-> [op]
                path (conj (replace {:<- parent-id} path))
                (not path) (conj (:path orig-ent))
                ent (conj (cond-> ent (nil? (->ref ent)) add-id))
                (not ent) (conj orig-ent))))
          (form-txs [txs]
            (mapv form-tx txs))
          (wrap [actions-map]
            (md/map-vals
             (fn [txs-or-path]
               (fn []
                 (let [txs-or-path-conformed
                       (u/conform! ::partial-txs-or-txs-path txs-or-path)]
                   (->> txs-or-path
                        (resolve-txs txs-or-path-conformed)
                        form-txs
                        (transact root)))))
             actions-map))]
    (let [dispatch-val (dispatch-fn orig-ent)
          ent-actions  (get entity-actions dispatch-val)]
      (cond-> orig-ent
        ent-actions (assoc :actions (wrap ent-actions))
        actions (update :actions merge (wrap actions))
        handlers (assoc :handlers (wrap handlers))))))

(defn- deref-state-hook [x]
  #?(:clj  x
     :cljs (if (implements? IDeref x)
             (deref x)
             x)))

(defn js-promise? [p]
  (boolean (.-then p)))

(defn- js-promise-hook [{:as x :keys [loading promise]}]
  #?(:clj  x
     :cljs (let [x (or promise x)]
             (if (js-promise? x)
               ;; fixme UIX dep
               (let [st (uix/state loading)]
                 (.then x (fn [x] (reset! st x)))
                 st)
               x))))

(defn resolved-view
  ([root]
   (resolved-view root (select-keys root [:root-id :data])))
  ([{:as root :keys [lookup-sub ->ref]} {:as m :keys [root-id data parent-id path]}]
   ;#?(:cljs (js/console.log :resolving m))
   (when-let [data (some-> (or data (lookup-sub (or root-id path)))
                           js-promise-hook
                           deref-state-hook)]
     (as-> data x
           (with-meta x {:root root})
           (cond-> x parent-id (assoc :parent-id parent-id))
           (cond-> x (or path root-id) (assoc :path (or path [root-id])))
           (cond->> x
             root-id (wrap-actions-and-handlers root)) ; todo wrap-actions for nested
           (resolve-child-content
            root
            x
            (fn [{:as m :keys [k id-or-ent content-k]}]
              [resolved-view
               root
               (if root-id
                 ; graph
                 {:root-id   id-or-ent
                  :parent-id root-id
                  :path      (into [root-id content-k] (u/ensure-vec k))}
                 ; nested
                 {:data id-or-ent
                  :path (into (u/ensure-vec path) (remove nil?) [content-k k])})]))
           (root x)))))

(defn resolved-data
  ([root]
   (resolved-view root (select-keys root [:root-id :data])))
  ([{:as root :keys [lookup ->ref]} {:keys [root-id data parent-id path]}]
   (when-let [data (or data (lookup (or root-id path)))]
     (as-> data x
           (with-meta x {:root root})
           (cond-> x parent-id (assoc :parent-id parent-id))
           (cond-> x path (assoc :path path))
           (resolve-child-content
            root
            x
            (fn [{:keys [k id-or-ent content-k]}]
              (resolved-data
               root
               (if (->ref id-or-ent)
                 ; graph
                 {:root-id   id-or-ent
                  :parent-id root-id
                  :path      (into [root-id content-k] (u/ensure-vec k))}
                 ; nested
                 {:data id-or-ent
                  :path (into (u/ensure-vec path) (remove nil?) [content-k k])}))))))))

(comment

 (def data
   {1 {:type       :user
       :first-name "Eva"
       :last-name  "Luator"
       :content    {:address 2}}
    2 {:type   :address
       :street "1 Long Infinite Loop"}})

 (defn lookup [x]
   (get data x))

 (def root
   (root.impl.core/ui-root
    {:lookup       lookup
     :dispatch-fn  :type
     :content-keys [:content]
     :content-spec integer?}))

 ; To avoid a waterfall of requests and enable faster loads
 ; a request can run `resolved-data` on the backend and the result merged into a
 ; frontend data-store.
 ; On the backend `lookup` can be blocking or async with an async version of
 ; `resolved-data` that allows for multiple simultaneous `lookup`s/requests.
 (resolved-data root {:root-id 1})
 ;=> {:type       :user,
 ;    :first-name "Eva",
 ;    :last-name  "Luator",
 ;    :content    {:address 2},
 ;    :content-ui {:address {:type      :address,
 ;                           :street    "1 Long Infinite Loop",
 ;                           :parent-id 1,
 ;                           :path      [1 :content :address]}}}

 ; For the UI, render root as usual
 [root :resolve {:root-id 1}]
 ; or
 [resolved-view root {:root-id 1}])
