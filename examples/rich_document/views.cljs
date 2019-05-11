(ns rich-document.views
  (:require [root.impl.resolver :as rr]
            [rich-document.core :refer [root]]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [util.dom :as ud]
            [util.string :as ustr]))

(defn block
  [{:as              ent
    :keys            [id]
    {:keys [remove]} :actions}
   & children]
  (-> (into [:div.flex.items-center] children)
      (conj [:div.hide-child
             [:div.flex.dim.light-silver.pointer.f7.child
              [:div
               {:on-click remove}
               "remove"]
              (into [:select {:value     (name ((:ent->view-name root) ent))
                              :on-change #(let [opt-kw (-> % .-target .-value keyword)]
                                            (root :transact [[:set (assoc ent :type opt-kw)]]))}]
                    (map (fn [x] [:option {:value x} x]))
                    ["todo-item" "toggle-list"])]])))

(defmethod root :button
  [{:keys [markup handlers]}]
  [:button.f6.link.dim.br2.ba.ph2.pv1.dib.black
   handlers (first markup)])

(defn input
  [opts {:as ent :keys [markup active?]}]
  [:div.outline-0.ph2
   (merge
    {:ref
     (fn [node]
       (when (and node active?)
         (ud/set-cursor node 0 {:unless-active? true})))
     :content-editable
     true
     :suppress-content-editable-warning
     true
     :on-blur
     #(let [v (-> % .-target .-innerText)]
        (root :transact
              [[:set (assoc ent :active? false
                                :markup [v])]]
              {:history? (not= v (first markup))}))
     :on-click
     #(root :transact [[:set (assoc ent :active? true)]]
            {:history? false})}
    opts)
   (first markup)])

(defmethod root :toggle-list
  [{:as ent :keys [markup views open?]}]
  [block ent
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
                :on-click #(root :transact [[:toggle :open? ent]])}
               "▶"]]
             [input {} ent]]]
     open? (into views))])

(defmethod root :nav
  [{:as ent :keys [views routes]}]
  [:div
   [:nav.db.dt-l.w-100.border-box.pa3.ph5-l
    (subs (str (.getTime (js/Date.))) 9)
    (into
     [:div.db.dtc-l.v-mid.w-100.w-75-l.tc.tr-l]
     (map
      (fn [[k v]]
        [:a.link.dim.dark-gray.f6.f5-l.dib.mr3.mr4-l.fw5.pointer
         {
          ;; with history enabled this breaks due to a bug in spec that
          ;; does not respect a nonconforming during unform
          :on-click #(root :transact [[:set (assoc ent :content v)]] {:history? false})}
         (name k)]))
     routes)]
   views])

(defmethod root :todo-item
  [{:as                             ent
    :keys                           [path markup checked?]
    {:keys [toggle-checked remove]} :actions}]
  [block ent
   [:input {:type      :checkbox
            :checked   (boolean checked?)
            :on-change toggle-checked}]
   [input
    (shortcuts
     {"backspace" (fn [e]
                    (let [v (-> e .-target .-innerText)]
                      (if (empty? v)
                        (remove)
                        ; todo if index at first position concat with previous ent
                        )))
      "enter"
                  #(let [v      (-> % .-target .-innerText)
                         [tthis tnext] (ustr/split-at (ud/get-cursor) v)
                         tnext? (boolean (not-empty tnext))]
                     (root :transact
                           [[:set (assoc ent :active? false :markup [tthis])]
                            [:add-after path ((:add-id root) {:type :todo-item :active? true :markup [(or tnext "")]})]]
                           {:history? (or tnext? (not= tthis (first markup)))})
                     false)})
    ent]])

(defn test-root [id]
  (doto (rr/resolved-view root {:root-id id})
    #_js/console.log))
