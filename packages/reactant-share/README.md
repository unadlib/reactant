# reactant-share

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A framework for building shared web applications that support multiple windows.

## Support

- Shared Tab
- Browser Extension
- Shared Worker
- Service Worker
- Detached window
- iframe
- Any other data-transport based application port, such as WebRTC

## Usage

```sh
npm install reactant-share
# or
yarn add reactant-share
```

## Example

Here is the counter example, it uses `reactant-share` ShareWorker mode:

- `app.view.tsx`:

```tsx
import React from 'react';
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
  spawn,
} from 'reactant-share';

@injectable({ name: 'counter' })
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

- `index.tsx`:

```tsx
import { render } from 'reactant-web';
import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: 'SharedWorkerApp',
    port: 'client',
    type: 'SharedWorker',
    workerURL: 'worker.bundle.js',
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
});
```

- `worker.tsx`:

```tsx
import { createSharedApp } from 'reactant-share';
import { AppView } from './app.view';

createSharedApp({
  modules: [],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: 'SharedWorkerApp',
    port: 'server',
    type: 'SharedWorker',
  },
}).then((app) => {
  // renderless
});
```

## Examples

- [shared-worker](https://github.com/unadlib/reactant-examples/tree/master/reactant-share/shared-worker)
- [shared-tab](https://github.com/unadlib/reactant-examples/tree/master/reactant-share/shared-tab)
- [service-worker](https://github.com/unadlib/reactant-examples/tree/master/reactant-share/service-worker)
- [dynamic-module](https://github.com/unadlib/reactant-examples/tree/master/reactant-share/dynamic-module)

## Documentation

You can visit [reactant.js.org](https://reactant.js.org/docs/shared-app/) for more documentation.
