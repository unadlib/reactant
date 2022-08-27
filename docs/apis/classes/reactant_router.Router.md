# Class: Router

[reactant-router](../modules/reactant_router.md).Router

## Hierarchy

- [`BaseReactantRouter`](reactant_router.BaseReactantRouter.md)

  ↳ **`Router`**

## Table of contents

### Constructors

- [constructor](reactant_router.Router.md#constructor)

### Properties

- [ConnectedRouter](reactant_router.Router.md#connectedrouter)
- [[storeKey]](reactant_router.Router.md#[storekey])
- [autoCreateHistory](reactant_router.Router.md#autocreatehistory)
- [autoProvide](reactant_router.Router.md#autoprovide)
- [enhancer](reactant_router.Router.md#enhancer)
- [history](reactant_router.Router.md#history)
- [middleware](reactant_router.Router.md#middleware)
- [onLocationChanged](reactant_router.Router.md#onlocationchanged)
- [options](reactant_router.Router.md#options)
- [stateKey](reactant_router.Router.md#statekey)

### Accessors

- [currentPath](reactant_router.Router.md#currentpath)
- [router](reactant_router.Router.md#router)

### Methods

- [afterCombineRootReducers](reactant_router.Router.md#aftercombinerootreducers)
- [afterCreateStore](reactant_router.Router.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_router.Router.md#beforecombinerootreducers)
- [go](reactant_router.Router.md#go)
- [goBack](reactant_router.Router.md#goback)
- [goForward](reactant_router.Router.md#goforward)
- [preloadedStateHandler](reactant_router.Router.md#preloadedstatehandler)
- [provider](reactant_router.Router.md#provider)
- [push](reactant_router.Router.md#push)
- [replace](reactant_router.Router.md#replace)

## Constructors

### constructor

• **new Router**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/reactant_router.IRouterOptions.md) |

#### Overrides

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[constructor](reactant_router.BaseReactantRouter.md#constructor)

#### Defined in

[packages/reactant-router/src/router.tsx:134](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L134)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[ConnectedRouter](reactant_router.BaseReactantRouter.md#connectedrouter)

#### Defined in

[packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L114)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[[storeKey]](reactant_router.BaseReactantRouter.md#[storekey])

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L50)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[autoCreateHistory](reactant_router.BaseReactantRouter.md#autocreatehistory)

#### Defined in

[packages/reactant-router/src/router.tsx:69](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L69)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[autoProvide](reactant_router.BaseReactantRouter.md#autoprovide)

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[enhancer](reactant_router.BaseReactantRouter.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[history](reactant_router.BaseReactantRouter.md#history)

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L54)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[middleware](reactant_router.BaseReactantRouter.md#middleware)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[onLocationChanged](reactant_router.BaseReactantRouter.md#onlocationchanged)

#### Defined in

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L71)

___

### options

• **options**: [`IRouterOptions`](../interfaces/reactant_router.IRouterOptions.md)

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[options](reactant_router.BaseReactantRouter.md#options)

#### Defined in

[packages/reactant-router/src/router.tsx:134](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L134)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[stateKey](reactant_router.BaseReactantRouter.md#statekey)

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L73)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Inherited from

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L122)

___

### router

• `get` **router**(): [`RouterState`](../interfaces/reactant_router.RouterState.md)

#### Returns

[`RouterState`](../interfaces/reactant_router.RouterState.md)

#### Inherited from

BaseReactantRouter.router

#### Defined in

[packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L118)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[afterCombineRootReducers](reactant_router.BaseReactantRouter.md#aftercombinerootreducers)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L47)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[afterCreateStore](reactant_router.BaseReactantRouter.md#aftercreatestore)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L37)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[beforeCombineRootReducers](reactant_router.BaseReactantRouter.md#beforecombinerootreducers)

#### Defined in

[packages/reactant-router/src/router.tsx:102](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L102)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[go](reactant_router.BaseReactantRouter.md#go)

#### Defined in

[packages/reactant-router/src/router.tsx:146](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L146)

___

### goBack

▸ **goBack**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[goBack](reactant_router.BaseReactantRouter.md#goback)

#### Defined in

[packages/reactant-router/src/router.tsx:150](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L150)

___

### goForward

▸ **goForward**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[goForward](reactant_router.BaseReactantRouter.md#goforward)

#### Defined in

[packages/reactant-router/src/router.tsx:154](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L154)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[preloadedStateHandler](reactant_router.BaseReactantRouter.md#preloadedstatehandler)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L20)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[provider](reactant_router.BaseReactantRouter.md#provider)

#### Defined in

[packages/reactant-router/src/router.tsx:126](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L126)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[push](reactant_router.BaseReactantRouter.md#push)

#### Defined in

[packages/reactant-router/src/router.tsx:138](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L138)

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

[BaseReactantRouter](reactant_router.BaseReactantRouter.md).[replace](reactant_router.BaseReactantRouter.md#replace)

#### Defined in

[packages/reactant-router/src/router.tsx:142](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L142)
