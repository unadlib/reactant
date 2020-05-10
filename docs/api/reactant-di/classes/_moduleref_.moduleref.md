---
id: "_moduleref_.moduleref"
title: "ModuleRef"
sidebar_label: "ModuleRef"
---

> Make sure that `Container` type for getting module.

## Hierarchy

* Container

  ↳ **ModuleRef**

## Implements

* Container

## Index

### Constructors

* [constructor](_moduleref_.moduleref.md#constructor)

### Properties

* [id](_moduleref_.moduleref.md#id)
* [options](_moduleref_.moduleref.md#readonly-options)
* [parent](_moduleref_.moduleref.md#parent)

### Methods

* [applyCustomMetadataReader](_moduleref_.moduleref.md#applycustommetadatareader)
* [applyMiddleware](_moduleref_.moduleref.md#applymiddleware)
* [bind](_moduleref_.moduleref.md#bind)
* [createChild](_moduleref_.moduleref.md#createchild)
* [get](_moduleref_.moduleref.md#get)
* [getAll](_moduleref_.moduleref.md#getall)
* [getAllNamed](_moduleref_.moduleref.md#getallnamed)
* [getAllTagged](_moduleref_.moduleref.md#getalltagged)
* [getNamed](_moduleref_.moduleref.md#getnamed)
* [getTagged](_moduleref_.moduleref.md#gettagged)
* [isBound](_moduleref_.moduleref.md#isbound)
* [isBoundNamed](_moduleref_.moduleref.md#isboundnamed)
* [isBoundTagged](_moduleref_.moduleref.md#isboundtagged)
* [load](_moduleref_.moduleref.md#load)
* [loadAsync](_moduleref_.moduleref.md#loadasync)
* [rebind](_moduleref_.moduleref.md#rebind)
* [resolve](_moduleref_.moduleref.md#resolve)
* [restore](_moduleref_.moduleref.md#restore)
* [snapshot](_moduleref_.moduleref.md#snapshot)
* [unbind](_moduleref_.moduleref.md#unbind)
* [unbindAll](_moduleref_.moduleref.md#unbindall)
* [unload](_moduleref_.moduleref.md#unload)
* [merge](_moduleref_.moduleref.md#static-merge)

## Constructors

###  constructor

\+ **new ModuleRef**(`containerOptions?`: interfaces.ContainerOptions): *[ModuleRef](_moduleref_.moduleref.md)*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[constructor](_moduleref_.moduleref.md#constructor)*

Defined in node_modules/inversify/dts/container/container.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`containerOptions?` | interfaces.ContainerOptions |

**Returns:** *[ModuleRef](_moduleref_.moduleref.md)*

## Properties

###  id

• **id**: *number*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[id](_moduleref_.moduleref.md#id)*

Defined in node_modules/inversify/dts/container/container.d.ts:3

___

### `Readonly` options

• **options**: *ContainerOptions*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[options](_moduleref_.moduleref.md#readonly-options)*

Defined in node_modules/inversify/dts/container/container.d.ts:5

___

###  parent

• **parent**: *Container | null*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[parent](_moduleref_.moduleref.md#parent)*

Defined in node_modules/inversify/dts/container/container.d.ts:4

## Methods

###  applyCustomMetadataReader

▸ **applyCustomMetadataReader**(`metadataReader`: MetadataReader): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[applyCustomMetadataReader](_moduleref_.moduleref.md#applycustommetadatareader)*

Defined in node_modules/inversify/dts/container/container.d.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`metadataReader` | MetadataReader |

**Returns:** *void*

___

###  applyMiddleware

▸ **applyMiddleware**(...`middlewares`: interfaces.Middleware[]): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[applyMiddleware](_moduleref_.moduleref.md#applymiddleware)*

Defined in node_modules/inversify/dts/container/container.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`...middlewares` | interfaces.Middleware[] |

**Returns:** *void*

___

###  bind

▸ **bind**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›): *BindingToSyntax‹T›*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[bind](_moduleref_.moduleref.md#bind)*

Defined in node_modules/inversify/dts/container/container.d.ts:15

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |

**Returns:** *BindingToSyntax‹T›*

___

###  createChild

▸ **createChild**(`containerOptions?`: interfaces.ContainerOptions): *Container*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[createChild](_moduleref_.moduleref.md#createchild)*

Defined in node_modules/inversify/dts/container/container.d.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`containerOptions?` | interfaces.ContainerOptions |

**Returns:** *Container*

___

###  get

▸ **get**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›): *T*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[get](_moduleref_.moduleref.md#get)*

Defined in node_modules/inversify/dts/container/container.d.ts:27

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |

**Returns:** *T*

___

###  getAll

▸ **getAll**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›): *T[]*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[getAll](_moduleref_.moduleref.md#getall)*

Defined in node_modules/inversify/dts/container/container.d.ts:30

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |

**Returns:** *T[]*

___

###  getAllNamed

▸ **getAllNamed**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›, `named`: string | number | symbol): *T[]*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[getAllNamed](_moduleref_.moduleref.md#getallnamed)*

Defined in node_modules/inversify/dts/container/container.d.ts:32

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |
`named` | string &#124; number &#124; symbol |

**Returns:** *T[]*

___

###  getAllTagged

▸ **getAllTagged**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›, `key`: string | number | symbol, `value`: any): *T[]*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[getAllTagged](_moduleref_.moduleref.md#getalltagged)*

Defined in node_modules/inversify/dts/container/container.d.ts:31

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |
`key` | string &#124; number &#124; symbol |
`value` | any |

**Returns:** *T[]*

___

###  getNamed

▸ **getNamed**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›, `named`: string | number | symbol): *T*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[getNamed](_moduleref_.moduleref.md#getnamed)*

Defined in node_modules/inversify/dts/container/container.d.ts:29

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |
`named` | string &#124; number &#124; symbol |

**Returns:** *T*

___

###  getTagged

▸ **getTagged**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›, `key`: string | number | symbol, `value`: any): *T*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[getTagged](_moduleref_.moduleref.md#gettagged)*

Defined in node_modules/inversify/dts/container/container.d.ts:28

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |
`key` | string &#124; number &#124; symbol |
`value` | any |

**Returns:** *T*

___

###  isBound

▸ **isBound**(`serviceIdentifier`: interfaces.ServiceIdentifier‹any›): *boolean*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[isBound](_moduleref_.moduleref.md#isbound)*

Defined in node_modules/inversify/dts/container/container.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹any› |

**Returns:** *boolean*

___

###  isBoundNamed

▸ **isBoundNamed**(`serviceIdentifier`: interfaces.ServiceIdentifier‹any›, `named`: string | number | symbol): *boolean*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[isBoundNamed](_moduleref_.moduleref.md#isboundnamed)*

Defined in node_modules/inversify/dts/container/container.d.ts:20

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹any› |
`named` | string &#124; number &#124; symbol |

**Returns:** *boolean*

___

###  isBoundTagged

▸ **isBoundTagged**(`serviceIdentifier`: interfaces.ServiceIdentifier‹any›, `key`: string | number | symbol, `value`: any): *boolean*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[isBoundTagged](_moduleref_.moduleref.md#isboundtagged)*

Defined in node_modules/inversify/dts/container/container.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹any› |
`key` | string &#124; number &#124; symbol |
`value` | any |

**Returns:** *boolean*

___

###  load

▸ **load**(...`modules`: ContainerModule[]): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[load](_moduleref_.moduleref.md#load)*

Defined in node_modules/inversify/dts/container/container.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`...modules` | ContainerModule[] |

**Returns:** *void*

___

###  loadAsync

▸ **loadAsync**(...`modules`: AsyncContainerModule[]): *Promise‹void›*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[loadAsync](_moduleref_.moduleref.md#loadasync)*

Defined in node_modules/inversify/dts/container/container.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`...modules` | AsyncContainerModule[] |

**Returns:** *Promise‹void›*

___

###  rebind

▸ **rebind**<**T**>(`serviceIdentifier`: interfaces.ServiceIdentifier‹T›): *BindingToSyntax‹T›*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[rebind](_moduleref_.moduleref.md#rebind)*

Defined in node_modules/inversify/dts/container/container.d.ts:16

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹T› |

**Returns:** *BindingToSyntax‹T›*

___

###  resolve

▸ **resolve**<**T**>(`constructorFunction`: Newable‹T›): *T*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[resolve](_moduleref_.moduleref.md#resolve)*

Defined in node_modules/inversify/dts/container/container.d.ts:33

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`constructorFunction` | Newable‹T› |

**Returns:** *T*

___

###  restore

▸ **restore**(): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[restore](_moduleref_.moduleref.md#restore)*

Defined in node_modules/inversify/dts/container/container.d.ts:23

**Returns:** *void*

___

###  snapshot

▸ **snapshot**(): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[snapshot](_moduleref_.moduleref.md#snapshot)*

Defined in node_modules/inversify/dts/container/container.d.ts:22

**Returns:** *void*

___

###  unbind

▸ **unbind**(`serviceIdentifier`: interfaces.ServiceIdentifier‹any›): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[unbind](_moduleref_.moduleref.md#unbind)*

Defined in node_modules/inversify/dts/container/container.d.ts:17

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | interfaces.ServiceIdentifier‹any› |

**Returns:** *void*

___

###  unbindAll

▸ **unbindAll**(): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[unbindAll](_moduleref_.moduleref.md#unbindall)*

Defined in node_modules/inversify/dts/container/container.d.ts:18

**Returns:** *void*

___

###  unload

▸ **unload**(...`modules`: ContainerModule[]): *void*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[unload](_moduleref_.moduleref.md#unload)*

Defined in node_modules/inversify/dts/container/container.d.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`...modules` | ContainerModule[] |

**Returns:** *void*

___

### `Static` merge

▸ **merge**(`container1`: Container, `container2`: Container): *Container*

*Inherited from [ModuleRef](_moduleref_.moduleref.md).[merge](_moduleref_.moduleref.md#static-merge)*

Defined in node_modules/inversify/dts/container/container.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`container1` | Container |
`container2` | Container |

**Returns:** *Container*
