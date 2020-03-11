goog.provide('den1k.shortcuts');
goog.require('cljs.core');
goog.require('clojure.string');
den1k.shortcuts.meta_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, ["option",null,"shift",null,"control",null,"cmd",null,"meta",null], null), null);
den1k.shortcuts.event__GT_key = (function den1k$shortcuts$event__GT_key(e){
return clojure.string.lower_case(e.key);
});
den1k.shortcuts.default_remap = new cljs.core.PersistentArrayMap(null, 3, ["control","ctrl","alt","option","meta","cmd"], null);
den1k.shortcuts.parse_combos = (function den1k$shortcuts$parse_combos(combos_PLUS_handlers){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p__102805){
var vec__102806 = p__102805;
var combo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102806,(0),null);
var handler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__102806,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.set(clojure.string.split.cljs$core$IFn$_invoke$arity$2(combo,"+")),handler], null);
})),combos_PLUS_handlers);
});
/**
 * Component-local shortcut handler.
 *   Takes a map of combos and handlers and returns a map of keyboard handlers ready to
 *   be merged into a component. Handlers are passed the keyboard event.
 *   Example:
 *   [:input (shortcuts {"enter" handle-enter!})]
 *   ;; OR
 *   [:input
 *  (merge (shortcuts {"enter" handle-enter!})
 *         {:placeholder "Type something!"
 *          :value       @input-value})]
 *   As a convenience, handler can return `false` to prevent event and stop propagation.
 */
den1k.shortcuts.shortcuts = (function den1k$shortcuts$shortcuts(var_args){
var G__102814 = arguments.length;
switch (G__102814) {
case 1:
return den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$1 = (function (combos_PLUS_handlers){
return den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$2(combos_PLUS_handlers,den1k.shortcuts.default_remap);
}));

(den1k.shortcuts.shortcuts.cljs$core$IFn$_invoke$arity$2 = (function (combos_PLUS_handlers,re_map){
var current_combo = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
var shortcuts = den1k.shortcuts.parse_combos(combos_PLUS_handlers);
var lookup_key = (function (e){
var k = den1k.shortcuts.event__GT_key(e);
var or__4185__auto__ = (re_map.cljs$core$IFn$_invoke$arity$1 ? re_map.cljs$core$IFn$_invoke$arity$1(k) : re_map.call(null,k));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return k;
}
});
var on_key_down = (function (e){
var k = lookup_key(e);
var combo = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current_combo,cljs.core.conj,k);
if(cljs.core.truth_((den1k.shortcuts.meta_keys.cljs$core$IFn$_invoke$arity$1 ? den1k.shortcuts.meta_keys.cljs$core$IFn$_invoke$arity$1(k) : den1k.shortcuts.meta_keys.call(null,k)))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current_combo,cljs.core.disj,k);
}

var temp__5739__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(shortcuts,combo);
if(cljs.core.truth_(temp__5739__auto__)){
var handler = temp__5739__auto__;
if((handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(e) : handler.call(null,e)) === false){
e.preventDefault();

return e.stopPropagation();
} else {
return null;
}
} else {
return null;
}
});
var on_key_up = (function (e){
var k = lookup_key(e);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(current_combo,cljs.core.disj,k);
});
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765),on_key_down,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),on_key_up], null);
}));

(den1k.shortcuts.shortcuts.cljs$lang$maxFixedArity = 2);

if((typeof den1k !== 'undefined') && (typeof den1k.shortcuts !== 'undefined') && (typeof den1k.shortcuts.global_shortcuts_map !== 'undefined')){
} else {
den1k.shortcuts.global_shortcuts_map = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
/**
 * Like `shortcuts` for js/document.
 */
den1k.shortcuts.global_shortcuts = (function den1k$shortcuts$global_shortcuts(var_args){
var args__4795__auto__ = [];
var len__4789__auto___102848 = arguments.length;
var i__4790__auto___102849 = (0);
while(true){
if((i__4790__auto___102849 < len__4789__auto___102848)){
args__4795__auto__.push((arguments[i__4790__auto___102849]));

var G__102850 = (i__4790__auto___102849 + (1));
i__4790__auto___102849 = G__102850;
continue;
} else {
}
break;
}

var argseq__4796__auto__ = ((((0) < args__4795__auto__.length))?(new cljs.core.IndexedSeq(args__4795__auto__.slice((0)),(0),null)):null);
return den1k.shortcuts.global_shortcuts.cljs$core$IFn$_invoke$arity$variadic(argseq__4796__auto__);
});

(den1k.shortcuts.global_shortcuts.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var temp__5739__auto___102851 = cljs.core.not_empty(cljs.core.deref(den1k.shortcuts.global_shortcuts_map));
if(cljs.core.truth_(temp__5739__auto___102851)){
var map__102827_102852 = temp__5739__auto___102851;
var map__102827_102853__$1 = (((((!((map__102827_102852 == null))))?(((((map__102827_102852.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102827_102852.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102827_102852):map__102827_102852);
var on_key_down_102854 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102827_102853__$1,new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765));
var on_key_up_102855 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102827_102853__$1,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808));
var G__102829_102857 = document;
G__102829_102857.removeEventListener("keydown",on_key_down_102854);

G__102829_102857.removeEventListener("keyup",on_key_up_102855);

} else {
}

var map__102830 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(den1k.shortcuts.shortcuts,args);
var map__102830__$1 = (((((!((map__102830 == null))))?(((((map__102830.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__102830.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__102830):map__102830);
var shm = map__102830__$1;
var on_key_down = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102830__$1,new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765));
var on_key_up = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__102830__$1,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808));
var G__102832_102858 = document;
G__102832_102858.addEventListener("keydown",on_key_down);

G__102832_102858.addEventListener("keyup",on_key_up);


return cljs.core.reset_BANG_(den1k.shortcuts.global_shortcuts_map,shm);
}));

(den1k.shortcuts.global_shortcuts.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(den1k.shortcuts.global_shortcuts.cljs$lang$applyTo = (function (seq102822){
var self__4777__auto__ = this;
return self__4777__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq102822));
}));


//# sourceMappingURL=den1k.shortcuts.js.map
