goog.provide('xframe.core.adapton');
goog.require('cljs.core');
xframe.core.adapton.curr_adapting = cljs.core.volatile_BANG_(false);

/**
 * @interface
 */
xframe.core.adapton.IAdapton = function(){};

xframe.core.adapton._PLUS_edge_BANG_ = (function xframe$core$adapton$_PLUS_edge_BANG_(this$,a_sub){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$_PLUS_edge_BANG_$arity$2 == null)))))){
return this$.xframe$core$adapton$IAdapton$_PLUS_edge_BANG_$arity$2(this$,a_sub);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton._PLUS_edge_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$2(this$,a_sub) : m__4488__auto__.call(null,this$,a_sub));
} else {
var m__4485__auto__ = (xframe.core.adapton._PLUS_edge_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$2(this$,a_sub) : m__4485__auto__.call(null,this$,a_sub));
} else {
throw cljs.core.missing_protocol("IAdapton.+edge!",this$);
}
}
}
});

xframe.core.adapton._edge_BANG_ = (function xframe$core$adapton$_edge_BANG_(this$,a_sub){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$_edge_BANG_$arity$2 == null)))))){
return this$.xframe$core$adapton$IAdapton$_edge_BANG_$arity$2(this$,a_sub);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton._edge_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$2(this$,a_sub) : m__4488__auto__.call(null,this$,a_sub));
} else {
var m__4485__auto__ = (xframe.core.adapton._edge_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$2(this$,a_sub) : m__4485__auto__.call(null,this$,a_sub));
} else {
throw cljs.core.missing_protocol("IAdapton.-edge!",this$);
}
}
}
});

xframe.core.adapton.compute = (function xframe$core$adapton$compute(this$){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$compute$arity$1 == null)))))){
return this$.xframe$core$adapton$IAdapton$compute$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.compute[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (xframe.core.adapton.compute["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IAdapton.compute",this$);
}
}
}
});

xframe.core.adapton.dirty_BANG_ = (function xframe$core$adapton$dirty_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$dirty_BANG_$arity$1 == null)))))){
return this$.xframe$core$adapton$IAdapton$dirty_BANG_$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.dirty_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (xframe.core.adapton.dirty_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IAdapton.dirty!",this$);
}
}
}
});

xframe.core.adapton.set_thunk_BANG_ = (function xframe$core$adapton$set_thunk_BANG_(this$,new_thunk){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$set_thunk_BANG_$arity$2 == null)))))){
return this$.xframe$core$adapton$IAdapton$set_thunk_BANG_$arity$2(this$,new_thunk);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.set_thunk_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_thunk) : m__4488__auto__.call(null,this$,new_thunk));
} else {
var m__4485__auto__ = (xframe.core.adapton.set_thunk_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_thunk) : m__4485__auto__.call(null,this$,new_thunk));
} else {
throw cljs.core.missing_protocol("IAdapton.set-thunk!",this$);
}
}
}
});

xframe.core.adapton.set_result_BANG_ = (function xframe$core$adapton$set_result_BANG_(this$,new_result){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$set_result_BANG_$arity$2 == null)))))){
return this$.xframe$core$adapton$IAdapton$set_result_BANG_$arity$2(this$,new_result);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.set_result_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_result) : m__4488__auto__.call(null,this$,new_result));
} else {
var m__4485__auto__ = (xframe.core.adapton.set_result_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_result) : m__4485__auto__.call(null,this$,new_result));
} else {
throw cljs.core.missing_protocol("IAdapton.set-result!",this$);
}
}
}
});

xframe.core.adapton.get_sup = (function xframe$core$adapton$get_sup(this$){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$get_sup$arity$1 == null)))))){
return this$.xframe$core$adapton$IAdapton$get_sup$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.get_sup[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (xframe.core.adapton.get_sup["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IAdapton.get-sup",this$);
}
}
}
});

xframe.core.adapton.set_sup_BANG_ = (function xframe$core$adapton$set_sup_BANG_(this$,new_sup){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$set_sup_BANG_$arity$2 == null)))))){
return this$.xframe$core$adapton$IAdapton$set_sup_BANG_$arity$2(this$,new_sup);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.set_sup_BANG_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_sup) : m__4488__auto__.call(null,this$,new_sup));
} else {
var m__4485__auto__ = (xframe.core.adapton.set_sup_BANG_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$2(this$,new_sup) : m__4485__auto__.call(null,this$,new_sup));
} else {
throw cljs.core.missing_protocol("IAdapton.set-sup!",this$);
}
}
}
});

