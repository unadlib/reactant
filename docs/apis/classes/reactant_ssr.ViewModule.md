# Class: ViewModule

[reactant-ssr](../modules/reactant_ssr.md).ViewModule

## Hierarchy

- **`ViewModule`**

  ↳ [`AppView`](reactant_ssr.AppView.md)

## Implements

- [`Service`](../interfaces/reactant_ssr.Service.md)

## Table of contents

### Constructors

- [constructor](reactant_ssr.ViewModule.md#constructor)

### Properties

- [[identifierKey]](reactant_ssr.ViewModule.md#[identifierkey])
- [[storeKey]](reactant_ssr.ViewModule.md#[storekey])

### Methods

- [component](reactant_ssr.ViewModule.md#component)

## Constructors

### constructor

• **new ViewModule**()

#### Defined in

[packages/reactant-module/src/core/view.ts:12](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L12)

## Properties

### [identifierKey]

• `Optional` `Readonly` **[identifierKey]**: `string`

#### Implementation of

[Service](../interfaces/reactant_ssr.Service.md).[[identifierKey]](../interfaces/reactant_ssr.Service.md#[identifierkey])

#### Defined in

[packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L8)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

[Service](../interfaces/reactant_ssr.Service.md).[[storeKey]](../interfaces/reactant_ssr.Service.md#[storekey])

#### Defined in

[packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L10)

## Methods

### component

▸ `Abstract` **component**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

React function component defined by the current ViewModule

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`<`string`, `any`\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

[packages/reactant-module/src/core/view.ts:28](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L28)
