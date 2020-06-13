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

*Defined in [packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L15)*

___

### `Optional` enhancer

• **enhancer**? : *Function*

*Defined in [packages/reactant-module/src/core/plugin.ts:25](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L25)*

___

### `Optional` middleware

• **middleware**? : *Middleware*

*Defined in [packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L23)*

___

### `Optional` name

• **name**? : *undefined | string*

*Implementation of [Service](../interfaces/_interfaces_.service.md).[name](../interfaces/_interfaces_.service.md#optional-name)*

*Defined in [packages/reactant-module/src/core/plugin.ts:17](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L17)*

___

### `Optional` provider

• **provider**? : *FunctionComponent*

*Defined in [packages/reactant-module/src/core/plugin.ts:35](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L35)*

## Methods

### `Optional` afterCombineRootReducers

▸ **afterCombineRootReducers**(`rootReducer`: Reducer): *Reducer*

*Defined in [packages/reactant-module/src/core/plugin.ts:33](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`rootReducer` | Reducer |

**Returns:** *Reducer*

___

### `Optional` afterCreateStore

▸ **afterCreateStore**(`store`: Store): *void*

*Defined in [packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`store` | Store |

**Returns:** *void*

___

### `Optional` beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`: ReducersMapObject): *ReducersMapObject*

*Defined in [packages/reactant-module/src/core/plugin.ts:31](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`reducers` | ReducersMapObject |

**Returns:** *ReducersMapObject*

___

### `Optional` preloadedStateHandler

▸ **preloadedStateHandler**(`preloadedState`: PreloadedState‹any›): *PreloadedState‹any›*

*Defined in [packages/reactant-module/src/core/plugin.ts:19](https://github.com/unadlib/reactant/blob/990bad3/packages/reactant-module/src/core/plugin.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`preloadedState` | PreloadedState‹any› |

**Returns:** *PreloadedState‹any›*
