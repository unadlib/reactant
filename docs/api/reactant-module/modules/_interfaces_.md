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

*Defined in [packages/reactant-module/src/interfaces.ts:88](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L88)*

#### Type declaration:

___

###  ExcludeRequired

Ƭ **ExcludeRequired**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:145](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L145)*

#### Type declaration:

___

###  FirstParameter

Ƭ **FirstParameter**: *T extends function ? P : never*

*Defined in [packages/reactant-module/src/interfaces.ts:81](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L81)*

___

###  HandlePlugin

Ƭ **HandlePlugin**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L94)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:173](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L173)*

It's used to infer the type of `import()` class type
or use `import type` in TypeScript 3.8+

**`example`** 
// counter.ts: `export class Counter {}`
type Counter = ImportClass<typeof import('./counter'), 'Counter'>;

___

###  ImportType

Ƭ **ImportType**: *T extends Record<K, infer R> ? R : never*

*Defined in [packages/reactant-module/src/interfaces.ts:161](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L161)*

It's used to infer the type of `import()` type

**`example`** 
// counter.ts: `export const list = [''];`
type List = ImportType<typeof import('./counter'), 'list'>;

___

###  Load

Ƭ **Load**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:124](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L124)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:119](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L119)*

#### Type declaration:

▸ (`loadModules`: [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[], `beforeReplaceReducer?`: undefined | function): *void*

**Parameters:**

Name | Type |
------ | ------ |
`loadModules` | [ReactModuleOptions](_interfaces_.md#reactmoduleoptions)[] |
`beforeReplaceReducer?` | undefined &#124; function |

___

###  OptionalKeyOf

Ƭ **OptionalKeyOf**: *Exclude‹object[keyof T], undefined›*

*Defined in [packages/reactant-module/src/interfaces.ts:138](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L138)*

___

###  PartialKeys

Ƭ **PartialKeys**: *Pick‹T, Exclude‹keyof T, K›› & Partial‹Pick‹T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:151](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L151)*

___

###  PartialRequired

Ƭ **PartialRequired**: *Required‹Pick‹T, K›› & Pick‹T, Exclude‹keyof T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:135](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L135)*

___

###  PickOptional

Ƭ **PickOptional**: *Pick‹[ExcludeRequired](_interfaces_.md#excluderequired)‹T›, [OptionalKeyOf](_interfaces_.md#optionalkeyof)‹T››*

*Defined in [packages/reactant-module/src/interfaces.ts:149](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L149)*

___

###  PluginHooks

Ƭ **PluginHooks**: *[Collection](_interfaces_.md#collection)‹[PluginModule](../classes/_core_plugin_.pluginmodule.md)›*

*Defined in [packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L92)*

___

###  ReactModuleOptions

Ƭ **ReactModuleOptions**: *ModuleOptions‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:59](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L59)*

___

###  ReactantMiddleware

Ƭ **ReactantMiddleware**: *Middleware*

*Defined in [packages/reactant-module/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L65)*

___

###  ReactantStore

Ƭ **ReactantStore**: *Store‹any, AnyAction› & object*

*Defined in [packages/reactant-module/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L61)*

___

###  ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: *Pick‹EnhancerOptions, Exclude‹keyof EnhancerOptions, "actionSanitizer" | "serialize"››*

*Defined in [packages/reactant-module/src/interfaces.ts:33](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L33)*

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:104](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L104)*

#### Type declaration:

▸ (): *T*

___

###  StateMapObject

Ƭ **StateMapObject**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:75](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L75)*

#### Type declaration:

___

###  StateService

Ƭ **StateService**: *[Service](../interfaces/_interfaces_.service.md)‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:129](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L129)*

___

###  Subscribe

Ƭ **Subscribe**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:99](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L99)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `listener`: function): *Unsubscribe*

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **listener**: *function*

▸ (): *void*

___

###  Subscriptions

Ƭ **Subscriptions**: *function[]*

*Defined in [packages/reactant-module/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L44)*

___

###  ThisService

Ƭ **ThisService**: *[Service](../interfaces/_interfaces_.service.md) & object*

*Defined in [packages/reactant-module/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L57)*

___

###  TypePreloadedState

Ƭ **TypePreloadedState**: *PreloadedState‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:38](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L38)*

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:108](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L108)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:106](https://github.com/unadlib/reactant/blob/f8f02435/packages/reactant-module/src/interfaces.ts#L106)*

#### Type declaration:

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |
