import{_ as a,c as i,a2 as e,o as n}from"./chunks/framework.CQcFAaaG.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/toolchain/builtin_toolchains.md","filePath":"zh-cn/toolchain/builtin_toolchains.md"}'),l={name:"zh-cn/toolchain/builtin_toolchains.md"};function t(p,s,h,c,k,o){return n(),i("div",null,s[0]||(s[0]=[e(`<p>!&gt; 由于作者个人精力有限，此处文档没有列全所有 xmake 支持的工具链，后面会逐步补充，也欢迎大家提 pr 改进，或者提供赞助支持文档更新。</p><h3 id="gcc" tabindex="-1">Gcc <a class="header-anchor" href="#gcc" aria-label="Permalink to &quot;Gcc&quot;">​</a></h3><p>如果 linux 上安装了 gcc 工具链，通常 xmake 都会优先探测使用，当然我们也可以手动切换到 gcc 来构建。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gcc</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h4 id="使用指定版本的-gcc" tabindex="-1">使用指定版本的 Gcc <a class="header-anchor" href="#使用指定版本的-gcc" aria-label="Permalink to &quot;使用指定版本的 Gcc&quot;">​</a></h4><p>如果用户额外安装了 gcc-11, gcc-10 等特定版本的 gcc 工具链，在本地的 gcc 程序命名可能是 <code>/usr/bin/gcc-11</code>。</p><p>一种办法是通过 <code>xmake f --cc=gcc-11 --cxx=gcc-11 --ld=g++-11</code> 挨个指定配置来切换，但非常繁琐。</p><p>所以，xmake 也提供了更加快捷的切换方式：</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gcc-11</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>只需要指定 <code>gcc-11</code> 对应的版本名，就可以快速切换整个 gcc 工具链。</p><h3 id="clang" tabindex="-1">Clang <a class="header-anchor" href="#clang" aria-label="Permalink to &quot;Clang&quot;">​</a></h3><p>在 macOS 和 linux，通常 xmake 也会优先尝试去自动探测和使用它，当然我们也可以手动切换。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">clang</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>在 windows 上，它会自动加载 msvc 环境。</p><p>另外，我们也支持 PortableBuildTools + clang 环境：</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -c --sdk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">C:/BuildTools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">clang</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake -v</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 50%]: cache compiling.release src\\main.cpp</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">C:\\Users\\star\\scoop\\apps\\llvm\\current\\bin\\clang -c -Qunused-arguments -m64 --target=x86_64-windows-msvc -fexceptions -fcxx-exceptions -o build\\.objs\\test\\windows\\x64\\release\\src\\main.cpp.obj src\\main.cpp</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 75%]: linking.release test.exe</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">C:\\Users\\star\\scoop\\apps\\llvm\\current\\bin\\clang++ -o build\\windows\\x64\\release\\test.exe build\\.objs\\test\\windows\\x64\\release\\src\\main.cpp.obj -m64 --target=x86_64-windows-msvc</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[100%]: build ok, spent 0.235s</span></span></code></pre></div><h3 id="clang-cl" tabindex="-1">Clang-cl <a class="header-anchor" href="#clang-cl" aria-label="Permalink to &quot;Clang-cl&quot;">​</a></h3><p>如果只是单纯的切换使用 clang-cl.exe 编译器，剩下的链接操作还是用 msvc，那么我们不需要整个工具链切换，仅仅切换 c/c++ 编译器。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --cc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">clang-cl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --cxx</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">clang-cl</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="llvm" tabindex="-1">LLVM <a class="header-anchor" href="#llvm" aria-label="Permalink to &quot;LLVM&quot;">​</a></h3><p>除了独立 clang 编译器，如果用户安装了完整 llvm 工具链，我们也可以整个切换过去，包括 <code>llvm-ar</code> 等工具。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">llvm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --sdk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/xxxx/llvm</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>如果是手动下载的 llvm sdk，我们需要额外指定 llvm sdk 根目录，确保 xmake 能找到它，当然，如果用户已经安装到 PATH 目录下，<code>--sdk</code> 参数的设置也是可选的。</p><h3 id="circle" tabindex="-1">Circle <a class="header-anchor" href="#circle" aria-label="Permalink to &quot;Circle&quot;">​</a></h3><p>v2.5.9 xmake 新增了 circle 编译器的支持，这是个新的 C++20 编译器，额外附带了一些有趣的编译期元编程特性，有兴趣的同学可以到官网查看：<a href="https://www.circle-lang.org/" target="_blank" rel="noreferrer">https://www.circle-lang.org/</a></p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">circle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="tinyc" tabindex="-1">Tinyc <a class="header-anchor" href="#tinyc" aria-label="Permalink to &quot;Tinyc&quot;">​</a></h3><p><a href="https://bellard.org/tcc/" target="_blank" rel="noreferrer">Tiny C 编译器</a> 非常的轻量，在一些不想安装 msvc/llvm 等重量型编译器的情况下，使用它可能快速编译一些 c 代码。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tinycc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>使用的时候，请先把 tinycc 编译器加入 PATH 环境。</p><p>我们也可以使用远程工具链自动下载集成它，真正做到全平台一键编译，无任何用户手动安装操作。</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add_requires</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;tinycc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;binary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;src/*.c)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_toolchains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;@tinycc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="armcc-for-keil-mdk" tabindex="-1">Armcc for Keil/MDK <a class="header-anchor" href="#armcc-for-keil-mdk" aria-label="Permalink to &quot;Armcc for Keil/MDK&quot;">​</a></h3><p>v2.5.9 新增了对 Keil/MDK 下 armcc 的工具链支持，相关 issue 见：<a href="https://github.com/xmake-io/xmake/issues/1753" target="_blank" rel="noreferrer">#1753</a></p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xmake f -p cross -a cortex-m3 --toolchain=armcc -c</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xmake</span></span></code></pre></div><p>这个工具链主要用于嵌入式交叉编译，所以指定了 <code>-p cross</code> 交叉编译平台，<code>-a cortex-m3</code> 指定使用的 cpu，这里复用了 <code>-a/--arch</code> 参数。</p><h3 id="armclang-for-keil-mdk" tabindex="-1">Armclang for Keil/MDK <a class="header-anchor" href="#armclang-for-keil-mdk" aria-label="Permalink to &quot;Armclang for Keil/MDK&quot;">​</a></h3><p>v2.5.9 新增了对 Keil/MDK 下 armclang 的工具链支持，相关 issue 见：<a href="https://github.com/xmake-io/xmake/issues/1753" target="_blank" rel="noreferrer">#1753</a></p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xmake f -p cross -a cortex-m3 --toolchain=armclang -c</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xmake</span></span></code></pre></div><p>这个工具链主要用于嵌入式交叉编译，所以指定了 <code>-p cross</code> 交叉编译平台，<code>-a cortex-m3</code> 指定使用的 cpu，这里复用了 <code>-a/--arch</code> 参数。</p><h3 id="gnu-rm" tabindex="-1">GNU-RM <a class="header-anchor" href="#gnu-rm" aria-label="Permalink to &quot;GNU-RM&quot;">​</a></h3><p>另外一个嵌入式 arm 的交叉工具链，官网：<a href="https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm" target="_blank" rel="noreferrer">https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm</a></p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gnu-rm</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="sdcc" tabindex="-1">SDCC <a class="header-anchor" href="#sdcc" aria-label="Permalink to &quot;SDCC&quot;">​</a></h3><p>也是一个嵌入式的 arm 编译工具链。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sdcc</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stm8</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>我们可以指定 <code>-a stm8</code> 切换 cpu 架构，目前支持的有：</p><ul><li>stm8</li><li>mcs51</li><li>z80</li><li>z180</li><li>r2k</li><li>r3ka</li><li>s08</li><li>hc08</li></ul><h3 id="mingw" tabindex="-1">Mingw <a class="header-anchor" href="#mingw" aria-label="Permalink to &quot;Mingw&quot;">​</a></h3><p>mingw 工具链很常用，并且全平台都提供，我们可以仅仅切换相关工具链：</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">mingw</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>但是这样，一些目标文件的后缀名并不完全匹配，因此建议整个切到 mingw 平台编译，还能支持依赖包下载。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p mingw -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>xmake 默认会自动探测 mingw 工具链位置，macOS 和 msys/mingw64 环境通常都能自动探测到，如果检测到，也可以手动指定 mingw sdk 路径。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p mingw --mingw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/xxx/mingw</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>注，这里使用了 <code>--mingw</code> 而不是 <code>--sdk</code>，其实这两个都可以，但是使用 <code>--mingw</code> 单独的参数可以更好的保证个其他交叉编译工具链不冲突。</p><h3 id="llvm-mingw" tabindex="-1">LLVM-Mingw <a class="header-anchor" href="#llvm-mingw" aria-label="Permalink to &quot;LLVM-Mingw&quot;">​</a></h3><p>这其实是一个独立于 Mingw 的项目，用法跟 Mingw 完全一直，但是它是基于 LLVM 的，并且提供了 arm/arm64 等其他更多架构的支持，而不仅仅是 i386/x86_64</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p mingw -a arm64 --mingw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/xxx/llvm-mingw</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>如果要使用 llvm-mingw 的 arm/arm64 架构，则需要额外指定 <code>-a arm64</code> 参数才行，另外 llvm-mingw 默认 xmake 不一定能够检测到，需要额外设置 sdk 路径。</p><h3 id="zig" tabindex="-1">Zig <a class="header-anchor" href="#zig" aria-label="Permalink to &quot;Zig&quot;">​</a></h3><p>如果要构建 Zig 程序，我们默认执行 xmake 就能自动使用 zig 工具链，但前提是 zig 已经在 PATH 环境下。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>当然，我们也可以手动设置它。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zig</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>也可以指定 zig 编译器的路径。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --zc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/xxxx/zig</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h4 id="zig-cc" tabindex="-1">Zig CC <a class="header-anchor" href="#zig-cc" aria-label="Permalink to &quot;Zig CC&quot;">​</a></h4><p>我们也可以使用 zig 提供的 <code>zig cc</code> 编译器去编译 C/C++ 代码。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --cc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zig cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --cxx</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zig cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --ld</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zig c++&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h4 id="交叉编译" tabindex="-1">交叉编译 <a class="header-anchor" href="#交叉编译" aria-label="Permalink to &quot;交叉编译&quot;">​</a></h4><p>另外，我们也可以使用 zig 实现交叉编译。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p cross --cross</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">riscv64-linux-musl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zig</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>或者编译 arm64 架构：</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">zig</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> arm64</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="emcc-wasm" tabindex="-1">Emcc (WASM) <a class="header-anchor" href="#emcc-wasm" aria-label="Permalink to &quot;Emcc (WASM)&quot;">​</a></h3><p>如果要编译 wasm 程序，我们只需要切换到 wasm 平台，默认就会使用 emcc 工具链去编译。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p wasm</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="wasi-wasm" tabindex="-1">Wasi (WASM) <a class="header-anchor" href="#wasi-wasm" aria-label="Permalink to &quot;Wasi (WASM)&quot;">​</a></h3><p>这是另外一个启用了 WASI 的 Wasm 工具链，我们需要手动切换使用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p wasm --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wasi</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="icc-intel-c-c-compiler" tabindex="-1">Icc (Intel C/C++ Compiler) <a class="header-anchor" href="#icc-intel-c-c-compiler" aria-label="Permalink to &quot;Icc (Intel C/C++ Compiler)&quot;">​</a></h3><p>我们也可以切换到 Intel 的 C/C++ 编译器去使用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">icc</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="ifort-intel-fortain-compiler" tabindex="-1">Ifort (Intel Fortain Compiler) <a class="header-anchor" href="#ifort-intel-fortain-compiler" aria-label="Permalink to &quot;Ifort (Intel Fortain Compiler)&quot;">​</a></h3><p>我们也可以切换到 Intel 的 Fortran 编译器去使用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ifort</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="gfortran" tabindex="-1">gfortran <a class="header-anchor" href="#gfortran" aria-label="Permalink to &quot;gfortran&quot;">​</a></h3><p>除了 Intel 的 Fortran 编译器，我们还有 gnu fortran 编译器可用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gfortran</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="fpc-free-pascal" tabindex="-1">fpc (Free Pascal) <a class="header-anchor" href="#fpc-free-pascal" aria-label="Permalink to &quot;fpc (Free Pascal)&quot;">​</a></h3><p>对于 pascal 程序，xmake 默认就会使用 fpc 编译器来编译。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>当然，我们也可以手动切换。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">fpc</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="dlang" tabindex="-1">Dlang <a class="header-anchor" href="#dlang" aria-label="Permalink to &quot;Dlang&quot;">​</a></h3><p>对于 dlang 程序，xmake 默认就会使用 dmd 编译器来编译。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>当然，我们也可以手动切换。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">dlang</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>需要注意的是，此处的 dlang 工具链其实内部包含了对 <code>dmd</code>, <code>ldc2</code> 和 <code>gdc</code> 的自动探测和切换。</p><h3 id="cuda" tabindex="-1">Cuda <a class="header-anchor" href="#cuda" aria-label="Permalink to &quot;Cuda&quot;">​</a></h3><p>对于 Cuda 程序，我们需要手动切换到 cuda 工具链。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cuda</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>我们也可以手动切换 nvcc 内部调用的 C/C++ 编译器。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cuda</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --cu-ccbin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">clang</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="汇编器" tabindex="-1">汇编器 <a class="header-anchor" href="#汇编器" aria-label="Permalink to &quot;汇编器&quot;">​</a></h3><p>关于独立的汇编器工具链，xmake 支持：yasm, nasm, fasm 三个，可以随意切换，如果没设置，默认使用 gcc/clang/msvc 自带的汇编器。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nasm</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>也可以单独指定汇编器路径</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f --toolchain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nasm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/xxx/nasm</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="go" tabindex="-1">Go <a class="header-anchor" href="#go" aria-label="Permalink to &quot;Go&quot;">​</a></h3><p>golang 编译工具链，默认编译 go 程序会自动启用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="rust" tabindex="-1">Rust <a class="header-anchor" href="#rust" aria-label="Permalink to &quot;Rust&quot;">​</a></h3><p>rust 编译工具链，默认编译 rust 程序会自动启用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>目前 rust 工具链还可以支持 android 等交叉编译环境。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p android --ndk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/android-ndk-r20b</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><h3 id="ndk" tabindex="-1">NDK <a class="header-anchor" href="#ndk" aria-label="Permalink to &quot;NDK&quot;">​</a></h3><p>Android 的 NDK 编译工具链，只要启用 android 平台，就会默认启用。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake f -p android --ndk</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/android-ndk-r20b</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> -c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake</span></span></code></pre></div><p>如果 <code>--ndk</code> 参数不指定，xmake 也会默认从 AndroidSDK/ndk-bundle 目录，以及 <code>$ANDROID_NDK_HOME</code>, <code>ANDROID_NDK_ROOT</code> 等环境变量中去探测它。</p><p>另外，我们也可以设置导全局的 <code>xmake g --ndk=</code> 配置中，避免每次重复设置。</p>`,124)]))}const g=a(l,[["render",t]]);export{r as __pageData,g as default};