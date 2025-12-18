// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://empowervaservices.co.uk',
  // output: 'static',
  // adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), mdx(), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  })]
});
// Trigger rebuild