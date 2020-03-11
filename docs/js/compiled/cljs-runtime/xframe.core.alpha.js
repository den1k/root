goog.provide('xframe.core.alpha');
goog.require('cljs.core');
goog.require('uix.core.alpha');
goog.require('xframe.core.adapton');
goog.require('uix.lib');
if((typeof xframe !== 'undefined') && (typeof xframe.core !== 'undefined') && (typeof xframe.core.alpha !== 'undefined') && (typeof xframe.core.alpha.db !== 'undefined')){
} else {
xframe.core.alpha.db = xframe.core.adapton.aref(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof xframe !== 'undefined') && (typeof xframe.core !== 'undefined') && (typeof xframe.core.alpha !== 'undefined') && (typeof xframe.core.alpha.subs_registry !== 'undefined')){
} else {
xframe.core.alpha.subs_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
xframe.core.alpha._reg_sub = (function xframe$core$alpha$_reg_sub(name,f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(xframe.core.alpha.subs_registry,cljs.core.assoc,name,f);
});
xframe.core.alpha.subs_in_order = [];
xframe.core.alpha.notify_listeners_BANG_ = (function xframe$core$alpha$notify_listeners_BANG_(){
return xframe.core.alpha.subs_in_order.forEach((function (f){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
}));
});
xframe.core.alpha.subscribe_ref = (function xframe$core$alpha$subscribe_ref(get_state){
return uix.core.alpha.subscribe(uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$2((function (){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get-current-value","get-current-value",-1706578691),get_state,new cljs.core.Keyword(null,"subscribe","subscribe",416253756),(function (schedule_update_BANG_){
xframe.core.alpha.subs_in_order.push(schedule_update_BANG_);

return (function (){
var idx = xframe.core.alpha.subs_in_order.indexOf(schedule_update_BANG_);
if((idx < (0))){
return null;
} else {
return xframe.core.alpha.subs_in_order.splice(idx,(1));
}
});
})], null);
}),[get_state]));
});
/**
 * Takes db and returns its dependency graph
 */
