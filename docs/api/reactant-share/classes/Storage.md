# Class: Storage

## Hierarchy

- `ReactantStorage`

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
- [portDetector](Storage.md#portdetector)
- [rehydrateCallbackSet](Storage.md#rehydratecallbackset)
- [rehydrated](Storage.md#rehydrated)

### Methods

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

• **new Storage**(`portDetector`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](PortDetector.md) |
| `options` | [`IStorageOptions`](../interfaces/IStorageOptions.md) |

#### Overrides

BaseReactantStorage.constructor

#### Defined in

[packages/reactant-share/src/storage.ts:20](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/storage.ts#L20)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.\_\_@storeKey@969

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Inherited from

BaseReactantStorage.blacklist

#### Defined in

[packages/reactant-storage/src/storage.tsx:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantStorage.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Inherited from

BaseReactantStorage.manualPersist

#### Defined in

[packages/reactant-storage/src/storage.tsx:137](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L137)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantStorage.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/IStorageOptions.md)

#### Inherited from

BaseReactantStorage.options

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Inherited from

BaseReactantStorage.paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:142](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L142)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Inherited from

BaseReactantStorage.persistConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:62](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L62)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `loading?` | `ReactNode` | define storage loading UI |
| `storage` | `Storage` | define storage container |

#### Inherited from

BaseReactantStorage.persistRootConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:64](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L64)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Inherited from

BaseReactantStorage.persistor

#### Defined in

[packages/reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L54)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](PortDetector.md)

___

### rehydrateCallbackSet

• **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Inherited from

BaseReactantStorage.rehydrateCallbackSet

#### Defined in

[packages/reactant-storage/src/storage.tsx:198](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L198)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Inherited from

BaseReactantStorage.rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L56)

## Methods

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Inherited from

BaseReactantStorage.\_onRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:200](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L200)

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

[packages/reactant-storage/src/storage.tsx:124](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L124)

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

[packages/reactant-storage/src/storage.tsx:144](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L144)

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

[packages/reactant-storage/src/storage.tsx:95](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L95)

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

[packages/reactant-storage/src/storage.tsx:214](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L214)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-storage/src/storage.tsx:222](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L222)

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

#### Inherited from

BaseReactantStorage.setStorage

#### Defined in

[packages/reactant-storage/src/storage.tsx:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L71)
