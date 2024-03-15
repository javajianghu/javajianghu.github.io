package top.sintang.kafkademo.consumer;

import top.sintang.kafkademo.domain.Demo01Message;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class Demo01AConsumer {
    @KafkaListener(topics = Demo01Message.TOPIC,
            groupId = "demo01-A-consumer-group-" + Demo01Message.TOPIC)
    public void onMessage(ConsumerRecord<Integer, String> record) {
        System.out.println("[onMessage][线程编号:{} 消息内容：{}]" + Thread.currentThread().getId() + record);
    }
}
