import{r as n,j as e,c as t,S as d,F as h}from"./vendor.27cd92a7.js";import{g as E,a as N}from"./index.e68e4af5.js";import{C as g}from"./index.29c54872.js";const p=()=>{const[a,l]=n.exports.useState({}),[r,c]=n.exports.useState(!0),i=n.exports.useCallback(async()=>{const o=await E();c(!1),l(o)},[]);return n.exports.useEffect(()=>{i()},[i]),{config:a,loading:r}};const v=({showAll:a})=>{const[l,r]=n.exports.useState([]),c=n.exports.useCallback(async()=>{const s=await N(),{teacherList:m}=s;r(m)},[]);n.exports.useEffect(()=>{c()},[c]);const o=a?l:(()=>l.filter(s=>s.tag==="star"))();return e("div",{className:"teachar-recommand",children:o.map(s=>t("div",{className:"teachar-intro",children:[e("img",{src:s.avatarUrl,alt:"avatar",className:"avatar"}),t("div",{className:"info",children:[t("div",{className:"teachar-title",children:[t("div",{className:"teachar-name",children:[s.name,"\u8001\u5E08"]}),t("span",{className:"teachar-tag",children:["\u8BFE\u7A0B",e("span",{children:s.coursesCount}),"\u5B66\u751F",e("span",{children:s.studentsCount})]})]}),e("div",{className:"teach-intro",children:s.info})]})]},s.name))})};const C=[{key:"INDEX",title:"\u4E3B\u9875"},{key:"COURSE",title:"\u8BFE\u7A0B"},{key:"TEACHAR",title:"\u8001\u5E08"},{key:"ABOUT",title:"\u5173\u4E8E\u6211\u4EEC"}],u=a=>a?"tab-show":"";function x(){const[a,l]=n.exports.useState("INDEX"),r=a==="INDEX",{config:c,loading:i}=p(),o=()=>t(h,{children:[t("section",{className:u(a==="INDEX"||a==="COURSE"),children:[e("div",{className:"title",children:r?"\u70ED\u95E8\u8BFE\u7A0B":"\u5168\u90E8\u8BFE\u7A0B"}),e(g,{showAll:a==="COURSE"})]}),t("section",{className:u(a==="INDEX"||a==="TEACHAR"),children:[e("div",{className:"title",children:r?"\u63A8\u8350\u540D\u5E08":"\u5168\u90E8\u540D\u5E08"}),e(v,{showAll:a==="TEACHAR"})]})]});return e("div",{className:"home-wrapper",children:t(d,{spinning:i,children:[t("header",{className:"home-wrapper-header",children:[e("img",{className:"intro-cover",src:c.coverUrl,alt:"site-cover"}),e("img",{className:"logo-mark",src:c.consultUrl,alt:"logo-mark"}),e("ul",{className:"nav",children:C.map(s=>e("li",{className:`${s.key===a?"active":""}`,onClick:()=>l(s.key),children:s.title},s.key))})]}),t("main",{className:"home-wrapper-content",children:[o(),t("section",{className:u(r||a==="ABOUT"),children:[e("div",{className:"title",children:"\u673A\u6784\u4ECB\u7ECD"}),t("div",{className:"organize",children:[e("div",{className:"intro",children:c.aboutUsInfo}),e("img",{src:c.aboutUsImgUrl,alt:"organize-logo",className:"organize-logo"})]})]})]})]})})}export{x as default};
