var e=`<h2 id="1-使用docker方式部署nacos" tabindex="-1">1. 使用Docker方式部署Nacos <a class="heading-anchor" href="#1-使用docker方式部署nacos" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>nacos支持单机Derby模式，本文使用的是单机Mysql方式，就是使用外部mysql保存nacos相关数据。</p>
<h3 id="11-docker部署方式" tabindex="-1">1.1. Docker部署方式 <a class="heading-anchor" href="#11-docker部署方式" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="111-准备mysql数据库及sql" tabindex="-1">1.1.1. 准备mysql数据库及sql <a class="heading-anchor" href="#111-准备mysql数据库及sql" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<ol>
<li>到安装好的mysql数据库中，创建好nacos-mysql数据库。<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>CREATE DATABASE \`nacos-mysql\` CHARACTER SET &#x27;utf8mb4&#x27; COLLATE &#x27;utf8mb4_bin&#x27;;
</code></pre></div></li>
<li>下载nacos初始化sql。
<a href="https://github.com/alibaba/nacos/blob/develop/distribution/conf/mysql-schema.sql">点击下载sql文件</a></li>
<li>在nacos-mysql数据库中执行删除下载的sql。</li>
</ol>
<p>至此，基础数据准备完毕。</p>
<h4 id="112-执行docker-run命令启动nacos容器" tabindex="-1">1.1.2. 执行docker run命令启动nacos容器 <a class="heading-anchor" href="#112-执行docker-run命令启动nacos容器" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>docker run -dit \\
--restart=always --network host \\
--name nacos -m 2048M --memory-swap=2048M \\
-v /data/nacos/logs:/home/nacos/logs \\
-e NACOS_APPLICATION_PORT=28848 \\
-e PREFER_HOST_MODE=ip \\
-e MODE=standalone \\
-e SPRING_DATASOURCE_PLATFORM=mysql \\
-e MYSQL_SERVICE_DB_NAME=nacos_mysql \\
-e MYSQL_SERVICE_HOST=localhost \\
-e MYSQL_SERVICE_PORT=3306 \\
-e MYSQL_SERVICE_USER=root \\
-e MYSQL_SERVICE_PASSWORD=123456 \\
nacos/nacos-server:v2.1.1
</code></pre></div><p>参数解释：</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code><span class="hljs-meta prompt_"># </span><span class="language-bash">nacos端口，默认是8848</span>
NACOS_APPLICATION_PORT=28848
PREFER_HOST_MODE=ip
MODE=standalone
<span class="hljs-meta prompt_"># </span><span class="language-bash">数据库类型，指定为mysql</span>
SPRING_DATASOURCE_PLATFORM=mysql
MYSQL_SERVICE_HOST=localhost
<span class="hljs-meta prompt_"># </span><span class="language-bash">数据库名称，保持和上一步创建的数据库名称一致</span>
MYSQL_SERVICE_DB_NAME=nacos_mysql
<span class="hljs-meta prompt_"># </span><span class="language-bash">mysql端口</span>
MYSQL_SERVICE_PORT=3306
<span class="hljs-meta prompt_"># </span><span class="language-bash">mysql用户名</span>
MYSQL_SERVICE_USER=root
<span class="hljs-meta prompt_"># </span><span class="language-bash">mysql密码</span>
MYSQL_SERVICE_PASSWORD=123456
MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useSSL=false
</code></pre></div><h3 id="12-验证" tabindex="-1">1.2. 验证 <a class="heading-anchor" href="#12-验证" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>浏览器输入：
<a href="http://x.x.x.x:28848/nacos">http://x.x.x.x:28848/nacos</a>     x.x.x.x 是部署nacos的那台服务器地址
输入默认用户名、密码：nacos</p>
`,t=[{id:`1-使用docker方式部署nacos`,text:`1. 使用Docker方式部署Nacos`,level:2,children:[{id:`11-docker部署方式`,text:`1.1. Docker部署方式`,level:3,children:[{id:`111-准备mysql数据库及sql`,text:`1.1.1. 准备mysql数据库及sql`,level:4,children:[]},{id:`112-执行docker-run命令启动nacos容器`,text:`1.1.2. 执行docker run命令启动nacos容器`,level:4,children:[]}]},{id:`12-验证`,text:`1.2. 验证`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};