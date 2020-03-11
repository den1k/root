goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__103584){
var vec__103585 = p__103584;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103585,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103585,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources(sources);
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1.call(null,a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1.call(null,b)));
});
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__103592 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103592,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103592,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103592,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103592,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103592,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5739__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(seg));
if(cljs.core.truth_(temp__5739__auto__)){
var name__$1 = temp__5739__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__103602 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103602,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103602,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103602,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103602,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103602,(4),null);
var vec__103605 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103605,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103605,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103605,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103605,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103605,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4185__auto__ = source;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4185__auto__ = line;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4185__auto__ = col;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4185__auto__ = name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta(nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__103617 = segmap;
var map__103617__$1 = (((((!((map__103617 == null))))?(((((map__103617.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__103617.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__103617):map__103617);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103617__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103617__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103617__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103617__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103617__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
}),cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__103624 = arguments.length;
switch (G__103624) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
}));

(cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by(cljs.source_map.source_compare(sources));
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__103631 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__104533 = cljs.core.next(segs__$1);
var G__104534 = nrelseg;
var G__104535 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__104533;
relseg__$1 = G__104534;
result__$1 = G__104535;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103631,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103631,(1),null);
var G__104539 = (gline + (1));
var G__104540 = cljs.core.next(lines__$1);
var G__104541 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__104542 = result__$1;
gline = G__104539;
lines__$1 = G__104540;
relseg = G__104541;
result = G__104542;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2);

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__103635 = segmap;
var map__103635__$1 = (((((!((map__103635 == null))))?(((((map__103635.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__103635.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__103635):map__103635);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103635__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103635__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103635__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103635__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__103635__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2((function (p1__103634_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__103634_SHARP_,d__$1);
}),cljs.core.PersistentVector.EMPTY));
}),cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__103638 = arguments.length;
switch (G__103638) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
}));

(cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__103642 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__104554 = cljs.core.next(segs__$1);
var G__104555 = nrelseg;
var G__104556 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__104554;
relseg__$1 = G__104555;
result__$1 = G__104556;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103642,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103642,(1),null);
var G__104557 = (gline + (1));
var G__104558 = cljs.core.next(lines__$1);
var G__104559 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__104560 = result__$1;
gline = G__104557;
lines__$1 = G__104558;
relseg = G__104559;
result = G__104560;
continue;
} else {
return result;
}
break;
}
}));

(cljs.source_map.decode.cljs$lang$maxFixedArity = 2);

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,(function (p__103645){
var vec__103646 = p__103645;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103646,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103646,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103646,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103646,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103646,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
}));

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (cols__$1,p__103649){
var vec__103651 = p__103649;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103651,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103651,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103651,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103651,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103651,(4),null);
var seg = vec__103651;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,cljs.core.deref(relseg));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,(function (p__103656){
var vec__103657 = p__103656;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103657,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103657,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103657,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103657,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103657,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4185__auto__ = name;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return lname;
}
})()], null);
}));

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
}),cljs.core.PersistentVector.EMPTY,cols));
}),cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__4185__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5737__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5737__auto__)){
var name = temp__5737__auto__;
var idx = (function (){var temp__5737__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(names__GT_idx),name);
if(cljs.core.truth_(temp__5737__auto____$1)){
var idx = temp__5737__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref(name_idx);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segv,idx);
} else {
return segv;
}
});
var encode_cols = (function (infos,source_idx,line,col){
var seq__103664 = cljs.core.seq(infos);
var chunk__103665 = null;
var count__103666 = (0);
var i__103667 = (0);
while(true){
if((i__103667 < count__103666)){
var info = chunk__103665.cljs$core$IIndexed$_nth$arity$2(null,i__103667);
var segv_104576 = info__GT_segv(info,source_idx,line,col);
var gline_104577 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_104578 = cljs.core.count(cljs.core.deref(lines));
if((gline_104577 > (lc_104578 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__103664,chunk__103665,count__103666,i__103667,segv_104576,gline_104577,lc_104578,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_104577 - (lc_104578 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_104576], null));
});})(seq__103664,chunk__103665,count__103666,i__103667,segv_104576,gline_104577,lc_104578,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__103664,chunk__103665,count__103666,i__103667,segv_104576,gline_104577,lc_104578,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104577], null),cljs.core.conj,segv_104576);
});})(seq__103664,chunk__103665,count__103666,i__103667,segv_104576,gline_104577,lc_104578,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__104579 = seq__103664;
var G__104580 = chunk__103665;
var G__104581 = count__103666;
var G__104582 = (i__103667 + (1));
seq__103664 = G__104579;
chunk__103665 = G__104580;
count__103666 = G__104581;
i__103667 = G__104582;
continue;
} else {
var temp__5739__auto__ = cljs.core.seq(seq__103664);
if(temp__5739__auto__){
var seq__103664__$1 = temp__5739__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__103664__$1)){
var c__4609__auto__ = cljs.core.chunk_first(seq__103664__$1);
var G__104583 = cljs.core.chunk_rest(seq__103664__$1);
var G__104584 = c__4609__auto__;
var G__104585 = cljs.core.count(c__4609__auto__);
var G__104586 = (0);
seq__103664 = G__104583;
chunk__103665 = G__104584;
count__103666 = G__104585;
i__103667 = G__104586;
continue;
} else {
var info = cljs.core.first(seq__103664__$1);
var segv_104587 = info__GT_segv(info,source_idx,line,col);
var gline_104588 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_104589 = cljs.core.count(cljs.core.deref(lines));
if((gline_104588 > (lc_104589 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__103664,chunk__103665,count__103666,i__103667,segv_104587,gline_104588,lc_104589,info,seq__103664__$1,temp__5739__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_104588 - (lc_104589 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_104587], null));
});})(seq__103664,chunk__103665,count__103666,i__103667,segv_104587,gline_104588,lc_104589,info,seq__103664__$1,temp__5739__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__103664,chunk__103665,count__103666,i__103667,segv_104587,gline_104588,lc_104589,info,seq__103664__$1,temp__5739__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104588], null),cljs.core.conj,segv_104587);
});})(seq__103664,chunk__103665,count__103666,i__103667,segv_104587,gline_104588,lc_104589,info,seq__103664__$1,temp__5739__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__104593 = cljs.core.next(seq__103664__$1);
var G__104594 = null;
var G__104595 = (0);
var G__104596 = (0);
seq__103664 = G__104593;
chunk__103665 = G__104594;
count__103666 = G__104595;
i__103667 = G__104596;
continue;
}
} else {
return null;
}
}
break;
}
});
var seq__103680_104598 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__103681_104599 = null;
var count__103682_104600 = (0);
var i__103683_104601 = (0);
while(true){
if((i__103683_104601 < count__103682_104600)){
var vec__103901_104606 = chunk__103681_104599.cljs$core$IIndexed$_nth$arity$2(null,i__103683_104601);
var source_idx_104607 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103901_104606,(0),null);
var vec__103904_104608 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103901_104606,(1),null);
var __104609 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103904_104608,(0),null);
var lines_104610__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103904_104608,(1),null);
var seq__103907_104611 = cljs.core.seq(lines_104610__$1);
var chunk__103908_104612 = null;
var count__103909_104613 = (0);
var i__103910_104614 = (0);
while(true){
if((i__103910_104614 < count__103909_104613)){
var vec__103956_104615 = chunk__103908_104612.cljs$core$IIndexed$_nth$arity$2(null,i__103910_104614);
var line_104616 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103956_104615,(0),null);
var cols_104617 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103956_104615,(1),null);
var seq__103959_104621 = cljs.core.seq(cols_104617);
var chunk__103960_104622 = null;
var count__103961_104623 = (0);
var i__103962_104624 = (0);
while(true){
if((i__103962_104624 < count__103961_104623)){
var vec__103970_104625 = chunk__103960_104622.cljs$core$IIndexed$_nth$arity$2(null,i__103962_104624);
var col_104626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103970_104625,(0),null);
var infos_104627 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103970_104625,(1),null);
encode_cols(infos_104627,source_idx_104607,line_104616,col_104626);


