System.register(["./index-legacy.746d6a82.js","./index-legacy.48e02610.js","./index-legacy.066d5db8.js","./form-legacy.03957b28.js","./assign-legacy.060bac80.js","./index-legacy.0581b260.js"],(function(e){"use strict";var A,a,l,t,r,n,o,C,s,i,u,B,D,c,m,E,d,p;return{setters:[function(e){A=e._},function(e){a=e._},function(e){l=e._,t=e.d,r=e.r,n=e.j,o=e.i,C=e.o,s=e.h,i=e.a,u=e.w,B=e.u,D=e.m,c=e.B,m=e.p,E=e.b,d=e.X},function(e){p=e.d},function(){},function(){}],execute:function(){const g=E("br",null,null,-1);e("default",l(t({__name:"upAndDown",setup(e,{expose:l}){const t=r(),E=n(p((()=>[{name:"wing",age:"",sex:0,isAge:!1,like:void 0,nature:[0,1],address:[],code:""},[{label:"名称",key:"name",type:"input"},{label:"性别",key:"sex",type:"radio-group"},{label:"年龄",key:"age",type:"input-number",config:{change(e){const{value:A,record:a}=e;a.isAge=A>=18}}},{label:"是否成年",key:"isAge",type:"switch"},{label:"性格",key:"nature",type:"checkbox-group"},{label:"爱好",key:"like",type:"select"},{label:"日期",key:"time",type:"date-picker",config:{valueFormat:"YYYY-MM-DD HH:mm:ss"}},{label:"备注",key:"remark",type:"textarea"},{label:"code",key:"code",type:"slot"},{label:" ",key:"operation",type:"slot"}],{span:12,formItemAttr:{labelCol:{span:24}},config:{isForm:!0},optionsData:{nature:[{label:"活泼",value:0},{label:"开朗",value:1}],sex:[{label:"男",value:0},{label:"女",value:1}],isAge:[{label:"是",value:!0},{label:"否",value:!1}],like:[{label:"唱歌",value:"sing"},{label:"跳舞",value:"dance"}]},rules:{name:[{required:!0,trigger:"blur",message:"不能为空"}],like:[{required:!0,trigger:"change",message:"不能为空"}],code:[{required:!0,trigger:"blur",message:"不能为空"}]}}])));function b(){t.value.validate().then((({status:e})=>{if(!e)return d.warning("请填写完整");d.success("提交成功")}))}return l({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSForm%20ref%3D%22formRef%22%20v-bind%3D%22form%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23codeIn%3E%0A%20%20%20%20%20%20%20%20%3CCodeEditor%20v-model%3D%22form.formData.code%22%3E%3C%2FCodeEditor%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23operationIn%3E%0A%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22submit%22%3E%E6%8F%90%E4%BA%A4%3C%2Fa-button%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSForm%3E%0A%20%20%20%20%3Cbr%20%2F%3E%0A%20%20%20%20%7B%7B%20form.formData%20%7D%7D%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20message%20%7D%20from%20'ant-design-vue'%0Aimport%20%7B%20defineForm%20%7D%20from%20'%40%2Fcommon%2Futils%2Fdefine%2Fform'%0A%0Aconst%20formRef%20%3D%20ref()%0Aconst%20form%20%3D%20reactive(%0A%20%20defineForm(()%20%3D%3E%20%7B%0A%20%20%20%20return%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20name%3A%20'wing'%2C%0A%20%20%20%20%20%20%20%20age%3A%20''%2C%0A%20%20%20%20%20%20%20%20sex%3A%200%2C%0A%20%20%20%20%20%20%20%20isAge%3A%20false%2C%0A%20%20%20%20%20%20%20%20like%3A%20undefined%2C%0A%20%20%20%20%20%20%20%20nature%3A%20%5B0%2C%201%5D%2C%0A%20%20%20%20%20%20%20%20address%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20code%3A%20''%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%90%8D%E7%A7%B0'%2C%20key%3A%20'name'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%80%A7%E5%88%AB'%2C%20key%3A%20'sex'%2C%20type%3A%20'radio-group'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%B9%B4%E9%BE%84'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'age'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'input-number'%2C%0A%20%20%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20change(data%3A%20any)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20%7B%20value%2C%20record%20%7D%20%3D%20data%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(value%20%3E%3D%2018)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20record.isAge%20%3D%20true%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20record.isAge%20%3D%20false%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%98%AF%E5%90%A6%E6%88%90%E5%B9%B4'%2C%20key%3A%20'isAge'%2C%20type%3A%20'switch'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%80%A7%E6%A0%BC'%2C%20key%3A%20'nature'%2C%20type%3A%20'checkbox-group'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E7%88%B1%E5%A5%BD'%2C%20key%3A%20'like'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E6%97%A5%E6%9C%9F'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'time'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'date-picker'%2C%0A%20%20%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20valueFormat%3A%20'YYYY-MM-DD%20HH%3Amm%3Ass'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%A4%87%E6%B3%A8'%2C%20key%3A%20'remark'%2C%20type%3A%20'textarea'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'code'%2C%20key%3A%20'code'%2C%20type%3A%20'slot'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%20'%2C%20key%3A%20'operation'%2C%20type%3A%20'slot'%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20span%3A%2012%2C%0A%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20labelCol%3A%20%7B%20span%3A%2024%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%2F%2F%20wrapperCol%3A%20%7B%20span%3A%20'number'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20optionsData%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20nature%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%B4%BB%E6%B3%BC'%2C%20value%3A%200%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%BC%80%E6%9C%97'%2C%20value%3A%201%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20sex%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E7%94%B7'%2C%20value%3A%200%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%A5%B3'%2C%20value%3A%201%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20isAge%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E6%98%AF'%2C%20value%3A%20true%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%90%A6'%2C%20value%3A%20false%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20like%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%94%B1%E6%AD%8C'%2C%20value%3A%20'sing'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E8%B7%B3%E8%88%9E'%2C%20value%3A%20'dance'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'blur'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20like%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20code%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'blur'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%0A%20%20%7D)%0A)%0A%0Afunction%20submit()%20%7B%0A%20%20formRef.value.validate().then((%7B%20status%20%7D%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20if%20(!status)%20%7B%0A%20%20%20%20%20%20return%20message.warning('%E8%AF%B7%E5%A1%AB%E5%86%99%E5%AE%8C%E6%95%B4')%0A%20%20%20%20%7D%0A%20%20%20%20message.success('%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F')%0A%20%20%7D)%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'label%E5%8D%95%E7%8B%AC%E4%B8%80%E8%A1%8C'%2C%0A%20%20order%3A%201%2C%0A%20%20context%3A%20%60formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20labelCol%3A%20%7B%20span%3A%2024%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%2F%2F%20wrapperCol%3A%20%7B%20span%3A%20'number'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%60%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:r({title:"label单独一行",order:1,context:"formItemAttr: {\n          labelCol: { span: 24 },\n          // wrapperCol: { span: 'number' },\n        },"})}),(e,l)=>{const r=a,n=o("a-button"),d=A;return C(),s("div",null,[i(d,c({ref_key:"formRef",ref:t},B(E)),{codeIn:u((()=>[i(r,{modelValue:B(E).formData.code,"onUpdate:modelValue":l[0]||(l[0]=e=>B(E).formData.code=e)},null,8,["modelValue"])])),operationIn:u((()=>[i(n,{type:"primary",onClick:b},{default:u((()=>[D("提交")])),_:1})])),_:1},16),g,D(" "+m(B(E).formData),1)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/sform/automation/upAndDown.vue"]]))}}}));
