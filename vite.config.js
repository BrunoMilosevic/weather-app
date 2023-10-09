import { defineConfig } from "vite";

import path from "path";

export default defineConfig({
  build: {
    outDir: "public",

    assetsDir: "assets",
  },

  base: "./",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "assets"),
    },
  },
});
