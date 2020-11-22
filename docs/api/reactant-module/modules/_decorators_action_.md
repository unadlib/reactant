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

*Defined in [packages/reactant-module/src/decorators/action.ts:11](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/decorators/action.ts#L11)*

## Functions

### `Const` action

▸ **action**(`target`: object, `key`: string, `descriptor`: TypedPropertyDescriptor‹function›): *object*

*Defined in [packages/reactant-module/src/decorators/action.ts:43](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/decorators/action.ts#L43)*

## Description

`@action` is used to decorate a class method as a action method.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`key` | string |
`descriptor` | TypedPropertyDescriptor‹function› |

**Returns:** *object*

* **value**: *value*

___

### `Const` getStagedState

▸ **getStagedState**(): *undefined | object*

*Defined in [packages/reactant-module/src/decorators/action.ts:13](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/decorators/action.ts#L13)*

**Returns:** *undefined | object*
