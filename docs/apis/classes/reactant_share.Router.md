# Class: Router

[reactant-share](../modules/reactant_share.md).Router

## Hierarchy

- `BaseReactantRouter`

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
- [enhancer](reactant_share.Router.md#enhancer)
- [history](reactant_share.Router.md#history)
- [middleware](reactant_share.Router.md#middleware)
- [name](reactant_share.Router.md#name)
- [onLocationChanged](reactant_share.Router.md#onlocationchanged)
- [options](reactant_share.Router.md#options)
- [portDetector](reactant_share.Router.md#portdetector)
- [sharedAppOptions](reactant_share.Router.md#sharedappoptions)
- [stateKey](reactant_share.Router.md#statekey)
- [toBeRouted](reactant_share.Router.md#toberouted)

### Accessors

- [\_router](reactant_share.Router.md#_router)
- [clientName](reactant_share.Router.md#clientname)
- [currentPath](reactant_share.Router.md#currentpath)
- [defaultRoute](reactant_share.Router.md#defaultroute)
- [router](reactant_share.Router.md#router)

### Methods

- [\_go](reactant_share.Router.md#_go)
- [\_goBack](reactant_share.Router.md#_goback)
- [\_goForward](reactant_share.Router.md#_goforward)
- [\_push](reactant_share.Router.md#_push)
- [\_replace](reactant_share.Router.md#_replace)
- [\_route](reactant_share.Router.md#_route)
- [\_setRouters](reactant_share.Router.md#_setrouters)
- [afterCombineRootReducers](reactant_share.Router.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.Router.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_share.Router.md#beforecombinerootreducers)
- [go](reactant_share.Router.md#go)
- [goBack](reactant_share.Router.md#goback)
- [goForward](reactant_share.Router.md#goforward)
- [preloadedStateHandler](reactant_share.Router.md#preloadedstatehandler)
- [provider](reactant_share.Router.md#provider)
- [push](reactant_share.Router.md#push)
- [replace](reactant_share.Router.md#replace)

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

[packages/reactant-share/src/router.ts:70](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L70)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L114)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@351424

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L50)

___

### \_routers

• `Private` **\_routers**: `Record`<`string`, `RouterState`\> = `{}`

#### Defined in

[packages/reactant-share/src/router.ts:212](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L212)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:69](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L69)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L54)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

___

### name

• `Protected` **name**: `string`

#### Defined in

[packages/reactant-share/src/router.ts:68](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L68)

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

BaseReactantRouter.onLocationChanged

#### Defined in

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L71)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/reactant_share.IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

#### Defined in

[packages/reactant-share/src/router.ts:73](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L73)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](reactant_share.PortDetector.md)

#### Defined in

[packages/reactant-share/src/router.ts:71](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L71)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md)

#### Defined in

[packages/reactant-share/src/router.ts:72](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L72)

___

### stateKey

• `Protected` `Readonly` **stateKey**: ``"router"``

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L73)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:209](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L209)

## Accessors

### \_router

• `Private` `get` **_router**(): `RouterState`

#### Returns

`RouterState`

#### Defined in

[packages/reactant-share/src/router.ts:205](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L205)

___

### clientName

• `get` **clientName**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Defined in

[packages/reactant-share/src/router.ts:304](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L304)

___

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/router.ts:224](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L224)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/router.ts:220](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L220)

___

### router

• `get` **router**(): `RouterState`

#### Returns

`RouterState`

#### Overrides

BaseReactantRouter.router

#### Defined in

[packages/reactant-share/src/router.ts:228](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L228)

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

[packages/reactant-share/src/router.ts:256](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L256)

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

[packages/reactant-share/src/router.ts:264](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L264)

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

[packages/reactant-share/src/router.ts:272](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L272)

___

### \_push

▸ `Private` **_push**(`path`, `locationState`, `name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState` | `PoorMansUnknown` |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:232](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L232)

___

### \_replace

▸ `Private` **_replace**(`path`, `locationState`, `name`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState` | `PoorMansUnknown` |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:244](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L244)

___

### \_route

▸ `Private` **_route**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `RouterChangeNameOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:146](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L146)

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

[packages/reactant-share/src/router.ts:214](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L214)

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

BaseReactantRouter.afterCreateStore

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

BaseReactantRouter.beforeCombineRootReducers

#### Defined in

[packages/reactant-router/src/router.tsx:102](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L102)

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

[packages/reactant-share/src/router.ts:292](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L292)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:296](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L296)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:300](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L300)

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

BaseReactantRouter.provider

#### Defined in

[packages/reactant-router/src/router.tsx:126](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-router/src/router.tsx#L126)

___

### push

▸ **push**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `PoorMansUnknown` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.push

#### Defined in

[packages/reactant-share/src/router.ts:280](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L280)

___

### replace

▸ **replace**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `PoorMansUnknown` |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.replace

#### Defined in

[packages/reactant-share/src/router.ts:284](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/router.ts#L284)
