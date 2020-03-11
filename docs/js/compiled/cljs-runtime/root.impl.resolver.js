goog.provide('root.impl.resolver');
goog.require('cljs.core');
goog.require('root.impl.util');
goog.require('root.impl.entity');
goog.require('medley.core');
goog.require('cljs.spec.alpha');
goog.require('uix.core.alpha');
root.impl.resolver.__GT_resolver_spec = (function root$impl$resolver$__GT_resolver_spec(content_spec){
var content_spec__$1 = cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),content_spec,null,null);
var nested_contents = cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),content_spec__$1,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102512){
return cljs.core.coll_QMARK_(G__102512);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null))], null),null);
var contents_map = cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.list(new cljs.core.Symbol("s","or","s/or",1876282981,null),new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Keyword(null,"entities","entities",1940967403),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null))),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Keyword(null,"entities","entities",1940967403),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Keyword(null,"entities","entities",1940967403)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [content_spec__$1,nested_contents], null),null)], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102513){
return cljs.core.map_QMARK_(G__102513);
}),new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13771__auto__,v__13772__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13772__auto__,(0));
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"entity","entity",-450970276),new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Keyword(null,"entities","entities",1940967403),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null)))], null),null);
return cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Keyword(null,"contents","contents",-1567174023),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null),new cljs.core.Keyword(null,"content-map","content-map",1529325849),new cljs.core.Symbol(null,"contents-map","contents-map",-111130196,null)),cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"contents","contents",-1567174023),new cljs.core.Keyword(null,"content-map","content-map",1529325849)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"content-spec","content-spec",-88851029,null),new cljs.core.Symbol(null,"nested-contents","nested-contents",811375774,null),new cljs.core.Symbol(null,"contents-map","contents-map",-111130196,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [content_spec__$1,nested_contents,contents_map], null),null),null,null);
});
root.impl.resolver.resolve_content = (function root$impl$resolver$resolve_content(var_args){
var G__102516 = arguments.length;
switch (G__102516) {
case 3:
return root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$3 = (function (root__$1,content_k,content){
return root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$4(root__$1,content_k,content,cljs.core.identity);
}));

(root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$4 = (function (p__102517,content_k,content,f){
var map__102518 = p__102517;
var map__102518__$1 = (((((!((map__102518 == null))))?(((((map__102518.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102518.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102518):map__102518);
var root__$1 = map__102518__$1;
var resolve_spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102518__$1,new cljs.core.Keyword(null,"resolve-spec","resolve-spec",-1426665524));
var contents_hiccup_wrapper = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102518__$1,new cljs.core.Keyword(null,"contents-hiccup-wrapper","contents-hiccup-wrapper",1839301927));
var vec__102520 = root.impl.util.conform_BANG_(resolve_spec,content);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102520,(0),null);
var G__102523 = type;
var G__102523__$1 = (((G__102523 instanceof cljs.core.Keyword))?G__102523.fqn:null);
switch (G__102523__$1) {
case "content":
return cljs.core.with_meta((function (){var G__102524 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"content-k","content-k",1788807168),content_k,new cljs.core.Keyword(null,"id-or-ent","id-or-ent",117907373),content], null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__102524) : f.call(null,G__102524));
})(),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("root.impl.resolver","type","root.impl.resolver/type",-913307228),new cljs.core.Keyword(null,"entity","entity",-450970276)], null));

break;
case "contents":
return cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$3(contents_hiccup_wrapper,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1((function (k,ref){
var G__102525 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"k","k",-2146297393),k,new cljs.core.Keyword(null,"content-k","content-k",1788807168),content_k,new cljs.core.Keyword(null,"id-or-ent","id-or-ent",117907373),ref], null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__102525) : f.call(null,G__102525));
})),content),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("root.impl.resolver","type","root.impl.resolver/type",-913307228),new cljs.core.Keyword(null,"entities","entities",1940967403)], null));

