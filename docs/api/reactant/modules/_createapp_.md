---
id: "_createapp_"
title: "createApp()"
sidebar_label: "createApp()"
---

## Index

### Functions

* [createApp](_createapp_.md#createapp)

## Functions

###  createApp

▸ **createApp**<**T**>(`__namedParameters`: object): *[App](../interfaces/_interfaces_.app.md)‹T›*

*Defined in [createApp.tsx:35](https://github.com/unadlib/reactant/blob/1cc97a2/packages/reactant/src/createApp.tsx#L35)*

**Description:**

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

**Example:**

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

Name | Type | Default |
------ | ------ | ------ |
`containerOptions` | undefined &#124; object | - |
`devOptions` | undefined &#124; DevOptions | - |
`main` | string &#124; symbol &#124; Newable‹T› &#124; Abstract‹T› | - |
`modules` | ValueProvider &#124; FactoryProvider &#124; ClassProvider &#124; ModuleProvider &#124; Module‹any›[] | [] |
`preloadedState` | undefined &#124; object | - |
`render` | function | - |

**Returns:** *[App](../interfaces/_interfaces_.app.md)‹T›*
