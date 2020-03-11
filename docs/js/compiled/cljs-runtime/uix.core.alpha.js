goog.provide('uix.core.alpha');
goog.require('cljs.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
goog.require('uix.compiler.alpha');
goog.require('uix.compiler.aot');
goog.require('uix.lib');
goog.require('uix.hooks.alpha');
if(((goog.DEBUG) && ((typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined')))){
if((typeof uix !== 'undefined') && (typeof uix.core !== 'undefined') && (typeof uix.core.alpha !== 'undefined') && (typeof uix.core.alpha.__devtools_hook !== 'undefined')){
} else {
uix.core.alpha.__devtools_hook = (function (){var value = cljs.core.volatile_BANG_(null);
var react_type_setter = (function (v){
return cljs.core.vreset_BANG_(value,v);
});
var react_type_getter = (function (){
var temp__5737__auto__ = cljs.core.deref(value).uixf;
if(cljs.core.truth_(temp__5737__auto__)){
var uixf = temp__5737__auto__;
return uixf;
} else {
return cljs.core.deref(value);
}
});
var config = ({"get": react_type_getter, "set": react_type_setter});
return Object.defineProperty(window,"$type",config);
})();
}
} else {
}
uix.core.alpha.strict_mode = (function uix$core$alpha$strict_mode(child){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react$index.StrictMode,child], null);
});
uix.core.alpha.profiler = (function uix$core$alpha$profiler(child,p__100898){
var map__100899 = p__100898;
var map__100899__$1 = (((((!((map__100899 == null))))?(((((map__100899.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__100899.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__100899):map__100899);
var attrs = map__100899__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100899__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var on_render = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100899__$1,new cljs.core.Keyword(null,"on-render","on-render",2096729391));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react$index.Profiler,attrs,child], null);
});
/**
 * Creates class based React component
 */
uix.core.alpha.create_class = (function uix$core$alpha$create_class(p__100901){
var map__100902 = p__100901;
var map__100902__$1 = (((((!((map__100902 == null))))?(((((map__100902.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__100902.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__100902):map__100902);
var constructor$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100902__$1,new cljs.core.Keyword(null,"constructor","constructor",-1953928811));
var static$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100902__$1,new cljs.core.Keyword(null,"static","static",1214358571));
var prototype = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100902__$1,new cljs.core.Keyword(null,"prototype","prototype",-1121365005));
var ctor = (function (props){
var this_100952 = this;
module$node_modules$react$index.Component.apply(this_100952,arguments);

if(cljs.core.truth_(constructor$)){
(constructor$.cljs$core$IFn$_invoke$arity$2 ? constructor$.cljs$core$IFn$_invoke$arity$2(this_100952,props) : constructor$.call(null,this_100952,props));
} else {
}

return null;
});
(ctor.prototype = Object.create(module$node_modules$react$index.Component.prototype));

var v__40233__auto___100953 = static$;
if(cljs.core.seq(v__40233__auto___100953)){
var x__40234__auto___100954 = cljs.core.first(v__40233__auto___100953);
var xs__40235__auto___100955 = cljs.core.next(v__40233__auto___100953);
while(true){
var vec__100908_100956 = x__40234__auto___100954;
var k_100957 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100908_100956,(0),null);
var v_100958 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100908_100956,(1),null);
(ctor[cljs.core.name(k_100957)] = v_100958);

if(cljs.core.seq(xs__40235__auto___100955)){
var G__100960 = cljs.core.first(xs__40235__auto___100955);
var G__100961 = cljs.core.next(xs__40235__auto___100955);
x__40234__auto___100954 = G__100960;
xs__40235__auto___100955 = G__100961;
continue;
} else {
}
break;
}
} else {
}

var v__40233__auto___100962 = prototype;
if(cljs.core.seq(v__40233__auto___100962)){
var x__40234__auto___100963 = cljs.core.first(v__40233__auto___100962);
var xs__40235__auto___100964 = cljs.core.next(v__40233__auto___100962);
while(true){
var vec__100914_100965 = x__40234__auto___100963;
var k_100966 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100914_100965,(0),null);
var v_100967 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__100914_100965,(1),null);
(ctor.prototype[cljs.core.name(k_100966)] = v_100967);

if(cljs.core.seq(xs__40235__auto___100964)){
var G__100968 = cljs.core.first(xs__40235__auto___100964);
var G__100969 = cljs.core.next(xs__40235__auto___100964);
x__40234__auto___100963 = G__100968;
xs__40235__auto___100964 = G__100969;
continue;
} else {
}
break;
}
} else {
}

return ctor;
});
/**
 * Creates React's Error Boundary component
 * 
 *  display-name — the name of the component to be displayed in stack trace
 *  error->state — maps error object to component's state that is used in render-fn
 *  handle-catch — for side-effects, logging etc.
 *  render-fn — takes state value returned from error->state and a vector of arguments passed into error boundary
 */
uix.core.alpha.create_error_boundary = (function uix$core$alpha$create_error_boundary(p__100917,render_fn){
var map__100918 = p__100917;
var map__100918__$1 = (((((!((map__100918 == null))))?(((((map__100918.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__100918.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__100918):map__100918);
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__100918__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("error-boundary")));
var error__GT_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100918__$1,new cljs.core.Keyword(null,"error->state","error->state",-2041213326));
var handle_catch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100918__$1,new cljs.core.Keyword(null,"handle-catch","handle-catch",194751791));
var constructor$ = (function (this$,_){
(this$.state = ({"argv": null}));

var x100920 = this$.state;
(x100920.cljs$core$IDeref$ = cljs.core.PROTOCOL_SENTINEL);

(x100920.cljs$core$IDeref$_deref$arity$1 = (function (o){
var o__$1 = this;
return this$.state.argv;
}));

(x100920.cljs$core$IReset$ = cljs.core.PROTOCOL_SENTINEL);

(x100920.cljs$core$IReset$_reset_BANG_$arity$2 = (function (o,new_value){
var o__$1 = this;
this$.setState(({"argv": new_value}));

return new_value;
}));

(x100920.cljs$core$ISwap$ = cljs.core.PROTOCOL_SENTINEL);

(x100920.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (o,f){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__100921 = cljs.core._deref(o__$1);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__100921) : f.call(null,G__100921));
})());
}));

(x100920.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (o,f,a){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__100922 = cljs.core._deref(o__$1);
var G__100923 = a;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__100922,G__100923) : f.call(null,G__100922,G__100923));
})());
}));

