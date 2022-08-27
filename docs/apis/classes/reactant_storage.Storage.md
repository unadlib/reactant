# Class: Storage

[reactant-storage](../modules/reactant_storage.md).Storage

## Hierarchy

- `PluginModule`

  ↳ **`Storage`**

## Table of contents

### Constructors

- [constructor](reactant_storage.Storage.md#constructor)

### Properties

- [[storeKey]](reactant_storage.Storage.md#[storekey])
- [blacklist](reactant_storage.Storage.md#blacklist)
- [enhancer](reactant_storage.Storage.md#enhancer)
- [manualPersist](reactant_storage.Storage.md#manualpersist)
- [middleware](reactant_storage.Storage.md#middleware)
- [options](reactant_storage.Storage.md#options)
- [paused](reactant_storage.Storage.md#paused)
- [persistConfig](reactant_storage.Storage.md#persistconfig)
- [persistRootConfig](reactant_storage.Storage.md#persistrootconfig)
- [persistor](reactant_storage.Storage.md#persistor)
- [rehydrateCallbackSet](reactant_storage.Storage.md#rehydratecallbackset)
- [rehydrated](reactant_storage.Storage.md#rehydrated)
- [storageSettingMap](reactant_storage.Storage.md#storagesettingmap)

### Methods

- [\_enhancePersistor](reactant_storage.Storage.md#_enhancepersistor)
- [\_onRehydrated](reactant_storage.Storage.md#_onrehydrated)
- [afterCombineRootReducers](reactant_storage.Storage.md#aftercombinerootreducers)
- [afterCreateStore](reactant_storage.Storage.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_storage.Storage.md#beforecombinerootreducers)
- [onRehydrated](reactant_storage.Storage.md#onrehydrated)
- [preloadedStateHandler](reactant_storage.Storage.md#preloadedstatehandler)
- [provider](reactant_storage.Storage.md#provider)
- [setStorage](reactant_storage.Storage.md#setstorage)

## Constructors

### constructor

• **new Storage**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IStorageOptions`](../interfaces/reactant_storage.IStorageOptions.md) |

#### Overrides

PluginModule.constructor

#### Defined in

[packages/reactant-storage/src/storage.tsx:58](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L58)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.\_\_@storeKey@451564

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Defined in

[packages/reactant-storage/src/storage.tsx:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Defined in

[packages/reactant-storage/src/storage.tsx:149](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L149)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/reactant_storage.IStorageOptions.md)

#### Defined in

[packages/reactant-storage/src/storage.tsx:79](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L79)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:154](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L154)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Defined in

[packages/reactant-storage/src/storage.tsx:70](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L70)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<[`IStorageOptions`](../interfaces/reactant_storage.IStorageOptions.md), ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Defined in

[packages/reactant-storage/src/storage.tsx:72](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L72)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Defined in

[packages/reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L54)

___

### rehydrateCallbackSet

• **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:210](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L210)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Defined in

[packages/reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L56)

___

### storageSettingMap

• `Private` **storageSettingMap**: `Map`<`object`, `Function`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:81](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L81)

## Methods

### \_enhancePersistor

▸ `Private` **_enhancePersistor**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:191](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L191)

___

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:212](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L212)

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

[packages/reactant-storage/src/storage.tsx:136](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L136)

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

[packages/reactant-storage/src/storage.tsx:156](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L156)

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

[packages/reactant-storage/src/storage.tsx:107](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L107)

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

[packages/reactant-storage/src/storage.tsx:226](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L226)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-storage/src/storage.tsx:234](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L234)

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
| `options` | [`SetStorageOptions`](../modules/reactant_storage.md#setstorageoptions)<`T`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:83](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L83)
