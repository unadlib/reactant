---
id: "_decorators_lazy_"
title: "decorators/lazy"
sidebar_label: "decorators/lazy"
---

## Index

### Functions

* [getLazyDecorator](_decorators_lazy_.md#const-getlazydecorator)

## Functions

### `Const` getLazyDecorator

▸ **getLazyDecorator**(`getService`: function): *(Anonymous function)*

*Defined in [packages/reactant-di/src/decorators/lazy.ts:41](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-di/src/decorators/lazy.ts#L41)*

## Description

You can get a decorator `@lazy(serviceIdentifier)` with `getLazyDecorator((serviceIdentifier) => container.get(serviceIdentifier))`,
and use it on any one dependency property that you need to lazily get.

## Example

```ts
let container: Container;
const lazy = getLazyDecorator((serviceIdentifier) =>
  container.get(serviceIdentifier)
);

@injectable()
class Foo {
  public get test() {
    return 'test';
  }
}

@injectable()
class Bar {
  @lazy('foo')
  foo?: Foo;
}

container = createContainer({
  ServiceIdentifiers: new Map(),
});

const bar = container.get(Bar);

container.bind('foo').to(Foo);
expect(bar.foo?.test).toBe('test');
```

**Parameters:**

▪ **getService**: *function*

▸ (`serviceIdentifier`: [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹unknown›, `target?`: undefined | object): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹unknown› |
`target?` | undefined &#124; object |

**Returns:** *(Anonymous function)*
