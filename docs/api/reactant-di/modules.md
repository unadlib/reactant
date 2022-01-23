# reactant-di

## Table of contents

### Classes

- [ModuleRef](classes/ModuleRef.md)
- [Optional](classes/Optional.md)

### Interfaces

- [ClassProvider](interfaces/ClassProvider.md)
- [ContainerConfig](interfaces/ContainerConfig.md)
- [DependencyProviderOption](interfaces/DependencyProviderOption.md)
- [FactoryProvider](interfaces/FactoryProvider.md)
- [Module](interfaces/Module.md)
- [ModuleDecoratorOptions](interfaces/ModuleDecoratorOptions.md)
- [ModuleProvider](interfaces/ModuleProvider.md)
- [ValueProvider](interfaces/ValueProvider.md)

### Type aliases

- [Container](modules.md#container)
- [ContainerOptions](modules.md#containeroptions)
- [DependencyOption](modules.md#dependencyoption)
- [MetaDataKey](modules.md#metadatakey)
- [MetadataMap](modules.md#metadatamap)
- [ModuleOptions](modules.md#moduleoptions)
- [ServiceIdentifier](modules.md#serviceidentifier)
- [ServiceIdentifierOrFunc](modules.md#serviceidentifierorfunc)
- [ServiceIdentifiersMap](modules.md#serviceidentifiersmap)

### Functions

- [bindModules](modules.md#bindmodules)
- [createContainer](modules.md#createcontainer)
- [forwardRef](modules.md#forwardref)
- [getLazyDecorator](modules.md#getlazydecorator)
- [inject](modules.md#inject)
- [injectable](modules.md#injectable)
- [multiInject](modules.md#multiinject)
- [multiOptional](modules.md#multioptional)
- [optional](modules.md#optional)

## Type aliases

### Container

Ƭ **Container**: `interfaces.Container`

#### Defined in

[packages/reactant-di/src/interfaces.ts:13](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L13)

___

### ContainerOptions

Ƭ **ContainerOptions**: `PickByKey`<`interfaces.ContainerOptions`, ``"skipBaseClassChecks"``\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:9](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L9)

___

### DependencyOption

Ƭ **DependencyOption**: [`DependencyProviderOption`](interfaces/DependencyProviderOption.md) \| [`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L35)

___

### MetaDataKey

Ƭ **MetaDataKey**: `ValueType`<typeof `METADATA_KEY`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L76)

___

### MetadataMap

Ƭ **MetadataMap**: `Map`<[`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\>, [`Module`](interfaces/Module.md)<`any`\>\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:24](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L24)

___

### ModuleOptions

Ƭ **ModuleOptions**<`T`\>: [`ValueProvider`](interfaces/ValueProvider.md)<`T`\> \| [`FactoryProvider`](interfaces/FactoryProvider.md)<`T`\> \| [`ClassProvider`](interfaces/ClassProvider.md)<`T`\> \| [`ModuleProvider`](interfaces/ModuleProvider.md)<`T`\> \| [`Module`](interfaces/Module.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L61)

___

### ServiceIdentifier

Ƭ **ServiceIdentifier**<`T`\>: `interfaces.ServiceIdentifier`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:14](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L14)

___

### ServiceIdentifierOrFunc

Ƭ **ServiceIdentifierOrFunc**<`T`\>: [`ServiceIdentifier`](modules.md#serviceidentifier)<`T`\> \| `LazyServiceIdentifer`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L15)

___

### ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**<`T`\>: `Map`<[`ServiceIdentifier`](modules.md#serviceidentifier)<`T`\>, [`ServiceIdentifier`](modules.md#serviceidentifier)<`T`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L19)

## Functions

### bindModules

▸ **bindModules**(`container`, `modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `Container` |
| `modules` | [`ModuleOptions`](modules.md#moduleoptions)<`any`\>[] |

#### Returns

`void`

#### Defined in

[packages/reactant-di/src/createContainer.ts:96](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/createContainer.ts#L96)

___

### createContainer

▸ **createContainer**(`__namedParameters`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ContainerConfig`](interfaces/ContainerConfig.md) |

#### Returns

`Container`

#### Defined in

[packages/reactant-di/src/createContainer.ts:154](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/createContainer.ts#L154)

___

### forwardRef

▸ `Const` **forwardRef**(`callback`): `LazyServiceIdentifer`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => [`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\> |

#### Returns

`LazyServiceIdentifer`<`any`\>

#### Defined in

[packages/reactant-di/src/forwardRef.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/forwardRef.ts#L4)

___

### getLazyDecorator

▸ `Const` **getLazyDecorator**(`getService`): (`serviceIdentifier`: [`ServiceIdentifier`](modules.md#serviceidentifier)<`unknown`\>, `enableCache`: `boolean`) => (`target`: `object`, `key`: `string` \| `symbol`) => `void`

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
| `getService` | (`serviceIdentifier`: [`ServiceIdentifier`](modules.md#serviceidentifier)<`unknown`\>, `target?`: `object`) => `unknown` |

#### Returns

`fn`

▸ (`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`) => `void`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](modules.md#serviceidentifier)<`unknown`\> | `undefined` |
| `enableCache` | `boolean` | `true` |

##### Returns

`fn`

▸ (`target`, `key`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/lazy.ts:41](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/lazy.ts#L41)

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
| `serviceIdentifierOrFunc?` | [`ServiceIdentifierOrFunc`](modules.md#serviceidentifierorfunc)<`any`\> |

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

[packages/reactant-di/src/decorators/inject.ts:51](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/inject.ts#L51)

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
| `options` | [`ModuleDecoratorOptions`](interfaces/ModuleDecoratorOptions.md) |

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

[packages/reactant-di/src/decorators/injectable.ts:84](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/injectable.ts#L84)

___

### multiInject

▸ **multiInject**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/multiInject.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/multiInject.ts#L4)

___

### multiOptional

▸ **multiOptional**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/multiOptional.ts:7](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/multiOptional.ts#L7)

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
| `serviceIdentifier?` | [`ServiceIdentifier`](modules.md#serviceidentifier)<`any`\> |

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

[packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/optional.ts#L47)
