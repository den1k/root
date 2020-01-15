(ns rich-document.core
  (:require [root.impl.core :as rc]
            [rich-document.mock-data :as mock-data]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [root.impl.util :as u]
            [reagent.core :as r]))

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

;(reset! rc/state (u/project rc/ent->ref+ent mock-data/data))
(rc/set-state (u/project rc/ent->ref+ent mock-data/data))
;(reset! rc/state )

(def root (rc/ui-root
           {:ent->ref       rc/ent->ref
            :invoke-fn      (fn invoke [f x] ^{:key (rc/ent->ref x)} [f x])
            :lookup         rc/lookup
            :ent->view-name (fn [x] (or (:view x) (:type x)))
            :transact       rc/transact
            :entity-actions entity-actions
            :add-id         rc/add-id}))

(global-shortcuts {"cmd+z"       #(root :transact [[:undo]] {:history? false})
                   "cmd+shift+z" #(root :transact [[:redo]] {:history? false})})
