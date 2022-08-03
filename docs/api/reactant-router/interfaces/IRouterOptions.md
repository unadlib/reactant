# Interface: IRouterOptions

## Table of contents

### Properties

- [autoCreateHistory](IRouterOptions.md#autocreatehistory)
- [autoProvide](IRouterOptions.md#autoprovide)
- [stateKey](IRouterOptions.md#statekey)

### Methods

- [createHistory](IRouterOptions.md#createhistory)

## Properties

### autoCreateHistory

• `Optional` **autoCreateHistory**: `boolean`

auto create history and handle middleware

#### Defined in

[packages/reactant-router/src/router.tsx:44](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L44)

___

### autoProvide

• `Optional` **autoProvide**: `boolean`

Auto provider injection.

#### Defined in

[packages/reactant-router/src/router.tsx:36](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L36)

___

### stateKey

• `Optional` **stateKey**: `string`

Define a string as Router reducer key.

#### Defined in

[packages/reactant-router/src/router.tsx:40](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L40)

## Methods

### createHistory

▸ **createHistory**(): `History`<`PoorMansUnknown`\>

create history for router, use `createHashHistory`/`createBrowserHistory`/`createMemoryHistory`

#### Returns

`History`<`PoorMansUnknown`\>

#### Defined in

[packages/reactant-router/src/router.tsx:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L32)
