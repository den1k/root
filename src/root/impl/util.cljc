(ns root.impl.util
  (:require [expound.alpha :as exp]
            [clojure.spec.alpha :as s]
            [clojure.pprint :refer [pprint]])
  (:refer-clojure :exclude [partial] :rename {partial clj-partial}))

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

#?(:cljs
   (deftype PartialFn [pfn f args]
     Fn
     IFn
     (-invoke [_]
       (pfn))
     (-invoke [_ a]
       (pfn a))
     (-invoke [_ a b]
       (pfn a b))
     (-invoke [_ a b c]
       (pfn a b c))
     (-invoke [_ a b c d]
       (pfn a b c d))
     (-invoke [_ a b c d e]
       (pfn a b c d e))
     (-invoke [_ a b c d e f]
       (pfn a b c d e f))
     (-invoke [_ a b c d e f g]
       (pfn a b c d e f g))
     (-invoke [_ a b c d e f g h]
       (pfn a b c d e f g h))
     (-invoke [_ a b c d e f g h i]
       (pfn a b c d e f g h i))
     (-invoke [_ a b c d e f g h i j]
       (pfn a b c d e f g h i j))
     (-invoke [_ a b c d e f g h i j k]
       (pfn a b c d e f g h i j k))
     (-invoke [_ a b c d e f g h i j k l]
       (pfn a b c d e f g h i j k l))
     (-invoke [_ a b c d e f g h i j k l m]
       (pfn a b c d e f g h i j k l m))
     (-invoke [_ a b c d e f g h i j k l m n]
       (pfn a b c d e f g h i j k l m n))
     (-invoke [_ a b c d e f g h i j k l m n o]
       (pfn a b c d e f g h i j k l m n o))
     (-invoke [_ a b c d e f g h i j k l m n o p]
       (pfn a b c d e f g h i j k l m n o p))
     (-invoke [_ a b c d e f g h i j k l m n o p q]
       (pfn a b c d e f g h i j k l m n o p q))
     (-invoke [_ a b c d e f g h i j k l m n o p q r]
       (pfn a b c d e f g h i j k l m n o p q r))
     (-invoke [_ a b c d e f g h i j k l m n o p q r s]
       (pfn a b c d e f g h i j k l m n o p q r s))
     (-invoke [_ a b c d e f g h i j k l m n o p q r s t]
       (pfn a b c d e f g h i j k l m n o p q r s t))
     (-invoke [_ a b c d e f g h i j k l m n o p q r s t rest]
       (apply pfn a b c d e f g h i j k l m n o p q r s t rest))
     IEquiv
     (-equiv [_ ^clj other]
       (and (instance? PartialFn other)
         (= f (.-f other))
         (= args (.-args other))))
     IHash
     (-hash [_] (hash [f args]))))

(defn partial
  "Works just like clojure.core/partial, but the result can be compared with ="
  [f & args]
  #?(:cljs
     (->PartialFn (apply clj-partial f args) f args)))