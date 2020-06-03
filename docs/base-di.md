---
id: base-di
title: Basic Dependency Injection
---

Reactant provides dependency injection, which supports TypeScript(also supports JavaScript), and we recommend the `experimentalDecorators` feature based on TypeScript, as well as `Reflect.metadata` to record the dependency injection metadata.

To enable experimental support for decorators, you must enable the experimentalDecorators compiler option either on the command line or in your tsconfig.json:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## @injectable()

Use `@injectable()`, Reactant to turn the current module into an injectable module.

```ts
@injectable()
class Foo {}

@injectable()
class Bar {
  constructor(public foo: Foo) {}
}
```

> If it does not depend on any other module, in fact, the `@injectable()` modifier of the current module can be omitted, and Reactant turns it into an injectable module and injects it automatically when the `createApp` runs.

### @injectable() for JavaScript

Since JavaScript has no better features to support the handling of dependency injections similar to TypeScript decorators, using Reactant's dependency injections in JavaScript can only be done using `@injectable()` with the information of the dependency injection.

```js
@injectable()
class Foo {}

@injectable({
  deps: [Foo],
})
class Bar {
  constructor(foo) {}
}
```

See [@injectable()](api/reactant-di/modules/_decorators_injectable_.md) API doc for more information.

> Be sure to install `@babel/plugin-propose-decorators` and configure the babel settings correctly.

## @inject()

Use `@inject()` and bring its corresponding identifier parameter as dependency injection management.

```ts
interface Bar {
  text: string
}

@injectable()
class Foo {
  constructor(@inject('Bar') public bar: Bar) {}

  get text() {
    return this.bar.text;
  }
}
```

> It does NOT support JavaScript, and the equivalent is written as:

```js
@injectable({
  deps: [{ provide: 'Bar' }],
})
class Foo {
  constructor(bar) {
    this.bar = bar;
  }

  get text() {
    return this.bar.text;
  }
}
```

## @optional()

Use `optional()` with a dependency identifier that you can use to inject an optional module.

> If you only need yourself as a dependency identifier, then you can abbreviate `@optional(Bar) public bar?: Bar` to `@optional() public bar?: Bar`.

```ts
interface Bar {
  text: string
}

@injectable()
class Foo {
  constructor(@optional('Bar') public bar?: Bar) {}

  get text() {
    return this.bar?.text;
  }
}
```

> It does NOT support JavaScript, and the equivalent is written as:

```js
@injectable({
  deps: [{ provide: 'Bar', optional: true }],
})
class Foo {
  constructor(bar) {
    this.bar = bar;
  }

  get text() {
    return this.bar === null || this.bar === undefined ? undefined : this.bar.text;
  }
}
```
