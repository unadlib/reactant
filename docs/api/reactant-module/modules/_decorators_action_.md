---
id: "_decorators_action_"
title: "@action"
sidebar_label: "@action"
---

## Index

### Variables

* [stagedState](_decorators_action_.md#let-stagedstate)

### Functions

* [action](_decorators_action_.md#const-action)
* [getStagedState](_decorators_action_.md#const-getstagedstate)

## Variables

### `Let` stagedState

• **stagedState**: *Record‹string, unknown› | undefined*

*Defined in [packages/reactant-module/src/decorators/action.ts:6](https://github.com/unadlib/reactant/blob/3c42723/packages/reactant-module/src/decorators/action.ts#L6)*

## Functions

### `Const` action

▸ **action**(`target`: object, `key`: string | symbol, `descriptor`: TypedPropertyDescriptor‹function›): *object*

*Defined in [packages/reactant-module/src/decorators/action.ts:10](https://github.com/unadlib/reactant/blob/3c42723/packages/reactant-module/src/decorators/action.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`key` | string &#124; symbol |
`descriptor` | TypedPropertyDescriptor‹function› |

**Returns:** *object*

* **value**: *value*

___

### `Const` getStagedState

▸ **getStagedState**(): *undefined | object*

*Defined in [packages/reactant-module/src/decorators/action.ts:8](https://github.com/unadlib/reactant/blob/3c42723/packages/reactant-module/src/decorators/action.ts#L8)*

**Returns:** *undefined | object*
