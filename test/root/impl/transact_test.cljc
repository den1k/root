(ns root.impl.transact-test
  (:require [clojure.test :refer :all]
            [root.impl.transact :refer :all]))

(def test-root
  (root.impl.core/ui-root
   {:->ref          :id
    :dispatch-fn    :type
    :transact       transact
    :state          xframe.core.alpha/db
    :entity-spec    (fn [x] (:id x))
    :ref-spec       integer?
    :->content-keys (constantly [:content])}))

(deftest add-one-test
  (is (= (run-txs test-root {1 {:id 1 :foos [2]}} [[:add [1 :foos] {:id 3 :foo :bar}]])
         {1 {:id 1, :foos [2 3]}, 3 {:id 3, :foo :bar}})))

(deftest add-many-test
  (is (= (run-txs test-root
                  {1 {:id 1 :foos [2]}}
                  [[:add [1 :foos] [{:id 3 :foo :bar}
                                    {:id 4 :foo :bar}]]])
         {1 {:id 1, :foos [2 3 4]},
          3 {:id 3, :foo :bar}
          4 {:id 4, :foo :bar}})))

(deftest set-one-test
  (is (= (run-txs test-root
                  {1 {:id 1 :foos [2]}}
                  [[:set {:id 1 :foos :bar}]])
         {1 {:id 1, :foos :bar}})))

(deftest set-many-test
  (is (= (run-txs test-root
                  {1 {:id 1 :foos [2]}}
                  [[:set [{:id 1 :foos :bar}
                          {:id 3 :baz :bat}]]])
         {1 {:id 1, :foos :bar}
          3 {:id 3 :baz :bat}})))

(deftest remove-content-only-one
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}}
                  [[:remove {:id 2}]])
         {1 {:id 1 :foos 2}}))
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}}
                  [[:remove {:id 100000000}]])
         {1 {:id 1 :foos 2}
          2 {:id 2}})
      "state unchanged if ref does not exist"))

(deftest remove-content-only-many
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}
                   3 {:id 3}}
                  [[:remove [{:id 2} {:id 3}]]])
         {1 {:id 1 :foos 2}})))

(deftest remove-path-only
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}}
                  [[:remove [1 :foos]]])
         {1 {:id 1}
          2 {:id 2}})))

(deftest remove-path-and-content-one
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}}
                  [[:remove [1 :foos] {:id 2}]])
         {1 {:id 1}
          2 {:id 2}}))
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 2}
                   2 {:id 2}}
                  [[:remove [1 :foos] {:id 100000000000}]])
         {1 {:id 1 :foos 2}
          2 {:id 2}})
      "state unchanged if ref does not exist"))

(deftest remove-path-and-content-many-and-one-st
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 4}
                   2 {:id 2}
                   3 {:id 3}}
                  [[:remove [1 :foos] [{:id 2} {:id 3}]]])
         {1 {:id 1 :foos 4}
          2 {:id 2}
          3 {:id 3}})
      "state unchanged if refs do not exist")
  (is (= (run-txs test-root
                  {1 {:id 1 :foos 4}
                   2 {:id 2}
                   3 {:id 3}}
                  [[:remove [1 :foos] [{:id 2} {:id 3} {:id 4}]]])
         {1 {:id 1}
          2 {:id 2}
          3 {:id 3}})
      "removes matching ref"))

(deftest remove-path-and-content-many-and-many-st
  (is (= (run-txs test-root
                  {1 {:id 1 :foos [2 3 4 5]}
                   2 {:id 2}
                   3 {:id 3}}
                  [[:remove [1 :foos] [{:id 2} {:id 3}]]])
         {1 {:id 1 :foos [4 5]}
          2 {:id 2}
          3 {:id 3}})
      "removes all matching refs"))

(deftest remove-path-and-content-one-and-many-st
  (is (= (run-txs test-root
                  {1 {:id 1 :foos [2 3 4 5]}
                   2 {:id 2}
                   3 {:id 3}}
                  [[:remove [1 :foos] {:id 3}]])
         {1 {:id 1 :foos [2 4 5]}
          2 {:id 2}
          3 {:id 3}})))

;; add <> remove
;; set <> delete
