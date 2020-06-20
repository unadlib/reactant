---
id: "_interfaces_.module"
title: "Module"
sidebar_label: "Module"
---

## Type parameters

▪ **T**

## Hierarchy

* [Function](_interfaces_.module.md#function)

  ↳ **Module**

## Index

### Constructors

* [constructor](_interfaces_.module.md#constructor)

### Properties

* [Function](_interfaces_.module.md#function)
* [arguments](_interfaces_.module.md#arguments)
* [caller](_interfaces_.module.md#caller)
* [length](_interfaces_.module.md#readonly-length)
* [name](_interfaces_.module.md#readonly-name)
* [prototype](_interfaces_.module.md#prototype)

### Methods

* [[Symbol.hasInstance]](_interfaces_.module.md#[symbol.hasinstance])
* [apply](_interfaces_.module.md#apply)
* [bind](_interfaces_.module.md#bind)
* [call](_interfaces_.module.md#call)
* [toString](_interfaces_.module.md#tostring)

## Constructors

###  constructor

\+ **new Module**(...`args`: any[]): *T*

*Defined in [packages/reactant-di/src/interfaces.ts:26](https://github.com/unadlib/reactant/blob/a4942f1/packages/reactant-di/src/interfaces.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *T*

## Properties

###  Function

• **Function**: *FunctionConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:316

___

###  arguments

• **arguments**: *any*

*Inherited from [Module](_interfaces_.module.md).[arguments](_interfaces_.module.md#arguments)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:302

___

###  caller

• **caller**: *[Function](_interfaces_.module.md#function)*

*Inherited from [Module](_interfaces_.module.md).[caller](_interfaces_.module.md#caller)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:303

___

### `Readonly` length

• **length**: *number*

*Inherited from [Module](_interfaces_.module.md).[length](_interfaces_.module.md#readonly-length)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:299

___

### `Readonly` name

• **name**: *string*

*Inherited from [Module](_interfaces_.module.md).[name](_interfaces_.module.md#readonly-name)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

___

###  prototype

• **prototype**: *any*

*Inherited from [Module](_interfaces_.module.md).[prototype](_interfaces_.module.md#prototype)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:298

## Methods

###  [Symbol.hasInstance]

▸ **[Symbol.hasInstance]**(`value`: any): *boolean*

*Inherited from [Module](_interfaces_.module.md).[[Symbol.hasInstance]](_interfaces_.module.md#[symbol.hasinstance])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:157

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

###  apply

▸ **apply**(`this`: [Function](_interfaces_.module.md#function), `thisArg`: any, `argArray?`: any): *any*

*Inherited from [Module](_interfaces_.module.md).[apply](_interfaces_.module.md#apply)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:278

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | [Function](_interfaces_.module.md#function) | - |
`thisArg` | any | The object to be used as the this object. |
`argArray?` | any | A set of arguments to be passed to the function.  |

**Returns:** *any*

___

###  bind

▸ **bind**(`this`: [Function](_interfaces_.module.md#function), `thisArg`: any, ...`argArray`: any[]): *any*

*Inherited from [Module](_interfaces_.module.md).[bind](_interfaces_.module.md#bind)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:293

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | [Function](_interfaces_.module.md#function) | - |
`thisArg` | any | An object to which the this keyword can refer inside the new function. |
`...argArray` | any[] | A list of arguments to be passed to the new function.  |

**Returns:** *any*

___

###  call

▸ **call**(`this`: [Function](_interfaces_.module.md#function), `thisArg`: any, ...`argArray`: any[]): *any*

*Inherited from [Module](_interfaces_.module.md).[call](_interfaces_.module.md#call)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:285

Calls a method of an object, substituting another object for the current object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | [Function](_interfaces_.module.md#function) | - |
`thisArg` | any | The object to be used as the current object. |
`...argArray` | any[] | A list of arguments to be passed to the method.  |

**Returns:** *any*

___

###  toString

▸ **toString**(): *string*

*Inherited from [Module](_interfaces_.module.md).[toString](_interfaces_.module.md#tostring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:296

Returns a string representation of a function.

**Returns:** *string*
