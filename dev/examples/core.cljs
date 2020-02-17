(ns examples.core
  (:require
   [uix.dom.alpha :as uix.dom]
   ;[examples.rich-document.views :refer [example-root]]
   [examples.minimal.views :refer [example-root]]
   ;[examples.fetch.views :refer [example-root]]
   ;[examples.nested.views :refer [example-root]]
   ;[examples.spec-dispatch.views :refer [example-root]]
   ))



(defn start []
  ;(fetch/render-example)
  (uix.dom/render
   [example-root]
   (. js/document (getElementById "app"))))

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))
