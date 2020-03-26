# reactant-di

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

## Usage

```sh
npm install reactant-model
```

or

```sh
yarn add reactant-model
```

## Base Example

```js
import { model } from 'reactant-model';

const counter = model({
  state: {
    count: 0,
  },
  actions: {
    increase: (num) => (state) => {
      state.count += num;
    },
  }
});
```

## Documentation

* Getting Started
* Tutorial
* Concepts
* Advanced Guides
* [API Reference](docs/api/README.md)
