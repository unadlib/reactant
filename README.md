# reactant

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A framework for building React web applications, inspired by [Angular](https://angular.io/).

## Motivation

## Examples

```tsx
@injectable()
class Counter {
  state = {
    count: 0,
  };

  @action
  increase() {
    this.state.count += 1;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.state.count);
    return (
      <button type="button" onClick={() => this.counter.increase()}>
        {count}
      </button>
    );
  }
}

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('app'));
```

## Goal

- Immutable
- Easy
- High-performance
- Flexible

## Libraries

- react
- redux
- inversify
- immer
- reselect

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

## API

### reactant

- ViewModule
- createApp
- useConnector
- @injectable
- @action
- @optional
- @inject
- @multiInject
- @multiOptional
- @module
- createSelector
- @defautlProps
- dispatch
- createState
- batch
- subscribe
- watch
- ModuleRef
- forwardRef

## TODO

- [x] selector
- [x] action
- [x] multiple ViewModule instances
- [x] optimize action
- [x] @defautlProps
- [x] useConnector
- [x] check `batch`
- [x] Enhance DI
  - [x] optional
  - [x] inject
  - [x] multi-inject
  - [x] multi-optional
- [x] @module
- [x] middleware
- [x] pluggable
- [x] storage
- [x] router
- [x] redux-devtool
- [x] auto-freeze
- [x] Support JavaScript
- [x] subscribe
- [x] watch
- [x] model
- [x] redux
- [x] circular dependencies

- [ ] API doc
- [ ] tracker
- [ ] hierarchical DI systems
- [ ] mobx
- [ ] Form
- [ ] Network
- [ ] i18n
- [ ] Accessibility
- [ ] C4
- [ ] Micro Front-end
- [ ] CLI
- [ ] VSCode Plug-in
- [ ] testing
- [ ] SSR
- [ ] Hook
