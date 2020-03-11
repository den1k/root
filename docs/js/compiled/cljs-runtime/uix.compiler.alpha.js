goog.provide('uix.compiler.alpha');
goog.require('cljs.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
goog.require('goog.object');
goog.require('uix.hooks.alpha');
goog.require('clojure.string');
goog.require('cljs_bean.core');
goog.require('uix.lib');
uix.compiler.alpha._STAR_default_compare_args_STAR_ = (function uix$compiler$alpha$_STAR_default_compare_args_STAR_(p1__100782_SHARP_,p2__100783_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__100782_SHARP_.argv,p2__100783_SHARP_.argv);
});
uix.compiler.alpha.unwrap_ref = (function uix$compiler$alpha$unwrap_ref(_ref){
if((((!((_ref == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === _ref.uix$hooks$alpha$IRef$))))?true:false):false)){
return _ref.uix$hooks$alpha$IRef$unwrap$arity$1(null);
} else {
return _ref;
}
});
uix.compiler.alpha.js_val_QMARK_ = (function uix$compiler$alpha$js_val_QMARK_(x){
return (!(("object" === goog.typeOf(x))));
});
uix.compiler.alpha.named_QMARK_ = (function uix$compiler$alpha$named_QMARK_(x){
return (((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol)));
});
uix.compiler.alpha.hiccup_tag_QMARK_ = (function uix$compiler$alpha$hiccup_tag_QMARK_(x){
return (x instanceof cljs.core.Keyword);
});
uix.compiler.alpha.prop_name_cache = ({"class": "className", "for": "htmlFor", "charset": "charSet"});
uix.compiler.alpha.custom_prop_name_cache = ({});
uix.compiler.alpha.tag_name_cache = ({});
uix.compiler.alpha.transform_fns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
uix.compiler.alpha.add_transform_fn = (function uix$compiler$alpha$add_transform_fn(f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.transform_fns,cljs.core.conj,f);
});
uix.compiler.alpha.cc_regexp = (new RegExp("-(\\w)","g"));
uix.compiler.alpha.cc_fn = (function uix$compiler$alpha$cc_fn(s){
return clojure.string.upper_case((s[(1)]));
});
uix.compiler.alpha.dash_to_camel = (function uix$compiler$alpha$dash_to_camel(name_str){
if(((clojure.string.starts_with_QMARK_(name_str,"aria-")) || (clojure.string.starts_with_QMARK_(name_str,"data-")))){
return name_str;
} else {
return name_str.replace(uix.compiler.alpha.cc_regexp,uix.compiler.alpha.cc_fn);
}
});
uix.compiler.alpha.cached_prop_name = (function uix$compiler$alpha$cached_prop_name(k){
if(uix.compiler.alpha.named_QMARK_(k)){
var name_str = k.cljs$core$INamed$_name$arity$1(null);
var temp__5741__auto__ = (uix.compiler.alpha.prop_name_cache[name_str]);
if((temp__5741__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(name_str);
(uix.compiler.alpha.prop_name_cache[name_str] = v);

return v;
} else {
var k_SINGLEQUOTE_ = temp__5741__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
uix.compiler.alpha.cached_custom_prop_name = (function uix$compiler$alpha$cached_custom_prop_name(k){
if(uix.compiler.alpha.named_QMARK_(k)){
var name_str = k.cljs$core$INamed$_name$arity$1(null);
var temp__5741__auto__ = (uix.compiler.alpha.custom_prop_name_cache[name_str]);
if((temp__5741__auto__ == null)){
var v = uix.compiler.alpha.dash_to_camel(name_str);
(uix.compiler.alpha.custom_prop_name_cache[name_str] = v);

return v;
} else {
var k_SINGLEQUOTE_ = temp__5741__auto__;
return k_SINGLEQUOTE_;
}
} else {
return k;
}
});
uix.compiler.alpha.convert_interop_prop_value = (function uix$compiler$alpha$convert_interop_prop_value(k,v){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"style","style",-496642736))){
if(cljs.core.vector_QMARK_(v)){
return v.cljs$core$IReduce$_reduce$arity$3(null,(function (a,v__$1){
a.push((uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1(v__$1) : uix.compiler.alpha.convert_prop_value_shallow.call(null,v__$1)));

return a;
}),[]);
} else {
return (uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value_shallow.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value_shallow.call(null,v));
}
} else {
if((v instanceof cljs.core.Keyword)){
return v.cljs$core$INamed$_name$arity$1(null);
} else {
return v;

}
}
});
uix.compiler.alpha.kv_conv = (function uix$compiler$alpha$kv_conv(o,k,v){
var G__100787_100853 = o;
var G__100788_100854 = uix.compiler.alpha.cached_prop_name(k);
var G__100789_100855 = (uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value.call(null,v));
goog.object.set(G__100787_100853,G__100788_100854,G__100789_100855);

return o;
});
uix.compiler.alpha.kv_conv_shallow = (function uix$compiler$alpha$kv_conv_shallow(o,k,v){
var G__100790_100856 = o;
var G__100791_100857 = uix.compiler.alpha.cached_prop_name(k);
var G__100792_100858 = uix.compiler.alpha.convert_interop_prop_value(k,v);
goog.object.set(G__100790_100856,G__100791_100857,G__100792_100858);

return o;
});
uix.compiler.alpha.custom_kv_conv = (function uix$compiler$alpha$custom_kv_conv(o,k,v){
var G__100793_100859 = o;
var G__100794_100860 = uix.compiler.alpha.cached_custom_prop_name(k);
var G__100795_100861 = (uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.convert_prop_value.cljs$core$IFn$_invoke$arity$1(v) : uix.compiler.alpha.convert_prop_value.call(null,v));
goog.object.set(G__100793_100859,G__100794_100860,G__100795_100861);

return o;
});
uix.compiler.alpha.try_get_key = (function uix$compiler$alpha$try_get_key(x){
try{return cljs.core.get.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.Keyword(null,"key","key",-1516042587));
}catch (e100796){var e = e100796;
return null;
}});
uix.compiler.alpha.get_key = (function uix$compiler$alpha$get_key(x){
if(cljs.core.map_QMARK_(x)){
return uix.compiler.alpha.try_get_key(x);
} else {
return null;
}
});
uix.compiler.alpha.convert_prop_value = (function uix$compiler$alpha$convert_prop_value(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__100862__delegate = function (rest__100797_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__100797_SHARP_);
};
var G__100862 = function (var_args){
var rest__100797_SHARP_ = null;
if (arguments.length > 0) {
var G__100863__i = 0, G__100863__a = new Array(arguments.length -  0);
while (G__100863__i < G__100863__a.length) {G__100863__a[G__100863__i] = arguments[G__100863__i + 0]; ++G__100863__i;}
  rest__100797_SHARP_ = new cljs.core.IndexedSeq(G__100863__a,0,null);
} 
return G__100862__delegate.call(this,rest__100797_SHARP_);};
G__100862.cljs$lang$maxFixedArity = 0;
G__100862.cljs$lang$applyTo = (function (arglist__100864){
var rest__100797_SHARP_ = cljs.core.seq(arglist__100864);
return G__100862__delegate(rest__100797_SHARP_);
});
G__100862.cljs$core$IFn$_invoke$arity$variadic = G__100862__delegate;
return G__100862;
})()
;
} else {
return cljs.core.clj__GT_js(x);

}
}
}
}
}
});
uix.compiler.alpha.convert_prop_value_shallow = (function uix$compiler$alpha$convert_prop_value_shallow(x){
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.kv_conv_shallow,({}),x);
} else {
return x;
}
});
uix.compiler.alpha.convert_custom_prop_value = (function uix$compiler$alpha$convert_custom_prop_value(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
} else {
if(cljs.core.map_QMARK_(x)){
return cljs.core.reduce_kv(uix.compiler.alpha.custom_kv_conv,({}),x);
} else {
if(cljs.core.coll_QMARK_(x)){
return cljs.core.clj__GT_js(x);
} else {
if(cljs.core.ifn_QMARK_(x)){
return (function() { 
var G__100865__delegate = function (rest__100798_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(x,rest__100798_SHARP_);
};
var G__100865 = function (var_args){
var rest__100798_SHARP_ = null;
if (arguments.length > 0) {
var G__100866__i = 0, G__100866__a = new Array(arguments.length -  0);
while (G__100866__i < G__100866__a.length) {G__100866__a[G__100866__i] = arguments[G__100866__i + 0]; ++G__100866__i;}
  rest__100798_SHARP_ = new cljs.core.IndexedSeq(G__100866__a,0,null);
} 
return G__100865__delegate.call(this,rest__100798_SHARP_);};
G__100865.cljs$lang$maxFixedArity = 0;
G__100865.cljs$lang$applyTo = (function (arglist__100867){
var rest__100798_SHARP_ = cljs.core.seq(arglist__100867);
return G__100865__delegate(rest__100798_SHARP_);
});
G__100865.cljs$core$IFn$_invoke$arity$variadic = G__100865__delegate;
return G__100865;
})()
;
} else {
return cljs.core.clj__GT_js(x);

}
}
}
}
}
});
uix.compiler.alpha.class_names_coll = (function uix$compiler$alpha$class_names_coll(class$){
var classes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,c){
if(c){
a.push((((c instanceof cljs.core.Keyword))?c.cljs$core$INamed$_name$arity$1(null):c));
} else {
}

return a;
}),[],class$);
if((classes.length > (0))){
return classes.join(" ");
} else {
return null;
}
});
uix.compiler.alpha.class_names_map = (function uix$compiler$alpha$class_names_map(class$){
var classes = cljs.core.reduce_kv((function (a,b,c){
if(c){
a.push((((b instanceof cljs.core.Keyword))?b.cljs$core$INamed$_name$arity$1(null):b));
} else {
}

return a;
}),[],class$);
if((classes.length > (0))){
return classes.join(" ");
} else {
return null;
}
});
uix.compiler.alpha.class_names = (function uix$compiler$alpha$class_names(var_args){
var G__100817 = arguments.length;
switch (G__100817) {
case 0:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4810__auto__ = [];
var len__4789__auto___100869 = arguments.length;
var i__4790__auto___100870 = (0);
while(true){
if((i__4790__auto___100870 < len__4789__auto___100869)){
args_arr__4810__auto__.push((arguments[i__4790__auto___100870]));

var G__100871 = (i__4790__auto___100870 + (1));
i__4790__auto___100870 = G__100871;
continue;
} else {
}
break;
}

var argseq__4811__auto__ = (new cljs.core.IndexedSeq(args_arr__4810__auto__.slice((2)),(0),null));
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4811__auto__);

}
});

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1 = (function (class$){
if(cljs.core.map_QMARK_(class$)){
return uix.compiler.alpha.class_names_map(class$);
} else {
if(((cljs.core.array_QMARK_(class$)) || (cljs.core.coll_QMARK_(class$)))){
return uix.compiler.alpha.class_names_coll(class$);
} else {
if((class$ instanceof cljs.core.Keyword)){
return class$.cljs$core$INamed$_name$arity$1(null);
} else {
return class$;

}
}
}
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
if(a){
if(b){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b))].join('');
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(a);
}
} else {
return uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(b);
}
}));

(uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,rst){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(uix.compiler.alpha.class_names,uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(a,b),rst);
}));

/** @this {Function} */
(uix.compiler.alpha.class_names.cljs$lang$applyTo = (function (seq100814){
var G__100815 = cljs.core.first(seq100814);
var seq100814__$1 = cljs.core.next(seq100814);
var G__100816 = cljs.core.first(seq100814__$1);
var seq100814__$2 = cljs.core.next(seq100814__$1);
var self__4776__auto__ = this;
return self__4776__auto__.cljs$core$IFn$_invoke$arity$variadic(G__100815,G__100816,seq100814__$2);
}));

(uix.compiler.alpha.class_names.cljs$lang$maxFixedArity = (2));

/**
 * Takes the id and class from tag keyword, and adds them to the
 *   other props. Parsed tag is JS object with :id and :class properties.
 */
uix.compiler.alpha.set_id_class = (function uix$compiler$alpha$set_id_class(props,id_class){
var id = (id_class[(1)]);
var classes = (id_class[(2)]);
var G__100818 = props;
var G__100818__$1 = (((((!((id == null)))) && ((cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"id","id",-1388402092)) == null))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__100818,new cljs.core.Keyword(null,"id","id",-1388402092),id):G__100818);
if((((!((classes == null)))) && ((classes.length > (0))))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__100818__$1,new cljs.core.Keyword(null,"class","class",-2030961996),uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$2(classes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996))));
} else {
return G__100818__$1;
}
});
uix.compiler.alpha.convert_props = (function uix$compiler$alpha$convert_props(props,id_class,shallow_QMARK_){
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996));
var props__$1 = uix.compiler.alpha.set_id_class((function (){var G__100820 = props;
if(cljs.core.truth_(class$)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__100820,new cljs.core.Keyword(null,"class","class",-2030961996),uix.compiler.alpha.class_names.cljs$core$IFn$_invoke$arity$1(class$));
} else {
return G__100820;
}
})(),id_class);
if(cljs.core.truth_((id_class[(3)]))){
return uix.compiler.alpha.convert_custom_prop_value(props__$1);
} else {
if(shallow_QMARK_){
return uix.compiler.alpha.convert_prop_value_shallow(props__$1);
} else {
return uix.compiler.alpha.convert_prop_value(props__$1);

}
}
});
uix.compiler.alpha.re_tag = /[#.]?[^#.]+/;
uix.compiler.alpha.parse_tag = (function uix$compiler$alpha$parse_tag(tag){
var matches = uix.lib.re_seq_STAR_(uix.compiler.alpha.re_tag,tag);
var tag__$1 = "div";
var id = null;
var classes = [];
while(true){
var val = (matches[(0)]);
var nval = matches.slice((1));
if(val){
if(((val[(0)]) === "#")){
var G__100872 = nval;
var G__100873 = tag__$1;
var G__100874 = val.slice((1));
var G__100875 = classes;
matches = G__100872;
tag__$1 = G__100873;
id = G__100874;
classes = G__100875;
continue;
} else {
if(((val[(0)]) === ".")){
var G__100876 = nval;
var G__100877 = tag__$1;
var G__100878 = id;
var G__100879 = classes.concat([val.slice((1))]);
matches = G__100876;
tag__$1 = G__100877;
id = G__100878;
classes = G__100879;
continue;
} else {
var G__100880 = nval;
var G__100881 = val;
var G__100882 = id;
var G__100883 = classes;
matches = G__100880;
tag__$1 = G__100881;
id = G__100882;
classes = G__100883;
continue;

}
}
} else {
return [tag__$1,id,classes,clojure.string.includes_QMARK_(tag__$1,"-")];
}
break;
}
});
uix.compiler.alpha.cached_parse = (function uix$compiler$alpha$cached_parse(x){
var temp__5741__auto__ = (uix.compiler.alpha.tag_name_cache[x]);
if((temp__5741__auto__ == null)){
var v = uix.compiler.alpha.parse_tag(x);
(uix.compiler.alpha.tag_name_cache[x] = v);

return v;
} else {
var s = temp__5741__auto__;
return s;
}
});
uix.compiler.alpha.key_from_vec = (function uix$compiler$alpha$key_from_vec(v){
var temp__5741__auto__ = uix.compiler.alpha.get_key(cljs.core._meta(v));
if((temp__5741__auto__ == null)){
return uix.compiler.alpha.get_key(cljs.core._nth.cljs$core$IFn$_invoke$arity$3(v,(1),null));
} else {
var k = temp__5741__auto__;
return k;
}
});
uix.compiler.alpha.native_element = (function uix$compiler$alpha$native_element(parsed,argv,first_el){
var component = (parsed[(0)]);
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,first_el,null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f.call(null,p));
}),props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4185__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,false);
if(or__4185__auto__){
return or__4185__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5743__auto___100884 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5743__auto___100884 == null)){
} else {
var key_100885 = temp__5743__auto___100884;
goog.object.set(js_props,"key",key_100885);
}

