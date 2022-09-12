---
id: "router.IRouterOptions"
title: "Interface: IRouterOptions"
sidebar_label: "IRouterOptions"
custom_edit_url: null
---

[router](../modules/router.md).IRouterOptions

## Hierarchy

- `IRouterOptions`

  ↳ **`IRouterOptions`**

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Inherited from

IBaseRouterOptions.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-router/src/router.tsx#L42)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

#### Inherited from

IBaseRouterOptions.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:38](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-router/src/router.tsx#L38)

___

### createHistory

• **createHistory**: () => `History`<`unknown`\>

#### Type declaration

▸ (): `History`<`unknown`\>

create history for router, use `createHashHistory`/`createBrowserHistory`/`createMemoryHistory`

##### Returns

`History`<`unknown`\>

#### Inherited from

IBaseRouterOptions.createHistory

#### Defined in

[packages/reactant-router/src/router.tsx:34](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-router/src/router.tsx#L34)

___

### defaultRoute

• `Optional` **defaultRoute**: `string`

default initial route

#### Defined in

[packages/reactant-share/src/router.ts:56](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/router.ts#L56)

___

### name

• `Optional` **name**: `string`

name of router

#### Defined in

[packages/reactant-share/src/router.ts:60](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/router.ts#L60)
