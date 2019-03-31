(ns root.impl.core
  (:require [medley.core :as md]
            [reagent.core :as r]
            [cljs.spec.alpha :as s]
            [den1k.shortcuts :refer [shortcuts]]))

;; register/remove views
;; db lookup / transact
;; view state: dom node, etc.

(def data
  [{:id 1 :type :container :content [10 2]}
   {:id 2 :type :todo-list :view :toggle-list :attrs {:name "Shopping List"} :content {:new-todo 6
                                                                                       :todos    [3 4 5]}}
   {:id 3 :type :todo-item :markup ["Buy Bananas \uD83C\uDF4C️"]}
   {:id 4 :type :todo-item :markup ["Buy strawberries"]}
   {:id 5 :type :todo-item :checked? true :markup ["Buy Cabbage"]}
   {:id 6 :type :button :markup ["New Todo"] :handlers {:on-click [:todo-item :add]}}
   {:id 10 :content [11 12]}
   {:id 11 :type :button :markup ["undo"] :handlers {:on-click [[:undo]]}}
   {:id 12 :type :button :markup ["redo"] :handlers {:on-click [[:redo]]}}])

(def entity-actions
  {:todo-item
   {:add            [[:add
                      [:<- :content :todos]
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :remove         [[:remove [:<- :content :todos]]]
    :toggle-checked [[:toggle :checked?]]}})

(s/def ::id integer?)
(s/def ::type keyword?)
(s/def ::markup (s/coll-of string?))

(s/def ::ref integer? #_(s/tuple #{:id} ::id))
(s/def ::refs (s/coll-of ::ref))
(s/def ::refs-map (s/map-of keyword? (s/or :ref ::ref :refs ::refs)))
(s/def ::content (s/or :ref ::ref :refs ::refs :refs-map ::refs-map))

(s/def ::attrs map?)

(s/def ::entity (s/keys :req-un [::id] :opt-un [::type ::content ::markup ::attrs]))

(defn conform! [spec x]
  (let [ret (s/conform spec x)]
    (if (= ret ::s/invalid)
      (throw
       (ex-info "Value doesn't match spec"
                {:value        x
                 :spec         spec
                 :explain      (s/explain-str spec x)
                 :explain-data (s/explain-data spec x)}))
      ret)))

(defn check [spec x]
  (not= (s/conform spec x) ::s/invalid))

(defn make-id-gen [start]
  (let [current (atom start)]
    (fn []
      (swap! current inc))))

(defonce id-gen (make-id-gen 1000))

(defn ->ref [ent]
  (conform! ::entity ent)
  (:id ent))

(defn ref+ent-tuple [ent]
  [(->ref ent) ent])

(def state (r/atom (into {} (map ref+ent-tuple) data)))
(def history-log (atom {:idx nil :log []}))

(defn op-dispatch [[op _]] op)
(defn lookup [id] (get @state id))

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

(defn- ensure-vec [x]
  (cond
    (vector? x) x
    (sequential? x) (vec x)
    :else [x]))

(defmulti run-tx :op)

(defmethod run-tx :add
  [{:keys [path ent]}]
  (let [[ref ent :as ref+ent] (ref+ent-tuple ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in path
                            (fn [x]
                              (cond
                                (vector? x) (conj x ref)
                                :else ref)))
                 (conj ref+ent))))))

(defmethod run-tx :remove
  [{:keys [path ent]}]
  (let [ref (->ref ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in path
                            (fn [x]
                              (cond
                                (check ::refs x)
                                (vec (remove (fn [r] (= r ref)) x))
                                :else nil)))
                 (dissoc ref))))))

(defmethod run-tx :set
  [{:keys [path ent]}]
  (conform! ::entity ent)
  (let [ref+ent (ref+ent-tuple ent)]
    (swap! state
           (fn [st]
             (-> st (conj ref+ent))))))

(s/def ::op-path
  (s/conformer
   (fn [x]
     (if (keyword? x)
       [x]
       (and (vector? x) (not-empty x))))))

(s/def ::tx
  (s/cat :op keyword?
         :path (s/? ::op-path)
         :ent ::entity))


(defmethod run-tx :toggle
  [{:keys [path ent]}]
  (let [ref (->ref ent)]
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
          (conform! ::tx)
          run-tx))))

(defn __border [color]
  {:border (str "1px solid " (name color))})

(defn multi-dispatch
  [{:keys [dispatch-fn add-method-key remove-method-key dispatch-method-key default-dispatch-fn]}]
  {:pre [(ifn? dispatch-fn)
         add-method-key remove-method-key dispatch-method-key]}
  (let [table (atom {:default
                     (or default-dispatch-fn
                         (fn [x]
                           (throw
                            (ex-info
                             "No method defined for :default" {:arg x}))))})]
    {add-method-key      (fn add-view [dispatch-val f]
                           (swap! table assoc dispatch-val f))
     remove-method-key   (fn remove-view [dispatch-val]
                           (swap! table dissoc dispatch-val))
     dispatch-method-key (fn dispatch-view [x]
                           (let [dispatch-val (dispatch-fn x)
                                 t            @table
                                 f            (or (get t dispatch-val)
                                                  (get t :default))]
                             [f x]))}))

