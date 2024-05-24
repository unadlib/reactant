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

### Functions

- [getRehydrated](reactant_storage.md#getrehydrated)

## Type Aliases

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-storage/src/storage.tsx:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L48)

## Variables

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](reactant_storage.md#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:29](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L29)

## Functions

### getRehydrated

▸ **getRehydrated**(`target`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[packages/reactant-storage/src/storage.tsx:31](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L31)
