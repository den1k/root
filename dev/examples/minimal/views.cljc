(ns examples.minimal.views
  (:require [root.impl.core :as rc]
            [uix.dom.alpha :as uix.dom]))

(def data
  {1 {:type       :user
      :first-name "Eva"
      :last-name  "Luator"
      :content    {:profile-pic 3
                   :address     2}}
   2 {:type   :address
      :street "1 Long Infinite Loop"}
   3 {:type :profile-pic
      :src  "https://picsum.photos/id/1005/200"}})

(defn lookup [x]
  (get data x))

(def root
  (rc/ui-root
   {:lookup       lookup
    :dispatch-fn  :type
    :content-keys [:content]
    :content-spec integer?}))

(root :view :profile-pic
  (fn [{:keys [src]}]
    [:img.br-100 {:src src}]))

(defn example-root []
  [root :render {:root-id 1}])

(defn render-example []
  (uix.dom/render
   [root :render {:root-id 1}]
   (. js/document (getElementById "app"))))
