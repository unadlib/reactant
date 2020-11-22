---
id: "_interfaces_"
title: "interfaces"
sidebar_label: "interfaces"
---

## Index

### Interfaces

* [DevOptions](../interfaces/_interfaces_.devoptions.md)
* [LoadOptions](../interfaces/_interfaces_.loadoptions.md)
* [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)
* [ReactantAction](../interfaces/_interfaces_.reactantaction.md)
* [Service](../interfaces/_interfaces_.service.md)
* [State](../interfaces/_interfaces_.state.md)

### Type aliases

* [Collection](_interfaces_.md#collection)
* [ExcludeRequired](_interfaces_.md#excluderequired)
* [FirstParameter](_interfaces_.md#firstparameter)
* [HandlePlugin](_interfaces_.md#handleplugin)
* [ImportClass](_interfaces_.md#importclass)
* [ImportType](_interfaces_.md#importtype)
* [Load](_interfaces_.md#load)
* [Loader](_interfaces_.md#loader)
* [OptionalKeyOf](_interfaces_.md#optionalkeyof)
* [PartialKeys](_interfaces_.md#partialkeys)
* [PartialRequired](_interfaces_.md#partialrequired)
* [PickOptional](_interfaces_.md#pickoptional)
* [PluginHooks](_interfaces_.md#pluginhooks)
* [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)
* [ReactantMiddleware](_interfaces_.md#reactantmiddleware)
* [ReactantStore](_interfaces_.md#reactantstore)
* [ReduxDevToolsOptions](_interfaces_.md#reduxdevtoolsoptions)
* [Selector](_interfaces_.md#selector)
* [StateMapObject](_interfaces_.md#statemapobject)
* [StateService](_interfaces_.md#stateservice)
* [Subscribe](_interfaces_.md#subscribe)
* [Subscriptions](_interfaces_.md#subscriptions)
* [ThisService](_interfaces_.md#thisservice)
* [TypePreloadedState](_interfaces_.md#typepreloadedstate)
* [Watch](_interfaces_.md#watch)
* [Watcher](_interfaces_.md#watcher)

## Type aliases

###  Collection

Ƭ **Collection**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:84](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L84)*

#### Type declaration:

___

###  ExcludeRequired

Ƭ **ExcludeRequired**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:142](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L142)*

#### Type declaration:

___

###  FirstParameter

Ƭ **FirstParameter**: *T extends function ? P : never*

*Defined in [packages/reactant-module/src/interfaces.ts:77](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L77)*

___

###  HandlePlugin

Ƭ **HandlePlugin**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L90)*

#### Type declaration:

▸ (`service`: T, `pluginHooks`: [PluginHooks](_interfaces_.md#pluginhooks)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`service` | T |
`pluginHooks` | [PluginHooks](_interfaces_.md#pluginhooks) |

___

###  ImportClass

Ƭ **ImportClass**: *T extends Record<K, infer S> ? S extends object ? R : never : never*

*Defined in [packages/reactant-module/src/interfaces.ts:169](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L169)*

It's used to infer the type of `import()` class type

**`example`** 
// counter.ts: `export class Counter {}`
type Counter = ImportClass<typeof import('./counter'), 'Counter'>;

___

###  ImportType

Ƭ **ImportType**: *T extends Record<K, infer R> ? R : never*

*Defined in [packages/reactant-module/src/interfaces.ts:158](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L158)*

It's used to infer the type of `import()` type

**`example`** 
// counter.ts: `export const list = [''];`
type List = ImportType<typeof import('./counter'), 'list'>;

___

###  Load

Ƭ **Load**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:120](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L120)*

#### Type declaration:

▸ <**P**>(`service`: [ThisService](_interfaces_.md#thisservice), `loadOptions`: [LoadOptions](../interfaces/_interfaces_.loadoptions.md)‹P›, `beforeReplaceReducer`: function): *void*

**Type parameters:**

▪ **P**

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **loadOptions**: *[LoadOptions](../interfaces/_interfaces_.loadoptions.md)‹P›*

▪ **beforeReplaceReducer**: *function*

▸ (`instance`: P): *void*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | P |

___

###  Loader

Ƭ **Loader**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:115](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L115)*

#### Type declaration:

▸ <**P**>(`loadOptions`: [LoadOptions](../interfaces/_interfaces_.loadoptions.md)‹P›, `beforeReplaceReducer`: function): *void*

**Type parameters:**

▪ **P**

**Parameters:**

▪ **loadOptions**: *[LoadOptions](../interfaces/_interfaces_.loadoptions.md)‹P›*

▪ **beforeReplaceReducer**: *function*

▸ (`instance`: P): *void*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | P |

___

###  OptionalKeyOf

Ƭ **OptionalKeyOf**: *Exclude‹object[keyof T], undefined›*

*Defined in [packages/reactant-module/src/interfaces.ts:135](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L135)*

___

###  PartialKeys

Ƭ **PartialKeys**: *Pick‹T, Exclude‹keyof T, K›› & Partial‹Pick‹T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:148](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L148)*

___

###  PartialRequired

Ƭ **PartialRequired**: *Required‹Pick‹T, K›› & Pick‹T, Exclude‹keyof T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:132](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L132)*

___

###  PickOptional

Ƭ **PickOptional**: *Pick‹[ExcludeRequired](_interfaces_.md#excluderequired)‹T›, [OptionalKeyOf](_interfaces_.md#optionalkeyof)‹T››*

*Defined in [packages/reactant-module/src/interfaces.ts:146](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L146)*

___

###  PluginHooks

Ƭ **PluginHooks**: *[Collection](_interfaces_.md#collection)‹[PluginModule](../classes/_core_plugin_.pluginmodule.md)›*

*Defined in [packages/reactant-module/src/interfaces.ts:88](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L88)*

___

###  ReactModuleOptions

Ƭ **ReactModuleOptions**: *ModuleOptions*

*Defined in [packages/reactant-module/src/interfaces.ts:55](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L55)*

___

###  ReactantMiddleware

Ƭ **ReactantMiddleware**: *Middleware*

*Defined in [packages/reactant-module/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L61)*

___

###  ReactantStore

Ƭ **ReactantStore**: *Store‹any, AnyAction› & object*

*Defined in [packages/reactant-module/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L57)*

___

###  ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: *Pick‹EnhancerOptions, Exclude‹keyof EnhancerOptions, "actionSanitizer" | "serialize"››*

*Defined in [packages/reactant-module/src/interfaces.ts:31](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L31)*

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:100](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L100)*

#### Type declaration:

▸ (): *T*

___

###  StateMapObject

Ƭ **StateMapObject**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L71)*

#### Type declaration:

___

###  StateService

Ƭ **StateService**: *[Service](../interfaces/_interfaces_.service.md)‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:126](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L126)*

___

###  Subscribe

Ƭ **Subscribe**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:95](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L95)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `listener`: function): *Unsubscribe*

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **listener**: *function*

▸ (): *void*

___

###  Subscriptions

Ƭ **Subscriptions**: *function[]*

*Defined in [packages/reactant-module/src/interfaces.ts:42](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L42)*

___

###  ThisService

Ƭ **ThisService**: *[Service](../interfaces/_interfaces_.service.md) & object*

*Defined in [packages/reactant-module/src/interfaces.ts:53](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L53)*

___

###  TypePreloadedState

Ƭ **TypePreloadedState**: *PreloadedState‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:36](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L36)*

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:104](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L104)*

#### Type declaration:

▸ <**T**>(`service`: [ThisService](_interfaces_.md#thisservice), `selector`: [Selector](_interfaces_.md#selector)‹T›, `watcher`: [Watcher](_interfaces_.md#watcher)‹T›): *Unsubscribe*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`service` | [ThisService](_interfaces_.md#thisservice) |
`selector` | [Selector](_interfaces_.md#selector)‹T› |
`watcher` | [Watcher](_interfaces_.md#watcher)‹T› |

___

###  Watcher

Ƭ **Watcher**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:102](https://github.com/unadlib/reactant/blob/026b5f7/packages/reactant-module/src/interfaces.ts#L102)*

#### Type declaration:

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |
