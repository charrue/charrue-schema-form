import { defineConfig } from "vitepress";
import type { DefaultTheme } from "vitepress";
import { applyPlugins } from "@ruabick/md-demo-plugins";

// const sidebar: DefaultTheme.Config["sidebar"] = {
//   "/guide/": [
//     {
//       text: "指南",
//       items: [
//         {
//           text: "介绍",
//           link: "/guide/"
//         }
//       ]
//     }
//   ],
//   "/field/": [
//     {
//       text: "Field",
//       items: [
//         {
//           text: "Input",
//           link: "/field/input/"
//         }
//       ]
//     }
//   ]
// }
const sidebar: DefaultTheme.Config["sidebar"] = [
  {
    text: "开始使用",
    items: [
      {
        text: "介绍",
        link: "/guide/",
      },
    ],
  },
  {
    text: "表单组件",
    items: [
      {
        text: "Input",
        link: "/field/input/"
      },
      {
        text: "InputNumber",
        link: "/field/input-number/"
      },
      {
        text: "Select",
        link: "/field/select/"
      },
    ]
  }
];

export default defineConfig({
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
    logo: "/logo.svg",
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
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
});
