# Interface: FactoryProvider<T\>

[reactant](../modules/reactant.md).FactoryProvider

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

- [deps](reactant.FactoryProvider.md#deps)
- [provide](reactant.FactoryProvider.md#provide)
- [useFactory](reactant.FactoryProvider.md#usefactory)

## Properties

### deps

• `Optional` **deps**: `DependencyOption`[]

#### Defined in

[packages/reactant-di/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L57)

___

### provide

• **provide**: [`ServiceIdentifier`](../modules/reactant.md#serviceidentifier)<`any`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L58)

___

### useFactory

• **useFactory**: (...`args`: `any`[]) => `T`

#### Type declaration

▸ (`...args`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

[packages/reactant-di/src/interfaces.ts:59](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L59)
