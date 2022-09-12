---
id: "storage.Storage"
title: "Class: Storage"
sidebar_label: "Storage"
custom_edit_url: null
---

[storage](../modules/storage.md).Storage

## Hierarchy

- `ReactantStorage`

  ↳ **`Storage`**

## Constructors

### constructor

• **new Storage**(`portDetector`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](portDetector.PortDetector.md) |
| `options` | [`IStorageOptions`](../interfaces/storage.IStorageOptions.md) |

#### Overrides

BaseReactantStorage.constructor

#### Defined in

[packages/reactant-share/src/storage.ts:20](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-share/src/storage.ts#L20)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

BaseReactantStorage.\_\_@storeKey@151547

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-module/src/core/plugin.ts#L15)

___

### blacklist

• `Protected` **blacklist**: `string`[]

#### Inherited from

BaseReactantStorage.blacklist

#### Defined in

[packages/reactant-storage/src/storage.tsx:52](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L52)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

BaseReactantStorage.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-module/src/core/plugin.ts#L32)

___

### manualPersist

• **manualPersist**: `boolean` = `false`

manual persist

#### Inherited from

BaseReactantStorage.manualPersist

#### Defined in

[packages/reactant-storage/src/storage.tsx:180](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L180)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

BaseReactantStorage.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`IStorageOptions`](../interfaces/storage.IStorageOptions.md)

#### Inherited from

BaseReactantStorage.options

#### Defined in

[packages/reactant-share/src/storage.ts:22](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-share/src/storage.ts#L22)

___

### paused

• **paused**: `boolean` = `false`

persistence paused

#### Inherited from

BaseReactantStorage.paused

#### Defined in

[packages/reactant-storage/src/storage.tsx:185](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L185)

___

### persistConfig

• `Protected` **persistConfig**: `Record`<`string`, `PersistConfig`<`any`, `any`, `any`, `any`\>\> = `{}`

#### Inherited from

BaseReactantStorage.persistConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:70](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L70)

___

### persistRootConfig

• `Protected` **persistRootConfig**: `Pick`<`IStorageOptions`, ``"version"`` \| ``"serialize"`` \| ``"timeout"`` \| ``"storage"`` \| ``"keyPrefix"`` \| ``"blacklist"`` \| ``"whitelist"`` \| ``"transforms"`` \| ``"throttle"`` \| ``"migrate"`` \| ``"stateReconciler"`` \| ``"getStoredState"`` \| ``"debug"`` \| ``"writeFailHandler"`` \| ``"loading"``\> & { `key`: `string`  }

#### Inherited from

BaseReactantStorage.persistRootConfig

#### Defined in

[packages/reactant-storage/src/storage.tsx:72](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L72)

___

### persistor

• `Optional` **persistor**: `Persistor`

#### Inherited from

BaseReactantStorage.persistor

#### Defined in

[packages/reactant-storage/src/storage.tsx:54](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L54)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](portDetector.PortDetector.md)

#### Defined in

[packages/reactant-share/src/storage.ts:21](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-share/src/storage.ts#L21)

___

### rehydrateCallbackSet

• `Protected` **rehydrateCallbackSet**: `Set`<() => `void`\>

#### Inherited from

BaseReactantStorage.rehydrateCallbackSet

#### Defined in

[packages/reactant-storage/src/storage.tsx:243](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L243)

___

### rehydrated

• **rehydrated**: `boolean` = `false`

#### Inherited from

BaseReactantStorage.rehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:56](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L56)

## Methods

### \_onRehydrated

▸ `Protected` **_onRehydrated**(): `void`

#### Returns

`void`

#### Inherited from

BaseReactantStorage.\_onRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:245](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L245)

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

[packages/reactant-storage/src/storage.tsx:167](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L167)

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

[packages/reactant-storage/src/storage.tsx:187](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L187)

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

[packages/reactant-storage/src/storage.tsx:131](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L131)

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

#### Inherited from

BaseReactantStorage.getRehydrated

#### Defined in

[packages/reactant-storage/src/storage.tsx:120](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L120)

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

[packages/reactant-storage/src/storage.tsx:259](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L259)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-module/src/core/plugin.ts#L20)

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

#### Inherited from

BaseReactantStorage.provider

#### Defined in

[packages/reactant-storage/src/storage.tsx:267](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L267)

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
| `options` | [`SetStorageOptions`](../modules/storage.md#setstorageoptions)<`T`\> |

#### Returns

`void`

#### Inherited from

BaseReactantStorage.setStorage

#### Defined in

[packages/reactant-storage/src/storage.tsx:86](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-storage/src/storage.tsx#L86)
