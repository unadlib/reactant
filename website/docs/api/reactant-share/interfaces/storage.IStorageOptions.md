---
id: "storage.IStorageOptions"
title: "Interface: IStorageOptions"
sidebar_label: "IStorageOptions"
custom_edit_url: null
---

[storage](../modules/storage.md).IStorageOptions

## Hierarchy

- `IStorageOptions`

  ↳ **`IStorageOptions`**

## Properties

### blacklist

• `Optional` **blacklist**: `string`[]

#### Inherited from

IBaseStorageOptions.blacklist

#### Defined in

node_modules/redux-persist/types/types.d.ts:34

___

### debug

• `Optional` **debug**: `boolean`

#### Inherited from

IBaseStorageOptions.debug

#### Defined in

node_modules/redux-persist/types/types.d.ts:44

___

### getStoredState

• `Optional` **getStoredState**: (`config`: `PersistConfig`<`any`, `any`, `any`, `any`\>) => `Promise`<`PersistedState`\>

#### Type declaration

▸ (`config`): `Promise`<`PersistedState`\>

**`Desc`**

Used for migrations.

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `PersistConfig`<`any`, `any`, `any`, `any`\> |

##### Returns

`Promise`<`PersistedState`\>

#### Inherited from

IBaseStorageOptions.getStoredState

#### Defined in

node_modules/redux-persist/types/types.d.ts:43

___

### key

• `Optional` **key**: `string`

#### Inherited from

IBaseStorageOptions.key

#### Defined in

node_modules/redux-persist/types/types.d.ts:29

___

### keyPrefix

• `Optional` **keyPrefix**: `string`

**`Deprecated`**

keyPrefix is going to be removed in v6.

#### Inherited from

IBaseStorageOptions.keyPrefix

#### Defined in

node_modules/redux-persist/types/types.d.ts:33

___

### loading

• `Optional` **loading**: `ReactNode`

define storage loading UI

#### Inherited from

IBaseStorageOptions.loading

#### Defined in

[packages/reactant-storage/src/storage.tsx:33](https://github.com/unadlib/reactant/blob/a9a6e065/packages/reactant-storage/src/storage.tsx#L33)

___

### migrate

• `Optional` **migrate**: `PersistMigrate`

#### Inherited from

IBaseStorageOptions.migrate

#### Defined in

node_modules/redux-persist/types/types.d.ts:38

___

### serialize

• `Optional` **serialize**: `boolean`

#### Inherited from

IBaseStorageOptions.serialize

#### Defined in

node_modules/redux-persist/types/types.d.ts:45

___

### stateReconciler

• `Optional` **stateReconciler**: ``false`` \| `StateReconciler`<`any`\>

#### Inherited from

IBaseStorageOptions.stateReconciler

#### Defined in

node_modules/redux-persist/types/types.d.ts:39

___

### storage

• **storage**: `Storage`

define storage container

#### Inherited from

IBaseStorageOptions.storage

#### Defined in

[packages/reactant-storage/src/storage.tsx:29](https://github.com/unadlib/reactant/blob/a9a6e065/packages/reactant-storage/src/storage.tsx#L29)

___

### throttle

• `Optional` **throttle**: `number`

#### Inherited from

IBaseStorageOptions.throttle

#### Defined in

node_modules/redux-persist/types/types.d.ts:37

___

### timeout

• `Optional` **timeout**: `number`

#### Inherited from

IBaseStorageOptions.timeout

#### Defined in

node_modules/redux-persist/types/types.d.ts:46

___

### transforms

• `Optional` **transforms**: `Transform`<`any`, `any`, `any`, `any`\>[]

#### Inherited from

IBaseStorageOptions.transforms

#### Defined in

node_modules/redux-persist/types/types.d.ts:36

___

### version

• `Optional` **version**: `number`

#### Inherited from

IBaseStorageOptions.version

#### Defined in

node_modules/redux-persist/types/types.d.ts:27

___

### whitelist

• `Optional` **whitelist**: `string`[]

#### Inherited from

IBaseStorageOptions.whitelist

#### Defined in

node_modules/redux-persist/types/types.d.ts:35

___

### writeFailHandler

• `Optional` **writeFailHandler**: (`err`: `Error`) => `void`

#### Type declaration

▸ (`err`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

##### Returns

`void`

#### Inherited from

IBaseStorageOptions.writeFailHandler

#### Defined in

node_modules/redux-persist/types/types.d.ts:47
