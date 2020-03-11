goog.provide('root.impl.core');
goog.require('cljs.core');
goog.require('medley.core');
goog.require('xframe.core.alpha');
goog.require('root.impl.multi');
goog.require('root.impl.resolver');
goog.require('root.impl.entity');
goog.require('root.impl.util');
goog.require('clojure.set');
goog.require('cljs.spec.alpha');
if((typeof root !== 'undefined') && (typeof root.impl !== 'undefined') && (typeof root.impl.core !== 'undefined') && (typeof root.impl.core.id_gen !== 'undefined')){
} else {
root.impl.core.id_gen = root.impl.util.make_id_gen((1000));
}
root.impl.core.add_id = (function root$impl$core$add_id(x){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(x,new cljs.core.Keyword(null,"id","id",-1388402092),(root.impl.core.id_gen.cljs$core$IFn$_invoke$arity$0 ? root.impl.core.id_gen.cljs$core$IFn$_invoke$arity$0() : root.impl.core.id_gen.call(null)));
});
root.impl.core.state = xframe.core.alpha.db;
if((typeof root !== 'undefined') && (typeof root.impl !== 'undefined') && (typeof root.impl.core !== 'undefined') && (typeof root.impl.core.history_log !== 'undefined')){
} else {
root.impl.core.history_log = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"idx","idx",1053688473),null,new cljs.core.Keyword(null,"log","log",-1595516004),cljs.core.PersistentVector.EMPTY], null));
}
root.impl.core.op_dispatch = (function root$impl$core$op_dispatch(p__102626){
var vec__102627 = p__102626;
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102627,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102627,(1),null);
return op;
});


