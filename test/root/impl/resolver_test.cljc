(ns root.impl.resolver-test
  (:require
   [clojure.test :refer [deftest is are testing use-fixtures]]
   [root.impl.core :as rc]
   [root.impl.resolver :as rr]
   [root.mock-data :as mock]))

(def test-root
  (rc/ui-root
   {:->ref          mock/->ref
    :lookup         mock/lookup
    :dispatch-fn    (fn [x] (or (:view x) (:type x)))
    ;; overwrite for testing
    :transact       (constantly ::transacted)
    :entity-actions mock/entity-actions
    :add-id         mock/add-id
    :invoke-fn      (fn [_ ent]
                      ;; TEST only: ignore component fn, return entity
                      ent)}))


(deftest resolver-test
  (let [resolved-10        {:id    10,
                            :content [11 12]
                            :views [{:id        11,
                                     :type      :button,
                                     :markup    ["undo"],
                                     ;:handlers  {:on-click [:global :undo]},
                                     :parent-id 10,
                                     :path      [10 :content 0]}
                                    {:id        12,
                                     :type      :button,
                                     :markup    ["redo"],
                                     ;:handlers  {:on-click [:global :redo]},
                                     :parent-id 10,
                                     :path      [10 :content 1]}]}

        ignored-keys       [:handlers :actions]
        dissoc-ignored     #(apply dissoc % ignored-keys)
        sans-ignored-keys= (fn [a b]
                             (= (apply dissoc a ignored-keys)
                                (apply dissoc b ignored-keys)))]

    (are [ent resolved] (sans-ignored-keys= ent resolved)

      (get mock/state 3)
      (rr/resolved-view test-root {:root-id 3})

      resolved-10
      (update (rr/resolved-view test-root {:root-id 10})
              :views
              #(mapv dissoc-ignored %))

      (get-in resolved-10 [:views 0])
      (get-in (rr/resolved-view test-root {:root-id 10}) [:views 0]))))
