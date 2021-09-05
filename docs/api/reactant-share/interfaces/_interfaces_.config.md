---
id: "_interfaces_.config"
title: "Config"
sidebar_label: "Config"
---

## Type parameters

▪ **T**

## Hierarchy

* Config‹T›

  ↳ **Config**

## Index

### Properties

* [containerOptions](_interfaces_.config.md#optional-containeroptions)
* [devOptions](_interfaces_.config.md#optional-devoptions)
* [main](_interfaces_.config.md#main)
* [modules](_interfaces_.config.md#optional-modules)
* [preloadedState](_interfaces_.config.md#optional-preloadedstate)
* [render](_interfaces_.config.md#render)
* [share](_interfaces_.config.md#share)

## Properties

### `Optional` containerOptions

• **containerOptions**? : *ContainerOptions*

*Inherited from [Config](_interfaces_.config.md).[containerOptions](_interfaces_.config.md#optional-containeroptions)*

*Defined in [packages/reactant/src/interfaces.ts:26](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L26)*

Dependent injection container options.

___

### `Optional` devOptions

• **devOptions**? : *DevOptions*

*Inherited from [Config](_interfaces_.config.md).[devOptions](_interfaces_.config.md#optional-devoptions)*

*Defined in [packages/reactant/src/interfaces.ts:34](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L34)*

Reactant's development setting options.

___

###  main

• **main**: *ReactModuleOptions‹T›*

*Inherited from [Config](_interfaces_.config.md).[main](_interfaces_.config.md#main)*

*Defined in [packages/reactant/src/interfaces.ts:14](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L14)*

As the main start-up module.

___

### `Optional` modules

• **modules**? : *ReactModuleOptions[]*

*Inherited from [Config](_interfaces_.config.md).[modules](_interfaces_.config.md#optional-modules)*

*Defined in [packages/reactant/src/interfaces.ts:22](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L22)*

Importing the injected dependency modules.

___

### `Optional` preloadedState

• **preloadedState**? : *TypePreloadedState‹any›*

*Inherited from [Config](_interfaces_.config.md).[preloadedState](_interfaces_.config.md#optional-preloadedstate)*

*Defined in [packages/reactant/src/interfaces.ts:30](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L30)*

Preloaded state of shared state for Redux.

___

###  render

• **render**: *function*

*Inherited from [Config](_interfaces_.config.md).[render](_interfaces_.config.md#render)*

*Defined in [packages/reactant/src/interfaces.ts:18](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/interfaces.ts#L18)*

As a rendering function for any React renderer.

#### Type declaration:

▸ (`element`: Element, ...`args`: any[]): *Element | void*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`...args` | any[] |

___

###  share

• **share**: *[ISharedAppOptions](_interfaces_.isharedappoptions.md)*

*Defined in [packages/reactant-share/src/interfaces.ts:77](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-share/src/interfaces.ts#L77)*

Reactant shared app options.
