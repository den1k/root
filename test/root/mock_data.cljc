(ns root.mock-data
  (:require [root.impl.util :as u]))

(def id-gen (u/make-id-gen 1000))
(defn add-id [ent] (assoc ent :id (id-gen)))

(def data
  [{:id 1 :type :container :content [103]}
   {:id 103 :type :nav :routes {:home 101 :about 102} :content 101}
   {:id 101 :type :home :content [10 2]}
   {:id 102 :type :about :markup ["OTHER STUFF"]}
   {:id      2 :type :todo-list :view :toggle-list :markup ["Shopping List"]
    :open?   true
    :content [6 3 4 5]}
   {:id 3 :type :todo-item :markup ["Buy Bananas \uD83C\uDF4C️"]}
   {:id 4 :type :todo-item :markup ["Buy strawberries"]}
   {:id 5 :type :todo-item :checked? true :markup ["Buy Cabbage"]}
   {:id 6 :type :button :markup ["New Todo"] :handlers {:on-click [:todo-item :add]}}
   {:id 10 :content [11 12]}
   {:id 11 :type :button :markup ["undo"] ;:handlers {:on-click [:global :undo]}
    }
   {:id 12 :type :button :markup ["redo"] ; :handlers {:on-click [:global :redo]}
    }])

(def entity-actions
  {:global
   {:undo [[:undo]]
    :redo [[:redo]]}})

(defn ->ref [ent]
  (:id ent))

(defn ref+ent-tuple [ent]
  [(->ref ent) ent])

(def state
  (u/project ref+ent-tuple data))

(defn lookup [id] (get state id))
