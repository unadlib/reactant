import {
  injectable,
  multiInject,
  createContainer,
  createStore,
  ServiceIdentifiersMap,
  action,
  state,
} from '..';

test('base module with @state and @action', () => {
  @injectable()
  class Counter {
    @state
    count = 0;

    @action
    increase() {
      this.count += 1;
    }
  }
  const ServiceIdentifiers = new Map();
  const modules = [Counter];
  const container = createContainer({
    ServiceIdentifiers,
    modules,
    options: {
      defaultScope: 'Singleton',
    },
  });
  const counter = container.get(Counter);
  const store = createStore(container, ServiceIdentifiers);
  counter.increase();
  // console.log(counter.count, store.getState());
});

// test('module with multiple injection', () => {
//   @injectable()
//   class Foo {
//     name = 'foo';

//     state = { count: 1 };

//     @action
//     increase() {
//       this.state.count += 1;
//     }
//   }

//   @injectable()
//   class FooTest {
//     name = 'fooTest';

//     state = { count: 1 };
//   }

//   @injectable()
//   class FooBar {
//     constructor(@multiInject('FooToken') public foos: Foo[], public foo: Foo) {}
//   }

//   const ServiceIdentifiers = new Map();
//   const modules = [
//     FooBar,
//     { provide: 'FooToken', useClass: Foo },
//     { provide: 'FooToken', useClass: Foo },
//     { provide: 'FooToken', useClass: Foo },
//     { provide: 'FooToken', useClass: FooTest },
//   ];
//   const container = createContainer({
//     ServiceIdentifiers,
//     modules,
//     options: {
//       defaultScope: 'Singleton',
//     },
//   });
//   const fooBar = container.get(FooBar);
//   const store = createStore(container, ServiceIdentifiers);
//   expect(store.getState()).toEqual({
//     FooToken: { count: 1 },
//     FooToken1: { count: 1 },
//     FooToken2: { count: 1 },
//     FooToken3: { count: 1 },
//     foo: { count: 1 },
//   });
//   fooBar.foos[0].increase();
//   expect(store.getState()).toEqual({
//     FooToken: { count: 2 },
//     FooToken1: { count: 1 },
//     FooToken2: { count: 1 },
//     FooToken3: { count: 1 },
//     foo: { count: 1 },
//   });
//   fooBar.foos[1].increase();
//   expect(store.getState()).toEqual({
//     FooToken: { count: 2 },
//     FooToken1: { count: 2 },
//     FooToken2: { count: 1 },
//     FooToken3: { count: 1 },
//     foo: { count: 1 },
//   });
// });

// test('module with stagedState about effect', () => {
//   @injectable()
//   class Foo0 {
//     name = 'foo';

//     state = { count: 1, count1: 1 };

//     @action
//     increase() {
//       this.state.count += 1;
//     }
//   }

//   @injectable()
//   class Foo extends Foo0 {
//     count = 1;

//     add(count: number) {
//       this.count += count;
//     }

//     @action
//     increase() {
//       super.increase();
//       this.state.count += 1;
//       this.increase1();
//       this.add(this.count);
//     }

//     @action
//     increase1() {
//       this.state.count1 += 1;
//     }
//   }

//   @injectable()
//   class FooBar {
//     constructor(public foo: Foo) {}
//   }

//   const ServiceIdentifiers = new Map();
//   const container = createContainer({
//     ServiceIdentifiers,
//     modules: [FooBar],
//     options: {
//       defaultScope: 'Singleton',
//     },
//   });
//   const fooBar = container.get(FooBar);
//   const store = createStore(container, ServiceIdentifiers);
//   const subscribe = jest.fn();
//   store.subscribe(subscribe);
//   fooBar.foo.increase();
//   expect(fooBar.foo.state.count).toBe(3);
//   expect(fooBar.foo.state.count1).toBe(2);
//   expect(fooBar.foo.count).toBe(2);
//   expect(subscribe.mock.calls.length).toBe(1);
// });
