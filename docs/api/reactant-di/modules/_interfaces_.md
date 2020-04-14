[reactant-di](../README.md) › [Globals](../globals.md) › ["interfaces"](_interfaces_.md)

# External module: "interfaces"

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
* [ServiceIdentifier](_interfaces_.md#serviceidentifier)
* [ServiceIdentifiersMap](_interfaces_.md#serviceidentifiersmap)
* [ValueType](_interfaces_.md#valuetype)

## Type aliases

###  Container

Ƭ **Container**: *Container*

*Defined in [packages/reactant-di/src/interfaces.ts:5](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L5)*

___

###  ContainerOptions

Ƭ **ContainerOptions**: *ContainerOptions*

*Defined in [packages/reactant-di/src/interfaces.ts:4](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L4)*

___

###  DependenciesModule

Ƭ **DependenciesModule**: *[Module](../interfaces/_interfaces_.module.md)‹any› | [DependenciesProvider](../interfaces/_interfaces_.dependenciesprovider.md)*

*Defined in [packages/reactant-di/src/interfaces.ts:73](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L73)*

___

###  DependencyOption

Ƭ **DependencyOption**: *[DependencyProviderOption](../interfaces/_interfaces_.dependencyprovideroption.md) | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:26](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L26)*

___

###  MetaDataKey

Ƭ **MetaDataKey**: *[ValueType](_interfaces_.md#valuetype)‹typeof METADATA_KEY›*

*Defined in [packages/reactant-di/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L65)*

___

###  MetadataMap

Ƭ **MetadataMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›, [Module](../interfaces/_interfaces_.module.md)‹any››*

*Defined in [packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L15)*

___

###  ModuleOptions

Ƭ **ModuleOptions**: *[ValueProvider](../interfaces/_interfaces_.valueprovider.md) | [ClassProvider](../interfaces/_interfaces_.classprovider.md) | [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md) | [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md) | [Module](../interfaces/_interfaces_.module.md)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:50](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L50)*

___

###  ServiceIdentifier

Ƭ **ServiceIdentifier**: *interfaces.ServiceIdentifier‹T›*

*Defined in [packages/reactant-di/src/interfaces.ts:6](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L6)*

___

###  ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›, [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›[]›*

*Defined in [packages/reactant-di/src/interfaces.ts:10](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L10)*

token map

___

###  ValueType

Ƭ **ValueType**: *T extends Record<number | string, infer R> ? R : never*

*Defined in [packages/reactant-di/src/interfaces.ts:63](https://github.com/unadlib/reactant/blob/2a94e2e/packages/reactant-di/src/interfaces.ts#L63)*
