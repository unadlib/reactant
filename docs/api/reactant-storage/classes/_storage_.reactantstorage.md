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
* [blacklist](_storage_.reactantstorage.md#protected-blacklist)
* [enhancer](_storage_.reactantstorage.md#optional-enhancer)
* [middleware](_storage_.reactantstorage.md#optional-middleware)
* [onRehydrate](_storage_.reactantstorage.md#optional-onrehydrate)
* [options](_storage_.reactantstorage.md#options)
* [persistConfig](_storage_.reactantstorage.md#protected-persistconfig)
* [persistor](_storage_.reactantstorage.md#protected-optional-persistor)
* [storageSettingMap](_storage_.reactantstorage.md#private-storagesettingmap)

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

*Defined in [packages/reactant-storage/src/storage.tsx:55](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IStorageOptions](../interfaces/_storage_.istorageoptions.md) |

**Returns:** *[ReactantStorage](_storage_.reactantstorage.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[[storeKey]](_storage_.reactantstorage.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Protected` blacklist

• **blacklist**: *string[]* = []

*Defined in [packages/reactant-storage/src/storage.tsx:51](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L51)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[enhancer](_storage_.reactantstorage.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-module/src/core/plugin.ts#L26)*

inject enhancer for Redux

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[middleware](_storage_.reactantstorage.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-module/src/core/plugin.ts#L23)*

inject middleware for Redux

___

### `Optional` onRehydrate

• **onRehydrate**? : *undefined | function*

*Defined in [packages/reactant-storage/src/storage.tsx:55](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L55)*

___

###  options

• **options**: *[IStorageOptions](../interfaces/_storage_.istorageoptions.md)*

*Defined in [packages/reactant-storage/src/storage.tsx:57](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L57)*

___

### `Protected` persistConfig

• **persistConfig**: *Record‹string, PersistConfig‹any››*

*Defined in [packages/reactant-storage/src/storage.tsx:79](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L79)*

___

### `Protected` `Optional` persistor

• **persistor**? : *Persistor*

*Defined in [packages/reactant-storage/src/storage.tsx:53](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L53)*

___

### `Private` storageSettingMap

• **storageSettingMap**: *Map‹object, Function›* = new Map<object, Function>()

*Defined in [packages/reactant-storage/src/storage.tsx:86](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L86)*

## Methods

###  afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *function*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:149](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L149)*

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

*Defined in [packages/reactant-storage/src/storage.tsx:163](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L163)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:121](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[preloadedStateHandler](_storage_.reactantstorage.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-module/src/core/plugin.ts#L18)*

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

*Defined in [packages/reactant-storage/src/storage.tsx:177](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹object› |

**Returns:** *Element‹›*

___

###  setStorage

▸ **setStorage**<**T**>(`target`: T, `options`: [SetStorageOptions](../modules/_storage_.md#setstorageoptions)‹T›): *void*

*Defined in [packages/reactant-storage/src/storage.tsx:88](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L88)*

**Type parameters:**

▪ **T**: *object*

**Parameters:**

Name | Type |
------ | ------ |
`target` | T |
`options` | [SetStorageOptions](../modules/_storage_.md#setstorageoptions)‹T› |

**Returns:** *void*

## Object literals

### `Protected` persistRootConfig

### ▪ **persistRootConfig**: *object*

*Defined in [packages/reactant-storage/src/storage.tsx:81](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L81)*

###  key

• **key**: *string* = "root"

*Defined in [packages/reactant-storage/src/storage.tsx:82](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-storage/src/storage.tsx#L82)*
