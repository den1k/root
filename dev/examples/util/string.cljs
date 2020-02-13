(ns examples.util.string
  (:refer-clojure :exclude [split-at]))

(defn split-at [n s]
  [(subs s 0 n) (subs s n)])
