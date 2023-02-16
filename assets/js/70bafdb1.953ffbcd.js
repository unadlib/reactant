"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4145],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(7294),a=n(6010);const l="tabItem_Ymn6";function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,o),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>O});var r=n(7462),a=n(7294),l=n(6010),o=n(2466),s=n(6775),i=n(1980),u=n(7392),c=n(12);function p(e){return function(e){return a.Children.map(e,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')}))}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function d(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=null!=t?t:p(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:t,groupId:n});return[(0,i._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=d(e),[o,s]=(0,a.useState)((()=>function(e){var t;let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:r}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+r.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}const a=null!=(t=r.find((e=>e.default)))?t:r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[i,u]=f({queryString:n,groupId:r}),[p,g]=function(e){let{groupId:t}=e;const n=function(e){return e?"docusaurus.tab."+e:null}(t),[r,l]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:r}),b=(()=>{const e=null!=i?i:p;return m({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{b&&s(b)}),[b]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error("Can't select invalid tab value="+e);s(e),u(e),g(e)}),[u,g,l]),tabValues:l}}var b=n(2389);const v="tabList__CuJ",h="tabItem_LNqP";function y(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:p}=(0,o.o5)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),r=u[n].value;r!==s&&(p(t),i(r))},m=e=>{var t;let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{var r;const t=c.indexOf(e.currentTarget)+1;n=null!=(r=c[t])?r:c[0];break}case"ArrowLeft":{var a;const t=c.indexOf(e.currentTarget)-1;n=null!=(a=c[t])?a:c[c.length-1];break}}null==(t=n)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:d},o,{className:(0,l.Z)("tabs__item",h,null==o?void 0:o.className,{"tabs__item--active":s===t})}),null!=n?n:t)})))}function k(e){let{lazy:t,children:n,selectedValue:r}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function w(e){const t=g(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",v)},a.createElement(y,(0,r.Z)({},e,t)),a.createElement(k,(0,r.Z)({},e,t)))}function O(e){const t=(0,b.Z)();return a.createElement(w,(0,r.Z)({key:String(t)},e))}},713:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>u,toc:()=>p});var r=n(7462),a=(n(7294),n(3905)),l=n(4866),o=n(5162);const s={sidebar_position:5},i="Persistence",u={unversionedId:"advanced-guides/persistence",id:"advanced-guides/persistence",title:"Persistence",description:"Reactant provides a plugin for persistence: reactant-storage.",source:"@site/docs/advanced-guides/persistence.md",sourceDirName:"advanced-guides",slug:"/advanced-guides/persistence",permalink:"/docs/advanced-guides/persistence",draft:!1,editUrl:"https://github.com/unadlib/reactant/tree/master/website/docs/advanced-guides/persistence.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"docs",previous:{title:"Routing",permalink:"/docs/advanced-guides/routing"},next:{title:"Dynamic Modules",permalink:"/docs/advanced-guides/dynamic-modules"}},c={},p=[{value:"API",id:"api",level:2},{value:"Installation",id:"installation",level:2},{value:"Example",id:"example",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"persistence"},"Persistence"),(0,a.kt)("p",null,"Reactant provides a plugin for persistence: ",(0,a.kt)("inlineCode",{parentName:"p"},"reactant-storage"),"."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/api/reactant-storage/classes/Storage"},"Storage")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/api/reactant-storage/interfaces/IStorageOptions"},"IStorageOptions"))),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)(l.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install reactant-storage\n"))),(0,a.kt)(o.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add reactant-storage\n")))),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Set config in ",(0,a.kt)("inlineCode",{parentName:"li"},"index.tsx"),":")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { render } from 'reactant-web';\nimport { createApp } from 'reactant';\nimport {\n  StorageOptions,\n  localStorage,\n  IStorageOptions,\n} from 'reactant-storage';\nimport { HomeView } from './views';\n\nconst app = createApp({\n  modules: [\n    {\n      provide: StorageOptions,\n      useValue: {\n        whitelist: [],\n        storage: localStorage,\n        loading: <div>loading</div>,\n      } as IStorageOptions,\n    },\n  ],\n  main: HomeView,\n  render,\n});\n\napp.bootstrap(document.getElementById('app'));\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Module ",(0,a.kt)("inlineCode",{parentName:"li"},"shoppingCart.ts"),":")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { injectable, action, state } from 'reactant';\nimport { Storage } from 'reactant-storage';\n\n@injectable({\n  name: 'shoppingCart',\n})\nclass ShoppingCart {\n  constructor(public storage: Storage) {\n    this.storage.setStorage(this, {\n      whitelist: ['list'],\n    });\n  }\n\n  @state\n  list = [];\n}\n\nexport { ShoppingCart };\n")),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/tree/master/examples/ts-bookstore"},"full example"),"."))}m.isMDXComponent=!0}}]);