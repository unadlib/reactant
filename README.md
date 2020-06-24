<a href="https://reactant.js.org/" target="_blank"><img src="https://raw.githubusercontent.com/unadlib/reactant/master/logo.svg" height="120" alt="Reactant Logo" /></a>

---

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/reactant.svg)](http://badge.fury.io/js/reactant)
![license](https://img.shields.io/npm/l/reactant)

Reactant - A framework for building React applications, inspired by [Angular](https://angular.io/).

## Motivation

React is a JavaScript library for building user interfaces, but when we want to create and develop applications based on React, we often have to do a lot of building configuration and many other libraries choices(Picking and learning a React state library and router library, etc.). We also need to consider how our business logic should be abstracted and structured. Like "There are a thousand Hamlets in a thousand people's eyes.", everyone who uses React practices their own perception of how React is built, but it doesn't allow us to quickly focus on the business logic itself. As the application business grows in size, we urgently need a framework that can be easily understood and maintained.

And for applications of business logic, separation of concern is a good idea. It requires clear boundaries of liability to avoid low maintainability when UI logic and business logic are mixed. We always want to focus on business logic when building applications. It is one of the business core values of an application. We want it to be easy to maintain, and test. Redux remains most popular state library in React. It is fully accord with immutable principles for React. Redux is just a state container, and we're often at a loss for how to really manage those states. We need a framework for scalable, loosely coupled and easily maintainable React applications. 

---

**In order to solve these problems, Reactant was created. It's an architecture for React.**

Reactant provides `dependency injection`, `modular models`, `immutable state management`, and more. It's `pluggable` and `testable`. Not only is it able to quickly build a React application (Web and Native Mobile), it also brings some new React development experiences.

## Usage

```sh
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
* [Advanced Guides](https://reactant.js.org/docs/di)
* [API Reference](https://reactant.js.org/docs/api/reactant/modules/_createapp_)
* [Contributing Guide](https://reactant.js.org/help)

You can visit [reactant.js.org](https://reactant.js.org/) for more documentation.
