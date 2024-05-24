# Class: PluginModule

[reactant-module](../modules/reactant_module.md).PluginModule

## Implements

- [`Service`](../interfaces/reactant_module.Service.md)

## Table of contents

### Constructors

- [constructor](reactant_module.PluginModule.md#constructor)

### Properties

- [[storeKey]](reactant_module.PluginModule.md#[storekey])
- [enhancer](reactant_module.PluginModule.md#enhancer)
- [middleware](reactant_module.PluginModule.md#middleware)
- [provider](reactant_module.PluginModule.md#provider)

### Methods

- [afterCombineRootReducers](reactant_module.PluginModule.md#aftercombinerootreducers)
- [afterCreateStore](reactant_module.PluginModule.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_module.PluginModule.md#beforecombinerootreducers)
- [preloadedStateHandler](reactant_module.PluginModule.md#preloadedstatehandler)

## Constructors

### constructor

• **new PluginModule**()

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

[Service](../interfaces/reactant_module.Service.md).[[storeKey]](../interfaces/reactant_module.Service.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L15)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L27)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L52)

## Methods

### afterCombineRootReducers

▸ `Optional` **afterCombineRootReducers**(`rootReducer`): `Reducer`

As hook after combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer` |

#### Returns

`Reducer`

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L47)

___

### afterCreateStore

▸ `Optional` **afterCreateStore**(`store`): `Store`<`any`, `AnyAction`\>

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L37)

___

### beforeCombineRootReducers

▸ `Optional` **beforeCombineRootReducers**(`reducers`): `ReducersMapObject`<`any`, `Action`<`any`\>\>

As hook before combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducers` | `ReducersMapObject`<`any`, `Action`<`any`\>\> |

#### Returns

`ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Defined in

[packages/reactant-module/src/core/plugin.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L42)

___

### preloadedStateHandler

▸ `Optional` **preloadedStateHandler**(`preloadedState`): `Object`

preloaded state handler for Redux

#### Parameters

| Name | Type |
| :------ | :------ |
| `preloadedState` | `Object` |

#### Returns

`Object`

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L20)
