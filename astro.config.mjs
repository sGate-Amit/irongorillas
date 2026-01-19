// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://example.com",
  output: "static",

  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },

  integrations: [
    mdx({ optimize: false }),
    sitemap(),
  ],

  build: {
    sourcemap: false,
  },
});
