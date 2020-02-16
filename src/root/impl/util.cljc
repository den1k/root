(ns root.impl.util
  (:require [expound.alpha :as exp]
            [clojure.spec.alpha :as s]
            [clojure.pprint :refer [pprint]]))

(defn- spec-pred [fail-exp spec-fn spec x]
  (let [ret (spec-fn spec x)]
    (if (= fail-exp ret)
      (let [expound-str (exp/expound-str spec x)]
        (#?(:clj  println
            :cljs js/console.error) expound-str)
        (throw (ex-info "Value doesn't match spec"
                        {:value   x
                         :spec    spec
                         :explain (s/explain-data spec x)})))
      ret)))

(defn conform! [spec x]
  (spec-pred ::s/invalid s/conform spec x))

(defn valid! [spec x]
  (when (spec-pred false s/valid? spec x)
    x))

(defn ensure-vec [x]
  (cond
    (vector? x) x
    (nil? x) []
    (sequential? x) (vec x)
    :else [x]))

(defn project
  ([f coll] (project {} f coll))
  ([to f coll] (into to (map f) coll)))

(defn make-id-gen [start]
  (let [current (atom start)]
    (fn [] (swap! current inc))))

(defn seek [pred coll]
  (some #(when (pred %) %) coll))

(defn pretty-str [x]
  (with-out-str (pprint x)))

(defn deep-merge
  "Merges data-structures recursively. For sequential colls, creates a union
  using the same type as the first data-structure"
  [& [x :as xs]]
  (cond
    (or (sequential? x) (set? x)) (into (empty x) cat (reverse xs))
    (map? x) (apply merge-with deep-merge xs)))

