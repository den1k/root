(ns fetch.views
  (:require [root.impl.core :as rc]
            [uix.dom.alpha :as uix.dom]
            [kitchen-async.promise :as p]
            [xframe.core.alpha :as xf]
            [root.impl.util :as u]))

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
    [:li.pa1.bg-light-yellow
     [:div.flex.items-center
      [:details
       [:summary.outline-0 [:div.dib [:span title]] [:span (str " - " by)]]
       [:div.ph3.pt2 {:dangerouslySetInnerHTML {:__html text}}]]
      [:span.ph2.pv1.ml2.code.self-center.bg-silver.br2.white
       {:style {:font-size "0.7rem"}}
       "job"]]
     [:span.f6.gray score " points"]]))

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
    [root :render
     {:data {:type    :ordered-list
             :title   (str "Hackernews Top " (count items))
             :content (vec items)}}]
    (. js/document (getElementById "app")))))
