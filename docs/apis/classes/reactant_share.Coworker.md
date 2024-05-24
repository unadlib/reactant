# Class: Coworker

[reactant-share](../modules/reactant_share.md).Coworker

## Hierarchy

- [`PluginModule`](reactant_share.PluginModule.md)

  ↳ **`Coworker`**

## Table of contents

### Constructors

- [constructor](reactant_share.Coworker.md#constructor)

### Properties

- [[storeKey]](reactant_share.Coworker.md#[storekey])
- [coworkerOptions](reactant_share.Coworker.md#coworkeroptions)
- [enhancer](reactant_share.Coworker.md#enhancer)
- [ignoreSyncStateKeys](reactant_share.Coworker.md#ignoresyncstatekeys)
- [middleware](reactant_share.Coworker.md#middleware)
- [portDetector](reactant_share.Coworker.md#portdetector)
- [provider](reactant_share.Coworker.md#provider)
- [proxyModuleKeys](reactant_share.Coworker.md#proxymodulekeys)
- [proxyModules](reactant_share.Coworker.md#proxymodules)
- [sequence](reactant_share.Coworker.md#sequence)
- [storage](reactant_share.Coworker.md#storage)
- [transport](reactant_share.Coworker.md#transport)

### Accessors

- [enablePatchesChecker](reactant_share.Coworker.md#enablepatcheschecker)
- [isCoworker](reactant_share.Coworker.md#iscoworker)
- [isMain](reactant_share.Coworker.md#ismain)
- [name](reactant_share.Coworker.md#name)
- [prefix](reactant_share.Coworker.md#prefix)
- [ref](reactant_share.Coworker.md#ref)

### Methods

- [addIgnoreSyncStateKeys](reactant_share.Coworker.md#addignoresyncstatekeys)
- [addProxyModules](reactant_share.Coworker.md#addproxymodules)
- [afterCombineRootReducers](reactant_share.Coworker.md#aftercombinerootreducers)
- [afterCreateStore](reactant_share.Coworker.md#aftercreatestore)
- [applyProxyExecute](reactant_share.Coworker.md#applyproxyexecute)
- [applyProxyModules](reactant_share.Coworker.md#applyproxymodules)
- [applyProxyState](reactant_share.Coworker.md#applyproxystate)
- [beforeCombineRootReducers](reactant_share.Coworker.md#beforecombinerootreducers)
- [createTransport](reactant_share.Coworker.md#createtransport)
- [handleSyncAllState](reactant_share.Coworker.md#handlesyncallstate)
- [ignoreStates](reactant_share.Coworker.md#ignorestates)
- [preloadedStateHandler](reactant_share.Coworker.md#preloadedstatehandler)
- [pushAllState](reactant_share.Coworker.md#pushallstate)
- [requestSyncAllState](reactant_share.Coworker.md#requestsyncallstate)

## Constructors

### constructor

• **new Coworker**(`portDetector`, `coworkerOptions`, `storage?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `portDetector` | [`PortDetector`](reactant_share.PortDetector.md) |
| `coworkerOptions` | [`ICoworkerOptions`](../interfaces/reactant_share.ICoworkerOptions.md) |
| `storage?` | [`Storage`](reactant_share.Storage.md) |

#### Overrides

[PluginModule](reactant_share.PluginModule.md).[constructor](reactant_share.PluginModule.md#constructor)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:105](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L105)

## Properties

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[[storeKey]](reactant_share.PluginModule.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/plugin.ts:15](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L15)

___

### coworkerOptions

• `Protected` **coworkerOptions**: [`ICoworkerOptions`](../interfaces/reactant_share.ICoworkerOptions.md)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:107](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L107)

___

### enhancer

• `Optional` **enhancer**: `Function`

inject enhancer for Redux

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[enhancer](reactant_share.PluginModule.md#enhancer)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:32](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L32)

___

### ignoreSyncStateKeys

• `Protected` **ignoreSyncStateKeys**: `string`[]

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:100](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L100)

___

### middleware

• `Optional` **middleware**: `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>

inject middleware for Redux

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[middleware](reactant_share.PluginModule.md#middleware)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L27)

___

### portDetector

• `Protected` **portDetector**: [`PortDetector`](reactant_share.PortDetector.md)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:106](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L106)

___

### provider

• `Optional` **provider**: `FunctionComponent`<`any`\>

Define a React Provider for the current PluginModule

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[provider](reactant_share.PluginModule.md#provider)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:52](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L52)

___

### proxyModuleKeys

• `Protected` **proxyModuleKeys**: `string`[] = `[]`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:98](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L98)

___

### proxyModules

• `Protected` **proxyModules**: [`ServiceIdentifier`](../modules/reactant_share.md#serviceidentifier)<`unknown`\>[]

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:96](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L96)

___

### sequence

• `Protected` **sequence**: `number` = `-1`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:323](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L323)

___

### storage

• `Protected` `Optional` **storage**: [`Storage`](reactant_share.Storage.md)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:108](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L108)

___

### transport

• `Optional` **transport**: [`SymmetricTransport`](../modules/reactant_share.md#symmetrictransport)<`ProxyExecutorInteraction`\>

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:103](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L103)

## Accessors

### enablePatchesChecker

• `Protected` `get` **enablePatchesChecker**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:260](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L260)

___

### isCoworker

• `get` **isCoworker**(): `boolean`

Whether the current process is the coworker process.

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:227](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L227)

___

### isMain

• `get` **isMain**(): `boolean`

Whether the current process is the main process.

#### Returns

`boolean`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:234](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L234)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:220](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L220)

___

### prefix

• `Protected` `get` **prefix**(): `string`

#### Returns

`string`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:216](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L216)

___

### ref

• `Protected` `get` **ref**(): [`Ref`](../interfaces/reactant_share.Ref.md)

#### Returns

[`Ref`](../interfaces/reactant_share.Ref.md)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:319](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L319)

## Methods

### addIgnoreSyncStateKeys

▸ **addIgnoreSyncStateKeys**(`keys`): `void`

Add ignore sync state keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:256](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L256)

___

### addProxyModules

▸ **addProxyModules**(`modules`): `void`

Add proxy modules.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modules` | [`ServiceIdentifier`](../modules/reactant_share.md#serviceidentifier)<`unknown`\>[] |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:242](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L242)

___

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

▸ **afterCreateStore**(`store`): [`Store`](../modules/reactant_share.md#store)

As hook after createStore

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](../modules/reactant_share.md#store) |

#### Returns

[`Store`](../modules/reactant_share.md#store)

#### Overrides

[PluginModule](reactant_share.PluginModule.md).[afterCreateStore](reactant_share.PluginModule.md#aftercreatestore)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:264](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L264)

___

### applyProxyExecute

▸ `Protected` **applyProxyExecute**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:433](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L433)

___

### applyProxyModules

▸ `Protected` **applyProxyModules**(`proxyModules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyModules` | [`ServiceIdentifier`](../modules/reactant_share.md#serviceidentifier)<`unknown`\>[] |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:450](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L450)

___

### applyProxyState

▸ `Protected` **applyProxyState**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:325](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L325)

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

#### Inherited from

[PluginModule](reactant_share.PluginModule.md).[beforeCombineRootReducers](reactant_share.PluginModule.md#beforecombinerootreducers)

#### Defined in

[packages/reactant-module/src/core/plugin.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/plugin.ts#L42)

___

### createTransport

▸ `Protected` **createTransport**(): `undefined` \| [`SymmetricTransport`](../modules/reactant_share.md#symmetrictransport)<`ProxyExecutorInteraction`\>

#### Returns

`undefined` \| [`SymmetricTransport`](../modules/reactant_share.md#symmetrictransport)<`ProxyExecutorInteraction`\>

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:157](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L157)

___

### handleSyncAllState

▸ `Protected` **handleSyncAllState**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.sequence` | `number` |
| `options.state` | `State` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:401](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L401)

___

### ignoreStates

▸ `Protected` **ignoreStates**(`state`, `currentState`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `State` |
| `currentState` | `State` |

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:425](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L425)

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

___

### pushAllState

▸ `Protected` **pushAllState**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:380](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L380)

___

### requestSyncAllState

▸ `Protected` **requestSyncAllState**(): `void`

#### Returns

`void`

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:421](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L421)
