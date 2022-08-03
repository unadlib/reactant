# Interface: Service<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> = `Record`<`string`, `any`\> |

## Implemented by

- [`PluginModule`](../classes/PluginModule.md)
- [`ViewModule`](../classes/ViewModule.md)

## Table of contents

### Properties

- [[containerKey]](Service.md#[containerkey])
- [[defaultStateKey]](Service.md#[defaultstatekey])
- [[enablePatchesKey]](Service.md#[enablepatcheskey])
- [[identifierKey]](Service.md#[identifierkey])
- [[loaderKey]](Service.md#[loaderkey])
- [[nameKey]](Service.md#[namekey])
- [[stateKey]](Service.md#[statekey])
- [[storeKey]](Service.md#[storekey])
- [[subscriptionsKey]](Service.md#[subscriptionskey])

## Properties

### [containerKey]

• `Optional` `Readonly` **[containerKey]**: `Container`

#### Defined in

[packages/reactant-module/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L71)

___

### [defaultStateKey]

• `Optional` `Readonly` **[defaultStateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L66)

___

### [enablePatchesKey]

• `Optional` `Readonly` **[enablePatchesKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:69](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L69)

___

### [identifierKey]

• `Optional` **[identifierKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:72](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L72)

___

### [loaderKey]

• `Optional` `Readonly` **[loaderKey]**: [`Loader`](../modules.md#loader)

#### Defined in

[packages/reactant-module/src/interfaces.ts:68](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L68)

___

### [nameKey]

• `Optional` **[nameKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:73](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L73)

___

### [stateKey]

• `Optional` `Readonly` **[stateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:65](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L65)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:67](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L67)

___

### [subscriptionsKey]

• `Optional` `Readonly` **[subscriptionsKey]**: [`Subscriptions`](../modules.md#subscriptions)

#### Defined in

[packages/reactant-module/src/interfaces.ts:70](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-module/src/interfaces.ts#L70)
