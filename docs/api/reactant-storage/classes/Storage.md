# Class: Storage

## Hierarchy

- `PluginModule`

  ↳ **`Storage`**

## Table of contents

### Constructors

- [constructor](Storage.md#constructor)

### Properties

- [[storeKey]](Storage.md#[storekey])
- [blacklist](Storage.md#blacklist)
- [enhancer](Storage.md#enhancer)
- [manualPersist](Storage.md#manualpersist)
- [middleware](Storage.md#middleware)
- [options](Storage.md#options)
- [paused](Storage.md#paused)
- [persistConfig](Storage.md#persistconfig)
- [persistRootConfig](Storage.md#persistrootconfig)
- [persistor](Storage.md#persistor)
- [rehydrateCallbackSet](Storage.md#rehydratecallbackset)
- [rehydrated](Storage.md#rehydrated)
- [storageSettingMap](Storage.md#storagesettingmap)

### Methods

- [\_enhancePersistor](Storage.md#_enhancepersistor)
- [\_onRehydrated](Storage.md#_onrehydrated)
- [afterCombineRootReducers](Storage.md#aftercombinerootreducers)
- [afterCreateStore](Storage.md#aftercreatestore)
- [beforeCombineRootReducers](Storage.md#beforecombinerootreducers)
- [onRehydrated](Storage.md#onrehydrated)
- [preloadedStateHandler](Storage.md#preloadedstatehandler)
- [provider](Storage.md#provider)
- [setStorage](Storage.md#setstorage)

## Constructors

### constructor

• **new Storage**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IStorageOptions`](../interfaces/IStorageOptions.md) |

#### Overrides

PluginModule.constructor

#### Defined in

[reactant-storage/src/storage.tsx:58](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L58)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.\_\_@storeKey@969

#### Defined in

[reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Defined in

[reactant-storage/src/storage.tsx:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Defined in

[reactant-storage/src/storage.tsx:137](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L137)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/IStorageOptions.md)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Defined in

[reactant-storage/src/storage.tsx:142](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L142)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Defined in

[reactant-storage/src/storage.tsx:62](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L62)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `loading?` | `ReactNode` | define storage loading UI |
| `storage` | `Storage` | define storage container |

#### Defined in

[reactant-storage/src/storage.tsx:64](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L64)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Defined in

[reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L54)

___

### rehydrateCallbackSet

• **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Defined in

[reactant-storage/src/storage.tsx:198](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L198)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Defined in

[reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L56)

___

### storageSettingMap

• `Private` **storageSettingMap**: `Map`<`object`, `Function`\>

#### Defined in

[reactant-storage/src/storage.tsx:69](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L69)

## Methods

### \_enhancePersistor

▸ `Private` **_enhancePersistor**(): `void`

#### Returns

`void`

#### Defined in

[reactant-storage/src/storage.tsx:179](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L179)

___

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Defined in

[reactant-storage/src/storage.tsx:200](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L200)

___

### afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`): `Reducer`<`any`, `AnyAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer`<`any`, `AnyAction`\> |

#### Returns

`Reducer`<`any`, `AnyAction`\>

#### Overrides

PluginModule.afterCombineRootReducers

#### Defined in

[reactant-storage/src/storage.tsx:124](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L124)

___

### afterCreateStore

▸ **afterCreateStore**(`store`): `Store`<`any`, `AnyAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`Store`<`any`, `AnyAction`\>

#### Overrides

PluginModule.afterCreateStore

#### Defined in

[reactant-storage/src/storage.tsx:144](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L144)

___

### beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`): `ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducers` | `ReducersMapObject`<`any`, `Action`<`any`\>\> |

#### Returns

`ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Overrides

PluginModule.beforeCombineRootReducers

#### Defined in

[reactant-storage/src/storage.tsx:95](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L95)

___

### onRehydrated

▸ **onRehydrated**(`callback`): `void`

 onRehydrated

callback function will be called after rehydration is finished.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[reactant-storage/src/storage.tsx:214](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L214)

___

### preloadedStateHandler

▸ `Optional` **preloadedStateHandler**(`preloadedState`): `Object`

preloaded state handler for Redux

#### Parameters

| Name | Type |
| :------ | :------ |
| `preloadedState` | `Object` |

#### Returns

`Object`

#### Inherited from

PluginModule.preloadedStateHandler

#### Defined in

[reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L20)

___

### provider

▸ **provider**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |

#### Returns

`Element`

#### Overrides

PluginModule.provider

#### Defined in

[reactant-storage/src/storage.tsx:222](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L222)

___

### setStorage

▸ **setStorage**<`T`\>(`target`, `options`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `options` | [`SetStorageOptions`](../modules.md#setstorageoptions)<`T`\> |

#### Returns

`void`

#### Defined in

[reactant-storage/src/storage.tsx:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L71)
