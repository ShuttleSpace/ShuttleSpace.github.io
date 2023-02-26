---
title: parcel + react
top: 0
copyright: true
date: 2023-02-26 15:43:59
updated: 2023-02-26 15:43:59
permalink:
password:
comments:
tags:
categories:
keywords: parcel, react
description:
---

相比较 create-react-app 这么笨重的武器，parcel 是一个开箱即用的开发打包工具，在小项目、简单测试时用起来就非常得心应手了。

### 依赖

```json
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "babel-plugin-transform-react-jsx-source": "^6.22.0",
    "parcel": "^2.8.3"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

### 运行 

```json
"scripts": {
  "dev": "parcel src/index.html"
},
```

### 注意事项

1、如果报错 `@parcel/core: Failed to resolve 'process' from './node_modules/....'`, 那么在 package.json 中添加以下内容即可

```json
  "alias": {
    "process": false
  }
```

2、tsx 文件中的 jsx 语法提示报错

> 在文件头导入 react 即可, `import React from 'react'`

3、如果使用 react-scripts 打包项目，部署时文件相对路径可能不太对

在 `package.json` 中添加 `homepage`, 值即为服务端部署域名