# reactant-ssr

## Table of contents

### Classes

- [AppView](classes/AppView.md)
- [ModuleRef](classes/ModuleRef.md)
- [Optional](classes/Optional.md)
- [PluginModule](classes/PluginModule.md)
- [ViewModule](classes/ViewModule.md)

### Interfaces

- [App](interfaces/App.md)
- [ClassProvider](interfaces/ClassProvider.md)
- [Config](interfaces/Config.md)
- [DevOptions](interfaces/DevOptions.md)
- [FactoryProvider](interfaces/FactoryProvider.md)
- [LoadOptions](interfaces/LoadOptions.md)
- [ModuleDecoratorOptions](interfaces/ModuleDecoratorOptions.md)
- [ModuleProvider](interfaces/ModuleProvider.md)
- [PropertyDescriptor](interfaces/PropertyDescriptor.md)
- [ReactantAction](interfaces/ReactantAction.md)
- [Service](interfaces/Service.md)
- [ValueProvider](interfaces/ValueProvider.md)

### Type aliases

- [Container](modules.md#container)
- [ContainerOptions](modules.md#containeroptions)
- [FirstParameter](modules.md#firstparameter)
- [HandlePlugin](modules.md#handleplugin)
- [ImportClass](modules.md#importclass)
- [ImportType](modules.md#importtype)
- [Load](modules.md#load)
- [Loader](modules.md#loader)
- [ModuleOptions](modules.md#moduleoptions)
- [ModulesMap](modules.md#modulesmap)
- [PartialKeys](modules.md#partialkeys)
- [PartialRequired](modules.md#partialrequired)
- [PickOptional](modules.md#pickoptional)
- [PluginHooks](modules.md#pluginhooks)
- [ReactModuleOptions](modules.md#reactmoduleoptions)
- [ReactantMiddleware](modules.md#reactantmiddleware)
- [ReactantStore](modules.md#reactantstore)
- [ReduxDevToolsOptions](modules.md#reduxdevtoolsoptions)
- [ServiceIdentifiersMap](modules.md#serviceidentifiersmap)
- [ShallowEqual](modules.md#shallowequal)
- [StateMapObject](modules.md#statemapobject)
- [StateService](modules.md#stateservice)
- [Subscribe](modules.md#subscribe)
- [Subscriptions](modules.md#subscriptions)
- [ThisService](modules.md#thisservice)
- [TypePreloadedState](modules.md#typepreloadedstate)
- [Watch](modules.md#watch)

### Variables

- [actionIdentifier](modules.md#actionidentifier)
- [containerKey](modules.md#containerkey)
- [enablePatchesKey](modules.md#enablepatcheskey)
- [identifierKey](modules.md#identifierkey)
- [loaderKey](modules.md#loaderkey)
- [modulesKey](modules.md#moduleskey)
- [nameKey](modules.md#namekey)
- [stateKey](modules.md#statekey)
- [storeKey](modules.md#storekey)
- [subscriptionsKey](modules.md#subscriptionskey)

### Functions

- [action](modules.md#action)
- [applyMiddleware](modules.md#applymiddleware)
- [areShallowEqualWithArray](modules.md#areshallowequalwitharray)
- [areShallowEqualWithObject](modules.md#areshallowequalwithobject)
- [assign](modules.md#assign)
- [autobind](modules.md#autobind)
- [batch](modules.md#batch)
- [bindModules](modules.md#bindmodules)
- [compose](modules.md#compose)
- [computed](modules.md#computed)
- [createApp](modules.md#createapp)
- [createContainer](modules.md#createcontainer)
- [createSelectorWithArray](modules.md#createselectorwitharray)
- [createServerApp](modules.md#createserverapp)
- [createState](modules.md#createstate)
- [createStore](modules.md#createstore)
- [defaultMemoize](modules.md#defaultmemoize)
- [defaultProps](modules.md#defaultprops)
- [dispatch](modules.md#dispatch)
- [forwardRef](modules.md#forwardref)
- [getComposeEnhancers](modules.md#getcomposeenhancers)
- [getLazyDecorator](modules.md#getlazydecorator)
- [getStageName](modules.md#getstagename)
- [getStagedState](modules.md#getstagedstate)
- [handlePlugin](modules.md#handleplugin)
- [inject](modules.md#inject)
- [injectable](modules.md#injectable)
- [isEqual](modules.md#isequal)
- [isEqualExceptFunction](modules.md#isequalexceptfunction)
- [lazy](modules.md#lazy)
- [load](modules.md#load)
- [multiInject](modules.md#multiinject)
- [multiOptional](modules.md#multioptional)
- [optional](modules.md#optional)
- [perform](modules.md#perform)
- [state](modules.md#state)
- [subscribe](modules.md#subscribe)
- [testBed](modules.md#testbed)
- [useConnector](modules.md#useconnector)
- [watch](modules.md#watch)

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

### FirstParameter

Ƭ **FirstParameter**<`T`\>: `T` extends (`param`: infer P, ...`args`: `any`[]) => `any` ? `P` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:85](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L85)

___

### HandlePlugin

Ƭ **HandlePlugin**<`T`\>: (`service`: `T`, `pluginHooks`: [`PluginHooks`](modules.md#pluginhooks)) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`service`, `pluginHooks`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `T` |
| `pluginHooks` | [`PluginHooks`](modules.md#pluginhooks) |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L98)

___

### ImportClass

Ƭ **ImportClass**<`T`, `K`\>: `T` extends `Record`<`K`, infer S\> ? `S` extends (...`args`: `any`[]) => infer R ? `R` : `never` : `never`

It's used to infer the type of `import()` class type
or use `import type` in TypeScript 3.8+

**`example`**
// counter.ts: `export class Counter {}`
type Counter = ImportClass<typeof import('./counter'), 'Counter'>;

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:212](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L212)

___

### ImportType

Ƭ **ImportType**<`T`, `K`\>: `T` extends `Record`<`K`, infer R\> ? `R` : `never`

It's used to infer the type of `import()` type

**`example`**
// counter.ts: `export const list = [''];`
type List = ImportType<typeof import('./counter'), 'list'>;

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:200](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L200)

___

### Load

Ƭ **Load**: (`service`: [`ThisService`](modules.md#thisservice), `loadModules`: [`ReactModuleOptions`](modules.md#reactmoduleoptions)[]) => `Promise`<[`Container`](modules.md#container)\>

#### Type declaration

▸ (`service`, `loadModules`): `Promise`<[`Container`](modules.md#container)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) |
| `loadModules` | [`ReactModuleOptions`](modules.md#reactmoduleoptions)[] |

##### Returns

`Promise`<[`Container`](modules.md#container)\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:156](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L156)

___

### Loader

Ƭ **Loader**: (`loadModules`: [`ReactModuleOptions`](modules.md#reactmoduleoptions)[], `beforeReplaceReducer?`: (`container`: [`Container`](modules.md#container)) => `void`) => `void`

#### Type declaration

▸ (`loadModules`, `beforeReplaceReducer?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `loadModules` | [`ReactModuleOptions`](modules.md#reactmoduleoptions)[] |
| `beforeReplaceReducer?` | (`container`: [`Container`](modules.md#container)) => `void` |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/interfaces.ts:151](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L151)

___

### ModuleOptions

Ƭ **ModuleOptions**<`T`\>: [`ValueProvider`](interfaces/ValueProvider.md)<`T`\> \| [`FactoryProvider`](interfaces/FactoryProvider.md)<`T`\> \| [`ClassProvider`](interfaces/ClassProvider.md)<`T`\> \| [`ModuleProvider`](interfaces/ModuleProvider.md)<`T`\> \| `Module`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L61)

___

### ModulesMap

Ƭ **ModulesMap**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:83](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L83)

___

### PartialKeys

Ƭ **PartialKeys**<`T`, `K`\>: `Pick`<`T`, `Exclude`<keyof `T`, `K`\>\> & `Partial`<`Pick`<`T`, `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:190](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L190)

___

### PartialRequired

Ƭ **PartialRequired**<`T`, `K`\>: `Required`<`Pick`<`T`, `K`\>\> & `Pick`<`T`, `Exclude`<keyof `T`, `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:174](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L174)

___

### PickOptional

Ƭ **PickOptional**<`T`\>: `Pick`<`ExcludeRequired`<`T`\>, `OptionalKeyOf`<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:188](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L188)

___

### PluginHooks

Ƭ **PluginHooks**: `Collection`<[`PluginModule`](classes/PluginModule.md)\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:96](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L96)

___

### ReactModuleOptions

Ƭ **ReactModuleOptions**<`T`\>: [`ModuleOptions`](modules.md#moduleoptions)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:60](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L60)

___

### ReactantMiddleware

Ƭ **ReactantMiddleware**: `Middleware`

#### Defined in

[packages/reactant-module/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L66)

___

### ReactantStore

Ƭ **ReactantStore**: `Store`<`any`, `AnyAction`\> & { `reducers?`: `ReducersMapObject`  }

#### Defined in

[packages/reactant-module/src/interfaces.ts:62](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L62)

___

### ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: `Pick`<`EnhancerOptions`, `Exclude`<keyof `EnhancerOptions`, ``"actionSanitizer"`` \| ``"serialize"``\>\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:38](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L38)

___

### ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**<`T`\>: `Map`<`ServiceIdentifier`<`T`\>, `ServiceIdentifier`<`T`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/interfaces.ts#L19)

___

### ShallowEqual

Ƭ **ShallowEqual**: (`a`: `Record`<`string`, `any`\>, `b`: `Record`<`string`, `any`\>) => `boolean`

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Record`<`string`, `any`\> |
| `b` | `Record`<`string`, `any`\> |

##### Returns

`boolean`

#### Defined in

[packages/reactant/src/interfaces.ts:47](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L47)

___

### StateMapObject

Ƭ **StateMapObject**<`T`\>: { [P in keyof T]: T[P] extends Function ? FirstParameter<T[P]\> : never }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `Function`\> |

#### Defined in

[packages/reactant-module/src/interfaces.ts:77](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L77)

___

### StateService

Ƭ **StateService**<`T`\>: [`Service`](interfaces/Service.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:161](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L161)

___

### Subscribe

Ƭ **Subscribe**: (`service`: [`ThisService`](modules.md#thisservice), `listener`: () => `void`) => `Unsubscribe`

#### Type declaration

▸ (`service`, `listener`): `Unsubscribe`

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) |
| `listener` | () => `void` |

##### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:103](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L103)

___

### Subscriptions

Ƭ **Subscriptions**: () => `void`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:45](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L45)

___

### ThisService

Ƭ **ThisService**: [`Service`](interfaces/Service.md) & { [P: string]: `any`;  }

#### Defined in

[packages/reactant-module/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L58)

___

### TypePreloadedState

Ƭ **TypePreloadedState**<`T`\>: `PreloadedState`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:43](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L43)

___

### Watch

Ƭ **Watch**: <P, T\>(`service`: [`ThisService`](modules.md#thisservice), `selector`: `Selector`<`P` extends ``true`` ? [...T] : `T`\>, `watcher`: `Watcher`<`T`\>, `options?`: { `multiple?`: `P` ; `isEqual?`: (`x`: `unknown`, `y`: `unknown`) => `boolean`  }) => `Unsubscribe`

#### Type declaration

▸ <`P`, `T`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` |
| `T` | extends `P` extends ``true`` ? `any`[] : `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) | - |
| `selector` | `Selector`<`P` extends ``true`` ? [...T] : `T`\> | - |
| `watcher` | `Watcher`<`T`\> | - |
| `options?` | `Object` | - |
| `options.multiple?` | `P` | Use multiple values watching |
| `options.isEqual?` | (`x`: `unknown`, `y`: `unknown`) => `boolean` | - |

##### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/interfaces.ts#L118)

## Variables

### actionIdentifier

• **actionIdentifier**: ``"REACTANT_ACTION"``

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:6](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L6)

___

### containerKey

• **containerKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/moduleKeys.ts#L1)

___

### enablePatchesKey

• **enablePatchesKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:5](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L5)

___

### identifierKey

• **identifierKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:2](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/moduleKeys.ts#L2)

___

### loaderKey

• **loaderKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:2](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L2)

___

### modulesKey

• **modulesKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/moduleKeys.ts#L3)

___

### nameKey

• **nameKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/moduleKeys.ts#L4)

___

### stateKey

• **stateKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L4)

___

### storeKey

• **storeKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L1)

___

### subscriptionsKey

• **subscriptionsKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/constants/reduxKeys.ts#L3)

## Functions

### action

▸ `Const` **action**(`target`, `key`, `descriptor`): `Object`

## Description

`@action` is used to decorate a class method as a action method.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<(...`args`: `any`[]) => `void`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `value` | (...`args`: `unknown`[]) => `void` |

#### Defined in

[packages/reactant-module/src/decorators/action.ts:43](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/action.ts#L43)

___

### applyMiddleware

▸ `Const` **applyMiddleware**(...`args`): typeof `__class`

## Description
Apply middlewares for Redux.

## Example

```ts
import logger from 'redux-logger';

@injectable()
class Foo {}

const app = createApp({
  modules: [applyMiddleware(logger)],
  main: Foo,
  render: () => () => {},
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>[] | middlewares for Redux |

#### Returns

typeof `__class`

#### Defined in

[packages/reactant-module/src/core/applyMiddleware.ts:30](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/applyMiddleware.ts#L30)

___

### areShallowEqualWithArray

▸ **areShallowEqualWithArray**(`prev`, `next`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prev` | ``null`` \| `IArguments` \| `any`[] |
| `next` | ``null`` \| `IArguments` \| `any`[] |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:43](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/isEqual.ts#L43)

___

### areShallowEqualWithObject

▸ `Const` **areShallowEqualWithObject**(`objA`, `objB`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objA` | `any` |
| `objB` | `any` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:14](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/isEqual.ts#L14)

___

### assign

▸ **assign**(`target`, `key`, `value`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `value` | `any` |
| `options?` | `object` |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/utils/assign.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/assign.ts#L1)

___

### autobind

▸ **autobind**(`target`, `key`, `__namedParameters`): `Object`

## Description

You can use `@autobind` and decorate any class method that binds the instance of the current class as its `this`,
it can also be used with `@action`.

## Example

```ts
class Shop {
  @state
  count = 0;

  list: string[] = [];

  @autobind
  @action
  increase() {
    this.count += 0;
  }

  @autobind
  addGood(text) {
    this.list.push(text);
  }
}

const app = testBed({
  modules: [],
  main: Shop,
});

const { increase, addGood } = app.instance;
increase();
addGood('apple');
expect(app.instance.count).toBe(1);
expect(app.instance.list).toEqual(['apple']);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `__namedParameters` | `TypedPropertyDescriptor`<`any`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configurable` | `undefined` \| `boolean` |
| `enumerable` | `undefined` \| `boolean` |
| `get` | () => `any` |
| `set` | (`setValue`: `any`) => `void` |

#### Defined in

[packages/reactant-module/src/decorators/autobind.ts:42](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/autobind.ts#L42)

___

### batch

▸ `Const` **batch**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

#### Returns

`void`

#### Defined in

[packages/reactant/src/batch.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/batch.ts#L3)

___

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

### compose

▸ `Const` **compose**(): <R\>(`a`: `R`) => `R`

#### Returns

`fn`

▸ <`R`\>(`a`): `R`

Composes single-argument functions from right to left. The rightmost
function can take multiple arguments as it provides the signature for the
resulting composite function.

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `R` |

##### Returns

`R`

R function obtained by composing the argument functions from right
  to left. For example, `compose(f, g, h)` is identical to doing
  `(...args) => f(g(h(...args)))`.

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`F`\>(`f`): `F`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends `Function` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `F` |

#### Returns

`F`

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `R`\>(`f1`, `f2`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `T1`, `R`\>(`f1`, `f2`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `T1`, `T2`, `R`\>(`f1`, `f2`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `R`\>(`f1`, `f2`, `f3`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `T1`, `R`\>(`f1`, `f2`, `f3`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `T1`, `T2`, `R`\>(`f1`, `f2`, `f3`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`, `f3`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `C`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `C`, `T1`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `C`, `T1`, `T2`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`A`, `B`, `C`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`R`\>(`f1`, ...`funcs`): (...`args`: `any`[]) => `R`

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `any`) => `R` |
| `...funcs` | `Function`[] |

#### Returns

`fn`

▸ (...`args`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`R`

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

▸ `Const` **compose**<`R`\>(...`funcs`): (...`args`: `any`[]) => `R`

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...funcs` | `Function`[] |

#### Returns

`fn`

▸ (...`args`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`R`

#### Defined in

[packages/reactant-module/src/utils/compose.ts:3](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/compose.ts#L3)

___

### computed

▸ `Const` **computed**(`depsCallback`): (`target`: `object`, `key`: `string`, `descriptor`: `TypedPropertyDescriptor`<`any`\>) => { `get`: () => `any`  }

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

## Example

```ts
class Shop {
  @state
  fruits = [];

  @state
  vegetables = [];

  @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
  get sum() {
    return this.fruits.length + this.vegetables.length;
  }
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `depsCallback` | (`instance`: `any`) => `any`[] |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `get` | () => `any` |

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:28](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/computed.ts#L28)

___

### createApp

▸ **createApp**<`T`\>(`__namedParameters`): [`App`](interfaces/App.md)<`T`\>

## Description

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
import { createApp, injectable } from 'reactant';

@injectable()
class Foo {}

const app = createApp({
  modules: [],
  main: Foo,
  render: () => () => {},
});

expect(app.instance instanceof Foo).toBeTruthy();
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`Config`](interfaces/Config.md)<`T`\> |

#### Returns

[`App`](interfaces/App.md)<`T`\>

#### Defined in

[packages/reactant/src/createApp.tsx:40](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/createApp.tsx#L40)

___

### createContainer

▸ **createContainer**(`__namedParameters`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ContainerConfig` |

#### Returns

`Container`

#### Defined in

[packages/reactant-di/src/createContainer.ts:154](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/createContainer.ts#L154)

___

### createSelectorWithArray

▸ `Const` **createSelectorWithArray**(`dependenciesFunc`, `resultFunc`): () => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependenciesFunc` | (`that`: `any`) => `any`[] |
| `resultFunc` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (): `any`

##### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/selector.ts:38](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/selector.ts#L38)

___

### createServerApp

▸ `Const` **createServerApp**(`options`): `ServerApp`

create a ServerApp for SSR

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ServerConfig` |

#### Returns

`ServerApp`

#### Defined in

[packages/reactant-ssr/src/createServerApp.tsx:10](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-ssr/src/createServerApp.tsx#L10)

___

### createState

▸ **createState**<`S`, `A`\>(`reducer`): `S`

## Description

It allows a class state to be defined with a reducer,
which is often used in situations where a class state is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `dispatch()`.

## Example

```ts
const type = 'count_increase';

interface CountAction {
 type: typeof type;
 state: number;
}

@injectable()
class Counter {
 @state
 count = createState<CountAction['state'], CountAction>(
   ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 );

 increase() {
   dispatch<CountAction>(this, {
     type,
     state: this.count + 1,
   });
 }
}

const app = createApp({
  modules: [],
  main: Counter,
  render: () => () => {},
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `any` |
| `A` | extends `Action`<`any`, `A`\> = `AnyAction` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | `Reducer`<`S`, `A`\> |

#### Returns

`S`

#### Defined in

[packages/reactant-module/src/core/createState.ts:45](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/createState.ts#L45)

___

### createStore

▸ **createStore**<`T`\>(`modules`, `container`, `ServiceIdentifiers`, `loadedModules`, `load`, `pluginHooks`, `preloadedState?`, `devOptions?`, `originalStore?`, `beforeReplaceReducer?`, `modulesMap?`): [`ReactantStore`](modules.md#reactantstore)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `modules` | [`ModuleOptions`](modules.md#moduleoptions)<`any`\>[] |
| `container` | `Container` |
| `ServiceIdentifiers` | [`ServiceIdentifiersMap`](modules.md#serviceidentifiersmap)<`any`\> |
| `loadedModules` | `Set`<`any`\> |
| `load` | (...`args`: [loadModules: ReactModuleOptions<any\>[], beforeReplaceReducer?: Function]) => `void` |
| `pluginHooks` | [`PluginHooks`](modules.md#pluginhooks) |
| `preloadedState?` | `PreloadedState`<`T`\> |
| `devOptions` | [`DevOptions`](interfaces/DevOptions.md) |
| `originalStore?` | [`ReactantStore`](modules.md#reactantstore) |
| `beforeReplaceReducer?` | () => `void` |
| `modulesMap` | [`ModulesMap`](modules.md#modulesmap) |

#### Returns

[`ReactantStore`](modules.md#reactantstore)

#### Defined in

[packages/reactant-module/src/core/createStore.ts:51](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/createStore.ts#L51)

___

### defaultMemoize

▸ **defaultMemoize**(`func`): () => `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (): `unknown`

##### Returns

`unknown`

#### Defined in

[packages/reactant-module/src/utils/selector.ts:5](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/selector.ts#L5)

___

### defaultProps

▸ **defaultProps**<`P`\>(`props`): (`target`: `object`, `key`: `string` \| `symbol`, `__namedParameters`: `TypedPropertyDescriptor`<(`props`: `P`) => `Element`\>) => { `value`: `undefined` \| (`props`: `P`) => `Element`  }

## Description

`@defaultProps()` is used to decorate a ViewModule's function component for its default props.

## Example

```tsx
@injectable()
class CounterView extends ViewModule {
  @defaultProps({
    version: '0.0.1'
  })
  component({ version }: { version?: string }) {
    return <span>{version}</span>;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counterView: CounterView) {}

  component() {
    return (<>
      <this.counterView.component />
      <this.counterView.component version="0.1.0" />
    </>);
  }
}

const app = createApp({
  modules: [],
  main: AppView,
  render: () => () => {},
});
```

#### Type parameters

| Name |
| :------ |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `P` \| [`PickOptional`](modules.md#pickoptional)<`P`\> |

#### Returns

`fn`

▸ (`target`, `key`, `__namedParameters`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `__namedParameters` | `TypedPropertyDescriptor`<(`props`: `P`) => `Element`\> |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| (`props`: `P`) => `Element` |

#### Defined in

[packages/reactant-module/src/decorators/defaultProps.ts:40](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/defaultProps.ts#L40)

___

### dispatch

▸ `Const` **dispatch**<`T`\>(`target`, `action`): `void`

## Description

It is used for compatibility with redux actions,
when a class state with actions is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `createState()`.

## Example

```ts
const type = 'count_increase';

interface CountAction {
 type: typeof type;
 state: number;
}

@injectable()
class Counter {
 @state
 count = createState<CountAction['state'], CountAction>(
   ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 );

 increase() {
   dispatch<CountAction>(this, {
     type,
     state: this.count + 1,
   });
 }
}

const app = createApp({
  modules: [],
  main: Counter,
  render: () => () => {},
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AnyAction`<`T`\> = `AnyAction` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`ThisService`](modules.md#thisservice) |
| `action` | `T` |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/core/dispatch.ts:47](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/dispatch.ts#L47)

___

### forwardRef

▸ `Const` **forwardRef**(`callback`): `LazyServiceIdentifer`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `ServiceIdentifier`<`any`\> |

#### Returns

`LazyServiceIdentifer`<`any`\>

#### Defined in

[packages/reactant-di/src/forwardRef.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/forwardRef.ts#L4)

___

### getComposeEnhancers

▸ `Const` **getComposeEnhancers**(`enableReduxDevTools`, `reduxDevToolsOptions?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enableReduxDevTools` | `boolean` |
| `reduxDevToolsOptions?` | [`ReduxDevToolsOptions`](modules.md#reduxdevtoolsoptions) |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/reduxDevToolsCompose.ts:5](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/reduxDevToolsCompose.ts#L5)

___

### getLazyDecorator

▸ `Const` **getLazyDecorator**(`getService`): (`serviceIdentifier`: `ServiceIdentifier`<`unknown`\>, `enableCache`: `boolean`) => (`target`: `object`, `key`: `string` \| `symbol`) => `void`

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

▸ (`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`) => `void`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`unknown`\> | `undefined` |
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

### getStageName

▸ `Const` **getStageName**(`className`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

#### Returns

`string`

#### Defined in

[packages/reactant-module/src/utils/getStageName.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/getStageName.ts#L1)

___

### getStagedState

▸ `Const` **getStagedState**(): `undefined` \| `Record`<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`<`string`, `unknown`\>

#### Defined in

[packages/reactant-module/src/decorators/action.ts:13](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/action.ts#L13)

___

### handlePlugin

▸ `Const` **handlePlugin**(`service`, `pluginHooks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `any` |
| `pluginHooks` | [`PluginHooks`](modules.md#pluginhooks) |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/core/handlePlugin.ts:5](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/handlePlugin.ts#L5)

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
| `serviceIdentifierOrFunc?` | `ServiceIdentifierOrFunc`<`any`\> |

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
  name: 'fooBar',
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

[packages/reactant-module/src/decorators/injectable.ts:80](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/injectable.ts#L80)

___

### isEqual

▸ `Const` **isEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `unknown` |
| `y` | `unknown` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/isEqual.ts#L1)

___

### isEqualExceptFunction

▸ `Const` **isEqualExceptFunction**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `unknown` |
| `y` | `unknown` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:9](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/isEqual.ts#L9)

___

### lazy

▸ `Const` **lazy**(`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`, `descriptor?`: [`PropertyDescriptor`](interfaces/PropertyDescriptor.md)<`any`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`unknown`\> |
| `enableCache?` | `boolean` |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | [`PropertyDescriptor`](interfaces/PropertyDescriptor.md)<`any`\> |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/lazy.ts:14](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/lazy.ts#L14)

___

### load

▸ `Const` **load**(`service`, `loadModules`): `Promise`<`Container`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) |
| `loadModules` | [`ReactModuleOptions`](modules.md#reactmoduleoptions)<`any`\>[] |

#### Returns

`Promise`<`Container`\>

#### Defined in

[packages/reactant-module/src/core/load.ts:4](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/load.ts#L4)

___

### multiInject

▸ **multiInject**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |

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
| `serviceIdentifier` | `ServiceIdentifier`<`any`\> |

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

[packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-di/src/decorators/optional.ts#L47)

___

### perform

▸ `Const` **perform**(`funs`, `parameter?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funs` | `Function`[] |
| `parameter?` | `any` |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/performer.ts:1](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/utils/performer.ts#L1)

___

### state

▸ **state**(`target`, `key`, `descriptor?`): `void`

## Description

`@state` is used to decorate a class property as a state field.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;
}

const app = testBed({
  modules: [],
  main: Counter,
});

expect(app.instance.count).toBe(0);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | [`PropertyDescriptor`](interfaces/PropertyDescriptor.md)<`any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/state.ts:26](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/decorators/state.ts#L26)

___

### subscribe

▸ `Const` **subscribe**(`service`, `listener`): `Unsubscribe`

## Description

You can use `subscribe` to subscribe to state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    subscribe(this, () => {
      if (this.count === 3) {
        console.log(`new value: ${newValue}`);
      }
    });
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 0;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) |
| `listener` | () => `void` |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/core/subscribe.ts:39](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/subscribe.ts#L39)

___

### testBed

▸ **testBed**<`T`\>(`config`): [`App`](interfaces/App.md)<`T`\>

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

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PartialKeys`](modules.md#partialkeys)<[`Config`](interfaces/Config.md)<`T`\>, ``"render"``\> |

#### Returns

[`App`](interfaces/App.md)<`T`\>

#### Defined in

[packages/reactant/src/testBed.ts:33](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/testBed.ts#L33)

___

### useConnector

▸ **useConnector**<`T`\>(`selector`, `shallowEqual?`): `T`

## Description

`useConnector` is a React Hooks, which you can use to inject any shared state and derived data that you want to render using.
And it supports both `useConnector(() => this.renderPropsValue)` and `useConnector(() => this.getMapStateToProps())` uses.

## Example

```tsx
@injectable()
class FooView extends ViewModule {
  @state
  key = 'str';

  @action
  setValue(value: any) {
    this.key = value;
  }

  component() {
    const { key } = useConnector(() => ({ key: this.key }));
    // or `const key = useConnector(() => this.key);`
    return <span>{key}</span>;
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

act(() => {
  createApp({
    modules: [],
    main: FooView,
    render,
  }).bootstrap(container);
});

expect(container.querySelector('span')?.textContent).toBe('str');
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | () => `T` |
| `shallowEqual?` | [`ShallowEqual`](modules.md#shallowequal) |

#### Returns

`T`

#### Defined in

[packages/reactant/src/hooks/useConnector.ts:46](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/hooks/useConnector.ts#L46)

___

### watch

▸ `Const` **watch**<`P`, `T`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

## Description

You can use `watch` to observe a specific state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    watch(this, () => this.count, (newValue) => {
      if (newValue === 3) {
        console.log(`new value: ${newValue}`);
      }
    });
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 0;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` |
| `T` | extends `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`ThisService`](modules.md#thisservice) | - |
| `selector` | `Selector`<`P` extends ``true`` ? [...T[]] : `T`\> | - |
| `watcher` | `Watcher`<`T`\> | - |
| `options?` | `Object` | - |
| `options.multiple?` | `P` | Use multiple values watching |
| `options.isEqual?` | (`x`: `unknown`, `y`: `unknown`) => `boolean` | - |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/core/watch.ts:38](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/watch.ts#L38)
