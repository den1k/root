(ns root.impl.transact
  (:require [xframe.core.alpha :as xf]
            [root.impl.entity :as ent]
            [medley.core :as md]
            [clojure.set :as set]
            [root.impl.util :as u]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

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

(defmethod run-tx :add-many             ; todo remove-many
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
  (s/and #(not (map? %))                ;; not entity
         (s/conformer
          (fn [x]
            (if (keyword? x)
              [x]
              (and (vector? x) (not-empty x))))
          vec)))

(s/def ::tx
  (s/cat :op keyword?
         :path (s/? ::op-path)
         :ent (s/? map?)                ; ::ent/entity
         :ents (s/? (s/coll-of map?))
         :val (s/? any?)
         :args (s/* any?)))             ; (s/coll-of ::ent/entity)

(s/def ::txs (s/coll-of ::tx))

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
