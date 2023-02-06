---
sidebar_position: 1
---

# @state and @action

Reactant provides `@state` for decorating the immutable shared state of React and `@action` for decorating the state mutation updates, It's based on [Redux](https://github.com/reduxjs/redux) and [Mutative](https://github.com/unadlib/mutative).

## `@state`

In the following example, `list` in the Foo module is NOT a shared state of the React, and it cannot be automatically updated to the React component anywhere it is changed, but the `count` property decorated by `@state` is a shared state of the React.

```ts
@injectable()
class Foo {
  list = [];

  @state
  count: number = 0;
}
```

## `@action`

`@action` decorates the method for updating the current module's state, and the following example `increase` is a method that can be used to update the current module's state.

Reactant module state management is based on Redux, which is identical to the mutation update operation we generally use because it uses [Mutative](https://github.com/unadlib/mutative).

```ts
@injectable()
class Foo {
  list = [];

  @state
  count: number = 0;

  @action
  increase() {
    this.count += 1;
  }
}
```

> If a method is NOT decorated with `@action` but attempts to change the state value, it will NOT be automatically updated to the UI by default, but if `devOptions` is set to `{ autoFreeze: true }` in the [createApp](../api/reactant/modules/createApp.md) interface, then any method that is NOT decorated with `@action` that attempts to update the state will throw an error.

> Therefore, it is recommended to enable `autoFreeze` in development mode and disable `autoFreeze` in production mode (If it is NOT disabled, then it will likely bring some performance loss).

## Tips

* Both `@state` and `@action` support inheritance

```ts
@injectable()
class Foo {
  @state
  count: number = 0;

  @action
  increase() {
    this.count += 1;
  }
}

@injectable()
class Foo1 extends Foo {
  @state
  count: number = 0;

  @action
  increase() {
    super.increase();
    this.count += 1;
  }
}
```

* `@action` supports calling other actions that execute other update states and merge updates into the UI (They must be the current module state, cross-module states will still be updated one by one).

```ts
@injectable()
class Foo {
  @state
  list: number[] = [];

  @state
  count: number = 0;

  test: string = 'test';

  // `increase()` will combine update `list` and `count` state.
  @action
  increase() {
    this.count += 1;
    this.list(this.count);
  }

  @action
  add(text: number) {
    this.list.push(text);
  }
}
```
