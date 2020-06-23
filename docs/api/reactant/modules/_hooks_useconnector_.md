---
id: "_hooks_useconnector_"
title: "useConnector()"
sidebar_label: "useConnector()"
---

## Index

### Functions

* [useConnector](_hooks_useconnector_.md#useconnector)

## Functions

###  useConnector

▸ **useConnector**<**T**>(`selector`: function, `shallowEqual?`: [ShallowEqual](_interfaces_.md#shallowequal)): *T*

*Defined in [hooks/useConnector.ts:45](https://github.com/unadlib/reactant/blob/9b7ec31/packages/reactant/src/hooks/useConnector.ts#L45)*

**Description:**

`useConnector` is a React Hooks, which you can use to inject any shared state and derived data that you want to render using.
And it supports both `useConnector(() => this.renderPropsValue)` and `useConnector(() => this.getMapStateToProps())` uses.

**Example:**

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

**Type parameters:**

▪ **T**

**Parameters:**

▪ **selector**: *function*

▸ (): *T*

▪`Optional`  **shallowEqual**: *[ShallowEqual](_interfaces_.md#shallowequal)*

**Returns:** *T*
