"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1699],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=d(n),k=r,u=m["".concat(l,".").concat(k)]||m[k]||c[k]||i;return n?a.createElement(u,p(p({ref:t},s),{},{components:n})):a.createElement(u,p({ref:t},s))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,p=new Array(i);p[0]=k;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[m]="string"==typeof e?e:r,p[1]=o;for(var d=2;d<i;d++)p[d]=n[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},1906:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var a=n(3117),r=(n(7294),n(3905));const i={id:"spawn",title:"Module: spawn",sidebar_label:"spawn",sidebar_position:0,custom_edit_url:null},p=void 0,o={unversionedId:"api/reactant-share/modules/spawn",id:"api/reactant-share/modules/spawn",title:"Module: spawn",description:"Functions",source:"@site/docs/api/reactant-share/modules/spawn.md",sourceDirName:"api/reactant-share/modules",slug:"/api/reactant-share/modules/spawn",permalink:"/docs/api/reactant-share/modules/spawn",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"spawn",title:"Module: spawn",sidebar_label:"spawn",sidebar_position:0,custom_edit_url:null},sidebar:"api",previous:{title:"PortDetector",permalink:"/docs/api/reactant-share/classes/portDetector.PortDetector"},next:{title:"fork",permalink:"/docs/api/reactant-share/modules/fork"}},l={},d=[{value:"Functions",id:"functions",level:2},{value:"spawn",id:"spawn",level:3},{value:"Description",id:"description",level:2},{value:"Example",id:"example",level:2},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4}],s={toc:d},m="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"functions"},"Functions"),(0,r.kt)("h3",{id:"spawn"},"spawn"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"spawn"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"K"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"O"),">","(",(0,r.kt)("inlineCode",{parentName:"p"},"module"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"key"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"args"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"options?"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"O")," extends ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," ? ",(0,r.kt)("inlineCode",{parentName:"p"},"void")," : ",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[",(0,r.kt)("inlineCode",{parentName:"p"},"K"),"]",">"," extends ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"," ? ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"," : ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[",(0,r.kt)("inlineCode",{parentName:"p"},"K"),"]",">",">"),(0,r.kt)("p",null,"Proxy execute On the server side."),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"spawn()")," is very similar to the actor model,\nwhich transfers the corresponding module method to the server thread for execution and returns the result as response."),(0,r.kt)("p",null,"Note: It does not create new threads, it always runs on the server thread that has already been created."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport { ViewModule, createApp, injectable, useConnector, action, state, spawn } from 'reactant-share';\n\n@injectable({ name: 'counter'})\nclass Counter {\n  @state\n  count = 0;\n\n  @action\n  increase() {\n    this.count += 1;\n  }\n}\n\n@injectable()\nexport class AppView extends ViewModule {\n  constructor(public counter: Counter) {\n    super();\n  }\n\n  component() {\n    const count = useConnector(() => this.counter.count);\n    return (\n      <button type=\"button\" onClick={() => spawn(this.counter, 'increase', [])}>\n        {count}\n      </button>\n    );\n  }\n}\n")),(0,r.kt)("p",null,"reference: ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Actor_model"},"https://en.wikipedia.org/wiki/Actor_model")),(0,r.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T")),(0,r.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,r.kt)("inlineCode",{parentName:"td"},"Record"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"number")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"symbol"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"any"),">")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"K")),(0,r.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"number")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"symbol"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"O")),(0,r.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,r.kt)("inlineCode",{parentName:"td"},"undefined")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"boolean"))))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"module")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Designate an execution module from the server side.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"key")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"K")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Specify the name of a method in this module.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"args")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Parameters"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"T"),"[",(0,r.kt)("inlineCode",{parentName:"td"},"K"),"]",">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Pass in the parameters for this method.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"options?")),(0,r.kt)("td",{parentName:"tr",align:"left"},"{ ",(0,r.kt)("inlineCode",{parentName:"td"},"clientIds?"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string"),"[] ; ",(0,r.kt)("inlineCode",{parentName:"td"},"portName?"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"string")," ; ",(0,r.kt)("inlineCode",{parentName:"td"},"respond?"),": ",(0,r.kt)("inlineCode",{parentName:"td"},"O"),"  } & ",(0,r.kt)("inlineCode",{parentName:"td"},"Pick"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"EmitParameter"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"any"),">",", ",(0,r.kt)("inlineCode",{parentName:"td"},'"timeout"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"_extra"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"silent"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},'"skipBeforeEmit"'),">"),(0,r.kt)("td",{parentName:"tr",align:"left"},"proxy execution options")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"O")," extends ",(0,r.kt)("inlineCode",{parentName:"p"},"false")," ? ",(0,r.kt)("inlineCode",{parentName:"p"},"void")," : ",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[",(0,r.kt)("inlineCode",{parentName:"p"},"K"),"]",">"," extends ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"," ? ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"R"),">"," : ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[",(0,r.kt)("inlineCode",{parentName:"p"},"K"),"]",">",">"),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/f385c7b0/packages/reactant-share/src/interfaces.ts#L209"},"interfaces.ts:209")))}c.isMDXComponent=!0}}]);