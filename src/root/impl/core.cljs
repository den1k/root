(ns root.impl.core
  (:require [medley.core :as md]
            [cljs.spec.alpha :as s]))

;; register/remove views
;; db lookup / transact
;; view state: dom node, etc.
(comment
 (defprotocol IUIRoot
   (-add-view [this view-name view])
   (-remove-view [this view-name])
   (-resolve-children [this x])
   (-lookup [this x])
   (-render [this] [this ids])
   (-dispatch-view [this view-name])))

(def data
  [{:id 1 :type :container :content [2]}
   {:id 2 :type :toggle-list :properties {:name "Shopping List"} :content {:todos [3 4 5]}}
   {:id 3 :type :todo-item :markup ["Buy Bananas \uD83C\uDF4C️"]}
   {:id 4 :type :todo-item :markup ["Buy strawberries"]}
   {:id 5 :type :todo-item :markup ["Buy Cabbage"]}])

(s/def ::id integer?)
(s/def ::type keyword?)
(s/def ::markup (s/coll-of string?))

(s/def ::ref integer? #_(s/tuple #{:id} ::id))
(s/def ::refs (s/coll-of ::ref))
(s/def ::refs-map (s/map-of keyword? (s/or :ref ::ref :refs ::refs)))
(s/def ::content (s/or :ref ::ref :refs ::refs :refs-map ::refs-map))

(s/def ::attrs map?)

(s/def ::entity (s/keys :req-un [::id] :opt-un [::type ::content ::markup ::attrs]))

(def state (atom (into {} (map (fn [x] [(:id x) x])) data)))

(defn id? [x] (integer? x))
(defn lookup [id] (get @state id))

(defn conform-or-false [spec x]
  (let [ret (s/conform spec x)]
    (if (= ret ::s/invalid)
      false
      ret)))

(defn resolve-content [content]
  (when-let [[type refs*] (conform-or-false ::content content)]
    (case type
      :ref (with-meta (lookup refs*) ::entity)
      :refs (with-meta (mapv lookup refs*) ::entities)
      :refs-map (with-meta (md/map-vals resolve-content content) ::entity-map))))

(defn resolve-children [{:as ent :keys [content]}]
  (cond-> ent content (update :content resolve-content)))

(defn __border [color]
  {:border (str "1px solid " (name color))})

(defn multi-dispatch [dispatch-fn]
  (let [table (atom {:default
                     (fn [x]
                       (throw
                        (ex-info
                         "No method defined for :default" {:arg x})))})]
    {:add-view      (fn add-view [dispatch-val f]
                      (swap! table assoc dispatch-val f))
     :remove-view   (fn remove-view [dispatch-val]
                      (swap! table dissoc dispatch-val))
     :dispatch-view (fn dispatch-view [x]
                      (let [dispatch-val (dispatch-fn x)
                            t            @table
                            f            (or (get t dispatch-val)
                                             (get t :default))]
                        (f x)))}))

;; should be a deftype or record that impls multidispatch
;; should root impl multimethod?

(defn ui-root [{:as opts :keys [lookup dispatch-fn]}]
  (let [{:as dfns :keys [dispatch-view]} (multi-dispatch dispatch-fn)]
    (letfn [(resolve-content [content]
              (when-let [[type refs*] (conform-or-false ::content content)]
                (case type
                  :ref (with-meta (lookup refs*) ::entity)
                  :refs (with-meta (mapv lookup refs*) ::entities)
                  :refs-map (with-meta (md/map-vals resolve-content content) ::entity-map))))

            (resolve-children [{:as ent :keys [content]}]
              (cond-> ent content (update :content resolve-content)))

            (resolved-view [ent] [dispatch-view (resolve-children ent)])

            (render [id] [resolved-view (lookup id)])]
      (merge (select-keys opts [:lookup])
             dfns
             {:render render
              :resolved-view resolved-view})))

  )


;; TODO rewrite the below into a defrecord or deftype storing lookup
;; and implementing serveral protocols to add and remove views, get state, and render
(def r (ui-root {:lookup lookup :dispatch-fn :type}))

(def rr
  (let [{:keys [lookup add-view resolved-view render]} r]
   (letfn [(default-view [{:as ent :keys [type markup content]}]
             [:div
              {:style (merge (__border :tomato)
                             {:padding    10
                              :margin-top 5})}
              [:div "Type: " (name type)]
              (cond
                markup (into [:div "Markup: "] markup)
                content [:div "Content: " [default-child-view content]])])
           (default-child-view [content]
             (case (meta content)
               ::entity [resolved-view content]
               ::entities (into [:div] (map resolved-view) content)
               ::entity-map (into [:div]
                                  (map
                                   (fn [[k child-or-children]]
                                     [:div (name k)
                                      [default-child-view child-or-children]]))
                                  content)))]
     (add-view :default default-view)
     render)))
