---
id: "_core_createstore_"
title: "core/createStore"
sidebar_label: "core/createStore"
---

## Index

### Functions

* [createStore](_core_createstore_.md#createstore)

## Functions

###  createStore

▸ **createStore**<**T**>(`modules`: ModuleOptions[], `container`: Container, `ServiceIdentifiers`: ServiceIdentifiersMap, `loadedModules`: Set‹any›, `load`: function, `pluginHooks`: [PluginHooks](_interfaces_.md#pluginhooks), `preloadedState?`: PreloadedState‹T›, `devOptions`: [DevOptions](../interfaces/_interfaces_.devoptions.md), `originalStore?`: [ReactantStore](_interfaces_.md#reactantstore), `beforeReplaceReducer?`: undefined | function): *Store‹any, AnyAction‹›› & object*

*Defined in [packages/reactant-module/src/core/createStore.ts:34](https://github.com/unadlib/reactant/blob/9277266/packages/reactant-module/src/core/createStore.ts#L34)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **modules**: *ModuleOptions[]*

▪ **container**: *Container*

▪ **ServiceIdentifiers**: *ServiceIdentifiersMap*

▪ **loadedModules**: *Set‹any›*

▪ **load**: *function*

▸ (...`args`: Parameters‹[Loader](_interfaces_.md#loader)›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | Parameters‹[Loader](_interfaces_.md#loader)› |

▪ **pluginHooks**: *[PluginHooks](_interfaces_.md#pluginhooks)*

▪`Optional`  **preloadedState**: *PreloadedState‹T›*

▪`Default value`  **devOptions**: *[DevOptions](../interfaces/_interfaces_.devoptions.md)*= {}

▪`Optional`  **originalStore**: *[ReactantStore](_interfaces_.md#reactantstore)*

▪`Optional`  **beforeReplaceReducer**: *undefined | function*

**Returns:** *Store‹any, AnyAction‹›› & object*
