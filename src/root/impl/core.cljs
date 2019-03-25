(ns root.impl.core
  (:require [medley.core :as md]
            [reagent.core :as r]
            [cljs.spec.alpha :as s]))

;; register/remove views
;; db lookup / transact
;; view state: dom node, etc.

(def data
  [{:id 1 :type :container :content [2]}
   {:id 2 :type :toggle-list :attrs {:name "Shopping List"} :content {:new-todo 6
                                                                      :todos    [3 4 5]}}
   {:id 3 :type :todo-item :markup ["Buy Bananas \uD83C\uDF4C️"]}
   {:id 4 :type :todo-item :markup ["Buy strawberries"]}
   {:id 5 :type :todo-item :checked? true :markup ["Buy Cabbage"]}
   {:id 6 :type :button :markup ["New Todo"]}])

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

(defn make-id-gen [start]
  (let [current (atom start)]
    (fn []
      (swap! current inc))))

(defonce id-gen (make-id-gen 1000))

(defn ->ref [ent]
  {:pre [(conform! ::entity ent)]}
  (:id ent))

(defn ref+ent-tuple [ent]
  [(->ref ent) ent])

(def state (r/atom (into {} (map ref+ent-tuple) data)))

(defn lookup [id] (get @state id))

(defn- ensure-vec [x]
  (cond
    (vector? x) x
    (sequential? x) (vec x)
    :else [x]))

(defmulti run-tx (fn [[op _]] op))

(defmethod run-tx :add
  [[_ id-or-path ent]]
  {:pre [(conform! ::entity ent)]}
  (let [[ref ent :as ref+ent] (ref+ent-tuple ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (ensure-vec id-or-path)
                            (fn [x]
                              (cond
                                (vector x) (conj x ref)
                                :else ref)))
                 (conj ref+ent))))))

(defmethod run-tx :remove
  [[_ id-or-path ent]]
  {:pre [(conform! ::entity ent)]}
  (let [ref (->ref ent)]
    (swap! state
           (fn [st]
             (-> st
                 (update-in (ensure-vec id-or-path)
                            (fn [x]
                              (cond
                                (vector x) (vec (remove (fn [r] (= r ref)) x))
                                :else nil)))
                 (dissoc ref))))))

(defmethod run-tx :update
  [[_ ent]]
  {:pre [(conform! ::entity ent)]}
  (let [ref+ent (ref+ent-tuple ent)]
    (swap! state
           (fn [st]
             (-> st (conj ref+ent))))))

(defn transact [txs]
  ;; could return ids for to trigger re-render based on id->views index
  (doseq [tx txs]
    (run-tx tx)))

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

(defn resolved-view
  ([{:as root :keys [root-id]}] (resolved-view root root-id nil))
  ([root id] (resolved-view root id nil))
  ([{:as root :keys [dispatch-view lookup]} id parent-id]
   (-> id
       lookup
       (cond-> parent-id (assoc :parent-id parent-id))
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

(defn default-view [{:as ent :keys [id type markup content]}]
  [:div
   {:style (merge (__border :tomato)
                  {:padding    10
                   :margin-top 5})}
   [:div "id: " id]
   [:div "Type: " (name type)]
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
                    :ent->view-name :type}))

(let [{:keys [add-view]} root]
  (add-view
   :button
   (fn [{:keys [parent-id markup]}]
     [:button
      {:on-click #(transact [[:add
                              [parent-id :content :todos]
                              {:id (id-gen) :type :todo-item :markup ["New Todo"]}]])}
      (first markup)]))

  (add-view
   :todo-item
   (fn [{:as ent :keys [parent-id markup checked? active?]}]
     [:div.flex.items-center.hide-child
      [:input {:type      :checkbox
               :checked   (boolean checked?)
               :on-change #(transact [[:update (update ent :checked? not)]])}]

      (if-not active?
        [:label {:style    {:padding "0 5px"}
                 :on-click #(transact [[:update (assoc ent :active? true)]])}
         (first markup)]
        [:input {:value      (first markup)
                 :auto-focus true
                 :on-blur    #(transact [[:update (assoc ent :active? false)]])
                 :on-change  #(transact
                               [[:update (assoc ent :markup [(-> % .-target .-value)])]])}])
      [:div.dim.light-silver.pointer.f7.child
       {:on-click #(transact [[:remove [parent-id :content :todos] ent]])}
       "remove"]])))


(defn test-root [id]
  (doto (resolved-view root id)
    js/console.log))

