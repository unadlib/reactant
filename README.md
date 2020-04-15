# reactant

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A framework for building React applications, inspired by [Angular](https://angular.io/).

## Motivation

todo

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

