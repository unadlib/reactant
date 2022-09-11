---
id: "moduleRef.ModuleRef"
title: "Class: ModuleRef"
sidebar_label: "ModuleRef"
custom_edit_url: null
---

[moduleRef](../modules/moduleRef.md).ModuleRef

> Make sure that `Container` type for getting module.

## Hierarchy

- `Container`

  ↳ **`ModuleRef`**

## Constructors

### constructor

• **new ModuleRef**(`containerOptions?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | `ContainerOptions` |

#### Inherited from

Container.constructor

#### Defined in

node_modules/inversify/lib/container/container.d.ts:12

## Properties

### id

• **id**: `number`

#### Inherited from

Container.id

#### Defined in

node_modules/inversify/lib/container/container.d.ts:3

___

### options

• `Readonly` **options**: `ContainerOptions`

#### Inherited from

Container.options

#### Defined in

node_modules/inversify/lib/container/container.d.ts:5

___

### parent

• **parent**: ``null`` \| `Container`

#### Inherited from

Container.parent

#### Defined in

node_modules/inversify/lib/container/container.d.ts:4

## Methods

### applyCustomMetadataReader

▸ **applyCustomMetadataReader**(`metadataReader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metadataReader` | `MetadataReader` |

#### Returns

`void`

#### Inherited from

Container.applyCustomMetadataReader

#### Defined in

node_modules/inversify/lib/container/container.d.ts:27

___

### applyMiddleware

▸ **applyMiddleware**(...`middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | `Middleware`[] |

#### Returns

`void`

#### Inherited from

Container.applyMiddleware

#### Defined in

node_modules/inversify/lib/container/container.d.ts:26

___

### bind

▸ **bind**<`T`\>(`serviceIdentifier`): `BindingToSyntax`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |

#### Returns

`BindingToSyntax`<`T`\>

#### Inherited from

Container.bind

#### Defined in

node_modules/inversify/lib/container/container.d.ts:16

___

### createChild

▸ **createChild**(`containerOptions?`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerOptions?` | `ContainerOptions` |

#### Returns

`Container`

#### Inherited from

Container.createChild

#### Defined in

node_modules/inversify/lib/container/container.d.ts:25

___

### get

▸ **get**<`T`\>(`serviceIdentifier`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |

#### Returns

`T`

#### Inherited from

Container.get

#### Defined in

node_modules/inversify/lib/container/container.d.ts:28

___

### getAll

▸ **getAll**<`T`\>(`serviceIdentifier`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |

#### Returns

`T`[]

#### Inherited from

Container.getAll

#### Defined in

node_modules/inversify/lib/container/container.d.ts:31

___

### getAllNamed

▸ **getAllNamed**<`T`\>(`serviceIdentifier`, `named`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |
| `named` | `string` \| `number` \| `symbol` |

#### Returns

`T`[]

#### Inherited from

Container.getAllNamed

#### Defined in

node_modules/inversify/lib/container/container.d.ts:33

___

### getAllTagged

▸ **getAllTagged**<`T`\>(`serviceIdentifier`, `key`, `value`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |
| `key` | `string` \| `number` \| `symbol` |
| `value` | `any` |

#### Returns

`T`[]

#### Inherited from

Container.getAllTagged

#### Defined in

node_modules/inversify/lib/container/container.d.ts:32

___

### getNamed

▸ **getNamed**<`T`\>(`serviceIdentifier`, `named`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |
| `named` | `string` \| `number` \| `symbol` |

#### Returns

`T`

#### Inherited from

Container.getNamed

#### Defined in

node_modules/inversify/lib/container/container.d.ts:30

___

### getTagged

▸ **getTagged**<`T`\>(`serviceIdentifier`, `key`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |
| `key` | `string` \| `number` \| `symbol` |
| `value` | `any` |

#### Returns

`T`

#### Inherited from

Container.getTagged

#### Defined in

node_modules/inversify/lib/container/container.d.ts:29

___

### isBound

▸ **isBound**(`serviceIdentifier`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |

#### Returns

`boolean`

#### Inherited from

Container.isBound

#### Defined in

node_modules/inversify/lib/container/container.d.ts:20

___

### isBoundNamed

▸ **isBoundNamed**(`serviceIdentifier`, `named`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |
| `named` | `string` \| `number` \| `symbol` |

#### Returns

`boolean`

#### Inherited from

Container.isBoundNamed

#### Defined in

node_modules/inversify/lib/container/container.d.ts:21

___

### isBoundTagged

▸ **isBoundTagged**(`serviceIdentifier`, `key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |
| `key` | `string` \| `number` \| `symbol` |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

Container.isBoundTagged

#### Defined in

node_modules/inversify/lib/container/container.d.ts:22

___

### load

▸ **load**(...`modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | `ContainerModule`[] |

#### Returns

`void`

#### Inherited from

Container.load

#### Defined in

node_modules/inversify/lib/container/container.d.ts:13

___

### loadAsync

▸ **loadAsync**(...`modules`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | `AsyncContainerModule`[] |

#### Returns

`Promise`<`void`\>

#### Inherited from

Container.loadAsync

#### Defined in

node_modules/inversify/lib/container/container.d.ts:14

___

### rebind

▸ **rebind**<`T`\>(`serviceIdentifier`): `BindingToSyntax`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T`\> |

#### Returns

`BindingToSyntax`<`T`\>

#### Inherited from

Container.rebind

#### Defined in

node_modules/inversify/lib/container/container.d.ts:17

___

### resolve

▸ **resolve**<`T`\>(`constructorFunction`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructorFunction` | `Newable`<`T`\> |

#### Returns

`T`

#### Inherited from

Container.resolve

#### Defined in

node_modules/inversify/lib/container/container.d.ts:34

___

### restore

▸ **restore**(): `void`

#### Returns

`void`

#### Inherited from

Container.restore

#### Defined in

node_modules/inversify/lib/container/container.d.ts:24

___

### snapshot

▸ **snapshot**(): `void`

#### Returns

`void`

#### Inherited from

Container.snapshot

#### Defined in

node_modules/inversify/lib/container/container.d.ts:23

___

### unbind

▸ **unbind**(`serviceIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |

#### Returns

`void`

#### Inherited from

Container.unbind

#### Defined in

node_modules/inversify/lib/container/container.d.ts:18

___

### unbindAll

▸ **unbindAll**(): `void`

#### Returns

`void`

#### Inherited from

Container.unbindAll

#### Defined in

node_modules/inversify/lib/container/container.d.ts:19

___

### unload

▸ **unload**(...`modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...modules` | `ContainerModule`[] |

#### Returns

`void`

#### Inherited from

Container.unload

#### Defined in

node_modules/inversify/lib/container/container.d.ts:15

___

### merge

▸ `Static` **merge**(`container1`, `container2`, ...`container3`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container1` | `Container` |
| `container2` | `Container` |
| `...container3` | `Container`[] |

#### Returns

`Container`

#### Inherited from

Container.merge

#### Defined in

node_modules/inversify/lib/container/container.d.ts:11
