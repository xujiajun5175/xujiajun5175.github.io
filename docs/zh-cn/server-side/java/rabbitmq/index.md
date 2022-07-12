### 使用docker安装



### 不使用docker安装

> 参考文档：https://blog.csdn.net/m0_67402731/article/details/124504274

#### 1.下载

- socat

  - 版本：socat-1.7.3.4.tar.gz	
  - 下载地址：http://www.dest-unreach.org/socat/download/
  - 安装文档：https://blog.csdn.net/m0_45406092/article/details/118877858

- erlang

  - 版本：erlang-22.3.4.2-1.el7.x86_64.rpm
  - 下载地址：https://github.com/rabbitmq/erlang-rpm/releases

- rabbitmq

  - 版本：rabbitmq-server-3.8.4-1.el8.noarch.rpm	
  - 下载地址：https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.8.4

  !> 注意erlang和rabbitmq的版本需要保持对应

#### 2.安装		

1. 安装erlang

   ```bash
   yum install erlang-22.3.4.2-1.el7.x86_64.rpm
   ```

2. 安装socat

   ```bash
   tar zxvf socat-1.7.3.4.tar.gz
   cd socat-1.7.3.4
   ./configure
   make 
   make install
   ```

3. 安装rabbitmq-server

   ```bash
   yum install rabbitmq-server-3.8.4-1.el8.noarch.rpm
   ```

##### 注意:安装erlang失败

报错信息 warning: rpmts_HdrFromFdno: Header V3 RSA/SHA256 Signature, key ID fd431d51: NOKEY

```bash
yum install gcc gcc-c++ make ncurses-devel openssl-devel libxml-utils xsltproc fop tk tc xz build-essential openssl unixODBC unixODBC-devel
```

如果出现rabbitmqctl命令没办法使用的

```bash
rpm --import https://github.com/rabbitmq/signing-keys/releases/download/2.0/rabbitmq-release-signing-key.asc
```





#### 3.启动/关闭服务

1. 启动服务 `service rabbitmq-server start`
2. 关闭服务 `service rabbitmq-server stop`
3. 查看服务状态 `service rabbitmq-server status`
4. 重启服务 `service rabbitmq-server restart`



#### 4.管理

启动服务
`service rabbitmq-server start`
启动插件页面管理
`rabbitmq-plugins enable rabbitmq_management`

创建用户
rabbitmqctl add_user admin admin
创建用户
rabbitmqctl set_user_tags admin administrator
赋予权限
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*”





#### 5.访问

点击浏览器，访问http://ip:15672，输入设置的用户名和密码，首次访问可能有点慢。







#### 6.卸载

```bash
service rabbitmq-server stop
yum list rabbitmq-server
yum remove rabbitmq-server
yum list socat
yum remove socat
yum list erlang
yum remove erlang

```





?> 版权声明：本文为CSDN博主「m0_67402731」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。<br>原文链接：https://blog.csdn.net/m0_67402731/article/details/124504274
