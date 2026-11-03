var e=`<p>官方地址：<a href="https://smartboot.tech/">smartboot 开源组织</a></p>
<p>gitee 开源地址：<a href="https://gitee.com/smartboot/smart-socket">smart-socket</a></p>
<h2 id="介绍" tabindex="-1">介绍 <a class="heading-anchor" href="#介绍" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>smart-socket 是一款100%自研的国产开源通信框架，通过强化 AIO 的实现使其有着超越各大语言的通信性能和稳定性。</p>
<p>可以看到smart-socket是一款通信框架，通信框架中netty是我们最常用也是经常听别人讲起的，它是基于NIO开发的优秀的框架，其大而全的功能，基本覆盖了我们开发中的方法面面。</p>
<p>放眼国内开源市场，国人自主研发的通信框架有我们前面介绍的<a href="/posts/tio-official-guide">t-io</a>,还有本次的主角smart-socket，这两个框架都是基于AIO实现的，孰优孰劣全凭你的选择。</p>
<p>那么现在跟随官方的案子，一起熟悉下smart-socket的使用吧。</p>
<h2 id="官方快速入门" tabindex="-1">官方快速入门 <a class="heading-anchor" href="#官方快速入门" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="引入依赖" tabindex="-1">引入依赖 <a class="heading-anchor" href="#引入依赖" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">xml</div><pre class="hljs"><code><span class="hljs-tag">&lt;<span class="hljs-name">dependencies</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.smartboot.socket<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>aio-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.5.38<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependencies</span>&gt;</span>
</code></pre></div><h3 id="定义通信协议" tabindex="-1">定义通信协议 <a class="heading-anchor" href="#定义通信协议" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-keyword">import</span> org.smartboot.socket.Protocol;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.AioSession;

<span class="hljs-keyword">import</span> java.nio.ByteBuffer;
<span class="hljs-comment">/**
 * 通信协议-传输字符串
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">StringProtocol</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Protocol</span>&lt;String&gt; {

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">String</span> <span class="hljs-title function_">decode</span><span class="hljs-params">(ByteBuffer readBuffer, AioSession session)</span> {
		<span class="hljs-comment">// 此缓冲区中剩余的元素数</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">remaining</span> <span class="hljs-operator">=</span> readBuffer.remaining();
		<span class="hljs-comment">// 小于4个字节，</span>
        <span class="hljs-comment">// 因为消息的格式是：消息长度 + 消息内容，</span>
        <span class="hljs-comment">// 消息长度在ByteBuffer中使用的writeBuffer.writeInt写入的int类型的消息长度，int占4个字节，所以这里先判断是否够4个字节</span>
        <span class="hljs-keyword">if</span> (remaining &lt; Integer.BYTES) {
			System.out.println(<span class="hljs-string">&quot;消息太短了，长度：&quot;</span> + remaining);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
        readBuffer.mark();
		
		<span class="hljs-comment">// 获取body长度</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">length</span> <span class="hljs-operator">=</span> readBuffer.getInt();
		
		 <span class="hljs-comment">// 不够读，直接返回</span>
        <span class="hljs-keyword">if</span> (length &gt; readBuffer.remaining()) {
			System.out.println(<span class="hljs-string">&quot;body长度：&quot;</span>+length+<span class="hljs-string">&quot;,但消息长度：&quot;</span> + msgLength);
            readBuffer.reset();
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
		
		<span class="hljs-comment">// 读取字符串</span>
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">b</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[length];
        readBuffer.get(b);
        readBuffer.mark();
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>(b);
    }
}

</code></pre></div><h3 id="定义服务器" tabindex="-1">定义服务器 <a class="heading-anchor" href="#定义服务器" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-keyword">import</span> org.smartboot.socket.MessageProcessor;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.AioQuickServer;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.WriteBuffer;

<span class="hljs-keyword">import</span> java.io.IOException;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">StringServer</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> IOException {
		<span class="hljs-comment">// 定义消息处理器</span>
        <span class="hljs-type">MessageProcessor</span>&lt;String&gt; <span class="hljs-variable">processor</span> <span class="hljs-operator">=</span> (session, msg) -&gt; {
            System.out.println(<span class="hljs-string">&quot;receive from client: &quot;</span> + msg);
            <span class="hljs-type">WriteBuffer</span> <span class="hljs-variable">outputStream</span> <span class="hljs-operator">=</span> session.writeBuffer();
            <span class="hljs-keyword">try</span> {
                <span class="hljs-type">byte</span>[] <span class="hljs-variable">bytes</span> <span class="hljs-operator">=</span> msg.getBytes();
                outputStream.writeInt(bytes.length);
                outputStream.write(bytes);
            } <span class="hljs-keyword">catch</span> (IOException e) {
                e.printStackTrace();
            }
        };

		<span class="hljs-comment">// 创建服务端，传参依次为：端口号，通信协议，消息处理器</span>
        <span class="hljs-type">AioQuickServer</span> <span class="hljs-variable">server</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AioQuickServer</span>(<span class="hljs-number">8888</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringProtocol</span>(), processor);
        server.start();
    }
}

</code></pre></div><h3 id="定义客户端" tabindex="-1">定义客户端 <a class="heading-anchor" href="#定义客户端" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-keyword">import</span> org.smartboot.socket.MessageProcessor;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.AioQuickClient;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.AioSession;
<span class="hljs-keyword">import</span> org.smartboot.socket.transport.WriteBuffer;

<span class="hljs-keyword">import</span> java.io.IOException;

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">StringClient</span> {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> IOException {
		<span class="hljs-comment">// 消息处理器</span>
        <span class="hljs-type">MessageProcessor</span>&lt;String&gt; <span class="hljs-variable">processor</span> <span class="hljs-operator">=</span> (session, msg) -&gt; System.out.println(<span class="hljs-string">&quot;receive from server: &quot;</span> + msg);
        
		<span class="hljs-comment">// 链接到服务端</span>
		<span class="hljs-type">AioQuickClient</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AioQuickClient</span>(<span class="hljs-string">&quot;localhost&quot;</span>, <span class="hljs-number">8888</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringProtocol</span>(), processor);
		<span class="hljs-comment">// 获取链接seession</span>
        <span class="hljs-type">AioSession</span> <span class="hljs-variable">session</span> <span class="hljs-operator">=</span> client.start();
		
		<span class="hljs-comment">// 发送消息</span>
        <span class="hljs-type">WriteBuffer</span> <span class="hljs-variable">writeBuffer</span> <span class="hljs-operator">=</span> session.writeBuffer();
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">data</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello smart-socket&quot;</span>.getBytes();
        writeBuffer.writeInt(data.length);
        writeBuffer.write(data);
        writeBuffer.flush();
    }
}

</code></pre></div><h2 id="加强版入门" tabindex="-1">加强版入门 <a class="heading-anchor" href="#加强版入门" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p>官方官网提供的入门示例太简陋了，不足以用于正式环境，所以大佬提供了些许example，对应git地址为：
<a href="https://gitee.com/smartboot/smart-socket/tree/master/example">https://gitee.com/smartboot/smart-socket/tree/master/example</a></p>
<p>本人根据example自己发挥了一下，有了此加强版，供君参考。</p>
<h3 id="依赖变化" tabindex="-1">依赖变化 <a class="heading-anchor" href="#依赖变化" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<div class="code-block"><pre class="hljs"><code>### 引入依赖
\`\`\`xml
&lt;dependencies&gt;
    &lt;dependency&gt;
		&lt;groupId&gt;org.smartboot.socket&lt;/groupId&gt;
		&lt;artifactId&gt;aio-pro&lt;/artifactId&gt;
		&lt;version&gt;1.5.43&lt;/version&gt;
	&lt;/dependency&gt;
&lt;/dependencies&gt;
</code></pre></div><h3 id="通信协议" tabindex="-1">通信协议 <a class="heading-anchor" href="#通信协议" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>没有变化，参考之前的。</p>
<h3 id="增加服务端消息处理器" tabindex="-1">增加服务端消息处理器 <a class="heading-anchor" href="#增加服务端消息处理器" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>1、新增了自定义MyServerMessageProcessor服务端消息处理器，继承于AbstractMessageProcessor，
AbstractMessageProcessor消息处理类是官方提供的，用于扩展MessageProcessor的抽象类。</p>
<p>2、相比MessageProcessor接口，AbstractMessageProcessor抽象类可以增加官方提供的一些插件，也可以增加自定义的一些插件。</p>
<p>3、同时，保存了每次客户端的session到map中，当建立连接就把seession保存到map，断开就移除，保存或者移除依靠的就是stateEvent0事件通知方法。</p>
<p>4、增加addBlackListPlugin（黑名单处理插件）、addMonitorPlugin（监控插件）方法，更方便的调用，启动插件。</p>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code>
<span class="hljs-comment">/**
 * 服务端消息处理
 * <span class="hljs-doctag">@param</span> &lt;T&gt;
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyServerMessageProcessor</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">AbstractMessageProcessor</span>&lt;T&gt; {
    <span class="hljs-keyword">public</span> <span class="hljs-type">Map</span>&lt;String, AioSession&gt; <span class="hljs-variable">sessionMap</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();

    <span class="hljs-type">private</span> <span class="hljs-title function_">MyServerMessageProcessor</span><span class="hljs-params">()</span>{}

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">MyServerMessageProcessor</span> <span class="hljs-title function_">getInstance</span><span class="hljs-params">()</span>{
        <span class="hljs-keyword">return</span> MyServerMessageProcessor.LazyHolder.INSTANCE;
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">LazyHolder</span> {
        <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">MyServerMessageProcessor</span>&lt;String&gt; <span class="hljs-variable">INSTANCE</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MyServerMessageProcessor</span>&lt;&gt;();
    }


    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">process0</span><span class="hljs-params">(AioSession aioSession, Object msg)</span> {
        System.out.println(<span class="hljs-string">&quot;receive from client: &quot;</span> + msg);

        <span class="hljs-comment">// 回个消息</span>
        <span class="hljs-type">WriteBuffer</span> <span class="hljs-variable">writeBuffer</span> <span class="hljs-operator">=</span> aioSession.writeBuffer();
        <span class="hljs-type">String</span> <span class="hljs-variable">message</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;俺收到你的消息了：&quot;</span> + msg;
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">bytes</span> <span class="hljs-operator">=</span> message.getBytes();
        <span class="hljs-keyword">try</span> {
            writeBuffer.writeInt(bytes.length);
            writeBuffer.write(bytes);
        } <span class="hljs-keyword">catch</span> (IOException e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(e);
        }
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">stateEvent0</span><span class="hljs-params">(AioSession aioSession, StateMachineEnum stateMachineEnum, Throwable throwable)</span> {
        <span class="hljs-keyword">switch</span> (stateMachineEnum) {
            <span class="hljs-comment">/**
             * 连接已建立并构建Session对象
             */</span>
            <span class="hljs-keyword">case</span> NEW_SESSION:
                System.out.println(<span class="hljs-string">&quot;回调状态：蓝上了&quot;</span>);
                sessionMap.put(aioSession.getSessionID(), aioSession);
                <span class="hljs-keyword">break</span>;

            <span class="hljs-comment">/**
             * 读通道已被关闭。
             * &lt;p&gt;
             * 通常由以下几种情况会触发该状态：
             * &lt;ol&gt;
             * &lt;li&gt;对端主动关闭write通道，致使本通常满足了EOF条件&lt;/li&gt;
             * &lt;li&gt;当前AioSession处理完读操作后检测到自身正处于{<span class="hljs-doctag">@link</span> StateMachineEnum#SESSION_CLOSING}状态&lt;/li&gt;
             * &lt;/ol&gt;
             * &lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> INPUT_SHUTDOWN:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">/**
             * 业务处理异常。
             * &lt;p&gt;执行{<span class="hljs-doctag">@link</span> MessageProcessor#process(AioSession, Object)}期间发生未捕获的异常。&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> PROCESS_EXCEPTION:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;

            <span class="hljs-comment">/**
             * 协议解码异常。
             * &lt;p&gt;执行{<span class="hljs-doctag">@link</span> Protocol#decode(ByteBuffer, AioSession)}期间发生未捕获的异常。&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> DECODE_EXCEPTION:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">/**
             * 读操作异常。
             *
             * &lt;p&gt;在底层服务执行read操作期间因发生异常情况触发了{<span class="hljs-doctag">@link</span> java.nio.channels.CompletionHandler#failed(Throwable, Object)}。&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> INPUT_EXCEPTION:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">/**
             * 写操作异常。
             * &lt;p&gt;在底层服务执行write操作期间因发生异常情况触发了{<span class="hljs-doctag">@link</span> java.nio.channels.CompletionHandler#failed(Throwable, Object)}。&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> OUTPUT_EXCEPTION:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">/**
             * 会话正在关闭中。
             *
             * &lt;p&gt;执行了{<span class="hljs-doctag">@link</span> AioSession#close(boolean false)}方法，并且当前还存在待输出的数据。&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> SESSION_CLOSING:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
            <span class="hljs-comment">/**
             * 会话关闭成功。
             *
             * &lt;p&gt;AioSession关闭成功&lt;/p&gt;
             */</span>
            <span class="hljs-keyword">case</span> SESSION_CLOSED:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;

            <span class="hljs-comment">/**
             * 拒绝接受连接,仅Server端有效
             */</span>
            <span class="hljs-keyword">case</span> REJECT_ACCEPT:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;

            <span class="hljs-comment">/**
             * 服务端接受连接异常
             */</span>
            <span class="hljs-keyword">case</span> ACCEPT_EXCEPTION:
                System.out.println(<span class="hljs-string">&quot;回调状态：&quot;</span> + stateMachineEnum.name());
                <span class="hljs-keyword">break</span>;
        }

        <span class="hljs-keyword">if</span> (stateMachineEnum.equals(StateMachineEnum.SESSION_CLOSED) || stateMachineEnum.equals(StateMachineEnum.REJECT_ACCEPT)) {
            <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> != aioSession) {
                System.out.println(<span class="hljs-string">&quot;移除连接：&quot;</span> + aioSession.getSessionID());
                sessionMap.remove(aioSession.getSessionID());
            }
        }

        System.out.println(<span class="hljs-string">&quot;在线的会话：&quot;</span> + sessionMap.size());
    }

    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">addMonitorPlugin</span><span class="hljs-params">(<span class="hljs-type">int</span> monitorInterval)</span>{
        MyServerMessageProcessor.getInstance().addPlugin(<span class="hljs-keyword">new</span> <span class="hljs-title class_">MonitorPlugin</span>&lt;&gt;(monitorInterval));
    }

    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">addBlackListPlugin</span><span class="hljs-params">(List&lt;String&gt; blackIpList)</span>{
        <span class="hljs-type">BlackListPlugin</span> <span class="hljs-variable">blackListPlugin</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BlackListPlugin</span>&lt;&gt;();
        blackListPlugin.addRule((address) -&gt; {
            <span class="hljs-type">String</span> <span class="hljs-variable">ip</span> <span class="hljs-operator">=</span> address.getAddress().getHostAddress();
            <span class="hljs-keyword">return</span> !blackIpList.contains(ip);
        });
        MyServerMessageProcessor.getInstance().addPlugin(blackListPlugin);
    }
}
</code></pre></div><h3 id="服务端启动程序" tabindex="-1">服务端启动程序 <a class="heading-anchor" href="#服务端启动程序" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>1、增加了上面的自定义消息处理类，服务端启动就简单快捷了，只需要调用MyServerMessageProcessor.getInstance() 就可以获取到消息处理类的单例实例对象了。</p>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SmartStringServer</span> {
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> IOException {
        <span class="hljs-type">MyServerMessageProcessor</span>&lt;String&gt; <span class="hljs-variable">messageProcessor</span> <span class="hljs-operator">=</span> MyServerMessageProcessor.getInstance();
        <span class="hljs-comment">// 服务器运行状态监控插件</span>
        messageProcessor.addPlugin(<span class="hljs-keyword">new</span> <span class="hljs-title class_">MonitorPlugin</span>());
        <span class="hljs-comment">// 增加黑名单</span>
<span class="hljs-comment">//        BlackListPlugin&lt;String&gt; objectBlackListPlugin = new BlackListPlugin&lt;&gt;();</span>
<span class="hljs-comment">//        objectBlackListPlugin.addRule((accept -&gt; {</span>
<span class="hljs-comment">//            return accept.getAddress().equals(&quot;127.0.0.1&quot;);</span>
<span class="hljs-comment">//        }));</span>
<span class="hljs-comment">//        msgProcessor.addPlugin(objectBlackListPlugin);</span>

        <span class="hljs-comment">// 码流监测插件 通信调试无需安装 wireshark，smart-socket 自带码流监控插件。</span>
        msgProcessor.addPlugin(<span class="hljs-keyword">new</span> <span class="hljs-title class_">StreamMonitorPlugin</span>&lt;&gt;());

        <span class="hljs-type">AioQuickServer</span> <span class="hljs-variable">aioQuickServer</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">AioQuickServer</span>(<span class="hljs-number">7890</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringProtocol</span>(), messageProcessor);
        aioQuickServer.start();
    }
}
</code></pre></div><h3 id="增加客户端消息处理器" tabindex="-1">增加客户端消息处理器 <a class="heading-anchor" href="#增加客户端消息处理器" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>1、这里采用和服务端类似的处理方式，把客户端消息处理器也提取到一个类里面。</p>
<p>2、增加自定义的心跳处理插件、自动重连处理方法</p>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code><span class="hljs-comment">/**
 * 客户端消息处理
 * <span class="hljs-doctag">@param</span> &lt;T&gt;
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">MyClientMessageProcessor</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">AbstractMessageProcessor</span>&lt;T&gt; {

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> AioSession session;
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> AioQuickClient client;

    <span class="hljs-type">private</span> <span class="hljs-title function_">MyClientMessageProcessor</span><span class="hljs-params">()</span>{}

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">MyClientMessageProcessor</span> <span class="hljs-title function_">getInstance</span><span class="hljs-params">()</span>{
        <span class="hljs-keyword">return</span> LazyHolder.INSTANCE;
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">LazyHolder</span> {
        <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">MyClientMessageProcessor</span>&lt;String&gt; <span class="hljs-variable">INSTANCE</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MyClientMessageProcessor</span>&lt;&gt;();
    }

    <span class="hljs-comment">/**
     * 处理接收到的消息
     *
     * <span class="hljs-doctag">@param</span> session
     * <span class="hljs-doctag">@param</span> msg
     * <span class="hljs-doctag">@see</span> MessageProcessor#process(AioSession, Object)
     */</span>
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">process0</span><span class="hljs-params">(AioSession session, T msg)</span> {
        System.out.println(<span class="hljs-string">&quot;我是客户端，收到消息：&quot;</span> + msg);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">stateEvent0</span><span class="hljs-params">(AioSession aioSession, StateMachineEnum stateMachineEnum, Throwable throwable)</span> {

    }

    <span class="hljs-comment">/**
     * 增加心跳插件
     * <span class="hljs-doctag">@param</span> heartRate 心跳触发频率
     * <span class="hljs-doctag">@param</span> timeout   消息超时时间，单位：秒
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">addHeartPlugin</span><span class="hljs-params">(<span class="hljs-type">int</span> heartRate, <span class="hljs-type">int</span> timeout)</span>{
        <span class="hljs-type">HeartPlugin</span>&lt;String&gt; <span class="hljs-variable">stringHeartPlugin</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HeartPlugin</span>&lt;String&gt;(heartRate, timeout, TimeUnit.SECONDS) {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">sendHeartRequest</span><span class="hljs-params">(AioSession aioSession)</span> <span class="hljs-keyword">throws</span> IOException {
                <span class="hljs-type">WriteBuffer</span> <span class="hljs-variable">writeBuffer</span> <span class="hljs-operator">=</span> aioSession.writeBuffer();
                <span class="hljs-type">byte</span>[] <span class="hljs-variable">content</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;heart message&quot;</span>.getBytes();
                writeBuffer.writeInt(content.length);
                writeBuffer.write(content);
            }
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-type">boolean</span> <span class="hljs-title function_">isHeartMessage</span><span class="hljs-params">(AioSession aioSession, String msg)</span> {
                <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;heart message&quot;</span>.equals(msg);
            }
        };
        MyClientMessageProcessor.getInstance().addPlugin(stringHeartPlugin);
    }

    <span class="hljs-comment">/**
     * 自动重连
     * <span class="hljs-doctag">@param</span> reconnectInterval
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">autoReconnect</span><span class="hljs-params">(<span class="hljs-type">long</span> reconnectInterval)</span>{
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Thread</span>(() -&gt; {
            System.out.println(<span class="hljs-string">&quot;启动连接监测&quot;</span>);
            <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
                <span class="hljs-keyword">if</span> (session == <span class="hljs-literal">null</span> || session.isInvalid()) {
                    System.out.println(<span class="hljs-string">&quot;连接异常，准备重连...&quot;</span>);
                    connect();
                } <span class="hljs-keyword">else</span> {
                    System.out.println(<span class="hljs-string">&quot;连接正常...&quot;</span>);
                }

                <span class="hljs-keyword">try</span> {
                    Thread.sleep(reconnectInterval);
                } <span class="hljs-keyword">catch</span> (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },<span class="hljs-string">&quot;Reconnect-Thread&quot;</span>).start();
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">connect</span><span class="hljs-params">()</span> {
        <span class="hljs-keyword">try</span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-literal">null</span> != client){
                System.out.println(<span class="hljs-string">&quot;关闭旧客户端&quot;</span>);
                client.shutdownNow();
            }
            client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AioQuickClient</span>(<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-number">7890</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringProtocol</span>(), MyClientMessageProcessor.getInstance());
            session = client.start();
            System.out.println(<span class="hljs-string">&quot;客户端连接成功&quot;</span>);
        }<span class="hljs-keyword">catch</span> (Exception e){
            System.out.println(<span class="hljs-string">&quot;启动客户端异常： &quot;</span> + e.getMessage());
            <span class="hljs-keyword">if</span>(<span class="hljs-literal">null</span> != client){
                client.shutdownNow();
            }
        }
    }
}
</code></pre></div><h3 id="客户端服务" tabindex="-1">客户端服务 <a class="heading-anchor" href="#客户端服务" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>1、客户端处理逻辑很简单，有两个常量配置，是否自动重连和重连间隔时间。</p>
<p>2、MyClientMessageProcessor.session 表示本客户端的连接session
，同时客户端对象也被放到了MyClientMessageProcessor.client中。</p>
<div class="code-block"><div class="code-block__lang">java</div><pre class="hljs"><code>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">SmartStringClient</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">boolean</span> <span class="hljs-variable">reconnect</span> <span class="hljs-operator">=</span> <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">long</span> <span class="hljs-variable">reconnectInterval</span> <span class="hljs-operator">=</span> <span class="hljs-number">5000</span>;

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> MyClientMessageProcessor&lt;String&gt; messageProcessor;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> <span class="hljs-keyword">throws</span> IOException {
        messageProcessor = MyClientMessageProcessor.getInstance();

        <span class="hljs-comment">// 自动重连</span>
        <span class="hljs-keyword">if</span>(reconnect){
            messageProcessor.autoReconnect(reconnectInterval);
        }

        <span class="hljs-comment">// 心跳插件</span>
        messageProcessor.addHeartPlugin(<span class="hljs-number">5</span>,<span class="hljs-number">10</span>);

        MyClientMessageProcessor.client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AioQuickClient</span>(<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-number">7890</span>, <span class="hljs-keyword">new</span> <span class="hljs-title class_">StringProtocol</span>(), messageProcessor);
        MyClientMessageProcessor.session = MyClientMessageProcessor.client.start();


        <span class="hljs-type">WriteBuffer</span> <span class="hljs-variable">writeBuffer</span> <span class="hljs-operator">=</span> MyClientMessageProcessor.session.writeBuffer();
        <span class="hljs-type">String</span> <span class="hljs-variable">message</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello smartSocket&quot;</span>;
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">buffer</span> <span class="hljs-operator">=</span> message.getBytes();
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
            writeBuffer.writeInt(buffer.length);
            writeBuffer.write(buffer);
            writeBuffer.flush();
        }

    }
}
</code></pre></div>`,t=[{id:`介绍`,text:`介绍`,level:2,children:[]},{id:`官方快速入门`,text:`官方快速入门`,level:2,children:[{id:`引入依赖`,text:`引入依赖`,level:3,children:[]},{id:`定义通信协议`,text:`定义通信协议`,level:3,children:[]},{id:`定义服务器`,text:`定义服务器`,level:3,children:[]},{id:`定义客户端`,text:`定义客户端`,level:3,children:[]}]},{id:`加强版入门`,text:`加强版入门`,level:2,children:[{id:`依赖变化`,text:`依赖变化`,level:3,children:[]},{id:`通信协议`,text:`通信协议`,level:3,children:[]},{id:`增加服务端消息处理器`,text:`增加服务端消息处理器`,level:3,children:[]},{id:`服务端启动程序`,text:`服务端启动程序`,level:3,children:[]},{id:`增加客户端消息处理器`,text:`增加客户端消息处理器`,level:3,children:[]},{id:`客户端服务`,text:`客户端服务`,level:3,children:[]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};