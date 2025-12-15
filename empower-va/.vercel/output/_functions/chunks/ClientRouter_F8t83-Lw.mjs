import { e as createAstro, c as createComponent, d as addAttribute, b as renderScript, a as renderTemplate } from './astro/server_D4wsHHS1.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */

const $$Astro = createAstro("https://empowervaservices.co.uk");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/nicol/OneDrive/Desktop/the websites/virtual assistant services/empower-va/node_modules/astro/components/ClientRouter.astro", void 0);

export { $$ClientRouter as $ };