var G__104629 = seq__103959_104621;
var G__104630 = chunk__103960_104622;
var G__104631 = count__103961_104623;
var G__104632 = (i__103962_104624 + (1));
seq__103959_104621 = G__104629;
chunk__103960_104622 = G__104630;
count__103961_104623 = G__104631;
i__103962_104624 = G__104632;
continue;
} else {
var temp__5739__auto___104634 = cljs.core.seq(seq__103959_104621);
if(temp__5739__auto___104634){
var seq__103959_104635__$1 = temp__5739__auto___104634;
if(cljs.core.chunked_seq_QMARK_(seq__103959_104635__$1)){
var c__4609__auto___104636 = cljs.core.chunk_first(seq__103959_104635__$1);
var G__104637 = cljs.core.chunk_rest(seq__103959_104635__$1);
var G__104638 = c__4609__auto___104636;
var G__104639 = cljs.core.count(c__4609__auto___104636);
var G__104640 = (0);
seq__103959_104621 = G__104637;
chunk__103960_104622 = G__104638;
count__103961_104623 = G__104639;
i__103962_104624 = G__104640;
continue;
} else {
var vec__103974_104641 = cljs.core.first(seq__103959_104635__$1);
var col_104642 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103974_104641,(0),null);
var infos_104643 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103974_104641,(1),null);
encode_cols(infos_104643,source_idx_104607,line_104616,col_104642);


var G__104644 = cljs.core.next(seq__103959_104635__$1);
var G__104645 = null;
var G__104646 = (0);
var G__104647 = (0);
seq__103959_104621 = G__104644;
chunk__103960_104622 = G__104645;
count__103961_104623 = G__104646;
i__103962_104624 = G__104647;
continue;
}
} else {
}
}
break;
}


var G__104648 = seq__103907_104611;
var G__104649 = chunk__103908_104612;
var G__104650 = count__103909_104613;
var G__104651 = (i__103910_104614 + (1));
seq__103907_104611 = G__104648;
chunk__103908_104612 = G__104649;
count__103909_104613 = G__104650;
i__103910_104614 = G__104651;
continue;
} else {
var temp__5739__auto___104652 = cljs.core.seq(seq__103907_104611);
if(temp__5739__auto___104652){
var seq__103907_104653__$1 = temp__5739__auto___104652;
if(cljs.core.chunked_seq_QMARK_(seq__103907_104653__$1)){
var c__4609__auto___104654 = cljs.core.chunk_first(seq__103907_104653__$1);
var G__104655 = cljs.core.chunk_rest(seq__103907_104653__$1);
var G__104656 = c__4609__auto___104654;
var G__104657 = cljs.core.count(c__4609__auto___104654);
var G__104658 = (0);
seq__103907_104611 = G__104655;
chunk__103908_104612 = G__104656;
count__103909_104613 = G__104657;
i__103910_104614 = G__104658;
continue;
} else {
var vec__103978_104659 = cljs.core.first(seq__103907_104653__$1);
var line_104660 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103978_104659,(0),null);
var cols_104661 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103978_104659,(1),null);
var seq__103981_104662 = cljs.core.seq(cols_104661);
var chunk__103982_104663 = null;
var count__103983_104664 = (0);
var i__103984_104665 = (0);
while(true){
if((i__103984_104665 < count__103983_104664)){
var vec__103991_104666 = chunk__103982_104663.cljs$core$IIndexed$_nth$arity$2(null,i__103984_104665);
var col_104667 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103991_104666,(0),null);
var infos_104668 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103991_104666,(1),null);
encode_cols(infos_104668,source_idx_104607,line_104660,col_104667);


var G__104669 = seq__103981_104662;
var G__104670 = chunk__103982_104663;
var G__104671 = count__103983_104664;
var G__104672 = (i__103984_104665 + (1));
seq__103981_104662 = G__104669;
chunk__103982_104663 = G__104670;
count__103983_104664 = G__104671;
i__103984_104665 = G__104672;
continue;
} else {
var temp__5739__auto___104673__$1 = cljs.core.seq(seq__103981_104662);
if(temp__5739__auto___104673__$1){
var seq__103981_104674__$1 = temp__5739__auto___104673__$1;
if(cljs.core.chunked_seq_QMARK_(seq__103981_104674__$1)){
var c__4609__auto___104675 = cljs.core.chunk_first(seq__103981_104674__$1);
var G__104676 = cljs.core.chunk_rest(seq__103981_104674__$1);
var G__104677 = c__4609__auto___104675;
var G__104678 = cljs.core.count(c__4609__auto___104675);
var G__104679 = (0);
seq__103981_104662 = G__104676;
chunk__103982_104663 = G__104677;
count__103983_104664 = G__104678;
i__103984_104665 = G__104679;
continue;
} else {
var vec__103996_104680 = cljs.core.first(seq__103981_104674__$1);
var col_104681 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103996_104680,(0),null);
var infos_104682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103996_104680,(1),null);
encode_cols(infos_104682,source_idx_104607,line_104660,col_104681);


var G__104683 = cljs.core.next(seq__103981_104674__$1);
var G__104684 = null;
var G__104685 = (0);
var G__104686 = (0);
seq__103981_104662 = G__104683;
chunk__103982_104663 = G__104684;
count__103983_104664 = G__104685;
i__103984_104665 = G__104686;
continue;
}
} else {
}
}
break;
}


