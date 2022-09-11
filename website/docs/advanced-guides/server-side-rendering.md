---
sidebar_position: 7
---

# Server-Side Rendering

SSR (Server-Side Rendering) can greatly improve the first rendering time, the most popular React SSR framework is Next.js. Currently, Reactant has supported SSR based on Next.js.

## Installation

- Build a Next.js application project using the `create-next-app` cli.

```bash
npx create-next-app reactant-ts-ssr --ts
cd reactant-ts-ssr
```

- Install `reactant-ssr`.

```bash npm2yarn
npm install reactant-ssr
```

- Install other `Babel` development dependencies.

```bash npm2yarn
npm install -D @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators babel-plugin-parameter-decorator babel-plugin-transform-typescript-metadata
```

## Configuration

- Next.js with Typescript should use `babel`, and make sure you set:

Add `.babelrc` file

```json
{
  "presets": ["next/babel"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "babel-plugin-parameter-decorator",
    "babel-plugin-transform-typescript-metadata"
  ]
}
```

Add this config to `tsconfig.json` file

```diff
+    "experimentalDecorators": true,
+    "emitDecoratorMetadata": true
```

## Usage

1. Define a module file for SSR `src/index.tsx`:

```tsx
import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant-ssr';

@injectable()
export class Counter {
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

@injectable()
export class CounterView extends ViewModule {
  constructor(public counter: Counter) {
    super();
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
```

2. Add custom Next.js app in `pages/_app.tsx` file.

```tsx
import { createServerApp } from "reactant-ssr";
import { CounterView } from "../src/index";

export const app = createServerApp({
  modules: [CounterView],
});

export default app.bootstrap;
```

3. Add home page routing page in `pages/index.tsx` file.

```tsx
import { CounterView } from "../src/index";
import { app } from "./_app";

export default app.container.get(CounterView).component;
```

4. Start the project.

```bash npm2yarn
npm dev
```

and visit `http://localhost:3000`.

## Q&A

1. Does `reactant-router` support SSR?

`reactant-router` is based on React Router, which does not support SSR, so when you use `reactant-ssr`, your routing must use[`next/router`](https://nextjs.org/docs/api-reference/next/router)

2. Does `reactant-storage` support SSR?

Yes, it works perfectly fine. In general, `reactant-share` is a different application model, so it also does not support SSR, which is supported by all other Reactant libraries.

## Example

- [Repo](https://github.com/unadlib/reactant-examples/tree/master/server/server-side-rendering)
