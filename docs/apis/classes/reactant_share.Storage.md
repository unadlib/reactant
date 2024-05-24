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
- [beforeCombinePersistReducer](reactant_share.Storage.md#beforecombinepersistreducer)
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
- [storageSettingMap](reactant_share.Storage.md#storagesettingmap)

### Accessors

- [store](reactant_share.Storage.md#store)

### Methods

- [\_onRehydrated](reactant_share.Storage.md#_onrehydrated)
- [afterCombineRootReducers](reactant_share.Storage.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.Storage.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_share.Storage.md#beforecombinerootreducers)
- [flush](reactant_share.Storage.md#flush)
- [getRehydrated](reactant_share.Storage.md#getrehydrated)
- [onRehydrated](reactant_share.Storage.md#onrehydrated)
- [pause](reactant_share.Storage.md#pause)
- [persist](reactant_share.Storage.md#persist)
- [preloadedStateHandler](reactant_share.Storage.md#preloadedstatehandler)
- [provider](reactant_share.Storage.md#provider)
- [purge](reactant_share.Storage.md#purge)
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

[packages/reactant-share/src/modules/storage.ts:24](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/storage.ts#L24)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.\_\_@storeKey@204262

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L15)

___

### beforeCombinePersistReducer

• `Optional` **beforeCombinePersistReducer**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

BaseReactantStorage.beforeCombinePersistReducer

#### Defined in

[packages/reactant-storage/src/storage.tsx:144](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L144)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Inherited from

BaseReactantStorage.blacklist

#### Defined in

[packages/reactant-storage/src/storage.tsx:64](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L64)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantStorage.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Inherited from

BaseReactantStorage.manualPersist

#### Defined in

[packages/reactant-storage/src/storage.tsx:221](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L221)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantStorage.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/reactant_share.IStorageOptions.md)

#### Inherited from

BaseReactantStorage.options

#### Defined in

[packages/reactant-share/src/modules/storage.ts:26](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/storage.ts#L26)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Inherited from

BaseReactantStorage.paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:226](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L226)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Inherited from

BaseReactantStorage.persistConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:85](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L85)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<`IStorageOptions`, ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Inherited from

BaseReactantStorage.persistRootConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:87](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L87)

___

### persistor

• `Protected` `Optional` **persistor**: `Persistor`

#### Inherited from

BaseReactantStorage.persistor

#### Defined in

[packages/reactant-storage/src/storage.tsx:66](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L66)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](reactant_share.PortDetector.md)

#### Defined in

[packages/reactant-share/src/modules/storage.ts:25](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/storage.ts#L25)

___

### rehydrateCallbackSet

• `Protected` **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Inherited from

BaseReactantStorage.rehydrateCallbackSet

#### Defined in

[packages/reactant-storage/src/storage.tsx:312](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L312)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

all modules rehydrated

#### Inherited from

BaseReactantStorage.rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:71](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L71)

___

### storageSettingMap

• **storageSettingMap**: `Map`<`object`, `Function`\>

#### Inherited from

BaseReactantStorage.storageSettingMap

#### Defined in

[packages/reactant-storage/src/storage.tsx:96](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L96)

## Accessors

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.store

#### Defined in

[packages/reactant-storage/src/storage.tsx:214](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L214)

## Methods

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Inherited from

BaseReactantStorage.\_onRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:314](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L314)

___

### afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`): `Reducer`<`any`, `AnyAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer` |

#### Returns

`Reducer`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.afterCombineRootReducers

#### Defined in

[packages/reactant-storage/src/storage.tsx:204](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L204)

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

[packages/reactant-storage/src/storage.tsx:228](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L228)

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

[packages/reactant-storage/src/storage.tsx:146](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L146)

___

### flush

▸ **flush**(): `undefined` \| `Promise`<`any`\>

immediately writes all pending state to disk and returns a promise

#### Returns

`undefined` \| `Promise`<`any`\>

#### Inherited from

BaseReactantStorage.flush

#### Defined in

[packages/reactant-storage/src/storage.tsx:301](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L301)

___

### getRehydrated

▸ **getRehydrated**(`target`): `undefined` \| `boolean`

get every module rehydrated

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |

#### Returns

`undefined` \| `boolean`

#### Inherited from

BaseReactantStorage.getRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:135](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L135)

___

### onRehydrated

▸ **onRehydrated**(`callback`): `void`

callback when rehydrated

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Inherited from

BaseReactantStorage.onRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:326](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L326)

___

### pause

▸ **pause**(): `undefined` \| `void`

pauses persistence until persist() is called

#### Returns

`undefined` \| `void`

#### Inherited from

BaseReactantStorage.pause

#### Defined in

[packages/reactant-storage/src/storage.tsx:287](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L287)

___

### persist

▸ **persist**(): `undefined` \| `void`

resumes persistence

#### Returns

`undefined` \| `void`

#### Inherited from

BaseReactantStorage.persist

#### Defined in

[packages/reactant-storage/src/storage.tsx:294](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L294)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-storage/src/storage.tsx:334](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L334)

___

### purge

▸ **purge**(): `undefined` \| `Promise`<`any`\>

purges state from disk and returns a promise

#### Returns

`undefined` \| `Promise`<`any`\>

#### Inherited from

BaseReactantStorage.purge

#### Defined in

[packages/reactant-storage/src/storage.tsx:308](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L308)

___

### setStorage

▸ **setStorage**<`T`\>(`target`, `options`): `void`

set module to storage persistent

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

[packages/reactant-storage/src/storage.tsx:101](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L101)
