<a href="https://reactant.js.org/" target="_blank"><img src="https://raw.githubusercontent.com/unadlib/reactant/master/logo.svg" height="120" alt="Reactant Logo" /></a>

---

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/reactant.svg)](http://badge.fury.io/js/reactant)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/unadlib/reactant.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/unadlib/reactant/context:javascript)
![license](https://img.shields.io/npm/l/reactant)

Reactant - A framework for building React applications

## Motivation

React is a JavaScript library for building user interfaces, but when we want to develop applications based on React, we often have to do a lot of building configuration and many other libraries choices(Picking and learning a React state library and router library, etc.). We also need to consider how our business logic should be abstracted and structured. Everyone who uses React practices their own perception of how React is built, but it doesn't allow us to quickly focus on the business logic itself. As the application business grows in size, we urgently need a framework that can be easily understood and maintained.

And for the structured design of the application's business logic, separation of concern is a good idea. It requires clear boundaries of liability to avoid low maintainability when UI logic and business logic are mixed. We always want to focus on business logic when building applications. It is one of the business core values of an application. We want it to be easy to maintain, and test. Redux remains most popular state library in React. It is fully accord with immutable principles for React. Redux is just a state container, and we're often at a loss for how to really manage those states. We need a framework for scalable, loosely coupled and easily maintainable React applications. 

---

**In order to solve these problems, Reactant was created. It's a framework for React.**

## Features

- Dependency injection
- Immutable state management
- View module
- Redux plug-in module
- Test bed for unit testing and integration testing
- Routing module
- Persistence module
- Module dynamics
- [reactant-share - Shared web app support multiple browser windows](https://github.com/unadlib/reactant/tree/master/packages/reactant-share)
  - Shared tab
  - SharedWorker
  - Detached window
  - iframe
- Server-side Rendering

## Q&A

1. How does it differ from Angular?

It is different everywhere except for dependency injection.

2. What is the biggest advantage of Reactant?

It can architect a variety of large React projects. Reactant advocates a lightweight UI, separating the concerns of the application and UI to greatly enhance the maintainability of the project.

## Usage

```bash
npx reactant-cli init my-app
cd my-app
yarn start
```

## Example

* [TodoMVC](https://stackblitz.com/edit/reactant-todomvc)

---

Reactant is very easy to get Started.
You can try Reactant by visiting the [online project](https://stackblitz.com/edit/reactant-ts).

Here is the counter example:

```tsx
import React from 'react';
import { ViewModule, createApp, injectable, useConnector, action, state } from 'reactant';
import { render } from 'reactant-web';

@injectable()
class Counter {
  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <button type="button" onClick={() => this.counter.increase()}>
        {count}
      </button>
    );
  }
}

const app = createApp({
  main: AppView,
  modules: [],
  render,
});

app.bootstrap(document.getElementById('app'));
```

## Documentation

* [Getting Started](https://reactant.js.org/docs/introduction)
* [Tutorial](https://reactant.js.org/docs/state-action)
* [Concepts](https://reactant.js.org/docs/concepts)
* [Advanced Guides](https://reactant.js.org/docs/hooks)
* [API Reference](https://reactant.js.org/docs/api/reactant/modules/_createapp_)
* [Contributing Guide](https://reactant.js.org/help)

You can visit [reactant.js.org](https://reactant.js.org/) for more documentation.
