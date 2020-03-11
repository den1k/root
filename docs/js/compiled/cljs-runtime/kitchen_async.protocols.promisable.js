goog.provide('kitchen_async.protocols.promisable');
goog.require('cljs.core');

/**
 * @interface
 */
kitchen_async.protocols.promisable.Promisable = function(){};

kitchen_async.protocols.promisable.__GT_promise_STAR_ = (function kitchen_async$protocols$promisable$__GT_promise_STAR_(this$){
if((((!((this$ == null)))) && ((!((this$.kitchen_async$protocols$promisable$Promisable$__GT_promise_STAR_$arity$1 == null)))))){
return this$.kitchen_async$protocols$promisable$Promisable$__GT_promise_STAR_$arity$1(this$);
} else {
var x__4487__auto__ = (((this$ == null))?null:this$);
var m__4488__auto__ = (kitchen_async.protocols.promisable.__GT_promise_STAR_[goog.typeOf(x__4487__auto__)]);
if((!((m__4488__auto__ == null)))){
return (m__4488__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4488__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4488__auto__.call(null,this$));
} else {
var m__4485__auto__ = (kitchen_async.protocols.promisable.__GT_promise_STAR_["_"]);
if((!((m__4485__auto__ == null)))){
return (m__4485__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4485__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4485__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Promisable.->promise*",this$);
}
}
}
});


//# sourceMappingURL=kitchen_async.protocols.promisable.js.map
