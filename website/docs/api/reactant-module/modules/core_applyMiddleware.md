---
id: "core_applyMiddleware"
title: "Module: core/applyMiddleware"
sidebar_label: "core/applyMiddleware"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### applyMiddleware

▸ **applyMiddleware**(...`args`): typeof `__class`

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>[] | middlewares for Redux |

#### Returns

typeof `__class`

#### Defined in

[packages/reactant-module/src/core/applyMiddleware.ts:30](https://github.com/unadlib/reactant/blob/9c19923e/packages/reactant-module/src/core/applyMiddleware.ts#L30)
