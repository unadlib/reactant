---
id: "_decorators_computed_"
title: "@computed()"
sidebar_label: "@computed()"
---

## Index

### Functions

* [computed](_decorators_computed_.md#const-computed)

## Functions

### `Const` computed

▸ **computed**(`depsCallback`: function): *(Anonymous function)*

*Defined in [packages/reactant-module/src/decorators/computed.ts:28](https://github.com/unadlib/reactant/blob/52f575c/packages/reactant-module/src/decorators/computed.ts#L28)*

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

## Example

```ts
class Shop {
  @state
  fruits = [];

  @state
  vegetables = [];

  @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
  get sum() {
    return this.fruits.length + this.vegetables.length;
  }
}
```

**Parameters:**

▪ **depsCallback**: *function*

▸ (`instance`: any): *any[]*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *(Anonymous function)*
