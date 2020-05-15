import { testBed } from 'reactant';

import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let module: TemplateService;

  beforeEach(() => {
    module = testBed({
      main: TemplateService,
      modules: [],
    }).instance;
  });

  test('should be created', () => {
    expect(module instanceof TemplateService).toBeTruthy();
  });
});
