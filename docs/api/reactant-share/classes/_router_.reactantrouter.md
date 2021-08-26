---
id: "_router_.reactantrouter"
title: "ReactantRouter"
sidebar_label: "ReactantRouter"
---

ReactantRouter
todo

## Hierarchy

* BaseReactantRouter

  ↳ **ReactantRouter**

## Implements

* Service

## Index

### Constructors

* [constructor](_router_.reactantrouter.md#constructor)

### Properties

* [[storeKey]](_router_.reactantrouter.md#optional-readonly-[storekey])
* [_router](_router_.reactantrouter.md#private-optional-_router)
* [autoCreateHistory](_router_.reactantrouter.md#autocreatehistory)
* [autoProvide](_router_.reactantrouter.md#autoprovide)
* [enhancer](_router_.reactantrouter.md#optional-enhancer)
* [history](_router_.reactantrouter.md#protected-history)
* [middleware](_router_.reactantrouter.md#optional-middleware)
* [name](_router_.reactantrouter.md#name)
* [options](_router_.reactantrouter.md#protected-options)
* [portDetector](_router_.reactantrouter.md#protected-portdetector)
* [sharedAppOptions](_router_.reactantrouter.md#protected-sharedappoptions)
* [stateKey](_router_.reactantrouter.md#statekey)

### Accessors

* [currentPath](_router_.reactantrouter.md#currentpath)
* [router](_router_.reactantrouter.md#router)

### Methods

* [ConnectedRouter](_router_.reactantrouter.md#connectedrouter)
* [afterCombineRootReducers](_router_.reactantrouter.md#optional-aftercombinerootreducers)
* [afterCreateStore](_router_.reactantrouter.md#optional-aftercreatestore)
* [beforeCombineRootReducers](_router_.reactantrouter.md#beforecombinerootreducers)
* [go](_router_.reactantrouter.md#go)
* [goBack](_router_.reactantrouter.md#goback)
* [goForward](_router_.reactantrouter.md#goforward)
* [preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)
* [provider](_router_.reactantrouter.md#provider)
* [push](_router_.reactantrouter.md#push)
* [replace](_router_.reactantrouter.md#replace)

## Constructors

###  constructor

\+ **new ReactantRouter**(`options`: [IRouterOptions](../interfaces/_router_.irouteroptions.md), `portDetector`: [PortDetector](_portdetector_.portdetector.md), `sharedAppOptions`: [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)): *[ReactantRouter](_router_.reactantrouter.md)*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:53](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IRouterOptions](../interfaces/_router_.irouteroptions.md) |
`portDetector` | [PortDetector](_portdetector_.portdetector.md) |
`sharedAppOptions` | [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md) |

**Returns:** *[ReactantRouter](_router_.reactantrouter.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[[storeKey]](_router_.reactantrouter.md#optional-readonly-[storekey])*

*Overrides [ReactantStorage](_storage_.reactantstorage.md).[[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-router/src/router.tsx:41](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L41)*

___

### `Private` `Optional` _router

• **_router**? : *RouterState*

*Defined in [packages/reactant-share/src/router.ts:53](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L53)*

___

###  autoCreateHistory

• **autoCreateHistory**: *boolean*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[autoCreateHistory](_router_.reactantrouter.md#autocreatehistory)*

*Defined in [packages/reactant-router/src/router.tsx:62](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L62)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[autoProvide](_router_.reactantrouter.md#autoprovide)*

*Defined in [packages/reactant-router/src/router.tsx:43](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L43)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[enhancer](_router_.reactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L29)*

inject enhancer for Redux

___

### `Protected` history

• **history**: *History*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[history](_router_.reactantrouter.md#protected-history)*

*Defined in [packages/reactant-router/src/router.tsx:47](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L47)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[middleware](_router_.reactantrouter.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L26)*

inject middleware for Redux

___

###  name

• **name**: *string* = "reactant:router"

*Overrides [ReactantStorage](_storage_.reactantstorage.md).[name](_storage_.reactantstorage.md#optional-name)*

*Defined in [packages/reactant-share/src/router.ts:51](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L51)*

___

### `Protected` options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:56](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L56)*

___

### `Protected` portDetector

• **portDetector**: *[PortDetector](_portdetector_.portdetector.md)*

*Defined in [packages/reactant-share/src/router.ts:57](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L57)*

___

### `Protected` sharedAppOptions

• **sharedAppOptions**: *[ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)*

*Defined in [packages/reactant-share/src/router.ts:58](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L58)*

___

###  stateKey

• **stateKey**: *string*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[stateKey](_router_.reactantrouter.md#statekey)*

*Defined in [packages/reactant-router/src/router.tsx:45](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L45)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[currentPath](_router_.reactantrouter.md#currentpath)*

*Defined in [packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L115)*

**Returns:** *string*

___

###  router

• **get router**(): *any*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:126](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L126)*

**Returns:** *any*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[ConnectedRouter](_router_.reactantrouter.md#connectedrouter)*

*Defined in [packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L107)*

**Parameters:**

▪ **props**: *object*

Name | Type |
------ | ------ |
`children?` | ReactNode |

**Returns:** *Element‹›*

___

### `Optional` afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *Reducer*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[afterCombineRootReducers](_router_.reactantrouter.md#optional-aftercombinerootreducers)*

*Defined in [packages/reactant-module/src/core/plugin.ts:40](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L40)*

As hook after combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[afterCreateStore](_router_.reactantrouter.md#optional-aftercreatestore)*

*Defined in [packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L32)*

As hook after createStore

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[beforeCombineRootReducers](_router_.reactantrouter.md#beforecombinerootreducers)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:95](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

###  go

▸ **go**(`n`: number): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:141](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *Promise‹void›*

___

###  goBack

▸ **goBack**(): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:146](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L146)*

**Returns:** *Promise‹void›*

___

###  goForward

▸ **goForward**(): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:151](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L151)*

**Returns:** *Promise‹void›*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:21](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L21)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹any›): *Element‹›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[provider](_router_.reactantrouter.md#provider)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:119](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

###  push

▸ **push**(`path`: string, `state?`: Record‹string, any›): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:131](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *Promise‹void›*

___

###  replace

▸ **replace**(`path`: string, `state?`: Record‹string, any›): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:136](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/router.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *Promise‹void›*