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

• `Optional` **\_inversePatches**: `Patches`

#### Inherited from

ReactantAction.\_inversePatches

#### Defined in

[packages/reactant-module/src/interfaces.ts:121](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L121)

___

### \_patches

• `Optional` **\_patches**: `Patches`

#### Inherited from

ReactantAction.\_patches

#### Defined in

[packages/reactant-module/src/interfaces.ts:120](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L120)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Inherited from

ReactantAction.\_reactant

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

ReactantAction.method

#### Defined in

[packages/reactant-module/src/interfaces.ts:116](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L116)

___

### params

• **params**: `any`[]

#### Inherited from

ReactantAction.params

#### Defined in

[packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L118)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Inherited from

ReactantAction.state

#### Defined in

[packages/reactant-module/src/interfaces.ts:117](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L117)
