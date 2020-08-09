---
id: "_decorators_optional_"
title: "@optional()"
sidebar_label: "@optional()"
---

▸ **optional**(`serviceIdentifier?`: [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›): *(Anonymous function)*

*Defined in [packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-di/src/decorators/optional.ts#L47)*

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

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier?` | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any› |

**Returns:** *(Anonymous function)*
