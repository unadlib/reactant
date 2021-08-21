---
id: "_portdetector_.portdetector"
title: "PortDetector"
sidebar_label: "PortDetector"
---

PortDetector
todo

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

*Defined in [packages/reactant-share/src/portDetector.ts:44](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L44)*

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

*Defined in [packages/reactant-share/src/portDetector.ts:38](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L38)*

___

### `Private` lastAction

• **lastAction**: *LastAction*

*Defined in [packages/reactant-share/src/portDetector.ts:48](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L48)*

___

### `Private` `Optional` lastHooks

• **lastHooks**? : *Set‹ReturnType‹[CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)››*

*Defined in [packages/reactant-share/src/portDetector.ts:32](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L32)*

___

### `Private` options

• **options**: *[IPortDetectorOptions](../interfaces/_portdetector_.iportdetectoroptions.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:47](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L47)*

___

### `Private` `Optional` portApp

• **portApp**? : *[PortApp](../modules/_interfaces_.md#portapp)*

*Defined in [packages/reactant-share/src/portDetector.ts:30](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L30)*

___

### `Private` serverCallbacks

• **serverCallbacks**: *Set‹function›* = new Set<
    CallbackWithHook<Required<Transports>['server']>
  >()

*Defined in [packages/reactant-share/src/portDetector.ts:34](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L34)*

___

### `Private` `Optional` syncFullStatePromise

• **syncFullStatePromise**? : *ReturnType‹ClientTransport[typeof loadFullStateActionName]›*

*Defined in [packages/reactant-share/src/portDetector.ts:42](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L42)*

## Accessors

###  isClient

• **get isClient**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:91](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L91)*

**Returns:** *boolean*

___

###  isServer

• **get isServer**(): *boolean*

*Defined in [packages/reactant-share/src/portDetector.ts:87](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L87)*

**Returns:** *boolean*

___

###  transports

• **get transports**(): *[Transports](../interfaces/_interfaces_.transports.md)*

*Defined in [packages/reactant-share/src/portDetector.ts:95](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L95)*

**Returns:** *[Transports](../interfaces/_interfaces_.transports.md)*

## Methods

### `Private` detectPort

▸ **detectPort**(`port`: [Port](../modules/_interfaces_.md#port)): *undefined | App‹any›*

*Defined in [packages/reactant-share/src/portDetector.ts:55](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`port` | [Port](../modules/_interfaces_.md#port) |

**Returns:** *undefined | App‹any›*

___

###  onClient

▸ **onClient**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:77](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L77)*

onClient
todo

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["client"]› |

**Returns:** *(Anonymous function)*

___

###  onServer

▸ **onServer**(`callback`: [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["server"]›): *(Anonymous function)*

*Defined in [packages/reactant-share/src/portDetector.ts:63](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L63)*

onServer
todo

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [CallbackWithHook](../modules/_interfaces_.md#callbackwithhook)‹Required<Transports>["server"]› |

**Returns:** *(Anonymous function)*

___

###  setPort

▸ **setPort**(`currentPortApp`: [PortApp](../modules/_interfaces_.md#portapp), `transport`: Required<Transports>[keyof Transports]): *void*

*Defined in [packages/reactant-share/src/portDetector.ts:99](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`currentPortApp` | [PortApp](../modules/_interfaces_.md#portapp) |
`transport` | Required<Transports>[keyof Transports] |

**Returns:** *void*

___

###  syncFullState

▸ **syncFullState**(): *Promise‹void›*

*Defined in [packages/reactant-share/src/portDetector.ts:127](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/portDetector.ts#L127)*

**Returns:** *Promise‹void›*
