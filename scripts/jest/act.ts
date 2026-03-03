import { flushSync } from 'react-dom';
import { act as reactAct } from 'react';

export const act = <T>(callback: () => T | Promise<T>) => {
  if (process.env.NODE_ENV !== 'production') {
    return reactAct(callback);
  }

  let result: T | Promise<T> | undefined;
  if (typeof flushSync === 'function') {
    flushSync(() => {
      result = callback();
    });
  } else {
    result = callback();
  }

  if (result && typeof (result as Promise<T>).then === 'function') {
    return (result as Promise<T>).then(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 0);
        })
    );
  }

  return undefined;
};
