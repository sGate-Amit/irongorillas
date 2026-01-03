// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://example.com",

  // ⚠️ IMPORTANT: avoid unnecessary SSR memory usage
  output: "static",

  integrations: [
    mdx(),
    sitemap(),
  ],

  // 🔥 Reduce build memory pressure
  build: {
    sourcemap: false,
  },

  // 🖼️ Cloudflare-safe image handling
  image: {
    service: "compile",
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
