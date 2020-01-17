(ns root.impl.util
  (:require [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(defn conform! [spec x]
  (let [ret (s/conform spec x)]
    (if (= ret ::s/invalid)
      (do
        #_(js/console.error (s/explain-str spec x))
        (throw
         (ex-info "Value doesn't match spec"
                  {:value        x
                   :spec         spec
                   :explain-data (s/explain-data spec x)})))
      ret)))

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
