System.register(["./index-legacy.e189f950.js","./index-legacy.066d5db8.js","./linkageHookTable-legacy.25943a46.js","./assign-legacy.060bac80.js","./index-legacy.0581b260.js"],(function(e){"use strict";var A,l,a,t,o,n,i,C,B,s,u,b;return{setters:[function(e){A=e._},function(e){l=e._,a=e.d,t=e.j,o=e.r,n=e.o,i=e.h,C=e.a,B=e.C,s=e.D,u=e.u},function(e){b=e.m},function(){},function(){}],execute:function(){e("default",l(a({__name:"multilevelLinkage",setup(e,{expose:l}){const a=[{label:"A",value:"a",menuItems:[{label:"A-1",value:"a-1",menuItems:[{label:"A-1-1",value:"a-1-1"},{label:"A-1-2",value:"a-1-2"}]},{label:"B-1",value:"b-1",menuItems:[{label:"B-1-1",value:"b-1-1"},{label:"B-1-2",value:"b-1-2"}]}]},{label:"B",value:"b",menuItems:[{label:"B-1",value:"b-1",menuItems:[{}]}]}],[D]=b([{config:{options:()=>a}}]),E=t({tableData:[{one:"a",two:"a-1",three:void 0},{one:void 0,two:void 0,three:void 0}],columns:[D[0],D[1],D[2],{title:"其他",key:"three",type:"select"}],fieldModel:{isForm:!0,config:{isForm:!0},tableAttr:{pagination:!1}}});return l({originCode:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CSTable%20v-bind%3D%22tableData%22%3E%3C%2FSTable%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20linkageHookTable%20from%20'%40%2Fcommon%2Fhook%2FlinkageHookTable'%0A%0Aconst%20optionData%20%3D%20%5B%0A%20%20%7B%0A%20%20%20%20label%3A%20'A'%2C%0A%20%20%20%20value%3A%20'a'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'A-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'a-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-1'%2C%20value%3A%20'a-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'A-1-2'%2C%20value%3A%20'a-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-1'%2C%20value%3A%20'b-1-1'%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7B%20label%3A%20'B-1-2'%2C%20value%3A%20'b-1-2'%20%7D%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20%7B%0A%20%20%20%20label%3A%20'B'%2C%0A%20%20%20%20value%3A%20'b'%2C%0A%20%20%20%20menuItems%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20'B-1'%2C%0A%20%20%20%20%20%20%20%20value%3A%20'b-1'%2C%0A%20%20%20%20%20%20%20%20menuItems%3A%20%5B%7B%7D%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%5D%0A%0Aconst%20%5BfieldList%5D%20%3D%20linkageHookTable(%5B%0A%20%20%7B%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20options()%20%7B%0A%20%20%20%20%20%20%20%20return%20optionData%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%5D)%0A%0Aconst%20tableData%20%3D%20reactive(%7B%0A%20%20tableData%3A%20%5B%0A%20%20%20%20%7B%20one%3A%20'a'%2C%20two%3A%20'a-1'%2C%20three%3A%20undefined%20%7D%2C%0A%20%20%20%20%7B%20one%3A%20undefined%2C%20two%3A%20undefined%2C%20three%3A%20undefined%20%7D%2C%0A%20%20%5D%2C%0A%20%20columns%3A%20%5B%0A%20%20%20%20fieldList%5B0%5D%2C%0A%20%20%20%20fieldList%5B1%5D%2C%0A%20%20%20%20fieldList%5B2%5D%2C%0A%20%20%20%20%7B%20title%3A%20'%E5%85%B6%E4%BB%96'%2C%20key%3A%20'three'%2C%20type%3A%20'select'%20%7D%2C%0A%20%20%5D%2C%0A%20%20fieldModel%3A%20%7B%0A%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20config%3A%20%7B%0A%20%20%20%20%20%20isForm%3A%20true%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20tableAttr%3A%20%7B%0A%20%20%20%20%20%20pagination%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%0A%0Aconst%20%24config%20%3D%20ref(%7B%0A%20%20title%3A%20'%E5%A4%9A%E7%BA%A7%E8%81%94%E5%8A%A8(hook%3AlinkageHookTable)'%2C%0A%20%20order%3A%204%2C%0A%20%20context%3A%0A%20%20%20%20'%E8%A1%A8%E6%A0%BC%E8%A1%8C%E5%86%85%E5%A4%9A%E7%BA%A7%E8%81%94%E5%8A%A8%E3%80%82%E4%BD%BF%E7%94%A8hook%20linkageHookTable%2C%E5%85%A5%E5%8F%82linkageHookTable(option)%E5%8F%AF%E4%BB%A5%E5%AF%B9%E9%BB%98%E8%AE%A4%E5%80%BC%E8%BF%9B%E8%A1%8C%E8%A6%86%E7%9B%96%E6%9B%B4%E6%94%B9(key%E3%80%81title...)%E3%80%82'%2C%0A%7D)%0AdefineExpose(%7B%0A%20%20%24config%2C%0A%7D)%0A%3C%2Fscript%3E%0A%3Cstyle%20scoped%20lang%3D%22scss%22%3E%3C%2Fstyle%3E%0A",$config:o({title:"多级联动(hook:linkageHookTable)",order:4,context:"表格行内多级联动。使用hook linkageHookTable,入参linkageHookTable(option)可以对默认值进行覆盖更改(key、title...)。"})}),(e,l)=>{const a=A;return n(),i("div",null,[C(a,B(s(u(E))),null,16)])}}}),[["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/views/stable/automation/multilevelLinkage.vue"]]))}}}));
