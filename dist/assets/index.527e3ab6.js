import{o as e,h as t,b as o,_ as i,d as n,t as l,E as s,i as a,l as y,B as r,u as c,F as p,c as u,q as k,p as d,w as v,z as f,H as m,g as x,j as g,U as $,r as A,f as _,A as z,a as h,M as C,C as b,D as w}from"./index.67e61dfc.js";import{_ as I}from"./index.6c1e0c2c.js";const q={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},B=[o("path",{fill:"currentColor",d:"M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"},null,-1)];var j={name:"ant-design-caret-down-filled",render:function(o,i){return e(),t("svg",q,B)}};const U={class:"inner-btn-area"},E={key:0},O={style:{padding:"0 2px"}},S={class:"row"},H={style:{padding:"0 2px"}};var L=i(n({__name:"ButtonContent",props:{item:{type:null,required:!0},sizeCom:{type:null,required:!0},type:{type:[String,null],required:!1},more:{type:Boolean,required:!1}},setup(i){const n=i,{item:f,sizeCom:m,type:x,more:g}=l(n),$=s();function A(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return(i,n)=>{const l=I,s=a("a-button");return e(),t("div",U,[y(i.$slots,`${c(f).key}B`,r({size:c(m),type:c(x)||c(f).type},{...c($),...c(f)?.attr},{onClick:n[0]||(n[0]=(...e)=>c($)[`on${A(c(f).key)}`]&&c($)[`on${A(c(f).key)}`](...e))}),void 0,!0),c(g)?(e(),t("div",E,[y(i.$slots,`${c(f).key}IB`,{},(()=>[c(f).icon?(e(),t(p,{key:0},["string"==typeof c(f).icon?(e(),u(l,{key:0,icon:c(f).icon},null,8,["icon"])):(e(),u(l,r({key:1,icon:c(f).icon.key},c(f).icon),null,16,["icon"]))],64)):k("v-if",!0)]),!0),o("span",O,d(c(f).text),1),y(i.$slots,`${c(f).key}IA`,{},(()=>[c(f).iconA?(e(),t(p,{key:0},["string"==typeof c(f).iconA?(e(),u(l,{key:0,icon:c(f).iconA},null,8,["icon"])):(e(),u(l,r({key:1,icon:c(f).iconA.key},c(f).iconA),null,16,["icon"]))],64)):k("v-if",!0)]),!0)])):c(f).show?(e(),u(s,r({size:c(m),key:c(f).key,type:c(f).type},{...c($),...c(f)?.attr},{onClick:c($)[`on${A(c(f).key)}`]}),{default:v((()=>[o("span",S,[y(i.$slots,`${c(f).key}IB`,{},(()=>[c(f).icon?(e(),t(p,{key:0},["string"==typeof c(f).icon?(e(),u(l,{key:0,icon:c(f).icon},null,8,["icon"])):(e(),u(l,r({key:1,icon:c(f).icon.key},c(f).icon),null,16,["icon"]))],64)):k("v-if",!0)]),!0),o("span",H,d(c(f).text),1),y(i.$slots,`${c(f).key}IA`,{},(()=>[c(f).iconA?(e(),t(p,{key:0},["string"==typeof c(f).iconA?(e(),u(l,{key:0,icon:c(f).iconA},null,8,["icon"])):(e(),u(l,r({key:1,icon:c(f).iconA.key},c(f).iconA),null,16,["icon"]))],64)):k("v-if",!0)]),!0)])])),_:3},16,["size","type","onClick"])):k("v-if",!0),y(i.$slots,`${c(f).key}A`,r({size:c(m),type:c(x)||c(f).type},{...c($),...c(f)?.attr}),void 0,!0)])}}}),[["__scopeId","data-v-9f3cf8d0"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/Button/ButtonContent.vue"]]);const M={class:"button-group flex"},D={class:"interval"},F={key:0,style:{color:"#dcdee0"}},N={style:{padding:"0 2px"}},G={class:"interval"},J={key:0,style:{color:"#dcdee0"}},K={style:{padding:"0 2px"}};var P=i(n({__name:"index",props:{size:{type:String,required:!1,default:void 0},type:{type:String,required:!1},setup:{type:Object,required:!1},more:{type:Object,required:!1},len:{type:Number,required:!1},order:{type:Array,required:!1,default:()=>[]},width:{type:String,required:!1},space:{type:Object,required:!1,default:()=>({})}},setup(i){const n=i;f((e=>({"0a69bf23-width":c(H)})));const q=s(),B=m(),{size:U,type:E,setup:O,order:S,width:H,len:P,more:Q,space:R}=l(n),T=x((()=>({text:"...",...Q?.value?Q?.value:{}}))),V=x((()=>P?.value||0===P?.value?P.value:"link"===E?.value?4:30)),W=x((()=>"link"!==E?.value||U.value?U.value:"small")),X=x((()=>O&&O.value?Object.entries(O.value).map((([e,t])=>({key:e,...t}))):[])),Y=g({show:!0}),Z=g([{key:"add",text:"添加",type:"primary",attr:{},icon:{key:"pure-operation-add"}},{key:"look",text:"查看",type:"primary",attr:{class:"look"}},{key:"clone",text:"克隆",type:"primary"},{key:"edit",text:"修改"},{key:"disable",text:"禁用",type:"primary"},{key:"enable",text:"启用",type:"primary"},{key:"delList",text:"批量删除",attr:{},icon:{key:"pure-delete"}},{key:"del",text:"删除",attr:{}},{key:"downEx",text:"下载模板",type:"dashed",attr:{}},{key:"downInstance",text:"下载示例",attr:{}},{key:"import",text:"导入",attr:{},icon:{key:"pure-operation-import"}},{key:"export",text:"导出",attr:{},icon:{key:"pure-operation-derive"}},{key:"save",text:"保存",type:"primary",attr:{}},{key:"search",text:"查询",type:"primary",attr:{}},{key:"reset",text:"重置",attr:{}},{key:"cancel",text:"取消",attr:{}},{key:"submit",text:"提交",type:"primary",attr:{}}]),ee=x((()=>E?.value?{type:E.value}:{}));Z.forEach((e=>{$(e,Y,ee.value)}));const te=A([...Z]),oe=x((()=>te.value.filter((e=>q[`on${le(e.key)}`])))),ie=x((()=>oe.value.slice(0,V.value).filter((e=>e.show)))),ne=x((()=>oe.value.slice(V.value).filter((e=>e.show))));function le(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return _((()=>X.value),(e=>{e.forEach((e=>{const t=te.value.find((t=>t.key===e.key));t?$(t,Y,ee.value,e):te.value.push($({},Y,ee.value,e))}));const t=x((()=>S.value.filter((e=>te.value.findIndex((t=>e===t.key))>=0))));for(let o=0;o<t.value.length;o++){const e=te.value.findIndex((e=>e.key===t.value[t.value.length-1-(o+1)])),i=te.value.findIndex((e=>e.key===t.value[t.value.length-1-o]));e>=0&&i>=0&&e-i>0&&te.value.splice(i,0,...te.value.splice(e,1))}}),{immediate:!0,deep:!0}),(i,n)=>{const l=I,s=j,f=a("a-button"),m=a("a-menu-item"),x=a("a-menu"),g=a("a-dropdown"),$=a("a-space");return e(),t("div",M,[c(H)?(e(),t(p,{key:1},[(e(!0),t(p,null,z(c(ie),(n=>(e(),t(p,{key:n.key},[h(L,r(c(q),{item:n,sizeCom:c(W),type:c(E)}),C({_:2},[z(c(B),((e,t)=>({name:t,fn:v((e=>[y(i.$slots,t,b(w(e)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),o("span",G,[y(i.$slots,"interval",r({size:c(W),key:n.key,type:c(E)||n.type},{...c(q),...n?.attr}),(()=>["link"===c(E)?(e(),t("span",J,"|")):k("v-if",!0)]),!0)])],64)))),128)),c(ne).length>0?(e(),u(g,{key:0,trigger:["click","hover"],class:"more"},{overlay:v((()=>[h(x,null,{default:v((()=>[(e(!0),t(p,null,z(c(ne),(t=>(e(),u(m,{key:t.key,onClick:c(q)[`on${le(t.key)}`]},{default:v((()=>[h(L,{item:t,sizeCom:c(W),type:c(E),more:!0},C({_:2},[z(c(B),((e,t)=>({name:t,fn:v((e=>[y(i.$slots,t,b(w(e)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1032,["onClick"])))),128))])),_:3})])),default:v((()=>[y(i.$slots,"more",{},(()=>[h(f,r({size:c(W),type:c(E)},{...c(q)}),{default:v((()=>[y(i.$slots,"moreIB",{},(()=>[c(T).icon?(e(),t(p,{key:0},["string"==typeof c(T).icon?(e(),u(l,{key:0,icon:c(T).icon},null,8,["icon"])):"object"==typeof c(T).icon?(e(),u(l,r({key:1,icon:c(T).icon?.key},c(T).icon),null,16,["icon"])):k("v-if",!0)],64)):k("v-if",!0)]),!0),o("span",K,d(c(T).text),1),y(i.$slots,"moreIA",{},(()=>[c(T).iconA?(e(),t(p,{key:0},["string"==typeof c(T).iconA?(e(),u(l,{key:0,icon:c(T).iconA},null,8,["icon"])):"object"==typeof c(T).iconA?(e(),u(l,r({key:1,icon:c(T).iconA.key},c(T).iconA),null,16,["icon"])):k("v-if",!0)],64)):!1!==c(T).iconA?(e(),u(s,{key:1})):k("v-if",!0)]),!0)])),_:3},16,["size","type"])]),!0)])),_:3})):k("v-if",!0),y(i.$slots,"default",r({size:c(W),type:c(E)},{...c(q)}),void 0,!0)],64)):(e(),u($,r({key:0,size:"link"===c(E)?1:5},c(R),{class:"space"}),{default:v((()=>[(e(!0),t(p,null,z(c(ie),(n=>(e(),t(p,{key:n.key},[h(L,r(c(q),{item:n,sizeCom:c(W),type:c(E)}),C({_:2},[z(c(B),((e,t)=>({name:t,fn:v((e=>[y(i.$slots,t,b(w(e)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),o("span",D,[y(i.$slots,"interval",r({size:c(W),key:n.key,type:c(E)||n.type},{...c(q),...n?.attr}),(()=>["link"===c(E)?(e(),t("span",F,"|")):k("v-if",!0)]),!0)])],64)))),128)),c(ne).length>0?(e(),u(g,{key:0,trigger:["click","hover"],class:"more"},{overlay:v((()=>[h(x,null,{default:v((()=>[(e(!0),t(p,null,z(c(ne),(t=>(e(),u(m,{key:t.key,onClick:c(q)[`on${le(t.key)}`]},{default:v((()=>[h(L,{item:t,sizeCom:c(W),type:c(E),more:!0},C({_:2},[z(c(B),((e,t)=>({name:t,fn:v((e=>[y(i.$slots,t,b(w(e)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1032,["onClick"])))),128))])),_:3})])),default:v((()=>[y(i.$slots,"more",{},(()=>[h(f,r({size:c(W),type:c(E)},{...c(q)}),{default:v((()=>[y(i.$slots,"moreIB",{},(()=>[c(T).icon?(e(),t(p,{key:0},["string"==typeof c(T).icon?(e(),u(l,{key:0,icon:c(T).icon},null,8,["icon"])):"object"==typeof c(T).icon?(e(),u(l,r({key:1,icon:c(T).icon?.key},c(T).icon),null,16,["icon"])):k("v-if",!0)],64)):k("v-if",!0)]),!0),o("span",N,d(c(T).text),1),y(i.$slots,"moreIA",{},(()=>[c(T).iconA?(e(),t(p,{key:0},["string"==typeof c(T).iconA?(e(),u(l,{key:0,icon:c(T).iconA},null,8,["icon"])):"object"==typeof c(T).iconA?(e(),u(l,r({key:1,icon:c(T).iconA.key},c(T).iconA),null,16,["icon"])):k("v-if",!0)],64)):!1!==c(T).iconA?(e(),u(s,{key:1})):k("v-if",!0)]),!0)])),_:3},16,["size","type"])]),!0)])),_:3})):k("v-if",!0),y(i.$slots,"default",r({size:c(W),type:c(E)},{...c(q)}),void 0,!0)])),_:3},16,["size"]))])}}}),[["__scopeId","data-v-0a69bf23"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/Button/index.vue"]]);export{P as _};