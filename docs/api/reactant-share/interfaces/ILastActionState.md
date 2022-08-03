# Interface: ILastActionState<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`ReactantAction`](ReactantAction.md)<`T`\>

  ↳ **`ILastActionState`**

## Table of contents

### Properties

- [\_inversePatches](ILastActionState.md#_inversepatches)
- [\_patches](ILastActionState.md#_patches)
- [\_reactant](ILastActionState.md#_reactant)
- [\_sequence](ILastActionState.md#_sequence)
- [method](ILastActionState.md#method)
- [params](ILastActionState.md#params)
- [state](ILastActionState.md#state)

## Properties

### \_inversePatches

• `Optional` **\_inversePatches**: `Patch`[]

#### Inherited from

[ReactantAction](ReactantAction.md).[_inversePatches](ReactantAction.md#_inversepatches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L92)

___

### \_patches

• `Optional` **\_patches**: `Patch`[]

#### Inherited from

[ReactantAction](ReactantAction.md).[_patches](ReactantAction.md#_patches)

#### Defined in

[packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L91)

___

### \_reactant

• **\_reactant**: ``"REACTANT_ACTION"``

#### Inherited from

[ReactantAction](ReactantAction.md).[_reactant](ReactantAction.md#_reactant)

#### Defined in

[packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L90)

___

### \_sequence

• `Optional` **\_sequence**: `number`

sync sequence

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:26](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L26)

___

### method

• `Optional` **method**: `string`

#### Inherited from

[ReactantAction](ReactantAction.md).[method](ReactantAction.md#method)

#### Defined in

[packages/reactant-module/src/interfaces.ts:87](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L87)

___

### params

• **params**: `any`[]

#### Inherited from

[ReactantAction](ReactantAction.md).[params](ReactantAction.md#params)

#### Defined in

[packages/reactant-module/src/interfaces.ts:89](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L89)

___

### state

• **state**: `Record`<`string`, `T`\>

#### Inherited from

[ReactantAction](ReactantAction.md).[state](ReactantAction.md#state)

#### Defined in

[packages/reactant-module/src/interfaces.ts:88](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L88)
