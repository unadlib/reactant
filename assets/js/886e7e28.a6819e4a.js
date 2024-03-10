"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4433],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),c=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(d.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=c(n),m=a,f=s["".concat(d,".").concat(m)]||s[m]||u[m]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[s]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5353:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(3117),a=(n(7294),n(3905));const i={id:"decorators_inject",title:"Module: decorators/inject",sidebar_label:"decorators/inject",sidebar_position:0,custom_edit_url:null},o=void 0,l={unversionedId:"api/reactant-di/modules/decorators_inject",id:"api/reactant-di/modules/decorators_inject",title:"Module: decorators/inject",description:"Functions",source:"@site/docs/api/reactant-di/modules/decorators_inject.md",sourceDirName:"api/reactant-di/modules",slug:"/api/reactant-di/modules/decorators_inject",permalink:"/docs/api/reactant-di/modules/decorators_inject",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"decorators_inject",title:"Module: decorators/inject",sidebar_label:"decorators/inject",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"decorators/injectable",permalink:"/docs/api/reactant-module/modules/decorators_injectable"},next:{title:"decorators/optional",permalink:"/docs/api/reactant-di/modules/decorators_optional"}},d={},c=[{value:"Functions",id:"functions",level:2},{value:"inject",id:"inject",level:3},{value:"Description",id:"description",level:2},{value:"Example",id:"example",level:2},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Parameters",id:"parameters-1",level:5},{value:"Returns",id:"returns-1",level:5},{value:"Defined in",id:"defined-in",level:4}],p={toc:c},s="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"functions"},"Functions"),(0,a.kt)("h3",{id:"inject"},"inject"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"inject"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"serviceIdentifierOrFunc?"),"): (",(0,a.kt)("inlineCode",{parentName:"p"},"target"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"object"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"key?"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"index?"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number"),") => ",(0,a.kt)("inlineCode",{parentName:"p"},"void")),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"You can use ",(0,a.kt)("inlineCode",{parentName:"p"},"@inject()")," to perform the required dependency injection module to decorate in the constructor of an injectable class."),(0,a.kt)("p",null,"If the default is a dependency injection of the class itself as a type, e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"@inject(Foo) foo: Foo"),", then it is exactly the same as ",(0,a.kt)("inlineCode",{parentName:"p"},"foo: Foo"),"."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"@injectable()\nclass Bar {\n  getValue() {\n    return 'bar';\n  }\n}\n\n@injectable()\nclass Foo {\n  getValue() {\n    return 'foo';\n  }\n}\n\n@injectable()\nclass FooBar {\n  constructor(@inject() public bar: Bar, @inject('foo') public foo: Foo) {}\n}\n\nconst fooBar = testBed({\n  modules: [\n   Bar,\n   { provide: 'foo', useClass: Foo },\n  ],\n  main: FooBar,\n});\n\nexpect(fooBar.instance.foo.getValue()).toBe('foo');\n")),(0,a.kt)("h4",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"serviceIdentifierOrFunc?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"ServiceIdentifierOrFunc"),"<",(0,a.kt)("inlineCode",{parentName:"td"},"any"),">")))),(0,a.kt)("h4",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"fn")),(0,a.kt)("p",null,"\u25b8 (",(0,a.kt)("inlineCode",{parentName:"p"},"target"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"key?"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"index?"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"void")),(0,a.kt)("h5",{id:"parameters-1"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"target")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"object"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"key?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"index?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"number"))))),(0,a.kt)("h5",{id:"returns-1"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"void")),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-di/src/decorators/inject.ts#L51"},"packages/reactant-di/src/decorators/inject.ts:51")))}u.isMDXComponent=!0}}]);