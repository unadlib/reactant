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

[packages/reactant-module/src/interfaces.ts:53](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L53)

___

### [enablePatchesKey]

• `Optional` `Readonly` **[enablePatchesKey]**: `boolean`

#### Defined in

[packages/reactant-module/src/interfaces.ts:51](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L51)

___

### [identifierKey]

• `Optional` **[identifierKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:54](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L54)

___

### [loaderKey]

• `Optional` `Readonly` **[loaderKey]**: [`Loader`](../modules.md#loader)

#### Defined in

[packages/reactant-module/src/interfaces.ts:50](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L50)

___

### [nameKey]

• `Optional` **[nameKey]**: `string`

#### Defined in

[packages/reactant-module/src/interfaces.ts:55](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L55)

___

### [stateKey]

• `Optional` `Readonly` **[stateKey]**: `T`

#### Defined in

[packages/reactant-module/src/interfaces.ts:48](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L48)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:49](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L49)

___

### [subscriptionsKey]

• `Optional` `Readonly` **[subscriptionsKey]**: [`Subscriptions`](../modules.md#subscriptions)

#### Defined in

[packages/reactant-module/src/interfaces.ts:52](https://github.com/unadlib/reactant/blob/53894a85/packages/reactant-module/src/interfaces.ts#L52)
