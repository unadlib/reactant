---
id: "_client_"
title: "client"
sidebar_label: "client"
---

## Index

### Functions

* [handleClient](_client_.md#const-handleclient)
* [proxyClient](_client_.md#const-proxyclient)

## Functions

### `Const` handleClient

▸ **handleClient**(`__namedParameters`: object): *(Anonymous function)*

*Defined in [packages/reactant-share/src/client.ts:31](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/client.ts#L31)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`app` | App‹any› |
`disposeServer` | undefined &#124; function |
`enablePatchesFilter` | undefined &#124; false &#124; true |
`preloadedState` | undefined &#124; object |
`transport` | undefined &#124; Transport‹[ClientTransport](../interfaces/_interfaces_.clienttransport.md), [ServerTransport](../interfaces/_interfaces_.servertransport.md)› |

**Returns:** *(Anonymous function)*

___

### `Const` proxyClient

▸ **proxyClient**(`__namedParameters`: object): *Promise‹any›*

*Defined in [packages/reactant-share/src/client.ts:13](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/client.ts#L13)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`clientTransport` | undefined &#124; Transport‹[ClientTransport](../interfaces/_interfaces_.clienttransport.md), [ServerTransport](../interfaces/_interfaces_.servertransport.md)› |
`method` | string |
`module` | string |

**Returns:** *Promise‹any›*
