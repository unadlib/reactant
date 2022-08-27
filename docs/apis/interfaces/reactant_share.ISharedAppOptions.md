# Interface: ISharedAppOptions

[reactant-share](../modules/reactant_share.md).ISharedAppOptions

## Table of contents

### Properties

- [enablePatchesChecker](reactant_share.ISharedAppOptions.md#enablepatcheschecker)
- [enablePatchesFilter](reactant_share.ISharedAppOptions.md#enablepatchesfilter)
- [forcedSyncClient](reactant_share.ISharedAppOptions.md#forcedsyncclient)
- [name](reactant_share.ISharedAppOptions.md#name)
- [port](reactant_share.ISharedAppOptions.md#port)
- [transform](reactant_share.ISharedAppOptions.md#transform)
- [transports](reactant_share.ISharedAppOptions.md#transports)
- [type](reactant_share.ISharedAppOptions.md#type)
- [worker](reactant_share.ISharedAppOptions.md#worker)
- [workerURL](reactant_share.ISharedAppOptions.md#workerurl)

## Properties

### enablePatchesChecker

• `Optional` **enablePatchesChecker**: `boolean`

Enable patches checker to support minimized patches in server port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L66)

___

### enablePatchesFilter

• `Optional` **enablePatchesFilter**: `boolean`

Enable patches filter to support minimized modules collections in client port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:62](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L62)

___

### forcedSyncClient

• `Optional` **forcedSyncClient**: `boolean`

Forced Sync for all client, enabled by default.

If forcedSyncClient is false, then only the client's visibilityState is visible will the state be synchronized from server port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L76)

___

### name

• **name**: `string`

Reactant shared app name.

#### Defined in

[packages/reactant-share/src/interfaces.ts:38](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L38)

___

### port

• `Optional` **port**: `Port`

Specify 'client' or 'server' port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:50](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L50)

___

### transform

• `Optional` **transform**: `Transform`

Transform client/server port

#### Defined in

[packages/reactant-share/src/interfaces.ts:70](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L70)

___

### transports

• `Optional` **transports**: `Transports`

Shared app's transports

#### Defined in

[packages/reactant-share/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L46)

___

### type

• **type**: ``"SharedTab"`` \| ``"SharedWorker"`` \| ``"Base"``

Reactant shared app type.

#### Defined in

[packages/reactant-share/src/interfaces.ts:42](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L42)

___

### worker

• `Optional` **worker**: `SharedWorker`

Specify a SharedWorker

#### Defined in

[packages/reactant-share/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L58)

___

### workerURL

• `Optional` **workerURL**: `string`

Specify a SharedWorker URL

#### Defined in

[packages/reactant-share/src/interfaces.ts:54](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-share/src/interfaces.ts#L54)
