var e=`<h2 id="11-安装" tabindex="-1">1.1. 安装 <a class="heading-anchor" href="#11-安装" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code>wget https://dl.influxdata.com/influxdb/releases/influxdb-1.8.0.x86_64.rpm
sudo yum localinstall influxdb-1.8.0.x86_64.rpm
</code></pre></div><h2 id="12-启动" tabindex="-1">1.2. 启动 <a class="heading-anchor" href="#12-启动" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code>systemctl start influxd
</code></pre></div><h2 id="13-检查" tabindex="-1">1.3. 检查 <a class="heading-anchor" href="#13-检查" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code># 查看是否安装成功  
influx -version
</code></pre></div><h2 id="14-创建数据库和用户非必须" tabindex="-1">1.4. 创建数据库和用户（非必须） <a class="heading-anchor" href="#14-创建数据库和用户非必须" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code># 创建数据库，使用influx 命令进入到influxdb命令行
influx
create database telegraf;
use telegraf;

# 下面创建用户名telegraf 密码为telegraf的用户，注意用户名用双引号，密码用单引号
create user &quot;telegraf&quot; with password 'telegraf';
# 输入exit 退出influx命令行
exit
</code></pre></div><h2 id="15-常用配置" tabindex="-1">1.5. 常用配置 <a class="heading-anchor" href="#15-常用配置" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="151-配置文件位置" tabindex="-1">1.5.1. 配置文件位置 <a class="heading-anchor" href="#151-配置文件位置" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<blockquote>
<p>/etc/influxdb/influxdb.conf</p>
</blockquote>
`,t=[{id:`11-安装`,text:`1.1. 安装`,level:2,children:[]},{id:`12-启动`,text:`1.2. 启动`,level:2,children:[]},{id:`13-检查`,text:`1.3. 检查`,level:2,children:[]},{id:`14-创建数据库和用户非必须`,text:`1.4. 创建数据库和用户（非必须）`,level:2,children:[]},{id:`15-常用配置`,text:`1.5. 常用配置`,level:2,children:[{id:`151-配置文件位置`,text:`1.5.1. 配置文件位置`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};