if((typeof root !== 'undefined') && (typeof root.impl !== 'undefined') && (typeof root.impl.core !== 'undefined') && (typeof root.impl.core.inverted_op !== 'undefined')){
} else {
root.impl.core.inverted_op = (function (){var method_table__4672__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4673__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4674__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4675__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4676__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__102631 = cljs.core.get_global_hierarchy;
return (fexpr__102631.cljs$core$IFn$_invoke$arity$0 ? fexpr__102631.cljs$core$IFn$_invoke$arity$0() : fexpr__102631.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("root.impl.core","inverted-op"),root.impl.core.op_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4676__auto__,method_table__4672__auto__,prefer_table__4673__auto__,method_cache__4674__auto__,cached_hierarchy__4675__auto__));
})();
}
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"add","add",235287739),(function (p__102632){
var vec__102633 = p__102632;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102633,(0),null);
var id_or_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102633,(1),null);
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102633,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove","remove",-131428414),id_or_path,ent], null);
}));
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"add-after","add-after",-1562215108),(function (p__102636){
var vec__102637 = p__102636;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102637,(0),null);
var id_or_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102637,(1),null);
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102637,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove-after","remove-after",1403559961),id_or_path,ent], null);
}));
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"remove-after","remove-after",1403559961),(function (p__102640){
var vec__102641 = p__102640;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102641,(0),null);
var id_or_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102641,(1),null);
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102641,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-after","add-after",-1562215108),id_or_path,ent], null);
}));
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"remove","remove",-131428414),(function (p__102644){
var vec__102645 = p__102644;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102645,(0),null);
var id_or_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102645,(1),null);
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102645,(2),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add","add",235287739),id_or_path,ent], null);
}));
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set","set",304602554),(function (p__102651){
var vec__102652 = p__102651;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102652,(0),null);
var map__102655 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102652,(1),null);
var map__102655__$1 = (((((!((map__102655 == null))))?(((((map__102655.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102655.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102655):map__102655);
var ent = map__102655__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102655__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),(function (){var G__102658 = new cljs.core.Keyword(null,"lookup","lookup",1225356838);
var G__102659 = id;
var fexpr__102657 = new cljs.core.Keyword(null,"root","root",-448657453).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(ent));
return (fexpr__102657.cljs$core$IFn$_invoke$arity$2 ? fexpr__102657.cljs$core$IFn$_invoke$arity$2(G__102658,G__102659) : fexpr__102657.call(null,G__102658,G__102659));
})()], null);
}));
root.impl.core.inverted_op.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"toggle","toggle",1291842030),(function (tx){
return tx;
}));
root.impl.core.inverted_txs = (function root$impl$core$inverted_txs(txs){
var methods$ = cljs.core.methods$(root.impl.core.inverted_op);
var ops = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(root.impl.core.op_dispatch),txs);
var txs__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ops,clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(methods$,ops)))?txs:(function (){var diff = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(ops,methods$);
console.warn("Missing inverted-ops for:",diff);

return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (tx){
return cljs.core.contains_QMARK_(diff,root.impl.core.op_dispatch(tx));
}),txs);
})());
var G__102662 = txs__$1;
var G__102662__$1 = (((G__102662 == null))?null:cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(root.impl.core.inverted_op,G__102662));
if((G__102662__$1 == null)){
return null;
} else {
return cljs.core.not_empty(G__102662__$1);
}
});
root.impl.core.log_txs = (function root$impl$core$log_txs(txs){
var vec__102663 = txs;
var vec__102666 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102663,(0),null);
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102666,(0),null);
var G__102669 = op;
var G__102669__$1 = (((G__102669 instanceof cljs.core.Keyword))?G__102669.fqn:null);
switch (G__102669__$1) {
case "undo":
case "redo":
return null;

break;
default:
var map__102670 = cljs.core.deref(root.impl.core.history_log);
var map__102670__$1 = (((((!((map__102670 == null))))?(((((map__102670.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102670.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102670):map__102670);
var log = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102670__$1,new cljs.core.Keyword(null,"log","log",-1595516004));
var temp__5739__auto__ = root.impl.core.inverted_txs(txs);
if(cljs.core.truth_(temp__5739__auto__)){
var inv_txs = temp__5739__auto__;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(root.impl.core.history_log,cljs.core.assoc,new cljs.core.Keyword(null,"log","log",-1595516004),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(log,inv_txs),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"redo-log","redo-log",1042647009),cljs.core.PersistentVector.EMPTY], 0));
} else {
return null;
}

}
});
root.impl.core.shift_history = (function root$impl$core$shift_history(root__$1,from_key,to_key){
var map__102675 = cljs.core.deref(root.impl.core.history_log);
var map__102675__$1 = (((((!((map__102675 == null))))?(((((map__102675.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102675.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102675):map__102675);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102675__$1,from_key);
var to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102675__$1,to_key);
var temp__5739__auto__ = cljs.core.peek(from);
if(cljs.core.truth_(temp__5739__auto__)){
var txs = temp__5739__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(root.impl.core.history_log,cljs.core.assoc,from_key,cljs.core.pop(from),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([to_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(to,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(root.impl.core.inverted_op,txs))], 0));

var G__102677 = root__$1;
var G__102678 = txs;
var G__102679 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (root.impl.core.transact.cljs$core$IFn$_invoke$arity$3 ? root.impl.core.transact.cljs$core$IFn$_invoke$arity$3(G__102677,G__102678,G__102679) : root.impl.core.transact.call(null,G__102677,G__102678,G__102679));
} else {
return null;
}
});
root.impl.core.undo = (function root$impl$core$undo(root__$1){
return root.impl.core.shift_history(root__$1,new cljs.core.Keyword(null,"log","log",-1595516004),new cljs.core.Keyword(null,"redo-log","redo-log",1042647009));
});
root.impl.core.redo = (function root$impl$core$redo(root__$1){
return root.impl.core.shift_history(root__$1,new cljs.core.Keyword(null,"redo-log","redo-log",1042647009),new cljs.core.Keyword(null,"log","log",-1595516004));
});
if((typeof root !== 'undefined') && (typeof root.impl !== 'undefined') && (typeof root.impl.core !== 'undefined') && (typeof root.impl.core.run_tx !== 'undefined')){
} else {
root.impl.core.run_tx = (function (){var method_table__4672__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4673__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4674__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4675__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4676__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__102684 = cljs.core.get_global_hierarchy;
return (fexpr__102684.cljs$core$IFn$_invoke$arity$0 ? fexpr__102684.cljs$core$IFn$_invoke$arity$0() : fexpr__102684.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("root.impl.core","run-tx"),(function (_root,tx){
return new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(tx);
}),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4676__auto__,method_table__4672__auto__,prefer_table__4673__auto__,method_cache__4674__auto__,cached_hierarchy__4675__auto__));
})();
}
root.impl.core.add = (function root$impl$core$add(st,path,p__102686){
var vec__102687 = p__102686;
var ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102687,(0),null);
var ent = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102687,(1),null);
var ref_PLUS_ent = vec__102687;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(st,path,(function (x){
if(cljs.core.vector_QMARK_(x)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(x,ref);
} else {
return ref;

}
})),ref_PLUS_ent);
});
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"add","add",235287739),(function (p__102690,p__102691){
var map__102693 = p__102690;
var map__102693__$1 = (((((!((map__102693 == null))))?(((((map__102693.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102693.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102693):map__102693);
var root__$1 = map__102693__$1;
var __GT_ref_PLUS_x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102693__$1,new cljs.core.Keyword(null,"->ref+x","->ref+x",721660619));
var map__102694 = p__102691;
var map__102694__$1 = (((((!((map__102694 == null))))?(((((map__102694.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102694.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102694):map__102694);
var tx = map__102694__$1;
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102694__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102694__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var ref_PLUS_ent = (__GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1 ? __GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref_PLUS_x.call(null,ent));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(root.impl.core.state,root.impl.core.add,path,ref_PLUS_ent);
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"add-many","add-many",2066162317),(function (p__102697,p__102698){
var map__102699 = p__102697;
var map__102699__$1 = (((((!((map__102699 == null))))?(((((map__102699.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102699.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102699):map__102699);
var root__$1 = map__102699__$1;
var __GT_ref_PLUS_x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102699__$1,new cljs.core.Keyword(null,"->ref+x","->ref+x",721660619));
var map__102700 = p__102698;
var map__102700__$1 = (((((!((map__102700 == null))))?(((((map__102700.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102700.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102700):map__102700);
var tx = map__102700__$1;
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102700__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ents = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102700__$1,new cljs.core.Keyword(null,"ents","ents",-1980366900));
var refs_PLUS_xs = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(__GT_ref_PLUS_x,ents);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(root.impl.core.state,(function (st){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(st,path,(function (x){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3((function (){var or__4185__auto__ = x;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.first),refs_PLUS_xs);
})),refs_PLUS_xs);
}));
}));
root.impl.core.vec_plop = (function root$impl$core$vec_plop(seq,idx,item){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.take.cljs$core$IFn$_invoke$arity$2(idx,seq),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [item], null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.drop.cljs$core$IFn$_invoke$arity$2(idx,seq)], 0)));
});
root.impl.core.vec_pluck = (function root$impl$core$vec_pluck(var_args){
var args__4795__auto__ = [];
var len__4789__auto___102913 = arguments.length;
var i__4790__auto___102914 = (0);
while(true){
if((i__4790__auto___102914 < len__4789__auto___102913)){
args__4795__auto__.push((arguments[i__4790__auto___102914]));

var G__102915 = (i__4790__auto___102914 + (1));
i__4790__auto___102914 = G__102915;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return root.impl.core.vec_pluck.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(root.impl.core.vec_pluck.cljs$core$IFn$_invoke$arity$variadic = (function (seq,idxs){
if(cljs.core.not(idxs)){
return seq;
} else {
var idxs__$1 = cljs.core.set(idxs);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.empty(seq),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$1(cljs.core.vector),cljs.core.keep.cljs$core$IFn$_invoke$arity$1((function (p__102707){
var vec__102708 = p__102707;
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102708,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102708,(1),null);
if((!(cljs.core.contains_QMARK_(idxs__$1,idx)))){
return i;
} else {
return null;
}
}))),seq);
}
}));

(root.impl.core.vec_pluck.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(root.impl.core.vec_pluck.cljs$lang$applyTo = (function (seq102703){
var G__102704 = cljs.core.first(seq102703);
var seq102703__$1 = cljs.core.next(seq102703);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__102704,seq102703__$1);
}));

root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"add-after","add-after",-1562215108),(function (p__102711,p__102712){
var map__102713 = p__102711;
var map__102713__$1 = (((((!((map__102713 == null))))?(((((map__102713.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102713.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102713):map__102713);
var root__$1 = map__102713__$1;
var __GT_ref_PLUS_x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102713__$1,new cljs.core.Keyword(null,"->ref+x","->ref+x",721660619));
var map__102714 = p__102712;
var map__102714__$1 = (((((!((map__102714 == null))))?(((((map__102714.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102714.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102714):map__102714);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102714__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102714__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var vec__102717 = (__GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1 ? __GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref_PLUS_x.call(null,ent));
var ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102717,(0),null);
var ref_PLUS_ent = vec__102717;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(root.impl.core.state,(function (st){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(st,cljs.core.pop(path),(function (x){
return root.impl.core.vec_plop(x,(cljs.core.peek(path) + (1)),ref);
})),ref_PLUS_ent);
}));
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"remove","remove",-131428414),(function (p__102721,p__102722){
var map__102724 = p__102721;
var map__102724__$1 = (((((!((map__102724 == null))))?(((((map__102724.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102724.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102724):map__102724);
var root__$1 = map__102724__$1;
var __GT_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102724__$1,new cljs.core.Keyword(null,"->ref","->ref",1148655726));
var map__102725 = p__102722;
var map__102725__$1 = (((((!((map__102725 == null))))?(((((map__102725.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102725.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102725):map__102725);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102725__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102725__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var ref = (__GT_ref.cljs$core$IFn$_invoke$arity$1 ? __GT_ref.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref.call(null,ent));
var ent_path = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(ent);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(root.impl.core.state,(function (st){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(st,(cljs.core.truth_(ent_path)?cljs.core.pop(ent_path):path),(function (x){
if(cljs.spec.alpha.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("root.impl.entity","refs-coll","root.impl.entity/refs-coll",257271445),x)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1((function (p1__102720_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__102720_SHARP_,ref);
})),x);
} else {
return null;

}
})),ref);
}));
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"remove-after","remove-after",1403559961),(function (p__102728,p__102729){
var map__102730 = p__102728;
var map__102730__$1 = (((((!((map__102730 == null))))?(((((map__102730.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102730.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102730):map__102730);
var root__$1 = map__102730__$1;
var __GT_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102730__$1,new cljs.core.Keyword(null,"->ref","->ref",1148655726));
var map__102731 = p__102729;
var map__102731__$1 = (((((!((map__102731 == null))))?(((((map__102731.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102731.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102731):map__102731);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102731__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102731__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var ref = (__GT_ref.cljs$core$IFn$_invoke$arity$1 ? __GT_ref.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref.call(null,ent));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(root.impl.core.state,(function (st){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(st,cljs.core.pop(path),root.impl.core.vec_pluck,(cljs.core.peek(path) + (1))),ref);
}));
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set","set",304602554),(function (p__102735,p__102736){
var map__102737 = p__102735;
var map__102737__$1 = (((((!((map__102737 == null))))?(((((map__102737.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102737.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102737):map__102737);
var root__$1 = map__102737__$1;
var __GT_ref_PLUS_x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102737__$1,new cljs.core.Keyword(null,"->ref+x","->ref+x",721660619));
var map__102738 = p__102736;
var map__102738__$1 = (((((!((map__102738 == null))))?(((((map__102738.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102738.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102738):map__102738);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102738__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102738__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var ref_PLUS_ent = (__GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1 ? __GT_ref_PLUS_x.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref_PLUS_x.call(null,ent));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(root.impl.core.state,(function (st){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(st,ref_PLUS_ent);
}));
}));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","op-path","root.impl.core/op-path",-1521905097),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__102741#","p1__102741#",-173508761,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","or","cljs.core/or",1201033885,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"p1__102741#","p1__102741#",-173508761,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"p1__102741#","p1__102741#",-173508761,null)))),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null))))),new cljs.core.Symbol("cljs.core","vec","cljs.core/vec",307622519,null))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","or","cljs.core/or",1201033885,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"%","%",-950237169,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null))))),new cljs.core.Symbol("cljs.core","vec","cljs.core/vec",307622519,null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__102741_SHARP_){
return (((p1__102741_SHARP_ instanceof cljs.core.Keyword)) || (cljs.core.vector_QMARK_(p1__102741_SHARP_)));
}),cljs.spec.alpha.spec_impl.cljs$core$IFn$_invoke$arity$5(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","conformer","cljs.spec.alpha/conformer",2140085535,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",1181717262,null),cljs.core.list(new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","and","cljs.core/and",-6692549,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),new cljs.core.Symbol(null,"x","x",-555367584,null)),cljs.core.list(new cljs.core.Symbol("cljs.core","not-empty","cljs.core/not-empty",540057011,null),new cljs.core.Symbol(null,"x","x",-555367584,null))))),new cljs.core.Symbol("cljs.core","vec","cljs.core/vec",307622519,null)),(function (x){
if((x instanceof cljs.core.Keyword)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
} else {
if(cljs.core.vector_QMARK_(x)){
return cljs.core.not_empty(x);
} else {
return false;
}
}
}),null,true,cljs.core.vec)], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","tx","root.impl.core/tx",1860941937),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","cat","cljs.spec.alpha/cat",-1471398329,null),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.core","op-path","root.impl.core/op-path",-1521905097)),new cljs.core.Keyword(null,"ent","ent",1225127586),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)),new cljs.core.Keyword(null,"ents","ents",-1980366900),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)))),cljs.spec.alpha.cat_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"ent","ent",1225127586),new cljs.core.Keyword(null,"ents","ents",-1980366900)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.spec.alpha.maybe_impl(new cljs.core.Keyword("root.impl.core","op-path","root.impl.core/op-path",-1521905097),new cljs.core.Keyword("root.impl.core","op-path","root.impl.core/op-path",-1521905097)),cljs.spec.alpha.maybe_impl(new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)),cljs.spec.alpha.maybe_impl(cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102771){
return cljs.core.coll_QMARK_(G__102771);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449))], null),null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.core","op-path","root.impl.core/op-path",-1521905097)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","?","cljs.spec.alpha/?",1605136319,null),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.entity","entity","root.impl.entity/entity",1034122449)))], null)));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","txs","root.impl.core/txs",1369449615),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.core","tx","root.impl.core/tx",1860941937)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword("root.impl.core","tx","root.impl.core/tx",1860941937),new cljs.core.Keyword("root.impl.core","tx","root.impl.core/tx",1860941937),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102772){
return cljs.core.coll_QMARK_(G__102772);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Keyword("root.impl.core","tx","root.impl.core/tx",1860941937))], null),null));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"toggle","toggle",1291842030),(function (p__102773,p__102774){
var map__102775 = p__102773;
var map__102775__$1 = (((((!((map__102775 == null))))?(((((map__102775.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102775.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102775):map__102775);
var root__$1 = map__102775__$1;
var __GT_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102775__$1,new cljs.core.Keyword(null,"->ref","->ref",1148655726));
var map__102776 = p__102774;
var map__102776__$1 = (((((!((map__102776 == null))))?(((((map__102776.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102776.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102776):map__102776);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102776__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var ent = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102776__$1,new cljs.core.Keyword(null,"ent","ent",1225127586));
var ref = (__GT_ref.cljs$core$IFn$_invoke$arity$1 ? __GT_ref.cljs$core$IFn$_invoke$arity$1(ent) : __GT_ref.call(null,ent));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(root.impl.core.state,cljs.core.update_in,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ref], null),path),cljs.core.not);
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"undo","undo",-1818036302),(function (root__$1,_){
return root.impl.core.undo(root__$1);
}));
root.impl.core.run_tx.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"redo","redo",501190664),(function (root__$1,_){
return root.impl.core.redo(root__$1);
}));
root.impl.core.transact = (function root$impl$core$transact(var_args){
var G__102780 = arguments.length;
switch (G__102780) {
case 2:
return root.impl.core.transact.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return root.impl.core.transact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.core.transact.cljs$core$IFn$_invoke$arity$2 = (function (root__$1,txs){
return root.impl.core.transact.cljs$core$IFn$_invoke$arity$3(root__$1,txs,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),true], null));
}));

(root.impl.core.transact.cljs$core$IFn$_invoke$arity$3 = (function (root__$1,txs,p__102781){
var map__102782 = p__102781;
var map__102782__$1 = (((((!((map__102782 == null))))?(((((map__102782.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102782.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102782):map__102782);
var history_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102782__$1,new cljs.core.Keyword(null,"history?","history?",2009378510));
var conformed_txs_102994 = root.impl.util.conform_BANG_(new cljs.core.Keyword("root.impl.core","txs","root.impl.core/txs",1369449615),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,txs));
if(cljs.core.truth_(history_QMARK_)){
root.impl.core.log_txs(txs);
} else {
}

var seq__102784_102995 = cljs.core.seq(conformed_txs_102994);
var chunk__102786_102996 = null;
var count__102787_102997 = (0);
var i__102788_102998 = (0);
while(true){
if((i__102788_102998 < count__102787_102997)){
var ctx_103000 = chunk__102786_102996.cljs$core$IIndexed$_nth$arity$2(null,i__102788_102998);
var ctx_103002__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(ctx_103000,new cljs.core.Keyword(null,"ent","ent",1225127586),cljs.core.dissoc,new cljs.core.Keyword(null,"actions","actions",-812656882),new cljs.core.Keyword(null,"handlers","handlers",79528781),new cljs.core.Keyword(null,"views","views",1450155487));
(root.impl.core.run_tx.cljs$core$IFn$_invoke$arity$2 ? root.impl.core.run_tx.cljs$core$IFn$_invoke$arity$2(root__$1,ctx_103002__$1) : root.impl.core.run_tx.call(null,root__$1,ctx_103002__$1));


var G__103003 = seq__102784_102995;
var G__103004 = chunk__102786_102996;
var G__103005 = count__102787_102997;
var G__103006 = (i__102788_102998 + (1));
seq__102784_102995 = G__103003;
chunk__102786_102996 = G__103004;
count__102787_102997 = G__103005;
i__102788_102998 = G__103006;
continue;
} else {
var temp__5739__auto___103008 = cljs.core.seq(seq__102784_102995);
if(temp__5739__auto___103008){
var seq__102784_103009__$1 = temp__5739__auto___103008;
if(cljs.core.chunked_seq_QMARK_(seq__102784_103009__$1)){
var c__4609__auto___103010 = cljs.core.chunk_first(seq__102784_103009__$1);
var G__103013 = cljs.core.chunk_rest(seq__102784_103009__$1);
var G__103014 = c__4609__auto___103010;
var G__103015 = cljs.core.count(c__4609__auto___103010);
var G__103016 = (0);
seq__102784_102995 = G__103013;
chunk__102786_102996 = G__103014;
count__102787_102997 = G__103015;
i__102788_102998 = G__103016;
continue;
} else {
var ctx_103017 = cljs.core.first(seq__102784_103009__$1);
var ctx_103018__$1 = cljs.core.update.cljs$core$IFn$_invoke$arity$6(ctx_103017,new cljs.core.Keyword(null,"ent","ent",1225127586),cljs.core.dissoc,new cljs.core.Keyword(null,"actions","actions",-812656882),new cljs.core.Keyword(null,"handlers","handlers",79528781),new cljs.core.Keyword(null,"views","views",1450155487));
(root.impl.core.run_tx.cljs$core$IFn$_invoke$arity$2 ? root.impl.core.run_tx.cljs$core$IFn$_invoke$arity$2(root__$1,ctx_103018__$1) : root.impl.core.run_tx.call(null,root__$1,ctx_103018__$1));


var G__103019 = cljs.core.next(seq__102784_103009__$1);
var G__103020 = null;
var G__103021 = (0);
var G__103022 = (0);
seq__102784_102995 = G__103019;
chunk__102786_102996 = G__103020;
count__102787_102997 = G__103021;
i__102788_102998 = G__103022;
continue;
}
} else {
}
}
break;
}

return xframe.core.alpha.notify_listeners_BANG_();
}));

(root.impl.core.transact.cljs$lang$maxFixedArity = 3);

root.impl.core.remove_fragment = (function root$impl$core$remove_fragment(p__102790){
var vec__102791 = p__102790;
var seq__102792 = cljs.core.seq(vec__102791);
var first__102793 = cljs.core.first(seq__102792);
var seq__102792__$1 = cljs.core.next(seq__102792);
var v1 = first__102793;
var views = seq__102792__$1;
var all_views = vec__102791;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"<>","<>",1280186386),v1)){
return views;
} else {
return all_views;
}
});
root.impl.core.default_child_view = (function root$impl$core$default_child_view(views){
var padded_view = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"padding","padding",1660304693),(5),new cljs.core.Keyword(null,"padding-left","padding-left",-1180879053),(10),new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(5)], null)], null)], null);
var G__102794 = new cljs.core.Keyword("root.impl.resolver","type","root.impl.resolver/type",-913307228).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(views));
var G__102794__$1 = (((G__102794 instanceof cljs.core.Keyword))?G__102794.fqn:null);
switch (G__102794__$1) {
case "entity":
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(padded_view,views);

break;
case "entities":
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(padded_view,root.impl.core.remove_fragment(views));

break;
case "entity-map":
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(padded_view,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__102795){
var vec__102796 = p__102795;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102796,(0),null);
var child_or_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102796,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),[cljs.core.name(k),": "].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root.impl.core.default_child_view,child_or_children], null)], null);
})),views);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__102794__$1)].join('')));

}
});
root.impl.core.domify_map = (function root$impl$core$domify_map(var_args){
var G__102800 = arguments.length;
switch (G__102800) {
case 2:
return root.impl.core.domify_map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return root.impl.core.domify_map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.core.domify_map.cljs$core$IFn$_invoke$arity$2 = (function (vfn,m){
return root.impl.core.domify_map.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),vfn,m);
}));

(root.impl.core.domify_map.cljs$core$IFn$_invoke$arity$3 = (function (into_vec,vfn,m){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(into_vec,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__102801){
var vec__102802 = p__102801;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102802,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102802,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),[cljs.core.name(k),": "].join(''),(vfn.cljs$core$IFn$_invoke$arity$1 ? vfn.cljs$core$IFn$_invoke$arity$1(v) : vfn.call(null,v))], null);
})),m);
}));

(root.impl.core.domify_map.cljs$lang$maxFixedArity = 3);

root.impl.core.child_views = (function root$impl$core$child_views(ent){
var root__$1 = new cljs.core.Keyword(null,"root","root",-448657453).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(ent));
var temp__5739__auto__ = cljs.core.not_empty(cljs.core.select_keys(ent,new cljs.core.Keyword(null,"content-ui-keys","content-ui-keys",-2093155717).cljs$core$IFn$_invoke$arity$1(root__$1)));
if(cljs.core.truth_(temp__5739__auto__)){
var child_views = temp__5739__auto__;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [root.impl.core.domify_map,root.impl.core.default_child_view,child_views], null);
} else {
return null;
}
});
root.impl.core.default_view_STAR_ = (function root$impl$core$default_view_STAR_(ent){
var root__$1 = new cljs.core.Keyword(null,"root","root",-448657453).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(ent));
var non_views = cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.dissoc,ent,new cljs.core.Keyword(null,"actions","actions",-812656882),new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"parent-id","parent-id",-1400729131),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"handlers","handlers",79528781),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"content-keys","content-keys",2000186673).cljs$core$IFn$_invoke$arity$1(root__$1),new cljs.core.Keyword(null,"content-ui-keys","content-ui-keys",-2093155717).cljs$core$IFn$_invoke$arity$1(root__$1))], 0));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mb2","div.mb2",1996210983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding","padding",1660304693),(10),new cljs.core.Keyword(null,"border","border",1444987323),"1px solid tomato"], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__102809){
var vec__102810 = p__102809;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102810,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102810,(1),null);
var too_long_QMARK_ = (((cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)).length) > (140));
var k_SINGLEQUOTE_ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(k);
var pretty_v = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.overflow-scroll.code.f6.di","div.overflow-scroll.code.f6.di",725006380),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-height","max-height",-612563804),(200),new cljs.core.Keyword(null,"white-space","white-space",-707351930),new cljs.core.Keyword(null,"pre-wrap","pre-wrap",979551718)], null)], null),root.impl.util.pretty_str(v)], null);
if(too_long_QMARK_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary.outline-0","summary.outline-0",2079300894),k_SINGLEQUOTE_], null),pretty_v], null);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),k_SINGLEQUOTE_," ",pretty_v], null);
}
}),non_views)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root.impl.core.child_views,ent], null)], null);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
root.impl.core.UIRoot = (function (add_view,remove_method,dispatch_view,method_table,__meta,__extmap,__hash){
this.add_view = add_view;
this.remove_method = remove_method;
this.dispatch_view = dispatch_view;
this.method_table = method_table;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716171;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(root.impl.core.UIRoot.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4439__auto__,k__4440__auto__){
var self__ = this;
var this__4439__auto____$1 = this;
return this__4439__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4440__auto__,null);
}));

