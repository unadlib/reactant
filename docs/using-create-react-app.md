---
id: using-create-react-app
title: Using create-react-app
sidebar_label: Using create-react-app
---

If you use the `create-react-app`, after completing it perform the following steps:

> The following documents all use `yarn` as an example, if you are using `npm`, then please refer to the same `npm` command.

## Create app with `create-react-app`

```sh
npx create-react-app my-app
cd my-app
```

## Eject project

Because `create-react-app` uses `react-scripts` CLI by default, it needs to be ejected.

```sh
yarn eject
```

## Install Reactant

You need to install `reactant`(Core API) and `reactant-web`(for Web API).

```sh
yarn add reactant reactant-web
```

## Add the babel configuration

Reactant development need `@babel/plugin-proposal-decorators` and `@babel/plugin-proposal-class-properties`. If you find that they are not installed, run `yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties` to install them.

And then add babel config in `package.json`:

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

> If using `create-react-app` with TypeScript template, you can install `babel-plugin-transform-typescript-metadata` for supporting TypeScript metadata with dependency injection, and set the babel configuration about it.

## Add the example code with JavaScript

Change the code of the `src/index.js` file:

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

## Run the app

```sh
yarn start
```

> Note: If you need to create files quickly, you can visit [reactant-cli](cli.md) for more information.