var G__104687 = cljs.core.next(seq__103907_104653__$1);
var G__104688 = null;
var G__104689 = (0);
var G__104690 = (0);
seq__103907_104611 = G__104687;
chunk__103908_104612 = G__104688;
count__103909_104613 = G__104689;
i__103910_104614 = G__104690;
continue;
}
} else {
}
}
break;
}


var G__104691 = seq__103680_104598;
var G__104692 = chunk__103681_104599;
var G__104693 = count__103682_104600;
var G__104694 = (i__103683_104601 + (1));
seq__103680_104598 = G__104691;
chunk__103681_104599 = G__104692;
count__103682_104600 = G__104693;
i__103683_104601 = G__104694;
continue;
} else {
var temp__5739__auto___104695 = cljs.core.seq(seq__103680_104598);
if(temp__5739__auto___104695){
var seq__103680_104696__$1 = temp__5739__auto___104695;
if(cljs.core.chunked_seq_QMARK_(seq__103680_104696__$1)){
var c__4609__auto___104697 = cljs.core.chunk_first(seq__103680_104696__$1);
var G__104698 = cljs.core.chunk_rest(seq__103680_104696__$1);
var G__104699 = c__4609__auto___104697;
var G__104700 = cljs.core.count(c__4609__auto___104697);
var G__104701 = (0);
seq__103680_104598 = G__104698;
chunk__103681_104599 = G__104699;
count__103682_104600 = G__104700;
i__103683_104601 = G__104701;
continue;
} else {
var vec__103999_104703 = cljs.core.first(seq__103680_104696__$1);
var source_idx_104704 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103999_104703,(0),null);
var vec__104002_104705 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__103999_104703,(1),null);
var __104706 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104002_104705,(0),null);
var lines_104707__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104002_104705,(1),null);
var seq__104005_104708 = cljs.core.seq(lines_104707__$1);
var chunk__104006_104709 = null;
var count__104007_104710 = (0);
var i__104008_104711 = (0);
while(true){
if((i__104008_104711 < count__104007_104710)){
var vec__104056_104712 = chunk__104006_104709.cljs$core$IIndexed$_nth$arity$2(null,i__104008_104711);
var line_104713 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104056_104712,(0),null);
var cols_104714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104056_104712,(1),null);
var seq__104060_104715 = cljs.core.seq(cols_104714);
var chunk__104061_104716 = null;
var count__104062_104717 = (0);
var i__104063_104718 = (0);
while(true){
if((i__104063_104718 < count__104062_104717)){
var vec__104070_104719 = chunk__104061_104716.cljs$core$IIndexed$_nth$arity$2(null,i__104063_104718);
var col_104720 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104070_104719,(0),null);
var infos_104721 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104070_104719,(1),null);
encode_cols(infos_104721,source_idx_104704,line_104713,col_104720);


var G__104722 = seq__104060_104715;
var G__104723 = chunk__104061_104716;
var G__104724 = count__104062_104717;
var G__104725 = (i__104063_104718 + (1));
seq__104060_104715 = G__104722;
chunk__104061_104716 = G__104723;
count__104062_104717 = G__104724;
i__104063_104718 = G__104725;
continue;
} else {
var temp__5739__auto___104726__$1 = cljs.core.seq(seq__104060_104715);
if(temp__5739__auto___104726__$1){
var seq__104060_104727__$1 = temp__5739__auto___104726__$1;
if(cljs.core.chunked_seq_QMARK_(seq__104060_104727__$1)){
var c__4609__auto___104728 = cljs.core.chunk_first(seq__104060_104727__$1);
var G__104729 = cljs.core.chunk_rest(seq__104060_104727__$1);
var G__104730 = c__4609__auto___104728;
var G__104731 = cljs.core.count(c__4609__auto___104728);
var G__104732 = (0);
seq__104060_104715 = G__104729;
chunk__104061_104716 = G__104730;
count__104062_104717 = G__104731;
i__104063_104718 = G__104732;
continue;
} else {
var vec__104074_104733 = cljs.core.first(seq__104060_104727__$1);
var col_104734 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104074_104733,(0),null);
var infos_104735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104074_104733,(1),null);
encode_cols(infos_104735,source_idx_104704,line_104713,col_104734);


var G__104736 = cljs.core.next(seq__104060_104727__$1);
var G__104737 = null;
var G__104738 = (0);
var G__104739 = (0);
seq__104060_104715 = G__104736;
chunk__104061_104716 = G__104737;
count__104062_104717 = G__104738;
i__104063_104718 = G__104739;
continue;
}
} else {
}
}
break;
}


