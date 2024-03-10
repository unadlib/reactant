---
id: "Storage"
title: "Class: Storage"
sidebar_label: "Storage"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `PluginModule`

  ↳ **`Storage`**

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

[packages/reactant-storage/src/storage.tsx:69](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L69)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.\_\_@storeKey@267855

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-module/src/core/plugin.ts#L15)

___

### beforeCombinePersistReducer

• `Optional` **beforeCombinePersistReducer**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:140](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L140)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Defined in

[packages/reactant-storage/src/storage.tsx:60](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L60)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Defined in

[packages/reactant-storage/src/storage.tsx:196](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L196)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/IStorageOptions.md)

#### Defined in

[packages/reactant-storage/src/storage.tsx:90](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L90)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:201](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L201)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Defined in

[packages/reactant-storage/src/storage.tsx:81](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L81)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<[`IStorageOptions`](../interfaces/IStorageOptions.md), ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Defined in

[packages/reactant-storage/src/storage.tsx:83](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L83)

___

### persistor

• `Protected` `Optional` **persistor**: `Persistor`

#### Defined in

[packages/reactant-storage/src/storage.tsx:62](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L62)

___

### rehydrateCallbackSet

• `Protected` **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:287](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L287)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

all modules rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:67](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L67)

___

### storageSettingMap

• **storageSettingMap**: `Map`<`object`, `Function`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:92](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L92)

## Accessors

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:189](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L189)

## Methods

### \_enhancePersistor

▸ `Private` **_enhancePersistor**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:240](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L240)

___

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:289](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L289)

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

[packages/reactant-storage/src/storage.tsx:179](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L179)

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

[packages/reactant-storage/src/storage.tsx:203](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L203)

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

[packages/reactant-storage/src/storage.tsx:142](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L142)

___

### flush

▸ **flush**(): `undefined` \| `Promise`<`any`\>

immediately writes all pending state to disk and returns a promise

#### Returns

`undefined` \| `Promise`<`any`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:276](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L276)

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

#### Defined in

[packages/reactant-storage/src/storage.tsx:131](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L131)

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

#### Defined in

[packages/reactant-storage/src/storage.tsx:301](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L301)

___

### pause

▸ **pause**(): `undefined` \| `void`

pauses persistence until persist() is called

#### Returns

`undefined` \| `void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:262](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L262)

___

### persist

▸ **persist**(): `undefined` \| `void`

resumes persistence

#### Returns

`undefined` \| `void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:269](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L269)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-module/src/core/plugin.ts#L20)

___

### provider

▸ **provider**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children?` | `ReactNode` |

#### Returns

`Element`

#### Overrides

PluginModule.provider

#### Defined in

[packages/reactant-storage/src/storage.tsx:309](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L309)

___

### purge

▸ **purge**(): `undefined` \| `Promise`<`any`\>

purges state from disk and returns a promise

#### Returns

`undefined` \| `Promise`<`any`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:283](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L283)

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
| `options` | [`SetStorageOptions`](../#setstorageoptions)<`T`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:97](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-storage/src/storage.tsx#L97)
