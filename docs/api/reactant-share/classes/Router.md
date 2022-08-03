# Class: Router

## Hierarchy

- `BaseReactantRouter`

  ↳ **`Router`**

## Table of contents

### Constructors

- [constructor](Router.md#constructor)

### Properties

- [ConnectedRouter](Router.md#connectedrouter)
- [[storeKey]](Router.md#[storekey])
- [\_router](Router.md#_router)
- [autoCreateHistory](Router.md#autocreatehistory)
- [autoProvide](Router.md#autoprovide)
- [enhancer](Router.md#enhancer)
- [history](Router.md#history)
- [middleware](Router.md#middleware)
- [onLocationChanged](Router.md#onlocationchanged)
- [options](Router.md#options)
- [portDetector](Router.md#portdetector)
- [sharedAppOptions](Router.md#sharedappoptions)
- [stateKey](Router.md#statekey)
- [toBeRouted](Router.md#toberouted)

### Accessors

- [currentPath](Router.md#currentpath)
- [defaultRoute](Router.md#defaultroute)
- [isWorker](Router.md#isworker)
- [router](Router.md#router)

### Methods

- [\_go](Router.md#_go)
- [\_goBack](Router.md#_goback)
- [\_goForward](Router.md#_goforward)
- [\_push](Router.md#_push)
- [\_replace](Router.md#_replace)
- [\_setRouter](Router.md#_setrouter)
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

• **new Router**(`portDetector`, `sharedAppOptions`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](PortDetector.md) |
| `sharedAppOptions` | `ISharedAppOptions` |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) |

#### Overrides

BaseReactantRouter.constructor

#### Defined in

[packages/reactant-share/src/router.ts:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L56)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L115)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@969

#### Defined in

[packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L50)

___

### \_router

• `Private` **\_router**: ``null`` \| `RouterState` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:164](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L164)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L71)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L56)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

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

BaseReactantRouter.onLocationChanged

#### Defined in

[packages/reactant-router/src/router.tsx:73](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L73)

___

### options

• `Protected` **options**: [`IRouterOptions`](../interfaces/IRouterOptions.md)

#### Inherited from

BaseReactantRouter.options

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](PortDetector.md)

___

### sharedAppOptions

• `Protected` **sharedAppOptions**: `ISharedAppOptions`

___

### stateKey

• **stateKey**: `string`

#### Inherited from

BaseReactantRouter.stateKey

#### Defined in

[packages/reactant-router/src/router.tsx:54](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L54)

___

### toBeRouted

• **toBeRouted**: ``null`` \| () => `void` = `null`

#### Defined in

[packages/reactant-share/src/router.ts:161](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L161)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Overrides

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-share/src/router.ts:176](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L176)

___

### defaultRoute

• `Protected` `get` **defaultRoute**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/router.ts:172](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L172)

___

### isWorker

• `Private` `get` **isWorker**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/router.ts:180](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L180)

___

### router

• `get` **router**(): `RouterState`

#### Returns

`RouterState`

#### Overrides

BaseReactantRouter.router

#### Defined in

[packages/reactant-share/src/router.ts:184](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L184)

## Methods

### \_go

▸ `Private` **_go**(`n`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:198](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L198)

___

### \_goBack

▸ `Private` **_goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:202](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L202)

___

### \_goForward

▸ `Private` **_goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:206](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L206)

___

### \_push

▸ `Private` **_push**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `PoorMansUnknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:190](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L190)

___

### \_replace

▸ `Private` **_replace**(`path`, `locationState?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `locationState?` | `PoorMansUnknown` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/router.ts:194](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L194)

___

### \_setRouter

▸ `Private` **_setRouter**(`router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/router.ts:167](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L167)

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

BaseReactantRouter.afterCreateStore

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

BaseReactantRouter.beforeCombineRootReducers

#### Defined in

[packages/reactant-router/src/router.tsx:103](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L103)

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

[packages/reactant-share/src/router.ts:218](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L218)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:222](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L222)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:226](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L226)

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

BaseReactantRouter.provider

#### Defined in

[packages/reactant-router/src/router.tsx:127](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-router/src/router.tsx#L127)

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

[packages/reactant-share/src/router.ts:210](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L210)

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

[packages/reactant-share/src/router.ts:214](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/router.ts#L214)
