"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9799],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=o,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(h,s(s({ref:t},c),{},{components:n})):r.createElement(h,s({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7162:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const a={title:"How to build high-performance front-end applications based on multi-processing",author:"unadlib",tags:["reactant"]},s=void 0,i={permalink:"/blog/2023/12/29/how-to-build-high-performance-front-end-applications-based-on-multi-processing",editUrl:"https://github.com/unadlib/reactant/tree/master/website/blog/2023-12-29-how-to-build-high-performance-front-end-applications-based-on-multi-processing/index.md",source:"@site/blog/2023-12-29-how-to-build-high-performance-front-end-applications-based-on-multi-processing/index.md",title:"How to build high-performance front-end applications based on multi-processing",description:"Motivation",date:"2023-12-29T00:00:00.000Z",formattedDate:"December 29, 2023",tags:[{label:"reactant",permalink:"/blog/tags/reactant"}],readingTime:9.1,hasTruncateMarker:!1,authors:[{name:"unadlib"}],frontMatter:{title:"How to build high-performance front-end applications based on multi-processing",author:"unadlib",tags:["reactant"]},nextItem:{title:"How to make Web application support multiple browser windows",permalink:"/blog/2021/10/03/how-to-make-web-application-support-multiple-browser-windows"}},l={authorsImageUrls:[void 0]},p=[{value:"Motivation",id:"motivation",level:2},{value:"Web application with Multi-Processing",id:"web-application-with-multi-processing",level:2},{value:"Coworker based on reactant-share",id:"coworker-based-on-reactant-share",level:2},{value:"Implementation of Coworker",id:"implementation-of-coworker",level:2},{value:"Core Concepts and Advantages of Coworker",id:"core-concepts-and-advantages-of-coworker",level:2},{value:"API",id:"api",level:2},{value:"Examples",id:"examples",level:2},{value:"Q&amp;A",id:"qa",level:2},{value:"Conclusion",id:"conclusion",level:2}],c={toc:p};function u(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"motivation"},"Motivation"),(0,o.kt)("p",null,"As modern front-end applications become larger, making full use of the device's CPU multi-cores to improve performance may become an important trend."),(0,o.kt)("p",null,"Front-end applications often run in a single browser window, and JavaScript runs on a single thread. This means that common web applications cannot take full advantage of a CPU's multiple-cores. As applications become larger and more complex, this can lead to performance problems and a poor user experience."),(0,o.kt)("p",null,"However, there is good news (the gradual phasing out of IE and Safari v16 support for Shared Worker). Modern browsers widely support various types of Workers, including Shared Workers. Shared Workers are a mature technology that allows multiple threads of JavaScript code to share data and communicate with each other. This makes them ideal for building multi-process front-end applications."),(0,o.kt)("p",null,"Multi-process front-end applications have several benefits. They can better resolve computation-intensive and slow-running JavaScript, which can improve performance and fluidity. They can also increase the number of concurrent requests that can be processed, which can improve the responsiveness of the application."),(0,o.kt)("p",null,"So we aim to explore a Web application framework that leverages multi-processing."),(0,o.kt)("h2",{id:"web-application-with-multi-processing"},"Web application with Multi-Processing"),(0,o.kt)("p",null,"In a multi-process web architecture, we can leverage the Shared Web Apps concept of reactant-share to extend general multi-process programming."),(0,o.kt)("p",null,"Shared Web Apps allows running web applications in multiple browser windows or workers. It uses a unique front-end server (like a Shared Worker) to share web apps, whether it's code sharing, local storage sharing, state sharing, and so on. Regardless of how many browser windows are opened, there's always only one server application instance shared among multiple client applications for the Shared Web Apps. It enables Web Tabs to only perform rendering separation, thus making better use of the device's multi-cores and ensuring smooth operation of the web application."),(0,o.kt)("p",null,"Shared Web Apps provides the following benefits:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Reduces the mental burden of multi-process programming by implementing Isomorphism with a universal modular model. Isomorphism is the ability to execute the same code on both the server process, client process or other process, which simplifies multi-process programming."),(0,o.kt)("li",{parentName:"ul"},"Ensures smooth operation of the front-end server process by transferring compute-intensive tasks to another process. This frees up the front-end server process to focus on business logic and the client process to focus on rendering, which improves performance and responsiveness."),(0,o.kt)("li",{parentName:"ul"},"Improves request concurrency by using a better multi-process model. This allows the web application to handle more requests simultaneously.")),(0,o.kt)("h2",{id:"coworker-based-on-reactant-share"},"Coworker based on reactant-share"),(0,o.kt)("p",null,"Based on reactant-share, we have implemented the Coworker model, which facilitates state sharing across multiple processes, synchronizes state, and minimizes state changes with patches to ensure optimal performance in multi-process execution."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Workflow",src:n(6528).Z,width:"1999",height:"875"})),(0,o.kt)("p",null,"The Coworker model consists of three types of processes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Client Process: The rendering process, which accepts shared state and only renders the web UI. It is lightweight to ensure smooth rendering."),(0,o.kt)("li",{parentName:"ul"},"Server Process: The main process, which executes most of the application business logic. It should also ensure smooth running."),(0,o.kt)("li",{parentName:"ul"},"Coworker Process: The process responsible for compute-intensive business or request-intensive logic. This process frees up the server process to focus on business logic. The server process can reduce blocking caused by JavaScript and is less susceptible to the effects of request-intensive logic.")),(0,o.kt)("p",null,'In "Base" mode, Reactant Shared Apps has only two processes: the Tab process and the Coworker process. The Coworker process uses a Web Worker by default.'),(0,o.kt)("h2",{id:"implementation-of-coworker"},"Implementation of Coworker"),(0,o.kt)("p",null,"For the related principles of Reactant-Share, please see the following link: ",(0,o.kt)("a",{parentName:"p",href:"https://reactant.js.org/blog/2021/10/03/how-to-make-web-application-support-multiple-browser-windows"},"https://reactant.js.org/blog/2021/10/03/how-to-make-web-application-support-multiple-browser-windows")),(0,o.kt)("p",null,"Coworker consists of two modules:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CoworkerAdapter"),": Provides transport for communication between the server process and the coworker process."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CoworkerExecutor"),": Handles synchronization of shared state between processes and custom Coworker type modules (used for proxy execution of coworkers). Coworkers are synchronously sent to the main process in one direction. Each time a Coworker syncs its state, it carries a sequence tag. If the sequence is abnormal, a complete Coworker state synchronization is triggered automatically to ensure the consistency of the shared state between the Coworker and the main process.")),(0,o.kt)("h2",{id:"core-concepts-and-advantages-of-coworker"},"Core Concepts and Advantages of Coworker"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Isomorphism"),": All processes execute the same code, which enhances the maintainability of multi-process programming in JavaScript."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Process Interaction based on the Actor Model"),": Relying on the Actor model, this method reduces the cognitive load of multi-process programming in JavaScript."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Generic Transport Model"),": Coworker supports any transport based on data-transport (",(0,o.kt)("a",{parentName:"li",href:"https://github.com/unadlib/data-transport"},"https://github.com/unadlib/data-transport"),"), so it can run in any container that supports transport, including SharedWorker. The following is a list of supported transports:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"iframe"),(0,o.kt)("li",{parentName:"ul"},"Broadcast"),(0,o.kt)("li",{parentName:"ul"},"Web Worker"),(0,o.kt)("li",{parentName:"ul"},"Service Worker"),(0,o.kt)("li",{parentName:"ul"},"Shared Worker"),(0,o.kt)("li",{parentName:"ul"},"Browser Extension"),(0,o.kt)("li",{parentName:"ul"},"Node.js"),(0,o.kt)("li",{parentName:"ul"},"WebRTC"),(0,o.kt)("li",{parentName:"ul"},"Electron"),(0,o.kt)("li",{parentName:"ul"},"Any other port based on data-transport"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"High Performance Based on Mutative"),": ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/unadlib/mutative"},"Mutative")," is faster than the naive handcrafted reducer and 10x faster than Immer. Updates to immutable data based on Mutative also maintain good performance. The patches obtained from the shared state update are used for state synchronization."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"High Performance"),": Due to Coworker taking on a large number of requests and compute-intensive tasks, the main process and rendering process maintain extremely high performance and user experience."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Support for Large Applications"),": Reactant provides a complete module model design, including dependency injection and class first, as well as various modular design and dynamic module injections."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Separation of Service and Rendering View Modules"),": Service modules, which are primarily based on business logic, can execute separately from view modules. This not only achieves separation of concerns but also allows the process to have its own containerization."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Graceful Degradation"),"\uff1a If the JavaScript host environment does not support SharedWorker, Coworker reverts to a regular SPA. This does not affect the behavior of any current application.")),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"spawn()")," - It will forward execution to the module and specified function proxies in Coworker, inspired by the Actor model."),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("p",null,"We will create a Counter application with Coworker based on the \u2018Base\u2018 pattern."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Firstly, create app.tsx that contains the ProxyCounter module which needs to be executed in Coworker.")),(0,o.kt)("p",null,"Its calling method ",(0,o.kt)("inlineCode",{parentName:"p"},"spawn(this.proxyCounter, 'increase', [])")," is exactly the same as that of general Shared Web Apps. Whether it will be executed with a proxy in Coworker depends on the configuration of createApp."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\nimport {\n  ViewModule,\n  injectable,\n  useConnector,\n  action,\n  state,\n  spawn,\n} from "reactant-share";\n\n@injectable({\n  name: "ProxyCounter",\n})\nexport class ProxyCounter {\n  @state\n  count = 0;\n\n  @action\n  increase() {\n    this.count += 1;\n  }\n}\n\n@injectable({\n  name: "AppView",\n})\nexport class AppView extends ViewModule {\n  constructor(public proxyCounter: ProxyCounter) {\n    super();\n  }\n\n  @state\n  count = 0;\n\n  @action\n  increase() {\n    this.count += 1;\n  }\n\n  component(this: AppView) {\n    const [count, proxyCount] = useConnector(() => [\n      this.count,\n\n      this.proxyCounter.count,\n    ]);\n\n    return (\n      <>\n        <div>{count}</div>\n        <button type="button" onClick={() => spawn(this, "increase", [])}>\n          +\n        </button>\n        <p>proxy in coworker</p>\n        <div>{proxyCount}</div>\n        <button\n          type="button"\n          onClick={() => spawn(this.proxyCounter, "increase", [])}\n        >\n          +\n        </button>\n      </>\n    );\n  }\n}\n')),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Create the main file ",(0,o.kt)("inlineCode",{parentName:"li"},"index.ts"),". Here, we set ",(0,o.kt)("inlineCode",{parentName:"li"},"ProxyCounter")," as a module of Coworker, and set ",(0,o.kt)("inlineCode",{parentName:"li"},"isCoworker")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"false"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { render } from 'reactant-web';\nimport {\n  createSharedApp,\n  Coworker,\n  CoworkerOptions,\n  ICoworkerOptions,\n} from 'reactant-share';\nimport { AppView, ProxyCounter } from './app';\n\ncreateSharedApp({\n  modules: [\n    Coworker,\n    {\n      provide: CoworkerOptions,\n      useValue: {\n        useModules: [ProxyCounter],\n        worker: new Worker(new URL('./coworker.ts', import.meta.url)),\n        isCoworker: false,\n      } as ICoworkerOptions,\n    },\n  ],\n  main: AppView,\n  render,\n  share: {\n    name: 'SharedWorkerApp',\n    type: 'Base',\n  },\n}).then((app) => {\n  app.bootstrap(document.getElementById('app'));\n  window.app = app;\n});\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Create the Coworker file ",(0,o.kt)("inlineCode",{parentName:"li"},"coworker.ts"),". Here, we also set ProxyCounter as a module of Coworker, but set ",(0,o.kt)("inlineCode",{parentName:"li"},"isCoworker")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"true"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import {\n  createSharedApp,\n  Coworker,\n  CoworkerOptions,\n  ICoworkerOptions,\n} from 'reactant-share';\nimport { AppView, ProxyCounter } from './app';\n\ncreateSharedApp({\n  modules: [\n    Coworker,\n    {\n      provide: CoworkerOptions,\n      useValue: {\n        useModules: [ProxyCounter],\n        isCoworker: true,\n      } as ICoworkerOptions,\n    },\n  ],\n  main: AppView,\n  render: () => {},\n  share: {\n    name: 'SharedWorkerApp',\n    type: 'Base',\n  },\n}).then((app) => {\n  self.app = app;\n});\n")),(0,o.kt)("p",null,"So far, we have completed a basic application with a Coworker. Users trigger the ",(0,o.kt)("inlineCode",{parentName:"p"},"spawn(this.proxyCounter, 'increase', [])")," in the main process via the UI. It will be forwarded to the coworker to execute the increase function of proxyCounter, and the shared state will automatically synchronize back to the main process. The rendering update is completed by the ",(0,o.kt)("inlineCode",{parentName:"p"},"useConnector()")," Hook."),(0,o.kt)("h2",{id:"qa"},"Q&A"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"1. What are the challenges of multi-process programming with Coworker based on reactant-share?")),(0,o.kt)("p",null,"State sharing and synchronization among processes in multi-process programming are relatively complex. Fortunately, Reactant-share ensures robustness through a shared state design with consistency. The dependencies between isomorphic modules of Coworker should also be taken into account. In development, concepts such as Domain-Driven Design should be practiced as much as possible to avoid incorrect module design."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"2. What are the possible use case types for Coworker?")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Request Queue")," - Coworker is particularly suitable for modules with intensive requests. Running these in Coworker ensures they don't occupy the main process's request queue, allowing other main process requests to execute."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Large Task Execution Blocking")," - When a computationally intensive task is executed, the application's main process should not be blocked. Such tasks are well suited for asynchronous execution in Coworker."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Isolatable Modules")," - Coworker can also be used as a sandbox to isolate execution of some modules.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"3. Are there any specific examples to demonstrate that Coworkers can improve application performance?")),(0,o.kt)("p",null,"In production, we've introduced Coworker into some specific scenarios for modules related to large data volume text matching. It resulted in a substantial performance improvement, even up to 10x more, significantly enhancing the user experience."),(0,o.kt)("p",null,"Such computationally intensive text matching used to require users to wait more than 1s in the past, with the webpage being completely blocked. However, after using Coworker, the webpage blockage was reduced to less than 100ms (of course, the actual degree of improvement varies with different data sizes)."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"4. Is Coworker usable across different browsers, or does it only support within browser tabs? Can Coworker be used across tabs in different domains?")),(0,o.kt)("p",null,"Coworker is a multi-process model based on reactant-share, and reactant-share is based on data-transport. Therefore, we only need to use WebRTC transport from data-transport in CoworkerAdapter within Coworker to achieve cross-browser support. Additionally, to support usage across tabs in different domains, we can implement the use of Coworker under cross-domain tabs with an approach using iframe + shared worker."),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"Front-end development is at a turning point, driven by advances in front-end technology and browser capabilities. Multi-core CPUs and multi-process tools such as Shared Workers and other Workers are now being used to great effect in front-end development. The emergence of Shared Web Apps with Coworker introduces a new multi-process model for front-end applications, which significantly improves application performance, user experience, and code maintainability. For developers, this means more technical choices and challenges, but also more opportunities and potential."),(0,o.kt)("p",null,"Multi-process programming for front-end applications is likely to become a key solution for improving front-end performance. This would result in a smoother, more efficient, and more responsive user experience."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"reactant-share Document\uff1a",(0,o.kt)("a",{parentName:"li",href:"https://reactant.js.org/docs/shared-app"},"https://reactant.js.org/docs/shared-app")),(0,o.kt)("li",{parentName:"ul"},"reactant-share Repo: ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/unadlib/reactant/tree/master/packages/reactant-share"},"https://github.com/unadlib/reactant/tree/master/packages/reactant-share"))))}u.isMDXComponent=!0},6528:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/workflow-94b33c6268facdf8bd5b7662373b6079.png"}}]);