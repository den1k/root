(ns root.impl.core
  (:require [medley.core :as md]
            [root.impl.multi :as multi]
            [root.impl.resolver :as rr]
            [root.impl.entity :as ent]
            [root.impl.util :as u]
            [clojure.set :as set]
            [#?(:clj  clojure.spec.alpha
                :cljs cljs.spec.alpha) :as s]))

(defn- remove-fragment [[v1 & views :as all-views]]
  (if (= :<> v1)
    views
    all-views))

(defn default-child-view [views]
  (let [padded-view [:div {:style {:padding      5
                                   :padding-left 10
                                   :margin-top   5}}]]
    (case (::rr/type (meta views))
      :entity (conj padded-view views)
      :entities (into padded-view (remove-fragment views))
      :entity-map (into padded-view
                        (map
                          (fn [[k child-or-children]]
                            [:div (str (name k) ": ")
                             [default-child-view child-or-children]]))
                        views))))

(defn- domify-map
  ([vfn m] (domify-map [:<>] vfn m))
  ([into-vec vfn m]
   (into into-vec
         (map (fn [[k v]]
                [:div
                 (str (name k) ": ") (vfn v)]))
         m)))

(defn child-views [ent]
  (let [{:as root :keys [->ui-keys]} (-> ent meta :root)]
    (when-let [child-views (not-empty (select-keys ent (->ui-keys ent)))]
      [domify-map default-child-view child-views])))

