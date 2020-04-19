# reactant

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)
[![npm package](https://img.shields.io/npm/v/reactant.svg)](https://www.npmjs.com/package/reactant)

A framework for building React applications, inspired by [Angular](https://angular.io/).

## Motivation

React is a JavaScript library for building user interfaces, But when we want to create and develop complex applications based on React, we often have to do a lot of building configuration and many other libraries choices(Picking and learning a React state library and router library, etc.). Then we also need to consider how our business logic should be abstracted and structured. Like "There are a thousand Hamlets in a thousand people's eyes.", everyone who uses React practices their own perception of how React is built, and it doesn't allow us to quickly focus on the business logic itself. As the application business grows in size, we urgently need a framework that can be easily understood and maintained.

For complex applications of business logic, separation of concern is a good idea. It requires clear boundaries of liability to avoid low maintainability when UI logic and business logic are mixed. Whether we use DDD (Domain-driven design) or not, we always want to focus on business logic when building complex applications. It is one of the business core values of an application. We want it to be easy to maintain, and test.

Redux remains most popular state library in React. It is fully accord with immutable principles for React. But Redux is just a state container, and we're often at a loss for how to really manage those states.

---

**So, Reactant was created.**

Reactant provides dependency injection, modular models, immutable state management, view injection, pluggable models and testable models, and more. Not only is it able to quickly build a complex application (Web and Native Mobile), but it also brings some new React development experiences.

## Goal

- Immutable
- Easy
- High-performance
- Flexible

## Usage

```sh
npx reactant init my-app
cd my-app
npm start
```

## Example

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
  render,
});

app.bootstrap(document.getElementById('app'));
```

## Documentation

* [Getting Started](docs/getting-started.md)
* [Tutorial](docs/tutorial.md)
* [Concepts](docs/concepts.md)
* [Advanced Guides](docs/advanced-guides.md)
* [API Reference](docs/api.md)
