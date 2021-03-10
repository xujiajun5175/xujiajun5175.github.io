# **Docker mysql&&mariaDB**





1. 创建容器

   ```shell
   docker run -p 3310:3306 --name eduMysql \
   
   -v /opt/edu/mysql/conf:/etc/mysql \
   
   -v /opt/edu/mysql/logs:/var/log/mysql \
   
   -v /opt/edu/mysql/data:/var/lib/mysql \
   
   -e MYSQL_ROOT_PASSWORD=123456 \
   
   -d mysql:5.7
   
   
   ```

2. 链接mysql

   ```shell
   sudo docker exec -it 名字 bash
   mysql -uroot -p123456
   ```

3. mysql授权

   ```shell
   grant all privileges on *.* to root@'%' identified by "password";
   
   flush privileges;
   
   use mysql;
   
   select User,authentication_string,Host from user
   ```



