---
id: "_interfaces_.config"
title: "Config"
sidebar_label: "Config"
---

## Type parameters

▪ **T**

## Hierarchy

* **Config**

## Index

### Properties

* [containerOptions](_interfaces_.config.md#optional-containeroptions)
* [devOptions](_interfaces_.config.md#optional-devoptions)
* [main](_interfaces_.config.md#main)
* [modules](_interfaces_.config.md#optional-modules)
* [preloadedState](_interfaces_.config.md#optional-preloadedstate)
* [render](_interfaces_.config.md#render)

## Properties

### `Optional` containerOptions

• **containerOptions**? : *ContainerOptions*

*Defined in [interfaces.ts:26](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L26)*

Dependent injection container options.

___

### `Optional` devOptions

• **devOptions**? : *DevOptions*

*Defined in [interfaces.ts:34](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L34)*

Reactant's development setting options.

___

###  main

• **main**: *ServiceIdentifier‹T›*

*Defined in [interfaces.ts:14](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L14)*

As the main start-up module.

___

### `Optional` modules

• **modules**? : *ReactModuleOptions[]*

*Defined in [interfaces.ts:22](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L22)*

Importing the injected dependency modules.

___

### `Optional` preloadedState

• **preloadedState**? : *TypePreloadedState‹any›*

*Defined in [interfaces.ts:30](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L30)*

Preloaded state of shared state for Redux.

___

###  render

• **render**: *function*

*Defined in [interfaces.ts:18](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant/src/interfaces.ts#L18)*

As a rendering function for any React renderer.

#### Type declaration:

▸ (`element`: Element, ...`args`: any[]): *Element | void*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`...args` | any[] |
