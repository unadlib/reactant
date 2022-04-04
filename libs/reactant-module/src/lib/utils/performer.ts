export const perform = (funs: Function[], parameter?: any) =>
  funs.reduce((param: any, fun) => fun(param), parameter);
