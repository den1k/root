(ns examples.docs
  (:require
   [uix.dom.alpha :as uix.dom]
   [examples.minimal.views]
   ;[examples.rich-document.views]
   [examples.fetch.views]
   [examples.nested.views]
   [examples.spec-dispatch.views]))

(defn ^:export render [c]
  (uix.dom/render
   [c]
   (. js/document (getElementById "app"))))
