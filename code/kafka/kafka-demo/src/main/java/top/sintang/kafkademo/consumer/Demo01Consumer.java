package top.sintang.kafkademo.consumer;

import top.sintang.kafkademo.domain.Demo01Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class Demo01Consumer {


    @KafkaListener(topics = Demo01Message.TOPIC, groupId = "demo01-consumer-group-" + Demo01Message.TOPIC)
    public void onMessage(Demo01Message message) {
        System.out.println("[onMessage][线程编号:{} 消息内容：{}]" + Thread.currentThread().getId() +  message);
    }
}
