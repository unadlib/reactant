import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '../..';

test('base di with @multiOptional for identifier', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@multiOptional('Foo') public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  let bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.foos).toEqual([]);

  bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useClass: Foo },
      { provide: 'Foo', useValue: 'test' },
    ],
  }).get(Bar);

  expect(bar.length).toBe(2);
  expect(bar.foos[1]).toBe('test');
});
