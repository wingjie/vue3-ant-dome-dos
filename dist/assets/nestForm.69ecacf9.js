import{_ as e}from"./index.113e8b82.js";import{_ as A}from"./index.33fde600.js";import{_ as t,d as a,r as i,j as n,k as l,i as s,o,h as C,a as r,w as E,F as B,A as D,c as d,B as p,u as m,m as g,x as y,X as u}from"./index.192a4aa9.js";import"./assign.78f966dc.js";import"./index.91b5c0ac.js";var c=t(a({__name:"nestForm",setup(t,{expose:a}){const c=i(),f=n([]);l((()=>{k.tableData.forEach((e=>{f.push(e.key)}))}));const k=n({tableData:[{name:"wing",age:"",sex:"0",like:[{writing:"",sing:"以父之名"},{writing:"",sing:""}],key:"1_1"},{name:"ring",age:"19",sex:"1",like:[{writing:"",sing:"乱舞春秋"},{writing:"",sing:""}],key:"2_2"}],columns:[{title:"姓名",key:"name",dataIndex:"name"},{title:"年龄",key:"age",type:"input"},{title:"性别",key:"sex",type:"select",config:{options:()=>[{label:"男",value:"0"},{label:"女",value:"1"}]}},{title:"爱好",key:"like",type:"slot",align:"center"}],fieldModel:{isForm:!0,follow:!0,rules:{age:[{required:!0,trigger:"change",message:"不能为空"}]},tableAttr:{expandIcon:()=>"",defaultExpandAllRows:!0,rowKey:"key",pagination:!1},config:{isForm:!0}}}),F=n({fieldList:[{label:"日期",key:"date",type:"input"},{label:"唱歌",key:"sing",type:"input"},{label:"写字",key:"writing",type:"input"}],formModel:{isForm:!0,follow:!0,rules:{sing:[{required:!0,trigger:"change",message:"不能为空"}]},tableAttr:{rowKey:"key",pagination:!1},config:{isForm:!0}}});function x(){c.value.validate().then((({status:e})=>{e||u.warning("校验没通过！")}))}return a({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%0A%20%20%20%20%20%20v-model%3AexpandedRowKeys%3D%22expandedRowKeys%22%0A%20%20%20%20%20%20ref%3D%22tableRef%22%0A%20%20%20%20%20%20v-bind%3D%22table%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23expandedRowRender%3D%22%7B%20record%2C%20actionData%3A%20%7B%20propName%20%7D%20%7D%22%3E%0A%20%20%20%20%20%20%20%20%3Ctemplate%20v-for%3D%22(item%2C%20index)%20in%20record.like%22%20%3Akey%3D%22item.key%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3CSForm%0A%20%20%20%20%20%20%20%20%20%20%20%20v-bind%3D%22nestForm%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Aname%3D%22%5B...propName%2C%20'like'%2C%20index%5D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3AformData%3D%22item%22%0A%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23likeIn%3D%22%7B%20data%20%7D%22%3E%0A%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20size%3D%22small%22%20%40click%3D%22open(data)%22%0A%20%20%20%20%20%20%20%20%20%20%3E%E7%82%B9%E5%87%BB%E8%AF%A6%E6%83%85%3C%2Fa-button%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSTable%3E%0A%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22validate%22%3E%E6%A0%A1%E9%AA%8C%3C%2Fa-button%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20message%20%7D%20from%20'ant-design-vue'%0A%0Aconst%20tableRef%20%3D%20ref()%0Aconst%20expandedRowKeys%20%3D%20reactive%3Cstring%5B%5D%3E(%5B%5D)%0AnextTick(()%20%3D%3E%20%7B%0A%20%20table.tableData.forEach((item)%20%3D%3E%20%7B%0A%20%20%20%20expandedRowKeys.push(item.key)%0A%20%20%7D)%0A%7D)%0Aconst%20table%20%3D%20reactive(%7B%0A%20%20tableData%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20name%3A%20'wing'%2C%0A%20%20%20%20%20%20age%3A%20''%2C%0A%20%20%20%20%20%20sex%3A%20'0'%2C%0A%20%20%20%20%20%20like%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%20writing%3A%20''%2C%20sing%3A%20'%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20writing%3A%20''%2C%20sing%3A%20''%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20key%3A%20'1_1'%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20name%3A%20'ring'%2C%0A%20%20%20%20%20%20age%3A%20'19'%2C%20%2F%2F%20%E5%80%BC%E6%B2%A1%E6%9C%89%E5%8C%B9%E9%85%8D%E7%9A%84%E9%A1%B9%EF%BC%8C%E5%88%99%E4%BC%9A%E7%9B%B4%E6%8E%A5%E5%B1%95%E7%A4%BA%E5%80%BC%0A%20%20%20%20%20%20sex%3A%20'1'%2C%0A%20%20%20%20%20%20like%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%20writing%3A%20''%2C%20sing%3A%20'%E4%B9%B1%E8%88%9E%E6%98%A5%E7%A7%8B'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20writing%3A%20''%2C%20sing%3A%20''%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20key%3A%20'2_2'%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20columns%3A%20%5B%0A%20%20%20%20%7B%20title%3A%20'%E5%A7%93%E5%90%8D'%2C%20key%3A%20'name'%2C%20dataIndex%3A%20'name'%20%7D%2C%0A%20%20%20%20%7B%20title%3A%20'%E5%B9%B4%E9%BE%84'%2C%20key%3A%20'age'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E6%80%A7%E5%88%AB'%2C%0A%20%20%20%20%20%20key%3A%20'sex'%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20options()%20%7B%0A%20%20%20%20%20%20%20%20%20%20return%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E7%94%B7'%2C%20value%3A%20'0'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%A5%B3'%2C%20value%3A%20'1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%20title%3A%20'%E7%88%B1%E5%A5%BD'%2C%20key%3A%20'like'%2C%20type%3A%20'slot'%2C%20align%3A%20'center'%20%7D%2C%0A%20%20%5D%2C%0A%20%20fieldModel%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20follow%3A%20true%2C%0A%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20age%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20%2F%2F%20expandRowByClick%3A%20false%2C%20%2F%2F%20%E7%82%B9%E5%87%BB%E8%A1%8C%E4%BB%BB%E6%84%8F%E5%9C%B0%E6%96%B9%E9%83%BD%E8%83%BD%E7%94%9F%E6%95%88%0A%20%20%20%20%20%20expandIcon%3A%20()%20%3D%3E%20''%2C%0A%20%20%20%20%20%20defaultExpandAllRows%3A%20true%2C%0A%20%20%20%20%20%20rowKey%3A%20'key'%2C%20%2F%2F%20%E5%BF%85%E9%A1%BB%E8%A6%81%E6%9C%89%E7%9A%84%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20nestForm%20%3D%20reactive(%7B%0A%20%20%2F%2F%20tableData%3A%20%5B%5D%2C%0A%20%20fieldList%3A%20%5B%0A%20%20%20%20%7B%20label%3A%20'%E6%97%A5%E6%9C%9F'%2C%20key%3A%20'date'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E5%94%B1%E6%AD%8C'%2C%20key%3A%20'sing'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E5%86%99%E5%AD%97'%2C%20key%3A%20'writing'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%5D%2C%0A%20%20formModel%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20follow%3A%20true%2C%0A%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20sing%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'change'%2C%20message%3A%20'%E4%B8%8D%E8%83%BD%E4%B8%BA%E7%A9%BA'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20rowKey%3A%20'key'%2C%20%2F%2F%20%E5%BF%85%E9%A1%BB%E8%A6%81%E6%9C%89%E7%9A%84%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Afunction%20validate()%20%7B%0A%20%20tableRef.value.validate().then((%7B%20status%20%7D%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20if%20(!status)%20%7B%0A%20%20%20%20%20%20message.warning('%E6%A0%A1%E9%AA%8C%E6%B2%A1%E9%80%9A%E8%BF%87%EF%BC%81')%0A%20%20%20%20%7D%0A%20%20%7D)%0A%7D%0Afunction%20open(data%3A%20any)%20%7B%0A%20%20const%20index%20%3D%20expandedRowKeys.findIndex((val)%20%3D%3E%20val%20%3D%3D%3D%20data.key)%0A%20%20if%20(index%20%3E%3D%200)%20%7B%0A%20%20%20%20expandedRowKeys.splice(index%2C%201)%0A%20%20%7D%20else%20%7B%0A%20%20%20%20expandedRowKeys.push(data.key)%0A%20%20%7D%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20order%3A%206%2C%0A%20%20title%3A%20'%E5%B5%8C%E5%A5%97%E8%A1%A8%E5%8D%95%EF%BC%88SForm%EF%BC%89'%2C%0A%20%20context%3A%20'%E8%A1%A8%E6%A0%BC%E5%B5%8C%E5%A5%97%E8%A1%A8%E5%8D%95%E6%97%B6%E5%80%99%2C%E5%B5%8C%E5%A5%97SForm%E6%97%B6%E5%80%99'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:i({order:6,title:"嵌套表单（SForm）",context:"表格嵌套表单时候,嵌套SForm时候"})}),(t,a)=>{const i=A,n=s("a-button"),l=e;return o(),C("div",null,[r(l,p({expandedRowKeys:m(f),"onUpdate:expandedRowKeys":a[0]||(a[0]=e=>y(f)?f.value=e:null),ref_key:"tableRef",ref:c},m(k)),{expandedRowRender:E((({record:e,actionData:{propName:A}})=>[(o(!0),C(B,null,D(e.like,((e,t)=>(o(),d(i,p({key:e.key},m(F),{name:[...A,"like",t],formData:e}),null,16,["name","formData"])))),128))])),likeIn:E((({data:e})=>[r(n,{type:"primary",size:"small",onClick:A=>function(e){const A=f.findIndex((A=>A===e.key));A>=0?f.splice(A,1):f.push(e.key)}(e)},{default:E((()=>[g("点击详情")])),_:2},1032,["onClick"])])),_:1},16,["expandedRowKeys"]),r(n,{type:"primary",onClick:x},{default:E((()=>[g("校验")])),_:1})])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/stable/automation/nestForm.vue"]]);export{c as default};
