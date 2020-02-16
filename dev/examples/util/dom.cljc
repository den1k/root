(ns examples.util.dom
  (:require [root.impl.util :as u]
            [clojure.pprint :as pp]))

#?(:cljs
   (extend-type js/HTMLCollection
     ISeqable
     (-seq [array] (array-seq array 0))))

(defn active-element? [node]
  #?(:cljs
     (boolean
      (some-> (.. js/document -activeElement)
              (.isSameNode node)))))

(defn get-selection
  "Returns index of caret in text. If include-parent is true,
  will also count all siblings until the node containing the caret."
  ([] (get-selection false))
  ([include-parent?]
   #?(:cljs
      (let [sel       (.. js/document getSelection)
            sel-range (.getRangeAt sel 0)
            [start end] [(.-startOffset sel-range) (.-endOffset sel-range)]]
        (if-not include-parent?
          {:start start
           :end   end
           :type  (keyword (clojure.string/lower-case (.-type sel)))}
          (let [sel-node        (.. sel -anchorNode -parentElement)
                siblings        (.. sel-node -parentNode -children)
                sibl-pre-node   (take-while #(not= sel-node %) siblings)
                txt-count-until (reduce (fn [n node] (+ n (.. node -textContent -length))) 0 sibl-pre-node)]
            {:start (+ txt-count-until start)
             :end   (+ txt-count-until end)
             :type  (keyword (clojure.string/lower-case (.-type sel)))}))))))

(defn set-selection [node start end]
  #?(:cljs
     (let [range (doto
                (.createRange js/document)
                 (.setStart (.-firstChild node) start)
                 (.setEnd (.-firstChild node) end))]
     (doto (.getSelection js/window)
       .removeAllRanges
       (.addRange range)))))

(defn get-cursor []
  (:end (get-selection)))

(defn set-cursor
  ([node idx] (set-cursor node idx {}))
  ([node idx {:keys [unless-active?]}]
   (if (and unless-active? (active-element? node))
     nil
     (if (zero? (count (.-textContent node)))
       (doto node
         (aset "innerHTML" " ")
         (set-cursor 0)
         (aset "innerHTML" ""))
       (set-selection node idx idx)))))

(defn set-cursor-to-end
  ([node] (set-cursor-to-end node {}))
  ([node opts]
   (let [node      (or (.-lastElementChild node) node)
         txt-count (count (.-textContent node))]
     (set-cursor node txt-count opts))))

(defn code-block [str]
  [:div.bg-dark-gray.pa1.br2 [:code.f6 {:style {:white-space :pre-wrap}} str]])

(defn pretty-code-block
  ([x] (pretty-code-block pp/*print-right-margin* x))
  ([margin-width x]
   (binding [pp/*print-right-margin* margin-width]
     [code-block (u/pretty-str x)])))

(defn example [{:keys [title source details root open-details?]}]
  [:<>
   [:div.pv2.ph3.bg-near-black.white
    [:div.flex.justify-between
     [:h2.fw2 title]
     (when source
       [:a.white.link {:href source}
        [:div.pa2.tracked.f6 "SOURCE"]])]
    (when details
      [:details
       {:open open-details?}
       [:summary.outline-0.pointer "Implementation Details"]
       [:div.pl3
        details]])]
   [:div.pa3 root]])
