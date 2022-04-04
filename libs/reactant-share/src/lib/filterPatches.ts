import { ActionOptions } from './interfaces';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const filterPatches = (
  data: Record<string, any>,
  options: ActionOptions
) => {
  return (
    options._patches?.reduce<ActionOptions['_patches']>((newPatches, item) => {
      let value = data;
      for (let i = 0; i < item.path.length - 1; i += 1) {
        const key = item.path[i];
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          value = value[key];
        } else {
          return newPatches;
        }
      }
      newPatches!.push(item);
      return newPatches;
    }, []) ?? []
  );
};
