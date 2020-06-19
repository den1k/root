(ns root.impl.core-test
  (:require [clojure.test :refer :all])
  (:require [root.impl.core :as r :refer :all]))

(def test-root
  (ui-root
   {:->ref          :id
    :dispatch-fn    :type
    :entity-spec    (fn [x] (:type x))
    :ref-spec       integer?
    :->content-keys (constantly [:content])}))

(deftest normalize-test
  (is (= (normalize test-root {:id 1 :type :foo})
         {1 {:id 1 :type :foo}}))

  (is (= (normalize test-root {:id 1 :type :foo :content {:id 10 :type :bar}})
         {1  {:id 1 :type :foo :content 10}
          10 {:id 10 :type :bar}}))

  (is (= (normalize test-root
                    {:id 1 :type :foo :content [{:id 10 :type :bar}
                                                {:id 11 :type :baz}]})
         {1  {:id 1 :type :foo :content [10 11]}
          10 {:id 10 :type :bar}
          11 {:id 11 :type :baz}}))

  (is (= (normalize test-root
                    {:id 1 :type :foo :content {:fang {:id 10 :type :bar}}})
         {1  {:id 1 :type :foo :content {:fang 10}}
          10 {:id 10 :type :bar}}))

  (is (= (normalize test-root
                    {:id      1
                     :type    :foo
                     :content {:fang [{:id 10 :type :bar}
                                      {:id 11 :type :baz}]}})
         {1  {:id 1 :type :foo :content {:fang [10 11]}}
          10 {:id 10 :type :bar}
          11 {:id 11 :type :baz}}))

  (is (= (normalize test-root
                    {:id      1
                     :type    :foo
                     :content {:fang [{:id 10 :type :bar}
                                      {:id 11 :type :baz}]}})
         {1  {:id 1 :type :foo :content {:fang [10 11]}}
          10 {:id 10 :type :bar}
          11 {:id 11 :type :baz}}))

  (is (= (normalize test-root
                    {:id      1
                     :type    :foo
                     :content [{:id 10 :type :bar :content {:id 100 :type :bang :and :more}}
                               {:id 11 :type :baz :content {:id 100 :type :bang}}]})
         {1   {:id 1 :type :foo :content [10 11]}
          10  {:id 10 :type :bar :content 100}
          100 {:id 100 :type :bang}
          11  {:id 11 :type :baz :content 100}})
      "Last seen entity wins"))
