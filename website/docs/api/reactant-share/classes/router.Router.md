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

[packages/reactant-share/src/router.ts:38](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L38)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L103)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@150706

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L15)

___

### \_routers

• `Protected` **\_routers**: `Record`<`string`, `undefined` \| `RouterState`\>

#### Defined in

[packages/reactant-share/src/router.ts:215](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L215)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L54)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L50)

___

### defaultHistory

• `Protected` **defaultHistory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | `string` |
| `location` | { `hash`: `string` = ''; `pathname`: `string` ; `search`: `string` = ''; `state`: `undefined` = undefined } |
| `location.hash` | `string` |
| `location.pathname` | `string` |
| `location.search` | `string` |
| `location.state` | `undefined` |

#### Overrides

BaseReactantRouter.defaultHistory

#### Defined in

[packages/reactant-share/src/router.ts:229](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L229)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L52)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L27)

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

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L56)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/router.IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

#### Defined in

[packages/reactant-share/src/router.ts:41](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L41)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](portDetector.PortDetector.md)

#### Defined in

[packages/reactant-share/src/router.ts:39](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L39)

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

[packages/reactant-router/src/router.tsx:58](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L58)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: `ISharedAppOptions`

#### Defined in

[packages/reactant-share/src/router.ts:40](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L40)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:60](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L60)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:212](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L212)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/router.ts:245](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L245)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/router.ts:225](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L225)

___

### router

• `get` **router**(): `undefined` \| `RouterState`

#### Returns

`undefined` \| `RouterState`

#### Inherited from

BaseReactantRouter.router

#### Defined in

[packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L107)

___

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.store

#### Defined in

[packages/reactant-router/src/router.tsx:83](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L83)

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

[packages/reactant-share/src/router.ts:168](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L168)

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

[packages/reactant-share/src/router.ts:148](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L148)

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

[packages/reactant-share/src/router.ts:186](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L186)

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

[packages/reactant-share/src/router.ts:219](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L219)

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

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-router/src/router.tsx:87](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L87)

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

[packages/reactant-share/src/router.ts:239](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L239)

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

[packages/reactant-share/src/router.ts:287](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L287)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:306](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L306)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:325](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L325)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-router/src/router.tsx#L135)

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

[packages/reactant-share/src/router.ts:249](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L249)

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

[packages/reactant-share/src/router.ts:268](https://github.com/unadlib/reactant/blob/ac1dea6f/packages/reactant-share/src/router.ts#L268)
