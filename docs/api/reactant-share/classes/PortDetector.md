# Class: PortDetector

Port Detector

It provides port detection and client/server port switching functions.

## Table of contents

### Constructors

- [constructor](PortDetector.md#constructor)

### Properties

- [clientCallbacks](PortDetector.md#clientcallbacks)
- [clientId](PortDetector.md#clientid)
- [lastAction](PortDetector.md#lastaction)
- [lastHooks](PortDetector.md#lasthooks)
- [portApp](PortDetector.md#portapp)
- [previousPort](PortDetector.md#previousport)
- [serverCallbacks](PortDetector.md#servercallbacks)
- [sharedAppOptions](PortDetector.md#sharedappoptions)
- [syncFullStatePromise](PortDetector.md#syncfullstatepromise)
- [transport](PortDetector.md#transport)

### Accessors

- [disableSyncClient](PortDetector.md#disablesyncclient)
- [isClient](PortDetector.md#isclient)
- [isServer](PortDetector.md#isserver)
- [shared](PortDetector.md#shared)
- [transports](PortDetector.md#transports)

### Methods

- [allowDisableSync](PortDetector.md#allowdisablesync)
- [detectPort](PortDetector.md#detectport)
- [onClient](PortDetector.md#onclient)
- [onServer](PortDetector.md#onserver)
- [setPort](PortDetector.md#setport)
- [syncFullState](PortDetector.md#syncfullstate)
- [syncToClients](PortDetector.md#synctoclients)

## Constructors

### constructor

• **new PortDetector**(`sharedAppOptions`, `lastAction`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedAppOptions` | `ISharedAppOptions` |
| `lastAction` | [`LastAction`](LastAction.md) |

#### Defined in

[packages/reactant-share/src/portDetector.ts:63](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L63)

## Properties

### clientCallbacks

• `Protected` **clientCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:40](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L40)

___

### clientId

• **clientId**: ``null`` \| `string` = `null`

client id

#### Defined in

[packages/reactant-share/src/portDetector.ts:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L56)

___

### lastAction

• **lastAction**: [`LastAction`](LastAction.md)

___

### lastHooks

• `Protected` `Optional` **lastHooks**: `Set`<`void` \| () => `void`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:34](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L34)

___

### portApp

• `Protected` `Optional` **portApp**: `Partial`<`Record`<`Port`, [`App`](../interfaces/App.md)<`any`, `any`, `any`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L32)

___

### previousPort

• `Optional` **previousPort**: `Port`

previous port

#### Defined in

[packages/reactant-share/src/portDetector.ts:51](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L51)

___

### serverCallbacks

• `Protected` **serverCallbacks**: `Set`<`CallbackWithHook`<`Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:36](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L36)

___

### sharedAppOptions

• **sharedAppOptions**: `ISharedAppOptions`

___

### syncFullStatePromise

• `Optional` **syncFullStatePromise**: `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:44](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L44)

___

### transport

• `Optional` **transport**: `Transport`<`any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:188](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L188)

## Accessors

### disableSyncClient

• `get` **disableSyncClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:102](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L102)

___

### isClient

• `get` **isClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:180](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L180)

___

### isServer

• `get` **isServer**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:176](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L176)

___

### shared

• `get` **shared**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:98](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L98)

___

### transports

• `get` **transports**(): `Transports`

#### Returns

`Transports`

#### Defined in

[packages/reactant-share/src/portDetector.ts:184](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L184)

## Methods

### allowDisableSync

▸ **allowDisableSync**(): `boolean`

allow Disable Sync

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:61](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L61)

___

### detectPort

▸ `Protected` **detectPort**(`port`): `undefined` \| [`App`](../interfaces/App.md)<`any`, `any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |

#### Returns

`undefined` \| [`App`](../interfaces/App.md)<`any`, `any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:110](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L110)

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

[packages/reactant-share/src/portDetector.ts:151](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L151)

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

[packages/reactant-share/src/portDetector.ts:120](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L120)

___

### setPort

▸ **setPort**(`currentPortApp`, `transport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPortApp` | `Partial`<`Record`<`Port`, [`App`](../interfaces/App.md)<`any`, `any`, `any`\>\>\> |
| `transport` | `Transport`<[`ServerTransport`](../interfaces/ServerTransport.md), [`ClientTransport`](../interfaces/ClientTransport.md)\> \| `Transport`<[`ClientTransport`](../interfaces/ClientTransport.md), [`ServerTransport`](../interfaces/ServerTransport.md)\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:190](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L190)

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

[packages/reactant-share/src/portDetector.ts:233](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L233)

___

### syncToClients

▸ **syncToClients**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:219](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-share/src/portDetector.ts#L219)
