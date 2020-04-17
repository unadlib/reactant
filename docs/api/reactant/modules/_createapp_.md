[reactant](../README.md) › [Globals](../globals.md) › ["createApp"](_createapp_.md)

# External module: "createApp"

## Index

### Interfaces

* [Config](../interfaces/_createapp_.config.md)
* [ReturnValue](../interfaces/_createapp_.returnvalue.md)

### Functions

* [createApp](_createapp_.md#createapp)

## Functions

###  createApp

▸ **createApp**<**T**>(`__namedParameters`: object): *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*

*Defined in [createApp.tsx:34](https://github.com/unadlib/reactant/blob/ecdc150/packages/reactant/src/createApp.tsx#L34)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`containerOptions` | undefined &#124; ContainerOptions | - |
`devOptions` | undefined &#124; DevOptions | - |
`main` | string &#124; symbol &#124; Newable‹T› &#124; Abstract‹T› | - |
`middlewares` | undefined &#124; Middleware‹object, any, Dispatch‹AnyAction‹›››[] | - |
`modules` | ValueProvider &#124; ClassProvider &#124; FactoryProvider &#124; ModuleProvider &#124; Module‹any›[] | [] |
`preloadedState` | undefined &#124; object | - |
`render` | function | - |

**Returns:** *[ReturnValue](../interfaces/_createapp_.returnvalue.md)‹T›*
