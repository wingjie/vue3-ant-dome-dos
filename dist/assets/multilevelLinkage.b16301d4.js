import{_ as e}from"./index.730e36e6.js";import{_ as A}from"./index.6059d1b3.js";import{_ as t,d as a,r as o,j as l,i as C,o as i,h as r,a as n,w as B,B as E,u as s,m as D}from"./index.9007bae4.js";import{m as u}from"./linkageHookTable.d682f1bb.js";import"./assign.63c28320.js";import"./index.08d64f08.js";var m=t(a({__name:"multilevelLinkage",setup(t,{expose:a}){const m=[{label:"A",value:"a",menuItems:[{label:"A-1",value:"a-1",menuItems:[{label:"A-1-1",value:"a-1-1"},{label:"A-1-2",value:"a-1-2"}]},{label:"B-1",value:"b-1",menuItems:[{label:"B-1-1",value:"b-1-1"},{label:"B-1-2",value:"b-1-2"}]}]},{label:"B",value:"b",menuItems:[{label:"B-1",value:"b-1",menuItems:[{}]}]}],[d]=u([{width:100,formItemAttr:{rules:[{required:!0,trigger:"change",message:"不能为空"}]},type:"select",isForm:!0,config:{options:()=>m}},{width:100,type:"select",isForm:!0},{width:100,type:"select",isForm:!0},{width:100,type:"select",isForm:!0},{width:100,type:"select",isForm:!0}]),c=o(),b=l({isForm:!0,config:{isForm:!0},follow:!0,tableAttr:{rowKey:"key",pagination:!1}}),p=l([{title:"工单",key:"order",dataIndex:"order",type:"input",width:150,rules:[{required:!0,trigger:"change",message:"不能为空"}]},{title:"级别",key:"great",type:"slotOut",slotHead:!0,configData:"content",width:600,content:{borderColor:"red",before:[{width:50,title:"类型",key:"type",type:"input",formItemAttr:{rules:[{required:!0,trigger:"change",message:"不能为空"}]},isForm:!0}],configData:"content",content:{width:500,borderColor:"pink",before:[...d]},after:[{width:50,title:"日期",key:"time"}]}}]),F=l([{order:"23232323-23",content:[{type:"",time:"2022/23/23",content:[{one:"a",two:"a-1",three:"a-1-1"},{one:"b",two:"b-2"}]},{type:"B",time:"2022/23/21",content:[{}]}]},{order:"23232323-21",content:[{type:"C",time:"2022/23/22",content:[{}]}]}]);function f(){c.value.validate()}return a({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%20ref%3D%22tableRef%22%20v-bind%3D%22%7B%20fieldModel%2C%20columns%2C%20tableData%20%7D%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23header-great%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3CSMultiLine%20v-bind%3D%22data%22%20%3Aheader%3D%22true%22%20%2F%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23great%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3CSMultiLine%20v-bind%3D%22data%22%20%3AdefaultOnOff%3D%22true%22%20%2F%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSTable%3E%0A%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22fn%22%3E%E6%A0%A1%E9%AA%8C%3C%2Fa-button%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20linkageHookTable%20from%20'%40%2Fcommon%2Fhook%2FlinkageHookTable'%0A%0Aconst%20optionData%20%3D%20%5B%0A%20%20%7B%0A%20%20%20%20label%3A%20'A'%2C%0A%20%20%20%20value%3A%20'a'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'A-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'a-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-1'%2C%20value%3A%20'a-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-2'%2C%20value%3A%20'a-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-1'%2C%20value%3A%20'b-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-2'%2C%20value%3A%20'b-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20label%3A%20'B'%2C%0A%20%20%20%20value%3A%20'b'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%7B%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%5D%0Aconst%20%5BfieldList%5D%20%3D%20linkageHookTable(%5B%0A%20%20%7B%0A%20%20%20%20width%3A%20100%2C%0A%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20rules%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20options()%20%7B%0A%20%20%20%20%20%20%20%20return%20optionData%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%20%20%7B%20width%3A%20100%2C%20type%3A%20'select'%2C%20isForm%3A%20true%20%7D%2C%0A%20%20%7B%20width%3A%20100%2C%20type%3A%20'select'%2C%20isForm%3A%20true%20%7D%2C%0A%20%20%7B%20width%3A%20100%2C%20type%3A%20'select'%2C%20isForm%3A%20true%20%7D%2C%0A%20%20%7B%20width%3A%20100%2C%20type%3A%20'select'%2C%20isForm%3A%20true%20%7D%2C%0A%5D)%0A%0Aconst%20tableRef%20%3D%20ref()%0Aconst%20fieldModel%20%3D%20reactive(%7B%0A%20%20isForm%3A%20true%2C%0A%20%20config%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%7D%2C%0A%20%20follow%3A%20true%2C%0A%20%20tableAttr%3A%20%7B%0A%20%20%20%20rowKey%3A%20'key'%2C%0A%20%20%20%20pagination%3A%20false%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20columns%20%3D%20reactive(%5B%0A%20%20%7B%0A%20%20%20%20title%3A%20'%E5%B7%A5%E5%8D%95'%2C%0A%20%20%20%20key%3A%20'order'%2C%0A%20%20%20%20dataIndex%3A%20'order'%2C%0A%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20width%3A%20150%2C%0A%20%20%20%20rules%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20title%3A%20'%E7%BA%A7%E5%88%AB'%2C%0A%20%20%20%20key%3A%20'great'%2C%0A%20%20%20%20type%3A%20'slotOut'%2C%20%2F%2F%20%3F!%E8%BF%99%E9%87%8C%E9%9C%80%E8%A6%81%E7%94%A8slotOut%EF%BC%8C%E5%9B%A0%E4%B8%BA%E8%A6%81%E8%88%8D%E5%BC%83%E8%87%AA%E5%B8%A6%E7%9A%84formItem%0A%20%20%20%20slotHead%3A%20true%2C%20%2F%2F%20%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4%0A%20%20%20%20configData%3A%20'content'%2C%20%2F%2F%20%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E7%9A%84key%0A%20%20%20%20width%3A%20600%2C%20%2F%2F%20%E6%80%BB%E5%85%B1%E6%8B%86%E5%88%86%E5%88%97%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20content%3A%20%7B%0A%20%20%20%20%20%20borderColor%3A%20'red'%2C%20%2F%2F%20%E4%B8%8B%E5%88%92%E7%BA%BF%E9%A2%9C%E8%89%B2%0A%20%20%20%20%20%20before%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20width%3A%2050%2C%0A%20%20%20%20%20%20%20%20%20%20title%3A%20'%E7%B1%BB%E5%9E%8B'%2C%0A%20%20%20%20%20%20%20%20%20%20key%3A%20'type'%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20rules%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20configData%3A%20'content'%2C%0A%20%20%20%20%20%20content%3A%20%7B%0A%20%20%20%20%20%20%20%20width%3A%20500%2C%0A%20%20%20%20%20%20%20%20%2F%2F%20%E5%A6%82%E6%9E%9C%E6%AD%A4%E5%A4%84%E9%9C%80%E8%A6%81%E7%BB%A7%E7%BB%AD%E6%8B%86%E5%88%86%0A%20%20%20%20%20%20%20%20borderColor%3A%20'pink'%2C%20%2F%2F%20%E4%B8%8B%E5%88%92%E7%BA%BF%E9%A2%9C%E8%89%B2%0A%20%20%20%20%20%20%20%20before%3A%20%5B...fieldList%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20after%3A%20%5B%7B%20width%3A%2050%2C%20title%3A%20'%E6%97%A5%E6%9C%9F'%2C%20key%3A%20'time'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%5D)%0Aconst%20tableData%20%3D%20reactive(%5B%0A%20%20%7B%0A%20%20%20%20order%3A%20'23232323-23'%2C%0A%20%20%20%20content%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20''%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F23'%2C%0A%20%20%20%20%20%20%20%20content%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20one%3A%20'a'%2C%20two%3A%20'a-1'%2C%20three%3A%20'a-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20one%3A%20'b'%2C%20two%3A%20'b-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20'B'%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F21'%2C%0A%20%20%20%20%20%20%20%20content%3A%20%5B%7B%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20order%3A%20'23232323-21'%2C%0A%20%20%20%20content%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20type%3A%20'C'%2C%0A%20%20%20%20%20%20%20%20time%3A%20'2022%2F23%2F22'%2C%0A%20%20%20%20%20%20%20%20content%3A%20%5B%7B%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%5D)%0Afunction%20fn()%20%7B%0A%20%20tableRef.value.validate()%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%A4%9A%E7%BA%A7%E8%81%94%E5%8A%A8(hook%3AlinkageHookTable)'%2C%0A%20%20context%3A%0A%20%20%20%20'%E8%A1%A8%E6%A0%BC%E8%A1%8C%E5%86%85%E5%A4%9A%E7%BA%A7%E8%81%94%E5%8A%A8%E3%80%82%E4%BD%BF%E7%94%A8hook%20linkageHookTable%2C%E5%85%A5%E5%8F%82linkageHookTable(option)%E5%8F%AF%E4%BB%A5%E5%AF%B9%E9%BB%98%E8%AE%A4%E5%80%BC%E8%BF%9B%E8%A1%8C%E8%A6%86%E7%9B%96%E6%9B%B4%E6%94%B9(key%E3%80%81title...)%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:o({title:"多级联动(hook:linkageHookTable)",context:"表格行内多级联动。使用hook linkageHookTable,入参linkageHookTable(option)可以对默认值进行覆盖更改(key、title...)。"})}),(t,a)=>{const o=A,l=e,u=C("a-button");return i(),r("div",null,[n(l,E({ref_key:"tableRef",ref:c},{fieldModel:s(b),columns:s(p),tableData:s(F)}),{"header-great":B((e=>[n(o,E(e,{header:!0}),null,16)])),great:B((e=>[n(o,E(e,{defaultOnOff:!0}),null,16)])),_:1},16),n(u,{type:"primary",onClick:f},{default:B((()=>[D("校验")])),_:1})])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/sMultiLine/automation/multilevelLinkage.vue"]]);export{m as default};