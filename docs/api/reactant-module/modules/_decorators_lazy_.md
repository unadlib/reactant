---
id: "_decorators_lazy_"
title: "@lazy()"
sidebar_label: "@lazy()"
---

## Index

### Type aliases

* [Lazy](_decorators_lazy_.md#lazy)

### Variables

* [lazy](_decorators_lazy_.md#const-lazy)

## Type aliases

###  Lazy

Ƭ **Lazy**: *function*

*Defined in [packages/reactant-module/src/decorators/lazy.ts:5](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/decorators/lazy.ts#L5)*

#### Type declaration:

▸ (`serviceIdentifier`: ServiceIdentifier‹unknown›, `enableCache?`: undefined | false | true): *function*

**Parameters:**

Name | Type |
------ | ------ |
`serviceIdentifier` | ServiceIdentifier‹unknown› |
`enableCache?` | undefined &#124; false &#124; true |

▸ (`target`: object, `key`: string | symbol, `descriptor?`: [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)‹any›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`target` | object |
`key` | string &#124; symbol |
`descriptor?` | [PropertyDescriptor](../interfaces/_interfaces_.propertydescriptor.md)‹any› |

## Variables

### `Const` lazy

• **lazy**: *[Lazy](_decorators_lazy_.md#lazy)* = getLazyDecorator(
  (serviceIdentifier, target?: Service) => {
    try {
      const services = target![containerKey]!.getAll(serviceIdentifier);
      return services.length === 1 ? services[0] : services;
    } catch (e) {
      if (__DEV__) {
        console.warn(
          `Failed to get instance of lazy loading module ${serviceIdentifier.toString()}.`
        );
      }
    }
    return null;
  }
)

*Defined in [packages/reactant-module/src/decorators/lazy.ts:14](https://github.com/unadlib/reactant/blob/3ea14604/packages/reactant-module/src/decorators/lazy.ts#L14)*
