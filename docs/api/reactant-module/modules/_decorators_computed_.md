---
id: "_decorators_computed_"
title: "@computed"
sidebar_label: "@computed"
---

## Index

### Functions

* [computed](_decorators_computed_.md#const-computed)

## Functions

### `Const` computed

▸ **computed**(`depsCallback`: function): *(Anonymous function)*

*Defined in [packages/reactant-module/src/decorators/computed.ts:25](https://github.com/unadlib/reactant/blob/7dec51d/packages/reactant-module/src/decorators/computed.ts#L25)*

**Description:**

**Example:**

```ts
class Foo {
  @state
  count = 0;

  @state
  list = [];

  @computed(({ count, list }: Foo) => [count, list])
  get number() {
    return this.count + this.list.length;
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
