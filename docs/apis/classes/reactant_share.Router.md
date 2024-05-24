# Class: Router

[reactant-share](../modules/reactant_share.md).Router

## Hierarchy

- `ReactantRouter`

  ↳ **`Router`**

## Table of contents

### Constructors

- [constructor](reactant_share.Router.md#constructor)

### Properties

- [ConnectedRouter](reactant_share.Router.md#connectedrouter)
- [[storeKey]](reactant_share.Router.md#[storekey])
- [\_routers](reactant_share.Router.md#_routers)
- [autoCreateHistory](reactant_share.Router.md#autocreatehistory)
- [autoProvide](reactant_share.Router.md#autoprovide)
- [defaultHistory](reactant_share.Router.md#defaulthistory)
- [enhancer](reactant_share.Router.md#enhancer)
- [history](reactant_share.Router.md#history)
- [lastRoutedTimestamp](reactant_share.Router.md#lastroutedtimestamp)
- [middleware](reactant_share.Router.md#middleware)
- [onLocationChanged](reactant_share.Router.md#onlocationchanged)
- [options](reactant_share.Router.md#options)
- [passiveRoute](reactant_share.Router.md#passiveroute)
- [portDetector](reactant_share.Router.md#portdetector)
- [routerActions](reactant_share.Router.md#routeractions)
- [sharedAppOptions](reactant_share.Router.md#sharedappoptions)
- [stateKey](reactant_share.Router.md#statekey)
- [toBeRouted](reactant_share.Router.md#toberouted)

### Accessors

- [currentPath](reactant_share.Router.md#currentpath)
- [defaultRoute](reactant_share.Router.md#defaultroute)
- [enableCacheRouting](reactant_share.Router.md#enablecacherouting)
- [router](reactant_share.Router.md#router)
- [store](reactant_share.Router.md#store)

### Methods

- [\_changeRoutingOnClient](reactant_share.Router.md#_changeroutingonclient)
- [\_changeRoutingOnSever](reactant_share.Router.md#_changeroutingonsever)
- [\_makeRoutingOnClient](reactant_share.Router.md#_makeroutingonclient)
- [\_setRouters](reactant_share.Router.md#_setrouters)
- [afterCombineRootReducers](reactant_share.Router.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.Router.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_share.Router.md#beforecombinerootreducers)
- [dispatchChanged](reactant_share.Router.md#dispatchchanged)
- [go](reactant_share.Router.md#go)
- [goBack](reactant_share.Router.md#goback)
- [goForward](reactant_share.Router.md#goforward)
- [preloadedStateHandler](reactant_share.Router.md#preloadedstatehandler)
- [provider](reactant_share.Router.md#provider)
- [push](reactant_share.Router.md#push)
- [replace](reactant_share.Router.md#replace)
- [watchRehydratedRouting](reactant_share.Router.md#watchrehydratedrouting)

## Constructors

### constructor

• **new Router**(`portDetector`, `sharedAppOptions`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](reactant_share.PortDetector.md) |
| `sharedAppOptions` | [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md) |
| `options` | [`IRouterOptions`](../interfaces/reactant_share.IRouterOptions.md) |

#### Overrides

BaseReactantRouter.constructor

#### Defined in

[packages/reactant-share/src/modules/router.ts:50](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L50)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L103)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@204262

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L15)

___

### \_routers

• `Protected` **\_routers**: `Record`<`string`, `undefined` \| `RouterState`\>

#### Defined in

[packages/reactant-share/src/modules/router.ts:353](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L353)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L54)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L50)

___

### defaultHistory

• `Protected` **defaultHistory**: `RouterState`

#### Overrides

BaseReactantRouter.defaultHistory

#### Defined in

[packages/reactant-share/src/modules/router.ts:382](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L382)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`unknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L52)

___

### lastRoutedTimestamp

• **lastRoutedTimestamp**: `number`

The timestamp of the last routing.

#### Defined in

[packages/reactant-share/src/modules/router.ts:244](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L244)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L27)

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

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L56)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/reactant_share.IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

#### Defined in

[packages/reactant-share/src/modules/router.ts:53](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L53)

___

### passiveRoute

• `Private` **passiveRoute**: `boolean` = `false`

#### Defined in

[packages/reactant-share/src/modules/router.ts:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L48)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](reactant_share.PortDetector.md)

#### Defined in

[packages/reactant-share/src/modules/router.ts:51](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L51)

___

### routerActions

• **routerActions**: `Object` = `routerActions`

#### Inherited from

BaseReactantRouter.routerActions

#### Defined in

[packages/reactant-router/src/router.tsx:58](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L58)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md)

#### Defined in

[packages/reactant-share/src/modules/router.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L52)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:60](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L60)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/modules/router.ts:350](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L350)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/modules/router.ts:398](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L398)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/modules/router.ts:368](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L368)

___

### enableCacheRouting

• `Protected` `get` **enableCacheRouting**(): `any`

#### Returns

`any`

#### Defined in

[packages/reactant-share/src/modules/router.ts:372](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L372)

___

### router

• `get` **router**(): `undefined` \| `RouterState`

#### Returns

`undefined` \| `RouterState`

#### Inherited from

BaseReactantRouter.router

#### Defined in

[packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L107)

___

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.store

#### Defined in

[packages/reactant-router/src/router.tsx:83](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L83)

## Methods

### \_changeRoutingOnClient

▸ `Protected` **_changeRoutingOnClient**(`name`, `router`, `timestamp?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |
| `timestamp?` | `number` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/router.ts:294](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L294)

___

### \_changeRoutingOnSever

▸ `Protected` **_changeRoutingOnSever**(`name`, `router`, `timestamp`, `clientId?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `router` | `RouterState` |
| `timestamp` | `number` |
| `clientId?` | `string` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/router.ts:246](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L246)

___

### \_makeRoutingOnClient

▸ `Protected` **_makeRoutingOnClient**(`«destructured»`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `action` | ``"push"`` \| ``"replace"`` \| ``"go"`` \| ``"goBack"`` \| ``"goForward"`` |
| › `args` | `any`[] |
| › `name` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/reactant-share/src/modules/router.ts:324](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L324)

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

[packages/reactant-share/src/modules/router.ts:357](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L357)

___

### afterCombineRootReducers

▸ `Optional` **afterCombineRootReducers**(`rootReducer`): `Reducer`

As hook after combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer` |

#### Returns

`Reducer`

#### Inherited from

BaseReactantRouter.afterCombineRootReducers

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-router/src/router.tsx:87](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L87)

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

[packages/reactant-share/src/modules/router.ts:392](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L392)

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

[packages/reactant-share/src/modules/router.ts:442](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L442)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/modules/router.ts:462](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L462)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/modules/router.ts:482](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L482)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L135)

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

[packages/reactant-share/src/modules/router.ts:402](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L402)

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

[packages/reactant-share/src/modules/router.ts:422](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L422)

___

### watchRehydratedRouting

▸ **watchRehydratedRouting**(): `Unsubscribe`

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-share/src/modules/router.ts:222](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/router.ts#L222)
