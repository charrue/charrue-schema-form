import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import esbuild, { minify } from "rollup-plugin-esbuild";

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      format: "umd",
      file: "./dist/index.full.js",
      exports: "named",
      name: "CHARRUE_SCHEMA_FORM",
      globals: {
        vue: "Vue",
        "element-plus": "ElementPlus",
      },
      sourcemap: true,
    },
  ],
  external: ["vue", "element-plus"],
  treeshake: true,
  plugins: [
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".ts"],
    }),
    commonjs(),
    esbuild({
      exclude: [],
      sourceMap: true,
      target: "es2015",
      loaders: {
        ".vue": "ts",
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      treeShaking: true,
      legalComments: "eof",
    }),
    minify({
      target: "es2015",
      sourceMap: true,
    }),
  ],
});
