goog.provide('examples.nested.views');
goog.require('cljs.core');
goog.require('xframe.core.alpha');
goog.require('den1k.shortcuts');
goog.require('root.impl.core');
goog.require('cljs.spec.alpha');
goog.require('cljs.js');
goog.require('cljs.analyzer');
goog.require('goog.functions');
goog.require('root.impl.util');
goog.require('reagent.core');
goog.require('reagent.dom');
goog.require('root.impl.resolver');
examples.nested.views.elide_env = (function examples$nested$views$elide_env(env,ast,opts){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ast,new cljs.core.Keyword(null,"env","env",-1815813235));
});
examples.nested.views.ex2_src = "(comment\n  \"apologies for my poor styling skills\")\n\n  (range 10)\n\n  (into\n     [:<>]\n     (map (fn [s] [:span.h3 s]))\n     [\"a\" \"b\" \"c\"])";
examples.nested.views.st = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
examples.nested.views.ana_str = (function examples$nested$views$ana_str(code_str,cb){
return cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$5(examples.nested.views.st,["(do",cljs.core.str.cljs$core$IFn$_invoke$arity$1(code_str),")"].join(''),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"passes","passes",-2141861841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.analyzer.infer_type,examples.nested.views.elide_env], null)], null),(function (p__123169){
var map__123170 = p__123169;
var map__123170__$1 = (((((!((map__123170 == null))))?(((((map__123170.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123170.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123170):map__123170);
var res = map__123170__$1;
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123170__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123170__$1,new cljs.core.Keyword(null,"value","value",305978217));
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(res) : cb.call(null,res));
}));
});
examples.nested.views.db = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
examples.nested.views.ana_str(examples.nested.views.ex2_src,(function (p__123172){
var map__123173 = p__123172;
var map__123173__$1 = (((((!((map__123173 == null))))?(((((map__123173.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123173.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123173):map__123173);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123173__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123173__$1,new cljs.core.Keyword(null,"error","error",-978969032));
return cljs.core.reset_BANG_(examples.nested.views.db,value);
}));
xframe.core.alpha._reg_sub(new cljs.core.Keyword(null,"get-in","get-in",688791704),(function (){var f__40430__auto__ = (function (path){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(xframe.core.alpha._LT__.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("xframe.core.alpha","db","xframe.core.alpha/db",39839775)], null)),path);
});
var f_STAR___40431__auto__ = xframe.core.alpha.memoize_last_by(cljs.core.first,cljs.core.second,(function (G__123175){
return xframe.core.adapton.make_athunk.cljs$core$IFn$_invoke$arity$variadic((function (){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f__40430__auto__,G__123175);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((goog.DEBUG)?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"get-in","get-in",688791704),new cljs.core.Keyword(null,"args","args",1315556576),G__123175], null):null)], 0));
}));
return (function (key__40432__auto__,args__40433__auto__){
return cljs.core.deref((f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2 ? f_STAR___40431__auto__.cljs$core$IFn$_invoke$arity$2(key__40432__auto__,args__40433__auto__) : f_STAR___40431__auto__.call(null,key__40432__auto__,args__40433__auto__)));
});
})());
examples.nested.views.lookup = (function examples$nested$views$lookup(x){
if(cljs.core.vector_QMARK_(x)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(examples.nested.views.db),x);
} else {
if(cljs.core.map_QMARK_(x)){
return x;
} else {
return null;
}
}
});
examples.nested.views.root = root.impl.core.ui_root(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dispatch-fn","dispatch-fn",1253347614),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"lookup","lookup",1225356838),examples.nested.views.lookup,new cljs.core.Keyword(null,"content-keys","content-keys",2000186673),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fn","fn",-1175266204),new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"items","items",1031954938),new cljs.core.Keyword(null,"vals","vals",768058733),new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.Keyword(null,"statements","statements",600349855),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"test","test",577538877),new cljs.core.Keyword(null,"then","then",460598070),new cljs.core.Keyword(null,"else","else",-1508377146)], null),new cljs.core.Keyword(null,"content-spec","content-spec",-1729382556),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null),cljs.core.list(new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol(null,"x","x",-555367584,null)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (x){
return new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(x);
})], null),null),new cljs.core.Keyword(null,"contents-hiccup-wrapper","contents-hiccup-wrapper",1839301927),cljs.core.PersistentVector.EMPTY], null));
examples.nested.views.ana_ent__GT_css_classes = (function examples$nested$views$ana_ent__GT_css_classes(p__123176){
var map__123177 = p__123176;
var map__123177__$1 = (((((!((map__123177 == null))))?(((((map__123177.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123177.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123177):map__123177);
var ent = map__123177__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123177__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var tag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123177__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123177__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"green","green",-945526839)], null);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Symbol(null,"fn","fn",465265323,null))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Symbol(null,"defn","defn",-126010802,null))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"orange","orange",73816386),new cljs.core.Keyword(null,"b","b",1482224470)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol(null,"string","string",-349010059,null))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"light-red","light-red",233450434)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol(null,"number","number",-1084057331,null))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"blue","blue",-622100620)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"var","var",-769682797))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470)], null);
} else {
return cljs.core.PersistentVector.EMPTY;

}
}
}
}
}
});
examples.nested.views.ent__GT_handlers = (function examples$nested$views$ent__GT_handlers(p__123179){
var map__123180 = p__123179;
var map__123180__$1 = (((((!((map__123180 == null))))?(((((map__123180.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123180.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123180):map__123180);
var ent = map__123180__$1;
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123180__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123180__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var tag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123180__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123180__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var children_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123180__$1,new cljs.core.Keyword(null,"children-ui","children-ui",-1005948465));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-input","on-input",-267523366),(function (e){
var text_123248 = e.target.textContent;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(examples.nested.views.db,cljs.core.assoc_in,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,new cljs.core.Keyword(null,"form","form",-1624062471)),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"var","var",-769682797)))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(text_123248):(function (){var G__123182 = text_123248;
if((G__123182 == null)){
return null;
} else {
return cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(G__123182);
}
})()
));

e.stopPropagation();

return e.preventDefault();
}),new cljs.core.Keyword(null,"content-editable","content-editable",636764967),true,new cljs.core.Keyword(null,"suppressContentEditableWarning","suppressContentEditableWarning",996489054),true], null);
});
examples.nested.views.ana_ent__GT_css_styles = (function examples$nested$views$ana_ent__GT_css_styles(p__123183){
var map__123184 = p__123183;
var map__123184__$1 = (((((!((map__123184 == null))))?(((((map__123184.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123184.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123184):map__123184);
var ent = map__123184__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123184__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123184__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var G__123186 = op;
var G__123186__$1 = (((G__123186 instanceof cljs.core.Keyword))?G__123186.fqn:null);
switch (G__123186__$1) {
case "vector":
case "invoke":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),(2),new cljs.core.Keyword(null,"background","background",-863952629),["hsl(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((((360) / cljs.core.count(path)) | (0))),", 100%, 95%)"].join('')], null);

break;
default:
return null;

}
});
examples.nested.views.ent__GT_styles = (function examples$nested$views$ent__GT_styles(ent){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),examples.nested.views.ana_ent__GT_css_classes(ent),new cljs.core.Keyword(null,"style","style",-496642736),examples.nested.views.ana_ent__GT_css_styles(ent)], null);
});
examples.nested.views.editable_view = (function examples$nested$views$editable_view(p__123187,p__123188){
var map__123189 = p__123187;
var map__123189__$1 = (((((!((map__123189 == null))))?(((((map__123189.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123189.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123189):map__123189);
var ent = map__123189__$1;
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123189__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123189__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var tag = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123189__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123189__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var map__123190 = p__123188;
var map__123190__$1 = (((((!((map__123190 == null))))?(((((map__123190.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123190.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123190):map__123190);
var omit_styles_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123190__$1,new cljs.core.Keyword(null,"omit-styles?","omit-styles?",-28643353));
var form_print_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__123190__$1,new cljs.core.Keyword(null,"form-print-fn","form-print-fn",854174511),cljs.core.pr_str);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content-editable","content-editable",636764967),false], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.outline-0","span.outline-0",419823943),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([examples.nested.views.ent__GT_styles(ent),examples.nested.views.ent__GT_handlers(ent)], 0)),root.impl.util.pretty_str(form)], null)], null);
});
var G__123193_123250 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123194_123251 = new cljs.core.Keyword(null,"invoke","invoke",1145927159);
var G__123195_123252 = (function (p__123196){
var map__123197 = p__123196;
var map__123197__$1 = (((((!((map__123197 == null))))?(((((map__123197.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123197.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123197):map__123197);
var ent = map__123197__$1;
var fn_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123197__$1,new cljs.core.Keyword(null,"fn-ui","fn-ui",-1453498919));
var args_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123197__$1,new cljs.core.Keyword(null,"args-ui","args-ui",2097494873));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123197__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123197__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var vec__123199 = args_ui;
var seq__123200 = cljs.core.seq(vec__123199);
var first__123201 = cljs.core.first(seq__123200);
var seq__123200__$1 = cljs.core.next(seq__123200);
var arg0_ui = first__123201;
var next_args_ui = seq__123200__$1;
var args_ui_SINGLEQUOTE_ = vec__123199;
var fn_sym = new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(fn);
var fn_defn_QMARK_ = cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"defn","defn",-126010802,null),null,new cljs.core.Symbol(null,"fn","fn",465265323,null),null], null), null),fn_sym);
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.flex-wrap.br1","div.flex.flex-wrap.br1",-75005065),examples.nested.views.ent__GT_styles(ent),"(",fn_ui,((fn_defn_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pl2","span.pl2",-1183576962),arg0_ui], null):null),(function (){var temp__5737__auto__ = (function (){var G__123202 = cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pl2","span.pl2",-1183576962)], null),((fn_defn_QMARK_)?next_args_ui:args_ui_SINGLEQUOTE_));
var G__123202__$1 = (((G__123202 == null))?null:cljs.core.not_empty(G__123202));
var G__123202__$2 = (((G__123202__$1 == null))?null:cljs.core.vec(G__123202__$1));
if((G__123202__$2 == null)){
return null;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__123202__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.self-end","span.self-end",1843359599),")"], null));
}
})();
if(cljs.core.truth_(temp__5737__auto__)){
var more_args_ui = temp__5737__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.flex-wrap.ml2","div.flex.flex-wrap.ml2",253980573),root.impl.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((fn_defn_QMARK_)?new cljs.core.Keyword(null,"w-100","w-100",672107769):null)], null)], null),examples.nested.views.ent__GT_styles(ent)], 0))], null),more_args_ui);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.self-end","span.self-end",1843359599),")"], null);
}
})()], null);
});
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123193_123250,G__123194_123251,G__123195_123252) : examples.nested.views.root.call(null,G__123193_123250,G__123194_123251,G__123195_123252));
var G__123203_123253 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123204_123254 = new cljs.core.Keyword(null,"var","var",-769682797);
var G__123205_123255 = examples.nested.views.editable_view;
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123203_123253,G__123204_123254,G__123205_123255) : examples.nested.views.root.call(null,G__123203_123253,G__123204_123254,G__123205_123255));
var G__123206_123256 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123207_123257 = new cljs.core.Keyword(null,"js-var","js-var",-1177899142);
var G__123208_123258 = examples.nested.views.editable_view;
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123206_123256,G__123207_123257,G__123208_123258) : examples.nested.views.root.call(null,G__123206_123256,G__123207_123257,G__123208_123258));
var G__123209_123259 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123210_123260 = new cljs.core.Keyword(null,"const","const",1709929842);
var G__123211_123261 = examples.nested.views.editable_view;
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123209_123259,G__123210_123260,G__123211_123261) : examples.nested.views.root.call(null,G__123209_123259,G__123210_123260,G__123211_123261));
var G__123212_123262 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123213_123263 = new cljs.core.Keyword(null,"if","if",-458814265);
var G__123214_123264 = (function (p__123215){
var map__123216 = p__123215;
var map__123216__$1 = (((((!((map__123216 == null))))?(((((map__123216.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123216.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123216):map__123216);
var ent = map__123216__$1;
var test_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123216__$1,new cljs.core.Keyword(null,"test-ui","test-ui",-273468566));
var then_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123216__$1,new cljs.core.Keyword(null,"then-ui","then-ui",1956856826));
var else_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123216__$1,new cljs.core.Keyword(null,"else-ui","else-ui",961926928));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.flex-column.br1","div.flex.flex-column.br1",-796100469),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"(if ",test_ui], null),then_ui,else_ui], null);
});
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123212_123262,G__123213_123263,G__123214_123264) : examples.nested.views.root.call(null,G__123212_123262,G__123213_123263,G__123214_123264));
var G__123218_123265 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123219_123266 = new cljs.core.Keyword(null,"map","map",1371690461);
var G__123220_123267 = (function (p__123221){
var map__123222 = p__123221;
var map__123222__$1 = (((((!((map__123222 == null))))?(((((map__123222.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123222.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123222):map__123222);
var ent = map__123222__$1;
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123222__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var keys_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123222__$1,new cljs.core.Keyword(null,"keys-ui","keys-ui",1613550228));
var vals_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123222__$1,new cljs.core.Keyword(null,"vals-ui","vals-ui",-168341696));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex","div.flex",-396986231),"{",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.flex.flex-column","span.flex.flex-column",-631494164),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__123224){
var vec__123225 = p__123224;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123225,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__123225,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.flex.flex-wrap","span.flex.flex-wrap",-2106576805),k,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pl2","span.pl2",-1183576962)], null),v], null);
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys_ui,vals_ui)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.self-end","span.self-end",1843359599),"}"], null)], null);
});
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123218_123265,G__123219_123266,G__123220_123267) : examples.nested.views.root.call(null,G__123218_123265,G__123219_123266,G__123220_123267));
var G__123228_123268 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123229_123269 = new cljs.core.Keyword(null,"do","do",46310725);
var G__123230_123270 = (function (p__123231){
var map__123232 = p__123231;
var map__123232__$1 = (((((!((map__123232 == null))))?(((((map__123232.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123232.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123232):map__123232);
var ent = map__123232__$1;
var fn_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123232__$1,new cljs.core.Keyword(null,"fn-ui","fn-ui",-1453498919));
var args_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123232__$1,new cljs.core.Keyword(null,"args-ui","args-ui",2097494873));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123232__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var statements_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123232__$1,new cljs.core.Keyword(null,"statements-ui","statements-ui",476058764));
var ret_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123232__$1,new cljs.core.Keyword(null,"ret-ui","ret-ui",881528951));
var first_do_form_QMARK_ = cljs.core.empty_QMARK_(path);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.br1","div.flex.br1",985102779),((first_do_form_QMARK_)?null:"(do"),cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.flex-column","div.flex.flex-column",290299164)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (x){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pl2.meow","span.pl2.meow",860003322),x], null);
})),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(statements_ui,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.ph1","div.ph1",-932083215),ret_ui], null))),((first_do_form_QMARK_)?null:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.self-end","span.self-end",1843359599),")"], null))], null);
});
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123228_123268,G__123229_123269,G__123230_123270) : examples.nested.views.root.call(null,G__123228_123268,G__123229_123269,G__123230_123270));
var G__123234_123271 = new cljs.core.Keyword(null,"view","view",1247994814);
var G__123235_123272 = new cljs.core.Keyword(null,"vector","vector",1902966158);
var G__123236_123273 = (function (p__123237){
var map__123238 = p__123237;
var map__123238__$1 = (((((!((map__123238 == null))))?(((((map__123238.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123238.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123238):map__123238);
var ent = map__123238__$1;
var items_ui = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123238__$1,new cljs.core.Keyword(null,"items-ui","items-ui",1142713640));
var vec__123240 = items_ui;
var seq__123241 = cljs.core.seq(vec__123240);
var first__123242 = cljs.core.first(seq__123241);
var seq__123241__$1 = cljs.core.next(seq__123241);
var fui = first__123242;
var items_ui_SINGLEQUOTE_ = seq__123241__$1;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.flex.items-end","span.flex.items-end",1376402300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content-editable","content-editable",636764967),false], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.outline-0.flex.flex-wrap.br1","div.outline-0.flex.flex-wrap.br1",-495270991),examples.nested.views.ent__GT_handlers(ent),"[",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),fui], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (x){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.pl2","span.pl2",-1183576962),x], null);
}),items_ui_SINGLEQUOTE_)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.self-end","span.self-end",1843359599),"]"], null)], null)], null);
});
(examples.nested.views.root.cljs$core$IFn$_invoke$arity$3 ? examples.nested.views.root.cljs$core$IFn$_invoke$arity$3(G__123234_123271,G__123235_123272,G__123236_123273) : examples.nested.views.root.call(null,G__123234_123271,G__123235_123272,G__123236_123273));
if((typeof examples !== 'undefined') && (typeof examples.nested !== 'undefined') && (typeof examples.nested.views !== 'undefined') && (typeof examples.nested.views.str_state !== 'undefined')){
} else {
examples.nested.views.str_state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(examples.nested.views.ex2_src);
}
examples.nested.views.debounce_set_ana_str = (function (){var G__123243 = (function (s){
return examples.nested.views.ana_str(s,(function (p__123245){
var map__123246 = p__123245;
var map__123246__$1 = (((((!((map__123246 == null))))?(((((map__123246.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__123246.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__123246):map__123246);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123246__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__123246__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(value)){
return cljs.core.reset_BANG_(examples.nested.views.db,value);
} else {
return null;
}
}));
});
var G__123244 = (200);
return goog.functions.debounce(G__123243,G__123244);
})();
examples.nested.views.paste_code_box = (function examples$nested$views$paste_code_box(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.vh-100.w-40.outline-0.bn.pa3","textarea.vh-100.w-40.outline-0.bn.pa3",-1153050604),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"default-value","default-value",232220170),examples.nested.views.ex2_src,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
var text = e.target.value;
return (examples.nested.views.debounce_set_ana_str.cljs$core$IFn$_invoke$arity$1 ? examples.nested.views.debounce_set_ana_str.cljs$core$IFn$_invoke$arity$1(text) : examples.nested.views.debounce_set_ana_str.call(null,text));
})], null)], null);
});
examples.nested.views.example_root = (function examples$nested$views$example_root(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex","div.flex",-396986231),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.nested.views.paste_code_box], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.code.pre.pa3.outline-0.w-60.bl.f6","div.code.pre.pa3.outline-0.w-60.bl.f6",-783974828),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line-height","line-height",1870784992),(2)], null),new cljs.core.Keyword(null,"autoFocus","autoFocus",-552622425),true,new cljs.core.Keyword(null,"content-editable","content-editable",636764967),true,new cljs.core.Keyword(null,"suppress-content-editable-warning","suppress-content-editable-warning",1672859966),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.nested.views.root,new cljs.core.Keyword(null,"resolve","resolve",-1584445482),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.PersistentVector.EMPTY], null)], null)], null)], null);
});
goog.exportSymbol('examples.nested.views.example_root', examples.nested.views.example_root);
examples.nested.views.render_fn = (function examples$nested$views$render_fn(dom_node){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.nested.views.example_root], null),dom_node);
});
goog.exportSymbol('examples.nested.views.render_fn', examples.nested.views.render_fn);

//# sourceMappingURL=examples.nested.views.js.map
