# Interface: App<T, S, R\>

[reactant-share](../modules/reactant_share.md).App

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules/reactant_share.md#renderer)<`S`\> |

## Table of contents

### Properties

- [container](reactant_share.App.md#container)
- [instance](reactant_share.App.md#instance)
- [modules](reactant_share.App.md#modules)
- [store](reactant_share.App.md#store)

### Methods

- [bootstrap](reactant_share.App.md#bootstrap)

## Properties

### container

• **container**: `Container`

#### Defined in

[packages/reactant/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L44)

___

### instance

• **instance**: `T`

#### Defined in

[packages/reactant/src/interfaces.ts:43](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L43)

___

### modules

• **modules**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L46)

___

### store

• **store**: ``null`` \| [`ReactantStore`](../modules/reactant_share.md#reactantstore)

#### Defined in

[packages/reactant/src/interfaces.ts:45](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L45)

## Methods

### bootstrap

▸ **bootstrap**(...`args`): `ReturnType`<`R`\> \| `Promise`<`R`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `S` |

#### Returns

`ReturnType`<`R`\> \| `Promise`<`R`\>

#### Defined in

[packages/reactant/src/interfaces.ts:47](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L47)
