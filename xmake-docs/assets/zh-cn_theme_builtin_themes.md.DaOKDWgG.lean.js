import{_ as s,a as i,b as e}from"./chunks/emoji.hynvey8Q.js";import{_ as t,c as h,a2 as l,o as n}from"./chunks/framework.CQcFAaaG.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh-cn/theme/builtin_themes.md","filePath":"zh-cn/theme/builtin_themes.md"}'),p={name:"zh-cn/theme/builtin_themes.md"};function d(k,a,o,r,c,g){return n(),h("div",null,a[0]||(a[0]=[l('<h2 id="默认主题" tabindex="-1">默认主题 <a class="header-anchor" href="#默认主题" aria-label="Permalink to &quot;默认主题&quot;">​</a></h2><p>这个也就是咱们安装xmake后默认的显示主题，主题名：default，它默认会提供色彩输出，适合一些深色背景的终端。</p><img src="'+s+'" width="60%"><p>我们也可以通过下面的命令切回默认主题：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=default</span></span></code></pre></div><h2 id="ninja-主题" tabindex="-1">Ninja 主题 <a class="header-anchor" href="#ninja-主题" aria-label="Permalink to &quot;Ninja 主题&quot;">​</a></h2><p>这个是v2.3.4之后版本提供的主题，构建进度风格类似ninja，采用单行进度条，不再回滚进度，用户可以根据自己的喜好设置。</p><p>除了进度展示不同外，其他都跟默认主题的配置相同。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=ninja</span></span></code></pre></div><img src="'+i+'" width="60%"><h2 id="emoji-主题" tabindex="-1">Emoji 主题 <a class="header-anchor" href="#emoji-主题" aria-label="Permalink to &quot;Emoji 主题&quot;">​</a></h2><p>这个主题部分输出通过emoji字符代替之前的色彩输出。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=emoji</span></span></code></pre></div><img src="'+e+'" width="60%"><h2 id="dark-主题" tabindex="-1">Dark 主题 <a class="header-anchor" href="#dark-主题" aria-label="Permalink to &quot;Dark 主题&quot;">​</a></h2><p>这个主题主要是对一些终端背景是浅色系（比如淡黄色等），导致一些警告输出（默认也是黄色）重合不可见，所以把主题配色变成深色系，提高可见性。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=dark</span></span></code></pre></div><h2 id="light-主题" tabindex="-1">Light 主题 <a class="header-anchor" href="#light-主题" aria-label="Permalink to &quot;Light 主题&quot;">​</a></h2><p>这个主题主要是对一些终端背景是深色系，导致一些输出重合不可见，所以把主题配色变成浅色系，提高可见性。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=light</span></span></code></pre></div><h2 id="plain-主题" tabindex="-1">Plain 主题 <a class="header-anchor" href="#plain-主题" aria-label="Permalink to &quot;Plain 主题&quot;">​</a></h2><p>这个主题，其实就是完全禁用色彩、emoji输出，主要是应对一些不支持colors code的终端导致显示乱码的问题，也是最朴素的主题风格。</p><p>!&gt; 一些win终端可能不支持colors，就可以设置这个主题来解决乱码显示问题</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=plain</span></span></code></pre></div><h2 id="powershell-主题" tabindex="-1">Powershell 主题 <a class="header-anchor" href="#powershell-主题" aria-label="Permalink to &quot;Powershell 主题&quot;">​</a></h2><p>win下powershell终端背景是蓝色的，而它的调色板配置似乎被改过的，其中magenta色居然显示成背景蓝色，很诡异，导致xmake的默认输出会有局部文本不可见（跟背景色重叠了）</p><p>所以，这个主题就是为了更好的适配powershell终端下的显示输出。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xmake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> g</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --theme=powershell</span></span></code></pre></div>',28)]))}const u=t(p,[["render",d]]);export{b as __pageData,u as default};
