(ns root.impl.core
  (:require [medley.core :as md]
            [reagent.core :as r]
            [cljs.spec.alpha :as s]
            [root.impl.mock-data :as mock]
            [root.impl.multi :as multi]
            [root.impl.resolver :as rr]
            [root.impl.entity :as ent]
            [root.impl.util :as u]))

(defonce id-gen (u/make-id-gen 1000))
(defn add-id [ent] (assoc ent :id (id-gen)))

(defn ent->ref [ent]
  (:id ent))

(defn ent->ref+ent [ent]
  [(ent->ref ent) ent])

(def state (r/atom (u/project ent->ref+ent mock/data)))
(defn lookup [id] (get @state id))

(def entity-actions
  {:global
   {:undo [[:undo]]
    :redo [[:redo]]}
   :todo-item
   {:add            [[:add
                      [:<- :content]
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :remove         [[:remove [:<- :content]]]
    :toggle-checked [[:toggle :checked?]]}})


(def history-log (atom {:idx nil :log []}))

(defn op-dispatch [[op _]] op)

(defmulti inverted-op op-dispatch)

(defmethod inverted-op :add
  [[_ id-or-path ent]]
  [:remove id-or-path ent])

(defmethod inverted-op :remove
  [[_ id-or-path ent]]
  [:add id-or-path ent])

(defmethod inverted-op :set
  [[_ {:as ent :keys [id]}]]
  [:set (lookup id)])

(defmethod inverted-op :toggle [tx] tx)

(defn log-txs [[[op] :as txs]]
  (case op
    (:undo :redo) nil
    (let [{:keys [log]} @history-log]
      (swap! history-log assoc
             :log (conj log (mapv inverted-op txs))
             :redo-log []))))

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

(defn pluck-vec [seq & idxs]
  (if-not idxs
    seq
    (let [idxs (set idxs)]
      (into (empty seq)
            (comp
             (map-indexed vector)
             (keep (fn [[idx i]]
                     (when (not (contains? idxs idx)) i))))
            seq))))

(defn plop-vec [seq idx item]
  (vec (concat (take idx seq) [item] (drop idx seq))))

(defmethod run-tx :remove
  [{:keys [path ent]}]                  ;; todo clean path
  (let [ref      (ent->ref ent)
        ent-path (:path ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (if ent-path (butlast ent-path) path)
                            (fn [x]
                              (cond
                                (s/valid? ::ent/refs x)
                                (into [] (remove #(= % ref)) x)
                                :else nil)))
                 (dissoc ref))))))

(defmethod run-tx :set
  [{:keys [path ent]}]
  (let [ref+ent (ent->ref+ent (dissoc ent :actions :handlers))]
    (swap! state
           (fn [st]
             (-> st (conj ref+ent))))))

(s/def ::op-path
  (s/and #(or (keyword? %) (vector? %))
         (s/conformer
          (fn [x]
            (if (keyword? x)
              [x]
              (and (vector? x) (not-empty x)))))))

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
   (when history?
     (log-txs txs))
   (doseq [tx txs]
     (->> tx
          (u/conform! ::tx)
          run-tx))))

(defn __border [color]
  {:border (str "1px solid " (name color))})

(defn default-child-view [content]
  (let [padded-view [:div {:style {:padding-left 10}}]]
    (case (meta content)
      ::rr/entity (conj padded-view content)
      ::rr/entities (into padded-view content)
      ::rr/entity-map (into padded-view
                            (map
                             (fn [[k child-or-children]]
                               [:div (str (name k) ": ")
                                [default-child-view child-or-children]]))
                            content))))

(defn default-view [{:as ent :keys [id type view markup content]}]
  [:div
   {:style (merge (__border :tomato)
                  {:padding    10
                   :margin-top 5})}
   [:div "id: " id]
   [:div "Type: " (if type (name type) "[No type]")]
   (when view
     [:div "View: " (name view)])
   (when markup (into [:div "Markup: "] markup))
   (when content [:div "Content: " [default-child-view content]])])

(defrecord UIRoot [add-method remove-method dispatch-fn method-table]
  IFn
  (-invoke [_ x]
    (dispatch-fn x))
  IMultiFn
  (-add-method [_ dispatch-val f]
    (add-method dispatch-val f))
  (-remove-method [_ dispatch-val]
    (remove-method dispatch-val))
  (-methods [_] @method-table))

(defn ui-root
  [{:as   opts
    :keys [ent->ref ent->view-name lookup transact entity-actions add-id]}]
  {:pre [ent->view-name lookup ent->ref
         transact entity-actions add-id]} ;; todo add transact as a required function
  (map->UIRoot
   (merge
    (multi/multi-dispatch
     {:dispatch-fn         ent->view-name
      :default-dispatch-fn default-view})
    opts)))

