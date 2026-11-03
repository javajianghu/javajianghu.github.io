var e=`<h2 id="问题回顾" tabindex="-1">问题回顾 <a class="heading-anchor" href="#问题回顾" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>使用以下docker-compose.yaml启动了mysql容器。</p>
<p>启动成功后，使用free -mh查看宿主机内存占用情况，并用docket stats 查看容器情况，mysql竟然占用了16个G</p>
<h3 id="docker-composeyaml" tabindex="-1">docker-compose.yaml <a class="heading-anchor" href="#docker-composeyaml" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">yaml</div><pre class="hljs"><code><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.9&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">mysql:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">mysql:5.7.29</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">on-failure</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">mysql</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">TZ=Asia/Shanghai</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MYSQL_ROOT_PASSWORD=123456</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/etc/localtime:/etc/localtime:ro</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/config/my.cnf:/etc/mysql/my.cnf</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/data:/var/lib/mysql</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/logs:/usr/local/mysql/log</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">3306</span><span class="hljs-string">:3306</span>
</code></pre></div><h3 id="mycnf-配置" tabindex="-1">my.cnf 配置 <a class="heading-anchor" href="#mycnf-配置" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><pre class="hljs"><code>[mysqld]
lower_case_table_names=1
port=3306
</code></pre></div><h3 id="docker-stats-mysql占用了16g" tabindex="-1">docker stats Mysql占用了16G <a class="heading-anchor" href="#docker-stats-mysql占用了16g" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p><img src="/assets/Snipaste_2024-05-24_10-29-45.png" alt="Mysql占用了16G" loading="lazy"></p>
<h3 id="问题排查" tabindex="-1">问题排查 <a class="heading-anchor" href="#问题排查" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>进入到容器内部</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>docker exec -it mysql
</code></pre></div><p>使用top命令，提示命令不存在，那么执行下面命令，安装top命令</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>apt install procps
</code></pre></div><p>执行top，并按m键，发现只有mysqld这个进程占用内存。
<img src="/assets/Snipaste_2024-05-24_10-54-52.png" alt="mysqld这个进程占用内存" loading="lazy"></p>
<p>这就很奇怪了。</p>
<p>在google下发现了这篇文章。</p>
<p><a href="https://blog.chenwx.top/p/docker-mysql-event1.html"><strong>docker启动mysql时内存占用过多</strong></a></p>
<h2 id="原因分析" tabindex="-1">原因分析： <a class="heading-anchor" href="#原因分析" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>文章指出
<strong>这个问题的直接原因是文件描述符上限太大了;</strong></p>
<h3 id="原文截图" tabindex="-1">原文截图 <a class="heading-anchor" href="#原文截图" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p><img src="/assets/Snipaste_2024-05-24_14-52-20.png" alt="原文截图" loading="lazy"></p>
<p>于是我修改下docker-compose启动脚本</p>
<div class="code-block"><div class="code-block__lang">yaml</div><pre class="hljs"><code><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.9&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">mysql:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">mysql:5.7.29</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">on-failure</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">mysql</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">TZ=Asia/Shanghai</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MYSQL_ROOT_PASSWORD=123456</span>
    <span class="hljs-attr">ulimits:</span>
      <span class="hljs-attr">nproc:</span> <span class="hljs-number">65535</span>
      <span class="hljs-attr">nofile:</span>
        <span class="hljs-attr">soft:</span> <span class="hljs-number">26677</span>
        <span class="hljs-attr">hard:</span> <span class="hljs-number">46677</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/etc/localtime:/etc/localtime:ro</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/config/my.cnf:/etc/mysql/my.cnf</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/data:/var/lib/mysql</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/logs:/usr/local/mysql/log</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">3306</span><span class="hljs-string">:3306</span>
</code></pre></div><p>重新run了容器，发现内存下来了。</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>root@betterme:/data/soft/mysql# free -mh
               total        used        free      shared  buff/cache   available
Mem:            27Gi       2.3Gi        19Gi       7.8Mi       5.2Gi        24Gi
Swap:          8.0Gi          0B       8.0Gi
</code></pre></div>`,t=[{id:`问题回顾`,text:`问题回顾`,level:2,children:[{id:`docker-composeyaml`,text:`docker-compose.yaml`,level:3,children:[]},{id:`mycnf-配置`,text:`my.cnf 配置`,level:3,children:[]},{id:`docker-stats-mysql占用了16g`,text:`docker stats Mysql占用了16G`,level:3,children:[]},{id:`问题排查`,text:`问题排查`,level:3,children:[]}]},{id:`原因分析`,text:`原因分析：`,level:2,children:[{id:`原文截图`,text:`原文截图`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};