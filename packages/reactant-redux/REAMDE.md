# reactant-redux

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

## Usage

```sh
npm install reactant-redux
```

or

```sh
yarn add reactant-redux
```

## Base Example

```js
import { redux } from 'reactant-redux';

const counter = redux({
  reducers: {
    count: (state = 0, { type, payload }) =>
      type === 'increase' ? state + payload : state,
  },
  actions: {
    increase: num => dispatch =>
      dispatch({
        type: 'increase',
        payload: num,
      }),
  },
});
```

## Documentation

* Getting Started
* Tutorial
* Concepts
* Advanced Guides
* [API Reference](docs/api/README.md)
