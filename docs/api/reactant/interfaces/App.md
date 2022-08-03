# Interface: App<T, S, R\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules.md#renderer)<`S`\> |

## Table of contents

### Properties

- [container](App.md#container)
- [instance](App.md#instance)
- [store](App.md#store)

### Methods

- [bootstrap](App.md#bootstrap)

## Properties

### container

• **container**: `Container`

#### Defined in

[packages/reactant/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L44)

___

### instance

• **instance**: `T`

#### Defined in

[packages/reactant/src/interfaces.ts:43](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L43)

___

### store

• **store**: ``null`` \| [`ReactantStore`](../modules.md#reactantstore)

#### Defined in

[packages/reactant/src/interfaces.ts:45](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L45)

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

[packages/reactant/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L46)
