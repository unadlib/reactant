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
* [serverCallbacks](_portdetector_.portdetector.md#private-servercallbacks)
* [syncFullStatePromise](_portdetector_.portdetector.md#private-optional-syncfullstatepromise)

### Accessors

* [isClient](_portdetector_.portdetector.md#isclient)
* [isServer](_portdetector_.portdetector.md#isserver)
* [transports](_portdetector_.portdetector.md#transports)

### Methods

* [detectPort](_portdetector_.portdetector.md#private-detectport)
* [onClient](_portdetector_.portdetector.md#onclient)
* [onServer](_portdetector_.portdetector.md#onserver)
* [setPort](_portdetector_.portdetector.md#setport)
* [syncFullState](_portdetector_.portdetector.md#syncfullstate)

## Constructors

###  constructor

\+ **new PortDetector**(`options`: [IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md), `lastAction`: LastAction): *[PortDetector](_portdetector_.portdetector.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:45](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md) |
`lastAction` | LastAction |

**Returns:** *[PortDetector](_portdetector_.portdetector.md)*

## Properties

### `Private` clientCallbacks

• **clientCallbacks**: *Set‹function›* = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >()

*Defined in [packages/reactant-share/src/portDetector.ts:39](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L39)*

___

### `Private` lastAction

• **lastAction**: *LastAction*

*Defined in [packages/reactant-share/src/portDetector.ts:49](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L49)*

___

### `Private` `Optional` lastHooks

• **lastHooks**? : *Set‹ReturnType‹[CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)››*

*Defined in [packages/reactant-share/src/portDetector.ts:33](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L33)*

___

### `Private` options

• **options**: *[IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:48](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L48)*

___

### `Private` `Optional` portApp

• **portApp**? : *[PortApp](../modules/_interfaces_.md#portapp)*

*Defined in [packages/reactant-share/src/portDetector.ts:31](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L31)*

___

### `Private` serverCallbacks

• **serverCallbacks**: *Set‹function›* = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >()

*Defined in [packages/reactant-share/src/portDetector.ts:35](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L35)*

___

### `Private` `Optional` syncFullStatePromise

• **syncFullStatePromise**? : *ReturnType‹ClientTransport[typeof loadFullStateActionName]›*

*Defined in [packages/reactant-share/src/portDetector.ts:43](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L43)*

## Accessors

###  isClient

• **get isClient**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:96](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L96)*

**Returns:** *boolean*

___

###  isServer

• **get isServer**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:92](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L92)*

**Returns:** *boolean*

___

###  transports

• **get transports**(): *[Transports](../interfaces/_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:100](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L100)*

**Returns:** *[Transports](../interfaces/_interfaces_.transports.md)*

## Methods

### `Private` detectPort

▸ **detectPort**(`port`: [Port](../modules/_interfaces_.md#port)): *undefined | App‹any›*

*Defined in [packages/reactant-share/src/portDetector.ts:56](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | [Port](../modules/_interfaces_.md#port) |

**Returns:** *undefined | App‹any›*

___

###  onClient

▸ **onClient**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:82](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L82)*

onClient

When the port is client, this hook will execute.
And allow to return a function that will be executed when the current port is switched to server.

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]› |

**Returns:** *(Anonymous function)*

___

###  onServer

▸ **onServer**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["server"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:66](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L66)*

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

*Defined in [packages/reactant-share/src/portDetector.ts:104](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`currentPortApp` | [PortApp](../modules/_interfaces_.md#portapp) |
`transport` | Required<Transports>[keyof Transports] |

**Returns:** *void*

___

###  syncFullState

▸ **syncFullState**(): *Promise‹void›*

*Defined in [packages/reactant-share/src/portDetector.ts:132](https://github.com/unadlib/reactant/blob/f1370319/packages/reactant-share/src/portDetector.ts#L132)*

**Returns:** *Promise‹void›*
