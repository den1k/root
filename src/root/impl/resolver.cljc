(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [clojure.spec.alpha :as s])
  #?(:clj (:import clojure.lang.Cons)))

(defn resolve-content
  ([root content-k content] (resolve-content root content-k content identity))
  ([{:as root :keys [resolve-spec]} content-k content f]
   (let [[type refs*] (u/conform! resolve-spec content)]
     (case type
       (:entity :ref)
       (with-meta (f {:content-k content-k
                      :id-or-ent refs*}) {::type :entity})

       (:entities :refs)
       (with-meta (into [:<>]
                        (map-indexed
                         (fn [k ref]
                           (f {:k         k
                               :content-k content-k
                               :id-or-ent ref})))
                        refs*)
                  {::type :entities})

       (:entities-map :refs-map)
       (with-meta
        (reduce-kv
         (fn [out k v]
           (assoc out k
                      (resolve-content
                       root
                       content-k              ;; maybe wrong
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
  ([{:as root :keys [child-keys child-key->view-key]} ent f]
   (reduce
    (fn [out chk]
      (if-let [ch (not-empty (chk ent))]
        (assoc out (child-key->view-key chk) (resolve-content root chk ch f))
        out))
    ent
    child-keys)))

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
  [{:as root :keys [transact entity-actions add-id ent->ref]}
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
                ent (conj (cond-> ent (nil? (ent->ref ent)) add-id))
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
  ([{:as root :keys [lookup-sub]} {:keys [root-id parent-id path]}]
   ;#?(:cljs (js/console.log :resolving :root-id root-id :parent-id parent-id :path path))
   (as-> root-id x
         (lookup-sub x)
         (with-meta x {:root root})
         #_((fn [x] #?(:cljs (js/console.log :resolve x)) x))
         (cond-> x parent-id (assoc :parent-id parent-id))
         (cond-> x path (assoc :path path))
         (wrap-actions-and-handlers root x)
         (resolve-child-views
          root
          x
          (fn [{:keys [k id-or-ent]}]
            [resolved-view
             root
             (cond-> {:root-id   id-or-ent
                      :parent-id root-id}
               root-id (assoc :path
                              (into [root-id :content]
                                    (u/ensure-vec k))))]))
         (root x))))

(defn nested-resolved-view
  ([{:as root :keys [root-path]}] (nested-resolved-view root {:path root-path}))
  ([{:as root :keys [lookup-sub]} {:keys [entity path]}]
   ;#?(:cljs (js/console.log :resolving :path path))
   (as-> (or entity path) x
         (lookup-sub x)
         (with-meta x {:root root})
         ;(do #?(:cljs (js/console.log :resolvenest x)) x)
         (cond-> x path (assoc :path path))
         ; todo (wrap-actions-and-handlers root x)
         (resolve-child-views
          root
          x
          (fn [{:keys [id-or-ent k content-k]}]
            [nested-resolved-view
             root
             {:entity id-or-ent
              :path   (into (u/ensure-vec path) (remove nil?) [content-k k])}]))
         (root x))))
