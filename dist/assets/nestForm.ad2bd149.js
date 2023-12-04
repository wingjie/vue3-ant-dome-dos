import{_ as e}from"./index.15180948.js";import{_ as A,d as a,r as t,j as E,i as l,o as r,h as i,a as s,w as o,u as B,m as C,B as n,p as D}from"./index.2138ca2b.js";import"./assignProp.cc6405ef.js";var m=A(a({__name:"nestForm",setup(A,{expose:a}){const m=t(),d=E({formData:{name:"",ages:void 0,like:{sing:"",dance:void 0}},fieldList:[{label:"姓名",key:"name",type:"input"},{label:"年纪",key:"ages",type:"select"},{label:"爱好",key:"like",type:"slot"}],formModel:{optionsData:{ages:[{label:"0"},{label:"1"}],dance:[{label:"霹雳"},{label:"机械"}]},span:16,rules:{name:[{required:!0,trigger:"blur",message:"请输入用户名!"}],sing:[{required:!0,trigger:"blur",message:"请输入喜欢什么歌"}]}}}),f=E({fieldList:[{label:"唱歌",key:"sing",type:"input"},{label:"跳舞",key:"dance",type:"select"}]});function p(){m.value.validate()}return a({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSForm%20ref%3D%22formRef%22%20v-bind%3D%22formData%22%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23likeIn%3D%22data%22%3E%0A%20%20%20%20%20%20%20%20%3CSForm%0A%20%20%20%20%20%20%20%20%20%20%3Afield-list%3D%22likeData.fieldList%22%0A%20%20%20%20%20%20%20%20%20%20%3Aform-data%3D%22data.data.like%22%0A%20%20%20%20%20%20%20%20%20%20%3AformModel%3D%22data.model%22%0A%20%20%20%20%20%20%20%20%20%20%3Aname%3D%22%5B'like'%5D%22%0A%20%20%20%20%20%20%20%20%3E%3C%2FSForm%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%20%20%3Ctemplate%20%23formOut%3E%0A%20%20%20%20%20%20%20%20%3Ca-button%20type%3D%22primary%22%20%40click%3D%22sub%22%3E%E6%8F%90%E4%BA%A4%3C%2Fa-button%3E%0A%20%20%20%20%20%20%3C%2Ftemplate%3E%0A%20%20%20%20%3C%2FSForm%3E%0A%20%20%20%20%7B%7B%20formData.formData%20%7D%7D%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20formRef%20%3D%20ref()%0Aconst%20formData%20%3D%20reactive(%7B%0A%20%20formData%3A%20%7B%0A%20%20%20%20name%3A%20''%2C%0A%20%20%20%20ages%3A%20undefined%2C%0A%20%20%20%20like%3A%20%7B%0A%20%20%20%20%20%20sing%3A%20''%2C%0A%20%20%20%20%20%20dance%3A%20undefined%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%20%20fieldList%3A%20%5B%0A%20%20%20%20%7B%20label%3A%20'%E5%A7%93%E5%90%8D'%2C%20key%3A%20'name'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E5%B9%B4%E7%BA%AA'%2C%20key%3A%20'ages'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E7%88%B1%E5%A5%BD'%2C%20key%3A%20'like'%2C%20type%3A%20'slot'%20%7D%2C%0A%20%20%5D%2C%0A%20%20formModel%3A%20%7B%0A%20%20%20%20optionsData%3A%20%7B%0A%20%20%20%20%20%20ages%3A%20%5B%7B%20label%3A%20'0'%20%7D%2C%20%7B%20label%3A%20'1'%20%7D%5D%2C%0A%20%20%20%20%20%20dance%3A%20%5B%7B%20label%3A%20'%E9%9C%B9%E9%9B%B3'%20%7D%2C%20%7B%20label%3A%20'%E6%9C%BA%E6%A2%B0'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20span%3A%2016%2C%0A%20%20%20%20rules%3A%20%7B%0A%20%20%20%20%20%20name%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'blur'%2C%20message%3A%20'%E8%AF%B7%E8%BE%93%E5%85%A5%E7%94%A8%E6%88%B7%E5%90%8D!'%20%7D%5D%2C%0A%20%20%20%20%20%20sing%3A%20%5B%7B%20required%3A%20true%2C%20trigger%3A%20'blur'%2C%20message%3A%20'%E8%AF%B7%E8%BE%93%E5%85%A5%E5%96%9C%E6%AC%A2%E4%BB%80%E4%B9%88%E6%AD%8C'%20%7D%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Aconst%20likeData%20%3D%20reactive(%7B%0A%20%20fieldList%3A%20%5B%0A%20%20%20%20%7B%20label%3A%20'%E5%94%B1%E6%AD%8C'%2C%20key%3A%20'sing'%2C%20type%3A%20'input'%20%7D%2C%0A%20%20%20%20%7B%20label%3A%20'%E8%B7%B3%E8%88%9E'%2C%20key%3A%20'dance'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%5D%2C%0A%7D)%0Afunction%20sub()%20%7B%0A%20%20formRef.value.validate()%0A%7D%0Aconst%20%24config%20%3D%20reactive(%7B%0A%20%20title%3A%20'SForm%E5%B5%8C%E5%A5%97SForm%E7%94%A8%E6%B3%95'%2C%0A%20%20order%3A%204%2C%0A%20%20context%3A%0A%20%20%20%20'%E4%BD%BF%E7%94%A8%E8%BF%99%E7%A7%8D%E5%B5%8C%E5%A5%97%E6%98%AF%E5%BA%94%E5%AF%B9%E5%A4%9A%E5%B1%82%E7%BA%A7%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84form%E8%A1%A8%E5%8D%95%E5%9C%BA%E6%99%AF%EF%BC%8C%E5%8F%AF%E4%BB%A5%E8%BF%9B%E8%A1%8C%E4%B8%80%E6%AC%A1%E6%80%A7%E6%A0%A1%E9%AA%8C%E3%80%82%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%E5%B1%9E%E6%80%A7name%E8%A1%A8%E8%BF%B0%E6%B8%85%E6%A5%9A%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:E({title:"SForm嵌套SForm用法",order:4,context:"使用这种嵌套是应对多层级数据结构form表单场景，可以进行一次性校验。需要使用属性name表述清楚数据结构。"})}),(A,a)=>{const t=e,E=l("a-button");return r(),i("div",null,[s(t,n({ref_key:"formRef",ref:m},B(d)),{likeIn:o((e=>[s(t,{"field-list":B(f).fieldList,"form-data":e.data.like,formModel:e.model,name:["like"]},null,8,["field-list","form-data","formModel"])])),formOut:o((()=>[s(E,{type:"primary",onClick:p},{default:o((()=>[C("提交")])),_:1})])),_:1},16),C(" "+D(B(d).formData),1)])}}}),[["__file","/Users/wing/code/galaxy-halo/src/views/sform/automation/nestForm.vue"]]);export{m as default};
