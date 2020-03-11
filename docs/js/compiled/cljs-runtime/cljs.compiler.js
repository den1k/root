goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$1((function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(cljs.core.name(lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ecmascript5","ecmascript5",342717552),new cljs.core.Keyword(null,"ecmascript5-strict","ecmascript5-strict",888234811),new cljs.core.Keyword(null,"ecmascript6","ecmascript6",723864898),new cljs.core.Keyword(null,"ecmascript6-strict","ecmascript6-strict",-786049555),new cljs.core.Keyword(null,"ecmascript-2015","ecmascript-2015",-902254444),new cljs.core.Keyword(null,"ecmascript6-typed","ecmascript6-typed",-1978203054),new cljs.core.Keyword(null,"ecmascript-2016","ecmascript-2016",471574729),new cljs.core.Keyword(null,"ecmascript-2017","ecmascript-2017",620145058),new cljs.core.Keyword(null,"ecmascript-next","ecmascript-next",-1935155962)], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.cljs$core$IFn$_invoke$arity$3(ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv((function (xs,ns,_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(needle,cljs.compiler.get_first_ns_segment(ns))){
return cljs.core.reduced(needle);
} else {
return null;
}
}),null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__105768 = s;
var map__105768__$1 = (((((!((map__105768 == null))))?(((((map__105768.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105768.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105768):map__105768);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105768__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105768__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__105772 = info;
var map__105773 = G__105772;
var map__105773__$1 = (((((!((map__105773 == null))))?(((((map__105773.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105773.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105773):map__105773);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105773__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__105772__$1 = G__105772;
while(true){
var d__$2 = d__$1;
var map__105778 = G__105772__$1;
var map__105778__$1 = (((((!((map__105778 == null))))?(((((map__105778.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105778.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105778):map__105778);
var shadow__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105778__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$2)){
var G__106637 = (d__$2 + (1));
var G__106638 = shadow__$2;
d__$1 = G__106637;
G__105772__$1 = G__106638;
continue;
} else {
if(cljs.core.truth_((cljs.compiler.find_ns_starts_with.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.find_ns_starts_with.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)) : cljs.compiler.find_ns_starts_with.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name))))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s).cljs$core$IHash$_hash$arity$1(null),cljs.compiler.shadow_depth(s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__105811){
var map__105812 = p__105811;
var map__105812__$1 = (((((!((map__105812 == null))))?(((((map__105812.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105812.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105812):map__105812);
var name_var = map__105812__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105812__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105812__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__105823 = info;
var map__105823__$1 = (((((!((map__105823 == null))))?(((((map__105823.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105823.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105823):map__105823);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105823__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105823__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__105837 = [clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$"),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__105837) : cljs.compiler.munge.call(null,G__105837));
})());
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__105842 = arguments.length;
switch (G__105842) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
}));

(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_(s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if((!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name(s);
} else {
var depth = cljs.compiler.shadow_depth(s);
var code = cljs.compiler.hash_scope(s);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace(cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace(ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved(reserved);
var ss__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(rf,clojure.string.split.cljs$core$IFn$_invoke$arity$2(ss__$1,/\./));
var ss__$3 = clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",ss__$2);
var ms = (function (){var fexpr__105843 = new cljs.core.Var(function(){return cljs.core.munge_str;},new cljs.core.Symbol("cljs.core","munge-str","cljs.core/munge-str",-301346665,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",-558947994),new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"munge-str","munge-str",-2042069652,null),"cljs/core.cljs",25,1,11472,11472,new cljs.core.Symbol(null,"string","string",-349010059,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)]));
return (fexpr__105843.cljs$core$IFn$_invoke$arity$1 ? fexpr__105843.cljs$core$IFn$_invoke$arity$1(ss__$3) : fexpr__105843.call(null,ss__$3));
})();
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
}));

(cljs.compiler.munge.cljs$lang$maxFixedArity = 2);

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__105844 = cp;
switch (G__105844) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.cljs$core$IFn$_invoke$arity$2("0000",unpadded.length);
return ["\\u",pad,cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__105845_106645 = cljs.core.seq(s);
var chunk__105846_106646 = null;
var count__105847_106647 = (0);
var i__105848_106648 = (0);
while(true){
if((i__105848_106648 < count__105847_106647)){
var c_106649 = chunk__105846_106646.cljs$core$IIndexed$_nth$arity$2(null,i__105848_106648);
sb.append(cljs.compiler.escape_char(c_106649));


var G__106652 = seq__105845_106645;
var G__106653 = chunk__105846_106646;
var G__106654 = count__105847_106647;
var G__106655 = (i__105848_106648 + (1));
seq__105845_106645 = G__106652;
chunk__105846_106646 = G__106653;
count__105847_106647 = G__106654;
i__105848_106648 = G__106655;
continue;
} else {
var temp__5739__auto___106658 = cljs.core.seq(seq__105845_106645);
if(temp__5739__auto___106658){
var seq__105845_106659__$1 = temp__5739__auto___106658;
if(cljs.core.chunked_seq_QMARK_(seq__105845_106659__$1)){
var c__4609__auto___106661 = cljs.core.chunk_first(seq__105845_106659__$1);
var G__106662 = cljs.core.chunk_rest(seq__105845_106659__$1);
var G__106663 = c__4609__auto___106661;
var G__106664 = cljs.core.count(c__4609__auto___106661);
var G__106665 = (0);
seq__105845_106645 = G__106662;
chunk__105846_106646 = G__106663;
count__105847_106647 = G__106664;
i__105848_106648 = G__106665;
continue;
} else {
var c_106667 = cljs.core.first(seq__105845_106659__$1);
sb.append(cljs.compiler.escape_char(c_106667));


var G__106668 = cljs.core.next(seq__105845_106659__$1);
var G__106669 = null;
var G__106670 = (0);
var G__106671 = (0);
seq__105845_106645 = G__106668;
chunk__105846_106646 = G__106669;
count__105847_106647 = G__106670;
i__105848_106648 = G__106671;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return ["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"\""].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__4672__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4673__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4674__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4675__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4676__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__105870 = cljs.core.get_global_hierarchy;
return (fexpr__105870.cljs$core$IFn$_invoke$arity$0 ? fexpr__105870.cljs$core$IFn$_invoke$arity$0() : fexpr__105870.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4676__auto__,method_table__4672__auto__,prefer_table__4673__auto__,method_cache__4674__auto__,cached_hierarchy__4675__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__105875_106672 = ast;
var map__105875_106673__$1 = (((((!((map__105875_106672 == null))))?(((((map__105875_106672.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105875_106672.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105875_106672):map__105875_106672);
var env_106674 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105875_106673__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_106674))){
var map__105885_106675 = env_106674;
var map__105885_106676__$1 = (((((!((map__105885_106675 == null))))?(((((map__105885_106675.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105885_106675.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105885_106675):map__105885_106675);
var line_106677 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105885_106676__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_106678 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105885_106676__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (m){
var minfo = (function (){var G__105887 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_((function (){var G__105889 = new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast);
var fexpr__105888 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"binding","binding",539932593),null,new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null);
return (fexpr__105888.cljs$core$IFn$_invoke$arity$1 ? fexpr__105888.cljs$core$IFn$_invoke$arity$1(G__105889) : fexpr__105888.call(null,G__105889));
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__105887,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__105887;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_106677 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_106678)?(column_106678 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
}));
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_.call(null,ast));
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__105909 = arguments.length;
switch (G__105909) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4810__auto__ = [];
var len__4789__auto___106683 = arguments.length;
var i__4790__auto___106684 = (0);
while(true){
if((i__4790__auto___106684 < len__4789__auto___106683)){
args_arr__4810__auto__.push((arguments[i__4790__auto___106684]));

var G__106685 = (i__4790__auto___106684 + (1));
i__4790__auto___106684 = G__106685;
continue;
} else {
}
break;
}

var argseq__4811__auto__ = (new cljs.core.IndexedSeq(args_arr__4810__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4811__auto__);

}
});

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(a)){
cljs.compiler.emit(a);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(a)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,a);
} else {
if(goog.isFunction(a)){
(a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null));
} else {
var s_106686 = (function (){var G__105922 = a;
if((!(typeof a === 'string'))){
return G__105922.toString();
} else {
return G__105922;
}
})();
var temp__5743__auto___106687 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5743__auto___106687 == null)){
} else {
var sm_data_106689 = temp__5743__auto___106687;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(sm_data_106689,cljs.core.update,new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(function (p1__105890_SHARP_){
return (p1__105890_SHARP_ + s_106686.length);
}));
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([s_106686], 0));

}
}
}
}

return null;
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);
}));

(cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__105928 = cljs.core.seq(xs);
var chunk__105929 = null;
var count__105930 = (0);
var i__105931 = (0);
while(true){
if((i__105931 < count__105930)){
var x = chunk__105929.cljs$core$IIndexed$_nth$arity$2(null,i__105931);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__106693 = seq__105928;
var G__106694 = chunk__105929;
var G__106695 = count__105930;
var G__106696 = (i__105931 + (1));
seq__105928 = G__106693;
chunk__105929 = G__106694;
count__105930 = G__106695;
i__105931 = G__106696;
continue;
} else {
var temp__5739__auto__ = cljs.core.seq(seq__105928);
if(temp__5739__auto__){
var seq__105928__$1 = temp__5739__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__105928__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__105928__$1);
var G__106697 = cljs.core.chunk_rest(seq__105928__$1);
var G__106698 = c__4609__auto__;
var G__106699 = cljs.core.count(c__4609__auto__);
var G__106700 = (0);
seq__105928 = G__106697;
chunk__105929 = G__106698;
count__105930 = G__106699;
i__105931 = G__106700;
continue;
} else {
var x = cljs.core.first(seq__105928__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x);


var G__106701 = cljs.core.next(seq__105928__$1);
var G__106702 = null;
var G__106703 = (0);
var G__106704 = (0);
seq__105928 = G__106701;
chunk__105929 = G__106702;
count__105930 = G__106703;
i__105931 = G__106704;
continue;
}
} else {
return null;
}
}
break;
}
}));

/** @this {Function} */
(cljs.compiler.emits.cljs$lang$applyTo = (function (seq105897){
var G__105898 = cljs.core.first(seq105897);
var seq105897__$1 = cljs.core.next(seq105897);
var G__105899 = cljs.core.first(seq105897__$1);
var seq105897__$2 = cljs.core.next(seq105897__$1);
var G__105900 = cljs.core.first(seq105897__$2);
var seq105897__$3 = cljs.core.next(seq105897__$2);
var G__105901 = cljs.core.first(seq105897__$3);
var seq105897__$4 = cljs.core.next(seq105897__$3);
var G__105902 = cljs.core.first(seq105897__$4);
var seq105897__$5 = cljs.core.next(seq105897__$4);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__105898,G__105899,G__105900,G__105901,G__105902,seq105897__$5);
}));

(cljs.compiler.emits.cljs$lang$maxFixedArity = (5));

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.cljs$core$IFn$_invoke$arity$0();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__105938){
var map__105939 = p__105938;
var map__105939__$1 = (((((!((map__105939 == null))))?(((((map__105939.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__105939.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__105939):map__105939);
var m = map__105939__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__105939__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0)], 0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__105948 = arguments.length;
switch (G__105948) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4810__auto__ = [];
var len__4789__auto___106706 = arguments.length;
var i__4790__auto___106707 = (0);
while(true){
if((i__4790__auto___106707 < len__4789__auto___106706)){
args_arr__4810__auto__.push((arguments[i__4790__auto___106707]));

var G__106708 = (i__4790__auto___106707 + (1));
i__4790__auto___106707 = G__106708;
continue;
} else {
}
break;
}

var argseq__4811__auto__ = (new cljs.core.IndexedSeq(args_arr__4810__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4811__auto__);

}
});

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

return cljs.compiler._emitln();
}));

(cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(a);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(b);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(c);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(d);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(e);

var seq__105950_106714 = cljs.core.seq(xs);
var chunk__105951_106715 = null;
var count__105952_106716 = (0);
var i__105953_106717 = (0);
while(true){
if((i__105953_106717 < count__105952_106716)){
var x_106718 = chunk__105951_106715.cljs$core$IIndexed$_nth$arity$2(null,i__105953_106717);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_106718);


var G__106721 = seq__105950_106714;
var G__106722 = chunk__105951_106715;
var G__106723 = count__105952_106716;
var G__106724 = (i__105953_106717 + (1));
seq__105950_106714 = G__106721;
chunk__105951_106715 = G__106722;
count__105952_106716 = G__106723;
i__105953_106717 = G__106724;
continue;
} else {
var temp__5739__auto___106725 = cljs.core.seq(seq__105950_106714);
if(temp__5739__auto___106725){
var seq__105950_106726__$1 = temp__5739__auto___106725;
if(cljs.core.chunked_seq_QMARK_(seq__105950_106726__$1)){
var c__4609__auto___106727 = cljs.core.chunk_first(seq__105950_106726__$1);
var G__106728 = cljs.core.chunk_rest(seq__105950_106726__$1);
var G__106729 = c__4609__auto___106727;
var G__106730 = cljs.core.count(c__4609__auto___106727);
var G__106731 = (0);
seq__105950_106714 = G__106728;
chunk__105951_106715 = G__106729;
count__105952_106716 = G__106730;
i__105953_106717 = G__106731;
continue;
} else {
var x_106733 = cljs.core.first(seq__105950_106726__$1);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(x_106733);


var G__106734 = cljs.core.next(seq__105950_106726__$1);
var G__106735 = null;
var G__106736 = (0);
var G__106737 = (0);
seq__105950_106714 = G__106734;
chunk__105951_106715 = G__106735;
count__105952_106716 = G__106736;
i__105953_106717 = G__106737;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln();
}));

/** @this {Function} */
(cljs.compiler.emitln.cljs$lang$applyTo = (function (seq105942){
var G__105943 = cljs.core.first(seq105942);
var seq105942__$1 = cljs.core.next(seq105942);
var G__105944 = cljs.core.first(seq105942__$1);
var seq105942__$2 = cljs.core.next(seq105942__$1);
var G__105945 = cljs.core.first(seq105942__$2);
var seq105942__$3 = cljs.core.next(seq105942__$2);
var G__105946 = cljs.core.first(seq105942__$3);
var seq105942__$4 = cljs.core.next(seq105942__$3);
var G__105947 = cljs.core.first(seq105942__$4);
var seq105942__$5 = cljs.core.next(seq105942__$4);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__105943,G__105944,G__105945,G__105946,G__105947,seq105942__$5);
}));

(cljs.compiler.emitln.cljs$lang$maxFixedArity = (5));

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4720__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__105955_106747 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__105956_106748 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__105957_106749 = true;
var _STAR_print_fn_STAR__temp_val__105958_106750 = (function (x__4721__auto__){
return sb__4720__auto__.append(x__4721__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__105957_106749);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__105958_106750);

try{cljs.compiler.emit(expr);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__105956_106748);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__105955_106747);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4720__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4672__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4673__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4674__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4675__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4676__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__105960 = cljs.core.get_global_hierarchy;
return (fexpr__105960.cljs$core$IFn$_invoke$arity$0 ? fexpr__105960.cljs$core$IFn$_invoke$arity$0() : fexpr__105960.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant*"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4676__auto__,method_table__4672__auto__,prefer_table__4673__auto__,method_cache__4674__auto__,cached_hierarchy__4675__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.cljs_seq_QMARK_(x)){
return (cljs.compiler.emit_list.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_list.cljs$core$IFn$_invoke$arity$2(x,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_list.call(null,x,cljs.compiler.emit_constants_comma_sep));
} else {
if(cljs.core.record_QMARK_(x)){
var vec__105965 = cljs.analyzer.record_ns_PLUS_name(x);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__105965,(0),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__105965,(1),null);
var G__105968 = ns;
var G__105969 = name;
var G__105970 = (function (){
var G__105975 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,x);
return (cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__105975) : cljs.compiler.emit_constant.call(null,G__105975));
});
return (cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3 ? cljs.compiler.emit_record_value.cljs$core$IFn$_invoke$arity$3(G__105968,G__105969,G__105970) : cljs.compiler.emit_record_value.call(null,G__105968,G__105969,G__105970));
} else {
if(cljs.analyzer.cljs_map_QMARK_(x)){
var G__105976 = cljs.core.keys(x);
var G__105977 = cljs.core.vals(x);
var G__105978 = cljs.compiler.emit_constants_comma_sep;
var G__105979 = cljs.compiler.all_distinct_QMARK_;
return (cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4 ? cljs.compiler.emit_map.cljs$core$IFn$_invoke$arity$4(G__105976,G__105977,G__105978,G__105979) : cljs.compiler.emit_map.call(null,G__105976,G__105977,G__105978,G__105979));
} else {
if(cljs.analyzer.cljs_vector_QMARK_(x)){
return (cljs.compiler.emit_vector.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_vector.cljs$core$IFn$_invoke$arity$2(x,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_vector.call(null,x,cljs.compiler.emit_constants_comma_sep));
} else {
if(cljs.analyzer.cljs_set_QMARK_(x)){
return (cljs.compiler.emit_set.cljs$core$IFn$_invoke$arity$3 ? cljs.compiler.emit_set.cljs$core$IFn$_invoke$arity$3(x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_) : cljs.compiler.emit_set.call(null,x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_));
} else {
return (cljs.compiler.emit_constant_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant_STAR_.cljs$core$IFn$_invoke$arity$1(x) : cljs.compiler.emit_constant_STAR_.call(null,x));

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta(cljs.core.meta(v));
if((!((cljs.core.seq(m) == null)))){
var G__105984 = (function (){
return cljs.compiler.emit_constant_no_meta(v);
});
var G__105985 = (function (){
return cljs.compiler.emit_constant_no_meta(m);
});
return (cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_with_meta.cljs$core$IFn$_invoke$arity$2(G__105984,G__105985) : cljs.compiler.emit_with_meta.call(null,G__105984,G__105985));
} else {
return cljs.compiler.emit_constant_no_meta(v);
}
});
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(x)], 0))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("null");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("NaN");
} else {
if(cljs.core.not(isFinite(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((((x > (0)))?"Infinity":"-Infinity"));
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(",x,")");

}
}
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,String,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.compiler.wrap_in_double_quotes(cljs.compiler.escape_string(x)));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Boolean,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(x)?"true":"false"));
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,RegExp,(function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(new RegExp(\"\"))");
} else {
var vec__105988 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__105988,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__105988,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__105988,(2),null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace(kw);
var name = cljs.core.name(kw);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("new cljs.core.Keyword(");

cljs.compiler.emit_constant(ns);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(name);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant((cljs.core.truth_(ns)?[ns,"/",name].join(''):name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(cljs.core.hash(kw));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace(sym);
var name = cljs.core.name(sym);
var symstr = (((!((ns == null))))?[ns,"/",name].join(''):name);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("new cljs.core.Symbol(");

cljs.compiler.emit_constant(ns);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(name);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(symstr);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(cljs.core.hash(sym));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");

cljs.compiler.emit_constant(null);

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(")");
});
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
var temp__5737__auto__ = (function (){var and__4174__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4174__auto__)){
var G__105991 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__105991) : x.call(null,G__105991));
} else {
return and__4174__auto__;
}
})();
if(cljs.core.truth_(temp__5737__auto__)){
var value = temp__5737__auto__;
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2("cljs.core.",value);
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
var temp__5737__auto__ = (function (){var and__4174__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4174__auto__)){
var G__105992 = new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__105992) : x.call(null,G__105992));
} else {
return and__4174__auto__;
}
})();
if(cljs.core.truth_(temp__5737__auto__)){
var value = temp__5737__auto__;
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2("cljs.core.",value);
} else {
return cljs.compiler.emits_symbol(x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,m){
if(cljs.core.even_QMARK_(i)){
return cljs.compiler.emit_constant(m);
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(m);
}
}),cljs.compiler.comma_sep(cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,Date,(function (date){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("new Date(",date.getTime(),")");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash(uuid_str),")");
}));
cljs.compiler.emit_constant_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_(items)){
var G__105996 = items;
var G__105997 = (function (p1__105995_SHARP_){
return (function (){
return cljs.compiler.emit_constant(p1__105995_SHARP_);
});
});
return (cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_object.cljs$core$IFn$_invoke$arity$2(G__105996,G__105997) : cljs.compiler.emit_js_object.call(null,G__105996,G__105997));
} else {
return (cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.emit_js_array.cljs$core$IFn$_invoke$arity$2(items,cljs.compiler.emit_constants_comma_sep) : cljs.compiler.emit_js_array.call(null,items,cljs.compiler.emit_constants_comma_sep));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__106000){
var map__106001 = p__106000;
var map__106001__$1 = (((((!((map__106001 == null))))?(((((map__106001.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106001.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106001):map__106001);
var ast = map__106001__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106001__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106001__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106001__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var temp__5737__auto__ = new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292).cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5737__auto__)){
var const_expr = temp__5737__auto__;
return cljs.compiler.emit(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(const_expr,new cljs.core.Keyword(null,"env","env",-1815813235),env));
} else {
var map__106003 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__106003__$1 = (((((!((map__106003 == null))))?(((((map__106003.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106003.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106003):map__106003);
var cenv = map__106003__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106003__$1,new cljs.core.Keyword(null,"options","options",99638489));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name(var_name),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var or__4185__auto__ = js_module_name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.name(var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ast));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__106005 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4174__auto__ = (function (){var G__106008 = new cljs.core.Keyword(null,"language-out","language-out",334619882).cljs$core$IFn$_invoke$arity$1(options);
return (cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.es5_GT__EQ_.cljs$core$IFn$_invoke$arity$1(G__106008) : cljs.compiler.es5_GT__EQ_.call(null,G__106008));
})();
if(cljs.core.truth_(and__4174__auto__)){
return (!((cljs.core.namespace(var_name) == null)));
} else {
return and__4174__auto__;
}
})())){
return clojure.set.difference.cljs$core$IFn$_invoke$arity$2(G__106005,cljs.analyzer.es5_allowed);
} else {
return G__106005;
}
})();
var js_module = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-namespaces","js-namespaces",-471353612),(function (){var or__4185__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.name(var_name);
}
})()], null));
var info__$2 = (function (){var G__106009 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(G__106009,reserved);
} else {
return G__106009;
}
})();
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var G__106010_106797 = new cljs.core.Keyword(null,"module-type","module-type",1392760304).cljs$core$IFn$_invoke$arity$1(js_module);
var G__106010_106798__$1 = (((G__106010_106797 instanceof cljs.core.Keyword))?G__106010_106797.fqn:null);
switch (G__106010_106798__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace(var_name))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),reserved),"[\"default\"].",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.name(var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4174__auto__ = cljs.core.namespace(var_name);
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("default",cljs.core.name(var_name));
} else {
return and__4174__auto__;
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(info__$2);
}

break;
default:
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(info__$2);

}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"var","var",-769682797),(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"binding","binding",539932593),(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"local","local",-1497766724),(function (expr){
return cljs.compiler.emit_var(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"the-var","the-var",1428415613),(function (p__106015){
var map__106016 = p__106015;
var map__106016__$1 = (((((!((map__106016 == null))))?(((((map__106016.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106016.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106016):map__106016);
var arg = map__106016__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106016__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106016__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106016__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106016__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__106018 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__106018__$1 = (((((!((map__106018 == null))))?(((((map__106018.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106018.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106018):map__106018);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106018__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.with_meta(",expr,",",meta,")");
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"with-meta","with-meta",-1566856820),(function (p__106021){
var map__106022 = p__106021;
var map__106022__$1 = (((((!((map__106022 == null))))?(((((map__106022.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106022.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106022):map__106022);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106022__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106022__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106022__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_with_meta(expr,meta);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_((function (p1__106024_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__106024_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
}),keys__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count(keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count(keys) === (0))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_((distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_keys_QMARK_.cljs$core$IFn$_invoke$arity$1(keys) : distinct_keys_QMARK_.call(null,keys)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",(function (){var G__106025 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__106025) : comma_sep.call(null,G__106025));
})(),"], null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentArrayMap.createAsIfByAssoc([",(function (){var G__106026 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals);
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__106026) : comma_sep.call(null,G__106026));
})(),"])");
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("cljs.core.PersistentHashMap.fromArrays([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(keys) : comma_sep.call(null,keys)),"],[",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(vals) : comma_sep.call(null,vals)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__106027){
var map__106028 = p__106027;
var map__106028__$1 = (((((!((map__106028 == null))))?(((((map__106028.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106028.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106028):map__106028);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106028__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106028__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106028__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_map(keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.list(",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep.call(null,items)),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count(items);
if((cnt < (32))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep.call(null,items)),"], null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentVector.fromArray([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep.call(null,items)),"], true)");
}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__106035){
var map__106036 = p__106035;
var map__106036__$1 = (((((!((map__106036 == null))))?(((((map__106036.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106036.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106036):map__106036);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106036__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106036__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_vector(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_((function (p1__106038_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__106038_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
}),items__$1)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count(items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_(items)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_((distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1 ? distinct_constants_QMARK_.cljs$core$IFn$_invoke$arity$1(items) : distinct_constants_QMARK_.call(null,items)))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",(function (){var G__106039 = cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"));
return (comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(G__106039) : comma_sep.call(null,G__106039));
})(),"], null), null)");
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.PersistentHashSet.createAsIfByAssoc([",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep.call(null,items)),"])");

}
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set","set",304602554),(function (p__106040){
var map__106041 = p__106040;
var map__106041__$1 = (((((!((map__106041 == null))))?(((((map__106041.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106041.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106041):map__106041);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106041__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106041__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_set(items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("({");

var temp__5739__auto___106858 = cljs.core.seq(items);
if(temp__5739__auto___106858){
var items_106859__$1 = temp__5739__auto___106858;
var vec__106043_106860 = items_106859__$1;
var seq__106044_106861 = cljs.core.seq(vec__106043_106860);
var first__106045_106862 = cljs.core.first(seq__106044_106861);
var seq__106044_106863__$1 = cljs.core.next(seq__106044_106861);
var vec__106046_106864 = first__106045_106862;
var k_106865 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106046_106864,(0),null);
var v_106866 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106046_106864,(1),null);
var r_106867 = seq__106044_106863__$1;
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4("\"",cljs.core.name(k_106865),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_106866) : emit_js_object_val.call(null,v_106866)));

var seq__106049_106869 = cljs.core.seq(r_106867);
var chunk__106050_106870 = null;
var count__106051_106871 = (0);
var i__106052_106872 = (0);
while(true){
if((i__106052_106872 < count__106051_106871)){
var vec__106059_106873 = chunk__106050_106870.cljs$core$IIndexed$_nth$arity$2(null,i__106052_106872);
var k_106874__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106059_106873,(0),null);
var v_106875__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106059_106873,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_106874__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_106875__$1) : emit_js_object_val.call(null,v_106875__$1)));


var G__106877 = seq__106049_106869;
var G__106878 = chunk__106050_106870;
var G__106879 = count__106051_106871;
var G__106880 = (i__106052_106872 + (1));
seq__106049_106869 = G__106877;
chunk__106050_106870 = G__106878;
count__106051_106871 = G__106879;
i__106052_106872 = G__106880;
continue;
} else {
var temp__5739__auto___106882__$1 = cljs.core.seq(seq__106049_106869);
if(temp__5739__auto___106882__$1){
var seq__106049_106883__$1 = temp__5739__auto___106882__$1;
if(cljs.core.chunked_seq_QMARK_(seq__106049_106883__$1)){
var c__4609__auto___106884 = cljs.core.chunk_first(seq__106049_106883__$1);
var G__106885 = cljs.core.chunk_rest(seq__106049_106883__$1);
var G__106886 = c__4609__auto___106884;
var G__106887 = cljs.core.count(c__4609__auto___106884);
var G__106888 = (0);
seq__106049_106869 = G__106885;
chunk__106050_106870 = G__106886;
count__106051_106871 = G__106887;
i__106052_106872 = G__106888;
continue;
} else {
var vec__106062_106889 = cljs.core.first(seq__106049_106883__$1);
var k_106890__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106062_106889,(0),null);
var v_106891__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106062_106889,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(", \"",cljs.core.name(k_106890__$1),"\": ",(emit_js_object_val.cljs$core$IFn$_invoke$arity$1 ? emit_js_object_val.cljs$core$IFn$_invoke$arity$1(v_106891__$1) : emit_js_object_val.call(null,v_106891__$1)));


var G__106894 = cljs.core.next(seq__106049_106883__$1);
var G__106895 = null;
var G__106896 = (0);
var G__106897 = (0);
seq__106049_106869 = G__106894;
chunk__106050_106870 = G__106895;
count__106051_106871 = G__106896;
i__106052_106872 = G__106897;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("[",(comma_sep.cljs$core$IFn$_invoke$arity$1 ? comma_sep.cljs$core$IFn$_invoke$arity$1(items) : comma_sep.call(null,items)),"]");
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js-object","js-object",1830199158),(function (p__106065){
var map__106066 = p__106065;
var map__106066__$1 = (((((!((map__106066 == null))))?(((((map__106066.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106066.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106066):map__106066);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106066__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106066__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106066__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_object(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js-array","js-array",-1210185421),(function (p__106069){
var map__106070 = p__106069;
var map__106070__$1 = (((((!((map__106070 == null))))?(((((map__106070.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106070.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106070):map__106070);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106070__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106070__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_js_array(items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(ns,".map__GT_",name,"(",items,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"quote","quote",-262615245),(function (p__106074){
var map__106075 = p__106074;
var map__106075__$1 = (((((!((map__106075 == null))))?(((((map__106075.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106075.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106075):map__106075);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106075__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
return cljs.compiler.emit(expr);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"const","const",1709929842),(function (p__106078){
var map__106079 = p__106078;
var map__106079__$1 = (((((!((map__106079 == null))))?(((((map__106079.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106079.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106079):map__106079);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106079__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106079__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emit_constant(form);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__106083 = cljs.analyzer.unwrap_quote(expr);
var map__106083__$1 = (((((!((map__106083 == null))))?(((((map__106083.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106083.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106083):map__106083);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106083__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106083__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106083__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4185__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"const","const",1709929842)))?(function (){var and__4174__auto__ = form;
if(cljs.core.truth_(and__4174__auto__)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4174__auto__;
}
})():false);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
if((!((const_expr == null)))){
return (cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.truthy_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.truthy_constant_QMARK_.call(null,const_expr));
} else {
return false;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__106086 = cljs.analyzer.unwrap_quote(expr);
var map__106086__$1 = (((((!((map__106086 == null))))?(((((map__106086.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106086.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106086):map__106086);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106086__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106086__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106086__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4185__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,new cljs.core.Keyword(null,"const","const",1709929842))) && (((form === false) || ((form == null)))));
if(or__4185__auto__){
return or__4185__auto__;
} else {
if((!((const_expr == null)))){
return (cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.falsey_constant_QMARK_.cljs$core$IFn$_invoke$arity$1(const_expr) : cljs.compiler.falsey_constant_QMARK_.call(null,const_expr));
} else {
return false;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__4185__auto__ = (function (){var fexpr__106092 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null);
return (fexpr__106092.cljs$core$IFn$_invoke$arity$1 ? fexpr__106092.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__106092.call(null,tag));
})();
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__106093){
var map__106094 = p__106093;
var map__106094__$1 = (((((!((map__106094 == null))))?(((((map__106094.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106094.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106094):map__106094);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106094__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106094__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106094__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106094__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106094__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__4185__auto__ = unchecked;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.compiler.safe_test_QMARK_(env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(else$);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",((checked)?"cljs.core.truth_":null),"(",test,")?",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([then,":",else$,")"], 0));
} else {
if(checked){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(",test,"){");
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(then,"} else {");

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(else$,"}");
}

}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"case","case",1143702196),(function (p__106101){
var map__106102 = p__106101;
var map__106102__$1 = (((((!((map__106102 == null))))?(((((map__106102.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106102.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106102):map__106102);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106102__$1,new cljs.core.Keyword(null,"test","test",577538877));
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106102__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106102__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106102__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function(){");
} else {
}

var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("caseval__");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",gs,";");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("switch (",v,") {");

var seq__106104_106981 = cljs.core.seq(nodes);
var chunk__106105_106982 = null;
var count__106106_106983 = (0);
var i__106107_106984 = (0);
while(true){
if((i__106107_106984 < count__106106_106983)){
var map__106133_106985 = chunk__106105_106982.cljs$core$IIndexed$_nth$arity$2(null,i__106107_106984);
var map__106133_106986__$1 = (((((!((map__106133_106985 == null))))?(((((map__106133_106985.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106133_106985.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106133_106985):map__106133_106985);
var ts_106987 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106133_106986__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__106134_106988 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106133_106986__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__106134_106989__$1 = (((((!((map__106134_106988 == null))))?(((((map__106134_106988.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106134_106988.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106134_106988):map__106134_106988);
var then_106990 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106134_106989__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__106137_106995 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"test","test",577538877),ts_106987));
var chunk__106138_106996 = null;
var count__106139_106997 = (0);
var i__106140_106998 = (0);
while(true){
if((i__106140_106998 < count__106139_106997)){
var test_106999 = chunk__106138_106996.cljs$core$IIndexed$_nth$arity$2(null,i__106140_106998);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_106999,":");


var G__107000 = seq__106137_106995;
var G__107001 = chunk__106138_106996;
var G__107002 = count__106139_106997;
var G__107003 = (i__106140_106998 + (1));
seq__106137_106995 = G__107000;
chunk__106138_106996 = G__107001;
count__106139_106997 = G__107002;
i__106140_106998 = G__107003;
continue;
} else {
var temp__5739__auto___107004 = cljs.core.seq(seq__106137_106995);
if(temp__5739__auto___107004){
var seq__106137_107005__$1 = temp__5739__auto___107004;
if(cljs.core.chunked_seq_QMARK_(seq__106137_107005__$1)){
var c__4609__auto___107006 = cljs.core.chunk_first(seq__106137_107005__$1);
var G__107007 = cljs.core.chunk_rest(seq__106137_107005__$1);
var G__107008 = c__4609__auto___107006;
var G__107009 = cljs.core.count(c__4609__auto___107006);
var G__107010 = (0);
seq__106137_106995 = G__107007;
chunk__106138_106996 = G__107008;
count__106139_106997 = G__107009;
i__106140_106998 = G__107010;
continue;
} else {
var test_107011 = cljs.core.first(seq__106137_107005__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_107011,":");


var G__107012 = cljs.core.next(seq__106137_107005__$1);
var G__107013 = null;
var G__107014 = (0);
var G__107015 = (0);
seq__106137_106995 = G__107012;
chunk__106138_106996 = G__107013;
count__106139_106997 = G__107014;
i__106140_106998 = G__107015;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_106990);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_106990);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__107019 = seq__106104_106981;
var G__107020 = chunk__106105_106982;
var G__107021 = count__106106_106983;
var G__107022 = (i__106107_106984 + (1));
seq__106104_106981 = G__107019;
chunk__106105_106982 = G__107020;
count__106106_106983 = G__107021;
i__106107_106984 = G__107022;
continue;
} else {
var temp__5739__auto___107023 = cljs.core.seq(seq__106104_106981);
if(temp__5739__auto___107023){
var seq__106104_107024__$1 = temp__5739__auto___107023;
if(cljs.core.chunked_seq_QMARK_(seq__106104_107024__$1)){
var c__4609__auto___107025 = cljs.core.chunk_first(seq__106104_107024__$1);
var G__107026 = cljs.core.chunk_rest(seq__106104_107024__$1);
var G__107027 = c__4609__auto___107025;
var G__107028 = cljs.core.count(c__4609__auto___107025);
var G__107029 = (0);
seq__106104_106981 = G__107026;
chunk__106105_106982 = G__107027;
count__106106_106983 = G__107028;
i__106107_106984 = G__107029;
continue;
} else {
var map__106152_107031 = cljs.core.first(seq__106104_107024__$1);
var map__106152_107032__$1 = (((((!((map__106152_107031 == null))))?(((((map__106152_107031.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106152_107031.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106152_107031):map__106152_107031);
var ts_107033 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106152_107032__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__106155_107034 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106152_107032__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__106155_107035__$1 = (((((!((map__106155_107034 == null))))?(((((map__106155_107034.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106155_107034.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106155_107034):map__106155_107034);
var then_107036 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106155_107035__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__106158_107044 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"test","test",577538877),ts_107033));
var chunk__106159_107045 = null;
var count__106160_107046 = (0);
var i__106161_107047 = (0);
while(true){
if((i__106161_107047 < count__106160_107046)){
var test_107048 = chunk__106159_107045.cljs$core$IIndexed$_nth$arity$2(null,i__106161_107047);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_107048,":");


var G__107049 = seq__106158_107044;
var G__107050 = chunk__106159_107045;
var G__107051 = count__106160_107046;
var G__107052 = (i__106161_107047 + (1));
seq__106158_107044 = G__107049;
chunk__106159_107045 = G__107050;
count__106160_107046 = G__107051;
i__106161_107047 = G__107052;
continue;
} else {
var temp__5739__auto___107053__$1 = cljs.core.seq(seq__106158_107044);
if(temp__5739__auto___107053__$1){
var seq__106158_107054__$1 = temp__5739__auto___107053__$1;
if(cljs.core.chunked_seq_QMARK_(seq__106158_107054__$1)){
var c__4609__auto___107055 = cljs.core.chunk_first(seq__106158_107054__$1);
var G__107056 = cljs.core.chunk_rest(seq__106158_107054__$1);
var G__107057 = c__4609__auto___107055;
var G__107058 = cljs.core.count(c__4609__auto___107055);
var G__107059 = (0);
seq__106158_107044 = G__107056;
chunk__106159_107045 = G__107057;
count__106160_107046 = G__107058;
i__106161_107047 = G__107059;
continue;
} else {
var test_107060 = cljs.core.first(seq__106158_107054__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",test_107060,":");


var G__107062 = cljs.core.next(seq__106158_107054__$1);
var G__107063 = null;
var G__107064 = (0);
var G__107065 = (0);
seq__106158_107044 = G__107062;
chunk__106159_107045 = G__107063;
count__106160_107046 = G__107064;
i__106161_107047 = G__107065;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",then_107036);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(then_107036);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");


var G__107067 = cljs.core.next(seq__106104_107024__$1);
var G__107068 = null;
var G__107069 = (0);
var G__107070 = (0);
seq__106104_106981 = G__107067;
chunk__106105_106982 = G__107068;
count__106106_106983 = G__107069;
i__106107_106984 = G__107070;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(gs,"=",default$);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(default$);
}
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",gs,";})()");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__106166){
var map__106167 = p__106166;
var map__106167__$1 = (((((!((map__106167 == null))))?(((((map__106167.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106167.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106167):map__106167);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106167__$1,new cljs.core.Keyword(null,"exception","exception",-335277064));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106167__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__106172 = env;
var G__106173 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__106172,G__106173) : cljs.compiler.resolve_type.call(null,G__106172,G__106173));
})())].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__106174 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106174,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106174,(1),null);
var ret_t = (cljs.core.truth_(rstr)?(cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,rstr) : cljs.compiler.resolve_type.call(null,env,rstr)):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2((function (p1__106169_SHARP_){
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(env,p1__106169_SHARP_) : cljs.compiler.resolve_type.call(null,env,p1__106169_SHARP_));
}),clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__106177 = ["function(",clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__106177,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__106177;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__106180 = env;
var G__106181 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1)));
return (cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2 ? cljs.compiler.resolve_type.cljs$core$IFn$_invoke$arity$2(G__106180,G__106181) : cljs.compiler.resolve_type.call(null,G__106180,G__106181));
})()),"="].join('');
} else {
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(ts),(1),(cljs.core.count(ts) - (1)));
var xs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(ts__$1,/\|/);
return ["{",clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__106182_SHARP_){
return cljs.compiler.resolve_type(env,p1__106182_SHARP_);
}),xs)),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__106187 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__106188 = cljs.core.seq(vec__106187);
var first__106189 = cljs.core.first(seq__106188);
var seq__106188__$1 = cljs.core.next(seq__106188);
var p = first__106189;
var first__106189__$1 = cljs.core.first(seq__106188__$1);
var seq__106188__$2 = cljs.core.next(seq__106188__$1);
var ts = first__106189__$1;
var first__106189__$2 = cljs.core.first(seq__106188__$2);
var seq__106188__$3 = cljs.core.next(seq__106188__$2);
var n = first__106189__$2;
var xs = seq__106188__$3;
if(cljs.core.truth_(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p))?(function (){var and__4174__auto__ = ts;
if(cljs.core.truth_(and__4174__auto__)){
return goog.string.startsWith(ts,"{");
} else {
return and__4174__auto__;
}
})():false))){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__106190 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var seq__106191 = cljs.core.seq(vec__106190);
var first__106192 = cljs.core.first(seq__106191);
var seq__106191__$1 = cljs.core.next(seq__106191);
var p = first__106192;
var first__106192__$1 = cljs.core.first(seq__106191__$1);
var seq__106191__$2 = cljs.core.next(seq__106191__$1);
var ts = first__106192__$1;
var xs = seq__106191__$2;
if(cljs.core.truth_(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p))?(function (){var and__4174__auto__ = ts;
if(cljs.core.truth_(and__4174__auto__)){
return goog.string.startsWith(ts,"{");
} else {
return and__4174__auto__;
}
})():false))){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
var G__106197 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null));
var fexpr__106196 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null);
return (fexpr__106196.cljs$core$IFn$_invoke$arity$1 ? fexpr__106196.cljs$core$IFn$_invoke$arity$1(G__106197) : fexpr__106196.call(null,G__106197));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__106200 = arguments.length;
switch (G__106200) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
}));

(cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = (function cljs$compiler$print_comment_lines(e){
var vec__106210 = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__106198_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__106198_SHARP_);
} else {
return p1__106198_SHARP_;
}
}),clojure.string.split_lines(e));
var seq__106211 = cljs.core.seq(vec__106210);
var first__106212 = cljs.core.first(seq__106211);
var seq__106211__$1 = cljs.core.next(seq__106211);
var x = first__106212;
var ys = seq__106211__$1;
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(x,"*/","* /"));

var seq__106213 = cljs.core.seq(ys);
var chunk__106214 = null;
var count__106215 = (0);
var i__106216 = (0);
while(true){
if((i__106216 < count__106215)){
var next_line = chunk__106214.cljs$core$IIndexed$_nth$arity$2(null,i__106216);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__107191 = seq__106213;
var G__107192 = chunk__106214;
var G__107193 = count__106215;
var G__107194 = (i__106216 + (1));
seq__106213 = G__107191;
chunk__106214 = G__107192;
count__106215 = G__107193;
i__106216 = G__107194;
continue;
} else {
var temp__5739__auto__ = cljs.core.seq(seq__106213);
if(temp__5739__auto__){
var seq__106213__$1 = temp__5739__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__106213__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__106213__$1);
var G__107201 = cljs.core.chunk_rest(seq__106213__$1);
var G__107202 = c__4609__auto__;
var G__107203 = cljs.core.count(c__4609__auto__);
var G__107204 = (0);
seq__106213 = G__107201;
chunk__106214 = G__107202;
count__106215 = G__107203;
i__106216 = G__107204;
continue;
} else {
var next_line = cljs.core.first(seq__106213__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /"));


var G__107212 = cljs.core.next(seq__106213__$1);
var G__107213 = null;
var G__107214 = (0);
var G__107215 = (0);
seq__106213 = G__107212;
chunk__106214 = G__107213;
count__106215 = G__107214;
i__106216 = G__107215;
continue;
}
} else {
return null;
}
}
break;
}
});
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

var seq__106217_107216 = cljs.core.seq(docs__$2);
var chunk__106218_107217 = null;
var count__106219_107218 = (0);
var i__106220_107219 = (0);
while(true){
if((i__106220_107219 < count__106219_107218)){
var e_107220 = chunk__106218_107217.cljs$core$IIndexed$_nth$arity$2(null,i__106220_107219);
if(cljs.core.truth_(e_107220)){
print_comment_lines(e_107220);
} else {
}


var G__107221 = seq__106217_107216;
var G__107222 = chunk__106218_107217;
var G__107223 = count__106219_107218;
var G__107224 = (i__106220_107219 + (1));
seq__106217_107216 = G__107221;
chunk__106218_107217 = G__107222;
count__106219_107218 = G__107223;
i__106220_107219 = G__107224;
continue;
} else {
var temp__5739__auto___107225 = cljs.core.seq(seq__106217_107216);
if(temp__5739__auto___107225){
var seq__106217_107226__$1 = temp__5739__auto___107225;
if(cljs.core.chunked_seq_QMARK_(seq__106217_107226__$1)){
var c__4609__auto___107228 = cljs.core.chunk_first(seq__106217_107226__$1);
var G__107230 = cljs.core.chunk_rest(seq__106217_107226__$1);
var G__107231 = c__4609__auto___107228;
var G__107232 = cljs.core.count(c__4609__auto___107228);
var G__107233 = (0);
seq__106217_107216 = G__107230;
chunk__106218_107217 = G__107231;
count__106219_107218 = G__107232;
i__106220_107219 = G__107233;
continue;
} else {
var e_107234 = cljs.core.first(seq__106217_107226__$1);
if(cljs.core.truth_(e_107234)){
print_comment_lines(e_107234);
} else {
}


var G__107235 = cljs.core.next(seq__106217_107226__$1);
var G__107236 = null;
var G__107237 = (0);
var G__107238 = (0);
seq__106217_107216 = G__107235;
chunk__106218_107217 = G__107236;
count__106219_107218 = G__107237;
i__106220_107219 = G__107238;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" */");
} else {
return null;
}
}));

(cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3);

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__4174__auto__ = cljs.core.some((function (p1__106224_SHARP_){
return goog.string.startsWith(p1__106224_SHARP_,"@define");
}),jsdoc);
if(cljs.core.truth_(and__4174__auto__)){
var and__4174__auto____$1 = opts;
if(cljs.core.truth_(and__4174__auto____$1)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478))){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_(define)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([define], 0));
} else {
return null;
}
} else {
return false;
}
} else {
return and__4174__auto____$1;
}
} else {
return and__4174__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__106229){
var map__106230 = p__106229;
var map__106230__$1 = (((((!((map__106230 == null))))?(((((map__106230.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106230.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106230):map__106230);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"test","test",577538877));
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"export","export",214356590));
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106230__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__4185__auto__ = init;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("return (");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(" = ",(function (){var temp__5737__auto__ = cljs.compiler.get_define(mname,jsdoc);
if(cljs.core.truth_(temp__5737__auto__)){
var define = temp__5737__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("; return (");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"the-var","the-var",1428415613),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast], 0)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");})()");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(")");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("goog.exportSymbol('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__4174__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__4174__auto__)){
return test;
} else {
return and__4174__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
} else {
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__106237){
var map__106238 = p__106237;
var map__106238__$1 = (((((!((map__106238 == null))))?(((((map__106238.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106238.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106238):map__106238);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106238__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106238__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106238__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("(function (",arglist,"){");

var seq__106240_107307 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__106241_107308 = null;
var count__106242_107309 = (0);
var i__106243_107310 = (0);
while(true){
if((i__106243_107310 < count__106242_107309)){
var vec__106251_107311 = chunk__106241_107308.cljs$core$IIndexed$_nth$arity$2(null,i__106243_107310);
var i_107312 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106251_107311,(0),null);
var param_107313 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106251_107311,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_107313);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__107314 = seq__106240_107307;
var G__107315 = chunk__106241_107308;
var G__107316 = count__106242_107309;
var G__107317 = (i__106243_107310 + (1));
seq__106240_107307 = G__107314;
chunk__106241_107308 = G__107315;
count__106242_107309 = G__107316;
i__106243_107310 = G__107317;
continue;
} else {
var temp__5739__auto___107321 = cljs.core.seq(seq__106240_107307);
if(temp__5739__auto___107321){
var seq__106240_107322__$1 = temp__5739__auto___107321;
if(cljs.core.chunked_seq_QMARK_(seq__106240_107322__$1)){
var c__4609__auto___107323 = cljs.core.chunk_first(seq__106240_107322__$1);
var G__107324 = cljs.core.chunk_rest(seq__106240_107322__$1);
var G__107325 = c__4609__auto___107323;
var G__107326 = cljs.core.count(c__4609__auto___107323);
var G__107327 = (0);
seq__106240_107307 = G__107324;
chunk__106241_107308 = G__107325;
count__106242_107309 = G__107326;
i__106243_107310 = G__107327;
continue;
} else {
var vec__106254_107329 = cljs.core.first(seq__106240_107322__$1);
var i_107330 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106254_107329,(0),null);
var param_107331 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106254_107329,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(param_107331);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(" = cljs.core.first(");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(arglist,");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(arglist," = cljs.core.next(",arglist,");");


var G__107333 = cljs.core.next(seq__106240_107322__$1);
var G__107334 = null;
var G__107335 = (0);
var G__107336 = (0);
seq__106240_107307 = G__107333;
chunk__106241_107308 = G__107334;
count__106242_107309 = G__107335;
i__106243_107310 = G__107336;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count(params))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(cljs.core.butlast(params)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.first(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.rest(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name,"(");

var seq__106259_107338 = cljs.core.seq(params);
var chunk__106260_107339 = null;
var count__106261_107340 = (0);
var i__106262_107341 = (0);
while(true){
if((i__106262_107341 < count__106261_107340)){
var param_107348 = chunk__106260_107339.cljs$core$IIndexed$_nth$arity$2(null,i__106262_107341);
cljs.compiler.emit(param_107348);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107348,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107360 = seq__106259_107338;
var G__107361 = chunk__106260_107339;
var G__107362 = count__106261_107340;
var G__107363 = (i__106262_107341 + (1));
seq__106259_107338 = G__107360;
chunk__106260_107339 = G__107361;
count__106261_107340 = G__107362;
i__106262_107341 = G__107363;
continue;
} else {
var temp__5739__auto___107364 = cljs.core.seq(seq__106259_107338);
if(temp__5739__auto___107364){
var seq__106259_107365__$1 = temp__5739__auto___107364;
if(cljs.core.chunked_seq_QMARK_(seq__106259_107365__$1)){
var c__4609__auto___107366 = cljs.core.chunk_first(seq__106259_107365__$1);
var G__107367 = cljs.core.chunk_rest(seq__106259_107365__$1);
var G__107368 = c__4609__auto___107366;
var G__107369 = cljs.core.count(c__4609__auto___107366);
var G__107370 = (0);
seq__106259_107338 = G__107367;
chunk__106260_107339 = G__107368;
count__106261_107340 = G__107369;
i__106262_107341 = G__107370;
continue;
} else {
var param_107371 = cljs.core.first(seq__106259_107365__$1);
cljs.compiler.emit(param_107371);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107371,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107373 = cljs.core.next(seq__106259_107365__$1);
var G__107374 = null;
var G__107375 = (0);
var G__107376 = (0);
seq__106259_107338 = G__107373;
chunk__106260_107339 = G__107374;
count__106261_107340 = G__107375;
i__106262_107341 = G__107376;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");");
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = cljs.core.seq(",arglist,");");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name,"(");

var seq__106266_107400 = cljs.core.seq(params);
var chunk__106267_107401 = null;
var count__106268_107402 = (0);
var i__106269_107403 = (0);
while(true){
if((i__106269_107403 < count__106268_107402)){
var param_107404 = chunk__106267_107401.cljs$core$IIndexed$_nth$arity$2(null,i__106269_107403);
cljs.compiler.emit(param_107404);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107404,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107405 = seq__106266_107400;
var G__107406 = chunk__106267_107401;
var G__107407 = count__106268_107402;
var G__107408 = (i__106269_107403 + (1));
seq__106266_107400 = G__107405;
chunk__106267_107401 = G__107406;
count__106268_107402 = G__107407;
i__106269_107403 = G__107408;
continue;
} else {
var temp__5739__auto___107409 = cljs.core.seq(seq__106266_107400);
if(temp__5739__auto___107409){
var seq__106266_107410__$1 = temp__5739__auto___107409;
if(cljs.core.chunked_seq_QMARK_(seq__106266_107410__$1)){
var c__4609__auto___107411 = cljs.core.chunk_first(seq__106266_107410__$1);
var G__107412 = cljs.core.chunk_rest(seq__106266_107410__$1);
var G__107413 = c__4609__auto___107411;
var G__107414 = cljs.core.count(c__4609__auto___107411);
var G__107415 = (0);
seq__106266_107400 = G__107412;
chunk__106267_107401 = G__107413;
count__106268_107402 = G__107414;
i__106269_107403 = G__107415;
continue;
} else {
var param_107417 = cljs.core.first(seq__106266_107410__$1);
cljs.compiler.emit(param_107417);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107417,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107419 = cljs.core.next(seq__106266_107410__$1);
var G__107420 = null;
var G__107421 = (0);
var G__107422 = (0);
seq__106266_107400 = G__107419;
chunk__106267_107401 = G__107420;
count__106268_107402 = G__107421;
i__106269_107403 = G__107422;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(");");
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__106273 = cljs.core.seq(params);
var chunk__106274 = null;
var count__106275 = (0);
var i__106276 = (0);
while(true){
if((i__106276 < count__106275)){
var param = chunk__106274.cljs$core$IIndexed$_nth$arity$2(null,i__106276);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107429 = seq__106273;
var G__107430 = chunk__106274;
var G__107431 = count__106275;
var G__107432 = (i__106276 + (1));
seq__106273 = G__107429;
chunk__106274 = G__107430;
count__106275 = G__107431;
i__106276 = G__107432;
continue;
} else {
var temp__5739__auto__ = cljs.core.seq(seq__106273);
if(temp__5739__auto__){
var seq__106273__$1 = temp__5739__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__106273__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__106273__$1);
var G__107435 = cljs.core.chunk_rest(seq__106273__$1);
var G__107436 = c__4609__auto__;
var G__107437 = cljs.core.count(c__4609__auto__);
var G__107438 = (0);
seq__106273 = G__107435;
chunk__106274 = G__107436;
count__106275 = G__107437;
i__106276 = G__107438;
continue;
} else {
var param = cljs.core.first(seq__106273__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107441 = cljs.core.next(seq__106273__$1);
var G__107442 = null;
var G__107443 = (0);
var G__107444 = (0);
seq__106273 = G__107441;
chunk__106274 = G__107442;
count__106275 = G__107443;
i__106276 = G__107444;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__106277){
var map__106278 = p__106277;
var map__106278__$1 = (((((!((map__106278 == null))))?(((((map__106278.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106278.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106278):map__106278);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106278__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(function ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"(");

cljs.compiler.emit_fn_params(params);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_(startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("var ",i," = 0, ",a," = new Array(arguments.length -  ",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([startslice,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("while (",i," < ",a,".length) {",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}"], 0));

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__106280){
var map__106281 = p__106280;
var map__106281__$1 = (((((!((map__106281 == null))))?(((((map__106281.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106281.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106281):map__106281);
var f = map__106281__$1;
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"fixed-arity","fixed-arity",1586445869));
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106281__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

var name_107498__$1 = (function (){var or__4185__auto__ = name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_107499 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_107498__$1);
var delegate_name_107500 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_107499),"__delegate"].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() { ");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",delegate_name_107500," = function (");

var seq__106283_107508 = cljs.core.seq(params);
var chunk__106284_107509 = null;
var count__106285_107510 = (0);
var i__106286_107511 = (0);
while(true){
if((i__106286_107511 < count__106285_107510)){
var param_107512 = chunk__106284_107509.cljs$core$IIndexed$_nth$arity$2(null,i__106286_107511);
cljs.compiler.emit(param_107512);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107512,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107515 = seq__106283_107508;
var G__107516 = chunk__106284_107509;
var G__107517 = count__106285_107510;
var G__107518 = (i__106286_107511 + (1));
seq__106283_107508 = G__107515;
chunk__106284_107509 = G__107516;
count__106285_107510 = G__107517;
i__106286_107511 = G__107518;
continue;
} else {
var temp__5739__auto___107525 = cljs.core.seq(seq__106283_107508);
if(temp__5739__auto___107525){
var seq__106283_107526__$1 = temp__5739__auto___107525;
if(cljs.core.chunked_seq_QMARK_(seq__106283_107526__$1)){
var c__4609__auto___107527 = cljs.core.chunk_first(seq__106283_107526__$1);
var G__107528 = cljs.core.chunk_rest(seq__106283_107526__$1);
var G__107529 = c__4609__auto___107527;
var G__107530 = cljs.core.count(c__4609__auto___107527);
var G__107531 = (0);
seq__106283_107508 = G__107528;
chunk__106284_107509 = G__107529;
count__106285_107510 = G__107530;
i__106286_107511 = G__107531;
continue;
} else {
var param_107537 = cljs.core.first(seq__106283_107526__$1);
cljs.compiler.emit(param_107537);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107537,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107538 = cljs.core.next(seq__106283_107526__$1);
var G__107539 = null;
var G__107540 = (0);
var G__107541 = (0);
seq__106283_107508 = G__107538;
chunk__106284_107509 = G__107539;
count__106285_107510 = G__107540;
i__106286_107511 = G__107541;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",mname_107499," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",(cljs.core.count(params) - (1)),") {");

var a_107550 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_107550,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("} ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("return ",delegate_name_107500,".call(this,");

var seq__106287_107552 = cljs.core.seq(params);
var chunk__106288_107553 = null;
var count__106289_107554 = (0);
var i__106290_107555 = (0);
while(true){
if((i__106290_107555 < count__106289_107554)){
var param_107560 = chunk__106288_107553.cljs$core$IIndexed$_nth$arity$2(null,i__106290_107555);
cljs.compiler.emit(param_107560);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107560,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107561 = seq__106287_107552;
var G__107562 = chunk__106288_107553;
var G__107563 = count__106289_107554;
var G__107564 = (i__106290_107555 + (1));
seq__106287_107552 = G__107561;
chunk__106288_107553 = G__107562;
count__106289_107554 = G__107563;
i__106290_107555 = G__107564;
continue;
} else {
var temp__5739__auto___107566 = cljs.core.seq(seq__106287_107552);
if(temp__5739__auto___107566){
var seq__106287_107568__$1 = temp__5739__auto___107566;
if(cljs.core.chunked_seq_QMARK_(seq__106287_107568__$1)){
var c__4609__auto___107569 = cljs.core.chunk_first(seq__106287_107568__$1);
var G__107571 = cljs.core.chunk_rest(seq__106287_107568__$1);
var G__107572 = c__4609__auto___107569;
var G__107573 = cljs.core.count(c__4609__auto___107569);
var G__107574 = (0);
seq__106287_107552 = G__107571;
chunk__106288_107553 = G__107572;
count__106289_107554 = G__107573;
i__106290_107555 = G__107574;
continue;
} else {
var param_107578 = cljs.core.first(seq__106287_107568__$1);
cljs.compiler.emit(param_107578);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_107578,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(",");
}


var G__107579 = cljs.core.next(seq__106287_107568__$1);
var G__107580 = null;
var G__107581 = (0);
var G__107582 = (0);
seq__106287_107552 = G__107579;
chunk__106288_107553 = G__107580;
count__106289_107554 = G__107581;
i__106290_107555 = G__107582;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(");");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107499,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2(mname_107499,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.Keyword(null,"name","name",1843675177),name_107498__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107499,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_107500,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_107499,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__106294){
var map__106295 = p__106294;
var map__106295__$1 = (((((!((map__106295 == null))))?(((((map__106295.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106295.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106295):map__106295);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var in_loop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"in-loop","in-loop",-187298246));
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106295__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var recur_params = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__106291_SHARP_){
var and__4174__auto__ = p1__106291_SHARP_;
if(cljs.core.truth_(and__4174__auto__)){
return cljs.core.deref(new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__106291_SHARP_));
} else {
return and__4174__auto__;
}
}),recur_frames)], 0));
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(recur_params,(cljs.core.truth_((function (){var or__4185__auto__ = in_loop;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.seq(recur_params);
}
})())?cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"params","params",710516235),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([loop_lets], 0)):null))));
if(loop_locals){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("((function (",cljs.compiler.comma_sep(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_107594__$1 = (function (){var or__4185__auto__ = name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_107595 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_107594__$1);
var maxparams_107596 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_107597 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_107595),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
}),methods$));
var ms_107598 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (p1__106292_SHARP_){
return cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__106292_SHARP_)));
}),cljs.core.seq(mmap_107597));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function() {");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",mname_107595," = null;");

var seq__106297_107606 = cljs.core.seq(ms_107598);
var chunk__106298_107607 = null;
var count__106299_107608 = (0);
var i__106300_107609 = (0);
while(true){
if((i__106300_107609 < count__106299_107608)){
var vec__106307_107611 = chunk__106298_107607.cljs$core$IIndexed$_nth$arity$2(null,i__106300_107609);
var n_107612 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106307_107611,(0),null);
var meth_107613 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106307_107611,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_107612," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107613))){
cljs.compiler.emit_variadic_fn_method(meth_107613);
} else {
cljs.compiler.emit_fn_method(meth_107613);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__107638 = seq__106297_107606;
var G__107639 = chunk__106298_107607;
var G__107640 = count__106299_107608;
var G__107641 = (i__106300_107609 + (1));
seq__106297_107606 = G__107638;
chunk__106298_107607 = G__107639;
count__106299_107608 = G__107640;
i__106300_107609 = G__107641;
continue;
} else {
var temp__5739__auto___107642 = cljs.core.seq(seq__106297_107606);
if(temp__5739__auto___107642){
var seq__106297_107643__$1 = temp__5739__auto___107642;
if(cljs.core.chunked_seq_QMARK_(seq__106297_107643__$1)){
var c__4609__auto___107644 = cljs.core.chunk_first(seq__106297_107643__$1);
var G__107645 = cljs.core.chunk_rest(seq__106297_107643__$1);
var G__107646 = c__4609__auto___107644;
var G__107647 = cljs.core.count(c__4609__auto___107644);
var G__107648 = (0);
seq__106297_107606 = G__107645;
chunk__106298_107607 = G__107646;
count__106299_107608 = G__107647;
i__106300_107609 = G__107648;
continue;
} else {
var vec__106310_107649 = cljs.core.first(seq__106297_107643__$1);
var n_107650 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106310_107649,(0),null);
var meth_107651 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106310_107649,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("var ",n_107650," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107651))){
cljs.compiler.emit_variadic_fn_method(meth_107651);
} else {
cljs.compiler.emit_fn_method(meth_107651);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");


var G__107652 = cljs.core.next(seq__106297_107643__$1);
var G__107653 = null;
var G__107654 = (0);
var G__107655 = (0);
seq__106297_107606 = G__107652;
chunk__106298_107607 = G__107653;
count__106299_107608 = G__107654;
i__106300_107609 = G__107655;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107595," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_107596),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_107596)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(cljs.core.last(maxparams_107596));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(" = var_args;");
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("switch(arguments.length){");

var seq__106313_107658 = cljs.core.seq(ms_107598);
var chunk__106314_107659 = null;
var count__106315_107660 = (0);
var i__106316_107661 = (0);
while(true){
if((i__106316_107661 < count__106315_107660)){
var vec__106328_107665 = chunk__106314_107659.cljs$core$IIndexed$_nth$arity$2(null,i__106316_107661);
var n_107666 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106328_107665,(0),null);
var meth_107667 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106328_107665,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107667))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_107669 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_107669," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_107670 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_107669," = new cljs.core.IndexedSeq(",a_107670,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_107666,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_107596)),(((cljs.core.count(maxparams_107596) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_107669,");"], 0));
} else {
var pcnt_107676 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_107667));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_107676,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_107666,".call(this",(((pcnt_107676 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_107676,maxparams_107596)),null,(1),null)),(2),null))),");");
}


var G__107679 = seq__106313_107658;
var G__107680 = chunk__106314_107659;
var G__107681 = count__106315_107660;
var G__107682 = (i__106316_107661 + (1));
seq__106313_107658 = G__107679;
chunk__106314_107659 = G__107680;
count__106315_107660 = G__107681;
i__106316_107661 = G__107682;
continue;
} else {
var temp__5739__auto___107687 = cljs.core.seq(seq__106313_107658);
if(temp__5739__auto___107687){
var seq__106313_107688__$1 = temp__5739__auto___107687;
if(cljs.core.chunked_seq_QMARK_(seq__106313_107688__$1)){
var c__4609__auto___107689 = cljs.core.chunk_first(seq__106313_107688__$1);
var G__107690 = cljs.core.chunk_rest(seq__106313_107688__$1);
var G__107691 = c__4609__auto___107689;
var G__107692 = cljs.core.count(c__4609__auto___107689);
var G__107693 = (0);
seq__106313_107658 = G__107690;
chunk__106314_107659 = G__107691;
count__106315_107660 = G__107692;
i__106316_107661 = G__107693;
continue;
} else {
var vec__106334_107695 = cljs.core.first(seq__106313_107688__$1);
var n_107696 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106334_107695,(0),null);
var meth_107697 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106334_107695,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107697))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("default:");

var restarg_107705 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",restarg_107705," = null;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if (arguments.length > ",max_fixed_arity,") {");

var a_107717 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(restarg_107705," = new cljs.core.IndexedSeq(",a_107717,",0,null);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("return ",n_107696,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_107596)),(((cljs.core.count(maxparams_107596) > (1)))?", ":null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([restarg_107705,");"], 0));
} else {
var pcnt_107718 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_107697));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("case ",pcnt_107718,":");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("return ",n_107696,".call(this",(((pcnt_107718 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_107718,maxparams_107596)),null,(1),null)),(2),null))),");");
}


var G__107721 = cljs.core.next(seq__106313_107688__$1);
var G__107722 = null;
var G__107723 = (0);
var G__107724 = (0);
seq__106313_107658 = G__107721;
chunk__106314_107659 = G__107722;
count__106315_107660 = G__107723;
i__106316_107661 = G__107724;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");

var arg_count_js_107725 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"self__","self__",-153190816,null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.val(cljs.core.first(ms_107598)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("throw(new Error('Invalid arity: ' + ",arg_count_js_107725,"));");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107595,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107595,".cljs$lang$applyTo = ",cljs.core.some((function (p1__106293_SHARP_){
var vec__106337 = p1__106293_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106337,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106337,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
}),ms_107598),".cljs$lang$applyTo;");
} else {
}

var seq__106340_107728 = cljs.core.seq(ms_107598);
var chunk__106341_107729 = null;
var count__106342_107730 = (0);
var i__106343_107731 = (0);
while(true){
if((i__106343_107731 < count__106342_107730)){
var vec__106350_107732 = chunk__106341_107729.cljs$core$IIndexed$_nth$arity$2(null,i__106343_107731);
var n_107733 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106350_107732,(0),null);
var meth_107734 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106350_107732,(1),null);
var c_107735 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_107734));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107734))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107595,".cljs$core$IFn$_invoke$arity$variadic = ",n_107733,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_107595,".cljs$core$IFn$_invoke$arity$",c_107735," = ",n_107733,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__107736 = seq__106340_107728;
var G__107737 = chunk__106341_107729;
var G__107738 = count__106342_107730;
var G__107739 = (i__106343_107731 + (1));
seq__106340_107728 = G__107736;
chunk__106341_107729 = G__107737;
count__106342_107730 = G__107738;
i__106343_107731 = G__107739;
continue;
} else {
var temp__5739__auto___107740 = cljs.core.seq(seq__106340_107728);
if(temp__5739__auto___107740){
var seq__106340_107741__$1 = temp__5739__auto___107740;
if(cljs.core.chunked_seq_QMARK_(seq__106340_107741__$1)){
var c__4609__auto___107742 = cljs.core.chunk_first(seq__106340_107741__$1);
var G__107743 = cljs.core.chunk_rest(seq__106340_107741__$1);
var G__107744 = c__4609__auto___107742;
var G__107745 = cljs.core.count(c__4609__auto___107742);
var G__107746 = (0);
seq__106340_107728 = G__107743;
chunk__106341_107729 = G__107744;
count__106342_107730 = G__107745;
i__106343_107731 = G__107746;
continue;
} else {
var vec__106353_107747 = cljs.core.first(seq__106340_107741__$1);
var n_107748 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106353_107747,(0),null);
var meth_107749 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106353_107747,(1),null);
var c_107751 = cljs.core.count(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_107749));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_107749))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(mname_107595,".cljs$core$IFn$_invoke$arity$variadic = ",n_107748,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(mname_107595,".cljs$core$IFn$_invoke$arity$",c_107751," = ",n_107748,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
}


var G__107754 = cljs.core.next(seq__106340_107741__$1);
var G__107755 = null;
var G__107756 = (0);
var G__107757 = (0);
seq__106340_107728 = G__107754;
chunk__106341_107729 = G__107755;
count__106342_107730 = G__107756;
i__106343_107731 = G__107757;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("return ",mname_107595,";");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(";})(",cljs.compiler.comma_sep(loop_locals),"))");
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"do","do",46310725),(function (p__106356){
var map__106357 = p__106356;
var map__106357__$1 = (((((!((map__106357 == null))))?(((((map__106357.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106357.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106357):map__106357);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106357__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106357__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106357__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq(statements)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__106359_107770 = cljs.core.seq(statements);
var chunk__106360_107771 = null;
var count__106361_107772 = (0);
var i__106362_107773 = (0);
while(true){
if((i__106362_107773 < count__106361_107772)){
var s_107774 = chunk__106360_107771.cljs$core$IIndexed$_nth$arity$2(null,i__106362_107773);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_107774);


var G__107775 = seq__106359_107770;
var G__107776 = chunk__106360_107771;
var G__107777 = count__106361_107772;
var G__107778 = (i__106362_107773 + (1));
seq__106359_107770 = G__107775;
chunk__106360_107771 = G__107776;
count__106361_107772 = G__107777;
i__106362_107773 = G__107778;
continue;
} else {
var temp__5739__auto___107779 = cljs.core.seq(seq__106359_107770);
if(temp__5739__auto___107779){
var seq__106359_107780__$1 = temp__5739__auto___107779;
if(cljs.core.chunked_seq_QMARK_(seq__106359_107780__$1)){
var c__4609__auto___107781 = cljs.core.chunk_first(seq__106359_107780__$1);
var G__107783 = cljs.core.chunk_rest(seq__106359_107780__$1);
var G__107784 = c__4609__auto___107781;
var G__107785 = cljs.core.count(c__4609__auto___107781);
var G__107786 = (0);
seq__106359_107770 = G__107783;
chunk__106360_107771 = G__107784;
count__106361_107772 = G__107785;
i__106362_107773 = G__107786;
continue;
} else {
var s_107787 = cljs.core.first(seq__106359_107780__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(s_107787);


var G__107792 = cljs.core.next(seq__106359_107780__$1);
var G__107793 = null;
var G__107794 = (0);
var G__107795 = (0);
seq__106359_107770 = G__107792;
chunk__106360_107771 = G__107793;
count__106361_107772 = G__107794;
i__106362_107773 = G__107795;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit(ret);

if(((cljs.core.seq(statements)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__106363){
var map__106364 = p__106363;
var map__106364__$1 = (((((!((map__106364 == null))))?(((((map__106364.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106364.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106364):map__106364);
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106364__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106364__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106364__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106364__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106364__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4185__auto__ = name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("catch (",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"const","const",1709929842),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote(finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__106367,is_loop){
var map__106368 = p__106367;
var map__106368__$1 = (((((!((map__106368 == null))))?(((((map__106368.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106368.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106368):map__106368);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106368__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106368__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106368__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__106371_107803 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__106372_107804 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
}),bindings):null));
(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__106372_107804);

try{var seq__106373_107805 = cljs.core.seq(bindings);
var chunk__106374_107806 = null;
var count__106375_107808 = (0);
var i__106376_107809 = (0);
while(true){
if((i__106376_107809 < count__106375_107808)){
var map__106388_107812 = chunk__106374_107806.cljs$core$IIndexed$_nth$arity$2(null,i__106376_107809);
var map__106388_107813__$1 = (((((!((map__106388_107812 == null))))?(((((map__106388_107812.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106388_107812.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106388_107812):map__106388_107812);
var binding_107814 = map__106388_107813__$1;
var init_107815 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106388_107813__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_107814);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_107815,";");


var G__107816 = seq__106373_107805;
var G__107817 = chunk__106374_107806;
var G__107818 = count__106375_107808;
var G__107819 = (i__106376_107809 + (1));
seq__106373_107805 = G__107816;
chunk__106374_107806 = G__107817;
count__106375_107808 = G__107818;
i__106376_107809 = G__107819;
continue;
} else {
var temp__5739__auto___107820 = cljs.core.seq(seq__106373_107805);
if(temp__5739__auto___107820){
var seq__106373_107821__$1 = temp__5739__auto___107820;
if(cljs.core.chunked_seq_QMARK_(seq__106373_107821__$1)){
var c__4609__auto___107822 = cljs.core.chunk_first(seq__106373_107821__$1);
var G__107823 = cljs.core.chunk_rest(seq__106373_107821__$1);
var G__107824 = c__4609__auto___107822;
var G__107825 = cljs.core.count(c__4609__auto___107822);
var G__107826 = (0);
seq__106373_107805 = G__107823;
chunk__106374_107806 = G__107824;
count__106375_107808 = G__107825;
i__106376_107809 = G__107826;
continue;
} else {
var map__106392_107827 = cljs.core.first(seq__106373_107821__$1);
var map__106392_107828__$1 = (((((!((map__106392_107827 == null))))?(((((map__106392_107827.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106392_107827.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106392_107827):map__106392_107827);
var binding_107829 = map__106392_107828__$1;
var init_107830 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106392_107828__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("var ");

cljs.compiler.emit(binding_107829);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" = ",init_107830,";");


var G__107833 = cljs.core.next(seq__106373_107821__$1);
var G__107834 = null;
var G__107835 = (0);
var G__107836 = (0);
seq__106373_107805 = G__107833;
chunk__106374_107806 = G__107834;
count__106375_107808 = G__107835;
i__106376_107809 = G__107836;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("while(true){");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("break;");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("}");
} else {
}
}finally {(cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__106371_107803);
}
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let(ast,false);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let(ast,true);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__106403){
var map__106404 = p__106403;
var map__106404__$1 = (((((!((map__106404 == null))))?(((((map__106404.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106404.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106404):map__106404);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106404__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106404__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106404__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__4666__auto___107837 = cljs.core.count(exprs);
var i_107838 = (0);
while(true){
if((i_107838 < n__4666__auto___107837)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_107838) : temps.call(null,i_107838))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_107838) : exprs.call(null,i_107838)),";");

var G__107840 = (i_107838 + (1));
i_107838 = G__107840;
continue;
} else {
}
break;
}

var n__4666__auto___107841 = cljs.core.count(exprs);
var i_107842 = (0);
while(true){
if((i_107842 < n__4666__auto___107841)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_107842) : params.call(null,i_107842)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_107842) : temps.call(null,i_107842)),";");

var G__107843 = (i_107842 + (1));
i_107842 = G__107843;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("continue;");
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__106407){
var map__106408 = p__106407;
var map__106408__$1 = (((((!((map__106408 == null))))?(((((map__106408.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106408.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106408):map__106408);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106408__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106408__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106408__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("(function (){");
} else {
}

var seq__106410_107844 = cljs.core.seq(bindings);
var chunk__106411_107845 = null;
var count__106412_107846 = (0);
var i__106413_107847 = (0);
while(true){
if((i__106413_107847 < count__106412_107846)){
var map__106419_107848 = chunk__106411_107845.cljs$core$IIndexed$_nth$arity$2(null,i__106413_107847);
var map__106419_107849__$1 = (((((!((map__106419_107848 == null))))?(((((map__106419_107848.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106419_107848.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106419_107848):map__106419_107848);
var binding_107850 = map__106419_107849__$1;
var init_107851 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106419_107849__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_107850)," = ",init_107851,";");


var G__107852 = seq__106410_107844;
var G__107853 = chunk__106411_107845;
var G__107854 = count__106412_107846;
var G__107855 = (i__106413_107847 + (1));
seq__106410_107844 = G__107852;
chunk__106411_107845 = G__107853;
count__106412_107846 = G__107854;
i__106413_107847 = G__107855;
continue;
} else {
var temp__5739__auto___107856 = cljs.core.seq(seq__106410_107844);
if(temp__5739__auto___107856){
var seq__106410_107857__$1 = temp__5739__auto___107856;
if(cljs.core.chunked_seq_QMARK_(seq__106410_107857__$1)){
var c__4609__auto___107858 = cljs.core.chunk_first(seq__106410_107857__$1);
var G__107859 = cljs.core.chunk_rest(seq__106410_107857__$1);
var G__107860 = c__4609__auto___107858;
var G__107861 = cljs.core.count(c__4609__auto___107858);
var G__107862 = (0);
seq__106410_107844 = G__107859;
chunk__106411_107845 = G__107860;
count__106412_107846 = G__107861;
i__106413_107847 = G__107862;
continue;
} else {
var map__106424_107863 = cljs.core.first(seq__106410_107857__$1);
var map__106424_107864__$1 = (((((!((map__106424_107863 == null))))?(((((map__106424_107863.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106424_107863.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106424_107863):map__106424_107863);
var binding_107865 = map__106424_107864__$1;
var init_107866 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106424_107864__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_107865)," = ",init_107866,";");


var G__107867 = cljs.core.next(seq__106410_107857__$1);
var G__107868 = null;
var G__107869 = (0);
var G__107870 = (0);
seq__106410_107844 = G__107867;
chunk__106411_107845 = G__107868;
count__106412_107846 = G__107869;
i__106413_107847 = G__107870;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(expr);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__106430){
var map__106431 = p__106430;
var map__106431__$1 = (((((!((map__106431 == null))))?(((((map__106431.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106431.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106431):map__106431);
var expr = map__106431__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106431__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106431__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106431__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4174__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4174__auto__)){
if(cljs.core.not(new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info))){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return false;
}
} else {
return and__4174__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4174__auto__ = protocol;
if(cljs.core.truth_(and__4174__auto__)){
var and__4174__auto____$1 = tag;
if(cljs.core.truth_(and__4174__auto____$1)){
var or__4185__auto__ = (function (){var and__4174__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4174__auto____$2)){
var and__4174__auto____$3 = protocol;
if(cljs.core.truth_(and__4174__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__4174__auto____$3;
}
} else {
return and__4174__auto____$2;
}
})();
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var and__4174__auto____$2 = (function (){var or__4185__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4174__auto____$2)){
var or__4185__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__4185__auto____$1){
return or__4185__auto____$1;
} else {
if((!(cljs.core.set_QMARK_(tag)))){
if(cljs.core.not((function (){var fexpr__106448 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),"null",new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),"null",new cljs.core.Symbol(null,"object","object",-1179821820,null),"null",new cljs.core.Symbol(null,"any","any",-948528346,null),"null",new cljs.core.Symbol(null,"js","js",-886355190,null),"null",new cljs.core.Symbol(null,"number","number",-1084057331,null),"null",new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),"null",new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null",new cljs.core.Symbol(null,"function","function",-486723946,null),"null",new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),"null"], null), null);
return (fexpr__106448.cljs$core$IFn$_invoke$arity$1 ? fexpr__106448.cljs$core$IFn$_invoke$arity$1(tag) : fexpr__106448.call(null,tag));
})())){
var temp__5739__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(env,tag));
if(cljs.core.truth_(temp__5739__auto__)){
var ps = temp__5739__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps.call(null,protocol));
} else {
return null;
}
} else {
return false;
}
} else {
return false;
}
}
} else {
return and__4174__auto____$2;
}
}
} else {
return and__4174__auto____$1;
}
} else {
return and__4174__auto__;
}
})();
var first_arg_tag = cljs.analyzer.infer_tag(env,cljs.core.first(new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var opt_not_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first_arg_tag,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null))));
var opt_count_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","count","cljs.core/count",-921270233,null))) && (cljs.core.boolean$((function (){var fexpr__106451 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null"], null), null);
return (fexpr__106451.cljs$core$IFn$_invoke$arity$1 ? fexpr__106451.cljs$core$IFn$_invoke$arity$1(first_arg_tag) : fexpr__106451.call(null,first_arg_tag));
})())));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var ftag = cljs.analyzer.infer_tag(env,f);
var js_QMARK_ = (function (){var or__4185__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"js","js",-886355190,null));
if(or__4185__auto__){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null));
if(or__4185__auto____$1){
return or__4185__auto____$1;
} else {
return new cljs.core.Keyword(null,"foreign","foreign",990521149).cljs$core$IFn$_invoke$arity$1(info);
}
}
})();
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4185__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__4185__auto__){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = (function (){var temp__5739__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5739__auto__)){
var ns_str = temp__5739__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_(new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4185__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null),ftag);
if(or__4185__auto__){
return or__4185__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote(f);
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"const","const",1709929842))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__106434 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4174__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4174__auto__)){
return (arity > mfa);
} else {
return and__4174__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (p1__106428_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__106428_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
}));
})),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),(function (p1__106429_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__106429_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
}));
})),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106434,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106434,(1),null);
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("(!(",cljs.core.first(args),"))");
} else {
if(opt_count_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("((",cljs.core.first(args),").length)");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_107872 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.first(args),".",pimpl_107872,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_107873 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_107873,args)),(((mfa_107873 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_107873,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__4185__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var or__4185__auto____$1 = js_QMARK_;
if(cljs.core.truth_(or__4185__auto____$1)){
return or__4185__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,"(",cljs.compiler.comma_sep(args),")");
} else {
if(cljs.core.truth_((function (){var and__4174__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__4174__auto__)){
var G__106455 = new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1);
var fexpr__106454 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null);
return (fexpr__106454.cljs$core$IFn$_invoke$arity$1 ? fexpr__106454.cljs$core$IFn$_invoke$arity$1(G__106455) : fexpr__106454.call(null,G__106455));
} else {
return and__4174__auto__;
}
})())){
var fprop_107874 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(args))].join('');
if(cljs.core.truth_(cljs.analyzer._STAR_fn_invoke_direct_STAR_)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_107874," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_107874,"(",cljs.compiler.comma_sep(args),") : ",f__$1,"(",cljs.compiler.comma_sep(args),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic("(",f__$1,fprop_107874," ? ",f__$1,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fprop_107874,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4(f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")");
}

}
}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__106459){
var map__106460 = p__106459;
var map__106460__$1 = (((((!((map__106460 == null))))?(((((map__106460.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106460.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106460):map__106460);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106460__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106460__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106460__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("(new ",ctor,"(",cljs.compiler.comma_sep(args),"))");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__106462){
var map__106463 = p__106462;
var map__106463__$1 = (((((!((map__106463 == null))))?(((((map__106463.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106463.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106463):map__106463);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106463__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106463__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106463__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5("(",target," = ",val,")");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_global_export(lib)," = goog.global",cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name((function (){var or__4185__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(lib));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(global_exports,cljs.core.name(lib));
}
})()),/\./))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([";"], 0));
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__106466 = cljs.core.deref(cljs.env._STAR_compiler_STAR_);
var map__106466__$1 = (((((!((map__106466 == null))))?(((((map__106466.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106466.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106466):map__106466);
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106466__$1,new cljs.core.Keyword(null,"options","options",99638489));
var js_dependency_index = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106466__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var map__106467 = options;
var map__106467__$1 = (((((!((map__106467 == null))))?(((((map__106467.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106467.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106467):map__106467);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106467__$1,new cljs.core.Keyword(null,"target","target",253001721));
var optimizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106467__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
var vec__106468 = (function (){var libs__$1 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(libs)),deps));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"nodejs","nodejs",321212524),target)){
var map__106474 = cljs.core.group_by(cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__106474__$1 = (((((!((map__106474 == null))))?(((((map__106474.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106474.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106474):map__106474);
var node_libs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106474__$1,true);
var libs_to_load = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106474__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106468,(0),null);
var libs_to_load = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106468,(1),null);
var global_exports_libs = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__106476_107876 = cljs.core.seq(libs_to_load);
var chunk__106477_107877 = null;
var count__106478_107878 = (0);
var i__106479_107879 = (0);
while(true){
if((i__106479_107879 < count__106478_107878)){
var lib_107892 = chunk__106477_107877.cljs$core$IIndexed$_nth$arity$2(null,i__106479_107879);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_107892)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_107892),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107892),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_107892),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107892),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_107892,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107892),"');");
}

}
}
}


var G__107902 = seq__106476_107876;
var G__107903 = chunk__106477_107877;
var G__107904 = count__106478_107878;
var G__107905 = (i__106479_107879 + (1));
seq__106476_107876 = G__107902;
chunk__106477_107877 = G__107903;
count__106478_107878 = G__107904;
i__106479_107879 = G__107905;
continue;
} else {
var temp__5739__auto___107907 = cljs.core.seq(seq__106476_107876);
if(temp__5739__auto___107907){
var seq__106476_107909__$1 = temp__5739__auto___107907;
if(cljs.core.chunked_seq_QMARK_(seq__106476_107909__$1)){
var c__4609__auto___107911 = cljs.core.chunk_first(seq__106476_107909__$1);
var G__107912 = cljs.core.chunk_rest(seq__106476_107909__$1);
var G__107913 = c__4609__auto___107911;
var G__107914 = cljs.core.count(c__4609__auto___107911);
var G__107915 = (0);
seq__106476_107876 = G__107912;
chunk__106477_107877 = G__107913;
count__106478_107878 = G__107914;
i__106479_107879 = G__107915;
continue;
} else {
var lib_107916 = cljs.core.first(seq__106476_107909__$1);
if(((cljs.analyzer.foreign_dep_QMARK_(lib_107916)) && ((!(cljs.core.keyword_identical_QMARK_(optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_107916),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107916),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_107916),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107916),"', 'reload-all');");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lib_107916,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_107916),"');");
}

}
}
}


var G__107918 = cljs.core.next(seq__106476_107909__$1);
var G__107919 = null;
var G__107920 = (0);
var G__107921 = (0);
seq__106476_107876 = G__107918;
chunk__106477_107877 = G__107919;
count__106478_107878 = G__107920;
i__106479_107879 = G__107921;
continue;
}
} else {
}
}
break;
}

var seq__106487_107922 = cljs.core.seq(node_libs);
var chunk__106488_107923 = null;
var count__106489_107924 = (0);
var i__106490_107925 = (0);
while(true){
if((i__106490_107925 < count__106489_107924)){
var lib_107928 = chunk__106488_107923.cljs$core$IIndexed$_nth$arity$2(null,i__106490_107925);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_107928)," = require('",lib_107928,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__107932 = seq__106487_107922;
var G__107933 = chunk__106488_107923;
var G__107934 = count__106489_107924;
var G__107935 = (i__106490_107925 + (1));
seq__106487_107922 = G__107932;
chunk__106488_107923 = G__107933;
count__106489_107924 = G__107934;
i__106490_107925 = G__107935;
continue;
} else {
var temp__5739__auto___107936 = cljs.core.seq(seq__106487_107922);
if(temp__5739__auto___107936){
var seq__106487_107937__$1 = temp__5739__auto___107936;
if(cljs.core.chunked_seq_QMARK_(seq__106487_107937__$1)){
var c__4609__auto___107938 = cljs.core.chunk_first(seq__106487_107937__$1);
var G__107940 = cljs.core.chunk_rest(seq__106487_107937__$1);
var G__107941 = c__4609__auto___107938;
var G__107942 = cljs.core.count(c__4609__auto___107938);
var G__107943 = (0);
seq__106487_107922 = G__107940;
chunk__106488_107923 = G__107941;
count__106489_107924 = G__107942;
i__106490_107925 = G__107943;
continue;
} else {
var lib_107944 = cljs.core.first(seq__106487_107937__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns_name),".",cljs.analyzer.munge_node_lib(lib_107944)," = require('",lib_107944,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["');"], 0));


var G__107945 = cljs.core.next(seq__106487_107937__$1);
var G__107946 = null;
var G__107947 = (0);
var G__107948 = (0);
seq__106487_107922 = G__107945;
chunk__106488_107923 = G__107946;
count__106489_107924 = G__107947;
i__106490_107925 = G__107948;
continue;
}
} else {
}
}
break;
}

var seq__106491_107949 = cljs.core.seq(global_exports_libs);
var chunk__106492_107950 = null;
var count__106493_107951 = (0);
var i__106494_107952 = (0);
while(true){
if((i__106494_107952 < count__106493_107951)){
var lib_107953 = chunk__106492_107950.cljs$core$IIndexed$_nth$arity$2(null,i__106494_107952);
var map__106502_107957 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_107953));
var map__106502_107958__$1 = (((((!((map__106502_107957 == null))))?(((((map__106502_107957.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106502_107957.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106502_107957):map__106502_107957);
var global_exports_107959 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106502_107958__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export(ns_name,global_exports_107959,lib_107953);


var G__107963 = seq__106491_107949;
var G__107964 = chunk__106492_107950;
var G__107965 = count__106493_107951;
var G__107966 = (i__106494_107952 + (1));
seq__106491_107949 = G__107963;
chunk__106492_107950 = G__107964;
count__106493_107951 = G__107965;
i__106494_107952 = G__107966;
continue;
} else {
var temp__5739__auto___107967 = cljs.core.seq(seq__106491_107949);
if(temp__5739__auto___107967){
var seq__106491_107968__$1 = temp__5739__auto___107967;
if(cljs.core.chunked_seq_QMARK_(seq__106491_107968__$1)){
var c__4609__auto___107969 = cljs.core.chunk_first(seq__106491_107968__$1);
var G__107970 = cljs.core.chunk_rest(seq__106491_107968__$1);
var G__107971 = c__4609__auto___107969;
var G__107972 = cljs.core.count(c__4609__auto___107969);
var G__107973 = (0);
seq__106491_107949 = G__107970;
chunk__106492_107950 = G__107971;
count__106493_107951 = G__107972;
i__106494_107952 = G__107973;
continue;
} else {
var lib_107977 = cljs.core.first(seq__106491_107968__$1);
var map__106512_107978 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(js_dependency_index,cljs.core.name(lib_107977));
var map__106512_107979__$1 = (((((!((map__106512_107978 == null))))?(((((map__106512_107978.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106512_107978.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106512_107978):map__106512_107978);
var global_exports_107980 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106512_107979__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export(ns_name,global_exports_107980,lib_107977);


var G__107982 = cljs.core.next(seq__106491_107968__$1);
var G__107983 = null;
var G__107984 = (0);
var G__107985 = (0);
seq__106491_107949 = G__107982;
chunk__106492_107950 = G__107983;
count__106493_107951 = G__107984;
i__106494_107952 = G__107985;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic("if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([loaded_libs,");"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__106521){
var map__106522 = p__106521;
var map__106522__$1 = (((((!((map__106522 == null))))?(((((map__106522.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106522.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106522):map__106522);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106522__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-env","repl-env",-1976503928).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("'nil';");
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__106527){
var map__106528 = p__106527;
var map__106528__$1 = (((((!((map__106528 == null))))?(((((map__106528.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106528.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106528):map__106528);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106528__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');");

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("goog.require('cljs.core');");

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs(requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs(uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"deftype","deftype",340294561),(function (p__106530){
var map__106531 = p__106530;
var map__106531__$1 = (((((!((map__106531 == null))))?(((((map__106531.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106531.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106531):map__106531);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106531__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106531__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106531__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106531__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106531__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__106533_108024 = cljs.core.seq(protocols);
var chunk__106534_108025 = null;
var count__106535_108026 = (0);
var i__106536_108027 = (0);
while(true){
if((i__106536_108027 < count__106535_108026)){
var protocol_108028 = chunk__106534_108025.cljs$core$IIndexed$_nth$arity$2(null,i__106536_108027);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_108028)),"}");


var G__108032 = seq__106533_108024;
var G__108033 = chunk__106534_108025;
var G__108034 = count__106535_108026;
var G__108035 = (i__106536_108027 + (1));
seq__106533_108024 = G__108032;
chunk__106534_108025 = G__108033;
count__106535_108026 = G__108034;
i__106536_108027 = G__108035;
continue;
} else {
var temp__5739__auto___108037 = cljs.core.seq(seq__106533_108024);
if(temp__5739__auto___108037){
var seq__106533_108038__$1 = temp__5739__auto___108037;
if(cljs.core.chunked_seq_QMARK_(seq__106533_108038__$1)){
var c__4609__auto___108039 = cljs.core.chunk_first(seq__106533_108038__$1);
var G__108040 = cljs.core.chunk_rest(seq__106533_108038__$1);
var G__108041 = c__4609__auto___108039;
var G__108042 = cljs.core.count(c__4609__auto___108039);
var G__108043 = (0);
seq__106533_108024 = G__108040;
chunk__106534_108025 = G__108041;
count__106535_108026 = G__108042;
i__106536_108027 = G__108043;
continue;
} else {
var protocol_108044 = cljs.core.first(seq__106533_108038__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_108044)),"}");


var G__108045 = cljs.core.next(seq__106533_108038__$1);
var G__108046 = null;
var G__108047 = (0);
var G__108048 = (0);
seq__106533_108024 = G__108045;
chunk__106534_108025 = G__108046;
count__106535_108026 = G__108047;
i__106536_108027 = G__108048;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__106537_108049 = cljs.core.seq(fields__$1);
var chunk__106538_108050 = null;
var count__106539_108051 = (0);
var i__106540_108052 = (0);
while(true){
if((i__106540_108052 < count__106539_108051)){
var fld_108055 = chunk__106538_108050.cljs$core$IIndexed$_nth$arity$2(null,i__106540_108052);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_108055," = ",fld_108055,";");


var G__108056 = seq__106537_108049;
var G__108057 = chunk__106538_108050;
var G__108058 = count__106539_108051;
var G__108059 = (i__106540_108052 + (1));
seq__106537_108049 = G__108056;
chunk__106538_108050 = G__108057;
count__106539_108051 = G__108058;
i__106540_108052 = G__108059;
continue;
} else {
var temp__5739__auto___108061 = cljs.core.seq(seq__106537_108049);
if(temp__5739__auto___108061){
var seq__106537_108063__$1 = temp__5739__auto___108061;
if(cljs.core.chunked_seq_QMARK_(seq__106537_108063__$1)){
var c__4609__auto___108065 = cljs.core.chunk_first(seq__106537_108063__$1);
var G__108066 = cljs.core.chunk_rest(seq__106537_108063__$1);
var G__108067 = c__4609__auto___108065;
var G__108068 = cljs.core.count(c__4609__auto___108065);
var G__108069 = (0);
seq__106537_108049 = G__108066;
chunk__106538_108050 = G__108067;
count__106539_108051 = G__108068;
i__106540_108052 = G__108069;
continue;
} else {
var fld_108070 = cljs.core.first(seq__106537_108063__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_108070," = ",fld_108070,";");


var G__108071 = cljs.core.next(seq__106537_108063__$1);
var G__108072 = null;
var G__108073 = (0);
var G__108074 = (0);
seq__106537_108049 = G__108071;
chunk__106538_108050 = G__108072;
count__106539_108051 = G__108073;
i__106540_108052 = G__108074;
continue;
}
} else {
}
}
break;
}

var seq__106541_108075 = cljs.core.seq(pmasks);
var chunk__106542_108076 = null;
var count__106543_108077 = (0);
var i__106544_108078 = (0);
while(true){
if((i__106544_108078 < count__106543_108077)){
var vec__106551_108079 = chunk__106542_108076.cljs$core$IIndexed$_nth$arity$2(null,i__106544_108078);
var pno_108080 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106551_108079,(0),null);
var pmask_108081 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106551_108079,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_108080,"$ = ",pmask_108081,";");


var G__108082 = seq__106541_108075;
var G__108083 = chunk__106542_108076;
var G__108084 = count__106543_108077;
var G__108085 = (i__106544_108078 + (1));
seq__106541_108075 = G__108082;
chunk__106542_108076 = G__108083;
count__106543_108077 = G__108084;
i__106544_108078 = G__108085;
continue;
} else {
var temp__5739__auto___108086 = cljs.core.seq(seq__106541_108075);
if(temp__5739__auto___108086){
var seq__106541_108087__$1 = temp__5739__auto___108086;
if(cljs.core.chunked_seq_QMARK_(seq__106541_108087__$1)){
var c__4609__auto___108088 = cljs.core.chunk_first(seq__106541_108087__$1);
var G__108089 = cljs.core.chunk_rest(seq__106541_108087__$1);
var G__108090 = c__4609__auto___108088;
var G__108091 = cljs.core.count(c__4609__auto___108088);
var G__108092 = (0);
seq__106541_108075 = G__108089;
chunk__106542_108076 = G__108090;
count__106543_108077 = G__108091;
i__106544_108078 = G__108092;
continue;
} else {
var vec__106555_108093 = cljs.core.first(seq__106541_108087__$1);
var pno_108094 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106555_108093,(0),null);
var pmask_108095 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106555_108093,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_108094,"$ = ",pmask_108095,";");


var G__108096 = cljs.core.next(seq__106541_108087__$1);
var G__108097 = null;
var G__108098 = (0);
var G__108099 = (0);
seq__106541_108075 = G__108096;
chunk__106542_108076 = G__108097;
count__106543_108077 = G__108098;
i__106544_108078 = G__108099;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("});");

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"defrecord","defrecord",-1367493418),(function (p__106558){
var map__106559 = p__106558;
var map__106559__$1 = (((((!((map__106559 == null))))?(((((map__106559.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106559.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106559):map__106559);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106559__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106559__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106559__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106559__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106559__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("/**");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("* @constructor");

var seq__106561_108112 = cljs.core.seq(protocols);
var chunk__106562_108113 = null;
var count__106563_108114 = (0);
var i__106564_108115 = (0);
while(true){
if((i__106564_108115 < count__106563_108114)){
var protocol_108116 = chunk__106562_108113.cljs$core$IIndexed$_nth$arity$2(null,i__106564_108115);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_108116)),"}");


var G__108117 = seq__106561_108112;
var G__108118 = chunk__106562_108113;
var G__108119 = count__106563_108114;
var G__108120 = (i__106564_108115 + (1));
seq__106561_108112 = G__108117;
chunk__106562_108113 = G__108118;
count__106563_108114 = G__108119;
i__106564_108115 = G__108120;
continue;
} else {
var temp__5739__auto___108121 = cljs.core.seq(seq__106561_108112);
if(temp__5739__auto___108121){
var seq__106561_108122__$1 = temp__5739__auto___108121;
if(cljs.core.chunked_seq_QMARK_(seq__106561_108122__$1)){
var c__4609__auto___108123 = cljs.core.chunk_first(seq__106561_108122__$1);
var G__108124 = cljs.core.chunk_rest(seq__106561_108122__$1);
var G__108125 = c__4609__auto___108123;
var G__108126 = cljs.core.count(c__4609__auto___108123);
var G__108127 = (0);
seq__106561_108112 = G__108124;
chunk__106562_108113 = G__108125;
count__106563_108114 = G__108126;
i__106564_108115 = G__108127;
continue;
} else {
var protocol_108128 = cljs.core.first(seq__106561_108122__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3(" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_108128)),"}");


var G__108129 = cljs.core.next(seq__106561_108122__$1);
var G__108130 = null;
var G__108131 = (0);
var G__108132 = (0);
seq__106561_108112 = G__108129;
chunk__106562_108113 = G__108130;
count__106563_108114 = G__108131;
i__106564_108115 = G__108132;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("*/");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){");

var seq__106567_108135 = cljs.core.seq(fields__$1);
var chunk__106568_108136 = null;
var count__106569_108137 = (0);
var i__106570_108138 = (0);
while(true){
if((i__106570_108138 < count__106569_108137)){
var fld_108139 = chunk__106568_108136.cljs$core$IIndexed$_nth$arity$2(null,i__106570_108138);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_108139," = ",fld_108139,";");


var G__108140 = seq__106567_108135;
var G__108141 = chunk__106568_108136;
var G__108142 = count__106569_108137;
var G__108143 = (i__106570_108138 + (1));
seq__106567_108135 = G__108140;
chunk__106568_108136 = G__108141;
count__106569_108137 = G__108142;
i__106570_108138 = G__108143;
continue;
} else {
var temp__5739__auto___108144 = cljs.core.seq(seq__106567_108135);
if(temp__5739__auto___108144){
var seq__106567_108145__$1 = temp__5739__auto___108144;
if(cljs.core.chunked_seq_QMARK_(seq__106567_108145__$1)){
var c__4609__auto___108146 = cljs.core.chunk_first(seq__106567_108145__$1);
var G__108147 = cljs.core.chunk_rest(seq__106567_108145__$1);
var G__108148 = c__4609__auto___108146;
var G__108149 = cljs.core.count(c__4609__auto___108146);
var G__108150 = (0);
seq__106567_108135 = G__108147;
chunk__106568_108136 = G__108148;
count__106569_108137 = G__108149;
i__106570_108138 = G__108150;
continue;
} else {
var fld_108151 = cljs.core.first(seq__106567_108145__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.",fld_108151," = ",fld_108151,";");


var G__108152 = cljs.core.next(seq__106567_108145__$1);
var G__108153 = null;
var G__108154 = (0);
var G__108155 = (0);
seq__106567_108135 = G__108152;
chunk__106568_108136 = G__108153;
count__106569_108137 = G__108154;
i__106570_108138 = G__108155;
continue;
}
} else {
}
}
break;
}

var seq__106573_108156 = cljs.core.seq(pmasks);
var chunk__106574_108157 = null;
var count__106575_108158 = (0);
var i__106576_108159 = (0);
while(true){
if((i__106576_108159 < count__106575_108158)){
var vec__106583_108160 = chunk__106574_108157.cljs$core$IIndexed$_nth$arity$2(null,i__106576_108159);
var pno_108161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106583_108160,(0),null);
var pmask_108162 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106583_108160,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_108161,"$ = ",pmask_108162,";");


var G__108163 = seq__106573_108156;
var G__108164 = chunk__106574_108157;
var G__108165 = count__106575_108158;
var G__108166 = (i__106576_108159 + (1));
seq__106573_108156 = G__108163;
chunk__106574_108157 = G__108164;
count__106575_108158 = G__108165;
i__106576_108159 = G__108166;
continue;
} else {
var temp__5739__auto___108167 = cljs.core.seq(seq__106573_108156);
if(temp__5739__auto___108167){
var seq__106573_108168__$1 = temp__5739__auto___108167;
if(cljs.core.chunked_seq_QMARK_(seq__106573_108168__$1)){
var c__4609__auto___108169 = cljs.core.chunk_first(seq__106573_108168__$1);
var G__108170 = cljs.core.chunk_rest(seq__106573_108168__$1);
var G__108171 = c__4609__auto___108169;
var G__108172 = cljs.core.count(c__4609__auto___108169);
var G__108173 = (0);
seq__106573_108156 = G__108170;
chunk__106574_108157 = G__108171;
count__106575_108158 = G__108172;
i__106576_108159 = G__108173;
continue;
} else {
var vec__106591_108174 = cljs.core.first(seq__106573_108168__$1);
var pno_108175 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106591_108174,(0),null);
var pmask_108176 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106591_108174,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5("this.cljs$lang$protocol_mask$partition",pno_108175,"$ = ",pmask_108176,";");


var G__108178 = cljs.core.next(seq__106573_108168__$1);
var G__108179 = null;
var G__108180 = (0);
var G__108181 = (0);
seq__106573_108156 = G__108178;
chunk__106574_108157 = G__108179;
count__106575_108158 = G__108180;
i__106576_108159 = G__108181;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("});");

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__106594){
var map__106595 = p__106594;
var map__106595__$1 = (((((!((map__106595 == null))))?(((((map__106595.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106595.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106595):map__106595);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106595__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106595__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106595__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106595__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106595__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"host-field","host-field",-72662140),(function (ast){
return cljs.compiler.emit_dot(ast);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"host-call","host-call",1059629755),(function (ast){
return cljs.compiler.emit_dot(ast);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__106600){
var map__106601 = p__106600;
var map__106601__$1 = (((((!((map__106601 == null))))?(((((map__106601.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__106601.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__106601):map__106601);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106601__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106601__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106601__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106601__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__106601__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__4174__auto__ = code;
if(cljs.core.truth_(and__4174__auto__)){
var G__106604 = clojure.string.trim(code);
var G__106605 = "/*";
return goog.string.startsWith(G__106604,G__106605);
} else {
return and__4174__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
var env__45297__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1("return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(code);
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__45297__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1(";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1("goog.require('cljs.core');");

var seq__106616 = cljs.core.seq(table);
var chunk__106617 = null;
var count__106618 = (0);
var i__106619 = (0);
while(true){
if((i__106619 < count__106618)){
var vec__106626 = chunk__106617.cljs$core$IIndexed$_nth$arity$2(null,i__106619);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106626,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106626,(1),null);
var ns_108221 = cljs.core.namespace(sym);
var name_108222 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(";\n");


var G__108230 = seq__106616;
var G__108231 = chunk__106617;
var G__108232 = count__106618;
var G__108233 = (i__106619 + (1));
seq__106616 = G__108230;
chunk__106617 = G__108231;
count__106618 = G__108232;
i__106619 = G__108233;
continue;
} else {
var temp__5739__auto__ = cljs.core.seq(seq__106616);
if(temp__5739__auto__){
var seq__106616__$1 = temp__5739__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__106616__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__106616__$1);
var G__108234 = cljs.core.chunk_rest(seq__106616__$1);
var G__108235 = c__4609__auto__;
var G__108236 = cljs.core.count(c__4609__auto__);
var G__108237 = (0);
seq__106616 = G__108234;
chunk__106617 = G__108235;
count__106618 = G__108236;
i__106619 = G__108237;
continue;
} else {
var vec__106629 = cljs.core.first(seq__106616__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106629,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106629,(1),null);
var ns_108244 = cljs.core.namespace(sym);
var name_108245 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3("cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1(";\n");


var G__108255 = cljs.core.next(seq__106616__$1);
var G__108256 = null;
var G__108257 = (0);
var G__108258 = (0);
seq__106616 = G__108255;
chunk__106617 = G__108256;
count__106618 = G__108257;
i__106619 = G__108258;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__106633 = arguments.length;
switch (G__106633) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?new cljs.core.Keyword("cljs.analyzer","externs","cljs.analyzer/externs",893359239).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cljs.env._STAR_compiler_STAR_)):null));
}));

(cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq(cljs.core.keys(externs));
while(true){
if(ks){
var k_108286 = cljs.core.first(ks);
var vec__106634_108287 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(prefix,k_108286);
var top_108288 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__106634_108287,(0),null);
var prefix_SINGLEQUOTE__108289 = vec__106634_108287;
if(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_108286)) && ((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(known_externs,prefix_SINGLEQUOTE__108289) == null)))){
if((!(((cljs.core.contains_QMARK_(cljs.core.deref(top_level),top_108288)) || (cljs.core.contains_QMARK_(known_externs,top_108288)))))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3("var ",clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__108289)),";");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(top_level,cljs.core.conj,top_108288);
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2(clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,prefix_SINGLEQUOTE__108289)),";");
}
} else {
}

var m_108290 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(externs,k_108286);
if(cljs.core.empty_QMARK_(m_108290)){
} else {
cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4(prefix_SINGLEQUOTE__108289,m_108290,top_level,known_externs);
}

var G__108291 = cljs.core.next(ks);
ks = G__108291;
continue;
} else {
return null;
}
break;
}
}));

(cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=cljs.compiler.js.map
