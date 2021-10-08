---
id: "_redux_"
title: "redux()"
sidebar_label: "redux()"
---

## Index

### Interfaces

* [Scheme](../interfaces/_redux_.scheme.md)

### Type aliases

* [Actions](_redux_.md#actions)
* [State](_redux_.md#state)

### Functions

* [redux](_redux_.md#const-redux)

## Type aliases

###  Actions

Ƭ **Actions**: *object*

*Defined in [redux.ts:14](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-redux/src/redux.ts#L14)*

#### Type declaration:

___

###  State

Ƭ **State**: *object*

*Defined in [redux.ts:10](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-redux/src/redux.ts#L10)*

#### Type declaration:

## Functions

### `Const` redux

▸ **redux**<**S**, **A**>(`scheme`: [Scheme](../interfaces/_redux_.scheme.md)‹S, A›): *[Actions](_redux_.md#actions)‹A› & Service‹[State](_redux_.md#state)‹S›› & [State](_redux_.md#state)‹S›*

*Defined in [redux.ts:18](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-redux/src/redux.ts#L18)*

**Type parameters:**

▪ **S**: *Record‹string, any›*

▪ **A**: *Record‹string, function›*

**Parameters:**

Name | Type |
------ | ------ |
`scheme` | [Scheme](../interfaces/_redux_.scheme.md)‹S, A› |

**Returns:** *[Actions](_redux_.md#actions)‹A› & Service‹[State](_redux_.md#state)‹S›› & [State](_redux_.md#state)‹S›*
