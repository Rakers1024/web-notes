import { defineConfig, DefaultTheme } from "vitepress";
import { glob } from "glob";

function getSidebar(): DefaultTheme.Sidebar {
  const files: string[] = glob.sync("./notes/**/**/*.md", { ignore: "notes/index.md" });
  console.log("🚀 ~ file: config.ts:6 ~ getSidebar ~ files:", files);
  files.reverse();
  files.forEach((file: string) => {
    const fileArr: string[] = file.split("/");
    //将length == 2的放到顶部
    if (fileArr.length === 2) {
      const index: number = files.findIndex(item => item === file);
      files.splice(index, 1);
      files.unshift(file);
    }
  });
  const sidebar: DefaultTheme.Sidebar = [];
  files.forEach((file: string) => {
    file = file.replace(/^notes\//, "");
    const fileArr: string[] = file.split("/");
    const filename: string = fileArr[fileArr.length - 1].replace(/\.md$/, "");
    if (fileArr.length < 2) {
      sidebar.push({
        text: filename,
        link: "/" + file,
      });
    } else {
      //这里文件夹层数不确定 如果是文件夹那么这层就是带items的
      let tempSidebar: DefaultTheme.Sidebar = sidebar;
      for (let i = 0; i < fileArr.length - 1; i++) {
        const index: number = tempSidebar.findIndex(
          item => item.text?.replace(/^\d+\./, "") === fileArr[i].replace(/^\d+\./, "")
        );
        if (index > -1) {
          tempSidebar = tempSidebar[index].items!;
        } else {
          tempSidebar.push({
            text: fileArr[i].replace(/^\d+\./, ""),
            items: [],
          });
          tempSidebar = tempSidebar[tempSidebar.length - 1].items!;
        }
      }
      tempSidebar.push({
        text: filename.replace(/^\d+\./, ""),
        link: "/" + file,
      });
    }
  });
  return sidebar;
}

//根据文件夹位置获取第一个md文件link
function getFirstMdLink(path: string): string {
  const files: string[] = glob.sync("./notes/*." + path + "/**/*.md");
  if (files.length > 0) {
    return files[0].replace(/^notes\//, "").replace(/\.md$/, "");
  } else {
    return "";
  }
}

// https://vitepress.dev/reference/site-config
export default () => {
  return defineConfig({
    lang: "zh-CN",
    title: "诚哥前端开发笔记",
    description: "一个前端开发者的知识点收集、记录和归档",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "首页", link: "/" },
        { text: "Vue", link: getFirstMdLink("Vue") },
        { text: "React", link: getFirstMdLink("React") },
        { text: "Typescript", link: getFirstMdLink("Typescript") },
        { text: "Javascript", link: getFirstMdLink("Javascript") },
        { text: "小程序", link: getFirstMdLink("小程序") },
        { text: "浏览器", link: getFirstMdLink("浏览器") },
        { text: "关于", link: "/about" },
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
      editLink: {
        pattern: "https://github.com/Rakers1024/web-notes/edit/main/notes/:path",
        text: "在Github编辑这个页面",
      },
      lastUpdated: {
        text: "最后更新时间",
      },

      socialLinks: [{ icon: "github", link: "https://github.com/Rakers1024/web-notes" }],
    },
  });
};
