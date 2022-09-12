---
id: "decorators_optional"
title: "Module: decorators/optional"
sidebar_label: "decorators/optional"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### optional

▸ **optional**(`serviceIdentifier?`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

## Description

You can use `@optional()` to decorate an optionally injected module.

If other modules have no relevant dependency injection or are also optionally injected, the module will not be injected by default unless the injected module is imported in the `modules` parameter.

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
  getValue() {
    return 'foo';
  }
}

@injectable()
class FooBar {
  constructor(@optional() public bar: Bar, @optional('foo') public foo: Foo) {}
}

const fooBar = testBed({
  modules: [
   { provide: 'foo', useClass: Foo },
  ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
expect(fooBar.fooBar.bar).toBeUndefined();
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier?` | `ServiceIdentifier`<`any`\> |

#### Returns

`fn`

▸ (`target`, `key?`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key?` | `string` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/a797b664/packages/reactant-di/src/decorators/optional.ts#L47)