(root.impl.core.UIRoot.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4441__auto__,k102816,else__4442__auto__){
var self__ = this;
var this__4441__auto____$1 = this;
var G__102821 = k102816;
var G__102821__$1 = (((G__102821 instanceof cljs.core.Keyword))?G__102821.fqn:null);
switch (G__102821__$1) {
case "add-view":
return self__.add_view;

break;
case "remove-method":
return self__.remove_method;

break;
case "dispatch-view":
return self__.dispatch_view;

break;
case "method-table":
return self__.method_table;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k102816,else__4442__auto__);

}
}));

(root.impl.core.UIRoot.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4458__auto__,f__4459__auto__,init__4460__auto__){
var self__ = this;
var this__4458__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4461__auto__,p__102823){
var vec__102824 = p__102823;
var k__4462__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102824,(0),null);
var v__4463__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102824,(1),null);
return (f__4459__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4459__auto__.cljs$core$IFn$_invoke$arity$3(ret__4461__auto__,k__4462__auto__,v__4463__auto__) : f__4459__auto__.call(null,ret__4461__auto__,k__4462__auto__,v__4463__auto__));
}),init__4460__auto__,this__4458__auto____$1);
}));

(root.impl.core.UIRoot.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4453__auto__,writer__4454__auto__,opts__4455__auto__){
var self__ = this;
var this__4453__auto____$1 = this;
var pr_pair__4456__auto__ = (function (keyval__4457__auto__){
return cljs.core.pr_sequential_writer(writer__4454__auto__,cljs.core.pr_writer,""," ","",opts__4455__auto__,keyval__4457__auto__);
});
return cljs.core.pr_sequential_writer(writer__4454__auto__,pr_pair__4456__auto__,"#root.impl.core.UIRoot{",", ","}",opts__4455__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"add-view","add-view",39547256),self__.add_view],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),self__.remove_method],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069),self__.dispatch_view],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"method-table","method-table",776172604),self__.method_table],null))], null),self__.__extmap));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__102815){
var self__ = this;
var G__102815__$1 = this;
return (new cljs.core.RecordIter((0),G__102815__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-view","add-view",39547256),new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069),new cljs.core.Keyword(null,"method-table","method-table",776172604)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4437__auto__){
var self__ = this;
var this__4437__auto____$1 = this;
return self__.__meta;
}));

