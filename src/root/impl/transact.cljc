(ns root.impl.transact
  (:require [xframe.core.alpha :as xf]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [clojure.set :as set]
            [root.impl.util :as u]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(def ^:dynamic *root*)

(defonce id-gen (u/make-id-gen 1000))
(defn add-id [x] (assoc x :id (id-gen)))

(def state xf/db)

(defonce history-log (atom {:idx nil :log []}))

(defn op-dispatch [[op _]] op)

(declare transact vec-plop vec-pluck)

(defmulti inverted-op op-dispatch)

(defmethod inverted-op :add
  [[_ id-or-path ent]]
  [:remove id-or-path ent])

(defmethod inverted-op :add-after
  [[_ id-or-path ent]]
  [:remove-after id-or-path ent])

(defmethod inverted-op :remove-after
  [[_ id-or-path ent]]
  [:add-after id-or-path ent])

(defmethod inverted-op :remove
  [[_ id-or-path ent]]
  [:add id-or-path ent])

(defmethod inverted-op :set
  [[_ {:as ent :keys [id]}]]
  [:set ((-> ent meta :root) :lookup id)])

(defmethod inverted-op :toggle [tx] tx)

(defn- inverted-txs [txs]
  (let [methods (methods inverted-op)
        ops     (into #{} (map op-dispatch) txs)
        txs     (if (= ops (set/intersection methods ops))
                  txs
                  (let [diff (set/difference ops methods)]
                    #?(:cljs (js/console.warn "Missing inverted-ops for:" diff))
                    (remove (fn [tx] (contains? diff (op-dispatch tx))) txs)))]
    (some->> txs (mapv inverted-op) not-empty)))

(defn log-txs [txs]
  (let [[[op]] txs]
    (case op
      (:undo :redo) nil
      (let [{:keys [log]} @history-log]
        (when-let [inv-txs (inverted-txs txs)]
          (swap! history-log assoc
                 :log (conj log inv-txs)
                 :redo-log []))))))

(declare transact)

(defn- shift-history [root from-key to-key]
  (let [{from from-key to to-key} @history-log]
    (when-let [txs (peek from)]
      (swap! history-log assoc
             from-key (pop from)
             to-key (conj to (mapv inverted-op txs)))
      (transact root txs {:history? false}))))

(defn undo [root]
  (shift-history root :log :redo-log))

(defn redo [root]
  (shift-history root :redo-log :log))

(comment
  (undo)
  (redo)
  )

(defmulti run-tx (fn [_root tx] (:op tx)))

(defn- add [st path [ref ent :as ref+ent]]
  (-> st
      (update-in path
                 (fn [x]
                   (cond
                     (vector? x) (conj x ref)
                     :else ref)))
      (conj ref+ent)))

(defmethod run-tx :add
  [{:as root :keys [->ref+x]} {:as tx :keys [path ent]}]
  (let [ref+ent (->ref+x ent)]
    (swap! state add path ref+ent)))

(defmethod run-tx :add-many                                 ; todo remove-many
  [{:as root :keys [->ref+x]} {:as tx :keys [path ents]}]
  (let [refs+xs (mapv ->ref+x ents)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in path
                            (fn [x]
                              (->> refs+xs
                                   (into (or x []) (map first))
                                   ;; or how about an ordered-set for cljs?
                                   not-empty distinct vec)))
                 (into refs+xs))))))



(defmethod run-tx :set-many
  [{:as root :keys [->ref+x]} {:as tx :keys [path ents]}]
  (let [refs+xs (mapv ->ref+x ents)]
    (swap! state
           (fn [st]
             (-> st
                 (assoc-in path (into [] (map first) refs+xs))
                 (into refs+xs))))))

(defmethod run-tx :assoc
  [{:as root :keys [->ref]} {:as tx :keys [ent path val]}]
  (swap! state
         (fn [st]
           (-> st
               (assoc (first path) val)))))

(defmethod run-tx :assoc-in
  [{:as root} {:as tx :keys [path val]}]
  (swap! state
         (fn [st]
           (-> st
               (assoc-in path val)))))

(defmethod run-tx :dissoc
  [{:as root} {:as tx :keys [path]}]
  (swap! state
         (fn [st]
           (-> st
               (dissoc (first path))))))

(defmethod run-tx :dissoc-in
  [{:as root} {:as tx :keys [path val]}]
  (swap! state
         (fn [st]
           (-> st
               (md/dissoc-in path)))))

(defmethod run-tx :update
  [{:as root} {:as tx :keys [path val args]}]
  (swap! state
         (fn [st]
           (-> st
               (update (first path) val args)))))

(defmethod run-tx :into
  [{:as root} {:as tx :keys [ent]}]
  (swap! state into ent))

