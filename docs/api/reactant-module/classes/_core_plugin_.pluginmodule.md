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

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Defined in [packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L26)*

inject enhancer for Redux

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L23)*

inject middleware for Redux

___

### `Optional` provider

• **provider**? : *FunctionComponent*

*Defined in [packages/reactant-module/src/core/plugin.ts:40](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L40)*

Define a React Provider for the current PluginModule

## Methods

### `Optional` afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *Reducer*

*Defined in [packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L37)*

As hook after combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Defined in [packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L29)*

As hook after createStore

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

### `Optional` beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Defined in [packages/reactant-module/src/core/plugin.ts:34](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L34)*

As hook before combine rootReducers

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Defined in [packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-module/src/core/plugin.ts#L18)*

preloaded state handler for Redux

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*
