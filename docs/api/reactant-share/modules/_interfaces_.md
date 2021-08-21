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

*Defined in [packages/reactant-share/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L98)*

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:73](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L73)*

#### Type declaration:

▸ (): *void | Promise‹void›*

___

###  CallbackWithHook

Ƭ **CallbackWithHook**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:75](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L75)*

#### Type declaration:

▸ (`transport`: T): *void | function*

**Parameters:**

Name | Type |
------ | ------ |
`transport` | T |

___

###  Port

Ƭ **Port**: *"server" | "client"*

*Defined in [packages/reactant-share/src/interfaces.ts:16](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L16)*

___

###  PortApp

Ƭ **PortApp**: *Partial‹Record‹[Port](_interfaces_.md#port), App‹any›››*

*Defined in [packages/reactant-share/src/interfaces.ts:82](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L82)*

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/interfaces.ts#L71)*

#### Type declaration:

▸ (`changedPort`: [Port](_interfaces_.md#port)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`changedPort` | [Port](_interfaces_.md#port) |
