import{_ as e}from"./index.5ce7cacb.js";import{_ as A}from"./remove-circle-outline.fc08e8cc.js";import{_ as a}from"./ios-add-circle-outline.d4b6d92c.js";import{_ as l,d as t,j as i,r as n,i as o,o as s,h as r,a as C,w as p,F as E,A as c,c as B,B as d,u as m,q as D,C as f,D as y}from"./index.f5ec6ae1.js";import"./assign.fe476b07.js";import"./index.6676c71c.js";var u=l(t({__name:"addRemove",setup(l,{expose:t}){const u=i({formData:{name:"wing",age:"18",like:[{}]},fieldList:[{label:"姓名",key:"name",type:"input"},{label:"年纪",key:"ages",type:"select"},{label:"爱好",key:"like",type:"slot",span:24,formItemAttr:{wrapperCol:{span:24}}}],formModel:{isForm:!0,span:10,formItemAttr:{"label-col":{style:{width:"150px"}},wrapperCol:{span:14}},config:{isForm:!0},columnsConfig:{type:"input"},tableAttr:{pagination:!1}}}),k=i({fieldList:[{label:"",key:"time",config:{placeholder:"请输入日期"},type:"input",span:6},{label:"",key:"sing",config:{placeholder:"请输入歌曲"},type:"select",span:6},{label:"",key:"dance",config:{placeholder:"请输入舞曲"},type:"select",span:6},{label:"",key:"operation",type:"slot",align:"center",span:6}],formModel:{span:8,formItemAttr:{labelCol:{span:0},wrapperCol:{span:24}}}}),b={sing:void 0,dance:void 0};function g(e,A){e.splice(A+1,0,{...b})}return t({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSForm%20v-bind%3D%22form%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23likeIn%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3Ca-form-item-rest%3E%0A%20%20%20%20%20%20%20%20%20%20%3CSForm%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Aname%3D%22%5B'like'%5D%22%0A%20%20%20%20%20%20%20%20%20%20%20%20v-for%3D%22(item%2C%20index)%20in%20data.data.like%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Akey%3D%22index%22%0A%20%20%20%20%20%20%20%20%20%20%20%20v-bind%3D%22formIn%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%3AformData%3D%22item%22%0A%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctemplate%20%23operationIn%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca-space%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Asize%3D%228%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20style%3D%22cursor%3A%20pointer%3B%20font-size%3A%2016px%3B%20color%3A%20%23108de9%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ci-ion-ios-add-circle-outline%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%40click%3D%22add(data.data.like%2C%20index)%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ci-ion-remove-circle-outline%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20v-if%3D%22data.data.like.length%20%3E%201%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%40click%3D%22del(data.data.like%2C%20index)%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa-space%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FSForm%3E%0A%20%20%20%20%20%20%20%20%3C%2Fa-form-item-rest%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSForm%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20form%20%3D%20reactive(%7B%0A%20%20formData%3A%20%7B%20name%3A%20'wing'%2C%20age%3A%20'18'%2C%20like%3A%20%5B%7B%7D%5D%20%7D%2C%0A%20%20fieldList%3A%20%5B%0A%20%20%20%20%7B%20label%3A%20'%E5%A7%93%E5%90%8D'%2C%20key%3A%20'name'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E5%B9%B4%E7%BA%AA'%2C%20key%3A%20'ages'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20label%3A%20'%E7%88%B1%E5%A5%BD'%2C%0A%20%20%20%20%20%20key%3A%20'like'%2C%0A%20%20%20%20%20%20type%3A%20'slot'%2C%0A%20%20%20%20%20%20span%3A%2024%2C%0A%20%20%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20%20%20wrapperCol%3A%20%7B%20span%3A%2024%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20formModel%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20span%3A%2010%2C%0A%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20'label-col'%3A%20%7B%20style%3A%20%7B%20width%3A%20'150px'%20%7D%20%7D%2C%20%2F%2F%20!%20%E5%86%99style%E6%A0%B7%E5%BC%8F%E7%9A%84%E6%97%B6%E5%80%99%E8%AE%B0%E5%BE%97%E7%94%A8%E2%80%94%E5%88%86%E9%9A%94%E7%9A%84%E5%BD%A2%E5%BC%8F%E4%B9%A6%E5%86%99%0A%20%20%20%20%20%20wrapperCol%3A%20%7B%20span%3A%2014%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20columnsConfig%3A%20%7B%0A%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20formIn%20%3D%20reactive(%7B%0A%20%20fieldList%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20label%3A%20''%2C%0A%20%20%20%20%20%20key%3A%20'time'%2C%0A%20%20%20%20%20%20config%3A%20%7B%20placeholder%3A%20'%E8%AF%B7%E8%BE%93%E5%85%A5%E6%97%A5%E6%9C%9F'%20%7D%2C%0A%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20span%3A%206%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20label%3A%20''%2C%0A%20%20%20%20%20%20key%3A%20'sing'%2C%0A%20%20%20%20%20%20config%3A%20%7B%20placeholder%3A%20'%E8%AF%B7%E8%BE%93%E5%85%A5%E6%AD%8C%E6%9B%B2'%20%7D%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20span%3A%206%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20label%3A%20''%2C%0A%20%20%20%20%20%20key%3A%20'dance'%2C%0A%20%20%20%20%20%20config%3A%20%7B%20placeholder%3A%20'%E8%AF%B7%E8%BE%93%E5%85%A5%E8%88%9E%E6%9B%B2'%20%7D%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20span%3A%206%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20label%3A%20''%2C%0A%20%20%20%20%20%20key%3A%20'operation'%2C%0A%20%20%20%20%20%20type%3A%20'slot'%2C%0A%20%20%20%20%20%20align%3A%20'center'%2C%0A%20%20%20%20%20%20span%3A%206%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20formModel%3A%20%7B%0A%20%20%20%20span%3A%208%2C%0A%20%20%20%20formItemAttr%3A%20%7B%0A%20%20%20%20%20%20labelCol%3A%20%7B%20span%3A%200%20%7D%2C%0A%20%20%20%20%20%20wrapperCol%3A%20%7B%20span%3A%2024%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20tableItem%20%3D%20%7B%20sing%3A%20undefined%2C%20dance%3A%20undefined%20%7D%0Afunction%20creakTableItem()%20%7B%0A%20%20return%20%7B%20...tableItem%20%7D%0A%7D%0Afunction%20add(arr%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D%2C%20index%3A%20number)%20%7B%0A%20%20arr.splice(index%20%2B%201%2C%200%2C%20creakTableItem())%0A%7D%0Afunction%20del(arr%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D%2C%20index%3A%20number)%20%7B%0A%20%20arr.splice(index%2C%201)%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%A2%9E%E5%8A%A0%E5%88%A0%E9%99%A4%E6%93%8D%E4%BD%9C'%2C%0A%20%20order%3A%205%2C%0A%20%20context%3A%0A%20%20%20%20%22%E8%BF%99%E9%87%8Clabel%E5%AF%B9%E9%BD%90%2C%E5%88%99%E9%9C%80%E5%B0%86'label-col'%E4%BD%BF%E7%94%A8style%E7%9A%84%E5%86%99%E6%B3%95%EF%BC%8C%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E6%98%AF%E9%9C%80%E8%A6%81%E5%86%99%E6%88%90'label-col'%3A%7B%7D%2C%20%E8%80%8C%E4%B8%8D%E6%98%AFlabeCol%3A%7B%7D%22%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:n({title:"增加删除操作",order:5,context:"这里label对齐,则需将'label-col'使用style的写法，值得注意的是需要写成'label-col':{}, 而不是labeCol:{}"})}),(l,t)=>{const i=a,n=A,b=o("a-space"),F=e,v=o("a-form-item-rest");return s(),r("div",null,[C(F,f(y(m(u))),{likeIn:p((e=>[C(v,null,{default:p((()=>[(s(!0),r(E,null,c(e.data.like,((A,a)=>(s(),B(F,d({name:["like"],key:a},m(k),{formData:A}),{operationIn:p((()=>[C(b,{size:8,style:{cursor:"pointer","font-size":"16px",color:"#108de9"}},{default:p((()=>[C(i,{onClick:A=>g(e.data.like,a)},null,8,["onClick"]),e.data.like.length>1?(s(),B(n,{key:0,onClick:A=>function(e,A){e.splice(A,1)}(e.data.like,a)},null,8,["onClick"])):D("v-if",!0)])),_:2},1024)])),_:2},1040,["formData"])))),128))])),_:2},1024)])),_:1},16)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/sform/automation/addRemove.vue"]]);export{u as default};
