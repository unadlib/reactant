import { Container, ThisService } from 'reactant';

export const proxy = (
  container: Container,
  options: {
    module: string;
    method: string;
    args: any[];
  }
) => {
  let module = container.get<ThisService | undefined>(options.module);
  if (!module) {
    const matches = options.module.match(/.+(?=:\d+$)/g);
    if (!matches) {
      throw new Error(`The module '${options.module}' does not exist.`);
    }
    const [name] = matches;
    const index = options.module.replace(new RegExp(`^${name}`), '');
    const modules = container.getAll(name);
    if (!Array.isArray(modules) || modules.length) {
      throw new Error(
        `The module '${options.module}' is not a multiple instances injected module, and it does not exist.`
      );
    }
    module = modules[Number(index)] as ThisService;
  }
  const method = module[options.method];
  return method.apply(module, options.args);
};
