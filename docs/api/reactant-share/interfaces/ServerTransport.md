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

[packages/reactant-share/src/interfaces.ts:115](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L115)

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

[packages/reactant-share/src/interfaces.ts:110](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L110)

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

[packages/reactant-share/src/interfaces.ts:116](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L116)

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

[packages/reactant-share/src/interfaces.ts:117](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-share/src/interfaces.ts#L117)
