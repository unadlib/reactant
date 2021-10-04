---
id: "_interfaces_.servertransport"
title: "ServerTransport"
sidebar_label: "ServerTransport"
---

## Hierarchy

* **ServerTransport**

## Index

### Methods

* [[lastActionName]](_interfaces_.servertransport.md#[lastactionname])
* [[proxyServerActionName]](_interfaces_.servertransport.md#[proxyserveractionname])
* [[routerChangeName]](_interfaces_.servertransport.md#[routerchangename])
* [[syncToClientsName]](_interfaces_.servertransport.md#[synctoclientsname])

## Methods

###  [lastActionName]

▸ **[lastActionName]**(`options`: [ActionOptions](../modules/_interfaces_.md#actionoptions)): *Promise‹void›*

*Defined in [packages/reactant-share/src/interfaces.ts:120](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ActionOptions](../modules/_interfaces_.md#actionoptions) |

**Returns:** *Promise‹void›*

___

###  [proxyServerActionName]

▸ **[proxyServerActionName]**(`options`: object): *Promise‹void›*

*Defined in [packages/reactant-share/src/interfaces.ts:115](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L115)*

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`method` | string |
`module` | string |

**Returns:** *Promise‹void›*

___

###  [routerChangeName]

▸ **[routerChangeName]**(`options`: [RouterChangeNameOptions](../modules/_router_.md#routerchangenameoptions)): *Promise‹RouterState›*

*Defined in [packages/reactant-share/src/interfaces.ts:121](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [RouterChangeNameOptions](../modules/_router_.md#routerchangenameoptions) |

**Returns:** *Promise‹RouterState›*

___

###  [syncToClientsName]

▸ **[syncToClientsName]**(`options`: Record‹string, any› | null | undefined): *Promise‹void›*

*Defined in [packages/reactant-share/src/interfaces.ts:122](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/interfaces.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | Record‹string, any› &#124; null &#124; undefined |

**Returns:** *Promise‹void›*
