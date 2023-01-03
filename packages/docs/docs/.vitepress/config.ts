import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress";
import { applyPlugins } from "@ruabick/md-demo-plugins";

const sidebar: DefaultTheme.Config["sidebar"] = [
  {
    text: "功能介绍",
    items: [
      {
        text: "开始使用",
        link: "/guide/",
      },
      {
        text: "组件",
        link: "/field/"
      },
      {
        text: "插槽",
        link: "/slots/"
      },
    ]
  },
];

export default defineConfig({
  base: "/charrue-schema-form/",
  lastUpdated: true,
  title: "Schema Form",
  description: "基于Element Plus的增强型的表单组件",
  head: [
    [
      "link",
      { rel: "stylesheet", href: "//unpkg.com/element-plus/dist/index.css" },
    ],
  ],
  themeConfig: {
    logo: "/charrue-schema-form/logo.svg",
    nav: [{ text: "开始使用", link: "/guide/" }],
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/charrue-schema-form" },
    ],
  },
  markdown: {
    config: (md) => {
      applyPlugins(md);
    },
  },
  vite: {
    server: {
      host: true,
      fs: {
        allow: ["../../../"]
      }
    }
  },
});
