---
id: "_createcontainer_"
title: "createContainer"
sidebar_label: "createContainer"
---

## Index

### Classes

* [CustomMetadataReader](../classes/_createcontainer_.custommetadatareader.md)

### Variables

* [modulesDeps](_createcontainer_.md#let-modulesdeps)

### Functions

* [autoBindModules](_createcontainer_.md#autobindmodules)
* [autoDecorateParams](_createcontainer_.md#autodecorateparams)
* [createContainer](_createcontainer_.md#createcontainer)
* [isClassProvider](_createcontainer_.md#isclassprovider)
* [isFactoryProvider](_createcontainer_.md#isfactoryprovider)
* [lookupOptionalIdentifier](_createcontainer_.md#lookupoptionalidentifier)
* [lookupServiceIdentifier](_createcontainer_.md#lookupserviceidentifier)

## Variables

### `Let` modulesDeps

• **modulesDeps**: *[ModuleOptions](_interfaces_.md#moduleoptions)[]*

*Defined in [packages/reactant-di/src/createContainer.ts:26](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L26)*

## Functions

###  autoBindModules

▸ **autoBindModules**(): *ContainerModule‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:82](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L82)*

**Returns:** *ContainerModule‹›*

___

###  autoDecorateParams

▸ **autoDecorateParams**(`target`: object): *void*

*Defined in [packages/reactant-di/src/createContainer.ts:128](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L128)*

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

###  createContainer

▸ **createContainer**(`__namedParameters`: object): *Container‹›*

*Defined in [packages/reactant-di/src/createContainer.ts:144](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L144)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`ServiceIdentifiers` | Map‹string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›, string &#124; symbol &#124; Newable‹any› &#124; Abstract‹any›[]› | - |
`modules` | [ValueProvider](../interfaces/_interfaces_.valueprovider.md) &#124; [FactoryProvider](../interfaces/_interfaces_.factoryprovider.md) &#124; [ClassProvider](../interfaces/_interfaces_.classprovider.md) &#124; [ModuleProvider](../interfaces/_interfaces_.moduleprovider.md) &#124; [Module](../interfaces/_interfaces_.module.md)‹any›[] | [] |
`options` | undefined &#124; ContainerOptions | - |

**Returns:** *Container‹›*

___

###  isClassProvider

▸ **isClassProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is ClassProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:105](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is ClassProvider*

___

###  isFactoryProvider

▸ **isFactoryProvider**(`module`: [ModuleOptions](_interfaces_.md#moduleoptions)): *module is FactoryProvider*

*Defined in [packages/reactant-di/src/createContainer.ts:109](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L109)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [ModuleOptions](_interfaces_.md#moduleoptions) |

**Returns:** *module is FactoryProvider*

___

###  lookupOptionalIdentifier

▸ **lookupOptionalIdentifier**(`serviceIdentifier`: [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›): *boolean*

*Defined in [packages/reactant-di/src/createContainer.ts:53](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any› |

**Returns:** *boolean*

___

###  lookupServiceIdentifier

▸ **lookupServiceIdentifier**(`target`: object, `original`: [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any›, `index?`: undefined | number): *string | symbol | Abstract‹any›*

*Defined in [packages/reactant-di/src/createContainer.ts:28](https://github.com/unadlib/reactant/blob/72dc788/packages/reactant-di/src/createContainer.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`original` | [ServiceIdentifier](_interfaces_.md#serviceidentifier)‹any› |
`index?` | undefined &#124; number |

**Returns:** *string | symbol | Abstract‹any›*
