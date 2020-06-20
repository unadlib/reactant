export const isEqual = (x: unknown, y: unknown) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
};

export const isEqualExceptFunction = (x: unknown, y: unknown) => {
  if (typeof x === 'function' && typeof y === 'function') return true;
  return isEqual(x, y);
};

export const areShallowEqualWithObject = (objA: any, objB: any) => {
  if (isEqualExceptFunction(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i += 1) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !isEqualExceptFunction(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
};

export function areShallowEqualWithArray(
  prev: any[] | null | IArguments,
  next: any[] | null | IArguments
) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  const { length } = prev;
  for (let i = 0; i < length; i += 1) {
    if (!isEqual(prev[i], next[i])) {
      return false;
    }
  }
  return true;
}
