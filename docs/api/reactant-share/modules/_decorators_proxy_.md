---
id: "_decorators_proxy_"
title: "@proxy"
sidebar_label: "@proxy"
---

## Index

### Functions

* [proxy](_decorators_proxy_.md#const-proxy)

## Functions

### `Const` proxy

▸ **proxy**(`target`: object, `key`: string, `descriptor`: TypedPropertyDescriptor‹function›): *object*

*Defined in [packages/reactant-share/src/decorators/proxy.ts:11](https://github.com/unadlib/reactant/blob/a089af11/packages/reactant-share/src/decorators/proxy.ts#L11)*

proxy

It is used to turn a method into a proxied method.
The execution of the decorated method in the client will be proxied by the same method in the server by the associated parameters.

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`key` | string |
`descriptor` | TypedPropertyDescriptor‹function› |

**Returns:** *object*

* **value**: *value*
