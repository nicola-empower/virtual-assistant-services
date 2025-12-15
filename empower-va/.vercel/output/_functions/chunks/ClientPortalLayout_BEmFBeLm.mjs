import { e as createAstro, c as createComponent, d as addAttribute, r as renderComponent, i as renderHead, j as renderSlot, a as renderTemplate } from './astro/server_D4wsHHS1.mjs';
import 'piccolore';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { X, Menu, LayoutDashboard, Shield, FolderOpen, LogOut } from 'lucide-react';
/* empty css                          */
import { $ as $$ClientRouter } from './ClientRouter_F8t83-Lw.mjs';

const SidebarItem = ({ icon: Icon, active, href, title }) => /* @__PURE__ */ jsxs(
  "a",
  {
    href,
    title,
    className: `w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl transition-all duration-200 relative group
        ${active ? "bg-white/70 text-brand-lilac-dark shadow-sm" : "text-slate-500 hover:bg-white/40 hover:text-slate-700"}`,
    children: [
      /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 md:w-6 md:h-6 ${active ? "text-brand-lilac-dark" : ""}` }),
      /* @__PURE__ */ jsx("span", { className: "absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50", children: title })
    ]
  }
);
function ClientSidebar({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => currentPath === path;
  const handleLogout = async () => {
    const { supabase } = await import('./supabase_DWJzf1lo.mjs');
    await supabase.auth.signOut();
    window.location.href = "/client-login";
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "md:hidden fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-slate-200",
        children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6 text-slate-700" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6 text-slate-700" })
      }
    ),
    /* @__PURE__ */ jsxs("aside", { className: `
                fixed top-0 left-0 h-screen w-20 md:w-24 bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-2xl z-40
                flex flex-col items-center py-8 transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-lilac to-brand-lilac-dark rounded-xl flex items-center justify-center shadow-lg shadow-brand-lilac/20", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-xl", children: "E" }) }) }),
      /* @__PURE__ */ jsxs("nav", { className: "flex-1 flex flex-col gap-4 md:gap-6 w-full items-center", children: [
        /* @__PURE__ */ jsx(
          SidebarItem,
          {
            icon: LayoutDashboard,
            title: "Dashboard",
            href: "/portal",
            active: isActive("/portal") || isActive("/portal/")
          }
        ),
        /* @__PURE__ */ jsx(
          SidebarItem,
          {
            icon: Shield,
            title: "My Vault",
            href: "/portal/vault",
            active: isActive("/portal/vault")
          }
        ),
        /* @__PURE__ */ jsx(
          SidebarItem,
          {
            icon: FolderOpen,
            title: "My Assets",
            href: "/portal/assets",
            active: isActive("/portal/assets")
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto flex flex-col gap-4", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleLogout,
          title: "Log Out",
          className: "w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200",
          children: /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5 md:w-6 md:h-6" })
        }
      ) })
    ] }),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden",
        onClick: () => setIsOpen(false)
      }
    )
  ] });
}

const $$Astro = createAstro("https://empowervaservices.co.uk");
const $$ClientPortalLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientPortalLayout;
  const { title } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description" content="Empower VA Client Portal"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/png" href="/logo.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}${renderHead()}</head> <body class="bg-slate-50 min-h-screen font-sans selection:bg-brand-lilac selection:text-white overflow-x-hidden"> <!-- Fixed Sidebar --> ${renderComponent($$result, "ClientSidebar", ClientSidebar, { "client:load": true, "currentPath": currentPath, "client:component-hydration": "load", "client:component-path": "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/components/ClientSidebar.jsx", "client:component-export": "default" })} <!-- Main Content Area --> <main class="md:pl-24 min-h-screen relative z-10 p-6 md:p-10 transition-all duration-300"> <!-- Background Gradients (Atmosphere) --> <div class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"> <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-lilac/5 rounded-full blur-[120px] -mr-40 -mt-40"></div> <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[100px] -ml-20 -mb-20"></div> </div> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/src/layouts/ClientPortalLayout.astro", void 0);

export { $$ClientPortalLayout as $ };
