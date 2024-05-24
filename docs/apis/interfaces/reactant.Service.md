# Interface: Service<T\>

[reactant](../modules/reactant.md).Service

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Implemented by

- [`PluginModule`](../classes/reactant.PluginModule.md)
- [`ViewModule`](../classes/reactant.ViewModule.md)

## Table of contents

### Properties

- [[containerKey]](reactant.Service.md#[containerkey])
- [[defaultStateKey]](reactant.Service.md#[defaultstatekey])
- [[enableAutoComputedKey]](reactant.Service.md#[enableautocomputedkey])
- [[enableAutoFreezeKey]](reactant.Service.md#[enableautofreezekey])
- [[enableInspectorKey]](reactant.Service.md#[enableinspectorkey])
- [[enablePatchesKey]](reactant.Service.md#[enablepatcheskey])
- [[identifierKey]](reactant.Service.md#[identifierkey])
- [[initStateKey]](reactant.Service.md#[initstatekey])
- [[loaderKey]](reactant.Service.md#[loaderkey])
- [[modulesKey]](reactant.Service.md#[moduleskey])
- [[nameKey]](reactant.Service.md#[namekey])
- [[signalMapKey]](reactant.Service.md#[signalmapkey])
- [[stateKey]](reactant.Service.md#[statekey])
- [[storeKey]](reactant.Service.md#[storekey])
- [[strictKey]](reactant.Service.md#[strictkey])
- [[subscriptionsKey]](reactant.Service.md#[subscriptionskey])
- [[unsubscriptionsKey]](reactant.Service.md#[unsubscriptionskey])

## Properties

### [containerKey]

• `Optional` `Readonly` **[containerKey]**: `Container`

#### Defined in

[packages/reactant-module/src/interfaces.ts:98](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L98)

___

### [defaultStateKey]

• `Optional` `Readonly` **[defaultStateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:87](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L87)

___

### [enableAutoComputedKey]

• `Optional` `Readonly` **[enableAutoComputedKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:92](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L92)

___

### [enableAutoFreezeKey]

• `Optional` `Readonly` **[enableAutoFreezeKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:93](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L93)

___

### [enableInspectorKey]

• `Optional` `Readonly` **[enableInspectorKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:95](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L95)

___

### [enablePatchesKey]

• `Optional` `Readonly` **[enablePatchesKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L91)

___

### [identifierKey]

• `Optional` **[identifierKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:101](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L101)

___

### [initStateKey]

• `Optional` `Readonly` **[initStateKey]**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:100](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L100)

___

### [loaderKey]

• `Optional` `Readonly` **[loaderKey]**: [`Loader`](../modules/reactant.md#loader)

#### Defined in

[packages/reactant-module/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L90)

___

### [modulesKey]

• `Optional` `Readonly` **[modulesKey]**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:99](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L99)

___

### [nameKey]

• `Optional` **[nameKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:102](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L102)

___

### [signalMapKey]

• `Optional` `Readonly` **[signalMapKey]**: `Record`<`string`, `ExternalSignal`<`unknown`\>\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:89](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L89)

___

### [stateKey]

• `Optional` `Readonly` **[stateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:86](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L86)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:88](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L88)

___

### [strictKey]

• `Optional` `Readonly` **[strictKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:94](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L94)

___

### [subscriptionsKey]

• `Optional` `Readonly` **[subscriptionsKey]**: [`Subscriptions`](../modules/reactant.md#subscriptions)

#### Defined in

[packages/reactant-module/src/interfaces.ts:96](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L96)

___

### [unsubscriptionsKey]

• `Optional` `Readonly` **[unsubscriptionsKey]**: `Set`<`Unsubscribe`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:97](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L97)
