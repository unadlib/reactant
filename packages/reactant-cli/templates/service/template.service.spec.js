import { testBed } from 'reactant';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let module;

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
