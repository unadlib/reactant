---
id: "_core_watch_"
title: "watch()"
sidebar_label: "watch()"
---

## Index

### Functions

* [watch](_core_watch_.md#const-watch)

## Functions

### `Const` watch

▸ **watch**(`service`: [Service](../interfaces/_interfaces_.service.md)‹object› & object, `selector`: function, `watcher`: function): *Unsubscribe*

*Defined in [packages/reactant-module/src/core/watch.ts:5](https://github.com/unadlib/reactant/blob/d78fe4b/packages/reactant-module/src/core/watch.ts#L5)*

**Parameters:**

▪ **service**: *[Service](../interfaces/_interfaces_.service.md)‹object› & object*

▪ **selector**: *function*

▸ (): *T*

▪ **watcher**: *function*

▸ (`newValue`: T, `oldValue`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue` | T |

**Returns:** *Unsubscribe*
