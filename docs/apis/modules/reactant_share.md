# Module: reactant-share

## Table of contents

### Classes

- [Coworker](../classes/reactant_share.Coworker.md)
- [LastAction](../classes/reactant_share.LastAction.md)
- [ModuleRef](../classes/reactant_share.ModuleRef.md)
- [Optional](../classes/reactant_share.Optional.md)
- [PluginModule](../classes/reactant_share.PluginModule.md)
- [PortDetector](../classes/reactant_share.PortDetector.md)
- [Router](../classes/reactant_share.Router.md)
- [Storage](../classes/reactant_share.Storage.md)
- [ViewModule](../classes/reactant_share.ViewModule.md)

### Interfaces

- [App](../interfaces/reactant_share.App.md)
- [ClassProvider](../interfaces/reactant_share.ClassProvider.md)
- [Config](../interfaces/reactant_share.Config.md)
- [DevOptions](../interfaces/reactant_share.DevOptions.md)
- [FactoryProvider](../interfaces/reactant_share.FactoryProvider.md)
- [ICoworkerOptions](../interfaces/reactant_share.ICoworkerOptions.md)
- [ILastActionOptions](../interfaces/reactant_share.ILastActionOptions.md)
- [ILastActionState](../interfaces/reactant_share.ILastActionState.md)
- [IRouterOptions](../interfaces/reactant_share.IRouterOptions.md)
- [ISharedAppOptions](../interfaces/reactant_share.ISharedAppOptions.md)
- [IStorageOptions](../interfaces/reactant_share.IStorageOptions.md)
- [LoadOptions](../interfaces/reactant_share.LoadOptions.md)
- [ModuleDecoratorOptions](../interfaces/reactant_share.ModuleDecoratorOptions.md)
- [ModuleProvider](../interfaces/reactant_share.ModuleProvider.md)
- [PropertyDescriptor](../interfaces/reactant_share.PropertyDescriptor.md)
- [ReactantAction](../interfaces/reactant_share.ReactantAction.md)
- [Ref](../interfaces/reactant_share.Ref.md)
- [Service](../interfaces/reactant_share.Service.md)
- [SharedAppConfig](../interfaces/reactant_share.SharedAppConfig.md)
- [ValueProvider](../interfaces/reactant_share.ValueProvider.md)

### Type Aliases

