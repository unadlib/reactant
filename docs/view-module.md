---
id: view-module
title: View Module
---

We can be used to implement a module with a View by inheriting the `ViewModule` and defining the `component` method (a React function component).

It is possible to inject any method of the current `ViewModule` in its `component`, and also to inject the current shared module state or other dependent module state using [useConnector](api/reactant/modules/_hooks_useconnector_.md):


```tsx
interface Todo {
  text: string;
  completed: boolean;
}

@injectable()
class TodoView extends ViewModule {
  @state
  list: Todo[] = [];

  addTodo(text: string) {
    this.list.push({
      text,
      completed: false,
    });
  }

  @action
  toggleTodo(key: number, value: boolean) {
    this.list[key].completed = !value;
  }

  component() {
    const list = useConnector(() => this.list);
    return (
      <ul>
        {this.list.map(({ text, completed }, key) => (
          <li key={key} onClick={() => this.toggleTodo(key, completed)}>
            {text}
          </li>
        ))}
      </ul>
    );
  }
}
```

`useConnector` also supports returning a state object, which automatically makes shallow comparisons:

```ts
const { list, visibilityFilter } = useConnector(() => ({
  list: this.list,
  visibilityFilter: this.visibilityFilter,
}));
```

It should be noted that while the `ViewModule` supports inheritance, function components based on `component` method implementations must be called in the same way as components based on superclass `component` methods, not using the jsx:


```tsx
@injectable()
class BaseFooView extends ViewModule {
  component() {
    return <span>foo</span>;
  }
}

class FooView extends BaseFooView {
  component() {
    return (
      <>
        <span>foo</span>
        {
          super.component()
          // Don't make it: <super.component />
        }
      </>
    );
  }
}
```


