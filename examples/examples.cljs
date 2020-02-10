(ns examples
  (:require
   [rich-document.views :as rich-doc]
   ;[nested.views :as nested-views]
            ;[debug.core :as debug-example]
   #_[mixed-media.core :as mixed-media]))


(defn start []
  ;(mixed-media/render-example)
  ;(debug-example/render-example)
  (rich-doc/render-example)
  ;(nested.views/render-example)
  )

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))
