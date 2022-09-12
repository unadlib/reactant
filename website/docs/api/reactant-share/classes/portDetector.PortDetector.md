---
id: "portDetector.PortDetector"
title: "Class: PortDetector"
sidebar_label: "PortDetector"
custom_edit_url: null
---

[portDetector](../modules/portDetector.md).PortDetector

Port Detector

It provides port detection and client/server port switching functions.

## Constructors

### constructor

• **new PortDetector**(`sharedAppOptions`, `lastAction`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sharedAppOptions` | `ISharedAppOptions` |
| `lastAction` | `ReactantLastAction` |

#### Defined in

[packages/reactant-share/src/portDetector.ts:63](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L63)

## Properties

### clientCallbacks

• `Protected` **clientCallbacks**: `Set`<`CallbackWithHook`<`Transport`<`ServerTransport`, `ClientTransport`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:40](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L40)

___

### clientId

• **clientId**: ``null`` \| `string` = `null`

client id

#### Defined in

[packages/reactant-share/src/portDetector.ts:56](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L56)

___

### lastAction

• **lastAction**: `ReactantLastAction`

#### Defined in

[packages/reactant-share/src/portDetector.ts:65](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L65)

___

### lastHooks

• `Protected` `Optional` **lastHooks**: `Set`<`void` \| () => `void`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:34](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L34)

___

### portApp

• `Protected` `Optional` **portApp**: `Partial`<`Record`<`Port`, `App`<`any`, `any`, `any`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:32](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L32)

___

### previousPort

• `Optional` **previousPort**: `Port`

previous port

#### Defined in

[packages/reactant-share/src/portDetector.ts:51](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L51)

___

### serverCallbacks

• `Protected` **serverCallbacks**: `Set`<`CallbackWithHook`<`Transport`<`ServerTransport`, `ClientTransport`\>\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:36](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L36)

___

### sharedAppOptions

• **sharedAppOptions**: `ISharedAppOptions`

#### Defined in

[packages/reactant-share/src/portDetector.ts:64](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L64)

___

### syncFullStatePromise

• `Optional` **syncFullStatePromise**: `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:44](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L44)

___

### transport

• `Optional` **transport**: `Transport`<`any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:196](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L196)

## Accessors

### disableSyncClient

• `get` **disableSyncClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:106](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L106)

___

### isClient

• `get` **isClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:188](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L188)

___

### isServer

• `get` **isServer**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:184](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L184)

___

### isWorkerMode

• `get` **isWorkerMode**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:180](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L180)

___

### shared

• `get` **shared**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:102](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L102)

___

### transports

• `get` **transports**(): `Transports`

#### Returns

`Transports`

#### Defined in

[packages/reactant-share/src/portDetector.ts:192](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L192)

## Methods

### allowDisableSync

▸ **allowDisableSync**(): `boolean`

allow Disable Sync

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/portDetector.ts:61](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L61)

___

### detectPort

▸ `Protected` **detectPort**(`port`): `undefined` \| `App`<`any`, `any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |

#### Returns

`undefined` \| `App`<`any`, `any`, `any`\>

#### Defined in

[packages/reactant-share/src/portDetector.ts:114](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L114)

___

### onClient

▸ **onClient**(`callback`): () => `void`

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<`ClientTransport`, `ServerTransport`\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:155](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L155)

___

### onServer

▸ **onServer**(`callback`): () => `void`

onServer

When the port is server, this hook will execute.
And allow to return a function that will be executed when the current port is switched to client.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<`Transport`<`ServerTransport`, `ClientTransport`\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:124](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L124)

___

### setPort

▸ **setPort**(`currentPortApp`, `transport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPortApp` | `Partial`<`Record`<`Port`, `App`<`any`, `any`, `any`\>\>\> |
| `transport` | `Transport`<`ServerTransport`, `ClientTransport`\> \| `Transport`<`ClientTransport`, `ServerTransport`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:198](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L198)

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

[packages/reactant-share/src/portDetector.ts:241](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L241)

___

### syncToClients

▸ **syncToClients**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/portDetector.ts:227](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L227)

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

[packages/reactant-share/src/portDetector.ts:278](https://github.com/unadlib/reactant/blob/8297bb80/packages/reactant-share/src/portDetector.ts#L278)
