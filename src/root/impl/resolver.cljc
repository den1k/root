(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [clojure.spec.alpha :as s])
  #?(:clj (:import clojure.lang.Cons)))

(defn- ->resolver-spec [content-spec]
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
   (let [[type refs*] (u/conform! resolve-spec content)]
     (case type
       :content
       (with-meta (f {:content-k content-k
                      :id-or-ent refs*}) {::type :entity})

       :contents
       (with-meta (into contents-hiccup-wrapper
                        (map-indexed
                         (fn [k ref]
                           (f {:k         k
                               :content-k content-k
                               :id-or-ent ref})))
                        refs*)
                  {::type :entities})

       :content-map
       (with-meta
        (reduce-kv
         (fn [out k v]
           (assoc out k
                      (resolve-content
                       root
                       content-k        ;; maybe wrong
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

(defn resolve-child-views
  ([root ent] (resolve-child-views root ent identity))
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
  [{:as root :keys [transact entity-actions add-id ->ref]}
   {:as orig-ent :keys [type actions handlers parent-id]}]
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
    (let [ent-actions (get entity-actions type)]
      (cond-> orig-ent
        ent-actions (assoc :actions (wrap ent-actions))
        actions (update :actions merge (wrap actions))
        handlers (assoc :handlers (wrap handlers))))))

(defn resolved-view
  ([{:as root :keys [root-id]}] (resolved-view root {:root-id root-id}))
  ([{:as root :keys [lookup-sub]} {:keys [root-id data parent-id path]}]
   ;#?(:cljs (js/console.log :resolving :root-id root-id :parent-id parent-id :path path))
   (as-> (or data (lookup-sub (or root-id path))) x
         (with-meta x {:root root})
         #_((fn [x] #?(:cljs (js/console.log :resolve x)) x))
         (cond-> x parent-id (assoc :parent-id parent-id))
         (cond-> x path (assoc :path path))
         (cond->> x
           root-id (wrap-actions-and-handlers root)) ; todo wrap-actions for nested
         (resolve-child-views
          root
          x
          (fn [{:keys [k id-or-ent content-k]}]
            [resolved-view
             root
             (if-not (coll? id-or-ent)
                 ; graph
                 {:root-id   id-or-ent
                  :parent-id root-id
                  :path      (into [root-id content-k] (u/ensure-vec k))}
                 ; nested
                 {:data id-or-ent
                  :path (into (u/ensure-vec path) (remove nil?) [content-k k])})]))
         (root x))))
