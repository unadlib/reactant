import pathToRegexp from 'path-to-regexp';
import type * as ReactRouterDom from 'react-router-dom';

const cache: Record<string, pathToRegexp.PathFunction> = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (path: string) => {
  if (cache[path]) return cache[path];

  const generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
};

export const generatePath: typeof ReactRouterDom.generatePath = <S extends string>(
  path: S = '/' as S,
  params?: ReactRouterDom.ExtractRouteParams<S, string | number | boolean>
) => {
  const nextParams =
    params ??
    ({} as ReactRouterDom.ExtractRouteParams<S, string | number | boolean>);

  return path === '/' ? path : compilePath(path)(nextParams, { pretty: true });
};
