"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4623],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>b});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),u=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},i="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),i=u(a),m=r,b=i["".concat(c,".").concat(m)]||i[m]||d[m]||l;return a?n.createElement(b,o(o({ref:t},s),{},{components:a})):n.createElement(b,o({ref:t},s))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[i]="string"==typeof e?e:r,o[1]=p;for(var u=2;u<l;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},5162:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(7294),r=a(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>N});var n=a(3117),r=a(7294),l=a(6010),o=a(2466),p=a(6550),c=a(1980),u=a(7392),s=a(12);function i(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}function d(e){const{values:t,children:a}=e;return(0,r.useMemo)((()=>{const e=t??i(a);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:a}=e;const n=(0,p.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,c._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function g(e){const{defaultValue:t,queryString:a=!1,groupId:n}=e,l=d(e),[o,p]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[c,u]=b({queryString:a,groupId:n}),[i,g]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,s.Nk)(a);return[n,(0,r.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:n}),f=(()=>{const e=c??i;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{f&&p(f)}),[f]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);p(e),u(e),g(e)}),[u,g,l]),tabValues:l}}var f=a(2389);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){let{className:t,block:a,selectedValue:p,selectValue:c,tabValues:u}=e;const s=[],{blockElementScrollPositionUntilNextRender:i}=(0,o.o5)(),d=e=>{const t=e.currentTarget,a=s.indexOf(t),n=u[a].value;n!==p&&(i(t),c(n))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const a=s.indexOf(e.currentTarget)+1;t=s[a]??s[0];break}case"ArrowLeft":{const a=s.indexOf(e.currentTarget)-1;t=s[a]??s[s.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:p===t?0:-1,"aria-selected":p===t,key:t,ref:e=>s.push(e),onKeyDown:m,onClick:d},o,{className:(0,l.Z)("tabs__item",h.tabItem,o?.className,{"tabs__item--active":p===t})}),a??t)})))}function y(e){let{lazy:t,children:a,selectedValue:n}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function v(e){const t=g(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",h.tabList)},r.createElement(k,(0,n.Z)({},e,t)),r.createElement(y,(0,n.Z)({},e,t)))}function N(e){const t=(0,f.Z)();return r.createElement(v,(0,n.Z)({key:String(t)},e))}},8419:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>b,frontMatter:()=>p,metadata:()=>u,toc:()=>i});var n=a(3117),r=(a(7294),a(3905)),l=a(4866),o=a(5162);const p={sidebar_position:3},c="Using create-react-app",u={unversionedId:"getting-started/using-create-react-app",id:"getting-started/using-create-react-app",title:"Using create-react-app",description:"If you use the create-react-app, after completing it perform the following steps:",source:"@site/docs/getting-started/using-create-react-app.md",sourceDirName:"getting-started",slug:"/getting-started/using-create-react-app",permalink:"/docs/getting-started/using-create-react-app",draft:!1,editUrl:"https://github.com/unadlib/reactant/tree/master/website/docs/getting-started/using-create-react-app.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docs",previous:{title:"Concepts",permalink:"/docs/getting-started/concepts"},next:{title:"Using react-native",permalink:"/docs/getting-started/react-native-cli"}},s={},i=[{value:"Create app with <code>create-react-app</code>",id:"create-app-with-create-react-app",level:2},{value:"Eject project",id:"eject-project",level:2},{value:"Install Reactant",id:"install-reactant",level:2},{value:"Add the babel configuration",id:"add-the-babel-configuration",level:2},{value:"Add the example code with JavaScript",id:"add-the-example-code-with-javascript",level:2},{value:"Run the app",id:"run-the-app",level:2}],d={toc:i},m="wrapper";function b(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"using-create-react-app"},"Using create-react-app"),(0,r.kt)("p",null,"If you use the ",(0,r.kt)("inlineCode",{parentName:"p"},"create-react-app"),", after completing it perform the following steps:"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The following documents all use ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn")," as an example, if you are using ",(0,r.kt)("inlineCode",{parentName:"p"},"npm"),", then please refer to the same ",(0,r.kt)("inlineCode",{parentName:"p"},"npm")," command.")),(0,r.kt)("h2",{id:"create-app-with-create-react-app"},"Create app with ",(0,r.kt)("inlineCode",{parentName:"h2"},"create-react-app")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-react-app my-app\ncd my-app\n")),(0,r.kt)("h2",{id:"eject-project"},"Eject project"),(0,r.kt)("p",null,"Because ",(0,r.kt)("inlineCode",{parentName:"p"},"create-react-app")," uses ",(0,r.kt)("inlineCode",{parentName:"p"},"react-scripts")," CLI by default, it needs to be ejected."),(0,r.kt)(l.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm run eject\n"))),(0,r.kt)(o.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn eject\n"))),(0,r.kt)(o.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm run eject\n")))),(0,r.kt)("h2",{id:"install-reactant"},"Install Reactant"),(0,r.kt)("p",null,"You need to install ",(0,r.kt)("inlineCode",{parentName:"p"},"reactant"),"(Core API) and ",(0,r.kt)("inlineCode",{parentName:"p"},"reactant-web"),"(for Web API)."),(0,r.kt)(l.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install reactant reactant-web\n"))),(0,r.kt)(o.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add reactant reactant-web\n"))),(0,r.kt)(o.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add reactant reactant-web\n")))),(0,r.kt)("h2",{id:"add-the-babel-configuration"},"Add the babel configuration"),(0,r.kt)("p",null,"Reactant development need ",(0,r.kt)("inlineCode",{parentName:"p"},"@babel/plugin-proposal-decorators")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"@babel/plugin-proposal-class-properties"),". If you find that they are not installed, you need to install them:"),(0,r.kt)(l.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties\n"))),(0,r.kt)(o.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add --dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties\n"))),(0,r.kt)(o.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties\n")))),(0,r.kt)("p",null,"And then add babel config in ",(0,r.kt)("inlineCode",{parentName:"p"},"package.json"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "presets": [\n    "react-app"\n  ],\n  "plugins": [\n    ["@babel/plugin-proposal-decorators", { "legacy": true }],\n    ["@babel/plugin-proposal-class-properties", { "loose" : true }]\n  ]\n}\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If using ",(0,r.kt)("inlineCode",{parentName:"p"},"create-react-app")," with TypeScript template, you can install ",(0,r.kt)("inlineCode",{parentName:"p"},"babel-plugin-transform-typescript-metadata")," for supporting TypeScript metadata with dependency injection, and set the babel configuration about it.")),(0,r.kt)("h2",{id:"add-the-example-code-with-javascript"},"Add the example code with JavaScript"),(0,r.kt)("p",null,"Change the code of the ",(0,r.kt)("inlineCode",{parentName:"p"},"src/index.js")," file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport { render } from 'reactant-web';\nimport {\n  ViewModule,\n  createApp,\n  injectable,\n  useConnector,\n  action,\n  state,\n} from 'reactant';\n\n@injectable()\nclass Counter {\n  @state\n  count = 0;\n\n  @action\n  increase() {\n    this.count += 1;\n  }\n\n  @action\n  decrease() {\n    this.count -= 1;\n  }\n}\n\n@injectable({\n  deps: [Counter],\n})\nclass AppView extends ViewModule {\n  constructor(counter) {\n    super();\n    this.counter = counter;\n  }\n\n  component() {\n    const count = useConnector(() => this.counter.count);\n    return (\n      <>\n        <button type=\"button\" onClick={() => this.counter.decrease()}>\n          -\n        </button>\n        <div>{count}</div>\n        <button type=\"button\" onClick={() => this.counter.increase()}>\n          +\n        </button>\n      </>\n    );\n  }\n}\n\nconst app = createApp({\n  main: AppView,\n  render,\n});\n\napp.bootstrap(document.getElementById('root'));\n")),(0,r.kt)("h2",{id:"run-the-app"},"Run the app"),(0,r.kt)(l.Z,{groupId:"npm2yarn",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"npm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install start\n"))),(0,r.kt)(o.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add start\n"))),(0,r.kt)(o.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add start\n")))),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note: If you need to create files quickly, you can visit ",(0,r.kt)("a",{parentName:"p",href:"/docs/tooling/cli"},"reactant-cli")," for more information.")))}b.isMDXComponent=!0}}]);