var temp__5743__auto___100886 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,new cljs.core.Keyword(null,"ref","ref",1289896967)));
if((temp__5743__auto___100886 == null)){
} else {
var _ref_100887 = temp__5743__auto___100886;
goog.object.set(js_props,"ref",_ref_100887);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,component,js_props,first_child) : uix.compiler.alpha.make_element.call(null,argv,component,js_props,first_child));
});
uix.compiler.alpha.fragment_element = (function uix$compiler$alpha$fragment_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var js_props = (function (){var or__4185__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props:null));
if(or__4185__auto__){
return or__4185__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
var temp__5743__auto___100888 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5743__auto___100888 == null)){
} else {
var key_100889 = temp__5743__auto___100888;
goog.object.set(js_props,"key",key_100889);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,module$node_modules$react$index.Fragment,js_props,first_child) : uix.compiler.alpha.make_element.call(null,argv,module$node_modules$react$index.Fragment,js_props,first_child));
});
uix.compiler.alpha.suspense_element = (function uix$compiler$alpha$suspense_element(argv){
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var vec__100822 = ((props_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__100825 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"fallback","fallback",761637929));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__100825) : uix.compiler.alpha.as_element.call(null,G__100825));
})(),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"fallback","fallback",761637929))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,props], null));
var fallback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100822,(0),null);
var props__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100822,(1),null);
var js_props = (function (){var or__4185__auto__ = uix.compiler.alpha.convert_prop_value(((props_QMARK_)?props__$1:null));
if(or__4185__auto__){
return or__4185__auto__;
} else {
return ({});
}
})();
var first_child = ((1) + ((props_QMARK_)?(1):(0)));
if(fallback){
goog.object.set(js_props,"fallback",fallback);
} else {
}