(root.impl.core.UIRoot.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4434__auto__){
var self__ = this;
var this__4434__auto____$1 = this;
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,self__.dispatch_view,self__.method_table,self__.__meta,self__.__extmap,self__.__hash));
}));

(root.impl.core.UIRoot.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4443__auto__){
var self__ = this;
var this__4443__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4435__auto__){
var self__ = this;
var this__4435__auto____$1 = this;
var h__4297__auto__ = self__.__hash;
if((!((h__4297__auto__ == null)))){
return h__4297__auto__;
} else {
var h__4297__auto____$1 = (function (){var fexpr__102835 = (function (coll__4436__auto__){
return (1645899315 ^ cljs.core.hash_unordered_coll(coll__4436__auto__));
});
return fexpr__102835(this__4435__auto____$1);
})();
(self__.__hash = h__4297__auto____$1);

return h__4297__auto____$1;
}
}));

(root.impl.core.UIRoot.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this102817,other102818){
var self__ = this;
var this102817__$1 = this;
return (((!((other102818 == null)))) && ((this102817__$1.constructor === other102818.constructor)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this102817__$1.add_view,other102818.add_view)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this102817__$1.remove_method,other102818.remove_method)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this102817__$1.dispatch_view,other102818.dispatch_view)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this102817__$1.method_table,other102818.method_table)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this102817__$1.__extmap,other102818.__extmap)));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4448__auto__,k__4449__auto__){
var self__ = this;
var this__4448__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),null,new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069),null,new cljs.core.Keyword(null,"add-view","add-view",39547256),null,new cljs.core.Keyword(null,"method-table","method-table",776172604),null], null), null),k__4449__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4448__auto____$1),self__.__meta),k__4449__auto__);
} else {
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,self__.dispatch_view,self__.method_table,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4449__auto__)),null));
}
}));

