(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [cljs.spec.alpha :as s]
            [medley.core :as md]))

(defn resolve-content
  ([content] (resolve-content content identity))
  ([content f]
   (let [[type refs*] (u/conform! ::ent/content content)]
     (case type
       :ref (with-meta (f {:id refs*}) ::entity)
       :refs (with-meta (vec
                         (map-indexed
                          (fn [k ref]
                            (f {:ent-path k
                                :id       ref}))
                          refs*)) ::entities)
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
                   content) ::entity-map)))))

(defn resolve-child-views
  ([ent] (resolve-child-views ent identity))
  ([{:as ent :keys [content]} f]
   (cond-> ent content (update :content resolve-content f))))

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
   {:as root :keys [transact entity-actions add-id]}]
  (letfn [(resolve-txs [conformed txs-or-txs-path]
            (case (first conformed)
              :partial-txs txs-or-txs-path
              :path (get-in entity-actions txs-or-txs-path)))
          (form-tx [tx]
            (let [{:keys [op path ent]} (u/conform! ::partial-tx tx)]
              (cond-> [op]
                path (conj (replace {:<- parent-id} path))
                ent (conj (cond-> ent (nil? (:id ent)) add-id))
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
                        transact))))
             actions-map))]
    (let [ent-actions (get entity-actions type)]
      (cond-> orig-ent
        ent-actions (assoc :actions (wrap ent-actions))
        actions (update :actions merge (wrap actions))
        handlers (assoc :handlers (wrap handlers))))))

(defn resolved-view
  ([{:as root :keys [root-id]}] (resolved-view root {:root-id root-id}))
  ([{:as root :keys [lookup]} {:keys [root-id parent-id path]}]
   (-> root-id
       lookup
       (cond-> parent-id (assoc :parent-id parent-id))
       (cond-> path (assoc :path path))
       (wrap-actions-and-handlers root)
       (resolve-child-views
        (fn [{:keys [ent-path id]}]
          (resolved-view root
                         (cond->
                          {:root-id   id
                           :parent-id root-id}
                           root-id (assoc :path
                                          (into [root-id :content]
                                                (u/ensure-vec ent-path)))))))
       root)))
