# root

**What is root?**

root is a recursive UI resolver.

**Does root manage state?**

No, root is agnostic to your state and state management. It cares only for a `lookup` function.

**What is developing a root like?**

root is data first, meaning that without component props it renders nothing. Once you have the data it let's you develop incrementally, meaning that it renders a UI even when UI components are not defined for that given piece of data.

## live examples

- [minimal](https://den1k.github.io/root/minimal.html)
- [hackernews reader](https://den1k.github.io/root/fetch.html)
- [using spec](https://den1k.github.io/root/spec-dispatch.html)

## code example

Here's what a minimal root looks like:
```clojure
(def root
  (rc/ui-root
   {:lookup       (fn [k] (get data k))
    :dispatch-fn  :type
    :content-keys [:content]
    :content-spec integer?}))
```

With data:

```clojure
(def data
  {1 {:type       :user
      :first-name "Eva"
      :last-name  "Luator"}})
```

rendering `[root :resolve {:root-id 1}]` results in

<img src="https://github.com/den1k/root/blob/master/docs/img/resolve-1.png?raw=true"
width="300px"/>

The red border marks the `default-view` in root. It always tries to render all
keys and values on the node.

root acts like `multimethod`. New UI components can be added like so:

```clojure
(root :view :profile-pic
  (fn [{:keys [src]}]
    [:img.br-100 {:src src}]))
```

`:profile-pic` is the `dispatch-value` the function is the UI component definition in hiccup.

If we now define `data` to be
```clojure
(def data
  {1 {:type       :user
      :first-name "Eva"
      :last-name  "Luator"
      :content    {:profile-pic 3
                   :address     2}}
   2 {:type   :address
      :street "1 Long Infinite Loop"}
   3 {:type :profile-pic
      :src  "https://picsum.photos/id/1005/200"}})
```

root will use `content-keys` to examine each node for child-content and when such content exists pass it to `lookup` in turn. `lookup` is expected to return a node that might again have children under `content-keys` and from there the root grows (recurses).

When lookup returns a non-nil value, root invokes it with `dispatch-fn` looking for a matching UI component. In the case of `:profile-pic` it found the component we defined above. However, for `:user` and `:address` it fell back on `default-view`.

Now the rendered result is:

<img src="https://github.com/den1k/root/blob/master/docs/img/resolve-2.png?raw=true"
width="400px"/>

[Here's](https://github.com/den1k/root/blob/master/dev/examples/minimal/views.cljc)
the full code and [live example](https://den1k.github.io/root/minimal.html). I recommend playing with it yourself.

<details>
<summary>problems with current UI development conventions</summary>

- anti-ui-reuse: data-fetching inside components or through wrapper components
    - **solution:** data-first. components are defined as dispatches on data but oblivious to data-origin.
- defocused UI: component tree as the result of numerous control flow decisions spread out over many components
    - child-components rendered as a reaction: state change → parent-component subscription → control flow expression → child-component
    - **solution:** component tree is derived from data traversal by dispatching nodes along the way. Derived component tree has broadly the same shape as the data.
- lacking oversight: dense component tree (DOM elements and css classes and elements) makes semantics unclear
    - **solution:** print the (denormalized) data. Done.
- application data is invisible in the UI until components are defined and instantiated
    - **solution:** Data first, incremental UI development! Render views for your data even when components for it are not yet defined.
</details>

<details>
<summary>problems with root</summary>

- loose UIX dependency
    - for a reactive/dynamic root: single DB in xframe doesn't currently allow for multiple roots to render within each other
    - xframe (re-frame like event handling+subscription sub-lib) is overkill. Reagent ratom + cursor like abstraction would do.
</details>

## License

Copyright © 2020 Dennis Heihoff

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
