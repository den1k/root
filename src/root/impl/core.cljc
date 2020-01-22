(ns root.impl.core
  (:require [medley.core :as md]
            [xframe.core.alpha :as xf]
            [root.impl.multi :as multi]
            [root.impl.resolver :as rr]
            [root.impl.entity :as ent]
            [root.impl.util :as u]
            [clojure.set :as set]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(defonce id-gen (u/make-id-gen 1000))
(defn add-id [ent] (assoc ent :id (id-gen)))

(defn ent->ref [ent]
  (:id ent))

(defn ent->ref+ent [ent]
  [(ent->ref ent) ent])

(defonce state xf/db)

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

(defn inverted-txs [txs]
  (let [methods (methods inverted-op)
        ops     (into #{} (map op-dispatch) txs)
        txs     (if (= ops (set/intersection methods ops))
                  txs
                  (let [diff (set/difference ops methods)]
                    #?(:cljs (js/console.warn "Missing inverted-ops for:" diff))
                    (remove (fn [tx] (contains? diff (op-dispatch tx))) txs)))]
    (some->> txs (mapv inverted-op) not-empty)))

(defn log-txs [ctxs]
  (let [[[op] :as txs] (s/unform ::txs ctxs)]
    (case op
      (:undo :redo) nil
      (let [{:keys [log]} @history-log]
        (when-let [inv-txs (inverted-txs txs)]
          (swap! history-log assoc
                 :log (conj log inv-txs)
                 :redo-log []))))))

(declare transact)

(defn- shift-history [from-key to-key]
  (let [{from from-key to to-key} @history-log]
    (when-let [txs (peek from)]
      (swap! history-log assoc
             from-key (pop from)
             to-key (conj to (mapv inverted-op txs)))
      (transact txs {:history? false}))))

(defn undo []
  (shift-history :log :redo-log))

(defn redo []
  (shift-history :redo-log :log))

(comment
 (undo)
 (redo)
 )

(defmulti run-tx :op)

(defmethod run-tx :add
  [{:keys [path ent]}]
  (let [[ref :as ref+ent] (ent->ref+ent ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in path
                            (fn [x]
                              (cond
                                (vector? x) (conj x ref)
                                :else ref)))
                 (conj ref+ent))))))

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
  [{:keys [path ent]}]
  (let [[ref :as ref+ent] (ent->ref+ent ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (pop path)
                            (fn [x]
                              (vec-plop x (-> path peek inc) ref)))
                 (conj ref+ent))))))

(defmethod run-tx :remove
  [{:keys [path ent]}]                  ;; todo clean path
  (let [ref      (ent->ref ent)
        ent-path (:path ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (if ent-path (pop ent-path) path)
                            (fn [x]
                              (cond
                                (s/valid? ::ent/refs x)
                                (into [] (remove #(= % ref)) x)
                                :else nil)))
                 (dissoc ref))))))

(defmethod run-tx :remove-after
  [{:keys [path ent]}]                  ;; todo clean path
  (let [ref (ent->ref ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (pop path) vec-pluck (-> path peek inc))
                 (dissoc ref))))))

(defmethod run-tx :set
  [{:keys [path ent]}]
  (let [ref+ent (ent->ref+ent ent)]
    (swap! state
           (fn [st]
             (-> st (conj ref+ent))))))

(s/def ::op-path
  (s/and #(or (keyword? %) (vector? %))
         (s/conformer
          (fn [x]
            (if (keyword? x)
              [x]
              (and (vector? x) (not-empty x))))
          vec)))

(s/def ::tx
  (s/cat :op keyword?
         :path (s/? ::op-path)
         :ent (s/? ::ent/entity)))

(s/def ::txs (s/coll-of ::tx))

(defmethod run-tx :toggle
  [{:keys [path ent]}]
  (let [ref (ent->ref ent)]
    ;; path can be nil
    (swap! state update-in (concat [ref] path) not)))

(defmethod run-tx :undo [_] (undo))
(defmethod run-tx :redo [_] (redo))

