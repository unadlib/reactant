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

▸ **createBaseApp**<**T**>(`__namedParameters`: object): *Promise‹App‹any››*

*Defined in [packages/reactant-share/src/createApp.ts:26](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/createApp.ts#L26)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | options |
`share` | [ISharedAppOptions](../interfaces/_interfaces_.isharedappoptions.md) |

**Returns:** *Promise‹App‹any››*

___

### `Const` createSharedApp

▸ **createSharedApp**<**T**>(`options`: [Config](../interfaces/_interfaces_.config.md)‹T›): *Promise‹App‹any››*

*Defined in [packages/reactant-share/src/createApp.ts:242](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/createApp.ts#L242)*

## Description

You can create an shared app with `createSharedApp()` passing app configuration,
which will asynchronously return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```ts
import { createSharedApp, injectable, state, action, proxify } from 'reactant-share';
import { mockPairPorts, createTransport } from 'data-transport';

@injectable()
class Counter {
  name = 'counter';

  @state
  count = 0;

  @action
  _increase() {
    this.count += 1;
  }

  @proxify
  async increase() {
    this._increase();
  }
}

(async () => {
  const ports = mockPairPorts();

  const server = await createSharedApp({
    modules: [],
    main: Counter,
    render: () => {},
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: createTransport('Base', ports[0]),
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
        client: createTransport('Base', ports[1]),
      },
    },
  });

  await client.instance.increase();

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

**Returns:** *Promise‹App‹any››*

___

### `Const` createSharedTabApp

▸ **createSharedTabApp**<**T**>(`options`: [Config](../interfaces/_interfaces_.config.md)‹T›): *Promise‹App‹any››*

*Defined in [packages/reactant-share/src/createApp.ts:115](https://github.com/unadlib/reactant/blob/5e7c46f4/packages/reactant-share/src/createApp.ts#L115)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`options` | [Config](../interfaces/_interfaces_.config.md)‹T› |

**Returns:** *Promise‹App‹any››*
