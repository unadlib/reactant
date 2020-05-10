---
id: "index"
title: "reactant-model"
sidebar_label: "README"
---

# reactant-model

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A model lib for Reactant

## Usage

```sh
npm install reactant-model
# or
yarn add reactant-model
```

## Example

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

You can visit [reactant.js.org](https://reactant.js.org/) for more documentation.