var G__104740 = seq__104005_104708;
var G__104741 = chunk__104006_104709;
var G__104742 = count__104007_104710;
var G__104743 = (i__104008_104711 + (1));
seq__104005_104708 = G__104740;
chunk__104006_104709 = G__104741;
count__104007_104710 = G__104742;
i__104008_104711 = G__104743;
continue;
} else {
var temp__5739__auto___104744__$1 = cljs.core.seq(seq__104005_104708);
if(temp__5739__auto___104744__$1){
var seq__104005_104745__$1 = temp__5739__auto___104744__$1;
if(cljs.core.chunked_seq_QMARK_(seq__104005_104745__$1)){
var c__4609__auto___104746 = cljs.core.chunk_first(seq__104005_104745__$1);
var G__104747 = cljs.core.chunk_rest(seq__104005_104745__$1);
var G__104748 = c__4609__auto___104746;
var G__104749 = cljs.core.count(c__4609__auto___104746);
var G__104750 = (0);
seq__104005_104708 = G__104747;
chunk__104006_104709 = G__104748;
count__104007_104710 = G__104749;
i__104008_104711 = G__104750;
continue;
} else {
var vec__104078_104751 = cljs.core.first(seq__104005_104745__$1);
var line_104752 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104078_104751,(0),null);
var cols_104753 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104078_104751,(1),null);
var seq__104081_104754 = cljs.core.seq(cols_104753);
var chunk__104082_104755 = null;
var count__104083_104756 = (0);
var i__104084_104757 = (0);
while(true){
if((i__104084_104757 < count__104083_104756)){
var vec__104091_104758 = chunk__104082_104755.cljs$core$IIndexed$_nth$arity$2(null,i__104084_104757);
var col_104759 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104091_104758,(0),null);
var infos_104760 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104091_104758,(1),null);
encode_cols(infos_104760,source_idx_104704,line_104752,col_104759);


var G__104761 = seq__104081_104754;
var G__104762 = chunk__104082_104755;
var G__104763 = count__104083_104756;
var G__104764 = (i__104084_104757 + (1));
seq__104081_104754 = G__104761;
chunk__104082_104755 = G__104762;
count__104083_104756 = G__104763;
i__104084_104757 = G__104764;
continue;
} else {
var temp__5739__auto___104765__$2 = cljs.core.seq(seq__104081_104754);
if(temp__5739__auto___104765__$2){
var seq__104081_104766__$1 = temp__5739__auto___104765__$2;
if(cljs.core.chunked_seq_QMARK_(seq__104081_104766__$1)){
var c__4609__auto___104767 = cljs.core.chunk_first(seq__104081_104766__$1);
var G__104768 = cljs.core.chunk_rest(seq__104081_104766__$1);
var G__104769 = c__4609__auto___104767;
var G__104770 = cljs.core.count(c__4609__auto___104767);
var G__104771 = (0);
seq__104081_104754 = G__104768;
chunk__104082_104755 = G__104769;
count__104083_104756 = G__104770;
i__104084_104757 = G__104771;
continue;
} else {
var vec__104094_104772 = cljs.core.first(seq__104081_104766__$1);
var col_104773 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104094_104772,(0),null);
var infos_104774 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104094_104772,(1),null);
encode_cols(infos_104774,source_idx_104704,line_104752,col_104773);


var G__104775 = cljs.core.next(seq__104081_104766__$1);
var G__104776 = null;
var G__104777 = (0);
var G__104778 = (0);
seq__104081_104754 = G__104775;
chunk__104082_104755 = G__104776;
count__104083_104756 = G__104777;
i__104084_104757 = G__104778;
continue;
}
} else {
}
}
break;
}


var G__104779 = cljs.core.next(seq__104005_104745__$1);
var G__104780 = null;
var G__104781 = (0);
var G__104782 = (0);
seq__104005_104708 = G__104779;
chunk__104006_104709 = G__104780;
count__104007_104710 = G__104781;
i__104008_104711 = G__104782;
continue;
}
} else {
}
}
break;
}


var G__104783 = cljs.core.next(seq__103680_104696__$1);
var G__104784 = null;
var G__104785 = (0);
var G__104786 = (0);
seq__103680_104598 = G__104783;
chunk__103681_104599 = G__104784;
count__103682_104600 = G__104785;
i__103683_104601 = G__104786;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__104097 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?(function (p1__103661_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__103661_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
}):cljs.core.identity),(function (p1__103662_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__103662_SHARP_,/\//));
}));
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__103663_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__103663_SHARP_);
}),cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,cljs.core.deref(lines))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert(cljs.core.deref(names__GT_idx)),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(names__GT_idx)))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__104100 = G__104097;
var G__104101_104791 = G__104100;
var G__104102_104792 = "sourcesContent";
var G__104103_104793 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__104101_104791,G__104102_104792,G__104103_104793);

