---
id: "index"
title: "reactant-storage"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Storage](classes/Storage.md)

## Interfaces

- [IStorageOptions](interfaces/IStorageOptions.md)

## Type Aliases

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-storage/src/storage.tsx:36](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-storage/src/storage.tsx#L36)

## Variables

### REHYDRATE

• `Const` **REHYDRATE**: ``"persist/REHYDRATE"``

#### Defined in

node_modules/redux-persist/types/constants.d.ts:4

___

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:23](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-storage/src/storage.tsx#L23)
