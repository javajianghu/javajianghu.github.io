# smart-socket入门指南

官方地址：[smartboot 开源组织](https://smartboot.tech/)

gitee 开源地址：[smart-socket](https://gitee.com/smartboot/smart-socket)

## 介绍

smart-socket 是一款100%自研的国产开源通信框架，通过强化 AIO 的实现使其有着超越各大语言的通信性能和稳定性。

可以看到smart-socket是一款通信框架，通信框架中netty是我们最常用也是经常听别人讲起的，它是基于NIO开发的优秀的框架，其大而全的功能，基本覆盖了我们开发中的方法面面。

放眼国内开源市场，国人自主研发的通信框架有我们前面介绍的[t-io](./tio官方入门文档.md),还有本次的主角smart-socket，这两个框架都是基于AIO实现的，孰优孰劣全凭你的选择。

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