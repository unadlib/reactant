/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-constructor */
import { injectable, createContainer } from '..';

test('base di', () => {
  @injectable()
  class Foo {
    name = 'test';
  }

  @injectable()
  class Bar {
    name = 'abc';
  }

  @injectable()
  class FooBar {
    constructor(public bar: Bar, foo: Foo) {
      expect(`${this.bar.name}.${foo.name}`).toEqual('abc.test');
    }
  }

  createContainer().get(FooBar);
});
