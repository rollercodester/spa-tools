"use strict";(self.webpackChunk_spa_tools_website=self.webpackChunk_spa_tools_website||[]).push([[7991],{9866:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>x,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var n=i(7458),s=i(7996),o=i(5207);const l={title:"tone",pagination_label:"Color Utilities: tone",pagination_next:"utilities/conditionals/are-dates-equal",pagination_prev:"utilities/colors/tint",sidebar_label:"tone",slug:"/utilities/colors/tone"},r="tone",d={id:"utilities/colors/tone",title:"tone",description:"The tone function adds gray to a color.",source:"@site/docs/utilities/colors/tone.mdx",sourceDirName:"utilities/colors",slug:"/utilities/colors/tone",permalink:"/spa-tools/utilities/colors/tone",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"tone",pagination_label:"Color Utilities: tone",pagination_next:"utilities/conditionals/are-dates-equal",pagination_prev:"utilities/colors/tint",sidebar_label:"tone",slug:"/utilities/colors/tone"},sidebar:"docs",previous:{title:"Color Utilities: tint",permalink:"/spa-tools/utilities/colors/tint"},next:{title:"Conditional Utilities: areDatesEqual",permalink:"/spa-tools/utilities/conditionals/are-dates-equal"}},a={},c=[{value:"Usage",id:"usage",level:3},{value:"Arguments",id:"arguments",level:3},{value:"Returns",id:"returns",level:3}];function h(e){const t={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.D_,{packageName:"@spa-tools/utilities"}),"\n",(0,n.jsx)(t.h1,{id:"tone",children:"tone"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"tone"})," function adds gray to a color."]}),"\n",(0,n.jsx)(t.h3,{id:"usage",children:"Usage"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"import { tone } from '@spa-tools/utilities';\n\nconst redTonedExponentially = tone('#FF0000', 0.2);\nconsole.log(redTonedExponentially.toHex());\n// --\x3e #eb3939\nconst redTonedLinearly = tone('#FF0000', 0.2, true);\nconsole.log(redTonedLinearly.toHex());\n// --\x3e #e61a1a\n"})}),"\n",(0,n.jsx)(t.h3,{id:"arguments",children:"Arguments"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Name"}),(0,n.jsx)(t.th,{children:"Type"}),(0,n.jsx)(t.th,{children:"Required?"}),(0,n.jsx)(t.th,{children:"Default"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"rgbOrRgbaOrHex"})}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string"})}),(0,n.jsx)(t.td,{children:"yes"}),(0,n.jsx)(t.td,{children:"-"}),(0,n.jsx)(t.td,{children:"RGB(A) or hex color string"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"ratio"})}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"number"})}),(0,n.jsx)(t.td,{children:"yes"}),(0,n.jsx)(t.td,{children:"-"}),(0,n.jsxs)(t.td,{children:["Interpolation ratio between ",(0,n.jsx)(t.code,{children:"0"})," and ",(0,n.jsx)(t.code,{children:"1"})]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"linear"})}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"boolean"})}),(0,n.jsx)(t.td,{children:"no"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"false"})}),(0,n.jsxs)(t.td,{children:["If ",(0,n.jsx)(t.code,{children:"true"})," uses a linear interpolation algorithm; otherwise, ",(0,n.jsx)(t.code,{children:"exponential"})," interpolation will be used"]})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"returns",children:"Returns"}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"color-object",children:(0,n.jsx)(t.code,{children:"ColorObject"})})," object."]})]})}function x(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}}}]);