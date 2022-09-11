---
id: "IRouterOptions"
title: "Interface: IRouterOptions"
sidebar_label: "IRouterOptions"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L42)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

#### Defined in

[packages/reactant-router/src/router.tsx:38](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L38)

___

### createHistory

• **createHistory**: () => `History`<`unknown`\>

#### Type declaration

▸ (): `History`<`unknown`\>

create history for router, use `createHashHistory`/`createBrowserHistory`/`createMemoryHistory`

##### Returns

`History`<`unknown`\>

#### Defined in

[packages/reactant-router/src/router.tsx:34](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L34)
