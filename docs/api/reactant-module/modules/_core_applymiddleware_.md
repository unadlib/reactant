---
id: "_core_applymiddleware_"
title: "applyMiddleware()"
sidebar_label: "applyMiddleware()"
---

## Index

### Functions

* [applyMiddleware](_core_applymiddleware_.md#const-applymiddleware)

## Functions

### `Const` applyMiddleware

▸ **applyMiddleware**(...`args`: Middleware[]): *(Anonymous class)*

*Defined in [packages/reactant-module/src/core/applyMiddleware.ts:30](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-module/src/core/applyMiddleware.ts#L30)*

## Description
Apply middlewares for Redux.

## Example

```ts
import logger from 'redux-logger';

@injectable()
class Foo {}

const app = createApp({
  modules: [applyMiddleware(logger)],
  main: Foo,
  render: () => {},
});
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...args` | Middleware[] | middlewares for Redux  |

**Returns:** *(Anonymous class)*
