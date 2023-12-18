import{_ as A}from"./index.6b28bf45.js";import{_ as e,d as a,r as t,g as l,f as o,k as E,j as r,i as s,o as i,h as n,a as C,w as B,m as D,B as u,u as m,p as v,b as f,X as c}from"./index.9007bae4.js";import{d}from"./form.6e3b09cc.js";import{v as p}from"./validate.92c083dc.js";import"./assign.63c28320.js";import"./index.08d64f08.js";const F=f("br",null,null,-1);var b=e(a({__name:"dynamic",setup(e,{expose:a}){const f=t(),b=t([]),g=l((()=>p(b.value.join("")||void 0))),y={required:!1,trigger:"change",validator:g.value};o((()=>g.value),(A=>{y.validator=A,E((()=>{f.value.validate(["value"])}))}));const x=r(d((()=>[{type:b,value:""},[{label:"动态类型",key:"type",type:"select",config:{mode:"multiple"},formItemAttr:{extra:"只能填包含在'ASRWYPL'中的字符"}},{label:"动态",key:"value",type:"textarea",formItemAttr:{extra:l((()=>`本条检验规则是' ${b.value.join("")} '中的字符`))}},{label:" ",key:"operation",type:"slot"}],{span:24,config:{isForm:!0},optionsData:{type:[{label:"A",value:"A"},{label:"S",value:"S"},{label:"R",value:"R"},{label:"W",value:"W"},{label:"Y",value:"Y"},{label:"P",value:"P"},{label:"L",value:"L"}]},rules:{value:[y]}}])));function j(){f.value.validate().then((({status:A})=>{if(!A)return c.warning("请填写符合规则");c.success("提交成功")}))}return a({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSForm%20ref%3D%22formRef%22%20v-bind%3D%22form%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23operationIn%3E%0A%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22submit%22%3E%E6%8F%90%E4%BA%A4%3C%2Fa-button%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSForm%3E%0A%20%20%20%20%3Cbr%20%2F%3E%0A%20%20%20%20%7B%7B%20form.formData%20%7D%7D%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20message%20%7D%20from%20'ant-design-vue'%0Aimport%20%7B%20defineForm%20%7D%20from%20'%40%2Fcommon%2Futils%2Fdefine%2Fform'%0Aimport%20%7B%20valid%20%7D%20from%20'%40%2Fcommon%2Futils%2Fvalidate'%0A%0Aconst%20formRef%20%3D%20ref()%0Aconst%20Dong%20%3D%20ref(%5B%5D)%0Aconst%20dongV%20%3D%20computed(()%20%3D%3E%20valid(Dong.value.join('')%20%7C%7C%20undefined))%0Aconst%20obj%20%3D%20%7B%20required%3A%20false%2C%20trigger%3A%20'change'%2C%20validator%3A%20dongV.value%20%7D%0Awatch(%0A%20%20()%20%3D%3E%20dongV.value%2C%0A%20%20(val)%20%3D%3E%20%7B%0A%20%20%20%20obj.validator%20%3D%20val%0A%20%20%20%20nextTick(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20formRef.value.validate(%5B'value'%5D)%0A%20%20%20%20%7D)%0A%20%20%7D%0A)%0Aconst%20form%20%3D%20reactive(%0A%20%20defineForm(()%20%3D%3E%20%7B%0A%20%20%20%20return%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20Dong%2C%0A%20%20%20%20%20%20%20%20value%3A%20''%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%8A%A8%E6%80%81%E7%B1%BB%E5%9E%8B'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'type'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20mode%3A%20'multiple'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%20extra%3A%20%22%E5%8F%AA%E8%83%BD%E5%A1%AB%E5%8C%85%E5%90%AB%E5%9C%A8'ASRWYPL'%E4%B8%AD%E7%9A%84%E5%AD%97%E7%AC%A6%22%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%8A%A8%E6%80%81'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'value'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'textarea'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20extra%3A%20computed(%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20()%20%3D%3E%20%60%E6%9C%AC%E6%9D%A1%E6%A3%80%E9%AA%8C%E8%A7%84%E5%88%99%E6%98%AF'%20%24%7BDong.value.join('')%7D%20'%E4%B8%AD%E7%9A%84%E5%AD%97%E7%AC%A6%60%0A%20%20%20%20%20%20%20%20%20%20%20%20)%20as%20any%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%20'%2C%20key%3A%20'operation'%2C%20type%3A%20'slot'%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%2F%2F%20isForm%3A%20false%2C%0A%20%20%20%20%20%20%20%20span%3A%2024%2C%0A%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20optionsData%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A'%2C%20value%3A%20'A'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'S'%2C%20value%3A%20'S'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'R'%2C%20value%3A%20'R'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'W'%2C%20value%3A%20'W'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'Y'%2C%20value%3A%20'Y'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'P'%2C%20value%3A%20'P'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'L'%2C%20value%3A%20'L'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20value%3A%20%5Bobj%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%0A%20%20%7D)%0A)%0A%0Afunction%20submit()%20%7B%0A%20%20formRef.value.validate().then((%7B%20status%20%7D%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20if%20(!status)%20%7B%0A%20%20%20%20%20%20return%20message.warning('%E8%AF%B7%E5%A1%AB%E5%86%99%E7%AC%A6%E5%90%88%E8%A7%84%E5%88%99')%0A%20%20%20%20%7D%0A%20%20%20%20message.success('%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F')%0A%20%20%7D)%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%8A%A8%E6%80%81%E7%94%9F%E6%88%90%EF%BC%8C%E5%8A%A8%E6%80%81%E4%BD%BF%E7%94%A8'%2C%0A%20%20order%3A%202%2C%0A%20%20context%3A%0A%20%20%20%20'%E6%9C%AC%E7%A4%BA%E4%BE%8B%E5%B9%B6%E9%9D%9E%E6%98%AF%E6%83%B3%E5%BD%93%E5%81%9A%E6%A8%A1%E7%89%88%E4%BD%BF%E7%94%A8%EF%BC%8C%E6%98%AF%E4%B8%BA%E4%BA%86%E7%90%86%E8%A7%A3%E8%BF%99%E7%A7%8D%E5%8F%AF%E8%87%AA%E7%94%B1%E6%8B%BC%E6%8E%A5%E3%80%81%E6%8B%86%E5%8D%B8%E7%9A%84%E6%A8%A1%E5%BC%8F%E3%80%82%E6%89%80%E4%BB%A5%E4%BB%85%E5%81%9A%E5%8F%82%E8%80%83%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:t({title:"动态生成，动态使用",order:2,context:"本示例并非是想当做模版使用，是为了理解这种可自由拼接、拆卸的模式。所以仅做参考。"})}),(e,a)=>{const t=s("a-button"),l=A;return i(),n("div",null,[C(l,u({ref_key:"formRef",ref:f},m(x)),{operationIn:B((()=>[C(t,{type:"primary",onClick:j},{default:B((()=>[D("提交")])),_:1})])),_:1},16),F,D(" "+v(m(x).formData),1)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/validate/automation/dynamic.vue"]]);export{b as default};