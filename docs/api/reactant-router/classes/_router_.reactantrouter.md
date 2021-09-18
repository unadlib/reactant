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
* [onLocationChanged](_router_.reactantrouter.md#onlocationchanged)
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

*Defined in [packages/reactant-router/src/router.tsx:129](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L129)*

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

*Defined in [packages/reactant-router/src/router.tsx:42](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L42)*

___

###  autoCreateHistory

• **autoCreateHistory**: *boolean*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[autoCreateHistory](_router_.basereactantrouter.md#autocreatehistory)*

*Defined in [packages/reactant-router/src/router.tsx:63](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L63)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[autoProvide](_router_.basereactantrouter.md#autoprovide)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[history](_router_.basereactantrouter.md#protected-history)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[onLocationChanged](_router_.basereactantrouter.md#onlocationchanged)*

*Defined in [packages/reactant-router/src/router.tsx:65](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L65)*

___

###  options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[options](_router_.basereactantrouter.md#protected-options)*

*Defined in [packages/reactant-router/src/router.tsx:130](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L130)*

___

###  stateKey

• **stateKey**: *string*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[stateKey](_router_.basereactantrouter.md#statekey)*

*Defined in [packages/reactant-router/src/router.tsx:46](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L46)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[currentPath](_router_.basereactantrouter.md#currentpath)*

*Defined in [packages/reactant-router/src/router.tsx:118](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L118)*

**Returns:** *string*

___

###  router

• **get router**(): *[RouterState](../interfaces/_router_.routerstate.md)*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[router](_router_.basereactantrouter.md#router)*

*Defined in [packages/reactant-router/src/router.tsx:114](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L114)*

**Returns:** *[RouterState](../interfaces/_router_.routerstate.md)*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[ConnectedRouter](_router_.basereactantrouter.md#connectedrouter)*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[beforeCombineRootReducers](_router_.basereactantrouter.md#beforecombinerootreducers)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:98](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

###  go

▸ **go**(`n`: number): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[go](_router_.basereactantrouter.md#abstract-go)*

*Defined in [packages/reactant-router/src/router.tsx:142](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *void*

___

###  goBack

▸ **goBack**(): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[goBack](_router_.basereactantrouter.md#abstract-goback)*

*Defined in [packages/reactant-router/src/router.tsx:146](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L146)*

**Returns:** *void*

___

###  goForward

▸ **goForward**(): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[goForward](_router_.basereactantrouter.md#abstract-goforward)*

*Defined in [packages/reactant-router/src/router.tsx:150](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L150)*

**Returns:** *void*

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

*Inherited from [BaseReactantRouter](_router_.basereactantrouter.md).[provider](_router_.basereactantrouter.md#provider)*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:122](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

###  push

▸ **push**(`path`: string, `state?`: Record‹string, any›): *void*

*Overrides [BaseReactantRouter](_router_.basereactantrouter.md).[push](_router_.basereactantrouter.md#abstract-push)*

*Defined in [packages/reactant-router/src/router.tsx:134](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L134)*

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

*Defined in [packages/reactant-router/src/router.tsx:138](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-router/src/router.tsx#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`state?` | Record‹string, any› |

**Returns:** *void*
