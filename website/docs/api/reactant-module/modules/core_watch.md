---
id: "core_watch"
title: "Module: core/watch"
sidebar_label: "core/watch"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### watch

▸ **watch**<`P`, `T`, `R`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

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
| `R` | extends `void` \| `Promise`<`void`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | `ThisService` | Module instance |
| `selector` | `Selector`<`P` extends ``true`` ? [...T[]] : `T`\> | Watched values |
| `watcher` | `Watcher`<`T`, `R`\> | Watch callback with value changes |
| `options?` | `R` extends `Promise`<`void`\> ? `WatcherOptions`<`P`\> & { `awaitPromise?`: `boolean`  } : `WatcherOptions`<`P`\> | Watch options |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:179](https://github.com/unadlib/reactant/blob/3607db05/packages/reactant-module/src/interfaces.ts#L179)
