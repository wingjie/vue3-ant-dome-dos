import{_ as e}from"./index.3d8cf8e9.js";import{_ as A,d as t,r,j as a,i as o,o as i,h as l,a as s,w as C,m as n,B as m,u as B,p as d,b as D,X as E}from"./index.96e66033.js";import{d as f}from"./form.fd6a0601.js";import{v as c}from"./validate.92c083dc.js";import"./assign.123b8fd7.js";import"./index.cef73080.js";const g=D("br",null,null,-1);var p=A(t({__name:"base",setup(A,{expose:t}){const D=c("a"),p=c("S"),u=c("R"),v=c("W"),F=c("Y"),y=c("P"),x=c(),b=r(),R=a(f((()=>[{},[{label:"A",key:"A",type:"textarea",formItemAttr:{extra:"如: 10.10.10.10"}},{label:"S",key:"S",type:"textarea",formItemAttr:{extra:"如: 10.10.10.10/24或者10.10.10.0 255.255.255.0"}},{label:"R",key:"R",type:"textarea",formItemAttr:{extra:"如: 1.1.1.1-2.3.4.5"}},{label:"W",key:"W",type:"textarea",formItemAttr:{extra:"如: 0.0.8.0 255.255.0.255"}},{label:"Y",key:"Y",type:"textarea",formItemAttr:{extra:"如: Any"}},{label:"P",key:"P",type:"textarea",formItemAttr:{extra:"如: 1-3/5/7.*/11.22/23"}},{label:"ASRWPYL",key:"ASRWPYL",type:"textarea",formItemAttr:{extra:"以上任意个，并支持多个，以回车(/n)空格(/s)逗号(,)分隔"}},{label:" ",key:"operation",type:"slot"}],{span:24,config:{isForm:!0},optionsData:{},rules:{A:[{required:!1,trigger:"change",validator:D}],S:[{required:!1,trigger:"change",validator:p}],R:[{required:!1,trigger:"change",validator:u}],W:[{required:!1,trigger:"change",validator:v}],P:[{required:!1,trigger:"change",validator:y}],Y:[{required:!1,trigger:"change",validator:F}],ASRWPYL:[{required:!1,trigger:"change",validator:x}]}}])));function h(){b.value.validate().then((({status:e})=>{if(!e)return E.warning("请填写符合规则");E.success("提交成功")}))}return t({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSForm%20ref%3D%22formRef%22%20v-bind%3D%22form%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23operationIn%3E%0A%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22submit%22%3E%E6%8F%90%E4%BA%A4%3C%2Fa-button%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSForm%3E%0A%20%20%20%20%3Cbr%20%2F%3E%0A%20%20%20%20%7B%7B%20form.formData%20%7D%7D%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20message%20%7D%20from%20'ant-design-vue'%0Aimport%20%7B%20defineForm%20%7D%20from%20'%40%2Fcommon%2Futils%2Fdefine%2Fform'%0Aimport%20%7B%20valid%20%7D%20from%20'%40%2Fcommon%2Futils%2Fvalidate'%0A%0Aconst%20A%20%3D%20valid('a')%0Aconst%20S%20%3D%20valid('S')%0Aconst%20R%20%3D%20valid('R')%0Aconst%20W%20%3D%20valid('W')%0Aconst%20Y%20%3D%20valid('Y')%0Aconst%20P%20%3D%20valid('P')%0Aconst%20all%20%3D%20valid()%0A%0Aconst%20formRef%20%3D%20ref()%0Aconst%20form%20%3D%20reactive(%0A%20%20defineForm(()%20%3D%3E%20%7B%0A%20%20%20%20return%20%5B%0A%20%20%20%20%20%20%7B%7D%2C%0A%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'A'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'A'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20'%E5%A6%82%3A%2010.10.10.10'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'S'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'S'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20extra%3A%20'%E5%A6%82%3A%2010.10.10.10%2F24%E6%88%96%E8%80%8510.10.10.0%20255.255.255.0'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'R'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'R'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20'%E5%A6%82%3A%201.1.1.1-2.3.4.5'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'W'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'W'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20'%E5%A6%82%3A%200.0.8.0%20255.255.0.255'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'Y'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'Y'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20'%E5%A6%82%3A%20Any'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'P'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'P'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20'%E5%A6%82%3A%201-3%2F5%2F7.*%2F11.22%2F23'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'ASRWPYL'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'ASRWPYL'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20extra%3A%20'%E4%BB%A5%E4%B8%8A%E4%BB%BB%E6%84%8F%E4%B8%AA%EF%BC%8C%E5%B9%B6%E6%94%AF%E6%8C%81%E5%A4%9A%E4%B8%AA%EF%BC%8C%E4%BB%A5%E5%9B%9E%E8%BD%A6(%2Fn)%E7%A9%BA%E6%A0%BC(%2Fs)%E9%80%97%E5%8F%B7(%2C)%E5%88%86%E9%9A%94'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%20'%2C%20key%3A%20'operation'%2C%20type%3A%20'slot'%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%2F%2F%20isForm%3A%20false%2C%0A%20%20%20%20%20%20%20%20span%3A%2024%2C%0A%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20optionsData%3A%20%7B%7D%2C%0A%20%20%20%20%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20A%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20A%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20S%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20S%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20R%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20R%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20W%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20W%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20P%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20P%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20Y%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20Y%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20ASRWPYL%3A%20%5B%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20all%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%0A%20%20%7D)%0A)%0A%0Afunction%20submit()%20%7B%0A%20%20formRef.value.validate().then((%7B%20status%20%7D%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20if%20(!status)%20%7B%0A%20%20%20%20%20%20return%20message.warning('%E8%AF%B7%E5%A1%AB%E5%86%99%E7%AC%A6%E5%90%88%E8%A7%84%E5%88%99')%0A%20%20%20%20%7D%0A%20%20%20%20message.success('%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F')%0A%20%20%7D)%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%8A%A8%E6%80%81%E7%94%9F%E6%88%90%E4%BD%BF%E7%94%A8'%2C%0A%20%20order%3A%201%2C%0A%20%20contextType%3A%20'pre'%2C%0A%20%20context%3A%20%60%20import%20%7B%20valid%20%7D%20from%20'%40%2Fcommon%2Futils%2Fvalidate'%3B%20%5Cn%20const%20A%20%3D%20valid('A')%E7%94%9F%E6%88%90%E8%A7%84%E5%88%99%3B%20%5Cn%20%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20A%20%7D%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99%60%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:r({title:"动态生成使用",order:1,contextType:"pre",context:" import { valid } from '@/common/utils/validate'; \n const A = valid('A')生成规则; \n { required: false, trigger: 'change', validator: A }使用规则"})}),(A,t)=>{const r=o("a-button"),a=e;return i(),l("div",null,[s(a,m({ref_key:"formRef",ref:b},B(R)),{operationIn:C((()=>[s(r,{type:"primary",onClick:h},{default:C((()=>[n("提交")])),_:1})])),_:1},16),g,n(" "+d(B(R).formData),1)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/validate/automation/base.vue"]]);export{p as default};
