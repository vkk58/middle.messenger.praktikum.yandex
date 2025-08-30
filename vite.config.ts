import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
