---
id: "_hooks_useconnector_"
title: "hooks/useConnector"
sidebar_label: "hooks/useConnector"
---

## Index

### Type aliases

* [ShallowEqual](_hooks_useconnector_.md#shallowequal)

### Functions

* [useConnector](_hooks_useconnector_.md#useconnector)

## Type aliases

###  ShallowEqual

Ƭ **ShallowEqual**: *function*

*Defined in [hooks/useConnector.ts:4](https://github.com/unadlib/reactant/blob/25feacb/packages/reactant/src/hooks/useConnector.ts#L4)*

#### Type declaration:

▸ (`a`: Record‹string, any›, `b`: Record‹string, any›): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Record‹string, any› |
`b` | Record‹string, any› |

## Functions

###  useConnector

▸ **useConnector**<**T**>(`selector`: function, `shallowEqual?`: [ShallowEqual](_hooks_useconnector_.md#shallowequal)): *T*

*Defined in [hooks/useConnector.ts:6](https://github.com/unadlib/reactant/blob/25feacb/packages/reactant/src/hooks/useConnector.ts#L6)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **selector**: *function*

▸ (): *T*

▪`Optional`  **shallowEqual**: *[ShallowEqual](_hooks_useconnector_.md#shallowequal)*

**Returns:** *T*
