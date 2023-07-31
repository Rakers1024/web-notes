import { defineConfig } from "vitepress";
import { glob } from "glob";

//获取docs文件夹生成sidebar
function getSidebar() {
  const files = glob.sync("./docs/**/**/*.md", { ignore: "docs/index.md" });
  console.log("🚀 ~ file: config.ts:7 ~ getSidebar ~ files:", files);
  const sidebar: any = [];
  files.forEach(file => {
    file = file.replace(/^docs\//, "");
    const fileArr = file.split("/");
    const filename = fileArr[fileArr.length - 1].replace(/\.md$/, "");
    if (fileArr.length < 2) {
      sidebar.push({
        text: filename,
        link: "/" + file,
      });
    } else {
      const index = sidebar.findIndex((item: any) => item.text === fileArr[0]);
      if (index > -1) {
        sidebar[index].items.push({
          text: filename,
          link: "/" + file,
        });
      } else {
        sidebar.push({
          text: fileArr[0],
          items: [
            {
              text: filename,
              link: "/" + file,
            },
          ],
        });
      }
    }
  });
  return sidebar;
}

// https://vitepress.dev/reference/site-config
export default () => {
  console.log(getSidebar());

  return defineConfig({
    title: "诚哥前端开发笔记",
    description: "一个前端开发者的知识点收集、记录和归档",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "Home", link: "/" },
        { text: "Examples", link: "/markdown-examples" },
        { text: "Vue", link: "/Vue/Vue基础" },
      ],

      // sidebar: [
      //   {
      //     text: "Examples",
      //     items: [
      //       { text: "Markdown Examples", link: "/markdown-examples" },
      //       { text: "Runtime API Examples", link: "/api-examples" },
      //       {
      //         text: "Examples2",
      //         items: [
      //           { text: "Markdown Examples", link: "/markdown-examples" },
      //           { text: "Runtime API Examples", link: "/api-examples" },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      sidebar: getSidebar(),
      search: {
        provider: "local",
      },

      socialLinks: [{ icon: "github", link: "https://github.com/Rakers1024/web-notes" }],
    },
  });
};
