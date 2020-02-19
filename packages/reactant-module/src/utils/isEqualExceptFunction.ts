export function isEqualExceptFunction(x: any, y: any) {
  if (typeof x === 'function' && typeof y === 'function') return true;
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y;
}
