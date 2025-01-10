import{_ as a,c as n,a2 as p,o as i}from"./chunks/framework.CQcFAaaG.js";const d=JSON.parse('{"title":"Autogeneration","description":"","frontmatter":{},"headers":[],"relativePath":"features/autogen.md","filePath":"features/autogen.md"}'),e={name:"features/autogen.md"};function l(c,s,t,o,h,r){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="autogeneration" tabindex="-1">Autogeneration <a class="header-anchor" href="#autogeneration" aria-label="Permalink to &quot;Autogeneration&quot;">​</a></h1><p>Xmake supports the autogeneration of project files, including it&#39;s own! While it won&#39;t work for every project (as is the nature of these things), it should work for basic and medium complexity projects. You do not need to write any &quot;make-like&quot; file (<code>xmake.lua</code>, <code>makefile</code>, <code>CMakeLists.txt</code>, etc.).</p><p>The fool will scan all of the source files and generate an <code>xmake.lua</code> automatically based on your product structure. Xmake will try to detect a <code>main</code> function in the source files to distinguish between the source code for libraries and executable programs.</p><p>If autogeneration succeeds, you should still look through the generated <code>xmake.lua</code> and make any changes you need, and make sure everything worked well.</p><p>Currently, projects that use directories in multiple levels are <em>not</em> supported. Appologies.</p><h2 id="use-cases" tabindex="-1">Use cases <a class="header-anchor" href="#use-cases" aria-label="Permalink to &quot;Use cases&quot;">​</a></h2><ol><li>Temporarily quickly compile and run some scattered test code</li><li>A starting point to porting and compiling open source code</li><li>Quickly create a new Xmake project based on existing code</li></ol><h2 id="how-to-use-it" tabindex="-1">How to use it <a class="header-anchor" href="#how-to-use-it" aria-label="Permalink to &quot;How to use it&quot;">​</a></h2><p>Execute Xmake directly in the directory with the source code (no xmake.lua), and follow the prompts:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">note:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake.lua</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> found,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> try</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> generating</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> it</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pass </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --confirm=y/n/d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> confirm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">please</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> input:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (y/n)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span></span></code></pre></div><p>In addition, when there are other build system identification files (such as <code>CMakeLists.txt</code>), the process of automatically generating an <code>xmake.lua</code> file will not be triggered. Instead, it will attemp to [automatically detect build system and compile](#Automatically detect build system and compile) the code. If you want to force trigger the process of automatically generating <code>xmake.lua</code> file, you can run:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span></code></pre></div><h3 id="compile-open-source-libraries" tabindex="-1">Compile open source libraries <a class="header-anchor" href="#compile-open-source-libraries" aria-label="Permalink to &quot;Compile open source libraries&quot;">​</a></h3><p>Although this approach has some limitations, but it is already sufficient to generate for existing libraries.</p><p>For example, if you download the source code for zlib-1.2.10 and want to compile it, you only need to enter the zlib source directory and run the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib-1.2.10</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">note:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake.lua</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> found,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> try</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> generating</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> it</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pass </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> or</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --confirm=y/n/d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> skip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> confirm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">please</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> input:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (y/n)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span></span></code></pre></div><p>It&#39;s done! the output results:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target(zlib-1.2): static</span></span>
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
<span class="line"><span>build ok!👌</span></span></code></pre></div><p>Xmake will scan the current directory to detect all source codes and it do not found main function. As such, detect that it is a static library, and thus it will build it as a static library (with an output/artifact of <code>libzlib-1.2.a</code>).</p><p>We did not write any make-like files (Xmake.lua, ..) and did not use the makefile of zlib project. Isn&#39;t that neat? It is compiled directly and a <code>xmake.lua</code> file was generated which we can edit this xmake.lua to build more complicated project.</p><p>The content of the generated xmake.lua:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- define target</span></span>
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
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./zutil.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>As you can see, it&#39;s pretty human readable.</p><h3 id="compile-and-run-testing-code-fast" tabindex="-1">Compile and run testing code... fast! <a class="header-anchor" href="#compile-and-run-testing-code-fast" aria-label="Permalink to &quot;Compile and run testing code... fast!&quot;">​</a></h3><p>Let&#39;s say you want to write a simple program, with one source file (<code>main.c</code>), solely to print &quot;Hello, world!&quot; to stdout.</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* main.c */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &lt;stdio.h&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &lt;stdlib.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> argc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">argv</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    printf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> EXIT_SUCCESS;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>If we use GCC to compile and run it, need run two commands:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./main.c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./main</span></span></code></pre></div><p>If we use xmake to run it, only need to run:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span></span></code></pre></div><p>Or even:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> r</span></span></code></pre></div><p>As we expect, we see...</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, world!</span></span></code></pre></div><p>...printed to the console! Even if we have a lot of source files, you only need to run one command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span></span></code></pre></div><p>How easy and convenient!</p><h3 id="multi-language-support" tabindex="-1">Multi-language support <a class="header-anchor" href="#multi-language-support" aria-label="Permalink to &quot;Multi-language support&quot;">​</a></h3><p>This feature of autogeneration of project files not only supports C/C++, also supports Objective-C and Swift, and it will support Go in future. For example, if you download the <code>fmdb</code> library, an iOS library which wraps SQLite:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Files:</span></span>
<span class="line"><span>.</span></span>
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
<span class="line"><span>└── FMResultSet.m</span></span></code></pre></div><p>You can see that there aren&#39;t any make-like files in the project directory. &quot;Whatever will we do?&quot; I think you know. We can use Xmake to build it directly as a iOS static library:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> iphoneos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span></span></code></pre></div><p>The output is:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xmake.lua not found, scanning files ..</span></span>
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
<span class="line"><span>build ok!👌</span></span></code></pre></div><p>and of course we also get a <code>libFMDB.a</code> static library.</p><h3 id="compile-multiple-executables-at-the-same-time" tabindex="-1">Compile multiple executables at the same time <a class="header-anchor" href="#compile-multiple-executables-at-the-same-time" aria-label="Permalink to &quot;Compile multiple executables at the same time&quot;">​</a></h3><p>Let&#39;s say you downloaded the &quot;sixth public release of the Independent JPEG Group&#39;s free JPEG software&quot;, and wanted to build it. You could do it yourself, or you could run:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span></span></code></pre></div><p>The output results are:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xmake.lua not found, scanning files ..</span></span>
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
<span class="line"><span>build ok!👌</span></span></code></pre></div><p>In addition to a static library, we also compiled some other executable programs.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>target(ansi2knr): binary</span></span>
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
<span class="line"><span>    [+]: ./wrjpgcom.c</span></span></code></pre></div><p>Neat!</p><h3 id="manual-configuration" tabindex="-1">Manual configuration <a class="header-anchor" href="#manual-configuration" aria-label="Permalink to &quot;Manual configuration&quot;">​</a></h3><p>If we want to add some manual configuration options. we need add them before compiling. For example:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Specify our options</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> f</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --cxflags=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--cxx-flag&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ldflags=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--link-flag&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --includedirs=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;include/&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --linkdirs=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;lib/&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Build!</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div>`,56)]))}const g=a(e,[["render",l]]);export{d as __pageData,g as default};
