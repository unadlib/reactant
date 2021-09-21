---
id: "_spawn_"
title: "spawn()"
sidebar_label: "spawn()"
---

## Index

### Functions

* [spawn](_spawn_.md#const-spawn)

## Functions

### `Const` spawn

▸ **spawn**(`module`: T, `key`: K, `args`: undefined): *any*

*Defined in [packages/reactant-share/src/spawn.ts:49](https://github.com/unadlib/reactant/blob/a019d587/packages/reactant-share/src/spawn.ts#L49)*

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

**Parameters:**

Name | Type |
------ | ------ |
`module` | T |
`key` | K |
`args` |  |

**Returns:** *any*
