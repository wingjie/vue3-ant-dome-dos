import{_ as a}from"./index.d03556f7.js";import{_ as e,d as t,j as A,r as i,i as n,o as l,h as o,m as s,p as C,u as E,a as c,w as D,c as B,F as d,C as p,D as r}from"./index.2a159d84.js";import"./assign.100075da.js";import"./index.c60d42ea.js";var u=e(t({__name:"editSave",setup(e,{expose:t}){const u=A({tableData:[{name:"wing",age:"18",like:void 0},{name:"ring",age:"19",like:"sing"}],columns:[{title:"名称",key:"name",type:"input"},{title:"年龄",key:"age",type:"input"},{title:"爱好",key:"like",type:"select"},{title:"操作",key:"operation",type:"slot",align:"center"}],fieldModel:{isForm:!1,follow:!1,config:{isForm:!0},optionsData:{like:[{label:"唱歌",value:"sing"},{label:"跳舞",value:"dance"}]},tableAttr:{pagination:!1}}});return t({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%7B%7B%20tableData.tableData%20%7D%7D%0A%20%20%20%20%3CSTable%20v-bind%3D%22tableData%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23operationIn%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3Ca-space%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ca-button%20v-if%3D%22!data.isEdit%22%20type%3D%22primary%22%20%40click%3D%22editRow(data)%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3E%E7%BC%96%E8%BE%91%3C%2Fa-button%0A%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20v-else%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ca-button%20%40click%3D%22cancelRow(data)%22%3E%E5%8F%96%E6%B6%88%3C%2Fa-button%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22confirmRow(data)%22%3E%E4%BF%9D%E5%AD%98%3C%2Fa-button%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%20%20%3C%2Fa-space%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSTable%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20tableData%20%3D%20reactive(%7B%0A%20%20tableData%3A%20%5B%0A%20%20%20%20%7B%20name%3A%20'wing'%2C%20age%3A%20'18'%2C%20like%3A%20undefined%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20'ring'%2C%20age%3A%20'19'%2C%20like%3A%20'sing'%20%7D%2C%0A%20%20%5D%2C%0A%20%20columns%3A%20%5B%0A%20%20%20%20%7B%20title%3A%20'%E5%90%8D%E7%A7%B0'%2C%20key%3A%20'name'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20title%3A%20'%E5%B9%B4%E9%BE%84'%2C%20key%3A%20'age'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20title%3A%20'%E7%88%B1%E5%A5%BD'%2C%20key%3A%20'like'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%7B%20title%3A%20'%E6%93%8D%E4%BD%9C'%2C%20key%3A%20'operation'%2C%20type%3A%20'slot'%2C%20align%3A%20'center'%20%7D%2C%0A%20%20%5D%2C%0A%20%20fieldModel%3A%20%7B%0A%20%20%20%20isForm%3A%20false%2C%0A%20%20%20%20follow%3A%20false%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20optionsData%3A%20%7B%0A%20%20%20%20%20%20like%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E5%94%B1%E6%AD%8C'%2C%20value%3A%20'sing'%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%20label%3A%20'%E8%B7%B3%E8%88%9E'%2C%20value%3A%20'dance'%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Afunction%20editRow(data%3A%20any)%20%7B%0A%20%20const%20%7B%20way%20%7D%20%3D%20data%0A%20%20way.update()%0A%7D%0Afunction%20cancelRow(data%3A%20any)%20%7B%0A%20%20const%20%7B%20way%20%7D%20%3D%20data%0A%20%20way.cancel()%0A%7D%0Afunction%20confirmRow(data%3A%20any)%20%7B%0A%20%20const%20%7B%20way%20%7D%20%3D%20data%0A%20%20way.confirm()%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E8%A1%8C%E4%BF%AE%E6%94%B9%E3%80%81%E7%BC%96%E8%BE%91%E3%80%81%E4%BF%9D%E5%AD%98'%2C%0A%20%20order%3A%203%2C%0A%20%20context%3A%20'%E8%A1%8C%E5%86%85%E7%BC%96%E8%BE%91%E7%9A%84%E5%8A%9F%E8%83%BD%E3%80%82%E4%BD%BF%E7%94%A8%E6%8F%92%E6%A7%BDslot%2Cway%E4%B8%AD%E7%9A%84%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:i({title:"行修改、编辑、保存",order:3,context:"行内编辑的功能。使用插槽slot,way中的操作方法。"})}),(e,t)=>{const A=n("a-button"),i=n("a-space"),y=a;return l(),o("div",null,[s(C(E(u).tableData)+" ",1),c(y,p(r(E(u))),{operationIn:D((a=>[c(i,null,{default:D((()=>[a.isEdit?(l(),o(d,{key:1},[c(A,{onClick:e=>function(a){const{way:e}=a;e.cancel()}(a)},{default:D((()=>[s("取消")])),_:2},1032,["onClick"]),c(A,{type:"primary",onClick:e=>function(a){const{way:e}=a;e.confirm()}(a)},{default:D((()=>[s("保存")])),_:2},1032,["onClick"])],64)):(l(),B(A,{key:0,type:"primary",onClick:e=>function(a){const{way:e}=a;e.update()}(a)},{default:D((()=>[s("编辑")])),_:2},1032,["onClick"]))])),_:2},1024)])),_:1},16)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/stable/automation/editSave.vue"]]);export{u as default};