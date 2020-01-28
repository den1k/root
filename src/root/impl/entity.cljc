(ns root.impl.entity
  (:require [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]
            [#?(:clj  clojure.core
                :cljs cljs.core) :as core]
            [root.impl.util :as u]))

(s/def ::id integer?)
(s/def ::type keyword?)
(s/def ::markup (s/coll-of string?))

(s/def ::ref integer?)
(s/def ::refs-coll (s/coll-of ::ref))
(s/def ::refs-map (s/map-of keyword? (s/or :ref ::ref :refs ::refs-coll)))
(s/def ::refs (s/or :ref ::ref :refs ::refs-coll :refs-map ::refs-map))
(s/def ::content ::refs)

(s/def ::attrs map?)

(s/def ::partial-entity
  (s/keys :opt-un [::id ::type ::content ::markup ::attrs]))

(s/def ::entity
  (s/nonconforming
   (s/keys :req-un [::id] :opt-un [::type ::content ::markup ::attrs])))
