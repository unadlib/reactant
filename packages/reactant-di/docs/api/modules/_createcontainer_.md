[reactant-di](../README.md) › [Globals](../globals.md) › ["createContainer"](_createcontainer_.md)

# External module: "createContainer"

## Index

### Classes

* [CustomMetadataReader](../classes/_createcontainer_.custommetadatareader.md)

### Functions

* [autoBindModules](_createcontainer_.md#autobindmodules)
* [createContainer](_createcontainer_.md#createcontainer)
* [isClassProvider](_createcontainer_.md#isclassprovider)
* [isFactoryProvider](_createcontainer_.md#isfactoryprovider)

## Functions

###  autoBindModules

▸ **autoBindModules**(): *ContainerModule‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:32](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/createContainer.ts#L32)*

**Returns:** *ContainerModule‹›*

___

###  createContainer

▸ **createContainer**(`__namedParameters`: object): *Container‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:59](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/createContainer.ts#L59)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`ServiceIdentifiers` | Map‹string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›, string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›[]› | - |
`modules` | object &#124; object &#124; object &#124; object &#124; [Module](../interfaces/_interfaces_.module.md)‹any›[] | [] |
`options` | undefined &#124; ContainerOptions | - |

**Returns:** *Container‹›*

___

###  isClassProvider

▸ **isClassProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is ClassProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:51](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/createContainer.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is ClassProvider*

___

###  isFactoryProvider

▸ **isFactoryProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is FactoryProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:55](https://github.com/unadlib/reactant/blob/65137cd/packages/reactant-di/src/createContainer.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is FactoryProvider*
