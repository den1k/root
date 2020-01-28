(ns nested.views
  (:require [root.impl.resolver :as rr]
            [den1k.shortcuts :refer [shortcuts global-shortcuts]]
            [uix.dom.alpha :as uix.dom]
            [root.impl.core :as rc]
            [cljs.spec.alpha :as s]))
(def data
  "Result of running

  (map inc (range 10))

  https://swannodette.github.io/2015/07/29/clojurescript-17"
  '{:op   :invoke,
    :form (map inc (range 10)),
    :f
          {:form map,
           :op   :var,
           :info
                 {:protocol-inline nil,
                  :meta
                                   {:file       "cljs/core.cljs",
                                    :line       4167,
                                    :column     7,
                                    :end-line   4167,
                                    :end-column 10,
                                    :arglists
                                                '([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                    :doc
                                                "Returns a lazy sequence consisting of the result of applying f to\n  the set of first items of each coll, followed by applying f to the\n  set of second items in each coll, until any one of the colls is\n  exhausted.  Any remaining items in other colls are ignored. Function\n  f should accept number-of-colls arguments. Returns a transducer when\n  no collection is provided.",
                                    :top-fn
                                                {:variadic        true,
                                                 :max-fixed-arity 4,
                                                 :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                                                 :arglists
                                                                  ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                                 :arglists-meta   (nil nil nil nil nil)}},
                  :ns              cljs.core,
                  :name            cljs.core/map,
                  :variadic        true,
                  :file            "cljs/core.cljs",
                  :end-column      10,
                  :top-fn
                                   {:variadic        true,
                                    :max-fixed-arity 4,
                                    :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                                    :arglists
                                                     ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                    :arglists-meta   (nil nil nil nil nil)},
                  :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                  :protocol-impl   nil,
                  :arglists-meta   (nil nil nil nil nil),
                  :column          nil,
                  :line            nil,
                  :end-line        4167,
                  :max-fixed-arity 4,
                  :fn-var          true,
                  :arglists
                                   ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                  :doc
                                   "Returns a lazy sequence consisting of the result of applying f to\n  the set of first items of each coll, followed by applying f to the\n  set of second items in each coll, until any one of the colls is\n  exhausted.  Any remaining items in other colls are ignored. Function\n  f should accept number-of-colls arguments. Returns a transducer when\n  no collection is provided."}},
    :args
          [{:form inc,
            :op   :var,
            :info
                  {:protocol-inline nil,
                   :meta
                                    {:file       "cljs/core.cljs",
                                     :line       1238,
                                     :column     7,
                                     :end-line   1238,
                                     :end-column 10,
                                     :arglists   '([x]),
                                     :doc        "Returns a number one greater than num."},
                   :ns              cljs.core,
                   :name            cljs.core/inc,
                   :variadic        false,
                   :file            "cljs/core.cljs",
                   :end-column      10,
                   :method-params   ([x]),
                   :protocol-impl   nil,
                   :arglists-meta   (nil nil),
                   :column          nil,
                   :line            nil,
                   :end-line        1238,
                   :max-fixed-arity 1,
                   :fn-var          true,
                   :arglists        '([x]),
                   :doc             "Returns a number one greater than num."}}
           {:op   :invoke,
            :form (range 10),
            :f
                  {:form range,
                   :op   :var,
                   :info
                         {:protocol-inline nil,
                          :meta
                                           {:file       "cljs/core.cljs",
                                            :line       8499,
                                            :column     7,
                                            :end-line   8499,
                                            :end-column 12,
                                            :arglists   '([] [end] [start end] [start end step]),
                                            :doc
                                                        "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity.",
                                            :top-fn
                                                        {:variadic        false,
                                                         :max-fixed-arity 3,
                                                         :method-params   ([] [end] [start end] [start end step]),
                                                         :arglists        ([] [end] [start end] [start end step]),
                                                         :arglists-meta   (nil nil nil nil)}},
                          :ns              cljs.core,
                          :name            cljs.core/range,
                          :variadic        false,
                          :file            "cljs/core.cljs",
                          :end-column      12,
                          :top-fn
                                           {:variadic        false,
                                            :max-fixed-arity 3,
                                            :method-params   ([] [end] [start end] [start end step]),
                                            :arglists        ([] [end] [start end] [start end step]),
                                            :arglists-meta   (nil nil nil nil)},
                          :method-params   ([] [end] [start end] [start end step]),
                          :protocol-impl   nil,
                          :arglists-meta   (nil nil nil nil),
                          :column          nil,
                          :line            nil,
                          :end-line        8499,
                          :max-fixed-arity 3,
                          :fn-var          true,
                          :arglists        ([] [end] [start end] [start end step]),
                          :doc
                                           "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity."}},
            :args [{:op :constant, :form 10, :tag number}],
            :children
                  [{:form range,
                    :op   :var,
                    :info
                          {:protocol-inline nil,
                           :meta
                                            {:file       "cljs/core.cljs",
                                             :line       8499,
                                             :column     7,
                                             :end-line   8499,
                                             :end-column 12,
                                             :arglists   '([] [end] [start end] [start end step]),
                                             :doc
                                                         "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity.",
                                             :top-fn
                                                         {:variadic        false,
                                                          :max-fixed-arity 3,
                                                          :method-params   ([] [end] [start end] [start end step]),
                                                          :arglists        ([] [end] [start end] [start end step]),
                                                          :arglists-meta   (nil nil nil nil)}},
                           :ns              cljs.core,
                           :name            cljs.core/range,
                           :variadic        false,
                           :file            "cljs/core.cljs",
                           :end-column      12,
                           :top-fn
                                            {:variadic        false,
                                             :max-fixed-arity 3,
                                             :method-params   ([] [end] [start end] [start end step]),
                                             :arglists        ([] [end] [start end] [start end step]),
                                             :arglists-meta   (nil nil nil nil)},
                           :method-params   ([] [end] [start end] [start end step]),
                           :protocol-impl   nil,
                           :arglists-meta   (nil nil nil nil),
                           :column          nil,
                           :line            nil,
                           :end-line        8499,
                           :max-fixed-arity 3,
                           :fn-var          true,
                           :arglists        ([] [end] [start end] [start end step]),
                           :doc
                                            "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity."}}
                   {:op :constant, :form 10, :tag number}],
            :tag  any}],
    :children
          [{:form map,
            :op   :var,
            :info
                  {:protocol-inline nil,
                   :meta
                                    {:file       "cljs/core.cljs",
                                     :line       4167,
                                     :column     7,
                                     :end-line   4167,
                                     :end-column 10,
                                     :arglists
                                                 '([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                     :doc
                                                 "Returns a lazy sequence consisting of the result of applying f to\n  the set of first items of each coll, followed by applying f to the\n  set of second items in each coll, until any one of the colls is\n  exhausted.  Any remaining items in other colls are ignored. Function\n  f should accept number-of-colls arguments. Returns a transducer when\n  no collection is provided.",
                                     :top-fn
                                                 {:variadic        true,
                                                  :max-fixed-arity 4,
                                                  :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                                                  :arglists
                                                                   ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                                  :arglists-meta   (nil nil nil nil nil)}},
                   :ns              cljs.core,
                   :name            cljs.core/map,
                   :variadic        true,
                   :file            "cljs/core.cljs",
                   :end-column      10,
                   :top-fn
                                    {:variadic        true,
                                     :max-fixed-arity 4,
                                     :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                                     :arglists
                                                      ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                                     :arglists-meta   (nil nil nil nil nil)},
                   :method-params   ([f] [f coll] [f c1 c2] [f c1 c2 c3]),
                   :protocol-impl   nil,
                   :arglists-meta   (nil nil nil nil nil),
                   :column          nil,
                   :line            nil,
                   :end-line        4167,
                   :max-fixed-arity 4,
                   :fn-var          true,
                   :arglists
                                    ([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls]),
                   :doc
                                    "Returns a lazy sequence consisting of the result of applying f to\n  the set of first items of each coll, followed by applying f to the\n  set of second items in each coll, until any one of the colls is\n  exhausted.  Any remaining items in other colls are ignored. Function\n  f should accept number-of-colls arguments. Returns a transducer when\n  no collection is provided."}}
           {:form inc,
            :op   :var,
            :info
                  {:protocol-inline nil,
                   :meta
                                    {:file       "cljs/core.cljs",
                                     :line       1238,
                                     :column     7,
                                     :end-line   1238,
                                     :end-column 10,
                                     :arglists   '([x]),
                                     :doc        "Returns a number one greater than num."},
                   :ns              cljs.core,
                   :name            cljs.core/inc,
                   :variadic        false,
                   :file            "cljs/core.cljs",
                   :end-column      10,
                   :method-params   ([x]),
                   :protocol-impl   nil,
                   :arglists-meta   (nil nil),
                   :column          nil,
                   :line            nil,
                   :end-line        1238,
                   :max-fixed-arity 1,
                   :fn-var          true,
                   :arglists        '([x]),
                   :doc             "Returns a number one greater than num."}}
           {:op   :invoke,
            :form (range 10),
            :f
                  {:form range,
                   :op   :var,
                   :info
                         {:protocol-inline nil,
                          :meta
                                           {:file       "cljs/core.cljs",
                                            :line       8499,
                                            :column     7,
                                            :end-line   8499,
                                            :end-column 12,
                                            :arglists   '([] [end] [start end] [start end step]),
                                            :doc
                                                        "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity.",
                                            :top-fn
                                                        {:variadic        false,
                                                         :max-fixed-arity 3,
                                                         :method-params   ([] [end] [start end] [start end step]),
                                                         :arglists        ([] [end] [start end] [start end step]),
                                                         :arglists-meta   (nil nil nil nil)}},
                          :ns              cljs.core,
                          :name            cljs.core/range,
                          :variadic        false,
                          :file            "cljs/core.cljs",
                          :end-column      12,
                          :top-fn
                                           {:variadic        false,
                                            :max-fixed-arity 3,
                                            :method-params   ([] [end] [start end] [start end step]),
                                            :arglists        ([] [end] [start end] [start end step]),
                                            :arglists-meta   (nil nil nil nil)},
                          :method-params   ([] [end] [start end] [start end step]),
                          :protocol-impl   nil,
                          :arglists-meta   (nil nil nil nil),
                          :column          nil,
                          :line            nil,
                          :end-line        8499,
                          :max-fixed-arity 3,
                          :fn-var          true,
                          :arglists        ([] [end] [start end] [start end step]),
                          :doc
                                           "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity."}},
            :args [{:op :constant, :form 10, :tag number}],
            :children
                  [{:form range,
                    :op   :var,
                    :info
                          {:protocol-inline nil,
                           :meta
                                            {:file       "cljs/core.cljs",
                                             :line       8499,
                                             :column     7,
                                             :end-line   8499,
                                             :end-column 12,
                                             :arglists   '([] [end] [start end] [start end step]),
                                             :doc
                                                         "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity.",
                                             :top-fn
                                                         {:variadic        false,
                                                          :max-fixed-arity 3,
                                                          :method-params   ([] [end] [start end] [start end step]),
                                                          :arglists        ([] [end] [start end] [start end step]),
                                                          :arglists-meta   (nil nil nil nil)}},
                           :ns              cljs.core,
                           :name            cljs.core/range,
                           :variadic        false,
                           :file            "cljs/core.cljs",
                           :end-column      12,
                           :top-fn
                                            {:variadic        false,
                                             :max-fixed-arity 3,
                                             :method-params   ([] [end] [start end] [start end step]),
                                             :arglists        ([] [end] [start end] [start end step]),
                                             :arglists-meta   (nil nil nil nil)},
                           :method-params   ([] [end] [start end] [start end step]),
                           :protocol-impl   nil,
                           :arglists-meta   (nil nil nil nil),
                           :column          nil,
                           :line            nil,
                           :end-line        8499,
                           :max-fixed-arity 3,
                           :fn-var          true,
                           :arglists        ([] [end] [start end] [start end step]),
                           :doc
                                            "Returns a lazy seq of nums from start (inclusive) to end\n   (exclusive), by step, where start defaults to 0, step to 1,\n   and end to infinity."}}
                   {:op :constant, :form 10, :tag number}],
            :tag  any}],
    :tag  any}
  )


