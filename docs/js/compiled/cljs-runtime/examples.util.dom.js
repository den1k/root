goog.provide('examples.util.dom');
goog.require('cljs.core');
goog.require('root.impl.util');
goog.require('cljs.pprint');
(HTMLCollection.prototype.cljs$core$ISeqable$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (array){
var array__$1 = this;
return cljs.core.array_seq.cljs$core$IFn$_invoke$arity$2(array__$1,(0));
}));
examples.util.dom.active_element_QMARK_ = (function examples$util$dom$active_element_QMARK_(node){
return cljs.core.boolean$((function (){var G__102540 = document.activeElement;
if((G__102540 == null)){
return null;
} else {
return G__102540.isSameNode(node);
}
})());
});
/**
 * Returns index of caret in text. If include-parent is true,
 *   will also count all siblings until the node containing the caret.
 */
examples.util.dom.get_selection = (function examples$util$dom$get_selection(var_args){
var G__102543 = arguments.length;
switch (G__102543) {
case 0:
return examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$0 = (function (){
return examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$1(false);
}));

(examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$1 = (function (include_parent_QMARK_){
var sel = document.getSelection();
var sel_range = sel.getRangeAt((0));
var vec__102544 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sel_range.startOffset,sel_range.endOffset], null);
var start = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102544,(0),null);
var end = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102544,(1),null);
if(cljs.core.not(include_parent_QMARK_)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"start","start",-355208981),start,new cljs.core.Keyword(null,"end","end",-268185958),end,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(sel.type))], null);
} else {
var sel_node = sel.anchorNode.parentElement;
var siblings = sel_node.parentNode.children;
var sibl_pre_node = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__102541_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(sel_node,p1__102541_SHARP_);
}),siblings);
var txt_count_until = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (n,node){
return (n + node.textContent.length);
}),(0),sibl_pre_node);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"start","start",-355208981),(txt_count_until + start),new cljs.core.Keyword(null,"end","end",-268185958),(txt_count_until + end),new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(sel.type))], null);
}
}));

(examples.util.dom.get_selection.cljs$lang$maxFixedArity = 1);

