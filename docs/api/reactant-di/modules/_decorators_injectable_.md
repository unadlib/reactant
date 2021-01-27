---
id: "_decorators_injectable_"
title: "@injectable()"
sidebar_label: "@injectable()"
---

▸ **injectable**(`options`: [ModuleDecoratorOptions](../interfaces/_interfaces_.moduledecoratoroptions.md)): *(Anonymous function)*

*Defined in [packages/reactant-di/src/decorators/injectable.ts:84](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-di/src/decorators/injectable.ts#L84)*

## Description

You can use `@injectable()` to decorate an injectable module, which will also allow `emitDecoratorMetadata` to take effect in the decorated class, so the corresponding `@inject()` is optional.

But if you don't want to use `@injectable()`, then the dependency injection decorator for constructors such as `@inject()` is required, and it must be imported in the corresponding `modules` startup configuration. Therefore, in most cases, it is recommended to use `@injectable()`.

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

class Foo {
  constructor(@inject() public bar: Bar) {}
}

@injectable()
class FooBar {
  constructor(public bar: Bar, public foo: Foo) {}
}

const fooBar = testBed({
  modules: [
   Foo // `Foo` is required, but `Bar` will be injected automatically.
 ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
```

If you use JavaScript, then you can only use `@injectable()` to define the full dependency metadata.

```js
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

@injectable({
  deps: [Bar,  { provide: 'foo' }],
})
class FooBar {
  constructor(bar, foo) {
    this.bar = bar;
    this.foo = foo;
  }
}

const fooBar = testBed({
  modules: [
   Bar,
   { provide: 'foo', useClass: Foo },
 ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
```

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [ModuleDecoratorOptions](../interfaces/_interfaces_.moduledecoratoroptions.md) | {} |

**Returns:** *(Anonymous function)*
