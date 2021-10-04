---
id: "_appview_.appview"
title: "AppView"
sidebar_label: "AppView"
---

AppView for SSR entry point

## Hierarchy

* ViewModule

  ↳ **AppView**

## Implements

* Service

## Index

### Constructors

* [constructor](_appview_.appview.md#constructor)

### Properties

* [[identifierKey]](_appview_.appview.md#optional-readonly-[identifierkey])
* [[storeKey]](_appview_.appview.md#optional-readonly-[storekey])

### Methods

* [component](_appview_.appview.md#component)

## Constructors

###  constructor

\+ **new AppView**(): *[AppView](_appview_.appview.md)*

*Inherited from [AppView](_appview_.appview.md).[constructor](_appview_.appview.md#constructor)*

*Defined in [packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-module/src/core/view.ts#L10)*

**Returns:** *[AppView](_appview_.appview.md)*

## Properties

### `Optional` `Readonly` [identifierKey]

• **[identifierKey]**? : *undefined | string*

*Inherited from [AppView](_appview_.appview.md).[[identifierKey]](_appview_.appview.md#optional-readonly-[identifierkey])*

*Defined in [packages/reactant-module/src/core/view.ts:8](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-module/src/core/view.ts#L8)*

___

### `Optional` `Readonly` [storeKey]

• **[storeKey]**? : *Store*

*Inherited from [AppView](_appview_.appview.md).[[storeKey]](_appview_.appview.md#optional-readonly-[storekey])*

*Defined in [packages/reactant-module/src/core/view.ts:10](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-module/src/core/view.ts#L10)*

## Methods

###  component

▸ **component**(`__namedParameters`: object): *Element‹›*

*Overrides void*

*Defined in [packages/reactant-ssr/src/appView.tsx:9](https://github.com/unadlib/reactant/blob/03d0c8fd/packages/reactant-ssr/src/appView.tsx#L9)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`Component` | ComponentClass‹object, any› & object &#124; FunctionComponent‹object› & object |
`pageProps` | any |

**Returns:** *Element‹›*