examples.util.dom.set_selection = (function examples$util$dom$set_selection(node,start,end){
var range = (function (){var G__102547 = document.createRange();
G__102547.setStart(node.firstChild,start);

G__102547.setEnd(node.firstChild,end);

return G__102547;
})();
var G__102548 = window.getSelection();
G__102548.removeAllRanges();

G__102548.addRange(range);

return G__102548;
});
examples.util.dom.get_cursor = (function examples$util$dom$get_cursor(){
return new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(examples.util.dom.get_selection.cljs$core$IFn$_invoke$arity$0());
});
examples.util.dom.set_cursor = (function examples$util$dom$set_cursor(var_args){
var G__102551 = arguments.length;
switch (G__102551) {
case 2:
return examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$2 = (function (node,idx){
return examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$3(node,idx,cljs.core.PersistentArrayMap.EMPTY);
}));

(examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$3 = (function (node,idx,p__102557){
var map__102558 = p__102557;
var map__102558__$1 = (((((!((map__102558 == null))))?(((((map__102558.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102558.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102558):map__102558);
var unless_active_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102558__$1,new cljs.core.Keyword(null,"unless-active?","unless-active?",1199060776));
if(cljs.core.truth_((function (){var and__4174__auto__ = unless_active_QMARK_;
if(cljs.core.truth_(and__4174__auto__)){
return examples.util.dom.active_element_QMARK_(node);
} else {
return and__4174__auto__;
}
})())){
return null;
} else {
if((cljs.core.count(node.textContent) === (0))){
var G__102561 = node;
(G__102561["innerHTML"] = " ");

examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$2(G__102561,(0));

(G__102561["innerHTML"] = "");

return G__102561;
} else {
return examples.util.dom.set_selection(node,idx,idx);
}
}
}));

(examples.util.dom.set_cursor.cljs$lang$maxFixedArity = 3);

examples.util.dom.set_cursor_to_end = (function examples$util$dom$set_cursor_to_end(var_args){
var G__102564 = arguments.length;
switch (G__102564) {
case 1:
return examples.util.dom.set_cursor_to_end.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return examples.util.dom.set_cursor_to_end.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(examples.util.dom.set_cursor_to_end.cljs$core$IFn$_invoke$arity$1 = (function (node){
return examples.util.dom.set_cursor_to_end.cljs$core$IFn$_invoke$arity$2(node,cljs.core.PersistentArrayMap.EMPTY);
}));

(examples.util.dom.set_cursor_to_end.cljs$core$IFn$_invoke$arity$2 = (function (node,opts){
var node__$1 = (function (){var or__4185__auto__ = node.lastElementChild;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return node;
}
})();
var txt_count = cljs.core.count(node__$1.textContent);
return examples.util.dom.set_cursor.cljs$core$IFn$_invoke$arity$3(node__$1,txt_count,opts);
}));

(examples.util.dom.set_cursor_to_end.cljs$lang$maxFixedArity = 2);

examples.util.dom.code_block = (function examples$util$dom$code_block(str){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.bg-dark-gray.pa1.br2","div.bg-dark-gray.pa1.br2",671693940),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code.f6","code.f6",-576074802),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"white-space","white-space",-707351930),new cljs.core.Keyword(null,"pre-wrap","pre-wrap",979551718)], null)], null),str], null)], null);
});
examples.util.dom.pretty_code_block = (function examples$util$dom$pretty_code_block(var_args){
var G__102572 = arguments.length;
switch (G__102572) {
case 1:
return examples.util.dom.pretty_code_block.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return examples.util.dom.pretty_code_block.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(examples.util.dom.pretty_code_block.cljs$core$IFn$_invoke$arity$1 = (function (x){
return examples.util.dom.pretty_code_block.cljs$core$IFn$_invoke$arity$2(cljs.pprint._STAR_print_right_margin_STAR_,x);
}));

(examples.util.dom.pretty_code_block.cljs$core$IFn$_invoke$arity$2 = (function (margin_width,x){
var _STAR_print_right_margin_STAR__orig_val__102574 = cljs.pprint._STAR_print_right_margin_STAR_;
var _STAR_print_right_margin_STAR__temp_val__102575 = margin_width;
(cljs.pprint._STAR_print_right_margin_STAR_ = _STAR_print_right_margin_STAR__temp_val__102575);

try{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [examples.util.dom.code_block,root.impl.util.pretty_str(x)], null);
}finally {(cljs.pprint._STAR_print_right_margin_STAR_ = _STAR_print_right_margin_STAR__orig_val__102574);
}}));

(examples.util.dom.pretty_code_block.cljs$lang$maxFixedArity = 2);

examples.util.dom.example = (function examples$util$dom$example(p__102579){
var map__102580 = p__102579;
var map__102580__$1 = (((((!((map__102580 == null))))?(((((map__102580.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102580.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102580):map__102580);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102580__$1,new cljs.core.Keyword(null,"title","title",636505583));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102580__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102580__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var root__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102580__$1,new cljs.core.Keyword(null,"root","root",-448657453));
var open_details_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102580__$1,new cljs.core.Keyword(null,"open-details?","open-details?",-1562807107));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pv2.ph3.bg-near-black.white","div.pv2.ph3.bg-near-black.white",-447068636),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.flex.justify-between","div.flex.justify-between",-1943883738),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.fw2","h2.fw2",-2134744142),title], null),(cljs.core.truth_(source)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.white.link","a.white.link",925581478),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),source], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pa2.tracked.f6","div.pa2.tracked.f6",2030432508),"SOURCE"], null)], null):null)], null),(cljs.core.truth_(details)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open","open",-1763596448),open_details_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary.outline-0.pointer","summary.outline-0.pointer",1192939605),"Implementation Details"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pl3","div.pl3",1280231720),details], null)], null):null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pa3","div.pa3",-292640361),root__$1], null)], null);
});

//# sourceMappingURL=examples.util.dom.js.map
