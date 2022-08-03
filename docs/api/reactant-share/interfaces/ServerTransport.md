# Interface: ServerTransport

## Table of contents

### Methods

- [@@reactant:lastAction](ServerTransport.md#@@reactant:lastaction)
- [@@reactant:proxyServer](ServerTransport.md#@@reactant:proxyserver)
- [@@reactant:routerChange](ServerTransport.md#@@reactant:routerchange)
- [@@reactant:syncToClients](ServerTransport.md#@@reactant:synctoclients)

## Methods

### @@reactant:lastAction

▸ **@@reactant:lastAction**(`options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ActionOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:126](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L126)

___

### @@reactant:proxyServer

▸ **@@reactant:proxyServer**(`options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.args` | `any`[] |
| `options.method` | `string` |
| `options.module` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:121](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L121)

___

### @@reactant:routerChange

▸ **@@reactant:routerChange**(`options`): `Promise`<`RouterState`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `RouterChangeNameOptions` |

#### Returns

`Promise`<`RouterState`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:127](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L127)

___

### @@reactant:syncToClients

▸ **@@reactant:syncToClients**(`options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `undefined` \| ``null`` \| `Record`<`string`, `any`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:128](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/interfaces.ts#L128)
