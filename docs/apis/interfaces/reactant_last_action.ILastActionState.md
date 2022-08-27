# Interface: ILastActionState<T\>

[reactant-last-action](../modules/reactant_last_action.md).ILastActionState

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- `ReactantAction`<`T`\>

  ↳ **`ILastActionState`**

## Table of contents

### Properties

- [\_inversePatches](reactant_last_action.ILastActionState.md#_inversepatches)
- [\_patches](reactant_last_action.ILastActionState.md#_patches)
- [\_reactant](reactant_last_action.ILastActionState.md#_reactant)
- [\_sequence](reactant_last_action.ILastActionState.md#_sequence)
- [method](reactant_last_action.ILastActionState.md#method)
- [params](reactant_last_action.ILastActionState.md#params)
- [state](reactant_last_action.ILastActionState.md#state)

## Properties

### \_inversePatches

• `Optional` **\_inversePatches**: `Patch`[]

#### Inherited from

ReactantAction.\_inversePatches

#### Defined in

[packages/reactant-module/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L94)

___

### \_patches

• `Optional` **\_patches**: `Patch`[]

#### Inherited from

ReactantAction.\_patches

#### Defined in

[packages/reactant-module/src/interfaces.ts:93](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L93)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Inherited from

ReactantAction.\_reactant

#### Defined in

[packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L92)

___

### \_sequence

• `Optional` **\_sequence**: `number`

sync sequence

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:30](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L30)

___

### method

• `Optional` **method**: `string`

#### Inherited from

ReactantAction.method

#### Defined in

[packages/reactant-module/src/interfaces.ts:89](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L89)

___

### params

• **params**: `any`[]

#### Inherited from

ReactantAction.params

#### Defined in

[packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L91)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Inherited from

ReactantAction.state

#### Defined in

[packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L90)
