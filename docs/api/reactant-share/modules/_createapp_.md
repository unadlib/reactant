---
id: "_createapp_"
title: "createSharedApp()"
sidebar_label: "createSharedApp()"
---

## Index

### Functions

* [createBaseApp](_createapp_.md#const-createbaseapp)
* [createSharedApp](_createapp_.md#const-createsharedapp)
* [createSharedTabApp](_createapp_.md#const-createsharedtabapp)

## Functions

### `Const` createBaseApp

▸ **createBaseApp**<**T**>(`__namedParameters`: object): *Promise‹App‹T››*

*Defined in [packages/reactant-share/src/createApp.ts:28](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/createApp.ts#L28)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | options |
`share` | [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md) |

**Returns:** *Promise‹App‹T››*

___

### `Const` createSharedApp

▸ **createSharedApp**<**T**>(`options`: [Config](../interfaces/_interfaces_.config.md)‹T›): *Promise‹App‹T››*

*Defined in [packages/reactant-share/src/createApp.ts:238](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/createApp.ts#L238)*

## Description

You can create an shared app with `createSharedApp()` passing app configuration,
which will asynchronously return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
import { createSharedApp, injectable, state, action, spawn, mockPairTransports } from 'reactant-share';

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

(async () => {
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

  await spawn(client.instance, 'increase', []);

  expect(client.instance.count).toBe(1);
  expect(server.instance.count).toBe(1);

  global.done();
})();
```

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`options` | [Config](../interfaces/_interfaces_.config.md)‹T› |

**Returns:** *Promise‹App‹T››*

___

### `Const` createSharedTabApp

▸ **createSharedTabApp**<**T**>(`options`: [Config](../interfaces/_interfaces_.config.md)‹T›): *Promise‹App‹T››*

*Defined in [packages/reactant-share/src/createApp.ts:120](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-share/src/createApp.ts#L120)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`options` | [Config](../interfaces/_interfaces_.config.md)‹T› |

**Returns:** *Promise‹App‹T››*