(defn vec-plop [seq idx item]
  (vec (concat (take idx seq) [item] (drop idx seq))))

(defn vec-pluck [seq & idxs]
  (if-not idxs
    seq
    (let [idxs (set idxs)]
      (into (empty seq)
            (comp
              (map-indexed vector)
              (keep (fn [[idx i]]
                      (when (not (contains? idxs idx)) i))))
            seq))))

(defmethod run-tx :add-after
  [{:as root :keys [->ref+x]} {:keys [path ent]}]
  (let [[ref :as ref+ent] (->ref+x ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (pop path)
                            (fn [x]
                              (vec-plop x (-> path peek inc) ref)))
                 (conj ref+ent))))))

(defmethod run-tx :remove
  [{:as root :keys [->ref]} {:keys [path ent]}]
  (let [ref      (->ref ent)
        ent-path (:path ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (if ent-path (pop ent-path) path)
                            (fn [x]
                              (cond
                                (s/valid? ::ent/refs-coll x)
                                (into [] (remove #(= % ref)) x)
                                :else nil)))
                 (dissoc ref))))))

(defmethod run-tx :remove-after
  [{:as root :keys [->ref]} {:keys [path ent]}]
  (let [ref (->ref ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (pop path) vec-pluck (-> path peek inc))
                 (dissoc ref))))))

(defmethod run-tx :set
  [{:as root :keys [->ref+x]} {:keys [path ent]}]
  (let [ref+ent (->ref+x ent)]
    (swap! state
           (fn [st]
             (-> st (conj ref+ent))))))

;; FIXME reuse content-spec and allow users to provide entity-spec

(s/def ::op-path
  (s/and #(not (map? %))                                    ;; fixme not entity
         (s/conformer
           (fn [x]
             (if (and (not (sequential? x)) (not (coll? x)))
               [x]
               (and (vector? x) (not-empty x))))
           vec)))

