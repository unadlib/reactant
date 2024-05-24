# Interface: ReactantAction<T\>

[reactant-share](../modules/reactant_share.md).ReactantAction

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- `Action`<`string` \| `symbol`\>

  ↳ **`ReactantAction`**

  ↳↳ [`ILastActionState`](reactant_share.ILastActionState.md)

## Table of contents

### Properties

- [\_inversePatches](reactant_share.ReactantAction.md#_inversepatches)
- [\_patches](reactant_share.ReactantAction.md#_patches)
- [\_reactant](reactant_share.ReactantAction.md#_reactant)
- [method](reactant_share.ReactantAction.md#method)
- [params](reactant_share.ReactantAction.md#params)
- [state](reactant_share.ReactantAction.md#state)

## Properties

### \_inversePatches

• `Optional` **\_inversePatches**: [`Patches`](../modules/reactant_share.md#patches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:121](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L121)

___

### \_patches

• `Optional` **\_patches**: [`Patches`](../modules/reactant_share.md#patches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:120](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L120)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Defined in

[packages/reactant-module/src/interfaces.ts:119](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L119)

___

### method

• `Optional` **method**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:116](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L116)

___

### params

• **params**: `any`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L118)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:117](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L117)
