# reactant-cli

![Node CI](https://github.com/unadlib/reactant/workflows/Node%20CI/badge.svg)

A command line interface for Reactant

## Usage

* Create a Reactant project:

```bash
npx reactant-cli init my-app
```

* Generate a service file:

```bash
npx reactant-cli generate service Foo
# or
npx reactant-cli g s FooBarView
```

* Generate a view file:

```bash
npx reactant-cli generate view FooBarView
# or
npx reactant-cli g v FooBarView
```

## Global installation

We recommend you install `reactant-cli` globally to use it.

```bash
npm install -g reactant-cli
```

or you can install `reactant-cli` to your project.

```bash
yarn add -D reactant-cli
```

You can visit [reactant.js.org](https://reactant.js.org/) for more documentation.
