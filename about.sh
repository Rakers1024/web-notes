#!/bin/bash

cd "$(dirname "$0")"

# 将README.md文件内容写入到./notes/about.md文件中,并且头部添加字符串
echo -e "---\ntitle: 关于\neditLink: false\nlastUpdated: false\nprev: false\nnext: false\n---\n\n$(cat README.md)" > ./notes/about.md
