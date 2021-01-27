---
id: "_decorators_lazy_"
title: "decorators/lazy"
sidebar_label: "decorators/lazy"
---

## Index

### Variables

* [lazy](_decorators_lazy_.md#const-lazy)

## Variables

### `Const` lazy

• **lazy**: *(Anonymous function)* = getLazyDecorator((serviceIdentifier, target?: Service) => {
  try {
    const services = target![containerKey]!.getAll(serviceIdentifier);
    return services.length === 1 ? services[0] : services;
  } catch (e) {
    console.warn(e);
  }
  return null;
})

*Defined in [packages/reactant-module/src/decorators/lazy.ts:5](https://github.com/unadlib/reactant/blob/fbc06fd/packages/reactant-module/src/decorators/lazy.ts#L5)*
