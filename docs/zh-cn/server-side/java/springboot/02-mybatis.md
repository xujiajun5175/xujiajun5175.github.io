### mybatis + druid 数据连接池

**文档更新日期: {docsify-updated}**

---

#### 1.添加依赖

```xml
 <!--druid数据库连接池-->
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <properties>
        <druid.version>1.2.8</druid.version>
        <mybatis-spring-boot.version>2.2.2</mybatis-spring-boot.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
        </dependency>
        <!-- SpringBoot集成mybatis框架 -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
</project>
```

#### 2.添加配置

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: 123123123
      password: 123123123123
      url: jdbc:mysql://123123123:3306/123123?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
      # 连接池配置
      # 初始连接数
      initialSize: 5
      # 最小连接池数量
      min-idle: 10
      # 最大连接池数量
      max-active: 20
      # 配置获取连接等待超时的时间
      max-wait: 60000
      # 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
      time-between-eviction-runs-millis: 60000
      # 配置一个连接在池中最小生存的时间，单位是毫秒
      min-evictable-idle-time-millis: 300000
      # 配置一个连接在池中最大生存的时间，单位是毫秒
      max-evictable-idle-time-millis: 900000
      # 配置检测连接是否有效
      validation-query: select 1 from dual
      test-while-idle: true
      test-on-borrow: false
      test-on-return: false
      # 打开PSCache，并且指定每个连接上PSCache的大小
      pool-prepared-statements: true
      max-open-prepared-statements: 20
      max-pool-prepared-statement-per-connection-size: 20
      # webstatfilter配置
      web-stat-filter:
        enabled: true
        # 添加过滤配置
        url-pattern: /*
        # 忽略过滤的格式
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'
      stat-view-servlet:
        enabled: true
        #设置白名单，不填写允许所有访问
        allow:
        url-pattern: /druid/*
        #是否能够重置数据
        reset-enable: false
        #控制台用户名密码
        login-username: admin
        login-password: 123456
      #配置filter
      filter:
        stat:
          enabled: true
          # 慢sql记录
          log-slow-sql: true
          slow-sql-millis: 1000
          merge-sql: true
        wall:
          config:
            multi-statement-allow: true
      # Spring监控AOP切入点，如x.y.z.service.*,配置多个英文逗号分隔
      aop-patterns: com.springboot.service.*
```

![druid管理后台](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/A8JKv4.png)  
?> 登录连接池管理后台 `http://localhost:${server.port}/${server.servlet.context-path}/druid/`

#### 3.mybatis 使用 xml 方式需要额外配置

```yaml
mybatis:
  # 搜索指定包别名
  type-aliases-package: com.xujiajun.**.domain
  # 配置mapper的扫描，找到所有的mapper.xml映射文件
  mapper-locations: classpath*:mapper/**/*Mapper.xml
  # 加载全局的配置文件
  config-location: classpath:mybatis/mybatis-config.xml
```

全局配置文件,放在`/resources/mybaits/mybatis-config.xml`,仅供参考

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 全局参数 -->
    <settings>
        <!-- 使全局的映射器启用或禁用缓存 -->
        <setting name="cacheEnabled" value="true"/>
        <!-- 允许JDBC 支持自动生成主键 -->
        <setting name="useGeneratedKeys" value="true"/>
        <!-- 配置默认的执行器.SIMPLE就是普通执行器;REUSE执行器会重用预处理语句(prepared statements);BATCH执行器将重用语句并执行批量更新 -->
        <setting name="defaultExecutorType" value="SIMPLE"/>
        <!-- 指定 MyBatis 所用日志的具体实现 -->
        <setting name="logImpl" value="SLF4J"/>
        <!-- 使用驼峰命名法转换字段 -->
        <!-- <setting name="mapUnderscoreToCamelCase" value="true"/> -->
    </settings>

</configuration>

```
