(ns examples.fetch.views
  (:require [root.impl.core :as rc]
            [kitchen-async.promise :as p]
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

(root :view :loading
  (fn [{:keys [markup]}]
    [:<>
     [:h1 "Loading..."]
     [:span markup]]))

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

(def data-promise
  (p/let
    [pdata  (fetch-json "https://hacker-news.firebaseio.com/v0/topstories.json")
     top-50 (take 50 pdata)
     items  (p/all
             (mapv
              (comp fetch-json
                    (fn [post-id]
                      (str "https://hacker-news.firebaseio.com/v0/item/" post-id ".json")))
              top-50))]
    {:type    :ordered-list
     :title   (str "Top " (count items) " Posts")
     :content (vec items)}))

(defn ^:export example-root []
  [ud/example
   {:title
    "Hackernews Reader (implicit promise resolve)"
    :source
    "https://github.com/den1k/root/blob/master/dev/examples/fetch/views.cljs"
    :open-details?
    true
    :details
    [:<>
     [:p "This root is passed a promise that pulls hackernews data under the
        " [:code.red ":data"] " key.
        The promise is implicitly resolved by root's resolver and passed
        to root to render."]
     [:div "The root is also passed a loading state"
      [:div.pv1
       [ud/pretty-code-block
        {:loading {:type   :loading
                   :markup "Your favorite posts"}
         :promise '<data-promise>}]]
      [:span.f6.silver "(if you don't see it try throttling your network in devtools)"]]]
    :root
    [root :resolve {:data {:loading {:type   :loading
                                     :markup "Your favorite posts"}
                           :promise data-promise}}]}])
