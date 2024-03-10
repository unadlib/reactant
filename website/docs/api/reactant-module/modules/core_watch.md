---
id: "core_watch"
title: "Module: core/watch"
sidebar_label: "core/watch"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### watch

▸ **watch**<`P`, `T`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

## Description

You can use `watch` to observe a specific state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    watch(this, () => this.count, (newValue) => {
      if (newValue === 3) {
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
| `P` | extends `boolean` |
| `T` | extends `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | `ThisService` | Module instance |
| `selector` | `Selector`<`P` extends ``true`` ? readonly [`T`] \| [...T[]] : `T`\> | Watched values |
| `watcher` | `Watcher`<`T`\> | Watch callback with value changes |
| `options?` | `Object` | Watch options |
| `options.isEqual?` | (`x`: `unknown`, `y`: `unknown`) => `boolean` | - |
| `options.multiple?` | `P` | Use multiple values watching |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:162](https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-module/src/interfaces.ts#L162)
