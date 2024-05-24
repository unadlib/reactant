# Interface: ModuleDecoratorOptions

[reactant](../modules/reactant.md).ModuleDecoratorOptions

## Hierarchy

- `ModuleDecoratorOptions`

  ↳ **`ModuleDecoratorOptions`**

## Table of contents

### Properties

- [deps](reactant.ModuleDecoratorOptions.md#deps)
- [name](reactant.ModuleDecoratorOptions.md#name)

## Properties

### deps

• `Optional` **deps**: `DependenciesModule`[]

Metadata for module dependencies

#### Inherited from

IModuleDecoratorOptions.deps

#### Defined in

[packages/reactant-di/src/interfaces.ts:91](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L91)

___

### name

• `Optional` **name**: `string`

string identifier of the current module, which is used for module word maps indexed by strings such as reducers and proxies.

#### Defined in

[packages/reactant-module/src/interfaces.ts:214](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L214)
