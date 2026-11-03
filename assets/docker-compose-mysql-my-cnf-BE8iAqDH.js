var e=`<p>今天使用docker-compose 部署mysql的时候，发现配置了my.cnf中的端口为23306,但是mysql容器启动的时候还是3306端口启动。</p>
<h2 id="部署情况" tabindex="-1">部署情况 <a class="heading-anchor" href="#部署情况" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="docker-composeyaml" tabindex="-1">docker-compose.yaml <a class="heading-anchor" href="#docker-composeyaml" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">yaml</div><pre class="hljs"><code><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3.9&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">mysql:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">mysql:5.7</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">always</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">mysql</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">TZ=Asia/Shanghai</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MYSQL_ROOT_PASSWORD=123456</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/etc/localtime:/etc/localtime:ro</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/data/mysql/config/my.cnf:/etc/mysql/my.cnf</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/data/mysql/datadir:/var/lib/mysql</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">23306</span><span class="hljs-string">:23306</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">&quot;host&quot;</span>
</code></pre></div><h3 id="mycnf" tabindex="-1">my.cnf <a class="heading-anchor" href="#mycnf" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><pre class="hljs"><code>[mysqld]

lower_case_table_names=1
port=23306
</code></pre></div><h3 id="启动docker容器" tabindex="-1">启动docker容器 <a class="heading-anchor" href="#启动docker容器" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>docker-compose up -d
</code></pre></div><p>启动后端口是默认的3306，检查配置也没有问题，最后在百度上找到了这个答案：
<a href="https://www.cnblogs.com/CUCKOO0615/p/13605416.html">CentOS修改MySQL端口号的方法，以及修改后不生效的问题</a></p>
<p>作者提示说是因为宿主机映射的my.cnf 有写权限，所以造成不生效。需要运行下面命令去掉写权限</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>chmod a-w my.cnf

然后ll看一下：
-r-xr-xr-x 1 root root 45 1月   3 09:55 my.cnf
</code></pre></div><p>这时再重启run容器，端口就变成了23306</p>
`,t=[{id:`部署情况`,text:`部署情况`,level:2,children:[{id:`docker-composeyaml`,text:`docker-compose.yaml`,level:3,children:[]},{id:`mycnf`,text:`my.cnf`,level:3,children:[]},{id:`启动docker容器`,text:`启动docker容器`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};