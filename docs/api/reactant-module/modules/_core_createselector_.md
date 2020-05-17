---
id: "_core_createselector_"
title: "createSelector()"
sidebar_label: "createSelector()"
---

## Index

### Functions

* [createSelector](_core_createselector_.md#createselector)

## Functions

###  createSelector

▸ **createSelector**<**S**, **R1**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:6](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L6)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **combiner**: *function*

▸ (`res`: R1): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res` | R1 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:11](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L11)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:17](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L17)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:24](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L24)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:32](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L32)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:41](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L41)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:51](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L51)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **R8**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `selector8`: [Selector](_interfaces_.md#selector)‹S, R8›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:70](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L70)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **R8**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **selector8**: *[Selector](_interfaces_.md#selector)‹S, R8›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7, `res8`: R8): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |
`res8` | R8 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **R8**, **R9**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `selector8`: [Selector](_interfaces_.md#selector)‹S, R8›, `selector9`: [Selector](_interfaces_.md#selector)‹S, R9›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:91](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L91)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **R8**

▪ **R9**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **selector8**: *[Selector](_interfaces_.md#selector)‹S, R8›*

▪ **selector9**: *[Selector](_interfaces_.md#selector)‹S, R9›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7, `res8`: R8, `res9`: R9): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |
`res8` | R8 |
`res9` | R9 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **R8**, **R9**, **R10**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `selector8`: [Selector](_interfaces_.md#selector)‹S, R8›, `selector9`: [Selector](_interfaces_.md#selector)‹S, R9›, `selector10`: [Selector](_interfaces_.md#selector)‹S, R10›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:114](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L114)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **R8**

▪ **R9**

▪ **R10**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **selector8**: *[Selector](_interfaces_.md#selector)‹S, R8›*

▪ **selector9**: *[Selector](_interfaces_.md#selector)‹S, R9›*

▪ **selector10**: *[Selector](_interfaces_.md#selector)‹S, R10›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7, `res8`: R8, `res9`: R9, `res10`: R10): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |
`res8` | R8 |
`res9` | R9 |
`res10` | R10 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **R8**, **R9**, **R10**, **R11**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `selector8`: [Selector](_interfaces_.md#selector)‹S, R8›, `selector9`: [Selector](_interfaces_.md#selector)‹S, R9›, `selector10`: [Selector](_interfaces_.md#selector)‹S, R10›, `selector11`: [Selector](_interfaces_.md#selector)‹S, R11›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:139](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L139)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **R8**

▪ **R9**

▪ **R10**

▪ **R11**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **selector8**: *[Selector](_interfaces_.md#selector)‹S, R8›*

▪ **selector9**: *[Selector](_interfaces_.md#selector)‹S, R9›*

▪ **selector10**: *[Selector](_interfaces_.md#selector)‹S, R10›*

▪ **selector11**: *[Selector](_interfaces_.md#selector)‹S, R11›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7, `res8`: R8, `res9`: R9, `res10`: R10, `res11`: R11): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |
`res8` | R8 |
`res9` | R9 |
`res10` | R10 |
`res11` | R11 |

**Returns:** *function*

▸ (`checkedState?`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | any |

▸ **createSelector**<**S**, **R1**, **R2**, **R3**, **R4**, **R5**, **R6**, **R7**, **R8**, **R9**, **R10**, **R11**, **R12**, **T**>(`selector1`: [Selector](_interfaces_.md#selector)‹S, R1›, `selector2`: [Selector](_interfaces_.md#selector)‹S, R2›, `selector3`: [Selector](_interfaces_.md#selector)‹S, R3›, `selector4`: [Selector](_interfaces_.md#selector)‹S, R4›, `selector5`: [Selector](_interfaces_.md#selector)‹S, R5›, `selector6`: [Selector](_interfaces_.md#selector)‹S, R6›, `selector7`: [Selector](_interfaces_.md#selector)‹S, R7›, `selector8`: [Selector](_interfaces_.md#selector)‹S, R8›, `selector9`: [Selector](_interfaces_.md#selector)‹S, R9›, `selector10`: [Selector](_interfaces_.md#selector)‹S, R10›, `selector11`: [Selector](_interfaces_.md#selector)‹S, R11›, `selector12`: [Selector](_interfaces_.md#selector)‹S, R12›, `combiner`: function): *function*

*Defined in [packages/reactant-module/src/core/createSelector.ts:180](https://github.com/unadlib/reactant/blob/f5b92e0/packages/reactant-module/src/core/createSelector.ts#L180)*

**Type parameters:**

▪ **S**

▪ **R1**

▪ **R2**

▪ **R3**

▪ **R4**

▪ **R5**

▪ **R6**

▪ **R7**

▪ **R8**

▪ **R9**

▪ **R10**

▪ **R11**

▪ **R12**

▪ **T**

**Parameters:**

▪ **selector1**: *[Selector](_interfaces_.md#selector)‹S, R1›*

▪ **selector2**: *[Selector](_interfaces_.md#selector)‹S, R2›*

▪ **selector3**: *[Selector](_interfaces_.md#selector)‹S, R3›*

▪ **selector4**: *[Selector](_interfaces_.md#selector)‹S, R4›*

▪ **selector5**: *[Selector](_interfaces_.md#selector)‹S, R5›*

▪ **selector6**: *[Selector](_interfaces_.md#selector)‹S, R6›*

▪ **selector7**: *[Selector](_interfaces_.md#selector)‹S, R7›*

▪ **selector8**: *[Selector](_interfaces_.md#selector)‹S, R8›*

▪ **selector9**: *[Selector](_interfaces_.md#selector)‹S, R9›*

▪ **selector10**: *[Selector](_interfaces_.md#selector)‹S, R10›*

▪ **selector11**: *[Selector](_interfaces_.md#selector)‹S, R11›*

▪ **selector12**: *[Selector](_interfaces_.md#selector)‹S, R12›*

▪ **combiner**: *function*

▸ (`res1`: R1, `res2`: R2, `res3`: R3, `res4`: R4, `res5`: R5, `res6`: R6, `res7`: R7, `res8`: R8, `res9`: R9, `res10`: R10, `res11`: R11, `res12`: R12): *T*

**Parameters:**

Name | Type |
------ | ------ |
`res1` | R1 |
`res2` | R2 |
`res3` | R3 |
`res4` | R4 |
`res5` | R5 |
`res6` | R6 |
`res7` | R7 |
`res8` | R8 |
`res9` | R9 |
`res10` | R10 |
`res11` | R11 |
`res12` | R12 |

**Returns:** *function*

▸ (`checkedState?`: unknown): *T*

**Parameters:**

Name | Type |
------ | ------ |
`checkedState?` | unknown |