(s/def ::tx
  (s/cat :op keyword?
         :path (s/? ::op-path)
         :ent (s/? map?)                                    ; ::ent/entity
         :ents (s/? (s/coll-of map?))
         :val (s/? any?)
         :args (s/* any?)))                                 ; (s/coll-of ::ent/entity)

(s/def ::txs (s/coll-of ::tx))

(def tx-spec-dispatch first)
;(ns-unmap *ns* 'tx-type )
(defmulti tx-type tx-spec-dispatch)

(s/def ::temp-ent-spec map?)
(s/def ::temp-ents-spec (s/coll-of map?))
(s/def ::ent-or-ents (s/alt :ent ::temp-ent-spec
                            :ents ::temp-ents-spec))

(comment
 (def test-root2
   (root.impl.core/ui-root
     {:->ref          :id
      :dispatch-fn    :type
      :transact       transact
      :state          xframe.core.alpha/db
      :->content-keys (constantly [:content])
      :entity-spec    (fn [x] (:type x))
      :ref-spec       integer?})))

(defmethod tx-type :add
  [_]
  (s/cat :op #{:add}
         :path ::op-path
         :content (:entity-resolver-spec *root*)))

(declare transact2)

(defmulti run-tx2 (fn [_root state tx] (:op tx)))

(defmethod run-tx2 :add
  [{:as   root
    :keys [->ref+x]}
   state
   {:as            tx
    :keys          [path]
    [type content] :content}]
  (case type
    :content
    (let [ref+ent (->ref+x content)]
      (add state path ref+ent))
    :contents
    (let [refs+xs (mapv ->ref+x content)]
      (-> state
          (update-in path
                     (fn [x]
                       (->> refs+xs
                            (into (or x []) (map first))
                            ;; assumption is that duplicate items are not desired
                            ;; though that could well be the case
                            not-empty distinct vec)))
          (into refs+xs)))))

;; todo add-dup which allows duplicates

(defmethod tx-type :set
  [_]
  (s/cat
    :op #{:set}
    :options (s/alt :content-only (:entity-resolver-spec *root*))))

(defmethod run-tx2 :set
  [{:as root :keys [->ref ->ref+x content-resolver-spec entity-resolver-spec]}
   st
   {:as             tx
    [opt-type opts] :options}]
  (case opt-type
    :content-only
    (let [[content-type content] opts]
      (case content-type
        :content (conj st (->ref+x content))
        :contents (into st (map ->ref+x) content)))))

(defmethod tx-type :remove
  [_]
  (s/cat
    :op #{:remove}
    :options (s/alt
               :content-only (:entity-resolver-spec *root*)
               :path-only ::op-path
               :path-and-content (s/cat
                                   :path ::op-path
                                   :content (:entity-resolver-spec *root*)))))

(defmethod run-tx2 :remove
  [{:as root :keys [->ref content-resolver-spec :entity-or-ref-resolver-spec]}
   st
   {:as             tx
    :keys           [path]
    [opt-type opts] :options}]
  (case opt-type
    :content-only
    (let [[content-type content] opts]
      ; delete-like, removes data at the ref
      (case content-type
        :content (dissoc st (->ref content))
        :contents (reduce (fn [st ent]
                            (dissoc st (->ref ent)))
                          st
                          content)))

    :path-only
    ; opts is path, only removes a ref
    (md/dissoc-in st opts)

    :path-and-content
    (let [{:keys [path] [content-type content] :content} opts
          st-content (get-in st path)
          [st-content-type [st-val-type st-val]]
          (s/conform entity-or-ref-resolver-spec st-content)]
      (case content-type
        :content
        (case st-content-type
          :content
          (cond-> st
            (= (->ref content) st-content) (md/dissoc-in path))
          :contents
          (assoc-in st
                    path
                    (into [] (remove #(= % (->ref content)) st-content))))
        :contents
        (let [refs (into #{} (map ->ref) content)]
          (case st-content-type
            :content
            (cond-> st
              (contains? refs st-content) (md/dissoc-in path))
            :contents
            (assoc-in st
                      path
                      (into [] (remove (fn [ref] (contains? refs ref)) st-content)))))))))

(defmethod tx-type :update
  [_]
  (s/cat
    :op #{:update}
    :path ::op-path #_(s/alt
                        :content-only (:entity-resolver-spec *root*)
                        :path-only ::op-path
                        :path-and-content (s/cat
                                            :path ::op-path
                                            :content (:entity-resolver-spec *root*)))
    :fn ifn?
    :args (s/* any?)))

(defmethod run-tx2 :update
  [{:as root :keys [->ref content-resolver-spec :entity-or-ref-resolver-spec]}
   st
   {:as   tx
    :keys [path fn args]}]
  (update-in st path fn args))

(defmethod tx-type :assoc
  [_]
  (s/cat
    :op #{:assoc}
    :kvs (s/& (s/* any?) (comp even? count) )))

(defmethod run-tx2 :assoc
  [_root
   st
   {:as tx :keys [kvs]}]
  (apply assoc st kvs))

(defmethod tx-type :assoc-in
  [_]
  (s/cat
    :op #{:assoc-in}
    :path vector?
    :val any?))

(defmethod run-tx2 :assoc-in
  [_root
   st
   {:as tx :keys [path val]}]
  (assoc-in st path val))


(defmethod tx-type :dissoc-in
  [_]
  (s/cat
    :op #{:dissoc-in}
    :path vector?))

(defmethod run-tx2 :dissoc-in
  [_root
   st
   {:as tx :keys [path]}]
  (md/dissoc-in st path))

(s/def ::tx2 (s/multi-spec tx-type tx-spec-dispatch))

(s/def ::txs2 (s/coll-of ::tx2))

(defn run-txs [root st txs]
  (let [conformed-txs (binding [*root* root]
                        (u/conform! ::txs2 (filter identity txs)))]
    (reduce (fn [st ctx]
              (run-tx2 root st ctx))
            st
            conformed-txs)))

(defn transact2
  ([root txs]
   (transact2 root txs {:history? true}))
  ([{:as root :keys [state]} txs {:keys [history?]}]
   ;; fixme, just like whole tx is transacted at once,
   ;; whole tx should be added to the history log to be undone in one step
   (when history?
     (log-txs txs))
   (let [next-st (swap! state #(run-txs root % txs))]
     #_(doseq [ctx conformed-txs
               :let [ctx (update ctx :ent dissoc :actions :handlers :views)]]
         (swap! state #(run-tx2 root % ctx)))

     ;; todo make this a configurable callback
     (xf/notify-listeners!)
     next-st)))

;(s/explain ::tx2 [:add [1 2 3] #_{}])
;(s/conform ::tx2 [:add [1 2 3] [{}]])

(defmethod run-tx :toggle
  [{:as root :keys [->ref]} {:keys [path ent]}]
  (let [ref (->ref ent)]
    ;; path can be nil
    (swap! state update-in (concat [ref] path) not)))

(defmethod run-tx :undo [root _] (undo root))
(defmethod run-tx :redo [root _] (redo root))

(defn transact
  ([root txs]
   (transact root txs {:history? true}))
  ([root txs {:keys [history?]}]
   (let [conformed-txs (u/conform! ::txs (filter identity txs))]
     (when history?
       (log-txs txs))
     (doseq [ctx conformed-txs
             :let [ctx (update ctx :ent dissoc :actions :handlers :views)]]
       (run-tx root ctx)))
   (xf/notify-listeners!)))
