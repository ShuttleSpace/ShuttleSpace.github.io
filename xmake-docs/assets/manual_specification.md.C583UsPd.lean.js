import{_ as e,c as d,a2 as o,o as n}from"./chunks/framework.CQcFAaaG.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"manual/specification.md","filePath":"manual/specification.md"}'),i={name:"manual/specification.md"};function a(r,t,c,s,p,u){return n(),d("div",null,t[0]||(t[0]=[o('<h2 id="naming-conventions" tabindex="-1">Naming conventions <a class="header-anchor" href="#naming-conventions" aria-label="Permalink to &quot;Naming conventions&quot;">​</a></h2><p>The interface is named according to some of the predefined specifications, which is more convenient to understand and easy to use.</p><p>It&#39;s according to the following rules:</p><table tabindex="0"><thead><tr><th>Interfaces</th><th>Description</th></tr></thead><tbody><tr><td><code>is_</code>/<code>has_</code> + xxx</td><td>Condition interfaces</td></tr><tr><td><code>set_</code> + xxx</td><td>Set and override the previous settings</td></tr><tr><td><code>add_</code> + xxx</td><td>Set and append settings</td></tr><tr><td><code>…s</code> + xxx <em>(plural)</em></td><td>Support multi-parameters, .e.g：<code>add_files(&quot;*.c&quot;, &quot;test.cpp&quot;)</code></td></tr><tr><td><code>on_</code> + xxx</td><td>Set and override builtin script</td></tr><tr><td><code>before_</code> + xxx</td><td>Set and run this script before running builtin-script</td></tr><tr><td><code>after_</code> + xxx</td><td>Set and run this script after running builtin-script</td></tr><tr><td><code>scope(&quot;name&quot;)</code></td><td>Define a description scope, .e.g <code>target(&quot;xxx&quot;)</code>, <code>option(&quot;xxx&quot;)</code></td></tr><tr><td>scope/settings</td><td>Indentation with spaces</td></tr></tbody></table>',4)]))}const f=e(i,[["render",a]]);export{l as __pageData,f as default};