var temp__5743__auto___100890 = uix.compiler.alpha.key_from_vec(argv);
if((temp__5743__auto___100890 == null)){
} else {
var key_100891 = temp__5743__auto___100890;
goog.object.set(js_props,"key",key_100891);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,module$node_modules$react$index.Suspense,js_props,first_child) : uix.compiler.alpha.make_element.call(null,argv,module$node_modules$react$index.Suspense,js_props,first_child));
});
uix.compiler.alpha.portal_element = (function uix$compiler$alpha$portal_element(argv){
console.warn("React portal Hiccup syntax :-> is deprecated, use uix.dom.alpha/create-portal instead");

var child = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var target = argv.cljs$core$IIndexed$_nth$arity$3(null,(2),null);
var node = ((((typeof target === 'string') || ((target instanceof cljs.core.Keyword))))?document.querySelector(cljs.core.name(target)):target);
return ReactDOM.createPortal((uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(child) : uix.compiler.alpha.as_element.call(null,child)),node);
});
uix.compiler.alpha.interop_element = (function uix$compiler$alpha$interop_element(argv){
var tag = argv.cljs$core$IIndexed$_nth$arity$3(null,(1),null);
var parsed = [tag,null,null];
var first_el = (2);
var props = argv.cljs$core$IIndexed$_nth$arity$3(null,first_el,null);
var props_QMARK_ = (((props == null)) || (cljs.core.map_QMARK_(props)));
var props__$1 = ((props_QMARK_)?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p,f){
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(p) : f.call(null,p));
}),props,cljs.core.deref(uix.compiler.alpha.transform_fns)):props);
var js_props = (function (){var or__4185__auto__ = uix.compiler.alpha.convert_props(((props_QMARK_)?props__$1:null),parsed,true);
if(or__4185__auto__){
return or__4185__auto__;
} else {
return ({});
}
})();
var first_child = (first_el + ((props_QMARK_)?(1):(0)));
var temp__5743__auto___100892 = uix.compiler.alpha.get_key(argv.cljs$core$IMeta$_meta$arity$1(null));
if((temp__5743__auto___100892 == null)){
} else {
var key_100893 = temp__5743__auto___100892;
goog.object.set(js_props,"key",key_100893);
}

