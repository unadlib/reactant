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

▸ **dispatch**<**T**>(`target`: [ThisService](_interfaces_.md#thisservice), `action`: T): *void*

*Defined in [packages/reactant-module/src/core/dispatch.ts:47](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-module/src/core/dispatch.ts#L47)*

## Description

It is used for compatibility with redux actions,
when a class state with actions is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `createState()`.

## Example

```ts
const type = 'count_increase';

interface CountAction {
 type: typeof type;
 state: number;
}

@injectable()
class Counter {
 @state
 count = createState<CountAction['state'], CountAction>(
   ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 );

 increase() {
   dispatch<CountAction>(this, {
     type,
     state: this.count + 1,
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

**Type parameters:**

▪ **T**: *AnyAction*

**Parameters:**

Name | Type |
------ | ------ |
`target` | [ThisService](_interfaces_.md#thisservice) |
`action` | T |

**Returns:** *void*
