---
id: "_storage_.reactantstorage"
title: "ReactantStorage"
sidebar_label: "ReactantStorage"
---

ReactantStorage
todo

## Hierarchy

  ↳ [ReactantStorage](_storage_.reactantstorage.md)

  ↳ **ReactantStorage**

  ↳ [ReactantStorage](_storage_.reactantstorage.md)

## Implements

* Service

## Index

### Constructors

* [constructor](_storage_.reactantstorage.md#constructor)

### Properties

* [[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])
* [blacklist](_storage_.reactantstorage.md#protected-blacklist)
* [enhancer](_storage_.reactantstorage.md#optional-enhancer)
* [middleware](_storage_.reactantstorage.md#optional-middleware)
* [options](_storage_.reactantstorage.md#options)
* [persistConfig](_storage_.reactantstorage.md#protected-persistconfig)
* [persistor](_storage_.reactantstorage.md#protected-optional-persistor)
* [portDetector](_storage_.reactantstorage.md#protected-portdetector)
* [sharedAppOptions](_storage_.reactantstorage.md#protected-sharedappoptions)

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

\+ **new ReactantStorage**(`options`: [IStorageOptions](../interfaces/_storage_.istorageoptions.md), `portDetector`: [PortDetector](_portdetector_.portdetector.md), `sharedAppOptions`: [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)): *[ReactantStorage](_storage_.reactantstorage.md)*

*Overrides [ReactantStorage](_storage_.reactantstorage.md).[constructor](_storage_.reactantstorage.md#constructor)*

*Defined in [packages/reactant-share/src/storage.ts:21](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/storage.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IStorageOptions](../interfaces/_storage_.istorageoptions.md) |
`portDetector` | [PortDetector](_portdetector_.portdetector.md) |
`sharedAppOptions` | [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md) |

**Returns:** *[ReactantStorage](_storage_.reactantstorage.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Protected` blacklist

• **blacklist**: *string[]* = []

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[blacklist](_storage_.reactantstorage.md#protected-blacklist)*

*Defined in [packages/reactant-storage/src/storage.tsx:39](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L39)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[enhancer](_router_.reactantrouter.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/core/plugin.ts#L26)*

inject enhancer for Redux

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[middleware](_router_.reactantrouter.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/core/plugin.ts#L23)*

inject middleware for Redux

___

###  options

• **options**: *[IStorageOptions](../interfaces/_storage_.istorageoptions.md)*

*Overrides [ReactantStorage](_storage_.reactantstorage.md).[options](_storage_.reactantstorage.md#options)*

*Defined in [packages/reactant-share/src/storage.ts:23](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/storage.ts#L23)*

___

### `Protected` persistConfig

• **persistConfig**: *Record‹string, PersistConfig‹any››*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[persistConfig](_storage_.reactantstorage.md#protected-persistconfig)*

*Defined in [packages/reactant-storage/src/storage.tsx:65](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L65)*

___

### `Protected` `Optional` persistor

• **persistor**? : *Persistor*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[persistor](_storage_.reactantstorage.md#protected-optional-persistor)*

*Defined in [packages/reactant-storage/src/storage.tsx:41](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L41)*

___

### `Protected` portDetector

• **portDetector**: *[PortDetector](_portdetector_.portdetector.md)*

*Defined in [packages/reactant-share/src/storage.ts:24](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/storage.ts#L24)*

___

### `Protected` sharedAppOptions

• **sharedAppOptions**: *[ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)*

*Defined in [packages/reactant-share/src/storage.ts:25](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/storage.ts#L25)*

## Methods

###  afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *function*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[afterCombineRootReducers](_storage_.reactantstorage.md#aftercombinerootreducers)*

*Overrides [ReactantRouter](_router_.reactantrouter.md).[afterCombineRootReducers](_router_.reactantrouter.md#optional-aftercombinerootreducers)*

*Defined in [packages/reactant-storage/src/storage.tsx:135](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L135)*

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

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[afterCreateStore](_storage_.reactantstorage.md#aftercreatestore)*

*Overrides [ReactantRouter](_router_.reactantrouter.md).[afterCreateStore](_router_.reactantrouter.md#optional-aftercreatestore)*

*Defined in [packages/reactant-storage/src/storage.tsx:149](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[beforeCombineRootReducers](_storage_.reactantstorage.md#beforecombinerootreducers)*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:107](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantRouter](_router_.reactantrouter.md).[preloadedStateHandler](_router_.reactantrouter.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/core/plugin.ts#L18)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹object›): *Element‹›*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[provider](_storage_.reactantstorage.md#provider)*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:159](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹object› |

**Returns:** *Element‹›*

___

###  setStorage

▸ **setStorage**<**T**>(`target`: T, `options`: SetStorageOptions‹T›): *void*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[setStorage](_storage_.reactantstorage.md#setstorage)*

*Defined in [packages/reactant-storage/src/storage.tsx:74](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L74)*

**Type parameters:**

▪ **T**: *object*

**Parameters:**

Name | Type |
------ | ------ |
`target` | T |
`options` | SetStorageOptions‹T› |

**Returns:** *void*

## Object literals

### `Protected` persistRootConfig

### ▪ **persistRootConfig**: *object*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[persistRootConfig](_storage_.reactantstorage.md#protected-persistrootconfig)*

*Defined in [packages/reactant-storage/src/storage.tsx:67](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L67)*

###  key

• **key**: *string* = "root"

*Defined in [packages/reactant-storage/src/storage.tsx:68](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-storage/src/storage.tsx#L68)*
