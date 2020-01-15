(ns debug.core
  (:require [root.impl.core :as rc]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [root.impl.util :as u]
            [reagent.core :as r]
            [root.impl.resolver :as rr]))

(def entity-actions {})

(def mock-data
  [{:id 1 :type :container :content [11 12]}
   {:id 11 :type :debug-test :markup ["debug test"]}
   {:id 12 :type :debug-test :markup ["debug test 2"]}])

(reset! rc/state (u/project rc/ent->ref+ent mock-data))

(def debug-state (r/atom {1  {:id 1, :type :container, :content [2]},
                          2  {:id 2, :type :container, :content [11 12]}
                          11 {:id 11, :type :debug-test, :markup ["debug test"]},
                          12 {:id 12, :type :debug-test, :markup ["debug test 2"]}}))

(def root (rc/ui-root
           {:ent->ref       rc/ent->ref
            :invoke-fn      (fn invoke [f x]
                              ^{:key (rc/ent->ref x)} [f x])
            :lookup         (fn [x] (get @debug-state x)) #_(do @(r/cursor debug-state [%]))
            :ent->view-name (fn [x] (or (:view x) (:type x)))
            :transact       rc/transact
            :entity-actions entity-actions
            :add-id         rc/add-id}))

(defn example-root [id]
  (js/console.log :RUN)
  (doto
   (rr/resolved-view root {:root-id id})
    #_(rr/resolver-chain {:root    root
                          :root-id id})

    #_js/console.log))
;(rr/resolved-view root {:root-id 1})

(defn debug-text-view [id]
  (js/console.log :rendering id)
  (into
   [:div
    {:on-click #(swap! debug-state assoc-in [id :markup] [(str (rand-int 1000))])}]
   @(r/cursor debug-state [id :markup])))

(defn alternate-root []
  (js/console.log "rendering alternate root")
  [:div
   [debug-text-view 11]
   [debug-text-view 12]
   ])

(defn render-example []
  (r/render [example-root 1]
            (. js/document (getElementById "app"))))

(defmethod root :container
  [{:as ent :keys [id views]}]
  (js/console.log :rendered ent)
  (into [:div] views))

(defmethod root :debug-test
  [{:as ent :keys [id markup]}]
  (js/console.log :rendered ent)
  (into [:div
         {:on-click #(swap! debug-state assoc-in [id :markup] (str (rand-int 1000)))}]
        markup))
