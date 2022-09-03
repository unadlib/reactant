import { PluginModule, injectable } from 'reactant';
import type { ReducersMapObject } from 'redux';

@injectable()
export class IdentifierChecker extends PluginModule {
  beforeCombineRootReducers = (reducers: ReducersMapObject) => {
    Object.keys(reducers).forEach((key) => {
      const [prefix, className] = key.split('/');
      if (prefix === '@@reactant') {
        console.error(
          `The decorator for class ${className} should set "@injectable({ name: '${className}' })".`
        );
      }
    });
    return reducers;
  };
}
