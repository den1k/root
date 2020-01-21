(ns debug.core
  (:require [root.impl.core :as rc]
            [root.impl.util :as u]
            [root.impl.resolver :as rr]
            [reagent.core :as r]
            [uix.dom.alpha :as uix.dom]
            [xframe.core.alpha :as xf]
            [xframe.core.adapton :as adapton]
            [uix.core.alpha :as uix]))

(def entity-actions {})

(def mock-data
  [{:id 1 :type :container :content [11 12]}
   {:id 11 :type :debug-test :markup ["debug test"]}
   {:id 12 :type :debug-test :markup ["debug test 2"]}])

(xf/reg-sub :get
            (fn [k]
              (get (xf/<- [::xf/db]) k)))

(xf/reg-event-db :db/init
                 (fn [_ _]
                   {1  {:id 1, :type :container, :content [2]},
                    2  {:id 2, :type :container, :content [11 12]}
                    11 {:id 11, :type :debug-test, :markup ["debug test"]},
                    12 {:id 12, :type :debug-test, :markup ["debug test 2"]}}))

(xf/reg-event-db :assoc-in
                 (fn [db [_ ks v]]
                   (assoc-in db ks v)))

(defn lookup [id]
  ;(get @xf/db id)
  (xf/<sub [:get id]))

(def root (rc/ui-root
           {:ent->ref       rc/ent->ref
            :invoke-fn      (fn invoke [f x]
                              ^{:key (rc/ent->ref x)}
                              [f x])
            :lookup         lookup
            :ent->view-name :type
            :transact       rc/transact
            :entity-actions entity-actions
            :add-id         rc/add-id}))


(defn example-root [id]
  (js/console.log :RUN)
  ;(rr/resolved-view root {:root-id id})
  [rr/resolved-view root {:root-id id}]
  )


(defn render-example []
  (
    uix.dom/render
   ;r/render

   ;[rr/resolved-view root {:root-id 1}]
   [rr/resolved-view root {:root-id 1}]
   ;[root (get @xf/db 1)]
   (. js/document (getElementById "app"))))
(comment

 (js/console.log (rr/resolved-view root {:root-id 1}))
 )

(root :view :container
      (fn [{:as ent :keys [id views]}]
        (js/console.log :rendered ent)
        (into [:div.ba.pa2.green
               "Container id: " id] views)))

(root :view :debug-test
      (fn [{:as ent :keys [parent-id id markup]}]
        (js/console.log :rendered ent)
        [:div.ba.pa2.red
         [:button
          {:on-click #(do
                        #_(xf/dispatch [:assoc-in [id :markup] [(str (rand-int 1000))]])
                        (xf/dispatch [:assoc-in [13] {:id 13, :type :debug-test, :markup ["debug test 3"]}])
                        (xf/dispatch [:assoc-in [parent-id :content]
                                      [11 12 13]])
                        #_(swap! debug-state assoc-in [id :markup] [(str (rand-int 1000))])
                        #_(xf/notify-listeners!))}
          "Click me"]
         "Debug test id: " id
         (into [:div "Markup "]
               (map (fn [m] [:span.pr1 m]))
               markup)]))

(defonce _ (xf/dispatch [:db/init]))


#_(xf/dispatch [:assoc-in [2 :content]
                [11 12 13]])
