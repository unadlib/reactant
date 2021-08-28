---
id: "_decorators_autobind_"
title: "@autobind"
sidebar_label: "@autobind"
---

▸ **autobind**(`target`: object, `key`: string | symbol, `__namedParameters`: object): *object*

*Defined in [packages/reactant-module/src/decorators/autobind.ts:42](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/decorators/autobind.ts#L42)*

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

**Parameters:**

▪ **target**: *object*

▪ **key**: *string | symbol*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`configurable` | undefined &#124; false &#124; true |
`enumerable` | undefined &#124; false &#124; true |
`value` | any |

**Returns:** *object*

* **configurable**: *undefined | false | true*

* **enumerable**: *undefined | false | true*

* **get**(): *any*

* **set**(`setValue`: any): *void*
