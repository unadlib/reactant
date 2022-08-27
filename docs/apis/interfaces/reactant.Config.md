# Interface: Config<T, S, R\>

[reactant](../modules/reactant.md).Config

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](../modules/reactant.md#renderer)<`S`\> |

## Table of contents

### Properties

- [containerOptions](reactant.Config.md#containeroptions)
- [devOptions](reactant.Config.md#devoptions)
- [main](reactant.Config.md#main)
- [modules](reactant.Config.md#modules)
- [preloadedState](reactant.Config.md#preloadedstate)
- [render](reactant.Config.md#render)

## Properties

### containerOptions

• `Optional` **containerOptions**: [`ContainerOptions`](../modules/reactant.md#containeroptions)

Dependent injection container options.

#### Defined in

[packages/reactant/src/interfaces.ts:31](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L31)

___

### devOptions

• `Optional` **devOptions**: [`DevOptions`](reactant.DevOptions.md)

Reactant's development setting options.

#### Defined in

[packages/reactant/src/interfaces.ts:39](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L39)

___

### main

• **main**: [`ReactModuleOptions`](../modules/reactant.md#reactmoduleoptions)<`T`\>

As the main start-up module.

#### Defined in

[packages/reactant/src/interfaces.ts:19](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L19)

___

### modules

• `Optional` **modules**: [`ReactModuleOptions`](../modules/reactant.md#reactmoduleoptions)<`any`\>[]

Importing the injected dependency modules.

#### Defined in

[packages/reactant/src/interfaces.ts:27](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L27)

___

### preloadedState

• `Optional` **preloadedState**: `Object`

Preloaded state of shared state for Redux.

#### Defined in

[packages/reactant/src/interfaces.ts:35](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L35)

___

### render

• **render**: (`element`: `Element`, ...`args`: `S`) => `ReturnType`<`R`\>

#### Type declaration

▸ (`element`, ...`args`): `ReturnType`<`R`\>

As a rendering function for any React renderer.

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `...args` | `S` |

##### Returns

`ReturnType`<`R`\>

#### Defined in

[packages/reactant/src/interfaces.ts:23](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant/src/interfaces.ts#L23)
