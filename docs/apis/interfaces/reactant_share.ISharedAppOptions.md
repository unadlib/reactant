# Interface: ISharedAppOptions

[reactant-share](../modules/reactant_share.md).ISharedAppOptions

## Table of contents

### Properties

- [enablePatchesChecker](reactant_share.ISharedAppOptions.md#enablepatcheschecker)
- [enablePatchesFilter](reactant_share.ISharedAppOptions.md#enablepatchesfilter)
- [enableTransportDebugger](reactant_share.ISharedAppOptions.md#enabletransportdebugger)
- [forcedShare](reactant_share.ISharedAppOptions.md#forcedshare)
- [forcedSyncClient](reactant_share.ISharedAppOptions.md#forcedsyncclient)
- [name](reactant_share.ISharedAppOptions.md#name)
- [port](reactant_share.ISharedAppOptions.md#port)
- [portName](reactant_share.ISharedAppOptions.md#portname)
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

[packages/reactant-share/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L94)

___

### enablePatchesFilter

• `Optional` **enablePatchesFilter**: `boolean`

Enable patches filter to support minimized modules collections in client port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L90)

___

### enableTransportDebugger

• `Optional` **enableTransportDebugger**: `boolean`

Enable transport debugger for shared app.

#### Defined in

[packages/reactant-share/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L98)

___

### forcedShare

• `Optional` **forcedShare**: `boolean`

forced share, disabled by default.

#### Defined in

[packages/reactant-share/src/interfaces.ts:114](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L114)

___

### forcedSyncClient

• `Optional` **forcedSyncClient**: `boolean`

Forced Sync for all client, enabled by default.

If forcedSyncClient is false, then only the client's visibilityState is visible will the state be synchronized from server port.

`forcedSyncClient` is only true in `SharedTab` type.

#### Defined in

[packages/reactant-share/src/interfaces.ts:110](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L110)

___

### name

• **name**: `string`

Reactant shared app name.

#### Defined in

[packages/reactant-share/src/interfaces.ts:62](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L62)

___

### port

• `Optional` **port**: `Port`

Specify 'client' or 'server' port.

#### Defined in

[packages/reactant-share/src/interfaces.ts:74](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L74)

___

### portName

• `Optional` **portName**: `string`

Specify a port name for routing and fork() args.

#### Defined in

[packages/reactant-share/src/interfaces.ts:78](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L78)

___

### transform

• `Optional` **transform**: `Transform`

Transform client/server port

#### Defined in

[packages/reactant-share/src/interfaces.ts:102](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L102)

___

### transports

• `Optional` **transports**: `Transports`

Shared app's transports

#### Defined in

[packages/reactant-share/src/interfaces.ts:70](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L70)

___

### type

• **type**: ``"SharedTab"`` \| ``"SharedWorker"`` \| ``"Base"``

Reactant shared app type.

#### Defined in

[packages/reactant-share/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L66)

___

### worker

• `Optional` **worker**: `SharedWorker`

Specify a SharedWorker

#### Defined in

[packages/reactant-share/src/interfaces.ts:86](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L86)

___

### workerURL

• `Optional` **workerURL**: `string`

Specify a SharedWorker URL

#### Defined in

[packages/reactant-share/src/interfaces.ts:82](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L82)
