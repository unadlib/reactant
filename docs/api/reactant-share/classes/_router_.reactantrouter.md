---
id: "_router_.reactantrouter"
title: "ReactantRouter"
sidebar_label: "ReactantRouter"
---

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

*Defined in [packages/reactant-share/src/router.ts:49](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L49)*

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

*Defined in [packages/reactant-router/src/router.tsx:41](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L41)*

___

### `Private` `Optional` _router

• **_router**? : *RouterState*

*Defined in [packages/reactant-share/src/router.ts:49](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L49)*

___

###  autoCreateHistory

• **autoCreateHistory**: *boolean*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[autoCreateHistory](_router_.reactantrouter.md#autocreatehistory)*

*Defined in [packages/reactant-router/src/router.tsx:62](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L62)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[autoProvide](_router_.reactantrouter.md#autoprovide)*

*Defined in [packages/reactant-router/src/router.tsx:43](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L43)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[enhancer](_router_.reactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/core/plugin.ts#L26)*

inject enhancer for Redux

___

### `Protected` history

• **history**: *History*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[history](_router_.reactantrouter.md#protected-history)*

*Defined in [packages/reactant-router/src/router.tsx:47](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L47)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[middleware](_router_.reactantrouter.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/core/plugin.ts#L23)*

inject middleware for Redux

___

### `Protected` options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:52](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L52)*

___

### `Protected` portDetector

• **portDetector**: *[PortDetector](_portdetector_.portdetector.md)*

*Defined in [packages/reactant-share/src/router.ts:53](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L53)*

___

### `Protected` sharedAppOptions

• **sharedAppOptions**: *[ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)*

*Defined in [packages/reactant-share/src/router.ts:54](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L54)*

___

###  stateKey

• **stateKey**: *string*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[stateKey](_router_.reactantrouter.md#statekey)*

*Defined in [packages/reactant-router/src/router.tsx:45](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L45)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[currentPath](_router_.reactantrouter.md#currentpath)*

*Defined in [packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L115)*

**Returns:** *string*

___

###  router

• **get router**(): *any*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:122](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L122)*

**Returns:** *any*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[ConnectedRouter](_router_.reactantrouter.md#connectedrouter)*

*Defined in [packages/reactant-router/src/router.tsx:107](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L107)*

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

*Defined in [packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/core/plugin.ts#L37)*

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

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/core/plugin.ts#L29)*

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

*Defined in [packages/reactant-router/src/router.tsx:95](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

###  go

▸ **go**(`n`: number): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:137](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *Promise‹void›*

___

###  goBack

▸ **goBack**(): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:142](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L142)*

**Returns:** *Promise‹void›*

___

###  goForward

▸ **goForward**(): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:147](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L147)*

**Returns:** *Promise‹void›*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/core/plugin.ts#L18)*

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

*Defined in [packages/reactant-router/src/router.tsx:119](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-router/src/router.tsx#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

###  push

▸ **push**(`path`: string, `state?`: Record‹string, any›): *Promise‹void›*

*Overrides void*

*Defined in [packages/reactant-share/src/router.ts:127](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L127)*

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

*Defined in [packages/reactant-share/src/router.ts:132](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/router.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *Promise‹void›*
