import { injectable, createContainer, inject, forwardRef } from '..';

test('forwardRef', () => {
  @injectable()
  class Foo {}

  @injectable()
  class Bar {
    constructor(@inject(forwardRef(() => Foo)) public foo: Foo) {}
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.foo instanceof Foo).toBeTruthy();
});
