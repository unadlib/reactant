# Interface: ICoworkerOptions

[reactant-share](../modules/reactant_share.md).ICoworkerOptions

## Table of contents

### Properties

- [enablePatchesChecker](reactant_share.ICoworkerOptions.md#enablepatcheschecker)
- [enableTransportDebugger](reactant_share.ICoworkerOptions.md#enabletransportdebugger)
- [ignoreSyncStateKeys](reactant_share.ICoworkerOptions.md#ignoresyncstatekeys)
- [isCoworker](reactant_share.ICoworkerOptions.md#iscoworker)
- [transports](reactant_share.ICoworkerOptions.md#transports)
- [useModules](reactant_share.ICoworkerOptions.md#usemodules)
- [worker](reactant_share.ICoworkerOptions.md#worker)

## Properties

### enablePatchesChecker

• `Optional` **enablePatchesChecker**: `boolean`

Enable patches checker for cross-module state update on coworker.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:87](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L87)

___

### enableTransportDebugger

• `Optional` **enableTransportDebugger**: `boolean`

Enable transport debugger for coworker.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:72](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L72)

___

### ignoreSyncStateKeys

• `Optional` **ignoreSyncStateKeys**: `string`[]

Ignore sync state key in all proxy modules on coworker and main Process.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:83](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L83)

___

### isCoworker

• **isCoworker**: `boolean`

Whether the current process is the coworker process.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:64](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L64)

___

### transports

• `Optional` **transports**: `Object`

coworker transports

#### Type declaration

| Name | Type |
| :------ | :------ |
| `coworker?` | `Transport`<`any`\> |
| `main?` | `Transport`<`any`\> |

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:76](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L76)

___

### useModules

• **useModules**: [`ServiceIdentifier`](../modules/reactant_share.md#serviceidentifier)<`unknown`\>[]

Importing the injected dependency modules.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:60](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L60)

___

### worker

• `Optional` **worker**: `SharedWorker` \| `Worker`

Specify a SharedWorker for coworker.

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:68](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L68)
