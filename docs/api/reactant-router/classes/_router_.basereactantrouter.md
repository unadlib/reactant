---
id: "_router_.basereactantrouter"
title: "BaseReactantRouter"
sidebar_label: "BaseReactantRouter"
---

## Hierarchy

* PluginModule

  ↳ **BaseReactantRouter**

  ↳ [ReactantRouter](_router_.reactantrouter.md)

## Implements

* Service

## Index

### Constructors

* [constructor](_router_.basereactantrouter.md#constructor)

### Properties

* [[storeKey]](_router_.basereactantrouter.md#optional-readonly-[storekey])
* [autoCreateHistory](_router_.basereactantrouter.md#autocreatehistory)
* [autoProvide](_router_.basereactantrouter.md#autoprovide)
* [enhancer](_router_.basereactantrouter.md#optional-enhancer)
* [history](_router_.basereactantrouter.md#protected-history)
* [middleware](_router_.basereactantrouter.md#optional-middleware)
* [onLocationChanged](_router_.basereactantrouter.md#onlocationchanged)
* [options](_router_.basereactantrouter.md#protected-options)
* [stateKey](_router_.basereactantrouter.md#statekey)

### Accessors

* [currentPath](_router_.basereactantrouter.md#currentpath)
* [router](_router_.basereactantrouter.md#router)

### Methods

* [ConnectedRouter](_router_.basereactantrouter.md#connectedrouter)
* [afterCombineRootReducers](_router_.basereactantrouter.md#optional-aftercombinerootreducers)
* [afterCreateStore](_router_.basereactantrouter.md#optional-aftercreatestore)
* [beforeCombineRootReducers](_router_.basereactantrouter.md#beforecombinerootreducers)
* [go](_router_.basereactantrouter.md#abstract-go)
* [goBack](_router_.basereactantrouter.md#abstract-goback)
* [goForward](_router_.basereactantrouter.md#abstract-goforward)
* [preloadedStateHandler](_router_.basereactantrouter.md#optional-preloadedstatehandler)
* [provider](_router_.basereactantrouter.md#provider)
* [push](_router_.basereactantrouter.md#abstract-push)
* [replace](_router_.basereactantrouter.md#abstract-replace)

## Constructors

###  constructor

\+ **new BaseReactantRouter**(`options`: [IRouterOptions](../interfaces/_router_.irouteroptions.md), `autoCreateHistory`: boolean): *[BaseReactantRouter](_router_.basereactantrouter.md)*

*Defined in [packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L65)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [IRouterOptions](../interfaces/_router_.irouteroptions.md) | - |
`autoCreateHistory` | boolean | true |

**Returns:** *[BaseReactantRouter](_router_.basereactantrouter.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L42)*

___

###  autoCreateHistory

• **autoCreateHistory**: *boolean*

*Defined in [packages/reactant-router/src/router.tsx:63](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L63)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Defined in [packages/reactant-router/src/router.tsx:44](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L44)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[enhancer](_router_.basereactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-module/src/core/plugin.ts#L26)*

inject enhancer for Redux

___

### `Protected` history

• **history**: *History*

*Defined in [packages/reactant-router/src/router.tsx:48](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L48)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[middleware](_router_.basereactantrouter.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-module/src/core/plugin.ts#L23)*

inject middleware for Redux

___

###  onLocationChanged

• **onLocationChanged**: *onLocationChanged* = onLocationChanged

*Defined in [packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L65)*

___

### `Protected` options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Defined in [packages/reactant-router/src/router.tsx:68](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L68)*

___

###  stateKey

• **stateKey**: *string*

*Defined in [packages/reactant-router/src/router.tsx:46](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L46)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Defined in [packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L118)*

**Returns:** *string*

___

###  router

• **get router**(): *[RouterState](../interfaces/_router_.routerstate.md)*

*Defined in [packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L114)*

**Returns:** *[RouterState](../interfaces/_router_.routerstate.md)*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Defined in [packages/reactant-router/src/router.tsx:110](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L110)*

**Parameters:**

▪ **props**: *object*

Name | Type |
------ | ------ |
`children?` | ReactNode |

**Returns:** *Element‹›*

___

### `Optional` afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *Reducer*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[afterCombineRootReducers](_router_.basereactantrouter.md#optional-aftercombinerootreducers)*

*Defined in [packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-module/src/core/plugin.ts#L37)*

As hook after combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[afterCreateStore](_router_.basereactantrouter.md#optional-aftercreatestore)*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-module/src/core/plugin.ts#L29)*

As hook after createStore

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:98](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Abstract` go

▸ **go**(`n`: number): *Promise‹void› | void*

*Defined in [packages/reactant-router/src/router.tsx:57](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *Promise‹void› | void*

___

### `Abstract` goBack

▸ **goBack**(): *Promise‹void› | void*

*Defined in [packages/reactant-router/src/router.tsx:59](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L59)*

**Returns:** *Promise‹void› | void*

___

### `Abstract` goForward

▸ **goForward**(): *Promise‹void› | void*

*Defined in [packages/reactant-router/src/router.tsx:61](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L61)*

**Returns:** *Promise‹void› | void*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[preloadedStateHandler](_router_.basereactantrouter.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-module/src/core/plugin.ts#L18)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹any›): *Element‹›*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

### `Abstract` push

▸ **push**(`path`: string, `state?`: Record‹string, any›): *void*

*Defined in [packages/reactant-router/src/router.tsx:50](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *void*

___

### `Abstract` replace

▸ **replace**(`path`: string, `state?`: Record‹string, any›): *Promise‹void› | void*

*Defined in [packages/reactant-router/src/router.tsx:52](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *Promise‹void› | void*
