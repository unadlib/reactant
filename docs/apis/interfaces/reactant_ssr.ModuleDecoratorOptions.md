# Interface: ModuleDecoratorOptions

[reactant-ssr](../modules/reactant_ssr.md).ModuleDecoratorOptions

## Hierarchy

- `ModuleDecoratorOptions`

  ↳ **`ModuleDecoratorOptions`**

## Table of contents

### Properties

- [deps](reactant_ssr.ModuleDecoratorOptions.md#deps)
- [name](reactant_ssr.ModuleDecoratorOptions.md#name)

## Properties

### deps

• `Optional` **deps**: `DependenciesModule`[]

Metadata for module dependencies

#### Inherited from

IModuleDecoratorOptions.deps

#### Defined in

[packages/reactant-di/src/interfaces.ts:90](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-di/src/interfaces.ts#L90)

___

### name

• `Optional` **name**: `string`

string identifier of the current module, which is used for module word maps indexed by strings such as reducers and proxies.

#### Defined in

[packages/reactant-module/src/interfaces.ts:187](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/interfaces.ts#L187)
