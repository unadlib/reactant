import React from 'react';
import {
  ViewModule,
  injectable,
  useConnector,
  action,
  createSelector,
} from 'reactant';

@injectable()
class ShoppingCartView extends ViewModule {
  constructor() {
    super();
  }

  routerName = 'Shopping Cart';

  path = '/shoppingCart';

  component() {
    return null;
  }
}

export { ShoppingCartView };
