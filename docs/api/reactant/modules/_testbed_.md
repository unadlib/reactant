---
id: "_testbed_"
title: "testBed()"
sidebar_label: "testBed()"
---

▸ **testBed**<**T**>(`config`: PartialKeys‹[Config](../interfaces/_interfaces_.config.md)‹T›, "render"›): *[App](../interfaces/_interfaces_.app.md)‹T›*

*Defined in [testBed.ts:33](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant/src/testBed.ts#L33)*

## Description

You can use `testBed` to build your test code without `render`(`render` function is optional.).

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

@injectable()
class Foo {
  constructor(public bar: Bar) {}
}

const foo = testBed({
  modules: [{ provide: Bar, useValue: { getValue: () => 'test' } }],
  main: Foo,
});

expect(foo.instance.bar.getValue()).toBe('test');
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`config` | PartialKeys‹[Config](../interfaces/_interfaces_.config.md)‹T›, "render"› |

**Returns:** *[App](../interfaces/_interfaces_.app.md)‹T›*