(root.impl.core.UIRoot.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4446__auto__,k__4447__auto__,G__102815){
var self__ = this;
var this__4446__auto____$1 = this;
var pred__102837 = cljs.core.keyword_identical_QMARK_;
var expr__102838 = k__4447__auto__;
if(cljs.core.truth_((function (){var G__102840 = new cljs.core.Keyword(null,"add-view","add-view",39547256);
var G__102841 = expr__102838;
return (pred__102837.cljs$core$IFn$_invoke$arity$2 ? pred__102837.cljs$core$IFn$_invoke$arity$2(G__102840,G__102841) : pred__102837.call(null,G__102840,G__102841));
})())){
return (new root.impl.core.UIRoot(G__102815,self__.remove_method,self__.dispatch_view,self__.method_table,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__102842 = new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794);
var G__102843 = expr__102838;
return (pred__102837.cljs$core$IFn$_invoke$arity$2 ? pred__102837.cljs$core$IFn$_invoke$arity$2(G__102842,G__102843) : pred__102837.call(null,G__102842,G__102843));
})())){
return (new root.impl.core.UIRoot(self__.add_view,G__102815,self__.dispatch_view,self__.method_table,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__102844 = new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069);
var G__102845 = expr__102838;
return (pred__102837.cljs$core$IFn$_invoke$arity$2 ? pred__102837.cljs$core$IFn$_invoke$arity$2(G__102844,G__102845) : pred__102837.call(null,G__102844,G__102845));
})())){
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,G__102815,self__.method_table,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__102846 = new cljs.core.Keyword(null,"method-table","method-table",776172604);
var G__102847 = expr__102838;
return (pred__102837.cljs$core$IFn$_invoke$arity$2 ? pred__102837.cljs$core$IFn$_invoke$arity$2(G__102846,G__102847) : pred__102837.call(null,G__102846,G__102847));
})())){
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,self__.dispatch_view,G__102815,self__.__meta,self__.__extmap,null));
} else {
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,self__.dispatch_view,self__.method_table,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4447__auto__,G__102815),null));
}
}
}
}
}));

