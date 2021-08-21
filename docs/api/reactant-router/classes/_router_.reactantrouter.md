---
id: "_router_.reactantrouter"
title: "ReactantRouter"
sidebar_label: "ReactantRouter"
---

## Hierarchy

  ↳ [BaseReactantRouter](_router_.basereactantrouter.md)

  ↳ **ReactantRouter**

## Implements

* Service

## Index

### Constructors

* [constructor](_router_.reactantrouter.md#constructor)

### Properties

* [[storeKey]](_router_.reactantrouter.md#optional-readonly-[storekey])
* [autoCreateHistory](_router_.reactantrouter.md#autocreatehistory)
* [autoProvide](_router_.reactantrouter.md#autoprovide)
* [enhancer](_router_.reactantrouter.md#optional-enhancer)
* [history](_router_.reactantrouter.md#protected-history)
* [middleware](_router_.reactantrouter.md#optional-middleware)
* [name](_router_.reactantrouter.md#optional-name)
* [options](_router_.reactantrouter.md#options)
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

\+ **new ReactantRouter**(`options`: [IRouterOptions](../interfaces/_router_.irouteroptions.md)): *[ReactantRouter](_router_.reactantrouter.md)*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[constructor](_router_.basereactantrouter.md#constructor)*

*Defined in [packages/reactant-router/src/router.tsx:126](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IRouterOptions](../interfaces/_router_.irouteroptions.md) |

**Returns:** *[ReactantRouter](_router_.reactantrouter.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[[storeKey]](_router_.basereactantrouter.md#optional-readonly-[storekey])*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:41](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L41)*

___

###  autoCreateHistory

• **autoCreateHistory**: *boolean*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[autoCreateHistory](_router_.basereactantrouter.md#autocreatehistory)*

*Defined in [packages/reactant-router/src/router.tsx:62](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L62)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[autoProvide](_router_.basereactantrouter.md#autoprovide)*

*Defined in [packages/reactant-router/src/router.tsx:43](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L43)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[enhancer](_router_.basereactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L29)*

inject enhancer for Redux

___

### `Protected` history

• **history**: *History*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[history](_router_.basereactantrouter.md#protected-history)*

*Defined in [packages/reactant-router/src/router.tsx:47](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L47)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[middleware](_router_.basereactantrouter.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L26)*

inject middleware for Redux

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[name](_router_.basereactantrouter.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-module/src/core/plugin.ts#L18)*

As a key in reducers object map

___

###  options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[options](_router_.basereactantrouter.md#protected-options)*

*Defined in [packages/reactant-router/src/router.tsx:127](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L127)*

___

###  stateKey

• **stateKey**: *string*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[stateKey](_router_.basereactantrouter.md#statekey)*

*Defined in [packages/reactant-router/src/router.tsx:45](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L45)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[currentPath](_router_.basereactantrouter.md#currentpath)*

*Defined in [packages/reactant-router/src/router.tsx:115](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L115)*

**Returns:** *string*

___

###  router

• **get router**(): *[RouterState](../interfaces/_router_.routerstate.md)*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[router](_router_.basereactantrouter.md#router)*

*Defined in [packages/reactant-router/src/router.tsx:111](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L111)*

**Returns:** *[RouterState](../interfaces/_router_.routerstate.md)*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[ConnectedRouter](_router_.basereactantrouter.md#connectedrouter)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[afterCombineRootReducers](_router_.basereactantrouter.md#optional-aftercombinerootreducers)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[afterCreateStore](_router_.basereactantrouter.md#optional-aftercreatestore)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[beforeCombineRootReducers](_router_.basereactantrouter.md#beforecombinerootreducers)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:95](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

###  go

▸ **go**(`n`: number): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[go](_router_.basereactantrouter.md#abstract-go)*

*Defined in [packages/reactant-router/src/router.tsx:139](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *void*

___

###  goBack

▸ **goBack**(): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[goBack](_router_.basereactantrouter.md#abstract-goback)*

*Defined in [packages/reactant-router/src/router.tsx:143](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L143)*

**Returns:** *void*

___

###  goForward

▸ **goForward**(): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[goForward](_router_.basereactantrouter.md#abstract-goforward)*

*Defined in [packages/reactant-router/src/router.tsx:147](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L147)*

**Returns:** *void*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[preloadedStateHandler](_router_.basereactantrouter.md#optional-preloadedstatehandler)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[provider](_router_.basereactantrouter.md#provider)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:119](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

###  push

▸ **push**(`path`: string, `state?`: Record‹string, any›): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[push](_router_.basereactantrouter.md#abstract-push)*

*Defined in [packages/reactant-router/src/router.tsx:131](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *void*

___

###  replace

▸ **replace**(`path`: string, `state?`: Record‹string, any›): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[replace](_router_.basereactantrouter.md#abstract-replace)*

*Defined in [packages/reactant-router/src/router.tsx:135](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-router/src/router.tsx#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *void*
