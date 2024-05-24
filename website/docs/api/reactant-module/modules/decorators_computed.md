---
id: "decorators_computed"
title: "Module: decorators/computed"
sidebar_label: "decorators/computed"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### computed

▸ **computed**(`target`, `key`, `descriptor`): `any`

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

if you want to use `@computed` with non-manually maintained dependencies,
you should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.

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
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:11](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/decorators/computed.ts#L11)

▸ **computed**(`depsCallback`): (`target`: `object`, `key`: `string`, `descriptor`: `TypedPropertyDescriptor`<`any`\>) => `any`

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

if you want to use `@computed` with non-manually maintained dependencies,
you should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.

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

▸ (`target`, `key`, `descriptor`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

##### Returns

`any`

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:17](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-module/src/decorators/computed.ts#L17)
