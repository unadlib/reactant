---
id: "index"
title: "reactant-router"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [BaseReactantRouter](classes/BaseReactantRouter.md)
- [Router](classes/Router.md)

## Interfaces

- [IRouterOptions](interfaces/IRouterOptions.md)
- [RouterState](interfaces/RouterState.md)

## Variables

### LOCATION\_CHANGE

• `Const` **LOCATION\_CHANGE**: ``"@@router/LOCATION_CHANGE"``

#### Defined in

node_modules/connected-react-router/index.d.ts:39

___

### RouterOptions

• `Const` **RouterOptions**: typeof [`RouterOptions`](#routeroptions)

#### Defined in

[packages/reactant-router/src/router.tsx:23](https://github.com/unadlib/reactant/blob/9c19923e/packages/reactant-router/src/router.tsx#L23)

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
