# Interface: Config<T, S, R\>

[reactant-ssr](../modules/reactant_ssr.md).Config

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules/reactant_ssr.md#renderer)<`S`\> |

## Table of contents

### Properties

- [containerOptions](reactant_ssr.Config.md#containeroptions)
- [devOptions](reactant_ssr.Config.md#devoptions)
- [main](reactant_ssr.Config.md#main)
- [modules](reactant_ssr.Config.md#modules)
- [preloadedState](reactant_ssr.Config.md#preloadedstate)
- [render](reactant_ssr.Config.md#render)

## Properties

### containerOptions

• `Optional` **containerOptions**: [`ContainerOptions`](../modules/reactant_ssr.md#containeroptions)

Dependent injection container options.

#### Defined in

[packages/reactant/src/interfaces.ts:31](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L31)

___

### devOptions

• `Optional` **devOptions**: [`DevOptions`](reactant_ssr.DevOptions.md)

Reactant's development setting options.

#### Defined in

[packages/reactant/src/interfaces.ts:39](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L39)

___

### main

• **main**: [`ReactantModuleOptions`](../modules/reactant_ssr.md#reactantmoduleoptions)<`T`\>

As the main start-up module.

#### Defined in

[packages/reactant/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L19)

___

### modules

• `Optional` **modules**: [`ReactantModuleOptions`](../modules/reactant_ssr.md#reactantmoduleoptions)[]

Importing the injected dependency modules.

#### Defined in

[packages/reactant/src/interfaces.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L27)

___

### preloadedState

• `Optional` **preloadedState**: `Object`

Preloaded state of shared state for Redux.

#### Defined in

[packages/reactant/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L35)

___

### render

• **render**: (`element`: `Element`, ...`args`: `S`) => `ReturnType`<`R`\>

#### Type declaration

▸ (`element`, `...args`): `ReturnType`<`R`\>

As a rendering function for any React renderer.

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `...args` | `S` |

##### Returns

`ReturnType`<`R`\>

#### Defined in

[packages/reactant/src/interfaces.ts:23](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L23)
