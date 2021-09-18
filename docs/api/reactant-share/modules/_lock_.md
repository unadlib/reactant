---
id: "_lock_"
title: "lock"
sidebar_label: "lock"
---

## Index

### Type aliases

* [LockCallBack](_lock_.md#lockcallback)
* [LockId](_lock_.md#lockid)
* [LockName](_lock_.md#lockname)
* [LockQueue](_lock_.md#lockqueue)

### Variables

* [heartbeatTimer](_lock_.md#let-heartbeattimer)
* [isListenUnload](_lock_.md#let-islistenunload)
* [lockMap](_lock_.md#const-lockmap)
* [lockStorageKey](_lock_.md#const-lockstoragekey)
* [tabId](_lock_.md#const-tabid)
* [tabStorageKey](_lock_.md#const-tabstoragekey)

### Functions

* [addUnloadListener](_lock_.md#const-addunloadlistener)
* [clearTabLocks](_lock_.md#const-cleartablocks)
* [filterExpiredTabs](_lock_.md#const-filterexpiredtabs)
* [simpleLock](_lock_.md#const-simplelock)
* [useLock](_lock_.md#const-uselock)

## Type aliases

###  LockCallBack

Ƭ **LockCallBack**: *function*

*Defined in [packages/reactant-share/src/lock.ts:3](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L3)*

#### Type declaration:

▸ (`lock`: object): *Promise‹void›*

**Parameters:**

▪ **lock**: *object*

Name | Type |
------ | ------ |
`mode` | "exclusive" |
`name` | string |

___

###  LockId

Ƭ **LockId**: *string*

*Defined in [packages/reactant-share/src/lock.ts:2](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L2)*

___

###  LockName

Ƭ **LockName**: *string*

*Defined in [packages/reactant-share/src/lock.ts:1](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L1)*

___

###  LockQueue

Ƭ **LockQueue**: *object[]*

*Defined in [packages/reactant-share/src/lock.ts:7](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L7)*

## Variables

### `Let` heartbeatTimer

• **heartbeatTimer**: *number*

*Defined in [packages/reactant-share/src/lock.ts:64](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L64)*

___

### `Let` isListenUnload

• **isListenUnload**: *boolean* = false

*Defined in [packages/reactant-share/src/lock.ts:37](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L37)*

___

### `Const` lockMap

• **lockMap**: *Record‹[LockName](_lock_.md#lockname), Record‹[LockId](_lock_.md#lockid), [LockCallBack](_lock_.md#lockcallback)››*

*Defined in [packages/reactant-share/src/lock.ts:9](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L9)*

___

### `Const` lockStorageKey

• **lockStorageKey**: *"reactant:lock"* = "reactant:lock"

*Defined in [packages/reactant-share/src/lock.ts:11](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L11)*

___

### `Const` tabId

• **tabId**: *string* = Math.random().toString(36)

*Defined in [packages/reactant-share/src/lock.ts:10](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L10)*

___

### `Const` tabStorageKey

• **tabStorageKey**: *"reactant:tab"* = "reactant:tab"

*Defined in [packages/reactant-share/src/lock.ts:12](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L12)*

## Functions

### `Const` addUnloadListener

▸ **addUnloadListener**(): *void*

*Defined in [packages/reactant-share/src/lock.ts:39](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L39)*

**Returns:** *void*

___

### `Const` clearTabLocks

▸ **clearTabLocks**(`tabIds`: string[]): *void*

*Defined in [packages/reactant-share/src/lock.ts:14](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`tabIds` | string[] |

**Returns:** *void*

___

### `Const` filterExpiredTabs

▸ **filterExpiredTabs**(): *string[]*

*Defined in [packages/reactant-share/src/lock.ts:50](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L50)*

**Returns:** *string[]*

___

### `Const` simpleLock

▸ **simpleLock**(`name`: [LockName](_lock_.md#lockname), `callback`: [LockCallBack](_lock_.md#lockcallback)): *Promise‹unknown›*

*Defined in [packages/reactant-share/src/lock.ts:66](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | [LockName](_lock_.md#lockname) |
`callback` | [LockCallBack](_lock_.md#lockcallback) |

**Returns:** *Promise‹unknown›*

___

### `Const` useLock

▸ **useLock**(`name`: [LockName](_lock_.md#lockname), `callback`: [LockCallBack](_lock_.md#lockcallback)): *any*

*Defined in [packages/reactant-share/src/lock.ts:134](https://github.com/unadlib/reactant/blob/5a9891fd/packages/reactant-share/src/lock.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | [LockName](_lock_.md#lockname) |
`callback` | [LockCallBack](_lock_.md#lockcallback) |

**Returns:** *any*
