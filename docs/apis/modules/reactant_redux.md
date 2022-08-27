# Module: reactant-redux

## Table of contents

### Functions

- [redux](reactant_redux.md#redux)

## Functions

### redux

▸ **redux**<`S`, `A`\>(`scheme`): `Actions`<`A`\> & `Service`<`State`<`S`\>\> & `State`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `Record`<`string`, `any`\> |
| `A` | extends `Record`<`string`, (...`args`: `any`[]) => (`dispatch`: `Dispatch`<`AnyAction`\>) => `void`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `Scheme`<`S`, `A`\> |

#### Returns

`Actions`<`A`\> & `Service`<`State`<`S`\>\> & `State`<`S`\>

#### Defined in

[packages/reactant-redux/src/redux.ts:18](https://github.com/unadlib/reactant/blob/46d47605/packages/reactant-redux/src/redux.ts#L18)
