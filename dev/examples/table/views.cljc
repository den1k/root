(ns examples.table.views
  (:require [clojure.string :as str]
            [root.impl.core :as rc]
            [root.impl.transact :as rt]
            [examples.util.dom :as ud]
            [uix.dom.alpha :as uix.dom]
            [xframe.core.alpha :as xf]))

(defn lookup [x]
  (get (xf/<- [::xf/db]) x))

(xf/reg-sub :get
            (fn [k] (lookup k)))

(xf/reg-sub :get-many
            (fn [ks] (mapv lookup ks)))

(xf/reg-sub :get-keyed
            (fn [ks f] (zipmap ks (mapv (comp (or f identity) lookup) ks))))

(defn lookup-sub [id]
  (xf/<sub [:get id]))

(defn lookup-many-sub [ks]
  (xf/<sub [:get-many ks]))

(defn lookup-keyed-sub
  ([ks]
   (lookup-keyed-sub ks identity))
  ([ks f]
   (xf/<sub [:get-keyed ks f])))

(def root
  (rc/ui-root
    {:dispatch-fn    :type
     :->content-keys (constantly [:content])
     :->ref          (fn [x]
                       (:id x))
     :transact       rt/transact
     :entity-spec    (fn [x] (:id x))
     :ref-spec       (some-fn integer? string?)
     :lookup         lookup
     :lookup-sub     lookup-sub}))

(def abc
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ")

(defn- make-rows-columns [n-rows]
  (let [row-cells (fn [row-num]
                    (mapv (fn [letter]
                            {:id   (str letter row-num)
                             :type :cell :value (rand-nth
                                                  [nil nil nil nil (+ 5 (rand-int 50))])})
                          abc))]
    (mapv (fn [num-id]
            {:id (str num-id) :type :row :content (row-cells num-id)})
          (range 1 (inc n-rows))))
  )

(rc/normalize
  root
  {:id      "table"
   :type    :table
   :content (make-rows-columns 1)})

(rc/normalize
  root
  {:id      "table"
   :type    :table
   :content [{:id "1" :type :row :content [{:id "A1" :type :cell :value 5}
                                           {:id "B1" :type :cell :value 5}
                                           {:id "C1" :type :cell :value 5 :deps ["A1" "B1"] :formula "= A1 + B1"}]}
             {:id "2" :type :row :content [{:id "A2" :type :cell :value 5}
                                           {:id "B2" :type :cell :value 5}
                                           {:id "C2" :type :cell :value 5}]}
             {:id "3" :type :row :content [{:id "A3" :type :cell :value 5}
                                           {:id "B3" :type :cell :value 5}
                                           {:id "C3" :type :cell :value 5}]}]})

(reset! xf/db #_{"table" {:id "table", :type :table, :content ["1" "2" "3"]},
                 "3"     {:id "3", :type :row, :content ["A3" "B3" "C3"]},
                 "A1"    {:id "A1", :type :cell, :value 5},
                 "A3"    {:id "A3", :type :cell, :value 5},
                 "C1"    {:id "C1", :type :cell, :value 5, :deps ["A1" "B1"], :formula "= A1 + B1"},
                 "B1"    {:id "B1", :type :cell, :value 5},
                 "C2"    {:id "C2", :type :cell, :value 5},
                 "B3"    {:id "B3", :type :cell, :value 5},
                 "C3"    {:id "C3", :type :cell, :value 5},
                 "A2"    {:id "A2", :type :cell, :value 5},
                 "1"     {:id "1", :type :row, :content ["A1" "B1" "C1"]},
                 "B2"    {:id "B2", :type :cell, :value 5},
                 "2"     {:id "2", :type :row, :content ["A2" "B2" "C2"]}}
        (rc/normalize
          root
          {:id      "table"
           :type    :table
           :content (make-rows-columns 5)}))

(root :view :table
  (fn [{:keys [content content-ui]}]
    content-ui))

(root :view :row
  (fn [{:as row :keys [content-ui path]}]
    #?(:cljs (js/console.log path))
    [:div.flex.items-stretch.code
     [:span.flex.items-center.justify-center.self-center.fixed
      {:style {:min-width :2rem}}
      (inc (peek path))]
     [:div.flex.items-stretch.code
      {:style {:margin-left :2rem}}
      content-ui]]))

(defn parse-deps [formula-str]
  (not-empty (vec (re-seq #"[A-Z][0-9]" formula-str))))

(defn resolve-deps [root deps]
  (zipmap deps
          (mapv #(some-> (root :lookup %)
                         :value
                         str)
                deps)))

(defn resolve-vars [formula-str resolved-deps]
  (str/replace (subs formula-str 1)                         ; remove "="
               #"[A-Z][0-9]"
               resolved-deps))

(def get-cell-value (comp str :value))

(root :view :cell
  (fn [{:as cell :keys [id value parent-id path formula active? deps placeholder]}]
    #?(:cljs (js/console.log :cell cell))
    (let [resolved-deps (lookup-keyed-sub deps get-cell-value)
          value (if formula
                  (let [resolved-str (resolve-vars formula resolved-deps)]
                    #?(:cljs
                       (try
                         (js/eval resolved-str)
                         (catch js/Error e
                           (js/console.error e)
                           (str e)))))
                  value)                                    ;; TODO formula
          first-row? (= parent-id "1")
          top-row-height :1.5rem
          input
          [:textarea.h-100.lh-solid.ba.b--dark-gray.bg-transparent
           {:style     (cond-> {:width      150
                                :resize     "vertical"
                                :min-height 20}
                               first-row? (assoc :margin-top top-row-height))
            :value     (if (and active? formula) formula value)
            :on-click  #(root :transact [[:set (assoc cell :active? true)]])
            :on-blur   #(root :transact [[:set (assoc cell :active? false)]])
            :on-change #(let [v (.. % -target -value)
                              formula? (str/starts-with? v "=")]
                          #?(:cljs (js/console.log :v v))
                          (if formula?
                            (let [deps (parse-deps v)]
                              #?(:cljs (js/console.log :parsed deps))
                              (root :transact [[:set (assoc cell
                                                       :formula v
                                                       :deps deps)]]))
                            (root :transact [[:set (assoc cell :value v)]])))}]]
      [:div.flex.flex-column.justify-stretch
       (when first-row?
         [:div.justify-center.flex.fixed
          {:style {:width 150
                   :line-height top-row-height}}
          (get abc (peek path))])
       input]

      )))

(defn ^:export example-root []
  [root :resolve {:root-id "table"}])

(defn ^:export render-fn [dom-node]
  (uix.dom/render [example-root] dom-node))