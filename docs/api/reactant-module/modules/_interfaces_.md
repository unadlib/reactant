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

### Type aliases

* [Collection](_interfaces_.md#collection)
* [ExcludeRequired](_interfaces_.md#excluderequired)
* [FirstParameter](_interfaces_.md#firstparameter)
* [HandlePlugin](_interfaces_.md#handleplugin)
* [ImportClass](_interfaces_.md#importclass)
* [ImportType](_interfaces_.md#importtype)
* [Load](_interfaces_.md#load)
* [Loader](_interfaces_.md#loader)
* [ModulesMap](_interfaces_.md#modulesmap)
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

*Defined in [packages/reactant-module/src/interfaces.ts:87](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L87)*

#### Type declaration:

___

###  ExcludeRequired

Ƭ **ExcludeRequired**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:144](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L144)*

#### Type declaration:

___

###  FirstParameter

Ƭ **FirstParameter**: *T extends function ? P : never*

*Defined in [packages/reactant-module/src/interfaces.ts:80](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L80)*

___

###  HandlePlugin

Ƭ **HandlePlugin**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:93](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L93)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:172](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L172)*

It's used to infer the type of `import()` class type
or use `import type` in TypeScript 3.8+

**`example`** 
// counter.ts: `export class Counter {}`
type Counter = ImportClass<typeof import('./counter'), 'Counter'>;

___

###  ImportType

Ƭ **ImportType**: *T extends Record<K, infer R> ? R : never*

*Defined in [packages/reactant-module/src/interfaces.ts:160](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L160)*

It's used to infer the type of `import()` type

**`example`** 
// counter.ts: `export const list = [''];`
type List = ImportType<typeof import('./counter'), 'list'>;

___

###  Load

Ƭ **Load**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:123](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L123)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `loadModules`: [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[]): *Promise‹Container›*

**Parameters:**

Name | Type |
------ | ------ |
`service` | [ThisService](_interfaces_.md#thisservice) |
`loadModules` | [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[] |

___

###  Loader

Ƭ **Loader**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L118)*

#### Type declaration:

▸ (`loadModules`: [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[], `beforeReplaceReducer?`: undefined | function): *void*

**Parameters:**

Name | Type |
------ | ------ |
`loadModules` | [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[] |
`beforeReplaceReducer?` | undefined &#124; function |

___

###  ModulesMap

Ƭ **ModulesMap**: *Record‹string, any›*

*Defined in [packages/reactant-module/src/interfaces.ts:78](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L78)*

___

###  OptionalKeyOf

Ƭ **OptionalKeyOf**: *Exclude‹object[keyof T], undefined›*

*Defined in [packages/reactant-module/src/interfaces.ts:137](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L137)*

___

###  PartialKeys

Ƭ **PartialKeys**: *Pick‹T, Exclude‹keyof T, K›› & Partial‹Pick‹T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:150](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L150)*

___

###  PartialRequired

Ƭ **PartialRequired**: *Required‹Pick‹T, K›› & Pick‹T, Exclude‹keyof T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:134](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L134)*

___

###  PickOptional

Ƭ **PickOptional**: *Pick‹[ExcludeRequired](_interfaces_.md#excluderequired)‹T›, [OptionalKeyOf](_interfaces_.md#optionalkeyof)‹T››*

*Defined in [packages/reactant-module/src/interfaces.ts:148](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L148)*

___

###  PluginHooks

Ƭ **PluginHooks**: *[Collection](_interfaces_.md#collection)‹[PluginModule](../classes/_core_plugin_.pluginmodule.md)›*

*Defined in [packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L91)*

___

###  ReactModuleOptions

Ƭ **ReactModuleOptions**: *ModuleOptions‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:55](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L55)*

___

###  ReactantMiddleware

Ƭ **ReactantMiddleware**: *Middleware*

*Defined in [packages/reactant-module/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L61)*

___

###  ReactantStore

Ƭ **ReactantStore**: *Store‹any, AnyAction› & object*

*Defined in [packages/reactant-module/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L57)*

___

###  ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: *Pick‹EnhancerOptions, Exclude‹keyof EnhancerOptions, "actionSanitizer" | "serialize"››*

*Defined in [packages/reactant-module/src/interfaces.ts:33](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L33)*

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:103](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L103)*

#### Type declaration:

▸ (): *T*

___

###  StateMapObject

Ƭ **StateMapObject**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:72](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L72)*

#### Type declaration:

___

###  StateService

Ƭ **StateService**: *[Service](../interfaces/_interfaces_.service.md)‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:128](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L128)*

___

###  Subscribe

Ƭ **Subscribe**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L98)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `listener`: function): *Unsubscribe*

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **listener**: *function*

▸ (): *void*

___

###  Subscriptions

Ƭ **Subscriptions**: *function[]*

*Defined in [packages/reactant-module/src/interfaces.ts:40](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L40)*

___

###  ThisService

Ƭ **ThisService**: *[Service](../interfaces/_interfaces_.service.md) & object*

*Defined in [packages/reactant-module/src/interfaces.ts:53](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L53)*

___

###  TypePreloadedState

Ƭ **TypePreloadedState**: *PreloadedState‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:38](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L38)*

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L107)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:105](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-module/src/interfaces.ts#L105)*

#### Type declaration:

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |
