goog.provide('examples.rich_document.views');
goog.require('cljs.core');
goog.require('den1k.shortcuts');
goog.require('examples.util.dom');
goog.require('examples.util.string');
goog.require('uix.dom.alpha');
goog.require('root.impl.core');
goog.require('root.impl.util');
goog.require('xframe.core.alpha');
goog.require('examples.rich_document.mock_data');
goog.require('uix.core.alpha');
examples.rich_document.views.entity_actions = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"global","global",93595047),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"undo","undo",-1818036302),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"undo","undo",-1818036302)], null)], null),new cljs.core.Keyword(null,"redo","redo",501190664),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"redo","redo",501190664)], null)], null)], null),new cljs.core.Keyword(null,"toggle-list","toggle-list",-190611366),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.Keyword(null,"content","content",15833224)], null)], null)], null)], null),new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"add","add",235287739),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add","add",235287739),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"items","items",1031954938)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804),new cljs.core.Keyword(null,"active?","active?",459499776),true,new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New Todo"], null)], null)], null)], null),new cljs.core.Keyword(null,"add-after","add-after",-1562215108),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-after","add-after",-1562215108),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804),new cljs.core.Keyword(null,"active?","active?",459499776),true,new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New Todo"], null)], null)], null)], null),new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"items","items",1031954938)], null)], null)], null),new cljs.core.Keyword(null,"toggle-checked","toggle-checked",1194008143),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"toggle","toggle",1291842030),new cljs.core.Keyword(null,"checked?","checked?",2024809091)], null)], null)], null)], null);
examples.rich_document.views.ent__GT_ref = (function examples$rich_document$views$ent__GT_ref(ent){
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(ent);
});
examples.rich_document.views.projected_data = root.impl.util.project.cljs$core$IFn$_invoke$arity$2((function (ent){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.ent__GT_ref(ent),ent], null);
}),examples.rich_document.mock_data.data);
cljs.core.reset_BANG_(root.impl.core.state,examples.rich_document.views.projected_data);
examples.rich_document.views.lookup_STAR_ = (function examples$rich_document$views$lookup_STAR_(x){
if(cljs.core.coll_QMARK_(x)){
return x;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("xframe.core.alpha","db","xframe.core.alpha/db",39839775)], null)),x);
}
});
xframe.core.alpha._reg_sub(new cljs.core.Keyword(null,"get","get",1683182755),(function (){var f__40430__auto__ = (function (k){
return examples.rich_document.views.lookup_STAR_(k);
});
var f_STAR___40431__auto__ = xframe.core.alpha.memoize_last_by(cljs.core.first,cljs.core.second,(function (G__123062){
return xframe.core.adapton.make_athunk.cljs$core$IFn$_invoke$arity$variadic((function (){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f__40430__auto__,G__123062);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((goog.DEBUG)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"args","args",1315556576),G__123062], null):null)], 0));
}));
return (function (key__40432__auto__,args__40433__auto__){
return cljs.core.deref((f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2 ? f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2(key__40432__auto__,args__40433__auto__) : f_STAR___40431__auto__.call(null,key__40432__auto__,args__40433__auto__)));
});
})());
examples.rich_document.views.lookup = examples.rich_document.views.lookup_STAR_;
if(cljs.core.not(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)){
(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = null);
} else {
}
examples.rich_document.views.lookup_sub = (function examples$rich_document$views$lookup_sub(id){
var s123064 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get","get",1683182755),id], null);
var k__41383__auto__ = "G__123065";
var get_state123063 = (function (){
return xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$2(s123064,k__41383__auto__);
});
if(goog.DEBUG){
if(cljs.core.truth_((function (){var and__4174__auto__ = __REACT_DEVTOOLS_GLOBAL_HOOK__;
if(cljs.core.truth_(and__4174__auto__)){
return __REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.get((1)).getCurrentFiber();
} else {
return and__4174__auto__;
}
})())){
return xframe.core.alpha.subscribe_ref(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2(get_state123063,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [s123064], null)));
} else {
return get_state123063();
}
} else {
return xframe.core.alpha.subscribe_ref(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2(get_state123063,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [s123064], null)));
}
});
examples.rich_document.views.root = root.impl.core.ui_root(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556),new cljs.core.Keyword(null,"lookup","lookup",1225356838),new cljs.core.Keyword(null,"->ref","->ref",1148655726),new cljs.core.Keyword(null,"invoke-fn","invoke-fn",1024039792),new cljs.core.Keyword(null,"content-keys","content-keys",2000186673),new cljs.core.Keyword(null,"transact","transact",-267998670),new cljs.core.Keyword(null,"lookup-sub","lookup-sub",273588981),new cljs.core.Keyword(null,"add-id","add-id",-989371530),new cljs.core.Keyword(null,"entity-actions","entity-actions",1748825852),new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614)],[cljs.core.integer_QMARK_,examples.rich_document.views.lookup,examples.rich_document.views.ent__GT_ref,(function examples$rich_document$views$invoke(f,x){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,x], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),examples.rich_document.views.ent__GT_ref(x)], null));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"content","content",15833224)], null),root.impl.core.transact,examples.rich_document.views.lookup_sub,root.impl.core.add_id,examples.rich_document.views.entity_actions,(function (x){
var or__4185__auto__ = new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(x);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x);
}
})]));
den1k.shortcuts.global_shortcuts.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, ["cmd+z",(function (){
var G__123066 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123067 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"undo","undo",-1818036302)], null)], null);
var G__123068 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123066,G__123067,G__123068) : examples.rich_document.views.root.call(null,G__123066,G__123067,G__123068));
}),"cmd+shift+z",(function (){
var G__123069 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123070 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"redo","redo",501190664)], null)], null);
var G__123071 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123069,G__123070,G__123071) : examples.rich_document.views.root.call(null,G__123069,G__123070,G__123071));
})], null)], 0));
examples.rich_document.views.block = (function examples$rich_document$views$block(var_args){
var args__4795__auto__ = [];
var len__4789__auto___123150 = arguments.length;
var i__4790__auto___123151 = (0);
while(true){
if((i__4790__auto___123151 < len__4789__auto___123150)){
args__4795__auto__.push((arguments[i__4790__auto___123151]));

var G__123152 = (i__4790__auto___123151 + (1));
i__4790__auto___123151 = G__123152;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((1) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((1)),(0),null)):null);
return examples.rich_document.views.block.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4796__auto__);
});

(examples.rich_document.views.block.cljs$core$IFn$_invoke$arity$variadic = (function (p__123075,children){
var map__123076 = p__123075;
var map__123076__$1 = (((((!((map__123076 == null))))?(((((map__123076.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123076.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123076):map__123076);
var ent = map__123076__$1;
var map__123077 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123076__$1,new cljs.core.Keyword(null,"actions","actions",-812656882));
var map__123077__$1 = (((((!((map__123077 == null))))?(((((map__123077.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123077.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123077):map__123077);
var remove = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123077__$1,new cljs.core.Keyword(null,"remove","remove",-131428414));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123076__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var show_block_thumb_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123076__$1,new cljs.core.Keyword(null,"show-block-thumb?","show-block-thumb?",1262394682));
var show_block_menu_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123076__$1,new cljs.core.Keyword(null,"show-block-menu?","show-block-menu?",-1047340866));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123076__$1,new cljs.core.Keyword(null,"path","path",-188191168));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.items-center","div.flex.items-center",-1537844053),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-mouse-enter","on-mouse-enter",-1664921661),(function (e){
var G__123080 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123081 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent,new cljs.core.Keyword(null,"show-block-thumb?","show-block-thumb?",1262394682),true)], null)], null);
var G__123082 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123080,G__123081,G__123082) : examples.rich_document.views.root.call(null,G__123080,G__123081,G__123082));
}),new cljs.core.Keyword(null,"on-mouse-leave","on-mouse-leave",-1864319528),(function (e){
var G__123083 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123084 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ent,new cljs.core.Keyword(null,"show-block-thumb?","show-block-thumb?",1262394682),false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"show-block-menu?","show-block-menu?",-1047340866),false], 0))], null)], null);
var G__123085 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123083,G__123084,G__123085) : examples.rich_document.views.root.call(null,G__123083,G__123084,G__123085));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(show_block_thumb_QMARK_)?null:"hide-child")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.light-silver.pointer.f7.mr1.relative","div.light-silver.pointer.f7.mr1.relative",294828833),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.b.pa1.f6.br1.hover-bg-light-gray.child","span.b.pa1.f6.br1.hover-bg-light-gray.child",1791461476),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var G__123086 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123087 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent,new cljs.core.Keyword(null,"show-block-menu?","show-block-menu?",-1047340866),true)], null)], null);
var G__123088 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123086,G__123087,G__123088) : examples.rich_document.views.root.call(null,G__123086,G__123087,G__123088));
})], null),"::"], null),(cljs.core.truth_(show_block_menu_QMARK_)?(function (){var li_tag = new cljs.core.Keyword(null,"li.pv2.ph3.b--light-silver.bb.hover-bg-light-gray","li.pv2.ph3.b--light-silver.bb.hover-bg-light-gray",1671487078);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.list.pl0.ml0.center.mw6.bg-white.shadow-2.br2.dark-gray.absolute.z-1","ul.list.pl0.ml0.center.mw6.bg-white.shadow-2.br2.dark-gray.absolute.z-1",-1087414548),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"top","top",-1856271961),"-0.2rem"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [li_tag,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),remove], null),"remove"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [li_tag,"Turn into",cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.name((function (){var fexpr__123089 = new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614).cljs$core$IFn$_invoke$arity$1(examples.rich_document.views.root);
return (fexpr__123089.cljs$core$IFn$_invoke$arity$1 ? fexpr__123089.cljs$core$IFn$_invoke$arity$1(ent) : fexpr__123089.call(null,ent));
})()),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__123072_SHARP_){
var opt_kw = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__123072_SHARP_.target.value);
var ent__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ent,new cljs.core.Keyword(null,"type","type",1174270348),opt_kw,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"show-block-menu?","show-block-menu?",-1047340866),false], 0));
var id__$1 = ((1000) + cljs.core.rand_int(100000.0));
var G__123090 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123091 = (function (){var G__123092 = opt_kw;
var G__123092__$1 = (((G__123092 instanceof cljs.core.Keyword))?G__123092.fqn:null);
switch (G__123092__$1) {
case "todo-item":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(ent__$1,new cljs.core.Keyword(null,"view","view",1247994814),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"content","content",15833224)], 0))], null)], null);