var temp__5743__auto___100894 = uix.compiler.alpha.unwrap_ref(cljs.core.get.cljs$core$IFn$_invoke$arity$2(props__$1,new cljs.core.Keyword(null,"ref","ref",1289896967)));
if((temp__5743__auto___100894 == null)){
} else {
var _ref_100895 = temp__5743__auto___100894;
goog.object.set(js_props,"ref",_ref_100895);
}

return (uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4 ? uix.compiler.alpha.make_element.cljs$core$IFn$_invoke$arity$4(argv,tag,js_props,first_child) : uix.compiler.alpha.make_element.call(null,argv,tag,js_props,first_child));
});
uix.compiler.alpha.cached_react_fn = (function uix$compiler$alpha$cached_react_fn(f){
if(f.compiled_QMARK_){
return f.cljsReactCompiled;
} else {
return f.cljsReact;
}
});
uix.compiler.alpha.cache_react_fn = (function uix$compiler$alpha$cache_react_fn(f,rf){
if(f.compiled_QMARK_){
return (f.cljsReactCompiled = rf);
} else {
return (f.cljsReact = rf);
}
});
uix.compiler.alpha.symbol_for = (function uix$compiler$alpha$symbol_for(s){
return Symbol.for(s);
});
uix.compiler.alpha.lazy_sym = uix.compiler.alpha.symbol_for("react.lazy");
uix.compiler.alpha.memo_sym = uix.compiler.alpha.symbol_for("react.memo");
uix.compiler.alpha.lazy_QMARK_ = (function uix$compiler$alpha$lazy_QMARK_(t){
return (uix.compiler.alpha.lazy_sym === (t["$$typeof"]));
});
uix.compiler.alpha.memo_QMARK_ = (function uix$compiler$alpha$memo_QMARK_(t){
return (uix.compiler.alpha.memo_sym === (t["$$typeof"]));
});
uix.compiler.alpha.react_type_QMARK_ = (function uix$compiler$alpha$react_type_QMARK_(t){
return ((uix.compiler.alpha.lazy_QMARK_(t)) || (uix.compiler.alpha.memo_QMARK_(t)));
});
uix.compiler.alpha.default_format_display_name = (function uix$compiler$alpha$default_format_display_name(s){
var parts = s.split(/\$/);
var last_idx = (parts.length - (1));
var name_part = (parts[last_idx]);
if(((1) === parts.length)){
return cljs.core.demunge(name_part);
} else {
return cljs.core.demunge([parts.slice((0),last_idx).join("."),"/",name_part].join(''));
}
});
uix.compiler.alpha._STAR_format_display_name_STAR_ = uix.compiler.alpha.default_format_display_name;
uix.compiler.alpha.format_display_name = (function uix$compiler$alpha$format_display_name(s){
if(cljs.core.fn_QMARK_(uix.compiler.alpha._STAR_format_display_name_STAR_)){
return (uix.compiler.alpha._STAR_format_display_name_STAR_.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha._STAR_format_display_name_STAR_.cljs$core$IFn$_invoke$arity$1(s) : uix.compiler.alpha._STAR_format_display_name_STAR_.call(null,s));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unexpected uix.compiler.alpha/*format-display-name* is not bound to a function",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"bound-value","bound-value",559826825),uix.compiler.alpha._STAR_format_display_name_STAR_,new cljs.core.Keyword(null,"value-type","value-type",576005757),goog.typeOf(uix.compiler.alpha._STAR_format_display_name_STAR_)], null));
}
});
uix.compiler.alpha.effective_component_name = (function uix$compiler$alpha$effective_component_name(f){
var or__4185__auto__ = (function (){var temp__5743__auto__ = f.displayName;
if((temp__5743__auto__ == null)){
return null;
} else {
var display_name = temp__5743__auto__;
if(typeof display_name === 'string'){
return display_name;
} else {
return null;
}
}
})();
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
var temp__5743__auto__ = f.name;
if((temp__5743__auto__ == null)){
return null;
} else {
var name = temp__5743__auto__;
if(typeof name === 'string'){
return name;
} else {
return null;
}
}
}
});
uix.compiler.alpha.with_name = (function uix$compiler$alpha$with_name(f,rf,rf_memo){
var temp__5739__auto__ = uix.compiler.alpha.effective_component_name(f);
if(cljs.core.truth_(temp__5739__auto__)){
var component_name = temp__5739__auto__;
var temp__5743__auto__ = uix.compiler.alpha.format_display_name(component_name);
if((temp__5743__auto__ == null)){
return null;
} else {
var display_name = temp__5743__auto__;
(rf.displayName = display_name);

if(f.uix_no_memo){
return null;
} else {
return (rf_memo.displayName = ["memo(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(display_name),")"].join(''));
}
}
} else {
return null;
}
});
uix.compiler.alpha.fn_to_react_fn = (function uix$compiler$alpha$fn_to_react_fn(f){
if(uix.compiler.alpha.react_type_QMARK_(f)){
return f;
} else {
var rf = (function (p1__100834_SHARP_){
var argv = p1__100834_SHARP_.argv;
var G__100835 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(argv.cljs$core$IIndexed$_nth$arity$2(null,(0)),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(argv,(1)));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__100835) : uix.compiler.alpha.as_element.call(null,G__100835));
});
var rf_memo = (((!(f.uix_no_memo)))?module$node_modules$react$index.memo(rf,uix.compiler.alpha._STAR_default_compare_args_STAR_):rf);
if(((goog.DEBUG) && ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined')))){
(rf.uixf = f);
} else {
}

if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf,rf_memo);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf_memo);

return rf_memo;
}
});
uix.compiler.alpha.as_lazy_component = (function uix$compiler$alpha$as_lazy_component(f){
var temp__5741__auto__ = uix.compiler.alpha.cached_react_fn(f);
if((temp__5741__auto__ == null)){
var rf = (function (p1__100836_SHARP_){
var G__100837 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(p1__100836_SHARP_.argv,(1)));
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__100837) : uix.compiler.alpha.as_element.call(null,G__100837));
});
var rf_memo = (((!(f.uix_no_memo)))?module$node_modules$react$index.memo(rf,uix.compiler.alpha._STAR_default_compare_args_STAR_):rf);
if(((goog.DEBUG) && ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined')))){
(rf.uixf = f);
} else {
}

if(goog.DEBUG){
uix.compiler.alpha.with_name(f,rf,rf_memo);
} else {
}

uix.compiler.alpha.cache_react_fn(f,rf_memo);

return rf_memo;
} else {
var cached_fn = temp__5741__auto__;
return cached_fn;
}
});
uix.compiler.alpha.as_component = (function uix$compiler$alpha$as_component(tag){
var temp__5741__auto__ = uix.compiler.alpha.cached_react_fn(tag);
if((temp__5741__auto__ == null)){
return uix.compiler.alpha.fn_to_react_fn(tag);
} else {
var cached_fn = temp__5741__auto__;
return cached_fn;
}
});
uix.compiler.alpha.as_react = (function uix$compiler$alpha$as_react(f){
return (function (p1__100838_SHARP_){
var G__100839 = (function (){var G__100840 = cljs_bean.core.bean.cljs$core$IFn$_invoke$arity$1(p1__100838_SHARP_);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__100840) : f.call(null,G__100840));
})();
return (uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__100839) : uix.compiler.alpha.as_element.call(null,G__100839));
});
});
uix.compiler.alpha.component_element = (function uix$compiler$alpha$component_element(tag,v){
var js_props = ({});
(js_props.argv = v);

var temp__5743__auto___100896 = uix.compiler.alpha.key_from_vec(v);
if((temp__5743__auto___100896 == null)){
} else {
var key_100897 = temp__5743__auto___100896;
goog.object.set(js_props,"key",key_100897);
}

var G__100842 = uix.compiler.alpha.as_component(tag);
var G__100843 = js_props;
return module$node_modules$react$index.createElement(G__100842,G__100843);
});
uix.compiler.alpha.vec_to_elem = (function uix$compiler$alpha$vec_to_elem(v){
var tag = v.cljs$core$IIndexed$_nth$arity$3(null,(0),null);
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword(null,"<>","<>",1280186386),tag)){
return uix.compiler.alpha.fragment_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword(null,"#","#",-275793773),tag)){
return uix.compiler.alpha.suspense_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword(null,"->","->",514830339),tag)){
return uix.compiler.alpha.portal_element(v);
} else {
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword(null,">",">",-555517146),tag)){
return uix.compiler.alpha.interop_element(v);
} else {
if(uix.compiler.alpha.hiccup_tag_QMARK_(tag)){
return uix.compiler.alpha.native_element(uix.compiler.alpha.cached_parse(tag.cljs$core$INamed$_name$arity$1(null)),v,(1));
} else {
return uix.compiler.alpha.component_element(tag,v);

}
}
}
}
}
});
uix.compiler.alpha.as_element = (function uix$compiler$alpha$as_element(x){
if(uix.compiler.alpha.js_val_QMARK_(x)){
return x;
} else {
if(cljs.core.vector_QMARK_(x)){
return uix.compiler.alpha.vec_to_elem(x);
} else {
if(cljs.core.seq_QMARK_(x)){
return (uix.compiler.alpha.expand_seq.cljs$core$IFn$_invoke$arity$1 ? uix.compiler.alpha.expand_seq.cljs$core$IFn$_invoke$arity$1(x) : uix.compiler.alpha.expand_seq.call(null,x));
} else {
if((x instanceof cljs.core.Keyword)){
return x.cljs$core$INamed$_name$arity$1(null);
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (2147483648))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IPrintWithWriter$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IPrintWithWriter,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IPrintWithWriter,x))){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([x], 0));
} else {
return x;

}
}
}
}
}
});
uix.compiler.alpha.expand_seq = (function uix$compiler$alpha$expand_seq(s){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret,e){
ret.push(uix.compiler.alpha.as_element(e));

return ret;
}),[],s);
});
uix.compiler.alpha.make_element = (function uix$compiler$alpha$make_element(argv,component,js_props,first_child){
var G__100849 = (argv.cljs$core$ICounted$_count$arity$1(null) - first_child);
switch (G__100849) {
case (0):
return module$node_modules$react$index.createElement(component,js_props);

break;
case (1):
var G__100850 = component;
var G__100851 = js_props;
var G__100852 = uix.compiler.alpha.as_element(argv.cljs$core$IIndexed$_nth$arity$3(null,first_child,null));
return module$node_modules$react$index.createElement(G__100850,G__100851,G__100852);

break;
default:
return module$node_modules$react$index.createElement.apply(null,cljs.core.reduce_kv((function (a,k,v){
if((k >= first_child)){
a.push(uix.compiler.alpha.as_element(v));
} else {
}

return a;
}),[component,js_props],argv));

}
});

//# sourceMappingURL=uix.compiler.alpha.js.map
