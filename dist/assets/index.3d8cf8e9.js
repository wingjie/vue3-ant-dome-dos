import{_ as a,d as e,E as t,t as o,g as r,i as l,o as s,h as n,a as d,w as m,F as f,A as i,u,c as p,G as c,l as y,q as v,B as D,C as w,D as M,H as g,r as _,j as k,I as U,y as b,J as x,f as A,K as h,L as q,b as C,m as I,M as $,N as F,O as L}from"./index.96e66033.js";import{g as O,_ as j,i as S,m as R,a as N,b as E}from"./assign.123b8fd7.js";var B=a(e({__name:"SFormLayout",props:{modelData:{type:null,required:!0},fieldListMap:{type:Array,required:!0},formDataMap:{type:[Object,null],required:!0},formData:{type:Object,required:!0},rowMsg:{type:null,required:!0},name:{type:Array,required:!0}},setup(a){const e=a,g=t(),{modelData:_,formDataMap:k,formData:U,fieldListMap:b}=o(e),x=r((()=>k.value)),A=r((()=>U.value)),h=r((()=>O(b).filter((a=>!1!==O(a?.checked)))));return(e,t)=>{const o=l("a-col"),r=l("a-row");return s(),n("div",null,[d(r,w(M(u(_)?.rowAttr)),{default:m((()=>[(s(!0),n(f,null,i(u(h),((t,r)=>(s(),p(o,{key:t.key+r,span:t?.span||t?.colAttr?.span,style:c({display:r<(u(_).expandNum||u(h).length)?"block":"none",...u(_)?.colAttr?.style})},{default:m((()=>[t.type?(s(),n(f,{key:0},[!t.type||"slot"!==t.type&&"slotOut"!==t.type?v("v-if",!0):y(e.$slots,`${t.key}`,{key:0,field:t,mapData:u(x),data:u(A)}),t.isForm?(s(),p(j,D({key:1,ref_for:!0,ref:"formItemRef"},{...u(g),...u(g)?.["onUpdate:formDataMap"]?{"onUpdate:mapData"(a){u(g)?.["onUpdate:formDataMap"]({...u(k),...a})}}:{},...u(g)?.["onUpdate:formData"]?{"onUpdate:rowData"(a){u(g)?.["onUpdate:formData"]({...u(U),...a})}}:{}},{field:t,fieldIndex:r,modelData:u(_),mapData:u(x),rowData:u(A),formData:u(A),isCore:Boolean(u(x)),rowMsg:a.rowMsg,name:[...a.name]}),{itemIn:m((a=>[t.type&&"slot"===t.type?y(e.$slots,`${t.key}In`,{key:0,data:a.data,mapData:u(x),model:u(_),field:a.field}):v("v-if",!0)])),itemSlot:m((a=>["slot"===t?.config?.$type||"slot"===t?.config?.type?y(e.$slots,`${t.key}${t?.config?.key}In`,{key:0,data:a.data,field:a.field,mapData:u(x)}):v("v-if",!0)])),_:2},1040,["field","fieldIndex","modelData","mapData","rowData","formData","isCore","rowMsg","name"])):v("v-if",!0)],64)):v("v-if",!0)])),_:2},1032,["span","style"])))),128))])),_:3},16),d(r,null,{default:m((()=>[y(e.$slots,"formRow",{data:u(x)})])),_:3})])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SForm/SFormLayout.vue"]]);const P={class:"app-container"},V={id:"components-form-demo-advanced-search"};var z=a(e({__name:"index",props:{formModel:{type:null,required:!1,default:()=>({})},fieldList:{type:Array,required:!0,default:()=>[]},formData:{type:Object,required:!0,default:()=>({})},extra:{type:null,required:!1},name:{type:Array,required:!1}},setup(a,{expose:e}){const f=a,c=t(),v=g(),{formModel:w,fieldList:M,formData:O,name:j}=o(f),z=_(),G=_(),H=_({}),J=_([]),K=k({isForm:!0,formAttr:{labelCol:{span:8},wrapperCol:{span:24},labelWrap:!0,class:"ant-advanced-search-form",style:{},model:H.value},rowAttr:{gutter:[24,0]},colAttr:{span:8,style:{}},follow:!0,expandNum:void 0,formItemAttr:{labelCol:{span:6,offset:0}},config:{"auto-size":{minRows:1,maxRows:5},trim:!0,isShowFindCodeName:!0,isForm:!0,isCore:!0,disabled:!1,placeholder:"请填选","allow-clear":!0,maxlength:200}}),W=r((()=>j?.value));S(K,["disabled"]),U((()=>{Object.prototype.hasOwnProperty.call(w.value,"async")&&R(w.value,w.value.async)}));const Q=_({});function T(){const a=!1!==Q.value?.follow;return H.value=a?O.value:F(O.value),{formDataMap:H.value,formData:O.value}}function X(){aa(),H.value=null}function Y(){return Object.assign(O.value,H.value),X(),O.value}function Z(a,e){if(!1!==u(w.value.isForm))return new Promise((t=>{z.value.validate("array"===L(a)||"string"===L(a)?a:void 0).then((o=>{t({status:!0,data:{...o}}),"function"===L(a)&&a({status:!0,data:{...o}}),e&&e({status:!0,data:{...o}})})).catch((a=>{t({status:!1,data:{...a}}),e&&e({status:!1,data:{...a}})}))}))}function aa(a){z.value?.clearValidate(a)}b((()=>{S(w.value,["disabled","span","rules"]),Q.value=N({},x(K),x(w.value)),J.value=M.value.map((a=>E(a,Q.value)))})),A((()=>[Q.value.isForm,O.value]),(([a])=>{!0===a?T():X()}),{immediate:!0,deep:!0});const ea=k({options:{},unit:{}}),ta=_({confirm:Y,update:T,cancel:X}),oa={clearValidate:aa,getData:function(){return F(H.value)},validate:Z,findCodeItem:function(a,e){return G.value.findCodeItem(a,e)},update:T,cancel:X,confirm:Y,formRef:z,mapData:H},ra=k({});return U((()=>{if(z.value){Object.keys(z.value).forEach((a=>{ra[a]=z.value[a]}))}Object.keys(oa).forEach((a=>{ra[a]=oa[a]}))})),e(ra),(e,t)=>{const o=l("a-button"),r=l("a-form");return s(),n("div",P,[h(C("div",null,[d(o,{onClick:t[0]||(t[0]=a=>Z())},{default:m((()=>[I("校验测试")])),_:1}),d(o,{onClick:t[1]||(t[1]=a=>aa())},{default:m((()=>[I("清除校验测试")])),_:1})],512),[[q,!1]]),C("div",V,[u(W)?(s(),p(B,D({key:1},{...u(c),...u(c)?.["onUpdate:formData"]?{"onUpdate:formData"(a){u(c)?.["onUpdate:formData"]({...u(O),...a})},"onUpdate:formDataMap"(a){u(c)?.["onUpdate:formData"]({...u(O),...a})}}:{}},{modelData:u(Q),formData:u(O),formDataMap:u(H),fieldListMap:u(J),rowMsg:u(ea),name:u(j)?u(j):[]}),$({_:2},[i(u(v),((t,o)=>({name:o,fn:m((t=>[y(e.$slots,o,D({model:u(Q),way:u(ta),extra:a.extra},t))]))})))]),1040,["modelData","formData","formDataMap","fieldListMap","rowMsg","name"])):(s(),p(r,D({key:0,ref_key:"formRef",ref:z},{...u(c),...u(Q).formAttr,...u(c).formAttr},{model:u(H)}),{default:m((()=>[d(B,D({...u(c),...u(c)?.["onUpdate:formData"]?{"onUpdate:formData"(a){u(c)?.["onUpdate:formData"]({...u(O),...a})},"onUpdate:formDataMap"(a){u(c)?.["onUpdate:formData"]({...u(O),...a})}}:{}},{modelData:u(Q),formData:u(O),formDataMap:u(H),fieldListMap:u(J),rowMsg:u(ea),name:u(j)?u(j):[]}),$({_:2},[i(u(v),((t,o)=>({name:o,fn:m((t=>[y(e.$slots,o,D({model:u(Q),way:u(ta),extra:a.extra},t))]))})))]),1040,["modelData","formData","formDataMap","fieldListMap","rowMsg","name"])])),_:3},16,["model"])),y(e.$slots,"formOut",{data:u(H),model:u(w)})])])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/SpaceUI/SForm/index.vue"]]);export{z as _};
