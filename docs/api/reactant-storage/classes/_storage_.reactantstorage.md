---
id: "_storage_.reactantstorage"
title: "ReactantStorage"
sidebar_label: "ReactantStorage"
---

## Hierarchy

* PluginModule

  ↳ **ReactantStorage**

## Implements

* Service

## Index

### Constructors

* [constructor](_storage_.reactantstorage.md#constructor)

### Properties

* [[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])
* [enhancer](_storage_.reactantstorage.md#optional-enhancer)
* [middleware](_storage_.reactantstorage.md#optional-middleware)
* [name](_storage_.reactantstorage.md#optional-name)
* [options](_storage_.reactantstorage.md#options)
* [persistConfig](_storage_.reactantstorage.md#protected-persistconfig)

### Methods

* [afterCombineRootReducers](_storage_.reactantstorage.md#aftercombinerootreducers)
* [afterCreateStore](_storage_.reactantstorage.md#aftercreatestore)
* [beforeCombineRootReducers](_storage_.reactantstorage.md#beforecombinerootreducers)
* [preloadedStateHandler](_storage_.reactantstorage.md#optional-preloadedstatehandler)
* [provider](_storage_.reactantstorage.md#provider)
* [setStorage](_storage_.reactantstorage.md#setstorage)

### Object literals

* [persistRootConfig](_storage_.reactantstorage.md#protected-persistrootconfig)

## Constructors

###  constructor

\+ **new ReactantStorage**(`options`: [IStorageOptions](../interfaces/_storage_.istorageoptions.md)): *[ReactantStorage](_storage_.reactantstorage.md)*

*Defined in [packages/reactant-storage/src/storage.tsx:37](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IStorageOptions](../interfaces/_storage_.istorageoptions.md) |

**Returns:** *[ReactantStorage](_storage_.reactantstorage.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[enhancer](_storage_.reactantstorage.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/plugin.ts#L29)*

inject enhancer for Redux

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[middleware](_storage_.reactantstorage.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/plugin.ts#L26)*

inject middleware for Redux

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[name](_storage_.reactantstorage.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/plugin.ts#L18)*

As a key in reducers object map

___

###  options

• **options**: *[IStorageOptions](../interfaces/_storage_.istorageoptions.md)*

*Defined in [packages/reactant-storage/src/storage.tsx:38](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L38)*

___

### `Protected` persistConfig

• **persistConfig**: *Record‹string, PersistConfig‹any››*

*Defined in [packages/reactant-storage/src/storage.tsx:60](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L60)*

## Methods

###  afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *function*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:105](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *function*

▸ (`state`: S | undefined, `action`: A): *S*

**Parameters:**

Name | Type |
------ | ------ |
`state` | S &#124; undefined |
`action` | A |

___

###  afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:115](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:92](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[preloadedStateHandler](_storage_.reactantstorage.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:21](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/plugin.ts#L21)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹object›): *Element‹›*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:124](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹object› |

**Returns:** *Element‹›*

___

###  setStorage

▸ **setStorage**<**T**>(`target`: T, `options`: [SetStorageOptions](../modules/_storage_.md#setstorageoptions)‹T›): *void*

*Defined in [packages/reactant-storage/src/storage.tsx:67](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L67)*

**Type parameters:**

▪ **T**: *PartialRequired‹Service, "name"›*

**Parameters:**

Name | Type |
------ | ------ |
`target` | T |
`options` | [SetStorageOptions](../modules/_storage_.md#setstorageoptions)‹T› |

**Returns:** *void*

## Object literals

### `Protected` persistRootConfig

### ▪ **persistRootConfig**: *object*

*Defined in [packages/reactant-storage/src/storage.tsx:62](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L62)*

###  key

• **key**: *string* = "root"

*Defined in [packages/reactant-storage/src/storage.tsx:63](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-storage/src/storage.tsx#L63)*
