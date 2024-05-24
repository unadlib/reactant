---
id: "Router"
title: "Class: Router"
sidebar_label: "Router"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `PluginModule`

  ↳ **`Router`**

## Constructors

### constructor

• **new Router**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) |

#### Overrides

PluginModule.constructor

#### Defined in

[packages/reactant-router/src/router.tsx:62](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L62)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L103)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.\_\_@storeKey@117370

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L15)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L54)

___

### autoProvide

• **autoProvide**: `boolean`

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L50)

___

### defaultHistory

• `Protected` `Optional` **defaultHistory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `location` | `Location`<`unknown`\> |

#### Defined in

[packages/reactant-router/src/router.tsx:98](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L98)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L52)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L27)

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

#### Defined in

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L56)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

#### Defined in

[packages/reactant-router/src/router.tsx:62](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L62)

___

### routerActions

• **routerActions**: `Object` = `routerActions`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `go` | (`n`: `number`) => `CallHistoryMethodAction`<[`number`]\> |
| `goBack` | () => `CallHistoryMethodAction`<[]\> |
| `goForward` | () => `CallHistoryMethodAction`<[]\> |
| `push` | <S\>(`path`: `string`, `state?`: `S`) => `CallHistoryMethodAction`<[`Path`, S?]\><S\>(`location`: `LocationDescriptorObject`<`S`\>) => `CallHistoryMethodAction`<[`LocationDescriptorObject`<`S`\>]\> |
| `replace` | <S\>(`path`: `string`, `state?`: `S`) => `CallHistoryMethodAction`<[`Path`, S?]\><S\>(`location`: `LocationDescriptorObject`<`S`\>) => `CallHistoryMethodAction`<[`LocationDescriptorObject`<`S`\>]\> |

#### Defined in

[packages/reactant-router/src/router.tsx:58](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L58)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Defined in

[packages/reactant-router/src/router.tsx:60](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L60)

## Accessors

### currentPath

• `get` **currentPath**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/reactant-router/src/router.tsx:111](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L111)

___

### router

• `get` **router**(): `undefined` \| [`RouterState`](../interfaces/RouterState.md)

#### Returns

`undefined` \| [`RouterState`](../interfaces/RouterState.md)

#### Defined in

[packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L107)

___

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-router/src/router.tsx:83](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L83)

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

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-router/src/router.tsx:87](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L87)

___

### go

▸ **go**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:123](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L123)

___

### goBack

▸ **goBack**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:127](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L127)

___

### goForward

▸ **goForward**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:131](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L131)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/core/plugin.ts#L20)

___

### provider

▸ **provider**(`props`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`any`

#### Overrides

PluginModule.provider

#### Defined in

[packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L135)

___

### push

▸ **push**(`path`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `unknown` |

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L115)

___

### replace

▸ **replace**(`path`, `state?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `unknown` |

#### Returns

`void`

#### Defined in

[packages/reactant-router/src/router.tsx:119](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-router/src/router.tsx#L119)
