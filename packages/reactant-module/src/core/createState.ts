// type CreateState = <T extends Record<string, Function>>(
//   t: T
// ) => StateMapObject<T>;

// // const createState: CreateState = (t: any) => t;

// // const x = createState({
// //   a: (a: number) => true,
// //   a1: (a: number) => '1',
// //   a2: (a: number) => 1,
// // });

type StateMapObject<T extends Record<string, Function>> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? FirstParameter<T[P]>
    : never;
};

type FirstParameter<T extends (...args: any) => any> = T extends (
  param: infer P,
  ...args: any[]
) => any
  ? P
  : never;

export function createState<R extends Record<string, Function>>(reducers: R) {
  return reducers as StateMapObject<R>;
}
