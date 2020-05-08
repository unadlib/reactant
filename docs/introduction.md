---
id: introduction
title: Introduction
sidebar_label: What is Reactant?
---

## Create a new project

### Using Reactant CLI

We recommend using the Reactant CLI to quickly create a brand new Reactant project. See more information about [reactant-cli](api/reactant-cli/README.md).

```sh
npx reactant-cli init my-app # default use TypeScript
# use `npx reactant-cli init my-app --language javascript` for creating a Javascript project.
cd my-app
yarn start
```

If you need to customize to create Reactant project, then you can do the following steps:

First, build a React project, visit here for "How to create a React project".

Then, install Reactant dependencies:

```sh
yarn add reactant reactant-web
```

And set up the following related configuration.

>If using JavaScript, make sure you have `@babel/plugin-propose-decorators` and `@babel/plugin-propose-class-properties` installed and configured for Babel.

>If using TypeScript, make sure to enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`.

### Using `create-react-app`

If you use the `create-react-app`, after completing it perform the following steps:

1. `yarn eject`
2. `yarn add reactant reactant-web`
3. Add babel config in `package.json`:

```json
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

4. Change the code of the `src/index.js` file:

```jsx
import React from 'react';
import { render } from 'reactant-web';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';

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
}

@injectable({
  deps: [Counter],
})
class AppView extends ViewModule {
  constructor(counter) {
    super();
    this.counter = counter;
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <>
        <button type="button" onClick={() => this.counter.decrease()}>
          -
        </button>
        <div>{count}</div>
        <button type="button" onClick={() => this.counter.increase()}>
          +
        </button>
      </>
    );
  }
}

const app = createApp({
  main: AppView,
  render,
});

app.bootstrap(document.getElementById('root'));
```


## Service module

Use `reactant-cli` to generate a new service file:

```sh
npx reactant-cli generate service my-service
```

`@state` used to decorate a module immutable state, `@action` used to decorate a function to change the module state. Although the decorated state is an immutable state, you can actually update the state in this module using mutations in the method decorated by `@action`.

`@injectable` is used to decorate a module that can be injected. While Reactant also supports modules that do not require `@injectable` decoration in advance, we recommend `@injectable` decoration for any module that requires dependency injection.

> `@injectable` parameters in TypeScript and JavaScript are completely different, See [more details](api/reactant-di/README.md).

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

> Reactant provides dependency injection features, see [dependency injection](api/reactant-di/README.md).

## ViewModule

Use `reactant-cli` to generate a new view module file:

```sh
npx reactant-cli generate view my-service
```

`ViewModule` is a core concept of Reactant. It will be defined the dependencies and logic between non-view modules and UI components. It embodies the separation of attention, where the separation of UI logic and business logic is coalesced. See more [concepts](concepts.md) of Reactant.

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

## Bootstrap

Finally, use `createApp` and `bootstrap` to run the project. Reactant configures different dependency injection configurations via `createApp`, which also supports other configurations such as **middleware** and Reactant **plugins**. See more [advanced guides](advanced-guides.md) about Reactant.

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