(defn resolve-content
  ([content] (resolve-content content identity))
  ([content f]
   (let [[type refs*] (conform! ::content content)]
     (case type
       :ref (with-meta (f refs*) ::entity)
       :refs (with-meta (mapv f refs*) ::entities)
       :refs-map (with-meta (md/map-vals #(resolve-content % f) content) ::entity-map)))))

(defn resolve-child-views
  ([ent] (resolve-child-views ent identity))
  ([{:as ent :keys [content]} f]
   (cond-> ent content (update :content resolve-content f))))

(defn wrap-actions-and-handlers [{:as ent :keys [type actions handlers parent-id]}]
  (letfn [(wrap [actions-map path?]
            (md/map-vals
             (fn [actions-or-path]
               (fn []
                 (transact
                  (mapv (fn [[op id-or-path new-ent :as tx]]
                          [op (->> id-or-path
                                   ensure-vec
                                   (mapv #(if (= :<- %)
                                            parent-id
                                            %)))
                           (if-not new-ent
                             (dissoc ent :parent-id)
                             (cond-> new-ent
                               (nil? (:id new-ent))
                               (assoc :id (id-gen))))])
                        (cond->> actions-or-path
                          path? (get-in entity-actions))))))
             actions-map))]
    (let [ent-actions (some-> (get entity-actions type) (wrap false))]
      (cond-> ent
        ent-actions (assoc :actions ent-actions)
        actions (update :actions merge (wrap actions true))
        handlers (assoc :handlers (wrap handlers true))))))

(defn resolved-view
  ([{:as root :keys [root-id]}] (resolved-view root root-id nil))
  ([root id] (resolved-view root id nil))
  ([{:as root :keys [dispatch-view lookup]} id parent-id]
   (-> id
       lookup
       (cond-> parent-id (assoc :parent-id parent-id))
       wrap-actions-and-handlers
       (resolve-child-views #(resolved-view root % id))
       dispatch-view)))

(defn default-child-view [content]
  (case (meta content)
    ::entity content
    ::entities (into [:div {:style {:padding-left 10}}] content)
    ::entity-map (into [:div {:style {:padding-left 10}}]
                       (map
                        (fn [[k child-or-children]]
                          [:div (str (name k) ": ")
                           [default-child-view child-or-children]]))
                       content)))

(defn default-view [{:as ent :keys [id type view markup content]}]
  [:div
   {:style (merge (__border :tomato)
                  {:padding    10
                   :margin-top 5})}
   [:div "id: " id]
   [:div "Type: " (if type (name type) "[No type]")]
   (when view
     [:div "View: " (name view)])
   (cond
     markup (into [:div "Markup: "] markup)
     content [:div "Content: " [default-child-view content]])])

(defn ui-root [{:as opts :keys [ent->view-name]}]
  {:pre [ent->view-name lookup]}        ;; todo add transact as a required function
  (merge
   (multi-dispatch {:dispatch-fn         (:ent->view-name opts)
                    :add-method-key      :add-view
                    :remove-method-key   :remove-view
                    :dispatch-method-key :dispatch-view
                    :default-dispatch-fn default-view})
   opts))

(def root (ui-root {:lookup         lookup
                    :ent->view-name (fn [x] (or (:view x) (:type x)))}))

(let [{:keys [add-view]} root]
  (add-view
   :button
   (fn [{:keys [markup handlers]}]
     [:button handlers (first markup)]))

  (add-view
   :undo-button
   (fn [{:keys [markup]}]
     [:button
      {:on-click #(undo)}
      (first markup)]))

  (add-view
   :redo-button
   (fn [{:keys [markup]}]
     [:button
      {:on-click #(redo)}
      (first markup)]))

  (add-view
   :todo-item
   (fn [{:as                             ent :keys [id parent-id markup checked? active? actions]
         {:keys [toggle-checked remove]} :actions}]
     [:div.flex.items-center.hide-child
      [:input {:type      :checkbox
               :checked   (boolean checked?)
               :on-change toggle-checked}]

      (if-not active?
        [:label {:style    {:padding "0 5px"}
                 :on-click #(transact [[:set (assoc ent :active? true)]]
                                      {:history? false})}
         (str (first markup) " " id)]
        [:input {:default-value (first markup)
                 :auto-focus    true
                 :on-blur       #(let [v (-> % .-target .-value)]
                                   (transact
                                    [[:set (assoc ent :active? false
                                                      :markup [v])]]
                                    {:history? (not= v (first markup))}))}])
      [:div.dim.light-silver.pointer.f7.child
       {:on-click remove}
       "remove"]])))


(defn test-root [id]
  (doto (resolved-view root id)
    js/console.log))

