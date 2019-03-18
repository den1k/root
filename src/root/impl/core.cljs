(ns root.impl.core
  (:require [medley.core :as md]
            [cljs.spec.alpha :as s]))

;; register/remove views
;; db lookup / transact
;; view state: dom node, etc.


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

(defn conform! [spec x]
  (let [ret (s/conform spec x)]
    (if (= ret ::s/invalid)
      (throw
       (ex-info "Value doesn't match spec"
                {:value   x
                 :spec    spec
                 :explain (s/explain-str spec x)
                 :explain-data (s/explain-data spec x)}))
      ret)))

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
  ([{:as root :keys [root-id]}] (resolved-view root root-id))
  ([{:as root :keys [dispatch-view lookup]} id]
   (-> id
       lookup
       (resolve-child-views #(resolved-view root %))
       dispatch-view)))

(defn default-child-view [content]
  (case (meta content)
    ::entity content
    ::entities (into [:div] content)
    ::entity-map (into [:div]
                       (map
                        (fn [[k child-or-children]]
                          [:div (name k)
                           [default-child-view child-or-children]]))
                       content)))

(defn default-view [{:as ent :keys [type markup content]}]
  [:div
   {:style (merge (__border :tomato)
                  {:padding    10
                   :margin-top 5})}
   [:div "Type: " (name type)]
   (cond
     markup (into [:div "Markup: "] markup)
     content [:div "Content: " [default-child-view content]])])

(defn ui-root [{:as opts :keys [ent->view-name]}]
  {:pre [ent->view-name lookup]}
  (merge
   (multi-dispatch {:dispatch-fn         (:ent->view-name opts)
                    :add-method-key      :add-view
                    :remove-method-key   :remove-view
                    :dispatch-method-key :dispatch-view
                    :default-dispatch-fn default-view})
   opts))


(defn test-root [id]
  (let [root (ui-root {:root-id        id
                       :lookup         lookup
                       :ent->view-name :type})]

    (doto (resolved-view root)
      js/console.log)))