(root.impl.core.UIRoot.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4451__auto__){
var self__ = this;
var this__4451__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"add-view","add-view",39547256),self__.add_view,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),self__.remove_method,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069),self__.dispatch_view,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"method-table","method-table",776172604),self__.method_table,null))], null),self__.__extmap));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4438__auto__,G__102815){
var self__ = this;
var this__4438__auto____$1 = this;
return (new root.impl.core.UIRoot(self__.add_view,self__.remove_method,self__.dispatch_view,self__.method_table,G__102815,self__.__extmap,self__.__hash));
}));

(root.impl.core.UIRoot.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4444__auto__,entry__4445__auto__){
var self__ = this;
var this__4444__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4445__auto__)){
return this__4444__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__4445__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__4445__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4444__auto____$1,entry__4445__auto__);
}
}));

(root.impl.core.UIRoot.prototype.call = (function (unused__11304__auto__){
var self__ = this;
var self__ = this;
var G__102856 = (arguments.length - (1));
switch (G__102856) {
case (1):
return self__.cljs$core$IFn$_invoke$arity$1((arguments[(1)]));

break;
case (2):
return self__.cljs$core$IFn$_invoke$arity$2((arguments[(1)]),(arguments[(2)]));

break;
case (3):
return self__.cljs$core$IFn$_invoke$arity$3((arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((arguments.length - (1)))].join('')));

}
}));

(root.impl.core.UIRoot.prototype.apply = (function (self__,args102820){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args102820)));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IFn$_invoke$arity$1 = (function (a){
var self__ = this;
var this$ = this;
return (this$.cljs$core$IFn$_invoke$arity$2 ? this$.cljs$core$IFn$_invoke$arity$2(a,null) : this$.call(null,a,null));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
var self__ = this;
var this$ = this;
return (this$.cljs$core$IFn$_invoke$arity$3 ? this$.cljs$core$IFn$_invoke$arity$3(a,b,null) : this$.call(null,a,b,null));
}));

(root.impl.core.UIRoot.prototype.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
var self__ = this;
var map__102859 = this;
var map__102859__$1 = (((((!((map__102859 == null))))?(((((map__102859.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102859.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102859):map__102859);
var root__$1 = map__102859__$1;
var transact = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102859__$1,new cljs.core.Keyword(null,"transact","transact",-267998670));
var lookup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102859__$1,new cljs.core.Keyword(null,"lookup","lookup",1225356838));
var G__102861 = a;
var G__102861__$1 = (((G__102861 instanceof cljs.core.Keyword))?G__102861.fqn:null);
switch (G__102861__$1) {
case "transact":
return (transact.cljs$core$IFn$_invoke$arity$3 ? transact.cljs$core$IFn$_invoke$arity$3(root__$1,b,c) : transact.call(null,root__$1,b,c));

break;
case "lookup":
return cljs.core.with_meta((lookup.cljs$core$IFn$_invoke$arity$1 ? lookup.cljs$core$IFn$_invoke$arity$1(b) : lookup.call(null,b)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"root","root",-448657453),root__$1], null));

break;
case "view":
return (self__.add_view.cljs$core$IFn$_invoke$arity$2 ? self__.add_view.cljs$core$IFn$_invoke$arity$2(b,c) : self__.add_view.call(null,b,c));

break;
case "resolve":
var G__102862 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [root.impl.resolver.resolved_view,root__$1], null);
if(cljs.core.truth_(b)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__102862,b);
} else {
return G__102862;
}

break;
default:
return (self__.dispatch_view.cljs$core$IFn$_invoke$arity$1 ? self__.dispatch_view.cljs$core$IFn$_invoke$arity$1(a) : self__.dispatch_view.call(null,a));

}
}));

(root.impl.core.UIRoot.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"add-view","add-view",1680078783,null),new cljs.core.Symbol(null,"remove-method","remove-method",72923733,null),new cljs.core.Symbol(null,"dispatch-view","dispatch-view",-1969273700,null),new cljs.core.Symbol(null,"method-table","method-table",-1878263165,null)], null);
}));

(root.impl.core.UIRoot.cljs$lang$type = true);

(root.impl.core.UIRoot.cljs$lang$ctorPrSeq = (function (this__4482__auto__){
return (new cljs.core.List(null,"root.impl.core/UIRoot",null,(1),null));
}));

(root.impl.core.UIRoot.cljs$lang$ctorPrWriter = (function (this__4482__auto__,writer__4483__auto__){
return cljs.core._write(writer__4483__auto__,"root.impl.core/UIRoot");
}));

/**
 * Positional factory function for root.impl.core/UIRoot.
 */
root.impl.core.__GT_UIRoot = (function root$impl$core$__GT_UIRoot(add_view,remove_method,dispatch_view,method_table){
return (new root.impl.core.UIRoot(add_view,remove_method,dispatch_view,method_table,null,null,null));
});

/**
 * Factory function for root.impl.core/UIRoot, taking a map of keywords to field values.
 */
root.impl.core.map__GT_UIRoot = (function root$impl$core$map__GT_UIRoot(G__102819){
var extmap__4478__auto__ = (function (){var G__102863 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__102819,new cljs.core.Keyword(null,"add-view","add-view",39547256),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069),new cljs.core.Keyword(null,"method-table","method-table",776172604)], 0));
if(cljs.core.record_QMARK_(G__102819)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__102863);
} else {
return G__102863;
}
})();
return (new root.impl.core.UIRoot(new cljs.core.Keyword(null,"add-view","add-view",39547256).cljs$core$IFn$_invoke$arity$1(G__102819),new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794).cljs$core$IFn$_invoke$arity$1(G__102819),new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069).cljs$core$IFn$_invoke$arity$1(G__102819),new cljs.core.Keyword(null,"method-table","method-table",776172604).cljs$core$IFn$_invoke$arity$1(G__102819),null,cljs.core.not_empty(extmap__4478__auto__),null));
});

