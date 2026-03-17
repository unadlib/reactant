# runtime Vite tree-shaking verification

This example verifies narrow imports from core runtime packages after the
repo-wide tree-shaking upgrade.

Covered packages:

- `reactant-di`
- `reactant-module`
- `reactant-last-action`
- `reactant`
- `reactant-redux`
- `reactant-model`
- `reactant-web`
- `reactant-storage`
- `reactant-router`
- `reactant-router-dom`
- `reactant-ssr`

Each package is built in isolation so the verification is not polluted by shared
chunks across multiple entry points.

## Run

From the repository root:

```bash
yarn build -p packages/reactant
yarn build -p packages/reactant-di
yarn build -p packages/reactant-last-action
yarn build -p packages/reactant-model
yarn build -p packages/reactant-module
yarn build -p packages/reactant-redux
yarn build -p packages/reactant-web
yarn build -p packages/reactant-router-dom
yarn build -p packages/reactant-router
yarn build -p packages/reactant-storage
yarn build -p packages/reactant-ssr
```

Then inside this example:

```bash
yarn install
yarn build:reactant-di
yarn verify:reactant-di
yarn build:reactant-module
yarn verify:reactant-module
yarn build:reactant-last-action
yarn verify:reactant-last-action
yarn build:reactant
yarn verify:reactant
yarn build:reactant-redux
yarn verify:reactant-redux
yarn build:reactant-model
yarn verify:reactant-model
yarn build:reactant-web
yarn verify:reactant-web
yarn build:reactant-storage
yarn verify:reactant-storage
yarn build:reactant-router
yarn verify:reactant-router
yarn build:reactant-router-dom
yarn verify:reactant-router-dom
yarn build:reactant-ssr
yarn verify:reactant-ssr
```

Not covered in this Vite example:

- `reactant-native`, because it depends on `react-native` runtime primitives rather than browser/Vite execution.

`reactant-ssr` is verified here by aliasing `next/app` to a local stub, so the
check stays focused on bundle reachability instead of Next runtime behavior.
