import {
  createSelector as createSelectorWithReselect,
  Selector,
} from 'reselect';

export function createSelector<S, R1, T>(
  selector1: Selector<S, R1>,
  combiner: (res: R1) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  combiner: (res1: R1, res2: R2) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, R6, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7
  ) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7,
    res8: R8
  ) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7,
    res8: R8,
    res9: R9
  ) => T
): (checkedState?: any) => T;

export function createSelector<S, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, T>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7,
    res8: R8,
    res9: R9,
    res10: R10
  ) => T
): (checkedState?: any) => T;

export function createSelector<
  S,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  T
>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7,
    res8: R8,
    res9: R9,
    res10: R10,
    res11: R11
  ) => T
): (checkedState?: any) => T;

export function createSelector<
  S,
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
  T
>(
  selector1: Selector<S, R1>,
  selector2: Selector<S, R2>,
  selector3: Selector<S, R3>,
  selector4: Selector<S, R4>,
  selector5: Selector<S, R5>,
  selector6: Selector<S, R6>,
  selector7: Selector<S, R7>,
  selector8: Selector<S, R8>,
  selector9: Selector<S, R9>,
  selector10: Selector<S, R10>,
  selector11: Selector<S, R11>,
  selector12: Selector<S, R12>,
  combiner: (
    res1: R1,
    res2: R2,
    res3: R3,
    res4: R4,
    res5: R5,
    res6: R6,
    res7: R7,
    res8: R8,
    res9: R9,
    res10: R10,
    res11: R11,
    res12: R12
  ) => T
): (checkedState?: any) => T;

export function createSelector(...args: any[]) {
  const selector = (createSelectorWithReselect as any)(...args);
  return (checkedState?: any) => selector(checkedState || {});
}
