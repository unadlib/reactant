---
id: "_createapp_"
title: "createApp()"
sidebar_label: "createApp()"
---

▸ **createApp**<**T**>(`__namedParameters`: object): *[App](../interfaces/_interfaces_.app.md)‹T›*

*Defined in [createApp.tsx:38](https://github.com/unadlib/reactant/blob/9a189fb/packages/reactant/src/createApp.tsx#L38)*

## Description

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
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
`main` | string &#124; symbol &#124; Newable‹T› &#124; Abstract‹T› | - | As the main start-up module. |
`modules` | ValueProvider &#124; FactoryProvider &#124; ClassProvider &#124; ModuleProvider &#124; Module‹any›[] | [] | Importing the injected dependency modules. |
`preloadedState` | undefined &#124; object | - | Preloaded state of shared state for Redux. |
`render` | function | - | As a rendering function for any React renderer. |

**Returns:** *[App](../interfaces/_interfaces_.app.md)‹T›*
