import{_ as a,c as i,a2 as e,o as t}from"./chunks/framework.CQcFAaaG.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/guide/installation.md","filePath":"zh-cn/guide/installation.md"}'),n={name:"zh-cn/guide/installation.md"};function h(l,s,p,k,d,o){return t(),i("div",null,s[0]||(s[0]=[e(`<h2 id="master版本" tabindex="-1">Master版本 <a class="header-anchor" href="#master版本" aria-label="Permalink to &quot;Master版本&quot;">​</a></h2><p>!&gt; 切记，xmake不建议在root下安装和使用，所以尽量不要在root下拉取源码编译安装！</p><h4 id="使用curl" tabindex="-1">使用curl <a class="header-anchor" href="#使用curl" aria-label="Permalink to &quot;使用curl&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xmake.io/shget.text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span></span></code></pre></div><p>如果要安装指定版本和分支，后面可以追加版本号和分支参数</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xmake.io/shget.text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xmake.io/shget.text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v2.7.7</span></span></code></pre></div><h4 id="使用wget" tabindex="-1">使用wget <a class="header-anchor" href="#使用wget" aria-label="Permalink to &quot;使用wget&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xmake.io/shget.text</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bash</span></span></code></pre></div><h4 id="使用powershell" tabindex="-1">使用powershell <a class="header-anchor" href="#使用powershell" aria-label="Permalink to &quot;使用powershell&quot;">​</a></h4><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Webrequest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;https://xmake.io/psget.text&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UseBasicParsing).Content</span></span></code></pre></div><p>如果要安装指定版本和分支，后面可以追加版本号和分支参数</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Webrequest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;https://xmake.io/psget.text&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UseBasicParsing).Content dev</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Invoke-Webrequest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;https://xmake.io/psget.text&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UseBasicParsing).Content v2.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7.7</span></span></code></pre></div><p>!&gt; 如果ps脚本执行提示失败，可以尝试在管理员模式下执行</p><h2 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows&quot;">​</a></h2><h3 id="使用安装包" tabindex="-1">使用安装包 <a class="header-anchor" href="#使用安装包" aria-label="Permalink to &quot;使用安装包&quot;">​</a></h3><ol><li>从 <a href="https://github.com/xmake-io/xmake/releases" target="_blank" rel="noreferrer">Releases</a> 上下载windows安装包</li><li>运行安装程序 xmake-[version].[win32|win64].exe</li></ol><p>!&gt; releases下面xmake-[version].[win32|win64].zip的包是不带安装程序的，可直接解压使用，绿色无依赖，不过需要自己添加PATH环境变量。</p><p>另外，Releases下面带有 xmake-tinyc 开头的exe安装包，内部集成了 tinyc 编译器环境，自带 libc 和 winapi 头文件，安装这个包，可以实现在没有 msvc 环境下，也能正常编译 c 程序。 这对于临时想写一些 c 测试或者算法代码，又不想安装 msvc 的用户非常有用，不过安装包会稍微大2-3M，不过也还好。</p><h3 id="使用scoop" tabindex="-1">使用scoop <a class="header-anchor" href="#使用scoop" aria-label="Permalink to &quot;使用scoop&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scoop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h3 id="使用winget" tabindex="-1">使用winget <a class="header-anchor" href="#使用winget" aria-label="Permalink to &quot;使用winget&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="msys-mingw" tabindex="-1">Msys/Mingw <a class="header-anchor" href="#msys-mingw" aria-label="Permalink to &quot;Msys/Mingw&quot;">​</a></h2><p>现在msys/pacman官方仓库已经收录xmake软件包，可直接通过pacman安装。</p><h3 id="mingw64" tabindex="-1">mingw64 <a class="header-anchor" href="#mingw64" aria-label="Permalink to &quot;mingw64&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Sy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mingw-w64-x86_64-xmake</span></span></code></pre></div><h3 id="mingw32" tabindex="-1">mingw32 <a class="header-anchor" href="#mingw32" aria-label="Permalink to &quot;mingw32&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Sy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mingw-w64-i686-xmake</span></span></code></pre></div><h2 id="macos" tabindex="-1">MacOS <a class="header-anchor" href="#macos" aria-label="Permalink to &quot;MacOS&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ruby</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><p>或者：</p><ol><li>从 <a href="https://github.com/xmake-io/xmake/releases" target="_blank" rel="noreferrer">Releases</a> 上下载pkg安装包</li><li>双击运行</li></ol><p>或者安装master版本:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用homebrew安装master版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --HEAD</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或者直接调用shell下载安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bash</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &lt;(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://xmake.io/shget.text)</span></span></code></pre></div><h2 id="arch-linux" tabindex="-1">Arch Linux <a class="header-anchor" href="#arch-linux" aria-label="Permalink to &quot;Arch Linux&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Sy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="alpine-linux" tabindex="-1">Alpine Linux <a class="header-anchor" href="#alpine-linux" aria-label="Permalink to &quot;Alpine Linux&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="ubuntu" tabindex="-1">Ubuntu <a class="header-anchor" href="#ubuntu" aria-label="Permalink to &quot;Ubuntu&quot;">​</a></h2><h3 id="使用apt安装" tabindex="-1">使用apt安装 <a class="header-anchor" href="#使用apt安装" aria-label="Permalink to &quot;使用apt安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add-apt-repository</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ppa:xmake-io/xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><p>另外，近期 Xmake 已经被收入到 Debian 官方仓库：<a href="https://packages.debian.org/sid/xmake" target="_blank" rel="noreferrer">https://packages.debian.org/sid/xmake</a></p><h2 id="fedora-rhel-opensuse-centos" tabindex="-1">Fedora/RHEL/OpenSUSE/CentOS <a class="header-anchor" href="#fedora-rhel-opensuse-centos" aria-label="Permalink to &quot;Fedora/RHEL/OpenSUSE/CentOS&quot;">​</a></h2><p>Fedora 39 以上版本，可以直接使用下面的命令从官方仓库安装：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><p>我们也可以从 Copr 仓库安装：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> copr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> waruqi/xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dnf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="gentoo" tabindex="-1">Gentoo <a class="header-anchor" href="#gentoo" aria-label="Permalink to &quot;Gentoo&quot;">​</a></h2><ol><li>参考<a href="https://wiki.gentoo.org/wiki/Project:GURU/Information_for_End_Users" target="_blank" rel="noreferrer">这里</a>将GURU添加到你的系统仓库</li><li>安装dev-util/xmake</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> emerge</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --autounmask</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev-util/xmake</span></span></code></pre></div><h2 id="其他linux" tabindex="-1">其他Linux <a class="header-anchor" href="#其他linux" aria-label="Permalink to &quot;其他Linux&quot;">​</a></h2><p>先从 <a href="https://github.com/xmake-io/xmake/releases" target="_blank" rel="noreferrer">Releases</a> 上下载xmake-x.x.x.gz.run自安装包</p><p>然后运行这个自安装包。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 777</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./xmake-x.x.x.gz.run</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./xmake-x.x.x.gz.run</span></span></code></pre></div><h2 id="freebsd" tabindex="-1">FreeBSD <a class="header-anchor" href="#freebsd" aria-label="Permalink to &quot;FreeBSD&quot;">​</a></h2><p>见下文源码编译安装，并使用gmake来代替make。</p><h2 id="termux-android" tabindex="-1">Termux (Android) <a class="header-anchor" href="#termux-android" aria-label="Permalink to &quot;Termux (Android)&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pkg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span></span></code></pre></div><h2 id="源码编译安装" tabindex="-1">源码编译安装 <a class="header-anchor" href="#源码编译安装" aria-label="Permalink to &quot;源码编译安装&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>!&gt; 切记，xmake不建议在root下安装和使用，所以尽量不要在root下拉取源码编译安装！</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --recursive</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/xmake-io/xmake.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./scripts/get.sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __local__</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __install_only__</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">source</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.xmake/profile</span></span></code></pre></div><p>如果觉得github的源太慢，可以通过gitee的镜像源拉取：<code>clone --recursive https://gitee.com/tboox/xmake.git</code> 也可以如下修改~/.gitconfig，永久解决github clone慢的问题</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[url &quot;ssh://git@github.com/&quot;]</span></span>
<span class="line"><span>  insteadOf = https://github.com/</span></span></code></pre></div><p>!&gt; 由于目前xmake源码通过git submodule维护依赖，所以clone的时候需要加上<code>--recursive</code>参数同时拉取所有submodules代码，请不要直接下载tar.gz源码，因为github不会自动打包submodules里面的代码。</p><p>如果git clone的时候忘记加<code>--recursive</code>，那么也可以执行<code>git submodule update --init</code>来拉取所有submodules，例如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/xmake-io/xmake.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./xmake</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> submodule</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --init</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./scripts/get.sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __local__</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __install_only__</span></span></code></pre></div><p>!&gt; <code>./get.sh __local__</code>是安装到<code>~/.local/xmake</code>下，然后通过<code>source ~/.xmake/profile</code>方式来加载的，所以安装完，当前终端如果执行xmake失败，提示找不到，就手动执行下 <code>source ~/.xmake/profile</code>，而下次打开终端就不需要了。</p><h3 id="windows平台源码安装" tabindex="-1">Windows平台源码安装 <a class="header-anchor" href="#windows平台源码安装" aria-label="Permalink to &quot;Windows平台源码安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --recursive</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/xmake-io/xmake.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./xmake/core</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span></span></code></pre></div><h3 id="仅仅更新安装lua脚本" tabindex="-1">仅仅更新安装lua脚本 <a class="header-anchor" href="#仅仅更新安装lua脚本" aria-label="Permalink to &quot;仅仅更新安装lua脚本&quot;">​</a></h3><p>这个开发者本地调试xmake源码才需要：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./scripts/get.sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __local__</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> __install_only__</span></span></code></pre></div><h3 id="root下安装" tabindex="-1">root下安装 <a class="header-anchor" href="#root下安装" aria-label="Permalink to &quot;root下安装&quot;">​</a></h3><p>xmake不推荐root下安装使用，因为这很不安全，如果用户非要root下装，装完后，如果提示xmake运行不了，请根据提示传递<code>--root</code>参数，或者设置<code>XMAKE_ROOT=y</code>环境变量强行启用下，前提是：用户需要随时注意root下误操作系统文件文件的风险。</p><h3 id="依赖问题" tabindex="-1">依赖问题 <a class="header-anchor" href="#依赖问题" aria-label="Permalink to &quot;依赖问题&quot;">​</a></h3><ol><li>如果遇到readline相关问题，请装下readline-devel或者libreadline-dev依赖，这个是可选的，仅仅<code>xmake lua</code>命令执行REPL时候才需要。</li><li>如果想要提速编译，可以装下ccache，xmake会自动检测并使用，这也是可选的。</li></ol><h2 id="其他安装方式" tabindex="-1">其他安装方式 <a class="header-anchor" href="#其他安装方式" aria-label="Permalink to &quot;其他安装方式&quot;">​</a></h2><p>!&gt; 这种也是源码编译安装，但是安装路径会直接写入<code>/usr/</code>下，需要root权限，因此除非特殊情况，不推荐这种安装方式，建议采用上文提供的<code>./get.sh __local__</code>方式来安装，这两种安装方式的安装路径是不同的，不要混用。</p><p>通过make进行编译安装:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><p>安装到其他指定目录:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PREFIX=/usr/local</span></span></code></pre></div><h2 id="更新升级" tabindex="-1">更新升级 <a class="header-anchor" href="#更新升级" aria-label="Permalink to &quot;更新升级&quot;">​</a></h2><p>从v2.2.3版本开始，新增了<code>xmake update</code>命令，来快速进行自我更新和升级，默认是升级到最新版本，当然也可以指定升级或者回退到某个版本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2.7.1</span></span></code></pre></div><p>我们也可以指定更新到master/dev分支版本：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><p>从指定git源更新</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> github:xmake-io/xmake#master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gitee:tboox/xmake#dev</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # gitee镜像</span></span></code></pre></div><p>如果xmake/core没动过，仅仅更新xmake的lua脚本改动，可以加<code>-s/--scriptonly</code>快速更新lua脚本</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><p>最后，我们如果要卸载xmake，也是支持的：<code>xmake update --uninstall</code></p>`,93)]))}const g=a(n,[["render",h]]);export{c as __pageData,g as default};