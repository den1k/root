(ns root.impl.resolver
  (:require [root.impl.util :as u]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s])
  #?(:clj (:import clojure.lang.Cons)))

(defn- get-keys-spec [spec]
  (let [cons-sym #?(:clj Cons
                    :cljs cljs.core/Cons)
        exprs            (tree-seq #(identical? cons-sym (type %))
                                   identity
                                   (s/form spec))]
    (u/seek #(and (seq? %) (= `s/keys (first %))) exprs)))

(defn filter-spec-keys-from-keys-spec [spec keys-spec]
  (let [[_ & spec-def] (get-keys-spec keys-spec)
        spec-form (s/form spec)]
    (->> (apply hash-map spec-def)
         (reduce-kv
          (fn [out k v]
            (if-let [ent-specs (not-empty (filterv #(= spec-form (s/form %)) v))]
              (into out (case k
                          (:req :opt) ent-specs
                          (:req-un :opt-un) (mapv (comp keyword name) ent-specs)))
              out))
          []))))

;; user to provide ::id ::ref and ::entity specs
;; ::id and ::refs will be used for normalized resolve
;; ::entity for nested resolve


(comment
 (filter-spec-keys-from-keys-spec ::ent/refs ::ent/entity)
 )

(defn resolve-content
  ([root content] (resolve-content root content identity))
  ([{:as root :keys [resolve-spec]} content f]
   ;; todo root.impl.entity does default to the :id key
   ;; enable setting a key on root or to provide a spec for ::id
   (let [[type refs*] (u/conform! resolve-spec content)]
     (case type
       (:entity :ref)
       (with-meta (f {:id-or-ent refs*}) {::type :entity})

       (:entities :refs)
       (with-meta (into [:<>]
                        (map-indexed
                         (fn [k ref]
                           (f {:k         k
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
                       v
                       (comp
                        f
                        (fn [{:as x next-key :k}]
                          (assoc x :k (if next-key
                                        [k next-key]
                                        k)))))))
         {}
         content)
        {::type :entity-map})))))

(defn resolve-child-views
  ([root ent] (resolve-child-views root ent identity))
  ([{:as root :keys [child-keys child-key->view-key]} ent f]
   (reduce
    (fn [out chk]
      (if-let [ch (chk ent)]
        (assoc out (child-key->view-key chk) (resolve-content root ch f))
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

(defn nested-resolve-child-views
  ([root ent] (nested-resolve-child-views root ent identity))
  ([{:as root :keys [child-keys child-key->view-key]} ent f]
   (reduce
    (fn [out chk]
      (if-let [ch (chk ent)]
        (assoc out (child-key->view-key chk) (resolve-content root ch f))
        out))
    ent
    child-keys)))

(defn nested-resolved-view
  ([{:as root :keys [root-path]}] (nested-resolved-view root {:path root-path}))
  ([{:as root :keys [lookup-sub]} {:keys [entity path]}]
   #?(:cljs (js/console.log :resolving :path path))
   (as-> (or entity path) x
         (lookup-sub x)
         (with-meta x {:root root})
         ;(do #?(:cljs (js/console.log :resolvenest x)) x)
         (cond-> x path (assoc :path path))
         ; todo (wrap-actions-and-handlers root x)
         (nested-resolve-child-views
          root
          x
          (fn [{:keys [id-or-ent k]}]
            [nested-resolved-view
             root
             {:entity id-or-ent :path (conj (u/ensure-vec path) :content k)}]))
         (root x))))
