# Interface: Config<T, S, R\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules.md#renderer)<`S`\> |

## Table of contents

### Properties

- [containerOptions](Config.md#containeroptions)
- [devOptions](Config.md#devoptions)
- [main](Config.md#main)
- [modules](Config.md#modules)
- [preloadedState](Config.md#preloadedstate)

### Methods

- [render](Config.md#render)

## Properties

### containerOptions

• `Optional` **containerOptions**: [`ContainerOptions`](../modules.md#containeroptions)

Dependent injection container options.

#### Defined in

[packages/reactant/src/interfaces.ts:31](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L31)

___

### devOptions

• `Optional` **devOptions**: [`DevOptions`](DevOptions.md)

Reactant's development setting options.

#### Defined in

[packages/reactant/src/interfaces.ts:39](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L39)

___

### main

• **main**: [`ReactModuleOptions`](../modules.md#reactmoduleoptions)<`T`\>

As the main start-up module.

#### Defined in

[packages/reactant/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L19)

___

### modules

• `Optional` **modules**: [`ReactModuleOptions`](../modules.md#reactmoduleoptions)<`any`\>[]

Importing the injected dependency modules.

#### Defined in

[packages/reactant/src/interfaces.ts:27](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L27)

___

### preloadedState

• `Optional` **preloadedState**: `Object`

Preloaded state of shared state for Redux.

#### Defined in

[packages/reactant/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L35)

## Methods

### render

▸ **render**(`element`, ...`args`): `ReturnType`<`R`\>

As a rendering function for any React renderer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `...args` | `S` |

#### Returns

`ReturnType`<`R`\>

#### Defined in

[packages/reactant/src/interfaces.ts:23](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant/src/interfaces.ts#L23)
