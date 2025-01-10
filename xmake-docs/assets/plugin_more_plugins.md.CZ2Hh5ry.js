import{_ as s}from"./chunks/vscode_status_bar.CN14xNAN.js";import{_ as n,c as e,a2 as i,o as t}from"./chunks/framework.CQcFAaaG.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"plugin/more_plugins.md","filePath":"plugin/more_plugins.md"}'),l={name:"plugin/more_plugins.md"};function p(o,a,r,c,u,d){return t(),e("div",null,a[0]||(a[0]=[i('<h2 id="vscode-plugin" tabindex="-1">VSCode Plugin <a class="header-anchor" href="#vscode-plugin" aria-label="Permalink to &quot;VSCode Plugin&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-vscode" target="_blank" rel="noreferrer">xmake-vscode</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-vscode/master/res/problem.gif" width="650px"><p><a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VSCode</a>is a commonly used text editor, and xmake provides plug-ins&#39; support.</p><h3 id="plugin-installation" tabindex="-1">Plugin installation <a class="header-anchor" href="#plugin-installation" aria-label="Permalink to &quot;Plugin installation&quot;">​</a></h3><p>Since VSCode itself only provides text editing functions, we need to install plug-ins to support configuration, compilation, debugging, intellisenses and other functions:</p><ul><li>XMake</li><li>C/C++</li><li>CodeLLDB</li></ul><p>After completing the installation of the plug-in, restart VSCode to see the status bar below:</p><p><img src="'+s+`" alt=""></p><p>You can set the platform, architecture, compilation mode, tool-chain and other options in the status bar, and then click Build to start the build.</p><h3 id="custom-options" tabindex="-1">Custom options <a class="header-anchor" href="#custom-options" aria-label="Permalink to &quot;Custom options&quot;">​</a></h3><p>If these options are not enough, you can create .vscode/settings.json and write the settings required by xmake, such as:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>  &quot;xmake.additionalConfigArguments&quot;: [</span></span>
<span class="line"><span>    &quot;--my_option=true&quot;</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Other xmake options can also be setted in settings.json. After modification, the configuration can be refreshed through the &gt;XMake: Configure command.</p><h3 id="configure-intellsence" tabindex="-1">Configure Intellsence <a class="header-anchor" href="#configure-intellsence" aria-label="Permalink to &quot;Configure Intellsence&quot;">​</a></h3><p>For a better C++ syntax prompt experience, xmake provides support for <a href="https://microsoft.github.io/language-server-protocol/" target="_blank" rel="noreferrer">Language Server Protocol</a> (LSP for short).</p><p>In vscode, we can provide intellsence support by using vscode-cpptools or clangd.</p><p>In addition, in order to support intellsence, xmake provides compile_commands.json generation support.</p><h4 id="generate-compile-commands" tabindex="-1">generate compile_commands <a class="header-anchor" href="#generate-compile-commands" aria-label="Permalink to &quot;generate compile_commands&quot;">​</a></h4><h5 id="automatic-trigger-generation" tabindex="-1">Automatic trigger generation <a class="header-anchor" href="#automatic-trigger-generation" aria-label="Permalink to &quot;Automatic trigger generation&quot;">​</a></h5><p>Usually after modifying xmake.lua and clicking Save, the xmake-vscode plugin will trigger the automatic generation of compile_commands.json, which is stored in the .vscode directory by default.</p><p>This is also the recommended way. Usually after installing the xmake-vscode plug-in and opening the project with xmake.lua, you only need to edit xmake.lua to save and trigger without any other additional operations.</p><h5 id="manually-trigger-generation" tabindex="-1">Manually trigger generation <a class="header-anchor" href="#manually-trigger-generation" aria-label="Permalink to &quot;Manually trigger generation&quot;">​</a></h5><p>Of course, if we don’t see the file being generated, we can also use the <code>&gt;XMake: UpdateIntellisense</code> command to manually trigger the generation of .vscode/compile_commands.json in vscode.</p><h5 id="configure-xmake-lua-to-generate-automatically" tabindex="-1">Configure xmake.lua to generate automatically <a class="header-anchor" href="#configure-xmake-lua-to-generate-automatically" aria-label="Permalink to &quot;Configure xmake.lua to generate automatically&quot;">​</a></h5><p>Alternatively, we can also use this rule to automatically update and generate compile_commandss.json</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add_rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plugin.compile_commands.autoupdate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {outputdir </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;.vscode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;binary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;src/*.c&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>This will automatically update this file after each build.</p><h5 id="manual-execution-command-generation" tabindex="-1">Manual execution command generation <a class="header-anchor" href="#manual-execution-command-generation" aria-label="Permalink to &quot;Manual execution command generation&quot;">​</a></h5><p>If the above methods are invalid, we can also execute the command to generate.</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ xmake project -k compile_commands .vscode</span></span></code></pre></div><h4 id="vscode-cpptools" tabindex="-1">vscode-cpptools <a class="header-anchor" href="#vscode-cpptools" aria-label="Permalink to &quot;vscode-cpptools&quot;">​</a></h4><p>If we use the vscode-cpptools plug-in to provide intellsence support, we need to go to the vscode plug-in market first, search for C++, the default first plug-in is to install it.</p><p>When installed, this plugin provides intellsence and debugging support.</p><p>Then, we need to configure the c_cpp_properties.json file and associate it with the <code>.vscode/compile_commands.json</code> we generated.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>   &quot;env&quot;: {</span></span>
<span class="line"><span>     &quot;myDefaultIncludePath&quot;: [&quot;\${workspaceFolder}&quot;, &quot;\${workspaceFolder}/include&quot;],</span></span>
<span class="line"><span>     &quot;myCompilerPath&quot;: &quot;/usr/local/bin/gcc-7&quot;</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   &quot;configurations&quot;: [</span></span>
<span class="line"><span>     {</span></span>
<span class="line"><span>       &quot;name&quot;: &quot;Mac&quot;,</span></span>
<span class="line"><span>       &quot;intelliSenseMode&quot;: &quot;clang-x64&quot;,</span></span>
<span class="line"><span>       &quot;includePath&quot;: [&quot;\${myDefaultIncludePath}&quot;, &quot;/another/path&quot;],</span></span>
<span class="line"><span>       &quot;macFrameworkPath&quot;: [&quot;/System/Library/Frameworks&quot;],</span></span>
<span class="line"><span>       &quot;defines&quot;: [&quot;FOO&quot;, &quot;BAR=100&quot;],</span></span>
<span class="line"><span>       &quot;forcedInclude&quot;: [&quot;\${workspaceFolder}/include/config.h&quot;],</span></span>
<span class="line"><span>       &quot;compilerPath&quot;: &quot;/usr/bin/clang&quot;,</span></span>
<span class="line"><span>       &quot;cStandard&quot;: &quot;c11&quot;,</span></span>
<span class="line"><span>       &quot;cppStandard&quot;: &quot;c++17&quot;,</span></span>
<span class="line"><span>       &quot;compileCommands&quot;: &quot;/path/to/compile_commands.json&quot;,</span></span>
<span class="line"><span>       &quot;browse&quot;: {</span></span>
<span class="line"><span>         &quot;path&quot;: [&quot;\${workspaceFolder}&quot;],</span></span>
<span class="line"><span>         &quot;limitSymbolsToIncludedHeaders&quot;: true,</span></span>
<span class="line"><span>         &quot;databaseFilename&quot;: &quot;&quot;</span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span>   ],</span></span>
<span class="line"><span>   &quot;version&quot;: 4</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>That is the <code>&quot;compileCommands&quot;: &quot;/path/to/compile_commands.json&quot;</code> configuration item above.</p><p>For how to open this configuration file, and more configuration instructions, see:</p><ul><li><a href="https://code.visualstudio.com/docs/cpp/configure-intellisense-crosscompilation" target="_blank" rel="noreferrer">https://code.visualstudio.com/docs/cpp/configure-intellisense-crosscompilation</a></li><li><a href="https://code.visualstudio.com/docs/cpp/c-cpp-properties-schema-reference" target="_blank" rel="noreferrer">https://code.visualstudio.com/docs/cpp/c-cpp-properties-schema-reference</a></li></ul><p>Of course, in theory, the xmake-vscode plugin can automatically associate and set this file, but considering that users do not necessarily use cpptools, they may also use clangd.</p><p>Therefore, the default automatic configuration is not very good, and the author has no time and energy to improve it.</p><h4 id="clangd" tabindex="-1">clangd <a class="header-anchor" href="#clangd" aria-label="Permalink to &quot;clangd&quot;">​</a></h4><p>When using clangd, there may be conflicts with the C/C++ plug-in, you can add settings in .vscode/settings.json:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;C_Cpp.codeAnalysis.runAutomatically&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.intelliSenseEngine&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.formatting&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.autoAddFileAssociations&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.autocompleteAddParentheses&quot;: false,</span></span>
<span class="line"><span>  &quot;C_Cpp.autocomplete&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>  &quot;C_Cpp.errorSquiggles&quot;: &quot;Disabled&quot;,</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Also, since the compile_commands.json generated by XMake is in the .vscode directory, you need to set the clangd parameter to look for it in the correct location:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;clangd.arguments&quot;: [</span></span>
<span class="line"><span>    &quot;--compile-commands-dir=.vscode&quot;,</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="sublime-plugin" tabindex="-1">Sublime Plugin <a class="header-anchor" href="#sublime-plugin" aria-label="Permalink to &quot;Sublime Plugin&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-sublime" target="_blank" rel="noreferrer">xmake-sublime</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-sublime/master/res/problem.gif" width="650px"><h2 id="intellij-idea-clion-pluin" tabindex="-1">Intellij IDEA/Clion Pluin <a class="header-anchor" href="#intellij-idea-clion-pluin" aria-label="Permalink to &quot;Intellij IDEA/Clion Pluin&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-idea" target="_blank" rel="noreferrer">xmake-idea</a></li></ul><img src="https://raw.githubusercontent.com/xmake-io/xmake-idea/master/res/problem.gif" width="650px"><h2 id="vim-plugin" tabindex="-1">Vim Plugin <a class="header-anchor" href="#vim-plugin" aria-label="Permalink to &quot;Vim Plugin&quot;">​</a></h2><ul><li><a href="https://github.com/luzhlon/xmake.vim" target="_blank" rel="noreferrer">xmake.vim</a> (third-party, thanks <a href="https://github.com/luzhlon" target="_blank" rel="noreferrer">@luzhlon</a>)</li></ul><h2 id="neovim-plugin" tabindex="-1">Neovim Plugin <a class="header-anchor" href="#neovim-plugin" aria-label="Permalink to &quot;Neovim Plugin&quot;">​</a></h2><ul><li><a href="https://github.com/Mythos-404/xmake.nvim" target="_blank" rel="noreferrer">xmake.nvim</a> (third-party, thanks <a href="https://github.com/Mythos-404" target="_blank" rel="noreferrer">@Mythos_404</a>)</li></ul><p>The plugin provides easy-to-use configuration UI and auto-generation of <em>compile_commands.json</em> files</p><img src="https://raw.githubusercontent.com/Mythos-404/xmake.nvim/main/assets/XmakePreview.gif" width="650px"><h2 id="gradle-plugin-jni" tabindex="-1">Gradle Plugin (JNI) <a class="header-anchor" href="#gradle-plugin-jni" aria-label="Permalink to &quot;Gradle Plugin (JNI)&quot;">​</a></h2><ul><li><a href="https://github.com/xmake-io/xmake-gradle" target="_blank" rel="noreferrer">xmake-gradle</a>: A gradle plugin that integrates xmake seamlessly</li></ul><h3 id="plugins-dsl" tabindex="-1">plugins DSL <a class="header-anchor" href="#plugins-dsl" aria-label="Permalink to &quot;plugins DSL&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>plugins {</span></span>
<span class="line"><span>  id &#39;org.tboox.gradle-xmake-plugin&#39; version &#39;1.0.9&#39;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="legacy-plugin-application" tabindex="-1">Legacy plugin application <a class="header-anchor" href="#legacy-plugin-application" aria-label="Permalink to &quot;Legacy plugin application&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>buildscript {</span></span>
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
<span class="line"><span>apply plugin: &quot;org.tboox.gradle-xmake-plugin&quot;</span></span></code></pre></div><h3 id="simplest-example" tabindex="-1">Simplest Example <a class="header-anchor" href="#simplest-example" aria-label="Permalink to &quot;Simplest Example&quot;">​</a></h3><p>We add <code>xmake.lua</code> to <code>projectdir/jni/xmake.lua</code> and enable xmake in build.gradle.</p><h4 id="build-gradle" tabindex="-1">build.gradle <a class="header-anchor" href="#build-gradle" aria-label="Permalink to &quot;build.gradle&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    externalNativeBuild {</span></span>
<span class="line"><span>        xmake {</span></span>
<span class="line"><span>            path &quot;jni/xmake.lua&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="jni" tabindex="-1">JNI <a class="header-anchor" href="#jni" aria-label="Permalink to &quot;JNI&quot;">​</a></h4><p>The JNI project structure:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>projectdir</span></span>
<span class="line"><span>  - src</span></span>
<span class="line"><span>    - main</span></span>
<span class="line"><span>      - java</span></span>
<span class="line"><span>  - jni</span></span>
<span class="line"><span>    - xmake.lua</span></span>
<span class="line"><span>    - *.cpp</span></span></code></pre></div><p>xmake.lua:</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add_rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mode.debug&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mode.release&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nativelib&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    set_kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;shared&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    add_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;nativelib.cc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="more-gradle-configuations" tabindex="-1">More Gradle Configuations <a class="header-anchor" href="#more-gradle-configuations" aria-label="Permalink to &quot;More Gradle Configuations&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    defaultConfig {</span></span>
<span class="line"><span>        externalNativeBuild {</span></span>
<span class="line"><span>            xmake {</span></span>
<span class="line"><span>                // append the global cflags (optional)</span></span>
<span class="line"><span>                cFlags &quot;-DTEST&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // append the global cppflags (optional)</span></span>
<span class="line"><span>                cppFlags &quot;-DTEST&quot;, &quot;-DTEST2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // switch the build mode to \`debug\` for \`xmake f -m debug\` (optional)</span></span>
<span class="line"><span>                buildMode &quot;debug&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // set abi filters (optional), e.g. armeabi, armeabi-v7a, arm64-v8a, x86, x86_64</span></span>
<span class="line"><span>                // we can also get abiFilters from defaultConfig.ndk.abiFilters</span></span>
<span class="line"><span>                abiFilters &quot;armeabi-v7a&quot;, &quot;arm64-v8a&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    externalNativeBuild {</span></span>
<span class="line"><span>        xmake {</span></span>
<span class="line"><span>            // enable xmake and set xmake.lua project file path</span></span>
<span class="line"><span>            path &quot;jni/xmake.lua&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // enable verbose output (optional), e.g. verbose, warning, normal</span></span>
<span class="line"><span>            logLevel &quot;verbose&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // set c++stl (optional), e.g. c++_static/c++_shared, gnustl_static/gnustl_shared, stlport_static/stlport_shared</span></span>
<span class="line"><span>            stl &quot;c++_shared&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // set the given xmake program path (optional)</span></span>
<span class="line"><span>            // program /usr/local/bin/xmake</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // disable stdc++ library (optional)</span></span>
<span class="line"><span>            // stdcxx false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // set the given ndk directory path (optional)</span></span>
<span class="line"><span>            // ndk &quot;/Users/ruki/files/android-ndk-r20b/&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // set sdk version of ndk (optional)</span></span>
<span class="line"><span>            // sdkver 21</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="build-jni-and-generate-apk" tabindex="-1">Build JNI and generate apk <a class="header-anchor" href="#build-jni-and-generate-apk" aria-label="Permalink to &quot;Build JNI and generate apk&quot;">​</a></h3><p>The <code>xmakeBuild</code> will be injected to <code>assemble</code> task automatically if the gradle-xmake-plugin has been applied.</p><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ ./gradlew app:assembleDebug</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; Task :app:assembleDebug</span></span></code></pre></div><h3 id="force-to-rebuild-jni" tabindex="-1">Force to rebuild JNI <a class="header-anchor" href="#force-to-rebuild-jni" aria-label="Permalink to &quot;Force to rebuild JNI&quot;">​</a></h3><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ ./gradlew nativelib:xmakeRebuild</span></span></code></pre></div>`,80)]))}const m=n(l,[["render",p]]);export{k as __pageData,m as default};
