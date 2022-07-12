### logback 日志 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

Spring Boot 在所有内部日志中使用 Commons Logging，但是默认配置也提供了对常用日志的支持，如：Java Util Logging，Log4J,
Log4J2 和 Logback。每种 Logger 都可以通过配置使用控制台或者文件输出日志内容。

SLF4J —— Simple Logging Facade For Java，它是一个针对于各类 Java 日志框架的统一 Facade 抽象。Java 日志框架众多——常用的有 java.util.logging, log4j,
logback，commons-logging, Spring 框架使用的是 Jakarta Commons Logging
API（JCL）。而 SLF4J 定义了统一的日志抽象接口，而真正的日志实现则是在运行时决定的——它提供了各类日志框架的绑定。

Logback 是 log4j 框架的作者开发的新一代日志框架，它效率更高、能够适应诸多的运行环境，同时天然支持 SLF4J。

默认情况下，Spring Boot 会用 Logback 来记录日志，并用 INFO 级别输出到控制台。在运行应用程序和其他例子时，你应该已经看到很多 INFO 级别的日志了。

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/f7c8Eq.png)

从上面可以看到，日志输出内容元素具体如下：

1. 时间日期：精确到毫秒；
2. 日志级别：ERROR, WARN, INFO, DEBUG or TRACE；
3. 进程 ID；
4. 分隔符：---标识实际日志的开始；
5. 线程名：方括号括起来（可能会截断控制台输出）；
6. Logger 名：通常使用源代码的类名；
7. 日志内容。

#### 1.引入依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-logging</artifactId>
    </dependency>
</dependencies>
```

?> Spring Boot 启动的时候，由 org.springframework.boot.logging.Logging-Application-Listener 根据情况初始化并使用。

#### 2.配置

##### 2.1.控制台输出

- 日志级别从低到高分为 TRACE < DEBUG < INFO < WARN < ERROR < FATAL
- Spring Boot 中默认配置 ERROR、WARN 和 INFO 级别的日志输出到控制台

##### 2.2.文件输出

默认情况下，Spring Boot 将日志输出到控制台，不会写到日志文件。如果要编写除控制台输出之外的日志文件，则需在 application.properties 中设置 logging.file 或 logging.path 属性。

- logging.file，设置文件，可以是绝对路径，也可以是相对路径。如：logging.file=my.log。
- logging.path，设置目录，会在该目录下创建 spring.log 文件，并写入日志内容，如：logging.path=/var/log。
  !> 如果只配置 logging.file，会在项目的当前路径下生成一个 xxx.log 日志文件。 <br> 如果只配置 logging.path，在 /var/log 文件夹生成一个日志文件为 spring.log。

##### 2.3.级别控制

所有支持的日志记录系统都可以在 Spring 环境中设置记录级别（例如在 application.properties 中） 格式为：`logging.level.* = LEVEL`

- loggin-level: 日志级别控制前缀, `*`为包名或者 Logger 名
- LEVEL: TRACE < DEBUG < INFO < WARN < ERROR < FATAL

```yaml
logging:
  level:
    com.xujiajun: error
    org.springframework: warn
    org.apache: warn
```

##### 2.4.自定义日志配置

由于日志服务一般都在 ApplicationContext 创建前就初始化了，它并不是必须通过 Spring 的配置文件控制。因此通过系统属性和传统的 Spring Boot 外部配置文件依然可以很好的支持日志控制和管理。
根据不同的日志系统，你可以按如下规则组织配置文件名，就能被正确加载：

- Logback：logback-spring.xml, logback-spring.groovy, logback.xml, logback.groovy
- Log4j：log4j-spring.properties, log4j-spring.xml, log4j.properties, log4j.xml
- Log4j2：log4j2-spring.xml, log4j2.xml
- JDK (Java Util Logging)：logging.properties
  !> Spring Boot 官方推荐优先使用带有-spring 的文件名作为你的日志配置（如使用 logback-spring.xml，而不是 logback.xml），命名为 logback-spring.xml 的日志配置文件，spring
  boot 可以为它添加一些 spring boot 特有的配置项
  如果你即想完全掌控日志配置，但又不想用 logback.xml 作为 Logback 配置的名字，可以在 application.properties 配置文件里面通过 logging.config 属性指定自定义的名字：

```properties
logging.config=classpath:logging-config.xml
```

**logback-spring.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan-="true" scanPeriod="60 seconds" debug="false">
    <!--    设置上下文名称-->
    <contextName>logback</contextName>
    <!-- 日志存放路径 -->
    <property name="log.path" value="${user.dir}/logs/ruoyi/logs"/>
    <!--	<property name="log.path" value="/home/ruoyi/logs" />-->
    <!-- 日志输出格式 -->
    <property name="log.pattern" value="%d{HH:mm:ss.SSS} %contextName [%thread] %-5level %logger{36} - %msg%n"/>
    <!-- 控制台输出 -->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <!--        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">-->
        <!--            <level>ERROR</level>-->
        <!--        </filter>-->
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>
    <!-- 系统日志输出 -->
    <appender name="file_info" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/sys-info.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/sys-info.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 30天 -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 过滤的级别 -->
            <level>INFO</level>
            <!-- 匹配时的操作：接收（记录） -->
            <onMatch>ACCEPT</onMatch>
            <!-- 不匹配时的操作：拒绝（不记录） -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    <appender name="file_error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/sys-error.log</file>
        <!-- 循环政策：基于时间创建日志文件 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志文件名格式 -->
            <fileNamePattern>${log.path}/sys-error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 60天 -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!-- 过滤的级别 -->
            <level>ERROR</level>
            <!-- 匹配时的操作：接收（记录） -->
            <onMatch>ACCEPT</onMatch>
            <!-- 不匹配时的操作：拒绝（不记录） -->
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    <!-- 用户访问日志输出  -->
    <appender name="sys-user" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/sys-user.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 按天回滚 daily -->
            <fileNamePattern>${log.path}/sys-user.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!-- 日志最大的历史 60天 -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${log.pattern}</pattern>
        </encoder>
    </appender>
    <!-- 系统模块日志级别控制  -->
    <logger name="com.ruoyi" level="info"/>
    <!-- Spring日志级别控制  -->
    <logger name="org.springframework" level="warn"/>
    <root level="info">
        <appender-ref ref="console"/>
    </root>
    <!--系统操作日志-->
    <root level="info">
        <appender-ref ref="file_info"/>
        <appender-ref ref="file_error"/>
    </root>
    <!--系统用户操作日志-->
    <logger name="sys-user" level="info">
        <appender-ref ref="sys-user"/>
    </logger>
</configuration>
```

> 文章转载:https://mrbird.cc/Spring-Boot-logback.html
