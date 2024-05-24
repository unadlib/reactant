---
id: "decorators_lazy"
title: "Module: decorators/lazy"
sidebar_label: "decorators/lazy"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### getLazyDecorator

▸ **getLazyDecorator**(`getService`): (`serviceIdentifier`: `ServiceIdentifier`<`unknown`\>, `enableCache`: `boolean`) => (`target`: `object`, `key`: `string` \| `symbol`) => `any`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | (`serviceIdentifier`: `ServiceIdentifier`<`unknown`\>, `target?`: `object`) => `unknown` |

#### Returns

`fn`

▸ (`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`) => `any`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`unknown`\> | `undefined` |
| `enableCache` | `boolean` | `true` |

##### Returns

`fn`

▸ (`target`, `key`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |

##### Returns

`any`

#### Defined in

[packages/reactant-di/src/decorators/lazy.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/lazy.ts#L42)
