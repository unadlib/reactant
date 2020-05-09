---
id: "_interfaces_"
title: "interfaces"
sidebar_label: "interfaces"
---

## Index

### Interfaces

* [ClassProvider](../interfaces/_interfaces_.classprovider.md)
* [ContainerConfig](../interfaces/_interfaces_.containerconfig.md)
* [DependenciesProvider](../interfaces/_interfaces_.dependenciesprovider.md)
* [DependencyProviderOption](../interfaces/_interfaces_.dependencyprovideroption.md)
* [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md)
* [Module](../interfaces/_interfaces_.module.md)
* [ModuleDecoratorOptions](../interfaces/_interfaces_.moduledecoratoroptions.md)
* [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md)
* [ValueProvider](../interfaces/_interfaces_.valueprovider.md)

### Type aliases

* [Container](_interfaces_.md#container)
* [ContainerOptions](_interfaces_.md#containeroptions)
* [DependenciesModule](_interfaces_.md#dependenciesmodule)
* [DependencyOption](_interfaces_.md#dependencyoption)
* [MetaDataKey](_interfaces_.md#metadatakey)
* [MetadataMap](_interfaces_.md#metadatamap)
* [ModuleOptions](_interfaces_.md#moduleoptions)
* [PickByKey](_interfaces_.md#pickbykey)
* [ServiceIdentifier](_interfaces_.md#serviceidentifier)
* [ServiceIdentifierOrFunc](_interfaces_.md#serviceidentifierorfunc)
* [ServiceIdentifiersMap](_interfaces_.md#serviceidentifiersmap)
* [ValueType](_interfaces_.md#valuetype)

## Type aliases

###  Container

Ƭ **Container**: *Container*

*Defined in [packages/reactant-di/src/interfaces.ts:13](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L13)*

___

###  ContainerOptions

Ƭ **ContainerOptions**: *[PickByKey](_interfaces_.md#pickbykey)‹ContainerOptions, "skipBaseClassChecks"›*

*Defined in [packages/reactant-di/src/interfaces.ts:9](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L9)*

___

###  DependenciesModule

Ƭ **DependenciesModule**: *[Module](../interfaces/_interfaces_.module.md)‹any› | [DependenciesProvider](../interfaces/_interfaces_.dependenciesprovider.md)*

*Defined in [packages/reactant-di/src/interfaces.ts:84](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L84)*

___

###  DependencyOption

Ƭ **DependencyOption**: *[DependencyProviderOption](../interfaces/_interfaces_.dependencyprovideroption.md) | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L35)*

___

###  MetaDataKey

Ƭ **MetaDataKey**: *[ValueType](_interfaces_.md#valuetype)‹typeof METADATA_KEY›*

*Defined in [packages/reactant-di/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L76)*

___

###  MetadataMap

Ƭ **MetadataMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›, [Module](../interfaces/_interfaces_.module.md)‹any››*

*Defined in [packages/reactant-di/src/interfaces.ts:24](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L24)*

___

###  ModuleOptions

Ƭ **ModuleOptions**: *[ValueProvider](../interfaces/_interfaces_.valueprovider.md) | [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md) | [ClassProvider](../interfaces/_interfaces_.classprovider.md) | [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md) | [Module](../interfaces/_interfaces_.module.md)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:61](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L61)*

___

###  PickByKey

Ƭ **PickByKey**: *object*

*Defined in [packages/reactant-di/src/interfaces.ts:5](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L5)*

#### Type declaration:

___

###  ServiceIdentifier

Ƭ **ServiceIdentifier**: *interfaces.ServiceIdentifier‹T›*

*Defined in [packages/reactant-di/src/interfaces.ts:14](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L14)*

___

###  ServiceIdentifierOrFunc

Ƭ **ServiceIdentifierOrFunc**: *[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T› | LazyServiceIdentifer*

*Defined in [packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L15)*

___

###  ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›, [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›[]›*

*Defined in [packages/reactant-di/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L19)*

___

###  ValueType

Ƭ **ValueType**: *T extends Record<number | string, infer R> ? R : never*

*Defined in [packages/reactant-di/src/interfaces.ts:74](https://github.com/unadlib/reactant/blob/8ae0877/packages/reactant-di/src/interfaces.ts#L74)*
