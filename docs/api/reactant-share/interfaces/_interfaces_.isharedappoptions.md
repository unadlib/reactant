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
* [transform](_interfaces_.isharedappoptions.md#optional-transform)
* [transports](_interfaces_.isharedappoptions.md#optional-transports)
* [type](_interfaces_.isharedappoptions.md#type)
* [worker](_interfaces_.isharedappoptions.md#optional-worker)
* [workerURL](_interfaces_.isharedappoptions.md#optional-workerurl)

## Properties

### `Optional` enablePatchesChecker

• **enablePatchesChecker**? : *undefined | false | true*

*Defined in [packages/reactant-share/src/interfaces.ts:68](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L68)*

Enable patches checker to support minimized patches in server port.

___

### `Optional` enablePatchesFilter

• **enablePatchesFilter**? : *undefined | false | true*

*Defined in [packages/reactant-share/src/interfaces.ts:64](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L64)*

Enable patches filter to support minimized modules collections in client port.

___

###  name

• **name**: *string*

*Defined in [packages/reactant-share/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L35)*

Reactant shared app name.

___

### `Optional` port

• **port**? : *[Port](../modules/_interfaces_.md#port)*

*Defined in [packages/reactant-share/src/interfaces.ts:52](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L52)*

Specify 'client' or 'server' port.

___

### `Optional` transform

• **transform**? : *[Transform](../modules/_interfaces_.md#transform)*

*Defined in [packages/reactant-share/src/interfaces.ts:72](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L72)*

Transform client/server port

___

### `Optional` transports

• **transports**? : *[Transports](_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/interfaces.ts:48](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L48)*

Shared app's transports

___

###  type

• **type**: *"SharedTab" | "BrowserExtension" | "SharedWorker" | "ServiceWorker" | "Base"*

*Defined in [packages/reactant-share/src/interfaces.ts:39](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L39)*

Reactant shared app type.

___

### `Optional` worker

• **worker**? : *ServiceWorker | SharedWorker*

*Defined in [packages/reactant-share/src/interfaces.ts:60](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L60)*

Specify a ServiceWorker or SharedWorker

___

### `Optional` workerURL

• **workerURL**? : *undefined | string*

*Defined in [packages/reactant-share/src/interfaces.ts:56](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/interfaces.ts#L56)*

Specify a SharedWorker URL
