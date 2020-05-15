import { LazyServiceIdentifer } from 'inversify';

import { ServiceIdentifier } from './interfaces';

const forwardRef = (callback: () => ServiceIdentifier<any>) =>
  new LazyServiceIdentifer(callback);

export { forwardRef };
