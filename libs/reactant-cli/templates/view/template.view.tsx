import React from 'react';
import { injectable, ViewModule } from 'reactant';

@injectable()
class TemplateView extends ViewModule {
  constructor() {
    super();
  }

  component() {
    return <></>;
  }
}

export { TemplateView };
