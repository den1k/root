goog.provide('uix.dom.alpha');
goog.require('cljs.core');
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
goog.require('uix.compiler.alpha');
/**
 * Renders element into DOM node. The first argument is Hiccup or React element.
 */
uix.dom.alpha.render = (function uix$dom$alpha$render(element,node){
var G__102648 = uix.compiler.alpha.as_element(element);
var G__102649 = node;
return module$node_modules$react_dom$index.render(G__102648,G__102649);
});
uix.dom.alpha.create_root = (function uix$dom$alpha$create_root(node){
return module$node_modules$react_dom$index.unstable_createRoot(node);
});
uix.dom.alpha.render_root = (function uix$dom$alpha$render_root(element,root__$1){
return root__$1.render(uix.compiler.alpha.as_element(element));
});
/**
 * Hydrates server rendered document at `node` with `element`.
 */
uix.dom.alpha.hydrate = (function uix$dom$alpha$hydrate(element,node){
var G__102660 = uix.compiler.alpha.as_element(element);
var G__102661 = node;
return module$node_modules$react_dom$index.hydrate(G__102660,G__102661);
});
uix.dom.alpha.flush_sync_BANG_ = (function uix$dom$alpha$flush_sync_BANG_(cb){
return module$node_modules$react_dom$index.flushSync(cb);
});
uix.dom.alpha.flush_controlled_BANG_ = (function uix$dom$alpha$flush_controlled_BANG_(cb){
return module$node_modules$react_dom$index.unstable_flushControlled(cb);
});
/**
 * Unmounts React component rendered into DOM node
 */
uix.dom.alpha.unmount_at_node = (function uix$dom$alpha$unmount_at_node(node){
return module$node_modules$react_dom$index.unmountComponentAtNode(node);
});
/**
 * Returns top-level DOM node associated with component
 */
uix.dom.alpha.find_dom_node = (function uix$dom$alpha$find_dom_node(component){
return module$node_modules$react_dom$index.findDOMNode(component);
});
/**
 * Renders Hiccup element into DOM node
 */
uix.dom.alpha.create_portal = (function uix$dom$alpha$create_portal(child,node){
var G__102672 = uix.compiler.alpha.as_element(child);
var G__102673 = node;
return module$node_modules$react_dom$index.createPortal(G__102672,G__102673);
});
uix.dom.alpha.render_to_string = (function uix$dom$alpha$render_to_string(element){

return ReactDOMServer.renderToString(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_static_markup = (function uix$dom$alpha$render_to_static_markup(element){

return ReactDOMServer.renderToStaticMarkup(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_stream = (function uix$dom$alpha$render_to_stream(element){
return ReactDOMServer.renderToNodeStream(uix.compiler.alpha.as_element(element));
});
uix.dom.alpha.render_to_static_stream = (function uix$dom$alpha$render_to_static_stream(element){
return ReactDOMServer.renderToStaticNodeStream(uix.compiler.alpha.as_element(element));
});

//# sourceMappingURL=uix.dom.alpha.js.map
