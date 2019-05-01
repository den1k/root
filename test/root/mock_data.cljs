(ns root.mock-data
  (:require [root.impl.util :as u]
            [root.impl.mock-data :as md]))

(def id-gen (u/make-id-gen 1000))
(defn add-id [ent] (assoc ent :id (id-gen)))

(def data
  ; use hardcoded same data for now
  ; move over here later to keep in tests
  md/data)

(def entity-actions
  {:global
   {:undo [[:undo]]
    :redo [[:redo]]}})

(defn ->ref [ent]
  (:id ent))

(defn ref+ent-tuple [ent]
  [(->ref ent) ent])

(def state
  (u/project ref+ent-tuple data))

(defn lookup [id] (get state id))
