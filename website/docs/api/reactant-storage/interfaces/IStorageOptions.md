---
id: "IStorageOptions"
title: "Interface: IStorageOptions"
sidebar_label: "IStorageOptions"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Partial`<`PersistConfig`<`any`\>\>

  ↳ **`IStorageOptions`**

## Properties

### blacklist

• `Optional` **blacklist**: `string`[]

#### Inherited from

Partial.blacklist

#### Defined in

node_modules/redux-persist/types/types.d.ts:34

___

### debug

• `Optional` **debug**: `boolean`

#### Inherited from

Partial.debug

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

Partial.getStoredState

#### Defined in

node_modules/redux-persist/types/types.d.ts:43

___

### key

• `Optional` **key**: `string`

#### Inherited from

Partial.key

#### Defined in

node_modules/redux-persist/types/types.d.ts:29

___

### keyPrefix

• `Optional` **keyPrefix**: `string`

**`Deprecated`**

keyPrefix is going to be removed in v6.

#### Inherited from

Partial.keyPrefix

#### Defined in

node_modules/redux-persist/types/types.d.ts:33

___

### loading

• `Optional` **loading**: `ReactNode`

define storage loading UI

#### Defined in

[packages/reactant-storage/src/storage.tsx:35](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L35)

___

### migrate

• `Optional` **migrate**: `PersistMigrate`

#### Inherited from

Partial.migrate

#### Defined in

node_modules/redux-persist/types/types.d.ts:38

___

### serialize

• `Optional` **serialize**: `boolean`

#### Inherited from

Partial.serialize

#### Defined in

node_modules/redux-persist/types/types.d.ts:45

___

### stateReconciler

• `Optional` **stateReconciler**: ``false`` \| `StateReconciler`<`any`\>

#### Inherited from

Partial.stateReconciler

#### Defined in

node_modules/redux-persist/types/types.d.ts:39

___

### storage

• **storage**: `Storage`

define storage container

#### Overrides

Partial.storage

#### Defined in

[packages/reactant-storage/src/storage.tsx:31](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L31)

___

### throttle

• `Optional` **throttle**: `number`

#### Inherited from

Partial.throttle

#### Defined in

node_modules/redux-persist/types/types.d.ts:37

___

### timeout

• `Optional` **timeout**: `number`

#### Inherited from

Partial.timeout

#### Defined in

node_modules/redux-persist/types/types.d.ts:46

___

### transforms

• `Optional` **transforms**: `Transform`<`any`, `any`, `any`, `any`\>[]

#### Inherited from

Partial.transforms

#### Defined in

node_modules/redux-persist/types/types.d.ts:36

___

### version

• `Optional` **version**: `number`

#### Inherited from

Partial.version

#### Defined in

node_modules/redux-persist/types/types.d.ts:27

___

### whitelist

• `Optional` **whitelist**: `string`[]

#### Inherited from

Partial.whitelist

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

Partial.writeFailHandler

#### Defined in

node_modules/redux-persist/types/types.d.ts:47
