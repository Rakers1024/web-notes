import { defineConfig, DefaultTheme } from "vitepress";
import MarkdownPreview from "vite-plugin-markdown-preview";
import { glob } from "glob";

const MD_PATH = "./notes/**/**/*.md";
const MD_IGNORE = ["notes/index.md", "notes/about.md"];

function getSidebar(): DefaultTheme.Sidebar {
  const files = glob.sync(MD_PATH, { ignore: MD_IGNORE }).reverse();
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
        link: `/${file
          .replace(/^notes\//, "")
          .replace(/^\d+\./, "")
          .replace(/\/\d+\./g, "/")}`,
      });
    }
  });
  return sidebar;
}

function getFirstMdLink(path: string): string {
  const [file] = glob.sync(`./notes/*.${path}/**/*.md`).reverse();
  return file
    ? `/${file
        .replace(/^notes\//, "")
        .replace(/\.md$/, "")
        .replace(/^\d+\./, "")
        .replace(/\/\d+\./g, "/")}`
    : "";
}

//重新所有路径的数字开头文件
function numberMdRewrites() {
  const files = glob.sync(MD_PATH, { ignore: MD_IGNORE });
  const rewrites: Record<string, string> = {};
  files.forEach(file => {
    file = file.replace(/^notes\//, "");
    rewrites[file] = file.replace(/^\d+\./, "").replace(/\/\d+\./g, "/");
  });
  return rewrites;
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
        { text: "TypeScript", link: getFirstMdLink("TypeScript") },
        { text: "JavaScript", link: getFirstMdLink("JavaScript") },
        { text: "小程序", link: getFirstMdLink("小程序") },
        { text: "浏览器", link: getFirstMdLink("浏览器") },
        { text: "综合", link: getFirstMdLink("综合") },
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
    //vitepress去除路径地址上的排序标识即/^\d+\./
    rewrites: {
      ...numberMdRewrites(),
    },
    vite: {
      plugins: [MarkdownPreview()],
    },
  });
};
