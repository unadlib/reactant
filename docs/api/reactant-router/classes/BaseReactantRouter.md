# Class: BaseReactantRouter

## Hierarchy

- `PluginModule`

  ↳ **`BaseReactantRouter`**

  ↳↳ [`Router`](Router.md)

## Table of contents

### Constructors

- [constructor](BaseReactantRouter.md#constructor)

### Properties

- [ConnectedRouter](BaseReactantRouter.md#connectedrouter)
- [[storeKey]](BaseReactantRouter.md#[storekey])
- [autoCreateHistory](BaseReactantRouter.md#autocreatehistory)
- [autoProvide](BaseReactantRouter.md#autoprovide)
- [enhancer](BaseReactantRouter.md#enhancer)
- [history](BaseReactantRouter.md#history)
- [middleware](BaseReactantRouter.md#middleware)
- [onLocationChanged](BaseReactantRouter.md#onlocationchanged)
- [options](BaseReactantRouter.md#options)
- [stateKey](BaseReactantRouter.md#statekey)

### Accessors

- [currentPath](BaseReactantRouter.md#currentpath)
- [router](BaseReactantRouter.md#router)

### Methods

- [afterCombineRootReducers](BaseReactantRouter.md#aftercombinerootreducers)
- [afterCreateStore](BaseReactantRouter.md#aftercreatestore)
- [beforeCombineRootReducers](BaseReactantRouter.md#beforecombinerootreducers)
- [go](BaseReactantRouter.md#go)
- [goBack](BaseReactantRouter.md#goback)
- [goForward](BaseReactantRouter.md#goforward)
- [preloadedStateHandler](BaseReactantRouter.md#preloadedstatehandler)
- [provider](BaseReactantRouter.md#provider)
- [push](BaseReactantRouter.md#push)
- [replace](BaseReactantRouter.md#replace)

## Constructors

### constructor

• **new BaseReactantRouter**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) |

#### Overrides

PluginModule.constructor

#### Defined in

[packages/reactant-router/src/router.tsx:75](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L75)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Defined in

[packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L115)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Overrides

PluginModule.\_\_@storeKey@969

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L50)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L71)

___

### autoProvide

• **autoProvide**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Defined in

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L56)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L27)

___

### onLocationChanged

• **onLocationChanged**: <S\>(`location`: `Location`<`S`\>, `action`: `Action`, `isFirstRendering?`: `boolean`) => `LocationChangeAction`<`S`\> = `onLocationChanged`

#### Type declaration

▸ <`S`\>(`location`, `action`, `isFirstRendering?`): `LocationChangeAction`<`S`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `PoorMansUnknown` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `location` | `Location`<`S`\> |
| `action` | `Action` |
| `isFirstRendering?` | `boolean` |

##### Returns

`LocationChangeAction`<`S`\>

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L73)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

___

### stateKey

• **stateKey**: `string`

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L54)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-router/src/router.tsx:123](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L123)

___

### router

• `get` **router**(): [`RouterState`](../interfaces/RouterState.md)

#### Returns

[`RouterState`](../interfaces/RouterState.md)

#### Defined in

[packages/reactant-router/src/router.tsx:119](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L119)

## Methods

### afterCombineRootReducers

▸ `Optional` **afterCombineRootReducers**(`rootReducer`): `Reducer`<`any`, `AnyAction`\>

As hook after combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer`<`any`, `AnyAction`\> |

#### Returns

`Reducer`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.afterCombineRootReducers

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L47)

___

### afterCreateStore

▸ `Optional` **afterCreateStore**(`store`): `Store`<`any`, `AnyAction`\>

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.afterCreateStore

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L37)

___

### beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`): `ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducers` | `ReducersMapObject`<`any`, `Action`<`any`\>\> |

#### Returns

`ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Overrides

PluginModule.beforeCombineRootReducers

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L103)

___

### go

▸ `Abstract` **go**(`n`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L65)

___

### goBack

▸ `Abstract` **goBack**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:67](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L67)

___

### goForward

▸ `Abstract` **goForward**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:69](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L69)

___

### preloadedStateHandler

▸ `Optional` **preloadedStateHandler**(`preloadedState`): `Object`

preloaded state handler for Redux

#### Parameters

| Name | Type |
| :------ | :------ |
| `preloadedState` | `Object` |

#### Returns

`Object`

#### Inherited from

PluginModule.preloadedStateHandler

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L20)

___

### provider

▸ **provider**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`Element`

#### Overrides

PluginModule.provider

#### Defined in

[packages/reactant-router/src/router.tsx:127](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L127)

___

### push

▸ `Abstract` **push**(`path`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:58](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L58)

___

### replace

▸ `Abstract` **replace**(`path`, `state?`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:60](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L60)
