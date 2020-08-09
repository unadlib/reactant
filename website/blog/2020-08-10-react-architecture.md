---
title: Do we need a React framework?
author: Michael Lin
authorURL: http://twitter.com/unadlib
---

## Motivation

React is a JavaScript library for building user interfaces, but when we want to develop applications based on React, we often have to do a lot of building configuration and many other libraries choices(Picking and learning a React state library and router library, etc.). We also need to consider how our business logic should be abstracted and structured. Everyone who uses React practices their own perception of how React is built, but it doesn't allow us to quickly focus on the business logic itself. As the application business grows in size, we urgently need a framework that can be easily understood and maintained.

And for the structured design of the application's business logic, separation of concern is a good idea. It requires clear boundaries of liability to avoid low maintainability when UI logic and business logic are mixed. We always want to focus on business logic when building applications. It is one of the business core values of an application. We want it to be easy to maintain, and test. Redux remains most popular state library in React. It is fully accord with immutable principles for React. Redux is just a state container, and we're often at a loss for how to really manage those states. We need a framework for scalable, loosely coupled and easily maintainable React applications.

React is an excellent UI library, but even if React has hooks, it's still not enough to solve all the problems we have in developing large applications. We still don't have module dependency injection, we don't have a good AOP practice model, we don't have a good abstraction possibility to minimize the module system, we also can't better practice DDD, and so on. These are all issues beyond React that we need to think about and solve.

Of course, I'm not going to discuss whether React needs to provide these features, it's good enough as it is. What is really being discussed is: Do we need a React framework?

In order to solve these problems, Reactant was created. It's a framework for React.

## Introducing Reactant

Reactant efficiently builds extensible and maintainable React applications. Reactant is based on TypeScript, but it supports both TypeScript and JavaScript (for a better development experience, TypeScript is recommended). Reactant provides dependency injection, modular model, immutable state management, module dynamization, and more. It is pluggable and highly testable. Not only is it able to quickly build a React application (Web and Native Mobile), it also brings some new React development experiences. With Reactant, you can still embrace OOP, FP, FRP and other programming paradigms, and you can still embrace the entire React ecosystem.

Reactant is inspired by quite a few good features of Angular, for example, Reactant provides a similar dependency injection API to Angular. But Reactant is not a copy of Angular programming ideas on the React framework, Reactant provides fewer and more concise API, It is sufficient for all programming scenarios for developing applications.

It is a complete architecture of React.

## What problem was solved?

Reactant is a progressive framework. In the process of developing applications from simple to complex, it can provide the appropriate features at each stage, based on its system architecture design can also be a variety of gradual and smooth upgrade and evolution.

### Better Immutable State Management

React advocates immutable state type management, and Redux clearly fits this. But the fact is that simple mutation update operation like MobX are increasingly in line with current trends. Therefore Reactant provides a new immutable state management model based on Redux and Immer, which incorporates similar API elements of MobX. And more importantly, it still maintains immutability of state.

```ts
@injectable()
class TodoList {
  @state
  list: Todo[] = [];

  @action
  addTodo(text: string) {
    this.list.push({ text, completed: false });
  }
}
```

### Modularization

While it seems that the entire React community is increasingly pushing functional programming after React introduced Hooks, functional programming may not be the best solution in complex enterprise businesses. Of course, Hooks does bring good solutions for decoupling rendering logic, if only in building UI. But in the realm of business logic, we have better options, especially in an enterprise application where multiple developers collaborate on development, and indeed class-based module design often brings parallel development and ease of maintenance and testing. class aren't evil, it's the wrong module design that's evil.

Therefore, Reactant advocates the use of classes for module implementation. And more importantly, Reactant defines Service Module, View Module, Plugin Module, so that their responsibilities and boundaries are more clearly defined. Any module can be a Service Module, it is flexible, and the architecture of many different applications can be based on it; View Module must define the view component bound to the current module, it is the rendering entry point for the view module, and the state of the modules it depends on will be injected intuitively into Props via `useConnector`; Plugin Module is a complete Redux middleware and Context re-encapsulation , it provides a model for designing plug-ins, which makes the plug-in API simplicity is possible.

In addition , Reactant provides a complete dependency injection API. It implements DI based on TypeScript decorator metadata, making it particularly easy to use.

```tsx
@injectable()
class AppView extends ViewModule {
  constructor(public counter: Counter) {
    super();
  }

  component() {
    const count = useConnector(() => this.counter.count);
    return (
      <button
      	type="button"
      	onClick={() => this.counter.increase()}>
        {count}
      </button>
    );
  }
}
```

### Easy and Lightweight

Reactant has no more than 30 APIs and even fewer than 15 core APIs. Without much familiarity and adaptation, you can quickly get started with Reactant and use it to develop any complex React application.

The gzipped Reactant core code file is less than 50KB at runtime. Reactant not only supports code splitting, it also supports dynamic injection of modules, which is very useful for many large applications to run minimally.

### Embracing React Ecosystem

Reactant is open, it abstracts some models based on React and Redux. These APIs bring convenience to developers, it also supports the ecosystem of React and Redux. Many superb third-party libraries can be used directly on Reactant or re-encapsulated, which brings infinite possibilities to the use of Reactant.

### Better Development Experience

Reactant provides a simpler routing module (reactant-router) and a persistence module (reactant-storage). If necessary, you can develop any module based on the Reactant plug-in module you need a better module API.

In development debugging, `devOptions` supports both `autoFreeze` and `reduxDevTools` options. When enable `autoFreeze`, any changing operation without the `@action` decorated method will throw errors. And when enable `reduxDevTools`, Reactant will activate the support for Redux DevTools.

Reactant will do more features that improve the development experience.

### Benchmark Performance

In benchmark performance tests between Reactant and MobX+React, Reactant has the edge in startup time and derived computing, while MobX+React has the edge in value updates. And overall, the performance difference is not particularly significant. Because Reactant is based on Immer, Reactant also provides a performance-optimized solution when encountering a very few extreme performance bottlenecks. 

Reactant is committed to maintaining good performance while continuing to build a productive React framework.

## Conclusion

Reactant was originally intended to help React developers be able to efficiently build and develop a maintainable and testable application. Reactant's goal is to minimize the system life cost and maximize developer productivity.

As a brand new framework, Reactant has only been in development for a few months and there is still a lot of work to be done, including the build tools, development tools, server side rendering, and the React Native CLI, and so on. 

If you are already familiar with React, then you just need to quickly read the Reactant part of the documentation and use the Reactant CLI to quickly build the Reactant application, you will start your new React application development experience.

Repo：

https://github.com/unadlib/reactant