break;
case "toggle-list":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add","add",235287739),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<-","<-",760412998),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"items","items",1031954938)], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),id__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804),new cljs.core.Keyword(null,"active?","active?",459499776),true,new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["empty"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc_in(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent__$1,new cljs.core.Keyword(null,"open?","open?",1238443125),true),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"items","items",1031954938)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id__$1], null))], null)], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__123092__$1)].join('')));

}
})();
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$2 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$2(G__123090,G__123091) : examples.rich_document.views.root.call(null,G__123090,G__123091));
})], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (x){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),x], null),x], null);
})),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["todo-item","toggle-list"], null))], null)], null);
})():null)], null)], null)], null),children);
}));

(examples.rich_document.views.block.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(examples.rich_document.views.block.cljs$lang$applyTo = (function (seq123073){
var G__123074 = cljs.core.first(seq123073);
var seq123073__$1 = cljs.core.next(seq123073);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__123074,seq123073__$1);
}));

var G__123093_123154 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123094_123155 = new cljs.core.Keyword(null,"button","button",1456579943);
var G__123095_123156 = (function (p__123096){
var map__123097 = p__123096;
var map__123097__$1 = (((((!((map__123097 == null))))?(((((map__123097.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123097.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123097):map__123097);
var ent = map__123097__$1;
var markup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123097__$1,new cljs.core.Keyword(null,"markup","markup",2143234544));
var handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123097__$1,new cljs.core.Keyword(null,"handlers","handlers",79528781));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.f6.link.dim.br2.ba.ph2.pv1.dib.black","button.f6.link.dim.br2.ba.ph2.pv1.dib.black",384233173),handlers,cljs.core.first(markup)], null);
});
(examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123093_123154,G__123094_123155,G__123095_123156) : examples.rich_document.views.root.call(null,G__123093_123154,G__123094_123155,G__123095_123156));
examples.rich_document.views.input = (function examples$rich_document$views$input(opts,p__123100){
var map__123101 = p__123100;
var map__123101__$1 = (((((!((map__123101 == null))))?(((((map__123101.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123101.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123101):map__123101);
var ent = map__123101__$1;
var markup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123101__$1,new cljs.core.Keyword(null,"markup","markup",2143234544));
var active_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123101__$1,new cljs.core.Keyword(null,"active?","active?",459499776));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.outline-0.ph2","div.outline-0.ph2",894377354),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ref","ref",1289896967),(function (node){
if(cljs.core.truth_((function (){var and__4174__auto__ = node;
if(cljs.core.truth_(and__4174__auto__)){
return active_QMARK_;
} else {
return and__4174__auto__;
}
})())){
return examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$3(node,(0),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"unless-active?","unless-active?",1199060776),true], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"content-editable","content-editable",636764967),true,new cljs.core.Keyword(null,"suppress-content-editable-warning","suppress-content-editable-warning",1672859966),true,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),(function (p1__123099_SHARP_){
var v = p1__123099_SHARP_.target.innerText;
var G__123103 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123104 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ent,new cljs.core.Keyword(null,"active?","active?",459499776),false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null)], 0))], null)], null);
var G__123105 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.first(markup))], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123103,G__123104,G__123105) : examples.rich_document.views.root.call(null,G__123103,G__123104,G__123105));
}),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var G__123106 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123107 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent,new cljs.core.Keyword(null,"active?","active?",459499776),true)], null)], null);
var G__123108 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123106,G__123107,G__123108) : examples.rich_document.views.root.call(null,G__123106,G__123107,G__123108));
})], null),opts], 0)),cljs.core.first(markup)], null);
});
var G__123109_123157 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123110_123158 = new cljs.core.Keyword(null,"toggle-list","toggle-list",-190611366);
var G__123111_123159 = (function (p__123112){
var map__123113 = p__123112;
var map__123113__$1 = (((((!((map__123113 == null))))?(((((map__123113.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123113.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123113):map__123113);
var ent = map__123113__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123113__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var markup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123113__$1,new cljs.core.Keyword(null,"markup","markup",2143234544));
var content_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123113__$1,new cljs.core.Keyword(null,"content-ui","content-ui",-1698773970));
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123113__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var map__123115 = content_ui;
var map__123115__$1 = (((((!((map__123115 == null))))?(((((map__123115.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123115.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123115):map__123115);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123115__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123115__$1,new cljs.core.Keyword(null,"button","button",1456579943));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.block,ent,(function (){var G__123117 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.items-center.justify-between","div.flex.items-center.justify-between",-1166700937),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex","div.flex",-396986231),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pointer.pl1.pv1","span.pointer.pl1.pv1",1787472495),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(12),new cljs.core.Keyword(null,"line-height","line-height",1870784992),(1),new cljs.core.Keyword(null,"user-select","user-select",-346451650),new cljs.core.Keyword(null,"none","none",1333468478)], null),(cljs.core.truth_(open_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transform","transform",1381301764),"rotate(90deg)",new cljs.core.Keyword(null,"transform-origin","transform-origin",-586167370),new cljs.core.Keyword(null,"center","center",-748944368)], null):null)], 0)),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var G__123118 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123119 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"toggle","toggle",1291842030),new cljs.core.Keyword(null,"open?","open?",1238443125),ent], null)], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$2 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$2(G__123118,G__123119) : examples.rich_document.views.root.call(null,G__123118,G__123119));
})], null),"\u25B6"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.input,cljs.core.PersistentArrayMap.EMPTY,ent], null)], null),button], null)], null);
if(cljs.core.truth_(open_QMARK_)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__123117,items);
} else {
return G__123117;
}
})()], null);
});
(examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123109_123157,G__123110_123158,G__123111_123159) : examples.rich_document.views.root.call(null,G__123109_123157,G__123110_123158,G__123111_123159));
var G__123120_123160 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123121_123161 = new cljs.core.Keyword(null,"nav","nav",719540477);
var G__123122_123162 = (function (p__123123){
var map__123124 = p__123123;
var map__123124__$1 = (((((!((map__123124 == null))))?(((((map__123124.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123124.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123124):map__123124);
var ent = map__123124__$1;
var content_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123124__$1,new cljs.core.Keyword(null,"content-ui","content-ui",-1698773970));
var routes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123124__$1,new cljs.core.Keyword(null,"routes","routes",457900162));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nav.db.dt-l.w-100.border-box.pa3.ph5-l","nav.db.dt-l.w-100.border-box.pa3.ph5-l",1564180323),cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.db.dtc-l.v-mid.w-100.w-75-l.tc.tr-l","div.db.dtc-l.v-mid.w-100.w-75-l.tc.tr-l",-302947210)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__123126){
var vec__123127 = p__123126;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123127,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123127,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.link.dim.dark-gray.f6.f5-l.dib.mr3.mr4-l.fw5.pointer","a.link.dim.dark-gray.f6.f5-l.dib.mr3.mr4-l.fw5.pointer",-1583741890),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var G__123130 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123131 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent,new cljs.core.Keyword(null,"content","content",15833224),v)], null)], null);
var G__123132 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),false], null);
return (examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123130,G__123131,G__123132) : examples.rich_document.views.root.call(null,G__123130,G__123131,G__123132));
})], null),cljs.core.name(k)], null);
})),routes)], null),content_ui], null);
});
(examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123120_123160,G__123121_123161,G__123122_123162) : examples.rich_document.views.root.call(null,G__123120_123160,G__123121_123161,G__123122_123162));
var G__123134_123163 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123135_123164 = new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804);
var G__123136_123165 = (function (p__123137){
var map__123138 = p__123137;
var map__123138__$1 = (((((!((map__123138 == null))))?(((((map__123138.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123138.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123138):map__123138);
var ent = map__123138__$1;
var map__123139 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123138__$1,new cljs.core.Keyword(null,"actions","actions",-812656882));
var map__123139__$1 = (((((!((map__123139 == null))))?(((((map__123139.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123139.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123139):map__123139);
var toggle_checked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123139__$1,new cljs.core.Keyword(null,"toggle-checked","toggle-checked",1194008143));
var remove = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123139__$1,new cljs.core.Keyword(null,"remove","remove",-131428414));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123138__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var markup = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123138__$1,new cljs.core.Keyword(null,"markup","markup",2143234544));
var checked_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123138__$1,new cljs.core.Keyword(null,"checked?","checked?",2024809091));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.block,ent,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"checkbox","checkbox",1612615655),new cljs.core.Keyword(null,"checked","checked",-50955819),cljs.core.boolean$(checked_QMARK_),new cljs.core.Keyword(null,"on-change","on-change",-732046149),toggle_checked], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.input,den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["backspace",(function (e){
var v = e.target.innerText;
if(cljs.core.empty_QMARK_(v)){
return (remove.cljs$core$IFn$_invoke$arity$0 ? remove.cljs$core$IFn$_invoke$arity$0() : remove.call(null));
} else {
return null;
}
}),"enter",(function (p1__123133_SHARP_){
var v = p1__123133_SHARP_.target.innerText;
var vec__123142 = examples.util.string.split_at(examples.util.dom.get_cursor(),v);
var tthis = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123142,(0),null);
var tnext = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123142,(1),null);
var tnext_QMARK_ = cljs.core.boolean$(cljs.core.not_empty(tnext));
var G__123145_123166 = new cljs.core.Keyword(null,"transact","transact",-267998670);
var G__123146_123167 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set","set",304602554),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(ent,new cljs.core.Keyword(null,"active?","active?",459499776),false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [tthis], null)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-after","add-after",-1562215108),path,(function (){var G__123149 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"todo-item","todo-item",-1060924804),new cljs.core.Keyword(null,"active?","active?",459499776),true,new cljs.core.Keyword(null,"markup","markup",2143234544),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__4185__auto__ = tnext;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return "";
}
})()], null)], null);
var fexpr__123148 = new cljs.core.Keyword(null,"add-id","add-id",-989371530).cljs$core$IFn$_invoke$arity$1(examples.rich_document.views.root);
return (fexpr__123148.cljs$core$IFn$_invoke$arity$1 ? fexpr__123148.cljs$core$IFn$_invoke$arity$1(G__123149) : fexpr__123148.call(null,G__123149));
})()], null)], null);
var G__123147_123168 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"history?","history?",2009378510),((tnext_QMARK_) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(tthis,cljs.core.first(markup))))], null);
(examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123145_123166,G__123146_123167,G__123147_123168) : examples.rich_document.views.root.call(null,G__123145_123166,G__123146_123167,G__123147_123168));

