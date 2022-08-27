# Interface: FactoryProvider<T\>

[reactant-di](../modules/reactant_di.md).FactoryProvider

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

- [deps](reactant_di.FactoryProvider.md#deps)
- [provide](reactant_di.FactoryProvider.md#provide)
- [useFactory](reactant_di.FactoryProvider.md#usefactory)

## Properties

### deps

• `Optional` **deps**: [`DependencyOption`](../modules/reactant_di.md#dependencyoption)[]

#### Defined in

[packages/reactant-di/src/interfaces.ts:56](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L56)

___

### provide

• **provide**: [`ServiceIdentifier`](../modules/reactant_di.md#serviceidentifier)<`any`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L57)

___

### useFactory

• **useFactory**: (...`args`: `any`[]) => `T`

#### Type declaration

▸ (...`args`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

[packages/reactant-di/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L58)
