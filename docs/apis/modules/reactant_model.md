# Module: reactant-model

## Table of contents

### Functions

- [model](reactant_model.md#model)

## Functions

### model

▸ **model**<`S`, `A`\>(`scheme`): `Actions`<`A`\> & `Service`<`S`\> & `S`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `Record`<`string`, `any`\> |
| `A` | extends `Record`<`string`, (...`args`: `any`[]) => (`state`: `S`) => `void`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `Scheme`<`S`, `A`\> |

#### Returns

`Actions`<`A`\> & `Service`<`S`\> & `S`

#### Defined in

[packages/reactant-model/src/model.ts:25](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-model/src/model.ts#L25)
