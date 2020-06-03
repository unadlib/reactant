---
id: concepts
title: Concepts
---

Reactant only needs to learn a few APIs(`ViewModule`, `injectable`, `useConnector`, `injectable`, `action`, `state`, and `createApp`) for efficient react development.

In addition to the basics of React, Reactant introduces two new concepts, [`ViewModule`](#view-module) and [`PluginModule`](#plugin-module).

## Service Module

`@state` used to decorate a module immutable state, `@action` used to decorate a function to change the module state. Although the decorated state is an immutable state, you can actually update the state in this module using mutations in the method decorated by `@action`.

`@injectable` is used to decorate a module that can be injected. While Reactant also supports modules that do not require `@injectable` decoration in advance, we recommend `@injectable` decoration for any module that requires dependency injection.

> `@injectable` parameters in TypeScript and JavaScript are completely different, See [@injectable](api/reactant-di/modules/_decorators_injectable_.md) for more details.

For Example, `Counter` project set up with `TypeScript`.

```ts
import { injectable, action, state } from 'reactant';

@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }

  @action
  decrease() {
    this.count -= 1;
  }

  doSomething() {
    //
  }
}
```

> Reactant provides dependency injection features, see [dependency injection](di.md).

## View Module

`ViewModule` is a core concept of Reactant. It will be defined the dependencies and logic between non-view modules and UI components. It embodies the separation of attention, where the separation of UI logic and business logic is coalesced.

Dependency injection of service modules using `ViewModule` and connection injection of state in `component`.

```tsx
import { injectable, ViewModule, useConnector } from 'reactant';
// import `Counter`

@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <button type="button" onClick={() => this.counter.increase()}>
        {count}
      </button>
    );
  }
}
```

> The `useConnector` parameter also supports object maps, e.g. `useConnector(() => { count: this.counter.count })`, which works in most scenarios. When the state is updated, `useConnector` will automatically do the shallow comparison for it to determine if the component needs to be updated.

> `ViewModule`can also use `@state` and `@action`, and generally it will use `createSelector()` for computing derived data.

See [`ViewModule`](api/reactant-module/classes/_core_view_.viewmodule.md) for more information.

## Bootstrap

Finally, use `createApp` and `bootstrap` to run the project. Reactant configures different dependency injection configurations via `createApp`, which also supports other configurations such as **middleware** and Reactant **plugins**. See more [advanced guides](di.md) about Reactant.

```ts
import { render } from 'reactant-web';
import { createApp } from 'reactant';
// need to import `AppView`

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('root'));
```

> Here is just a demo of web application, but Reactant is going to support React-Native later.

## Plugin Module

todo

See [`PluginModule`](api/reactant-module/classes/_core_plugin_.pluginmodule.md) for more information.
