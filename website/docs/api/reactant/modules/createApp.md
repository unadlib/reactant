---
id: "createApp"
title: "Module: createApp"
sidebar_label: "createApp"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### ContainerContext

• `Const` **ContainerContext**: `Context`<`Container` \| ``null``\>

#### Defined in

[createApp.tsx:24](https://github.com/unadlib/reactant/blob/65ec30fa/packages/reactant/src/createApp.tsx#L24)

## Functions

### createApp

▸ **createApp**<`T`, `S`, `R`\>(`__namedParameters`): `App`<`T`, `S`, `R`\>

## Description

You can create an app with `createApp()` passing app configuration,
which will return an object including `instance`, `store`,
and `bootstrap()` method(You can run `bootstrap` to start the app inject into the browser or mobile).

## Example

```typescript
import { createApp, injectable } from 'reactant';

@injectable()
class Foo {}

const app = createApp({
  modules: [],
  main: Foo,
  render: () => {},
});

expect(app.instance instanceof Foo).toBeTruthy();
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `S` | extends `any`[] |
| `R` | extends `Renderer`<`S`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Config`<`T`, `S`, `R`\> |

#### Returns

`App`<`T`, `S`, `R`\>

#### Defined in

[createApp.tsx:51](https://github.com/unadlib/reactant/blob/65ec30fa/packages/reactant/src/createApp.tsx#L51)
