---
id: persistence
title: Persistence
---

Reactant provides a plugin for persistence: `reactant-storage`.

## API

* [Storage](api/reactant-storage/classes/_storage_.reactantstorage.md)
* [IStorageOptions](api/reactant-storage/interfaces/_storage_.istorageoptions.md)

## Installation

```sh
yarn add reactant-storage
```

## Example

1. Set config in `index.tsx`:

```tsx
import React from 'react';
import { render } from 'reactant-web';
import { createApp } from 'reactant';
import {
  StorageOptions,
  localStorage,
  IStorageOptions,
} from 'reactant-storage';
import { HomeView } from './views';

const app = createApp({
  modules: [
    {
      provide: StorageOptions,
      useValue: {
        whitelist: [],
        storage: localStorage,
        loading: <div>loading</div>,
      } as IStorageOptions,
    },
  ],
  main: HomeView,
  render,
});

app.bootstrap(document.getElementById('app'));
```

2. Module `shoppingCart.ts`:

```ts
import { injectable, action, state } from 'reactant';
import { Storage } from 'reactant-storage';

@injectable({
  name: 'shoppingCart',
})
class ShoppingCart {
  constructor(public storage: Storage) {
    this.storage.setStorage(this, {
      whitelist: ['list'],
    });
  }

  @state
  list = [];
}

export { ShoppingCart };
```

See [full example](https://github.com/unadlib/reactant/tree/master/examples/ts-bookstore).
