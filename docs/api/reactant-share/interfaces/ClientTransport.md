# Interface: ClientTransport

## Table of contents

### Methods

- [@@reactant:isClient](ClientTransport.md#@@reactant:isclient)
- [@@reactant:loadFullState](ClientTransport.md#@@reactant:loadfullstate)
- [@@reactant:preloadedState](ClientTransport.md#@@reactant:preloadedstate)
- [@@reactant:proxyClient](ClientTransport.md#@@reactant:proxyclient)
- [@@reactant:syncRouter](ClientTransport.md#@@reactant:syncrouter)
- [@@reactant:syncRouterWorker](ClientTransport.md#@@reactant:syncrouterworker)

## Methods

### @@reactant:isClient

▸ **@@reactant:isClient**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:110](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L110)

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

[packages/reactant-share/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L107)

___

### @@reactant:preloadedState

▸ **@@reactant:preloadedState**(): `Promise`<`Record`<`string`, `any`\>\>

#### Returns

`Promise`<`Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:106](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L106)

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

[packages/reactant-share/src/interfaces.ts:101](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L101)

___

### @@reactant:syncRouter

▸ **@@reactant:syncRouter**(): `Promise`<`Location`<`PoorMansUnknown`\>\>

#### Returns

`Promise`<`Location`<`PoorMansUnknown`\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:111](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L111)

___

### @@reactant:syncRouterWorker

▸ **@@reactant:syncRouterWorker**(`router`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `router` | `RouterState` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/interfaces.ts:112](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L112)
