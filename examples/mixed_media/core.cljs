(ns mixed-media.core
  (:require [root.impl.core :as rc]
   ;[rich-document.mock-data :as mock-data]
   ;[den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [root.impl.util :as u]
            [root.impl.resolver :as rr]
            [reagent.core :as r]
            [clojure.string :as str]))

(def data
  [{:id 1 :type :container :content [2 3 4]}
   {:id 2 :type :span :markup "content 2"}
   {:id 3 :type :span :markup "content 3"}
   {:id 4 :type :span :markup "content 4"}])

(reset! rc/state (u/project rc/ent->ref+ent data))

(def root (rc/ui-root
           {:ent->ref       rc/ent->ref
            :lookup         rc/lookup
            :ent->view-name :type
            :transact       rc/transact
            :add-id         rc/add-id}))

(defmethod root :container
  [{:keys [views]}]
  (let [container (js/document.createElement "div")]
    (doseq [v views]
      (.appendChild container v))
    container))

(defmethod root :span
  [{:keys [markup]}]
  (let [span (js/document.createElement "span")]
    (set! (.-innerHTML span) markup)
     span))

(defn example-root [id]
  (doto (rr/resolved-view root {:root-id id})
    #_js/console.log))

(defn render-example []
  (let [node (.getElementById js/document "app")]
    (set! (.-innerHTML node) nil)
    (.appendChild node (example-root 1))))

#_(global-shortcuts {"cmd+z"       #(root :transact [[:undo]] {:history? false})
                     "cmd+shift+z" #(root :transact [[:redo]] {:history? false})})
