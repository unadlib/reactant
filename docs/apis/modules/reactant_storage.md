# Module: reactant-storage

## Table of contents

### Classes

- [Storage](../classes/reactant_storage.Storage.md)

### Interfaces

- [IStorageOptions](../interfaces/reactant_storage.IStorageOptions.md)

### Type Aliases

- [SetStorageOptions](reactant_storage.md#setstorageoptions)

### Variables

- [StorageOptions](reactant_storage.md#storageoptions)

## Type Aliases

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-storage/src/storage.tsx:36](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L36)

## Variables

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](reactant_storage.md#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:23](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-storage/src/storage.tsx#L23)
