---
id: "decorators_state"
title: "Module: decorators/state"
sidebar_label: "decorators/state"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### state

▸ **state**(`target`, `key`, `descriptor?`): `void`

## Description

`@state` is used to decorate a class property as a state field.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;
}

const app = testBed({
  modules: [],
  main: Counter,
});

expect(app.instance.count).toBe(0);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | `PropertyDescriptor`<`any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/state.ts:26](https://github.com/unadlib/reactant/blob/5cb51d4e/packages/reactant-module/src/decorators/state.ts#L26)
