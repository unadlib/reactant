---
id: "decorators_action"
title: "Module: decorators/action"
sidebar_label: "decorators/action"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### action

▸ **action**(`target`, `key`, `descriptor`): `Object`

## Description

`@action` is used to decorate a class method as a action method.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<(...`args`: `any`[]) => `void`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configurable?` | `boolean` |
| `enumerable?` | `boolean` |
| `get?` | () => (...`args`: `any`[]) => `void` |
| `set?` | (`value`: (...`args`: `any`[]) => `void`) => `void` |
| `value` | (`this`: `Service`<`Record`<`string`, `any`\>\>, ...`args`: `unknown`[]) => `void` |
| `writable?` | `boolean` |

#### Defined in

[packages/reactant-module/src/decorators/action.ts:44](https://github.com/unadlib/reactant/blob/a9a6e065/packages/reactant-module/src/decorators/action.ts#L44)

___

### getStagedState

▸ **getStagedState**(): `undefined` \| `Record`<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`<`string`, `unknown`\>

#### Defined in

[packages/reactant-module/src/decorators/action.ts:14](https://github.com/unadlib/reactant/blob/a9a6e065/packages/reactant-module/src/decorators/action.ts#L14)
