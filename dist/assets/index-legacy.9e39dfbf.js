System.register(["./index-legacy.170ed1ea.js","./index-legacy.968eda31.js","./index.vue_vue_type_style_index_1_scoped_true_lang-legacy.f8b1f0b2.js"],(function(e){"use strict";var t,n,o,i,l,r,a,s,y,c,u,p,d,k,v,m,f,x,_,g,$,A,b,z,C,h,w,I,q,j,B;return{setters:[function(e){t=e._,n=e.a},function(e){o=e._,i=e.d,l=e.t,r=e.E,a=e.i,s=e.o,y=e.h,c=e.l,u=e.B,p=e.u,d=e.F,k=e.c,v=e.q,m=e.b,f=e.p,x=e.w,_=e.z,g=e.H,$=e.g,A=e.j,b=e.U,z=e.r,C=e.f,h=e.A,w=e.a,I=e.M,q=e.C,j=e.D,B=e.m},function(){}],execute:function(){const F={class:"inner-btn-area"},S={key:0,class:"inner-btn-area"},U={style:{padding:"0 2px"}},N={class:"row"},E={style:{padding:"0 2px"}},O=i({__name:"ButtonContent",props:{item:{type:null,required:!0},sizeCom:{type:null,required:!0},type:{type:[String,null],required:!1},more:{type:Boolean,required:!1}},setup(e){const n=e,{item:o,sizeCom:i,type:_,more:g}=l(n),$=r();function A(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return(e,n)=>{var l,r,b;const z=t,C=a("a-button");return s(),y("div",F,[c(e.$slots,`${p(o).key}B`,u({size:p(i),type:p(_)||p(o).type},{...p($),...null===(l=p(o))||void 0===l?void 0:l.attr},{onClick:n[0]||(n[0]=(...e)=>p($)[`on${A(p(o).key)}`]&&p($)[`on${A(p(o).key)}`](...e))}),void 0,!0),p(g)?(s(),y("div",S,[c(e.$slots,`${p(o).key}IB`,{},(()=>[p(o).icon?(s(),y(d,{key:0},["string"==typeof p(o).icon?(s(),k(z,{key:0,icon:p(o).icon},null,8,["icon"])):(s(),k(z,u({key:1,icon:p(o).icon.key},p(o).icon),null,16,["icon"]))],64)):v("v-if",!0)]),!0),m("span",U,f(p(o).text),1),c(e.$slots,`${p(o).key}IA`,{},(()=>[p(o).iconA?(s(),y(d,{key:0},["string"==typeof p(o).iconA?(s(),k(z,{key:0,icon:p(o).iconA},null,8,["icon"])):(s(),k(z,u({key:1,icon:p(o).iconA.key},p(o).iconA),null,16,["icon"]))],64)):v("v-if",!0)]),!0)])):p(o).show?(s(),k(C,u({size:p(i),key:p(o).key,type:p(o).type},{...p($),...null===(r=p(o))||void 0===r?void 0:r.attr},{onClick:p($)[`on${A(p(o).key)}`]}),{default:x((()=>[m("span",N,[c(e.$slots,`${p(o).key}IB`,{},(()=>[p(o).icon?(s(),y(d,{key:0},["string"==typeof p(o).icon?(s(),k(z,{key:0,icon:p(o).icon},null,8,["icon"])):(s(),k(z,u({key:1,icon:p(o).icon.key},p(o).icon),null,16,["icon"]))],64)):v("v-if",!0)]),!0),m("span",E,f(p(o).text),1),c(e.$slots,`${p(o).key}IA`,{},(()=>[p(o).iconA?(s(),y(d,{key:0},["string"==typeof p(o).iconA?(s(),k(z,{key:0,icon:p(o).iconA},null,8,["icon"])):(s(),k(z,u({key:1,icon:p(o).iconA.key},p(o).iconA),null,16,["icon"]))],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type","onClick"])):v("v-if",!0),c(e.$slots,`${p(o).key}A`,u({size:p(i),type:p(_)||p(o).type},{...p($),...null===(b=p(o))||void 0===b?void 0:b.attr}),void 0,!0)])}}});var D=o(O,[["__scopeId","data-v-7c5c32d6"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SButtonGroup/ButtonContent.vue"]]);const G={class:"button-group flex"},H={class:"interval"},L={key:0,style:{color:"#dcdee0"}},M={class:"more-btn-inner"},J={class:"more-text"},K={class:"interval"},P={key:0,style:{color:"#dcdee0"}},Q={class:"more-btn-inner"},R={class:"more-text"};e("_",o(i({__name:"index",props:{size:{type:String,required:!1,default:void 0},type:{type:String,required:!1},setup:{type:Object,required:!1},more:{type:Object,required:!1},len:{type:Number,required:!1},order:{type:Array,required:!1,default:()=>[]},width:{type:String,required:!1},space:{type:Object,required:!1,default:()=>({})}},setup(e){const o=e;_((e=>({"09576f20-width":p(O)})));const i=r(),F=g(),{size:S,type:U,setup:N,order:E,width:O,len:T,more:V,space:W}=l(o),X=$((()=>({text:"",...null!=V&&V.value?null==V?void 0:V.value:{}}))),Y=$((()=>null!=T&&T.value||0===(null==T?void 0:T.value)?T.value:"link"===(null==U?void 0:U.value)?4:30)),Z=$((()=>"link"!==(null==U?void 0:U.value)||S.value?S.value:"small")),ee=$((()=>N&&N.value?Object.entries(N.value).map((([e,t])=>({key:e,...t}))):[])),te=A({show:!0}),ne=A([{key:"add",text:"添加",type:"primary",attr:{},icon:{key:"pure-operation-add"}},{key:"look",text:"查看",type:"primary",attr:{class:"look"}},{key:"clone",text:"克隆",type:"primary"},{key:"edit",text:"修改"},{key:"disable",text:"禁用",type:"primary"},{key:"enable",text:"启用",type:"primary"},{key:"run",text:"执行",type:"primary"},{key:"delList",text:"批量删除",type:"danger",attr:{style:{color:"#FF8080",border:"1px solid #FFD1D1",backgroundColor:"#FFF5F5"}},icon:{key:"pure-delete"}},{key:"del",text:"删除",attr:{}},{key:"downEx",text:"下载模板",type:"dashed",attr:{}},{key:"downInstance",text:"下载示例",attr:{}},{key:"import",text:"导入",attr:{},icon:{key:"pure-operation-import"}},{key:"export",text:"导出",attr:{},icon:{key:"pure-operation-derive"}},{key:"save",text:"保存",type:"primary",attr:{}},{key:"search",text:"查询",type:"primary",attr:{}},{key:"reset",text:"重置",attr:{}},{key:"cancel",text:"取消",attr:{}},{key:"submit",text:"提交",type:"primary",attr:{}}]),oe=$((()=>null!=U&&U.value?{type:U.value}:{}));ne.forEach((e=>{b(e,te,oe.value)}));const ie=z([...ne]),le=$((()=>ie.value.filter((e=>i[`on${se(e.key)}`])))),re=$((()=>le.value.slice(0,Y.value).filter((e=>e.show)))),ae=$((()=>le.value.slice(Y.value).filter((e=>e.show))));function se(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return C((()=>ee.value),(e=>{e.forEach((e=>{const t=ie.value.find((t=>t.key===e.key));t?b(t,te,oe.value,e):ie.value.push(b({},te,oe.value,e))}));const t=$((()=>E.value.filter((e=>ie.value.findIndex((t=>e===t.key))>=0))));for(let n=0;n<t.value.length;n++){const e=ie.value.findIndex((e=>e.key===t.value[t.value.length-1-(n+1)])),o=ie.value.findIndex((e=>e.key===t.value[t.value.length-1-n]));e>=0&&o>=0&&e-o>0&&ie.value.splice(o,0,...ie.value.splice(e,1))}}),{immediate:!0,deep:!0}),(e,o)=>{const l=t,r=n,_=a("a-button"),g=a("a-menu-item"),$=a("a-menu"),A=a("a-dropdown"),b=a("a-space");return s(),y("div",G,[p(O)?(s(),y(d,{key:1},[(s(!0),y(d,null,h(p(re),(t=>(s(),y(d,{key:t.key},[w(D,u(p(i),{item:t,sizeCom:p(Z),type:p(U)}),I({_:2},[h(p(F),((t,n)=>({name:n,fn:x((t=>[c(e.$slots,n,q(j(t)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),m("span",K,[c(e.$slots,"interval",u({size:p(Z),key:t.key,type:p(U)||t.type},{...p(i),...null==t?void 0:t.attr}),(()=>["link"===p(U)?(s(),y("span",P,"|")):v("v-if",!0)]),!0)])],64)))),128)),p(ae).length>0?(s(),k(A,{key:0,trigger:["click","hover"],overlayClassName:"primary"===p(U)||"link"===p(U)?"more-btn-menu":"more-btn-menu-normal"},{overlay:x((()=>[w($,null,{default:x((()=>[(s(!0),y(d,null,h(p(ae),(t=>(s(),k(g,u({...p(i),...null==t?void 0:t.attr},{key:t.key,onClick:p(i)[`on${se(t.key)}`]}),{default:x((()=>[w(D,{item:t,sizeCom:p(Z),type:p(U),more:!0},I({_:2},[h(p(F),((t,n)=>({name:n,fn:x((t=>[c(e.$slots,n,q(j(t)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1040,["onClick"])))),128))])),_:3})])),default:x((()=>[c(e.$slots,"more",{},(()=>[w(_,u({size:p(Z),type:p(U)},{...p(i)}),{default:x((()=>[m("span",Q,[c(e.$slots,"moreIB",{},(()=>{var e;return[p(X).icon?(s(),y(d,{key:0},["string"==typeof p(X).icon?(s(),k(l,{key:0,icon:p(X).icon},null,8,["icon"])):"object"==typeof p(X).icon?(s(),k(l,u({key:1,icon:null===(e=p(X).icon)||void 0===e?void 0:e.key},p(X).icon),null,16,["icon"])):v("v-if",!0)],64)):v("v-if",!0)]}),!0),m("span",R,[p(X).text?(s(),y(d,{key:0},[B(f(p(X).text),1)],64)):(s(),k(r,{key:1,name:"pure-more",class:"more-icon"}))]),c(e.$slots,"moreIA",{},(()=>[p(X).iconA?(s(),y(d,{key:0},["string"==typeof p(X).iconA?(s(),k(l,{key:0,icon:p(X).iconA},null,8,["icon"])):"object"==typeof p(X).iconA?(s(),k(l,u({key:1,icon:p(X).iconA.key},p(X).iconA),null,16,["icon"])):v("v-if",!0)],64)):!1!==p(X).iconA?(s(),y(d,{key:1},[],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type"])]),!0)])),_:3},8,["overlayClassName"])):v("v-if",!0),c(e.$slots,"default",u({size:p(Z),type:p(U)},{...p(i)}),void 0,!0)],64)):(s(),k(b,u({key:0,size:"link"===p(U)?1:5},p(W),{class:"space"}),{default:x((()=>[(s(!0),y(d,null,h(p(re),(t=>(s(),y(d,{key:t.key},[w(D,u(p(i),{item:t,sizeCom:p(Z),type:p(U)}),I({_:2},[h(p(F),((t,n)=>({name:n,fn:x((t=>[c(e.$slots,n,q(j(t)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),m("span",H,[c(e.$slots,"interval",u({size:p(Z),key:t.key,type:p(U)||t.type},{...p(i),...null==t?void 0:t.attr}),(()=>["link"===p(U)?(s(),y("span",L,"|")):v("v-if",!0)]),!0)])],64)))),128)),p(ae).length>0?(s(),k(A,{key:0,trigger:["click","hover"],overlayClassName:"primary"===p(U)||"link"===p(U)?"more-btn-menu":"more-btn-menu-normal"},{overlay:x((()=>[w($,null,{default:x((()=>[(s(!0),y(d,null,h(p(ae),(t=>(s(),k(g,u({...p(i),...null==t?void 0:t.attr},{key:t.key,onClick:p(i)[`on${se(t.key)}`]}),{default:x((()=>[w(D,{item:t,sizeCom:p(Z),type:p(U),more:!0},I({_:2},[h(p(F),((t,n)=>({name:n,fn:x((t=>[c(e.$slots,n,q(j(t)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1040,["onClick"])))),128))])),_:3})])),default:x((()=>[c(e.$slots,"more",{},(()=>[w(_,u({size:p(Z),type:p(U)},{...p(i)}),{default:x((()=>[m("span",M,[c(e.$slots,"moreIB",{},(()=>{var e;return[p(X).icon?(s(),y(d,{key:0},["string"==typeof p(X).icon?(s(),k(l,{key:0,icon:p(X).icon},null,8,["icon"])):"object"==typeof p(X).icon?(s(),k(l,u({key:1,icon:null===(e=p(X).icon)||void 0===e?void 0:e.key},p(X).icon),null,16,["icon"])):v("v-if",!0)],64)):v("v-if",!0)]}),!0),m("span",J,[p(X).text?(s(),y(d,{key:0},[B(f(p(X).text),1)],64)):(s(),k(r,{key:1,name:"pure-more",class:"more-icon"}))]),c(e.$slots,"moreIA",{},(()=>[p(X).iconA?(s(),y(d,{key:0},["string"==typeof p(X).iconA?(s(),k(l,{key:0,icon:p(X).iconA},null,8,["icon"])):"object"==typeof p(X).iconA?(s(),k(l,u({key:1,icon:p(X).iconA.key},p(X).iconA),null,16,["icon"])):v("v-if",!0)],64)):!1!==p(X).iconA?(s(),y(d,{key:1},[],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type"])]),!0)])),_:3},8,["overlayClassName"])):v("v-if",!0),c(e.$slots,"default",u({size:p(Z),type:p(U)},{...p(i)}),void 0,!0)])),_:3},16,["size"]))])}}}),[["__scopeId","data-v-09576f20"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SButtonGroup/index.vue"]]))}}}));
