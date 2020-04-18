[reactant-module](../README.md) › [Globals](../globals.md) › ["core/createStore"](_core_createstore_.md)

# External module: "core/createStore"

## Index

### Functions

* [createStore](_core_createstore_.md#createstore)

## Functions

###  createStore

▸ **createStore**<**T**>(`container`: Container, `ServiceIdentifiers`: ServiceIdentifiersMap, `preloadedState?`: PreloadedState‹T›, `middlewares`: [ReactantMiddleware](_interfaces_.md#reactantmiddleware)[], `providers`: FunctionComponent[], `devOptions`: [DevOptions](../interfaces/_interfaces_.devoptions.md)): *Store‹any, AnyAction‹››*

*Defined in [packages/reactant-module/src/core/createStore.ts:32](https://github.com/unadlib/reactant/blob/aaa61ad/packages/reactant-module/src/core/createStore.ts#L32)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`container` | Container | - |
`ServiceIdentifiers` | ServiceIdentifiersMap | - |
`preloadedState?` | PreloadedState‹T› | - |
`middlewares` | [ReactantMiddleware](_interfaces_.md#reactantmiddleware)[] | [] |
`providers` | FunctionComponent[] | [] |
`devOptions` | [DevOptions](../interfaces/_interfaces_.devoptions.md) | {} |

**Returns:** *Store‹any, AnyAction‹››*
