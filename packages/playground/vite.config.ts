import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@charrue/schema-form-next": resolve(__dirname, "../schema-form-next/src/index.ts"),
      "~charrue/schema-form-next/index.css": resolve(
        __dirname,
        "../schema-form-next/styles/index.scss",
      ),
    },
  },
  plugins: [vue()],
});
