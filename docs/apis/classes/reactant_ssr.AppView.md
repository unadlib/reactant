# Class: AppView

[reactant-ssr](../modules/reactant_ssr.md).AppView

AppView for SSR entry point

## Hierarchy

- [`ViewModule`](reactant_ssr.ViewModule.md)

  ↳ **`AppView`**

## Table of contents

### Constructors

- [constructor](reactant_ssr.AppView.md#constructor)

### Properties

- [[identifierKey]](reactant_ssr.AppView.md#[identifierkey])
- [[storeKey]](reactant_ssr.AppView.md#[storekey])

### Methods

- [component](reactant_ssr.AppView.md#component)

## Constructors

### constructor

• **new AppView**()

#### Inherited from

[ViewModule](reactant_ssr.ViewModule.md).[constructor](reactant_ssr.ViewModule.md#constructor)

#### Defined in

[packages/reactant-module/src/core/view.ts:12](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L12)

## Properties

### [identifierKey]

• `Optional` `Readonly` **[identifierKey]**: `string`

#### Inherited from

[ViewModule](reactant_ssr.ViewModule.md).[[identifierKey]](reactant_ssr.ViewModule.md#[identifierkey])

#### Defined in

[packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L8)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Inherited from

[ViewModule](reactant_ssr.ViewModule.md).[[storeKey]](reactant_ssr.ViewModule.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L10)

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

[ViewModule](reactant_ssr.ViewModule.md).[component](reactant_ssr.ViewModule.md#component)

#### Defined in

[packages/reactant-ssr/src/appView.tsx:9](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-ssr/src/appView.tsx#L9)
