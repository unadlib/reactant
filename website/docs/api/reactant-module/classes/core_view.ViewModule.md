---
id: "core_view.ViewModule"
title: "Class: ViewModule"
sidebar_label: "ViewModule"
custom_edit_url: null
---

[core/view](../modules/core_view.md).ViewModule

## Implements

- `Service`

## Constructors

### constructor

• **new ViewModule**()

#### Defined in

[packages/reactant-module/src/core/view.ts:12](https://github.com/unadlib/reactant/blob/0168c3f1/packages/reactant-module/src/core/view.ts#L12)

## Properties

### [identifierKey]

• `Optional` `Readonly` **[identifierKey]**: `string`

#### Implementation of

Service.\_\_@identifierKey@102380

#### Defined in

[packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/0168c3f1/packages/reactant-module/src/core/view.ts#L8)

___

### [storeKey]

• `Optional` `Readonly` **[storeKey]**: `Store`<`any`, `AnyAction`\>

#### Implementation of

Service.\_\_@storeKey@102369

#### Defined in

[packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/0168c3f1/packages/reactant-module/src/core/view.ts#L10)

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

[packages/reactant-module/src/core/view.ts:28](https://github.com/unadlib/reactant/blob/0168c3f1/packages/reactant-module/src/core/view.ts#L28)
