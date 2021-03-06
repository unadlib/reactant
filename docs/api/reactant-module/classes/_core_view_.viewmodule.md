---
id: "_core_view_.viewmodule"
title: "ViewModule"
sidebar_label: "ViewModule"
---

## Hierarchy

* **ViewModule**

## Implements

* [Service](../interfaces/_interfaces_.service.md)

## Index

### Constructors

* [constructor](_core_view_.viewmodule.md#constructor)

### Properties

* [[storeKey]](_core_view_.viewmodule.md#optional-readonly-[storekey])
* [name](_core_view_.viewmodule.md#optional-name)

### Methods

* [component](_core_view_.viewmodule.md#abstract-component)

## Constructors

###  constructor

\+ **new ViewModule**(): *[ViewModule](_core_view_.viewmodule.md)*

*Defined in [packages/reactant-module/src/core/view.ts:15](https://github.com/unadlib/reactant/blob/52f575c/packages/reactant-module/src/core/view.ts#L15)*

**Returns:** *[ViewModule](_core_view_.viewmodule.md)*

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[[storeKey]](../interfaces/_interfaces_.service.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/52f575c/packages/reactant-module/src/core/view.ts#L8)*

___

### `Optional` name

• **name**? : *undefined | string*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[name](../interfaces/_interfaces_.service.md#optional-name)*

*Defined in [packages/reactant-module/src/core/view.ts:15](https://github.com/unadlib/reactant/blob/52f575c/packages/reactant-module/src/core/view.ts#L15)*

The name field will be used as a key to define the state of this module in the reducers object map in the store.
If it is not defined, then it defaults to a random string.
So in cases where persistence is required, etc., it must be defined, otherwise the issue will appear

## Methods

### `Abstract` component

▸ **component**(`props`: Record‹string, any›): *ReactElement | null*

*Defined in [packages/reactant-module/src/core/view.ts:38](https://github.com/unadlib/reactant/blob/52f575c/packages/reactant-module/src/core/view.ts#L38)*

React function component defined by the current ViewModule

**Parameters:**

Name | Type |
------ | ------ |
`props` | Record‹string, any› |

**Returns:** *ReactElement | null*
