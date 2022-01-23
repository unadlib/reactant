# Class: PluginModule

## Implements

- [`Service`](../interfaces/Service.md)

## Table of contents

### Constructors

- [constructor](PluginModule.md#constructor)

### Properties

- [[storeKey]](PluginModule.md#[storekey])
- [enhancer](PluginModule.md#enhancer)
- [middleware](PluginModule.md#middleware)
- [provider](PluginModule.md#provider)

### Methods

- [afterCombineRootReducers](PluginModule.md#aftercombinerootreducers)
- [afterCreateStore](PluginModule.md#aftercreatestore)
- [beforeCombineRootReducers](PluginModule.md#beforecombinerootreducers)
- [preloadedStateHandler](PluginModule.md#preloadedstatehandler)

## Constructors

### constructor

• **new PluginModule**()

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

[Service](../interfaces/Service.md).[[storeKey]](../interfaces/Service.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L15)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:26](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L26)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Defined in

[packages/reactant-module/src/core/plugin.ts:23](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L23)

___

### provider

• `Optional` **provider**: `FunctionComponent`<{}\>

Define a React Provider for the current PluginModule

#### Defined in

[packages/reactant-module/src/core/plugin.ts:40](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L40)

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

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L37)

___

### afterCreateStore

▸ `Optional` **afterCreateStore**(`store`): `void`

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store`<`any`, `AnyAction`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/core/plugin.ts:29](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L29)

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

[packages/reactant-module/src/core/plugin.ts:34](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L34)

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

[packages/reactant-module/src/core/plugin.ts:18](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/plugin.ts#L18)
