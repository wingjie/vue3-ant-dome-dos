import{_ as e}from"./index.113e8b82.js";import{_ as A,d as t,r as o,j as a,c4 as E,o as n,h as s,a as B,C as i,D as C,u as l,m as r,p as D,b as c}from"./index.192a4aa9.js";import"./assign.78f966dc.js";import"./index.91b5c0ac.js";const F=c("br",null,null,-1);var d=A(t({__name:"pagination",setup(A,{expose:t}){const c=o([]),d=a({total:0,current:1,pageSize:10}),g=a({tableData:[{one:1,two:2}],columns:[{title:"序号",key:"order",dataIndex:"order",customRender:e=>`${e.index+1}`},{title:"编号一",key:"one",dataIndex:"one"},{title:"编号二",key:"two",dataIndex:"two"}],fieldModel:{tableAttr:{rowKey:"two",pagination:d,onChange(e){e.current&&(d.current=e.current,d.pageSize=e.pageSize)},rowSelection:{checkStrictly:!1,onChange:(e,A)=>{c.value=A.map((e=>e.two))}}}}});let p=100;for(;p<200;)g.tableData.push({one:p,two:E()}),p+=1;return t({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%20v-bind%3D%22table%22%3E%3C%2FSTable%3E%0A%20%20%20%20%E9%80%89%E4%B8%AD%E4%BF%A1%E6%81%AF%EF%BC%9A%7B%7B%20selectRowKeys%20%7D%7D%3Cbr%20%2F%3E%0A%20%20%20%20%E5%88%86%E9%A1%B5%E4%BF%A1%E6%81%AF%EF%BC%9A%7B%7B%20pagination%20%7D%7D%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20getUUID%20%7D%20from%20'%40%2Fcommon%2Futils%2FtraverseTree'%0A%0Aconst%20selectRowKeys%20%3D%20ref%3Cstring%5B%5D%3E(%5B%5D)%0Aconst%20pagination%20%3D%20reactive(%7B%0A%20%20total%3A%200%2C%0A%20%20current%3A%201%2C%0A%20%20pageSize%3A%2010%2C%0A%7D)%0Aconst%20table%20%3D%20reactive(%7B%0A%20%20tableData%3A%20%5B%7B%20one%3A%201%2C%20two%3A%202%20%7D%5D%2C%0A%20%20columns%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E5%BA%8F%E5%8F%B7'%2C%0A%20%20%20%20%20%20key%3A%20'order'%2C%0A%20%20%20%20%20%20dataIndex%3A%20'order'%2C%0A%20%20%20%20%20%20customRender%3A%20(text%3A%20any)%20%3D%3E%20%60%24%7Btext.index%20%2B%201%7D%60%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E7%BC%96%E5%8F%B7%E4%B8%80'%2C%0A%20%20%20%20%20%20key%3A%20'one'%2C%0A%20%20%20%20%20%20dataIndex%3A%20'one'%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E7%BC%96%E5%8F%B7%E4%BA%8C'%2C%0A%20%20%20%20%20%20key%3A%20'two'%2C%0A%20%20%20%20%20%20dataIndex%3A%20'two'%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20fieldModel%3A%20%7B%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20rowKey%3A%20'two'%2C%20%2F%2F%20%E5%BF%85%E9%A1%BB%E8%A6%81%E6%9C%89%E7%9A%84%0A%20%20%20%20%20%20pagination%2C%0A%20%20%20%20%20%20onChange(msg%3F%3A%20any)%20%7B%0A%20%20%20%20%20%20%20%20if%20(msg.current)%20%7B%0A%20%20%20%20%20%20%20%20%20%20pagination.current%20%3D%20msg.current%0A%20%20%20%20%20%20%20%20%20%20pagination.pageSize%20%3D%20msg.pageSize%0A%20%20%20%20%20%20%20%20%20%20%2F%2F%20pagination.total%20%3D%201000%20%2F%2F%20%E5%90%8E%E7%AB%AF%E5%81%9A%E5%88%86%E9%A1%B5%E7%9A%84%E6%97%B6%E5%80%99%E7%94%A8%E5%88%B0%E6%AD%A4%E5%B1%9E%E6%80%A7%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20rowSelection%3A%20%7B%0A%20%20%20%20%20%20%20%20checkStrictly%3A%20false%2C%0A%20%20%20%20%20%20%20%20onChange%3A%20(%0A%20%20%20%20%20%20%20%20%20%20_sRowKeys%3A%20(string%20%7C%20number)%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20sRows%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D%0A%20%20%20%20%20%20%20%20)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%2F%2F%20console.log(%60selectedRowKeys%3A%20%24%7B_sRowKeys%7D%60%2C%20'selectedRows%3A%20'%2C%20sRows)%0A%20%20%20%20%20%20%20%20%20%20selectRowKeys.value%20%3D%20sRows.map((item)%20%3D%3E%20item.two)%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%2F%2F%20onSelect%3A%20(record%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%2C%20selected%3A%20boolean%2C%20selectedRows%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%2F%2F%20%20%20console.log(record%2C%20selected%2C%20selectedRows%2C%2056)%0A%20%20%20%20%20%20%20%20%2F%2F%20%7D%2C%0A%20%20%20%20%20%20%20%20%2F%2F%20onSelectAll%3A%20(%20selected%3A%20boolean%2C%20sRows%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D%2C%20cRows%3A%20%7B%20%5Bp%3A%20string%5D%3A%20any%20%7D%5B%5D)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%2F%2F%20%20%20console.log(selected%2C%20sRows%2C%20cRows)%0A%20%20%20%20%20%20%20%20%2F%2F%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0Alet%20i%20%3D%20100%0Awhile%20(i%20%3C%20200)%20%7B%0A%20%20table.tableData.push(%7B%20one%3A%20i%2C%20two%3A%20getUUID()%20%7D)%0A%20%20i%20%2B%3D%201%0A%7D%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%88%86%E9%A1%B5%E4%BD%BF%E7%94%A8'%2C%0A%20%20order%3A%202%2C%0A%20%20context%3A%0A%20%20%20%20'%E9%80%9A%E8%BF%87pagination%E5%B1%9E%E6%80%A7%E5%B0%86%E5%A3%B0%E6%98%8E%E5%A5%BD%E7%9A%84%E5%88%86%E9%A1%B5%E4%BF%A1%E6%81%AF%EF%BC%88%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8F%98%E9%87%8F%EF%BC%89%E4%BC%A0%E7%BB%99%E7%BB%84%E4%BB%B6%EF%BC%8C%E5%86%8D%E9%80%9A%E8%BF%87chang%E6%97%B6%E9%97%B4%E6%94%B9%E5%8F%98%E9%A2%84%E8%AE%BE%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8F%98%E9%87%8F%EF%BC%8C%E4%BB%8E%E8%80%8C%E5%AE%8C%E6%88%90%E5%88%86%E9%A1%B5%E7%9A%84%E5%8A%9F%E8%83%BD%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:o({title:"分页使用",order:2,context:"通过pagination属性将声明好的分页信息（响应式变量）传给组件，再通过chang时间改变预设的响应式变量，从而完成分页的功能。"})}),(A,t)=>{const o=e;return n(),s("div",null,[B(o,i(C(l(g))),null,16),r(" 选中信息："+D(l(c)),1),F,r(" 分页信息："+D(l(d)),1)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/stable/automation/pagination.vue"]]);export{d as default};