return false;
})], null)),ent], null)], null);
});
(examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.rich_document.views.root.cljs$core$IFn$_invoke$arity$3(G__123134_123163,G__123135_123164,G__123136_123165) : examples.rich_document.views.root.call(null,G__123134_123163,G__123135_123164,G__123136_123165));
examples.rich_document.views.example_root = (function examples$rich_document$views$example_root(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.util.dom.example,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),"A Poor Person's Notion Clone in 200 LoC",new cljs.core.Keyword(null,"source","source",-433931539),"https://github.com/den1k/root/blob/master/dev/examples/rich_document/views.cljs",new cljs.core.Keyword(null,"open-details?","open-details?",-1562807107),true,new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Baby Steps toward a Rich Document Editor"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"Current Feature Set:"], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Routing (click ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"home"], null)," or ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"about"], null),")"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Undo/Redo through shortcuts or rendered buttons"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Context menus (hover over the todos or toggle-lists)"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Change ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.b","i.b",1272207956),"block"], null)," type (through context menu)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),"Arbitrarily deep nesting of views (make toggle-lists inside toggle-lists)"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details.pb1","details.pb1",-389068787),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),false], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary.outline-0.pointer","summary.outline-0.pointer",1192939605),"initial app-state"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pv1","div.pv1",1244963062),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.util.dom.pretty_code_block,(120),examples.rich_document.views.projected_data], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"From the initial app-state root recurses through ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code.red","code.red",1428174603),":content"], null)," keys, looks up the data, resolves components and renders the following UI:"], null)], null),new cljs.core.Keyword(null,"root","root",-448657453),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.root,new cljs.core.Keyword(null,"resolve","resolve",-1584445482),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"root-id","root-id",1294683809),(1)], null)], null)], null)], null);
});
goog.exportSymbol('examples.rich_document.views.example_root', examples.rich_document.views.example_root);
examples.rich_document.views.render_fn = (function examples$rich_document$views$render_fn(dom_node){
return uix.dom.alpha.render(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.rich_document.views.example_root], null),dom_node);
});
goog.exportSymbol('examples.rich_document.views.render_fn', examples.rich_document.views.render_fn);

//# sourceMappingURL=examples.rich_document.views.js.map
