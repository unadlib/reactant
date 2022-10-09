---
id: "hooks_useConnector"
title: "Module: hooks/useConnector"
sidebar_label: "hooks/useConnector"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### useConnector

▸ **useConnector**<`T`\>(`selector`, `shallowEqual?`): `T`

## Description

`useConnector` is a React Hooks, which you can use to inject any shared state and derived data that you want to render using.
And it supports both `useConnector(() => this.renderPropsValue)` and `useConnector(() => this.getMapStateToProps())` uses.

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

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `selector` | (`container`: `Container`) => `T` |
| `shallowEqual?` | `ShallowEqual` |

#### Returns

`T`

#### Defined in

[hooks/useConnector.ts:48](https://github.com/unadlib/reactant/blob/58d171db/packages/reactant/src/hooks/useConnector.ts#L48)
