---
id: "index"
title: "reactant-redux"
sidebar_label: "README"
---

# reactant-redux

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A redux lib for Reactant

## Usage

```sh
npm install reactant-redux
# or
yarn add reactant-redux
```

## Example

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

You can visit [reactant.js.org](https://reactant.js.org/) for more documentation.
