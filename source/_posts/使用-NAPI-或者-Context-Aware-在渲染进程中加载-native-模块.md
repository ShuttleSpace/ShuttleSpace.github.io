---
title: 使用 NAPI 或者 Context Aware 在渲染进程中加载 native 模块
date: 2022-03-26 17:19:29
tags:
---

> [Requiring Native Modules in the Renderer Process to be NAPI or Context Aware](https://github.com/electron/electron/issues/18397)

当前在 electron 中加载 native 模块有些困难。比如编译 native 模块时，需要确保 `NODE_MODULE_VERSION` 版本正确。在同一个进程中加载多个 native 模块实例等问题。

<!-- more -->

之前官方团队实现了对 chromium 打 patch 的方案，却碰到了很多 tricky 的问题。现在随着 Node 12 Worker Threads 的发布，就可以轻松实现这个功能了。

其实 Node 团队在实现 Worker Thread 时也遇到了在多个 worker 线程中无法加载 native 模块的问题。他们的解决方案是提供了 `Context Aware` 的 native 模块方案。也就是 native 模块会告诉 Node, 他们可以被安全加载进多个 `v8::Context` 中，NAN 有个方便的宏 `NAN_MODULE_WORKER_ENABLED` 可以实现。

所以，Context Aware 模块和 NAPI 模块就可以在 node 中被多次实例化。

也就是说，任何想在渲染进程被加载的 native 模块必须得是 NAPI 或者 Context Aware.



### 计划时间线.

1、在 `Electron6` 添加 `app.allowRendererProcessReuses` 选项
2、在 `Electron 7` 对非 context-aware 的 native 模块开始提出弃用警告
3、在 `Electron 8` 对需要使用 `app.allowRendererProcessReuses` 默认值提出弃用警告
4、在 `Electron 9` 中切换 `app.allowRendererProcessReuses` 默认值为 true
5、在 `Electron 10` 中弃用切换 `app.allowRendererProcessReuses` 的能力
6、在 `Electron 14` 中移除切换 `app.allowRendererProcessReuses` 的能力



> [Context-aware addons](https://nodejs.org/api/addons.html#addons_context_aware_addons)