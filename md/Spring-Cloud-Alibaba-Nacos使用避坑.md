
# 各模块版本
- spring boot：4.0.8
- spring cloud：2025.1.0
- spring cloud alibaba：2025.1.0.0
- nacos：3.2.4

# 避坑一：管理地址变化

如果你使用过nacos 2.x 的版本，页面管理页面访问地址为：http://localhost:8848/nacos，现在官方默认地址改为：http://localhost:8080，初次进入需要设置用户名密码。

# 避坑二：nacos_mysql.sql文件找不到了

官方的回答是：https://nacos.io/en/blog/faq/nacos-user-question-history8180/?spm=5238cd80.2ef5001f.0.0.3f613b7cN4D4qI#%E7%94%A8%E6%88%B7%E9%97%AE%E9%A2%98
简单描述下就是，在Nacos2.x版本中，`nacos-mysql.sql`文件已被重命名为`mysql-schema.sql`，因此在`nacos/conf`目录下直接寻找`nacos-mysql.sql`会找不到。请检查您的Nacos版本，如果是2.x版本或以上，您应该查找的是`mysql-schema.sql`文件，它位于相同的`nacos/conf`目录下。

github上的sql地址为：https://github.com/alibaba/nacos/blob/develop/plugin-default-impl/nacos-default-datasource-plugin/nacos-datasource-plugin-mysql/src/main/resources/META-INF/mysql-schema.sql

# 避坑三：springboot3以上 bootstrap.yaml和 shared-configs不可用

由于springboot2.4.0+版本修改，如果需要使用bootstrap.yaml需要引入下面依赖.
```xml
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```
当然也可以去掉,bootstrap.yaml直接使用application.yaml。

同样nacos配置文件，需要使用spring.config.import的方式，shared-configs 不可用了。
```
# 下面配置shared-configs不可用了
spring:
  application:
    name: nacos-test
  cloud:
    nacos:
      username: nacos
      password: nacos
      config:
        server-addr: localhost:8848
        # 用于共享的配置文件
        shared-configs:
          - data-id: common.yaml
            group: DEFAULT_GROUP
```

新的方式：
```
spring:
  application:
    name: nacos-test
  cloud:
    nacos:
      username: nacos
      password: nacos
      config:
        server-addr: localhost:8848
  config:
	import:
	  # optional的意思是可选配置，如果没有配置不影响启动，nacos表示这个配置在nacos中
	  - optional:nacos:common.yaml?group=DEFAULT_GROUP&refreshEnabled=true
```

# 避坑四：什么配置都是对的，就是无法注册服务

当你的nacos-discovery依赖也加了，application.yaml中spring.cloud.nacos.discovery也配置了，但是登录nacos管理后台就是服务就是无法正确注册，那你就要看看是不是你忘记写:spring.application.name了，我就是被这个问题折腾了一下。


# 最后，写了个docker-compose的nacos命令

docker-compose.yaml
```
version: '3.9'
services:
  nacos-server:
    image: nacos/nacos-server:v3.2.4
    container_name: nacos-server
    env_file:
      - ${PWD}/nacos-standlone-mysql.env
    volumes:
      - ${PWD}/logs/:/home/nacos/logs
    ports:
      - "8848:8848"
      - "9848:9848"
      - "8080:8080"
    restart: always
```

nacos-standlone-mysql.env
```
MODE=standalone  
SPRING_DATASOURCE_PLATFORM=mysql  
MYSQL_SERVICE_HOST=localhost  
MYSQL_SERVICE_DB_NAME=nacos_mysql  
MYSQL_SERVICE_PORT=3306  
MYSQL_SERVICE_USER=root  
MYSQL_SERVICE_PASSWORD=123456  
MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false  

# nacos控制台端口
NACOS_CONSOLE_PORT=8080
NACOS_AUTH_ENABLE=true  
NACOS_AUTH_TOKEN=${记得改我：Nacos 用于生成JWT Token的密钥，使用长度大于32字符的字符串，再经过Base64编码}
NACOS_AUTH_IDENTITY_KEY=${记得改我：Nacos Server端之间 Inner API的身份标识的Key，必填}
NACOS_AUTH_IDENTITY_VALUE=${记得改我：Nacos Server端之间 Inner API的身份标识的Value，必填}
```