;(reset! rc/state temp-fit-data)

(def state
  "pseudo-AST"
  '{:op      :invoke
    :form    (map inc (range 10))
    :content [{:op   map
               :form map}
              {:op   inc
               :form inc}
              {:op      range
               :form    range
               :content [{:op :constant :form 10}]}]})

(s/def ::nested-entity map?)
(s/def ::nested-entities (s/coll-of ::nested-entity))
(s/def ::entities-map
  (s/map-of keyword?
            (s/or :entity ::nested-entity
                  :entities ::nested-entities)))

(s/def ::content
  (s/or :entity ::nested-entity
        :entities ::nested-entities
        :entities-map ::entities-map))

;(s/def ::content ::nested-content)
;(rr/get-keys-spec ::nested-entity)
;(rr/filter-spec-keys-from-keys-spec ::content ::nested-entity)
#_(rc/child-view-mappings {:entity-spec ::nested-entity
                         :resolve-spec  ::content})
(def root (rc/ui-root
           {#_#_:invoke-fn (fn invoke [f x]
                             [f x])
            :lookup         (fn [x]
                              (cond
                                (map? x) x
                                (nil? x) state
                                (vector? x) (get-in state x)))
            :child-keys     [:content]
            :resolve-spec   ::content
            ;:lookup-sub     lookup-sub
            :ent->view-name :op
            ;:transact       rc/transact
            ;:entity-actions entity-actions
            ;:add-id         rc/add-id
            }))

(defn render-example []
  (uix.dom/render
   [rr/nested-resolved-view root {:path []}]
   ;[:h1 "hello"]
   (. js/document (getElementById "app"))))


#_(-> (rr/nested-resolved-view root {:entity {:op      range
                                              :form    range
                                              :content [{:op :constant :form 10}]}})
      (get 6)
      (get 2)
      first
      ifn?)
