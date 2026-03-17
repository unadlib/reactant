# reactant-share Vite tree-shaking reproduction

This example intentionally imports only `useLock` from `reactant-share`:

```ts
import { useLock } from 'reactant-share';
```

It is used to verify whether a Vite production build still pulls unrelated
`reactant-share` code such as shared-app bootstrap, router, or storage logic.

## Run

Install the repo root dependencies and build the local `reactant-share`
package first so the example resolves the current repo output instead of a
published package.

```bash
cd /path/to/reactant
yarn install
yarn build -p packages/reactant-share

cd examples/reactant-share-vite-treeshaking
yarn install
yarn build
yarn verify
```
