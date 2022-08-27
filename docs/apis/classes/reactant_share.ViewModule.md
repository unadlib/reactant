# Class: ViewModule

[reactant-share](../modules/reactant_share.md).ViewModule

## Implements

- [`Service`](../interfaces/reactant_share.Service.md)

## Table of contents

### Constructors

- [constructor](reactant_share.ViewModule.md#constructor)

### Properties

- [[identifierKey]](reactant_share.ViewModule.md#[identifierkey])
- [[storeKey]](reactant_share.ViewModule.md#[storekey])

### Methods

- [component](reactant_share.ViewModule.md#component)

## Constructors

### constructor

• **new ViewModule**()

#### Defined in

[packages/reactant-module/src/core/view.ts:12](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L12)

## Properties

### [identifierKey]

• `Optional` `Readonly` **[identifierKey]**: `string`

#### Implementation of

[Service](../interfaces/reactant_share.Service.md).[[identifierKey]](../interfaces/reactant_share.Service.md#[identifierkey])

#### Defined in

[packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-module/src/core/view.ts#L8)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

[Service](../interfaces/reactant_share.Service.md).[[storeKey]](../interfaces/reactant_share.Service.md#[storekey])

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
