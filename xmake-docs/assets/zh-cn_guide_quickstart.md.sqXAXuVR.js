import{_ as i,c as a,a2 as h,o as l}from"./chunks/framework.CQcFAaaG.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/guide/quickstart.md","filePath":"zh-cn/guide/quickstart.md"}'),n={name:"zh-cn/guide/quickstart.md"};function t(p,s,e,k,d,F){return l(),a("div",null,s[0]||(s[0]=[h(`<h2 id="用法视频" tabindex="-1">用法视频 <a class="header-anchor" href="#用法视频" aria-label="Permalink to &quot;用法视频&quot;">​</a></h2><p><a href="https://asciinema.org/a/133693" target="_blank" rel="noreferrer"><img src="https://asciinema.org/a/133693.png" alt="asciicast"></a></p><h2 id="创建工程" tabindex="-1">创建工程 <a class="header-anchor" href="#创建工程" aria-label="Permalink to &quot;创建工程&quot;">​</a></h2><p>创建一个名叫<code>hello</code>的<code>c</code>控制台工程：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -P</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./hello</span></span></code></pre></div><p>执行完后，将会生成一个简单工程结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hello</span></span>
<span class="line"><span>├── src</span></span>
<span class="line"><span>│   └── main.c</span></span>
<span class="line"><span>└── xmake.lua</span></span></code></pre></div><p>其中<code>xmake.lua</code>是工程描述文件，内容非常简单，告诉xmake添加<code>src</code>目录下的所有<code>.c</code>源文件：</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;binary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;src/*.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>目前支持的语言如下：</p><ul><li>c/c++</li><li>objc/c++</li><li>cuda</li><li>asm</li><li>swift</li><li>dlang</li><li>golang</li><li>rust</li></ul><p>!&gt; 如果你想了解更多参数选项，请运行: <code>xmake create --help</code></p><h2 id="构建工程" tabindex="-1">构建工程 <a class="header-anchor" href="#构建工程" aria-label="Permalink to &quot;构建工程&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="运行程序" tabindex="-1">运行程序 <a class="header-anchor" href="#运行程序" aria-label="Permalink to &quot;运行程序&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello</span></span></code></pre></div><h2 id="调试程序" tabindex="-1">调试程序 <a class="header-anchor" href="#调试程序" aria-label="Permalink to &quot;调试程序&quot;">​</a></h2><p>首先你需要切换到 debug 模式去重新编译程序。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><p>然后执行下面的命令去开始调试：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello</span></span></code></pre></div><p>Xmake 将会使用调试器去加载程序运行，目前支持：lldb, gdb, windbg, vsjitdebugger, ollydbg 等各种调试器。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[lldb]$target create </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;build/hello&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Current</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> executable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;build/hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (x86_64).</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[lldb]$b main</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Breakpoint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> where</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello\`</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> address = </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x0000000100000f50</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">[lldb]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$r</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Process</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7509</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> launched: &#39;/private/tmp/hello/build/hello&#39; (x86_64)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Process</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7509</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stopped</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> thread </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#1: tid = 0x435a2, 0x0000000100000f50 hello\`main, queue = &#39;com.apple.main-thread&#39;, stop reason = breakpoint 1.1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    frame</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #0: 0x0000000100000f50 hello\`main</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hello</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0x100000f50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">+</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">0&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  pushq</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  %rbp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    0x100000f51</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">+</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">1&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  movq</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   %rsp,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %rbp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    0x100000f54</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">+</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">4&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  leaq</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   0x2b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%rip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %rdi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;hello world!&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    0x100000f5b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">+1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">1&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> callq</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0x100000f64</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">               ; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">symbol</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stub</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> puts</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[lldb]$</span></span></code></pre></div><p>如果想要使用指定的调试器：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --debugger=gdb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello</span></span></code></pre></div><p>!&gt; 你也可以使用简写的命令行选项，例如: <code>xmake r</code> 或者 <code>xmake run</code></p>`,26)]))}const c=i(n,[["render",t]]);export{g as __pageData,c as default};
