# Class: PluginModule

[reactant](../modules/reactant.md).PluginModule

## Implements

- [`Service`](../interfaces/reactant.Service.md)

## Table of contents

### Constructors

- [constructor](reactant.PluginModule.md#constructor)

### Properties

- [[storeKey]](reactant.PluginModule.md#[storekey])
- [enhancer](reactant.PluginModule.md#enhancer)
- [middleware](reactant.PluginModule.md#middleware)
- [provider](reactant.PluginModule.md#provider)

### Methods

- [afterCombineRootReducers](reactant.PluginModule.md#aftercombinerootreducers)
- [afterCreateStore](reactant.PluginModule.md#aftercreatestore)
- [beforeCombineRootReducers](reactant.PluginModule.md#beforecombinerootreducers)
- [preloadedStateHandler](reactant.PluginModule.md#preloadedstatehandler)

## Constructors

### constructor

• **new PluginModule**()

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

[Service](../interfaces/reactant.Service.md).[[storeKey]](../interfaces/reactant.Service.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L15)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L52)

## Methods

### afterCombineRootReducers

▸ `Optional` **afterCombineRootReducers**(`rootReducer`): `Reducer`<`any`, `AnyAction`\>

As hook after combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootReducer` | `Reducer`<`any`, `AnyAction`\> |

#### Returns

`Reducer`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L47)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L37)

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

[packages/reactant-module/src/core/plugin.ts:42](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L42)

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

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L20)
