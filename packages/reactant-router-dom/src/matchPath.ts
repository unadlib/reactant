import pathToRegexp from 'path-to-regexp';
import type * as ReactRouter from 'react-router';

type MatchResult = {
  regexp: pathToRegexp.PathRegExp;
  keys: pathToRegexp.Key[];
};

const cache: Record<string, Record<string, MatchResult>> = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (
  path: string,
  options: pathToRegexp.RegExpOptions
): MatchResult => {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys: pathToRegexp.Key[] = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
};

export const matchPath: typeof ReactRouter.matchPath = <
  Params extends { [K in keyof Params]?: string } = {}
>(
  pathname: string,
  options: string | string[] | ReactRouter.RouteProps = {},
  _parent?: ReactRouter.match<Params> | null
) => {
  const currentOptions =
    typeof options === 'string' || Array.isArray(options)
      ? { path: options }
      : options;
  const {
    path,
    exact = false,
    strict = false,
    sensitive = false,
  } = currentOptions;
  const paths = ([] as string[]).concat(path ?? []);

  return paths.reduce<ReactRouter.match<Params> | null>((matched, currentPath) => {
    if (!currentPath && currentPath !== '') return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(currentPath, {
      end: exact,
      strict,
      sensitive,
    });
    const matchedValues = regexp.exec(pathname);

    if (!matchedValues) return null;

    const [url, ...values] = matchedValues;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    const params = keys.reduce<Record<string, string>>((memo, key, index) => {
      memo[String(key.name)] = values[index];
      return memo;
    }, {});

    return {
      path: currentPath,
      url: currentPath === '/' && url === '' ? '/' : url,
      isExact,
      params: params as Params,
    };
  }, null);
};
