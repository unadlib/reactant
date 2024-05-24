# Interface: IRouterOptions

[reactant-share](../modules/reactant_share.md).IRouterOptions

## Hierarchy

- `IRouterOptions`

  ↳ **`IRouterOptions`**

## Table of contents

### Properties

- [autoCreateHistory](reactant_share.IRouterOptions.md#autocreatehistory)
- [autoProvide](reactant_share.IRouterOptions.md#autoprovide)
- [createHistory](reactant_share.IRouterOptions.md#createhistory)
- [defaultRoute](reactant_share.IRouterOptions.md#defaultroute)

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Inherited from

IBaseRouterOptions.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L42)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

#### Inherited from

IBaseRouterOptions.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:38](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L38)

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

[packages/reactant-router/src/router.tsx:34](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L34)

___

### defaultRoute

• `Optional` **defaultRoute**: `string`

default initial route

#### Defined in

[packages/reactant-share/src/modules/router.ts:41](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L41)
