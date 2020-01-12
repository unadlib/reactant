// eslint-disable-next-line no-underscore-dangle
const __DEV__ = process.env.NODE_ENV !== 'production';

export function add<T>(a: T): T[] {
  if (__DEV__) {
    const a = {
      s: 1,
      s1: 2
    }
    console.log('=======');
  }
  return [a];
}
