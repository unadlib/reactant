---
id: "_interfaces_"
title: "interfaces"
sidebar_label: "interfaces"
---

## Index

### Interfaces

* [DevOptions](../interfaces/_interfaces_.devoptions.md)
* [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)
* [ReactantAction](../interfaces/_interfaces_.reactantaction.md)
* [Service](../interfaces/_interfaces_.service.md)
* [State](../interfaces/_interfaces_.state.md)

### Type aliases

* [Collection](_interfaces_.md#collection)
* [ExcludeRequired](_interfaces_.md#excluderequired)
* [FirstParameter](_interfaces_.md#firstparameter)
* [HandlePlugin](_interfaces_.md#handleplugin)
* [OptionalKeyOf](_interfaces_.md#optionalkeyof)
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

*Defined in [packages/reactant-module/src/interfaces.ts:72](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L72)*

#### Type declaration:

___

###  ExcludeRequired

Ƭ **ExcludeRequired**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:114](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L114)*

#### Type declaration:

___

###  FirstParameter

Ƭ **FirstParameter**: *T extends function ? P : never*

*Defined in [packages/reactant-module/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L65)*

___

###  HandlePlugin

Ƭ **HandlePlugin**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:78](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L78)*

#### Type declaration:

▸ (`service`: T, `pluginHooks`: [PluginHooks](_interfaces_.md#pluginhooks)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`service` | T |
`pluginHooks` | [PluginHooks](_interfaces_.md#pluginhooks) |

___

###  OptionalKeyOf

Ƭ **OptionalKeyOf**: *Exclude‹object[keyof T], undefined›*

*Defined in [packages/reactant-module/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L107)*

___

###  PartialRequired

Ƭ **PartialRequired**: *Required‹Pick‹T, K›› & Pick‹T, Exclude‹keyof T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:104](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L104)*

___

###  PickOptional

Ƭ **PickOptional**: *Pick‹[ExcludeRequired](_interfaces_.md#excluderequired)‹T›, [OptionalKeyOf](_interfaces_.md#optionalkeyof)‹T››*

*Defined in [packages/reactant-module/src/interfaces.ts:118](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L118)*

___

###  PluginHooks

Ƭ **PluginHooks**: *[Collection](_interfaces_.md#collection)‹[PluginModule](../classes/_core_plugin_.pluginmodule.md)›*

*Defined in [packages/reactant-module/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L76)*

___

###  ReactModuleOptions

Ƭ **ReactModuleOptions**: *ModuleOptions*

*Defined in [packages/reactant-module/src/interfaces.ts:49](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L49)*

___

###  ReactantMiddleware

Ƭ **ReactantMiddleware**: *Middleware*

*Defined in [packages/reactant-module/src/interfaces.ts:53](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L53)*

___

###  ReactantStore

Ƭ **ReactantStore**: *Store‹any, AnyAction›*

*Defined in [packages/reactant-module/src/interfaces.ts:51](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L51)*

___

###  ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: *Pick‹EnhancerOptions, Exclude‹keyof EnhancerOptions, "actionSanitizer" | "serialize"››*

*Defined in [packages/reactant-module/src/interfaces.ts:26](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L26)*

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:88](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L88)*

#### Type declaration:

▸ (): *T*

___

###  StateMapObject

Ƭ **StateMapObject**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:59](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L59)*

#### Type declaration:

___

###  StateService

Ƭ **StateService**: *[Service](../interfaces/_interfaces_.service.md)‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L98)*

___

###  Subscribe

Ƭ **Subscribe**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:83](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L83)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `listener`: function): *Unsubscribe*

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **listener**: *function*

▸ (): *void*

___

###  Subscriptions

Ƭ **Subscriptions**: *function[]*

*Defined in [packages/reactant-module/src/interfaces.ts:37](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L37)*

___

###  ThisService

Ƭ **ThisService**: *[Service](../interfaces/_interfaces_.service.md) & object*

*Defined in [packages/reactant-module/src/interfaces.ts:47](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L47)*

___

###  TypePreloadedState

Ƭ **TypePreloadedState**: *PreloadedState‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:31](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L31)*

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L92)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/31e722a/packages/reactant-module/src/interfaces.ts#L90)*

#### Type declaration:

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |
