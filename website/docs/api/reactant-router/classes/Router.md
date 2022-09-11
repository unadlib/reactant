---
id: "Router"
title: "Class: Router"
sidebar_label: "Router"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`BaseReactantRouter`](BaseReactantRouter.md)

  ↳ **`Router`**

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

[packages/reactant-router/src/router.tsx:134](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L134)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[ConnectedRouter](BaseReactantRouter.md#connectedrouter)

#### Defined in

[packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L114)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[[storeKey]](BaseReactantRouter.md#[storekey])

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L50)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[autoCreateHistory](BaseReactantRouter.md#autocreatehistory)

#### Defined in

[packages/reactant-router/src/router.tsx:69](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L69)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[autoProvide](BaseReactantRouter.md#autoprovide)

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[enhancer](BaseReactantRouter.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[history](BaseReactantRouter.md#history)

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L54)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[middleware](BaseReactantRouter.md#middleware)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/plugin.ts#L27)

___

### onLocationChanged

• **onLocationChanged**: <S\>(`location`: `Location`<`S`\>, `action`: `Action`, `isFirstRendering?`: `boolean`) => `LocationChangeAction`<`S`\> = `onLocationChanged`

#### Type declaration

▸ <`S`\>(`location`, `action`, `isFirstRendering?`): `LocationChangeAction`<`S`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

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

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L71)

___

### options

• **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[options](BaseReactantRouter.md#options)

#### Defined in

[packages/reactant-router/src/router.tsx:134](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L134)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[stateKey](BaseReactantRouter.md#statekey)

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L73)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Inherited from

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L122)

___

### router

• `get` **router**(): [`RouterState`](../interfaces/RouterState.md)

#### Returns

[`RouterState`](../interfaces/RouterState.md)

#### Inherited from

BaseReactantRouter.router

#### Defined in

[packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L118)

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

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-router/src/router.tsx:102](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L102)

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

[packages/reactant-router/src/router.tsx:146](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L146)

___

### goBack

▸ **goBack**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[goBack](BaseReactantRouter.md#goback)

#### Defined in

[packages/reactant-router/src/router.tsx:150](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L150)

___

### goForward

▸ **goForward**(): `void`

#### Returns

`void`

#### Overrides

[BaseReactantRouter](BaseReactantRouter.md).[goForward](BaseReactantRouter.md#goforward)

#### Defined in

[packages/reactant-router/src/router.tsx:154](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L154)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/plugin.ts#L20)

___

### provider

▸ **provider**(`props`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`any`

#### Inherited from

[BaseReactantRouter](BaseReactantRouter.md).[provider](BaseReactantRouter.md#provider)

#### Defined in

[packages/reactant-router/src/router.tsx:126](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L126)

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

[packages/reactant-router/src/router.tsx:138](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L138)

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

[packages/reactant-router/src/router.tsx:142](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-router/src/router.tsx#L142)
