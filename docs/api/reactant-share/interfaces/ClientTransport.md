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

[packages/reactant-share/src/interfaces.ts:100](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L100)

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

[packages/reactant-share/src/interfaces.ts:97](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L97)

___

### @@reactant:preloadedState

▸ **@@reactant:preloadedState**(): `Promise`<`Record`<`string`, `any`\>\>

#### Returns

`Promise`<`Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:96](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L96)

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

[packages/reactant-share/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L91)

___

### @@reactant:syncRouter

▸ **@@reactant:syncRouter**(): `Promise`<`Location`<`PoorMansUnknown`\>\>

#### Returns

`Promise`<`Location`<`PoorMansUnknown`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:101](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L101)
