export function assign(
  target: object,
  key: string | symbol,
  value: any,
  options?: object
) {
  Object.defineProperty(target, key, {
    configurable: true,
    writable: true,
    enumerable: true,
    value,
    ...options,
  });
}
