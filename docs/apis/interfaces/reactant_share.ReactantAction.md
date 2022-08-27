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

• `Optional` **\_inversePatches**: `Patch`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L94)

___

### \_patches

• `Optional` **\_patches**: `Patch`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:93](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L93)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Defined in

[packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L92)

___

### method

• `Optional` **method**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:89](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L89)

___

### params

• **params**: `any`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L91)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L90)
