(ns examples.rich-document.views
  (:require [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [examples.util.dom :as ud]
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
                      [:<- :content :items]
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :add-after      [[:add-after
                      {:type :todo-item :active? true :markup ["New Todo"]}]]
    :remove         [[:remove [:<- :content :items]]]
    :toggle-checked [[:toggle :checked?]]}})

(defn ent->ref [ent]
  (:id ent))

(def projected-data
  (u/project (fn [ent] [(ent->ref ent) ent]) mock-data/data))

(reset! rc/state projected-data)

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
                              ;(js/console.log :ent x)
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
    :keys            [id show-block-thumb? show-block-menu? path]
    {:keys [remove]} :actions}
   & children]
  (into [:div.flex.items-center
         {:on-mouse-enter
          (fn [e]
            (root :transact
              [[:set (assoc ent :show-block-thumb? true)]]
              {:history? false}))
          :on-mouse-leave
          (fn [e]
            (root :transact
              [[:set (assoc ent :show-block-thumb? false
                                :show-block-menu? false)]]
              {:history? false}))}
         [:div
          {:class (when-not show-block-thumb? "hide-child")}
          [:div.light-silver.pointer.f7.mr1.relative
           [:span.b.pa1.f6.br1.hover-bg-light-gray.child
            {:on-click #(root :transact
                          [[:set (assoc ent :show-block-menu? true)]]
                          {:history? false})}
            "::"]
           (when show-block-menu?
             (let [li-tag :li.pv2.ph3.b--light-silver.bb.hover-bg-light-gray]
               [:ul.list.pl0.ml0.center.mw6.bg-white.shadow-2.br2.dark-gray.absolute.z-1
                {:style {:top "-0.2rem"}}

                [li-tag
                 {:on-click remove}
                 "remove"]
                [li-tag
                 "Turn into"
                 (into
                  [:select
                   {:value     (name ((:dispatch-fn root) ent))
                    :on-change #(let [opt-kw (-> % .-target .-value keyword)
                                      ent    (assoc ent :type opt-kw
                                                        :show-block-menu? false)
                                      id     (+ 1000 (rand-int 10e4))]
                                  (root
                                    :transact
                                    (case opt-kw
                                      :todo-item
                                      [[:set (dissoc ent :view :content)]]
                                      :toggle-list
                                      [[:add
                                        [:<- :content :items]
                                        {:id id :type :todo-item :active? true :markup ["empty"]}]
                                       [:set (-> ent
                                                 (assoc :open? true)
                                                 (assoc-in [:content :items] [id]))]])))}]
                  (map (fn [x] [:option {:value x} x]))
                  ["todo-item" "toggle-list"])]]))]]]
        children))

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
    (let [{:keys [items button]} content-ui]
      [block ent
       (cond-> [:div
                [:div.flex.items-center.justify-between
                 [:div.flex
                  [:span.pointer.pl1.pv1
                   {:style    (merge
                               {:font-size   12
                                :line-height 1
                                :user-select :none}
                               (when open?
                                 {:transform        "rotate(90deg)"
                                  :transform-origin :center}))
                    :on-click #(root :transact [[:toggle :open? ent]])}
                   "▶"]
                  [input {} ent]]
                 button]]
         open? (conj items))])))

(root :view :nav
  (fn [{:as ent :keys [content-ui routes]}]
    [:div
     [:nav.db.dt-l.w-100.border-box.pa3.ph5-l
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

(defn ^:export example-root []
  [ud/example
   {:title
    "A Poor Person's Notion Clone in 200 LoC"
    :source
    "https://github.com/den1k/root/blob/master/dev/examples/rich_document/views.cljs"
    :open-details?
    true
    :details
    [:<>
     [:h3 "Baby Steps toward a Rich Document Editor"]
     [:b "Current Feature Set:"]
     [:ul
      [:li "Routing (click " [:i "home"] " or " [:i "about"] ")"]
      [:li "Undo/Redo through shortcuts or rendered buttons"]
      [:li "Context menus (hover over the todos or toggle-lists)"]
      [:li "Change " [:i.b "block"] " type (through context menu)"]
      [:li "Arbitrarily deep nesting of views (make toggle-lists inside toggle-lists)"]]
     [:hr]
     [:details.pb1
      {:open false}
      [:summary.outline-0.pointer "initial app-state"]
      [:div.pv1
       [ud/pretty-code-block 120 projected-data]]]
     [:div "From the initial app-state root recurses through " [:code.red ":content"]
      " keys, looks up the data, resolves components and renders the following UI:"]]
    :root
    [root :resolve {:root-id 1}]}])
