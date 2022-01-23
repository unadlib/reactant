# Interface: ClientTransport

## Table of contents

### Methods

- [@@reactant:isClient](ClientTransport.md#@@reactant:isclient)
- [@@reactant:loadFullState](ClientTransport.md#@@reactant:loadfullstate)
- [@@reactant:preloadedState](ClientTransport.md#@@reactant:preloadedstate)
- [@@reactant:proxyClient](ClientTransport.md#@@reactant:proxyclient)
- [@@reactant:syncRouter](ClientTransport.md#@@reactant:syncrouter)

## Methods

### @@reactant:isClient

▸ **@@reactant:isClient**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:105](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/interfaces.ts#L105)

___

### @@reactant:loadFullState

▸ **@@reactant:loadFullState**(`sequence`): `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sequence` | `number` |

#### Returns

`Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:102](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/interfaces.ts#L102)

___

### @@reactant:preloadedState

▸ **@@reactant:preloadedState**(): `Promise`<`Record`<`string`, `any`\>\>

#### Returns

`Promise`<`Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:101](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/interfaces.ts#L101)

___

### @@reactant:proxyClient

▸ **@@reactant:proxyClient**(`options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.args` | `any`[] |
| `options.method` | `string` |
| `options.module` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:96](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/interfaces.ts#L96)

___

### @@reactant:syncRouter

▸ **@@reactant:syncRouter**(): `Promise`<`Location`<`PoorMansUnknown`\>\>

#### Returns

`Promise`<`Location`<`PoorMansUnknown`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:106](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/interfaces.ts#L106)
