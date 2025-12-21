const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/supabase.DdYAh7EM.js","_astro/_commonjsHelpers.D6-XlEtG.js","_astro/tslib.es6.DLa7mYsq.js"])))=>i.map(i=>d[i]);
import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as y}from"./index.xAY1PbN_.js";import{X as g}from"./x.CLu1-jaY.js";import{c as u}from"./createLucideIcon.CbtgVy_T.js";import"./_commonjsHelpers.D6-XlEtG.js";/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],j=u("folder-open",v);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],N=u("layout-dashboard",k);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],E=u("log-out",_);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],S=u("menu",M);/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],C=u("shield",$),L="modulepreload",O=function(i){return"/"+i},f={},P=function(a,r,o){let m=Promise.resolve();if(r&&r.length>0){let n=function(t){return Promise.all(t.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),p=s?.nonce||s?.getAttribute("nonce");m=n(r.map(t=>{if(t=O(t),t in f)return;f[t]=!0;const d=t.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${h}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":L,d||(l.as="script"),l.crossOrigin="",l.href=t,p&&l.setAttribute("nonce",p),document.head.appendChild(l),d)return new Promise((w,b)=>{l.addEventListener("load",w),l.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${t}`)))})}))}function c(n){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=n,window.dispatchEvent(s),!s.defaultPrevented)throw n}return m.then(n=>{for(const s of n||[])s.status==="rejected"&&c(s.reason);return a().catch(c)})},x=({icon:i,active:a,href:r,title:o})=>e.jsxs("a",{href:r,title:o,className:`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl transition-all duration-200 relative group
        ${a?"bg-white/70 text-brand-lilac-dark shadow-sm":"text-slate-500 hover:bg-white/40 hover:text-slate-700"}`,children:[e.jsx(i,{className:`w-5 h-5 md:w-6 md:h-6 ${a?"text-brand-lilac-dark":""}`}),e.jsx("span",{className:"absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50",children:o})]});function R({currentPath:i}){const[a,r]=y.useState(!1),o=c=>i===c,m=async()=>{const{supabase:c}=await P(async()=>{const{supabase:n}=await import("./supabase.DdYAh7EM.js");return{supabase:n}},__vite__mapDeps([0,1,2]));await c.auth.signOut(),window.location.href="/client-login"};return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>r(!a),className:"md:hidden fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-slate-200",children:a?e.jsx(g,{className:"w-6 h-6 text-slate-700"}):e.jsx(S,{className:"w-6 h-6 text-slate-700"})}),e.jsxs("aside",{className:`
                fixed top-0 left-0 h-screen w-20 md:w-24 bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-2xl z-40
                flex flex-col items-center py-8 transition-transform duration-300 ease-in-out
                ${a?"translate-x-0":"-translate-x-full md:translate-x-0"}
            `,children:[e.jsx("div",{className:"mb-12",children:e.jsx("div",{className:"w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-lilac to-brand-lilac-dark rounded-xl flex items-center justify-center shadow-lg shadow-brand-lilac/20",children:e.jsx("span",{className:"text-white font-bold text-xl",children:"E"})})}),e.jsxs("nav",{className:"flex-1 flex flex-col gap-4 md:gap-6 w-full items-center",children:[e.jsx(x,{icon:N,title:"Dashboard",href:"/portal",active:o("/portal")||o("/portal/")}),e.jsx(x,{icon:C,title:"My Vault",href:"/portal/vault",active:o("/portal/vault")}),e.jsx(x,{icon:j,title:"My Assets",href:"/portal/assets",active:o("/portal/assets")})]}),e.jsx("div",{className:"mt-auto flex flex-col gap-4",children:e.jsx("button",{onClick:m,title:"Log Out",className:"w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200",children:e.jsx(E,{className:"w-5 h-5 md:w-6 md:h-6"})})})]}),a&&e.jsx("div",{className:"fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden",onClick:()=>r(!1)})]})}export{R as default};
