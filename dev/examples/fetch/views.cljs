(ns examples.fetch.views
  (:require [root.impl.core :as rc]
            [uix.dom.alpha :as uix.dom]
            [kitchen-async.promise :as p]
            [xframe.core.alpha :as xf]
            [root.impl.util :as u]
            [examples.util.dom :as ud]))

(defn fetch-json [str]
  (p/some-> (js/fetch str)
            (.json)
            (js->clj :keywordize-keys true)))

(def root
  (rc/ui-root
   {:dispatch-fn  :type
    :content-keys [:content]
    :content-spec (fn [x] (get x :id))}))

(root :view :ordered-list
      (fn [{:keys [content content-ui title]}]
        [:div
         [:h2.pl2 title]
         [:ol content-ui]]))

(root :view "story"
      (fn [{:keys [title by url score]}]
        [:li.pa1.hover-bg-light-gray
         [:div [:div.dib [:a.link {:href url} [:span title]]] [:span (str " - " by)]]
         [:span.f6.gray score " points"]]))

(root :view "job"
      (fn [{:keys [title by score text]}]
        (let [title-hic [:div.dib title " - " by]]
          [:li.pa1.bg-light-yellow
           [:div.flex.items-center
            (if-not text
              title-hic
              [:details
               [:summary.outline-0 title-hic]
               [:div.ph3.pt2 {:dangerouslySetInnerHTML {:__html text}}]])
            [:span.ph2.pv1.ml2.code.self-center.bg-light-gray.ba.br2
             {:style {:font-size "0.7rem"}}
             "job"]]
           [:span.f6.gray score " points"]])))

(defn render-example []
  (p/let
   [pdata (fetch-json "https://hacker-news.firebaseio.com/v0/topstories.json")
    top-50 (take 50 pdata)
    items (p/all
           (mapv
            (comp fetch-json
                  #(str "https://hacker-news.firebaseio.com/v0/item/" % ".json"))
            top-50))]
   (uix.dom/render
    [ud/example
     {:title
      "Hackernews Reader"
      :details
      [:<>
       [:a.b.black {:href "https://github.com/den1k/root/blob/master/dev/examples/fetch/views.cljs"}
        [:div.mt2 "source"]]
       [:p "This example fetches posts and details from Hackernews' API and passes
       the data to root to render."]]
      :root
      [root :render
       {:data {:type    :ordered-list
               :title   (str "Top " (count items) " Posts")
               :content (vec items)}}]}]
    (. js/document (getElementById "app")))))
