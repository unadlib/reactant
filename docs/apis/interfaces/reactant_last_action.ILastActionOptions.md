# Interface: ILastActionOptions

[reactant-last-action](../modules/reactant_last_action.md).ILastActionOptions

## Table of contents

### Properties

- [ignoreAction](reactant_last_action.ILastActionOptions.md#ignoreaction)
- [stateKey](reactant_last_action.ILastActionOptions.md#statekey)

## Properties

### ignoreAction

• `Optional` **ignoreAction**: (`action`: `ReactantAction`<`any`\>) => `boolean`

#### Type declaration

▸ (`action`): `boolean`

ignore action tracking

##### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `ReactantAction`<`any`\> |

##### Returns

`boolean`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:23](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L23)

___

### stateKey

• `Optional` **stateKey**: `string`

Define a string as LastAction reducer key.

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:19](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L19)
