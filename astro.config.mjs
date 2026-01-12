// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://example.com",

  integrations: [
    mdx(),
    sitemap(),
  ],

  build: {
    sourcemap: false, // VERY important for memory
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
