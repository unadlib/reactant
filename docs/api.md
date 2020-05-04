## API Reference

### reactant

* [createApp](api/reactant/modules/_createapp_.md)
* [useConnector](api/reactant/modules/_hooks_useconnector_.md)
* [@injectable](api/reactant-di/modules/_decorators_injectable_.md)
* [@inject](api/reactant-di/modules/_decorators_inject_.md)
* [@optional](api/reactant-di/modules/_decorators_optional_.md)
* [@multiInject](api/reactant-di/modules/_decorators_multiinject_.md)
* [@multiOptional](api/reactant-di/modules/_decorators_multioptional_.md)
* [ModuleRef](api/reactant-di/modules/_createcontainer_.md)
* [forwardRef](api/reactant-di/modules/_createcontainer_.md)
* [createSelector](api/reactant-module/modules/_core_createselector_.md)
* [createState](api/reactant-module/modules/_core_createstate_.md)
* [dispatch](api/reactant-module/modules/_core_dispatch_.md)
* [subscribe](api/reactant-module/modules/_core_subscriber_.md)
* [watch](api/reactant-module/modules/_core_subscriber_.md)
* [ViewModule](api/reactant-module/modules/_core_view_.md)
* [PluginModule](api/reactant-module/modules/_core_plugin_.md)
* [@state](api/reactant-module/modules/_decorators_state_.md)
* [@action](api/reactant-module/modules/_decorators_action_.md)
* [@defaultProps](api/reactant-module/modules/_decorators_defaultProps_.md)
* [@autobind](api/reactant-module/modules/_decorators_autobind_.md)
* batch

## reactant-web

* render

## reactant-native

todo

## Tips

- `ViewModule` class `component` support inheritance, and it does not support call `super.component` for JSX Element but support call function.
- `@action` support inheritance and call `super`.
- Performance optimization
  - Selector from `createSelector`can be passed in immutable state.
  - `batch` can be used to optimize rendering performance.
  - `dispatch` and `createState` support Redux action and reducer.
- Decorators
  - Default injection, no require `@inject` unless binding identifier.
  - All decorators support any identifier.
  - `@multiInject` and `@multiOptional` require identifier parameter.
- The module of property `name` will be changed, if the module of `identifier` is `string` or module is injected in multiple.
