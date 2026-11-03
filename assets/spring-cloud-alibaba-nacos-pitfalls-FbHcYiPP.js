var e=`<h2 id="各模块版本" tabindex="-1">各模块版本 <a class="heading-anchor" href="#各模块版本" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<ul>
<li>spring boot：4.0.8</li>
<li>spring cloud：2025.1.0</li>
<li>spring cloud alibaba：2025.1.0.0</li>
<li>nacos：3.2.4</li>
</ul>
<h2 id="避坑一管理地址变化" tabindex="-1">避坑一：管理地址变化 <a class="heading-anchor" href="#避坑一管理地址变化" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>如果你使用过nacos 2.x 的版本，页面管理页面访问地址为：<a href="http://localhost:8848/nacos">http://localhost:8848/nacos</a>，现在官方默认地址改为：<a href="http://localhost:8080">http://localhost:8080</a>，初次进入需要设置用户名密码。</p>
<h2 id="避坑二nacosmysqlsql文件找不到了" tabindex="-1">避坑二：nacos_mysql.sql文件找不到了 <a class="heading-anchor" href="#避坑二nacosmysqlsql文件找不到了" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>官方的回答是：<a href="https://nacos.io/en/blog/faq/nacos-user-question-history8180/?spm=5238cd80.2ef5001f.0.0.3f613b7cN4D4qI#%E7%94%A8%E6%88%B7%E9%97%AE%E9%A2%98">https://nacos.io/en/blog/faq/nacos-user-question-history8180/?spm=5238cd80.2ef5001f.0.0.3f613b7cN4D4qI#用户问题</a>
简单描述下就是，在Nacos2.x版本中，<code>nacos-mysql.sql</code>文件已被重命名为<code>mysql-schema.sql</code>，因此在<code>nacos/conf</code>目录下直接寻找<code>nacos-mysql.sql</code>会找不到。请检查您的Nacos版本，如果是2.x版本或以上，您应该查找的是<code>mysql-schema.sql</code>文件，它位于相同的<code>nacos/conf</code>目录下。</p>
<p>github上的sql地址为：<a href="https://github.com/alibaba/nacos/blob/develop/plugin-default-impl/nacos-default-datasource-plugin/nacos-datasource-plugin-mysql/src/main/resources/META-INF/mysql-schema.sql">https://github.com/alibaba/nacos/blob/develop/plugin-default-impl/nacos-default-datasource-plugin/nacos-datasource-plugin-mysql/src/main/resources/META-INF/mysql-schema.sql</a></p>
<h2 id="避坑三springboot3以上-bootstrapyaml和-shared-configs不可用" tabindex="-1">避坑三：springboot3以上 bootstrap.yaml和 shared-configs不可用 <a class="heading-anchor" href="#避坑三springboot3以上-bootstrapyaml和-shared-configs不可用" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>由于springboot2.4.0+版本修改，如果需要使用bootstrap.yaml需要引入下面依赖.</p>
<div class="code-block"><div class="code-block__lang">xml</div><pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.cloud<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-cloud-starter-bootstrap<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
</code></pre></div><p>当然也可以去掉,bootstrap.yaml直接使用application.yaml。</p>
<p>同样nacos配置文件，需要使用spring.config.import的方式，shared-configs 不可用了。</p>
<div class="code-block"><pre class="hljs"><code># 下面配置shared-configs不可用了
spring:
  application:
    name: nacos-test
  cloud:
    nacos:
      username: nacos
      password: nacos
      config:
        server-addr: localhost:8848
        # 用于共享的配置文件
        shared-configs:
          - data-id: common.yaml
            group: DEFAULT_GROUP
</code></pre></div><p>新的方式：</p>
<div class="code-block"><pre class="hljs"><code>spring:
  application:
    name: nacos-test
  cloud:
    nacos:
      username: nacos
      password: nacos
      config:
        server-addr: localhost:8848
  config:
	import:
	  # optional的意思是可选配置，如果没有配置不影响启动，nacos表示这个配置在nacos中
    - optional:nacos:common.yaml?group=DEFAULT_GROUP&amp;refreshEnabled=true
</code></pre></div><h2 id="避坑四什么配置都是对的就是无法注册服务" tabindex="-1">避坑四：什么配置都是对的，就是无法注册服务 <a class="heading-anchor" href="#避坑四什么配置都是对的就是无法注册服务" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>当你的nacos-discovery依赖也加了，application.yaml中spring.cloud.nacos.discovery也配置了，但是登录nacos管理后台就是服务就是无法正确注册，那你就要看看是不是你忘记写:spring.application.name了，我就是被这个问题折腾了一下。</p>
<h2 id="最后写了个docker-compose的nacos命令" tabindex="-1">最后，写了个docker-compose的nacos命令 <a class="heading-anchor" href="#最后写了个docker-compose的nacos命令" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>docker-compose.yaml</p>
<div class="code-block"><pre class="hljs"><code>version: '3.9'
services:
  nacos-server:
    image: nacos/nacos-server:v3.2.4
    container_name: nacos-server
    env_file:
      - \${PWD}/nacos-standlone-mysql.env
    volumes:
      - \${PWD}/logs/:/home/nacos/logs
    ports:
      - &quot;8848:8848&quot;
      - &quot;9848:9848&quot;
      - &quot;8080:8080&quot;
    restart: always
</code></pre></div><p>nacos-standlone-mysql.env</p>
<div class="code-block"><pre class="hljs"><code>MODE=standalone  
SPRING_DATASOURCE_PLATFORM=mysql  
MYSQL_SERVICE_HOST=localhost  
MYSQL_SERVICE_DB_NAME=nacos_mysql  
MYSQL_SERVICE_PORT=3306  
MYSQL_SERVICE_USER=root  
MYSQL_SERVICE_PASSWORD=123456  
MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useSSL=false  

# nacos控制台端口
NACOS_CONSOLE_PORT=8080
NACOS_AUTH_ENABLE=true  
NACOS_AUTH_TOKEN=\${记得改我：Nacos 用于生成JWT Token的密钥，使用长度大于32字符的字符串，再经过Base64编码}
NACOS_AUTH_IDENTITY_KEY=\${记得改我：Nacos Server端之间 Inner API的身份标识的Key，必填}
NACOS_AUTH_IDENTITY_VALUE=\${记得改我：Nacos Server端之间 Inner API的身份标识的Value，必填}
</code></pre></div>`,t=[{id:`各模块版本`,text:`各模块版本`,level:2,children:[]},{id:`避坑一管理地址变化`,text:`避坑一：管理地址变化`,level:2,children:[]},{id:`避坑二nacosmysqlsql文件找不到了`,text:`避坑二：nacos_mysql.sql文件找不到了`,level:2,children:[]},{id:`避坑三springboot3以上-bootstrapyaml和-shared-configs不可用`,text:`避坑三：springboot3以上 bootstrap.yaml和 shared-configs不可用`,level:2,children:[]},{id:`避坑四什么配置都是对的就是无法注册服务`,text:`避坑四：什么配置都是对的，就是无法注册服务`,level:2,children:[]},{id:`最后写了个docker-compose的nacos命令`,text:`最后，写了个docker-compose的nacos命令`,level:2,children:[]}],n={html:e,toc:t};export{n as default,e as html,t as toc};