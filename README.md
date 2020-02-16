# root

## examples

- [minimal](https://den1k.github.io/root/minimal.html)
- [hackernews reader](https://den1k.github.io/root/fetch.html)
- [using spec](https://den1k.github.io/root/spec-dispatch.html)

## problems with current UI development conventions

- anti-ui-reuse: data-fetching inside components or through wrapper components
    - **solution:** data-first. components are defined as dispatches on data but oblivious to data-origin.
- defocused UI: component tree as the result of numerous control flow decisions spread out over many components
    - child-components rendered as a reaction: state change → parent-component subscription → control flow expression → child-component
    - **solution:** component tree is derived from data traversal by dispatching nodes along the way. Derived component tree has broadly the same shape as the data.
- lacking oversight: dense component tree (DOM elements and css classes and elements) makes semantics unclear
    - **solution:** print the (denormalized) data. Done.
- application data is invisible in the UI until components are defined and instantiated
    - **solution:** Data first, incremental UI development! Render views for your data even when components for it are not yet defined.

## problems with root

- loose UIX dependency
    - for a reactive/dynamic root: single DB in xframe doesn't currently allow for multiple roots to render within each other
    - xframe (re-frame like event handling+subscription sub-lib) is overkill. Reagent ratom + cursor like abstraction would do.

## License

Copyright © 2020 Dennis Heihoff

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
