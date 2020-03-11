goog.provide('uix.hooks.alpha');
goog.require('cljs.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
goog.require('goog.object');

/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
uix.hooks.alpha.StateHook = (function (value,set_value){
this.value = value;
this.set_value = set_value;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
(uix.hooks.alpha.StateHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.value;
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(new_value) : self__.set_value.call(null,new_value));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(f) : self__.set_value.call(null,f));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
var G__100429 = (function (p1__100426_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(p1__100426_SHARP_,a) : f.call(null,p1__100426_SHARP_,a));
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__100429) : self__.set_value.call(null,G__100429));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
var G__100430 = (function (p1__100427_SHARP_){
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(p1__100427_SHARP_,a,b) : f.call(null,p1__100427_SHARP_,a,b));
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__100430) : self__.set_value.call(null,G__100430));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
var G__100431 = (function (p1__100428_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,p1__100428_SHARP_,a,b,xs);
});
return (self__.set_value.cljs$core$IFn$_invoke$arity$1 ? self__.set_value.cljs$core$IFn$_invoke$arity$1(G__100431) : self__.set_value.call(null,G__100431));
}));

(uix.hooks.alpha.StateHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.StateHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),self__.value], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.hooks.alpha.StateHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"value","value",1946509744,null),new cljs.core.Symbol(null,"set-value","set-value",2085758879,null)], null);
}));

(uix.hooks.alpha.StateHook.cljs$lang$type = true);

(uix.hooks.alpha.StateHook.cljs$lang$ctorStr = "uix.hooks.alpha/StateHook");

(uix.hooks.alpha.StateHook.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write(writer__4429__auto__,"uix.hooks.alpha/StateHook");
}));

/**
 * Positional factory function for uix.hooks.alpha/StateHook.
 */
uix.hooks.alpha.__GT_StateHook = (function uix$hooks$alpha$__GT_StateHook(value,set_value){
return (new uix.hooks.alpha.StateHook(value,set_value));
});

uix.hooks.alpha.state = (function uix$hooks$alpha$state(value){
var vec__100442 = module$node_modules$react$index.useState(value);
var value__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100442,(0),null);
var set_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100442,(1),null);
var sh = (function (){var G__100445 = (function (){
return (new uix.hooks.alpha.StateHook(value__$1,set_value));
});
var G__100446 = [];
return module$node_modules$react$index.useMemo(G__100445,G__100446);
})();
var G__100447 = (function (){
(sh.value = value__$1);

(sh.set_value = set_value);

return sh;
});
var G__100448 = [value__$1,set_value];
return module$node_modules$react$index.useMemo(G__100447,G__100448);
});

/**
 * @interface
 */
uix.hooks.alpha.IRef = function(){};

uix.hooks.alpha.unwrap = (function uix$hooks$alpha$unwrap(this$){
if((((!((this$ == null)))) && ((!((this$.uix$hooks$alpha$IRef$unwrap$arity$1 == null)))))){
return this$.uix$hooks$alpha$IRef$unwrap$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (uix.hooks.alpha.unwrap[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (uix.hooks.alpha.unwrap["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IRef.unwrap",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {uix.hooks.alpha.IRef}
*/
uix.hooks.alpha.RefHook = (function (rref){
this.rref = rref;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
(uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$ = cljs.core.PROTOCOL_SENTINEL);

(uix.hooks.alpha.RefHook.prototype.uix$hooks$alpha$IRef$unwrap$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.rref;
}));

(uix.hooks.alpha.RefHook.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.object.get(self__.rref,"current");
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var self__ = this;
var o__$1 = this;
goog.object.set(self__.rref,"current",new_value);

return new_value;
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100458 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__100458) : f.call(null,G__100458));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100459 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__100460 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__100459,G__100460) : f.call(null,G__100459,G__100460));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100461 = o__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__100462 = a;
var G__100463 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__100461,G__100462,G__100463) : f.call(null,G__100461,G__100462,G__100463));
})());
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var self__ = this;
var o__$1 = this;
return o__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,o__$1.cljs$core$IDeref$_deref$arity$1(null),a,b,xs));
}));

