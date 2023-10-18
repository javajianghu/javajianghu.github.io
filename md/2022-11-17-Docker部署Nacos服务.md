# 1. 使用Docker方式部署Nacos

nacos支持单机Derby模式，本文使用的是单机Mysql方式，就是使用外部mysql保存nacos相关数据。

## 1.1. Docker部署方式
### 1.1.1. 准备mysql数据库及sql
1. 到安装好的mysql数据库中，创建好nacos-mysql数据库。
   ```shell
   CREATE DATABASE `nacos-mysql` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';
   ```
2. 下载nacos初始化sql。
   [点击下载sql文件](https://github.com/alibaba/nacos/blob/develop/distribution/conf/mysql-schema.sql)
3. 在nacos-mysql数据库中执行删除下载的sql。
   
至此，基础数据准备完毕。

### 1.1.2. 执行docker run命令启动nacos容器
```shell
docker run -dit \
--restart=always --network host \
--name nacos -m 2048M --memory-swap=2048M \
-v /data/nacos/logs:/home/nacos/logs \
-e NACOS_APPLICATION_PORT=28848 \
-e PREFER_HOST_MODE=ip \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_DB_NAME=nacos_mysql \
-e MYSQL_SERVICE_HOST=localhost \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=123456 \
nacos/nacos-server:v2.1.1
```

参数解释：
```shell
# nacos端口，默认是8848
NACOS_APPLICATION_PORT=28848
PREFER_HOST_MODE=ip
MODE=standalone
# 数据库类型，指定为mysql
SPRING_DATASOURCE_PLATFORM=mysql
MYSQL_SERVICE_HOST=localhost
# 数据库名称，保持和上一步创建的数据库名称一致
MYSQL_SERVICE_DB_NAME=nacos_mysql
# mysql端口
MYSQL_SERVICE_PORT=3306
# mysql用户名
MYSQL_SERVICE_USER=root
# mysql密码
MYSQL_SERVICE_PASSWORD=123456
MYSQL_SERVICE_DB_PARAM=characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false
```

## 1.2. 验证
浏览器输入：
http://x.x.x.x:28848/nacos     x.x.x.x 是部署nacos的那台服务器地址
输入默认用户名、密码：nacos