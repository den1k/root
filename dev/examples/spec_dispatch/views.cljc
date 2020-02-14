(ns examples.spec-dispatch.views
  (:require [root.impl.core :as rc]
            [clojure.spec.alpha :as s]
            [clojure.test.check.generators]
            [clojure.string :as str]
            [examples.util.dom :as ud]))

(s/def ::email (s/with-gen (s/and string? #(str/includes? % "@"))
                           #(s/gen #{"foo@bar.com" "bar@baz.com"})))
(s/def ::first-name
  (s/with-gen (s/and string? not-empty)
              #(s/gen #{"Kelly" "George" "Jerry" "Adam" "Suzie" "John" "Steve"})))

(s/def ::last-name string?)

(s/def ::friends (s/coll-of ::user :gen-max 3))


(s/def ::street string?)
(s/def ::zip integer?)
(s/def ::state string?)
(s/def ::country string?)

(s/def ::address (s/keys :req-un [::street ::zip ::state ::country]))

(s/def ::user
  (s/keys :req-un [::email ::first-name ::last-name]
          :opt-un [::friends ::address]))

(s/def ::views
  (s/or :user ::user
        :address ::address))

(def data
  {:first-name "Eva"
   :last-name  "Luator"
   :email      "eva@luator.com"
   :friends    (map first (s/exercise ::user))
   :address    {:street  "100 8th Ave "
                :zip     10011
                :state   "NY"
                :country "United States"
                :open?   true}})

(def root
  (rc/ui-root
   {:dispatch-fn  #(first (s/conform ::views %))
    :content-keys [:address :friends]
    :content-spec ::views}))

(root :view :user
  (fn [{:keys [first-name last-name email friends-ui address-ui]}]
    [:div.pa1.ma3.bg-black-05.br2
     [:h1 first-name " " last-name]
     [:a.link {:href (str "mailto:" email)} email]
     address-ui
     (when friends-ui
       [:details
        [:summary "Show friends"]
        friends-ui])]))

(root :view :address
  (fn [{:keys [street zip country state open?]}]
    (let [addre-str (str/join " " [street state zip country])
          src-url   (str "https://maps.google.com/maps?q="
                         (js/encodeURI addre-str)
                         "&t=&z=13&ie=UTF8&iwloc=&output=embed")]
      [:div
       [:div.b "Address: " addre-str]
       [:details
        {:open open?}
        [:summary.outline-0 "Google Map"]
        [:iframe {:width         "600"
                  :height        "500",
                  :src           src-url
                  :frame-border  "0"
                  :scrolling     "no"
                  :margin-height "0"
                  :margin-width  "0"}]]])))


(defn example-root []
  [ud/example
   {:title
    "Clojure Spec Based Data Generation and Dispatch"
    :details
    [:<>
     [:a.b.black {:href "https://github.com/den1k/root/blob/master/dev/examples/spec_dispatch/views.cljc"}
      [:div.mt2 "source"]]
     [:p
      "Specs for User and Address are defined. Note that "
      [:code.red "::user"]
      " is a recursive
      spec in that it can have friends which are themselves users."]
     [:div
      [:h4.mb1 [:code.red "::user"] " spec"]
      [ud/pretty-code-block (s/form ::user)]]
     [:div
      [:h4.mb1 [:code.red "::address"] " spec"]
      [ud/pretty-code-block (s/form ::address)]]
     [:p
      "There's also a "
      [:code.red "::views"]
      " spec that is used in the dispatch function"]
     [:div
      [:h4.mb1 [:code.red "::views"] " spec"]
      [ud/pretty-code-block (s/form ::views)]
      [:h4.mb1 [:code.red "root"] " config"]
      [ud/code-block
       "(def root
   (rc/ui-root
    {:dispatch-fn  #(first (s/conform ::views %)) ; <- spec dispatch
     :content-keys [:address :friends]
     :content-spec ::views}))"]]
     ]
    :root [root :render {:data data}]}])
