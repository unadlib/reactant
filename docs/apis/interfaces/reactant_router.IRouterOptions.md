# Interface: IRouterOptions

[reactant-router](../modules/reactant_router.md).IRouterOptions

## Table of contents

### Properties

- [autoCreateHistory](reactant_router.IRouterOptions.md#autocreatehistory)
- [autoProvide](reactant_router.IRouterOptions.md#autoprovide)
- [createHistory](reactant_router.IRouterOptions.md#createhistory)

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L42)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

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

#### Defined in

[packages/reactant-router/src/router.tsx:34](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L34)
