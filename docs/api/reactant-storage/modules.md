# reactant-storage

## Table of contents

### Classes

- [Storage](classes/Storage.md)

### Interfaces

- [IStorageOptions](interfaces/IStorageOptions.md)

### Type aliases

- [SetStorageOptions](modules.md#setstorageoptions)

### Variables

- [StorageOptions](modules.md#storageoptions)

## Type aliases

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[reactant-storage/src/storage.tsx:36](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L36)

## Variables

### StorageOptions

• **StorageOptions**: typeof [`StorageOptions`](modules.md#storageoptions)

#### Defined in

[reactant-storage/src/storage.tsx:23](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-storage/src/storage.tsx#L23)
