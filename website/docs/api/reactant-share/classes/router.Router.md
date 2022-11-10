---
id: "router.Router"
title: "Class: Router"
sidebar_label: "Router"
custom_edit_url: null
---

[router](../modules/router.md).Router

## Hierarchy

- `ReactantRouter`

  ↳ **`Router`**

## Constructors

### constructor

• **new Router**(`portDetector`, `sharedAppOptions`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](portDetector.PortDetector.md) |
| `sharedAppOptions` | `ISharedAppOptions` |
| `options` | [`IRouterOptions`](../interfaces/router.IRouterOptions.md) |

#### Overrides

BaseReactantRouter.constructor

#### Defined in

[packages/reactant-share/src/router.ts:48](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L48)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L103)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@151257

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L15)

___

### \_routers

• `Protected` **\_routers**: `Record`<`string`, `undefined` \| `RouterState`\>

#### Defined in

[packages/reactant-share/src/router.ts:278](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L278)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L54)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L50)

___

### defaultHistory

• `Protected` **defaultHistory**: `RouterState`

#### Overrides

BaseReactantRouter.defaultHistory

#### Defined in

[packages/reactant-share/src/router.ts:307](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L307)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L52)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L27)

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

BaseReactantRouter.onLocationChanged

#### Defined in

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L56)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/router.IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

#### Defined in

[packages/reactant-share/src/router.ts:51](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L51)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](portDetector.PortDetector.md)

#### Defined in

[packages/reactant-share/src/router.ts:49](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L49)

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

#### Inherited from

BaseReactantRouter.routerActions

#### Defined in

[packages/reactant-router/src/router.tsx:58](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L58)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: `ISharedAppOptions`

#### Defined in

[packages/reactant-share/src/router.ts:50](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L50)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:60](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L60)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:275](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L275)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/router.ts:323](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L323)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/router.ts:293](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L293)

___

### enableCacheRouting

• `Protected` `get` **enableCacheRouting**(): `any`

#### Returns

`any`

#### Defined in

[packages/reactant-share/src/router.ts:297](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L297)

___

### router

• `get` **router**(): `undefined` \| `RouterState`

#### Returns

`undefined` \| `RouterState`

#### Inherited from

BaseReactantRouter.router

#### Defined in

[packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L107)

___

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.store

#### Defined in

[packages/reactant-router/src/router.tsx:83](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L83)

## Methods

### \_changeRoutingOnClient

▸ `Protected` **_changeRoutingOnClient**(`name`, `router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:231](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L231)

___

### \_changeRoutingOnSever

▸ `Protected` **_changeRoutingOnSever**(`name`, `router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:209](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L209)

___

### \_makeRoutingOnClient

▸ `Protected` **_makeRoutingOnClient**(`__namedParameters`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.action` | ``"replace"`` \| ``"push"`` \| ``"go"`` \| ``"goBack"`` \| ``"goForward"`` |
| `__namedParameters.args` | `any`[] |
| `__namedParameters.name` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/reactant-share/src/router.ts:249](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L249)

___

### \_setRouters

▸ `Protected` **_setRouters**(`name`, `router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:282](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L282)

___

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

BaseReactantRouter.afterCombineRootReducers

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L47)

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

BaseReactantRouter.afterCreateStore

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L37)

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

BaseReactantRouter.beforeCombineRootReducers

#### Defined in

[packages/reactant-router/src/router.tsx:87](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L87)

___

### dispatchChanged

▸ `Protected` **dispatchChanged**(`router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:317](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L317)

___

### go

▸ **go**(`n`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.go

#### Defined in

[packages/reactant-share/src/router.ts:365](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L365)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:384](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L384)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:403](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L403)

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

BaseReactantRouter.preloadedStateHandler

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-module/src/core/plugin.ts#L20)

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

BaseReactantRouter.provider

#### Defined in

[packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-router/src/router.tsx#L135)

___

### push

▸ **push**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.push

#### Defined in

[packages/reactant-share/src/router.ts:327](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L327)

___

### replace

▸ **replace**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `unknown` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.replace

#### Defined in

[packages/reactant-share/src/router.ts:346](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L346)

___

### watchRehydratedRouting

▸ **watchRehydratedRouting**(): `Unsubscribe`

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-share/src/router.ts:191](https://github.com/unadlib/reactant/blob/08d8ea8a/packages/reactant-share/src/router.ts#L191)
