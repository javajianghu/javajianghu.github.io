package top.sintang.kafkademo;

import top.sintang.kafkademo.producer.Demo01Producer;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.ListTopicsResult;
import org.apache.kafka.clients.admin.NewTopic;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.support.SendResult;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;

@SpringBootTest
class KafkaDemoApplicationTests {

    @Autowired
    private Demo01Producer demo01Producer;

    @Autowired
    private KafkaAdmin kafkaAdmin;

    @Test
    public void test(){
        kafkaAdmin.createOrModifyTopics(new NewTopic("DEMO_02",1, (short) 1));
    }

    @Test
    public void showTopicList(){
        AdminClient adminClient = AdminClient.create(kafkaAdmin.getConfigurationProperties());
        ListTopicsResult listTopicsResult = adminClient.listTopics();
        try {
            listTopicsResult.names().get().forEach(System.out::println);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }

    }


    @Test
    void testSyncSend() throws ExecutionException, InterruptedException {

        SendResult<Object, Object> syncResult = demo01Producer.syncSend("sync 消息");
        System.out.println("syncResult:" + syncResult);
        // 阻塞等待，保证消费
        new CountDownLatch(1).await();
    }

}
