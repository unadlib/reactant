# Class: LastAction

[reactant-last-action](../modules/reactant_last_action.md).LastAction

## Hierarchy

- `PluginModule`

  ↳ **`LastAction`**

## Table of contents

### Constructors

- [constructor](reactant_last_action.LastAction.md#constructor)

### Properties

- [[storeKey]](reactant_last_action.LastAction.md#[storekey])
- [\_sequence](reactant_last_action.LastAction.md#_sequence)
- [enhancer](reactant_last_action.LastAction.md#enhancer)
- [middleware](reactant_last_action.LastAction.md#middleware)
- [options](reactant_last_action.LastAction.md#options)
- [provider](reactant_last_action.LastAction.md#provider)
- [stateKey](reactant_last_action.LastAction.md#statekey)

### Accessors

- [action](reactant_last_action.LastAction.md#action)
- [sequence](reactant_last_action.LastAction.md#sequence)

### Methods

- [afterCombineRootReducers](reactant_last_action.LastAction.md#aftercombinerootreducers)
- [afterCreateStore](reactant_last_action.LastAction.md#aftercreatestore)
- [beforeCombineRootReducers](reactant_last_action.LastAction.md#beforecombinerootreducers)
- [preloadedStateHandler](reactant_last_action.LastAction.md#preloadedstatehandler)

## Constructors

### constructor

• **new LastAction**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILastActionOptions`](../interfaces/reactant_last_action.ILastActionOptions.md) |

#### Overrides

PluginModule.constructor

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:41](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L41)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `ReactantStore`

#### Overrides

PluginModule.\_\_@storeKey@101074

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:35](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L35)

___

### \_sequence

• `Private` **\_sequence**: `undefined` \| `number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:39](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L39)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

PluginModule.enhancer

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L32)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

PluginModule.middleware

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L27)

___

### options

• **options**: [`ILastActionOptions`](../interfaces/reactant_last_action.ILastActionOptions.md)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:41](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L41)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Inherited from

PluginModule.provider

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L52)

___

### stateKey

• **stateKey**: `string`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:37](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L37)

## Accessors

### action

• `get` **action**(): [`ILastActionState`](../interfaces/reactant_last_action.ILastActionState.md)<`any`\>

#### Returns

[`ILastActionState`](../interfaces/reactant_last_action.ILastActionState.md)<`any`\>

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:104](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L104)

___

### sequence

• `get` **sequence**(): `number`

#### Returns

`number`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:100](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L100)

• `set` **sequence**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:96](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L96)

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

PluginModule.afterCombineRootReducers

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

#### Inherited from

PluginModule.afterCreateStore

#### Defined in

[packages/reactant-module/src/core/plugin.ts:37](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L37)

___

### beforeCombineRootReducers

▸ **beforeCombineRootReducers**(`reducers`): `ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducers` | `ReducersMapObject`<`any`, `Action`<`any`\>\> |

#### Returns

`ReducersMapObject`<`any`, `Action`<`any`\>\>

#### Overrides

PluginModule.beforeCombineRootReducers

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:46](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-last-action/src/lastAction.ts#L46)

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

PluginModule.preloadedStateHandler

#### Defined in

[packages/reactant-module/src/core/plugin.ts:20](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/plugin.ts#L20)
