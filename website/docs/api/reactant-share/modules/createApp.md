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
| `R` | extends `Renderer`<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Config`<`T`, `S`, `R`\> |

#### Returns

`Promise`<`App`<`T`, `S`, `R`\>\>

#### Defined in

[createApp.ts:262](https://github.com/unadlib/reactant/blob/c6e11a24/packages/reactant-share/src/createApp.ts#L262)
