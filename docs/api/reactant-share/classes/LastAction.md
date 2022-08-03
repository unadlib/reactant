# Class: LastAction

## Hierarchy

- [`PluginModule`](PluginModule.md)

  ↳ **`LastAction`**

## Table of contents

### Constructors

- [constructor](LastAction.md#constructor)

### Properties

- [[storeKey]](LastAction.md#[storekey])
- [\_sequence](LastAction.md#_sequence)
- [enhancer](LastAction.md#enhancer)
- [middleware](LastAction.md#middleware)
- [options](LastAction.md#options)
- [provider](LastAction.md#provider)
- [stateKey](LastAction.md#statekey)

### Accessors

- [action](LastAction.md#action)
- [sequence](LastAction.md#sequence)

### Methods

- [afterCombineRootReducers](LastAction.md#aftercombinerootreducers)
- [afterCreateStore](LastAction.md#aftercreatestore)
- [beforeCombineRootReducers](LastAction.md#beforecombinerootreducers)
- [preloadedStateHandler](LastAction.md#preloadedstatehandler)

## Constructors

### constructor

• **new LastAction**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILastActionOptions`](../interfaces/ILastActionOptions.md) |

#### Overrides

[PluginModule](PluginModule.md).[constructor](PluginModule.md#constructor)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:37](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L37)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: [`ReactantStore`](../modules.md#reactantstore)

#### Overrides

[PluginModule](PluginModule.md).[[storeKey]](PluginModule.md#[storekey])

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:31](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L31)

___

### \_sequence

• `Private` **\_sequence**: `undefined` \| `number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:35](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L35)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[PluginModule](PluginModule.md).[enhancer](PluginModule.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L32)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[PluginModule](PluginModule.md).[middleware](PluginModule.md#middleware)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`ILastActionOptions`](../interfaces/ILastActionOptions.md)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Inherited from

[PluginModule](PluginModule.md).[provider](PluginModule.md#provider)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L52)

___

### stateKey

• **stateKey**: `string`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:33](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L33)

## Accessors

### action

• `get` **action**(): [`ILastActionState`](../interfaces/ILastActionState.md)<`any`\>

#### Returns

[`ILastActionState`](../interfaces/ILastActionState.md)<`any`\>

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:96](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L96)

___

### sequence

• `get` **sequence**(): `number`

#### Returns

`number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:92](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L92)

• `set` **sequence**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:88](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L88)

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

#### Inherited from

[PluginModule](PluginModule.md).[afterCombineRootReducers](PluginModule.md#aftercombinerootreducers)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:47](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L47)

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

#### Inherited from

[PluginModule](PluginModule.md).[afterCreateStore](PluginModule.md#aftercreatestore)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L37)

___

### beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`): `ReducersMapObject`<`any`, `Action`<`any`\>\>

As hook before combine rootReducers

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducers` | `ReducersMapObject`<`any`, `Action`<`any`\>\> |

#### Returns

`ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Overrides

[PluginModule](PluginModule.md).[beforeCombineRootReducers](PluginModule.md#beforecombinerootreducers)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:42](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-last-action/src/lastAction.ts#L42)

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

#### Inherited from

[PluginModule](PluginModule.md).[preloadedStateHandler](PluginModule.md#preloadedstatehandler)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/core/plugin.ts#L20)
