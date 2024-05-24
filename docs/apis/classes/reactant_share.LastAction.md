# Class: LastAction

[reactant-share](../modules/reactant_share.md).LastAction

## Hierarchy

- [`PluginModule`](reactant_share.PluginModule.md)

  ↳ **`LastAction`**

## Table of contents

### Constructors

- [constructor](reactant_share.LastAction.md#constructor)

### Properties

- [[storeKey]](reactant_share.LastAction.md#[storekey])
- [\_sequence](reactant_share.LastAction.md#_sequence)
- [enhancer](reactant_share.LastAction.md#enhancer)
- [middleware](reactant_share.LastAction.md#middleware)
- [options](reactant_share.LastAction.md#options)
- [provider](reactant_share.LastAction.md#provider)
- [stateKey](reactant_share.LastAction.md#statekey)

### Accessors

- [action](reactant_share.LastAction.md#action)
- [sequence](reactant_share.LastAction.md#sequence)

### Methods

- [afterCombineRootReducers](reactant_share.LastAction.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.LastAction.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_share.LastAction.md#beforecombinerootreducers)
- [preloadedStateHandler](reactant_share.LastAction.md#preloadedstatehandler)

## Constructors

### constructor

• **new LastAction**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILastActionOptions`](../interfaces/reactant_share.ILastActionOptions.md) |

#### Overrides

[PluginModule](reactant_share.PluginModule.md).[constructor](reactant_share.PluginModule.md#constructor)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L47)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: [`ReactantStore`](../modules/reactant_share.md#reactantstore)

#### Overrides

[PluginModule](reactant_share.PluginModule.md).[[storeKey]](reactant_share.PluginModule.md#[storekey])

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:41](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L41)

___

### \_sequence

• `Private` **\_sequence**: `undefined` \| `number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:45](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L45)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[enhancer](reactant_share.PluginModule.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[middleware](reactant_share.PluginModule.md#middleware)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`ILastActionOptions`](../interfaces/reactant_share.ILastActionOptions.md)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L47)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[provider](reactant_share.PluginModule.md#provider)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L52)

___

### stateKey

• **stateKey**: `string`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:43](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L43)

## Accessors

### action

• `get` **action**(): [`ILastActionData`](../modules/reactant_share.md#ilastactiondata)

#### Returns

[`ILastActionData`](../modules/reactant_share.md#ilastactiondata)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:110](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L110)

___

### sequence

• `get` **sequence**(): `number`

#### Returns

`number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:106](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L106)

• `set` **sequence**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:102](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L102)

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

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[afterCombineRootReducers](reactant_share.PluginModule.md#aftercombinerootreducers)

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

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[afterCreateStore](reactant_share.PluginModule.md#aftercreatestore)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L37)

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

[PluginModule](reactant_share.PluginModule.md).[beforeCombineRootReducers](reactant_share.PluginModule.md#beforecombinerootreducers)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L52)

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

[PluginModule](reactant_share.PluginModule.md).[preloadedStateHandler](reactant_share.PluginModule.md#preloadedstatehandler)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L20)
