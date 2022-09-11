---
id: "createApp"
title: "Module: createApp"
sidebar_label: "createApp"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### createSharedApp

▸ **createSharedApp**<`T`, `S`, `R`\>(`options`): `Promise`<`App`<`T`, `S`, `R`\>\>

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

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends `Renderer`<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Config`<`T`, `S`, `R`\> |

#### Returns

`Promise`<`App`<`T`, `S`, `R`\>\>

#### Defined in

[packages/reactant-share/src/createApp.ts:233](https://github.com/unadlib/reactant/blob/e1649c86/packages/reactant-share/src/createApp.ts#L233)