(x100920.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (o,f,a,b){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,(function (){var G__100924 = cljs.core._deref(o__$1);
var G__100925 = a;
var G__100926 = b;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__100924,G__100925,G__100926) : f.call(null,G__100924,G__100925,G__100926));
})());
}));

(x100920.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (o,f,a,b,xs){
var o__$1 = this;
return cljs.core._reset_BANG_(o__$1,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,cljs.core._deref(o__$1),a,b,xs));
}));

return x100920;
});
var derive_state = (function (error){
return ({"argv": (error__GT_state.cljs$core$IFn$_invoke$arity$1 ? error__GT_state.cljs$core$IFn$_invoke$arity$1(error) : error__GT_state.call(null,error))});
});
var render = (function (){
var this$ = this;
var args = this$.props.argv;
var state = this$.state;
var G__100927 = (render_fn.cljs$core$IFn$_invoke$arity$2 ? render_fn.cljs$core$IFn$_invoke$arity$2(state,args) : render_fn.call(null,state,args));
return (uix.core.alpha.as_element.cljs$core$IFn$_invoke$arity$1 ? uix.core.alpha.as_element.cljs$core$IFn$_invoke$arity$1(G__100927) : uix.core.alpha.as_element.call(null,G__100927));
});
var klass = uix.core.alpha.create_class(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"constructor","constructor",-1953928811),constructor$,new cljs.core.Keyword(null,"static","static",1214358571),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"displayName","displayName",-809144601),display_name,new cljs.core.Keyword(null,"getDerivedStateFromError","getDerivedStateFromError",166658477),derive_state], null),new cljs.core.Keyword(null,"prototype","prototype",-1121365005),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"componentDidCatch","componentDidCatch",821717733),handle_catch,new cljs.core.Keyword(null,"render","render",-1408033454),render], null)], null));
return (function() { 
var G__100976__delegate = function (args){
var G__100928 = klass;
var G__100929 = ({"argv": args});
return module$node_modules$react$index.createElement(G__100928,G__100929);
};
var G__100976 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__100977__i = 0, G__100977__a = new Array(arguments.length -  0);
while (G__100977__i < G__100977__a.length) {G__100977__a[G__100977__i] = arguments[G__100977__i + 0]; ++G__100977__i;}
  args = new cljs.core.IndexedSeq(G__100977__a,0,null);
} 
return G__100976__delegate.call(this,args);};
G__100976.cljs$lang$maxFixedArity = 0;
G__100976.cljs$lang$applyTo = (function (arglist__100978){
var args = cljs.core.seq(arglist__100978);
return G__100976__delegate(args);
});
G__100976.cljs$core$IFn$_invoke$arity$variadic = G__100976__delegate;
return G__100976;
})()
;
});

