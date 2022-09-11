---
id: "router.Router"
title: "Class: Router"
sidebar_label: "Router"
custom_edit_url: null
---

[router](../modules/router.md).Router

## Hierarchy

- `BaseReactantRouter`

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

[packages/reactant-share/src/router.ts:72](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L72)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L114)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@151541

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L50)

___

### \_routers

• `Private` **\_routers**: `Record`<`string`, `RouterState`\> = `{}`

#### Defined in

[packages/reactant-share/src/router.ts:210](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L210)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:69](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L69)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L54)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-module/src/core/plugin.ts#L27)

___

### name

• **name**: `string`

router type name

#### Defined in

[packages/reactant-share/src/router.ts:70](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L70)

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

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L71)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/router.IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

#### Defined in

[packages/reactant-share/src/router.ts:75](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L75)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](portDetector.PortDetector.md)

#### Defined in

[packages/reactant-share/src/router.ts:73](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L73)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: `ISharedAppOptions`

#### Defined in

[packages/reactant-share/src/router.ts:74](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L74)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L73)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:207](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L207)

## Accessors

### \_router

• `Private` `get` **_router**(): `RouterState`

#### Returns

`RouterState`

#### Defined in

[packages/reactant-share/src/router.ts:203](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L203)

___

### clientName

• `get` **clientName**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Defined in

[packages/reactant-share/src/router.ts:302](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L302)

___

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/router.ts:222](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L222)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/router.ts:218](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L218)

___

### router

• `get` **router**(): `RouterState`

#### Returns

`RouterState`

#### Overrides

BaseReactantRouter.router

#### Defined in

[packages/reactant-share/src/router.ts:226](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L226)

## Methods

### \_go

▸ `Private` **_go**(`n`, `name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:254](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L254)

___

### \_goBack

▸ `Private` **_goBack**(`name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:262](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L262)

___

### \_goForward

▸ `Private` **_goForward**(`name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:270](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L270)

___

### \_push

▸ `Private` **_push**(`path`, `locationState`, `name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState` | `unknown` |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:230](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L230)

___

### \_replace

▸ `Private` **_replace**(`path`, `locationState`, `name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState` | `unknown` |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:242](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L242)

___

### \_route

▸ `Private` **_route**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RouterChangeNameOptions`](../modules/router.md#routerchangenameoptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:144](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L144)

___

### \_setRouters

▸ `Private` **_setRouters**(`name`, `router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:212](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L212)

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

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-router/src/router.tsx:102](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L102)

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

[packages/reactant-share/src/router.ts:290](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L290)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:294](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L294)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:298](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L298)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-router/src/router.tsx:126](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-router/src/router.tsx#L126)

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

[packages/reactant-share/src/router.ts:278](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L278)

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

[packages/reactant-share/src/router.ts:282](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/router.ts#L282)
