!function(){var e=document.createElement("style");e.innerHTML="[data-v-fb56fc62]:export{headerHeight:56px;sidebarOpenWidth:244px;sidebarCloseWidth:66px}.pagesBox[data-v-fb56fc62]{position:relative}.header-top .search-form-area[data-v-fb56fc62]{border-top:0}.action[data-v-fb56fc62]{display:flex;align-items:center;margin-bottom:12px}.iconRow[data-v-fb56fc62]{margin-bottom:-16px;display:flex;justify-content:center}\n",document.head.appendChild(e),System.register(["./index-legacy.f651790f.js","./index-legacy.1e2011bf.js","./index-legacy.d695e646.js","./assign-legacy.045c00a8.js","./validate-legacy.1fb8fe7f.js","./index.vue_vue_type_style_index_1_scoped_true_lang-legacy.f8b1f0b2.js","./form-legacy.436ca4d9.js","./index-legacy.c2d53421.js"],(function(e){"use strict";var l,a,t,n,o,i,s,u,r,A,c,f,v,d,p,E,B,m,C,y,D,g,b,x,h,k,F,_,O,j,S,w,M,R,Y;return{setters:[function(e){l=e.a},function(e){a=e._},function(e){t=e._,n=e.d,o=e.Y,i=e.H,s=e.E,u=e.t,r=e.r,A=e.y,c=e.g,f=e.U,v=e.j,d=e.c3,p=e.f,E=e.O,B=e.I,m=e.o,C=e.h,y=e.a,D=e.M,g=e.A,b=e.w,x=e.l,h=e.C,k=e.D,F=e.u,_=e.b,O=e.c,j=e.B,S=e.q,w=e.X},function(){},function(){},function(){},function(e){M=e.a,R=e.d},function(e){Y=e._}],execute:function(){const L={class:"pagesBox search-form-area"},q={class:"action"},H={key:0,class:"iconRow"},I=n({__name:"index",props:{fieldList:{type:Array,required:!0},formModel:{type:null,required:!0},formData:{type:Object,required:!0},presetButton:{type:Boolean,required:!1,default:!0},onOff:{type:Boolean,required:!1},button:{type:Object,required:!1}},emits:["update:onOff","search"],setup(e,{expose:t,emit:n}){const R=e,I=o("isInLayout",!1),U=i(),T=s(),{fieldList:$,formModel:z,formData:W,presetButton:P,onOff:X,button:G}=u(R),J=r();A((()=>{J.value=$.value.map((e=>({...e,label:"",title:e.label,config:{placeholder:e.label,...null!=e&&e.config?e.config:{}}})))}));const K=M((()=>({span:6,rowAttr:{style:{marginLeft:"-8px",marginRight:"-8px"}},colAttr:{style:{paddingLeft:"8px",paddingRight:"8px"}},config:{keyup({e:e}){"Enter"===e.code&&oe()}}}))),N=c((()=>f({},K,z.value))),Q=c((()=>J.value.reduce(((e,l)=>{var a,t;return e+((null==l||null===(a=l.config)||void 0===a?void 0:a.span)||(null==l?void 0:l.span)||(null===(t=N.value)||void 0===t?void 0:t.span)||0)}),0))),V=r((null==X?void 0:X.value)||!(Q.value>=72)),Z=c((()=>24-(V.value?Q.value:ae.value)%24)),ee=v({key:"action",span:c((()=>Z.value)),type:"slotOut"}),le=c((()=>{let e;return e=d(J.value),V.value||I||(e=e.splice(0,3)),e})),ae=c((()=>le.value.reduce(((e,l)=>{var a,t;return e+((null==l||null===(a=l.config)||void 0===a?void 0:a.span)||(null==l?void 0:l.span)||(null===(t=N.value)||void 0===t?void 0:t.span)||0)}),0))),te=c((()=>le.value.map((e=>e.key))));function ne(){var e,l;if(null!=T&&T.onReset)return void T.onReset();Object.keys((null==W?void 0:W.value)||{}).forEach((e=>{"string"===E(null==W?void 0:W.value[e])&&(W.value[e]=void 0),"object"===E(null==W?void 0:W.value[e])&&(W.value[e]={}),"array"===E(null==W?void 0:W.value[e])&&(W.value[e]=[])})),null==ie||null===(e=ie.value)||void 0===e||e.resetFields(),null==T||null===(l=T.onResetPost)||void 0===l||l.call(T)}async function oe(e=!0){var l;if(null!=T&&T["onSearch:false"])return void(null==T||null===(l=T["onSearch:false"])||void 0===l||l.call(T,{onOff:V.value,formData:W.value}));let a={status:!0};var t,o;!1!==e&&(a=null!==(t=await(null==ie||null===(o=ie.value)||void 0===o?void 0:o.validate()))&&void 0!==t?t:a);!0===a.status?n("search",{onOff:V.value,formData:W.value}):w.warning("查询条件不符合规则！")}p((()=>V.value),(e=>{if(n("update:onOff",e),!e){Object.keys((null==W?void 0:W.value)||{}).forEach((e=>{te.value.includes(e)||("string"===E(null==W?void 0:W.value[e])&&(W.value[e]=void 0),"object"===E(null==W?void 0:W.value[e])&&(W.value[e]={}),"array"===E(null==W?void 0:W.value[e])&&(W.value[e]=[]))}))}}));const ie=r(),se=v({});return B((()=>{if(ie.value){Object.keys(ie.value).forEach((e=>{se[e]=ie.value[e]}))}})),t(se),(e,t)=>{const n=a,o=l;return m(),C("div",L,[y(Y,j({ref_key:"formRef",ref:ie},F(T),{fieldList:[...F(le),F(ee)],formModel:F(N),formData:F(W)}),D({action:b((()=>{var l;return[_("div",q,[!1!==F(P)?(m(),O(n,j({key:0},{onSearch:oe,onReset:ne,...F(G)||{}},{setup:{search:{text:"搜索"},...(null===(l=F(G))||void 0===l?void 0:l.setup)||{}}}),null,16,["setup"])):S("v-if",!0),x(e.$slots,"default",{onOff:F(V)},void 0,!0)])]})),_:2},[g(F(U),((l,a)=>({name:a,fn:b((l=>[x(e.$slots,a,h(k(l)),void 0,!0)]))})))]),1040,["fieldList","formModel","formData"]),F(Q)>=72&&!F(I)?(m(),C("div",H,[F(V)?(m(),O(o,{key:0,name:"search-up",fontSize:"100px",style:{margin:"auto",height:"20px"},onClick:t[0]||(t[0]=e=>V.value=!F(V))})):(m(),O(o,{key:1,name:"search-unfold-flip",fontSize:"100px",style:{margin:"auto",height:"20px"},onClick:t[1]||(t[1]=e=>V.value=!F(V))}))])):S("v-if",!0)])}}});var U=t(I,[["__scopeId","data-v-fb56fc62"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SSearchForm/index.vue"]]);const T=_("div",null,"默认插槽",-1);e("default",t(n({__name:"base",setup(e,{expose:l}){const a=v(R((()=>[{name:"",sex:null,nature:null,like:null},[{label:"名称",key:"name",type:"input"},{label:"性别",key:"sex",type:"select"},{label:"性格",key:"nature",type:"select"},{label:"爱好",key:"like",type:"select"},{label:"日期",key:"time",type:"date-picker",config:{valueFormat:"YYYY-MM-DD HH:mm:ss"}},{label:"备注",key:"remark",type:"textarea",config:{rows:1}}],{optionsData:{nature:[{label:"活泼",value:"lively"},{label:"开朗",value:"outgoing"}],sex:[{label:"男",value:"man"},{label:"女",value:"woman"}],like:[{label:"唱歌",value:"sing"},{label:"跳舞",value:"dance"}]}}]))),t=({onOff:e,formData:l})=>{w.success("搜索")},n=()=>{w.success("清空")};return l({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSSearchForm%0A%20%20%20%20%20%20v-bind%3D%22formOption%22%0A%20%20%20%20%20%20%40search%3D%22search%22%0A%20%20%20%20%20%20%40reset%3D%22reset%22%0A%20%20%20%20%20%20%3ApresetButton%3D%22true%22%0A%20%20%20%20%20%20%3AonOff%3D%22false%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%3Cdiv%3E%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%3C%2Fdiv%3E%0A%20%20%20%20%3C%2FSSearchForm%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20message%20%7D%20from%20'ant-design-vue'%0Aimport%20%7B%20defineForm%20%7D%20from%20'%40%2Fcommon%2Futils%2Fdefine%2Fform'%0A%0Aconst%20formOption%20%3D%20reactive(%0A%20%20defineForm(()%20%3D%3E%20%7B%0A%20%20%20%20return%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20name%3A%20''%2C%0A%20%20%20%20%20%20%20%20sex%3A%20null%2C%0A%20%20%20%20%20%20%20%20nature%3A%20null%2C%0A%20%20%20%20%20%20%20%20like%3A%20null%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%90%8D%E7%A7%B0'%2C%20key%3A%20'name'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%80%A7%E5%88%AB'%2C%20key%3A%20'sex'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%80%A7%E6%A0%BC'%2C%20key%3A%20'nature'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E7%88%B1%E5%A5%BD'%2C%20key%3A%20'like'%2C%20type%3A%20'select'%20%7D%2C%0A%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E6%97%A5%E6%9C%9F'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'time'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'date-picker'%2C%0A%20%20%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20valueFormat%3A%20'YYYY-MM-DD%20HH%3Amm%3Ass'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%A4%87%E6%B3%A8'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'remark'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20config%3A%20%7B%20rows%3A%201%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20optionsData%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20nature%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%B4%BB%E6%B3%BC'%2C%20value%3A%20'lively'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%BC%80%E6%9C%97'%2C%20value%3A%20'outgoing'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20sex%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E7%94%B7'%2C%20value%3A%20'man'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%A5%B3'%2C%20value%3A%20'woman'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20like%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%94%B1%E6%AD%8C'%2C%20value%3A%20'sing'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E8%B7%B3%E8%88%9E'%2C%20value%3A%20'dance'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%0A%20%20%7D)%0A)%0Aconst%20search%20%3D%20(%7B%20onOff%2C%20formData%20%7D%3A%20%7B%20onOff%3A%20boolean%3B%20formData%3A%20object%20%7D)%20%3D%3E%20%7B%0A%20%20console.log(onOff%2C%20formData%2C%20'msg')%0A%20%20message.success('%E6%90%9C%E7%B4%A2')%0A%7D%0Aconst%20reset%20%3D%20()%20%3D%3E%20%7B%0A%20%20message.success('%E6%B8%85%E7%A9%BA')%0A%7D%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8'%2C%0A%20%20context%3A%20%60%0A%20%20%E5%9F%BA%E4%BA%8ESForm%E8%BF%9B%E8%A1%8C%E5%B0%81%E8%A3%85%2C%E5%B0%86label%E5%AD%97%E6%AE%B5%E8%BD%AC%E6%8D%A2%E4%B8%BAplaceholder%E8%BF%9B%E8%A1%8C%E5%B1%95%E7%A4%BA%0A%20%20%E6%B7%BB%E5%8A%A0%E4%BA%86%E6%90%9C%E7%B4%A2%E5%92%8C%E9%87%8D%E7%BD%AE(reset)%E4%B8%A4%E4%B8%AA%E9%BB%98%E8%AE%A4%E6%8C%89%E9%92%AE(search)%0A%20%20%60%2C%0A%20%20contextType%3A%20'pre'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:r({title:"基础使用",context:"\n  基于SForm进行封装,将label字段转换为placeholder进行展示\n  添加了搜索和重置(reset)两个默认按钮(search)\n  ",contextType:"pre"})}),(e,l)=>{const o=U;return m(),C("div",null,[y(o,j(F(a),{onSearch:t,onReset:n,presetButton:!0,onOff:!1}),{default:b((()=>[T])),_:1},16)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/SSearchForm/automation/base.vue"]]))}}}))}();