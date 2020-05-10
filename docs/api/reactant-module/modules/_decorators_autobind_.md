---
id: "_decorators_autobind_"
title: "decorators/autobind"
sidebar_label: "decorators/autobind"
---

## Index

### Functions

* [autobind](_decorators_autobind_.md#autobind)

## Functions

###  autobind

▸ **autobind**(`target`: object, `key`: string | symbol, `__namedParameters`: object): *object*

*Defined in [packages/reactant-module/src/decorators/autobind.ts:3](https://github.com/unadlib/reactant/blob/93937ba/packages/reactant-module/src/decorators/autobind.ts#L3)*

**Parameters:**

▪ **target**: *object*

▪ **key**: *string | symbol*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`configurable` | undefined &#124; false &#124; true |
`enumerable` | undefined &#124; false &#124; true |
`value` | any |

**Returns:** *object*

* **configurable**: *undefined | false | true*

* **enumerable**: *undefined | false | true*

* **get**(): *any*

* **set**(`setValue`: any): *void*
