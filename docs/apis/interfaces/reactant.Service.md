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
- [[enablePatchesKey]](reactant.Service.md#[enablepatcheskey])
- [[identifierKey]](reactant.Service.md#[identifierkey])
- [[loaderKey]](reactant.Service.md#[loaderkey])
- [[modulesKey]](reactant.Service.md#[moduleskey])
- [[nameKey]](reactant.Service.md#[namekey])
- [[stateKey]](reactant.Service.md#[statekey])
- [[storeKey]](reactant.Service.md#[storekey])
- [[subscriptionsKey]](reactant.Service.md#[subscriptionskey])

## Properties

### [containerKey]

• `Optional` `Readonly` **[containerKey]**: `Container`

#### Defined in

[packages/reactant-module/src/interfaces.ts:72](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L72)

___

### [defaultStateKey]

• `Optional` `Readonly` **[defaultStateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:67](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L67)

___

### [enablePatchesKey]

• `Optional` `Readonly` **[enablePatchesKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:70](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L70)

___

### [identifierKey]

• `Optional` **[identifierKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:74](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L74)

___

### [loaderKey]

• `Optional` `Readonly` **[loaderKey]**: [`Loader`](../modules/reactant.md#loader)

#### Defined in

[packages/reactant-module/src/interfaces.ts:69](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L69)

___

### [modulesKey]

• `Optional` `Readonly` **[modulesKey]**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:73](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L73)

___

### [nameKey]

• `Optional` **[nameKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:75](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L75)

___

### [stateKey]

• `Optional` `Readonly` **[stateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:66](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L66)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:68](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L68)

___

### [subscriptionsKey]

• `Optional` `Readonly` **[subscriptionsKey]**: [`Subscriptions`](../modules/reactant.md#subscriptions)

#### Defined in

[packages/reactant-module/src/interfaces.ts:71](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L71)
