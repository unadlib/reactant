"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2194],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=d(n),u=r,k=m["".concat(o,".").concat(u)]||m[u]||s[u]||i;return n?a.createElement(k,p(p({ref:t},c),{},{components:n})):a.createElement(k,p({ref:t},c))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,p=new Array(i);p[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[m]="string"==typeof e?e:r,p[1]=l;for(var d=2;d<i;d++)p[d]=n[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},25:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=n(3117),r=(n(7294),n(3905));const i={id:"createApp",title:"Module: createApp",sidebar_label:"createApp",sidebar_position:0,custom_edit_url:null},p=void 0,l={unversionedId:"api/reactant/modules/createApp",id:"api/reactant/modules/createApp",title:"Module: createApp",description:"Variables",source:"@site/docs/api/reactant/modules/createApp.md",sourceDirName:"api/reactant/modules",slug:"/api/reactant/modules/createApp",permalink:"/docs/api/reactant/modules/createApp",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"createApp",title:"Module: createApp",sidebar_label:"createApp",sidebar_position:0,custom_edit_url:null},sidebar:"api",next:{title:"hooks/useConnector",permalink:"/docs/api/reactant/modules/hooks_useConnector"}},o={},d=[{value:"Variables",id:"variables",level:2},{value:"ContainerContext",id:"containercontext",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"Functions",id:"functions",level:2},{value:"createApp",id:"createapp",level:3},{value:"Description",id:"description",level:2},{value:"Example",id:"example",level:2},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-1",level:4}],c={toc:d},m="wrapper";function s(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"variables"},"Variables"),(0,r.kt)("h3",{id:"containercontext"},"ContainerContext"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"ContainerContext"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"Context"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Container")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),">"),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/createApp.tsx#L24"},"createApp.tsx:24")),(0,r.kt)("h2",{id:"functions"},"Functions"),(0,r.kt)("h3",{id:"createapp"},"createApp"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"createApp"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"S"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">","(",(0,r.kt)("inlineCode",{parentName:"p"},"__namedParameters"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"App"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"S"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"You can create an app with ",(0,r.kt)("inlineCode",{parentName:"p"},"createApp()")," passing app configuration,\nwhich will return an object including ",(0,r.kt)("inlineCode",{parentName:"p"},"instance"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"store"),",\nand ",(0,r.kt)("inlineCode",{parentName:"p"},"bootstrap()")," method(You can run ",(0,r.kt)("inlineCode",{parentName:"p"},"bootstrap")," to start the app inject into the browser or mobile)."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"import { createApp, injectable } from 'reactant';\n\n@injectable()\nclass Foo {}\n\nconst app = createApp({\n  modules: [],\n  main: Foo,\n  render: () => {},\n});\n\nexpect(app.instance instanceof Foo).toBeTruthy();\n")),(0,r.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"S")),(0,r.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),"[]")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"R")),(0,r.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,r.kt)("inlineCode",{parentName:"td"},"Renderer"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"S"),">")))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"__namedParameters")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Config"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"T"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"S"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"R"),">")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"App"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"S"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/f66dad8a/packages/reactant/src/createApp.tsx#L51"},"createApp.tsx:51")))}s.isMDXComponent=!0}}]);