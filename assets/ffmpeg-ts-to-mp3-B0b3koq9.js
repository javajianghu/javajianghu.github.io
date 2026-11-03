var e=`<h2 id="11-安装" tabindex="-1">1.1. 安装 <a class="heading-anchor" href="#11-安装" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>首先下载安装包，下载地址如下：</p>
<blockquote>
<p><a href="https://github.com/BtbN/FFmpeg-Builds/releases">https://github.com/BtbN/FFmpeg-Builds/releases</a></p>
</blockquote>
<p>或者</p>
<blockquote>
<p><a href="https://www.gyan.dev/ffmpeg/builds/">https://www.gyan.dev/ffmpeg/builds/</a>
选择： ffmpeg-git-full.7z 下载</p>
</blockquote>
<p>下载完成后解压，并设置环境变量，在命令行使用 ffmpeg 显示如下内容表示成功。</p>
<div class="code-block"><pre class="hljs"><code>ffmpeg version 2023-04-06-git-b564ad8eac-full_build-www.gyan.dev Copyright (c) 2000-2023 the FFmpeg developers
</code></pre></div><h2 id="12-开始转换" tabindex="-1">1.2. 开始转换 <a class="heading-anchor" href="#12-开始转换" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>假如源文件路径为：d:\\1.ts,目标mp3文件路径为：d:\\1.mp3,使用如下命令进行转换</p>
<div class="code-block"><pre class="hljs"><code>ffmpeg -i d:\\\\1.ts -f mp3 d:\\\\1.mp3
</code></pre></div><p>如果觉得转换速度太慢，可以使用多线程的方式,如下使用10个线程同时处理：</p>
<div class="code-block"><pre class="hljs"><code>ffmpeg -i d:\\\\1.ts -threads 10 -preset ultrafast -f mp3 d:\\\\1.mp3
</code></pre></div>`,t=[{id:`11-安装`,text:`1.1. 安装`,level:2,children:[]},{id:`12-开始转换`,text:`1.2. 开始转换`,level:2,children:[]}],n={html:e,toc:t};export{n as default,e as html,t as toc};