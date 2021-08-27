---
id: "_constants_"
title: "constants"
sidebar_label: "constants"
---

## Index

### Variables

* [METADATA_KEY](_constants_.md#const-metadata_key)
* [nameKey](_constants_.md#const-namekey)

## Variables

### `Const` METADATA_KEY

• **METADATA_KEY**: *object* = {
  optional: 'reactant:optional',
  provide: 'reactant:provide',
  lazy: 'reactant:lazy',
  paramtypes: 'design:paramtypes',
  inversifyParamtypes: 'inversify:paramtypes',
  inversifyTagged: 'inversify:tagged',
} as const

*Defined in [packages/reactant-di/src/constants.ts:1](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-di/src/constants.ts#L1)*

#### Type declaration:

* **inversifyParamtypes**: *"inversify:paramtypes"* = "inversify:paramtypes"

* **inversifyTagged**: *"inversify:tagged"* = "inversify:tagged"

* **lazy**: *"reactant:lazy"* = "reactant:lazy"

* **optional**: *"reactant:optional"* = "reactant:optional"

* **paramtypes**: *"design:paramtypes"* = "design:paramtypes"

* **provide**: *"reactant:provide"* = "reactant:provide"

___

### `Const` nameKey

• **nameKey**: *unique symbol* = Symbol('name')

*Defined in [packages/reactant-di/src/constants.ts:10](https://github.com/unadlib/reactant/blob/02f8f232/packages/reactant-di/src/constants.ts#L10)*
