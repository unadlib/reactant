---
sidebar_position: 1
---

# Reactant Hooks

Reactant provides `useConnector` for injecting the component props in the `ViewModule`.

## API

* [useConnector](#)

## Example

```tsx
@injectable()
class FooView extends ViewModule {
  @state
  key = 'str';

  @action
  setValue(value: any) {
    this.key = value;
  }

  component() {
    const { key } = useConnector(() => ({ key: this.key }));
    // or `const key = useConnector(() => this.key);`
    return <span>{key}</span>;
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

act(() => {
  createApp({
    modules: [],
    main: FooView,
    render,
  }).bootstrap(container);
});

expect(container.querySelector('span')?.textContent).toBe('str');
```

## React Hooks

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are in-built functions that allow React developers to use state and lifecycle methods inside functional components.
