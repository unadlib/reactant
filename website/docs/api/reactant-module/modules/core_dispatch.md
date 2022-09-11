---
id: "core_dispatch"
title: "Module: core/dispatch"
sidebar_label: "core/dispatch"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### dispatch

▸ **dispatch**<`T`\>(`target`, `action`): `void`

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AnyAction`<`T`\> = `AnyAction` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `ThisService` |
| `action` | `T` |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/core/dispatch.ts:47](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-module/src/core/dispatch.ts#L47)