break;
case "content-map":
return cljs.core.with_meta(cljs.core.reduce_kv((function (out,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,k,root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$4(root__$1,content_k,v,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(f,(function (p__102526){
var map__102527 = p__102526;
var map__102527__$1 = (((((!((map__102527 == null))))?(((((map__102527.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102527.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102527):map__102527);
var x = map__102527__$1;
var next_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102527__$1,new cljs.core.Keyword(null,"k","k",-2146297393));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(x,new cljs.core.Keyword(null,"k","k",-2146297393),(cljs.core.truth_(next_key)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,next_key], null):k),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content-k","content-k",1788807168),content_k], 0));
}))));
}),cljs.core.PersistentArrayMap.EMPTY,content),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("root.impl.resolver","type","root.impl.resolver/type",-913307228),new cljs.core.Keyword(null,"entity-map","entity-map",238028540)], null));

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__102523__$1)].join('')));

}
}));

(root.impl.resolver.resolve_content.cljs$lang$maxFixedArity = 4);

root.impl.resolver.resolve_child_content = (function root$impl$resolver$resolve_child_content(var_args){
var G__102531 = arguments.length;
switch (G__102531) {
case 2:
return root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$2 = (function (root__$1,ent){
return root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$3(root__$1,ent,cljs.core.identity);
}));

(root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$3 = (function (p__102532,ent,f){
var map__102533 = p__102532;
var map__102533__$1 = (((((!((map__102533 == null))))?(((((map__102533.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102533.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102533):map__102533);
var root__$1 = map__102533__$1;
var content_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102533__$1,new cljs.core.Keyword(null,"content-keys","content-keys",2000186673));
var content_key__GT_ui_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102533__$1,new cljs.core.Keyword(null,"content-key->ui-key","content-key->ui-key",2026428641));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (out,chk){
var ch = (chk.cljs$core$IFn$_invoke$arity$1 ? chk.cljs$core$IFn$_invoke$arity$1(ent) : chk.call(null,ent));
var coll_QMARK_ = cljs.core.coll_QMARK_(ch);
if(cljs.core.truth_((function (){var or__4185__auto__ = ((coll_QMARK_)?cljs.core.not_empty(ch):false);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (((!(coll_QMARK_))) && ((!((ch == null)))));
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,(content_key__GT_ui_key.cljs$core$IFn$_invoke$arity$1 ? content_key__GT_ui_key.cljs$core$IFn$_invoke$arity$1(chk) : content_key__GT_ui_key.call(null,chk)),root.impl.resolver.resolve_content.cljs$core$IFn$_invoke$arity$4(root__$1,chk,ch,f));
} else {
return out;
}
}),ent,content_keys);
}));

(root.impl.resolver.resolve_child_content.cljs$lang$maxFixedArity = 3);

cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.resolver","txs-path","root.impl.resolver/txs-path",-1309301866),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.keyword_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102535){
return cljs.core.coll_QMARK_(G__102535);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.resolver","op-path","root.impl.resolver/op-path",-2014265696),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__102536#","p1__102536#",966971459,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","or","cljs.core/or",1201033885,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"p1__102536#","p1__102536#",966971459,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"p1__102536#","p1__102536#",966971459,null)))),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null))))))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","or","cljs.core/or",1201033885,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"%","%",-950237169,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null))))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__102536_SHARP_){
return (((p1__102536_SHARP_ instanceof cljs.core.Keyword)) || (cljs.core.vector_QMARK_(p1__102536_SHARP_)));
}),cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null)))))),(function (x){
if((x instanceof cljs.core.Keyword)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
} else {
if(cljs.core.vector_QMARK_(x)){
return cljs.core.not_empty(x);
} else {
return false;
}
}
}),null,true)], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.resolver","op-path","root.impl.resolver/op-path",-2014265696)),new cljs.core.Keyword(null,"ent","ent",1225127586),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.entity","partial-entity","root.impl.entity/partial-entity",-1206531652))),cljs.spec.alpha.cat_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"ent","ent",1225127586)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.spec.alpha.maybe_impl(new cljs.core.Keyword("root.impl.resolver","op-path","root.impl.resolver/op-path",-2014265696),new cljs.core.Keyword("root.impl.resolver","op-path","root.impl.resolver/op-path",-2014265696)),cljs.spec.alpha.maybe_impl(new cljs.core.Keyword("root.impl.entity","partial-entity","root.impl.entity/partial-entity",-1206531652),new cljs.core.Keyword("root.impl.entity","partial-entity","root.impl.entity/partial-entity",-1206531652))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.resolver","op-path","root.impl.resolver/op-path",-2014265696)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.entity","partial-entity","root.impl.entity/partial-entity",-1206531652))], null)));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.resolver","partial-txs","root.impl.resolver/partial-txs",-372778010),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244),new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102550){
return cljs.core.coll_QMARK_(G__102550);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.resolver","partial-txs-or-txs-path","root.impl.resolver/partial-txs-or-txs-path",472440800),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"partial-txs","partial-txs",1833772014),new cljs.core.Keyword("root.impl.resolver","partial-txs","root.impl.resolver/partial-txs",-372778010),new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword("root.impl.resolver","txs-path","root.impl.resolver/txs-path",-1309301866)),cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"partial-txs","partial-txs",1833772014),new cljs.core.Keyword(null,"path","path",-188191168)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.resolver","partial-txs","root.impl.resolver/partial-txs",-372778010),new cljs.core.Keyword("root.impl.resolver","txs-path","root.impl.resolver/txs-path",-1309301866)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.resolver","partial-txs","root.impl.resolver/partial-txs",-372778010),new cljs.core.Keyword("root.impl.resolver","txs-path","root.impl.resolver/txs-path",-1309301866)], null),null));
root.impl.resolver.wrap_actions_and_handlers = (function root$impl$resolver$wrap_actions_and_handlers(p__102552,p__102553){
var map__102554 = p__102552;
var map__102554__$1 = (((((!((map__102554 == null))))?(((((map__102554.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102554.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102554):map__102554);
var root__$1 = map__102554__$1;
var dispatch_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102554__$1,new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614));
var transact = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102554__$1,new cljs.core.Keyword(null,"transact","transact",-267998670));
var entity_actions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102554__$1,new cljs.core.Keyword(null,"entity-actions","entity-actions",1748825852));
var add_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102554__$1,new cljs.core.Keyword(null,"add-id","add-id",-989371530));
var __GT_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102554__$1,new cljs.core.Keyword(null,"->ref","->ref",1148655726));
var map__102555 = p__102553;
var map__102555__$1 = (((((!((map__102555 == null))))?(((((map__102555.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102555.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102555):map__102555);
var orig_ent = map__102555__$1;
var actions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102555__$1,new cljs.core.Keyword(null,"actions","actions",-812656882));
var handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102555__$1,new cljs.core.Keyword(null,"handlers","handlers",79528781));
var parent_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102555__$1,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131));
var resolve_txs = (function root$impl$resolver$wrap_actions_and_handlers_$_resolve_txs(conformed,txs_or_txs_path){
var G__102573 = cljs.core.first(conformed);
var G__102573__$1 = (((G__102573 instanceof cljs.core.Keyword))?G__102573.fqn:null);
switch (G__102573__$1) {
case "partial-txs":
return txs_or_txs_path;

break;
case "path":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(entity_actions,txs_or_txs_path);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__102573__$1)].join('')));

}
});
var form_tx = (function root$impl$resolver$wrap_actions_and_handlers_$_form_tx(tx){
var map__102576 = root.impl.util.conform_BANG_(new cljs.core.Keyword("root.impl.resolver","partial-tx","root.impl.resolver/partial-tx",732063244),tx);
var map__102576__$1 = (((((!((map__102576 == null))))?(((((map__102576.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102576.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102576):map__102576);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102576__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102576__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102576__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var G__102578 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [op], null);
var G__102578__$1 = (cljs.core.truth_(path)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__102578,cljs.core.replace.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"<-","<-",760412998),parent_id], null),path)):G__102578);
var G__102578__$2 = ((cljs.core.not(path))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__102578__$1,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(orig_ent)):G__102578__$1);
var G__102578__$3 = (cljs.core.truth_(ent)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__102578__$2,(function (){var G__102582 = ent;
if(((__GT_ref.cljs$core$IFn$_invoke$arity$1 ? __GT_ref.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref.call(null,ent)) == null)){
return (add_id.cljs$core$IFn$_invoke$arity$1 ? add_id.cljs$core$IFn$_invoke$arity$1(G__102582) : add_id.call(null,G__102582));
} else {
return G__102582;
}
})()):G__102578__$2);
if(cljs.core.not(ent)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__102578__$3,orig_ent);
} else {
return G__102578__$3;
}
});
var form_txs = (function root$impl$resolver$wrap_actions_and_handlers_$_form_txs(txs){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(form_tx,txs);
});
var wrap = (function root$impl$resolver$wrap_actions_and_handlers_$_wrap(actions_map){
return medley.core.map_vals((function (txs_or_path){
return (function (){
var txs_or_path_conformed = root.impl.util.conform_BANG_(new cljs.core.Keyword("root.impl.resolver","partial-txs-or-txs-path","root.impl.resolver/partial-txs-or-txs-path",472440800),txs_or_path);
var G__102585 = root__$1;
var G__102586 = form_txs(resolve_txs(txs_or_path_conformed,txs_or_path));
return (transact.cljs$core$IFn$_invoke$arity$2 ? transact.cljs$core$IFn$_invoke$arity$2(G__102585,G__102586) : transact.call(null,G__102585,G__102586));
});
}),actions_map);
});
var dispatch_val = (dispatch_fn.cljs$core$IFn$_invoke$arity$1 ? dispatch_fn.cljs$core$IFn$_invoke$arity$1(orig_ent) : dispatch_fn.call(null,orig_ent));
var ent_actions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(entity_actions,dispatch_val);
var G__102587 = orig_ent;
var G__102587__$1 = (cljs.core.truth_(ent_actions)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102587,new cljs.core.Keyword(null,"actions","actions",-812656882),wrap(ent_actions)):G__102587);
var G__102587__$2 = (cljs.core.truth_(actions)?cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__102587__$1,new cljs.core.Keyword(null,"actions","actions",-812656882),cljs.core.merge,wrap(actions)):G__102587__$1);
if(cljs.core.truth_(handlers)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102587__$2,new cljs.core.Keyword(null,"handlers","handlers",79528781),wrap(handlers));
} else {
return G__102587__$2;
}
});
root.impl.resolver.deref_state_hook = (function root$impl$resolver$deref_state_hook(x){
if((x instanceof uix.hooks.alpha.StateHook)){
return cljs.core.deref(x);
} else {
return x;
}
});
root.impl.resolver.js_promise_QMARK_ = (function root$impl$resolver$js_promise_QMARK_(p){
return cljs.core.boolean$(p.then);
});
root.impl.resolver.js_promise_hook = (function root$impl$resolver$js_promise_hook(p__102588){
var map__102589 = p__102588;
var map__102589__$1 = (((((!((map__102589 == null))))?(((((map__102589.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102589.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102589):map__102589);
var x = map__102589__$1;
var loading = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102589__$1,new cljs.core.Keyword(null,"loading","loading",-737050189));
var promise = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102589__$1,new cljs.core.Keyword(null,"promise","promise",1767129287));
var x__$1 = (function (){var or__4185__auto__ = promise;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return x;
}
})();
if(root.impl.resolver.js_promise_QMARK_(x__$1)){
var st = uix.core.alpha.state(loading);
x__$1.then((function (x__$2){
return cljs.core.reset_BANG_(st,x__$2);
}));

return st;
} else {
return x__$1;
}
});
root.impl.resolver.resolved_view = (function root$impl$resolver$resolved_view(var_args){
var G__102593 = arguments.length;
switch (G__102593) {
case 1:
return root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$1 = (function (root__$1){
return root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$2(root__$1,cljs.core.select_keys(root__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"root-id","root-id",1294683809),new cljs.core.Keyword(null,"data","data",-232669377)], null)));
}));

(root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$2 = (function (p__102595,p__102596){
var map__102597 = p__102595;
var map__102597__$1 = (((((!((map__102597 == null))))?(((((map__102597.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102597.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102597):map__102597);
var root__$1 = map__102597__$1;
var lookup_sub = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102597__$1,new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981));
var map__102598 = p__102596;
var map__102598__$1 = (((((!((map__102598 == null))))?(((((map__102598.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102598.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102598):map__102598);
var root_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102598__$1,new cljs.core.Keyword(null,"root-id","root-id",1294683809));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102598__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var parent_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102598__$1,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102598__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var temp__5739__auto__ = (function (){var G__102601 = (function (){var or__4185__auto__ = data;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var G__102603 = (function (){var or__4185__auto____$1 = root_id;
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return path;
}
})();
return (lookup_sub.cljs$core$IFn$_invoke$arity$1 ? lookup_sub.cljs$core$IFn$_invoke$arity$1(G__102603) : lookup_sub.call(null,G__102603));
}
})();
var G__102601__$1 = (((G__102601 == null))?null:root.impl.resolver.js_promise_hook(G__102601));
if((G__102601__$1 == null)){
return null;
} else {
return root.impl.resolver.deref_state_hook(G__102601__$1);
}
})();
if(cljs.core.truth_(temp__5739__auto__)){
var data__$1 = temp__5739__auto__;
var x = data__$1;
var x__$1 = cljs.core.with_meta(x,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"root","root",-448657453),root__$1], null));
var x__$2 = (function (){var G__102604 = x__$1;
if(cljs.core.truth_(parent_id)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102604,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131),parent_id);
} else {
return G__102604;
}
})();
var x__$3 = (function (){var G__102605 = x__$2;
if(cljs.core.truth_((function (){var or__4185__auto__ = path;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return root_id;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102605,new cljs.core.Keyword(null,"path","path",-188191168),(function (){var or__4185__auto__ = path;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [root_id], null);
}
})());
} else {
return G__102605;
}
})();
var x__$4 = (function (){var G__102606 = x__$3;
if(cljs.core.truth_(root_id)){
return root.impl.resolver.wrap_actions_and_handlers(root__$1,G__102606);
} else {
return G__102606;
}
})();
var x__$5 = root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$3(root__$1,x__$4,(function (p__102607){
var map__102608 = p__102607;
var map__102608__$1 = (((((!((map__102608 == null))))?(((((map__102608.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102608.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102608):map__102608);
var k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102608__$1,new cljs.core.Keyword(null,"k","k",-2146297393));
var id_or_ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102608__$1,new cljs.core.Keyword(null,"id-or-ent","id-or-ent",117907373));
var content_k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102608__$1,new cljs.core.Keyword(null,"content-k","content-k",1788807168));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [root.impl.resolver.resolved_view,root__$1,(((!(cljs.core.coll_QMARK_(id_or_ent))))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"root-id","root-id",1294683809),id_or_ent,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131),root_id,new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root_id,content_k], null),root.impl.util.ensure_vec(k))], null):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),id_or_ent,new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.into.cljs$core$IFn$_invoke$arity$3(root.impl.util.ensure_vec(path),cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.nil_QMARK_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [content_k,k], null))], null))], null);
}));
return (root__$1.cljs$core$IFn$_invoke$arity$1 ? root__$1.cljs$core$IFn$_invoke$arity$1(x__$5) : root__$1.call(null,x__$5));
} else {
return null;
}
}));

