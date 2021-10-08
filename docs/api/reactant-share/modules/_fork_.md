---
id: "_fork_"
title: "fork()"
sidebar_label: "fork()"
---

## Index

### Functions

* [fork](_fork_.md#const-fork)

## Functions

### `Const` fork

▸ **fork**(`module`: T, `key`: K, `args`: undefined, `options`: undefined | object & object): *any*

*Defined in [packages/reactant-share/src/fork.ts:18](https://github.com/unadlib/reactant/blob/1f3f457d/packages/reactant-share/src/fork.ts#L18)*

Proxy execute On the client side.

## Description

`fork()` is very similar to the actor model,
 which transfers the corresponding module method to all client threads for execution and returns the result from the first client's response.

Note: It does not create new threads, it always runs on all client thread that have already been created.

reference: https://en.wikipedia.org/wiki/Actor_model

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`module` | T | - |
`key` | K | - |
`args` |  | - |
`options` | undefined &#124; object & object | {} |

**Returns:** *any*
