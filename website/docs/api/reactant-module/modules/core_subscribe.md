---
id: "core_subscribe"
title: "Module: core/subscribe"
sidebar_label: "core/subscribe"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### subscribe

▸ **subscribe**(`service`, `listener`): `Unsubscribe`

## Description

You can use `subscribe` to subscribe to state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    subscribe(this, () => {
      if (this.count === 3) {
        console.log(`new value: ${newValue}`);
      }
    });
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 0;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | `ThisService` | Module instance |
| `listener` | () => `void` | Redux's store subscription |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:147](https://github.com/unadlib/reactant/blob/5d60d9c3/packages/reactant-module/src/interfaces.ts#L147)
