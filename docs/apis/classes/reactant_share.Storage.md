# Class: Storage

[reactant-share](../modules/reactant_share.md).Storage

## Hierarchy

- `ReactantStorage`

  ↳ **`Storage`**

## Table of contents

### Constructors

- [constructor](reactant_share.Storage.md#constructor)

### Properties

- [[storeKey]](reactant_share.Storage.md#[storekey])
- [blacklist](reactant_share.Storage.md#blacklist)
- [enhancer](reactant_share.Storage.md#enhancer)
- [manualPersist](reactant_share.Storage.md#manualpersist)
- [middleware](reactant_share.Storage.md#middleware)
- [options](reactant_share.Storage.md#options)
- [paused](reactant_share.Storage.md#paused)
- [persistConfig](reactant_share.Storage.md#persistconfig)
- [persistRootConfig](reactant_share.Storage.md#persistrootconfig)
- [persistor](reactant_share.Storage.md#persistor)
- [portDetector](reactant_share.Storage.md#portdetector)
- [rehydrateCallbackSet](reactant_share.Storage.md#rehydratecallbackset)
- [rehydrated](reactant_share.Storage.md#rehydrated)

### Methods

- [\_onRehydrated](reactant_share.Storage.md#_onrehydrated)
- [afterCombineRootReducers](reactant_share.Storage.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.Storage.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_share.Storage.md#beforecombinerootreducers)
- [onRehydrated](reactant_share.Storage.md#onrehydrated)
- [preloadedStateHandler](reactant_share.Storage.md#preloadedstatehandler)
- [provider](reactant_share.Storage.md#provider)
- [setStorage](reactant_share.Storage.md#setstorage)

## Constructors

### constructor

• **new Storage**(`portDetector`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](reactant_share.PortDetector.md) |
| `options` | [`IStorageOptions`](../interfaces/reactant_share.IStorageOptions.md) |

#### Overrides

BaseReactantStorage.constructor

#### Defined in

[packages/reactant-share/src/storage.ts:20](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/storage.ts#L20)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.\_\_@storeKey@351424

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Inherited from

BaseReactantStorage.blacklist

#### Defined in

[packages/reactant-storage/src/storage.tsx:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantStorage.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Inherited from

BaseReactantStorage.manualPersist

#### Defined in

[packages/reactant-storage/src/storage.tsx:149](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L149)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantStorage.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/reactant_share.IStorageOptions.md)

#### Inherited from

BaseReactantStorage.options

#### Defined in

[packages/reactant-share/src/storage.ts:22](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/storage.ts#L22)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Inherited from

BaseReactantStorage.paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:154](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L154)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Inherited from

BaseReactantStorage.persistConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:70](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L70)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<`IStorageOptions`, ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Inherited from

BaseReactantStorage.persistRootConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:72](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L72)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Inherited from

BaseReactantStorage.persistor

#### Defined in

[packages/reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L54)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](reactant_share.PortDetector.md)

#### Defined in

[packages/reactant-share/src/storage.ts:21](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/storage.ts#L21)

___

### rehydrateCallbackSet

• **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Inherited from

BaseReactantStorage.rehydrateCallbackSet

#### Defined in

[packages/reactant-storage/src/storage.tsx:210](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L210)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Inherited from

BaseReactantStorage.rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L56)

## Methods

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Inherited from

BaseReactantStorage.\_onRehydrated

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

#### Inherited from

BaseReactantStorage.afterCombineRootReducers

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

#### Inherited from

BaseReactantStorage.afterCreateStore

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

#### Inherited from

BaseReactantStorage.beforeCombineRootReducers

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

#### Inherited from

BaseReactantStorage.onRehydrated

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

BaseReactantStorage.preloadedStateHandler

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

#### Inherited from

BaseReactantStorage.provider

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
| `options` | [`SetStorageOptions`](../modules/reactant_share.md#setstorageoptions)<`T`\> |

#### Returns

`void`

#### Inherited from

BaseReactantStorage.setStorage

#### Defined in

[packages/reactant-storage/src/storage.tsx:83](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L83)
