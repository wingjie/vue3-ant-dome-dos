import{_ as e,d as t,t as n,r as i,f as o,g as r,o as s,h as a,b as l,n as c,u,i as d,a as g,s as h,j as f,k as p,l as b,w as m,m as v,p as x,F as y,q as _,c as w,v as E,x as k,y as O,z as S,A as M}from"./index.192a4aa9.js";var N={exports:{}};function A(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(t){var n=e[t];"object"!=typeof n||Object.isFrozen(n)||A(n)})),e}N.exports=A,N.exports.default=A;class R{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function j(e,...t){const n=Object.create(null);for(const i in e)n[i]=e[i];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const T=e=>!!e.scope||e.sublanguage&&e.language;class L{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=I(e)}openNode(e){if(!T(e))return;let t="";t=e.sublanguage?`language-${e.language}`:((e,{prefix:t})=>{if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix}),this.span(t)}closeNode(e){T(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const B=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class C{constructor(){this.rootNode=B(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=B({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{C._collapse(e)})))}}class P extends C{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.sublanguage=!0,n.language=t,this.add(n)}toHTML(){return new L(this,this.options).value()}finalize(){return!0}}function $(e){return e?"string"==typeof e?e:e.source:null}function H(e){return z("(?=",e,")")}function D(e){return z("(?:",e,")*")}function U(e){return z("(?:",e,")?")}function z(...e){return e.map((e=>$(e))).join("")}function K(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>$(e))).join("|")+")"}function q(e){return new RegExp(e.toString()+"|").exec("").length-1}const W=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function X(e,{joinWith:t}){let n=0;return e.map((e=>{n+=1;const t=n;let i=$(e),o="";for(;i.length>0;){const e=W.exec(i);if(!e){o+=i;break}o+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?o+="\\"+String(Number(e[1])+t):(o+=e[0],"("===e[0]&&n++)}return o})).map((e=>`(${e})`)).join(t)}const Z="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",G={begin:"\\\\[\\s\\S]",relevance:0},F={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[G]},V={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[G]},J=function(e,t,n={}){const i=j({scope:"comment",begin:e,end:t,contains:[]},n);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const o=K("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:z(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},Y=J("//","$"),Q=J("/\\*","\\*/"),ee=J("#","$"),te={scope:"number",begin:"\\b\\d+(\\.\\d+)?",relevance:0},ne={scope:"number",begin:Z,relevance:0},ie={scope:"number",begin:"\\b(0b[01]+)",relevance:0},oe={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[G,{begin:/\[/,end:/\]/,relevance:0,contains:[G]}]}]},re={scope:"title",begin:"[a-zA-Z]\\w*",relevance:0},se={scope:"title",begin:"[a-zA-Z_]\\w*",relevance:0},ae={begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0};var le=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:"[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE:"[a-zA-Z_]\\w*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:Z,BINARY_NUMBER_RE:"\\b(0b[01]+)",RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=z(t,/.*\b/,e.binary,/\b.*/)),j({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:G,APOS_STRING_MODE:F,QUOTE_STRING_MODE:V,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:J,C_LINE_COMMENT_MODE:Y,C_BLOCK_COMMENT_MODE:Q,HASH_COMMENT_MODE:ee,NUMBER_MODE:te,C_NUMBER_MODE:ne,BINARY_NUMBER_MODE:ie,REGEXP_MODE:oe,TITLE_MODE:re,UNDERSCORE_TITLE_MODE:se,METHOD_GUARD:ae,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function ce(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function ue(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function de(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ce,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function ge(e,t){Array.isArray(e.illegal)&&(e.illegal=K(...e.illegal))}function he(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function fe(e,t){void 0===e.relevance&&(e.relevance=1)}const pe=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=n.keywords,e.begin=z(n.beforeMatch,H(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},be=["of","and","for","in","not","or","if","then","parent","list","value"];function me(e,t,n="keyword"){const i=Object.create(null);return"string"==typeof e?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach((function(n){Object.assign(i,me(e[n],t,n))})),i;function o(e,n){t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((function(t){const n=t.split("|");i[n[0]]=[e,ve(n[0],n[1])]}))}}function ve(e,t){return t?Number(t):function(e){return be.includes(e.toLowerCase())}(e)?0:1}const xe={},ye=(e,t)=>{xe[`${e}/${t}`]||(xe[`${e}/${t}`]=!0)},_e=new Error;function we(e,t,{key:n}){let i=0;const o=e[n],r={},s={};for(let a=1;a<=t.length;a++)s[a+i]=o[a],r[a+i]=!0,i+=q(t[a-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function Ee(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw _e;if("object"!=typeof e.beginScope||null===e.beginScope)throw _e;we(e,e.begin,{key:"beginScope"}),e.begin=X(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw _e;if("object"!=typeof e.endScope||null===e.endScope)throw _e;we(e,e.end,{key:"endScope"}),e.end=X(e.end,{joinWith:""})}}(e)}function ke(e){function t(t,n){return new RegExp($(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(n?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=q(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(X(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),i=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new n;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=j(e.classNameAliases||{}),function n(o,r){const s=o;if(o.isCompiled)return s;[ue,he,Ee,pe].forEach((e=>e(o,r))),e.compilerExtensions.forEach((e=>e(o,r))),o.__beforeBegin=null,[de,ge,fe].forEach((e=>e(o,r))),o.isCompiled=!0;let a=null;return"object"==typeof o.keywords&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),a=o.keywords.$pattern,delete o.keywords.$pattern),a=a||/\w+/,o.keywords&&(o.keywords=me(o.keywords,e.case_insensitive)),s.keywordPatternRe=t(a,!0),r&&(o.begin||(o.begin=/\B|\b/),s.beginRe=t(s.begin),o.end||o.endsWithParent||(o.end=/\B|\b/),o.end&&(s.endRe=t(s.end)),s.terminatorEnd=$(s.end)||"",o.endsWithParent&&r.terminatorEnd&&(s.terminatorEnd+=(o.end?"|":"")+r.terminatorEnd)),o.illegal&&(s.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return j(e,{variants:null},t)})));if(e.cachedVariants)return e.cachedVariants;if(Oe(e))return j(e,{starts:e.starts?j(e.starts):null});if(Object.isFrozen(e))return j(e);return e}("self"===e?o:e)}))),o.contains.forEach((function(e){n(e,s)})),o.starts&&n(o.starts,r),s.matcher=function(e){const t=new i;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(s),s}(e)}function Oe(e){return!!e&&(e.endsWithParent||Oe(e.starts))}class Se extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const Me=I,Ne=j,Ae=Symbol("nomatch");var Re=function(e){const t=Object.create(null),n=Object.create(null),i=[];let o=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:P};function l(e){return a.noHighlightRe.test(e)}function c(e,t,n){let i="",o="";"object"==typeof t?(i=e,n=t.ignoreIllegals,o=t.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),o=e,i=t),void 0===n&&(n=!0);const r={code:i,language:o};v("before:highlight",r);const s=r.result?r.result:u(r.language,r.code,n);return s.code=r.code,v("after:highlight",s),s}function u(e,n,i,s){const l=Object.create(null);function c(){if(!k.keywords)return void S.addText(M);let e=0;k.keywordPatternRe.lastIndex=0;let t=k.keywordPatternRe.exec(M),n="";for(;t;){n+=M.substring(e,t.index);const o=_.case_insensitive?t[0].toLowerCase():t[0],r=(i=o,k.keywords[i]);if(r){const[e,i]=r;if(S.addText(n),n="",l[o]=(l[o]||0)+1,l[o]<=7&&(N+=i),e.startsWith("_"))n+=t[0];else{const n=_.classNameAliases[e]||e;S.addKeyword(t[0],n)}}else n+=t[0];e=k.keywordPatternRe.lastIndex,t=k.keywordPatternRe.exec(M)}var i;n+=M.substring(e),S.addText(n)}function g(){null!=k.subLanguage?function(){if(""===M)return;let e=null;if("string"==typeof k.subLanguage){if(!t[k.subLanguage])return void S.addText(M);e=u(k.subLanguage,M,!0,O[k.subLanguage]),O[k.subLanguage]=e._top}else e=d(M,k.subLanguage.length?k.subLanguage:null);k.relevance>0&&(N+=e.relevance),S.addSublanguage(e._emitter,e.language)}():c(),M=""}function h(e,t){let n=1;const i=t.length-1;for(;n<=i;){if(!e._emit[n]){n++;continue}const i=_.classNameAliases[e[n]]||e[n],o=t[n];i?S.addKeyword(o,i):(M=o,c(),M=""),n++}}function f(e,t){return e.scope&&"string"==typeof e.scope&&S.openNode(_.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(S.addKeyword(M,_.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),M=""):e.beginScope._multi&&(h(e.beginScope,t),M="")),k=Object.create(e,{parent:{value:k}}),k}function b(e,t,n){let i=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(e.endRe,n);if(i){if(e["on:end"]){const n=new R(e);e["on:end"](t,n),n.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return b(e.parent,t,n)}function m(e){return 0===k.matcher.regexIndex?(M+=e[0],1):(j=!0,0)}function v(e){const t=e[0],i=n.substring(e.index),o=b(k,e,i);if(!o)return Ae;const r=k;k.endScope&&k.endScope._wrap?(g(),S.addKeyword(t,k.endScope._wrap)):k.endScope&&k.endScope._multi?(g(),h(k.endScope,e)):r.skip?M+=t:(r.returnEnd||r.excludeEnd||(M+=t),g(),r.excludeEnd&&(M=t));do{k.scope&&S.closeNode(),k.skip||k.subLanguage||(N+=k.relevance),k=k.parent}while(k!==o.parent);return o.starts&&f(o.starts,e),r.returnEnd?0:t.length}let x={};function y(t,r){const s=r&&r[0];if(M+=t,null==s)return g(),0;if("begin"===x.type&&"end"===r.type&&x.index===r.index&&""===s){if(M+=n.slice(r.index,r.index+1),!o){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=x.rule,t}return 1}if(x=r,"begin"===r.type)return function(e){const t=e[0],n=e.rule,i=new R(n),o=[n.__beforeBegin,n["on:begin"]];for(const r of o)if(r&&(r(e,i),i.isMatchIgnored))return m(t);return n.skip?M+=t:(n.excludeBegin&&(M+=t),g(),n.returnBegin||n.excludeBegin||(M=t)),f(n,e),n.returnBegin?0:t.length}(r);if("illegal"===r.type&&!i){const e=new Error('Illegal lexeme "'+s+'" for mode "'+(k.scope||"<unnamed>")+'"');throw e.mode=k,e}if("end"===r.type){const e=v(r);if(e!==Ae)return e}if("illegal"===r.type&&""===s)return 1;if(I>1e5&&I>3*r.index){throw new Error("potential infinite loop, way more iterations than matches")}return M+=s,s.length}const _=p(e);if(!_)throw r.replace("{}",e),new Error('Unknown language: "'+e+'"');const w=ke(_);let E="",k=s||w;const O={},S=new a.__emitter(a);!function(){const e=[];for(let t=k;t!==_;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>S.openNode(e)))}();let M="",N=0,A=0,I=0,j=!1;try{for(k.matcher.considerAll();;){I++,j?j=!1:k.matcher.considerAll(),k.matcher.lastIndex=A;const e=k.matcher.exec(n);if(!e)break;const t=y(n.substring(A,e.index),e);A=e.index+t}return y(n.substring(A)),S.closeAllNodes(),S.finalize(),E=S.toHTML(),{language:e,value:E,relevance:N,illegal:!1,_emitter:S,_top:k}}catch(T){if(T.message&&T.message.includes("Illegal"))return{language:e,value:Me(n),illegal:!0,relevance:0,_illegalBy:{message:T.message,index:A,context:n.slice(A-100,A+100),mode:T.mode,resultSoFar:E},_emitter:S};if(o)return{language:e,value:Me(n),illegal:!1,relevance:0,errorRaised:T,_emitter:S,_top:k};throw T}}function d(e,n){n=n||a.languages||Object.keys(t);const i=function(e){const t={value:Me(e),illegal:!1,relevance:0,_top:s,_emitter:new a.__emitter(a)};return t._emitter.addText(e),t}(e),o=n.filter(p).filter(m).map((t=>u(t,e,!1)));o.unshift(i);const r=o.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(p(e.language).supersetOf===t.language)return 1;if(p(t.language).supersetOf===e.language)return-1}return 0})),[l,c]=r,d=l;return d.secondBest=c,d}function g(e){let t=null;const i=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=a.languageDetectRe.exec(t);if(n){const e=p(n[1]);return e||r.replace("{}",n[1]),e?n[1]:"no-highlight"}return t.split(/\s+/).find((e=>l(e)||p(e)))}(e);if(l(i))return;if(v("before:highlightElement",{el:e,language:i}),e.children.length>0&&(a.ignoreUnescapedHTML,a.throwUnescapedHTML)){throw new Se("One of your code blocks includes unescaped HTML.",e.innerHTML)}t=e;const o=t.textContent,s=i?c(o,{language:i,ignoreIllegals:!0}):d(o);e.innerHTML=s.value,function(e,t,i){const o=t&&n[t]||i;e.classList.add("hljs"),e.classList.add(`language-${o}`)}(e,i,s.language),e.result={language:s.language,re:s.relevance,relevance:s.relevance},s.secondBest&&(e.secondBest={language:s.secondBest.language,relevance:s.secondBest.relevance}),v("after:highlightElement",{el:e,result:s,text:o})}let h=!1;function f(){if("loading"===document.readyState)return void(h=!0);document.querySelectorAll(a.cssSelector).forEach(g)}function p(e){return e=(e||"").toLowerCase(),t[e]||t[n[e]]}function b(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{n[e.toLowerCase()]=t}))}function m(e){const t=p(e);return t&&!t.disableAutodetect}function v(e,t){const n=e;i.forEach((function(e){e[n]&&e[n](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){h&&f()}),!1),Object.assign(e,{highlight:c,highlightAuto:d,highlightAll:f,highlightElement:g,highlightBlock:function(e){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),g(e)},configure:function(e){a=Ne(a,e)},initHighlighting:()=>{f(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){f(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(n,i){let r=null;try{r=i(e)}catch(a){if("Language definition for '{}' could not be registered.".replace("{}",n),!o)throw a;r=s}r.name||(r.name=n),t[n]=r,r.rawDefinition=i.bind(null,e),r.aliases&&b(r.aliases,{languageName:n})},unregisterLanguage:function(e){delete t[e];for(const t of Object.keys(n))n[t]===e&&delete n[t]},listLanguages:function(){return Object.keys(t)},getLanguage:p,registerAliases:b,autoDetection:m,inherit:Ne,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),i.push(e)}}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="11.7.0",e.regex={concat:z,lookahead:H,either:K,optional:U,anyNumberOfTimes:D};for(const x in le)"object"==typeof le[x]&&N.exports(le[x]);return Object.assign(e,le),e}({}),Ie=Re;Re.HighlightJS=Re,Re.default=Re;var je=Ie;const Te={class:"box"},Le=["innerHTML"];var Be=e(t({__name:"index",props:{code:{type:String,required:!0,default:""},language:{type:String,required:!1,default:"html"},autodetect:{type:Boolean,required:!1,default:!0},ignoreIllegals:{type:Boolean,required:!1,default:!0},styles:{type:String,required:!1}},setup(e){const t=e,{code:d,language:g,autodetect:h,ignoreIllegals:f}=n(t),p=i(g.value);o((()=>g.value),(e=>{p.value=e}));const b=r((()=>!h.value&&!je.getLanguage(p.value))),m=r((()=>b.value?"":`hljs ${p.value}`)),v=r((()=>{if(b.value)return d.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");if(h.value&&!p.value){const e=je.highlightAuto(t.code);return p.value=e.language??"",e.value}return je.highlight(t.code,{language:p.value,ignoreIllegals:f.value}).value}));return(e,t)=>(s(),a("pre",Te,[l("code",{class:c([u(m)]),innerHTML:u(v)},null,10,Le)]))}}),[["__scopeId","data-v-c4ab588e"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/common/components/Highlight/index.vue"]]);var Ce=e(t({__name:"vue",setup:e=>(e,t)=>{const n=d("a-spin");return s(),a("div",null,[g(n)])}}),[["__scopeId","data-v-6a4bb6b4"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/components/vue.vue"]]);const Pe=["id"],$e={key:1,style:{width:"100%"}},He={style:{color:"#999"}},De={key:0},Ue={key:1},ze={key:0},Ke={key:1};var qe=e(t({__name:"bulk",props:{path:{type:Object,required:!1},msg:{type:Object,required:!1,default:()=>({})}},setup(e){const t=e,{path:o,msg:r}=n(t),c=i([]),O=h(Ce),S=i(""),M=i(),N=f({title:"加载中...",context:"加载中...",contextType:"auto"});return o?.value?.file().then((e=>{O.value=e.default,p((()=>{!function(e){S.value=e;const t=o(/(let|const|var)\s+\$config\s=\s(ref|reactive)\(/g,S.value),n=/(?<=(defineExpose)\s?\(\{[\s\S]*)(\$config\s*,\s?)|(\$config:?\s*\{[\S\s]*\s*\},\s?)(?=[\s\S]*\}\))/gs,i=/defineExpose\s?\(\{[\s]*\}\)\s?/gs;function o(e,t){const n=S.value.match(e);if(null===n)return"";let i=t.indexOf(n)+n[0].length,o=n,r=1;for(;r>0;){const e=S.value[i];o+=e,"("===e&&(r+=1),")"===e&&(r-=1),i+=1}return o}S.value=S.value.replace(t,""),S.value=S.value.replace(n,""),S.value=S.value.replace(i,"")}(decodeURIComponent(M.value?.originCode));const{title:e,context:t,order:n,contextType:i}=M.value?.$config||{};N.title=e??N.title,N.context=t??N.context,N.contextType=i??N.contextType,r.value.title=e,r.value.context=t,r.value.order=n}))})),(e,t)=>{const n=d("a-divider"),i=d("a-tooltip"),r=Be,h=d("a-collapse-panel"),f=d("a-collapse");return s(),a("div",{class:"bulk",id:u(o)?.url?.replace(/\.*\/*\s*/g,"")},[l("section",null,[b(e.$slots,"ex",{},(()=>[g(u(O),{ref_key:"moduleRef",ref:M},null,512)]),!0)]),g(n,{style:{margin:"0"},orientation:"left",plain:!1},{default:m((()=>[b(e.$slots,"title",{},(()=>[v(x(u(N).title),1)]),!0)])),_:3}),l("section",null,[b(e.$slots,"p",{},(()=>["auto"===u(N).contextType?(s(),a(y,{key:0},[v(x(u(N).context),1)],64)):_("v-if",!0),"pre"===u(N).contextType?(s(),a("pre",$e,x(u(N).context),1)):_("v-if",!0),"h"===u(N).contextType?(s(),w(E(u(N).context),{key:2,style:{width:"100%"}})):_("v-if",!0)]),!0)]),g(f,{expandIconPosition:"left",bordered:!0,activeKey:u(c),"onUpdate:activeKey":t[0]||(t[0]=e=>k(c)?c.value=e:null)},{expandIcon:m((()=>[g(i,null,{title:m((()=>[u(c).length?(s(),a("span",ze,"收起代码")):(s(),a("span",Ke,"显示代码"))])),default:m((()=>[l("div",He,[u(c).length?(s(),a("div",De,x("< / >"))):(s(),a("div",Ue,x("<    >")))])])),_:1})])),default:m((()=>[g(h,{bordered:!1,key:"1"},{default:m((()=>[l("p",null,[g(r,{code:u(S)},null,8,["code"])])])),_:1})])),_:1},8,["activeKey"])],8,Pe)}}}),[["__scopeId","data-v-fc007fbc"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/components/bulk.vue"]]);function We(){const e=navigator.userAgent;return["Mobile","Android","iPhone","iPad","Windows Phone"].some((t=>e.includes(t)))}const Xe={class:"box"},Ze={class:"left"},Ge={key:0,class:"right"};var Fe=e(t({__name:"layout",props:{modules:{type:null,required:!1}},setup(e){const t=e;S((e=>({"ecebbf8c-width":u(h)})));const{modules:o}=n(t),[r,c,h,p]=function(e){const t=f(Object.entries(e.modules).map((([e,t])=>({url:e,file:t}))));O((()=>{t.sort(((e,t)=>e.order&&t.order?e.order-t.order:0))}));const n=i(We()?"0px":"200px");return[t,function(){return document.querySelector(".main-content")},n,We]}({modules:o.value});return(e,t)=>{const n=d("a-anchor-link"),i=d("a-anchor");return s(),a("div",Xe,[l("div",Ze,[b(e.$slots,"header",{},void 0,!0),u(o)?(s(!0),a(y,{key:0},M(u(r),(e=>(s(),a("div",{class:"BulkList",key:e.url},[g(qe,{path:{url:e.url,file:e.file},msg:e},null,8,["path","msg"])])))),128)):_("v-if",!0),b(e.$slots,"footer",{},void 0,!0)]),u(o)&&!u(p)()?(s(),a("div",Ge,[g(i,{onClick:t[0]||(t[0]=e=>e.preventDefault()),getContainer:u(c)},{default:m((()=>[(s(!0),a(y,null,M(u(r),(e=>(s(),w(n,{title:e.title,key:e.url,href:"#"+e.url.replace(/\.*\/*\s*/g,"")},null,8,["title","href"])))),128))])),_:1},8,["getContainer"])])):_("v-if",!0)])}}}),[["__scopeId","data-v-ecebbf8c"],["__file","/Users/wing/code/self/vue3-ant-dome-dos/src/components/layout.vue"]]);export{Fe as C,Ie as c};
