---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "诚哥前端开发笔记"
  text: "一个前端开发者的知识点收集、记录和归档"
  tagline: "欢迎来到我的前端开发笔记"
  actions:
    - theme: brand
      text: Vue
      link: /markdown-examples
    - theme: brand
      text: React
      link: /markdown-examples
    - theme: alt
      text: 前端知识点
      link: /api-examples

features:
  - icon: 🛠️
    title: Vue
    details: Vue相关知识点
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/Rakers1024.png',
    name: 'Chengzz',
    title: '前端工程师',
    links: [
      { icon: 'github', link: 'https://github.com/Rakers1024' },
      // { icon: 'twitter', link: 'https://twitter.com/Rakers4096' }
    ]
  }
]
</script>
<VPTeamMembers :members="members" style="margin-top:20px;" />