xframe.core.adapton.get_result = (function xframe$core$adapton$get_result(this$){
if((((!((this$ == null)))) && ((!((this$.xframe$core$adapton$IAdapton$get_result$arity$1 == null)))))){
return this$.xframe$core$adapton$IAdapton$get_result$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (xframe.core.adapton.get_result[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (xframe.core.adapton.get_result["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IAdapton.get-result",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {xframe.core.adapton.IAdapton}
*/
xframe.core.adapton.Adapton = (function (thunk,result,sub,sup,clean_QMARK_,ameta){
this.thunk = thunk;
this.result = result;
this.sub = sub;
this.sup = sup;
this.clean_QMARK_ = clean_QMARK_;
this.ameta = ameta;
this.cljs$lang$protocol_mask$partition0$ = 163840;
this.cljs$lang$protocol_mask$partition1$ = 98304;
});
(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$ = cljs.core.PROTOCOL_SENTINEL);

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$set_sup_BANG_$arity$2 = (function (this$,new_sup){
var self__ = this;
var this$__$1 = this;
return (self__.sup = new_sup);
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$_edge_BANG_$arity$2 = (function (this$,a_sub){
var self__ = this;
var this$__$1 = this;
self__.sub.delete(a_sub);

return a_sub.xframe$core$adapton$IAdapton$get_sup$arity$1(null).delete(this$__$1);
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$get_sup$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.sup;
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$compute$arity$1 = (function (this$){
var self__ = this;
while(true){
var this$__$1 = this;
if(self__.clean_QMARK_){
return self__.result;
} else {
Array.from(self__.sub).forEach(((function (this$,this$__$1){
return (function (p1__100950_SHARP_){
return this$__$1.xframe$core$adapton$IAdapton$_edge_BANG_$arity$2(null,p1__100950_SHARP_);
});})(this$,this$__$1))
);

(self__.clean_QMARK_ = true);

try{(self__.result = (self__.thunk.cljs$core$IFn$_invoke$arity$0 ? self__.thunk.cljs$core$IFn$_invoke$arity$0() : self__.thunk.call(null)));
}catch (e100959){var e_100999 = e100959;
(self__.result = e_100999);

console.error(["Subscription ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(self__.ameta)], null),new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(self__.ameta)))," failed to compute"].join(''));
}
var G__101000 = null;
this$ = G__101000;
continue;
}
break;
}
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$get_result$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.result;
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$_PLUS_edge_BANG_$arity$2 = (function (this$,a_sub){
var self__ = this;
var this$__$1 = this;
self__.sub.add(a_sub);

return a_sub.sup.add(this$__$1);
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$set_result_BANG_$arity$2 = (function (this$,new_result){
var self__ = this;
var this$__$1 = this;
return (self__.result = new_result);
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$dirty_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(self__.clean_QMARK_){
(self__.clean_QMARK_ = false);

return Array.from(self__.sup).forEach((function (p1__100951_SHARP_){
return p1__100951_SHARP_.xframe$core$adapton$IAdapton$dirty_BANG_$arity$1(null);
}));
} else {
return null;
}
}));

(xframe.core.adapton.Adapton.prototype.xframe$core$adapton$IAdapton$set_thunk_BANG_$arity$2 = (function (this$,new_thunk){
var self__ = this;
var this$__$1 = this;
return (self__.thunk = new_thunk);
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var prev_adapting = cljs.core.volatile_BANG_(cljs.core.deref(xframe.core.adapton.curr_adapting));
var _ = cljs.core.vreset_BANG_(xframe.core.adapton.curr_adapting,this$__$1);
var result__$1 = this$__$1.xframe$core$adapton$IAdapton$compute$arity$1(null);
var ___$1 = cljs.core.vreset_BANG_(xframe.core.adapton.curr_adapting,cljs.core.deref(prev_adapting));
if(cljs.core.deref(xframe.core.adapton.curr_adapting)){
cljs.core.deref(xframe.core.adapton.curr_adapting).xframe$core$adapton$IAdapton$_PLUS_edge_BANG_$arity$2(null,this$__$1);
} else {
}

return result__$1;
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,v){
var self__ = this;
var this$__$1 = this;
this$__$1.xframe$core$adapton$IAdapton$set_result_BANG_$arity$2(null,v);

return this$__$1.xframe$core$adapton$IAdapton$dirty_BANG_$arity$1(null);
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (this$,f){
var self__ = this;
var this$__$1 = this;
return this$__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100970 = this$__$1.cljs$core$IDeref$_deref$arity$1(null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__100970) : f.call(null,G__100970));
})());
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (this$,f,x){
var self__ = this;
var this$__$1 = this;
return this$__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100971 = this$__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__100972 = x;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__100971,G__100972) : f.call(null,G__100971,G__100972));
})());
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (this$,f,x,y){
var self__ = this;
var this$__$1 = this;
return this$__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__100973 = this$__$1.cljs$core$IDeref$_deref$arity$1(null);
var G__100974 = x;
var G__100975 = y;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__100973,G__100974,G__100975) : f.call(null,G__100973,G__100974,G__100975));
})());
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (this$,f,x,y,args){
var self__ = this;
var this$__$1 = this;
return this$__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,this$__$1.cljs$core$IDeref$_deref$arity$1(null),x,y,args));
}));

(xframe.core.adapton.Adapton.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.ameta;
}));

(xframe.core.adapton.Adapton.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"thunk","thunk",74255732,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"result","result",-1239343558,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"sub","sub",-453228498,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"sup","sup",-398960819,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"clean?","clean?",-35099482,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"ameta","ameta",-1864111302,null)], null);
}));

