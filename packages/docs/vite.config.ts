import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      "@charrue/ep": resolve(__dirname, "../schema-form-next/src/index.ts"),
    },
  },
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, "./src/index.ts"),
  //     name: "charrue-schema-form-docs",
  //     fileName: "charrue-schema-form-docs",
  //   },
  //   rollupOptions: {
  //     external: ["vue"],
  //     output: {
  //       globals: {
  //         vue: "Vue",
  //       },
  //     },
  //   },
  // },
});
