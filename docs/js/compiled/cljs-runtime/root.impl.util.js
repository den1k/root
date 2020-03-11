goog.provide('root.impl.util');
goog.require('cljs.core');
goog.require('expound.alpha');
goog.require('cljs.spec.alpha');
goog.require('cljs.pprint');
root.impl.util.spec_pred = (function root$impl$util$spec_pred(fail_exp,spec_fn,spec,x){
var ret = (spec_fn.cljs$core$IFn$_invoke$arity$2 ? spec_fn.cljs$core$IFn$_invoke$arity$2(spec,x) : spec_fn.call(null,spec,x));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(fail_exp,ret)){
var expound_str = expound.alpha.expound_str.cljs$core$IFn$_invoke$arity$2(spec,x);
console.error(expound_str);

throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Value doesn't match spec",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),x,new cljs.core.Keyword(null,"spec","spec",347520401),spec,new cljs.core.Keyword(null,"explain","explain",484226146),cljs.spec.alpha.explain_data(spec,x)], null));
} else {
return ret;
}
});
root.impl.util.conform_BANG_ = (function root$impl$util$conform_BANG_(spec,x){
return root.impl.util.spec_pred(new cljs.core.Keyword("cljs.spec.alpha","invalid","cljs.spec.alpha/invalid",-1220295119),cljs.spec.alpha.conform,spec,x);
});
root.impl.util.valid_BANG_ = (function root$impl$util$valid_BANG_(spec,x){
if(cljs.core.truth_(root.impl.util.spec_pred(false,cljs.spec.alpha.valid_QMARK_,spec,x))){
return x;
} else {
return null;
}
});
root.impl.util.ensure_vec = (function root$impl$util$ensure_vec(x){
if(cljs.core.vector_QMARK_(x)){
return x;
} else {
if((x == null)){
return cljs.core.PersistentVector.EMPTY;
} else {
if(cljs.core.sequential_QMARK_(x)){
return cljs.core.vec(x);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);

}
}
}
});
root.impl.util.project = (function root$impl$util$project(var_args){
var G__102485 = arguments.length;
switch (G__102485) {
case 2:
return root.impl.util.project.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return root.impl.util.project.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.util.project.cljs$core$IFn$_invoke$arity$2 = (function (f,coll){
return root.impl.util.project.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,f,coll);
}));

(root.impl.util.project.cljs$core$IFn$_invoke$arity$3 = (function (to,f,coll){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(to,cljs.core.map.cljs$core$IFn$_invoke$arity$1(f),coll);
}));

(root.impl.util.project.cljs$lang$maxFixedArity = 3);

root.impl.util.make_id_gen = (function root$impl$util$make_id_gen(start){
var current = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(start);
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(current,cljs.core.inc);
});
});
root.impl.util.seek = (function root$impl$util$seek(pred,coll){
return cljs.core.some((function (p1__102486_SHARP_){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(p1__102486_SHARP_) : pred.call(null,p1__102486_SHARP_)))){
return p1__102486_SHARP_;
} else {
return null;
}
}),coll);
});
root.impl.util.pretty_str = (function root$impl$util$pretty_str(x){
var sb__4720__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__102487_102499 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__102488_102500 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__102489_102501 = true;
var _STAR_print_fn_STAR__temp_val__102490_102502 = (function (x__4721__auto__){
return sb__4720__auto__.append(x__4721__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__102489_102501);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__102490_102502);

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(x);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__102488_102500);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__102487_102499);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4720__auto__);
});
/**
 * Merges data-structures recursively. For sequential colls, creates a union
 *   using the same type as the first data-structure
 */
root.impl.util.deep_merge = (function root$impl$util$deep_merge(var_args){
var args__4795__auto__ = [];
var len__4789__auto___102503 = arguments.length;
var i__4790__auto___102505 = (0);
while(true){
if((i__4790__auto___102505 < len__4789__auto___102503)){
args__4795__auto__.push((arguments[i__4790__auto___102505]));

var G__102506 = (i__4790__auto___102505 + (1));
i__4790__auto___102505 = G__102506;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return root.impl.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(root.impl.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic = (function (p__102493){
var vec__102494 = p__102493;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102494,(0),null);
var xs = vec__102494;
if(((cljs.core.sequential_QMARK_(x)) || (cljs.core.set_QMARK_(x)))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.empty(x),cljs.core.cat,cljs.core.reverse(xs));
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.merge_with,root.impl.util.deep_merge,xs);
} else {
return null;
}
}
}));

(root.impl.util.deep_merge.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(root.impl.util.deep_merge.cljs$lang$applyTo = (function (seq102492){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq102492));
}));


//# sourceMappingURL=root.impl.util.js.map
