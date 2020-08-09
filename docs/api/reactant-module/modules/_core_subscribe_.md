---
id: "_core_subscribe_"
title: "subscribe()"
sidebar_label: "subscribe()"
---

## Index

### Functions

* [subscribe](_core_subscribe_.md#const-subscribe)

## Functions

### `Const` subscribe

▸ **subscribe**(`service`: [Service](../interfaces/_interfaces_.service.md)‹object› & object, `listener`: function): *Unsubscribe*

*Defined in [packages/reactant-module/src/core/subscribe.ts:38](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/subscribe.ts#L38)*

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

**Parameters:**

▪ **service**: *[Service](../interfaces/_interfaces_.service.md)‹object› & object*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *Unsubscribe*
