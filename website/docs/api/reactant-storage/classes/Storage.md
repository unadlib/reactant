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

[packages/reactant-storage/src/storage.tsx:60](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L60)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

PluginModule.\_\_@storeKey@255790

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Defined in

[packages/reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L54)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Defined in

[packages/reactant-storage/src/storage.tsx:186](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L186)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/IStorageOptions.md)

#### Defined in

[packages/reactant-storage/src/storage.tsx:81](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L81)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:191](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L191)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Defined in

[packages/reactant-storage/src/storage.tsx:72](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L72)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<[`IStorageOptions`](../interfaces/IStorageOptions.md), ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Defined in

[packages/reactant-storage/src/storage.tsx:74](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L74)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Defined in

[packages/reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L56)

___

### rehydrateCallbackSet

• `Protected` **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:249](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L249)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Defined in

[packages/reactant-storage/src/storage.tsx:58](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L58)

___

### storageSettingMap

• `Private` **storageSettingMap**: `Map`<`object`, `Function`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:83](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L83)

## Accessors

### store

• `get` **store**(): `undefined` \| `Store`<`any`, `AnyAction`\>

#### Returns

`undefined` \| `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-storage/src/storage.tsx:179](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L179)

## Methods

### \_enhancePersistor

▸ `Private` **_enhancePersistor**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:230](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L230)

___

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-storage/src/storage.tsx:251](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L251)

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

[packages/reactant-storage/src/storage.tsx:169](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L169)

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

[packages/reactant-storage/src/storage.tsx:193](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L193)

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

[packages/reactant-storage/src/storage.tsx:133](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L133)

___

### getRehydrated

▸ **getRehydrated**(`target`): `any`

get every module rehydrated

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |

#### Returns

`any`

#### Defined in

[packages/reactant-storage/src/storage.tsx:122](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L122)

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

[packages/reactant-storage/src/storage.tsx:265](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L265)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-module/src/core/plugin.ts#L20)

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

[packages/reactant-storage/src/storage.tsx:273](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L273)

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

[packages/reactant-storage/src/storage.tsx:88](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L88)
