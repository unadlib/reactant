import { PluginModule, injectable } from 'reactant';
import type { ReducersMapObject } from 'redux';

@injectable()
export class IdentifierChecker extends PluginModule {
  beforeCombineRootReducers = (reducers: ReducersMapObject) => {
    Object.keys(reducers).forEach((key) => {
      const arr = key.split('/');
      if (arr[0] === '@@reactant') {
        console.error(
          `The decorator for class ${arr[1]} should set "@injectable({ name: '${arr[1]}' })".`
        );
      }
    });
    return reducers;
  };
}
