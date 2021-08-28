---
id: "_decorators_proxify_"
title: "@proxify"
sidebar_label: "@proxify"
---

## Index

### Functions

* [proxify](_decorators_proxify_.md#const-proxify)

## Functions

### `Const` proxify

▸ **proxify**(`target`: object, `key`: string, `descriptor`: TypedPropertyDescriptor‹function›): *object*

*Defined in [packages/reactant-share/src/decorators/proxify.ts:11](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-share/src/decorators/proxify.ts#L11)*

proxify

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
