var e=`<p><a href="https://gitee.com/tywo45/t-io">网络编程很苦，用t-io后会很甜</a></p>
<ul>
<li>
<p>极致打磨的底层集群能力，可无缝解决IM、物联网等大型产品的集群需求</p>
</li>
<li>
<p>易学易用，让刚毕业的大学生也能轻易驾驭</p>
</li>
<li>
<p>全方位开箱即用的监控能力</p>
</li>
<li>
<p>实战中仍表现出卓越的性能，不用实验室数据忽悠智慧的大众</p>
</li>
<li>
<p>内置协议适配能力，让多协议接入不再难</p>
</li>
<li>
<p>内置ack消息能力，让RPC等场景轻松实现</p>
</li>
<li>
<p>自创同步锁、同步安全线程池、同步数据结构等工具库，为业务应用提供丰富的开箱即用API</p>
</li>
<li>
<p>内置半包粘包处理</p>
</li>
<li>
<p>丰富的生态，目前已经用t-io实现了http、websocket、mqtt及大量私有协议</p>
</li>
<li>
<p>内置慢攻击防御机制，帮助应用自动拉黑嫌疑IP</p>
</li>
<li>
<p>1.9G内存稳定支持30万TCP长连接：<a href="https://www.tiocloud.com/61">查看实测过程</a></p>
</li>
<li>
<p>t-io跑出每秒1051万条聊天消息：<a href="https://www.tiocloud.com/41">查看实测过程</a></p>
</li>
<li>
<p>netty和t-io对比测试结果：<a href="https://www.tiocloud.com/154">查看实测过程</a></p>
</li>
</ul>
<h2 id="网络编程预备知识" tabindex="-1">网络编程预备知识 <a class="heading-anchor" href="#网络编程预备知识" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="tcpip协议分层模型" tabindex="-1">TCP/IP协议分层模型 <a class="heading-anchor" href="#tcpip协议分层模型" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p><img src="/assets/tio/TCP+IP.png" alt="TCP IP.png" loading="lazy"></p>
<h4 id="应用层" tabindex="-1">应用层 <a class="heading-anchor" href="#应用层" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<ul>
<li>你想用java写一个网络程序，你写的这个程序就是应用层</li>
</ul>
<h4 id="传输层" tabindex="-1">传输层 <a class="heading-anchor" href="#传输层" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<ul>
<li>
<p>传输层只有TCP、UDP两种协议没有其他</p>
</li>
<li>
<p>TCP协议的通信双方，需要知道彼此都在家呆着，且由客户端主动发起连接</p>
</li>
<li>
<p>UDP协议，客户端知道服务器家住在哪，但并不知道服务器在不在家，扔条消息去服务器家，如果服务器不在家这条消息就被丢了</p>
</li>
<li>
<p>应用层把数据丢给传输层后，传输层把数据进行一下包装，包装纸上面写着“源端口、目的端口、序号、确认序号、检验和等TCP自身的数据”</p>
</li>
<li>
<p>传输层把数据给应用层时，会拆开对方的包装纸，应用层只看得到对方应用层发的数据</p>
</li>
</ul>
<h4 id="传输层数据是啥" tabindex="-1">传输层数据是啥 <a class="heading-anchor" href="#传输层数据是啥" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<ul>
<li>
<p>就是应用层的数据带上一张包装纸后的数据</p>
</li>
<li>
<p>这层包装纸就是传输层的元数据或叫头部数据</p>
</li>
<li>
<p>为什么要带包装纸？因为要实名呀，现在快递都要实名了^_^</p>
</li>
</ul>
<h2 id="bytebuffer网络编程前置技能" tabindex="-1">ByteBuffer：网络编程前置技能 <a class="heading-anchor" href="#bytebuffer网络编程前置技能" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h4 id="初识bytebuffer" tabindex="-1">初识ByteBuffer <a class="heading-anchor" href="#初识bytebuffer" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="常用属性" tabindex="-1">常用属性 <a class="heading-anchor" href="#常用属性" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<ul>
<li>
<p>byte[] bytes: 用来存储数据</p>
</li>
<li>
<p>int capacity: 用来表示bytes的容量，那么可以想像capacity就等于bytes.size()，此值在初始化bytes后，是不可变的。</p>
</li>
<li>
<p>int limit: 用来表示bytes实际装了多少数据，可以容易想像得到limit &lt;= capacity，此值是可灵活变动的</p>
</li>
<li>
<p>int position: 用来表示在哪个位置开始往bytes写数据或是读数据，此值是可灵活变动的</p>
</li>
</ul>
<h5 id="常用方法" tabindex="-1">常用方法 <a class="heading-anchor" href="#常用方法" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<ul>
<li>
<p>ByteBuffer allocate(int capacity)：创建容量为xx的ByteBuffer对象</p>
</li>
<li>
<p>put(byte b)：向ByteBuffer写入一个字节</p>
</li>
<li>
<p>position()：获取当前位置</p>
</li>
<li>
<p>position(int position)：设置读取位置，从头就是0</p>
</li>
<li>
<p>byte get()：从当前position的位置读取一个字节的数据，读取后，position位置也会相应位移</p>
</li>
</ul>
<h2 id="半包和粘包正确断句才能沟通" tabindex="-1">半包和粘包：正确断句才能沟通 <a class="heading-anchor" href="#半包和粘包正确断句才能沟通" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h4 id="半包" tabindex="-1">半包 <a class="heading-anchor" href="#半包" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>收到了半个包，这个时候不足以组成一个应用层的包。这个半个包，并不是数据量的一半，而是表示没传传输完成的包。比如：你要对你喜欢的人说“我喜欢你”，但是因为喝水咽着了，第一次只说了“我”字，第二次说了个“喜”字，第三个次了个“欢你”，那么就发生了半包问题。</p>
<h5 id="用http协议为例展示半包场景" tabindex="-1">用http协议为例，展示半包场景 <a class="heading-anchor" href="#用http协议为例展示半包场景" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p><img src="/assets/tio/http%E5%8D%8F%E8%AE%AE%E5%8D%8A%E5%8C%85%E5%9C%BA%E6%99%AF.png" alt="http协议半包场景.png" loading="lazy"></p>
<h4 id="粘包" tabindex="-1">粘包 <a class="heading-anchor" href="#粘包" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>粘包与半包相反，就是把多个想说的话，一口气说完了，对方反应不过来，得把你的话拆开一条一条地理解。</p>
<h5 id="用http协议为例展示粘包场景" tabindex="-1">用http协议为例，展示粘包场景 <a class="heading-anchor" href="#用http协议为例展示粘包场景" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p><img src="/assets/tio/http%E5%8D%8F%E8%AE%AE%E7%B2%98%E5%8C%85%E5%9C%BA%E6%99%AF.png" alt="http协议粘包场景.png" loading="lazy"></p>
<blockquote>
<p>说明：http协议是一来一回的，所以正常场景是不会有粘包的，但pipeline模式下是允许一方连续发多个请求的，所以会有粘包产生</p>
</blockquote>
<h2 id="消息发送与接收流程" tabindex="-1">消息发送与接收流程 <a class="heading-anchor" href="#消息发送与接收流程" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<p><img src="/assets/tio/%E6%B6%88%E6%81%AF%E6%94%B6%E5%8F%91%E6%B5%81%E7%A8%8B.png" alt="t-io+消息收发流程.png" loading="lazy"></p>
<h2 id="t-io-常用组件" tabindex="-1">t-io 常用组件 <a class="heading-anchor" href="#t-io-常用组件" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="单条tcp连接上下文channelcontext" tabindex="-1">单条TCP连接上下文：ChannelContext <a class="heading-anchor" href="#单条tcp连接上下文channelcontext" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>每一个tcp连接的建立都会产生一个ChannelContext对象，这是个抽象类，如果你是用t-io作tcp客户端，那么就是ClientChannelContext，如果你是用tio作tcp服务器，那么就是ServerChannelContext</p>
<h4 id="bind功能" tabindex="-1">bind功能 <a class="heading-anchor" href="#bind功能" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>绑定用户id和ChannelContext关联关系</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code>Tio.bindUser(ChannelContext channelContext,String userId);
</code></pre></div><h4 id="主要对象" tabindex="-1">主要对象 <a class="heading-anchor" href="#主要对象" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p><img src="/assets/tio/ChannelContext%E4%B8%BB%E8%A6%81%E5%AF%B9%E8%B1%A1.png" alt="t-io ChannelContext主要对象.png" loading="lazy"></p>
<h3 id="服务配置与维护tioconfig" tabindex="-1">服务配置与维护：TioConfig <a class="heading-anchor" href="#服务配置与维护tioconfig" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<ul>
<li>
<p><strong>场景</strong>：我们在写TCP Server时，都会先选好一个端口以监听客户端连接，再创建N组线程池来执行相关的任务，譬如发送消息、解码数据包、处理数据包等任务，还要维护客户端连接的各种数据，为了和业务互动，还要把这些客户端连接和各种业务数据绑定起来，譬如把某个客户端绑定到一个群组，绑定到一个userid，绑定到一个token等。</p>
</li>
<li>
<p><strong>TioConfig</strong>就是解决以上场景的：配置线程池、监听端口，维护客户端各种数据等的。</p>
</li>
<li>
<p>TioConfig是个抽象类，默认有TioClientConfig、TioServerConfig两个实现类，分别对应客户端配置、服务端配置</p>
<ul>
<li>一个监听端口对应一个ServerTioConfig ，一个jvm可以监听多个端口，所以一个jvm可以有多个ServerTioConfig对象</li>
</ul>
</li>
</ul>
<h4 id="主要对象-1" tabindex="-1">主要对象 <a class="heading-anchor" href="#主要对象-1" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p><img src="/assets/tio/TioConfig%E4%B8%BB%E8%A6%81%E5%AF%B9%E8%B1%A1.png" alt="t-io TioConfig主要对象.png" loading="lazy"></p>
<h4 id="如何获取tioconfig对象" tabindex="-1">如何获取TioConfig对象 <a class="heading-anchor" href="#如何获取tioconfig对象" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="方法一如果已经获取到channelcontext对象" tabindex="-1">方法一：如果已经获取到ChannelContext对象 <a class="heading-anchor" href="#方法一如果已经获取到channelcontext对象" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-type">TioConfig</span> <span class="hljs-variable">tioConfig</span> <span class="hljs-operator">=</span> channelContext.tioConfig;
</code></pre></div><h5 id="方法二使用全局的静态变量" tabindex="-1">方法二：使用全局的静态变量 <a class="heading-anchor" href="#方法二使用全局的静态变量" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<h3 id="编码解码处理tiohandler" tabindex="-1">编码、解码、处理：TioHandler <a class="heading-anchor" href="#编码解码处理tiohandler" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>TioHandler是处理消息的核心接口，它有两个子接口，ClientTioHandler和ServerTioHandler，当用tio作tcp客户端时需要实现ClientTioHandler，当用tio作tcp服务器时需要实现ServerTioHandler，它主要定义了3个方法，见下</p>
<h4 id="decode" tabindex="-1">decode <a class="heading-anchor" href="#decode" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>根据ByteBuffer解码成业务需要的Packet对象.如果收到的数据不全，导致解码失败，请返回null，在下次消息来时框架层会自动续上前面的收到的数据</p>
<p>Packet decode (ByteBuffer buffer, int limit, int position, int readableLength, ChannelContext channelContext)</p>
<h4 id="encode" tabindex="-1">encode <a class="heading-anchor" href="#encode" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>编码
ByteBuffer encode(Packet packet, TioConfig tioConfig, ChannelContext channelContext)</p>
<h4 id="handler" tabindex="-1">handler <a class="heading-anchor" href="#handler" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>处理消息包
void handler(Packet packet, ChannelContext channelContext)</p>
<h3 id="消息来往监听tiolistener" tabindex="-1">消息来往监听：TioListener <a class="heading-anchor" href="#消息来往监听tiolistener" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>TioListener是处理消息的核心接口，它有两个子接口：ClientTioListener和ServerTioListener</p>
<ul>
<li>
<p>当用tio作tcp客户端时需要实现ClientTioListener</p>
</li>
<li>
<p>当用tio作tcp服务器时需要实现ServerTioListener</p>
</li>
</ul>
<p>主要是连接相关的监听事件，比如建链后触发的方法（onAfterConnected）、解码成功后触发的方法（onAfterDecoded）、接收到TCP层传过来的数据后（onAfterReceivedBytes）、消息包发送之后触发（onAfterSent）、处理一个消息包后（onAfterHandled）、连接关闭前触发（onBeforeClose）</p>
<h3 id="服务器端入口tioserver" tabindex="-1">服务器端入口：TioServer <a class="heading-anchor" href="#服务器端入口tioserver" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>服务器入口对象，主要使用的start方法启动t-io服务端。</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-type">void</span> <span class="hljs-title function_">start</span><span class="hljs-params">(String serverIp, <span class="hljs-type">int</span> serverPort)</span>
</code></pre></div><h3 id="客户端入口tioclient" tabindex="-1">客户端入口：TioClient <a class="heading-anchor" href="#客户端入口tioclient" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>客户端入口对象，主要使用connect方法与服务端建立连接。</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-type">ClientChannelContext</span> <span class="hljs-title function_">connect</span><span class="hljs-params">(Node serverNode)</span>
</code></pre></div><h3 id="api集成-tio" tabindex="-1">API集成 Tio <a class="heading-anchor" href="#api集成-tio" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<ul>
<li>为了让用户减少查找API的时间，t-io把常用API以静态方法的形式汇集于一个类，这就是Tio.java</li>
</ul>
<h4 id="业务数据绑定" tabindex="-1">业务数据绑定 <a class="heading-anchor" href="#业务数据绑定" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>资源绑定是指把业务相关的数据和Tcp连接（即ChannelContext）关联起来</p>
<p>bindUser(ChannelContext channelContext, String userid)</p>
<h4 id="业务数据解绑" tabindex="-1">业务数据解绑 <a class="heading-anchor" href="#业务数据解绑" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>资源解绑，把业务数据和Tcp连接解绑</p>
<p>unbindUser(ChannelContext channelContext)</p>
<h4 id="数据发送" tabindex="-1">数据发送 <a class="heading-anchor" href="#数据发送" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<h5 id="异步发送" tabindex="-1">异步发送 <a class="heading-anchor" href="#异步发送" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p>指的是业务层把Packet丢给t-io后立即返回，返回时Packet并没有被发送，而只是提交到了待发送队列。异步发送都是以send开头的</p>
<p><img src="/assets/tio/Tio%E5%BC%82%E6%AD%A5%E5%8F%91%E9%80%81api.png" alt="t-io Tio异步发送api.png" loading="lazy"></p>
<h5 id="阻塞发送" tabindex="-1">阻塞发送 <a class="heading-anchor" href="#阻塞发送" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h5>
<p>t-io把Packet送给对方后才返回，阻塞发送都是以bSend开头的</p>
<p><img src="/assets/tio/Tio%E9%98%BB%E5%A1%9E%E5%8F%91%E9%80%81api.png" alt="t-io Tio阻塞发送api.png" loading="lazy"></p>
<h4 id="断开连接和移除连接" tabindex="-1">断开连接和移除连接 <a class="heading-anchor" href="#断开连接和移除连接" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>断开连接都是以close开头的方法，指的是把当前已经连上的TCP连接断开掉
移除连接都是以remove开头的方法，指的是彻底抛弃这个连接</p>
<ul>
<li>
<p><strong>如果是用t-io做TCP服务器端</strong></p>
<ul>
<li>上面两个方法是等价的，因为服务器不存在重连一说</li>
</ul>
</li>
<li>
<p><strong>如果是用t-io做TCP客户端，并且没有配置重连</strong></p>
<ul>
<li>上面两个方法也是等价的，因为不需要重连，tio断开连接后就会释放该连接全部资源</li>
</ul>
</li>
<li>
<p><strong>如果是用t-io做TCP客户端，并且配置了重连规则</strong>，上面两个方法才是有区别的，区别如下</p>
<ul>
<li>
<p>close()： 不释放相关资源，并且会进行重连</p>
</li>
<li>
<p>remove()：完全释放相关资源，不再进行重连</p>
</li>
</ul>
</li>
</ul>
<h4 id="t-io拉黑ip" tabindex="-1">t-io拉黑IP <a class="heading-anchor" href="#t-io拉黑ip" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code>Tio.IpBlacklist.add(tioConfig, channelContext.getClientNode().getIp());
</code></pre></div><h3 id="数据监控" tabindex="-1">数据监控 <a class="heading-anchor" href="#数据监控" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="客户端ip数据监控-ipstat" tabindex="-1">客户端IP数据监控 IpStat <a class="heading-anchor" href="#客户端ip数据监控-ipstat" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>可以监听到的数据：</p>
<ul>
<li>
<p>duration                    当前统计了多久，单位：毫秒</p>
</li>
<li>
<p>durationType             时长类型，单位：秒，譬如60，3600等</p>
</li>
<li>
<p>ip                               客户端ip</p>
</li>
<li>
<p>decodeErrorCount    解码异常的次数</p>
</li>
<li>
<p>requestCount            收到该IP连接请求的次数</p>
</li>
<li>
<p>sentBytes                  本IP已发送的字节数</p>
</li>
<li>
<p>sentPackets               本IP已发送的packet数</p>
</li>
<li>
<p>handledBytes            本IP已处理的字节数</p>
</li>
<li>
<p>handledPackets         本IP已处理的packet数</p>
</li>
<li>
<p>handledPacketCosts  处理消息包耗时，单位：毫秒</p>
</li>
<li>
<p>receivedBytes            本IP已接收的字节数</p>
</li>
<li>
<p>receivedTcps              本IP已接收了多少次TCP数据包</p>
</li>
<li>
<p>receivedPackets         本IP已接收的packet数</p>
</li>
</ul>
<p>使用步骤 实现IpStatListener</p>
<ul>
<li>初始化时添加监听器和监控时段</li>
</ul>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code>//注意的是：要保证下面两行代码的顺序，不能先addDuration()后setIpStatListener
serverTioConfig.setIpStatListener(ShowcaseIpStatListener.me);
serverTioConfig.ipStats.addDuration(Time.MINUTE_1 * 5);
</code></pre></div><h4 id="单条tcp连接的流量数据channelstat" tabindex="-1">单条TCP连接的流量数据ChannelStat <a class="heading-anchor" href="#单条tcp连接的流量数据channelstat" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>一个TCP会话对应一个ChannelContext对象，每个ChannelContext对象都有一个ChannelStat对象，定义如下</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">final</span> <span class="hljs-type">ChannelStat</span> <span class="hljs-variable">stat</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ChannelStat</span>();
</code></pre></div><p>主要字段：</p>
<ul>
<li>
<p>decodeFailCount                       本次解码失败的次数</p>
</li>
<li>
<p>latestTimeOfReceivedPacket     最近一次收到业务消息包的时间(一个完整的业务消息包，一部分消息不算)</p>
</li>
<li>
<p>latestTimeOfSentPacket             最近一次发送业务消息包的时间(一个完整的业务消息包，一部分消息不算)</p>
</li>
<li>
<p>latestTimeOfReceivedByte         最近一次收到业务消息包的时间:收到字节就算</p>
</li>
<li>
<p>latestTimeOfSentByte                近一次发送业务消息包的时间：发送字节就算</p>
</li>
<li>
<p>timeCreated                               ChannelContext对象创建的时间</p>
</li>
<li>
<p>timeFirstConnected                   第一次连接成功的时间</p>
</li>
<li>
<p>timeClosed                                连接关闭的时间</p>
</li>
<li>
<p>timeInReconnQueue                 进入重连队列时间</p>
</li>
<li>
<p>sentBytes                                   本连接已发送的字节数</p>
</li>
<li>
<p>sentPackets                               本连接已发送的packet数</p>
</li>
<li>
<p>handledBytes                            本连接已处理的字节数</p>
</li>
<li>
<p>handledPackets                         本连接已处理的packet数</p>
</li>
<li>
<p>handledPacketCosts                  处理消息包耗时，单位：毫秒 拿这个值除以handledPackets，就是处理每个消息包的平均耗时</p>
</li>
<li>
<p>receivedBytes                            本连接已接收的字节数</p>
</li>
<li>
<p>receivedTcps                             本连接已接收了多少次TCP数据包</p>
</li>
<li>
<p>receivedPackets                        本连接已接收的packet数</p>
</li>
<li>
<p>double getBytesPerTcpReceive()  平均每次TCP接收到的字节数，这个可以用来监控慢攻击，配置PacketsPerTcpReceive定位慢攻击</p>
</li>
<li>
<p>double getPacketsPerTcpReceive() 平均每次TCP接收到的业务包数，这个可以用来监控慢攻击，此值越小越有攻击嫌疑</p>
</li>
<li>
<p>double getHandledCostsPerPacket()  处理packet平均耗时，单位：毫秒</p>
</li>
</ul>
<h3 id="带读写锁的对象objwithlock" tabindex="-1">带读写锁的对象：ObjWithLock <a class="heading-anchor" href="#带读写锁的对象objwithlock" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<p>网络编程中会伴随大量并发操作，大家对ConcurrentModificationException一定不会陌生，这个是典型的并发操作集合引发的异常。为了更好的处理并发，tio自创了一个ObjWithLock对象，这个对象很简单，但给并发编程带来了极大的方便，如果您阅读过tio源代码，相信已经体会到这个对象在tio中是无处不在的。ObjWithLock顾名思义，它就是一个自带了一把（读写）锁的普通对象（一般是集合对象），每当要对这个对象进行同步安全操作（并发下对集合进行遍历或对集合对象进行元素修改删除增加）时，就得用这个锁。</p>
<h2 id="tio-demo-helloworld版本的入门项目" tabindex="-1">tio-demo helloworld版本的入门项目 <a class="heading-anchor" href="#tio-demo-helloworld版本的入门项目" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h2>
<h3 id="创建tio-demo-maven项目" tabindex="-1">创建tio-demo maven项目 <a class="heading-anchor" href="#创建tio-demo-maven项目" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h3>
<h4 id="增加pom依赖" tabindex="-1">增加pom依赖 <a class="heading-anchor" href="#增加pom依赖" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">XML</div><pre class="hljs"><code>        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.t-io<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>tio-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>3.8.3.v20220902-RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.projectlombok<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>lombok<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.18.24<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">scope</span>&gt;</span>provided<span class="hljs-tag">&lt;/<span class="hljs-name">scope</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>cn.hutool<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>hutool-all<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>5.8.9<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- 打印日志 --&gt;</span>
        <span class="hljs-comment">&lt;!-- 添加slf4j日志api --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.slf4j<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>slf4j-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.7.20<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 添加logback-classic依赖 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>ch.qos.logback<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>logback-classic<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.2.3<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 添加logback-core依赖 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>ch.qos.logback<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>logback-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.2.3<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
</code></pre></div><h4 id="增加logbackxml-日志配置放置到srcmainresources下面" tabindex="-1">增加logback.xml 日志配置，放置到/src/main/resources下面 <a class="heading-anchor" href="#增加logbackxml-日志配置放置到srcmainresources下面" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">XML</div><pre class="hljs"><code><span class="hljs-meta">&lt;?xml version=<span class="hljs-string">&quot;1.0&quot;</span>?&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- ch.qos.logback.core.ConsoleAppender 控制台输出 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">appender</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;console&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ch.qos.logback.core.ConsoleAppender&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">encoder</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">pattern</span>&gt;</span>[%-5level] %d{HH:mm:ss.SSS} [%thread] %logger{36} - %msg%n<span class="hljs-tag">&lt;/<span class="hljs-name">pattern</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">encoder</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">appender</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 日志级别 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">root</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">level</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;info&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">appender-ref</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;console&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">root</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
</code></pre></div><h4 id="继承packet自定义basepacket作为数据传输基础对象" tabindex="-1">继承Packet，自定义BasePacket作为数据传输基础对象 <a class="heading-anchor" href="#继承packet自定义basepacket作为数据传输基础对象" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-meta">@Data</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">BasePacket</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Packet</span> {

    <span class="hljs-comment">/**
     * 消息头的长度 1+4
     * 指令类型 + 消息长度
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">int</span> <span class="hljs-variable">HEADER_LENGTH</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span>;

    <span class="hljs-comment">/**
     * 编码格式
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">CHARSET</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;utf-8&quot;</span>;

    <span class="hljs-comment">/**
     * 指令类型
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">byte</span> type;

    <span class="hljs-comment">/**
     * 消息内容
     */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-type">byte</span>[] body;
}
</code></pre></div><h4 id="创建常量配置const" tabindex="-1">创建常量配置Const <a class="heading-anchor" href="#创建常量配置const" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Const</span> {
    <span class="hljs-comment">/**
     * 心跳超时时间 单位毫秒
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">int</span> <span class="hljs-variable">TIMEOUT</span> <span class="hljs-operator">=</span> <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>;
}
</code></pre></div><h4 id="定义消息类型-packettype" tabindex="-1">定义消息类型 PacketType <a class="heading-anchor" href="#定义消息类型-packettype" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">PacketType</span> {
    <span class="hljs-comment">/**
     * 文本消息
     */</span>
    <span class="hljs-type">byte</span> <span class="hljs-variable">TEXT_REQ</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>;

    <span class="hljs-comment">/**
     * 文件消息
     */</span>
    <span class="hljs-type">byte</span> <span class="hljs-variable">FILE_REQ</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>;

    <span class="hljs-comment">/**
     * 心跳
     */</span>
    <span class="hljs-type">byte</span> <span class="hljs-variable">HEART_BEAT</span> <span class="hljs-operator">=</span> <span class="hljs-number">99</span>;
}
</code></pre></div><h4 id="增加抽象类-basehandler实现tiohandler接口完成自定义消息加解密功能" tabindex="-1">增加抽象类 BaseHandler，实现TioHandler接口，完成自定义消息加解密功能 <a class="heading-anchor" href="#增加抽象类-basehandler实现tiohandler接口完成自定义消息加解密功能" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-meta">@Slf4j</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">BaseHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">TioHandler</span> {

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">BasePacket</span> <span class="hljs-title function_">decode</span><span class="hljs-params">(ByteBuffer byteBuffer, <span class="hljs-type">int</span> limit, <span class="hljs-type">int</span> position, <span class="hljs-type">int</span> readableLength, ChannelContext channelContext)</span> <span class="hljs-keyword">throws</span> TioDecodeException {
        <span class="hljs-keyword">if</span>(readableLength &lt; BasePacket.HEADER_LENGTH){
            <span class="hljs-comment">// 可读数据小于头固定长度</span>
            log.debug(<span class="hljs-string">&quot;tio解码失败,可读数据小于头固定长度,头:{},可读数据:{}&quot;</span>,BasePacket.HEADER_LENGTH,readableLength);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }

        <span class="hljs-comment">//消息类型</span>
        <span class="hljs-type">byte</span> <span class="hljs-variable">type</span> <span class="hljs-operator">=</span> byteBuffer.get();
        <span class="hljs-comment">//读取消息体的长度</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">bodyLength</span> <span class="hljs-operator">=</span> byteBuffer.getInt();
        <span class="hljs-comment">//数据不正确，则抛出TioDecodeException异常</span>
        <span class="hljs-keyword">if</span> (bodyLength &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TioDecodeException</span>(<span class="hljs-string">&quot;bodyLength [&quot;</span> + bodyLength + <span class="hljs-string">&quot;] is not right, remote:&quot;</span> + channelContext.getClientNode());
        }

        <span class="hljs-comment">//计算本次需要的数据长度</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">neededLength</span> <span class="hljs-operator">=</span> BasePacket.HEADER_LENGTH + bodyLength;
        <span class="hljs-keyword">if</span> (readableLength &lt; neededLength){
            <span class="hljs-comment">// 不够消息体长度(剩下的buffe组不了消息体)</span>
			log.debug(<span class="hljs-string">&quot;tio解码失败,不够消息体长度,需读数据:{},可读数据:{}&quot;</span>,neededLength,readableLength);
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BasePacket</span>();
            basePacket.setType(type);
            <span class="hljs-keyword">if</span> (bodyLength &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-type">byte</span>[] <span class="hljs-variable">bytes</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[bodyLength];
                byteBuffer.get(bytes);
                basePacket.setBody(bytes);
            }
            <span class="hljs-keyword">return</span> basePacket;
        }
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">ByteBuffer</span> <span class="hljs-title function_">encode</span><span class="hljs-params">(Packet packet, TioConfig tioConfig, ChannelContext channelContext)</span> {
        <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> (BasePacket) packet;

        <span class="hljs-type">byte</span> <span class="hljs-variable">type</span> <span class="hljs-operator">=</span> basePacket.getType();
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">body</span> <span class="hljs-operator">=</span> basePacket.getBody();
        <span class="hljs-type">int</span> <span class="hljs-variable">bodyLen</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
        <span class="hljs-keyword">if</span>(<span class="hljs-literal">null</span> != body){
            bodyLen = body.length;
        }

        <span class="hljs-comment">// 总长度是消息头的长度+消息体的长度</span>
        <span class="hljs-type">int</span> <span class="hljs-variable">allLen</span> <span class="hljs-operator">=</span> BasePacket.HEADER_LENGTH + bodyLen;

        <span class="hljs-type">ByteBuffer</span> <span class="hljs-variable">buffer</span> <span class="hljs-operator">=</span> ByteBuffer.allocate(allLen);
        <span class="hljs-comment">// 设置字节序</span>
        buffer.order(tioConfig.getByteOrder());

        <span class="hljs-comment">// 写入消息类型</span>
        buffer.put(type);
        <span class="hljs-comment">// 写入消息体长度</span>
        buffer.putInt(bodyLen);
        <span class="hljs-comment">// 写入消息体</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-literal">null</span> != body){
            buffer.put(body);
        }
        <span class="hljs-keyword">return</span> buffer;
    }
}
</code></pre></div><h4 id="编写服务端消息处理类serverhandler" tabindex="-1">编写服务端消息处理类ServerHandler <a class="heading-anchor" href="#编写服务端消息处理类serverhandler" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>继承BaseHandler并实现TioServerHandler</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-meta">@Slf4j</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ServerHandler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">TioServerHandler</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">handler</span><span class="hljs-params">(Packet packet, ChannelContext channelContext)</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> (BasePacket) packet;
        <span class="hljs-type">byte</span>[] <span class="hljs-variable">body</span> <span class="hljs-operator">=</span> basePacket.getBody();
        <span class="hljs-keyword">if</span>(<span class="hljs-literal">null</span> != body){
            <span class="hljs-type">String</span> <span class="hljs-variable">msg</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>(body);
            log.info(<span class="hljs-string">&quot;收到消息：{}&quot;</span>, msg);

            <span class="hljs-comment">// 给客户端发消息</span>
            <span class="hljs-type">String</span> <span class="hljs-variable">returnMsg</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;我收到 你的消息了:&quot;</span> + msg;
            basePacket.setBody(returnMsg.getBytes());
            Tio.send(channelContext, basePacket);
        }
    }
}
</code></pre></div><h4 id="创建服务器启动类" tabindex="-1">创建服务器启动类 <a class="heading-anchor" href="#创建服务器启动类" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TioServerApp</span> {
    <span class="hljs-comment">// handler, 包括编码、解码、消息处理</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioServerHandler</span> <span class="hljs-variable">tioServerHandler</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ServerHandler</span>();
    <span class="hljs-comment">// 事件监听器，可以为null，但建议自己实现该接口</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioServerListener</span> <span class="hljs-variable">tioServerListener</span> <span class="hljs-operator">=</span> <span class="hljs-literal">null</span>;
    <span class="hljs-comment">// 一组连接共用的上下文对象</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioServerConfig</span> <span class="hljs-variable">serverConfig</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TioServerConfig</span>(<span class="hljs-string">&quot;tio-server&quot;</span>,tioServerHandler,tioServerListener);
    <span class="hljs-comment">// tioServer对象</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioServer</span> <span class="hljs-variable">tioServer</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TioServer</span>(serverConfig);

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-keyword">try</span> {
            tioServer.start(<span class="hljs-string">&quot;127.0.0.1&quot;</span>,<span class="hljs-number">8888</span>);
        } <span class="hljs-keyword">catch</span> (IOException e) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuntimeException</span>(e);
        }
    }
}
</code></pre></div><h4 id="编写客户端消息处理类clienthandler" tabindex="-1">编写客户端消息处理类ClientHandler <a class="heading-anchor" href="#编写客户端消息处理类clienthandler" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>继承BaseHandler并实现TioClientHandler</p>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-meta">@Slf4j</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ClientHandler</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseHandler</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">TioClientHandler</span> {
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">void</span> <span class="hljs-title function_">handler</span><span class="hljs-params">(Packet packet, ChannelContext channelContext)</span> <span class="hljs-keyword">throws</span> Exception {
        <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> (BasePacket) packet;
        log.info(<span class="hljs-string">&quot;收到消息：{}&quot;</span> ,<span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>(basePacket.getBody()));
    }

    <span class="hljs-comment">/**
     * 此方法如果返回null，框架层面则不会发心跳；如果返回非null，框架层面会定时发本方法返回的消息包
     * <span class="hljs-doctag">@param</span> channelContext
     * <span class="hljs-doctag">@return</span>
     */</span>
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-type">Packet</span> <span class="hljs-title function_">heartbeatPacket</span><span class="hljs-params">(ChannelContext channelContext)</span> {
        <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BasePacket</span>();
        basePacket.setType((<span class="hljs-type">byte</span>) <span class="hljs-number">99</span>);
        <span class="hljs-keyword">return</span> basePacket;
    }
}
</code></pre></div><h4 id="创建客户端启动类" tabindex="-1">创建客户端启动类 <a class="heading-anchor" href="#创建客户端启动类" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<div class="code-block"><div class="code-block__lang">Java</div><pre class="hljs"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TioClientApp</span> {
    <span class="hljs-comment">// 服务器节点</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">Node</span> <span class="hljs-variable">node</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Node</span>(<span class="hljs-string">&quot;127.0.0.1&quot;</span>,<span class="hljs-number">8888</span>);
    <span class="hljs-comment">// handler, 包括编码、解码、消息处理</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioClientHandler</span> <span class="hljs-variable">tioClientHandler</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ClientHandler</span>();
    <span class="hljs-comment">// 事件监听器，可以为null，但建议自己实现该接口</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioClientListener</span> <span class="hljs-variable">tioClientListener</span> <span class="hljs-operator">=</span> <span class="hljs-literal">null</span>;
    <span class="hljs-comment">// 断链后自动连接的，不想自动连接请设为null</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">ReconnConf</span> <span class="hljs-variable">reconnConf</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ReconnConf</span>(<span class="hljs-number">5000</span>);
    <span class="hljs-comment">// 一组连接共用的上下文对象</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioClientConfig</span> <span class="hljs-variable">tioClientConfig</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">TioClientConfig</span>(tioClientHandler,tioClientListener,reconnConf);

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">TioClient</span> <span class="hljs-variable">tioClient</span> <span class="hljs-operator">=</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">ClientChannelContext</span> <span class="hljs-variable">clientChannelContext</span> <span class="hljs-operator">=</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">main</span><span class="hljs-params">(String[] args)</span> {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-comment">// 设置心跳超时时间</span>
            tioClientConfig.setHeartbeatTimeout(Const.TIMEOUT);
            tioClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TioClient</span>(tioClientConfig);
            clientChannelContext = tioClient.connect(node);
            <span class="hljs-comment">// 发条消息玩玩</span>
            sendMsg();
        } <span class="hljs-keyword">catch</span> (Exception e) {
            e.printStackTrace();
        }
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-type">void</span> <span class="hljs-title function_">sendMsg</span><span class="hljs-params">()</span>{
        <span class="hljs-type">BasePacket</span> <span class="hljs-variable">basePacket</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">BasePacket</span>();
        basePacket.setType((<span class="hljs-type">byte</span>)<span class="hljs-number">1</span>);
        basePacket.setBody(<span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>(<span class="hljs-string">&quot;hello tio&quot;</span>).getBytes());
        Tio.send(clientChannelContext,basePacket);
    }
}
</code></pre></div><h4 id="测试" tabindex="-1">测试 <a class="heading-anchor" href="#测试" aria-hidden="true"><svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/><path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg></a></h4>
<p>上面的功能，完成了一个客户端连接服务端后，并发送一条“hello tio” 消息给服务端，服务端收到后，再回给客户端的功能。</p>
<div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code>[INFO ] 11:35:14.712 [main] org.tio.server.TioServer - 
|----------------------------------------------------------------------------------------|
| t-io site         | https://www.tiocloud.com                                           |
| t-io on gitee     | https://gitee.com/tywo45/t-io                                      |
| t-io on github    | https://github.com/tywo45/t-io                                     |
| t-io version      | 3.8.3.v20220902-RELEASE                                            |
| ---------------------------------------------------------------------------------------|
| TioConfig name    | tio-server                                                         |
| Started at        | 2023-04-27 11:35:14                                                |
| Listen on         | 127.0.0.1:8888                                                     |
| Main Class        | top.javajianghu.tio.learn.server.TioServerApp                      |
| Jvm start time    | 314ms                                                              |
| Tio start time    | 29ms                                                               |
| Pid               | 16404                                                              |
|----------------------------------------------------------------------------------------|

[INFO ] 11:35:26.914 [tio-group-3] t.j.tio.learn.server.ServerHandler - 收到消息：hello tio
</code></pre></div><div class="code-block"><div class="code-block__lang">Plain</div><pre class="hljs"><code>[INFO ] 11:35:26.813 [tio-timer-heartbeat1] org.tio.client.TioClient - [1]: curr:0, closed:0, received:(0p)(0b), handled:0, sent:(0p)(0b)
[INFO ] 11:35:26.911 [tio-group-2] o.t.c.ConnectionCompletionHandler - connected to 127.0.0.1:8888
[INFO ] 11:35:26.918 [tio-group-4] t.j.tio.learn.client.ClientHandler - 收到消息：我收到 你的消息了:hello tio
</code></pre></div>`,t=[{id:`网络编程预备知识`,text:`网络编程预备知识`,level:2,children:[{id:`tcpip协议分层模型`,text:`TCP/IP协议分层模型`,level:3,children:[{id:`应用层`,text:`应用层`,level:4,children:[]},{id:`传输层`,text:`传输层`,level:4,children:[]},{id:`传输层数据是啥`,text:`传输层数据是啥`,level:4,children:[]}]}]},{id:`bytebuffer网络编程前置技能`,text:`ByteBuffer：网络编程前置技能`,level:2,children:[{id:`初识bytebuffer`,text:`初识ByteBuffer`,level:4,children:[]}]},{id:`半包和粘包正确断句才能沟通`,text:`半包和粘包：正确断句才能沟通`,level:2,children:[{id:`半包`,text:`半包`,level:4,children:[]},{id:`粘包`,text:`粘包`,level:4,children:[]}]},{id:`消息发送与接收流程`,text:`消息发送与接收流程`,level:2,children:[]},{id:`t-io-常用组件`,text:`t-io 常用组件`,level:2,children:[{id:`单条tcp连接上下文channelcontext`,text:`单条TCP连接上下文：ChannelContext`,level:3,children:[{id:`bind功能`,text:`bind功能`,level:4,children:[]},{id:`主要对象`,text:`主要对象`,level:4,children:[]}]},{id:`服务配置与维护tioconfig`,text:`服务配置与维护：TioConfig`,level:3,children:[{id:`主要对象-1`,text:`主要对象`,level:4,children:[]},{id:`如何获取tioconfig对象`,text:`如何获取TioConfig对象`,level:4,children:[]}]},{id:`编码解码处理tiohandler`,text:`编码、解码、处理：TioHandler`,level:3,children:[{id:`decode`,text:`decode`,level:4,children:[]},{id:`encode`,text:`encode`,level:4,children:[]},{id:`handler`,text:`handler`,level:4,children:[]}]},{id:`消息来往监听tiolistener`,text:`消息来往监听：TioListener`,level:3,children:[]},{id:`服务器端入口tioserver`,text:`服务器端入口：TioServer`,level:3,children:[]},{id:`客户端入口tioclient`,text:`客户端入口：TioClient`,level:3,children:[]},{id:`api集成-tio`,text:`API集成 Tio`,level:3,children:[{id:`业务数据绑定`,text:`业务数据绑定`,level:4,children:[]},{id:`业务数据解绑`,text:`业务数据解绑`,level:4,children:[]},{id:`数据发送`,text:`数据发送`,level:4,children:[]},{id:`断开连接和移除连接`,text:`断开连接和移除连接`,level:4,children:[]},{id:`t-io拉黑ip`,text:`t-io拉黑IP`,level:4,children:[]}]},{id:`数据监控`,text:`数据监控`,level:3,children:[{id:`客户端ip数据监控-ipstat`,text:`客户端IP数据监控 IpStat`,level:4,children:[]},{id:`单条tcp连接的流量数据channelstat`,text:`单条TCP连接的流量数据ChannelStat`,level:4,children:[]}]},{id:`带读写锁的对象objwithlock`,text:`带读写锁的对象：ObjWithLock`,level:3,children:[]}]},{id:`tio-demo-helloworld版本的入门项目`,text:`tio-demo helloworld版本的入门项目`,level:2,children:[{id:`创建tio-demo-maven项目`,text:`创建tio-demo maven项目`,level:3,children:[{id:`增加pom依赖`,text:`增加pom依赖`,level:4,children:[]},{id:`增加logbackxml-日志配置放置到srcmainresources下面`,text:`增加logback.xml 日志配置，放置到/src/main/resources下面`,level:4,children:[]},{id:`继承packet自定义basepacket作为数据传输基础对象`,text:`继承Packet，自定义BasePacket作为数据传输基础对象`,level:4,children:[]},{id:`创建常量配置const`,text:`创建常量配置Const`,level:4,children:[]},{id:`定义消息类型-packettype`,text:`定义消息类型 PacketType`,level:4,children:[]},{id:`增加抽象类-basehandler实现tiohandler接口完成自定义消息加解密功能`,text:`增加抽象类 BaseHandler，实现TioHandler接口，完成自定义消息加解密功能`,level:4,children:[]},{id:`编写服务端消息处理类serverhandler`,text:`编写服务端消息处理类ServerHandler`,level:4,children:[]},{id:`创建服务器启动类`,text:`创建服务器启动类`,level:4,children:[]},{id:`编写客户端消息处理类clienthandler`,text:`编写客户端消息处理类ClientHandler`,level:4,children:[]},{id:`创建客户端启动类`,text:`创建客户端启动类`,level:4,children:[]},{id:`测试`,text:`测试`,level:4,children:[]}]}]}],n={html:e,toc:t};export{n as default,e as html,t as toc};