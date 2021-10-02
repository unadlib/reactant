---
id: "_portdetector_.portdetector"
title: "PortDetector"
sidebar_label: "PortDetector"
---

Port Detector

It provides port detection and client/server port switching functions.

## Hierarchy

* **PortDetector**

## Index

### Constructors

* [constructor](_portdetector_.portdetector.md#constructor)

### Properties

* [clientCallbacks](_portdetector_.portdetector.md#private-clientcallbacks)
* [lastAction](_portdetector_.portdetector.md#private-lastaction)
* [lastHooks](_portdetector_.portdetector.md#private-optional-lasthooks)
* [options](_portdetector_.portdetector.md#private-options)
* [portApp](_portdetector_.portdetector.md#private-optional-portapp)
* [previousPort](_portdetector_.portdetector.md#optional-previousport)
* [serverCallbacks](_portdetector_.portdetector.md#private-servercallbacks)
* [storage](_portdetector_.portdetector.md#private-optional-storage)
* [syncFullStatePromise](_portdetector_.portdetector.md#private-optional-syncfullstatepromise)

### Accessors

* [isClient](_portdetector_.portdetector.md#isclient)
* [isServer](_portdetector_.portdetector.md#isserver)
* [transports](_portdetector_.portdetector.md#transports)

### Methods

* [detectPort](_portdetector_.portdetector.md#private-detectport)
* [onClient](_portdetector_.portdetector.md#onclient)
* [onRehydrate](_portdetector_.portdetector.md#onrehydrate)
* [onServer](_portdetector_.portdetector.md#onserver)
* [setPort](_portdetector_.portdetector.md#setport)
* [syncFullState](_portdetector_.portdetector.md#syncfullstate)
* [syncToClients](_portdetector_.portdetector.md#synctoclients)

## Constructors

###  constructor

\+ **new PortDetector**(`options`: [IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md), `lastAction`: LastAction, `storage?`: [Storage](../modules/_storage_.md#storage)): *[PortDetector](_portdetector_.portdetector.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:49](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md) |
`lastAction` | LastAction |
`storage?` | [Storage](../modules/_storage_.md#storage) |

**Returns:** *[PortDetector](_portdetector_.portdetector.md)*

## Properties

### `Private` clientCallbacks

• **clientCallbacks**: *Set‹function›* = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >()

*Defined in [packages/reactant-share/src/portDetector.ts:41](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L41)*

___

### `Private` lastAction

• **lastAction**: *LastAction*

*Defined in [packages/reactant-share/src/portDetector.ts:53](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L53)*

___

### `Private` `Optional` lastHooks

• **lastHooks**? : *Set‹ReturnType‹[CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)››*

*Defined in [packages/reactant-share/src/portDetector.ts:35](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L35)*

___

### `Private` options

• **options**: *[IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:52](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L52)*

___

### `Private` `Optional` portApp

• **portApp**? : *[PortApp](../modules/_interfaces_.md#portapp)*

*Defined in [packages/reactant-share/src/portDetector.ts:33](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L33)*

___

### `Optional` previousPort

• **previousPort**? : *[Port](../modules/_interfaces_.md#port)*

*Defined in [packages/reactant-share/src/portDetector.ts:49](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L49)*

___

### `Private` serverCallbacks

• **serverCallbacks**: *Set‹function›* = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >()

*Defined in [packages/reactant-share/src/portDetector.ts:37](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L37)*

___

### `Private` `Optional` storage

• **storage**? : *[Storage](../modules/_storage_.md#storage)*

*Defined in [packages/reactant-share/src/portDetector.ts:54](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L54)*

___

### `Private` `Optional` syncFullStatePromise

• **syncFullStatePromise**? : *ReturnType‹ClientTransport[typeof loadFullStateActionName]›*

*Defined in [packages/reactant-share/src/portDetector.ts:45](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L45)*

## Accessors

###  isClient

• **get isClient**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:144](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L144)*

**Returns:** *boolean*

___

###  isServer

• **get isServer**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:140](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L140)*

**Returns:** *boolean*

___

###  transports

• **get transports**(): *[Transports](../interfaces/_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:148](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L148)*

**Returns:** *[Transports](../interfaces/_interfaces_.transports.md)*

## Methods

### `Private` detectPort

▸ **detectPort**(`port`: [Port](../modules/_interfaces_.md#port)): *undefined | App‹any›*

*Defined in [packages/reactant-share/src/portDetector.ts:104](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | [Port](../modules/_interfaces_.md#port) |

**Returns:** *undefined | App‹any›*

___

###  onClient

▸ **onClient**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:130](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L130)*

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]› |

**Returns:** *(Anonymous function)*

___

###  onRehydrate

▸ **onRehydrate**(`callback`: function): *void*

*Defined in [packages/reactant-share/src/portDetector.ts:96](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L96)*

**Parameters:**

▪ **callback**: *function*

▸ (): *void*

**Returns:** *void*

___

###  onServer

▸ **onServer**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["server"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:114](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L114)*

onServer

When the port is server, this hook will execute.
And allow to return a function that will be executed when the current port is switched to client.

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["server"]› |

**Returns:** *(Anonymous function)*

___

###  setPort

▸ **setPort**(`currentPortApp`: [PortApp](../modules/_interfaces_.md#portapp), `transport`: Required<Transports>[keyof Transports]): *void*

*Defined in [packages/reactant-share/src/portDetector.ts:152](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`currentPortApp` | [PortApp](../modules/_interfaces_.md#portapp) |
`transport` | Required<Transports>[keyof Transports] |

**Returns:** *void*

___

###  syncFullState

▸ **syncFullState**(`__namedParameters`: object): *Promise‹void›*

*Defined in [packages/reactant-share/src/portDetector.ts:194](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L194)*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`forceSync` | boolean | true |

**Returns:** *Promise‹void›*

___

###  syncToClients

▸ **syncToClients**(): *void*

*Defined in [packages/reactant-share/src/portDetector.ts:180](https://github.com/unadlib/reactant/blob/ae1de025/packages/reactant-share/src/portDetector.ts#L180)*

**Returns:** *void*
