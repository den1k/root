(ns root.impl.entity
  (:require [cljs.spec.alpha :as s]))

(s/def ::id integer?)
(s/def ::type keyword?)
(s/def ::markup (s/coll-of string?))

(s/def ::ref integer?)
(s/def ::refs (s/coll-of ::ref))
(s/def ::refs-map (s/map-of keyword? (s/or :ref ::ref :refs ::refs)))
(s/def ::content (s/or :ref ::ref :refs ::refs :refs-map ::refs-map))

(s/def ::attrs map?)

(s/def ::partial-entity (s/keys :opt-un [::id ::type ::content ::markup ::attrs]))
(s/def ::entity
  (s/nonconforming
   (s/keys :req-un [::id] :opt-un [::type ::content ::markup ::attrs])))