(root.impl.resolver.resolved_view.cljs$lang$maxFixedArity = 2);

root.impl.resolver.resolved_data = (function root$impl$resolver$resolved_data(var_args){
var G__102611 = arguments.length;
switch (G__102611) {
case 1:
return root.impl.resolver.resolved_data.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return root.impl.resolver.resolved_data.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.resolver.resolved_data.cljs$core$IFn$_invoke$arity$1 = (function (root__$1){
return root.impl.resolver.resolved_view.cljs$core$IFn$_invoke$arity$2(root__$1,cljs.core.select_keys(root__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"root-id","root-id",1294683809),new cljs.core.Keyword(null,"data","data",-232669377)], null)));
}));

(root.impl.resolver.resolved_data.cljs$core$IFn$_invoke$arity$2 = (function (p__102612,p__102613){
var map__102614 = p__102612;
var map__102614__$1 = (((((!((map__102614 == null))))?(((((map__102614.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102614.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102614):map__102614);
var root__$1 = map__102614__$1;
var lookup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102614__$1,new cljs.core.Keyword(null,"lookup","lookup",1225356838));
var map__102615 = p__102613;
var map__102615__$1 = (((((!((map__102615 == null))))?(((((map__102615.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102615.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102615):map__102615);
var root_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102615__$1,new cljs.core.Keyword(null,"root-id","root-id",1294683809));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102615__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var parent_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102615__$1,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102615__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var temp__5739__auto__ = (function (){var or__4185__auto__ = data;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var G__102618 = (function (){var or__4185__auto____$1 = root_id;
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return path;
}
})();
return (lookup.cljs$core$IFn$_invoke$arity$1 ? lookup.cljs$core$IFn$_invoke$arity$1(G__102618) : lookup.call(null,G__102618));
}
})();
if(cljs.core.truth_(temp__5739__auto__)){
var data__$1 = temp__5739__auto__;
var x = data__$1;
var x__$1 = cljs.core.with_meta(x,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"root","root",-448657453),root__$1], null));
var x__$2 = (function (){var G__102619 = x__$1;
if(cljs.core.truth_(parent_id)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102619,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131),parent_id);
} else {
return G__102619;
}
})();
var x__$3 = (function (){var G__102620 = x__$2;
if(cljs.core.truth_(path)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__102620,new cljs.core.Keyword(null,"path","path",-188191168),path);
} else {
return G__102620;
}
})();
return root.impl.resolver.resolve_child_content.cljs$core$IFn$_invoke$arity$3(root__$1,x__$3,(function (p__102621){
var map__102622 = p__102621;
var map__102622__$1 = (((((!((map__102622 == null))))?(((((map__102622.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102622.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102622):map__102622);
var k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102622__$1,new cljs.core.Keyword(null,"k","k",-2146297393));
var id_or_ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102622__$1,new cljs.core.Keyword(null,"id-or-ent","id-or-ent",117907373));
var content_k = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102622__$1,new cljs.core.Keyword(null,"content-k","content-k",1788807168));
return root.impl.resolver.resolved_data.cljs$core$IFn$_invoke$arity$2(root__$1,(((!(cljs.core.coll_QMARK_(id_or_ent))))?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"root-id","root-id",1294683809),id_or_ent,new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131),root_id,new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root_id,content_k], null),root.impl.util.ensure_vec(k))], null):new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),id_or_ent,new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.into.cljs$core$IFn$_invoke$arity$3(root.impl.util.ensure_vec(path),cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.nil_QMARK_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [content_k,k], null))], null)));
}));
} else {
return null;
}
}));

(root.impl.resolver.resolved_data.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=root.impl.resolver.js.map
