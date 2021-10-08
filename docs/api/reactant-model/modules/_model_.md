---
id: "_model_"
title: "model()"
sidebar_label: "model()"
---

## Index

### Interfaces

* [Scheme](../interfaces/_model_.scheme.md)

### Type aliases

* [Actions](_model_.md#actions)

### Functions

* [model](_model_.md#const-model)

## Type aliases

###  Actions

Ƭ **Actions**: *object*

*Defined in [model.ts:18](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-model/src/model.ts#L18)*

#### Type declaration:

## Functions

### `Const` model

▸ **model**<**S**, **A**>(`scheme`: [Scheme](../interfaces/_model_.scheme.md)‹S, A›): *[Actions](_model_.md#actions)‹A› & Service‹S› & S*

*Defined in [model.ts:22](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-model/src/model.ts#L22)*

**Type parameters:**

▪ **S**: *Record‹string, any›*

▪ **A**: *Record‹string, function›*

**Parameters:**

Name | Type |
------ | ------ |
`scheme` | [Scheme](../interfaces/_model_.scheme.md)‹S, A› |

**Returns:** *[Actions](_model_.md#actions)‹A› & Service‹S› & S*
