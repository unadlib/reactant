---
id: "storage"
title: "Module: storage"
sidebar_label: "storage"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Storage](../classes/storage.Storage.md)

## Interfaces

- [IStorageOptions](../interfaces/storage.IStorageOptions.md)

## Type Aliases

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-storage/src/storage.tsx:36](https://github.com/unadlib/reactant/blob/58d171db/packages/reactant-storage/src/storage.tsx#L36)

## Variables

### REHYDRATE

• `Const` **REHYDRATE**: ``"persist/REHYDRATE"``

#### Defined in

node_modules/redux-persist/types/constants.d.ts:4

___

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](storage.md#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:23](https://github.com/unadlib/reactant/blob/58d171db/packages/reactant-storage/src/storage.tsx#L23)
