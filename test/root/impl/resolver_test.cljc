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
    :entity-spec    map?
    :ref-spec       integer?
    :->content-keys (constantly [:content])
    :invoke-fn      (fn [_ ent]
                      ;; TEST only: ignore component fn, return entity
                      ent)}))

(deftest resolver-test
  (let [resolved-10 {:id         10,
                     :content    [11 12]
                     :content-ui [:<>
                                  {:id        11,
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
                                   :path      [10 :content 1]}]}]

    (is (= (assoc (get mock/state 3) :path [3])
           (rr/resolved-data test-root {:root-id 3})))

    (is (= (assoc resolved-10 :path [10])
           (rr/resolved-data test-root {:root-id 10})))

    (is (= (get resolved-10 :content-ui)
           (get (rr/resolved-data test-root {:root-id 10}) :content-ui)))))
