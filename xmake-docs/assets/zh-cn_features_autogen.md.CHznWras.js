import{_ as a,c as n,a2 as p,o as i}from"./chunks/framework.CQcFAaaG.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/features/autogen.md","filePath":"zh-cn/features/autogen.md"}'),e={name:"zh-cn/features/autogen.md"};function l(c,s,t,h,r,o){return i(),n("div",null,s[0]||(s[0]=[p(`<p>对于一份工程源码，可以不用编写makefile，也不用编写各种make相关的工程描述文件（例如：xmake.lua，makefile.am, cmakelist.txt等）</p><p>xmake就可以直接编译他们，这是如何做到的呢，简单来说下实现原理：</p><ol><li>首先扫描当前目录下，xmake所以支持的所有源代码文件</li><li>分析代码，检测哪些代码拥有main入口函数</li><li>所有没有main入口的代码编译成静态库</li><li>带有main入口的代码，编译成可执行程序，同时链接其他静态库程序</li></ol><p>这种代码扫描和智能编译，非常简单，目前xmake还不支持多级目录扫描，只对单级目录的代码进行扫描编译。。</p><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ol><li>临时快速编译和运行一些零散的测试代码</li><li>尝试对其他开源库做移植编译</li><li>快速基于现有代码创建新xmake工程</li></ol><h3 id="如何使用" tabindex="-1">如何使用 <a class="header-anchor" href="#如何使用" aria-label="Permalink to &quot;如何使用&quot;">​</a></h3><p>直接在带有源码的目录（没有xmake.lua）下执行xmake，然后根据提示操作：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">note:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake.lua</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> found,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> try</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> generating</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> it</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pass </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --confirm=y/n/d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> confirm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">please</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> input:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (y/n)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span></span></code></pre></div><p>另外, 当存在其他构建系统标识性文件的时候(比如 CMakeLists.txt), 不会触发自动生成 xmake.lua 的流程, 而是首先触发 <a href="#自动探测构建系统并编译">自动探测构建系统并编译</a>, 如果要强制触发自动扫描生成 xmake.lua 的流程, 可运行:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span></code></pre></div><h3 id="开源代码的移植和编译" tabindex="-1">开源代码的移植和编译 <a class="header-anchor" href="#开源代码的移植和编译" aria-label="Permalink to &quot;开源代码的移植和编译&quot;">​</a></h3><p>虽然这种方式，并不是非常智能，限制也不少，但是对于想临时写些代码进行编译运行，或者临时想交叉编译一些简单的开源库代码</p><p>这种方式已经足够使用了，下面看下一个实际的例子：</p><p>我下载了一份zlib-1.2.10的源码，想要编译它，只需要进入zlib的源码目录执行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib-1.2.10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">note:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake.lua</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> found,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> try</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> generating</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> it</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pass </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --confirm=y/n/d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> confirm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">please</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> input:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (y/n)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span></span></code></pre></div><p>就行了，输入y确认后，输出结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target(zlib-1.2): static</span></span>
<span class="line"><span>    [+]: ./adler32.c</span></span>
<span class="line"><span>    [+]: ./compress.c</span></span>
<span class="line"><span>    [+]: ./crc32.c</span></span>
<span class="line"><span>    [+]: ./deflate.c</span></span>
<span class="line"><span>    [+]: ./gzclose.c</span></span>
<span class="line"><span>    [+]: ./gzlib.c</span></span>
<span class="line"><span>    [+]: ./gzread.c</span></span>
<span class="line"><span>    [+]: ./gzwrite.c</span></span>
<span class="line"><span>    [+]: ./infback.c</span></span>
<span class="line"><span>    [+]: ./inffast.c</span></span>
<span class="line"><span>    [+]: ./inflate.c</span></span>
<span class="line"><span>    [+]: ./inftrees.c</span></span>
<span class="line"><span>    [+]: ./trees.c</span></span>
<span class="line"><span>    [+]: ./uncompr.c</span></span>
<span class="line"><span>    [+]: ./zutil.c</span></span>
<span class="line"><span>xmake.lua generated, scan ok!👌</span></span>
<span class="line"><span>checking for the architecture ... x86_64</span></span>
<span class="line"><span>checking for the Xcode SDK version for macosx ... 10.12</span></span>
<span class="line"><span>checking for the target minimal version ... 10.12</span></span>
<span class="line"><span>checking for the c compiler (cc) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the c++ compiler (cxx) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the objc compiler (mm) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the objc++ compiler (mxx) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the swift compiler (sc) ... xcrun -sdk macosx swiftc</span></span>
<span class="line"><span>checking for the assember (as) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the linker (ld) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the static library archiver (ar) ... xcrun -sdk macosx ar</span></span>
<span class="line"><span>checking for the static library extractor (ex) ... xcrun -sdk macosx ar</span></span>
<span class="line"><span>checking for the shared library linker (sh) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the debugger (dd) ... xcrun -sdk macosx lldb</span></span>
<span class="line"><span>checking for the golang compiler (go) ... go</span></span>
<span class="line"><span>configure</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ex = &quot;xcrun -sdk macosx ar&quot;</span></span>
<span class="line"><span>,   sh = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   host = &quot;macosx&quot;</span></span>
<span class="line"><span>,   ar = &quot;xcrun -sdk macosx ar&quot;</span></span>
<span class="line"><span>,   buildir = &quot;build&quot;</span></span>
<span class="line"><span>,   as = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   plat = &quot;macosx&quot;</span></span>
<span class="line"><span>,   xcode_dir = &quot;/Applications/Xcode.app&quot;</span></span>
<span class="line"><span>,   arch = &quot;x86_64&quot;</span></span>
<span class="line"><span>,   mxx = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   go = &quot;go&quot;</span></span>
<span class="line"><span>,   target_minver = &quot;10.12&quot;</span></span>
<span class="line"><span>,   ccache = &quot;ccache&quot;</span></span>
<span class="line"><span>,   mode = &quot;release&quot;</span></span>
<span class="line"><span>,   clean = true</span></span>
<span class="line"><span>,   cxx = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   cc = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   dd = &quot;xcrun -sdk macosx lldb&quot;</span></span>
<span class="line"><span>,   kind = &quot;static&quot;</span></span>
<span class="line"><span>,   ld = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   xcode_sdkver = &quot;10.12&quot;</span></span>
<span class="line"><span>,   sc = &quot;xcrun -sdk macosx swiftc&quot;</span></span>
<span class="line"><span>,   mm = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>configure ok!</span></span>
<span class="line"><span>clean ok!</span></span>
<span class="line"><span>[00%]: cache compiling.release ./adler32.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./compress.c</span></span>
<span class="line"><span>[13%]: cache compiling.release ./crc32.c</span></span>
<span class="line"><span>[20%]: cache compiling.release ./deflate.c</span></span>
<span class="line"><span>[26%]: cache compiling.release ./gzclose.c</span></span>
<span class="line"><span>[33%]: cache compiling.release ./gzlib.c</span></span>
<span class="line"><span>[40%]: cache compiling.release ./gzread.c</span></span>
<span class="line"><span>[46%]: cache compiling.release ./gzwrite.c</span></span>
<span class="line"><span>[53%]: cache compiling.release ./infback.c</span></span>
<span class="line"><span>[60%]: cache compiling.release ./inffast.c</span></span>
<span class="line"><span>[66%]: cache compiling.release ./inflate.c</span></span>
<span class="line"><span>[73%]: cache compiling.release ./inftrees.c</span></span>
<span class="line"><span>[80%]: cache compiling.release ./trees.c</span></span>
<span class="line"><span>[86%]: cache compiling.release ./uncompr.c</span></span>
<span class="line"><span>[93%]: cache compiling.release ./zutil.c</span></span>
<span class="line"><span>[100%]: archiving.release libzlib-1.2.a</span></span>
<span class="line"><span>build ok!👌</span></span></code></pre></div><p>通过输出结果，可以看到，xmake会去检测扫描当前目录下的所有.c代码，发现没有main入口，应该是静态库程序，因此执行xmake后，就直接编译成静态库libzlib-1.2.a了</p><p>连xmake.lua都没有编写，其实xmake在扫描完成后，会去自动在当前目录下生成一份xmake.lua，下次编译就不需要重新扫描检测了。</p><p>自动生成的xmake.lua内容如下：</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- define target</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;zlib-1.2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- set kind</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;static&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- add files</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./adler32.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./compress.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./crc32.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./deflate.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./gzclose.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./gzlib.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./gzread.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./gzwrite.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./infback.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./inffast.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./inflate.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./inftrees.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./trees.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./uncompr.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./zutil.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>也许你会说，像这种开源库，直接<code>configure; make</code>不就好了吗，他们自己也有提供makefile来直接编译的，的确是这样，我这里只是举个例子而已。。</p><p>当然，很多开源库在交叉编译的时候，通过自带的<code>configure</code>，处理起来还是很繁琐的，用xmake进行交叉编译会更方便些。。</p><h3 id="即时地代码编写和编译运行" tabindex="-1">即时地代码编写和编译运行 <a class="header-anchor" href="#即时地代码编写和编译运行" aria-label="Permalink to &quot;即时地代码编写和编译运行&quot;">​</a></h3><p>xmake的这个扫描代码编译特性，主要的目的：还是为了让我们在临时想写些测试代码的时候，不用考虑太多东西，直接上手敲代码，然后快速执行<code>xmake run</code> 来调试验证结果。。</p><p>例如：</p><p>我想写了个简单的main.c的测试程序，打印<code>hello world!</code>，如果要写makefile或者直接通过gcc命令来，就很繁琐了，你需要：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./main.c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./demo</span></span></code></pre></div><p>最快速的方式，也需要执行两行命令，而如果用xmake，只需要执行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span></span></code></pre></div><p>就行了，它会自动检测到代码后，自动生成对应的xmake.lua，自动编译，自动运行，然后输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hello world!</span></span></code></pre></div><p>如果你有十几个代码文件，用手敲gcc的方式，或者写makefile的方式，这个差距就更明显了，用xmake还是只需要一行命令：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span></span></code></pre></div><h3 id="多语言支持" tabindex="-1">多语言支持 <a class="header-anchor" href="#多语言支持" aria-label="Permalink to &quot;多语言支持&quot;">​</a></h3><p>这种代码检测和即时编译，是支持多语言的，不仅支持c/c++，还支持objc/swift，后期还会支持golang（正在开发中）</p><p>例如我下载了一份fmdb的ios开源框架代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── FMDB.h</span></span>
<span class="line"><span>├── FMDatabase.h</span></span>
<span class="line"><span>├── FMDatabase.m</span></span>
<span class="line"><span>├── FMDatabaseAdditions.h</span></span>
<span class="line"><span>├── FMDatabaseAdditions.m</span></span>
<span class="line"><span>├── FMDatabasePool.h</span></span>
<span class="line"><span>├── FMDatabasePool.m</span></span>
<span class="line"><span>├── FMDatabaseQueue.h</span></span>
<span class="line"><span>├── FMDatabaseQueue.m</span></span>
<span class="line"><span>├── FMResultSet.h</span></span>
<span class="line"><span>└── FMResultSet.m</span></span></code></pre></div><p>想要把它编译成ios的静态库，但是又不想写xmake.lua，或者makefile，那么只需要使用xmake的这个新特性，直接执行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iphoneos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span></span></code></pre></div><p>就行了，输出结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xmake.lua not found, scanning files ..</span></span>
<span class="line"><span>target(FMDB): static</span></span>
<span class="line"><span>    [+]: ./FMDatabase.m</span></span>
<span class="line"><span>    [+]: ./FMDatabaseAdditions.m</span></span>
<span class="line"><span>    [+]: ./FMDatabasePool.m</span></span>
<span class="line"><span>    [+]: ./FMDatabaseQueue.m</span></span>
<span class="line"><span>    [+]: ./FMResultSet.m</span></span>
<span class="line"><span>xmake.lua generated, scan ok!👌</span></span>
<span class="line"><span>checking for the architecture ... armv7</span></span>
<span class="line"><span>checking for the Xcode SDK version for iphoneos ... 10.1</span></span>
<span class="line"><span>checking for the target minimal version ... 10.1</span></span>
<span class="line"><span>checking for the c compiler (cc) ... xcrun -sdk iphoneos clang</span></span>
<span class="line"><span>checking for the c++ compiler (cxx) ... xcrun -sdk iphoneos clang</span></span>
<span class="line"><span>checking for the objc compiler (mm) ... xcrun -sdk iphoneos clang</span></span>
<span class="line"><span>checking for the objc++ compiler (mxx) ... xcrun -sdk iphoneos clang++</span></span>
<span class="line"><span>checking for the assember (as) ... gas-preprocessor.pl xcrun -sdk iphoneos clang</span></span>
<span class="line"><span>checking for the linker (ld) ... xcrun -sdk iphoneos clang++</span></span>
<span class="line"><span>checking for the static library archiver (ar) ... xcrun -sdk iphoneos ar</span></span>
<span class="line"><span>checking for the static library extractor (ex) ... xcrun -sdk iphoneos ar</span></span>
<span class="line"><span>checking for the shared library linker (sh) ... xcrun -sdk iphoneos clang++</span></span>
<span class="line"><span>checking for the swift compiler (sc) ... xcrun -sdk iphoneos swiftc</span></span>
<span class="line"><span>configure</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ex = &quot;xcrun -sdk iphoneos ar&quot;</span></span>
<span class="line"><span>,   ccache = &quot;ccache&quot;</span></span>
<span class="line"><span>,   host = &quot;macosx&quot;</span></span>
<span class="line"><span>,   ar = &quot;xcrun -sdk iphoneos ar&quot;</span></span>
<span class="line"><span>,   buildir = &quot;build&quot;</span></span>
<span class="line"><span>,   as = &quot;/usr/local/share/xmake/tools/utils/gas-preprocessor.pl xcrun -sdk iphoneos clang&quot;</span></span>
<span class="line"><span>,   arch = &quot;armv7&quot;</span></span>
<span class="line"><span>,   mxx = &quot;xcrun -sdk iphoneos clang++&quot;</span></span>
<span class="line"><span>,   cxx = &quot;xcrun -sdk iphoneos clang&quot;</span></span>
<span class="line"><span>,   target_minver = &quot;10.1&quot;</span></span>
<span class="line"><span>,   xcode_dir = &quot;/Applications/Xcode.app&quot;</span></span>
<span class="line"><span>,   clean = true</span></span>
<span class="line"><span>,   sh = &quot;xcrun -sdk iphoneos clang++&quot;</span></span>
<span class="line"><span>,   cc = &quot;xcrun -sdk iphoneos clang&quot;</span></span>
<span class="line"><span>,   ld = &quot;xcrun -sdk iphoneos clang++&quot;</span></span>
<span class="line"><span>,   mode = &quot;release&quot;</span></span>
<span class="line"><span>,   kind = &quot;static&quot;</span></span>
<span class="line"><span>,   plat = &quot;iphoneos&quot;</span></span>
<span class="line"><span>,   xcode_sdkver = &quot;10.1&quot;</span></span>
<span class="line"><span>,   sc = &quot;xcrun -sdk iphoneos swiftc&quot;</span></span>
<span class="line"><span>,   mm = &quot;xcrun -sdk iphoneos clang&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>configure ok!</span></span>
<span class="line"><span>clean ok!</span></span>
<span class="line"><span>[00%]: cache compiling.release ./FMDatabase.m</span></span>
<span class="line"><span>[20%]: cache compiling.release ./FMDatabaseAdditions.m</span></span>
<span class="line"><span>[40%]: cache compiling.release ./FMDatabasePool.m</span></span>
<span class="line"><span>[60%]: cache compiling.release ./FMDatabaseQueue.m</span></span>
<span class="line"><span>[80%]: cache compiling.release ./FMResultSet.m</span></span>
<span class="line"><span>[100%]: archiving.release libFMDB.a</span></span>
<span class="line"><span>build ok!👌</span></span></code></pre></div><h3 id="同时编译多个可执行文件" tabindex="-1">同时编译多个可执行文件 <a class="header-anchor" href="#同时编译多个可执行文件" aria-label="Permalink to &quot;同时编译多个可执行文件&quot;">​</a></h3><p>输出结果的开头部分，就是对代码的分析结果，虽然目前只支持单级目录结构的代码扫描，但是还是可以同时支持检测和编译多个可执行文件的</p><p>我们以libjpeg的开源库为例：</p><p>我们进入jpeg-6b目录后，执行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><p>输出如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xmake.lua not found, scanning files ..</span></span>
<span class="line"><span>target(jpeg-6b): static</span></span>
<span class="line"><span>    [+]: ./cdjpeg.c</span></span>
<span class="line"><span>    [+]: ./example.c</span></span>
<span class="line"><span>    [+]: ./jcapimin.c</span></span>
<span class="line"><span>    [+]: ./jcapistd.c</span></span>
<span class="line"><span>    [+]: ./jccoefct.c</span></span>
<span class="line"><span>    [+]: ./jccolor.c</span></span>
<span class="line"><span>    [+]: ./jcdctmgr.c</span></span>
<span class="line"><span>    [+]: ./jchuff.c</span></span>
<span class="line"><span>    [+]: ./jcinit.c</span></span>
<span class="line"><span>    [+]: ./jcmainct.c</span></span>
<span class="line"><span>    [+]: ./jcmarker.c</span></span>
<span class="line"><span>    [+]: ./jcmaster.c</span></span>
<span class="line"><span>    [+]: ./jcomapi.c</span></span>
<span class="line"><span>    [+]: ./jcparam.c</span></span>
<span class="line"><span>    [+]: ./jcphuff.c</span></span>
<span class="line"><span>    [+]: ./jcprepct.c</span></span>
<span class="line"><span>    [+]: ./jcsample.c</span></span>
<span class="line"><span>    [+]: ./jctrans.c</span></span>
<span class="line"><span>    [+]: ./jdapimin.c</span></span>
<span class="line"><span>    [+]: ./jdapistd.c</span></span>
<span class="line"><span>    [+]: ./jdatadst.c</span></span>
<span class="line"><span>    [+]: ./jdatasrc.c</span></span>
<span class="line"><span>    [+]: ./jdcoefct.c</span></span>
<span class="line"><span>    [+]: ./jdcolor.c</span></span>
<span class="line"><span>    [+]: ./jddctmgr.c</span></span>
<span class="line"><span>    [+]: ./jdhuff.c</span></span>
<span class="line"><span>    [+]: ./jdinput.c</span></span>
<span class="line"><span>    [+]: ./jdmainct.c</span></span>
<span class="line"><span>    [+]: ./jdmarker.c</span></span>
<span class="line"><span>    [+]: ./jdmaster.c</span></span>
<span class="line"><span>    [+]: ./jdmerge.c</span></span>
<span class="line"><span>    [+]: ./jdphuff.c</span></span>
<span class="line"><span>    [+]: ./jdpostct.c</span></span>
<span class="line"><span>    [+]: ./jdsample.c</span></span>
<span class="line"><span>    [+]: ./jdtrans.c</span></span>
<span class="line"><span>    [+]: ./jerror.c</span></span>
<span class="line"><span>    [+]: ./jfdctflt.c</span></span>
<span class="line"><span>    [+]: ./jfdctfst.c</span></span>
<span class="line"><span>    [+]: ./jfdctint.c</span></span>
<span class="line"><span>    [+]: ./jidctflt.c</span></span>
<span class="line"><span>    [+]: ./jidctfst.c</span></span>
<span class="line"><span>    [+]: ./jidctint.c</span></span>
<span class="line"><span>    [+]: ./jidctred.c</span></span>
<span class="line"><span>    [+]: ./jmemansi.c</span></span>
<span class="line"><span>    [+]: ./jmemmgr.c</span></span>
<span class="line"><span>    [+]: ./jmemname.c</span></span>
<span class="line"><span>    [+]: ./jmemnobs.c</span></span>
<span class="line"><span>    [+]: ./jquant1.c</span></span>
<span class="line"><span>    [+]: ./jquant2.c</span></span>
<span class="line"><span>    [+]: ./jutils.c</span></span>
<span class="line"><span>    [+]: ./rdbmp.c</span></span>
<span class="line"><span>    [+]: ./rdcolmap.c</span></span>
<span class="line"><span>    [+]: ./rdgif.c</span></span>
<span class="line"><span>    [+]: ./rdppm.c</span></span>
<span class="line"><span>    [+]: ./rdrle.c</span></span>
<span class="line"><span>    [+]: ./rdswitch.c</span></span>
<span class="line"><span>    [+]: ./rdtarga.c</span></span>
<span class="line"><span>    [+]: ./transupp.c</span></span>
<span class="line"><span>    [+]: ./wrbmp.c</span></span>
<span class="line"><span>    [+]: ./wrgif.c</span></span>
<span class="line"><span>    [+]: ./wrppm.c</span></span>
<span class="line"><span>    [+]: ./wrrle.c</span></span>
<span class="line"><span>    [+]: ./wrtarga.c</span></span>
<span class="line"><span>target(ansi2knr): binary</span></span>
<span class="line"><span>    [+]: ./ansi2knr.c</span></span>
<span class="line"><span>target(cjpeg): binary</span></span>
<span class="line"><span>    [+]: ./cjpeg.c</span></span>
<span class="line"><span>target(ckconfig): binary</span></span>
<span class="line"><span>    [+]: ./ckconfig.c</span></span>
<span class="line"><span>target(djpeg): binary</span></span>
<span class="line"><span>    [+]: ./djpeg.c</span></span>
<span class="line"><span>target(jpegtran): binary</span></span>
<span class="line"><span>    [+]: ./jpegtran.c</span></span>
<span class="line"><span>target(rdjpgcom): binary</span></span>
<span class="line"><span>    [+]: ./rdjpgcom.c</span></span>
<span class="line"><span>target(wrjpgcom): binary</span></span>
<span class="line"><span>    [+]: ./wrjpgcom.c</span></span>
<span class="line"><span>xmake.lua generated, scan ok!👌</span></span>
<span class="line"><span>checking for the architecture ... x86_64</span></span>
<span class="line"><span>checking for the Xcode SDK version for macosx ... 10.12</span></span>
<span class="line"><span>checking for the target minimal version ... 10.12</span></span>
<span class="line"><span>checking for the c compiler (cc) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the c++ compiler (cxx) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the objc compiler (mm) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the objc++ compiler (mxx) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the swift compiler (sc) ... xcrun -sdk macosx swiftc</span></span>
<span class="line"><span>checking for the assember (as) ... xcrun -sdk macosx clang</span></span>
<span class="line"><span>checking for the linker (ld) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the static library archiver (ar) ... xcrun -sdk macosx ar</span></span>
<span class="line"><span>checking for the static library extractor (ex) ... xcrun -sdk macosx ar</span></span>
<span class="line"><span>checking for the shared library linker (sh) ... xcrun -sdk macosx clang++</span></span>
<span class="line"><span>checking for the debugger (dd) ... xcrun -sdk macosx lldb</span></span>
<span class="line"><span>checking for the golang compiler (go) ... go</span></span>
<span class="line"><span>configure</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ex = &quot;xcrun -sdk macosx ar&quot;</span></span>
<span class="line"><span>,   sh = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   host = &quot;macosx&quot;</span></span>
<span class="line"><span>,   ar = &quot;xcrun -sdk macosx ar&quot;</span></span>
<span class="line"><span>,   buildir = &quot;build&quot;</span></span>
<span class="line"><span>,   as = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   plat = &quot;macosx&quot;</span></span>
<span class="line"><span>,   xcode_dir = &quot;/Applications/Xcode.app&quot;</span></span>
<span class="line"><span>,   arch = &quot;x86_64&quot;</span></span>
<span class="line"><span>,   mxx = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   go = &quot;go&quot;</span></span>
<span class="line"><span>,   target_minver = &quot;10.12&quot;</span></span>
<span class="line"><span>,   ccache = &quot;ccache&quot;</span></span>
<span class="line"><span>,   mode = &quot;release&quot;</span></span>
<span class="line"><span>,   clean = true</span></span>
<span class="line"><span>,   cxx = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   cc = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>,   dd = &quot;xcrun -sdk macosx lldb&quot;</span></span>
<span class="line"><span>,   kind = &quot;static&quot;</span></span>
<span class="line"><span>,   ld = &quot;xcrun -sdk macosx clang++&quot;</span></span>
<span class="line"><span>,   xcode_sdkver = &quot;10.12&quot;</span></span>
<span class="line"><span>,   sc = &quot;xcrun -sdk macosx swiftc&quot;</span></span>
<span class="line"><span>,   mm = &quot;xcrun -sdk macosx clang&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>configure ok!</span></span>
<span class="line"><span>clean ok!</span></span>
<span class="line"><span>[00%]: cache compiling.release ./cdjpeg.c</span></span>
<span class="line"><span>[00%]: cache compiling.release ./example.c</span></span>
<span class="line"><span>[00%]: cache compiling.release ./jcapimin.c</span></span>
<span class="line"><span>[00%]: cache compiling.release ./jcapistd.c</span></span>
<span class="line"><span>[00%]: cache compiling.release ./jccoefct.c</span></span>
<span class="line"><span>[00%]: cache compiling.release ./jccolor.c</span></span>
<span class="line"><span>[01%]: cache compiling.release ./jcdctmgr.c</span></span>
<span class="line"><span>[01%]: cache compiling.release ./jchuff.c</span></span>
<span class="line"><span>[01%]: cache compiling.release ./jcinit.c</span></span>
<span class="line"><span>[01%]: cache compiling.release ./jcmainct.c</span></span>
<span class="line"><span>[01%]: cache compiling.release ./jcmarker.c</span></span>
<span class="line"><span>[02%]: cache compiling.release ./jcmaster.c</span></span>
<span class="line"><span>[02%]: cache compiling.release ./jcomapi.c</span></span>
<span class="line"><span>[02%]: cache compiling.release ./jcparam.c</span></span>
<span class="line"><span>[02%]: cache compiling.release ./jcphuff.c</span></span>
<span class="line"><span>[02%]: cache compiling.release ./jcprepct.c</span></span>
<span class="line"><span>[03%]: cache compiling.release ./jcsample.c</span></span>
<span class="line"><span>[03%]: cache compiling.release ./jctrans.c</span></span>
<span class="line"><span>[03%]: cache compiling.release ./jdapimin.c</span></span>
<span class="line"><span>[03%]: cache compiling.release ./jdapistd.c</span></span>
<span class="line"><span>[03%]: cache compiling.release ./jdatadst.c</span></span>
<span class="line"><span>[04%]: cache compiling.release ./jdatasrc.c</span></span>
<span class="line"><span>[04%]: cache compiling.release ./jdcoefct.c</span></span>
<span class="line"><span>[04%]: cache compiling.release ./jdcolor.c</span></span>
<span class="line"><span>[04%]: cache compiling.release ./jddctmgr.c</span></span>
<span class="line"><span>[04%]: cache compiling.release ./jdhuff.c</span></span>
<span class="line"><span>[05%]: cache compiling.release ./jdinput.c</span></span>
<span class="line"><span>[05%]: cache compiling.release ./jdmainct.c</span></span>
<span class="line"><span>[05%]: cache compiling.release ./jdmarker.c</span></span>
<span class="line"><span>[05%]: cache compiling.release ./jdmaster.c</span></span>
<span class="line"><span>[05%]: cache compiling.release ./jdmerge.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./jdphuff.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./jdpostct.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./jdsample.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./jdtrans.c</span></span>
<span class="line"><span>[06%]: cache compiling.release ./jerror.c</span></span>
<span class="line"><span>[07%]: cache compiling.release ./jfdctflt.c</span></span>
<span class="line"><span>[07%]: cache compiling.release ./jfdctfst.c</span></span>
<span class="line"><span>[07%]: cache compiling.release ./jfdctint.c</span></span>
<span class="line"><span>[07%]: cache compiling.release ./jidctflt.c</span></span>
<span class="line"><span>[07%]: cache compiling.release ./jidctfst.c</span></span>
<span class="line"><span>[08%]: cache compiling.release ./jidctint.c</span></span>
<span class="line"><span>[08%]: cache compiling.release ./jidctred.c</span></span>
<span class="line"><span>[08%]: cache compiling.release ./jmemansi.c</span></span>
<span class="line"><span>[08%]: cache compiling.release ./jmemmgr.c</span></span>
<span class="line"><span>[08%]: cache compiling.release ./jmemname.c</span></span>
<span class="line"><span>[09%]: cache compiling.release ./jmemnobs.c</span></span>
<span class="line"><span>[09%]: cache compiling.release ./jquant1.c</span></span>
<span class="line"><span>[09%]: cache compiling.release ./jquant2.c</span></span>
<span class="line"><span>[09%]: cache compiling.release ./jutils.c</span></span>
<span class="line"><span>[09%]: cache compiling.release ./rdbmp.c</span></span>
<span class="line"><span>[10%]: cache compiling.release ./rdcolmap.c</span></span>
<span class="line"><span>[10%]: cache compiling.release ./rdgif.c</span></span>
<span class="line"><span>[10%]: cache compiling.release ./rdppm.c</span></span>
<span class="line"><span>[10%]: cache compiling.release ./rdrle.c</span></span>
<span class="line"><span>[10%]: cache compiling.release ./rdswitch.c</span></span>
<span class="line"><span>[11%]: cache compiling.release ./rdtarga.c</span></span>
<span class="line"><span>[11%]: cache compiling.release ./transupp.c</span></span>
<span class="line"><span>[11%]: cache compiling.release ./wrbmp.c</span></span>
<span class="line"><span>[11%]: cache compiling.release ./wrgif.c</span></span>
<span class="line"><span>[11%]: cache compiling.release ./wrppm.c</span></span>
<span class="line"><span>[12%]: cache compiling.release ./wrrle.c</span></span>
<span class="line"><span>[12%]: cache compiling.release ./wrtarga.c</span></span>
<span class="line"><span>[12%]: archiving.release libjpeg-6b.a</span></span>
<span class="line"><span>[12%]: cache compiling.release ./wrjpgcom.c</span></span>
<span class="line"><span>[25%]: linking.release wrjpgcom</span></span>
<span class="line"><span>[25%]: cache compiling.release ./ansi2knr.c</span></span>
<span class="line"><span>[37%]: linking.release ansi2knr</span></span>
<span class="line"><span>[37%]: cache compiling.release ./jpegtran.c</span></span>
<span class="line"><span>[50%]: linking.release jpegtran</span></span>
<span class="line"><span>[50%]: cache compiling.release ./djpeg.c</span></span>
<span class="line"><span>[62%]: linking.release djpeg</span></span>
<span class="line"><span>[62%]: cache compiling.release ./ckconfig.c</span></span>
<span class="line"><span>[75%]: linking.release ckconfig</span></span>
<span class="line"><span>[75%]: cache compiling.release ./rdjpgcom.c</span></span>
<span class="line"><span>[87%]: linking.release rdjpgcom</span></span>
<span class="line"><span>[87%]: cache compiling.release ./cjpeg.c</span></span>
<span class="line"><span>[100%]: linking.release cjpeg</span></span>
<span class="line"><span>build ok!👌</span></span></code></pre></div><p>可以看到，处理静态库，xmake还分析出了很多可执行的测试程序，剩下的代码统一编译成一个 libjpeg.a 的静态库，供哪些测试程序链接使用。。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target(ansi2knr): binary</span></span>
<span class="line"><span>    [+]: ./ansi2knr.c</span></span>
<span class="line"><span>target(cjpeg): binary</span></span>
<span class="line"><span>    [+]: ./cjpeg.c</span></span>
<span class="line"><span>target(ckconfig): binary</span></span>
<span class="line"><span>    [+]: ./ckconfig.c</span></span>
<span class="line"><span>target(djpeg): binary</span></span>
<span class="line"><span>    [+]: ./djpeg.c</span></span>
<span class="line"><span>target(jpegtran): binary</span></span>
<span class="line"><span>    [+]: ./jpegtran.c</span></span>
<span class="line"><span>target(rdjpgcom): binary</span></span>
<span class="line"><span>    [+]: ./rdjpgcom.c</span></span>
<span class="line"><span>target(wrjpgcom): binary</span></span>
<span class="line"><span>    [+]: ./wrjpgcom.c</span></span></code></pre></div><h3 id="遇到的一些问题和限制" tabindex="-1">遇到的一些问题和限制 <a class="header-anchor" href="#遇到的一些问题和限制" aria-label="Permalink to &quot;遇到的一些问题和限制&quot;">​</a></h3><p>当前xmake的这种自动分析检测还不是非常智能，对于：</p><ol><li>需要特殊的编译选项</li><li>需要依赖其他目录的头文件搜索</li><li>需要分条件编译不同源文件</li><li>同目录需要生成多个静态库</li><li>需要多级目录支持的源码库</li></ol><p>以上这些情况，xmake暂时还没发自动化的智能处理，其中限制1，2还是可以解决的，通过半手动的方式，例如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cxflags=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ldflags=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --includedirs=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --linkdirs=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span></span></code></pre></div><p>在自动检测编译的时候，手动配置这个源码工程需要的特殊编译选项，就可以直接通过编译了</p><p>而限制3，暂时只能通过删源代码来解决了，就像刚才编译jpeg的代码，其实它的目录下面同时存在了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jmemdos.c</span></span>
<span class="line"><span>jmemmac.c</span></span>
<span class="line"><span>jmemansi.c</span></span></code></pre></div><p>其中两个是没法编译过的，需要删掉后才行。。</p>`,61)]))}const g=a(e,[["render",l]]);export{d as __pageData,g as default};
