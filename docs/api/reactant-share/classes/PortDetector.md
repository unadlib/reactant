# Class: PortDetector

Port Detector

It provides port detection and client/server port switching functions.

## Table of contents

### Constructors

- [constructor](PortDetector.md#constructor)

### Properties

- [clientCallbacks](PortDetector.md#clientcallbacks)
- [lastHooks](PortDetector.md#lasthooks)
- [portApp](PortDetector.md#portapp)
- [previousPort](PortDetector.md#previousport)
- [serverCallbacks](PortDetector.md#servercallbacks)
- [syncFullStatePromise](PortDetector.md#syncfullstatepromise)

### Accessors

- [isClient](PortDetector.md#isclient)
- [isServer](PortDetector.md#isserver)
- [transports](PortDetector.md#transports)

### Methods

- [detectPort](PortDetector.md#detectport)
- [onClient](PortDetector.md#onclient)
- [onRehydrate](PortDetector.md#onrehydrate)
- [onServer](PortDetector.md#onserver)
- [setPort](PortDetector.md#setport)
- [syncFullState](PortDetector.md#syncfullstate)
- [syncToClients](PortDetector.md#synctoclients)

## Constructors

### constructor

• **new PortDetector**(`options`, `lastAction`, `storage?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IPortDetectorOptions` |
| `lastAction` | `ReactantLastAction` |
| `storage?` | [`Storage`](Storage.md) |

#### Defined in

[packages/reactant-share/src/portDetector.ts:51](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L51)

## Properties

### clientCallbacks

• `Private` **clientCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:41](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L41)

___

### lastHooks

• `Private` `Optional` **lastHooks**: `Set`<`void` \| () => `void`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:35](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L35)

___

### portApp

• `Private` `Optional` **portApp**: `Partial`<`Record`<`Port`, [`App`](../interfaces/App.md)<`any`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:33](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L33)

___

### previousPort

• `Optional` **previousPort**: `Port`

#### Defined in

[packages/reactant-share/src/portDetector.ts:49](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L49)

___

### serverCallbacks

• `Private` **serverCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:37](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L37)

___

### syncFullStatePromise

• `Private` `Optional` **syncFullStatePromise**: `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:45](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L45)

## Accessors

### isClient

• `get` **isClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:144](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L144)

___

### isServer

• `get` **isServer**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:140](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L140)

___

### transports

• `get` **transports**(): `Transports`

#### Returns

`Transports`

#### Defined in

[packages/reactant-share/src/portDetector.ts:148](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L148)

## Methods

### detectPort

▸ `Private` **detectPort**(`port`): `undefined` \| [`App`](../interfaces/App.md)<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |

#### Returns

`undefined` \| [`App`](../interfaces/App.md)<`any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:104](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L104)

___

### onClient

▸ **onClient**(`callback`): () => `void`

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<[`ClientTransport`](../interfaces/ClientTransport.md), [`ServerTransport`](../interfaces/ServerTransport.md)\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:130](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L130)

___

### onRehydrate

▸ **onRehydrate**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:96](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L96)

___

### onServer

▸ **onServer**(`callback`): () => `void`

onServer

When the port is server, this hook will execute.
And allow to return a function that will be executed when the current port is switched to client.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:114](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L114)

___

### setPort

▸ **setPort**(`currentPortApp`, `transport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPortApp` | `Partial`<`Record`<`Port`, [`App`](../interfaces/App.md)<`any`\>\>\> |
| `transport` | `Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\> \| `Transport`<[`ClientTransport`](../interfaces/ClientTransport.md), [`ServerTransport`](../interfaces/ServerTransport.md)\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:152](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L152)

___

### syncFullState

▸ **syncFullState**(`__namedParameters?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.forceSync` | `undefined` \| `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:194](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L194)

___

### syncToClients

▸ **syncToClients**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:180](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-share/src/portDetector.ts#L180)
