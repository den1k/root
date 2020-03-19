(ns docs
  (:require
   [clojure.java.io :as io]
   [shadow.cljs.devtools.api :as shadow.api]
   [clojure.string :as str]
   [root.impl.util :as u]
   [uix.dom.alpha]
   [uix.dom.alpha :as uix.dom])
  (:import (org.apache.commons.io FileUtils)))

(defn document
  [{:as opts :keys [js styles links meta body]}]
  [:html
   [:head
    (for [m meta]
      [:meta m])
    (for [s styles]
      [:style {:type "text/css"} s])
    (for [l links]
      [:link {:rel "stylesheet" :href l}])
    [:title "root"]]
   [:body
    body
    (for [{:keys [src script]} js]
      [:script
       (if src
         {:src src}
         {:dangerouslySetInnerHTML {:__html script}})])]])

(defn html [opts]
  [:<>
   [:meta {:charset "UTF-8"}]
   [document
    (u/deep-merge
     opts
     {:body   [:div#app.sans-serif]
      :meta   [{:name    "viewport"
                :content "width=device-width, initial-scale=1"}]
      :styles []
      :links  ["https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
               "css/app.css"
               "css/codemirror.css"
               "css/codemirror/duotone-light.css"
               "https://fonts.googleapis.com/css?family=Fira+Code&display=swap"]
      :js     [{:src "js/compiled/main.js"}]})]])

(defn views-files []
  (keep (fn [fl]
          (let [p     (.getPath fl)
                view? (str/includes? p "/views.clj")]
            (when view? fl)))
        (file-seq (io/file "dev/examples"))))

(defn file-ns [fl]
  (second (read-string (slurp fl))))

(defn fl->example-js-render-fn [fl-ns]
  (-> (str fl-ns ".render-fn(document.getElementById('app'))")
      (str/replace #"-" "_")))

(defn file->index-html [fl-ns]
  [html {:js [{:script (fl->example-js-render-fn fl-ns)}]}])

(defn files->index-html-file-names+content [files]
  (for [fl files
        :let [fl-ns         (file-ns fl)
              index-fl-name (str (second (str/split (str fl-ns) #"\.")) ".html")
              hic           [file->index-html fl-ns]]]
    [index-fl-name (uix.dom/render-to-static-markup hic)]))

(def docs-dir "docs")

(comment


 (FileUtils/copyDirectory
  (io/file "resources/public/css")
  (io/file (str docs-dir "/css")))


 (let [files (files->index-html-file-names+content (views-files))
       ;; fixme remove this once multiple DB's are supported
       files (remove (fn [[file-name]]
                       ;; nested doesn't work in advanced compilation
                           (re-find #"nested" file-name))
                         files)]

   files
   (doseq [[fl-name content] files]
     (spit (str docs-dir "/" fl-name) content)))

 ;(shadow.api/compile :examples)
 (shadow.api/release :examples)

 )

