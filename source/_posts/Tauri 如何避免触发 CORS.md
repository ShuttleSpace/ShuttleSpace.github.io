---
title: Tauri 如何避免触发 CORS
date: 2025-06-01 11:39
updated: 2025-06-01T11:39:53+08:00
permalink: 
top: 0
comments: 
copyright: true
tags: 
categories: 
keywords: 
description: 
---
Tauri 也是通过平台侧提供的 WebView 引擎来解析渲染,所以当然也会遇到 CORS 限制.本文讲述如何处理这个问题.

1、最常见的处理方式就是服务端支持 `Access-Control-Allow-Origin` 但是此处调用的不是自己的服务器,不可能全部都处理这种请求.

2、tauri V2 支持跨平台(移动端)能力. 提供了 tauri-plugin-http 插件, 为其他平台提供 `fetch/XMLHttpRequest` 函数支持, 所以猜测可以直接使用 tauri-plugin-http 提供的 `fetch/XMLHttpRequest` 替代浏览器的函数

```ts
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
// once binding, invoke fetch or any rust command will cause page freeze!
window.fetch = tauriFetch;
```

> https://github.com/ShuttleSpace/fetcher
> https://github.com/tauri-apps/plugins-workspace/issues/2728

实际测试最新版 v2.4.4 直接在 main.ts 中替换会导致页面卡死

3、第三种方案就是拦截 `http/https/ws/wss` 请求,在 rust 侧处理,然后将响应返回到UI侧

因为问题出在 `invoke('command')` 上,不能直接拦截然后就调用 rust command.所以此处通过自定义 scheme `listenTwo` 来触发 rust 拦截

> src-tauri/src/lib.rs
```rust
    tauri::Builder::default()
        .register_asynchronous_uri_scheme_protocol("listentwo", |_ctx, request, responder| {
            let uri = request.uri().to_string();
            let origin_method = request.headers().get("origin-method")
                .and_then(|v| v.to_str().ok())
                .unwrap_or("https");
            let target_url = format!("{}:{}", origin_method, uri.replace("listentwo://", ""));
            trace!("[listentwo] target_url: {}", target_url);
            static CLIENT: once_cell::sync::OnceCell<reqwest::Client> = once_cell::sync::OnceCell::new();
            let client = CLIENT.get_or_init(|| {
                reqwest::Client::builder()
                    .timeout(std::time::Duration::from_secs(10))
                    .build()
                    .unwrap()
            });
            let future = async move {
                let method = match request.method() {
                    &Method::GET => reqwest::Method::GET,
                    &Method::POST => reqwest::Method::POST,
                    &Method::PUT => reqwest::Method::PUT,
                    &Method::DELETE => reqwest::Method::DELETE,
                    &Method::HEAD => reqwest::Method::HEAD,
                    &Method::OPTIONS => reqwest::Method::OPTIONS,
                    &Method::PATCH => reqwest::Method::PATCH,
                    _ => reqwest::Method::GET,
                };
                let is_body_method = matches!(method, reqwest::Method::POST | reqwest::Method::PUT | reqwest::Method::PATCH);
                let mut request_builder = client.request(method, &target_url);
                if is_body_method {
                    request_builder = request_builder.body(request.body().to_vec());
                }
                let mut header_map = reqwest::header::HeaderMap::new();
                for (k, v) in request.headers().iter() {
                    if let (Ok(header_name), Ok(header_value)) = (
                        reqwest::header::HeaderName::from_bytes(k.as_str().as_bytes()),
                        reqwest::header::HeaderValue::from_str(v.to_str().unwrap_or_default())
                    ) {
                        header_map.insert(header_name, header_value);
                    }
                }
                request_builder = request_builder.headers(header_map);
                match request_builder.send().await {
                    Ok(response) => {
                        trace!("[listentwo] [get] response status: {}", response.status());
                        let status = response.status();
                        let headers = response.headers().clone();
                        let bytes = response.bytes().await.unwrap();
                        
                        let mut builder = http::Response::builder()
                            .status(status)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                            .header("Access-Control-Allow-Headers", "Content-Type, origin-method");
                        
                        for (key, value) in headers.iter() {
                            if key != "access-control-allow-origin" {
                                builder = builder.header(key, value);
                            }
                        }
                        
                        responder.respond(builder.body(bytes.to_vec()).unwrap())
                    },
                    Err(e) => {
                        responder.respond(
                            http::Response::builder()
                                .status(http::StatusCode::BAD_GATEWAY)
                                .body(format!("代理请求错误: {}", e).into_bytes())
                                .unwrap()
                        )
                    }
                }
            };
            tauri::async_runtime::spawn(future);
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
```

> src/main.ts
```ts
let originFetch = window.fetch
window.fetch = async function (input, init): Promise<Response> {
  if (typeof input === 'string' && (input.startsWith('http') || input.startsWith('https'))) {
    const url = new URL(input);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return originFetch(input, init);
    }
    const index = input.indexOf('://')
    const originMethod = input.substring(0, index)
    const newInit = {
      ...init,
      headers: {
        ...init?.headers,
        'origin-method': originMethod
      }
    }
    try {
      const cacheKey = `listentwo:${input}`;
      if (newInit.method === 'GET') {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          return new Response(cached, {
            headers: new Headers({'Content-Type': 'application/json'})
          });
        }
      }
      const response =  await originFetch("listentwo" + input.substring(index), newInit)
      if (newInit.method === 'GET' && response.ok) {
        const data = await response.clone().text();
        sessionStorage.setItem(cacheKey, data);
      }
      if (newInit.method === 'OPTIONS')  {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, origin-method'
          }
        });
      }
      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  return originFetch(input, init)
}
```

> 按照 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)说明除了 `fetch/XMLHttpRequest` 外,还有 Web Fonts, WebGL textures, Canvas drawImage, CSS Shapes Image 等. 
> 这些请求也可以通过相同方式进行拦截处理.