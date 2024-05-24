# Interface: ILastActionOptions

[reactant-last-action](../modules/reactant_last_action.md).ILastActionOptions

## Table of contents

### Properties

- [ignoreAction](reactant_last_action.ILastActionOptions.md#ignoreaction)
- [stateKey](reactant_last_action.ILastActionOptions.md#statekey)

## Properties

### ignoreAction

• `Optional` **ignoreAction**: (`action`: [`ILastActionData`](../modules/reactant_last_action.md#ilastactiondata)) => `boolean`

#### Type declaration

▸ (`action`): `boolean`

ignore action tracking

##### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ILastActionData`](../modules/reactant_last_action.md#ilastactiondata) |

##### Returns

`boolean`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:36](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L36)

___

### stateKey

• `Optional` **stateKey**: `string`

Define a string as LastAction reducer key.

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L32)
