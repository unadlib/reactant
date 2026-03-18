---
sidebar_position: 3
---

# Upgrade Guide: React 18 and Tree-Shaking Changes

This guide covers the breaking and migration-relevant changes introduced between the older repository state around `e9cfb7ea15a550316300655753ca84263f65534b` and the current tree-shaking and React 18 aligned packages.

It is intentionally broader than the `reactant-share` migration guide. Use this guide if you are upgrading an existing application, template, or internal package and need to understand:

- import ownership changes
- React 18 and `react-redux` alignment
- bundler and entrypoint changes
- template/example changes
- what to verify after the upgrade

## Executive summary

The upgrade has four major themes:

1. `reactant-share` is no longer an umbrella entrypoint.
2. Runtime packages now publish preserved-module ESM for reliable tree shaking.
3. Official examples and templates are aligned to React 18 and `react-redux@8`.
4. A few package entrypoint assumptions that were previously tolerated are no longer supported.

If you only need the minimum viable migration checklist:

- Split mixed imports from `reactant-share`.
- Stop using `reactant-share/compat`.
- Upgrade to `react-redux@8.1.3` if you consume `reactant` or `reactant-router`.
- Prefer React 18 as the tested path for examples and templates.
- Stop relying on deep or undocumented package entrypoints.
- Rebuild and verify your production bundle.

## Breaking changes

### 1. `reactant-share` root imports are now share-only

Older code could treat `reactant-share` as a mixed barrel and import framework APIs, shared-app APIs, transport APIs, and last-action APIs from the same package root.

That is no longer supported.

`reactant-share` now exports only shared-app APIs from its root entry.

#### What changed

- `reactant-share` no longer re-exports core APIs from `reactant`
- `reactant-share` no longer re-exports low-level transport APIs from `data-transport`
- `reactant-share` no longer re-exports last-action APIs from `reactant-last-action`
- `reactant-share/compat` was a temporary bridge and has been removed

#### Before

```ts
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  createSharedApp,
  delegate,
  createTransport,
  LastAction,
} from 'reactant-share';
```

#### After

```ts
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import { createTransport } from 'data-transport';
import { LastAction } from 'reactant-last-action';
import { createSharedApp, delegate } from 'reactant-share';
```

#### Impact

This is the most important source-level breaking change in this upgrade.

Any app, example, test, or internal package that relied on umbrella imports must split them by package ownership.

### 2. `reactant-share/compat` is gone

If you adopted the temporary compatibility entry during migration, it must now be removed.

#### Before

```ts
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
  delegate,
} from 'reactant-share/compat';
```

#### After

```ts
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import { delegate } from 'reactant-share';
```

### 3. `reactant` and `reactant-router` are aligned to `react-redux@8`

The React 18 upgrade also aligned the runtime packages with `react-redux@8.1.3`.

#### Impact

- If your app already uses `react-redux@8`, no action is needed.
- If your app is pinned to `react-redux@7`, you must upgrade it.
- If you consume `reactant` or `reactant-router` in a monorepo with strict peer resolution, update the lockfile and peer graph together.

#### Recommended versions

```bash
npm install react-redux@^8.1.3
```

or

```bash
yarn add react-redux@^8.1.3
```

### 4. Runtime packages now expose preserved-module ESM

Several runtime packages no longer point the `module` field at a single bundled file. They now expose preserved-module ESM at `dist/esm/index.js` and declare `"sideEffects": false`.

This affects packages including:

- `reactant`
- `reactant-di`
- `reactant-last-action`
- `reactant-model`
- `reactant-module`
- `reactant-redux`
- `reactant-router`
- `reactant-router-dom`
- `reactant-share`
- `reactant-ssr`
- `reactant-storage`
- `reactant-web`

#### Why this matters

This is what makes Vite/Rollup tree shaking work reliably across the package graph.

#### Tooling impact

This is only source-compatible if consumers import from package roots.

It can be breaking if you:

- deep-imported undocumented internal files
- hard-coded `dist/index.esm.js`
- relied on non-exports-aware resolution for `reactant-share`

The supported approach is now:

- import from the package root
- let your bundler resolve the package metadata

### 5. `reactant-share` now has an explicit `exports` map

`reactant-share` now exposes a constrained public surface through `exports`.

#### Impact

Supported:

```ts
import { createSharedApp, delegate, useLock } from 'reactant-share';
```

Not supported:

```ts
import { something } from 'reactant-share/createApp';
import { something } from 'reactant-share/dist/index.esm.js';
```

If you relied on deep subpaths, migrate back to the package root.

## Important non-breaking but migration-relevant changes

### React 18 is now the tested path for examples and templates

The official examples, templates, and workspace tooling have been moved to React 18-era dependencies and typings.

This does **not** mean React 17 is universally forbidden by every peer range, but it does mean:

- React 18 is the path actively exercised by examples and CI
- new template output assumes the React 18 ecosystem
- `reactant-web` now exposes `createRoot` and `hydrateRoot` alongside legacy render APIs

