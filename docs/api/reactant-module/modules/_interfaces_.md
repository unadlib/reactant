[reactant-module](../README.md) › [Globals](../globals.md) › ["interfaces"](_interfaces_.md)

# External module: "interfaces"

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

*Defined in [packages/reactant-module/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L65)*

#### Type declaration:

___

###  ExcludeRequired

Ƭ **ExcludeRequired**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L107)*

#### Type declaration:

___

###  FirstParameter

Ƭ **FirstParameter**: *T extends function ? P : never*

*Defined in [packages/reactant-module/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L58)*

___

###  HandlePlugin

Ƭ **HandlePlugin**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L71)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:100](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L100)*

___

###  PartialRequired

Ƭ **PartialRequired**: *Required‹Pick‹T, K›› & Pick‹T, Exclude‹keyof T, K››*

*Defined in [packages/reactant-module/src/interfaces.ts:97](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L97)*

___

###  PickOptional

Ƭ **PickOptional**: *Pick‹[ExcludeRequired](_interfaces_.md#excluderequired)‹T›, [OptionalKeyOf](_interfaces_.md#optionalkeyof)‹T››*

*Defined in [packages/reactant-module/src/interfaces.ts:111](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L111)*

___

###  PluginHooks

Ƭ **PluginHooks**: *[Collection](_interfaces_.md#collection)‹[PluginModule](../classes/_core_plugin_.pluginmodule.md)›*

*Defined in [packages/reactant-module/src/interfaces.ts:69](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L69)*

___

###  ReactModuleOptions

Ƭ **ReactModuleOptions**: *ModuleOptions*

*Defined in [packages/reactant-module/src/interfaces.ts:42](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L42)*

___

###  ReactantMiddleware

Ƭ **ReactantMiddleware**: *Middleware*

*Defined in [packages/reactant-module/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L46)*

___

###  ReactantStore

Ƭ **ReactantStore**: *Store‹any, AnyAction›*

*Defined in [packages/reactant-module/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L44)*

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:81](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L81)*

#### Type declaration:

▸ (): *T*

___

###  StateMapObject

Ƭ **StateMapObject**: *object*

*Defined in [packages/reactant-module/src/interfaces.ts:52](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L52)*

#### Type declaration:

___

###  StateService

Ƭ **StateService**: *[Service](../interfaces/_interfaces_.service.md)‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L91)*

___

###  Subscribe

Ƭ **Subscribe**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L76)*

#### Type declaration:

▸ (`service`: [ThisService](_interfaces_.md#thisservice), `listener`: function): *Unsubscribe*

**Parameters:**

▪ **service**: *[ThisService](_interfaces_.md#thisservice)*

▪ **listener**: *function*

▸ (): *void*

___

###  Subscriptions

Ƭ **Subscriptions**: *function[]*

*Defined in [packages/reactant-module/src/interfaces.ts:30](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L30)*

___

###  ThisService

Ƭ **ThisService**: *[Service](../interfaces/_interfaces_.service.md) & object*

*Defined in [packages/reactant-module/src/interfaces.ts:40](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L40)*

___

###  TypePreloadedState

Ƭ **TypePreloadedState**: *PreloadedState‹T›*

*Defined in [packages/reactant-module/src/interfaces.ts:24](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L24)*

___

###  Watch

Ƭ **Watch**: *function*

*Defined in [packages/reactant-module/src/interfaces.ts:85](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L85)*

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

*Defined in [packages/reactant-module/src/interfaces.ts:83](https://github.com/unadlib/reactant/blob/156662c/packages/reactant-module/src/interfaces.ts#L83)*

#### Type declaration:

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |
