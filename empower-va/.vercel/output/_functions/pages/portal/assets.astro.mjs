import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_D4wsHHS1.mjs';
import 'piccolore';
import { $ as $$ClientPortalLayout } from '../../chunks/ClientPortalLayout_BEmFBeLm.mjs';
import { supabase } from '../../chunks/supabase_DWJzf1lo.mjs';
import { FolderOpen, Download, Image, FileText, File } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://empowervaservices.co.uk");
const prerender = false;
const $$Assets = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Assets;
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
  const { data: client } = await supabase.from("clients").select("id, name").eq("linked_user_id", user?.id).single();
  let assets = [];
  if (client) {
    const { data } = await supabase.from("assets").select("*").eq("client_id", client.id).order("created_at", { ascending: false });
    assets = data || [];
  }
  const getIcon = (type) => {
    if (type?.includes("image")) return Image;
    if (type?.includes("pdf") || type?.includes("document")) return FileText;
    return File;
  };
  return renderTemplate`${renderComponent($$result, "ClientPortalLayout", $$ClientPortalLayout, { "title": "My Assets | File Library" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3"> ${renderComponent($$result2, "FolderOpen", FolderOpen, { "className": "w-8 h-8 text-blue-600" })}
Asset Library
</h1> <p class="text-slate-500 mt-2">
Your contracts, deliverables, and shared resources.
</p> </div> ${!client ? renderTemplate`<div class="p-4 bg-red-50 text-red-600 rounded-lg">
Profile not linked. Contact Admin.
</div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> ${assets.length === 0 ? renderTemplate`<div class="col-span-full py-12 text-center bg-white/50 rounded-2xl border border-dashed border-slate-300"> <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "FolderOpen", FolderOpen, { "className": "w-8 h-8 text-slate-300" })} </div> <h3 class="text-slate-900 font-bold mb-1">
No Assets Yet
</h3> <p class="text-slate-500 text-sm">
Your files will appear here once shared.
</p> </div>` : assets.map((asset) => {
    const FileIcon = getIcon(asset.type);
    return renderTemplate`<div class="glass-card p-5 rounded-xl border border-white/60 relative group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-full"> <div> <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors"> ${renderComponent($$result2, "FileIcon", FileIcon, { "className": "w-6 h-6" })} </div> <h3 class="font-bold text-slate-900 leading-tight mb-1 line-clamp-2"> ${asset.name} </h3> <p class="text-xs text-slate-400 mb-4"> ${new Date(
      asset.created_at
    ).toLocaleDateString()} </p> </div> <a${addAttribute(asset.file_url, "href")} download target="_blank" class="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-900 hover:text-white transition-all"> ${renderComponent($$result2, "Download", Download, { "className": "w-4 h-4" })} Download
</a> </div>`;
  })} </div>`}` })}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/portal/assets.astro", void 0);

const $$file = "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/pages/portal/assets.astro";
const $$url = "/portal/assets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Assets,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
