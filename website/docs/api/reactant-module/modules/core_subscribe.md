---
id: "core_subscribe"
title: "Module: core/subscribe"
sidebar_label: "core/subscribe"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### subscribe

▸ **subscribe**<`R`\>(`service`, `listener`, `options?`): `Unsubscribe`

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `void` \| `Promise`<`void`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | `ThisService` | Module instance |
| `listener` | () => `R` | Redux's store subscription |
| `options?` | `R` extends `Promise`<`void`\> ? { `awaitPromise?`: `boolean`  } : `void` | Watch options |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:142](https://github.com/unadlib/reactant/blob/08156165/packages/reactant-module/src/interfaces.ts#L142)