root.impl.core.view_multi_dispatch = (function root$impl$core$view_multi_dispatch(opts){
return clojure.set.rename_keys(cljs.core.update.cljs$core$IFn$_invoke$arity$3(root.impl.multi.multi_dispatch(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"invoke-fn","invoke-fn",1024039792),(function root$impl$core$view_multi_dispatch_$_as_component(f,x){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,x], null);
})], null),opts], 0))),new cljs.core.Keyword(null,"add-method","add-method",-824238743),(function (add_method){
return (function root$impl$core$view_multi_dispatch_$_with_name(dispatch_val,view){
(view.displayName = ["root-view__",cljs.core.name(dispatch_val)].join(''));

return (add_method.cljs$core$IFn$_invoke$arity$2 ? add_method.cljs$core$IFn$_invoke$arity$2(dispatch_val,view) : add_method.call(null,dispatch_val,view));
});
})),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"add-method","add-method",-824238743),new cljs.core.Keyword(null,"add-view","add-view",39547256),new cljs.core.Keyword(null,"remove-method","remove-method",-1567607794),new cljs.core.Keyword(null,"remove-view","remove-view",467090391),new cljs.core.Keyword(null,"method-table","method-table",776172604),new cljs.core.Keyword(null,"view-table","view-table",1881137225),new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.Keyword(null,"dispatch-view","dispatch-view",685162069)], null));
});
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","dispatch-fn","root.impl.core/dispatch-fn",1733168511),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","lookup","root.impl.core/lookup",-1406342331),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","lookup-sub","root.impl.core/lookup-sub",896736792),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","content-keys","root.impl.core/content-keys",1113321554),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(new cljs.core.Symbol(null,"keyword?","keyword?",1917797069,null),cljs.core.keyword_QMARK_,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),null,new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__102864){
return cljs.core.coll_QMARK_(G__102864);
}),new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","coll-of","cljs.spec.alpha/coll-of",1019430407,null),new cljs.core.Symbol("cljs.core","keyword?","cljs.core/keyword?",713156450,null))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","content-spec","root.impl.core/content-spec",63451589),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"fn","fn",-1175266204),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Keyword(null,"spec","spec",347520401),new cljs.core.Symbol("cljs.spec.alpha","spec?","cljs.spec.alpha/spec?",-2086793671,null)),cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fn","fn",-1175266204),new cljs.core.Keyword(null,"spec","spec",347520401)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),new cljs.core.Symbol("cljs.spec.alpha","spec?","cljs.spec.alpha/spec?",-2086793671,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.ifn_QMARK_,cljs.spec.alpha.spec_QMARK_], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","->ref","root.impl.core/->ref",-1554868531),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","transact","root.impl.core/transact",1382821075),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","add-id","root.impl.core/add-id",1646978199),new cljs.core.Symbol("cljs.core","ifn?","cljs.core/ifn?",1573873861,null),cljs.core.ifn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","dispatch-fn","root.impl.core/dispatch-fn",1733168511),new cljs.core.Keyword("root.impl.core","content-spec","root.impl.core/content-spec",63451589),new cljs.core.Keyword("root.impl.core","content-keys","root.impl.core/content-keys",1113321554)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","dispatch-fn","root.impl.core/dispatch-fn",1733168511),new cljs.core.Keyword("root.impl.core","content-spec","root.impl.core/content-spec",63451589),new cljs.core.Keyword("root.impl.core","content-keys","root.impl.core/content-keys",1113321554)], null),null,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__102865){
return cljs.core.map_QMARK_(G__102865);
}),(function (G__102865){
return cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614));
}),(function (G__102865){
return cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556));
}),(function (G__102865){
return cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"content-keys","content-keys",2000186673));
})], null),(function (G__102865){
return ((cljs.core.map_QMARK_(G__102865)) && (cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614))) && (cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556))) && (cljs.core.contains_QMARK_(G__102865,new cljs.core.Keyword(null,"content-keys","content-keys",2000186673))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","dispatch-fn","root.impl.core/dispatch-fn",1733168511),new cljs.core.Keyword("root.impl.core","content-spec","root.impl.core/content-spec",63451589),new cljs.core.Keyword("root.impl.core","content-keys","root.impl.core/content-keys",1113321554)], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614),new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556),new cljs.core.Keyword(null,"content-keys","content-keys",2000186673)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"content-keys","content-keys",2000186673)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup","root.impl.core/lookup",-1406342331)], null))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup","root.impl.core/lookup",-1406342331)], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup","root.impl.core/lookup",-1406342331)], null),null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__102866){
return cljs.core.map_QMARK_(G__102866);
}),(function (G__102866){
return cljs.core.contains_QMARK_(G__102866,new cljs.core.Keyword(null,"lookup","lookup",1225356838));
})], null),(function (G__102866){
return ((cljs.core.map_QMARK_(G__102866)) && (cljs.core.contains_QMARK_(G__102866,new cljs.core.Keyword(null,"lookup","lookup",1225356838))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup","root.impl.core/lookup",-1406342331)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lookup","lookup",1225356838)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"lookup","lookup",1225356838)))], null),null]))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup-sub","root.impl.core/lookup-sub",896736792)], null))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup-sub","root.impl.core/lookup-sub",896736792)], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup-sub","root.impl.core/lookup-sub",896736792)], null),null,null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__102867){
return cljs.core.map_QMARK_(G__102867);
}),(function (G__102867){
return cljs.core.contains_QMARK_(G__102867,new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981));
})], null),(function (G__102867){
return ((cljs.core.map_QMARK_(G__102867)) && (cljs.core.contains_QMARK_(G__102867,new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","lookup-sub","root.impl.core/lookup-sub",896736792)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981)))], null),null]))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","ui-root-dynamic","root.impl.core/ui-root-dynamic",725441435),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","transact","root.impl.core/transact",1382821075),new cljs.core.Keyword("root.impl.core","add-id","root.impl.core/add-id",1646978199),new cljs.core.Keyword("root.impl.core","->ref","root.impl.core/->ref",-1554868531)], null))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","transact","root.impl.core/transact",1382821075),new cljs.core.Keyword("root.impl.core","add-id","root.impl.core/add-id",1646978199),new cljs.core.Keyword("root.impl.core","->ref","root.impl.core/->ref",-1554868531)], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","transact","root.impl.core/transact",1382821075),new cljs.core.Keyword("root.impl.core","add-id","root.impl.core/add-id",1646978199),new cljs.core.Keyword("root.impl.core","->ref","root.impl.core/->ref",-1554868531)], null),null,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__102868){
return cljs.core.map_QMARK_(G__102868);
}),(function (G__102868){
return cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"transact","transact",-267998670));
}),(function (G__102868){
return cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"add-id","add-id",-989371530));
}),(function (G__102868){
return cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"->ref","->ref",1148655726));
})], null),(function (G__102868){
return ((cljs.core.map_QMARK_(G__102868)) && (cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"transact","transact",-267998670))) && (cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"add-id","add-id",-989371530))) && (cljs.core.contains_QMARK_(G__102868,new cljs.core.Keyword(null,"->ref","->ref",1148655726))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","transact","root.impl.core/transact",1382821075),new cljs.core.Keyword("root.impl.core","add-id","root.impl.core/add-id",1646978199),new cljs.core.Keyword("root.impl.core","->ref","root.impl.core/->ref",-1554868531)], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"transact","transact",-267998670),new cljs.core.Keyword(null,"add-id","add-id",-989371530),new cljs.core.Keyword(null,"->ref","->ref",1148655726)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"transact","transact",-267998670))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"add-id","add-id",-989371530))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"->ref","->ref",1148655726)))], null),null]))], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("root.impl.core","ui-root","root.impl.core/ui-root",820607108),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","or","cljs.spec.alpha/or",-831679639,null),new cljs.core.Keyword(null,"dynamic","dynamic",704819571),new cljs.core.Keyword("root.impl.core","ui-root-dynamic","root.impl.core/ui-root-dynamic",725441435),new cljs.core.Keyword(null,"reactive","reactive",717758366),new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),new cljs.core.Keyword(null,"static","static",1214358571),new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789)),cljs.spec.alpha.or_spec_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dynamic","dynamic",704819571),new cljs.core.Keyword(null,"reactive","reactive",717758366),new cljs.core.Keyword(null,"static","static",1214358571),new cljs.core.Keyword(null,"data","data",-232669377)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-dynamic","root.impl.core/ui-root-dynamic",725441435),new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("root.impl.core","ui-root-dynamic","root.impl.core/ui-root-dynamic",725441435),new cljs.core.Keyword("root.impl.core","ui-root-reactive","root.impl.core/ui-root-reactive",160434256),new cljs.core.Keyword("root.impl.core","ui-root-static","root.impl.core/ui-root-static",-165145951),new cljs.core.Keyword("root.impl.core","ui-root-data","root.impl.core/ui-root-data",-1914335789)], null),null));
root.impl.core.opts_warn = (function root$impl$core$opts_warn(root_opts){
var vec__102869 = root.impl.util.conform_BANG_(new cljs.core.Keyword("root.impl.core","ui-root","root.impl.core/ui-root",820607108),root_opts);
var root_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102869,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102869,(1),null);
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"static","static",1214358571),null,new cljs.core.Keyword(null,"reactive","reactive",717758366),null], null), null),root_type)){
return console.warn("Root Warning: static use only. Missing one or more required","functions: lookup-sub, transact, ent->ref, add-id.");
} else {
return null;
}
});
root.impl.core.__temp_default_ent__GT_ref = (function root$impl$core$__temp_default_ent__GT_ref(ent){
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(ent);
});
root.impl.core.__GT_post_fixed_keyword = (function root$impl$core$__GT_post_fixed_keyword(var_args){
var G__102873 = arguments.length;
switch (G__102873) {
case 1:
return root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$1 = (function (post_fix){
return (function (x){
return root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$2(post_fix,x);
});
}));

(root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$2 = (function (post_fix,x){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.name(x),cljs.core.str.cljs$core$IFn$_invoke$arity$1(post_fix)].join(''));
}));

