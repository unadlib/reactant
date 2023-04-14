---
id: "testBed"
title: "Module: testBed"
sidebar_label: "testBed"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### testBed

▸ **testBed**<`T`, `S`, `R`\>(`config`): `App`<`T`, `S`, `R`\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends `Renderer`<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `PartialKeys`<`Config`<`T`, `S`, `R`\>, ``"render"``\> |

#### Returns

`App`<`T`, `S`, `R`\>

#### Defined in

[testBed.ts:33](https://github.com/unadlib/reactant/blob/d7abf375/packages/reactant/src/testBed.ts#L33)
