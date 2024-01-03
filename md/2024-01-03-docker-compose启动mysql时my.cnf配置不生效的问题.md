# docker-compose启动mysql时my.cnf配置不生效的问题

今天使用docker-compose 部署mysql的时候，发现配置了my.cnf中的端口为23306,但是mysql容器启动的时候还是3306端口启动。

## 部署情况

### docker-compose.yaml
```yaml
version: '3.9'
services:
  mysql:
    image: mysql:5.7
    restart: always
    container_name: mysql
    environment:
      - TZ=Asia/Shanghai
      - MYSQL_ROOT_PASSWORD=123456
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /data/mysql/config/my.cnf:/etc/mysql/my.cnf
      - /data/mysql/datadir:/var/lib/mysql
    ports:
      - 23306:23306
    network_mode: "host"
```

### my.cnf
```
[mysqld]

lower_case_table_names=1
port=23306
```

### 启动docker容器
```shell
docker-compose up -d
```

启动后端口是默认的3306，检查配置也没有问题，最后在百度上找到了这个答案：
[CentOS修改MySQL端口号的方法，以及修改后不生效的问题](https://www.cnblogs.com/CUCKOO0615/p/13605416.html)

作者提示说是因为宿主机映射的my.cnf 有写权限，所以造成不生效。需要运行下面命令去掉写权限
```shell
chmod a-w my.cnf

然后ll看一下：
-r-xr-xr-x 1 root root 45 1月   3 09:55 my.cnf
```

这时再重启run容器，端口就变成了23306
