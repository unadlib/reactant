[reactant-di](../README.md) › [Globals](../globals.md) › ["createContainer"](_createcontainer_.md)

# External module: "createContainer"

## Index

### Classes

* [CustomMetadataReader](../classes/_createcontainer_.custommetadatareader.md)
* [ModuleRef](../classes/_createcontainer_.moduleref.md)

### Functions

* [autoBindModules](_createcontainer_.md#autobindmodules)
* [createContainer](_createcontainer_.md#createcontainer)
* [forwardRef](_createcontainer_.md#const-forwardref)
* [isClassProvider](_createcontainer_.md#isclassprovider)
* [isFactoryProvider](_createcontainer_.md#isfactoryprovider)

## Functions

###  autoBindModules

▸ **autoBindModules**(): *ContainerModule‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:40](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-di/src/createContainer.ts#L40)*

**Returns:** *ContainerModule‹›*

___

###  createContainer

▸ **createContainer**(`__namedParameters`: object): *Container‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:67](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-di/src/createContainer.ts#L67)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`ServiceIdentifiers` | Map‹string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›, string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›[]› | - |
`modules` | [ValueProvider](../interfaces/_interfaces_.valueprovider.md) &#124; [ClassProvider](../interfaces/_interfaces_.classprovider.md) &#124; [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md) &#124; [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md) &#124; [Module](../interfaces/_interfaces_.module.md)‹any›[] | [] |
`options` | undefined &#124; ContainerOptions | - |

**Returns:** *Container‹›*

___

### `Const` forwardRef

▸ **forwardRef**(`callback`: function): *LazyServiceIdentifer‹any›*

*Defined in [packages/reactant-di/src/createContainer.ts:23](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-di/src/createContainer.ts#L23)*

**Parameters:**

▪ **callback**: *function*

▸ (): *[ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›*

**Returns:** *LazyServiceIdentifer‹any›*

___

###  isClassProvider

▸ **isClassProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is ClassProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:59](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-di/src/createContainer.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is ClassProvider*

___

###  isFactoryProvider

▸ **isFactoryProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is FactoryProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:63](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-di/src/createContainer.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is FactoryProvider*
