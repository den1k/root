goog.provide('devtools.async');
goog.require('cljs.core');
goog.require('goog.async.nextTick');
goog.require('goog.labs.userAgent.browser');
goog.require('devtools.context');
devtools.async.available_QMARK_ = (function devtools$async$available_QMARK_(){
return (typeof Promise !== 'undefined');
});
devtools.async.fixed_chrome_version_for_async = "65.0.3321";
devtools.async.needed_QMARK_ = (function devtools$async$needed_QMARK_(){
return cljs.core.not((function (){var and__4174__auto__ = goog.labs.userAgent.browser.isChrome();
if(cljs.core.truth_(and__4174__auto__)){
return goog.labs.userAgent.browser.isVersionOrHigher(devtools.async.fixed_chrome_version_for_async);
} else {
return and__4174__auto__;
}
})());
});
devtools.async.get_not_needed_message = (function devtools$async$get_not_needed_message(){
return ["cljs-devtools: the :async feature is no longer needed since Chrome ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(devtools.async.fixed_chrome_version_for_async),", ","see https://github.com/binaryage/cljs-devtools/issues/20"].join('');
});
devtools.async._STAR_installed_STAR_ = false;
devtools.async._STAR_original_set_immediate_STAR_ = null;
devtools.async.rethrow_outside_promise = (function devtools$async$rethrow_outside_promise(e){
return setTimeout((function (){
throw e;
}),(0));
});
devtools.async.promise_based_set_immediate = (function devtools$async$promise_based_set_immediate(callback){
var o__38557__auto___100337 = (function (){var o__38557__auto___100337 = (function (){var o__38557__auto___100337 = Promise;
return (o__38557__auto___100337["resolve"]).call(o__38557__auto___100337);
})();
return (o__38557__auto___100337["then"]).call(o__38557__auto___100337,callback);
})();
(o__38557__auto___100337["catch"]).call(o__38557__auto___100337,devtools.async.rethrow_outside_promise);

return null;
});
devtools.async.install_async_set_immediate_BANG_ = (function devtools$async$install_async_set_immediate_BANG_(){
(devtools.async._STAR_original_set_immediate_STAR_ = goog.async.nextTick.setImmediate_);

return (goog.async.nextTick.setImmediate_ = devtools.async.promise_based_set_immediate);
});
devtools.async.uninstall_async_set_immediate_BANG_ = (function devtools$async$uninstall_async_set_immediate_BANG_(){
return (goog.async.nextTick.setImmediate_ = devtools.async._STAR_original_set_immediate_STAR_);
});
devtools.async.installed_QMARK_ = (function devtools$async$installed_QMARK_(){
return devtools.async._STAR_installed_STAR_;
});
devtools.async.install_BANG_ = (function devtools$async$install_BANG_(){
if(cljs.core.truth_(devtools.async._STAR_installed_STAR_)){
return null;
} else {
(devtools.async._STAR_installed_STAR_ = true);

var G__100336_100338 = Error;
var target__38562__auto___100339 = G__100336_100338;
if(cljs.core.truth_(target__38562__auto___100339)){
} else {
throw (new Error(["Assert failed: ",["unable to locate object path ",null," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__100336_100338)].join(''),"\n","target__38562__auto__"].join('')));
}

(target__38562__auto___100339["stackTraceLimit"] = Infinity);


devtools.async.install_async_set_immediate_BANG_();

if((devtools.async.needed_QMARK_.cljs$core$IFn$_invoke$arity$0 ? devtools.async.needed_QMARK_.cljs$core$IFn$_invoke$arity$0() : devtools.async.needed_QMARK_.call(null))){
} else {
(devtools.context.get_console.cljs$core$IFn$_invoke$arity$0 ? devtools.context.get_console.cljs$core$IFn$_invoke$arity$0() : devtools.context.get_console.call(null)).info((devtools.async.get_not_needed_message.cljs$core$IFn$_invoke$arity$0 ? devtools.async.get_not_needed_message.cljs$core$IFn$_invoke$arity$0() : devtools.async.get_not_needed_message.call(null)));
}

return true;
}
});
devtools.async.uninstall_BANG_ = (function devtools$async$uninstall_BANG_(){
if(cljs.core.truth_(devtools.async._STAR_installed_STAR_)){
(devtools.async._STAR_installed_STAR_ = false);

return devtools.async.uninstall_async_set_immediate_BANG_();
} else {
return null;
}
});

//# sourceMappingURL=devtools.async.js.map
