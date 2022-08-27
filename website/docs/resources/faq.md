---
sidebar_position: 2
---

# FAQ

## Is Reactant based entirely on the React library?

Yes.

So almost all of the libraries in React's ecosystem can be integrated and used in Reactant. For example, Reactant already provides `reactant-storage`, which is a plugin module for Reactant based on `redux-persist`; and also provides `reactant-router`, which is another plugin module for Reactant based on `react-router`, and so on. 

In fact, using concepts such as Reactant's `PluginModule`, you can encapsulate almost any React ecosystem based library to achieve a complete modular model for your own use.

## Why is Reactant's state management immutable, but the updated `@action` does mutation?

Because Reactant's state management is based on `Redux` and `Immer`, `Redux` ensures that Reactant's default shared state is immutable, and `Immer` allows immutable shared states to be updated succinctly by mutation.

## Reactant integrates Redux as a state management library, so can I use other state management libraries?

Of course.

If `@state` is not used at all, then Reactant will not run `Redux`, so you can use any state management library you need, such as `MobX`, `MST`, etc.

## Tips

- `ViewModule` class `component` support inheritance, and it does not support call `super.component` for JSX Element but support call function.
- `@action` support inheritance and call `super`. And if it is a cross-module call to another `@action` decorated function within an `@action` decorated function, it will automatically merge the dispatch updates.
- Performance optimization
  - Using `@computed` for derived data.
  - `batch` can be used to optimize rendering performance.
  - `dispatch` and `createState` support Redux action and reducer.
- Decorators
  - Default injection, no require `@inject` unless binding identifier.
  - All decorators support any identifier.
  - `@multiInject` and `@multiOptional` require identifier parameter.
- The module of property `name` will be changed, if the module of `identifier` is `string` or module is injected in multiple.
