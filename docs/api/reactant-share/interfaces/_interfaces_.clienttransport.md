---
id: "_interfaces_.clienttransport"
title: "ClientTransport"
sidebar_label: "ClientTransport"
---

## Hierarchy

* **ClientTransport**

## Index

### Methods

* [[isClientName]](_interfaces_.clienttransport.md#[isclientname])
* [[loadFullStateActionName]](_interfaces_.clienttransport.md#[loadfullstateactionname])
* [[preloadedStateActionName]](_interfaces_.clienttransport.md#[preloadedstateactionname])
* [[proxyClientActionName]](_interfaces_.clienttransport.md#[proxyclientactionname])
* [[syncRouterName]](_interfaces_.clienttransport.md#[syncroutername])

## Methods

###  [isClientName]

▸ **[isClientName]**(): *Promise‹boolean›*

*Defined in [packages/reactant-share/src/interfaces.ts:103](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L103)*

**Returns:** *Promise‹boolean›*

___

###  [loadFullStateActionName]

▸ **[loadFullStateActionName]**(`sequence`: number): *Promise‹Record‹string, any› | null | undefined›*

*Defined in [packages/reactant-share/src/interfaces.ts:100](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`sequence` | number |

**Returns:** *Promise‹Record‹string, any› | null | undefined›*

___

###  [preloadedStateActionName]

▸ **[preloadedStateActionName]**(): *Promise‹Record‹string, any››*

*Defined in [packages/reactant-share/src/interfaces.ts:99](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L99)*

**Returns:** *Promise‹Record‹string, any››*

___

###  [proxyClientActionName]

▸ **[proxyClientActionName]**(`options`: object): *Promise‹any›*

*Defined in [packages/reactant-share/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L94)*

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`method` | string |
`module` | string |

**Returns:** *Promise‹any›*

___

###  [syncRouterName]

▸ **[syncRouterName]**(): *Promise‹Router["router"]["location"]›*

*Defined in [packages/reactant-share/src/interfaces.ts:104](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L104)*

**Returns:** *Promise‹Router["router"]["location"]›*
