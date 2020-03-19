(ns examples.datascript.views
  (:require [root.impl.core :as rc]
            [reagent.core :as r]
            [reagent.dom :as rdom]
            [posh.reagent :refer [pull q posh!]]
            [datascript.core :as d]
            [react-markdown :as md]
            [clojure.string :as str]
            [examples.datascript.views.codemirror :refer [codemirror]]
            [examples.datascript.views.data :as data :include-macros true]))


(def schema
  {:current {:db/valueType :db.type/ref}
   :choices {:db/valueType   :db.type/ref
             :db/cardinality :db.cardinality/many}
   :content {:db/valueType   :db.type/ref
             :db/cardinality :db.cardinality/many}})

(defonce conn
  (let [conn (d/create-conn schema)]
    (posh! conn)
    (d/transact conn (data/data))
    conn))

(defn transact [txs]
  ;(js/console.log (with-out-str (cljs.pprint/pprint txs)))
  (d/transact conn txs))

(defn ->ref [x]
  (cond-> x
    (map? x) :db/id))

(defn assoc-transact [{:as ent id :db/id} & kwargs]
  (transact [(apply assoc {:db/id id} kwargs)]))

(defn lookup [x]
  (d/pull @conn '[*] (->ref x)))

(defn lookup-sub [x]
  (pull conn '[*] (->ref x)))

(def root
  (rc/ui-root
   {:lookup       lookup
    :lookup-sub   lookup-sub
    :dispatch-fn  :type
    :content-keys (keys schema)
    :content-spec #(boolean (and (map? %) (:db/id %)))}))

(def default-text "type something...")

(defn set-block-text [block-data text]
  (cond-> block-data
    (not (= default-text text)) (assoc :text text)))

(defn on-blur-handler [block-data text]
  (transact [(-> block-data
                 (assoc :active? false)
                 (set-block-text (str/trim text)))]))

(defn block-classes [{:as block-data :keys [db/id text active?]}]
  (when (and (not active?) (nil? text))
    :light-silver))

(defmulti block :content-type)

(defmethod block :rich-text
  [{:as m :keys [db/id text active?]}]
  [:div.w-100.outline-0.serif.pl1
   {:class
    (block-classes m)
    :on-blur
    (fn [e]
      (let [new-text (.. e -target -innerHTML)]
        (on-blur-handler m new-text)))
    :content-editable
    true
    :suppress-content-editable-warning
    true
    :dangerouslySetInnerHTML
    {:__html (or text default-text)}}])

(defmethod block :markdown
  [{:as m :keys [text active?]}]
  (if active?
    [:code.outline-0.w-100.f6.pl1
     {:ref
      (fn [nd] (when nd (.focus nd)))
      :style
      {:white-space :pre-wrap}
      :on-blur
      (fn [e]
        (on-blur-handler m (.. e -target -innerText)))
      :content-editable
      true
      :suppress-content-editable-warning
      true}
     (or text default-text)]
    [:div.root-markdown.pl1
     {:class
      (block-classes m)
      :on-click
      #(transact [(assoc m :active? true)])}
     [:> md {:source (or text default-text)}]]))

(defmethod block :code
  [{:as m :keys [db/id text active?]}]
  [codemirror
   {:value   (or text default-text)
    :class   [:f4]
    :style   {:flex-grow 1}
    :cm-opts {:on-blur #(on-blur-handler m (.getValue %))
              :theme   "duotone-light"}}])

(def default-unnamed "untitled")

(root :view :notebooks
  (fn [{:as block-data :keys [db/id name choices current current-ui]}]
    [:div
     [:div.flex.justify-between.align-center.ph3.pv2.shadow-1.fixed.w-100.bg-white.z-9999
      (into
       [:select.outline-0.bn.bg-light-gray
        {:value
         (:db/id current)
         :on-change
         (fn [e]
           (transact [(assoc block-data
                        :current
                        (js/parseInt (.. e -target -value)))]))}]
       (map (fn [id]
              (let [{:as item :keys [db/id name]} @(lookup-sub id)]
                [:option
                 {:value id}
                 (or name default-unnamed)])))
       choices)
      [:button
       {:class    "f6 dim br2 ba ph3 pv2 dib mid-gray pointer"
        :on-click #(transact [{:db/id   id
                               :choices {:db/id -1}
                               :current {:db/id -1}}
                              {:db/id -1
                               :type  :notebook}])}
       "New"]]
     [:div.pa3.pt5
      current-ui]]))

(defn content-editable
  [{:as m id :db/id}
   [tag
    {:as   opts
     :keys [text-key edit-flag-key default-text]
     :or   {text-key :name edit-flag-key :editing-name? default-text default-unnamed}}]]
  (let [{editing? edit-flag-key text text-key} m]
    (let [text (not-empty text)]
      [tag
       (merge
        {:class
         [(when-not editing? :truncate)
          (when-not (or text editing?) :light-silver)]
         :content-editable
         true
         :suppress-content-editable-warning
         true
         :on-focus
         #(assoc-transact m edit-flag-key true)
         :on-blur
         #(let [txt (str/trim (.. % -target -innerText))]
            (transact [(cond-> {:db/id id edit-flag-key false}
                         (not= txt default-text) (assoc :name txt))]))}
        (dissoc opts :default-text :text-key :edit-flag-key))
       (or text default-text)])))

(root :view :notebook
  (fn [{:as notebook :keys [db/id name content-ui]}]
    [:div
     {:style {:max-width :900px}}
     [content-editable notebook
      [:h1.outline-0.fw2.tc.mv3]]
     [:div.root-notebook content-ui]
     [:div.mv4.flex.justify-between
      [:div.w4]
      [:button.mr5
       {:class    "f6 pointer br2 ba ph3 pv2 dib bg-near-white mid-gray bn dim"
        :on-click #(transact [{:_content     id
                               :type         :block
                               :content-type :rich-text}])}
       "New Block"]]]))

(def content-types
  #{:code :markdown :rich-text})

(root :view :block
  (fn [{:as   block-data nm :name
        :keys [db/id content-type active? menu-active?]}]
    (let [ct-str (name content-type)]
      [:div.flex.mv2
       {:style {:min-height :5rem}}
       [:div.w4.flex.flex-column.mr1.hide-child.br.bw2
        {:class          (if active? :b--moon-gray :b--white)
         :style          {:flex-shrink 0}
         :on-mouse-over  #(assoc-transact block-data :menu-active? true)
         :on-mouse-leave #(assoc-transact block-data :menu-active? false)}
        [:<>
         [:div.flex.justify-between.mr1
          [content-editable block-data
           [:code.f6.outline-0.pr2.tracked-tight
            {:text-key      :name
             :edit-flag-key :editing-name?
             :default-text  "untitled"
             :style         {:word-break :break-word}}]]
          [:span.f6.gray [:span.b "["] [:span.f7 id] [:span.b "]"]]]
         (if-not menu-active?
           [:div.f7.i.light-silver.h1 ct-str]
           (into [:select.outline-0.bn.f7.w-80.h1
                  {:default-value ct-str
                   :on-change     (fn [e]
                                    (assoc-transact
                                     block-data
                                     :content-type
                                     (keyword (.. e -target -value))))}]
                 (map (fn [ct] [:option (name ct)]))
                 content-types))
         (when menu-active?
           [:span.f7.light-silver.mt3.pointer.hover-dark-gray
            {:on-click #(transact [[:db.fn/retractEntity id]])}
            "delete"])]]
       [:div.flex
        {:style    {:flex-grow 1}
         :on-click #(assoc-transact block-data :active? true)}
        [block block-data]]])))

(def notebooks-eid
  (d/q '{:find  [?e .]
         :where [[?e :type :notebooks]]}
       @conn))

(defn ^:export example-root []
  [root :resolve {:root-id notebooks-eid}])

(defn ^:export render-fn [dom-node]
  (rdom/render [example-root] dom-node))

