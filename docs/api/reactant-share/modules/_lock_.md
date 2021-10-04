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
* [storage](_lock_.md#let-storage)
* [tabId](_lock_.md#const-tabid)
* [tabStorageKey](_lock_.md#const-tabstoragekey)

### Functions

* [addUnloadListener](_lock_.md#const-addunloadlistener)
* [clearTabLocks](_lock_.md#const-cleartablocks)
* [createFrameStorage](_lock_.md#const-createframestorage)
* [filterInvalidTabs](_lock_.md#const-filterinvalidtabs)
* [heartbeat](_lock_.md#const-heartbeat)
* [simpleLock](_lock_.md#const-simplelock)
* [useLock](_lock_.md#const-uselock)

## Type aliases

###  LockCallBack

Ƭ **LockCallBack**: *function*

*Defined in [packages/reactant-share/src/lock.ts:3](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L3)*

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

*Defined in [packages/reactant-share/src/lock.ts:2](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L2)*

___

###  LockName

Ƭ **LockName**: *string*

*Defined in [packages/reactant-share/src/lock.ts:1](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L1)*

___

###  LockQueue

Ƭ **LockQueue**: *object[]*

*Defined in [packages/reactant-share/src/lock.ts:7](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L7)*

## Variables

### `Let` heartbeatTimer

• **heartbeatTimer**: *number*

*Defined in [packages/reactant-share/src/lock.ts:13](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L13)*

___

### `Let` isListenUnload

• **isListenUnload**: *boolean* = false

*Defined in [packages/reactant-share/src/lock.ts:14](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L14)*

___

### `Const` lockMap

• **lockMap**: *Record‹[LockName](_lock_.md#lockname), Record‹[LockId](_lock_.md#lockid), [LockCallBack](_lock_.md#lockcallback)››*

*Defined in [packages/reactant-share/src/lock.ts:9](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L9)*

___

### `Const` lockStorageKey

• **lockStorageKey**: *"reactant:lock"* = "reactant:lock"

*Defined in [packages/reactant-share/src/lock.ts:11](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L11)*

___

### `Let` storage

• **storage**: *Storage*

*Defined in [packages/reactant-share/src/lock.ts:15](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L15)*

___

### `Const` tabId

• **tabId**: *string* = Math.random().toString(36)

*Defined in [packages/reactant-share/src/lock.ts:10](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L10)*

___

### `Const` tabStorageKey

• **tabStorageKey**: *"reactant:tab"* = "reactant:tab"

*Defined in [packages/reactant-share/src/lock.ts:12](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L12)*

## Functions

### `Const` addUnloadListener

▸ **addUnloadListener**(): *void*

*Defined in [packages/reactant-share/src/lock.ts:36](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L36)*

**Returns:** *void*

___

### `Const` clearTabLocks

▸ **clearTabLocks**(`tabIds`: string[], `_storage`: Storage): *void*

*Defined in [packages/reactant-share/src/lock.ts:17](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`tabIds` | string[] |
`_storage` | Storage |

**Returns:** *void*

___

### `Const` createFrameStorage

▸ **createFrameStorage**(): *void*

*Defined in [packages/reactant-share/src/lock.ts:83](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L83)*

**Returns:** *void*

___

### `Const` filterInvalidTabs

▸ **filterInvalidTabs**(): *string[]*

*Defined in [packages/reactant-share/src/lock.ts:47](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L47)*

**Returns:** *string[]*

___

### `Const` heartbeat

▸ **heartbeat**(): *void*

*Defined in [packages/reactant-share/src/lock.ts:72](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L72)*

**Returns:** *void*

___

### `Const` simpleLock

▸ **simpleLock**(`name`: [LockName](_lock_.md#lockname), `callback`: [LockCallBack](_lock_.md#lockcallback)): *Promise‹unknown›*

*Defined in [packages/reactant-share/src/lock.ts:91](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | [LockName](_lock_.md#lockname) |
`callback` | [LockCallBack](_lock_.md#lockcallback) |

**Returns:** *Promise‹unknown›*

___

### `Const` useLock

▸ **useLock**(`name`: [LockName](_lock_.md#lockname), `callback`: [LockCallBack](_lock_.md#lockcallback)): *any*

*Defined in [packages/reactant-share/src/lock.ts:133](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/lock.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | [LockName](_lock_.md#lockname) |
`callback` | [LockCallBack](_lock_.md#lockcallback) |

**Returns:** *any*
