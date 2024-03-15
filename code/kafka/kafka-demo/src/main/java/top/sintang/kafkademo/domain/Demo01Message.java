package top.sintang.kafkademo.domain;

public class Demo01Message {
    public static final String TOPIC = "DEMO_01";

    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Demo01Message() {
    }

    public Demo01Message(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Demo01Message{" +
                "id='" + id + '\'' +
                '}';
    }
}
