import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D4wsHHS1.mjs';
import 'piccolore';
import { $ as $$ClientPortalLayout } from '../chunks/ClientPortalLayout_BEmFBeLm.mjs';
import { supabase } from '../chunks/supabase_DWJzf1lo.mjs';
import { Clock, Shield, ArrowRight, FolderOpen } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://empowervaservices.co.uk");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { cookies, redirect } = Astro2;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (!accessToken || !refreshToken) {
    return redirect("/client-login");
  }
  let session;
  try {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken.value,
      refresh_token: refreshToken.value
    });
    if (error) throw error;
    session = data.session;
  } catch (error) {
    return redirect("/client-login");
  }
  const user = session?.user;
  const { data: clientData, error: clientError } = await supabase.from("clients").select("*").eq("linked_user_id", user?.id).single();
  const client = clientData;
  let hoursUsed = 0;
  if (client) {
    const startOfMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString();
    const { data: timeEntries } = await supabase.from("time_entries").select("duration").eq("client_id", client.id).gte("date", startOfMonth);
    if (timeEntries) {
      timeEntries.forEach((entry) => {
        const parts = entry.duration.split(":");
        if (parts.length === 3) {
          hoursUsed += parseInt(parts[0]) + parseInt(parts[1]) / 60;
        }
      });
    }
  }
  return renderTemplate`${renderComponent($$result, "ClientPortalLayout", $$ClientPortalLayout, { "title": client ? `${client.name} | Portal` : "Client Portal" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"> <div> <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"> ${client ? `Welcome back, ${client.first_name || client.name}` : "Welcome to your Portal"} </h1> <p class="text-slate-500 mt-2 text-lg">
Here is your operational snapshot for ${(/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" })}.
</p> </div> <!-- Status Pill --> <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-slate-200 shadow-sm"> <span class="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse"></span> <span class="text-sm font-bold text-slate-700">System Active</span> </div> </header> ${!client ? renderTemplate`<div class="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-2xl"> <h2 class="font-bold text-lg mb-2">Profile Not Linked</h2> <p>We see you're logged in, but your account isn't linked to a specific Client Profile yet. Please contact Nicola to get this connected.</p> </div>` : renderTemplate`<div class="space-y-12"> <!-- KEY METRICS GRID --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <!-- Time Widget --> <div class="glass-card p-6 rounded-2xl relative overflow-hidden group"> <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"> ${renderComponent($$result2, "Clock", Clock, { "className": "w-24 h-24 text-brand-lilac" })} </div> <div class="relative z-10"> <h3 class="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">Hours Used</h3> <div class="text-4xl font-extrabold text-slate-900 mb-1"> ${hoursUsed.toFixed(1)} <span class="text-xl font-medium text-slate-400">hrs</span> </div> <p class="text-xs text-slate-400">This Month</p> </div> </div> <!-- Vault Widget (Link) --> <a href="/portal/vault" class="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer border border-white/50 hover:border-brand-lilac/30"> <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"> ${renderComponent($$result2, "Shield", Shield, { "className": "w-24 h-24 text-teal-600" })} </div> <div class="relative z-10 h-full flex flex-col"> <h3 class="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">Secure Vault</h3> <div class="text-2xl font-bold text-slate-900 mb-2">Access Credentials</div> <p class="text-sm text-slate-500 mb-6 flex-1">View shared passwords and secure notes.</p> <div class="flex items-center gap-2 text-teal-700 font-bold text-sm">
Open Vault ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-4 h-4" })} </div> </div> </a> <!-- Assets Widget (Link) --> <a href="/portal/assets" class="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer border border-white/50 hover:border-brand-lilac/30"> <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"> ${renderComponent($$result2, "FolderOpen", FolderOpen, { "className": "w-24 h-24 text-blue-600" })} </div> <div class="relative z-10 h-full flex flex-col"> <h3 class="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">Asset Library</h3> <div class="text-2xl font-bold text-slate-900 mb-2">My Files</div> <p class="text-sm text-slate-500 mb-6 flex-1">Access contracts, guides, and deliverables.</p> <div class="flex items-center gap-2 text-blue-700 font-bold text-sm">
View Files ${renderComponent($$result2, "ArrowRight", ArrowRight, { "className": "w-4 h-4" })} </div> </div> </a> </div> <!-- "WHAT'S NEW" / ANNOUNCEMENTS (Conceptual Placeholder for Phase 5) --> <div class="glass-card p-8 rounded-3xl border border-white/60"> <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"> <span class="w-2 h-2 rounded-full bg-brand-lilac"></span>
Recent Activity
</h3> <div class="space-y-4"> <!-- Empty State --> <div class="text-center py-8 text-slate-400 text-sm">
No immediate alerts or notifications.
</div> </div> </div> </div>`}` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/portal/index.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/portal/index.astro";
const $$url = "/portal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
