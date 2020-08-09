---
id: "_core_plugin_.pluginmodule"
title: "PluginModule"
sidebar_label: "PluginModule"
---

## Hierarchy

* **PluginModule**

## Implements

* [Service](../interfaces/_interfaces_.service.md)

## Index

### Properties

* [[storeKey]](_core_plugin_.pluginmodule.md#optional-readonly-[storekey])
* [enhancer](_core_plugin_.pluginmodule.md#optional-enhancer)
* [middleware](_core_plugin_.pluginmodule.md#optional-middleware)
* [name](_core_plugin_.pluginmodule.md#optional-name)
* [provider](_core_plugin_.pluginmodule.md#optional-provider)

### Methods

* [afterCombineRootReducers](_core_plugin_.pluginmodule.md#optional-aftercombinerootreducers)
* [afterCreateStore](_core_plugin_.pluginmodule.md#optional-aftercreatestore)
* [beforeCombineRootReducers](_core_plugin_.pluginmodule.md#optional-beforecombinerootreducers)
* [preloadedStateHandler](_core_plugin_.pluginmodule.md#optional-preloadedstatehandler)

## Properties

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[[storeKey]](../interfaces/_interfaces_.service.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L29)*

inject enhancer for Redux

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L26)*

inject middleware for Redux

___

### `Optional` name

• **name**? : *undefined | string*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[name](../interfaces/_interfaces_.service.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L18)*

As a key in reducers object map

___

### `Optional` provider

• **provider**? : *FunctionComponent*

*Defined in [packages/reactant-module/src/core/plugin.ts:43](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L43)*

Define a React Provider for the current PluginModule

## Methods

### `Optional` afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *Reducer*

*Defined in [packages/reactant-module/src/core/plugin.ts:40](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L40)*

As hook after combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Defined in [packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L32)*

As hook after createStore

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

### `Optional` beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Defined in [packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L37)*

As hook before combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Defined in [packages/reactant-module/src/core/plugin.ts:21](https://github.com/unadlib/reactant/blob/3ec6ab3/packages/reactant-module/src/core/plugin.ts#L21)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*
