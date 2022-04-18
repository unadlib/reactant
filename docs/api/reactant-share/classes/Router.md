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

• **new Router**(`options`, `portDetector`, `sharedAppOptions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IRouterOptions`](../interfaces/IRouterOptions.md) |
| `portDetector` | [`PortDetector`](PortDetector.md) |
| `sharedAppOptions` | `ISharedAppOptions` |

#### Overrides

BaseReactantRouter.constructor

#### Defined in

[packages/reactant-share/src/router.ts:50](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L50)

## Properties

### ConnectedRouter

• **ConnectedRouter**: `FunctionComponent`<{}\>

#### Inherited from

BaseReactantRouter.ConnectedRouter

#### Defined in

[packages/reactant-router/src/router.tsx:110](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L110)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantRouter.\_\_@storeKey@907

#### Defined in

[packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L42)

___

### \_router

• `Private` `Optional` **\_router**: `RouterState`

#### Defined in

[packages/reactant-share/src/router.ts:48](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L48)

___

### autoCreateHistory

• **autoCreateHistory**: `boolean`

#### Inherited from

BaseReactantRouter.autoCreateHistory

#### Defined in

[packages/reactant-router/src/router.tsx:63](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L63)

___

### autoProvide

• **autoProvide**: `boolean`

#### Inherited from

BaseReactantRouter.autoProvide

#### Defined in

[packages/reactant-router/src/router.tsx:44](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L44)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantRouter.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/core/plugin.ts#L26)

___

### history

• `Protected` **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

BaseReactantRouter.history

#### Defined in

[packages/reactant-router/src/router.tsx:48](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L48)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantRouter.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/core/plugin.ts#L23)

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

[packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L65)

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

[packages/reactant-router/src/router.tsx:46](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L46)

## Accessors

### currentPath

• `get` **currentPath**(): `string`

#### Returns

`string`

#### Inherited from

BaseReactantRouter.currentPath

#### Defined in

[packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L118)

___

### router

• `get` **router**(): `any`

#### Returns

`any`

#### Overrides

BaseReactantRouter.router

#### Defined in

[packages/reactant-share/src/router.ts:127](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L127)

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

BaseReactantRouter.afterCombineRootReducers

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/core/plugin.ts#L37)

___

### afterCreateStore

▸ `Optional` **afterCreateStore**(`store`): `void`

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`void`

#### Inherited from

BaseReactantRouter.afterCreateStore

#### Defined in

[packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/core/plugin.ts#L29)

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

[packages/reactant-router/src/router.tsx:98](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L98)

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

[packages/reactant-share/src/router.ts:139](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L139)

___

### goBack

▸ **goBack**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goBack

#### Defined in

[packages/reactant-share/src/router.ts:143](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L143)

___

### goForward

▸ **goForward**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.goForward

#### Defined in

[packages/reactant-share/src/router.ts:147](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L147)

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

[packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/core/plugin.ts#L18)

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

[packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-router/src/router.tsx#L122)

___

### push

▸ **push**(`path`, `state?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.push

#### Defined in

[packages/reactant-share/src/router.ts:131](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L131)

___

### replace

▸ **replace**(`path`, `state?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `state?` | `Record`<`string`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Overrides

BaseReactantRouter.replace

#### Defined in

[packages/reactant-share/src/router.ts:135](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/router.ts#L135)