xframe.core.alpha.subs_graph = (function xframe$core$alpha$subs_graph(a){
var sup = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(xframe.core.alpha.subs_graph,Array.from(xframe.core.adapton.get_sup(a).values()));
var m = cljs.core.meta(a);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5737__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5737__auto__)){
var name = temp__5737__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name], null),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(m));
} else {
return new cljs.core.Keyword(null,"db","db",993250759);
}
})(),new cljs.core.Keyword(null,"children","children",-940561982),sup,new cljs.core.Keyword(null,"value","value",305978217),xframe.core.adapton.get_result(a)], null);
});
xframe.core.alpha.memoize_last_by = (function xframe$core$alpha$memoize_last_by(key_f,args_f,f){
var mem = cljs.core.volatile_BANG_(cljs.core.PersistentArrayMap.EMPTY);
var lookup_sentinel = ({});
return (function() { 
var G__101029__delegate = function (args){
var k = (key_f.cljs$core$IFn$_invoke$arity$1 ? key_f.cljs$core$IFn$_invoke$arity$1(args) : key_f.call(null,args));
var args__$1 = (args_f.cljs$core$IFn$_invoke$arity$1 ? args_f.cljs$core$IFn$_invoke$arity$1(args) : args_f.call(null,args));
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(mem),k,lookup_sentinel);
if((((v === lookup_sentinel)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(args__$1,(v[(0)]))))){
var ret = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(args__$1) : f.call(null,args__$1));
mem.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(mem.cljs$core$IDeref$_deref$arity$1(null),k,[args__$1,ret]));

return ret;
} else {
return (v[(1)]);
}
};
var G__101029 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__101030__i = 0, G__101030__a = new Array(arguments.length -  0);
while (G__101030__i < G__101030__a.length) {G__101030__a[G__101030__i] = arguments[G__101030__i + 0]; ++G__101030__i;}
  args = new cljs.core.IndexedSeq(G__101030__a,0,null);
} 
return G__101029__delegate.call(this,args);};
G__101029.cljs$lang$maxFixedArity = 0;
G__101029.cljs$lang$applyTo = (function (arglist__101031){
var args = cljs.core.seq(arglist__101031);
return G__101029__delegate(args);
});
G__101029.cljs$core$IFn$_invoke$arity$variadic = G__101029__delegate;
return G__101029;
})()
;
});
xframe.core.alpha._LT__ = (function xframe$core$alpha$_LT__(var_args){
var G__100993 = arguments.length;
switch (G__100993) {
case 1:
return xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$1 = (function (s){
return xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$2(s,null);
}));

(xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$2 = (function (p__100994,key){
var vec__100995 = p__100994;
var seq__100996 = cljs.core.seq(vec__100995);
var first__100997 = cljs.core.first(seq__100996);
var seq__100996__$1 = cljs.core.next(seq__100996);
var name = first__100997;
var args = seq__100996__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(xframe.core.alpha.subs_registry),name);
if(cljs.core.truth_(f)){
} else {
throw (new Error(["Assert failed: ",["Subscription ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)," is not found"].join(''),"\n","f"].join('')));
}

return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(key,args) : f.call(null,key,args));
}));

(xframe.core.alpha._LT__.cljs$lang$maxFixedArity = 2);

xframe.core.alpha.event_handlers = cljs.core.volatile_BANG_(cljs.core.PersistentArrayMap.EMPTY);
xframe.core.alpha.fx_handlers = cljs.core.volatile_BANG_(cljs.core.PersistentArrayMap.EMPTY);
xframe.core.alpha.dispatch = (function xframe$core$alpha$dispatch(p__101001){
var vec__101002 = p__101001;
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__101002,(0),null);
var event = vec__101002;
var handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(xframe.core.alpha.event_handlers),name);
var _ = (cljs.core.truth_(handler)?null:(function(){throw (new Error(["Assert failed: ",["Event handler ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)," is not found"].join(''),"\n","handler"].join('')))})());
var effects = (function (){var G__101005 = cljs.core.deref(xframe.core.alpha.db);
var G__101006 = event;
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(G__101005,G__101006) : handler.call(null,G__101005,G__101006));
})();
var temp__5739__auto___101033 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5739__auto___101033)){
var db_SINGLEQUOTE__101034 = temp__5739__auto___101033;
var handler_101035__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(xframe.core.alpha.fx_handlers),new cljs.core.Keyword(null,"db","db",993250759));
var G__101007_101036 = null;
var G__101008_101037 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,db_SINGLEQUOTE__101034], null);
(handler_101035__$1.cljs$core$IFn$_invoke$arity$2 ? handler_101035__$1.cljs$core$IFn$_invoke$arity$2(G__101007_101036,G__101008_101037) : handler_101035__$1.call(null,G__101007_101036,G__101008_101037));
} else {
}

var v__40233__auto__ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
if(cljs.core.seq(v__40233__auto__)){
var x__40234__auto__ = cljs.core.first(v__40233__auto__);
var xs__40235__auto__ = cljs.core.next(v__40233__auto__);
while(true){
var vec__101015_101038 = x__40234__auto__;
var event_101039__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__101015_101038,(0),null);
var args_101040 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__101015_101038,(1),null);
var handler_101041__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(xframe.core.alpha.fx_handlers),event_101039__$1);
if(cljs.core.truth_(handler_101041__$1)){
} else {
throw (new Error(["Assert failed: ",["Effect handler ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(event_101039__$1)," is not found"].join(''),"\n","handler"].join('')));
}

try{var G__101019_101042 = cljs.core.deref(xframe.core.alpha.db);
var G__101020_101043 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [event_101039__$1,args_101040], null);
(handler_101041__$1.cljs$core$IFn$_invoke$arity$2 ? handler_101041__$1.cljs$core$IFn$_invoke$arity$2(G__101019_101042,G__101020_101043) : handler_101041__$1.call(null,G__101019_101042,G__101020_101043));
}catch (e101018){var e_101044 = e101018;
console.error(["Effect handler ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(event_101039__$1)," failed"].join(''),args_101040);

console.error(e_101044);
}
if(cljs.core.seq(xs__40235__auto__)){
var G__101045 = cljs.core.first(xs__40235__auto__);
var G__101046 = cljs.core.next(xs__40235__auto__);
x__40234__auto__ = G__101045;
xs__40235__auto__ = G__101046;
continue;
} else {
return null;
}
break;
}
} else {
return null;
}
});
xframe.core.alpha.reg_event_db = (function xframe$core$alpha$reg_event_db(name,f){
return xframe.core.alpha.event_handlers.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(xframe.core.alpha.event_handlers.cljs$core$IDeref$_deref$arity$1(null),name,(function (a,b){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(a,b) : f.call(null,a,b))], null);
})));
});
xframe.core.alpha.reg_event_fx = (function xframe$core$alpha$reg_event_fx(name,f){
return xframe.core.alpha.event_handlers.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(xframe.core.alpha.event_handlers.cljs$core$IDeref$_deref$arity$1(null),name,f));
});
xframe.core.alpha.reg_fx = (function xframe$core$alpha$reg_fx(name,f){
return xframe.core.alpha.fx_handlers.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(xframe.core.alpha.fx_handlers.cljs$core$IDeref$_deref$arity$1(null),name,f));
});
xframe.core.alpha.reg_db_sub = (function xframe$core$alpha$reg_db_sub(){
return xframe.core.alpha._reg_sub(new cljs.core.Keyword("xframe.core.alpha","db","xframe.core.alpha/db",39839775),(function (){var f__40430__auto__ = (function (){
return cljs.core.deref(xframe.core.alpha.db);
});
var f_STAR___40431__auto__ = xframe.core.alpha.memoize_last_by(cljs.core.first,cljs.core.second,(function (G__101024){
return xframe.core.adapton.make_athunk.cljs$core$IFn$_invoke$arity$variadic((function (){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f__40430__auto__,G__101024);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((goog.DEBUG)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("xframe.core.alpha","db","xframe.core.alpha/db",39839775),new cljs.core.Keyword(null,"args","args",1315556576),G__101024], null):null)], 0));
}));
return (function (key__40432__auto__,args__40433__auto__){
return cljs.core.deref((f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2 ? f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2(key__40432__auto__,args__40433__auto__) : f_STAR___40431__auto__.call(null,key__40432__auto__,args__40433__auto__)));
});
})());
});
xframe.core.alpha.reg_db_sub();
xframe.core.alpha.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (_,p__101025){
var vec__101026 = p__101025;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__101026,(0),null);
var db_STAR_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__101026,(1),null);
cljs.core.reset_BANG_(xframe.core.alpha.db,db_STAR_);

return xframe.core.alpha.notify_listeners_BANG_();
}));
xframe.core.alpha.reset_db = (function xframe$core$alpha$reset_db(){
(xframe.core.alpha.db = xframe.core.adapton.aref(cljs.core.deref(xframe.core.alpha.db)));

return xframe.core.alpha.reg_db_sub();
});

//# sourceMappingURL=xframe.core.alpha.js.map
