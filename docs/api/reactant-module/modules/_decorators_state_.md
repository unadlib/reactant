---
id: "_decorators_state_"
title: "@state"
sidebar_label: "@state"
---

▸ **state**(`target`: object, `key`: string | symbol, `descriptor?`: [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)‹any›): *void*

*Defined in [packages/reactant-module/src/decorators/state.ts:26](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-module/src/decorators/state.ts#L26)*

## Description

`@state` is used to decorate a class property as a state field.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;
}

const app = testBed({
  modules: [],
  main: Counter,
});

expect(app.instance.count).toBe(0);
```

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`key` | string &#124; symbol |
`descriptor?` | [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)‹any› |

**Returns:** *void*
