# Interface: App<T, S, R\>

[reactant-ssr](../modules/reactant_ssr.md).App

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules/reactant_ssr.md#renderer)<`S`\> |

## Table of contents

### Properties

- [container](reactant_ssr.App.md#container)
- [destroy](reactant_ssr.App.md#destroy)
- [instance](reactant_ssr.App.md#instance)
- [modules](reactant_ssr.App.md#modules)
- [store](reactant_ssr.App.md#store)

### Methods

- [bootstrap](reactant_ssr.App.md#bootstrap)

## Properties

### container

• **container**: `Container`

#### Defined in

[packages/reactant/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L44)

___

### destroy

• **destroy**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant/src/interfaces.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L47)

___

### instance

• **instance**: `T`

#### Defined in

[packages/reactant/src/interfaces.ts:43](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L43)

___

### modules

• **modules**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L46)

___

### store

• **store**: ``null`` \| [`ReactantStore`](../modules/reactant_ssr.md#reactantstore)

#### Defined in

[packages/reactant/src/interfaces.ts:45](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L45)

## Methods

### bootstrap

▸ **bootstrap**(`...args`): `ReturnType`<`R`\> \| `Promise`<`R`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `S` |

#### Returns

`ReturnType`<`R`\> \| `Promise`<`R`\>

#### Defined in

[packages/reactant/src/interfaces.ts:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L48)