(uix.hooks.alpha.RefHook.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.hooks.alpha.RefHook ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.hooks.alpha.RefHook.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"rref","rref",1363435641,null)], null);
}));

(uix.hooks.alpha.RefHook.cljs$lang$type = true);

(uix.hooks.alpha.RefHook.cljs$lang$ctorStr = "uix.hooks.alpha/RefHook");

(uix.hooks.alpha.RefHook.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write(writer__4429__auto__,"uix.hooks.alpha/RefHook");
}));

/**
 * Positional factory function for uix.hooks.alpha/RefHook.
 */
uix.hooks.alpha.__GT_RefHook = (function uix$hooks$alpha$__GT_RefHook(rref){
return (new uix.hooks.alpha.RefHook(rref));
});

uix.hooks.alpha.ref = (function uix$hooks$alpha$ref(value){
var vref = module$node_modules$react$index.useRef(value);
var G__100464 = (function (){
return (new uix.hooks.alpha.RefHook(vref));
});
var G__100465 = [];
return module$node_modules$react$index.useMemo(G__100464,G__100465);
});
uix.hooks.alpha.effect_BANG_ = (function uix$hooks$alpha$effect_BANG_(var_args){
var G__100467 = arguments.length;
switch (G__100467) {
case 1:
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
var G__100468 = (function (){
var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn.call(null));
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
return module$node_modules$react$index.useEffect(G__100468);
}));

(uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__100469 = (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn.call(null));
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
var G__100470 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return module$node_modules$react$index.useEffect(G__100469,G__100470);
}));

(uix.hooks.alpha.effect_BANG_.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.layout_effect_BANG_ = (function uix$hooks$alpha$layout_effect_BANG_(var_args){
var G__100472 = arguments.length;
switch (G__100472) {
case 1:
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
var G__100483 = (function (){
var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn.call(null));
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
return module$node_modules$react$index.useLayoutEffect(G__100483);
}));

(uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__100484 = (function (){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);

var ret = (setup_fn.cljs$core$IFn$_invoke$arity$0 ? setup_fn.cljs$core$IFn$_invoke$arity$0() : setup_fn.call(null));
if(cljs.core.fn_QMARK_(ret)){
return ret;
} else {
return undefined;
}
});
var G__100485 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return module$node_modules$react$index.useLayoutEffect(G__100484,G__100485);
}));

(uix.hooks.alpha.layout_effect_BANG_.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.callback = (function uix$hooks$alpha$callback(var_args){
var G__100488 = arguments.length;
switch (G__100488) {
case 1:
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return module$node_modules$react$index.useCallback(f);
}));

(uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__100489 = f;
var G__100490 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return module$node_modules$react$index.useCallback(G__100489,G__100490);
}));

