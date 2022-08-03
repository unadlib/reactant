# reactant-model

## Table of contents

### Functions

- [model](modules.md#model)

## Functions

### model

▸ `Const` **model**<`S`, `A`\>(`scheme`): `Actions`<`A`\> & `Service`<`S`\> & `S`

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

[model.ts:22](https://github.com/unadlib/reactant/blob/3696addb/packages/reactant-model/src/model.ts#L22)
