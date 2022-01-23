# Interface: Config<T\>

## Type parameters

| Name |
| :------ |
| `T` |

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

[packages/reactant/src/interfaces.ts:29](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L29)

___

### devOptions

• `Optional` **devOptions**: [`DevOptions`](DevOptions.md)

Reactant's development setting options.

#### Defined in

[packages/reactant/src/interfaces.ts:37](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L37)

___

### main

• **main**: [`ReactModuleOptions`](../modules.md#reactmoduleoptions)<`T`\>

As the main start-up module.

#### Defined in

[packages/reactant/src/interfaces.ts:14](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L14)

___

### modules

• `Optional` **modules**: [`ReactModuleOptions`](../modules.md#reactmoduleoptions)<`any`\>[]

Importing the injected dependency modules.

#### Defined in

[packages/reactant/src/interfaces.ts:25](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L25)

___

### preloadedState

• `Optional` **preloadedState**: `Object`

Preloaded state of shared state for Redux.

#### Defined in

[packages/reactant/src/interfaces.ts:33](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L33)

## Methods

### render

▸ **render**(`element`, ...`args`): `void` \| `Element` \| `Element`

As a rendering function for any React renderer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `Element` |
| `...args` | `any`[] |

#### Returns

`void` \| `Element` \| `Element`

#### Defined in

[packages/reactant/src/interfaces.ts:18](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant/src/interfaces.ts#L18)
