---
id: "_interfaces_"
title: "interfaces"
sidebar_label: "interfaces"
---

## Index

### Interfaces

* [ClientTransport](../interfaces/_interfaces_.clienttransport.md)
* [Config](../interfaces/_interfaces_.config.md)
* [HandleClientOptions](../interfaces/_interfaces_.handleclientoptions.md)
* [HandleServerOptions](../interfaces/_interfaces_.handleserveroptions.md)
* [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md)
* [ProxyClientOptions](../interfaces/_interfaces_.proxyclientoptions.md)
* [ServerTransport](../interfaces/_interfaces_.servertransport.md)
* [Transports](../interfaces/_interfaces_.transports.md)

### Type aliases

* [ActionOptions](_interfaces_.md#actionoptions)
* [Callback](_interfaces_.md#callback)
* [CallbackWithHook](_interfaces_.md#callbackwithhook)
* [Port](_interfaces_.md#port)
* [PortApp](_interfaces_.md#portapp)
* [Transform](_interfaces_.md#transform)

## Type aliases

###  ActionOptions

Ƭ **ActionOptions**: *Pick‹ILastActionState, Exclude‹keyof ILastActionState, "_inversePatches"››*

*Defined in [packages/reactant-share/src/interfaces.ts:103](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L103)*

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:78](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L78)*

#### Type declaration:

▸ (): *void | Promise‹void›*

___

###  CallbackWithHook

Ƭ **CallbackWithHook**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:80](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L80)*

#### Type declaration:

▸ (`transport`: T): *void | function*

**Parameters:**

Name | Type |
------ | ------ |
`transport` | T |

___

###  Port

Ƭ **Port**: *"server" | "client"*

*Defined in [packages/reactant-share/src/interfaces.ts:16](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L16)*

___

###  PortApp

Ƭ **PortApp**: *Partial‹Record‹[Port](_interfaces_.md#port), App‹any›››*

*Defined in [packages/reactant-share/src/interfaces.ts:87](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L87)*

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/interfaces.ts#L76)*

#### Type declaration:

▸ (`changedPort`: [Port](_interfaces_.md#port)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`changedPort` | [Port](_interfaces_.md#port) |