(defn transact
  ([txs]
   (transact txs {:history? true}))
  ;; could return ids for to trigger re-render based on id->views index
  ([txs {:keys [history?]}]
   #?(:cljs (js/console.log :txs txs))
   (let [conformed-txs (u/conform! ::txs (filter identity txs))]
     (when history?
       (log-txs conformed-txs))
     (doseq [ctx conformed-txs
             :let [ctx (update ctx :ent dissoc :actions :handlers :views)]]
       (run-tx ctx)))
   (xf/notify-listeners!)))

(defn __border [color]
  {:border (str "1px solid " (name color))})

(defn default-child-view [views]
  (let [padded-view [:div {:style {:padding-left 10}}]]
    (case (::rr/type (meta views))
      :entity (conj padded-view views)
      :entities (into padded-view views)
      :entity-map (into padded-view
                        (map
                         (fn [[k child-or-children]]
                           [:div (str (name k) ": ")
                            [default-child-view child-or-children]]))
                        views))))

(defn default-view* [{:as ent :keys [id type view markup views]}]
  [:div
   {:style (merge (__border :tomato)
                  {:padding    10
                   :margin-top 5})}
   [:div "id: " id]
   [:div "Type: " (if type (name type) "[No type]")]
   (when view
     [:div "View: " (name view)])
   (when markup (into [:div "Markup: "] markup))
   (when views [:div "Content: " [default-child-view views]])])

(defrecord UIRoot
  [add-view remove-method dispatch-view method-table]
  #?@(:clj
      [clojure.lang.IFn
       (invoke
         [this a]
         (this a nil))
       (invoke
         [this a b]
         (this a b nil))
       (invoke
         [{:keys [transact lookup]} a b c]
         (case a
           :transact (transact b c)
           :lookup (lookup b)
           :view (add-view b c)
           (dispatch-view a)))]
      :cljs
      [IFn
       (-invoke
        [this a]
        (this a nil))
       (-invoke
        [this a b]
        (this a b nil))
       (-invoke
        [{:as root :keys [transact lookup]} a b c]
        (case a
          :transact (transact b c)
          :lookup (with-meta (lookup b) {:root root})
          :view (add-view b c)
          (dispatch-view a)))]))

(defn- view-multi-dispatch [opts]
  (-> opts
      multi/multi-dispatch
      (update :add-method
              (fn [add-method]
                (fn with-name [dispatch-val view]
                  #?(:cljs
                     (set! (.-displayName view)
                           (str "root-view__" (name dispatch-val))))
                  (add-method dispatch-val view))))
      (set/rename-keys {:add-method :add-view
                        :dispatch   :dispatch-view})))

;; Root config specs

(s/def ::ent->view-name ifn?)
(s/def ::lookup ifn?)
(s/def ::lookup-sub ifn?)
(s/def ::ent->ref ifn?)
(s/def ::transact ifn?)
(s/def ::add-id ifn?)

(s/def ::ui-root-static
  (s/keys :req-un [::ent->view-name ::lookup ::ent->ref]))

(s/def ::ui-root-reactive
  (s/and ::ui-root-static (s/keys :req-un [::lookup-sub])))

(s/def ::ui-root-dynamic
  (s/and ::ui-root-reactive (s/keys :req-un [::transact ::add-id])))

(s/def ::ui-root
  (s/or :dynamic ::ui-root-dynamic
        :reactive ::ui-root-reactive
        :static ::ui-root-static))

(defn opts-warn [root-opts]
  (let [[root-type _] (u/conform! ::ui-root root-opts)]
    #?(:cljs
       (when (contains? #{:static :reactive} root-type)
         (js/console.warn
          "Root Warning: static use only. Missing one or more required"
          "functions: lookup-sub, transact, add-id.")))))


(defn ui-root
  [{:as   opts
    :keys [ent->view-name default-view invoke-fn lookup lookup-sub]
    :or   {default-view default-view*}}]
  (opts-warn opts)
  (let [opts (cond-> opts (nil? lookup-sub) (assoc :lookup-sub lookup))]
    (map->UIRoot
     (merge
      (view-multi-dispatch
       {:dispatch-fn         ent->view-name
        :default-dispatch-fn default-view
        :invoke-fn           invoke-fn})
      opts))))
