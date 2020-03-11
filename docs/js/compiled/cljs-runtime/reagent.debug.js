goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__105401__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__105401 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__105402__i = 0, G__105402__a = new Array(arguments.length -  0);
while (G__105402__i < G__105402__a.length) {G__105402__a[G__105402__i] = arguments[G__105402__i + 0]; ++G__105402__i;}
  args = new cljs.core.IndexedSeq(G__105402__a,0,null);
} 
return G__105401__delegate.call(this,args);};
G__105401.cljs$lang$maxFixedArity = 0;
G__105401.cljs$lang$applyTo = (function (arglist__105403){
var args = cljs.core.seq(arglist__105403);
return G__105401__delegate(args);
});
G__105401.cljs$core$IFn$_invoke$arity$variadic = G__105401__delegate;
return G__105401;
})()
);

(o.error = (function() { 
var G__105404__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__105404 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__105405__i = 0, G__105405__a = new Array(arguments.length -  0);
while (G__105405__i < G__105405__a.length) {G__105405__a[G__105405__i] = arguments[G__105405__i + 0]; ++G__105405__i;}
  args = new cljs.core.IndexedSeq(G__105405__a,0,null);
} 
return G__105404__delegate.call(this,args);};
G__105404.cljs$lang$maxFixedArity = 0;
G__105404.cljs$lang$applyTo = (function (arglist__105406){
var args = cljs.core.seq(arglist__105406);
return G__105404__delegate(args);
});
G__105404.cljs$core$IFn$_invoke$arity$variadic = G__105404__delegate;
return G__105404;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=reagent.debug.js.map
