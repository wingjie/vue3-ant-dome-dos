System.register([],(function(e){"use strict";return{execute:function(){e("v",(function(e="ASRWYPL"){/^[ASRWYPL]*$/g.test(null==e?void 0:e.toUpperCase());let n=null==e?void 0:e.toUpperCase();const t=null==e?void 0:e.toUpperCase().includes("L");t&&(n=e.replace(/L/g,""));const r=Array.from(n).map((e=>d[e])).join("|"),o=t?`(((${r})([,|\n]*))*)`:`(${r})`;return async function(e,n){const t=new RegExp(`^${o}$`).test(n);if(n&&!t)return Promise.reject(new Error("格式错误"));const r=n?n.split(p):[],$=[...new Set(r)];return r.length!==$.length?Promise.reject(new Error("数据重复")):Promise.resolve(!0)}}));const n="(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))",t=`(${n}(\\.${n}){3})`,r=`(${t}-${t})`,o=`(${t} ${t})`,$=`(${o}|(${t}|(${t}\\/${/([1-2]\d|3[0-2]|\d)/.source})))`,s=`(${n}(\\/${n})*)`,c=`(${s}(-${s})?)`,i=`(((${c}(\\/${c})*))|(\\*))`,u=`(((${i})(\\.${i}){3})P?)`,l="[,|\n]",p=new RegExp(l),d={A:t,S:$,R:r,W:o,P:u,Y:"(Any)"}}}}));
