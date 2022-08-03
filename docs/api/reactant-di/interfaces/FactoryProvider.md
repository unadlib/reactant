# Interface: FactoryProvider<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Table of contents

### Properties

- [deps](FactoryProvider.md#deps)
- [provide](FactoryProvider.md#provide)

### Methods

- [useFactory](FactoryProvider.md#usefactory)

## Properties

### deps

• `Optional` **deps**: [`DependencyOption`](../modules.md#dependencyoption)[]

#### Defined in

[packages/reactant-di/src/interfaces.ts:56](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-di/src/interfaces.ts#L56)

___

### provide

• **provide**: [`ServiceIdentifier`](../modules.md#serviceidentifier)<`any`\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:57](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-di/src/interfaces.ts#L57)

## Methods

### useFactory

▸ **useFactory**(...`args`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`T`

#### Defined in

[packages/reactant-di/src/interfaces.ts:58](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-di/src/interfaces.ts#L58)
