(ns root.util.dom)

(extend-type js/HTMLCollection
  ISeqable
  (-seq [array] (array-seq array 0)))

(defn get-selection
  "Returns index of caret in text. If include-parent is true,
  will also count all siblings until the node containing the caret."
  ([] (get-selection false))
  ([include-parent?]
   (let [sel (.. js/document getSelection)
         sel-range (.getRangeAt sel 0)
         [start end] [(.-startOffset sel-range) (.-endOffset sel-range)]]
     (if-not include-parent?
       {:start start
        :end   end
        :type  (keyword (clojure.string/lower-case (.-type sel)))}
       (let [sel-node (.. sel -anchorNode -parentElement)
             siblings (.. sel-node -parentNode -children)
             sibl-pre-node (take-while #(not= sel-node %) siblings)
             txt-count-until (reduce (fn [n node] (+ n (.. node -textContent -length))) 0 sibl-pre-node)]
         {:start (+ txt-count-until start)
          :end   (+ txt-count-until end)
          :type  (keyword (clojure.string/lower-case (.-type sel)))})))))

(defn set-selection [node start end]
  (let [range (doto
               (.createRange js/document)
                (.setStart (.-firstChild node) start)
                (.setEnd (.-firstChild node) end))]
    (doto (.getSelection js/window)
      .removeAllRanges
      (.addRange range))))

(defn get-cursor []
  (:end (get-selection)))

(defn set-cursor [node idx]
  (if (zero? (count (.-textContent node)))
    (doto node
      (aset "innerHTML" " ")
      (set-cursor 0)
      (aset "innerHTML" ""))
    (set-selection node idx idx)))

(defn set-cursor-to-end [node]
  (let [node (or (.-lastElementChild node) node)
        txt-count (count (.-textContent node))]
    (set-cursor node txt-count)))