- [ClientEvents](reactant_share.md#clientevents)
- [ClientTransport](reactant_share.md#clienttransport)
- [Container](reactant_share.md#container)
- [ContainerOptions](reactant_share.md#containeroptions)
- [DynamicModules](reactant_share.md#dynamicmodules)
- [FirstParameter](reactant_share.md#firstparameter)
- [HandlePlugin](reactant_share.md#handleplugin)
- [ILastActionData](reactant_share.md#ilastactiondata)
- [ImportClass](reactant_share.md#importclass)
- [ImportType](reactant_share.md#importtype)
- [Load](reactant_share.md#load)
- [Loader](reactant_share.md#loader)
- [ModuleOptions](reactant_share.md#moduleoptions)
- [ModulesMap](reactant_share.md#modulesmap)
- [PartialKeys](reactant_share.md#partialkeys)
- [PartialRequired](reactant_share.md#partialrequired)
- [Patch](reactant_share.md#patch)
- [Patches](reactant_share.md#patches)
- [PickOptional](reactant_share.md#pickoptional)
- [PluginHooks](reactant_share.md#pluginhooks)
- [ReactantMiddleware](reactant_share.md#reactantmiddleware)
- [ReactantModuleOptions](reactant_share.md#reactantmoduleoptions)
- [ReactantStore](reactant_share.md#reactantstore)
- [ReduxDevToolsOptions](reactant_share.md#reduxdevtoolsoptions)
- [Renderer](reactant_share.md#renderer)
- [ServerEvents](reactant_share.md#serverevents)
- [ServerTransport](reactant_share.md#servertransport)
- [ServiceIdentifier](reactant_share.md#serviceidentifier)
- [ServiceIdentifiersMap](reactant_share.md#serviceidentifiersmap)
- [SetStorageOptions](reactant_share.md#setstorageoptions)
- [ShallowEqual](reactant_share.md#shallowequal)
- [StateMapObject](reactant_share.md#statemapobject)
- [StateService](reactant_share.md#stateservice)
- [Store](reactant_share.md#store)
- [Subscribe](reactant_share.md#subscribe)
- [Subscriptions](reactant_share.md#subscriptions)
- [SymmetricTransport](reactant_share.md#symmetrictransport)
- [ThisService](reactant_share.md#thisservice)
- [TypePreloadedState](reactant_share.md#typepreloadedstate)
- [Watch](reactant_share.md#watch)

### Variables

- [ContainerContext](reactant_share.md#containercontext)
- [CoworkerOptions](reactant_share.md#coworkeroptions)
- [LastActionOptions](reactant_share.md#lastactionoptions)
- [METADATA\_KEY](reactant_share.md#metadata_key)
- [RouterOptions](reactant_share.md#routeroptions)
- [SharedAppOptions](reactant_share.md#sharedappoptions)
- [StorageOptions](reactant_share.md#storageoptions)
- [actionIdentifier](reactant_share.md#actionidentifier)
- [containerKey](reactant_share.md#containerkey)
- [coworkerKey](reactant_share.md#coworkerkey)
- [defaultStateKey](reactant_share.md#defaultstatekey)
- [dynamicModulesKey](reactant_share.md#dynamicmoduleskey)
- [enableAutoComputedKey](reactant_share.md#enableautocomputedkey)
- [enableAutoFreezeKey](reactant_share.md#enableautofreezekey)
- [enableInspectorKey](reactant_share.md#enableinspectorkey)
- [enablePatchesKey](reactant_share.md#enablepatcheskey)
- [identifierKey](reactant_share.md#identifierkey)
- [initStateKey](reactant_share.md#initstatekey)
- [isClientName](reactant_share.md#isclientname)
- [lastActionName](reactant_share.md#lastactionname)
- [loadFullStateActionName](reactant_share.md#loadfullstateactionname)
- [loaderKey](reactant_share.md#loaderkey)
- [modulesKey](reactant_share.md#moduleskey)
- [nameKey](reactant_share.md#namekey)
- [preloadedStateActionName](reactant_share.md#preloadedstateactionname)
- [proxyClientActionName](reactant_share.md#proxyclientactionname)
- [proxyExecutorKey](reactant_share.md#proxyexecutorkey)
- [proxyServerActionName](reactant_share.md#proxyserveractionname)
- [proxyWorkerExecuteName](reactant_share.md#proxyworkerexecutename)
- [pushAllStateName](reactant_share.md#pushallstatename)
- [removeClientIdToServerName](reactant_share.md#removeclientidtoservername)
- [requestSyncAllStateName](reactant_share.md#requestsyncallstatename)
- [routerModuleName](reactant_share.md#routermodulename)
- [signalMapKey](reactant_share.md#signalmapkey)
- [stateKey](reactant_share.md#statekey)
- [storageModuleName](reactant_share.md#storagemodulename)
- [storeKey](reactant_share.md#storekey)
- [strictKey](reactant_share.md#strictkey)
- [subscriptionsKey](reactant_share.md#subscriptionskey)
- [syncClientIdToServerName](reactant_share.md#syncclientidtoservername)
- [syncClientIdsFromClientsName](reactant_share.md#syncclientidsfromclientsname)
- [syncModuleStateActionName](reactant_share.md#syncmodulestateactionname)
- [syncRouterName](reactant_share.md#syncroutername)
- [syncStateActionName](reactant_share.md#syncstateactionname)
- [syncStateName](reactant_share.md#syncstatename)
- [syncToClientsName](reactant_share.md#synctoclientsname)
- [syncWorkerRouterName](reactant_share.md#syncworkerroutername)
- [unsubscriptionsKey](reactant_share.md#unsubscriptionskey)

### Functions

- [action](reactant_share.md#action)
- [applyMiddleware](reactant_share.md#applymiddleware)
- [areShallowEqualWithArray](reactant_share.md#areshallowequalwitharray)
- [areShallowEqualWithObject](reactant_share.md#areshallowequalwithobject)
- [assign](reactant_share.md#assign)
- [autobind](reactant_share.md#autobind)
- [batch](reactant_share.md#batch)
- [bindModules](reactant_share.md#bindmodules)
- [compose](reactant_share.md#compose)
- [computed](reactant_share.md#computed)
- [createApp](reactant_share.md#createapp)
- [createBroadcastTransport](reactant_share.md#createbroadcasttransport)
- [createContainer](reactant_share.md#createcontainer)
- [createCoworker](reactant_share.md#createcoworker)
- [createSelectorWithArray](reactant_share.md#createselectorwitharray)
- [createSharedApp](reactant_share.md#createsharedapp)
- [createState](reactant_share.md#createstate)
- [createStore](reactant_share.md#createstore)
- [defaultMemoize](reactant_share.md#defaultmemoize)
- [delegate](reactant_share.md#delegate)
- [dispatch](reactant_share.md#dispatch)
- [dynamic](reactant_share.md#dynamic)
- [fork](reactant_share.md#fork)
- [forwardRef](reactant_share.md#forwardref)
- [getComposeEnhancers](reactant_share.md#getcomposeenhancers)
- [getCoworker](reactant_share.md#getcoworker)
- [getLazyDecorator](reactant_share.md#getlazydecorator)
- [getMetadata](reactant_share.md#getmetadata)
- [getRef](reactant_share.md#getref)
- [getRehydrated](reactant_share.md#getrehydrated)
- [getStageName](reactant_share.md#getstagename)
- [getStagedState](reactant_share.md#getstagedstate)
- [handlePlugin](reactant_share.md#handleplugin-1)
- [inject](reactant_share.md#inject)
- [injectable](reactant_share.md#injectable)
- [isEqual](reactant_share.md#isequal)
- [isEqualExceptFunction](reactant_share.md#isequalexceptfunction)
- [lazy](reactant_share.md#lazy)
- [load](reactant_share.md#load-1)
- [mockPairTransports](reactant_share.md#mockpairtransports)
- [multiInject](reactant_share.md#multiinject)
- [multiOptional](reactant_share.md#multioptional)
- [optional](reactant_share.md#optional)
- [perform](reactant_share.md#perform)
- [state](reactant_share.md#state)
- [subscribe](reactant_share.md#subscribe-1)
- [testBed](reactant_share.md#testbed)
- [untracked](reactant_share.md#untracked)
- [useConnector](reactant_share.md#useconnector)
- [useLock](reactant_share.md#uselock)
- [watch](reactant_share.md#watch-1)

## Type Aliases

### ClientEvents

Ƭ **ClientEvents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@@reactant:isClient` | () => `Promise`<`boolean`\> |
| `@@reactant:loadFullState` | (`sequence`: `number`) => `Promise`<`undefined` \| ``null`` \| `Record`<`string`, `any`\>\> |
| `@@reactant:preloadedState` | () => `Promise`<`Record`<`string`, `any`\>\> |
| `@@reactant:proxyClient` | (`options`: `ProxyExecParams`) => `Promise`<`any`\> |
| `@@reactant:removeClientIdToServer` | (`clientId`: `string`) => `void` |
| `@@reactant:syncClientIdToServer` | (`clientId`: `string`) => `void` |
| `@@reactant:syncRouter` | (`name`: `string`, `timestamp`: `number`, `router?`: `RouterState`) => `Promise`<`RouterState`\> |

#### Defined in

[packages/reactant-share/src/interfaces.ts:153](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L153)

___

### ClientTransport

Ƭ **ClientTransport**<`T`\>: `Transport`<`MergeInteraction`<{ `emit`: [`ClientEvents`](reactant_share.md#clientevents) ; `listen`: [`ServerEvents`](reactant_share.md#serverevents)  }, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `BaseInteraction` = {} |

#### Defined in

[packages/reactant-share/src/interfaces.ts:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L48)

___

### Container

Ƭ **Container**: `IContainer`

#### Defined in

[packages/reactant-di/src/interfaces.ts:15](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L15)

___

### ContainerOptions

Ƭ **ContainerOptions**: `PickByKey`<`interfaces.ContainerOptions`, ``"skipBaseClassChecks"``\>

#### Defined in

[packages/reactant-di/src/interfaces.ts:11](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L11)

___

### DynamicModules

Ƭ **DynamicModules**: `Map`<`any`, { `multiple`: `boolean` ; `value`: `any`  }\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:266](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L266)

___

### FirstParameter

Ƭ **FirstParameter**<`T`\>: `T` extends (`param`: infer P, ...`args`: `any`[]) => `any` ? `P` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:132](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L132)

___

### HandlePlugin

Ƭ **HandlePlugin**<`T`\>: (`service`: `T`, `pluginHooks`: [`PluginHooks`](reactant_share.md#pluginhooks)) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

▸ (`service`, `pluginHooks`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `T` |
| `pluginHooks` | [`PluginHooks`](reactant_share.md#pluginhooks) |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/interfaces.ts:145](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L145)

___

### ILastActionData

Ƭ **ILastActionData**: `Pick`<[`ILastActionState`](../interfaces/reactant_share.ILastActionState.md)<`unknown`\>, `Exclude`<keyof [`ILastActionState`](../interfaces/reactant_share.ILastActionState.md), ``"_inversePatches"`` \| ``"state"``\>\>

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:23](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L23)

___

### ImportClass

Ƭ **ImportClass**<`T`, `K`\>: `T` extends `Record`<`K`, infer S\> ? `S` extends (...`args`: `any`[]) => infer R ? `R` : `never` : `never`

It's used to infer the type of `import()` class type
or use `import type` in TypeScript 3.8+

**`Example`**

// counter.ts: `export class Counter {}`
type Counter = ImportClass<typeof import('./counter'), 'Counter'>;

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:259](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L259)

___

### ImportType

Ƭ **ImportType**<`T`, `K`\>: `T` extends `Record`<`K`, infer R\> ? `R` : `never`

It's used to infer the type of `import()` type

**`Example`**

// counter.ts: `export const list = [''];`
type List = ImportType<typeof import('./counter'), 'list'>;

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:247](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L247)

___

### Load

Ƭ **Load**: (`service`: [`ThisService`](reactant_share.md#thisservice), `loadModules`: [`ReactantModuleOptions`](reactant_share.md#reactantmoduleoptions)[]) => `Promise`<[`Container`](reactant_share.md#container)\>

#### Type declaration

▸ (`service`, `loadModules`): `Promise`<[`Container`](reactant_share.md#container)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) |
| `loadModules` | [`ReactantModuleOptions`](reactant_share.md#reactantmoduleoptions)[] |

##### Returns

`Promise`<[`Container`](reactant_share.md#container)\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:203](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L203)

___

### Loader

Ƭ **Loader**: (`loadModules`: [`ReactantModuleOptions`](reactant_share.md#reactantmoduleoptions)[], `beforeReplaceReducer?`: (`container`: [`Container`](reactant_share.md#container)) => `void`) => `void`

#### Type declaration

▸ (`loadModules`, `beforeReplaceReducer?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `loadModules` | [`ReactantModuleOptions`](reactant_share.md#reactantmoduleoptions)[] |
| `beforeReplaceReducer?` | (`container`: [`Container`](reactant_share.md#container)) => `void` |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/interfaces.ts:198](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L198)

___

### ModuleOptions

Ƭ **ModuleOptions**<`T`\>: [`ValueProvider`](../interfaces/reactant_share.ValueProvider.md)<`T`\> \| [`FactoryProvider`](../interfaces/reactant_share.FactoryProvider.md)<`T`\> \| [`ClassProvider`](../interfaces/reactant_share.ClassProvider.md)<`T`\> \| [`ModuleProvider`](../interfaces/reactant_share.ModuleProvider.md)<`T`\> \| `Module`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:62](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L62)

___

### ModulesMap

Ƭ **ModulesMap**: `Record`<`string`, `any`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:130](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L130)

___

### PartialKeys

Ƭ **PartialKeys**<`T`, `K`\>: `Pick`<`T`, `Exclude`<keyof `T`, `K`\>\> & `Partial`<`Pick`<`T`, `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:237](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L237)

___

### PartialRequired

Ƭ **PartialRequired**<`T`, `K`\>: `Required`<`Pick`<`T`, `K`\>\> & `Pick`<`T`, `Exclude`<keyof `T`, `K`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:221](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L221)

___

### Patch

Ƭ **Patch**: `IPatch`<``true``\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:41](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L41)

___

### Patches

Ƭ **Patches**: `IPatches`<``true``\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:43](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L43)

___

### PickOptional

Ƭ **PickOptional**<`T`\>: `Pick`<`ExcludeRequired`<`T`\>, `OptionalKeyOf`<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:235](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L235)

___

### PluginHooks

Ƭ **PluginHooks**: `Collection`<[`PluginModule`](../classes/reactant_share.PluginModule.md)\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:143](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L143)

___

### ReactantMiddleware

Ƭ **ReactantMiddleware**: `Middleware`

#### Defined in

[packages/reactant-module/src/interfaces.ts:113](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L113)

___

### ReactantModuleOptions

Ƭ **ReactantModuleOptions**<`T`\>: [`ModuleOptions`](reactant_share.md#moduleoptions)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:107](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L107)

___

### ReactantStore

Ƭ **ReactantStore**: `ReduxStore`<`any`, `AnyAction`\> & { `reducers?`: `ReducersMapObject`  }

#### Defined in

[packages/reactant-module/src/interfaces.ts:109](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L109)

___

### ReduxDevToolsOptions

Ƭ **ReduxDevToolsOptions**: `Pick`<`EnhancerOptions`, `Exclude`<keyof `EnhancerOptions`, ``"actionSanitizer"`` \| ``"serialize"``\>\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:76](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L76)

___

### Renderer

Ƭ **Renderer**<`T`\>: (`element`: `JSX.Element`, ...`args`: `T`) => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |

#### Type declaration

▸ (`element`, `...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `JSX.Element` |
| `...args` | `T` |

##### Returns

`any`

#### Defined in

[packages/reactant/src/interfaces.ts:10](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L10)

___

### ServerEvents

Ƭ **ServerEvents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@@reactant:lastAction` | (`options`: [`ILastActionData`](reactant_share.md#ilastactiondata)) => `Promise`<`void`\> |
| `@@reactant:proxyServer` | (`options`: `ProxyExecParams` & { `clientIds?`: `string`[] ; `excludeClientIds?`: `string`[] ; `portName?`: `string`  }) => `Promise`<`void`\> |
| `@@reactant:syncClientIdsFromClients` | () => `Promise`<`void`\> |
| `@@reactant:syncToClients` | (`options`: `undefined` \| ``null`` \| `Record`<`string`, `any`\>) => `Promise`<`void`\> |
| `@@reactant:syncWorkerRouter` | (`name`: `string`) => `Promise`<`undefined` \| `RouterState`\> |

#### Defined in

[packages/reactant-share/src/interfaces.ts:169](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L169)

___

### ServerTransport

Ƭ **ServerTransport**<`T`\>: `Transport`<`MergeInteraction`<{ `emit`: [`ServerEvents`](reactant_share.md#serverevents) ; `listen`: [`ClientEvents`](reactant_share.md#clientevents)  }, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `BaseInteraction` = {} |

#### Defined in

[packages/reactant-share/src/interfaces.ts:44](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L44)

___

### ServiceIdentifier

Ƭ **ServiceIdentifier**<`T`\>: `interfaces.ServiceIdentifier`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:16](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L16)

___

### ServiceIdentifiersMap

Ƭ **ServiceIdentifiersMap**<`T`\>: `Map`<[`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`T`\>, [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`T`\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[packages/reactant-di/src/interfaces.ts:21](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/interfaces.ts#L21)

___

### SetStorageOptions

Ƭ **SetStorageOptions**<`T`\>: `Pick`<`Partial`<`PersistConfig`<`any`\>\>, `Exclude`<keyof `PersistConfig`<`any`\>, ``"key"`` \| ``"blacklist"`` \| ``"whitelist"``\>\> & { `blacklist?`: keyof `T`[] ; `whitelist?`: keyof `T`[]  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-storage/src/storage.tsx:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L48)

___

### ShallowEqual

Ƭ **ShallowEqual**: (`a`: `Record`<`string`, `any`\>, `b`: `Record`<`string`, `any`\>) => `boolean`

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Record`<`string`, `any`\> |
| `b` | `Record`<`string`, `any`\> |

##### Returns

`boolean`

#### Defined in

[packages/reactant/src/interfaces.ts:51](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/interfaces.ts#L51)

___

### StateMapObject

Ƭ **StateMapObject**<`T`\>: { [P in keyof T]: T[P] extends Function ? FirstParameter<T[P]\> : never }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `Function`\> |

#### Defined in

[packages/reactant-module/src/interfaces.ts:124](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L124)

___

### StateService

Ƭ **StateService**<`T`\>: [`Service`](../interfaces/reactant_share.Service.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Defined in

[packages/reactant-module/src/interfaces.ts:208](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L208)

___

### Store

Ƭ **Store**: `ReduxStore`

#### Defined in

[packages/reactant-module/src/interfaces.ts:264](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L264)

___

### Subscribe

Ƭ **Subscribe**: (`service`: [`ThisService`](reactant_share.md#thisservice), `listener`: () => `void`) => `Unsubscribe`

#### Type declaration

▸ (`service`, `listener`): `Unsubscribe`

##### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) |
| `listener` | () => `void` |

##### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:150](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L150)

___

### Subscriptions

Ƭ **Subscriptions**: () => `void`[]

#### Defined in

[packages/reactant-module/src/interfaces.ts:83](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L83)

___

### SymmetricTransport

Ƭ **SymmetricTransport**<`T`\>: `Transport`<{ `emit`: `T` ; `listen`: `T`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, (...`args`: `any`[]) => `any`\> |

#### Defined in

[packages/reactant-share/src/interfaces.ts:239](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L239)

___

### ThisService

Ƭ **ThisService**: [`Service`](../interfaces/reactant_share.Service.md) & { `[P: string]`: `any`;  }

#### Defined in

[packages/reactant-module/src/interfaces.ts:105](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L105)

___

### TypePreloadedState

Ƭ **TypePreloadedState**<`T`\>: `PreloadedState`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/reactant-module/src/interfaces.ts:81](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L81)

___

### Watch

Ƭ **Watch**: <P, T\>(`service`: [`ThisService`](reactant_share.md#thisservice), `selector`: `Selector`<`P` extends ``true`` ? readonly [...T] \| [...T] : `T`\>, `watcher`: `Watcher`<`T`\>, `options?`: { `isEqual?`: (`x`: `unknown`, `y`: `unknown`) => `boolean` ; `multiple?`: `P`  }) => `Unsubscribe`

#### Type declaration

▸ <`P`, `T`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` |
| `T` | extends `P` extends ``true`` ? `any`[] : `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) | - |
| `selector` | `Selector`<`P` extends ``true`` ? readonly [...T] \| [...T] : `T`\> | - |
| `watcher` | `Watcher`<`T`\> | - |
| `options?` | `Object` | - |
| `options.isEqual?` | (`x`: `unknown`, `y`: `unknown`) => `boolean` | Define `isEqual` function as shallow comparison |
| `options.multiple?` | `P` | Use multiple values watching |

##### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:165](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L165)

## Variables

### ContainerContext

• `Const` **ContainerContext**: `Context`<[`Container`](reactant_share.md#container) \| ``null``\>

#### Defined in

[packages/reactant/src/createApp.tsx:24](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/createApp.tsx#L24)

___

### CoworkerOptions

• `Const` **CoworkerOptions**: typeof [`CoworkerOptions`](reactant_share.md#coworkeroptions)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:90](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L90)

___

### LastActionOptions

• `Const` **LastActionOptions**: typeof [`LastActionOptions`](reactant_share.md#lastactionoptions)

#### Defined in

[packages/reactant-last-action/src/lastAction.ts:14](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-last-action/src/lastAction.ts#L14)

___

### METADATA\_KEY

• `Const` **METADATA\_KEY**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inversifyParamtypes` | ``"inversify:paramtypes"`` |
| `inversifyTagged` | ``"inversify:tagged"`` |
| `lazy` | ``"reactant:lazy"`` |
| `multiple` | ``"reactant:multiple"`` |
| `optional` | ``"reactant:optional"`` |
| `paramtypes` | ``"design:paramtypes"`` |
| `provide` | ``"reactant:provide"`` |

#### Defined in

[packages/reactant-di/src/constants.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/constants.ts#L1)

___

### RouterOptions

• `Const` **RouterOptions**: typeof [`RouterOptions`](reactant_share.md#routeroptions)

#### Defined in

[packages/reactant-router/src/router.tsx:23](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-router/src/router.tsx#L23)

___

### SharedAppOptions

• `Const` **SharedAppOptions**: typeof [`SharedAppOptions`](reactant_share.md#sharedappoptions)

#### Defined in

[packages/reactant-share/src/constants.ts:17](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L17)

___

### StorageOptions

• `Const` **StorageOptions**: typeof [`StorageOptions`](reactant_share.md#storageoptions)

#### Defined in

[packages/reactant-storage/src/storage.tsx:29](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L29)

___

### actionIdentifier

• `Const` **actionIdentifier**: ``"REACTANT_ACTION"``

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:14](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L14)

___

### containerKey

• `Const` **containerKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L1)

___

### coworkerKey

• `Const` **coworkerKey**: typeof [`coworkerKey`](reactant_share.md#coworkerkey)

#### Defined in

[packages/reactant-share/src/constants.ts:28](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L28)

___

### defaultStateKey

• `Const` **defaultStateKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L6)

___

### dynamicModulesKey

• `Const` **dynamicModulesKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L6)

___

### enableAutoComputedKey

• `Const` **enableAutoComputedKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:9](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L9)

___

### enableAutoFreezeKey

• `Const` **enableAutoFreezeKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:11](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L11)

___

### enableInspectorKey

• `Const` **enableInspectorKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:13](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L13)

___

### enablePatchesKey

• `Const` **enablePatchesKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:8](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L8)

___

### identifierKey

• `Const` **identifierKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:2](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L2)

___

### initStateKey

• `Const` **initStateKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:5](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L5)

___

### isClientName

• `Const` **isClientName**: ``"@@reactant:isClient"``

#### Defined in

[packages/reactant-share/src/constants.ts:4](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L4)

___

### lastActionName

• `Const` **lastActionName**: ``"@@reactant:lastAction"``

#### Defined in

[packages/reactant-share/src/constants.ts:11](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L11)

___

### loadFullStateActionName

• `Const` **loadFullStateActionName**: ``"@@reactant:loadFullState"``

#### Defined in

[packages/reactant-share/src/constants.ts:5](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L5)

___

### loaderKey

• `Const` **loaderKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:2](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L2)

___

### modulesKey

• `Const` **modulesKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:3](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L3)

___

### nameKey

• `Const` **nameKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/moduleKeys.ts:4](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/moduleKeys.ts#L4)

___

### preloadedStateActionName

• `Const` **preloadedStateActionName**: ``"@@reactant:preloadedState"``

#### Defined in

[packages/reactant-share/src/constants.ts:3](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L3)

___

### proxyClientActionName

• `Const` **proxyClientActionName**: ``"@@reactant:proxyClient"``

#### Defined in

[packages/reactant-share/src/constants.ts:2](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L2)

___

### proxyExecutorKey

• `Const` **proxyExecutorKey**: typeof [`proxyExecutorKey`](reactant_share.md#proxyexecutorkey)

#### Defined in

[packages/reactant-share/src/constants.ts:23](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L23)

___

### proxyServerActionName

• `Const` **proxyServerActionName**: ``"@@reactant:proxyServer"``

#### Defined in

[packages/reactant-share/src/constants.ts:10](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L10)

___

### proxyWorkerExecuteName

• `Const` **proxyWorkerExecuteName**: ``"@@reactant:coworkerProxyWorkerExecute"``

#### Defined in

[packages/reactant-share/src/constants.ts:24](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L24)

___

### pushAllStateName

• `Const` **pushAllStateName**: ``"@@reactant:coworkerPushAllState"``

#### Defined in

[packages/reactant-share/src/constants.ts:27](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L27)

___

### removeClientIdToServerName

• `Const` **removeClientIdToServerName**: ``"@@reactant:removeClientIdToServer"``

#### Defined in

[packages/reactant-share/src/constants.ts:8](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L8)

___

### requestSyncAllStateName

• `Const` **requestSyncAllStateName**: ``"@@reactant:coworkerRequestSyncAllState"``

#### Defined in

[packages/reactant-share/src/constants.ts:26](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L26)

___

### routerModuleName

• `Const` **routerModuleName**: ``"Router"``

#### Defined in

[packages/reactant-share/src/constants.ts:20](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L20)

___

### signalMapKey

• `Const` **signalMapKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:7](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L7)

___

### stateKey

• `Const` **stateKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:5](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L5)

___

### storageModuleName

• `Const` **storageModuleName**: ``"Storage"``

#### Defined in

[packages/reactant-share/src/constants.ts:19](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L19)

___

### storeKey

• `Const` **storeKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L1)

___

### strictKey

• `Const` **strictKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:12](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L12)

___

### subscriptionsKey

• `Const` **subscriptionsKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:3](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L3)

___

### syncClientIdToServerName

• `Const` **syncClientIdToServerName**: ``"@@reactant:syncClientIdToServer"``

#### Defined in

[packages/reactant-share/src/constants.ts:7](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L7)

___

### syncClientIdsFromClientsName

• `Const` **syncClientIdsFromClientsName**: ``"@@reactant:syncClientIdsFromClients"``

#### Defined in

[packages/reactant-share/src/constants.ts:14](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L14)

___

### syncModuleStateActionName

• `Const` **syncModuleStateActionName**: ``"@@reactant:syncModuleState"``

#### Defined in

[packages/reactant-share/src/constants.ts:31](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L31)

___

### syncRouterName

• `Const` **syncRouterName**: ``"@@reactant:syncRouter"``

#### Defined in

[packages/reactant-share/src/constants.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L6)

___

### syncStateActionName

• `Const` **syncStateActionName**: ``"@@reactant:syncState"``

#### Defined in

[packages/reactant-share/src/constants.ts:30](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L30)

___

### syncStateName

• `Const` **syncStateName**: ``"@@reactant:coworkerSyncState"``

#### Defined in

[packages/reactant-share/src/constants.ts:25](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L25)

___

### syncToClientsName

• `Const` **syncToClientsName**: ``"@@reactant:syncToClients"``

#### Defined in

[packages/reactant-share/src/constants.ts:12](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L12)

___

### syncWorkerRouterName

• `Const` **syncWorkerRouterName**: ``"@@reactant:syncWorkerRouter"``

#### Defined in

[packages/reactant-share/src/constants.ts:13](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/constants.ts#L13)

___

### unsubscriptionsKey

• `Const` **unsubscriptionsKey**: unique `symbol`

#### Defined in

[packages/reactant-module/src/constants/reduxKeys.ts:4](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/constants/reduxKeys.ts#L4)

## Functions

### action

▸ **action**(`target`, `key`, `descriptor`): `Object`

## Description

`@action` is used to decorate a class method as a action method.

## Example

```ts
@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<(...`args`: `any`[]) => `void`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `value` | (`this`: [`Service`](../interfaces/reactant_share.Service.md)<`Record`<`string`, `any`\>\>, ...`args`: `unknown`[]) => `void` |

#### Defined in

[packages/reactant-module/src/decorators/action.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/action.ts#L47)

___

### applyMiddleware

▸ **applyMiddleware**(`...args`): typeof `__class`

## Description
Apply middlewares for Redux.

## Example

```ts
import logger from 'redux-logger';

@injectable()
class Foo {}

const app = createApp({
  modules: [applyMiddleware(logger)],
  main: Foo,
  render: () => {},
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `Middleware`<{}, `any`, `Dispatch`<`AnyAction`\>\>[] | middlewares for Redux |

#### Returns

typeof `__class`

#### Defined in

[packages/reactant-module/src/core/applyMiddleware.ts:30](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/applyMiddleware.ts#L30)

___

### areShallowEqualWithArray

▸ **areShallowEqualWithArray**(`prev`, `next`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prev` | ``null`` \| `IArguments` \| `any`[] |
| `next` | ``null`` \| `IArguments` \| `any`[] |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:43](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/isEqual.ts#L43)

___

### areShallowEqualWithObject

▸ **areShallowEqualWithObject**(`objA`, `objB`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objA` | `any` |
| `objB` | `any` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:14](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/isEqual.ts#L14)

___

### assign

▸ **assign**(`target`, `key`, `value`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `value` | `any` |
| `options?` | `object` |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/utils/assign.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/assign.ts#L1)

___

### autobind

▸ **autobind**(`target`, `key`, `«destructured»`): `Object`

## Description

You can use `@autobind` and decorate any class method that binds the instance of the current class as its `this`,
it can also be used with `@action`.

## Example

```ts
class Shop {
  @state
  count = 0;

  list: string[] = [];

  @autobind
  @action
  increase() {
    this.count += 0;
  }

  @autobind
  addGood(text) {
    this.list.push(text);
  }
}

const app = testBed({
  modules: [],
  main: Shop,
});

const { increase, addGood } = app.instance;
increase();
addGood('apple');
expect(app.instance.count).toBe(1);
expect(app.instance.list).toEqual(['apple']);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `«destructured»` | `TypedPropertyDescriptor`<`any`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configurable` | `undefined` \| `boolean` |
| `enumerable` | `undefined` \| `boolean` |
| `get` | () => `any` |
| `set` | (`setValue`: `unknown`) => `void` |

#### Defined in

[packages/reactant-module/src/decorators/autobind.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/autobind.ts#L42)

___

### batch

▸ **batch**(`cb`): `void`

Wraps ReactDOM or React Native's internal unstable_batchedUpdate function. You can use it to ensure that
multiple actions dispatched outside of React only result in a single render update.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/react-redux/index.d.ts:501

___

### bindModules

▸ **bindModules**(`container`, `modules`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `container` | `Container` |
| `modules` | [`ModuleOptions`](reactant_share.md#moduleoptions)[] |

#### Returns

`void`

#### Defined in

[packages/reactant-di/src/createContainer.ts:143](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/createContainer.ts#L143)

___

### compose

▸ **compose**(): <R\>(`a`: `R`) => `R`

Composes single-argument functions from right to left. The rightmost
function can take multiple arguments as it provides the signature for the
resulting composite function.

#### Returns

`fn`

R function obtained by composing the argument functions from right
  to left. For example, `compose(f, g, h)` is identical to doing
  `(...args) => f(g(h(...args)))`.

▸ <`R`\>(`a`): `R`

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `R` |

##### Returns

`R`

#### Defined in

node_modules/redux/index.d.ts:603

▸ **compose**<`F`\>(`f`): `F`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends `Function` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `F` |

#### Returns

`F`

#### Defined in

node_modules/redux/index.d.ts:605

▸ **compose**<`A`, `R`\>(`f1`, `f2`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

node_modules/redux/index.d.ts:608

▸ **compose**<`A`, `T1`, `R`\>(`f1`, `f2`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:609

▸ **compose**<`A`, `T1`, `T2`, `R`\>(`f1`, `f2`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:613

▸ **compose**<`A`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `A`) => `R` |
| `f2` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:617

▸ **compose**<`A`, `B`, `R`\>(`f1`, `f2`, `f3`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

node_modules/redux/index.d.ts:623

▸ **compose**<`A`, `B`, `T1`, `R`\>(`f1`, `f2`, `f3`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:628

▸ **compose**<`A`, `B`, `T1`, `T2`, `R`\>(`f1`, `f2`, `f3`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:633

▸ **compose**<`A`, `B`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`, `f3`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `B`) => `R` |
| `f2` | (`a`: `A`) => `B` |
| `f3` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:638

▸ **compose**<`A`, `B`, `C`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func0`<`R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func0`<`A`\> |

#### Returns

`Func0`<`R`\>

#### Defined in

node_modules/redux/index.d.ts:645

▸ **compose**<`A`, `B`, `C`, `T1`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func1`<`T1`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func1`<`T1`, `A`\> |

#### Returns

`Func1`<`T1`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:651

▸ **compose**<`A`, `B`, `C`, `T1`, `T2`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func2`<`T1`, `T2`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `T2` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func2`<`T1`, `T2`, `A`\> |

#### Returns

`Func2`<`T1`, `T2`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:657

▸ **compose**<`A`, `B`, `C`, `T1`, `T2`, `T3`, `R`\>(`f1`, `f2`, `f3`, `f4`): `Func3`<`T1`, `T2`, `T3`, `R`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `T1` |
| `T2` |
| `T3` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `C`) => `R` |
| `f2` | (`a`: `B`) => `C` |
| `f3` | (`a`: `A`) => `B` |
| `f4` | `Func3`<`T1`, `T2`, `T3`, `A`\> |

#### Returns

`Func3`<`T1`, `T2`, `T3`, `R`\>

#### Defined in

node_modules/redux/index.d.ts:663

▸ **compose**<`R`\>(`f1`, `...funcs`): (...`args`: `any`[]) => `R`

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f1` | (`b`: `any`) => `R` |
| `...funcs` | `Function`[] |

#### Returns

`fn`

▸ (`...args`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`R`

#### Defined in

node_modules/redux/index.d.ts:671

▸ **compose**<`R`\>(`...funcs`): (...`args`: `any`[]) => `R`

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...funcs` | `Function`[] |

#### Returns

`fn`

▸ (`...args`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`R`

#### Defined in

node_modules/redux/index.d.ts:676

___

### computed

▸ **computed**(`target`, `key`, `descriptor`): `any`

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

if you want to use `@computed` with non-manually maintained dependencies,
you should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.

## Example

```ts
class Shop {
  @state
  fruits = [];

  @state
  vegetables = [];

  @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
  get sum() {
    return this.fruits.length + this.vegetables.length;
  }
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:11](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/computed.ts#L11)

▸ **computed**(`depsCallback`): (`target`: `object`, `key`: `string`, `descriptor`: `TypedPropertyDescriptor`<`any`\>) => `any`

## Description

You can use `@computed` to decorate a getter function for derived data,
which quickly solves performance problems for computing derived data.

if you want to use `@computed` with non-manually maintained dependencies,
you should enable auto computed feature by setting 'autoComputed' to 'true' in the dev options.

## Example

```ts
class Shop {
  @state
  fruits = [];

  @state
  vegetables = [];

  @computed(({ fruits, vegetables }: Shop) => [fruits, fruits])
  get sum() {
    return this.fruits.length + this.vegetables.length;
  }
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `depsCallback` | (`instance`: `any`) => `any`[] |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` |
| `descriptor` | `TypedPropertyDescriptor`<`any`\> |

##### Returns

`any`

#### Defined in

[packages/reactant-module/src/decorators/computed.ts:17](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/computed.ts#L17)

___

### createApp

▸ **createApp**<`T`, `S`, `R`\>(`«destructured»`): [`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>

## Description

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```typescript
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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](reactant_share.md#renderer)<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Config`](../interfaces/reactant_share.Config.md)<`T`, `S`, `R`\> |

#### Returns

[`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>

#### Defined in

[packages/reactant/src/createApp.tsx:51](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/createApp.tsx#L51)

___

### createBroadcastTransport

▸ **createBroadcastTransport**(`name`, `verbose?`): `Transport`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `verbose?` | `boolean` |

#### Returns

`Transport`<`any`\>

#### Defined in

[packages/reactant-share/src/createTransport.ts:4](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/createTransport.ts#L4)

___

### createContainer

▸ **createContainer**(`«destructured»`): `Container`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ContainerConfig` |

#### Returns

`Container`

#### Defined in

[packages/reactant-di/src/createContainer.ts:201](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/createContainer.ts#L201)

___

### createCoworker

▸ **createCoworker**(`name`): [`Module`<[`Coworker`](../classes/reactant_share.Coworker.md)\>, `symbol`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Module`<[`Coworker`](../classes/reactant_share.Coworker.md)\>, `symbol`]

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:489](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L489)

___

### createSelectorWithArray

▸ **createSelectorWithArray**(`dependenciesFunc`, `resultFunc`): (`this`: `ThisType`<`unknown`\>) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependenciesFunc` | (`that`: `any`) => `any`[] |
| `resultFunc` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (`this`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `ThisType`<`unknown`\> |

##### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/selector.ts:21](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/selector.ts#L21)

___

### createSharedApp

▸ **createSharedApp**<`T`, `S`, `R`\>(`options`): `Promise`<[`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>\>

## Description

You can create an shared app with `createSharedApp()` passing app configuration,
which will asynchronously return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
import { createSharedApp, injectable, state, action, delegate, mockPairTransports } from 'reactant-share';

@injectable({
  name: 'counter',
})
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

export default async () => {
  const transports = mockPairTransports();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: transports[0],
      },
    },
  });

  const client = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'client',
      transports: {
        client: transports[1],
      },
    },
  });

  await delegate(client.instance, 'increase', []);

  expect(client.instance.count).toBe(1);
  expect(server.instance.count).toBe(1);
};
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](reactant_share.md#renderer)<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SharedAppConfig`](../interfaces/reactant_share.SharedAppConfig.md)<`T`, `S`, `R`\> |

#### Returns

`Promise`<[`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>\>

#### Defined in

[packages/reactant-share/src/createApp.ts:262](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/createApp.ts#L262)

___

### createState

▸ **createState**<`S`, `A`\>(`reducer`): `S`

## Description

It allows a class state to be defined with a reducer,
which is often used in situations where a class state is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `dispatch()`.

## Example

```ts
const type = 'count_increase';

interface CountAction {
 type: typeof type;
 state: number;
}

@injectable()
class Counter {
 @state
 count = createState<CountAction['state'], CountAction>(
   ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 );

 increase() {
   dispatch<CountAction>(this, {
     type,
     state: this.count + 1,
   });
 }
}

const app = createApp({
  modules: [],
  main: Counter,
  render: () => {},
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `any` |
| `A` | extends `Action`<`any`, `A`\> = `AnyAction` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reducer` | `Reducer`<`S`, `A`\> |

#### Returns

`S`

#### Defined in

[packages/reactant-module/src/core/createState.ts:45](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/createState.ts#L45)

___

### createStore

▸ **createStore**<`T`\>(`«destructured»`): [`ReactantStore`](reactant_share.md#reactantstore)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `CreateStoreOptions`<`T`\> |

#### Returns

[`ReactantStore`](reactant_share.md#reactantstore)

#### Defined in

[packages/reactant-module/src/core/createStore.ts:76](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/createStore.ts#L76)

___

### defaultMemoize

▸ **defaultMemoize**(`func`): (`this`: `ThisType`<`unknown`\>) => `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | (...`args`: `any`) => `any` |

#### Returns

`fn`

▸ (`this`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `ThisType`<`unknown`\> |

##### Returns

`unknown`

#### Defined in

[packages/reactant-module/src/utils/selector.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/selector.ts#L6)

___

### delegate

▸ **delegate**<`T`, `K`, `O`\>(`module`, `key`, `args`, `options?`): `O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

Proxy execute On the server side.

## Description

`delegate()` is very similar to the actor model,
 which transfers the corresponding module method to the server thread for execution and returns the result as response.

Note: It does not create new threads, it always runs on the server thread that has already been created.

## Example

```tsx
import React from 'react';
import { ViewModule, createApp, injectable, useConnector, action, state, delegate } from 'reactant-share';

@injectable({ name: 'counter'})
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

@injectable()
export class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <button type="button" onClick={() => delegate(this.counter, 'increase', [])}>
        {count}
      </button>
    );
  }
}
```
reference: https://en.wikipedia.org/wiki/Actor_model

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string` \| `number` \| `symbol`, `any`\> |
| `K` | extends `string` \| `number` \| `symbol` |
| `O` | extends `undefined` \| `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | `T` | Designate an execution module from the server side. |
| `key` | `K` | Specify the name of a method in this module. |
| `args` | `Parameters`<`T`[`K`]\> | Pass in the parameters for this method. |
| `options?` | { `clientIds?`: `string`[] ; `portName?`: `string` ; `respond?`: `O`  } & `Pick`<`EmitParameter`<`any`\>, ``"timeout"`` \| ``"_extra"`` \| ``"silent"`` \| ``"skipBeforeEmit"``\> | proxy execution options |

#### Returns

`O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:209](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L209)

___

### dispatch

▸ **dispatch**<`T`\>(`target`, `action`): `void`

## Description

It is used for compatibility with redux actions,
when a class state with actions is being migrated from the Redux boilerplate code to the Reactant.
And it's often used in conjunction with `createState()`.

## Example

```ts
const type = 'count_increase';

interface CountAction {
 type: typeof type;
 state: number;
}

@injectable()
class Counter {
 @state
 count = createState<CountAction['state'], CountAction>(
   ($state = 0, $action) => ($action.type === type ? $action.state : $state)
 );

 increase() {
   dispatch<CountAction>(this, {
     type,
     state: this.count + 1,
   });
 }
}

const app = createApp({
  modules: [],
  main: Counter,
  render: () => {},
});

app.instance.increase();
expect(app.instance.count).toBe(1);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AnyAction`<`T`\> = `AnyAction` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`ThisService`](reactant_share.md#thisservice) |
| `action` | `T` |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/core/dispatch.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/dispatch.ts#L47)

___

### dynamic

▸ **dynamic**<`M`, `T`\>(`serviceIdentifierOrName`, `options?`): (`target`: `object`, `key`: `string` \| `symbol`, `descriptor?`: [`PropertyDescriptor`](../interfaces/reactant_share.PropertyDescriptor.md)<`unknown`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `M` | extends `boolean` = ``false`` |
| `T` | extends `boolean` = ``false`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceIdentifierOrName` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`unknown`\> | - |
| `options?` | `Object` | - |
| `options.multiple?` | `T` extends ``false`` ? ``false`` : `M` | Whether to inject multiple instances. |
| `options.useToken?` | `T` | use token identifier to get service, use name to get service by default. |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | [`PropertyDescriptor`](../interfaces/reactant_share.PropertyDescriptor.md)<`unknown`\> |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/dynamic.ts:14](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/dynamic.ts#L14)

___

### fork

▸ **fork**<`T`, `K`, `O`\>(`module`, `key`, `args`, `options?`): `O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

Proxy execute On the client side.

## Description

`fork()` is very similar to the actor model,
 which transfers the corresponding module method to all client threads for execution and returns the result from the first client's response.

Note: It does not create new threads, it always runs on all client thread that have already been created.

reference: https://en.wikipedia.org/wiki/Actor_model

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string` \| `number` \| `symbol`, `any`\> |
| `K` | extends `string` \| `number` \| `symbol` |
| `O` | extends `undefined` \| `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | `T` | Designate an execution module from the server side. |
| `key` | `K` | Specify the name of a method in this module. |
| `args` | `Parameters`<`T`[`K`]\> | Pass in the parameters for this method. |
| `options?` | { `clientIds?`: `string`[] ; `portName?`: `string` ; `respond?`: `O`  } & `Pick`<`EmitParameter`<`any`\>, ``"timeout"`` \| ``"_extra"`` \| ``"silent"`` \| ``"skipBeforeEmit"``\> | proxy execution options |

#### Returns

`O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

#### Defined in

[packages/reactant-share/src/interfaces.ts:209](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/interfaces.ts#L209)

___

### forwardRef

▸ **forwardRef**(`callback`): `LazyServiceIdentifer`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`any`\> |

#### Returns

`LazyServiceIdentifer`<`any`\>

#### Defined in

[packages/reactant-di/src/forwardRef.ts:4](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/forwardRef.ts#L4)

___

### getComposeEnhancers

▸ **getComposeEnhancers**(`enableReduxDevTools`, `reduxDevToolsOptions?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enableReduxDevTools` | `boolean` |
| `reduxDevToolsOptions?` | [`ReduxDevToolsOptions`](reactant_share.md#reduxdevtoolsoptions) |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/reduxDevToolsCompose.ts:5](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/reduxDevToolsCompose.ts#L5)

___

### getCoworker

▸ **getCoworker**(`instance`): `undefined` \| [`Coworker`](../classes/reactant_share.Coworker.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `object` |

#### Returns

`undefined` \| [`Coworker`](../classes/reactant_share.Coworker.md)

#### Defined in

[packages/reactant-share/src/modules/coworker.ts:507](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/modules/coworker.ts#L507)

___

### getLazyDecorator

▸ **getLazyDecorator**(`getService`): (`serviceIdentifier`: [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`unknown`\>, `enableCache`: `boolean`) => (`target`: `object`, `key`: `string` \| `symbol`) => `any`

## Description

You can get a decorator `@lazy(serviceIdentifier)` with `getLazyDecorator((serviceIdentifier) => container.get(serviceIdentifier))`,
and use it on any one dependency property that you need to lazily get.

## Example

```ts
let container: Container;
const lazy = getLazyDecorator((serviceIdentifier) =>
  container.get(serviceIdentifier)
);

@injectable()
class Foo {
  public get test() {
    return 'test';
  }
}

@injectable()
class Bar {
  @lazy('foo')
  foo?: Foo;
}

container = createContainer({
  ServiceIdentifiers: new Map(),
});

const bar = container.get(Bar);

container.bind('foo').to(Foo);
expect(bar.foo?.test).toBe('test');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | (`serviceIdentifier`: [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`unknown`\>, `target?`: `object`) => `unknown` |

#### Returns

`fn`

▸ (`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`) => `any`

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`unknown`\> | `undefined` |
| `enableCache` | `boolean` | `true` |

##### Returns

`fn`

▸ (`target`, `key`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |

##### Returns

`any`

#### Defined in

[packages/reactant-di/src/decorators/lazy.ts:42](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/lazy.ts#L42)

___

### getMetadata

▸ **getMetadata**(`metaKey`): `MetadataMap`

#### Parameters

| Name | Type |
| :------ | :------ |
| `metaKey` | ``"reactant:optional"`` \| ``"reactant:provide"`` \| ``"reactant:multiple"`` \| ``"reactant:lazy"`` \| ``"design:paramtypes"`` \| ``"inversify:paramtypes"`` \| ``"inversify:tagged"`` |

#### Returns

`MetadataMap`

#### Defined in

[packages/reactant-di/src/util.ts:12](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/util.ts#L12)

___

### getRef

▸ **getRef**(`instance`): [`Ref`](../interfaces/reactant_share.Ref.md)

Get the reference of the module instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `object` |

#### Returns

[`Ref`](../interfaces/reactant_share.Ref.md)

#### Defined in

[packages/reactant-module/src/core/getRef.ts:25](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/getRef.ts#L25)

___

### getRehydrated

▸ **getRehydrated**(`target`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |

#### Returns

`undefined` \| `boolean`

#### Defined in

[packages/reactant-storage/src/storage.tsx:31](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-storage/src/storage.tsx#L31)

___

### getStageName

▸ **getStageName**(`className`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

#### Returns

`string`

#### Defined in

[packages/reactant-module/src/utils/getStageName.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/getStageName.ts#L1)

___

### getStagedState

▸ **getStagedState**(): `undefined` \| `Record`<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`<`string`, `unknown`\>

#### Defined in

[packages/reactant-module/src/decorators/action.ts:17](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/action.ts#L17)

___

### handlePlugin

▸ **handlePlugin**(`service`, `pluginHooks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `any` |
| `pluginHooks` | [`PluginHooks`](reactant_share.md#pluginhooks) |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/interfaces.ts:145](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L145)

___

### inject

▸ **inject**(`serviceIdentifierOrFunc?`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

## Description

You can use `@inject()` to perform the required dependency injection module to decorate in the constructor of an injectable class.

If the default is a dependency injection of the class itself as a type, e.g. `@inject(Foo) foo: Foo`, then it is exactly the same as `foo: Foo`.

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

@injectable()
class Foo {
  getValue() {
    return 'foo';
  }
}

@injectable()
class FooBar {
  constructor(@inject() public bar: Bar, @inject('foo') public foo: Foo) {}
}

const fooBar = testBed({
  modules: [
   Bar,
   { provide: 'foo', useClass: Foo },
  ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifierOrFunc?` | `ServiceIdentifierOrFunc`<`any`\> |

#### Returns

`fn`

▸ (`target`, `key?`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key?` | `string` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/inject.ts:51](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/inject.ts#L51)

___

### injectable

▸ **injectable**(`options?`): (`target`: `any`) => `any`

## Description

You can use `@injectable()` to decorate an injectable module, which will also allow `emitDecoratorMetadata` to take effect in the decorated class, so the corresponding `@inject()` is optional.

But if you don't want to use `@injectable()`, then the dependency injection decorator for constructors such as `@inject()` is required, and it must be imported in the corresponding `modules` startup configuration. Therefore, in most cases, it is recommended to use `@injectable()`.

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

class Foo {
  constructor(@inject() public bar: Bar) {}
}

@injectable()
class FooBar {
  constructor(public bar: Bar, public foo: Foo) {}
}

const fooBar = testBed({
  modules: [
   Foo // `Foo` is required, but `Bar` will be injected automatically.
 ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
```

If you use JavaScript, then you can only use `@injectable()` to define the full dependency metadata.

```js
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

@injectable()
class Foo {
  getValue() {
    return 'foo';
  }
}

@injectable({
  name: 'fooBar',
  deps: [Bar,  { provide: 'foo' }],
})
class FooBar {
  constructor(bar, foo) {
    this.bar = bar;
    this.foo = foo;
  }
}

const fooBar = testBed({
  modules: [
   Bar,
   { provide: 'foo', useClass: Foo },
 ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ModuleDecoratorOptions`](../interfaces/reactant_share.ModuleDecoratorOptions.md) |

#### Returns

`fn`

▸ (`target`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `any` |

##### Returns

`any`

#### Defined in

[packages/reactant-module/src/decorators/injectable.ts:80](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/injectable.ts#L80)

___

### isEqual

▸ **isEqual**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `unknown` |
| `y` | `unknown` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/isEqual.ts#L1)

___

### isEqualExceptFunction

▸ **isEqualExceptFunction**(`x`, `y`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `unknown` |
| `y` | `unknown` |

#### Returns

`boolean`

#### Defined in

[packages/reactant-module/src/utils/isEqual.ts:9](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/isEqual.ts#L9)

___

### lazy

▸ **lazy**(`serviceIdentifier`, `enableCache?`): (`target`: `object`, `key`: `string` \| `symbol`, `descriptor?`: [`PropertyDescriptor`](../interfaces/reactant_share.PropertyDescriptor.md)<`any`\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`unknown`\> |
| `enableCache?` | `boolean` |

#### Returns

`fn`

▸ (`target`, `key`, `descriptor?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | [`PropertyDescriptor`](../interfaces/reactant_share.PropertyDescriptor.md)<`any`\> |

##### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/lazy.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/lazy.ts#L6)

___

### load

▸ **load**(`service`, `loadModules`): `Promise`<`Container`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) |
| `loadModules` | [`ReactantModuleOptions`](reactant_share.md#reactantmoduleoptions)<`any`\>[] |

#### Returns

`Promise`<`Container`\>

#### Defined in

[packages/reactant-module/src/interfaces.ts:203](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L203)

___

### mockPairTransports

▸ **mockPairTransports**(): `Transport`<`any`\>[]

mock pair transports

#### Returns

`Transport`<`any`\>[]

#### Defined in

[packages/reactant-share/src/mockPairTransports.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/mockPairTransports.ts#L6)

___

### multiInject

▸ **multiInject**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`any`\> |

#### Returns

`fn`

▸ (`target`, `key?`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key?` | `string` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/multiInject.ts:6](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/multiInject.ts#L6)

___

### multiOptional

▸ **multiOptional**(`serviceIdentifier`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`any`\> |

#### Returns

`fn`

▸ (`target`, `key?`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key?` | `string` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/multiOptional.ts:7](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/multiOptional.ts#L7)

___

### optional

▸ **optional**(`serviceIdentifier?`): (`target`: `object`, `key?`: `string`, `index?`: `number`) => `void`

## Description

You can use `@optional()` to decorate an optionally injected module.

If other modules have no relevant dependency injection or are also optionally injected, the module will not be injected by default unless the injected module is imported in the `modules` parameter.

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

@injectable()
class Foo {
  getValue() {
    return 'foo';
  }
}

@injectable()
class FooBar {
  constructor(@optional() public bar: Bar, @optional('foo') public foo: Foo) {}
}

const fooBar = testBed({
  modules: [
   { provide: 'foo', useClass: Foo },
  ],
  main: FooBar,
});

expect(fooBar.instance.foo.getValue()).toBe('foo');
expect(fooBar.fooBar.bar).toBeUndefined();
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier?` | [`ServiceIdentifier`](reactant_share.md#serviceidentifier)<`any`\> |

#### Returns

`fn`

▸ (`target`, `key?`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key?` | `string` |
| `index?` | `number` |

##### Returns

`void`

#### Defined in

[packages/reactant-di/src/decorators/optional.ts:47](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-di/src/decorators/optional.ts#L47)

___

### perform

▸ **perform**(`funs`, `parameter?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `funs` | `Function`[] |
| `parameter?` | `any` |

#### Returns

`any`

#### Defined in

[packages/reactant-module/src/utils/performer.ts:1](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/utils/performer.ts#L1)

___

### state

▸ **state**(`target`, `key`, `descriptor?`): `void`

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `key` | `string` \| `symbol` |
| `descriptor?` | [`PropertyDescriptor`](../interfaces/reactant_share.PropertyDescriptor.md)<`any`\> |

#### Returns

`void`

#### Defined in

[packages/reactant-module/src/decorators/state.ts:26](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/decorators/state.ts#L26)

___

### subscribe

▸ **subscribe**(`service`, `listener`): `Unsubscribe`

## Description

You can use `subscribe` to subscribe to state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    subscribe(this, () => {
      if (this.count === 3) {
        console.log(`new value: ${newValue}`);
      }
    });
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 0;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) | Module instance |
| `listener` | () => `void` | Redux's store subscription |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:150](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L150)

___

### testBed

▸ **testBed**<`T`, `S`, `R`\>(`config`): [`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>

## Description

You can use `testBed` to build your test code without `render`(`render` function is optional.).

## Example

```ts
@injectable()
class Bar {
  getValue() {
    return 'bar';
  }
}

@injectable()
class Foo {
  constructor(public bar: Bar) {}
}

const foo = testBed({
  modules: [{ provide: Bar, useValue: { getValue: () => 'test' } }],
  main: Foo,
});

expect(foo.instance.bar.getValue()).toBe('test');
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends [`Renderer`](reactant_share.md#renderer)<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`PartialKeys`](reactant_share.md#partialkeys)<[`Config`](../interfaces/reactant_share.Config.md)<`T`, `S`, `R`\>, ``"render"``\> |

#### Returns

[`App`](../interfaces/reactant_share.App.md)<`T`, `S`, `R`\>

#### Defined in

[packages/reactant/src/testBed.ts:33](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/testBed.ts#L33)

___

### untracked

▸ **untracked**<`T`\>(`callback`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `T` |

#### Returns

`T`

#### Defined in

[packages/reactant-module/src/core/signal.ts:39](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/core/signal.ts#L39)

___

### useConnector

▸ **useConnector**<`T`\>(`selector`, `shallowEqual?`): `T`

## Description

`useConnector` is a React Hooks, which you can use to inject any shared state and derived data that you want to render using.
And it supports both `useConnector(() => this.renderPropsValue)` and `useConnector(() => this.getMapStateToProps())` uses.

## Example

```tsx
@injectable()
class FooView extends ViewModule {
  @state
  key = 'str';

  @action
  setValue(value: any) {
    this.key = value;
  }

  component() {
    const { key } = useConnector(() => ({ key: this.key }));
    // or `const key = useConnector(() => this.key);`
    return <span>{key}</span>;
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

act(() => {
  createApp({
    modules: [],
    main: FooView,
    render,
  }).bootstrap(container);
});

expect(container.querySelector('span')?.textContent).toBe('str');
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | (`container`: `Container`) => `T` |
| `shallowEqual?` | [`ShallowEqual`](reactant_share.md#shallowequal) |

#### Returns

`T`

#### Defined in

[packages/reactant/src/hooks/useConnector.ts:48](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/hooks/useConnector.ts#L48)

___

### useLock

▸ **useLock**(`name`, `callback`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `callback` | `LockCallBack` |

#### Returns

`any`

#### Defined in

[packages/reactant-share/src/lock.ts:137](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-share/src/lock.ts#L137)

___

### watch

▸ **watch**<`P`, `T`\>(`service`, `selector`, `watcher`, `options?`): `Unsubscribe`

## Description

You can use `watch` to observe a specific state changes in any class module.

## Example

```ts
@injectable()
class Counter {
  constructor() {
    watch(this, () => this.count, (newValue) => {
      if (newValue === 3) {
        console.log(`new value: ${newValue}`);
      }
    });
  }

  @state
  count = 0;

  @action
  increase() {
    this.count += 0;
  }
}

const app = testBed({
  modules: [],
  main: Counter,
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `boolean` |
| `T` | extends `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `service` | [`ThisService`](reactant_share.md#thisservice) | Module instance |
| `selector` | `Selector`<`P` extends ``true`` ? readonly [`T`] \| [...T[]] : `T`\> | Watched values |
| `watcher` | `Watcher`<`T`\> | Watch callback with value changes |
| `options?` | `Object` | Watch options |
| `options.isEqual?` | (`x`: `unknown`, `y`: `unknown`) => `boolean` | Define `isEqual` function as shallow comparison |
| `options.multiple?` | `P` | Use multiple values watching |

#### Returns

`Unsubscribe`

#### Defined in

[packages/reactant-module/src/interfaces.ts:165](https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant-module/src/interfaces.ts#L165)
