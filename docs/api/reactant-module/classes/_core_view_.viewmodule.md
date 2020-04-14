[reactant-module](../README.md) › [Globals](../globals.md) › ["core/view"](../modules/_core_view_.md) › [ViewModule](_core_view_.viewmodule.md)

# Class: ViewModule

## Hierarchy

* **ViewModule**

## Implements

* [Service](../interfaces/_interfaces_.service.md)

## Index

### Constructors

* [constructor](_core_view_.viewmodule.md#constructor)

### Properties

* [[storeKey]](_core_view_.viewmodule.md#optional-[storekey])
* [name](_core_view_.viewmodule.md#optional-name)

### Methods

* [component](_core_view_.viewmodule.md#abstract-component)

## Constructors

###  constructor

\+ **new ViewModule**(): *[ViewModule](_core_view_.viewmodule.md)*

*Defined in [packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/core/view.ts#L10)*

**Returns:** *[ViewModule](_core_view_.viewmodule.md)*

## Properties

### `Optional` [storeKey]

• **[storeKey]**? : *Store*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[[storeKey]](../interfaces/_interfaces_.service.md#optional-[storekey])*

*Defined in [packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/core/view.ts#L8)*

___

### `Optional` name

• **name**? : *undefined | string*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[name](../interfaces/_interfaces_.service.md#optional-name)*

*Defined in [packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/core/view.ts#L10)*

## Methods

### `Abstract` component

▸ **component**(`props`: Record‹string, any›): *ReactElement | null*

*Defined in [packages/reactant-module/src/core/view.ts:29](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/core/view.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | Record‹string, any› |

**Returns:** *ReactElement | null*
