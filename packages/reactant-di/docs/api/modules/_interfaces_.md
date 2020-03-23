[reactant-di](../README.md) › [Globals](../globals.md) › ["interfaces"](_interfaces_.md)

# External module: "interfaces"

## Index

### Interfaces

* [ContainerConfig](../interfaces/_interfaces_.containerconfig.md)
* [DependenciesProvider](../interfaces/_interfaces_.dependenciesprovider.md)
* [DependencyProviderOption](../interfaces/_interfaces_.dependencyprovideroption.md)
* [Module](../interfaces/_interfaces_.module.md)
* [ModuleDecoratorOptions](../interfaces/_interfaces_.moduledecoratoroptions.md)

### Type aliases

* [ClassProvider](_interfaces_.md#classprovider)
* [Container](_interfaces_.md#container)
* [ContainerOptions](_interfaces_.md#containeroptions)
* [DependenciesModule](_interfaces_.md#dependenciesmodule)
* [DependencyOption](_interfaces_.md#dependencyoption)
* [FactoryProvider](_interfaces_.md#factoryprovider)
* [MetaDataKey](_interfaces_.md#metadatakey)
* [MetadataMap](_interfaces_.md#metadatamap)
* [ModuleOptions](_interfaces_.md#moduleoptions)
* [ModuleProvider](_interfaces_.md#moduleprovider)
* [ServiceIdentifier](_interfaces_.md#serviceidentifier)
* [ServiceIdentifiersMap](_interfaces_.md#serviceidentifiersmap)
* [ValueProvider](_interfaces_.md#valueprovider)
* [ValueType](_interfaces_.md#valuetype)

## Type aliases

###  ClassProvider

Ƭ **ClassProvider**: *object*

*Defined in [packages/reactant-di/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L35)*

#### Type declaration:

* **provide**: *[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

* **useClass**: *[Module](../interfaces/_interfaces_.module.md)‹any›*

___

###  Container

Ƭ **Container**: *Container*

*Defined in [packages/reactant-di/src/interfaces.ts:5](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L5)*

___

###  ContainerOptions

Ƭ **ContainerOptions**: *ContainerOptions*

*Defined in [packages/reactant-di/src/interfaces.ts:4](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L4)*

___

###  DependenciesModule

Ƭ **DependenciesModule**: *[Module](../interfaces/_interfaces_.module.md)‹any› | [DependenciesProvider](../interfaces/_interfaces_.dependenciesprovider.md)*

*Defined in [packages/reactant-di/src/interfaces.ts:73](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L73)*

___

###  DependencyOption

Ƭ **DependencyOption**: *[DependencyProviderOption](../interfaces/_interfaces_.dependencyprovideroption.md) | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:26](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L26)*

___

###  FactoryProvider

Ƭ **FactoryProvider**: *object*

*Defined in [packages/reactant-di/src/interfaces.ts:40](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L40)*

#### Type declaration:

* **deps**? : *[DependencyOption](_interfaces_.md#dependencyoption)[]*

* **provide**: *[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

* **useFactory**(): *function*

  * (...`args`: any[]): *any*

___

###  MetaDataKey

Ƭ **MetaDataKey**: *[ValueType](_interfaces_.md#valuetype)‹typeof METADATA_KEY›*

*Defined in [packages/reactant-di/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L65)*

___

###  MetadataMap

Ƭ **MetadataMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›, [Module](../interfaces/_interfaces_.module.md)‹any››*

*Defined in [packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L15)*

___

###  ModuleOptions

Ƭ **ModuleOptions**: *[ValueProvider](_interfaces_.md#valueprovider) | [ClassProvider](_interfaces_.md#classprovider) | [FactoryProvider](_interfaces_.md#factoryprovider) | [ModuleProvider](_interfaces_.md#moduleprovider) | [Module](../interfaces/_interfaces_.module.md)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:50](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L50)*

___

###  ModuleProvider

Ƭ **ModuleProvider**: *object*

*Defined in [packages/reactant-di/src/interfaces.ts:46](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L46)*

#### Type declaration:

* **provide**: *[Module](../interfaces/_interfaces_.module.md)‹any›*

___

###  ServiceIdentifier

Ƭ **ServiceIdentifier**: *interfaces.ServiceIdentifier‹T›*

*Defined in [packages/reactant-di/src/interfaces.ts:6](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L6)*

___

###  ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**: *Map‹[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›, [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹T›[]›*

*Defined in [packages/reactant-di/src/interfaces.ts:10](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L10)*

token map

___

###  ValueProvider

Ƭ **ValueProvider**: *object*

*Defined in [packages/reactant-di/src/interfaces.ts:30](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L30)*

#### Type declaration:

* **provide**: *[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

* **useValue**: *any*

___

###  ValueType

Ƭ **ValueType**: *T extends Record<number | string, infer R> ? R : never*

*Defined in [packages/reactant-di/src/interfaces.ts:63](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/interfaces.ts#L63)*
