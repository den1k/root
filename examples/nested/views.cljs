(ns nested.views
  (:require [xframe.core.alpha :as xf]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [uix.core.alpha :as uix]
            [uix.dom.alpha :as uix.dom]
            [root.impl.core :as rc]
            [clojure.spec.alpha :as s]
            [clojure.string :as str]
            [cljs.js :as cljs]
            [cljs.analyzer :as ana]
            [goog.functions :as gfns]
            [root.impl.util :as u]))

(defn elide-env [env ast opts]
  (dissoc ast :env))

(def ex2-src
  #_"(+ 1 1)"
  "(into
     [:<>]
     (map (fn [s] [:span.h3 s]))
     [\"a\" \"b\" \"c\"])")

(def st (cljs/empty-state))

(defn ana-str [str cb]
  (cljs/analyze-str st str nil
                    {:passes [ana/infer-type elide-env]}
                    (fn [{:keys [error value] :as res}]
                      (cb res))))


#_(ana-str ex2-src (fn [{:keys [value error]}]
                     (println value)
                     (js/console.log value)))

(defonce _
  (ana-str ex2-src (fn [{:keys [value error]}]
                     (reset! rc/state value))))

(xf/reg-sub :get-in
  (fn [path]
    (get-in (xf/<- [::xf/db]) path)))

(defn lookup [x]
  (cond
    (vector? x) (get-in (xf/<- [::xf/db]) x)
    (map? x) x))


(defn lookup-sub [x]
  (cond
    (vector? x) (xf/<sub [:get-in x])
    (map? x) x))

(def root (rc/ui-root
           {:invoke-fn    (fn invoke [f x]
                            #_(js/console.log :op (:op x) x)
                            #_(js/console.log :INCO (:path x) x)
                            ^{:key (:path x)}
                            [f x])
            :lookup       lookup
            :lookup-sub   lookup-sub
            :content-keys [:fn :args :items :vals :keys :statements :ret :test :then :else]
            :content-spec (s/and map? (fn [x] (:op x)))
            :resolve-spec ::content
            :contents-hiccup-wrapper []
            ;:lookup-sub     lookup-sub
            :dispatch-fn  :op
            ;:transact       rc/transact
            ;:entity-actions entity-actions
            ;:add-id         rc/add-id
            }))

(defn ana-ent->css-classes [{:as ent :keys [op tag form]}]
  (cond
    (= tag 'cljs.core/Keyword) [:green]
    ;(= tag 'cljs.core/IVector) [:mv1 :pv1]
    (or (= form 'fn)
        (= form 'defn)) [:orange :b]
    (= tag 'string) [:light-red]
    (= tag 'number) [:blue]
    (= op :var) [:b]
    :else []))

(defn ent->handlers [{:as ent :keys [form path tag op children-ui]}]
  {:on-input
   (fn [e]
     (js/console.log :ent ent
                     :at-path (get-in @rc/state (conj path :form))
                     :path path
                     (str/trim (-> e .-target .-textContent)))
     (let [text (-> e .-target .-textContent)]
       (js/console.log :text text)
       (swap! rc/state
              assoc-in
              (conj path :form)
              (cond
                (= op :var) (symbol text)
                :else (some-> text cljs.reader/read-string))))
     ;(xf/notify-listeners!)
     (.stopPropagation e)
     (.preventDefault e)

     )
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
      (when fn-defn? (js/console.log :defn ent))
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
    [:div.flex.br1
     ;(ent->styles ent)
     "(do"
     (into [:div.flex.flex-wrap
            #_(ent->styles ent)] (map (fn [x] [:span.pl2 x]))
           (conj statements-ui
                 [:div.bg-gold.ph1 ret-ui]))
     [:span.self-end ")"]]))

(root :view :vector
  (fn [{:as ent :keys [items-ui]}]
    (let [[fui & items-ui'] items-ui]
      [:span.flex.items-end {:content-editable false}
       [:div.outline-0.flex.flex-wrap.br1 ;.mv1
        (merge (ent->handlers ent)
               #_(ent->styles ent))
        "[" (into [:<> fui] (map (fn [x] [:span.pl2 x]) items-ui'))
        [:span.self-end "]"]]])))

(defonce str-state (atom ex2-src))

(def debounce-set-ana-str
  (gfns/debounce #(ana-str @str-state
                           (fn [{:keys [value error]}]
                             (when value
                               (reset! rc/state value)
                               (xf/notify-listeners!))))
                 200))

(defn paste-code-box []
  [:textarea.vh-100.w-40.outline-0.bn.pa3
   {:default-value @str-state
    :on-change     (fn [e]
                     (let [text (-> e .-target .-value)]
                       (reset! str-state text)
                       (debounce-set-ana-str)))}])

(defn render-example []
  (xf/notify-listeners!)
  (uix.dom/render
   [:div.flex
    [paste-code-box]
    [:div.code.pre.pa3.outline-0.w-60.bl.f6.lh-copy
     {:autoFocus                         true
      :content-editable                  true
      :suppress-content-editable-warning true}
     [root :render {:path []}]]]
   (. js/document (getElementById "app"))))







