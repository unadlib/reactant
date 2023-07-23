---
id: "decorators_computed"
title: "Module: decorators/computed"
sidebar_label: "decorators/computed"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### computed

▸ **computed**(`depsCallback`): (`target`: `object`, `key`: `string`, `descriptor`: `TypedPropertyDescriptor`<`any`\>) => { `configurable?`: `boolean` ; `enumerable?`: `boolean` ; `set?`: (`value`: `any`) => `void` ; `value?`: `any` ; `writable?`: `boolean` ; `get`: (`this`: `Service`<`Record`<`string`, `any`\>\>) => `any`  }

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `depsCallback` | (`instance`: `any`) => `any`[] |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configurable?` | `boolean` |
| `enumerable?` | `boolean` |
| `set?` | (`value`: `any`) => `void` |
| `value?` | `any` |
| `writable?` | `boolean` |
| `get` | (`this`: `Service`<`Record`<`string`, `any`\>\>) => `any` |

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:29](https://github.com/unadlib/reactant/blob/3940d734/packages/reactant-module/src/decorators/computed.ts#L29)