return G__104100;
} else {
return G__104097;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq(cljs_map);
var new_lines = cljs.core.sorted_map();
while(true){
if(line_map_seq){
var vec__104104 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104104,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104104,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__104107 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104107,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104107,(1),null);
var G__104797 = cljs.core.next(col_map_seq);
var G__104798 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__104107,col,infos,vec__104104,line,col_map){
return (function (v,p__104112){
var map__104113 = p__104112;
var map__104113__$1 = (((((!((map__104113 == null))))?(((((map__104113.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104113.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104113):map__104113);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104113__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104113__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__104107,col,infos,vec__104104,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__104797;
new_cols = G__104798;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__104799 = cljs.core.next(line_map_seq);
var G__104800 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__104799;
new_lines = G__104800;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.sorted_map());
var seq__104115_104802 = cljs.core.seq(reverse_map);
var chunk__104116_104803 = null;
var count__104117_104804 = (0);
var i__104118_104805 = (0);
while(true){
if((i__104118_104805 < count__104117_104804)){
var vec__104282_104806 = chunk__104116_104803.cljs$core$IIndexed$_nth$arity$2(null,i__104118_104805);
var line_104807 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104282_104806,(0),null);
var columns_104808 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104282_104806,(1),null);
var seq__104285_104809 = cljs.core.seq(columns_104808);
var chunk__104286_104810 = null;
var count__104287_104811 = (0);
var i__104288_104812 = (0);
while(true){
if((i__104288_104812 < count__104287_104811)){
var vec__104326_104813 = chunk__104286_104810.cljs$core$IIndexed$_nth$arity$2(null,i__104288_104812);
var column_104814 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104326_104813,(0),null);
var column_info_104815 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104326_104813,(1),null);
var seq__104329_104818 = cljs.core.seq(column_info_104815);
var chunk__104330_104819 = null;
var count__104331_104820 = (0);
var i__104332_104821 = (0);
while(true){
if((i__104332_104821 < count__104331_104820)){
var map__104337_104824 = chunk__104330_104819.cljs$core$IIndexed$_nth$arity$2(null,i__104332_104821);
var map__104337_104825__$1 = (((((!((map__104337_104824 == null))))?(((((map__104337_104824.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104337_104824.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104337_104824):map__104337_104824);
var gline_104826 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104337_104825__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104827 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104337_104825__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104828 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104337_104825__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104826], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104329_104818,chunk__104330_104819,count__104331_104820,i__104332_104821,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104337_104824,map__104337_104825__$1,gline_104826,gcol_104827,name_104828,vec__104326_104813,column_104814,column_info_104815,vec__104282_104806,line_104807,columns_104808,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104827], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104807,new cljs.core.Keyword(null,"col","col",-1959363084),column_104814,new cljs.core.Keyword(null,"name","name",1843675177),name_104828], null));
});})(seq__104329_104818,chunk__104330_104819,count__104331_104820,i__104332_104821,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104337_104824,map__104337_104825__$1,gline_104826,gcol_104827,name_104828,vec__104326_104813,column_104814,column_info_104815,vec__104282_104806,line_104807,columns_104808,inverted))
,cljs.core.sorted_map()));


var G__104829 = seq__104329_104818;
var G__104830 = chunk__104330_104819;
var G__104831 = count__104331_104820;
var G__104832 = (i__104332_104821 + (1));
seq__104329_104818 = G__104829;
chunk__104330_104819 = G__104830;
count__104331_104820 = G__104831;
i__104332_104821 = G__104832;
continue;
} else {
var temp__5739__auto___104833 = cljs.core.seq(seq__104329_104818);
if(temp__5739__auto___104833){
var seq__104329_104836__$1 = temp__5739__auto___104833;
if(cljs.core.chunked_seq_QMARK_(seq__104329_104836__$1)){
var c__4609__auto___104837 = cljs.core.chunk_first(seq__104329_104836__$1);
var G__104838 = cljs.core.chunk_rest(seq__104329_104836__$1);
var G__104839 = c__4609__auto___104837;
var G__104840 = cljs.core.count(c__4609__auto___104837);
var G__104841 = (0);
seq__104329_104818 = G__104838;
chunk__104330_104819 = G__104839;
count__104331_104820 = G__104840;
i__104332_104821 = G__104841;
continue;
} else {
var map__104346_104842 = cljs.core.first(seq__104329_104836__$1);
var map__104346_104843__$1 = (((((!((map__104346_104842 == null))))?(((((map__104346_104842.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104346_104842.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104346_104842):map__104346_104842);
var gline_104844 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104346_104843__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104845 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104346_104843__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104846 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104346_104843__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104844], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104329_104818,chunk__104330_104819,count__104331_104820,i__104332_104821,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104346_104842,map__104346_104843__$1,gline_104844,gcol_104845,name_104846,seq__104329_104836__$1,temp__5739__auto___104833,vec__104326_104813,column_104814,column_info_104815,vec__104282_104806,line_104807,columns_104808,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104845], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104807,new cljs.core.Keyword(null,"col","col",-1959363084),column_104814,new cljs.core.Keyword(null,"name","name",1843675177),name_104846], null));
});})(seq__104329_104818,chunk__104330_104819,count__104331_104820,i__104332_104821,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104346_104842,map__104346_104843__$1,gline_104844,gcol_104845,name_104846,seq__104329_104836__$1,temp__5739__auto___104833,vec__104326_104813,column_104814,column_info_104815,vec__104282_104806,line_104807,columns_104808,inverted))
,cljs.core.sorted_map()));


var G__104851 = cljs.core.next(seq__104329_104836__$1);
var G__104852 = null;
var G__104853 = (0);
var G__104854 = (0);
seq__104329_104818 = G__104851;
chunk__104330_104819 = G__104852;
count__104331_104820 = G__104853;
i__104332_104821 = G__104854;
continue;
}
} else {
}
}
break;
}


