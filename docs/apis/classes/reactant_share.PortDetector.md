# Class: PortDetector

[reactant-share](../modules/reactant_share.md).PortDetector

Port Detector

It provides port detection and client/server port switching functions.

## Table of contents

### Constructors

- [constructor](reactant_share.PortDetector.md#constructor)

### Properties

- [clientCallbacks](reactant_share.PortDetector.md#clientcallbacks)
- [clientDestroyCallbacks](reactant_share.PortDetector.md#clientdestroycallbacks)
- [clientId](reactant_share.PortDetector.md#clientid)
- [clientIds](reactant_share.PortDetector.md#clientids)
- [isolatedModules](reactant_share.PortDetector.md#isolatedmodules)
- [lastAction](reactant_share.PortDetector.md#lastaction)
- [lastHooks](reactant_share.PortDetector.md#lasthooks)
- [lastIsolatedInstanceKeys](reactant_share.PortDetector.md#lastisolatedinstancekeys)
- [lastIsolatedInstances](reactant_share.PortDetector.md#lastisolatedinstances)
- [portApp](reactant_share.PortDetector.md#portapp)
- [previousPort](reactant_share.PortDetector.md#previousport)
- [serverCallbacks](reactant_share.PortDetector.md#servercallbacks)
- [sharedAppOptions](reactant_share.PortDetector.md#sharedappoptions)
- [syncFullStatePromise](reactant_share.PortDetector.md#syncfullstatepromise)
- [transport](reactant_share.PortDetector.md#transport)

### Accessors

- [disableSyncClient](reactant_share.PortDetector.md#disablesyncclient)
- [id](reactant_share.PortDetector.md#id)
- [isClient](reactant_share.PortDetector.md#isclient)
- [isServer](reactant_share.PortDetector.md#isserver)
- [isServerWorker](reactant_share.PortDetector.md#isserverworker)
- [isWorkerMode](reactant_share.PortDetector.md#isworkermode)
- [isolatedInstanceKeys](reactant_share.PortDetector.md#isolatedinstancekeys)
- [name](reactant_share.PortDetector.md#name)
- [shared](reactant_share.PortDetector.md#shared)
- [transports](reactant_share.PortDetector.md#transports)

### Methods

- [allowDisableSync](reactant_share.PortDetector.md#allowdisablesync)
- [detectPort](reactant_share.PortDetector.md#detectport)
- [disableShare](reactant_share.PortDetector.md#disableshare)
- [getNextState](reactant_share.PortDetector.md#getnextstate)
- [hasIsolatedState](reactant_share.PortDetector.md#hasisolatedstate)
- [onClient](reactant_share.PortDetector.md#onclient)
- [onClientDestroy](reactant_share.PortDetector.md#onclientdestroy)
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

[packages/reactant-share/src/modules/portDetector.ts:76](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L76)

## Properties

### clientCallbacks

• `Protected` **clientCallbacks**: `Set`<`CallbackWithHook`<[`ServerTransport`](../modules/reactant_share.md#servertransport)<{}\>\>\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:46](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L46)

___

### clientDestroyCallbacks

• `Protected` **clientDestroyCallbacks**: `Set`<`OnClientDestroy`\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:50](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L50)

___

### clientId

• **clientId**: ``null`` \| `string` = `null`

client id, it will be generated when the port is client, it is null in server port.

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:64](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L64)

___

### clientIds

• **clientIds**: `string`[] = `[]`

client ids, it will collect all the client ids when the port is server, it is an empty array in client port.

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:74](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L74)

___

### isolatedModules

• **isolatedModules**: [`Service`](../interfaces/reactant_share.Service.md)<`Record`<`string`, `any`\>\>[] = `[]`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:169](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L169)

___

### lastAction

• **lastAction**: [`LastAction`](reactant_share.LastAction.md)

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:78](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L78)

___

### lastHooks

• `Protected` `Optional` **lastHooks**: `Set`<`void` \| () => `void`\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:40](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L40)

___

### lastIsolatedInstanceKeys

• `Protected` `Optional` **lastIsolatedInstanceKeys**: (`undefined` \| `string`)[]

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:190](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L190)

___

### lastIsolatedInstances

• `Protected` `Optional` **lastIsolatedInstances**: [`Service`](../interfaces/reactant_share.Service.md)<`Record`<`string`, `any`\>\>[]

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:188](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L188)

___

### portApp

• `Protected` `Optional` **portApp**: `Partial`<`Record`<`Port`, [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>\>\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:38](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L38)

___

### previousPort

• `Optional` **previousPort**: `Port`

previous port

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:59](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L59)

___

### serverCallbacks

• `Protected` **serverCallbacks**: `Set`<`CallbackWithHook`<[`ServerTransport`](../modules/reactant_share.md#servertransport)<{}\>\>\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L42)

___

### sharedAppOptions

• **sharedAppOptions**: [`ISharedAppOptions`](../interfaces/reactant_share.ISharedAppOptions.md)

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:77](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L77)

___

### syncFullStatePromise

• `Optional` **syncFullStatePromise**: `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L52)

___

### transport

• `Optional` **transport**: `Transport`<`any`\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:326](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L326)

## Accessors

### disableSyncClient

• `get` **disableSyncClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:217](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L217)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:205](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L205)

___

### isClient

• `get` **isClient**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:318](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L318)

___

### isServer

• `get` **isServer**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:314](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L314)

___

### isServerWorker

• `get` **isServerWorker**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:310](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L310)

___

### isWorkerMode

• `get` **isWorkerMode**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:306](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L306)

___

### isolatedInstanceKeys

• `get` **isolatedInstanceKeys**(): (`undefined` \| `string`)[]

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:192](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L192)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:213](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L213)

___

### shared

• `get` **shared**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:209](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L209)

___

### transports

• `get` **transports**(): `Transports`

#### Returns

`Transports`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:322](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L322)

## Methods

### allowDisableSync

▸ **allowDisableSync**(): `boolean`

allow Disable Sync

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:69](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L69)

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

[packages/reactant-share/src/modules/portDetector.ts:225](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L225)

___

### disableShare

▸ **disableShare**(`instance`): `void`

all isolated instances state will not be sync to other clients or server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `object` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:174](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L174)

___

### getNextState

▸ `Protected` **getNextState**(`fullState`): `Record`<`string`, `any`\>

ignore router state and isolated state sync for last action

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullState` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:410](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L410)

___

### hasIsolatedState

▸ **hasIsolatedState**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:201](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L201)

___

### onClient

▸ **onClient**(`callback`): () => `void`

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<[`ClientTransport`](../modules/reactant_share.md#clienttransport)<{}\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:266](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L266)

___

### onClientDestroy

▸ **onClientDestroy**(`callback`): () => `void`

emit client destroy event with clientId

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `OnClientDestroy` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:294](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L294)

___

### onServer

▸ **onServer**(`callback`): () => `void`

onServer

When the port is server, this hook will execute.
And allow to return a function that will be executed when the current port is switched to client.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `CallbackWithHook`<[`ServerTransport`](../modules/reactant_share.md#servertransport)<{}\>\> |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:235](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L235)

___

### setPort

▸ **setPort**(`currentPortApp`, `transport`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentPortApp` | `Partial`<`Record`<`Port`, [`App`](../interfaces/reactant_share.App.md)<`any`, `any`, `any`\>\>\> |
| `transport` | [`ServerTransport`](../modules/reactant_share.md#servertransport)<{}\> \| [`ClientTransport`](../modules/reactant_share.md#clienttransport)<{}\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:328](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L328)

___

### syncFullState

▸ **syncFullState**(`«destructured»?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `forceSync` | `undefined` \| `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:371](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L371)

___

### syncToClients

▸ **syncToClients**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:357](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L357)

___

### transform

▸ **transform**(`port`, `transport?`): `void`

transform port with new transport

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `Port` |
| `transport?` | `Transport`<`any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/portDetector.ts:430](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/portDetector.ts#L430)
