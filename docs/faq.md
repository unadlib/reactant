---
id: faq
title: FAQ
---

todo

## Tips

- `ViewModule` class `component` support inheritance, and it does not support call `super.component` for JSX Element but support call function.
- `@action` support inheritance and call `super`.
- Performance optimization
  - Selector from `createSelector`can be passed in immutable state.
  - `batch` can be used to optimize rendering performance.
  - `dispatch` and `createState` support Redux action and reducer.
- Decorators
  - Default injection, no require `@inject` unless binding identifier.
  - All decorators support any identifier.
  - `@multiInject` and `@multiOptional` require identifier parameter.
- The module of property `name` will be changed, if the module of `identifier` is `string` or module is injected in multiple.
