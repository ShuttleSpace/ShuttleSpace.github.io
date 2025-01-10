import{_ as s}from"./chunks/vscode_status_bar.CN14xNAN.js";import{_ as n,c as e,a2 as i,o as p}from"./chunks/framework.CQcFAaaG.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/plugin/more_plugins.md","filePath":"zh-cn/plugin/more_plugins.md"}'),l={name:"zh-cn/plugin/more_plugins.md"};function t(o,a,c,r,d,h){return p(),e("div",null,a[0]||(a[0]=[i('<h2 id="vscode-插件" tabindex="-1">VSCode 插件 <a class="header-anchor" href="#vscode-插件" aria-label="Permalink to &quot;VSCode 插件&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-vscode" target="_blank" rel="noreferrer">xmake-vscode</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-vscode/master/res/problem.gif" width="650px"><p><a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VSCode</a>是常用的文本编辑器，xmake提供了插件支持。</p><h3 id="插件安装" tabindex="-1">插件安装 <a class="header-anchor" href="#插件安装" aria-label="Permalink to &quot;插件安装&quot;">​</a></h3><p>由于VSCode本身只提供了文本编辑的功能，我们需要安装插件以支持配置，编译，调试，语法提示等功能:</p><ul><li>XMake</li><li>C/C++</li><li>CodeLLDB</li></ul><p>在完成插件的安装后，重启VSCode可以看到下方的状态栏:</p><p><img src="'+s+`" alt=""></p><p>可以在状态栏设置平台，架构，编译模式，工具链等选项，随后点击Build开始构建。</p><h3 id="自定义选项" tabindex="-1">自定义选项 <a class="header-anchor" href="#自定义选项" aria-label="Permalink to &quot;自定义选项&quot;">​</a></h3><p>如果这些选项不够，可以创建.vscode/settings.json并编写xmake需要的设置，如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>  &quot;xmake.additionalConfigArguments&quot;: [</span></span>
<span class="line"><span>    &quot;--my_option=true&quot;</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>其他xmake的选项也同样可以在settings.json中完成设置。修改后可通过 &gt;XMake: Configure 命令刷新配置。</p><h3 id="配置-intellsence" tabindex="-1">配置 Intellsence <a class="header-anchor" href="#配置-intellsence" aria-label="Permalink to &quot;配置 Intellsence&quot;">​</a></h3><p>为了更好的 C++ 语法提示体验，xmake提供了对<a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noreferrer">Language Server Protocol</a>（简称LSP）的支持。</p><p>在 vscode 中，我们可以通过使用 vscode-cpptools 或者 clangd 来提供 intellsence 支持。</p><p>另外，为了支持 intellsence，xmake 提供了 compile_commands.json 的生成支持。</p><h4 id="生成-compile-commands" tabindex="-1">生成 compile_commands <a class="header-anchor" href="#生成-compile-commands" aria-label="Permalink to &quot;生成 compile_commands&quot;">​</a></h4><h5 id="自动触发生成" tabindex="-1">自动触发生成 <a class="header-anchor" href="#自动触发生成" aria-label="Permalink to &quot;自动触发生成&quot;">​</a></h5><p>通常在修改 xmake.lua 后点击保存，xmake-vscode 插件就会触发自动生成 compile_commands.json，默认存储在 .vscode 目录下。</p><p>这也是推荐方式，通常装完 xmake-vscode 插件，打开带有 xmake.lua 的工程后，只需要编辑 xmake.lua 保存即可触发，不需要任何其他额外操作。</p><h5 id="手动触发生成" tabindex="-1">手动触发生成 <a class="header-anchor" href="#手动触发生成" aria-label="Permalink to &quot;手动触发生成&quot;">​</a></h5><p>当然，如果没看到文件被生成，我们也可以在 vscode 中，可以使用 <code>&gt;XMake: UpdateIntellisense</code> 命令手动触发生成 .vscode/compile_commands.json。</p><h5 id="配置-xmake-lua-自动生成" tabindex="-1">配置 xmake.lua 自动生成 <a class="header-anchor" href="#配置-xmake-lua-自动生成" aria-label="Permalink to &quot;配置 xmake.lua 自动生成&quot;">​</a></h5><p>或者，我们也可以使用这个规则来自动更新生成 compile_commandss.json</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add_rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plugin.compile_commands.autoupdate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {outputdir </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;.vscode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;binary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;src/*.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>这会使得在每次 build 后，自动更新此文件。</p><h5 id="手动执行命令生成" tabindex="-1">手动执行命令生成 <a class="header-anchor" href="#手动执行命令生成" aria-label="Permalink to &quot;手动执行命令生成&quot;">​</a></h5><p>如果上述方式都无效，我们也可以执行命令来生成。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake project -k compile_commands .vscode</span></span></code></pre></div><h4 id="vscode-cpptools" tabindex="-1">vscode-cpptools <a class="header-anchor" href="#vscode-cpptools" aria-label="Permalink to &quot;vscode-cpptools&quot;">​</a></h4><p>如果我们使用 vscode-cpptools 插件来提供 intellsence 支持，需要先去 vscode 插件市场，搜下 C++，默认第一个插件就是，安装下。</p><p>装完后，这个插件提供了 intellsence 和 调试支持。</p><p>然后，我们需要配置下 c_cpp_properties.json 文件，关联上我们生成的 <code>.vscode/compile_commands.json</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;env&quot;: {</span></span>
<span class="line"><span>    &quot;myDefaultIncludePath&quot;: [&quot;\${workspaceFolder}&quot;, &quot;\${workspaceFolder}/include&quot;],</span></span>
<span class="line"><span>    &quot;myCompilerPath&quot;: &quot;/usr/local/bin/gcc-7&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;configurations&quot;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      &quot;name&quot;: &quot;Mac&quot;,</span></span>
<span class="line"><span>      &quot;intelliSenseMode&quot;: &quot;clang-x64&quot;,</span></span>
<span class="line"><span>      &quot;includePath&quot;: [&quot;\${myDefaultIncludePath}&quot;, &quot;/another/path&quot;],</span></span>
<span class="line"><span>      &quot;macFrameworkPath&quot;: [&quot;/System/Library/Frameworks&quot;],</span></span>
<span class="line"><span>      &quot;defines&quot;: [&quot;FOO&quot;, &quot;BAR=100&quot;],</span></span>
<span class="line"><span>      &quot;forcedInclude&quot;: [&quot;\${workspaceFolder}/include/config.h&quot;],</span></span>
<span class="line"><span>      &quot;compilerPath&quot;: &quot;/usr/bin/clang&quot;,</span></span>
<span class="line"><span>      &quot;cStandard&quot;: &quot;c11&quot;,</span></span>
<span class="line"><span>      &quot;cppStandard&quot;: &quot;c++17&quot;,</span></span>
<span class="line"><span>      &quot;compileCommands&quot;: &quot;/path/to/compile_commands.json&quot;,</span></span>
<span class="line"><span>      &quot;browse&quot;: {</span></span>
<span class="line"><span>        &quot;path&quot;: [&quot;\${workspaceFolder}&quot;],</span></span>
<span class="line"><span>        &quot;limitSymbolsToIncludedHeaders&quot;: true,</span></span>
<span class="line"><span>        &quot;databaseFilename&quot;: &quot;&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;version&quot;: 4</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>也就是上面的 <code>&quot;compileCommands&quot;: &quot;/path/to/compile_commands.json&quot;</code> 配置项。</p><p>关于如果打开这个配置文件，以及更多的配置说明，见：</p><ul><li><a href="https://code.visualstudio.com/docs/cpp/configure-intellisense-crosscompilation" target="_blank" rel="noreferrer">https://code.visualstudio.com/docs/cpp/configure-intellisense-crosscompilation</a></li><li><a href="https://code.visualstudio.com/docs/cpp/c-cpp-properties-schema-reference" target="_blank" rel="noreferrer">https://code.visualstudio.com/docs/cpp/c-cpp-properties-schema-reference</a></li></ul><p>当然，理论上可以做到 xmake-vscode 插件自动关联设置这个文件，但是考虑到用户不一定使用 cpptools，有可能还会使用 clangd。</p><p>因此，默认自动配置并不是很好，而且作者暂时也没时间精力去改进它。</p><h4 id="clangd" tabindex="-1">clangd <a class="header-anchor" href="#clangd" aria-label="Permalink to &quot;clangd&quot;">​</a></h4><p>与此同时，我们可以选择安装支持 LSP 的语法提示插件，如 LLVM 推出的<a href="https://clangd.llvm.org/" target="_blank" rel="noreferrer">clangd</a>，其功能稳定且提示流畅， 并通过 LSP 标准完成对不同编译工具链的支持。</p><p>使用 clangd 时，可能与上述的C/C++插件的提示功能有冲突，可以在 .vscode/settings.json 中添加设置将C/C++的语法提示功能关闭:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;C_Cpp.codeAnalysis.runAutomatically&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.intelliSenseEngine&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.formatting&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.autoAddFileAssociations&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.autocompleteAddParentheses&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.autocomplete&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.errorSquiggles&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>同时由于 XMake 生成的 compile_commands.json 在 .vscode 目录，还需要设置 clangd 传参使其在正确位置寻找:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;clangd.arguments&quot;: [</span></span>
<span class="line"><span>    &quot;--compile-commands-dir=.vscode&quot;,</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果配置后，还是没生效，可以尝试重启 vscode 和 clangd 进程，再验证下。</p><h2 id="sublime-插件" tabindex="-1">Sublime 插件 <a class="header-anchor" href="#sublime-插件" aria-label="Permalink to &quot;Sublime 插件&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-sublime" target="_blank" rel="noreferrer">xmake-sublime</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-sublime/master/res/problem.gif" width="650px"><h2 id="intellij-idea-clion-插件" tabindex="-1">Intellij IDEA/CLion 插件 <a class="header-anchor" href="#intellij-idea-clion-插件" aria-label="Permalink to &quot;Intellij IDEA/CLion 插件&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-idea" target="_blank" rel="noreferrer">xmake-idea</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-idea/master/res/problem.gif" width="650px"><h2 id="vim-插件" tabindex="-1">Vim 插件 <a class="header-anchor" href="#vim-插件" aria-label="Permalink to &quot;Vim 插件&quot;">​</a></h2><ul><li><a href="https://github.com/luzhlon/xmake.vim" target="_blank" rel="noreferrer">xmake.vim</a> (第三方开发, 感谢<a href="https://github.com/luzhlon" target="_blank" rel="noreferrer">@luzhlon</a>)</li></ul><h2 id="neovim-插件" tabindex="-1">Neovim 插件 <a class="header-anchor" href="#neovim-插件" aria-label="Permalink to &quot;Neovim 插件&quot;">​</a></h2><ul><li><a href="https://github.com/Mythos-404/xmake.nvim" target="_blank" rel="noreferrer">xmake.nvim</a> (第三方开发, 感谢<a href="https://github.com/Mythos-404" target="_blank" rel="noreferrer">@Mythos_404</a>)</li></ul><p>该插件提供了易用的配置UI和自动生成<em>compile_commands.json</em>文件</p><img src="https://raw.githubusercontent.com/Mythos-404/xmake.nvim/main/assets/XmakePreview.gif" width="650px"><h2 id="gradle插件-jni" tabindex="-1">Gradle插件（JNI） <a class="header-anchor" href="#gradle插件-jni" aria-label="Permalink to &quot;Gradle插件（JNI）&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-gradle" target="_blank" rel="noreferrer">xmake-gradle</a>: 一个无缝整合xmake的gradle插件</li></ul><h3 id="通过插件dsl集成" tabindex="-1">通过插件DSL集成 <a class="header-anchor" href="#通过插件dsl集成" aria-label="Permalink to &quot;通过插件DSL集成&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>plugins {</span></span>
<span class="line"><span>  id &#39;org.tboox.gradle-xmake-plugin&#39; version &#39;1.0.9&#39;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="被废弃的插件集成方式" tabindex="-1">被废弃的插件集成方式 <a class="header-anchor" href="#被废弃的插件集成方式" aria-label="Permalink to &quot;被废弃的插件集成方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>buildscript {</span></span>
<span class="line"><span>  repositories {</span></span>
<span class="line"><span>    maven {</span></span>
<span class="line"><span>      url &quot;https://plugins.gradle.org/m2/&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  dependencies {</span></span>
<span class="line"><span>    classpath &#39;org.tboox:gradle-xmake-plugin:1.0.9&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  repositories {</span></span>
<span class="line"><span>    mavenCentral()</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apply plugin: &quot;org.tboox.gradle-xmake-plugin&quot;</span></span></code></pre></div><h3 id="最简单的配置示例" tabindex="-1">最简单的配置示例 <a class="header-anchor" href="#最简单的配置示例" aria-label="Permalink to &quot;最简单的配置示例&quot;">​</a></h3><p>如果我们添加<code>xmake.lua</code>文件到<code>projectdir/jni/xmake.lua</code>，那么我们只需要在build.gradle中启用生效了xmake指定下对应的JNI工程路径即可。</p><h4 id="build-gradle" tabindex="-1">build.gradle <a class="header-anchor" href="#build-gradle" aria-label="Permalink to &quot;build.gradle&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    externalNativeBuild {</span></span>
<span class="line"><span>        xmake {</span></span>
<span class="line"><span>            path &quot;jni/xmake.lua&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="jni" tabindex="-1">JNI <a class="header-anchor" href="#jni" aria-label="Permalink to &quot;JNI&quot;">​</a></h4><p>JNI工程结构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>projectdir</span></span>
<span class="line"><span>  - src</span></span>
<span class="line"><span>    - main</span></span>
<span class="line"><span>      - java</span></span>
<span class="line"><span>  - jni</span></span>
<span class="line"><span>    - xmake.lua</span></span>
<span class="line"><span>    - *.cpp</span></span></code></pre></div><p>xmake.lua:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add_rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mode.debug&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mode.release&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nativelib&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shared&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nativelib.cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="更多gradle配置说明" tabindex="-1">更多Gradle配置说明 <a class="header-anchor" href="#更多gradle配置说明" aria-label="Permalink to &quot;更多Gradle配置说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    defaultConfig {</span></span>
<span class="line"><span>        externalNativeBuild {</span></span>
<span class="line"><span>            xmake {</span></span>
<span class="line"><span>                // 追加设置全局c编译flags</span></span>
<span class="line"><span>                cFlags &quot;-DTEST&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 追加设置全局c++编译flags</span></span>
<span class="line"><span>                cppFlags &quot;-DTEST&quot;, &quot;-DTEST2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 设置切换编译模式，与\`xmake f -m debug\`的配置对应，具体模式值根据自己的xmake.lua设置而定</span></span>
<span class="line"><span>                buildMode &quot;debug&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 设置需要编译的abi列表，支持：armeabi, armeabi-v7a, arm64-v8a, x86, x86_64</span></span>
<span class="line"><span>                // 如果没有设置的话，我们也支持从defaultConfig.ndk.abiFilters中获取abiFilters</span></span>
<span class="line"><span>                abiFilters &quot;armeabi-v7a&quot;, &quot;arm64-v8a&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    externalNativeBuild {</span></span>
<span class="line"><span>        xmake {</span></span>
<span class="line"><span>            // 设置jni工程中xmake.lua根文件路径，这是必须的，不设置就不会启用jni编译</span></span>
<span class="line"><span>            path &quot;jni/xmake.lua&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 启用详细输出，会显示完整编译命令行参数，其他值：verbose, warning, normal</span></span>
<span class="line"><span>            logLevel &quot;verbose&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 指定c++ stl库，默认不指定会使用c++_static，其他值：c++_static/c++_shared, gnustl_static/gnustl_shared, stlport_static/stlport_shared</span></span>
<span class="line"><span>            stl &quot;c++_shared&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 设置xmake可执行程序路径（通常不用设置）</span></span>
<span class="line"><span>            // program /usr/local/bin/xmake</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 禁用stdc++库，默认是启用的</span></span>
<span class="line"><span>            // stdcxx false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 设置其他指定的ndk目录路径 （这是可选的，默认xmake会自动从$ANDROID_NDK_HOME或者\`~/Library/Android/sdk/ndk-bundle\`中检测）</span></span>
<span class="line"><span>            // 当然如果用户通过\`xmake g --ndk=xxx\`配置了全局设置，也会自动从这个里面检测</span></span>
<span class="line"><span>            // ndk &quot;/Users/ruki/files/android-ndk-r20b/&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 设置ndk中sdk版本</span></span>
<span class="line"><span>            // sdkver 21</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="编译jni并且生成apk" tabindex="-1">编译JNI并且生成APK <a class="header-anchor" href="#编译jni并且生成apk" aria-label="Permalink to &quot;编译JNI并且生成APK&quot;">​</a></h3><p>当<code>gradle-xmake-plugin</code>插件被应用生效后，<code>xmakeBuild</code>任务会自动注入到现有的<code>assemble</code>任务中去，自动执行jni库编译和集成。</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ ./gradlew app:assembleDebug</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:xmakeConfigureForArm64</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:xmakeBuildForArm64</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&gt;&gt; xmake build</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 50%]: cache compiling.debug nativelib.cc</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 75%]: linking.debug libnativelib.so</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[100%]: build ok!</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&gt;&gt; install artifacts to /Users/ruki/projects/personal/xmake-gradle/nativelib/libs/arm64-v8a</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:xmakeConfigureForArmv7</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:xmakeBuildForArmv7</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&gt;&gt; xmake build</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 50%]: cache compiling.debug nativelib.cc</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[ 75%]: linking.debug libnativelib.so</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[100%]: build ok!</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&gt;&gt; install artifacts to /Users/ruki/projects/personal/xmake-gradle/nativelib/libs/armeabi-v7a</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:preBuild</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :nativelib:assemble</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :app:assembleDebug</span></span></code></pre></div><h3 id="强制重建jni" tabindex="-1">强制重建JNI <a class="header-anchor" href="#强制重建jni" aria-label="Permalink to &quot;强制重建JNI&quot;">​</a></h3><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ ./gradlew nativelib:xmakeRebuild</span></span></code></pre></div>`,82)]))}const m=n(l,[["render",t]]);export{g as __pageData,m as default};
