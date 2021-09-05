---
id: "_createapp_"
title: "createApp()"
sidebar_label: "createApp()"
---

▸ **createApp**<**T**>(`__namedParameters`: object): *[App](../interfaces/_interfaces_.app.md)‹T›*

*Defined in [createApp.tsx:40](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant/src/createApp.tsx#L40)*

## Description

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
import { createApp, injectable } from 'reactant';

@injectable()
class Foo {}

const app = createApp({
  modules: [],
  main: Foo,
  render: () => {},
});

expect(app.instance instanceof Foo).toBeTruthy();
```

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerOptions` | undefined &#124; object | - | Dependent injection container options. |
`devOptions` | undefined &#124; DevOptions | - | Reactant's development setting options. |
`main` | ValueProvider‹T› &#124; FactoryProvider‹T› &#124; ClassProvider‹T› &#124; ModuleProvider‹T› &#124; Module‹T› | - | As the main start-up module. |
`modules` | ValueProvider‹any› &#124; FactoryProvider‹any› &#124; ClassProvider‹any› &#124; ModuleProvider‹any› &#124; Module‹any›[] | [] | Importing the injected dependency modules. |
`preloadedState` | undefined &#124; object | - | Preloaded state of shared state for Redux. |
`render` | function | - | As a rendering function for any React renderer. |

**Returns:** *[App](../interfaces/_interfaces_.app.md)‹T›*
