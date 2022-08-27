# Interface: FactoryProvider<T\>

[reactant-ssr](../modules/reactant_ssr.md).FactoryProvider

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

- [deps](reactant_ssr.FactoryProvider.md#deps)
- [provide](reactant_ssr.FactoryProvider.md#provide)
- [useFactory](reactant_ssr.FactoryProvider.md#usefactory)

## Properties

### deps

• `Optional` **deps**: `DependencyOption`[]

#### Defined in

[packages/reactant-di/src/interfaces.ts:56](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L56)

___

### provide

• **provide**: `ServiceIdentifier`<`any`\>

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
