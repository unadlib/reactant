---
sidebar_position: 1
---

# Shared App

## Motivation

When we develop a Single-Page Application, we usually only define its behavior in a single browser window, and even if the same application is opened on multiple browser windows, in most cases it is only synchronized with the local storage, and the state of each application in each window is not synchronized in real time (unless the server synchronizes), they run in isolation and are relatively independent.

However, this means that more browser windows will generate more and more independent application instances, which may have different UI states and often inevitably have the same network requests or WebSocket connections, which may also mean a bad user experience (as users may have become accustomed to) and excessive usage of server resources.

So what does it mean to have applications that supports multiple browser windows?

- Application instance sharing: code sharing, local storage sharing, state sharing, and more
- Lower server resource usage
- Better user consistency experience
- Smoother web applications

But it's not easy to keep large Web applications running smoothly.

Web applications are still primarily built in JavaScript, which is a single-threaded programming language, and slow JavaScript code can prevent the browser’s rendering. The good news is that mainstream browsers are gradually supporting more different types of workers, especially Service Workers, which are used to implement PWAs (Progressive Web Apps) that greatly enhance the user experience. And the latest modern browsers also provide Web Worker, Shared Worker. With IE becoming deprecated this year, there is [good support for these workers](https://caniuse.com/?search=worker). Currently, only [Safari lacks support for Shared Worker](https://bugs.webkit.org/show_bug.cgi?id=149850) among modern browsers.

So what does it mean for Web applications to be "multi-threaded" with Worker?

"[The State Of Web Workers In 2021](https://www.smashingmagazine.com/2021/06/web-workers-2021/)" post covers a number of unpredictable performance issues. With these browser workers we will likely be better able to deal with computationally complex and slow-running JS code to keep web applications smooth.

It's time to rethink why we can't make web applications support multiple browser windows and improve the performance of web applications. New architectural requirements bring new framework requirements, and such applications we call it **`Shared Web Apps`**.

## What's Shared Web App?

Even though we want users to open as few application windows as possible, the fact remains that many users will open the same application in multiple browser windows.

Shared Web Apps supports running web applications in multiple browser windows.

It has a unique Server thread to share the Shared Web Apps, whether it's code sharing, local storage sharing, state sharing, and so on. No matter how many browser windows are opened, Shared Web Apps always has only one server app instance for multiple client apps sharing. We all know that DOM operations are expensive. In Shared Web Apps, the client app instance is only responsible for rendering, and except for state sync the client app will become very lightweight and almost all business logic will run in the server app.

- The client app only renders UI, making better use of the device's multiple cores to ensure that the client app is smooth
- Solve the problems caused by multiple browser windows
- Better separation of concerns

## reactant-share - A framework for building Shared Web Apps

To build such Shared Web Apps, `reactant-share` was created. reactant-share is based on the `reactant` framework and `react` library, which supports the following features.

- Dependency injection
- Immutable state management
- View module
- Redux plug-in module
- Test bed for unit testing and integration testing
- Routing module
- Persistence module
- Module dynamics
- Shared web app support multiple browser windows
  - Shared tab
  - SharedWorker
  - Detached window
  - iframe

`reactant-share` is very easy to use, you can use it to quickly build a Shared Web Apps. it greatly reduces the complexity of supporting multi-browser window application architecture.

## Getting Started

You can use `reactant-cli` to quickly create a `reactant-share` project.

```bash
npx reactant-cli init shared-app-demo -t shared-worker
# support type: shared-tab & shared-worker
```

## How it works

When reactant-share starts, it creates a server app instance and multiple client app instances (one per browser window) in the browser, but the only instance that is really running in full is the server app instance, which is responsible for almost all of the application's logic, and multiple client app instances simply synchronize state and render. The state model of reactant-share uses immutable state, and reactant is based on Redux, so we trigger state sync from server app to client app via Redux's `dispatch`.

![workflow](./img/workflow.jpg)

1. The user triggers the client app proxy method through DOM events
2. This proxy method is executed on the server app.
3. The server app state is synchronized back to the client app.

### Example

The overall workflow of the reactant-share is shown in the figure below. Here is an example of a shared-worker type counter app.

- First, we define a counter app module and view module in `app.view.tsx`

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

- Next, we use `createSharedApp()` to create the client app, whose options must contain `workerURL`, the worker url that will create a shared worker (if it hasn't been created yet).

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
  // render only
  app.bootstrap(document.getElementById('app'));
});
```

- Finally, we just create the worker file `worker.tsx` and build it as `worker.bundle.js` for the `workerURL` option.

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
  // render less
});
```

The specific workflow of `increase` looks like this.

1. The user clicks the button in client app.
2. `spawn(this.counter, "increase", [])` will be executed, which passes the parameters about the proxy execution to the server app.
3. The server app will execute `this.counter.increase()`, and sync the updated state back to each client apps.

`spawn()` in reactant-share is inspired by the [actor model](https://en.wikipedia.org/wiki/Actor_model).

## Browser Compatibility in SharedWorker mode

| Browser | Chrome | Edge v79+ | Safari v16+ | Opera | IE  |
| :------ | :----: | :-------: | :---------: | :---: | :-: |
| Status  |   ✅   |    ✅     |     ✅      |  ✅   | 🚫  |

## FAQ

- Can reactant-share completely solve the complexity of the architecture?

Although reactant-share tries to reduce some complexity at the framework level, the complexity of large applications does not depend entirely on the framework itself, so even using reactant-share to architect a large project does not completely guarantee that it is absolutely clean, efficient, and maintainable. It involves testing strategy, code specification, CI/CD, development process, module design, and many other point.

But in terms of module model and shared model, reactant-share already provides as clean a design as possible. If you are interested in [reactant-share](https://github.com/unadlib/reactant/tree/master/packages/reactant-share), you can try it quickly.

- Does reactant-share have no cons at all? Are there any limitations to using it?

reactant-share is a framework for building Shared Web Apps. But such a model is not free, and it will face performance issues with data transfer (The high maintenance cost of the SharedArrayBuffer has forced us to abandon it for now as well. In fact this is a problem caused by the fact that JS "multithreading" does not share memory efficiently).

Although Shared Web Apps lets the client App run in a render-only client thread, it introduces the additional overhead of synchronous state transfer. We must ensure that it is lightweight and efficient enough. While reactant-share does state patch based on [Mutative](https://github.com/unadlib/mutative), it is always difficult to ensure that each patch is minimally updated.

reactant-share provides a development option `enablePatchesChecker`. In development mode, it is enabled by default. Any mutation operation that is not a valid mutation will be alerted, usually eliminating the alert, and reactant-share will try to keep the update size as minimal as possible.
