# Interface: ILastActionState<T\>

[reactant-share](../modules/reactant_share.md).ILastActionState

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`ReactantAction`](reactant_share.ReactantAction.md)<`T`\>

  ↳ **`ILastActionState`**

## Table of contents

### Properties

- [\_inversePatches](reactant_share.ILastActionState.md#_inversepatches)
- [\_patches](reactant_share.ILastActionState.md#_patches)
- [\_reactant](reactant_share.ILastActionState.md#_reactant)
- [\_sequence](reactant_share.ILastActionState.md#_sequence)
- [method](reactant_share.ILastActionState.md#method)
- [params](reactant_share.ILastActionState.md#params)
- [state](reactant_share.ILastActionState.md#state)

## Properties

### \_inversePatches

• `Optional` **\_inversePatches**: [`Patches`](../modules/reactant_share.md#patches)

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[_inversePatches](reactant_share.ReactantAction.md#_inversepatches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:121](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L121)

___

### \_patches

• `Optional` **\_patches**: [`Patches`](../modules/reactant_share.md#patches)

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[_patches](reactant_share.ReactantAction.md#_patches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:120](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L120)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[_reactant](reactant_share.ReactantAction.md#_reactant)

#### Defined in

[packages/reactant-module/src/interfaces.ts:119](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L119)

___

### \_sequence

• `Optional` **\_sequence**: `number`

sync sequence

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L20)

___

### method

• `Optional` **method**: `string`

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[method](reactant_share.ReactantAction.md#method)

#### Defined in

[packages/reactant-module/src/interfaces.ts:116](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L116)

___

### params

• **params**: `any`[]

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[params](reactant_share.ReactantAction.md#params)

#### Defined in

[packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L118)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Inherited from

[ReactantAction](reactant_share.ReactantAction.md).[state](reactant_share.ReactantAction.md#state)

#### Defined in

[packages/reactant-module/src/interfaces.ts:117](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L117)
