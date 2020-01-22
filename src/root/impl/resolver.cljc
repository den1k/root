(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(defn resolve-content
  ([content] (resolve-content content identity))
  ([content f]
   ;; todo root.impl.entity does default to the :id key
   ;; enable setting a key on root or to provide a spec for ::id
   (let [[type refs*] (u/conform! ::ent/content content)]
     (case type
       :ref (with-meta (f {:id refs*}) {::type :entity})
       :refs (with-meta (into [:<>]
                              (map-indexed
                               (fn [k ref]
                                 (f {:ent-path k
                                     :id       ref})))
                              refs*)
                        {::type :entities})
       :refs-map (with-meta
                  (reduce-kv
                   (fn [out k v]
                     (assoc out k
                                (resolve-content
                                 v
                                 (comp
                                  f
                                  (fn [{:as x next-key :ent-path}]
                                    (assoc x :ent-path (if next-key
                                                         [k next-key]
                                                         k)))))))
                   {}
                   content)
                  {::type :entity-map})))))

(defn resolve-child-views
  ([ent] (resolve-child-views ent identity))
  ([{:as ent :keys [content]} f]
   (cond-> ent content (assoc :views (resolve-content content f)))))

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
  [{:as orig-ent :keys [type actions handlers parent-id]}
   {:as root :keys [transact entity-actions add-id ent->ref]}]
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
   (-> root-id
       lookup-sub
       (with-meta {:root root})
       ;((fn [x] #?(:cljs (js/console.log :resolve x)) x))
       (cond-> parent-id (assoc :parent-id parent-id))
       (cond-> path (assoc :path path))
       (wrap-actions-and-handlers root)
       (resolve-child-views
        (fn [{:keys [ent-path id]}]
          [resolved-view
           root
           (cond->
            {:root-id   id
             :parent-id root-id}
             root-id (assoc :path
                            (into [root-id :content]
                                  (u/ensure-vec ent-path))))]))
       root)))

