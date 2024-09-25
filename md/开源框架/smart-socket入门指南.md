---
title: smart-socket入门指南
categories:
  - 开源框架
---

# smart-socket入门指南

官方地址：[smartboot 开源组织](https://smartboot.tech/)

gitee 开源地址：[smart-socket](https://gitee.com/smartboot/smart-socket)

## 介绍

smart-socket 是一款100%自研的国产开源通信框架，通过强化 AIO 的实现使其有着超越各大语言的通信性能和稳定性。

可以看到smart-socket是一款通信框架，通信框架中netty是我们最常用也是经常听别人讲起的，它是基于NIO开发的优秀的框架，其大而全的功能，基本覆盖了我们开发中的方法面面。

放眼国内开源市场，国人自主研发的通信框架有我们前面介绍的[t-io](/md/开源框架/tio官方入门文档.md),还有本次的主角smart-socket，这两个框架都是基于AIO实现的，孰优孰劣全凭你的选择。

那么现在跟随官方的案子，一起熟悉下smart-socket的使用吧。


## 官方快速入门

### 引入依赖
```xml
<dependencies>
    <dependency>
        <groupId>org.smartboot.socket</groupId>
        <artifactId>aio-core</artifactId>
        <version>1.5.38</version>
    </dependency>
</dependencies>
```

### 定义通信协议

```java
import org.smartboot.socket.Protocol;
import org.smartboot.socket.transport.AioSession;

import java.nio.ByteBuffer;
/**
 * 通信协议-传输字符串
 */
public class StringProtocol implements Protocol<String> {

    @Override
    public String decode(ByteBuffer readBuffer, AioSession session) {
		// 此缓冲区中剩余的元素数
        int remaining = readBuffer.remaining();
		// 小于4个字节，
        // 因为消息的格式是：消息长度 + 消息内容，
        // 消息长度在ByteBuffer中使用的writeBuffer.writeInt写入的int类型的消息长度，int占4个字节，所以这里先判断是否够4个字节
        if (remaining < Integer.BYTES) {
			System.out.println("消息太短了，长度：" + remaining);
            return null;
        }
        readBuffer.mark();
		
		// 获取body长度
        int length = readBuffer.getInt();
		
		 // 不够读，直接返回
        if (length > readBuffer.remaining()) {
			System.out.println("body长度："+length+",但消息长度：" + msgLength);
            readBuffer.reset();
            return null;
        }
		
		// 读取字符串
        byte[] b = new byte[length];
        readBuffer.get(b);
        readBuffer.mark();
        return new String(b);
    }
}

```

### 定义服务器

```java
import org.smartboot.socket.MessageProcessor;
import org.smartboot.socket.transport.AioQuickServer;
import org.smartboot.socket.transport.WriteBuffer;

import java.io.IOException;

public class StringServer {

    public static void main(String[] args) throws IOException {
		// 定义消息处理器
        MessageProcessor<String> processor = (session, msg) -> {
            System.out.println("receive from client: " + msg);
            WriteBuffer outputStream = session.writeBuffer();
            try {
                byte[] bytes = msg.getBytes();
                outputStream.writeInt(bytes.length);
                outputStream.write(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        };

		// 创建服务端，传参依次为：端口号，通信协议，消息处理器
        AioQuickServer server = new AioQuickServer(8888, new StringProtocol(), processor);
        server.start();
    }
}

```

### 定义客户端
```java
import org.smartboot.socket.MessageProcessor;
import org.smartboot.socket.transport.AioQuickClient;
import org.smartboot.socket.transport.AioSession;
import org.smartboot.socket.transport.WriteBuffer;

import java.io.IOException;

public class StringClient {

    public static void main(String[] args) throws IOException {
		// 消息处理器
        MessageProcessor<String> processor = (session, msg) -> System.out.println("receive from server: " + msg);
        
		// 链接到服务端
		AioQuickClient client = new AioQuickClient("localhost", 8888, new StringProtocol(), processor);
		// 获取链接seession
        AioSession session = client.start();
		
		// 发送消息
        WriteBuffer writeBuffer = session.writeBuffer();
        byte[] data = "hello smart-socket".getBytes();
        writeBuffer.writeInt(data.length);
        writeBuffer.write(data);
        writeBuffer.flush();
    }
}

```

## 加强版入门

官方官网提供的入门示例太简陋了，不足以用于正式环境，所以大佬提供了些许example，对应git地址为：
https://gitee.com/smartboot/smart-socket/tree/master/example


本人根据example自己发挥了一下，有了此加强版，供君参考。

### 依赖变化

```
### 引入依赖
```xml
<dependencies>
    <dependency>
		<groupId>org.smartboot.socket</groupId>
		<artifactId>aio-pro</artifactId>
		<version>1.5.43</version>
	</dependency>
</dependencies>
```

### 通信协议

没有变化，参考之前的。

### 增加服务端消息处理器

1、新增了自定义MyServerMessageProcessor服务端消息处理器，继承于AbstractMessageProcessor，
AbstractMessageProcessor消息处理类是官方提供的，用于扩展MessageProcessor的抽象类。

2、相比MessageProcessor接口，AbstractMessageProcessor抽象类可以增加官方提供的一些插件，也可以增加自定义的一些插件。

3、同时，保存了每次客户端的session到map中，当建立连接就把seession保存到map，断开就移除，保存或者移除依靠的就是stateEvent0事件通知方法。

4、增加addBlackListPlugin（黑名单处理插件）、addMonitorPlugin（监控插件）方法，更方便的调用，启动插件。

```java

/**
 * 服务端消息处理
 * @param <T>
 */
public class MyServerMessageProcessor<T> extends AbstractMessageProcessor<T> {
    public Map<String, AioSession> sessionMap = new HashMap<>();

    private MyServerMessageProcessor(){}

    public static MyServerMessageProcessor getInstance(){
        return MyServerMessageProcessor.LazyHolder.INSTANCE;
    }

    private static class LazyHolder {
        private static final MyServerMessageProcessor<String> INSTANCE = new MyServerMessageProcessor<>();
    }


    @Override
    public void process0(AioSession aioSession, Object msg) {
        System.out.println("receive from client: " + msg);

        // 回个消息
        WriteBuffer writeBuffer = aioSession.writeBuffer();
        String message = "俺收到你的消息了：" + msg;
        byte[] bytes = message.getBytes();
        try {
            writeBuffer.writeInt(bytes.length);
            writeBuffer.write(bytes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void stateEvent0(AioSession aioSession, StateMachineEnum stateMachineEnum, Throwable throwable) {
        switch (stateMachineEnum) {
            /**
             * 连接已建立并构建Session对象
             */
            case NEW_SESSION:
                System.out.println("回调状态：蓝上了");
                sessionMap.put(aioSession.getSessionID(), aioSession);
                break;

            /**
             * 读通道已被关闭。
             * <p>
             * 通常由以下几种情况会触发该状态：
             * <ol>
             * <li>对端主动关闭write通道，致使本通常满足了EOF条件</li>
             * <li>当前AioSession处理完读操作后检测到自身正处于{@link StateMachineEnum#SESSION_CLOSING}状态</li>
             * </ol>
             * </p>
             */
            case INPUT_SHUTDOWN:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
            /**
             * 业务处理异常。
             * <p>执行{@link MessageProcessor#process(AioSession, Object)}期间发生未捕获的异常。</p>
             */
            case PROCESS_EXCEPTION:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;

            /**
             * 协议解码异常。
             * <p>执行{@link Protocol#decode(ByteBuffer, AioSession)}期间发生未捕获的异常。</p>
             */
            case DECODE_EXCEPTION:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
            /**
             * 读操作异常。
             *
             * <p>在底层服务执行read操作期间因发生异常情况触发了{@link java.nio.channels.CompletionHandler#failed(Throwable, Object)}。</p>
             */
            case INPUT_EXCEPTION:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
            /**
             * 写操作异常。
             * <p>在底层服务执行write操作期间因发生异常情况触发了{@link java.nio.channels.CompletionHandler#failed(Throwable, Object)}。</p>
             */
            case OUTPUT_EXCEPTION:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
            /**
             * 会话正在关闭中。
             *
             * <p>执行了{@link AioSession#close(boolean false)}方法，并且当前还存在待输出的数据。</p>
             */
            case SESSION_CLOSING:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
            /**
             * 会话关闭成功。
             *
             * <p>AioSession关闭成功</p>
             */
            case SESSION_CLOSED:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;

            /**
             * 拒绝接受连接,仅Server端有效
             */
            case REJECT_ACCEPT:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;

            /**
             * 服务端接受连接异常
             */
            case ACCEPT_EXCEPTION:
                System.out.println("回调状态：" + stateMachineEnum.name());
                break;
        }

        if (stateMachineEnum.equals(StateMachineEnum.SESSION_CLOSED) || stateMachineEnum.equals(StateMachineEnum.REJECT_ACCEPT)) {
            if (null != aioSession) {
                System.out.println("移除连接：" + aioSession.getSessionID());
                sessionMap.remove(aioSession.getSessionID());
            }
        }

        System.out.println("在线的会话：" + sessionMap.size());
    }

    public void addMonitorPlugin(int monitorInterval){
        MyServerMessageProcessor.getInstance().addPlugin(new MonitorPlugin<>(monitorInterval));
    }

    public void addBlackListPlugin(List<String> blackIpList){
        BlackListPlugin blackListPlugin = new BlackListPlugin<>();
        blackListPlugin.addRule((address) -> {
            String ip = address.getAddress().getHostAddress();
            return !blackIpList.contains(ip);
        });
        MyServerMessageProcessor.getInstance().addPlugin(blackListPlugin);
    }
}
```


### 服务端启动程序

1、增加了上面的自定义消息处理类，服务端启动就简单快捷了，只需要调用MyServerMessageProcessor.getInstance() 就可以获取到消息处理类的单例实例对象了。

```java
public class SmartStringServer {
    public static void main(String[] args) throws IOException {
        MyServerMessageProcessor<String> messageProcessor = MyServerMessageProcessor.getInstance();
        // 服务器运行状态监控插件
        messageProcessor.addPlugin(new MonitorPlugin());
        // 增加黑名单
//        BlackListPlugin<String> objectBlackListPlugin = new BlackListPlugin<>();
//        objectBlackListPlugin.addRule((accept -> {
//            return accept.getAddress().equals("127.0.0.1");
//        }));
//        msgProcessor.addPlugin(objectBlackListPlugin);

        // 码流监测插件 通信调试无需安装 wireshark，smart-socket 自带码流监控插件。
        msgProcessor.addPlugin(new StreamMonitorPlugin<>());

        AioQuickServer aioQuickServer = new AioQuickServer(7890, new StringProtocol(), messageProcessor);
        aioQuickServer.start();
    }
}
```

### 增加客户端消息处理器

1、这里采用和服务端类似的处理方式，把客户端消息处理器也提取到一个类里面。

2、增加自定义的心跳处理插件、自动重连处理方法

```java
/**
 * 客户端消息处理
 * @param <T>
 */
public class MyClientMessageProcessor<T> extends AbstractMessageProcessor<T> {

    public static AioSession session;
    public static AioQuickClient client;

    private MyClientMessageProcessor(){}

    public static MyClientMessageProcessor getInstance(){
        return LazyHolder.INSTANCE;
    }

    private static class LazyHolder {
        private static final MyClientMessageProcessor<String> INSTANCE = new MyClientMessageProcessor<>();
    }

    /**
     * 处理接收到的消息
     *
     * @param session
     * @param msg
     * @see MessageProcessor#process(AioSession, Object)
     */
    @Override
    public void process0(AioSession session, T msg) {
        System.out.println("我是客户端，收到消息：" + msg);
    }

    @Override
    public void stateEvent0(AioSession aioSession, StateMachineEnum stateMachineEnum, Throwable throwable) {

    }

    /**
     * 增加心跳插件
     * @param heartRate 心跳触发频率
     * @param timeout   消息超时时间，单位：秒
     */
    public void addHeartPlugin(int heartRate, int timeout){
        HeartPlugin<String> stringHeartPlugin = new HeartPlugin<String>(heartRate, timeout, TimeUnit.SECONDS) {
            @Override
            public void sendHeartRequest(AioSession aioSession) throws IOException {
                WriteBuffer writeBuffer = aioSession.writeBuffer();
                byte[] content = "heart message".getBytes();
                writeBuffer.writeInt(content.length);
                writeBuffer.write(content);
            }
            @Override
            public boolean isHeartMessage(AioSession aioSession, String msg) {
                return "heart message".equals(msg);
            }
        };
        MyClientMessageProcessor.getInstance().addPlugin(stringHeartPlugin);
    }

    /**
     * 自动重连
     * @param reconnectInterval
     */
    public void autoReconnect(long reconnectInterval){
        new Thread(() -> {
            System.out.println("启动连接监测");
            while (true) {
                if (session == null || session.isInvalid()) {
                    System.out.println("连接异常，准备重连...");
                    connect();
                } else {
                    System.out.println("连接正常...");
                }

                try {
                    Thread.sleep(reconnectInterval);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"Reconnect-Thread").start();
    }

    public static void connect() {
        try{
            if(null != client){
                System.out.println("关闭旧客户端");
                client.shutdownNow();
            }
            client = new AioQuickClient("127.0.0.1", 7890, new StringProtocol(), MyClientMessageProcessor.getInstance());
            session = client.start();
            System.out.println("客户端连接成功");
        }catch (Exception e){
            System.out.println("启动客户端异常： " + e.getMessage());
            if(null != client){
                client.shutdownNow();
            }
        }
    }
}
```

### 客户端服务

1、客户端处理逻辑很简单，有两个常量配置，是否自动重连和重连间隔时间。

2、MyClientMessageProcessor.session 表示本客户端的连接session
，同时客户端对象也被放到了MyClientMessageProcessor.client中。

```java

public class SmartStringClient {
    private static final boolean reconnect = true;
    private static final long reconnectInterval = 5000;

    private static MyClientMessageProcessor<String> messageProcessor;

    public static void main(String[] args) throws IOException {
        messageProcessor = MyClientMessageProcessor.getInstance();

        // 自动重连
        if(reconnect){
            messageProcessor.autoReconnect(reconnectInterval);
        }

        // 心跳插件
        messageProcessor.addHeartPlugin(5,10);

        MyClientMessageProcessor.client = new AioQuickClient("127.0.0.1", 7890, new StringProtocol(), messageProcessor);
        MyClientMessageProcessor.session = MyClientMessageProcessor.client.start();


        WriteBuffer writeBuffer = MyClientMessageProcessor.session.writeBuffer();
        String message = "hello smartSocket";
        byte[] buffer = message.getBytes();
        for (int i = 0; i < 10; i++) {
            writeBuffer.writeInt(buffer.length);
            writeBuffer.write(buffer);
            writeBuffer.flush();
        }

    }
}
```