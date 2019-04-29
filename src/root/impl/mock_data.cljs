(ns root.impl.mock-data)

(def data
  [{:id 1 :type :container :content [103]}
   {:id 103 :type :nav :routes {:home 101 :about 102} :content 101}
   {:id 101 :type :home :content [10 2 200]}
   {:id 102 :type :about :markup ["OTHER STUFF"]}
   {:id      2 :type :todo-list :view :toggle-list :markup ["Shopping List"]
    :open?   true
    :content [6 3 4 5]}
   {:id 3 :type :todo-item :markup ["Buy Bananas \uD83C\uDF4C️"]}
   {:id 4 :type :todo-item :markup ["Buy strawberries"]}
   {:id 5 :type :todo-item :checked? true :markup ["Buy Cabbage"]}
   {:id 6 :type :button :markup ["New Todo"] :handlers {:on-click [:todo-item :add]}}
   {:id 7 :type :button :markup ["New Todo"] :handlers {:on-click [[:add
                                                                    [:<- :content :items]
                                                                    {:type :todo-item :active? true :markup ["New Todo"]}]]}}
   {:id 10 :content [11 12]}
   {:id 11 :type :button :markup ["undo"] :handlers {:on-click [:global :undo]}}
   {:id 12 :type :button :markup ["redo"] :handlers {:on-click [:global :redo]}}

   {:id      200 :type :todo-list :markup ["Shopping List"]
    :open?   true
    :content {:button 7
              :items  [3 4 5]}}])
