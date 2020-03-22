import {
  injectable,
  createContainer,
  inject,
  optional,
  multiInject,
  multiOptional,
} from '../..';

test('base di with @multiInject', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@multiInject(Foo) public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo, Foo],
  }).get(Bar);

  expect(bar.length).toBe(2);
});

test('base di with @multiInject for token', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    constructor(@multiInject('Foo') public foos: Foo[]) {}

    public get length() {
      return this.foos.length;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [
      { provide: 'Foo', useClass: Foo },
      { provide: 'Foo', useValue: 'test' },
    ],
  }).get(Bar);

  expect(bar.length).toBe(2);
  expect(bar.foos[1]).toBe('test');
});
