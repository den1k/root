(ns root.views
  (:require [root.impl.resolver :as rr]
            [root.impl.core :as rc]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]))

(def root (rc/ui-root
           {:ent->ref       rc/ent->ref
            :lookup         rc/lookup
            :ent->view-name (fn [x] (or (:view x) (:type x)))
            :transact       rc/transact
            :entity-actions rc/entity-actions
            :add-id         rc/add-id}))

;; not great because this is an implementation detail instead
;; a spec of the behavior – also not using transactions
(global-shortcuts {"cmd+z"       #(rc/transact [[:undo]] {:history? false})
                   "cmd+shift+z" #(rc/transact [[:redo]] {:history? false})})

(defmethod root :button
  [{:keys [markup handlers]}]
  [:button (merge
            {:class "f6 link dim br2 ba ph2 pv1 dib black"}
            handlers) (first markup)])

(defmethod root :toggle-list
  [{:as ent :keys [markup content open?]}]
  (cond-> [:div
           [:div.flex.items-center
            [:div
             {:style {:padding 5}}
             [:div
              {:style    (merge
                          {:font-size   12
                           :line-height 1
                           :user-select :none
                           :cursor      :pointer}
                          (when open?
                            {:transform        "rotate(90deg)"
                             :transform-origin :center}))
               :on-click #(rc/transact [[:toggle :open? (rc/lookup (:id ent))]])}
              "▶"]]
            (first markup)]]
    open? (into content)))

(defmethod root :nav
  [{:as ent :keys [content routes]}]
  [:div
   [:nav
    {:class "db dt-l w-100 border-box pa3 ph5-l"}
    (into
     [:div {:class "db dtc-l v-mid w-100 w-75-l tc tr-l"}]
     (map
      (fn [[k v]]
        [:a
         {:href     "#"
          :class    "link dim dark-gray f6 f5-l dib mr3 mr4-l fw5"
          :on-click #(rc/transact [[:set (assoc ent :content v)]])}
         (name k)]))
     routes)]
   content])

(defmethod root :todo-item
  [{:as                             ent
    :keys                           [id parent-id markup checked? active? actions]
    {:keys [toggle-checked remove]} :actions}]
  [:div.flex.items-center.hide-child
   [:input {:type      :checkbox
            :checked   (boolean checked?)
            :on-change toggle-checked}]

   (if-not active?
     [:label {:style    {:padding "0 5px"}
              :on-click #(rc/transact [[:set (assoc ent :active? true)]]
                                   {:history? false})}
      (str (first markup) " " id)]
     [:input (merge
              (shortcuts {"enter" #(-> % .-target .blur)})
              {:default-value (first markup)
               :auto-focus    true
               :on-blur       #(let [v (-> % .-target .-value)]
                                 (rc/transact
                                  [[:set (assoc ent :active? false
                                                    :markup [v])]]
                                  {:history? (not= v (first markup))}))})])
   [:div.flex.dim.light-silver.pointer.f7.child
    [:div
     {:on-click remove}
     "remove"]
    (into [:select {:on-change #(let [opt-kw (-> % .-target .-value keyword)]
                                  (rc/transact [[:set (assoc ent :type opt-kw)]]))}]
          (map (fn [x]
                 (let [opt-kw (keyword x)]
                   [:option {:value x #_(= opt-kw type)} x])))
          ["todo-item" "toggle-list"])]])

(defn test-root [id]
  (doto (rr/resolved-view root {:root-id id})
    #_js/console.log))
