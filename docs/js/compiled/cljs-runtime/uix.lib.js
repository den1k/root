goog.provide('uix.lib');
goog.require('cljs.core');
/**
 * Similar to cljs.core/re-seq, but eager and faster
 */
uix.lib.re_seq_STAR_ = (function uix$lib$re_seq_STAR_(re,s){
var s__$1 = s;
var matches = re.exec(s__$1);
var ret = [];
while(true){
var match_str = (matches[(0)]);
var match_vals = (((matches.length === (1)))?match_str:matches);
var post_idx = (matches.index + (function (){var x__4273__auto__ = (1);
var y__4274__auto__ = match_str.length;
return ((x__4273__auto__ > y__4274__auto__) ? x__4273__auto__ : y__4274__auto__);
})());
var next_s = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(s__$1,post_idx);
ret.push(match_vals);

if((post_idx <= s__$1.length)){
var temp__5741__auto__ = re.exec(next_s);
if((temp__5741__auto__ == null)){
return ret;
} else {
var next_matches = temp__5741__auto__;
var G__100724 = next_s;
var G__100725 = next_matches;
var G__100726 = ret;
s__$1 = G__100724;
matches = G__100725;
ret = G__100726;
continue;
}
} else {
return ret;
}
break;
}
});

//# sourceMappingURL=uix.lib.js.map
