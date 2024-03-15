package top.sintang.kafkademo.producer;

import top.sintang.kafkademo.domain.Demo01Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.concurrent.ExecutionException;

@Component
public class Demo01Producer {

    @Autowired
    private KafkaTemplate<Object,Object> kafkaTemplate;

    public SendResult<Object, Object> syncSend(String id) throws ExecutionException, InterruptedException {
        Demo01Message message = new Demo01Message(id);
        return kafkaTemplate.send(Demo01Message.TOPIC,message).get();
    }

    public ListenableFuture<SendResult<Object, Object>> asyncSend(String id){
        Demo01Message message = new Demo01Message(id);
        return kafkaTemplate.send(Demo01Message.TOPIC,message);
    }
}
