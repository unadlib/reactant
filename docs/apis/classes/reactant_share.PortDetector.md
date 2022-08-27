# Class: PortDetector

[reactant-share](../modules/reactant_share.md).PortDetector

Port Detector

It provides port detection and client/server port switching functions.

## Table of contents

### Constructors

- [constructor](reactant_share.PortDetector.md#constructor)

### Properties

- [clientCallbacks](reactant_share.PortDetector.md#clientcallbacks)
- [clientId](reactant_share.PortDetector.md#clientid)
- [lastAction](reactant_share.PortDetector.md#lastaction)
- [lastHooks](reactant_share.PortDetector.md#lasthooks)
- [portApp](reactant_share.PortDetector.md#portapp)
- [previousPort](reactant_share.PortDetector.md#previousport)
- [serverCallbacks](reactant_share.PortDetector.md#servercallbacks)
- [sharedAppOptions](reactant_share.PortDetector.md#sharedappoptions)
- [syncFullStatePromise](reactant_share.PortDetector.md#syncfullstatepromise)
- [transport](reactant_share.PortDetector.md#transport)

### Accessors

- [disableSyncClient](reactant_share.PortDetector.md#disablesyncclient)
- [isClient](reactant_share.PortDetector.md#isclient)
- [isServer](reactant_share.PortDetector.md#isserver)
- [isWorkerMode](reactant_share.PortDetector.md#isworkermode)
- [shared](reactant_share.PortDetector.md#shared)
- [transports](reactant_share.PortDetector.md#transports)

### Methods

- [allowDisableSync](reactant_share.PortDetector.md#allowdisablesync)
- [detectPort](reactant_share.PortDetector.md#detectport)
- [onClient](reactant_share.PortDetector.md#onclient)
- [onServer](reactant_share.PortDetector.md#onserver)
- [setPort](reactant_share.PortDetector.md#setport)
- [syncFullState](reactant_share.PortDetector.md#syncfullstate)
- [syncToClients](reactant_share.PortDetector.md#synctoclients)
- [transform](reactant_share.PortDetector.md#transform)

## Constructors

### constructor

• **new PortDetector**(`sharedAppOptions`, `lastAction`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedAppOptions` | [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md) |
| `lastAction` | [`LastAction`](reactant_share.LastAction.md) |

#### Defined in

[packages/reactant-share/src/portDetector.ts:63](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L63)

## Properties

### clientCallbacks

• `Protected` **clientCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/reactant_share.ServerTransport.md), [`ClientTransport`](../interfaces/reactant_share.ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:40](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L40)

___

### clientId

• **clientId**: ``null`` \| `string` = `null`

client id

#### Defined in

[packages/reactant-share/src/portDetector.ts:56](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L56)

___

### lastAction

• **lastAction**: [`LastAction`](reactant_share.LastAction.md)

#### Defined in

[packages/reactant-share/src/portDetector.ts:65](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L65)

___

### lastHooks

• `Protected` `Optional` **lastHooks**: `Set`<`void` \| () => `void`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:34](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L34)

___

### portApp

• `Protected` `Optional` **portApp**: `Partial`<`Record`<`Port`, [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L32)

___

### previousPort

• `Optional` **previousPort**: `Port`

previous port

#### Defined in

[packages/reactant-share/src/portDetector.ts:51](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L51)

___

### serverCallbacks

• `Protected` **serverCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/reactant_share.ServerTransport.md), [`ClientTransport`](../interfaces/reactant_share.ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:36](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L36)

___

### sharedAppOptions

• **sharedAppOptions**: [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md)

#### Defined in

[packages/reactant-share/src/portDetector.ts:64](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L64)

___

### syncFullStatePromise

• `Optional` **syncFullStatePromise**: `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:44](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L44)

___

### transport

• `Optional` **transport**: `Transport`<`any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:196](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L196)

## Accessors

### disableSyncClient

• `get` **disableSyncClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:106](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L106)

___

### isClient

• `get` **isClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:188](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L188)

___

### isServer

• `get` **isServer**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:184](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L184)

___

### isWorkerMode

• `get` **isWorkerMode**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:180](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L180)

___

### shared

• `get` **shared**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:102](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L102)

___

### transports

• `get` **transports**(): `Transports`

#### Returns

`Transports`

#### Defined in

[packages/reactant-share/src/portDetector.ts:192](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L192)

## Methods

### allowDisableSync

▸ **allowDisableSync**(): `boolean`

allow Disable Sync

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:61](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L61)

___

### detectPort

▸ `Protected` **detectPort**(`port`): `undefined` \| [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |

#### Returns

`undefined` \| [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:114](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L114)

___

### onClient

▸ **onClient**(`callback`): () => `void`

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<[`ClientTransport`](../interfaces/reactant_share.ClientTransport.md), [`ServerTransport`](../interfaces/reactant_share.ServerTransport.md)\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:155](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L155)

___

### onServer

▸ **onServer**(`callback`): () => `void`

onServer

When the port is server, this hook will execute.
And allow to return a function that will be executed when the current port is switched to client.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/reactant_share.ServerTransport.md), [`ClientTransport`](../interfaces/reactant_share.ClientTransport.md)\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:124](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L124)

___

### setPort

▸ **setPort**(`currentPortApp`, `transport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPortApp` | `Partial`<`Record`<`Port`, [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>\>\> |
| `transport` | `Transport`<[`ServerTransport`](../interfaces/reactant_share.ServerTransport.md), [`ClientTransport`](../interfaces/reactant_share.ClientTransport.md)\> \| `Transport`<[`ClientTransport`](../interfaces/reactant_share.ClientTransport.md), [`ServerTransport`](../interfaces/reactant_share.ServerTransport.md)\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:198](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L198)

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

[packages/reactant-share/src/portDetector.ts:241](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L241)

___

### syncToClients

▸ **syncToClients**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:227](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L227)

___

### transform

▸ **transform**(`port`, `transport?`): `void`

transform port with new transport

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |
| `transport?` | `Transport`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:278](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/portDetector.ts#L278)
