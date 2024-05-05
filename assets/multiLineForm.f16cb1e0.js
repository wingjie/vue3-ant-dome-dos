import{_ as e}from"./index.e76cf722.js";import{_ as A}from"./index.5956f06d.js";import{_ as t,d as a,r as i,j as E,i as r,o as l,h as n,a as C,w as o,B,u as s,c as D,m as d,F as m}from"./index.0aa131dc.js";import"./assign.d33290b3.js";import"./index.7d12c3dd.js";var u=t(a({__name:"multiLineForm",setup(t,{expose:a}){const u=i(),c=E({isForm:!1,config:{isForm:!0},follow:!1,tableAttr:{rowKey:"key",pagination:!1},rules:{type:[{required:!0,trigger:"change",message:"不能为空"}]}}),g=E([{title:"工单",key:"order",dataIndex:"order",width:100,type:"input",rules:[{required:!0,trigger:"change",message:"不能为空"}]},{title:"级别",key:"great",type:"slotOut",slotHead:!0,configData:"content",width:250,content:{borderColor:"red",before:[{width:50,title:"类型",key:"type",type:"input",isForm:!0}],configData:"msg",msg:{width:150,borderColor:"pink",before:[{width:100,title:"姓名",key:"name",type:"input",isForm:!0,formItemAttr:{rules:[{required:!0,trigger:"change",message:"不能为空"}]}},{width:50,title:"年龄",key:"age",type:"select",isForm:!0}]},after:[{width:50,title:"日期",key:"time"}]}}]),f=E([{order:"23232323-23",content:[{type:"",time:"2022/23/23",msg:[{name:"wing",age:"17"},{name:"ring",age:"18"}]},{type:"B",time:"2022/23/21",msg:[{name:"name",age:"age"}]}]},{order:"23232323-21",content:[{type:"C",time:"2022/23/22",msg:[{name:"wing",age:"17"}]}]}]),F=i(!1);function p(){u.value.updateAll(),F.value=!0}function y(){u.value.cancelAll(),F.value=!1}function b(){u.value.validate().then((({status:e})=>{e&&(u.value.confirmAll(),F.value=!1)}))}return a({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%20ref%3D%22tableRef%22%20v-bind%3D%22%7B%20fieldModel%2C%20columns%2C%20tableData%20%7D%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23header-great%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3CSMultiLine%20v-bind%3D%22data%22%20%3Aheader%3D%22true%22%20%2F%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23great%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3CSMultiLine%20v-bind%3D%22data%22%20%3AdefaultOnOff%3D%22true%22%20%2F%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSTable%3E%0A%20%20%20%20%3Ca-button%20type%3D%22primary%22%20v-if%3D%22!isEdit%22%20%40click%3D%22editFn%22%3E%E4%BF%AE%E6%94%B9%3C%2Fa-button%3E%0A%20%20%20%20%3Ctemplate%20v-else%3E%0A%20%20%20%20%20%20%3Ca-button%20%40click%3D%22cancelAll%22%3E%E5%8F%96%E6%B6%88%3C%2Fa-button%3E%0A%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22confirmAll%22%3E%E4%BF%9D%E5%AD%98%3C%2Fa-button%3E%0A%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20tableRef%20%3D%20ref()%0Aconst%20fieldModel%20%3D%20reactive(%7B%0A%20%20isForm%3A%20false%2C%0A%20%20config%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%7D%2C%0A%20%20follow%3A%20false%2C%0A%20%20tableAttr%3A%20%7B%0A%20%20%20%20rowKey%3A%20'key'%2C%0A%20%20%20%20pagination%3A%20false%2C%0A%20%20%7D%2C%0A%20%20rules%3A%20%7B%0A%20%20%20%20type%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20columns%20%3D%20reactive(%5B%0A%20%20%7B%0A%20%20%20%20title%3A%20'%E5%B7%A5%E5%8D%95'%2C%0A%20%20%20%20key%3A%20'order'%2C%0A%20%20%20%20dataIndex%3A%20'order'%2C%0A%20%20%20%20width%3A%20100%2C%0A%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20rules%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20title%3A%20'%E7%BA%A7%E5%88%AB'%2C%0A%20%20%20%20key%3A%20'great'%2C%0A%20%20%20%20type%3A%20'slotOut'%2C%20%2F%2F%20%3F!%E8%BF%99%E9%87%8C%E9%9C%80%E8%A6%81%E7%94%A8slotOut%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%A6%81%E8%88%8D%E5%BC%83%E8%87%AA%E5%B8%A6%E7%9A%84formItem%0A%20%20%20%20slotHead%3A%20true%2C%20%2F%2F%20%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4%0A%20%20%20%20configData%3A%20'content'%2C%20%2F%2F%20%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E7%9A%84key%0A%20%20%20%20width%3A%20250%2C%20%2F%2F%20%E6%80%BB%E5%85%B1%E6%8B%86%E5%88%86%E5%88%97%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20content%3A%20%7B%0A%20%20%20%20%20%20borderColor%3A%20'red'%2C%20%2F%2F%20%E4%B8%8B%E5%88%92%E7%BA%BF%E9%A2%9C%E8%89%B2%0A%20%20%20%20%20%20before%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20width%3A%2050%2C%0A%20%20%20%20%20%20%20%20%20%20title%3A%20'%E7%B1%BB%E5%9E%8B'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'type'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20configData%3A%20'msg'%2C%0A%20%20%20%20%20%20msg%3A%20%7B%0A%20%20%20%20%20%20%20%20width%3A%20150%2C%0A%20%20%20%20%20%20%20%20%2F%2F%20%E5%A6%82%E6%9E%9C%E6%AD%A4%E5%A4%84%E9%9C%80%E8%A6%81%E7%BB%A7%E7%BB%AD%E6%8B%86%E5%88%86%0A%20%20%20%20%20%20%20%20borderColor%3A%20'pink'%2C%20%2F%2F%20%E4%B8%8B%E5%88%92%E7%BA%BF%E9%A2%9C%E8%89%B2%0A%20%20%20%20%20%20%20%20before%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width%3A%20100%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20title%3A%20'%E5%A7%93%E5%90%8D'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20key%3A%20'name'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20rules%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width%3A%2050%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20title%3A%20'%E5%B9%B4%E9%BE%84'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20key%3A%20'age'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20after%3A%20%5B%7B%20width%3A%2050%2C%20title%3A%20'%E6%97%A5%E6%9C%9F'%2C%20key%3A%20'time'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%5D)%0Aconst%20tableData%20%3D%20reactive(%5B%0A%20%20%7B%0A%20%20%20%20order%3A%20'23232323-23'%2C%0A%20%20%20%20content%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20''%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F23'%2C%0A%20%20%20%20%20%20%20%20msg%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20name%3A%20'wing'%2C%20age%3A%20'17'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20name%3A%20'ring'%2C%20age%3A%20'18'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20'B'%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F21'%2C%0A%20%20%20%20%20%20%20%20msg%3A%20%5B%7B%20name%3A%20'name'%2C%20age%3A%20'age'%20%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20order%3A%20'23232323-21'%2C%0A%20%20%20%20content%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20'C'%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F22'%2C%0A%20%20%20%20%20%20%20%20msg%3A%20%5B%7B%20name%3A%20'wing'%2C%20age%3A%20'17'%20%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%5D)%0Aconst%20isEdit%20%3D%20ref(false)%0Afunction%20editFn()%20%7B%0A%20%20tableRef.value.updateAll()%0A%20%20isEdit.value%20%3D%20true%0A%7D%0Afunction%20cancelAll()%20%7B%0A%20%20tableRef.value.cancelAll()%0A%20%20isEdit.value%20%3D%20false%0A%7D%0Afunction%20confirmAll()%20%7B%0A%20%20tableRef.value.validate().then((%7B%20status%20%7D%3A%20%7B%20status%3A%20boolean%20%7D)%20%3D%3E%20%7B%0A%20%20%20%20if%20(status)%20%7B%0A%20%20%20%20%20%20tableRef.value.confirmAll()%0A%20%20%20%20%20%20isEdit.value%20%3D%20false%0A%20%20%20%20%7D%0A%20%20%7D)%0A%7D%0A%0Aconst%20%24config%20%3D%20reactive(%7B%0A%20%20title%3A%20'%E4%BD%BF%E7%94%A8form%E8%A1%A8%E5%8D%95'%2C%0A%20%20context%3A%0A%20%20%20%20'%E9%80%9A%E8%BF%87%E9%85%8D%E7%BD%AEcolumns%E5%8F%AF%E4%BB%A5%E6%97%A0%E9%99%90%E7%9A%84%E6%8B%86%E5%88%86%3BconfigData%E6%98%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8B%86%E5%88%86%E7%9A%84key%EF%BC%8C%E5%A6%82%E7%A4%BA%E4%BE%8B%E4%B8%ADmsg%E5%AD%97%E6%AE%B5%EF%BC%88key%EF%BC%89'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:E({title:"使用form表单",context:"通过配置columns可以无限的拆分;configData是自定义拆分的key，如示例中msg字段（key）"})}),(t,a)=>{const i=A,E=e,v=r("a-button");return l(),n("div",null,[C(E,B({ref_key:"tableRef",ref:u},{fieldModel:s(c),columns:s(g),tableData:s(f)}),{"header-great":o((e=>[C(i,B(e,{header:!0}),null,16)])),great:o((e=>[C(i,B(e,{defaultOnOff:!0}),null,16)])),_:1},16),s(F)?(l(),n(m,{key:1},[C(v,{onClick:y},{default:o((()=>[d("取消")])),_:1}),C(v,{type:"primary",onClick:b},{default:o((()=>[d("保存")])),_:1})],64)):(l(),D(v,{key:0,type:"primary",onClick:p},{default:o((()=>[d("修改")])),_:1}))])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/sMultiLine/automation/multiLineForm.vue"]]);export{u as default};
