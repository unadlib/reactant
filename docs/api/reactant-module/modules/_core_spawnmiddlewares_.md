---
id: "_core_spawnmiddlewares_"
title: "spawnMiddlewares()"
sidebar_label: "spawnMiddlewares()"
---

## Index

### Functions

* [spawnMiddlewares](_core_spawnmiddlewares_.md#const-spawnmiddlewares)

## Functions

### `Const` spawnMiddlewares

▸ **spawnMiddlewares**(...`args`: Middleware[]): *(Anonymous class)*

*Defined in [packages/reactant-module/src/core/spawnMiddlewares.ts:26](https://github.com/unadlib/reactant/blob/d788abc9/packages/reactant-module/src/core/spawnMiddlewares.ts#L26)*

## Description
Compose and spawn middlewares for Redux.

## Example

```ts
import logger from 'redux-logger';

@injectable()
class Foo {}

const app = createApp({
  modules: [spawnMiddlewares(logger)],
  main: Foo,
  render: () => {},
});
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...args` | Middleware[] | middlewares for Redux  |

**Returns:** *(Anonymous class)*