(uix.hooks.alpha.callback.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.memo = (function uix$hooks$alpha$memo(var_args){
var G__100492 = arguments.length;
switch (G__100492) {
case 1:
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1 = (function (f){
return module$node_modules$react$index.useMemo(f);
}));

(uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__100499 = f;
var G__100500 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return module$node_modules$react$index.useMemo(G__100499,G__100500);
}));

(uix.hooks.alpha.memo.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.context = (function uix$hooks$alpha$context(v){
return module$node_modules$react$index.useContext(v);
});
uix.hooks.alpha.imperative_handle = (function uix$hooks$alpha$imperative_handle(ref,create_handle,deps){
var prev_deps_STAR_ = uix.hooks.alpha.ref(deps);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(prev_deps_STAR_),deps)){
cljs.core.reset_BANG_(prev_deps_STAR_,deps);
} else {
}

var G__100512 = ref;
var G__100513 = create_handle;
var G__100514 = (cljs.core.truth_(cljs.core.deref(prev_deps_STAR_))?cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(prev_deps_STAR_)):undefined);
return module$node_modules$react$index.useImperativeHandle(G__100512,G__100513,G__100514);
});
uix.hooks.alpha.debug = (function uix$hooks$alpha$debug(var_args){
var G__100521 = arguments.length;
switch (G__100521) {
case 1:
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$1 = (function (v){
return uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2(v,null);
}));

(uix.hooks.alpha.debug.cljs$core$IFn$_invoke$arity$2 = (function (v,fmt){
return module$node_modules$react$index.useDebugValue(v,fmt);
}));

(uix.hooks.alpha.debug.cljs$lang$maxFixedArity = 2);

uix.hooks.alpha.batched_update = (((typeof ReactDOM !== 'undefined'))?ReactDOM.unstable_batchedUpdates:(function (f){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
}));
uix.hooks.alpha.subscribe = (function uix$hooks$alpha$subscribe(p__100527){
var map__100528 = p__100527;
var map__100528__$1 = (((((!((map__100528 == null))))?(((((map__100528.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__100528.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__100528):map__100528);
var get_current_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100528__$1,new cljs.core.Keyword(null,"get-current-value","get-current-value",-1706578691));
var subscribe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100528__$1,new cljs.core.Keyword(null,"subscribe","subscribe",416253756));
var get_initial_state = (function (){var G__100534 = (function (){
return ({"get-current-value": get_current_value, "subscribe": subscribe, "value": (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value.call(null))});
});
var G__100535 = [get_current_value,subscribe];
return module$node_modules$react$index.useCallback(G__100534,G__100535);
})();
var vec__100531 = module$node_modules$react$index.useState(get_initial_state);
var state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100531,(0),null);
var set_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100531,(1),null);
var ret_value = (((((!((goog.object.get(state,"get-current-value") === get_current_value)))) || ((!((goog.object.get(state,"subscribe") === subscribe))))))?(function (){var ret_val = (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value.call(null));
var G__100536_100575 = ({"get-current-value": get_current_value, "subscribe": subscribe, "value": ret_val});
(set_state.cljs$core$IFn$_invoke$arity$1 ? set_state.cljs$core$IFn$_invoke$arity$1(G__100536_100575) : set_state.call(null,G__100536_100575));

return ret_val;
})():goog.object.get(state,"value"));
module$node_modules$react$index.useDebugValue(ret_value);

var G__100537_100576 = (function (){
var did_unsubscribe_QMARK_ = cljs.core.volatile_BANG_(false);
var check_for_updates = (function (){
if(cljs.core.deref(did_unsubscribe_QMARK_)){
return null;
} else {
var value = (get_current_value.cljs$core$IFn$_invoke$arity$0 ? get_current_value.cljs$core$IFn$_invoke$arity$0() : get_current_value.call(null));
var G__100539 = (function (){
var G__100540 = (function (p1__100522_SHARP_){
if((((!((goog.object.get(p1__100522_SHARP_,"get-current-value") === get_current_value)))) || ((!((goog.object.get(p1__100522_SHARP_,"subscribe") === subscribe)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(goog.object.get(p1__100522_SHARP_,"value"),value)))){
return p1__100522_SHARP_;
} else {
return Object.assign(({}),p1__100522_SHARP_,({"value": value}));
}
});
return (set_state.cljs$core$IFn$_invoke$arity$1 ? set_state.cljs$core$IFn$_invoke$arity$1(G__100540) : set_state.call(null,G__100540));
});
return (uix.hooks.alpha.batched_update.cljs$core$IFn$_invoke$arity$1 ? uix.hooks.alpha.batched_update.cljs$core$IFn$_invoke$arity$1(G__100539) : uix.hooks.alpha.batched_update.call(null,G__100539));
}
});
var unsubscribe = (subscribe.cljs$core$IFn$_invoke$arity$1 ? subscribe.cljs$core$IFn$_invoke$arity$1(check_for_updates) : subscribe.call(null,check_for_updates));
check_for_updates();

return (function (){
cljs.core.vreset_BANG_(did_unsubscribe_QMARK_,true);

return (unsubscribe.cljs$core$IFn$_invoke$arity$0 ? unsubscribe.cljs$core$IFn$_invoke$arity$0() : unsubscribe.call(null));
});
});
var G__100538_100577 = [get_current_value,subscribe];
module$node_modules$react$index.useEffect(G__100537_100576,G__100538_100577);

return ret_value;
});

//# sourceMappingURL=uix.hooks.alpha.js.map
