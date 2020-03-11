goog.provide('examples.fetch.views');
goog.require('cljs.core');
goog.require('root.impl.core');
goog.require('kitchen_async.promise');
goog.require('examples.util.dom');
goog.require('uix.dom.alpha');
examples.fetch.views.fetch_json = (function examples$fetch$views$fetch_json(str){
try{try{return kitchen_async.promise.then.cljs$core$IFn$_invoke$arity$2(kitchen_async.promise.then.cljs$core$IFn$_invoke$arity$2(fetch(str),(function (v__49832__auto__){
var fexpr__102944 = (function (G__102941){
if((G__102941 == null)){
return null;
} else {
return G__102941.json();
}
});
return fexpr__102944(v__49832__auto__);
})),(function (v__49832__auto__){
var fexpr__102945 = (function (G__102941){
if((G__102941 == null)){
return null;
} else {
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(G__102941,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
}
});
return fexpr__102945(v__49832__auto__);
}));
}catch (e102943){var e__49766__auto__ = e102943;
return kitchen_async.promise.reject(e__49766__auto__);
}}catch (e102942){var e__49766__auto__ = e102942;
return kitchen_async.promise.reject(e__49766__auto__);
}});
examples.fetch.views.root = root.impl.core.ui_root(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"content-keys","content-keys",2000186673),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"content","content",15833224)], null),new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556),(function (x){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.Keyword(null,"id","id",-1388402092));
})], null));
var G__102946_103034 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__102947_103035 = new cljs.core.Keyword(null,"loading","loading",-737050189);
var G__102948_103036 = (function (p__102949){
var map__102950 = p__102949;
var map__102950__$1 = (((((!((map__102950 == null))))?(((((map__102950.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102950.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102950):map__102950);
var markup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102950__$1,new cljs.core.Keyword(null,"markup","markup",2143234544));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Loading..."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),markup], null)], null);
});
(examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3(G__102946_103034,G__102947_103035,G__102948_103036) : examples.fetch.views.root.call(null,G__102946_103034,G__102947_103035,G__102948_103036));
var G__102955_103049 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__102956_103050 = new cljs.core.Keyword(null,"ordered-list","ordered-list",1590139111);
var G__102957_103051 = (function (p__102961){
var map__102962 = p__102961;
var map__102962__$1 = (((((!((map__102962 == null))))?(((((map__102962.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102962.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102962):map__102962);
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102962__$1,new cljs.core.Keyword(null,"content","content",15833224));
var content_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102962__$1,new cljs.core.Keyword(null,"content-ui","content-ui",-1698773970));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102962__$1,new cljs.core.Keyword(null,"title","title",636505583));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.pl2","h2.pl2",-1405071074),title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),content_ui], null)], null);
});
(examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3(G__102955_103049,G__102956_103050,G__102957_103051) : examples.fetch.views.root.call(null,G__102955_103049,G__102956_103050,G__102957_103051));
var G__102965_103053 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__102966_103054 = "story";
var G__102967_103055 = (function (p__102968){
var map__102969 = p__102968;
var map__102969__$1 = (((((!((map__102969 == null))))?(((((map__102969.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102969.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102969):map__102969);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102969__$1,new cljs.core.Keyword(null,"title","title",636505583));
var by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102969__$1,new cljs.core.Keyword(null,"by","by",30600856));
var url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102969__$1,new cljs.core.Keyword(null,"url","url",276297046));
var score = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102969__$1,new cljs.core.Keyword(null,"score","score",-1963588780));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.pa1.hover-bg-light-gray","li.pa1.hover-bg-light-gray",-1608943849),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.dib","div.dib",-52446700),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.link","a.link",-619461443),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),url], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),title], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),[" - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(by)].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.f6.gray","span.f6.gray",-1588121279),score," points"], null)], null);
});
(examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3(G__102965_103053,G__102966_103054,G__102967_103055) : examples.fetch.views.root.call(null,G__102965_103053,G__102966_103054,G__102967_103055));
var G__102974_103056 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__102975_103057 = "job";
var G__102976_103058 = (function (p__102977){
var map__102982 = p__102977;
var map__102982__$1 = (((((!((map__102982 == null))))?(((((map__102982.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102982.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102982):map__102982);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102982__$1,new cljs.core.Keyword(null,"title","title",636505583));
var by = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102982__$1,new cljs.core.Keyword(null,"by","by",30600856));
var score = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102982__$1,new cljs.core.Keyword(null,"score","score",-1963588780));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102982__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var title_hic = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.dib","div.dib",-52446700),title," - ",by], null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.pa1.bg-light-yellow","li.pa1.bg-light-yellow",1358441211),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.items-center","div.flex.items-center",-1537844053),((cljs.core.not(text))?title_hic:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary.outline-0","summary.outline-0",2079300894),title_hic], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.ph3.pt2","div.ph3.pt2",-1110184703),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),text], null)], null)], null)], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.ph2.pv1.ml2.code.self-center.bg-light-gray.ba.br2","span.ph2.pv1.ml2.code.self-center.bg-light-gray.ba.br2",1300324320),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"0.7rem"], null)], null),"job"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.f6.gray","span.f6.gray",-1588121279),score," points"], null)], null);
});
(examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.fetch.views.root.cljs$core$IFn$_invoke$arity$3(G__102974_103056,G__102975_103057,G__102976_103058) : examples.fetch.views.root.call(null,G__102974_103056,G__102975_103057,G__102976_103058));
examples.fetch.views.data_promise = (function (){try{return kitchen_async.promise.__GT_promise(kitchen_async.promise.then.cljs$core$IFn$_invoke$arity$2(examples.fetch.views.fetch_json("https://hacker-news.firebaseio.com/v0/topstories.json"),(function (pdata){
return kitchen_async.promise.then.cljs$core$IFn$_invoke$arity$2(cljs.core.take.cljs$core$IFn$_invoke$arity$2((50),pdata),(function (top_50){
return kitchen_async.promise.then.cljs$core$IFn$_invoke$arity$2(kitchen_async.promise.all(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(examples.fetch.views.fetch_json,(function (post_id){
return ["https://hacker-news.firebaseio.com/v0/item/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(post_id),".json"].join('');
})),top_50)),(function (items){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ordered-list","ordered-list",1590139111),new cljs.core.Keyword(null,"title","title",636505583),["Top ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(items))," Posts"].join(''),new cljs.core.Keyword(null,"content","content",15833224),cljs.core.vec(items)], null);
}));
}));
})));
}catch (e102991){var e__49766__auto__ = e102991;
return kitchen_async.promise.reject(e__49766__auto__);
}})();
examples.fetch.views.example_root = (function examples$fetch$views$example_root(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.util.dom.example,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),"Hackernews Reader (implicit promise resolve)",new cljs.core.Keyword(null,"source","source",-433931539),"https://github.com/den1k/root/blob/master/dev/examples/fetch/views.cljs",new cljs.core.Keyword(null,"open-details?","open-details?",-1562807107),true,new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"This root is passed a promise that pulls hackernews data under the\n        ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code.red","code.red",1428174603),":data"], null)," key.\n        The promise is implicitly resolved by root's resolver and passed\n        to root to render."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"The root is also passed a loading state",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pv1","div.pv1",1244963062),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.util.dom.pretty_code_block,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.Keyword(null,"markup","markup",2143234544),"Your favorite posts"], null),new cljs.core.Keyword(null,"promise","promise",1767129287),new cljs.core.Symbol(null,"<data-promise>","<data-promise>",586620474,null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.f6.silver","span.f6.silver",162469492),"(if you don't see it try throttling your network in devtools)"], null)], null)], null),new cljs.core.Keyword(null,"root","root",-448657453),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.fetch.views.root,new cljs.core.Keyword(null,"resolve","resolve",-1584445482),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.Keyword(null,"markup","markup",2143234544),"Your favorite posts"], null),new cljs.core.Keyword(null,"promise","promise",1767129287),examples.fetch.views.data_promise], null)], null)], null)], null)], null);
});
goog.exportSymbol('examples.fetch.views.example_root', examples.fetch.views.example_root);
examples.fetch.views.render_fn = (function examples$fetch$views$render_fn(dom_node){
return uix.dom.alpha.render(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.fetch.views.example_root], null),dom_node);
});
goog.exportSymbol('examples.fetch.views.render_fn', examples.fetch.views.render_fn);

//# sourceMappingURL=examples.fetch.views.js.map
