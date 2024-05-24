---
title: How to make Web application support multiple browser windows
author: unadlib
tags: [reactant]
---

## Motivation

When we develop a Single-Page Application, we usually only define its behavior in a single browser window, and even if the same application is opened on multiple browser windows, in most cases it is only synchronized with the local storage, and the state of each application in each window is not synchronized in real time (unless the server synchronizes), they run in isolation and are relatively independent.

However, this means that more browser windows will generate more and more independent application instances, which may have different UI states and often inevitably have the same network requests or WebSocket connections, which may also mean a bad user experience (as users may have become accustomed to) and excessive usage of server resources.

So what does it mean to have applications that supports multiple browser windows?

- Application instance sharing: code sharing, local storage sharing, state sharing, and more
- Lower server resource usage
- Better user consistency experience
- Smoother web applications

But it's not easy to keep large Web applications running smoothly.

Web applications are still primarily built in JavaScript, which is a single-threaded programming language, and slow JavaScript code can prevent the browser’s rendering. The good news is that mainstream browsers are gradually supporting more different types of workers, especially Service Workers, which are used to implement PWAs (Progressive Web Apps) that greatly enhance the user experience. And the latest modern browsers also provide Web Worker, Shared Worker. With IE becoming deprecated this year, there is [good support for these workers](https://caniuse.com/?search=worker).

So what does it mean for Web applications to be "multi-threaded" with Worker?

"[The State Of Web Workers In 2021](https://www.smashingmagazine.com/2021/06/web-workers-2021/)" post covers a number of unpredictable performance issues. With these browser workers we will likely be better able to deal with computationally complex and slow-running JS code to keep web applications smooth.

It's time to rethink why we can't make web applications support multiple browser windows and improve the performance of web applications. New architectural requirements bring new framework requirements, and such applications we call it **`Shared Web Apps`**.

## Shared Web Apps

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

## How it works

When reactant-share starts, it creates a server app instance and multiple client app instances (one per browser window) in the browser, but the only instance that is really running in full is the server app instance, which is responsible for almost all of the application's logic, and multiple client app instances simply synchronize state and render. The state model of reactant-share uses immutable state, and reactant is based on Redux, so we trigger state sync from server app to client app via Redux's `dispatch`.

![workflow](./workflow.jpg)

1. The user triggers the client app proxy method through DOM events
2. This proxy method is executed on the server app.
3. The server app state is synchronized back to the client app.

### Example

The overall workflow of the reactant-share is shown in the figure below. Here is an example of a shared-worker type counter app.

- First, we define a counter app module and view module in `app.view.tsx`

```tsx
import React from "react";
import {
  ViewModule,
  createApp,
  injectable,
  useConnector,
  action,
  state,
  delegate,
} from "reactant-share";

@injectable({ name: "counter" })
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
      <button type="button" onClick={() => delegate(this.counter, "increase", [])}>
        {count}
      </button>
    );
  }
}
```

- Next, we use `createSharedApp()` to create the client app, whose options must contain `workerURL`, the worker url that will create a shared worker (if it hasn't been created yet).

```tsx
import { render } from "reactant-web";
import { createSharedApp } from "reactant-share";
import { AppView } from "./app.view";

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: "SharedWorkerApp",
    port: "client",
    type: "SharedWorker",
    workerURL: "worker.bundle.js",
  },
}).then((app) => {
  // render only
  app.bootstrap(document.getElementById("app"));
});
```

- Finally, we just create the worker file `worker.tsx` and build it as `worker.bundle.js` for the `workerURL` option.

```tsx
import { createSharedApp } from "reactant-share";
import { AppView } from "./app.view";

createSharedApp({
  modules: [],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: "SharedWorkerApp",
    port: "server",
    type: "SharedWorker",
  },
}).then((app) => {
  // render less
});
```

The specific workflow of `increase` looks like this.

1. The user clicks the button in client app.
2. `delegate(this.counter, "increase", [])` will be executed, which passes the parameters about the proxy execution to the server app.
3. The server app will execute `this.counter.increase()`, and sync the updated state back to each client apps.

`delegate()` in reactant-share is inspired by the [actor model](https://en.wikipedia.org/wiki/Actor_model).

## reactant-share Framework

### Multiple modes

- Shared tab - It is suitable for running in browsers that do not support SharedWorker. The server app is an instance with rendering that also runs in a browser window. In multiple browser windows, there is also only one server app, and after it is closed or refreshed, one instance of the other client apps will be converted to a server app.
- SharedWorker - If there is no [browser compatibility](https://caniuse.com/?search=sharedworker) requirement, reactant-share is highly recommended to use this mode, and reactant-share also does a graceful degradation, so if the browser does not support SharedWorker then the app will run in Shared-Tab mode.
- Detached window - reactant-share allows sub-applications to run as Detached windows or to be quickly merged into a more complete application.
- iframe - reactant-share allows each child application to run on an iframe.

Example repo: [SharedWorker/Detached window/iframe](https://github.com/unadlib/reactant/tree/master/examples/reactant-share-sharedworker)

### User Experience

Since reactant-share's multiple instances are logic-sharing and state-sharing, when a user opens the same reactant-share application in multiple browser windows, the only instance that is actually running in full is the server app.

The rendering-only client app will be so smooth that it will almost never freeze due to JS code, and the consistent application state will allow users to switch between multiple browser windows without any worries.

### Development Experience

reactant-share provides CLI and full support for Typescript, as well as support for Shared-Tab, SharedWorker, and other different types of runtime modes out of the box. Built-in testbed for module testing, Routing and Persistence modules, and module dynamics support for lazy loading of reactant-share applications.

### Service Discovery / Communications

Since reactant-share uses [data-transport](http://github.com/unadlib/data-transport), reactant-share supports almost all the transports supported by data-transport.The client app and the server app, whichever is loaded first, the client app will wait for the server app to finish starting and get all the initial application state from it.

Using the actor model in the client app to design delegate(), we can do `delegate(counterModule, 'increase', [])` to let the server app proxy the execution of the module method and respond and sync both the state and the result back to the client app.

But if we need direct communication between the client app and the server app, then we need to use the `PortDetector` module.

```ts
class Counter {
  constructor(public portDetector: PortDetector) {
    this.portDetector.onServer(async (transport) => {
      const result = await transport.emit("test", 42);
      // result should be `hello, 42`
    });
    this.portDetector.onClient((transport) => {
      transport.listen("test", (num) => `hello, ${num}`);
    });
  }
}
```

### Tracking/Debugging

Since reactant-share is based on Redux, it fully supports Redux DevTools, and the immutable time travel that Redux brings will make debugging easy.

### Fault Tolerance / Data Consistency

Since state synchronization after the client app uses `delegate()` to get the server app proxy to execute each time may cause it to be out of order in edge cases for various reasons, reactant-share integrates `reactant-last-action`, which provides sequence markers to keep If the client app receives a synchronized action that checks for an exception in the sequence, the client app will launch a full state synchronization to correct the action sequence.

In addition, when the browser does not support the Worker API, reactant-share will perform a graceful degradation (e.g. SharedWorker mode -> Shared-Tab mode -> SPA mode).

### Isolation

Regardless of modes such as Shared-Tab, SharedWorker, each application instance runs in isolation and their basic interactions can only be triggered by `delegate()` to synchronize state.

### Configuration

reactant-share provides CLI, you just need to run `npx reactant-cli init shared-worker-example -t shared-worker` to get a project of reactant-share with SharedWorker mode. If you want to change its mode, you just need to change the configuration of `createSharedApp()`.

```diff
createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: 'ReactantExampleApp',
    port: 'client',
-   port: 'client',
-   type: 'SharedWorker',
-   workerURL: 'worker.bundle.js',
+   type: 'SharedTab',
    workerURL: 'worker.bundle.js',
  },
}).then((app) => {
  app.bootstrap(document.getElementById('app'));
});
```

With that, we can quickly turn SharedWorker mode into SharedTab mode.

### Transport/Performance

Since the client app only renders and receives synchronized state. So the client app keeps running smoothly when the size of each dispatch update state does not exceed 50M. reactant uses [Mutative Patch](https://github.com/unadlib/mutative) to update, usually this patch will be very small and reactant also does DEV checking for patch minimization updates. In fact, in most scenarios, the patch will not be that large.

| Update state size         | Volume of data | Deserialization |
| ------------------------- | -------------- | --------------- |
| 30 Array \* 1,000 items   | 1.4 M          | 14 ms           |
| 30 Array \* 1,0000 items  | 14 M           | 130 ms          |
| 1000 Array \* 1,000 items | 46 M           | 380 ms          |

> Notebook: 1 GHz Intel Core M / 8 GB 1600 MHz DDR3

benchmarking of the reactant-share module with [derived data cache](/docs/api/reactant-module/modules/decorators_computed)

| Number of modules and states | Total number of states | Each state update |
| ---------------------------- | ---------------------- | ----------------- |
| 100 modules \* 20 states     | 2,000                  | 3 ms              |
| 200 modules \* 30 states     | 6,000                  | 9 ms              |
| 300 modules \* 100 states    | 30,000                 | 44 ms             |

> Notebook: 1 GHz Intel Core M / 8 GB 1600 MHz DDR3

Therefore, reactant-share still performs well in large projects.

### Complexity

Whether it's practicing [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), [DDD](https://en.wikipedia.org/wiki/Domain-driven_design), OOP or even FP, reactant-share has more openness to architect highly complex projects at will. reactant-share provides a few optional features, but the only one that shouldn't be missed is DI. reactant-share's DI is inspired by Angular, and it is very similar to Angular's DI. The complexity of coding that comes with architectural design is often determined by the final specification of the practice, but reactant-share hopes to help with such complex architectural design at the framework level.

### Security

For reactant-share applications, the communication between server/client only serializes and deserializes state and parameters, so it is almost impossible to cause framework-level security issues. Of course, enabling https and using[Subresource Integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity) are both necessary for any project that values front-end security, and we should also be concerned about [XSS security](https://reactjs.org/docs/dom-elements.html#style) in React documentation.

### Testing

reactant-share provides `testBed()` to facilitate module testing. For example,

```ts
const { instance } = testBed({
  main: Counter,
  modules: [],
});
```

For integration testing of server app/client app interactions, reactant-share also provides `mockPairTransports()` for mock transport.

```ts
const transports = mockPairTransports();

createSharedApp({
  modules: [],
  main: AppView,
  render,
  share: {
    name: "SharedWorkerApp",
    port: "client",
    type: "SharedWorker",
    transports: {
      client: transports[0],
    },
  },
}).then((app) => {
  const clientApp = app;
  // render only
  app.bootstrap(document.getElementById("app"));
});

createSharedApp({
  modules: [],
  main: AppView,
  render: () => {
    //
  },
  share: {
    name: "SharedWorkerApp",
    port: "server",
    type: "SharedWorker",
    transports: {
      client: transports[1],
    },
  },
}).then((app) => {
  const serverApp = app;
  // render less
});
```

After mocking transport like this, `clientApp` and `serverApp` can be easily tested for integration.

## APIs

- `@injectable()`

You can use `@injectable()` to decorate a module that can be injected and then use the `emitDecoratorMetadata` using TypeScript, or `@inject()` to inject the dependency.

- `@state`

`@state` is used to decorate a class property that will create a reducer for Redux.

- `@action`

It updates the redux state with mutations via the class method.

```ts
class Todo {
  @state
  list: { text: string }[] = [];

  @action
  addTodo(text: string) {
    this.list.push({ text });
  }
}
```

- `ViewModule`/`useConnector()`

`ViewModule` is a view module with a component, which is completely different from React class component. The component of `ViewModule` is a function component that is used for the state connection between the module and the UI (using `useConnector()`) and for the application view bootstrap.

- `delegate()`

`delegate()` transfers class methods execution from the client app to the server app and synchronizes the state to all client apps. It is inspired by the Actor model, but unlike other actor models, reactant-share's `delegate()` does not create new threads.

- `createSharedApp()`

reactant-share supports multiple modes, and you can use `createSharedApp()` to create multiple different Shared Web Apps that interact with each other via transport APIs.

## Q&A

- Can reactant-share completely solve the complexity of the architecture?

Although reactant-share tries to reduce some complexity at the framework level, the complexity of large applications does not depend entirely on the framework itself, so even using reactant-share to architect a large project does not completely guarantee that it is absolutely clean, efficient, and maintainable. It involves testing strategy, code specification, CI/CD, development process, module design, and many other point.

But in terms of module model and shared model, reactant-share already provides as clean a design as possible. If you are interested in [reactant-share](https://github.com/unadlib/reactant/tree/master/packages/reactant-share), you can try it quickly.

- Does reactant-share have no cons at all? Are there any limitations to using it?

reactant-share is a framework for building Shared Web Apps. But such a model is not free, and it will face performance issues with data transfer (The high maintenance cost of the SharedArrayBuffer has forced us to abandon it for now as well. In fact this is a problem caused by the fact that JS "multithreading" does not share memory efficiently).

Although Shared Web Apps lets the client App run in a render-only client thread, it introduces the additional overhead of synchronous state transfer. We must ensure that it is lightweight and efficient enough. While reactant-share does state patch based on [Mutative](https://github.com/unadlib/mutative), it is always difficult to ensure that each patch is minimally updated.

reactant-share provides a development option `enablePatchesChecker`. In development mode, it is enabled by default. Any mutation operation that is not a valid mutation will be alerted, usually eliminating the alert, and reactant-share will try to keep the update size as minimal as possible.

## Conclusion

Front-end frameworks and architectures are always evolving. With full Worker support in modern browsers and an increasing number of multi-core CPU devices, we have reached a mature stage in our exploration of some multi-threaded running Web Apps. We have reasons to believe that the future Web App will be designed with lower complexity and run smoothly with multiple threads. It can fully utilize the user's device resources and give the user a good experience, and the developer does not need to have too many multi-threaded programming burden.

This is what reactant-share wants to try and work on.

If you think reactant-share is interesting, feel free to give it a star.

Repo: [reactant](https://github.com/unadlib/reactant)