/**
* @constructor
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
uix.core.alpha.ReactRef = (function (current){
this.current = current;
this.cljs$lang$protocol_mask$partition0$ = 2151710720;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(uix.core.alpha.ReactRef.prototype.equiv = (function (other){
var self__ = this;
var this$ = this;
return cljs.core._equiv(this$,other);
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IHash$_hash$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return goog.getUid(o__$1);
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var self__ = this;
var o__$1 = this;
return self__.current;
}));

(uix.core.alpha.ReactRef.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (o,writer,opts){
var self__ = this;
var o__$1 = this;
cljs.core._write(writer,"#object [uix.core.alpha.ReactRef ");

cljs.core.pr_writer(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),o__$1.cljs$core$IDeref$_deref$arity$1(null)], null),writer,opts);

return cljs.core._write(writer,"]");
}));

(uix.core.alpha.ReactRef.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"current","current",552492924,null)], null);
}));

(uix.core.alpha.ReactRef.cljs$lang$type = true);

(uix.core.alpha.ReactRef.cljs$lang$ctorStr = "uix.core.alpha/ReactRef");

(uix.core.alpha.ReactRef.cljs$lang$ctorPrWriter = (function (this__4428__auto__,writer__4429__auto__,opt__4430__auto__){
return cljs.core._write(writer__4429__auto__,"uix.core.alpha/ReactRef");
}));

/**
 * Positional factory function for uix.core.alpha/ReactRef.
 */
uix.core.alpha.__GT_ReactRef = (function uix$core$alpha$__GT_ReactRef(current){
return (new uix.core.alpha.ReactRef(current));
});

/**
 * Creates React's ref type object.
 */
uix.core.alpha.create_ref = (function uix$core$alpha$create_ref(var_args){
var G__100931 = arguments.length;
switch (G__100931) {
case 0:
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1(null);
}));

(uix.core.alpha.create_ref.cljs$core$IFn$_invoke$arity$1 = (function (v){
return (new uix.core.alpha.ReactRef(v));
}));

(uix.core.alpha.create_ref.cljs$lang$maxFixedArity = 1);

/**
 * Takes component `f` and comparator function `should-update?`
 *   that takes previous and next props of the component.
 *   Returns memoized `f`.
 * 
 *   When `should-update?` is not provided uses default comparator
 *   that compares props with clojure.core/=
 * 
 *   UIx components are memoized by default
 */
uix.core.alpha.memoize = (function uix$core$alpha$memoize(var_args){
var G__100934 = arguments.length;
switch (G__100934) {
case 1:
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2(f,uix.compiler.alpha._STAR_default_compare_args_STAR_);
}));

(uix.core.alpha.memoize.cljs$core$IFn$_invoke$arity$2 = (function (f,should_update_QMARK_){
var G__100935 = (function (p1__100932_SHARP_){
return uix.compiler.alpha.as_element(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.next(p1__100932_SHARP_.argv)));
});
var G__100936 = should_update_QMARK_;
return module$node_modules$react$index.memo(G__100935,G__100936);
}));

(uix.core.alpha.memoize.cljs$lang$maxFixedArity = 2);

/**
 * Disables memoization of the `f` component
 */
uix.core.alpha.no_memoize_BANG_ = (function uix$core$alpha$no_memoize_BANG_(f){
return (f.uix_no_memo = true);
});
/**
 * Takes initial value and returns React's state hook wrapped in atom-like type.
 */
uix.core.alpha.state = (function uix$core$alpha$state(value){
return uix.hooks.alpha.state(value);
});
/**
 * Takes a function to be executed in an effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#useeffect
 */
