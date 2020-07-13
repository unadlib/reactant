---
id: "_createcontainer_.custommetadatareader"
title: "CustomMetadataReader"
sidebar_label: "CustomMetadataReader"
---

## Hierarchy

* MetadataReader

  ↳ **CustomMetadataReader**

## Implements

* MetadataReader

## Index

### Methods

* [getConstructorMetadata](_createcontainer_.custommetadatareader.md#getconstructormetadata)
* [getPropertiesMetadata](_createcontainer_.custommetadatareader.md#getpropertiesmetadata)

## Methods

###  getConstructorMetadata

▸ **getConstructorMetadata**(`constructorFunc`: [Function](../interfaces/_interfaces_.module.md#function)): *ConstructorMetadata*

*Overrides void*

*Defined in [packages/reactant-di/src/createContainer.ts:25](https://github.com/unadlib/reactant/blob/1668a29/packages/reactant-di/src/createContainer.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`constructorFunc` | [Function](../interfaces/_interfaces_.module.md#function) |

**Returns:** *ConstructorMetadata*

___

###  getPropertiesMetadata

▸ **getPropertiesMetadata**(`constructorFunc`: [Function](../interfaces/_interfaces_.module.md#function)): *MetadataMap*

*Inherited from [CustomMetadataReader](_createcontainer_.custommetadatareader.md).[getPropertiesMetadata](_createcontainer_.custommetadatareader.md#getpropertiesmetadata)*

Defined in node_modules/inversify/dts/planning/metadata_reader.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`constructorFunc` | [Function](../interfaces/_interfaces_.module.md#function) |

**Returns:** *MetadataMap*
