# Class: AppView

AppView for SSR entry point

## Hierarchy

- [`ViewModule`](ViewModule.md)

  ↳ **`AppView`**

## Table of contents

### Constructors

- [constructor](AppView.md#constructor)

### Properties

- [[identifierKey]](AppView.md#[identifierkey])
- [[storeKey]](AppView.md#[storekey])

### Methods

- [component](AppView.md#component)

## Constructors

### constructor

• **new AppView**()

#### Inherited from

[ViewModule](ViewModule.md).[constructor](ViewModule.md#constructor)

#### Defined in

[packages/reactant-module/src/core/view.ts:12](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/view.ts#L12)

## Properties

### [identifierKey]

• `Optional` `Readonly` **[identifierKey]**: `string`

#### Inherited from

[ViewModule](ViewModule.md).[[identifierKey]](ViewModule.md#[identifierkey])

#### Defined in

[packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/view.ts#L8)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[ViewModule](ViewModule.md).[[storeKey]](ViewModule.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-module/src/core/view.ts#L10)

## Methods

### component

▸ **component**(`__namedParameters`): `Element`

React function component defined by the current ViewModule

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `AppProps`<{}\> |

#### Returns

`Element`

#### Overrides

[ViewModule](ViewModule.md).[component](ViewModule.md#component)

#### Defined in

[packages/reactant-ssr/src/appView.tsx:9](https://github.com/unadlib/reactant/blob/f9546913/packages/reactant-ssr/src/appView.tsx#L9)
