"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[152],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(f,i(i({ref:t},s),{},{components:n})):a.createElement(f,i({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},681:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:1},i="Installation",c={unversionedId:"getting-started/installation",id:"getting-started/installation",title:"Installation",description:"We recommend using the reactant-cli to quickly create a brand new Reactant project. See more information about reactant-cli.",source:"@site/docs/getting-started/installation.md",sourceDirName:"getting-started",slug:"/getting-started/installation",permalink:"/docs/getting-started/installation",draft:!1,editUrl:"https://github.com/unadlib/reactant/tree/master/website/docs/getting-started/installation.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/docs/category/getting-started"},next:{title:"Concepts",permalink:"/docs/getting-started/concepts"}},l={},p=[{value:"Using reactant-cli",id:"using-reactant-cli",level:2},{value:"Customize the creation of an Reactant project",id:"customize-the-creation-of-an-reactant-project",level:2}],s={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"installation"},"Installation"),(0,r.kt)("p",null,"We recommend using the reactant-cli to quickly create a brand new Reactant project. See more information about ",(0,r.kt)("a",{parentName:"p",href:"#"},"reactant-cli"),"."),(0,r.kt)("h2",{id:"using-reactant-cli"},"Using reactant-cli"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx reactant-cli init my-app # default use TypeScript\n# use `npx reactant-cli init my-app --language javascript` for creating a Javascript project.\ncd my-app\nyarn start\n")),(0,r.kt)("h2",{id:"customize-the-creation-of-an-reactant-project"},"Customize the creation of an Reactant project"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If you've already created your project using reactant-cli, please skip this section.")),(0,r.kt)("p",null,"If you need to customize to create Reactant project, then you can do the following steps:"),(0,r.kt)("p",null,"First, build a React project and you can visit ",(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/create-a-new-react-app.html"},"here")," for more information."),(0,r.kt)("p",null,"then install Reactant dependencies:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add reactant reactant-web\n")),(0,r.kt)("p",null,"And set up the following related configuration."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If using JavaScript, make sure you have ",(0,r.kt)("inlineCode",{parentName:"p"},"@babel/plugin-propose-decorators")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"@babel/plugin-propose-class-properties")," installed and configured for Babel.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If using TypeScript, make sure to enable ",(0,r.kt)("inlineCode",{parentName:"p"},"experimentalDecorators")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"emitDecoratorMetadata")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"tsconfig.json"),".")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If using TypeScript with Babel, you can install ",(0,r.kt)("inlineCode",{parentName:"p"},"babel-plugin-transform-typescript-metadata")," for supporting TypeScript metadata with dependency injection, and set the babel configuration about it.")))}u.isMDXComponent=!0}}]);