---
id: "decorators_lazy"
title: "Module: decorators/lazy"
sidebar_label: "decorators/lazy"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### lazy

▸ **lazy**(`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`, `descriptor?`: `PropertyDescriptor`<`any`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`unknown`\> |
| `enableCache?` | `boolean` |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | `PropertyDescriptor`<`any`\> |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/lazy.ts:6](https://github.com/unadlib/reactant/blob/b3eef4af/packages/reactant-module/src/decorators/lazy.ts#L6)
