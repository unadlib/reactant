[reactant-storage](../README.md) › [Globals](../globals.md) › ["storage"](../modules/_storage_.md) › [ReactantStorage](_storage_.reactantstorage.md)

# Class: ReactantStorage

## Hierarchy

* PluginModule

  ↳ **ReactantStorage**

## Implements

* Service

## Index

### Constructors

* [constructor](_storage_.reactantstorage.md#constructor)

### Properties

* [[storeKey]](_storage_.reactantstorage.md#optional-[storekey])
* [enhancer](_storage_.reactantstorage.md#optional-enhancer)
* [middleware](_storage_.reactantstorage.md#optional-middleware)
* [name](_storage_.reactantstorage.md#optional-name)
* [options](_storage_.reactantstorage.md#options)
* [persistConfig](_storage_.reactantstorage.md#protected-persistconfig)

### Methods

* [afterCombineRootReducers](_storage_.reactantstorage.md#aftercombinerootreducers)
* [afterCreateStore](_storage_.reactantstorage.md#optional-aftercreatestore)
* [beforeCombineRootReducers](_storage_.reactantstorage.md#beforecombinerootreducers)
* [preloadedStateHandler](_storage_.reactantstorage.md#optional-preloadedstatehandler)
* [provider](_storage_.reactantstorage.md#provider)
* [setStorage](_storage_.reactantstorage.md#setstorage)

### Object literals

* [persistRootConfig](_storage_.reactantstorage.md#protected-persistrootconfig)

## Constructors

###  constructor

\+ **new ReactantStorage**(`options`: [IStorageOptions](../interfaces/_storage_.istorageoptions.md)): *[ReactantStorage](_storage_.reactantstorage.md)*

*Defined in [packages/reactant-storage/src/storage.tsx:37](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IStorageOptions](../interfaces/_storage_.istorageoptions.md) |

**Returns:** *[ReactantStorage](_storage_.reactantstorage.md)*

## Properties

### `Optional` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[[storeKey]](_storage_.reactantstorage.md#optional-[storekey])*

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[enhancer](_storage_.reactantstorage.md#optional-enhancer)*

*Defined in [packages/reactant-module/src/core/plugin.ts:25](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L25)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[middleware](_storage_.reactantstorage.md#optional-middleware)*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L23)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[name](_storage_.reactantstorage.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:17](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L17)*

___

###  options

• **options**: *[IStorageOptions](../interfaces/_storage_.istorageoptions.md)*

*Defined in [packages/reactant-storage/src/storage.tsx:38](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L38)*

___

### `Protected` persistConfig

• **persistConfig**: *Record‹string, PersistConfig‹any››*

*Defined in [packages/reactant-storage/src/storage.tsx:60](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L60)*

## Methods

###  afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *function*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:105](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L105)*

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

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[afterCreateStore](_storage_.reactantstorage.md#optional-aftercreatestore)*

*Defined in [packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

###  beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:92](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Inherited from [ReactantStorage](_storage_.reactantstorage.md).[preloadedStateHandler](_storage_.reactantstorage.md#optional-preloadedstatehandler)*

*Defined in [packages/reactant-module/src/core/plugin.ts:19](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/plugin.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*

___

###  provider

▸ **provider**(`props`: PropsWithChildren‹any›): *Element‹›*

*Overrides void*

*Defined in [packages/reactant-storage/src/storage.tsx:115](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | PropsWithChildren‹any› |

**Returns:** *Element‹›*

___

###  setStorage

▸ **setStorage**<**T**>(`target`: T, `options`: [SetStorageOptions](../modules/_storage_.md#setstorageoptions)‹T›): *void*

*Defined in [packages/reactant-storage/src/storage.tsx:67](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L67)*

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

*Defined in [packages/reactant-storage/src/storage.tsx:62](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L62)*

###  key

• **key**: *string* = "root"

*Defined in [packages/reactant-storage/src/storage.tsx:63](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-storage/src/storage.tsx#L63)*
