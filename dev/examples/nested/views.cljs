(ns examples.nested.views
  (:require [xframe.core.alpha :as xf]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [root.impl.core :as rc]
            [clojure.spec.alpha :as s]
            [cljs.js :as cljs]
            [cljs.analyzer :as ana]
            [goog.functions :as gfns]
            [root.impl.util :as u]
            [reagent.core :as r]
            [reagent.dom :as rdom]))

(defn elide-env [env ast opts]
  (dissoc ast :env))

(def ex2-src
  "(comment
  \"apologies for my poor styling skills\")

  (range 10)

  (into
     [:<>]
     (map (fn [s] [:span.h3 s]))
     [\"a\" \"b\" \"c\"])")

(def st (cljs/empty-state))

(defn ana-str [code-str cb]
  (cljs/analyze-str
   st (str "(do" code-str ")") nil
   {:passes [ana/infer-type elide-env]}
   (fn [{:keys [error value] :as res}]
     (cb res))))

(def db (r/atom {}))

(ana-str ex2-src
         (fn [{:keys [value error]}]
           (reset! db value)))

(xf/reg-sub :get-in
  (fn [path]
    (get-in (xf/<- [::xf/db]) path)))

(defn lookup [x]
  (cond
    (vector? x) (get-in @db x)
    (map? x) x))

(def root
  (rc/ui-root
   {:dispatch-fn             :op
    :lookup                  lookup
    :->content-keys          (constantly [:fn :args :items :vals :keys :statements :ret :test :then :else])
    :entity-spec             (s/and map? (fn [x] (:op x)))
    :contents-hiccup-wrapper []}))

(defn ana-ent->css-classes [{:as ent :keys [op tag form]}]
  (cond
    (= tag 'cljs.core/Keyword) [:green]
    (or (= form 'fn)
        (= form 'defn)) [:orange :b]
    (= tag 'string) [:light-red]
    (= tag 'number) [:blue]
    (= op :var) [:b]
    :else []))

(defn ent->handlers [{:as ent :keys [form path tag op children-ui]}]
  {:on-input
   (fn [e]
     (let [text (-> e .-target .-textContent)]
       (swap! db
              assoc-in
              (conj path :form)
              (cond
                (= op :var) (symbol text)
                :else (some-> text cljs.reader/read-string))))
     (.stopPropagation e)
     (.preventDefault e))
   :content-editable
   true
   :suppressContentEditableWarning
   true})

(defn ana-ent->css-styles [{:as ent :keys [op path]}]
  (case op
    (:vector :invoke) {:padding-right 2
                       :background    (str "hsl(" (int (/ 360 (count path))) ", 100%, 95%)")}
    nil))

(defn ent->styles [ent]
  {:class (ana-ent->css-classes ent)
   :style (ana-ent->css-styles ent)})

(defn editable-view
  [{:as ent :keys [form path tag op]}
   {:keys [omit-styles? form-print-fn]
    :or   {form-print-fn pr-str}}]
  [:span {:content-editable false}
   [:span.outline-0
    (merge (ent->styles ent)
           (ent->handlers ent))
    (u/pretty-str form)]])

(root :view :invoke
  (fn [{:as ent :keys [fn-ui args-ui path fn]}]
    (let [[arg0-ui & next-args-ui :as args-ui'] args-ui
          fn-sym   (:form fn)
          fn-defn? (contains? #{'defn 'fn} fn-sym)]
      [:div.flex.flex-wrap.br1
       (ent->styles ent)
       "("
       fn-ui
       (when fn-defn? [:span.pl2 arg0-ui])
       (if-let [more-args-ui (some-> (interpose [:span.pl2] (if fn-defn?
                                                              next-args-ui
                                                              args-ui'))
                                     not-empty
                                     vec
                                     (conj [:span.self-end ")"]))]
         (into [:div.flex.flex-wrap.ml2
                (u/deep-merge {:class [(when fn-defn? :w-100)]}
                              (ent->styles ent))]
               more-args-ui)
         [:span.self-end ")"])])))


(root :view :var editable-view)
(root :view :js-var editable-view)
(root :view :const editable-view)
(root :view :if
  (fn [{:as ent :keys [test-ui then-ui else-ui]}]
    [:div.flex.flex-column.br1
     ;(ent->styles ent)
     [:div "(if " test-ui]
     then-ui
     else-ui]
    ))

(root :view :map
  (fn [{:as ent :keys [path keys-ui vals-ui]}]
    [:div.flex
     "{"
     [:span.flex.flex-column
      (map (fn [[k v]] [:span.flex.flex-wrap k [:span.pl2] v])
           (partition 2 (interleave keys-ui vals-ui)))]
     [:span.self-end "}"]]))

(root :view :do
  (fn [{:as ent :keys [fn-ui args-ui path statements-ui ret-ui]}]
    (let [first-do-form? (empty? path)]
      [:div.flex.br1
       (when-not first-do-form? "(do")
       (into [:div.flex.flex-column]
             (map (fn [x]
                    [:span.pl2.meow x]))
             (conj statements-ui
                   [:div.ph1 ret-ui]))
       (when-not first-do-form? [:span.self-end ")"])])))

(root :view :vector
  (fn [{:as ent :keys [items-ui]}]
    (let [[fui & items-ui'] items-ui]
      [:span.flex.items-end {:content-editable false}
       [:div.outline-0.flex.flex-wrap.br1 ;.mv1
        (ent->handlers ent)
        "[" (into [:<> fui] (map (fn [x] [:span.pl2 x]) items-ui'))
        [:span.self-end "]"]]])))

(defonce str-state (atom ex2-src))

(def debounce-set-ana-str
  (gfns/debounce
   (fn [s]
     (ana-str s
              (fn [{:keys [value error]}]
                (when value
                  (reset! db value)))))
   200))

(defn paste-code-box []
  [:textarea.vh-100.w-40.outline-0.bn.pa3
   {:default-value ex2-src
    :on-change     (fn [e]
                     (let [text (-> e .-target .-value)]
                       (debounce-set-ana-str text)))}])

(defn ^:export example-root []
  [:div.flex
   [paste-code-box]
   [:div.code.pre.pa3.outline-0.w-60.bl.f6
    {:style                             {:line-height 2}
     :autoFocus                         true
     :content-editable                  true
     :suppress-content-editable-warning true}
    [root :resolve {:path []}]]])

(defn ^:export render-fn [dom-node]
  (rdom/render [example-root] dom-node))
