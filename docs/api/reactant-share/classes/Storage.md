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
- [middleware](Storage.md#middleware)
- [onRehydrate](Storage.md#onrehydrate)
- [options](Storage.md#options)
- [persistConfig](Storage.md#persistconfig)
- [persistRootConfig](Storage.md#persistrootconfig)
- [persistor](Storage.md#persistor)
- [rehydrateCallbackSet](Storage.md#rehydratecallbackset)
- [rehydrated](Storage.md#rehydrated)

### Methods

- [afterCombineRootReducers](Storage.md#aftercombinerootreducers)
- [afterCreateStore](Storage.md#aftercreatestore)
- [beforeCombineRootReducers](Storage.md#beforecombinerootreducers)
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

BaseReactantStorage.constructor

#### Defined in

[packages/reactant-share/src/storage.ts:17](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/storage.ts#L17)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.\_\_@storeKey@857

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Inherited from

BaseReactantStorage.blacklist

#### Defined in

[packages/reactant-storage/src/storage.tsx:51](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L51)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantStorage.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L26)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantStorage.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L23)

___

### onRehydrate

• `Optional` **onRehydrate**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

BaseReactantStorage.onRehydrate

#### Defined in

[packages/reactant-storage/src/storage.tsx:55](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L55)

___

### options

• **options**: [`IStorageOptions`](../interfaces/IStorageOptions.md)

#### Inherited from

BaseReactantStorage.options

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Inherited from

BaseReactantStorage.persistConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:63](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L63)

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

[packages/reactant-storage/src/storage.tsx:65](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L65)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Inherited from

BaseReactantStorage.persistor

#### Defined in

[packages/reactant-storage/src/storage.tsx:53](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L53)

___

### rehydrateCallbackSet

• **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Defined in

[packages/reactant-share/src/storage.ts:15](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/storage.ts#L15)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Inherited from

BaseReactantStorage.rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:57](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L57)

## Methods

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

[packages/reactant-storage/src/storage.tsx:125](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L125)

___

### afterCreateStore

▸ **afterCreateStore**(`store`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`void`

#### Inherited from

BaseReactantStorage.afterCreateStore

#### Defined in

[packages/reactant-storage/src/storage.tsx:135](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L135)

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

[packages/reactant-storage/src/storage.tsx:96](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L96)

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

[packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L18)

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

[packages/reactant-storage/src/storage.tsx:152](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L152)

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
| `options` | `SetStorageOptions`<`T`\> |

#### Returns

`void`

#### Inherited from

BaseReactantStorage.setStorage

#### Defined in

[packages/reactant-storage/src/storage.tsx:72](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-storage/src/storage.tsx#L72)
