---
title: Vue 使用 JSX 开发配置
date: 2025-06-30 12:08
updated: 2025-06-30T12:08:34+08:00
permalink: 
top: 0
comments: 
copyright: true
tags: 
categories: 
keywords: 
description: 
---
vue3 使用 ts 开发,天然支持 tsx 开发.本文记录下如何在 bun + vitejs 环境下配置 tsx

1、添加依赖

```sh
bun add vue vue-router vuetify
bun add -D @mdi/font @types/node @vitejs/plugin-vue @vitejs/plugin-vue-jsx typescript vite vue-tsc
```

2、配置 tsconfig.json

主要是打开 jsx 支持
```json
{
	"jsx": "preserve",
    "jsxImportSource": "vue",
}
```

完整配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "~/*": [
        "./public/*"
      ]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "vite.config.ts",
  ]
}
```

3、配置 vite.config.ts

```diff
++ import vue from "@vitejs/plugin-vue";
++ import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig(async () => ({
++  plugins: [vue(), vueJsx())],
```

如此就可以直接使用 tsx 文件进行开发.

4、由于 vscode 插件对 tsx 支持不完善, 导致 onClick 等事件识别不了而报 lint 错误,所以手动添加下类型说明
```ts
import { VNodeProps } from 'vue'
// 定义修饰符类型
type EventModifiers = {
  capture?: boolean
  once?: boolean
  passive?: boolean
  stop?: boolean
  prevent?: boolean
  self?: boolean
}

// 扩展事件处理器类型
type EventHandler<T = Event> = ((event: T) => void) | {
  handler: (event: T) => void
  modifiers: EventModifiers
}

export type ModifierKey = 'stop' | 'prevent' | 'capture' | 'self' | 'once' | 'passive'

export type WithModifiers<T> = T & {
  [key in `_${ModifierKey}`]: WithModifiers<T>
}

export type EventHandlerWithModifiers<T extends Function> = WithModifiers<T>

declare module 'vue' {
  interface HTMLAttributes {
    // 鼠标事件
    onClick?: EventHandler<MouseEvent>
    onDblclick?: EventHandler<MouseEvent>
    onMousedown?: EventHandler<MouseEvent>
    onMouseup?: EventHandler<MouseEvent>
    onMouseover?: EventHandler<MouseEvent>
    onMousemove?: EventHandler<MouseEvent>
    onMouseout?: EventHandler<MouseEvent>
    onContextmenu?: EventHandler<MouseEvent>

    // 键盘事件
    onKeydown?: EventHandler<KeyboardEvent>
    onKeypress?: EventHandler<KeyboardEvent>
    onKeyup?: EventHandler<KeyboardEvent>

    // 表单事件
    onChange?: EventHandler<Event>
    onInput?: EventHandler<Event>
    onSubmit?: EventHandler<Event>
    onReset?: EventHandler<Event>

    // 焦点事件
    onFocus?: EventHandler<FocusEvent>
    onBlur?: EventHandler<FocusEvent>

    // 其他事件
    onScroll?: EventHandler<UIEvent>
    onWheel?: EventHandler<WheelEvent>
    onDrag?: EventHandler<DragEvent>
    onDragstart?: EventHandler<DragEvent>
    onDragend?: EventHandler<DragEvent>
    onDragenter?: EventHandler<DragEvent>
    onDragleave?: EventHandler<DragEvent>
    onDragover?: EventHandler<DragEvent>
    onDrop?: EventHandler<DragEvent>
  }

  interface ComponentCustomProps extends HTMLAttributes {
    // 这里可以添加组件特定的props类型
    // [event: string]: ((any) => any | {
    //   [string]?: (any) => any
    //   modifiers: EventModifiers
    // });
    // or this
    [event: `on${string}`]: (...args: any[]) => void
  }
}
```

---
另外如果想在项目中使用 mdx, 需要如下配置

1、添加依赖 
```sh
bun add @mdx-js/vue
bun add -D @mdx-js/rollup @mdx-js/vue @types/mdx
```
2、配置 vite.config.ts
```diff
++ import mdx from '@mdx-js/rollup'
export default defineConfig(async () => ({
  plugins: [vue(), vueJsx(), 
++	mdx({
++	    jsxImportSource: 'vue',
++	    jsxRuntime: 'automatic', // 或 'automatic'
++	    providerImportSource: '@mdx-js/vue', // 使用 Vue 运行时
++	    remarkPlugins: [],
++	    rehypePlugins: []
	  })
  ],
```

主要配置 mdx 插件,使用 `@mdx-js/vue` 来渲染生成 mdx 文件对应的 VNode. 否则就会使用内置的 `preact` 生成 Component 而报错

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import mdx from '@mdx-js/rollup'
import path from "path"
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue(), vueJsx(), mdx({
    jsxImportSource: 'vue',
    jsxRuntime: 'automatic', // 或 'automatic'
    providerImportSource: '@mdx-js/vue', // 使用 Vue 运行时
    remarkPlugins: [],
    rehypePlugins: []
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));

```


```tsx
import { defineComponent } from "vue";
import { VCard, VContainer, VSheet } from "vuetify/components";
import Earth from '~/mdx/Earth.mdx';

export default defineComponent({
  setup() {
    return () => (
      <VContainer>
        <VSheet rounded="lg"></VSheet>
        <VCard>
          <Earth/>
        </VCard>
      </VContainer>
    )
  }
})
```