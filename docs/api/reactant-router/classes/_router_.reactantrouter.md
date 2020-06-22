---
id: "_router_.reactantrouter"
title: "ReactantRouter"
sidebar_label: "ReactantRouter"
---

## Hierarchy

* PluginModule

  ↳ **ReactantRouter**

## Implements

* Service

## Index

### Constructors

* [constructor](_router_.reactantrouter.md#constructor)

### Properties

* [[storeKey]](_router_.reactantrouter.md#optional-readonly-[storekey])
* [autoProvide](_router_.reactantrouter.md#autoprovide)
* [enhancer](_router_.reactantrouter.md#optional-enhancer)
* [history](_router_.reactantrouter.md#history)
* [middleware](_router_.reactantrouter.md#middleware)
* [name](_router_.reactantrouter.md#optional-name)
* [options](_router_.reactantrouter.md#options)

### Accessors

* [currentPath](_router_.reactantrouter.md#currentpath)
* [router](_router_.reactantrouter.md#router)

### Methods

* [ConnectedRouter](_router_.reactantrouter.md#connectedrouter)
* [afterCombineRootReducers](_router_.reactantrouter.md#optional-aftercombinerootreducers)
* [afterCreateStore](_router_.reactantrouter.md#optional-aftercreatestore)
* [beforeCombineRootReducers](_router_.reactantrouter.md#beforecombinerootreducers)
* [preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)
* [provider](_router_.reactantrouter.md#provider)

## Constructors

###  constructor

\+ **new ReactantRouter**(`options`: [IRouterOptions](../interfaces/_router_.irouteroptions.md)): *[ReactantRouter](_router_.reactantrouter.md)*

*Defined in [packages/reactant-router/src/router.tsx:26](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IRouterOptions](../interfaces/_router_.irouteroptions.md) |

**Returns:** *[ReactantRouter](_router_.reactantrouter.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:24](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L24)*

___

###  autoProvide

• **autoProvide**: *boolean*

*Defined in [packages/reactant-router/src/router.tsx:26](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L26)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[enhancer](_router_.reactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:25](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/core/plugin.ts#L25)*

___

###  history

• **history**: *History‹undefined | null | object›* = createBrowserHistory()

*Defined in [packages/reactant-router/src/router.tsx:34](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L34)*

___

###  middleware

• **middleware**: *Middleware‹object, any, Dispatch‹AnyAction‹›››* = routerMiddleware(this.history)

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:36](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L36)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[name](_router_.reactantrouter.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:17](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/core/plugin.ts#L17)*

___

###  options

• **options**: *[IRouterOptions](../interfaces/_router_.irouteroptions.md)*

*Defined in [packages/reactant-router/src/router.tsx:28](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L28)*

## Accessors

###  currentPath

• **get currentPath**(): *string*

*Defined in [packages/reactant-router/src/router.tsx:59](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L59)*

**Returns:** *string*

___

###  router

• **get router**(): *[RouterState](../interfaces/_router_.routerstate.md)*

*Defined in [packages/reactant-router/src/router.tsx:55](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L55)*

**Returns:** *[RouterState](../interfaces/_router_.routerstate.md)*

## Methods

###  ConnectedRouter

▸ **ConnectedRouter**(`props`: object): *Element‹›*

*Defined in [packages/reactant-router/src/router.tsx:51](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L51)*

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

*Defined in [packages/reactant-module/src/core/plugin.ts:33](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/core/plugin.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[afterCreateStore](_router_.reactantrouter.md#optional-aftercreatestore)*

*Defined in [packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/core/plugin.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:38](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:19](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/core/plugin.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹any›): *Element‹›*

*Overrides void*

*Defined in [packages/reactant-router/src/router.tsx:63](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-router/src/router.tsx#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*
