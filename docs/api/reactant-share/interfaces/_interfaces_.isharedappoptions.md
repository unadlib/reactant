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

*Defined in [packages/reactant-share/src/interfaces.ts:67](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L67)*

Enable patches checker to support minimized patches in server port.

___

### `Optional` enablePatchesFilter

• **enablePatchesFilter**? : *undefined | false | true*

*Defined in [packages/reactant-share/src/interfaces.ts:63](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L63)*

Enable patches filter to support minimized modules collections in client port.

___

###  name

• **name**: *string*

*Defined in [packages/reactant-share/src/interfaces.ts:34](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L34)*

Reactant shared app name.

___

### `Optional` port

• **port**? : *[Port](../modules/_interfaces_.md#port)*

*Defined in [packages/reactant-share/src/interfaces.ts:51](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L51)*

Specify 'client' or 'server' port.

___

### `Optional` transform

• **transform**? : *[Transform](../modules/_interfaces_.md#transform)*

*Defined in [packages/reactant-share/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L71)*

Transform client/server port

___

### `Optional` transports

• **transports**? : *[Transports](_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/interfaces.ts:47](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L47)*

Shared app's transports

___

###  type

• **type**: *"SharedTab" | "BrowserExtension" | "SharedWorker" | "ServiceWorker" | "Base"*

*Defined in [packages/reactant-share/src/interfaces.ts:38](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L38)*

Reactant shared app type.

___

### `Optional` worker

• **worker**? : *ServiceWorker | SharedWorker*

*Defined in [packages/reactant-share/src/interfaces.ts:59](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L59)*

Specify a ServiceWorker or SharedWorker

___

### `Optional` workerURL

• **workerURL**? : *undefined | string*

*Defined in [packages/reactant-share/src/interfaces.ts:55](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L55)*

Specify a SharedWorker URL