var G__104861 = seq__104285_104809;
var G__104862 = chunk__104286_104810;
var G__104863 = count__104287_104811;
var G__104864 = (i__104288_104812 + (1));
seq__104285_104809 = G__104861;
chunk__104286_104810 = G__104862;
count__104287_104811 = G__104863;
i__104288_104812 = G__104864;
continue;
} else {
var temp__5739__auto___104865 = cljs.core.seq(seq__104285_104809);
if(temp__5739__auto___104865){
var seq__104285_104866__$1 = temp__5739__auto___104865;
if(cljs.core.chunked_seq_QMARK_(seq__104285_104866__$1)){
var c__4609__auto___104867 = cljs.core.chunk_first(seq__104285_104866__$1);
var G__104868 = cljs.core.chunk_rest(seq__104285_104866__$1);
var G__104869 = c__4609__auto___104867;
var G__104870 = cljs.core.count(c__4609__auto___104867);
var G__104871 = (0);
seq__104285_104809 = G__104868;
chunk__104286_104810 = G__104869;
count__104287_104811 = G__104870;
i__104288_104812 = G__104871;
continue;
} else {
var vec__104350_104872 = cljs.core.first(seq__104285_104866__$1);
var column_104873 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104350_104872,(0),null);
var column_info_104874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104350_104872,(1),null);
var seq__104353_104875 = cljs.core.seq(column_info_104874);
var chunk__104354_104876 = null;
var count__104355_104877 = (0);
var i__104356_104878 = (0);
while(true){
if((i__104356_104878 < count__104355_104877)){
var map__104366_104879 = chunk__104354_104876.cljs$core$IIndexed$_nth$arity$2(null,i__104356_104878);
var map__104366_104880__$1 = (((((!((map__104366_104879 == null))))?(((((map__104366_104879.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104366_104879.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104366_104879):map__104366_104879);
var gline_104881 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104366_104880__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104882 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104366_104880__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104883 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104366_104880__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104881], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104353_104875,chunk__104354_104876,count__104355_104877,i__104356_104878,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104366_104879,map__104366_104880__$1,gline_104881,gcol_104882,name_104883,vec__104350_104872,column_104873,column_info_104874,seq__104285_104866__$1,temp__5739__auto___104865,vec__104282_104806,line_104807,columns_104808,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104882], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104807,new cljs.core.Keyword(null,"col","col",-1959363084),column_104873,new cljs.core.Keyword(null,"name","name",1843675177),name_104883], null));
});})(seq__104353_104875,chunk__104354_104876,count__104355_104877,i__104356_104878,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104366_104879,map__104366_104880__$1,gline_104881,gcol_104882,name_104883,vec__104350_104872,column_104873,column_info_104874,seq__104285_104866__$1,temp__5739__auto___104865,vec__104282_104806,line_104807,columns_104808,inverted))
,cljs.core.sorted_map()));


var G__104886 = seq__104353_104875;
var G__104887 = chunk__104354_104876;
var G__104888 = count__104355_104877;
var G__104889 = (i__104356_104878 + (1));
seq__104353_104875 = G__104886;
chunk__104354_104876 = G__104887;
count__104355_104877 = G__104888;
i__104356_104878 = G__104889;
continue;
} else {
var temp__5739__auto___104893__$1 = cljs.core.seq(seq__104353_104875);
if(temp__5739__auto___104893__$1){
var seq__104353_104894__$1 = temp__5739__auto___104893__$1;
if(cljs.core.chunked_seq_QMARK_(seq__104353_104894__$1)){
var c__4609__auto___104895 = cljs.core.chunk_first(seq__104353_104894__$1);
var G__104896 = cljs.core.chunk_rest(seq__104353_104894__$1);
var G__104897 = c__4609__auto___104895;
var G__104898 = cljs.core.count(c__4609__auto___104895);
var G__104899 = (0);
seq__104353_104875 = G__104896;
chunk__104354_104876 = G__104897;
count__104355_104877 = G__104898;
i__104356_104878 = G__104899;
continue;
} else {
var map__104368_104900 = cljs.core.first(seq__104353_104894__$1);
var map__104368_104901__$1 = (((((!((map__104368_104900 == null))))?(((((map__104368_104900.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104368_104900.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104368_104900):map__104368_104900);
var gline_104902 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104368_104901__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104903 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104368_104901__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104904 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104368_104901__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104902], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104353_104875,chunk__104354_104876,count__104355_104877,i__104356_104878,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104368_104900,map__104368_104901__$1,gline_104902,gcol_104903,name_104904,seq__104353_104894__$1,temp__5739__auto___104893__$1,vec__104350_104872,column_104873,column_info_104874,seq__104285_104866__$1,temp__5739__auto___104865,vec__104282_104806,line_104807,columns_104808,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104903], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104807,new cljs.core.Keyword(null,"col","col",-1959363084),column_104873,new cljs.core.Keyword(null,"name","name",1843675177),name_104904], null));
});})(seq__104353_104875,chunk__104354_104876,count__104355_104877,i__104356_104878,seq__104285_104809,chunk__104286_104810,count__104287_104811,i__104288_104812,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104368_104900,map__104368_104901__$1,gline_104902,gcol_104903,name_104904,seq__104353_104894__$1,temp__5739__auto___104893__$1,vec__104350_104872,column_104873,column_info_104874,seq__104285_104866__$1,temp__5739__auto___104865,vec__104282_104806,line_104807,columns_104808,inverted))
,cljs.core.sorted_map()));


var G__104905 = cljs.core.next(seq__104353_104894__$1);
var G__104906 = null;
var G__104907 = (0);
var G__104908 = (0);
seq__104353_104875 = G__104905;
chunk__104354_104876 = G__104906;
count__104355_104877 = G__104907;
i__104356_104878 = G__104908;
continue;
}
} else {
}
}
break;
}


var G__104910 = cljs.core.next(seq__104285_104866__$1);
var G__104911 = null;
var G__104912 = (0);
var G__104913 = (0);
seq__104285_104809 = G__104910;
chunk__104286_104810 = G__104911;
count__104287_104811 = G__104912;
i__104288_104812 = G__104913;
continue;
}
} else {
}
}
break;
}


