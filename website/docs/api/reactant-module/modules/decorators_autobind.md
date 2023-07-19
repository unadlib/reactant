---
id: "decorators_autobind"
title: "Module: decorators/autobind"
sidebar_label: "decorators/autobind"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### autobind

▸ **autobind**(`target`, `key`, `__namedParameters`): `Object`

## Description

You can use `@autobind` and decorate any class method that binds the instance of the current class as its `this`,
it can also be used with `@action`.

## Example

```ts
class Shop {
  @state
  count = 0;

  list: string[] = [];

  @autobind
  @action
  increase() {
    this.count += 0;
  }

  @autobind
  addGood(text) {
    this.list.push(text);
  }
}

const app = testBed({
  modules: [],
  main: Shop,
});

const { increase, addGood } = app.instance;
increase();
addGood('apple');
expect(app.instance.count).toBe(1);
expect(app.instance.list).toEqual(['apple']);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `__namedParameters` | `TypedPropertyDescriptor`<`any`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configurable` | `undefined` \| `boolean` |
| `enumerable` | `undefined` \| `boolean` |
| `get` | () => `any` |
| `set` | (`setValue`: `unknown`) => `void` |

#### Defined in

[packages/reactant-module/src/decorators/autobind.ts:42](https://github.com/unadlib/reactant/blob/3607db05/packages/reactant-module/src/decorators/autobind.ts#L42)
