---
id: cli
title: Reactant CLI
---

We recommend you install `reactant-cli` globally to use it.

```sh
npm install -g reactant-cli
```

or you can install `reactant-cli` to your project.

```sh
yarn add -D reactant-cli
```

## Create a Reactant project

```sh
npx reactant-cli init my-app
```

* Use `-l <language>`or `--language <language>` for specifying a language, support `js`, `ts`, `javascript`, and `typescript`, the default is `typescript`.

## Generate files 

### Generate a service file

```sh
npx reactant-cli generate service FooBar
# or alias
npx reactant-cli g s FooBar
```

### Generate a view file

```sh
npx reactant-cli generate view FooBarView
# or alias
npx reactant-cli g v FooBarView
```

---

* Use `-l <language>`or `--language <language>` for specifying a language, support `js`, `ts`, `javascript`, and `typescript`, the default is `typescript`.
* Use `-w` or `--withTests` for creating tests files, the default is not creating tests files.
* Use `-s <src>` or `--src <src>` for specifying source files path in your project root path, the default is `src`.

> It supports creating multiple files in any directory in the project using this command
