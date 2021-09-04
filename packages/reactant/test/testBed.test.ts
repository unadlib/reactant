import { injectable, testBed, ViewModule } from '..';

describe('testBed', () => {
  test('mock with useValue', () => {
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
    expect(() => {
      bar.bootstrap(document.createElement('div'));
    }).toThrow(`Main module should be a 'ViewModule'.`);
  });

  test('mock with custom render', () => {
    @injectable()
    class Foo {
      getValue() {
        return 'foo';
      }
    }

    @injectable()
    class Bar extends ViewModule {
      constructor(public foo: Foo) {
        super();
      }

      getValue() {
        return `${this.foo.getValue()}Bar`;
      }

      component() {
        return null;
      }
    }

    const bar = testBed({
      main: Bar,
      modules: [{ provide: Foo, useValue: { getValue: () => 'test' } }],
      render: null as any,
    });

    const spy = jest.spyOn(console, 'log').mockImplementation();
    bar.bootstrap(document.createElement('div'));
    expect(spy.mock.calls.slice(-1)).toEqual([
      ['No render function is configured.'],
    ]);
  });
});
