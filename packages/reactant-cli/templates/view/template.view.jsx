import React from 'react';
import { injectable, ViewModule } from 'reactant';

@injectable({
  deps: [],
})
class TemplateView extends ViewModule {
  constructor() {
    super();
  }

  component() {
    return <></>;
  }
}

export { TemplateView };
