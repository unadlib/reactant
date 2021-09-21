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
* [FunctionKeys](_interfaces_.md#functionkeys)
* [Port](_interfaces_.md#port)
* [PortApp](_interfaces_.md#portapp)
* [Spawn](_interfaces_.md#spawn)
* [Transform](_interfaces_.md#transform)

## Type aliases

###  ActionOptions

Ƭ **ActionOptions**: *Pick‹ILastActionState, Exclude‹keyof ILastActionState, "_inversePatches"››*

*Defined in [packages/reactant-share/src/interfaces.ts:108](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L108)*

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:83](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L83)*

#### Type declaration:

▸ (): *void | Promise‹void›*

___

###  CallbackWithHook

Ƭ **CallbackWithHook**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:85](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L85)*

#### Type declaration:

▸ (`transport`: T): *void | function*

**Parameters:**

Name | Type |
------ | ------ |
`transport` | T |

___

###  FunctionKeys

Ƭ **FunctionKeys**: *Exclude‹object[keyof T], void›*

*Defined in [packages/reactant-share/src/interfaces.ts:142](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L142)*

___

###  Port

Ƭ **Port**: *"server" | "client"*

*Defined in [packages/reactant-share/src/interfaces.ts:17](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L17)*

___

###  PortApp

Ƭ **PortApp**: *Partial‹Record‹[Port](_interfaces_.md#port), App‹any›››*

*Defined in [packages/reactant-share/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L92)*

___

###  Spawn

Ƭ **Spawn**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:149](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L149)*

#### Type declaration:

▸ <**T**, **K**>(`module`: T, `key`: K, `args`: Parameters‹T[K]›): *ReturnType<T[K]> extends Promise<infer R> ? Promise<R> : Promise<ReturnType<T[K]>>*

**Type parameters:**

▪ **T**: *object*

▪ **K**: *[FunctionKeys](_interfaces_.md#functionkeys)‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`module` | T |
`key` | K |
`args` | Parameters‹T[K]› |

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:81](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/interfaces.ts#L81)*

#### Type declaration:

▸ (`changedPort`: [Port](_interfaces_.md#port)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`changedPort` | [Port](_interfaces_.md#port) |
