// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://example.com",

  output: "static",

  integrations: [
    mdx(),
    sitemap(),
  ],

  build: {
    sourcemap: false,
  },

  image: {
    service: {
      entrypoint: "@astrojs/image/services/compile",
    },
  },
});
