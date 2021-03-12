---
id: "_interfaces_.factoryprovider"
title: "FactoryProvider"
sidebar_label: "FactoryProvider"
---

## Type parameters

▪ **T**

## Hierarchy

* **FactoryProvider**

## Index

### Properties

* [deps](_interfaces_.factoryprovider.md#optional-deps)
* [provide](_interfaces_.factoryprovider.md#provide)
* [useFactory](_interfaces_.factoryprovider.md#usefactory)

## Properties

### `Optional` deps

• **deps**? : *[DependencyOption](../modules/_interfaces_.md#dependencyoption)[]*

*Defined in [packages/reactant-di/src/interfaces.ts:56](https://github.com/unadlib/reactant/blob/ecf98d3/packages/reactant-di/src/interfaces.ts#L56)*

___

###  provide

• **provide**: *[ServiceIdentifier](../modules/_interfaces_.md#serviceidentifier)‹any›*

*Defined in [packages/reactant-di/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/ecf98d3/packages/reactant-di/src/interfaces.ts#L57)*

___

###  useFactory

• **useFactory**: *function*

*Defined in [packages/reactant-di/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/ecf98d3/packages/reactant-di/src/interfaces.ts#L58)*

#### Type declaration:

▸ (...`args`: any[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |
