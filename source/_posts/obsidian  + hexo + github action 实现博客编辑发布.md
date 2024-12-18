---
title: obsidian  + hexo + github action 实现博客编辑发布
date: 2024-12-03T11:35:00
updated: 2024-12-03T11:40:00
permalink: 
top: 0
comments: 
copyright: true
tags:
  - obsidian
  - hexo
  - github-action
categories: 
keywords: obsidian, hexo, github-action
description: 使用 obsidian + github action 实现 hexo 博客的编辑与发布
---
之前的个人博客是在本机上使用 hexo 搭建的.每次编辑文章,都要打开电脑先写 markdown, 然后执行 hexo 命令发布到 github page. 
这样的操作很难发挥个人积极性,毕竟要写笔记、还要写博客.最近正在看 obsidian dateview, 然后就想如果笔记 obsidian 和 hexo 结合起来,那不就完美了.

所以本文就是在 obsidian 中写 markdown 文章,然后交由 github action 执行 hexo 发布到 github page.

### 1、hexo 生成站点

这一步省略,之前我的站点已经生成好了,使用的 anzhiyu 主题,看着还不错.

### 2、github action 配置
以下是之前配置的 github action
```yml
name: Hexo CI CD
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2 
        with:
          persist-credentials: false
          submodules: recursive
      - name: "Using Special Node Version"
        uses: actions/setup-node@v2
        with:
          node-version: "12"

      - name: Generate Hexo site ⚗️
        run: |
          echo "Github Action Env Checking..."
          echo "Node Version: `node -v`"
          echo "Coping theme config file"
          CONFIG_FILE="_config.yml"
          NEXT_THEME_FILE="next.theme.yml"
          THEME_DIR="themes/next"
          TARGET_FILE="${THEME_DIR}/${CONFIG_FILE}"
          echo "Copying theme config file"
          cp "${NEXT_THEME_FILE}" "${TARGET_FILE}"
          head -n 1 "${TARGET_FILE}"
          # Install dependencies && update env
          echo "Install npm dependencies"
          npm i
          echo "Load hexo binary..."
          export PATH="$PATH:./node_modules/.bin"
          echo "Hexo version: $(hexo -v)"
          echo "Gulp version: $(gulp -v)"
          echo "Gulp Tasks" && gulp --tasks
          # Generate site && minify site files, such as: html, js, css
          hexo g --debug && gulp

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@3.6.2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to.
          FOLDER: public/ # The folder the action should deploy.
          CLEAN: true # Automatically remove deleted 
          PRESERVE: true
```

这次将 github action 也一并更新了下
```yml
name: Hexo CI CD
on:
  workflow_dispatch:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4
        with:
          persist-credentials: false
          submodules: recursive
      - name: "Using Special Node Version"
        uses: actions/setup-node@v4
        with:
          node-version: "22.6.0"
      - name: Generate Hexo site ⚗️
        run: |
          echo "Github Action Env Checking..."
          echo "Node Version: `node -v`"
          echo "Coping theme config file"
          # Install dependencies && update env
          echo "Install npm dependencies"
          npm i
          # Generate site
          npm run build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4.6.1
        with:
          token: ${{ secrets.HEXO_TOKEN }}
          branch: gh-pages # The branch the action should deploy to.
          folder: public/ # The folder the action should deploy.
          ssh-key: ${{ secrets.DEPLOY_KEY }}
```
这里配置好一般在 hexo 站点根目录执行 `npx hexo build --debug` 就行
### 3、obsidian 配置
因为我的站点已经发布到 github 仓库, 所以只需要将其 clone 到本地 vault 就行.

```
50 🛰️ Resource
60 🌲 🍍
	ShuttleSpace.github.io
	...
```
这里obsidian 只显示 git 仓库的 `_resource, scaffolds, source` 目录

然后下载 obsidian-git 插件,配置 git 的根目录为 `60 🌲 🍍/ShuttleSpace.github.io`

因为 hexo 创建文章是有模版的, 一般是在 `scaffolds/post.md`. ~~所以这里配置 `Templater` 插件将 `60 🌲 🍍/ShuttleSpace.github.io/source/_posts` 目录下创建 md 的模版设置为 `60 🌲 🍍/ShuttleSpace.github.io/scaffolds/post.md`~~
> 由于 hexo 的模版格式和 obsidian templater 不一样,所以这里的模版需要修改下

```
☕️ tpl
	hexo
		post.md
```

```md
---
title: <% tp.file.title %>
date: <% tp.file.creation_date() %>
updated: <% tp.file.last_modified_date() %>
permalink: 
top: 0
comments: 
copyright: true
tags: 
categories: 
keywords: 
description:
---
<%*
let newTitle = tp.file.title;
if (newTitle.startsWith("Untitled") || newTitle.startsWith("未命名")) {
  newTitle = await tp.system.prompt("Title");
  if (!newTitle) {
    new Notice("Title is required!");
    return;
  }
}
await tp.file.rename(newTitle);
tp.hooks.on_all_templates_executed(async () => {
  await app.fileManager.processFrontMatter(
    tp.file.find_tfile(tp.file.path(true)),
    (frontmatter) => {
      frontmatter["title"] = newTitle;
    }
  );
});
app.workspace.on('editor-change', async (info) => {
	tp.hooks.on_all_templates_executed(async () => {
	  await app.fileManager.processFrontMatter(
	    tp.file.find_tfile(tp.file.path(true)),
	    (frontmatter) => {
	      frontmatter["updated"] = tp.file.last_modified_date("");
	    }
	  );
	});
})
tp.hooks.on_all_templates_executed(() => {
  app.commands.executeCommandById("obsidian-linter:lint-file");
});
-%>
```
> 这里主要使用 templater 修改了文件名,并且修改 frontmatter 的 title 属性.否则 hexo 渲染出来的网页标题就是 `[object Object]`

> 同时注意: 修改 frontmatter 需要在 `tp.hooks.on_all_templates_executed` 回调中执行,否则修改是没有效果的.
### 4、编辑发布
然后在 `60 🌲 🍍/ShuttleSpace.github.io/source/_posts/` 目录新建文章,`command + p` 调用 `git: commit and sync` 提交即可


## <font color="#ff0000">好处</font>

可以随时编辑文档,然后同步 obsidian 文档(这里使用 Remote Savely + COS). 等到了电脑上调用 `Obsidian: git commit and sync` 即可触发 github action 构建发布.

### 问题
1、`github action deploy 报错 invalid username or passwd`

需要在站点仓库的 `Actions/Settings` 页配置
1) `General` 页 `Workflow permissions` 选择 `Read and write permissions`
2) ` ssh-keygen -t rsa -m pem -b 4096 -C "mail"` 生成 ssh 密钥
	- 在 `Deploy keys` 中添加公钥
	- 在 `Secrets and variables` 中的  `Repository secrets` 中添加 `DEPLOY_KEY`, 内容为密钥的文本