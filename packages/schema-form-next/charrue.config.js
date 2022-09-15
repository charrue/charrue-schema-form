import { defineConfig } from "@charrue/vue3-bundler";

export default defineConfig({
  vueBuild: {
    input: "./src/index.ts",
    outputDir: "dist",
    name: "CharrueLayout",
    shouldModuleBuild: false,
    shouldFullBuild: true,
  },
});
