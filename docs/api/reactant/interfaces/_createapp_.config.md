[reactant](../README.md) › [Globals](../globals.md) › ["createApp"](../modules/_createapp_.md) › [Config](_createapp_.config.md)

# Interface: Config <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **Config**

## Index

### Properties

* [containerOptions](_createapp_.config.md#optional-containeroptions)
* [devOptions](_createapp_.config.md#optional-devoptions)
* [main](_createapp_.config.md#main)
* [middlewares](_createapp_.config.md#optional-middlewares)
* [modules](_createapp_.config.md#optional-modules)
* [preloadedState](_createapp_.config.md#optional-preloadedstate)
* [render](_createapp_.config.md#render)

## Properties

### `Optional` containerOptions

• **containerOptions**? : *ContainerOptions*

*Defined in [createApp.tsx:22](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L22)*

___

### `Optional` devOptions

• **devOptions**? : *DevOptions*

*Defined in [createApp.tsx:25](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L25)*

___

###  main

• **main**: *ServiceIdentifier‹T›*

*Defined in [createApp.tsx:19](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L19)*

___

### `Optional` middlewares

• **middlewares**? : *ReactantMiddleware[]*

*Defined in [createApp.tsx:23](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L23)*

___

### `Optional` modules

• **modules**? : *ReactModuleOptions[]*

*Defined in [createApp.tsx:21](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L21)*

___

### `Optional` preloadedState

• **preloadedState**? : *TypePreloadedState‹any›*

*Defined in [createApp.tsx:24](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L24)*

___

###  render

• **render**: *function*

*Defined in [createApp.tsx:20](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant/src/createApp.tsx#L20)*

#### Type declaration:

▸ (`element`: Element, ...`args`: any[]): *Element | void*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |
`...args` | any[] |