var G__104914 = seq__104115_104802;
var G__104915 = chunk__104116_104803;
var G__104916 = count__104117_104804;
var G__104917 = (i__104118_104805 + (1));
seq__104115_104802 = G__104914;
chunk__104116_104803 = G__104915;
count__104117_104804 = G__104916;
i__104118_104805 = G__104917;
continue;
} else {
var temp__5739__auto___104918 = cljs.core.seq(seq__104115_104802);
if(temp__5739__auto___104918){
var seq__104115_104919__$1 = temp__5739__auto___104918;
if(cljs.core.chunked_seq_QMARK_(seq__104115_104919__$1)){
var c__4609__auto___104920 = cljs.core.chunk_first(seq__104115_104919__$1);
var G__104921 = cljs.core.chunk_rest(seq__104115_104919__$1);
var G__104922 = c__4609__auto___104920;
var G__104923 = cljs.core.count(c__4609__auto___104920);
var G__104924 = (0);
seq__104115_104802 = G__104921;
chunk__104116_104803 = G__104922;
count__104117_104804 = G__104923;
i__104118_104805 = G__104924;
continue;
} else {
var vec__104384_104925 = cljs.core.first(seq__104115_104919__$1);
var line_104926 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104384_104925,(0),null);
var columns_104927 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104384_104925,(1),null);
var seq__104387_104928 = cljs.core.seq(columns_104927);
var chunk__104388_104929 = null;
var count__104389_104930 = (0);
var i__104390_104931 = (0);
while(true){
if((i__104390_104931 < count__104389_104930)){
var vec__104441_104932 = chunk__104388_104929.cljs$core$IIndexed$_nth$arity$2(null,i__104390_104931);
var column_104933 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104441_104932,(0),null);
var column_info_104934 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104441_104932,(1),null);
var seq__104444_104936 = cljs.core.seq(column_info_104934);
var chunk__104445_104937 = null;
var count__104446_104938 = (0);
var i__104447_104939 = (0);
while(true){
if((i__104447_104939 < count__104446_104938)){
var map__104462_104940 = chunk__104445_104937.cljs$core$IIndexed$_nth$arity$2(null,i__104447_104939);
var map__104462_104941__$1 = (((((!((map__104462_104940 == null))))?(((((map__104462_104940.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104462_104940.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104462_104940):map__104462_104940);
var gline_104942 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104462_104941__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104943 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104462_104941__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104944 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104462_104941__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104942], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104444_104936,chunk__104445_104937,count__104446_104938,i__104447_104939,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104462_104940,map__104462_104941__$1,gline_104942,gcol_104943,name_104944,vec__104441_104932,column_104933,column_info_104934,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104943], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104926,new cljs.core.Keyword(null,"col","col",-1959363084),column_104933,new cljs.core.Keyword(null,"name","name",1843675177),name_104944], null));
});})(seq__104444_104936,chunk__104445_104937,count__104446_104938,i__104447_104939,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104462_104940,map__104462_104941__$1,gline_104942,gcol_104943,name_104944,vec__104441_104932,column_104933,column_info_104934,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted))
,cljs.core.sorted_map()));


var G__104952 = seq__104444_104936;
var G__104953 = chunk__104445_104937;
var G__104954 = count__104446_104938;
var G__104955 = (i__104447_104939 + (1));
seq__104444_104936 = G__104952;
chunk__104445_104937 = G__104953;
count__104446_104938 = G__104954;
i__104447_104939 = G__104955;
continue;
} else {
var temp__5739__auto___104956__$1 = cljs.core.seq(seq__104444_104936);
if(temp__5739__auto___104956__$1){
var seq__104444_104957__$1 = temp__5739__auto___104956__$1;
if(cljs.core.chunked_seq_QMARK_(seq__104444_104957__$1)){
var c__4609__auto___104959 = cljs.core.chunk_first(seq__104444_104957__$1);
var G__104960 = cljs.core.chunk_rest(seq__104444_104957__$1);
var G__104961 = c__4609__auto___104959;
var G__104962 = cljs.core.count(c__4609__auto___104959);
var G__104963 = (0);
seq__104444_104936 = G__104960;
chunk__104445_104937 = G__104961;
count__104446_104938 = G__104962;
i__104447_104939 = G__104963;
continue;
} else {
var map__104464_104964 = cljs.core.first(seq__104444_104957__$1);
var map__104464_104965__$1 = (((((!((map__104464_104964 == null))))?(((((map__104464_104964.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104464_104964.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104464_104964):map__104464_104964);
var gline_104966 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104464_104965__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104967 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104464_104965__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104968 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104464_104965__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104966], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104444_104936,chunk__104445_104937,count__104446_104938,i__104447_104939,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104464_104964,map__104464_104965__$1,gline_104966,gcol_104967,name_104968,seq__104444_104957__$1,temp__5739__auto___104956__$1,vec__104441_104932,column_104933,column_info_104934,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104967], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104926,new cljs.core.Keyword(null,"col","col",-1959363084),column_104933,new cljs.core.Keyword(null,"name","name",1843675177),name_104968], null));
});})(seq__104444_104936,chunk__104445_104937,count__104446_104938,i__104447_104939,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104464_104964,map__104464_104965__$1,gline_104966,gcol_104967,name_104968,seq__104444_104957__$1,temp__5739__auto___104956__$1,vec__104441_104932,column_104933,column_info_104934,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted))
,cljs.core.sorted_map()));


var G__104973 = cljs.core.next(seq__104444_104957__$1);
var G__104974 = null;
var G__104975 = (0);
var G__104976 = (0);
seq__104444_104936 = G__104973;
chunk__104445_104937 = G__104974;
count__104446_104938 = G__104975;
i__104447_104939 = G__104976;
continue;
}
} else {
}
}
break;
}


var G__104977 = seq__104387_104928;
var G__104978 = chunk__104388_104929;
var G__104979 = count__104389_104930;
var G__104980 = (i__104390_104931 + (1));
seq__104387_104928 = G__104977;
chunk__104388_104929 = G__104978;
count__104389_104930 = G__104979;
i__104390_104931 = G__104980;
continue;
} else {
var temp__5739__auto___104981__$1 = cljs.core.seq(seq__104387_104928);
if(temp__5739__auto___104981__$1){
var seq__104387_104982__$1 = temp__5739__auto___104981__$1;
if(cljs.core.chunked_seq_QMARK_(seq__104387_104982__$1)){
var c__4609__auto___104983 = cljs.core.chunk_first(seq__104387_104982__$1);
var G__104984 = cljs.core.chunk_rest(seq__104387_104982__$1);
var G__104985 = c__4609__auto___104983;
var G__104986 = cljs.core.count(c__4609__auto___104983);
var G__104987 = (0);
seq__104387_104928 = G__104984;
chunk__104388_104929 = G__104985;
count__104389_104930 = G__104986;
i__104390_104931 = G__104987;
continue;
} else {
var vec__104470_104988 = cljs.core.first(seq__104387_104982__$1);
var column_104989 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104470_104988,(0),null);
var column_info_104990 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__104470_104988,(1),null);
var seq__104473_104991 = cljs.core.seq(column_info_104990);
var chunk__104474_104992 = null;
var count__104475_104993 = (0);
var i__104476_104994 = (0);
while(true){
if((i__104476_104994 < count__104475_104993)){
var map__104489_104995 = chunk__104474_104992.cljs$core$IIndexed$_nth$arity$2(null,i__104476_104994);
var map__104489_104996__$1 = (((((!((map__104489_104995 == null))))?(((((map__104489_104995.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104489_104995.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104489_104995):map__104489_104995);
var gline_104997 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104489_104996__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_104998 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104489_104996__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_104999 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104489_104996__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_104997], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104473_104991,chunk__104474_104992,count__104475_104993,i__104476_104994,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104489_104995,map__104489_104996__$1,gline_104997,gcol_104998,name_104999,vec__104470_104988,column_104989,column_info_104990,seq__104387_104982__$1,temp__5739__auto___104981__$1,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_104998], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104926,new cljs.core.Keyword(null,"col","col",-1959363084),column_104989,new cljs.core.Keyword(null,"name","name",1843675177),name_104999], null));
});})(seq__104473_104991,chunk__104474_104992,count__104475_104993,i__104476_104994,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104489_104995,map__104489_104996__$1,gline_104997,gcol_104998,name_104999,vec__104470_104988,column_104989,column_info_104990,seq__104387_104982__$1,temp__5739__auto___104981__$1,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted))
,cljs.core.sorted_map()));


var G__105004 = seq__104473_104991;
var G__105005 = chunk__104474_104992;
var G__105006 = count__104475_104993;
var G__105007 = (i__104476_104994 + (1));
seq__104473_104991 = G__105004;
chunk__104474_104992 = G__105005;
count__104475_104993 = G__105006;
i__104476_104994 = G__105007;
continue;
} else {
var temp__5739__auto___105014__$2 = cljs.core.seq(seq__104473_104991);
if(temp__5739__auto___105014__$2){
var seq__104473_105015__$1 = temp__5739__auto___105014__$2;
if(cljs.core.chunked_seq_QMARK_(seq__104473_105015__$1)){
var c__4609__auto___105016 = cljs.core.chunk_first(seq__104473_105015__$1);
var G__105017 = cljs.core.chunk_rest(seq__104473_105015__$1);
var G__105018 = c__4609__auto___105016;
var G__105019 = cljs.core.count(c__4609__auto___105016);
var G__105020 = (0);
seq__104473_104991 = G__105017;
chunk__104474_104992 = G__105018;
count__104475_104993 = G__105019;
i__104476_104994 = G__105020;
continue;
} else {
var map__104499_105022 = cljs.core.first(seq__104473_105015__$1);
var map__104499_105023__$1 = (((((!((map__104499_105022 == null))))?(((((map__104499_105022.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__104499_105022.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__104499_105022):map__104499_105022);
var gline_105024 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104499_105023__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_105025 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104499_105023__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_105026 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__104499_105023__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_105024], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__104473_104991,chunk__104474_104992,count__104475_104993,i__104476_104994,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104499_105022,map__104499_105023__$1,gline_105024,gcol_105025,name_105026,seq__104473_105015__$1,temp__5739__auto___105014__$2,vec__104470_104988,column_104989,column_info_104990,seq__104387_104982__$1,temp__5739__auto___104981__$1,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_105025], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_104926,new cljs.core.Keyword(null,"col","col",-1959363084),column_104989,new cljs.core.Keyword(null,"name","name",1843675177),name_105026], null));
});})(seq__104473_104991,chunk__104474_104992,count__104475_104993,i__104476_104994,seq__104387_104928,chunk__104388_104929,count__104389_104930,i__104390_104931,seq__104115_104802,chunk__104116_104803,count__104117_104804,i__104118_104805,map__104499_105022,map__104499_105023__$1,gline_105024,gcol_105025,name_105026,seq__104473_105015__$1,temp__5739__auto___105014__$2,vec__104470_104988,column_104989,column_info_104990,seq__104387_104982__$1,temp__5739__auto___104981__$1,vec__104384_104925,line_104926,columns_104927,seq__104115_104919__$1,temp__5739__auto___104918,inverted))
,cljs.core.sorted_map()));


var G__105037 = cljs.core.next(seq__104473_105015__$1);
var G__105038 = null;
var G__105039 = (0);
var G__105040 = (0);
seq__104473_104991 = G__105037;
chunk__104474_104992 = G__105038;
count__104475_104993 = G__105039;
i__104476_104994 = G__105040;
continue;
}
} else {
}
}
break;
}


var G__105041 = cljs.core.next(seq__104387_104982__$1);
var G__105042 = null;
var G__105043 = (0);
var G__105044 = (0);
seq__104387_104928 = G__105041;
chunk__104388_104929 = G__105042;
count__104389_104930 = G__105043;
i__104390_104931 = G__105044;
continue;
}
} else {
}
}
break;
}


var G__105045 = cljs.core.next(seq__104115_104919__$1);
var G__105046 = null;
var G__105047 = (0);
var G__105048 = (0);
seq__104115_104802 = G__105045;
chunk__104116_104803 = G__105046;
count__104117_104804 = G__105047;
i__104118_104805 = G__105048;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref(inverted);
});

//# sourceMappingURL=cljs.source_map.js.map
