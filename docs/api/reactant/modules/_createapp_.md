---
id: "_createapp_"
title: "createApp"
sidebar_label: "createApp"
---

## Index

### Interfaces

* [Config](../interfaces/_createapp_.config.md)
* [ReturnValue](../interfaces/_createapp_.returnvalue.md)

### Functions

* [createApp](_createapp_.md#createapp)
* [testBed](_createapp_.md#testbed)

## Functions

###  createApp

▸ **createApp**<**T**>(`__namedParameters`: object): *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*

*Defined in [createApp.tsx:35](https://github.com/unadlib/reactant/blob/5ec3851/packages/reactant/src/createApp.tsx#L35)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`containerOptions` | undefined &#124; object | - |
`devOptions` | undefined &#124; DevOptions | - |
`main` | string &#124; symbol &#124; Newable‹T› &#124; Abstract‹T› | - |
`middlewares` | undefined &#124; Middleware‹object, any, Dispatch‹AnyAction‹›››[] | - |
`modules` | ValueProvider &#124; FactoryProvider &#124; ClassProvider &#124; ModuleProvider &#124; Module‹any›[] | [] |
`preloadedState` | undefined &#124; object | - |
`render` | function | - |

**Returns:** *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*

___

###  testBed

▸ **testBed**<**T**>(`config`: [Config](../interfaces/_createapp_.config.md)‹T›): *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*

*Defined in [createApp.tsx:94](https://github.com/unadlib/reactant/blob/5ec3851/packages/reactant/src/createApp.tsx#L94)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](../interfaces/_createapp_.config.md)‹T› |

**Returns:** *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*
