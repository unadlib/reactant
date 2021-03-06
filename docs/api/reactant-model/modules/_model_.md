---
id: "_model_"
title: "model"
sidebar_label: "model"
---

## Index

### Interfaces

* [Scheme](../interfaces/_model_.scheme.md)

### Type aliases

* [Actions](_model_.md#actions)
* [ServiceName](_model_.md#servicename)

### Functions

* [model](_model_.md#const-model)

## Type aliases

###  Actions

Ƭ **Actions**: *object*

*Defined in [model.ts:18](https://github.com/unadlib/reactant/blob/64ece1ec/packages/reactant-model/src/model.ts#L18)*

#### Type declaration:

___

###  ServiceName

Ƭ **ServiceName**: *Pick‹Service, "name"›*

*Defined in [model.ts:11](https://github.com/unadlib/reactant/blob/64ece1ec/packages/reactant-model/src/model.ts#L11)*

## Functions

### `Const` model

▸ **model**<**S**, **A**>(`scheme`: [Scheme](../interfaces/_model_.scheme.md)‹S, A›): *[Actions](_model_.md#actions)‹A› & Service‹S› & S*

*Defined in [model.ts:22](https://github.com/unadlib/reactant/blob/64ece1ec/packages/reactant-model/src/model.ts#L22)*

**Type parameters:**

▪ **S**: *Record‹string, any›*

▪ **A**: *Record‹string, function›*

**Parameters:**

Name | Type |
------ | ------ |
`scheme` | [Scheme](../interfaces/_model_.scheme.md)‹S, A› |

**Returns:** *[Actions](_model_.md#actions)‹A› & Service‹S› & S*
