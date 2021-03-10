---
id: "_createcontainer_"
title: "createContainer"
sidebar_label: "createContainer"
---

## Index

### Classes

* [CustomMetadataReader](../classes/_createcontainer_.custommetadatareader.md)

### Functions

* [autoBindModules](_createcontainer_.md#autobindmodules)
* [autoDecorateParams](_createcontainer_.md#autodecorateparams)
* [bindModules](_createcontainer_.md#bindmodules)
* [createContainer](_createcontainer_.md#createcontainer)
* [isClassProvider](_createcontainer_.md#isclassprovider)
* [isFactoryProvider](_createcontainer_.md#isfactoryprovider)

## Functions

###  autoBindModules

▸ **autoBindModules**(): *ContainerModule‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:34](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L34)*

**Returns:** *ContainerModule‹›*

___

###  autoDecorateParams

▸ **autoDecorateParams**(`target`: object): *void*

*Defined in [packages/reactant-di/src/createContainer.ts:80](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L80)*

It ensures that the parameters of all modules from the configuration are decorated.

class Foo {
  constructor(bar: Bar) {}
}

Equate to:

class Foo {
  constructor(@inject() bar: Bar) {}
}

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | object | decorated target.  |

**Returns:** *void*

___

###  bindModules

▸ **bindModules**(`container`: Container, `modules`: [ModuleOptions](_interfaces_.md#moduleoptions)[]): *void*

*Defined in [packages/reactant-di/src/createContainer.ts:96](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`container` | Container |
`modules` | [ModuleOptions](_interfaces_.md#moduleoptions)[] |

**Returns:** *void*

___

###  createContainer

▸ **createContainer**(`__namedParameters`: object): *Container‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:154](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L154)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`ServiceIdentifiers` | Map‹string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›, string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›[]› | - |
`modules` | [ValueProvider](../interfaces/_interfaces_.valueprovider.md)‹any› &#124; [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md)‹any› &#124; [ClassProvider](../interfaces/_interfaces_.classprovider.md)‹any› &#124; [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md)‹any› &#124; [Module](../interfaces/_interfaces_.module.md)‹any›[] | [] |
`options` | undefined &#124; ContainerOptions | - |

**Returns:** *Container‹›*

___

###  isClassProvider

▸ **isClassProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is ClassProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:57](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is ClassProvider*

___

###  isFactoryProvider

▸ **isFactoryProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is FactoryProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:61](https://github.com/unadlib/reactant/blob/84acaf3/packages/reactant-di/src/createContainer.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is FactoryProvider*
