import { defineConfig, DefaultTheme } from "vitepress";
import { glob } from "glob";

function getSidebar(): DefaultTheme.Sidebar {
  const files = glob.sync("./notes/**/**/*.md", { ignore: ["notes/index.md", "notes/about.md"] }).reverse();
  for (let i = 0; i < files.length; i++) {
    const fileArr: readonly string[] = files[i].split("/");
    //将length == 2的放到顶部
    if (fileArr.length === 2) {
      files.unshift(files.splice(i, 1)[0]);
    }
  }
  const sidebar: DefaultTheme.Sidebar = [];
  files.forEach((file: string) => {
    const [, ...fileArr] = file.split("/");
    const filename = fileArr[fileArr.length - 1].replace(/\.md$/, "");
    if (fileArr.length < 2) {
      sidebar.push({
        text: filename,
        link: `/${file.replace(/^notes\//, "")}`,
      });
    } else {
      let tempSidebar = sidebar;
      for (const folder of fileArr.slice(0, -1)) {
        const index = tempSidebar.findIndex(({ text }) => text?.replace(/^\d+\./, "") === folder.replace(/^\d+\./, ""));
        if (index > -1) {
          tempSidebar = tempSidebar[index].items!;
        } else {
          tempSidebar.push({
            text: folder.replace(/^\d+\./, ""),
            items: [],
          });
          tempSidebar = tempSidebar[tempSidebar.length - 1].items!;
        }
      }
      tempSidebar.push({
        text: filename.replace(/^\d+\./, ""),
        link: `/${file.replace(/^notes\//, "")}`,
      });
    }
  });
  return sidebar;
}

function getFirstMdLink(path: string): string {
  const [file] = glob.sync(`./notes/*.${path}/**/*.md`);
  return file ? `/${file.replace(/^notes\//, "").replace(/\.md$/, "")}` : "";
}

export default () => {
  return defineConfig({
    lang: "zh-CN",
    title: "诚哥前端开发笔记",
    description: "一个前端开发者的知识点收集、记录和归档",
    themeConfig: {
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
    vite: {},
  });
};
