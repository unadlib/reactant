---
id: "router"
title: "Module: router"
sidebar_label: "router"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Router](../classes/router.Router.md)

## Interfaces

- [IRouterOptions](../interfaces/router.IRouterOptions.md)

## Variables

### RouterOptions

• `Const` **RouterOptions**: typeof [`RouterOptions`](router.md#routeroptions)

#### Defined in

[packages/reactant-router/src/router.tsx:23](https://github.com/unadlib/reactant/blob/5cb51d4e/packages/reactant-router/src/router.tsx#L23)

## Functions

### createBrowserHistory

▸ **createBrowserHistory**<`S`\>(`options?`): `History`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `BrowserHistoryBuildOptions` |

#### Returns

`History`<`S`\>

#### Defined in

node_modules/@types/history/createBrowserHistory.d.ts:11

___

### createHashHistory

▸ **createHashHistory**<`S`\>(`options?`): `History`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `HashHistoryBuildOptions` |

#### Returns

`History`<`S`\>

#### Defined in

node_modules/@types/history/createHashHistory.d.ts:12

___

### createMemoryHistory

▸ **createMemoryHistory**<`S`\>(`options?`): `MemoryHistory`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `MemoryHistoryBuildOptions` |

#### Returns

`MemoryHistory`<`S`\>

#### Defined in

node_modules/@types/history/createMemoryHistory.d.ts:19
