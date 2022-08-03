# Interface: IRouterOptions

## Hierarchy

- `IRouterOptions`

  ↳ **`IRouterOptions`**

## Table of contents

### Properties

- [autoCreateHistory](IRouterOptions.md#autocreatehistory)
- [autoProvide](IRouterOptions.md#autoprovide)
- [defaultRoute](IRouterOptions.md#defaultroute)
- [stateKey](IRouterOptions.md#statekey)

### Methods

- [createHistory](IRouterOptions.md#createhistory)

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Inherited from

IBaseRouterOptions.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:44](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L44)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

#### Inherited from

IBaseRouterOptions.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:36](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L36)

___

### defaultRoute

• `Optional` **defaultRoute**: `string`

#### Defined in

[packages/reactant-share/src/router.ts:49](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L49)

___

### stateKey

• `Optional` **stateKey**: `string`

Define a string as Router reducer key.

#### Inherited from

IBaseRouterOptions.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:40](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L40)

## Methods

### createHistory

▸ **createHistory**(): `History`<`PoorMansUnknown`\>

create history for router, use `createHashHistory`/`createBrowserHistory`/`createMemoryHistory`

#### Returns

`History`<`PoorMansUnknown`\>

#### Inherited from

IBaseRouterOptions.createHistory

#### Defined in

[packages/reactant-router/src/router.tsx:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L32)
