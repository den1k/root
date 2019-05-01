(ns root.impl.multi)

(comment

 (defprotocol IMultiFn
   (-reset [mf])
   (-add-method [mf dispatch-val method])
   (-remove-method [mf dispatch-val])
   (-prefer-method [mf dispatch-val dispatch-val-y])
   (-get-method [mf dispatch-val])
   (-methods [mf])
   (-prefers [mf])
   (-default-dispatch-val [mf])
   (-dispatch-fn [mf]))

 )

(defn multi-dispatch
  [{:keys [dispatch-fn default-dispatch-fn]}]
  {:pre [(ifn? dispatch-fn)]}
  (let [default :default
        table   (atom
                 {default
                  (or default-dispatch-fn
                      (fn default-dispatch [x]
                        (throw
                         (ex-info
                          "No default method defined" {:arg x}))))})]
    {:add-method    (fn add-method [dispatch-val f]
                      (swap! table assoc dispatch-val f))
     :remove-method (fn remove-method [dispatch-val]
                      (swap! table dissoc dispatch-val))
     :dispatch-fn   (fn dispatch [x]
                      (let [dispatch-val (dispatch-fn x)
                            t            @table
                            f            (or (get t dispatch-val)
                                             (get t default))]
                        (f x)))
     :method-table  table}))
