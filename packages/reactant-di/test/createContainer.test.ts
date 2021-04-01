import { injectable, createContainer, inject, forwardRef } from '..';

test('forwardRef', () => {
  @injectable()
  class Foo {}

  @injectable()
  class FooBar {}

  @injectable()
  class Bar {
    constructor(@inject(forwardRef(() => Foo)) public foo: Foo) {}
  }

  const ServiceIdentifiers = new Map();
  const container = createContainer({
    ServiceIdentifiers,
    modules: [
      FooBar,
      { provide: 'string', useValue: 'test' },
      { provide: 'number', useValue: 42 },
      { provide: 'symbol', useValue: Symbol('test') },
      { provide: 'null', useValue: null },
      { provide: 'undefined', useValue: undefined },
    ],
  });
  const bar = container.get(Bar);

  expect(bar.foo instanceof Foo).toBeTruthy();
  expect(container.isBound(FooBar)).toBeTruthy();
});
