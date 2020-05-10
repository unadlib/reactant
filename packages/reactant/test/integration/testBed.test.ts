import { injectable, testBed } from '../..';

test('testBed', () => {
  @injectable()
  class Foo {
    getValue() {
      return 'foo';
    }
  }

  @injectable()
  class Bar {
    constructor(public foo: Foo) {
      //
    }

    getValue() {
      return `${this.foo.getValue()}Bar`;
    }
  }

  const bar = testBed({
    main: Bar,
    modules: [{ provide: Foo, useValue: { getValue: () => 'test' } }],
  });

  expect(bar.instance.getValue()).toBe('testBar');
});