uix.core.alpha.effect_BANG_ = (function uix$core$alpha$effect_BANG_(var_args){
var G__100938 = arguments.length;
switch (G__100938) {
case 1:
return uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$1(setup_fn);
}));

(uix.core.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
return uix.hooks.alpha.effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,deps);
}));

(uix.core.alpha.effect_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function to be executed in a layout effect and optional vector of dependencies.
 * 
 *   See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
uix.core.alpha.layout_effect_BANG_ = (function uix$core$alpha$layout_effect_BANG_(var_args){
var G__100940 = arguments.length;
switch (G__100940) {
case 1:
return uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (setup_fn){
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$1(setup_fn);
}));

(uix.core.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (setup_fn,deps){
return uix.hooks.alpha.layout_effect_BANG_.cljs$core$IFn$_invoke$arity$2(setup_fn,deps);
}));

(uix.core.alpha.layout_effect_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Takes function f and optional vector of dependencies, and returns memoized f.
 */
uix.core.alpha.memo = (function uix$core$alpha$memo(var_args){
var G__100942 = arguments.length;
switch (G__100942) {
case 1:
return uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$1(f);
}));

(uix.core.alpha.memo.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
return uix.hooks.alpha.memo.cljs$core$IFn$_invoke$arity$2(f,deps);
}));

(uix.core.alpha.memo.cljs$lang$maxFixedArity = 2);

/**
 * Takes optional initial value and returns React's ref hook wrapped in atom-like type.
 */
uix.core.alpha.ref = (function uix$core$alpha$ref(var_args){
var G__100944 = arguments.length;
switch (G__100944) {
case 0:
return uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$0 = (function (){
return uix.hooks.alpha.ref(null);
}));

(uix.core.alpha.ref.cljs$core$IFn$_invoke$arity$1 = (function (value){
return uix.hooks.alpha.ref(value);
}));

(uix.core.alpha.ref.cljs$lang$maxFixedArity = 1);

/**
 * Takes function f and optional vector of dependencies, and returns f.
 */
uix.core.alpha.callback = (function uix$core$alpha$callback(var_args){
var G__100946 = arguments.length;
switch (G__100946) {
case 1:
return uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$1(f);
}));

(uix.core.alpha.callback.cljs$core$IFn$_invoke$arity$2 = (function (f,deps){
return uix.hooks.alpha.callback.cljs$core$IFn$_invoke$arity$2(f,deps);
}));

(uix.core.alpha.callback.cljs$lang$maxFixedArity = 2);

/**
 * subscribe - fn, takes callback, sets up a listener on external event emitter
 *             which calls the callback and returns a function that unsets the listener.
 * 
 *   get-current-value - fn, returns current state of the external event emitter
 */
uix.core.alpha.subscribe = (function uix$core$alpha$subscribe(p__100947){
var map__100948 = p__100947;
var map__100948__$1 = (((((!((map__100948 == null))))?(((((map__100948.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__100948.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__100948):map__100948);
var subscription = map__100948__$1;
var get_current_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100948__$1,new cljs.core.Keyword(null,"get-current-value","get-current-value",-1706578691));
var subscribe = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__100948__$1,new cljs.core.Keyword(null,"subscribe","subscribe",416253756));
return uix.hooks.alpha.subscribe(subscription);
});
uix.core.alpha.create_context = (function uix$core$alpha$create_context(v){
return module$node_modules$react$index.createContext(v);
});
/**
 * Takes React context and returns its current value
 */
uix.core.alpha.context = (function uix$core$alpha$context(v){
return uix.hooks.alpha.context(v);
});
uix.core.alpha.as_element = (function uix$core$alpha$as_element(x){

return uix.compiler.alpha.as_element(x);
});
/**
 * Interop with React components. Takes UIx component function and returns same component wrapped into interop layer.
 */
uix.core.alpha.as_react = (function uix$core$alpha$as_react(f){
return uix.compiler.alpha.as_react(f);
});
uix.core.alpha.add_transform_fn = (function uix$core$alpha$add_transform_fn(f){

return uix.compiler.alpha.add_transform_fn(f);
});

//# sourceMappingURL=uix.core.alpha.js.map
