"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9127],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(a),m=r,f=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return a?n.createElement(f,o(o({ref:t},d),{},{components:a})):n.createElement(f,o({ref:t},d))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},7550:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={id:"index",title:"reactant-storage",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null},o=void 0,l={unversionedId:"api/reactant-storage/index",id:"api/reactant-storage/index",title:"reactant-storage",description:"Classes",source:"@site/docs/api/reactant-storage/index.md",sourceDirName:"api/reactant-storage",slug:"/api/reactant-storage/",permalink:"/docs/api/reactant-storage/",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"index",title:"reactant-storage",sidebar_label:"Exports",sidebar_position:.5,custom_edit_url:null}},s={},p=[{value:"Classes",id:"classes",level:2},{value:"Interfaces",id:"interfaces",level:2},{value:"Type Aliases",id:"type-aliases",level:2},{value:"SetStorageOptions",id:"setstorageoptions",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Variables",id:"variables",level:2},{value:"REHYDRATE",id:"rehydrate",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"StorageOptions",id:"storageoptions",level:3},{value:"Defined in",id:"defined-in-2",level:4}],d={toc:p};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"classes"},"Classes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/api/reactant-storage/classes/Storage"},"Storage"))),(0,r.kt)("h2",{id:"interfaces"},"Interfaces"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/api/reactant-storage/interfaces/IStorageOptions"},"IStorageOptions"))),(0,r.kt)("h2",{id:"type-aliases"},"Type Aliases"),(0,r.kt)("h3",{id:"setstorageoptions"},"SetStorageOptions"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"SetStorageOptions"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"T"),">",": ",(0,r.kt)("inlineCode",{parentName:"p"},"Pick"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"Partial"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"PersistConfig"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"any"),">",">",", ",(0,r.kt)("inlineCode",{parentName:"p"},"Exclude"),"<keyof ",(0,r.kt)("inlineCode",{parentName:"p"},"PersistConfig"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"any"),">",", ",(0,r.kt)("inlineCode",{parentName:"p"},'"key"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"blacklist"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"whitelist"'),">",">"," & { ",(0,r.kt)("inlineCode",{parentName:"p"},"blacklist?"),": keyof ",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[] ; ",(0,r.kt)("inlineCode",{parentName:"p"},"whitelist?"),": keyof ",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"[]  }"),(0,r.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"T"))))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/30b550e1/packages/reactant-storage/src/storage.tsx#L36"},"packages/reactant-storage/src/storage.tsx:36")),(0,r.kt)("h2",{id:"variables"},"Variables"),(0,r.kt)("h3",{id:"rehydrate"},"REHYDRATE"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"REHYDRATE"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"persist/REHYDRATE"')),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,"node_modules/redux-persist/types/constants.d.ts:4"),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"storageoptions"},"StorageOptions"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"StorageOptions"),": typeof ",(0,r.kt)("a",{parentName:"p",href:"#storageoptions"},(0,r.kt)("inlineCode",{parentName:"a"},"StorageOptions"))),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/unadlib/reactant/blob/30b550e1/packages/reactant-storage/src/storage.tsx#L23"},"packages/reactant-storage/src/storage.tsx:23")))}c.isMDXComponent=!0}}]);