(root.impl.core.__GT_post_fixed_keyword.cljs$lang$maxFixedArity = 2);

root.impl.core.child_view_mappings = (function root$impl$core$child_view_mappings(p__102874){
var map__102875 = p__102874;
var map__102875__$1 = (((((!((map__102875 == null))))?(((((map__102875.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102875.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102875):map__102875);
var content_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102875__$1,new cljs.core.Keyword(null,"content-keys","content-keys",2000186673));
var content_post_fix = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__102875__$1,new cljs.core.Keyword(null,"content-post-fix","content-post-fix",1401859835),"-ui");
var content_ui_keys = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(root.impl.core.__GT_post_fixed_keyword.cljs$core$IFn$_invoke$arity$1(content_post_fix),content_keys);
var content_key__GT_ui_key = cljs.core.zipmap(content_keys,content_ui_keys);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"content-keys","content-keys",2000186673),content_keys,new cljs.core.Keyword(null,"content-ui-keys","content-ui-keys",-2093155717),content_ui_keys,new cljs.core.Keyword(null,"content-key->ui-key","content-key->ui-key",2026428641),content_key__GT_ui_key], null);
});
root.impl.core.default_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"content-post-fix","content-post-fix",1401859835),"-ui",new cljs.core.Keyword(null,"contents-hiccup-wrapper","contents-hiccup-wrapper",1839301927),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null)], null);
root.impl.core.ui_root = (function root$impl$core$ui_root(p__102877){
var map__102878 = p__102877;
var map__102878__$1 = (((((!((map__102878 == null))))?(((((map__102878.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102878.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102878):map__102878);
var opts = map__102878__$1;
var dispatch_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102878__$1,new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614));
var default_view = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__102878__$1,new cljs.core.Keyword(null,"default-view","default-view",-997998838),root.impl.core.default_view_STAR_);
var invoke_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102878__$1,new cljs.core.Keyword(null,"invoke-fn","invoke-fn",1024039792));
var lookup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102878__$1,new cljs.core.Keyword(null,"lookup","lookup",1225356838));
var lookup_sub = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102878__$1,new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981));
var __GT_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__102878__$1,new cljs.core.Keyword(null,"->ref","->ref",1148655726),root.impl.core.__temp_default_ent__GT_ref);
var content_spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102878__$1,new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556));
root.impl.core.opts_warn(opts);

var opts__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([root.impl.core.default_opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"resolve-spec","resolve-spec",-1426665524),root.impl.resolver.__GT_resolver_spec(content_spec)], null),opts], 0));
return root.impl.core.map__GT_UIRoot(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([root.impl.core.view_multi_dispatch(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614),dispatch_fn,new cljs.core.Keyword(null,"default-dispatch-fn","default-dispatch-fn",334144573),default_view,new cljs.core.Keyword(null,"invoke-fn","invoke-fn",1024039792),invoke_fn], null)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"->ref","->ref",1148655726),__GT_ref,new cljs.core.Keyword(null,"->ref+x","->ref+x",721660619),(function root$impl$core$ui_root_$___GT_ref_PLUS_x(x){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(__GT_ref.cljs$core$IFn$_invoke$arity$1 ? __GT_ref.cljs$core$IFn$_invoke$arity$1(x) : __GT_ref.call(null,x)),x], null);
})], null),root.impl.core.child_view_mappings(opts__$1),(((lookup_sub == null))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981),lookup], null):null),opts__$1], 0)));
});

//# sourceMappingURL=root.impl.core.js.map
