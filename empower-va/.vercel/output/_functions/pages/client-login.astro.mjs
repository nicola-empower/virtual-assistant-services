import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4wsHHS1.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_Cf26Jrf8.mjs';
import { ArrowRight, Lock } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$ClientLogin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Client Portal Login | Empower VA" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden"> <!-- Background Decor --> <div class="absolute inset-0 z-0"> <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-lilac/20 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-3xl -ml-32 -mb-32 opacity-50"></div> </div> <div class="relative z-10 w-full max-w-md p-6"> <!-- Brand Logo Area --> <div class="text-center mb-8"> <a href="/" class="inline-block hover:scale-105 transition-transform duration-300"> <img src="/logo.png" alt="Empower VA" class="h-12 mx-auto drop-shadow-sm"> </a> <h1 class="text-2xl font-bold text-slate-900 mt-6">
Client Portal
</h1> <p class="text-slate-500 text-sm mt-2">
Secure access to your vault and assets.
</p> </div> <!-- Login Card --> <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden group hover:shadow-lilac/10 transition-shadow duration-500"> <div class="relative z-10"> <form id="client-login-form" class="space-y-5"> <div> <label class="block text-sm font-bold text-slate-700 mb-2" for="email">Email Address</label> <input type="email" id="email" required placeholder="you@company.com" class="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:border-brand-lilac focus:ring-4 focus:ring-brand-lilac/10 outline-none transition-all placeholder:text-slate-400 font-medium"> </div> <div> <label class="block text-sm font-bold text-slate-700 mb-2" for="password">Password</label> <input type="password" id="password" required placeholder="••••••••" class="w-full p-4 bg-white/50 border border-slate-200 rounded-xl focus:border-brand-lilac focus:ring-4 focus:ring-brand-lilac/10 outline-none transition-all placeholder:text-slate-400 font-medium"> </div> <!-- Error Message Container --> <div id="login-error" class="hidden p-3 rounded-lg bg-red-50 text-red-600 text-sm font-bold text-center border border-red-100 flex items-center justify-center gap-2"> <span>Invalid credentials. Please try again.</span> </div> <button type="submit" id="login-btn" class="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98]"> <span>Enter Portal</span> ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-5 h-5 group-hover:translate-x-1 transition-transform" })} </button> </form> <div class="mt-6 text-center"> <p class="text-xs text-slate-400">
Protected by
<span class="inline-flex items-center gap-1 font-bold text-slate-500">${renderComponent($$result2, "Lock", Lock, { "className": "w-3 h-3" })} Supabase Auth</span> </p> </div> </div> <!-- Loading Overlay --> <div id="loading-overlay" class="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"> <div class="w-12 h-12 border-4 border-brand-lilac border-t-transparent rounded-full animate-spin mb-4"></div> <p class="text-brand-lilac font-bold animate-pulse">
Accessing Vault...
</p> </div> </div> <p class="text-center text-slate-400 text-xs mt-8">
Need access? <a href="/contact" class="text-brand-lilac hover:underline font-bold">Contact Support</a> </p> </div> </main> ` })} ${renderScript($$result, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/client-login.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/client-login.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/client-login.astro";
const $$url = "/client-login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ClientLogin,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
