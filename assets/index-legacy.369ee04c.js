System.register(["./index-legacy.0581b260.js","./index-legacy.066d5db8.js","./index.vue_vue_type_style_index_1_scoped_true_lang-legacy.f8b1f0b2.js"],(function(e){"use strict";var t,o,n,i,l,r,a,y,s,c,u,p,d,k,v,m,f,x,g,_,A,b,$,C,z,h,F,I,w,q,B;return{setters:[function(e){t=e._,o=e.a},function(e){n=e._,i=e.d,l=e.t,r=e.E,a=e.i,y=e.o,s=e.h,c=e.l,u=e.B,p=e.u,d=e.F,k=e.c,v=e.q,m=e.b,f=e.p,x=e.w,g=e.z,_=e.J,A=e.g,b=e.j,$=e.U,C=e.r,z=e.f,h=e.A,F=e.a,I=e.I,w=e.C,q=e.D,B=e.m},function(){}],execute:function(){const j={class:"inner-btn-area"},S={key:0,class:"inner-btn-area"},U={style:{padding:"0 2px"}},E={class:"row"},D={style:{padding:"0 2px"}},N=i({__name:"ButtonContent",props:{item:{type:null,required:!0},sizeCom:{type:null,required:!0},type:{type:[String,null],required:!1},more:{type:Boolean,required:!1}},setup(e){const o=e,{item:n,sizeCom:i,type:g,more:_}=l(o),A=r();function b(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return(e,o)=>{var l,r,$;const C=t,z=a("a-button");return y(),s("div",j,[c(e.$slots,`${p(n).key}B`,u({size:p(i),type:p(g)||p(n).type},{...p(A),...null===(l=p(n))||void 0===l?void 0:l.attr},{onClick:o[0]||(o[0]=(...e)=>p(A)[`on${b(p(n).key)}`]&&p(A)[`on${b(p(n).key)}`](...e))}),void 0,!0),p(_)?(y(),s("div",S,[c(e.$slots,`${p(n).key}IB`,{},(()=>[p(n).icon?(y(),s(d,{key:0},["string"==typeof p(n).icon?(y(),k(C,{key:0,icon:p(n).icon},null,8,["icon"])):(y(),k(C,u({key:1,icon:p(n).icon.key},p(n).icon),null,16,["icon"]))],64)):v("v-if",!0)]),!0),m("span",U,f(p(n).text),1),c(e.$slots,`${p(n).key}IA`,{},(()=>[p(n).iconA?(y(),s(d,{key:0},["string"==typeof p(n).iconA?(y(),k(C,{key:0,icon:p(n).iconA},null,8,["icon"])):(y(),k(C,u({key:1,icon:p(n).iconA.key},p(n).iconA),null,16,["icon"]))],64)):v("v-if",!0)]),!0)])):p(n).show?(y(),k(z,u({size:p(i),key:p(n).key,type:p(n).type},{...p(A),...null===(r=p(n))||void 0===r?void 0:r.attr},{onClick:p(A)[`on${b(p(n).key)}`]}),{default:x((()=>[m("span",E,[c(e.$slots,`${p(n).key}IB`,{},(()=>[p(n).icon?(y(),s(d,{key:0},["string"==typeof p(n).icon?(y(),k(C,{key:0,icon:p(n).icon},null,8,["icon"])):(y(),k(C,u({key:1,icon:p(n).icon.key},p(n).icon),null,16,["icon"]))],64)):v("v-if",!0)]),!0),m("span",D,f(p(n).text),1),c(e.$slots,`${p(n).key}IA`,{},(()=>[p(n).iconA?(y(),s(d,{key:0},["string"==typeof p(n).iconA?(y(),k(C,{key:0,icon:p(n).iconA},null,8,["icon"])):(y(),k(C,u({key:1,icon:p(n).iconA.key},p(n).iconA),null,16,["icon"]))],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type","onClick"])):v("v-if",!0),c(e.$slots,`${p(n).key}A`,u({size:p(i),type:p(g)||p(n).type},{...p(A),...null===($=p(n))||void 0===$?void 0:$.attr}),void 0,!0)])}}});var O=n(N,[["__scopeId","data-v-7c5c32d6"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SButtonGroup/ButtonContent.vue"]]);const G={class:"button-group flex"},J={key:0,class:"interval"},L={style:{color:"#dcdee0"}},M={class:"more-btn-inner"},H={class:"more-text"},K={key:0,class:"interval"},P={style:{color:"#dcdee0"}},Q={class:"more-btn-inner"},R={class:"more-text"},T=i({__name:"index",props:{size:{type:String,required:!1,default:void 0},type:{type:String,required:!1},interval:{type:[Boolean,String],required:!1},setup:{type:Object,required:!1},more:{type:Object,required:!1},len:{type:Number,required:!1},order:{type:Array,required:!1,default:()=>[]},width:{type:String,required:!1},space:{type:Object,required:!1,default:()=>({})}},setup(e){const n=e;g((e=>({"09576f20-width":p(N)})));const i=r(),j=_(),{size:S,type:U,setup:E,order:D,width:N,len:T,more:V,space:W,interval:X}=l(n),Y=A((()=>({text:"",...null!=V&&V.value?null==V?void 0:V.value:{}}))),Z=A((()=>null!=T&&T.value||0===(null==T?void 0:T.value)?T.value:"link"===(null==U?void 0:U.value)?4:30)),ee=A((()=>"link"!==(null==U?void 0:U.value)||S.value?S.value:"small")),te=A((()=>E&&E.value?Object.entries(E.value).map((([e,t])=>({key:e,...t}))):[])),oe=b({show:!0}),ne=b([{key:"add",text:"添加",type:"primary",attr:{},icon:{key:"pure-operation-add"}},{key:"look",text:"查看",type:"primary",attr:{class:"look"}},{key:"clone",text:"克隆",type:"primary"},{key:"edit",text:"修改"},{key:"disable",text:"禁用",type:"primary"},{key:"enable",text:"启用",type:"primary"},{key:"run",text:"执行",type:"primary"},{key:"danger",text:"danger",type:"danger",attr:{style:{color:"#FF8080",border:"1px solid #FFD1D1",backgroundColor:"#FFF5F5"}}},{key:"delList",text:"批量删除",type:"danger",attr:{style:{color:"#FF8080",border:"1px solid #FFD1D1",backgroundColor:"#FFF5F5"}},icon:{key:"pure-delete"}},{key:"del",text:"删除",attr:{}},{key:"downEx",text:"下载模板",type:"dashed",attr:{}},{key:"downInstance",text:"下载示例",attr:{}},{key:"import",text:"导入",attr:{},icon:{key:"pure-operation-import",style:{color:"#8EA1B3"}}},{key:"export",text:"导出",attr:{},icon:{key:"pure-operation-derive",style:{color:"#8EA1B3"}}},{key:"save",text:"保存",type:"primary",attr:{}},{key:"search",text:"查询",type:"primary",attr:{}},{key:"reset",text:"重置",attr:{}},{key:"cancel",text:"取消",attr:{}},{key:"submit",text:"提交",type:"primary",attr:{}}]),ie=A((()=>null!=U&&U.value?{type:U.value}:{}));ne.forEach((e=>{$(e,oe,ie.value)}));const le=C([...ne]),re=A((()=>le.value.filter((e=>i[`on${se(e.key)}`])))),ae=A((()=>re.value.filter((e=>e.show)).slice(0,Z.value))),ye=A((()=>re.value.filter((e=>e.show)).slice(Z.value)));function se(e){return e.replace(/^\w/,(e=>e.toUpperCase()))}return z((()=>te.value),(e=>{e.forEach((e=>{const t=le.value.find((t=>t.key===e.key));t?$(t,oe,ie.value,e):le.value.push($({},oe,ie.value,e))}));const t=A((()=>D.value.filter((e=>le.value.findIndex((t=>e===t.key))>=0))));for(let o=0;o<t.value.length;o++){const e=le.value.findIndex((e=>e.key===t.value[t.value.length-1-(o+1)])),n=le.value.findIndex((e=>e.key===t.value[t.value.length-1-o]));e>=0&&n>=0&&e-n>0&&le.value.splice(n,0,...le.value.splice(e,1))}}),{immediate:!0,deep:!0}),(e,n)=>{const l=t,r=o,g=a("a-button"),_=a("a-menu-item"),A=a("a-menu"),b=a("a-dropdown"),$=a("a-space");return y(),s("div",G,[p(N)?(y(),s(d,{key:1},[(y(!0),s(d,null,h(p(ae),(t=>(y(),s(d,{key:t.key},[F(O,u(p(i),{item:t,sizeCom:p(ee),type:p(U)}),I({_:2},[h(p(j),((t,o)=>({name:o,fn:x((t=>[c(e.$slots,o,w(q(t)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),"link"===p(U)||p(X)?(y(),s("span",K,[c(e.$slots,"interval",u({size:p(ee),key:t.key,type:p(U)||t.type},{...p(i),...null==t?void 0:t.attr}),(()=>[m("span",P,f("string"==typeof p(X)?p(X):"|"),1)]),!0)])):v("v-if",!0)],64)))),128)),p(ye).length>0?(y(),k(b,{key:0,trigger:["click","hover"],overlayClassName:"primary"===p(U)||"link"===p(U)?"more-btn-menu":"more-btn-menu-normal"},{overlay:x((()=>[F(A,null,{default:x((()=>[(y(!0),s(d,null,h(p(ye),(t=>(y(),k(_,u({...p(i),...null==t?void 0:t.attr},{key:t.key,onClick:p(i)[`on${se(t.key)}`]}),{default:x((()=>[F(O,{item:t,sizeCom:p(ee),type:p(U),more:!0},I({_:2},[h(p(j),((t,o)=>({name:o,fn:x((t=>[c(e.$slots,o,w(q(t)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1040,["onClick"])))),128))])),_:3})])),default:x((()=>[c(e.$slots,"more",{},(()=>[F(g,u({size:p(ee),type:p(U)},{...p(i)}),{default:x((()=>[m("span",Q,[c(e.$slots,"moreIB",{},(()=>{var e;return[p(Y).icon?(y(),s(d,{key:0},["string"==typeof p(Y).icon?(y(),k(l,{key:0,icon:p(Y).icon},null,8,["icon"])):"object"==typeof p(Y).icon?(y(),k(l,u({key:1,icon:null===(e=p(Y).icon)||void 0===e?void 0:e.key},p(Y).icon),null,16,["icon"])):v("v-if",!0)],64)):v("v-if",!0)]}),!0),m("span",R,[p(Y).text?(y(),s(d,{key:0},[B(f(p(Y).text),1)],64)):(y(),k(r,{key:1,name:"pure-more",class:"more-icon"}))]),c(e.$slots,"moreIA",{},(()=>[p(Y).iconA?(y(),s(d,{key:0},["string"==typeof p(Y).iconA?(y(),k(l,{key:0,icon:p(Y).iconA},null,8,["icon"])):"object"==typeof p(Y).iconA?(y(),k(l,u({key:1,icon:p(Y).iconA.key},p(Y).iconA),null,16,["icon"])):v("v-if",!0)],64)):!1!==p(Y).iconA?(y(),s(d,{key:1},[],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type"])]),!0)])),_:3},8,["overlayClassName"])):v("v-if",!0),c(e.$slots,"default",u({size:p(ee),type:p(U)},{...p(i)}),void 0,!0)],64)):(y(),k($,u({key:0,size:"link"===p(U)?1:10},p(W),{class:"space"}),{default:x((()=>[(y(!0),s(d,null,h(p(ae),(t=>(y(),s(d,{key:t.key},[F(O,u(p(i),{item:t,sizeCom:p(ee),type:p(U)}),I({_:2},[h(p(j),((t,o)=>({name:o,fn:x((t=>[c(e.$slots,o,w(q(t)),void 0,!0)]))})))]),1040,["item","sizeCom","type"]),"link"===p(U)||p(X)?(y(),s("span",J,[c(e.$slots,"interval",u({size:p(ee),key:t.key,type:p(U)||t.type},{...p(i),...null==t?void 0:t.attr}),(()=>[m("span",L,f("string"==typeof p(X)?p(X):"|"),1)]),!0)])):v("v-if",!0)],64)))),128)),p(ye).length>0?(y(),k(b,{key:0,trigger:["click","hover"],overlayClassName:"primary"===p(U)||"link"===p(U)?"more-btn-menu":"more-btn-menu-normal"},{overlay:x((()=>[F(A,null,{default:x((()=>[(y(!0),s(d,null,h(p(ye),(t=>(y(),k(_,u({...p(i),...null==t?void 0:t.attr},{key:t.key,onClick:p(i)[`on${se(t.key)}`]}),{default:x((()=>[F(O,{item:t,sizeCom:p(ee),type:p(U),more:!0},I({_:2},[h(p(j),((t,o)=>({name:o,fn:x((t=>[c(e.$slots,o,w(q(t)),void 0,!0)]))})))]),1032,["item","sizeCom","type"])])),_:2},1040,["onClick"])))),128))])),_:3})])),default:x((()=>[c(e.$slots,"more",{},(()=>[F(g,u({size:p(ee),type:p(U)},{...p(i)},{onClick:p(i).onMore}),{default:x((()=>[m("span",M,[c(e.$slots,"moreIB",{},(()=>{var e;return[p(Y).icon?(y(),s(d,{key:0},["string"==typeof p(Y).icon?(y(),k(l,{key:0,icon:p(Y).icon},null,8,["icon"])):"object"==typeof p(Y).icon?(y(),k(l,u({key:1,icon:null===(e=p(Y).icon)||void 0===e?void 0:e.key},p(Y).icon),null,16,["icon"])):v("v-if",!0)],64)):v("v-if",!0)]}),!0),m("span",H,[p(Y).text?(y(),s(d,{key:0},[B(f(p(Y).text),1)],64)):(y(),k(r,{key:1,name:"pure-more",class:"more-icon"}))]),c(e.$slots,"moreIA",{},(()=>[p(Y).iconA?(y(),s(d,{key:0},["string"==typeof p(Y).iconA?(y(),k(l,{key:0,icon:p(Y).iconA},null,8,["icon"])):"object"==typeof p(Y).iconA?(y(),k(l,u({key:1,icon:p(Y).iconA.key},p(Y).iconA),null,16,["icon"])):v("v-if",!0)],64)):!1!==p(Y).iconA?(y(),s(d,{key:1},[],64)):v("v-if",!0)]),!0)])])),_:3},16,["size","type","onClick"])]),!0)])),_:3},8,["overlayClassName"])):v("v-if",!0),c(e.$slots,"default",u({size:p(ee),type:p(U)},{...p(i)}),void 0,!0)])),_:3},16,["size"]))])}}});e("_",n(T,[["__scopeId","data-v-09576f20"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SButtonGroup/index.vue"]]))}}}));
