---
id: "_decorators_defaultprops_"
title: "@defaultProps()"
sidebar_label: "@defaultProps()"
---

▸ **defaultProps**<**P**>(`props`: P | [PickOptional](_interfaces_.md#pickoptional)‹P›): *(Anonymous function)*

*Defined in [packages/reactant-module/src/decorators/defaultProps.ts:40](https://github.com/unadlib/reactant/blob/950d72fe/packages/reactant-module/src/decorators/defaultProps.ts#L40)*

## Description

`@defaultProps()` is used to decorate a ViewModule's function component for its default props.

## Example

```tsx
@injectable()
class CounterView extends ViewModule {
  @defaultProps({
    version: '0.0.1'
  })
  component({ version }: { version?: string }) {
    return <span>{version}</span>;
  }
}

@injectable()
class AppView extends ViewModule {
  constructor(public counterView: CounterView) {}

  component() {
    return (<>
      <this.counterView.component />
      <this.counterView.component version="0.1.0" />
    </>);
  }
}

const app = createApp({
  modules: [],
  main: AppView,
  render: () => {},
});
```

**Type parameters:**

▪ **P**

**Parameters:**

Name | Type |
------ | ------ |
`props` | P &#124; [PickOptional](_interfaces_.md#pickoptional)‹P› |

**Returns:** *(Anonymous function)*
