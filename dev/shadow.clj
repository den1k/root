(ns shadow
  (:require [shadow.cljs.devtools.api :as shadow.api]
            [shadow.cljs.devtools.server :as shadow.server]
            [mount.core :as mount :refer [defstate]]))

(defstate shadow-web
  :start (do (shadow.server/start!)
             (shadow.api/watch :app))
  :stop (shadow.api/stop-worker :app))


(comment
 (mount/start)
 (mount/start #'shadow-web)
 (mount/stop)
 (mount/stop #'zeal.serve/server #'zeal.db/node #'zeal.db/_init-db)
 (mount/find-all-states)
 (mount/running-states)

 (shadow.api/repl :app)
 :cljs/quit

 (shadow.server/stop!)

 )

