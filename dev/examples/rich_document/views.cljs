(ns examples.rich-document.views
  (:require [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [examples.util.dom  :as ud]
            [examples.util.string :as ustr]
            [uix.dom.alpha :as uix.dom]
            [root.impl.core :as rc]
            [root.impl.util :as u]
            [xframe.core.alpha :as xf]
            [examples.rich-document.mock-data :as mock-data]
            [uix.core.alpha :as uix]))

(def entity-actions
  {:global
   {:undo [[:undo]]
    :redo [[:redo]]}
   :toggle-list
   {:remove [[:remove [:<- :content]]]}
   :todo-item
   {:add            [[:add
                      [:<- :content]
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :add-after      [[:add-after
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :remove         [[:remove [:<- :content]]]
    :toggle-checked [[:toggle :checked?]]}})

(defn ent->ref [ent]
  (:id ent))

(reset! rc/state (u/project (fn [ent]
                              [(ent->ref ent) ent])
                            mock-data/data))

(defn lookup* [x]
  (if (coll? x)
    x
    (get (xf/<- [::xf/db]) x)))

(xf/reg-sub :get
  (fn [k] (lookup* k)))

(def lookup lookup*)

(defn lookup-sub [id]
  (xf/<sub [:get id]))

(def root (rc/ui-root
           {:->ref          ent->ref
            :invoke-fn      (fn invoke [f x]
                              (js/console.log :ent x)
                              ^{:key (ent->ref x)}
                              [f x])
            :lookup         lookup
            :lookup-sub     lookup-sub
            :dispatch-fn    (fn [x] (or (:view x) (:type x)))
            :transact       rc/transact
            :content-keys   [:content]
            :content-spec   integer?
            :entity-actions entity-actions
            :add-id         rc/add-id}))

(global-shortcuts {"cmd+z"       #(root :transact [[:undo]] {:history? false})
                   "cmd+shift+z" #(root :transact [[:redo]] {:history? false})})


(defn block
  [{:as              ent
    :keys            [id]
    {:keys [remove]} :actions}
   & children]
  (-> (into [:div.flex.items-center] children)
      (conj
       [:div.hide-child
        [:div.flex.dim.light-silver.pointer.f7.child
         [:div
          {:on-click remove}
          "remove"]
         (into
          [:select
           {:value     (name ((:dispatch-fn root) ent))
            :on-change #(let [opt-kw (-> % .-target .-value keyword)]
                          (root :transact [[:set (assoc ent :type opt-kw)]]))}]
          (map (fn [x] [:option {:value x} x]))
          ["todo-item" "toggle-list"])]])))

(root :view :button
  (fn [{:as ent :keys [markup handlers]}]
    [:button.f6.link.dim.br2.ba.ph2.pv1.dib.black
     handlers (first markup)]))

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

(root :view :toggle-list
  (fn [{:as ent :keys [id markup content-ui open?]}]
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
       open? (conj content-ui))]))

(root :view :nav
  (fn [{:as ent :keys [content-ui routes]}]
    [:div
     [:nav.db.dt-l.w-100.border-box.pa3.ph5-l
      (subs (str (.getTime (js/Date.))) 9)
      (into
       [:div.db.dtc-l.v-mid.w-100.w-75-l.tc.tr-l]
       (map
        (fn [[k v]]
          [:a.link.dim.dark-gray.f6.f5-l.dib.mr3.mr4-l.fw5.pointer
           {;; with history enabled this breaks due to a bug in spec that
            ;; does not respect a nonconforming during unform
            :on-click #(root :transact [[:set (assoc ent :content v)]] {:history? false})}
           (name k)]))
       routes)]
     content-ui]))

(root :view :todo-item
  (fn
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
      ent]]))

(defn example-root []
  [root :render {:root-id 1}])
