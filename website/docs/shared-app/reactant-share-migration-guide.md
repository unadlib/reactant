---
sidebar_position: 2
---

# reactant-share Migration Guide

This guide covers the breaking changes introduced by the `reactant-share` tree-shaking fix.

## Why this changed

Older versions of `reactant-share` exposed an umbrella root entry. The package root re-exported APIs from:

- `reactant`
- `data-transport`
- `reactant-last-action`

That made `reactant-share` behave like a mixed barrel. In bundlers such as Vite/Rollup, a narrow import like:

```ts
import { useLock } from 'reactant-share';
```

could still pull in unrelated shared-app bootstrap, router, storage, or worker code.

To make tree shaking reliable, `reactant-share` now follows two rules:

- The package root is share-only.
- The ESM build preserves module boundaries.

## Breaking changes

- `reactant-share` no longer re-exports core APIs from `reactant`.
- `reactant-share` no longer re-exports transport factory APIs from `data-transport`.
- `reactant-share` no longer re-exports APIs from `reactant-last-action`.
- `reactant-share/compat` was a temporary migration bridge and has been removed.

If your code imported both core Reactant APIs and shared-app APIs from `reactant-share`, you must split those imports by package.

## Import rules

Use this rule of thumb when migrating:

- If the API is a general Reactant framework primitive, import it from `reactant`.
- If the API is specific to Shared App behavior, import it from `reactant-share`.
- If the API creates or configures a low-level transport, import it from `data-transport`.
- If the API belongs to last-action sequencing, import it from `reactant-last-action`.

## Common import mapping

These lists are representative rather than exhaustive.

| Import from | Typical APIs |
| --- | --- |
| `reactant` | `ViewModule`, `createApp`, `injectable`, `useConnector`, `action`, `state`, `computed`, `subscribe`, `watch`, `testBed` |
| `reactant-share` | `createSharedApp`, `delegate`, `useLock`, `PortDetector`, `Router`, `RouterOptions`, `Storage`, `StorageOptions`, `Coworker`, `CoworkerOptions`, `createCoworker`, `getCoworker`, `fork`, `mockPairTransports`, `createBroadcastTransport` |
| `data-transport` | `createTransport` and other low-level transport factory APIs |
| `reactant-last-action` | `LastAction`, `LastActionOptions`, `ILastActionOptions` |

## Before and after

### 1. Split mixed root imports

Before:

```ts
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
  delegate,
  createSharedApp,
} from 'reactant-share';
```

After:

```ts
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
} from 'reactant';
import { delegate, createSharedApp } from 'reactant-share';
```

### 2. Move transport creation to `data-transport`

Before:

```ts
import { createSharedApp, createTransport } from 'reactant-share';
```

After:

```ts
import { createTransport } from 'data-transport';
import { createSharedApp } from 'reactant-share';
```

### 3. Move last-action APIs to `reactant-last-action`

Before:

```ts
import {
  LastAction,
  LastActionOptions,
  type ILastActionOptions,
} from 'reactant-share';
```

After:

```ts
import {
  LastAction,
  LastActionOptions,
  type ILastActionOptions,
} from 'reactant-last-action';
```

### 4. Replace the removed `/compat` entry

Before:

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

After:

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

### 5. Testing helpers

Before:

```ts
import { testBed, delegate } from 'reactant-share';
```

After:

```ts
import { testBed } from 'reactant';
import { delegate } from 'reactant-share';
```

## No-change imports

The following pattern remains valid and is now tree-shake friendly:

```ts
import { useLock } from 'reactant-share';
```

The same applies to other share-native APIs such as `delegate`, `createSharedApp`, `Storage`, `Router`, `Coworker`, and `PortDetector`.

## Recommended upgrade checklist

- Search for `from 'reactant-share'` and split any mixed imports.
- Search for `from 'reactant-share/compat'` and replace it with direct package imports.
- Move all core framework APIs to `reactant`.
- Move `createTransport` and other transport factory APIs to `data-transport`.
- Move last-action APIs to `reactant-last-action`.
- Run a production build and confirm that narrow imports no longer pull unrelated shared-app code.

## Verifying tree shaking

This repo includes a minimal reproduction and verification example:

- `examples/reactant-share-vite-treeshaking`

From the repository root:

```bash
yarn build -p packages/reactant-share
cd examples/reactant-share-vite-treeshaking
yarn install
yarn build
yarn verify
```

The example imports only `useLock` from `reactant-share` and checks that the generated Vite bundle does not contain unrelated shared-app runtime markers.
