---
id: "_redux_"
title: "redux"
sidebar_label: "redux"
---

## Index

### Interfaces

* [Scheme](../interfaces/_redux_.scheme.md)

### Type aliases

* [Actions](_redux_.md#actions)
* [ServiceName](_redux_.md#servicename)
* [State](_redux_.md#state)

### Functions

* [redux](_redux_.md#const-redux)

## Type aliases

###  Actions

Ƭ **Actions**: *object*

*Defined in [redux.ts:15](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-redux/src/redux.ts#L15)*

#### Type declaration:

___

###  ServiceName

Ƭ **ServiceName**: *Pick‹Service, "name"›*

*Defined in [redux.ts:4](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-redux/src/redux.ts#L4)*

___

###  State

Ƭ **State**: *object*

*Defined in [redux.ts:11](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-redux/src/redux.ts#L11)*

#### Type declaration:

## Functions

### `Const` redux

▸ **redux**<**S**, **A**>(`scheme`: [Scheme](../interfaces/_redux_.scheme.md)‹S, A›): *[Actions](_redux_.md#actions)‹A› & Service‹[State](_redux_.md#state)‹S›› & [State](_redux_.md#state)‹S›*

*Defined in [redux.ts:19](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-redux/src/redux.ts#L19)*

**Type parameters:**

▪ **S**: *Record‹string, any›*

▪ **A**: *Record‹string, function›*

**Parameters:**

Name | Type |
------ | ------ |
`scheme` | [Scheme](../interfaces/_redux_.scheme.md)‹S, A› |

**Returns:** *[Actions](_redux_.md#actions)‹A› & Service‹[State](_redux_.md#state)‹S›› & [State](_redux_.md#state)‹S›*
