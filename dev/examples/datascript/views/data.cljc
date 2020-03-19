(ns examples.datascript.views.data
  (:require [datascript.core :as d]))

#?(:clj
   (defn views-src-forms []
     (clojure.string/split
      (slurp "dev/examples/datascript/views.cljs")
      #"\n\n")))

(defn form->ent [form]
  {:db/id        (d/tempid nil)
   :type         :block
   :content-type :code
   :text         form})

(def lil-readme
  [{:content-type :markdown,
    :name         "markdown readme",
    :text         "This is a **notebook-style** editor with support for:\n\n- markdown\n- code (with back-ticks in `markdown` and Clojure syntax highlighting in the dedicated code editor) and\n- rich text",
    :type         :block}
   {:content-type :rich-text,
    :name         "rich text readme",
    :text         "Besides two <i>small</i> utility files, the <b>entire</b> source is merely 😱️<b>240 LoC&nbsp;😱️</b>&nbsp;long and can be found on <a href=\"https://github.com/den1k/root/blob/master/dev/examples/datascript/views.cljs\">GitHub</a> or below, in this notebook.<div><div><div><div><span><br></span></div><div></div><div><img src=\"https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=790b761165de595d09167a5d07fa305fee795a0ed6a8700b&amp;rid=giphy.gif\" alt=\"Cat Reaction GIF\"></div><div><br><b>Go make some edits, knock yourself out!</b></div></div></div></div>"
    :type         :block}])

(defn code-notebook [forms]
  {:db/id   (d/tempid nil)
   :name    "Root + Reagent + Datascript (with posh)"
   :type    :notebook
   :content (into lil-readme (map form->ent) forms)})

#?(:clj
   (defmacro code-notebook-data []
     (code-notebook (views-src-forms))))

#?(:clj
   (defmacro data []
     (let [code-notebook (assoc (code-notebook-data) :db/id -1)]
       [code-notebook
        {:db/id   -2
         :name    "Another Notebook..."
         :type    :notebook
         :content [-12]}
        {:db/id   -8
         :type    :notebooks
         :current -1
         :choices [-1 -2]}
        {:db/id        -12
         :type         :block
         :content-type :rich-text
         :text         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut leo sit amet mauris tempus luctus. Nullam placerat metus leo, et faucibus odio mattis a. Nulla ac quam magna. Aliquam vestibulum enim dolor, sit amet volutpat arcu egestas nec. Nullam bibendum volutpat ultricies. Nunc nec vehicula ante. Nam est massa, sollicitudin sit amet felis a, vestibulum viverra nunc. Mauris et tristique turpis, non eleifend nulla. Mauris commodo blandit justo id imperdiet. Phasellus varius eget turpis interdum sodales. Vestibulum ac efficitur metus."}])))
