import React from 'react';
import { injectable, ViewModule, useConnector } from 'reactant';

@injectable({
  deps: [],
})
class TemplateView extends ViewModule {
  constructor() {
    super();
  }

  component() {
    return null;
  }
}
