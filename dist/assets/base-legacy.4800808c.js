System.register(["./index-legacy.2e6508eb.js","./index-legacy.968eda31.js","./assign-legacy.ae840dfe.js","./index-legacy.170ed1ea.js"],(function(A){"use strict";var e,t,a,l,n,C,B,s,o,E,i;return{setters:[function(A){e=A._},function(A){t=A._,a=A.d,l=A.j,n=A.r,C=A.o,B=A.h,s=A.a,o=A.C,E=A.D,i=A.u},function(){},function(){}],execute:function(){A("default",t(a({__name:"base",setup(A,{expose:t}){const a=[{label:"A",value:"a",menuItems:[{label:"A-1",value:"a-1",menuItems:[{label:"A-1-1",value:"a-1-1"},{label:"A-1-2",value:"a-1-2"}]},{label:"B-1",value:"b-1",menuItems:[{label:"B-1-1",value:"b-1-1"},{label:"B-1-2",value:"b-1-2"}]}]},{label:"B",value:"b",menuItems:[{label:"B-1",value:"b-1",menuItems:[{}]}]}],u=l({tableData:[{one:"a",two:"a-1",three:"a-1-1",base:"base"},{one:"c(没有匹配的项)",two:"c-1",three:"c-1-1",base:"和antD用法一样"}],columns:[{title:"基础用法",key:"base",dataIndex:"base"},{title:"一级",key:"one",type:"select",options:()=>a,isForm:!0},{title:"二级",key:"two",type:"select",config:{options(A,e){var t,a,l;const{rowMsg:n}=e;return(null==n||null===(t=n.unit)||void 0===t||null===(a=t.one)||void 0===a||null===(l=a.cursorDic)||void 0===l?void 0:l.menuItems)||[]}}},{title:"三级",key:"three",type:"select",config:{options(A,e){var t,a,l;const{rowMsg:n}=e;return(null==n||null===(t=n.unit)||void 0===t||null===(a=t.two)||void 0===a||null===(l=a.cursorDic)||void 0===l?void 0:l.menuItems)||[]}}}],fieldModel:{isForm:!1,config:{isForm:!1},tableAttr:{pagination:!1}}});return t({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%20v-bind%3D%22tableData%22%3E%3C%2FSTable%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20optionData%20%3D%20%5B%0A%20%20%7B%0A%20%20%20%20label%3A%20'A'%2C%0A%20%20%20%20value%3A%20'a'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'A-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'a-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-1'%2C%20value%3A%20'a-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-2'%2C%20value%3A%20'a-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-1'%2C%20value%3A%20'b-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-2'%2C%20value%3A%20'b-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20label%3A%20'B'%2C%0A%20%20%20%20value%3A%20'b'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%7B%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%5D%0A%0Aconst%20tableData%20%3D%20reactive(%7B%0A%20%20tableData%3A%20%5B%0A%20%20%20%20%7B%20one%3A%20'a'%2C%20two%3A%20'a-1'%2C%20three%3A%20'a-1-1'%2C%20base%3A%20'base'%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20one%3A%20'c(%E6%B2%A1%E6%9C%89%E5%8C%B9%E9%85%8D%E7%9A%84%E9%A1%B9)'%2C%0A%20%20%20%20%20%20two%3A%20'c-1'%2C%20%2F%2F%20%E5%80%BC%E6%B2%A1%E6%9C%89%E5%8C%B9%E9%85%8D%E7%9A%84%E9%A1%B9%EF%BC%8C%E5%88%99%E4%BC%9A%E7%9B%B4%E6%8E%A5%E5%B1%95%E7%A4%BA%E5%80%BC%0A%20%20%20%20%20%20three%3A%20'c-1-1'%2C%0A%20%20%20%20%20%20base%3A%20'%E5%92%8CantD%E7%94%A8%E6%B3%95%E4%B8%80%E6%A0%B7'%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20columns%3A%20%5B%0A%20%20%20%20%7B%20title%3A%20'%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95'%2C%20key%3A%20'base'%2C%20dataIndex%3A%20'base'%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E4%B8%80%E7%BA%A7'%2C%0A%20%20%20%20%20%20key%3A%20'one'%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20options()%20%7B%0A%20%20%20%20%20%20%20%20return%20optionData%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E4%BA%8C%E7%BA%A7'%2C%0A%20%20%20%20%20%20key%3A%20'two'%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20options(_val%3A%20any%2C%20data%3A%20any)%20%7B%0A%20%20%20%20%20%20%20%20%20%20const%20%7B%20rowMsg%20%7D%20%3D%20data%0A%20%20%20%20%20%20%20%20%20%20return%20rowMsg%3F.unit%3F.one%3F.cursorDic%3F.menuItems%20%7C%7C%20%5B%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20title%3A%20'%E4%B8%89%E7%BA%A7'%2C%0A%20%20%20%20%20%20key%3A%20'three'%2C%0A%20%20%20%20%20%20type%3A%20'select'%2C%0A%20%20%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20%20%20options(_val%3A%20any%2C%20data%3A%20any)%20%7B%0A%20%20%20%20%20%20%20%20%20%20const%20%7B%20rowMsg%20%7D%20%3D%20data%0A%20%20%20%20%20%20%20%20%20%20return%20rowMsg%3F.unit%3F.two%3F.cursorDic%3F.menuItems%20%7C%7C%20%5B%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%20%20fieldModel%3A%20%7B%0A%20%20%20%20isForm%3A%20false%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8'%2C%0A%20%20order%3A%201%2C%0A%20%20context%3A%0A%20%20%20%20'%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E6%98%AF%E8%AF%A5%E7%BB%84%E4%BB%B6%E6%9C%89%E8%87%AA%E5%8A%A8%E7%BF%BB%E8%AF%91%E7%9A%84%E5%8A%9F%E8%83%BD%EF%BC%8C%E5%83%8F%E6%98%AFselect%E7%9A%84%E5%8F%8D%E5%90%91%E6%8E%A8%E5%80%92%EF%BC%8C%E8%8B%A5%E5%80%BC%E6%B2%A1%E6%9C%89%E5%8C%B9%E9%85%8D%E7%9A%84%E9%A1%B9%EF%BC%8C%E5%88%99%E7%9B%B4%E6%8E%A5%E5%B0%86%E5%80%BC%E7%9B%B4%E6%8E%A5%E5%B1%95%E7%A4%BA%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:n({title:"基础使用",order:1,context:"值得注意的是该组件有自动翻译的功能，像是select的反向推倒，若值没有匹配的项，则直接将值直接展示。"})}),(A,t)=>{const a=e;return C(),B("div",null,[s(a,o(E(i(u))),null,16)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/stable/automation/base.vue"]]))}}}));
