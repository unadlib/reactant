---
id: "_interfaces_.isharedappoptions"
title: "ISharedAppOptions"
sidebar_label: "ISharedAppOptions"
---

## Hierarchy

* **ISharedAppOptions**

## Index

### Properties

* [enablePatchesChecker](_interfaces_.isharedappoptions.md#optional-enablepatcheschecker)
* [enablePatchesFilter](_interfaces_.isharedappoptions.md#optional-enablepatchesfilter)
* [name](_interfaces_.isharedappoptions.md#name)
* [port](_interfaces_.isharedappoptions.md#optional-port)
* [sharedWorkerURL](_interfaces_.isharedappoptions.md#optional-sharedworkerurl)
* [transform](_interfaces_.isharedappoptions.md#optional-transform)
* [transports](_interfaces_.isharedappoptions.md#optional-transports)
* [type](_interfaces_.isharedappoptions.md#type)

## Properties

### `Optional` enablePatchesChecker

• **enablePatchesChecker**? : *undefined | false | true*

*Defined in [packages/reactant-share/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L57)*

Enable patches checker to support minimized patches in server port.

___

### `Optional` enablePatchesFilter

• **enablePatchesFilter**? : *undefined | false | true*

*Defined in [packages/reactant-share/src/interfaces.ts:53](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L53)*

Enable patches filter to support minimized modules collections in client port.

___

###  name

• **name**: *string*

*Defined in [packages/reactant-share/src/interfaces.ts:33](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L33)*

Reactant shared app name.

___

### `Optional` port

• **port**? : *[Port](../modules/_interfaces_.md#port)*

*Defined in [packages/reactant-share/src/interfaces.ts:45](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L45)*

Specify 'client' or 'server' port.

___

### `Optional` sharedWorkerURL

• **sharedWorkerURL**? : *undefined | string*

*Defined in [packages/reactant-share/src/interfaces.ts:49](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L49)*

Specify a SharedWorker URL

___

### `Optional` transform

• **transform**? : *[Transform](../modules/_interfaces_.md#transform)*

*Defined in [packages/reactant-share/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L61)*

Transform client/server port

___

### `Optional` transports

• **transports**? : *[Transports](_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/interfaces.ts:41](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L41)*

Shared app's transports

___

###  type

• **type**: *"SharedTab" | "BrowserExtension" | "SharedWorker" | "Base"*

*Defined in [packages/reactant-share/src/interfaces.ts:37](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-share/src/interfaces.ts#L37)*

Reactant shared app type.
