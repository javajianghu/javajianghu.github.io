var e=`<h2 id="安装" tabindex="-1">安装 <a class="heading-anchor" href="#安装" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>使用的kafka自带的kraft启动服务，这样就不依赖zookeeper进行集群管理和数据存储了。</p>
<p>docker-compose.yaml 文件如下，执行前先创建好\${PWD}/data文件夹，并赋予777权限</p>
<div class="code-block"><div class="code-block__lang">yaml</div><pre class="hljs"><code><span class="hljs-attr">version:</span> <span class="hljs-string">&#x27;3&#x27;</span>
<span class="hljs-attr">services:</span>
  <span class="hljs-attr">kafka:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">&#x27;bitnami/kafka:3.7.0&#x27;</span>
    <span class="hljs-attr">container_name:</span> <span class="hljs-string">kafka</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">\${PWD}/data:/bitnami/kafka/data</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_NODE_ID=0</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_PROCESS_ROLES=controller,broker</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://192.168.132.131:9092</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER</span>
    <span class="hljs-attr">ports:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;9092:9092&#x27;</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;9093:9093&#x27;</span>
</code></pre></div><h2 id="基础使用" tabindex="-1">基础使用 <a class="heading-anchor" href="#基础使用" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="命令行方式" tabindex="-1">命令行方式 <a class="heading-anchor" href="#命令行方式" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>进入到容器的kafka/bin目录下</p>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>docker exec -it kafka bash
cd /opt/bitnami/kafka/bin
</code></pre></div><h4 id="获取当前topic列表" tabindex="-1">获取当前topic列表 <a class="heading-anchor" href="#获取当前topic列表" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>sh kafka-topics.sh --bootstrap-server 192.168.132.131:9092 --list 
</code></pre></div><h4 id="创建topic" tabindex="-1">创建topic <a class="heading-anchor" href="#创建topic" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">shell</div><pre class="hljs"><code>sh kafka-topics.sh --bootstrap-server 192.168.132.131:9092 --create --replication-factor 1 --partitions 1 --topic DEMO_01

replication-factor 副本数量，表示每个主题在 Kafka 集群中保留的副本数量。
partitions 分区数量，分区是 Kafka 中用于将数据分散存储在多个节点上的机制

这里都写成1，生产使用可根据具体情况设置
</code></pre></div><h3 id="代码方式" tabindex="-1">代码方式 <a class="heading-anchor" href="#代码方式" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="pom依赖" tabindex="-1">pom依赖 <a class="heading-anchor" href="#pom依赖" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">xml</div><pre class="hljs"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-web<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.kafka<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-kafka<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
</code></pre></div><h4 id="applicationyaml" tabindex="-1">application.yaml <a class="heading-anchor" href="#applicationyaml" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">yaml</div><pre class="hljs"><code>
<span class="hljs-comment"># 应用服务 WEB 访问端口</span>
<span class="hljs-attr">server.port:</span> <span class="hljs-number">8080</span>

<span class="hljs-attr">spring:</span>
  <span class="hljs-attr">kafka:</span>
    <span class="hljs-attr">bootstrap-servers:</span> <span class="hljs-number">192.168</span><span class="hljs-number">.132</span><span class="hljs-number">.131</span><span class="hljs-string">:9092</span>
    <span class="hljs-attr">producer:</span>
      <span class="hljs-attr">acks:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># 0-不应答。1-leader 应答。all-所有 leader 和 follower 应答。</span>
      <span class="hljs-attr">retries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># 重试次数</span>
      <span class="hljs-attr">key-serializer:</span> <span class="hljs-string">org.apache.kafka.common.serialization.StringSerializer</span>
      <span class="hljs-attr">value-serializer:</span> <span class="hljs-string">org.springframework.kafka.support.serializer.JsonSerializer</span> <span class="hljs-comment"># 消息的 value 的序列化</span>
    <span class="hljs-attr">consumer:</span>
      <span class="hljs-attr">auto-offset-reset:</span> <span class="hljs-string">earliest</span> <span class="hljs-comment"># 设置消费者分组最初的消费进度为 earliest</span>
      <span class="hljs-attr">key-deserializer:</span> <span class="hljs-string">org.apache.kafka.common.serialization.StringDeserializer</span>
      <span class="hljs-attr">value-deserializer:</span> <span class="hljs-string">org.springframework.kafka.support.serializer.JsonDeserializer</span> <span class="hljs-comment"># 消息的 value 的反序列化</span>
      <span class="hljs-attr">properties:</span>
        <span class="hljs-attr">spring.json.trusted.packages:</span> <span class="hljs-string">top.sintang.kafkademo.domain</span>
    <span class="hljs-attr">listener:</span>
      <span class="hljs-comment"># ack-mode: manual_immediate # 手动确认消息消费</span>
      <span class="hljs-attr">missing-topics-fatal:</span> <span class="hljs-literal">false</span> <span class="hljs-comment"># 消费者组中不存在 topic 时是否报错</span>
</code></pre></div><h3 id="kafkaconfigjava" tabindex="-1">kafkaConfig.java <a class="heading-anchor" href="#kafkaconfigjava" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">KafkaConfig</span> {

    <span class="hljs-meta">@Value(&quot;\${spring.kafka.bootstrap-servers}&quot;)</span>
    <span class="hljs-keyword">private</span> String bootstrapServers;


    <span class="hljs-meta">@Bean</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">KafkaAdmin</span> <span class="hljs-title function_">kafkaAdmin</span><span class="hljs-params">()</span>{
        <span class="hljs-type">Map</span>&lt;String, Object&gt; <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">KafkaAdmin</span>(config);
    }
}
</code></pre></div><h4 id="使用代码获取topic列表" tabindex="-1">使用代码获取topic列表 <a class="heading-anchor" href="#使用代码获取topic列表" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code>    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> KafkaAdmin kafkaAdmin;

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">showTopicList</span><span class="hljs-params">()</span>{
        <span class="hljs-type">AdminClient</span> <span class="hljs-variable">adminClient</span> <span class="hljs-operator">=</span> AdminClient.create(kafkaAdmin.getConfigurationProperties());
        <span class="hljs-type">ListTopicsResult</span> <span class="hljs-variable">listTopicsResult</span> <span class="hljs-operator">=</span> adminClient.listTopics();
        <span class="hljs-keyword">try</span> {
            listTopicsResult.names().get().forEach(System.out::println);
        } <span class="hljs-keyword">catch</span> (InterruptedException e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(e);
        } <span class="hljs-keyword">catch</span> (ExecutionException e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(e);
        }

    }
</code></pre></div><h4 id="使用代码创建topic" tabindex="-1">使用代码创建topic <a class="heading-anchor" href="#使用代码创建topic" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code>    <span class="hljs-meta">@Autowired</span>
    <span class="hljs-keyword">private</span> KafkaAdmin kafkaAdmin;

    <span class="hljs-meta">@Test</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">test</span><span class="hljs-params">()</span>{
        kafkaAdmin.createOrModifyTopics(<span class="hljs-keyword">new</span> <span class="hljs-title class_">NewTopic</span>(<span class="hljs-string">&quot;DEMO_02&quot;</span>,<span class="hljs-number">1</span>, (<span class="hljs-type">short</span>) <span class="hljs-number">1</span>));
    }

</code></pre></div><p>本文代码：
<a href="https://github.com/javajianghu/javajianghu-code/tree/main/kafka/kafka-demo">https://github.com/javajianghu/javajianghu-code/tree/main/kafka/kafka-demo</a></p>
`,t=[{id:`安装`,text:`安装`,level:2,children:[]},{id:`基础使用`,text:`基础使用`,level:2,children:[{id:`命令行方式`,text:`命令行方式`,level:3,children:[{id:`获取当前topic列表`,text:`获取当前topic列表`,level:4,children:[]},{id:`创建topic`,text:`创建topic`,level:4,children:[]}]},{id:`代码方式`,text:`代码方式`,level:3,children:[{id:`pom依赖`,text:`pom依赖`,level:4,children:[]},{id:`applicationyaml`,text:`application.yaml`,level:4,children:[]}]},{id:`kafkaconfigjava`,text:`kafkaConfig.java`,level:3,children:[{id:`使用代码获取topic列表`,text:`使用代码获取topic列表`,level:4,children:[]},{id:`使用代码创建topic`,text:`使用代码创建topic`,level:4,children:[]}]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};