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

*Defined in [packages/reactant-share/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L107)*

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:82](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L82)*

#### Type declaration:

▸ (): *void | Promise‹void›*

___

###  CallbackWithHook

Ƭ **CallbackWithHook**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:84](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L84)*

#### Type declaration:

▸ (`transport`: T): *void | function*

**Parameters:**

Name | Type |
------ | ------ |
`transport` | T |

___

###  Port

Ƭ **Port**: *"server" | "client"*

*Defined in [packages/reactant-share/src/interfaces.ts:16](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L16)*

___

###  PortApp

Ƭ **PortApp**: *Partial‹Record‹[Port](_interfaces_.md#port), App‹any›››*

*Defined in [packages/reactant-share/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L91)*

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:80](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L80)*

#### Type declaration:

▸ (`changedPort`: [Port](_interfaces_.md#port)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`changedPort` | [Port](_interfaces_.md#port) |
