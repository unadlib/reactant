---
id: "fork"
title: "Module: fork"
sidebar_label: "fork"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### fork

▸ **fork**<`T`, `K`, `O`\>(`module`, `key`, `args`, `options?`): `O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

Proxy execute On the client side.

## Description

`fork()` is very similar to the actor model,
 which transfers the corresponding module method to all client threads for execution and returns the result from the first client's response.

Note: It does not create new threads, it always runs on all client thread that have already been created.

reference: https://en.wikipedia.org/wiki/Actor_model

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string` \| `number` \| `symbol`, `any`\> |
| `K` | extends `string` \| `number` \| `symbol` |
| `O` | extends `undefined` \| `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | `T` | Designate an execution module from the server side. |
| `key` | `K` | Specify the name of a method in this module. |
| `args` | `Parameters`<`T`[`K`]\> | Pass in the parameters for this method. |
| `options?` | { `respond?`: `O`  } & `Pick`<`EmitParameter`<`any`\>, ``"timeout"``\> | proxy execution options |

#### Returns

`O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:166](https://github.com/unadlib/reactant/blob/5459ef00/packages/reactant-share/src/interfaces.ts#L166)
