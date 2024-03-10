"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9991],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,b=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return n?o.createElement(b,a(a({ref:t},p),{},{components:n})):o.createElement(b,a({ref:t},p))}));function b(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,a=new Array(r);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<r;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2650:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var o=n(3117),i=(n(7294),n(3905));const r={sidebar_position:3},a="View Module",l={unversionedId:"basic-tutorial/view-module",id:"basic-tutorial/view-module",title:"View Module",description:"We can be used to implement a module with a View by inheriting the ViewModule and defining the component method (a React function component).",source:"@site/docs/basic-tutorial/view-module.md",sourceDirName:"basic-tutorial",slug:"/basic-tutorial/view-module",permalink:"/docs/basic-tutorial/view-module",draft:!1,editUrl:"https://github.com/unadlib/reactant/tree/master/website/docs/basic-tutorial/view-module.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docs",previous:{title:"React Component",permalink:"/docs/basic-tutorial/component"},next:{title:"Basic Dependency Injection",permalink:"/docs/basic-tutorial/base-di"}},s={},c=[],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"view-module"},"View Module"),(0,i.kt)("p",null,"We can be used to implement a module with a View by inheriting the ",(0,i.kt)("inlineCode",{parentName:"p"},"ViewModule")," and defining the ",(0,i.kt)("inlineCode",{parentName:"p"},"component")," method (a React function component)."),(0,i.kt)("p",null,"It is possible to inject any method of the current ",(0,i.kt)("inlineCode",{parentName:"p"},"ViewModule")," in its ",(0,i.kt)("inlineCode",{parentName:"p"},"component"),", and also to inject the current shared module state or other dependent module state using ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/reactant/modules/hooks_useConnector"},"useConnector"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"interface Todo {\n  text: string;\n  completed: boolean;\n}\n\n@injectable()\nclass TodoView extends ViewModule {\n  @state\n  list: Todo[] = [];\n\n  addTodo(text: string) {\n    this.list.push({\n      text,\n      completed: false,\n    });\n  }\n\n  @action\n  toggleTodo(key: number, value: boolean) {\n    this.list[key].completed = !value;\n  }\n\n  component() {\n    const list = useConnector(() => this.list);\n    return (\n      <ul>\n        {this.list.map(({ text, completed }, key) => (\n          <li key={key} onClick={() => this.toggleTodo(key, completed)}>\n            {text}\n          </li>\n        ))}\n      </ul>\n    );\n  }\n}\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"useConnector")," also supports returning a state object, which automatically makes shallow comparisons:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"const { list, visibilityFilter } = useConnector(() => ({\n  list: this.list,\n  visibilityFilter: this.visibilityFilter,\n}));\n")),(0,i.kt)("p",null,"It should be noted that while the ",(0,i.kt)("inlineCode",{parentName:"p"},"ViewModule")," supports inheritance, function components based on ",(0,i.kt)("inlineCode",{parentName:"p"},"component")," method implementations must be called in the same way as components based on superclass ",(0,i.kt)("inlineCode",{parentName:"p"},"component")," methods, not using the jsx:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"@injectable()\nclass BaseFooView extends ViewModule {\n  component() {\n    return <span>foo</span>;\n  }\n}\n\nclass FooView extends BaseFooView {\n  component() {\n    return (\n      <>\n        <span>foo</span>\n        {\n          super.component()\n          // Don't make it: <super.component />\n        }\n      </>\n    );\n  }\n}\n")))}d.isMDXComponent=!0}}]);