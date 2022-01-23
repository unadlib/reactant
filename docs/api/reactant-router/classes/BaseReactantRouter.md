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

• **new BaseReactantRouter**(`options`, `autoCreateHistory?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) | `undefined` |
| `autoCreateHistory` | `boolean` | `true` |

#### Overrides

PluginModule.constructor

#### Defined in

[packages/reactant-router/src/router.tsx:67](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L67)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Defined in

[packages/reactant-router/src/router.tsx:110](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L110)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Overrides

PluginModule.\_\_@storeKey@857

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L42)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:63](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L63)

___

### autoProvide

• **autoProvide**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:44](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L44)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L26)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Defined in

[packages/reactant-router/src/router.tsx:48](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L48)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L23)

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

[packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L65)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

___

### stateKey

• **stateKey**: `string`

#### Defined in

[packages/reactant-router/src/router.tsx:46](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L46)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L118)

___

### router

• `get` **router**(): [`RouterState`](../interfaces/RouterState.md)

#### Returns

[`RouterState`](../interfaces/RouterState.md)

#### Defined in

[packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L114)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L37)

___

### afterCreateStore

▸ `Optional` **afterCreateStore**(`store`): `void`

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`void`

#### Inherited from

PluginModule.afterCreateStore

#### Defined in

[packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L29)

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

[packages/reactant-router/src/router.tsx:98](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L98)

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

[packages/reactant-router/src/router.tsx:57](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L57)

___

### goBack

▸ `Abstract` **goBack**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:59](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L59)

___

### goForward

▸ `Abstract` **goForward**(): `void` \| `Promise`<`void`\>

#### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[packages/reactant-router/src/router.tsx:61](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L61)

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

[packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L18)

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

[packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L122)

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

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L50)

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

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-router/src/router.tsx#L52)
