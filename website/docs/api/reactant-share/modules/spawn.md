---
id: "spawn"
title: "Module: spawn"
sidebar_label: "spawn"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### spawn

▸ **spawn**<`T`, `K`, `O`\>(`module`, `key`, `args`, `options?`): `O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

Proxy execute On the server side.

## Description

`spawn()` is very similar to the actor model,
 which transfers the corresponding module method to the server thread for execution and returns the result as response.

Note: It does not create new threads, it always runs on the server thread that has already been created.

## Example

```tsx
import React from 'react';
import { ViewModule, createApp, injectable, useConnector, action, state, spawn } from 'reactant-share';

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
      <button type="button" onClick={() => spawn(this.counter, 'increase', [])}>
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
| `options?` | { `clientIds?`: `string`[] ; `portName?`: `string` ; `respond?`: `O`  } & `Pick`<`EmitParameter`<`any`\>, ``"timeout"``\> | proxy execution options |

#### Returns

`O` extends ``false`` ? `void` : `ReturnType`<`T`[`K`]\> extends `Promise`<`R`\> ? `Promise`<`R`\> : `Promise`<`ReturnType`<`T`[`K`]\>\>

#### Defined in

[interfaces.ts:182](https://github.com/unadlib/reactant/blob/8deee953/packages/reactant-share/src/interfaces.ts#L182)
