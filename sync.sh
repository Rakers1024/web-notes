#!/bin/bash

cd `dirname $0`

# 使用代理
git config --local user.name Rakers1024
git config --local http.proxy http://127.0.0.1:7890
git config --local https.proxy http://127.0.0.1:7890

## 判断当前git是否有未提交的文件
if [ -n "$(git status --porcelain)" ]; then
    echo "有更新文件！执行提交拉取推送"
    git add .
    git commit -m "docs📝: note update"
    git pull
    git push

else
    echo "未有更新文件！执行只拉取"
    git pull
fi

echo "同步完成"
