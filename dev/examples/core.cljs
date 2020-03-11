(ns examples.core
  (:require
   [uix.dom.alpha :as uix.dom]
   ;[examples.rich-document.views :refer [render-fn]]
   ;[examples.minimal.views :refer [render-fn]]
   ;[examples.fetch.views :refer [render-fn]]
   [examples.nested.views :refer [render-fn]]
   ;[examples.spec-dispatch.views :refer [render-fn]]
   ))



(defn start []
  ;(fetch/render-example)
  (render-fn
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