If you maintain an older React 17 app, test carefully before upgrading in place.

### `reactant-web` now exposes React 18 root APIs

`reactant-web` now exports:

- `createRoot`
- `hydrateRoot`
- compatibility `render`
- compatibility `hydrate`

If React 18 is available, the legacy `render`/`hydrate` helpers delegate through the React 18 runtime.

For most applications this is an implementation detail, but it is still worth knowing if you have custom mounting code or very specific render lifecycle assumptions.

### `reactant-router-dom` owns its tree-shake-friendly `generatePath` and `matchPath`

The package now exports package-local implementations of `generatePath` and `matchPath` instead of re-exporting those helpers directly from `react-router-dom`.

This was done to avoid pulling unnecessary router-dom code into narrow bundle paths.

There is no user-facing import change:

```ts
import { generatePath, matchPath } from 'reactant-router-dom';
```

continues to work.

### Some light-weight runtime exports were added

These are additive, not breaking, but they matter for migration and refactoring:

- `reactant-router` now exposes `history` and location-change helpers from its root
- `reactant-storage` now exposes `getRehydrated` from its root
- `reactant-last-action` now exposes its options types from a dedicated lightweight module

## Import ownership reference

Use this ownership rule when migrating old code:

| Package | Import here if the API is... |
| --- | --- |
| `reactant` | a general framework primitive |
| `reactant-share` | specific to Shared App behavior |
| `data-transport` | a low-level transport factory or transport utility |
| `reactant-last-action` | specific to last-action staging or sequencing |

### Typical API mapping

| Package | Common APIs |
| --- | --- |
| `reactant` | `ViewModule`, `createApp`, `injectable`, `useConnector`, `action`, `state`, `computed`, `watch`, `subscribe`, `testBed` |
| `reactant-share` | `createSharedApp`, `delegate`, `useLock`, `PortDetector`, `Router`, `RouterOptions`, `Storage`, `StorageOptions`, `Coworker`, `CoworkerOptions`, `createCoworker`, `getCoworker`, `fork`, `mockPairTransports`, `createBroadcastTransport` |
| `data-transport` | `createTransport` and other transport-level helpers |
| `reactant-last-action` | `LastAction`, `LastActionOptions`, `ILastActionOptions` |

## Detailed migration checklist

### 1. Upgrade dependency baselines

- Upgrade `react-redux` to `^8.1.3` if your app consumes `reactant` or `reactant-router`
- Prefer React 18 and React DOM 18 for official-template parity
- Reinstall dependencies and refresh the lockfile

### 2. Split mixed imports from `reactant-share`

Search for:

```bash
rg "from 'reactant-share'" src packages examples
```

Then move non-share APIs to their owning packages.

### 3. Remove `/compat`

Search for:

```bash
rg "reactant-share/compat" .
```

Every result should be rewritten to direct package imports.

### 4. Remove deep package entry usage

Search for:

```bash
rg "dist/index\\.esm|reactant-share/" src packages examples
```

If the import is not the documented package root, replace it.

### 5. Verify mounting assumptions

If you have custom DOM mounting logic:

- verify React 18 behavior with `reactant-web`
- verify tests that depend on legacy render timing

### 6. Verify bundle output

Run your production build and inspect whether narrow imports stay narrow.

This repository now includes verification examples:

- `examples/reactant-share-vite-treeshaking`
- `examples/runtime-vite-treeshaking`

From the repository root:

```bash
yarn test:treeshaking
```

## Recommended validation after upgrading

At minimum, run:

```bash
yarn test
yarn build
yarn test:treeshaking
```

If you maintain a Vite application, also verify the bundle directly with your own production config.

## Edge cases

### I only import `useLock` from `reactant-share`. Is that still valid?

Yes.

This is exactly the use case the tree-shaking work was designed to support:

```ts
import { useLock } from 'reactant-share';
```

### I depended on `reactant-share` as a single umbrella package. Can I keep that model?

No.

That import style was the direct cause of the unreliable tree shaking. The supported long-term model is package-owned imports.

### Do I need to import `reflect-metadata` manually now?

Usually no, if you already import and use Reactant DI APIs normally.

However, if you were relying on `import 'reactant-di'` purely as an undocumented global side-effect to initialize metadata for unrelated code, switch to:

```ts
import 'reflect-metadata';
```

### Is React 17 completely unsupported now?

Not by peer range alone, but React 18 is the actively tested and documented path after this upgrade.

If you stay on React 17, test carefully and do not assume parity with the official examples and templates.

## Upgrade strategy for large codebases

If your codebase is large, migrate in this order:

1. Upgrade dependency baselines and lockfile.
2. Split all `reactant-share` umbrella imports.
3. Remove `/compat` and any deep imports.
4. Run tests.
5. Run a production build.
6. Verify bundle size and unused-code elimination.

This order minimizes the chance of mixing source-level breaking changes with bundler-level changes in the same debugging pass.
