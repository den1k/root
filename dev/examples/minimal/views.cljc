(ns examples.minimal.views
  (:require [root.impl.core :as rc]
            [examples.util.dom :as ud]))

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

(defn ^:export example-root []
  [ud/example
   {:title
    "Minimal Example (with Default View)"
    :source
    "https://github.com/den1k/root/blob/master/dev/examples/minimal/views.cljc"
    :open-details?
    true
    :details
    [:<>
     [:p
      "This root only defines one view for " [:code.red ":profile-pic"]
      ". However the root's " [:code.ph1.b--red.ba "default-view"] " assures
      that the data is traversed and rendered properly in the absence of
      defined views."]
     [:p "For data lookups this example uses the following hash-map
     as a graph:"]
     [ud/pretty-code-block data]
     [:p "The root config looks like this:"]
     [ud/code-block
      "{:lookup       lookup
 :dispatch-fn  :type
 :content-keys [:content]
 :content-spec integer?}"]
     [:p "where " [:code.red "lookup"] " is simply " [:code "#(get data %)"]]]
    :root
    [root :render {:root-id 1}]}])
