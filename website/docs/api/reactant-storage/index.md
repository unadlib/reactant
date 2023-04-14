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

[packages/reactant-storage/src/storage.tsx:38](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L38)

## Variables

### REHYDRATE

• `Const` **REHYDRATE**: ``"persist/REHYDRATE"``

#### Defined in

node_modules/redux-persist/types/constants.d.ts:4

___

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:25](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant-storage/src/storage.tsx#L25)
