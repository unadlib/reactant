export interface Module<T> extends Function {
  new (...args: any[]): T;
}

export type ModuleToken = Module<any> | string | symbol;

export interface ModuleOptions {
  provide: ModuleToken;
  skip?: boolean;
  useClass?: Module<any>;
}
