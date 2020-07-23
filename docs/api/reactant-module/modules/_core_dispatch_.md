---
id: "_core_dispatch_"
title: "dispatch()"
sidebar_label: "dispatch()"
---

## Index

### Functions

* [dispatch](_core_dispatch_.md#const-dispatch)

## Functions

### `Const` dispatch

▸ **dispatch**(`target`: [ThisService](_interfaces_.md#thisservice), `action`: Partial‹[ReactantAction](../interfaces/_interfaces_.reactantaction.md)›): *void*

*Defined in [packages/reactant-module/src/core/dispatch.ts:45](https://github.com/unadlib/reactant/blob/a4e402c/packages/reactant-module/src/core/dispatch.ts#L45)*

## Description

It is used for compatibility with redux actions,
when a class state with actions is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `createState()`.

## Example

```ts
const type = 'count_increase';

@injectable()
class Counter {
  @state
  count = createState<number, ReactantAction>((state = 0, action) =>
    action.type === type
      ? action.state[this.name].count
      : state
  );

  increase() {
    dispatch(this, {
      type,
      state: {
        count: this.count + 1,
      },
    });
  }
}

const app = createApp({
  modules: [],
  main: Counter,
  render: () => {},
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

**Parameters:**

Name | Type |
------ | ------ |
`target` | [ThisService](_interfaces_.md#thisservice) |
`action` | Partial‹[ReactantAction](../interfaces/_interfaces_.reactantaction.md)› |

**Returns:** *void*
