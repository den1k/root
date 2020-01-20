(ns root.impl.core
  (:require [medley.core :as md]
            [xframe.core.alpha :as xf]
            [root.impl.multi :as multi]
            [root.impl.resolver :as rr]
            [root.impl.entity :as ent]
            [root.impl.util :as u]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(defonce id-gen (u/make-id-gen 1000))
(defn add-id [ent] (assoc ent :id (id-gen)))

(defn ent->ref [ent]
  (:id ent))

(defn ent->ref+ent [ent]
  [(ent->ref ent) ent])

(defonce state xf/db #_(atom {}))

(defn lookup [id]
  (get @state id))

(def history-log (atom {:idx nil :log []}))

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
  [:set (lookup id)])

(defmethod inverted-op :toggle [tx] tx)

(defn log-txs [ctxs]
  (let [[[op] :as txs] (s/unform ::txs ctxs)]
    (case op
      (:undo :redo) nil
      (let [{:keys [log]} @history-log]
        (swap! history-log assoc
               :log (conj log (mapv inverted-op txs))
               :redo-log [])))))

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
    #?(:cljs (js/console.log :add path ent))
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
   #?(:cljs (js/console.log :tx txs))
   (let [conformed-txs (u/conform! ::txs (filter identity txs))]
     (when history?
       (log-txs conformed-txs))
     (doseq [ctx conformed-txs
             :let [ctx (update ctx :ent dissoc :actions :handlers :views)]]
       (run-tx ctx)))))

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
  [add-method remove-method dispatch-fn method-table]
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
           :view (add-method b c)
           (dispatch-fn a)))]
      :cljs
      [IFn
       (-invoke
        [this a]
        (this a nil))
       (-invoke
        [this a b]
        (this a b nil))
       (-invoke
        [{:keys [transact lookup]} a b c]
        (case a
          :transact (transact b c)
          :lookup (lookup b)
          :view (add-method b c)
          (dispatch-fn a)))]))

(defn ui-root
  [{:as   opts
    :keys [ent->ref ent->view-name default-view invoke-fn lookup transact add-id]
    :or   {default-view default-view*}}]
  {:pre [ent->view-name lookup ent->ref]}
  (when (or (nil? transact) (nil? add-id))
    (println "Warning: static use only. transact and add-id functions missing."))
  (map->UIRoot
   (merge
    (multi/multi-dispatch
     {:dispatch-fn         ent->view-name
      :default-dispatch-fn default-view
      :invoke-fn           invoke-fn})
    opts)))

(comment

 (def state
   {-1    {:id -1, :type :main, :content [97190 24426]},
    97190 {:vendor "Act+Acre",
           :title  "Mini Anti-Dandruff Shampoo + Moisture Balancing Conditioner",
           :link   "https://actandacre.com/products/travel-cleanse-conditioner",
           :price  "26.00",
           :sku    "AA0001T+AA0002T",
           :img    "https://cdn.shopify.com/s/files/1/0054/3978/3001/products/cleanse_conditioner_bundle_traavel_2x_65ac3e64-94e7-4c1b-93ca-ac9247cb6a62.png?v=1576620796",
           :id     97190,
           :type   :feed-item},
    24426 {:vendor "Act+Acre",
           :title  "Organic Bamboo Pillowcase",
           :link   "https://actandacre.com/products/organic-bamboo-pillowcase-add-on",
           :price  "20.00",
           :sku    "AA011B",
           :img    "https://cdn.shopify.com/s/files/1/0054/3978/3001/products/Pillowcase-1_449778ef-97cd-4e35-a653-a0fbaac4c632.jpg?v=1572615025",
           :id     24426,
           :type   :feed-item}})

 (defn lookup [id] (get state id))

 (def root
   (ui-root
    {:root-id        -1
     :ent->ref       :id
     :lookup         lookup
     :ent->view-name :type
     ;; fixme remove in next version
     ;:invoke-fn (fn [_ x] x)
     :transact       (constantly ::transacted)
     :add-id         (constantly nil)})))
