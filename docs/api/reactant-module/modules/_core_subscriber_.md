[reactant-module](../README.md) › [Globals](../globals.md) › ["core/subscriber"](_core_subscriber_.md)

# External module: "core/subscriber"

## Index

### Functions

* [subscribe](_core_subscriber_.md#const-subscribe)
* [watch](_core_subscriber_.md#const-watch)

## Functions

### `Const` subscribe

▸ **subscribe**(`service`: [Service](../interfaces/_interfaces_.service.md)‹object› & object, `listener`: function): *Unsubscribe*

*Defined in [packages/reactant-module/src/core/subscriber.ts:6](https://github.com/unadlib/reactant/blob/ecdc150/packages/reactant-module/src/core/subscriber.ts#L6)*

**Parameters:**

▪ **service**: *[Service](../interfaces/_interfaces_.service.md)‹object› & object*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *Unsubscribe*

___

### `Const` watch

▸ **watch**(`service`: [Service](../interfaces/_interfaces_.service.md)‹object› & object, `selector`: function, `watcher`: function): *Unsubscribe*

*Defined in [packages/reactant-module/src/core/subscriber.ts:28](https://github.com/unadlib/reactant/blob/ecdc150/packages/reactant-module/src/core/subscriber.ts#L28)*

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
