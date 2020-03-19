(ns examples.datascript.views.codemirror
  (:require [reagent.core :as r]
            [codemirror]
            ["codemirror/mode/clojure/clojure"]
            ["codemirror/addon/edit/closebrackets"]))

(defn init-codemirror
  [{:as opts :keys [node on-cm from-textarea? on-change on-changes on-blur keyboard-shortcuts]}]
  (let [cm-fn (if from-textarea?
                (.-fromTextArea codemirror)
                (fn [node opts]
                  (codemirror. node opts)))
        cm    (cm-fn node
                     (clj->js
                      (merge {:mode              "clojure"
                              :autoCloseBrackets true}
                             (dissoc opts
                                     :node-ref :on-cm :from-textarea?
                                     :on-change :on-changes :keyboard-shortcuts))))]
    (when on-blur
      (.on cm "blur" on-blur))
    (when on-change
      (.on cm "change" on-change))
    (when on-changes
      (.on cm "changes" on-changes))
    (when keyboard-shortcuts
      (.setOption cm "extraKeys" (clj->js keyboard-shortcuts)))
    (on-cm cm)))


(defn codemirror []
  (let [node     (atom nil)
        cm       (atom nil)
        cm-init? (r/atom false)]
    (r/create-class
     {:component-did-update
      (fn [c [_ {old-value :value}]]
        (let [{new-value :value} (r/props c)]
          (when (not= old-value new-value)
            (.setValue @cm new-value))))
      :reagent-render
      (fn [{:as props :keys [value cm-opts on-cm parinfer?]}]
        [:div
         (merge
          {:ref #(when-not @node
                   (reset! node %)
                   (init-codemirror
                    (merge {:node         %
                            :on-cm        (fn [cm-instance]
                                            (reset! cm cm-instance)
                                            (reset! cm-init? true)
                                            (when on-cm (on-cm cm-instance)))
                            :value        value
                            :lineWrapping true
                            :lineNumbers  false}
                           cm-opts)))}
          (dissoc props :cm-opts :st-value-fn :on-cm :parinfer? :default-value))
         (when-not @cm-init?
           [:pre.f6.ma0 value])])})))

