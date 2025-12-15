import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_03vTiJ3L.mjs';
import { manifest } from './manifest_GxkeWgfy.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/client-login.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/edge.astro.mjs');
const _page6 = () => import('./pages/edge/_---slug_.astro.mjs');
const _page7 = () => import('./pages/portal/assets.astro.mjs');
const _page8 = () => import('./pages/portal/vault.astro.mjs');
const _page9 = () => import('./pages/portal.astro.mjs');
const _page10 = () => import('./pages/portfolio/business-system-build-trades.astro.mjs');
const _page11 = () => import('./pages/portfolio/cgh-joinery.astro.mjs');
const _page12 = () => import('./pages/portfolio/document-automation.astro.mjs');
const _page13 = () => import('./pages/portfolio/global-logistics-planner.astro.mjs');
const _page14 = () => import('./pages/portfolio/inbox-zero.astro.mjs');
const _page15 = () => import('./pages/portfolio/intelligent-lead-generation.astro.mjs');
const _page16 = () => import('./pages/portfolio/lead-generation.astro.mjs');
const _page17 = () => import('./pages/portfolio.astro.mjs');
const _page18 = () => import('./pages/privacy-policy.astro.mjs');
const _page19 = () => import('./pages/services.astro.mjs');
const _page20 = () => import('./pages/terms-conditions.astro.mjs');
const _page21 = () => import('./pages/tools/admin-suite.astro.mjs');
const _page22 = () => import('./pages/tools/contract-generator.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/client-login.astro", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/edge/index.astro", _page5],
    ["src/pages/edge/[...slug].astro", _page6],
    ["src/pages/portal/assets.astro", _page7],
    ["src/pages/portal/vault.astro", _page8],
    ["src/pages/portal/index.astro", _page9],
    ["src/pages/portfolio/business-system-build-trades.astro", _page10],
    ["src/pages/portfolio/cgh-joinery.astro", _page11],
    ["src/pages/portfolio/document-automation.astro", _page12],
    ["src/pages/portfolio/global-logistics-planner.astro", _page13],
    ["src/pages/portfolio/inbox-zero.astro", _page14],
    ["src/pages/portfolio/intelligent-lead-generation.astro", _page15],
    ["src/pages/portfolio/lead-generation.astro", _page16],
    ["src/pages/portfolio.astro", _page17],
    ["src/pages/privacy-policy.astro", _page18],
    ["src/pages/services.astro", _page19],
    ["src/pages/terms-conditions.astro", _page20],
    ["src/pages/tools/admin-suite.astro", _page21],
    ["src/pages/tools/contract-generator.astro", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "953bbbf9-a6f1-4801-88a2-95ed67b97f88",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