(defn default-view* [ent]
  ;; fixme pass root proper
  (let [{:as root :keys [->content-keys ->ui-keys]} (-> ent meta :root)
        shrunk (apply dissoc ent
                      :actions :path :parent-id :handlers
                      (concat (->content-keys ent) (->ui-keys ent)))]

    [:div.mb2
     {:style {:padding 10
              :border  "1px solid tomato"}}
     (into [:<>]
           (map (fn [[k v]]
                  (let [too-long? (> (count (str v)) 140)
                        k'        (str k)
                        pretty-v  [:div.overflow-scroll.code.f6.di
                                   {:style {:max-height  200
                                            :white-space :pre-wrap}}
                                   (u/pretty-str v)]]
                    (if too-long?
                      [:details [:summary.outline-0 k'] pretty-v]
                      [:div k' " " pretty-v])))
                shrunk))
     [child-views ent]]))

(defrecord UIRoot
  [add-view remove-method dispatch-view method-table]
  #?@(:clj
      [clojure.lang.IFn
       (invoke
         [this a]
         (this a nil))
       (invoke
         [this a b]
         (this a b nil))
       (invoke
         [{:as root :keys [transact lookup lookup-sub]} a b c]
         (case a
           :transact (transact root b c)
           :lookup (let [ret (lookup b)]
                     (cond-> ret
                       ;; temp CLJC test to check whether IMeta can be added
                       (coll? ret) (with-meta {:root root})))
           :lookup-sub (let [ret (lookup-sub b)]
                         (cond-> ret
                           (coll? ret) (with-meta {:root root})))
           :view (add-view b c)
           :resolve (cond-> [rr/resolved-view root]
                      b (conj b))
           (dispatch-view a)))]
      :cljs
      [IFn
       (-invoke
         [this a]
         (this a nil))
       (-invoke
         [this a b]
         (this a b nil))
       (-invoke
         [{:as root :keys [transact lookup lookup-sub]} a b c]
         (case a
           :transact (transact root b c)
           :lookup (let [ret (lookup b)]
                     (cond-> ret
                             ;; temp CLJC test to check whether IMeta can be added
                             (coll? ret) (with-meta {:root root})))
           :lookup-sub (let [ret (lookup-sub b)]
                         (cond-> ret
                                 (coll? ret) (with-meta {:root root})))
           :view (add-view b c)
           :resolve (cond-> [rr/resolved-view root]
                            b (conj b))
           (dispatch-view a)))]))

(defn- view-multi-dispatch [opts]
  (-> {:invoke-fn (fn as-component [f x] [f x])}
      (merge opts)
      multi/multi-dispatch
      (update :add-method
              (fn [add-method]
                (fn with-name [dispatch-val view]
                  #?(:cljs
                     (set! (.-displayName view)
                           (str "root-view__" (if (ident? dispatch-val)
                                                (name dispatch-val)
                                                (pr-str dispatch-val)))))
                  (add-method dispatch-val view))))
      (set/rename-keys {:add-method    :add-view
                        :remove-method :remove-view
                        :method-table  :view-table
                        :dispatch      :dispatch-view})))

;; Root config specs

(s/def ::dispatch-fn ifn?)
(s/def ::lookup ifn?)
(s/def ::lookup-sub ifn?)
(s/def ::->content-keys ifn?)
(s/def ::spec
  (s/or
    :spec-object s/spec?
    :registered-spec s/get-spec))
(s/def ::spec-or-pred
  (s/or :pred fn?
        :spec ::spec))
(s/def ::entity-spec ::spec-or-pred)
(s/def ::ref-spec ::spec-or-pred)
(s/def ::->ref ifn?)
(s/def ::transact ifn?)
(s/def ::add-id ifn?)

(s/def ::ui-root-data
  (s/keys :req-un [::dispatch-fn ::->content-keys]
          ;; fixme require at least one of ref or ent spec
          :opt-un [::ref-spec ::entity-spec]))

(s/def ::ui-root-static
  (s/and ::ui-root-data (s/keys :req-un [::lookup])))

(s/def ::ui-root-reactive
  (s/and ::ui-root-static (s/keys :req-un [::lookup-sub])))

(s/def ::ui-root-dynamic
  (s/and ::ui-root-reactive (s/keys :req-un [::transact ::add-id ::->ref])))

(s/def ::ui-root
  (s/or :dynamic ::ui-root-dynamic
        :reactive ::ui-root-reactive
        :static ::ui-root-static
        :data ::ui-root-data))

(defn opts-warn [root-opts]
  (let [[root-type _] (u/conform! ::ui-root root-opts)]
    #?(:cljs
       (when (contains? #{:static :reactive} root-type)
         (js/console.warn
           "Root Warning: static use only. Missing one or more required"
           "functions: lookup-sub, transact, ->ref, add-id.")))))

(defn ->post-fixed-keyword
  ([post-fix] (fn [x] (->post-fixed-keyword post-fix x)))
  ([post-fix x]
   (keyword (str (name x) post-fix))))

(defn- child-view-mappings [{:keys [->content-keys content-post-fix]}]
  (let [content-key->ui-key   (memoize
                                (partial ->post-fixed-keyword content-post-fix))
        content-keys->ui-keys (memoize
                                (partial mapv content-key->ui-key))]
    {:->ui-keys           (fn [ent]
                            (content-keys->ui-keys (->content-keys ent)))
     :content-key->ui-key content-key->ui-key}))

(def ^:private default-opts
  {:content-post-fix        "-ui"
   ;; in uix/reagent this is interpreted as a react fragment
   :contents-hiccup-wrapper [:<>]})

(defn ui-root
  [{:as   opts
    :keys [dispatch-fn default-view invoke-fn lookup lookup-sub
           ->ref ref-spec entity-spec]
    :or   {default-view default-view*}}]
  (opts-warn opts)
  (let [opts (merge default-opts opts)
        {:as child-view-mappings :keys [->ui-keys]} (child-view-mappings opts)]
    (map->UIRoot
      (merge
        (view-multi-dispatch
          {:dispatch-fn         dispatch-fn
           :default-dispatch-fn default-view
           :invoke-fn           invoke-fn})
        child-view-mappings
        opts
        (let [
              ;entity-spec                 (s/and entity-spec
              ;                                   ;; todo add all keys
              ;                                   (s/conformer #(reduce dissoc
              ;                                                         %
              ;                                                         (->ui-keys %))))
              content-spec                (or ref-spec entity-spec)
              lookup-sub                  (if (nil? lookup-sub) lookup lookup-sub)
              entity-or-ref-resolver-spec (rr/resolver-spec (s/or :entity (or entity-spec (constantly false))
                                                                  :ref (or ref-spec (constantly false))))]
          {:->ref                       ->ref
           :->ref+x                     (fn ->ref+x [x] [(->ref x) x])
           :content-spec                content-spec
           :content-resolver-spec       (rr/resolver-spec content-spec)
           :entity-resolver-spec        (rr/resolver-spec entity-spec)
           :entity-or-ref-resolver-spec entity-or-ref-resolver-spec
           :lookup                      lookup
           :lookup-sub                  lookup-sub})))))

(defn normalize
  ([root]
   (normalize root (:data root)))
  ([root data]
   (normalize {} root data))
  ([out {:as root :keys [->ref ->content-keys entity-or-ref-resolver-spec]} data]
   (let [data-ref (->ref data)
         out      (assoc out data-ref data)]
     (if-let [content-ks (and data (not-empty (->content-keys data)))]
       (reduce
         (fn [out content-k]
           (if-let [content (get data content-k)]
             (let [[content-shape conformed-content]
                   (u/conform! entity-or-ref-resolver-spec content)]
               (case content-shape
                 :content
                 (let [[content-type content-val] conformed-content]
                   (case content-type
                     :ref out
                     :entity
                     (let [content-ref (->ref content-val)]
                       (-> out
                           (assoc content-ref content-val)
                           (assoc-in [data-ref content-k] content-ref)
                           (normalize root content-val)))))

                 :contents
                 (let [content-refs (mapv (fn [[content-type content-val]]
                                            (case content-type
                                              :ref content-val
                                              :entity (->ref content-val)))
                                          conformed-content)]
                   (as-> out out
                         (assoc-in out [data-ref content-k] content-refs)
                         (reduce (fn [out d] (normalize out root d))
                                 out
                                 content)))

                 :content-map
                 (reduce-kv
                   (fn [out k v]
                     (let [[inner-type data] (get conformed-content k)]
                       (case inner-type
                         :entity
                         (let [[content-type data] data]
                           (if (identical? :ref content-type)
                             out
                             (-> out
                                 (assoc-in [data-ref content-k k] (->ref data))
                                 (normalize root v))))

                         :entities
                         (as-> out out
                               (assoc-in out [data-ref content-k k]
                                         (mapv (fn [[content-type content-val]]
                                                 (case content-type
                                                   :ref content-val
                                                   :entity (->ref content-val)))
                                               data))
                               (reduce (fn [out d] (normalize out root d)) out v))
                         out)))
                   out
                   content)))
             out))
         out
         content-ks)
       out))))
