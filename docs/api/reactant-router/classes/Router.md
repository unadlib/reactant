# Class: Router

## Hierarchy

- [`BaseReactantRouter`](BaseReactantRouter.md)

  ↳ **`Router`**

## Table of contents

### Constructors

- [constructor](Router.md#constructor)

### Properties

- [ConnectedRouter](Router.md#connectedrouter)
- [[storeKey]](Router.md#[storekey])
- [autoCreateHistory](Router.md#autocreatehistory)
- [autoProvide](Router.md#autoprovide)
- [enhancer](Router.md#enhancer)
- [history](Router.md#history)
- [middleware](Router.md#middleware)
- [onLocationChanged](Router.md#onlocationchanged)
- [options](Router.md#options)
- [stateKey](Router.md#statekey)

### Accessors

- [currentPath](Router.md#currentpath)
- [router](Router.md#router)

### Methods

- [afterCombineRootReducers](Router.md#aftercombinerootreducers)
- [afterCreateStore](Router.md#aftercreatestore)
- [beforeCombineRootReducers](Router.md#beforecombinerootreducers)
- [go](Router.md#go)
- [goBack](Router.md#goback)
- [goForward](Router.md#goforward)
- [preloadedStateHandler](Router.md#preloadedstatehandler)
- [provider](Router.md#provider)
- [push](Router.md#push)
- [replace](Router.md#replace)

## Constructors

### constructor

• **new Router**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) |

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[constructor](BaseReactantRouter.md#constructor)

#### Defined in

[packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L135)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[ConnectedRouter](BaseReactantRouter.md#connectedrouter)

#### Defined in

[packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L115)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[[storeKey]](BaseReactantRouter.md#[storekey])

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L50)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[autoCreateHistory](BaseReactantRouter.md#autocreatehistory)

#### Defined in

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L71)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[autoProvide](BaseReactantRouter.md#autoprovide)

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[enhancer](BaseReactantRouter.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[history](BaseReactantRouter.md#history)

#### Defined in

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L56)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[middleware](BaseReactantRouter.md#middleware)

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

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[onLocationChanged](BaseReactantRouter.md#onlocationchanged)

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L73)

___

### options

• **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[options](BaseReactantRouter.md#options)

___

### stateKey

• **stateKey**: `string`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[stateKey](BaseReactantRouter.md#statekey)

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L54)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Inherited from

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-router/src/router.tsx:123](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L123)

___

### router

• `get` **router**(): [`RouterState`](../interfaces/RouterState.md)

#### Returns

[`RouterState`](../interfaces/RouterState.md)

#### Inherited from

BaseReactantRouter.router

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

[BaseReactantRouter](BaseReactantRouter.md).[afterCombineRootReducers](BaseReactantRouter.md#aftercombinerootreducers)

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

[BaseReactantRouter](BaseReactantRouter.md).[afterCreateStore](BaseReactantRouter.md#aftercreatestore)

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

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[beforeCombineRootReducers](BaseReactantRouter.md#beforecombinerootreducers)

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L103)

___

### go

▸ **go**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[go](BaseReactantRouter.md#go)

#### Defined in

[packages/reactant-router/src/router.tsx:147](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L147)

___

### goBack

▸ **goBack**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[goBack](BaseReactantRouter.md#goback)

#### Defined in

[packages/reactant-router/src/router.tsx:151](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L151)

___

### goForward

▸ **goForward**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[goForward](BaseReactantRouter.md#goforward)

#### Defined in

[packages/reactant-router/src/router.tsx:155](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L155)

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

[BaseReactantRouter](BaseReactantRouter.md).[preloadedStateHandler](BaseReactantRouter.md#preloadedstatehandler)

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

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[provider](BaseReactantRouter.md#provider)

#### Defined in

[packages/reactant-router/src/router.tsx:127](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L127)

___

### push

▸ **push**(`path`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[push](BaseReactantRouter.md#push)

#### Defined in

[packages/reactant-router/src/router.tsx:139](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L139)

___

### replace

▸ **replace**(`path`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[replace](BaseReactantRouter.md#replace)

#### Defined in

[packages/reactant-router/src/router.tsx:143](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L143)
