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
* [ServerTransport](../interfaces/_interfaces_.servertransport.md)
* [SpawnOptions](../interfaces/_interfaces_.spawnoptions.md)
* [Transports](../interfaces/_interfaces_.transports.md)

### Type aliases

* [ActionOptions](_interfaces_.md#actionoptions)
* [Callback](_interfaces_.md#callback)
* [CallbackWithHook](_interfaces_.md#callbackwithhook)
* [FunctionKeys](_interfaces_.md#functionkeys)
* [Port](_interfaces_.md#port)
* [PortApp](_interfaces_.md#portapp)
* [ProxyExec](_interfaces_.md#proxyexec)
* [Transform](_interfaces_.md#transform)

## Type aliases

###  ActionOptions

Ƭ **ActionOptions**: *Pick‹ILastActionState, Exclude‹keyof ILastActionState, "_inversePatches"››*

*Defined in [packages/reactant-share/src/interfaces.ts:109](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L109)*

___

###  Callback

Ƭ **Callback**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:84](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L84)*

#### Type declaration:

▸ (): *void | Promise‹void›*

___

###  CallbackWithHook

Ƭ **CallbackWithHook**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:86](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L86)*

#### Type declaration:

▸ (`transport`: T): *void | function*

**Parameters:**

Name | Type |
------ | ------ |
`transport` | T |

___

###  FunctionKeys

Ƭ **FunctionKeys**: *Exclude‹object[keyof T], void›*

*Defined in [packages/reactant-share/src/interfaces.ts:142](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L142)*

___

###  Port

Ƭ **Port**: *"server" | "client"*

*Defined in [packages/reactant-share/src/interfaces.ts:18](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L18)*

___

###  PortApp

Ƭ **PortApp**: *Partial‹Record‹[Port](_interfaces_.md#port), App‹any›››*

*Defined in [packages/reactant-share/src/interfaces.ts:93](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L93)*

___

###  ProxyExec

Ƭ **ProxyExec**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:156](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L156)*

#### Type declaration:

▸ <**T**, **K**, **O**>(`module`: T, `key`: K, `args`: Parameters‹T[K]›, `options?`: object & Pick‹EmitParameter‹any›, Exclude‹keyof EmitParameter<any>, "name" | "respond"››): *O extends false ? void : ReturnType<T[K]> extends Promise<infer R> ? Promise<R> : Promise<ReturnType<T[K]>>*

**Type parameters:**

▪ **T**: *object*

▪ **K**: *[FunctionKeys](_interfaces_.md#functionkeys)‹T›*

▪ **O**: *EmitParameter<any>["respond"]*

**Parameters:**

Name | Type |
------ | ------ |
`module` | T |
`key` | K |
`args` | Parameters‹T[K]› |
`options?` | object & Pick‹EmitParameter‹any›, Exclude‹keyof EmitParameter<any>, "name" &#124; "respond"›› |

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [packages/reactant-share/src/interfaces.ts:82](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L82)*

#### Type declaration:

▸ (`changedPort`: [Port](_interfaces_.md#port)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`changedPort` | [Port](_interfaces_.md#port) |