(xframe.core.adapton.Adapton.cljs$lang$type = true);

(xframe.core.adapton.Adapton.cljs$lang$ctorStr = "xframe.core.adapton/Adapton");

(xframe.core.adapton.Adapton.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write(writer__4429__auto__,"xframe.core.adapton/Adapton");
}));

/**
 * Positional factory function for xframe.core.adapton/Adapton.
 */
xframe.core.adapton.__GT_Adapton = (function xframe$core$adapton$__GT_Adapton(thunk,result,sub,sup,clean_QMARK_,ameta){
return (new xframe.core.adapton.Adapton(thunk,result,sub,sup,clean_QMARK_,ameta));
});

xframe.core.adapton.adapton_QMARK_ = (function xframe$core$adapton$adapton_QMARK_(v){
return (v instanceof xframe.core.adapton.Adapton);
});
xframe.core.adapton.make_athunk = (function xframe$core$adapton$make_athunk(var_args){
var args__4795__auto__ = [];
var len__4789__auto___101021 = arguments.length;
var i__4790__auto___101022 = (0);
while(true){
if((i__4790__auto___101022 < len__4789__auto___101021)){
args__4795__auto__.push((arguments[i__4790__auto___101022]));

var G__101023 = (i__4790__auto___101022 + (1));
i__4790__auto___101022 = G__101023;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return xframe.core.adapton.make_athunk.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(xframe.core.adapton.make_athunk.cljs$core$IFn$_invoke$arity$variadic = (function (thunk,p__100982){
var vec__100983 = p__100982;
var meta = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100983,(0),null);
return (new xframe.core.adapton.Adapton(thunk,null,(new Set()),(new Set()),false,meta));
}));

(xframe.core.adapton.make_athunk.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(xframe.core.adapton.make_athunk.cljs$lang$applyTo = (function (seq100979){
var G__100980 = cljs.core.first(seq100979);
var seq100979__$1 = cljs.core.next(seq100979);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__100980,seq100979__$1);
}));

xframe.core.adapton.aref = (function xframe$core$adapton$aref(v){
var a = (new xframe.core.adapton.Adapton(null,v,(new Set()),(new Set()),true,null));
a.xframe$core$adapton$IAdapton$set_thunk_BANG_$arity$2(null,(function (){
return a.xframe$core$adapton$IAdapton$get_result$arity$1(null);
}));

return a;
});
xframe.core.adapton.avar_get = (function xframe$core$adapton$avar_get(v){
return cljs.core._deref(cljs.core._deref(v));
});

//# sourceMappingURL=xframe.core.adapton.js.map
