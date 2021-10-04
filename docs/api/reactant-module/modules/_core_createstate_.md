---
id: "_core_createstate_"
title: "createState()"
sidebar_label: "createState()"
---

▸ **createState**<**S**, **A**>(`reducer`: Reducer‹S, A›): *S*

*Defined in [packages/reactant-module/src/core/createState.ts:45](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-module/src/core/createState.ts#L45)*

## Description

It allows a class state to be defined with a reducer,
which is often used in situations where a class state is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `dispatch()`.

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

▪ **S**

▪ **A**: *Action*

**Parameters:**

Name | Type |
------ | ------ |
`reducer` | Reducer‹S, A› |

**Returns:** *S*
