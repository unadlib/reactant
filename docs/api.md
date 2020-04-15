## API Reference

### reactant

- ViewModule
- createApp
- useConnector
- @injectable
- @state
- @action
- @optional
- @inject
- @multiInject
- @multiOptional
- @module
- createSelector
- @defaultProps
- dispatch
- createState
- batch
- subscribe
- watch
- ModuleRef
- forwardRef

## reactant-web

- render

todo

## Tips

- `ViewModule` class `component` support inheritance, and it does not support call `super.component` for JSX Element but support call function.
- `@action` support inheritance and call `super`.
- Performance optimization
  - Selector from `createSelector`can be passed in immutable state.
  - `batch` can be used to optimize rendering performance.
  - `dispatch` and `createState` support prue Redux action and reducer.
- Decorators
  - Default injection, no require `@inject` unless binding token.
  - All decorators support any token.
  - `@multiInject` and `@multiOptional` require token parameter.
- The module of property `name` will be changed, if the module of `token` is `string` or module is injected in multiple.
