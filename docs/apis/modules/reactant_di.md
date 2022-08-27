# Module: reactant-di

## Table of contents

### Classes

- [ModuleRef](../classes/reactant_di.ModuleRef.md)
- [Optional](../classes/reactant_di.Optional.md)

### Interfaces

- [ClassProvider](../interfaces/reactant_di.ClassProvider.md)
- [ContainerConfig](../interfaces/reactant_di.ContainerConfig.md)
- [DependencyProviderOption](../interfaces/reactant_di.DependencyProviderOption.md)
- [FactoryProvider](../interfaces/reactant_di.FactoryProvider.md)
- [Module](../interfaces/reactant_di.Module.md)
- [ModuleDecoratorOptions](../interfaces/reactant_di.ModuleDecoratorOptions.md)
- [ModuleProvider](../interfaces/reactant_di.ModuleProvider.md)
- [ValueProvider](../interfaces/reactant_di.ValueProvider.md)

### Type Aliases

- [Container](reactant_di.md#container)
- [ContainerOptions](reactant_di.md#containeroptions)
- [DependencyOption](reactant_di.md#dependencyoption)
- [MetaDataKey](reactant_di.md#metadatakey)
- [MetadataMap](reactant_di.md#metadatamap)
- [ModuleOptions](reactant_di.md#moduleoptions)
- [ServiceIdentifier](reactant_di.md#serviceidentifier)
- [ServiceIdentifierOrFunc](reactant_di.md#serviceidentifierorfunc)
- [ServiceIdentifiersMap](reactant_di.md#serviceidentifiersmap)

### Functions

- [bindModules](reactant_di.md#bindmodules)
- [createContainer](reactant_di.md#createcontainer)
- [forwardRef](reactant_di.md#forwardref)
- [getLazyDecorator](reactant_di.md#getlazydecorator)
- [inject](reactant_di.md#inject)
- [injectable](reactant_di.md#injectable)
- [multiInject](reactant_di.md#multiinject)
- [multiOptional](reactant_di.md#multioptional)
- [optional](reactant_di.md#optional)

## Type Aliases

### Container

Ƭ **Container**: `interfaces.Container`

#### Defined in

[packages/reactant-di/src/interfaces.ts:13](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L13)

___

### ContainerOptions

Ƭ **ContainerOptions**: `PickByKey`<`interfaces.ContainerOptions`, ``"skipBaseClassChecks"``\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:9](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L9)

___

### DependencyOption

Ƭ **DependencyOption**: [`DependencyProviderOption`](../interfaces/reactant_di.DependencyProviderOption.md) \| [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L35)

___

### MetaDataKey

Ƭ **MetaDataKey**: `ValueType`<typeof `METADATA_KEY`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L76)

___

### MetadataMap

Ƭ **MetadataMap**: `Map`<[`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\>, [`Module`](../interfaces/reactant_di.Module.md)<`any`\>\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:24](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L24)

___

### ModuleOptions

Ƭ **ModuleOptions**<`T`\>: [`ValueProvider`](../interfaces/reactant_di.ValueProvider.md)<`T`\> \| [`FactoryProvider`](../interfaces/reactant_di.FactoryProvider.md)<`T`\> \| [`ClassProvider`](../interfaces/reactant_di.ClassProvider.md)<`T`\> \| [`ModuleProvider`](../interfaces/reactant_di.ModuleProvider.md)<`T`\> \| [`Module`](../interfaces/reactant_di.Module.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L61)

___

### ServiceIdentifier

Ƭ **ServiceIdentifier**<`T`\>: `interfaces.ServiceIdentifier`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:14](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L14)

___

### ServiceIdentifierOrFunc

Ƭ **ServiceIdentifierOrFunc**<`T`\>: [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`T`\> \| `LazyServiceIdentifer`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L15)

___

### ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**<`T`\>: `Map`<[`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`T`\>, [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`T`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L19)

## Functions

### bindModules

▸ **bindModules**(`container`, `modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `Container` |
| `modules` | [`ModuleOptions`](reactant_di.md#moduleoptions)<`any`\>[] |

#### Returns

`void`

#### Defined in

[packages/reactant-di/src/createContainer.ts:96](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/createContainer.ts#L96)

___

### createContainer

▸ **createContainer**(`__namedParameters`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ContainerConfig`](../interfaces/reactant_di.ContainerConfig.md) |

#### Returns

`Container`

#### Defined in

[packages/reactant-di/src/createContainer.ts:154](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/createContainer.ts#L154)

___

### forwardRef

▸ **forwardRef**(`callback`): `LazyServiceIdentifer`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\> |

#### Returns

`LazyServiceIdentifer`<`any`\>

#### Defined in

[packages/reactant-di/src/forwardRef.ts:4](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/forwardRef.ts#L4)

___

### getLazyDecorator

▸ **getLazyDecorator**(`getService`): (`serviceIdentifier`: [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`unknown`\>, `enableCache`: `boolean`) => (`target`: `object`, `key`: `string` \| `symbol`) => `any`

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
| `getService` | (`serviceIdentifier`: [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`unknown`\>, `target?`: `object`) => `unknown` |

#### Returns

`fn`

▸ (`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`) => `any`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`unknown`\> | `undefined` |
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

[packages/reactant-di/src/decorators/lazy.ts:41](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/lazy.ts#L41)

___

### inject

▸ **inject**(`serviceIdentifierOrFunc?`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

## Description

You can use `@inject()` to perform the required dependency injection module to decorate in the constructor of an injectable class.

If the default is a dependency injection of the class itself as a type, e.g. `@inject(Foo) foo: Foo`, then it is exactly the same as `foo: Foo`.

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
  constructor(@inject() public bar: Bar, @inject('foo') public foo: Foo) {}
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

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifierOrFunc?` | [`ServiceIdentifierOrFunc`](reactant_di.md#serviceidentifierorfunc)<`any`\> |

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

[packages/reactant-di/src/decorators/inject.ts:51](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/inject.ts#L51)

___

### injectable

▸ **injectable**(`options?`): (`target`: `any`) => `any`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ModuleDecoratorOptions`](../interfaces/reactant_di.ModuleDecoratorOptions.md) |

#### Returns

`fn`

▸ (`target`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |

##### Returns

`any`

#### Defined in

[packages/reactant-di/src/decorators/injectable.ts:84](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/injectable.ts#L84)

___

### multiInject

▸ **multiInject**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/multiInject.ts:4](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/multiInject.ts#L4)

___

### multiOptional

▸ **multiOptional**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/multiOptional.ts:7](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/multiOptional.ts#L7)

___

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
| `serviceIdentifier?` | [`ServiceIdentifier`](reactant_di.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/decorators/optional.ts#L47)
