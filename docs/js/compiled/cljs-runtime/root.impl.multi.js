goog.provide('root.impl.multi');
goog.require('cljs.core');
root.impl.multi.multi_dispatch = (function root$impl$multi$multi_dispatch(p__101047){
var map__101048 = p__101047;
var map__101048__$1 = (((((!((map__101048 == null))))?(((((map__101048.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__101048.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__101048):map__101048);
var dispatch_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__101048__$1,new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614));
var default_dispatch_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__101048__$1,new cljs.core.Keyword(null,"default-dispatch-fn","default-dispatch-fn",334144573));
var invoke_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__101048__$1,new cljs.core.Keyword(null,"invoke-fn","invoke-fn",1024039792));
if(cljs.core.ifn_QMARK_(dispatch_fn)){
} else {
throw (new Error("Assert failed: (ifn? dispatch-fn)"));
}

var invoke_fn__$1 = (function (){var or__4185__auto__ = invoke_fn;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (function root$impl$multi$multi_dispatch_$_invoke(f,x){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(x) : f.call(null,x));
});
}
})();
var default$ = new cljs.core.Keyword(null,"default","default",-1987822328);
var table = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.createAsIfByAssoc([default$,(function (){var or__4185__auto__ = default_dispatch_fn;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (function root$impl$multi$multi_dispatch_$_default_dispatch(x){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("No default method defined",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arg","arg",-1747261837),x], null));
});
}
})()]));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"add-method","add-method",-824238743),(function root$impl$multi$multi_dispatch_$_add_method(dispatch_val,f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(table,cljs.core.assoc,dispatch_val,f);
}),new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),(function root$impl$multi$multi_dispatch_$_remove_method(dispatch_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(table,cljs.core.dissoc,dispatch_val);
}),new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function root$impl$multi$multi_dispatch_$_dispatch(x){
var dispatch_val = (dispatch_fn.cljs$core$IFn$_invoke$arity$1 ? dispatch_fn.cljs$core$IFn$_invoke$arity$1(x) : dispatch_fn.call(null,x));
var t = cljs.core.deref(table);
var f = (function (){var or__4185__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(t,dispatch_val);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(t,default$);
}
})();
return (invoke_fn__$1.cljs$core$IFn$_invoke$arity$2 ? invoke_fn__$1.cljs$core$IFn$_invoke$arity$2(f,x) : invoke_fn__$1.call(null,f,x));
}),new cljs.core.Keyword(null,"method-table","method-table",776172604),table], null);
});

//# sourceMappingURL=root.impl.multi.js.map
