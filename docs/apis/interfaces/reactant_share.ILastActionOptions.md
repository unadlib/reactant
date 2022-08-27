# Interface: ILastActionOptions

[reactant-share](../modules/reactant_share.md).ILastActionOptions

## Table of contents

### Properties

- [ignoreAction](reactant_share.ILastActionOptions.md#ignoreaction)
- [stateKey](reactant_share.ILastActionOptions.md#statekey)

## Properties

### ignoreAction

• `Optional` **ignoreAction**: (`action`: [`ReactantAction`](reactant_share.ReactantAction.md)<`any`\>) => `boolean`

#### Type declaration

▸ (`action`): `boolean`

ignore action tracking

##### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ReactantAction`](reactant_share.ReactantAction.md)<`any`\> |

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
