### SpringApplication <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

在 Spring Boot 的入口类中，我们通常是通过调用`SpringApplication`的 run 方法来启动 Spring Boot 项目。

这节我们来深入学习下 SpringApplication 的一些细节。

#### 1.自定义 SpringApplication

默认的我们都是直接通过 SpringApplication 的 run 方法来直接启动 Spring Boot，其实我们可以通过一些 API 来调整某些行为。

##### 1.1.通过 SpringApplication API 调整

**入口类**

```java

@SpringBootApplication
public class SourceStudyApplication17 {
    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(SourceStudyApplication17.class);
        springApplication.setBannerMode(Banner.Mode.OFF);
        springApplication.setWebApplicationType(WebApplicationType.NONE);
        springApplication.setAdditionalProfiles("dev");
        springApplication.run(args);
    }
}
```

通过调用 SpringApplication 的方法，我们关闭了 Banner 的打印，设置应用环境为非 WEB 应用，profiles 指定为 dev。

其他方法:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/LxBctI.png)

##### 1.2.通过 SpringApplicationBuilder API 调整

```java

@SpringBootApplication
public class SourceStudyApplication17 {
    public static void main(String[] args) {
        new SpringApplicationBuilder(SourceStudyApplication17.class)
                .bannerMode(Banner.Mode.OFF)
                .web(WebApplicationType.NONE)
                .profiles("dev")
                .run(args);
    }
}
```

#### 2.SpringApplication 准备阶段

SpringApplication 的生命周期阶段大致可以分为准备阶段和运行阶段。

`SpringApplication`有参构造器:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/5who7X.png)

通过有参构造器里的代码我们可以将 SpringApplication 的准备阶段分为以下几个步骤：

##### 2.1.配置源

构造器中`this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));`这行代码用于加载我们配置的 Spring Boot Bean 源。

通常我们使用 SpringApplication 或者 SpringApplicationBuilder 的构造器来直接指定源。

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/cxNBEj.png)

我们也可以将上面的代码改为下面这种方式：

```java
public class SourceStudyApplication17 {
    public static void main(String[] args) {
        new SpringApplicationBuilder(ApplicationSource.class)
                .bannerMode(Banner.Mode.OFF)
                .web(WebApplicationType.NONE)
                .profiles("dev")
                .run(args);
    }
    @SpringBootApplication
    public static class ApplicationSource {
    }
}
```

查看 SpringApplication 的单个参数构造器：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/N6JCSY.png)

说明我们除了配置单个源外，还可以配置多个源。

##### 2.2.推断应用类型

构造器中这行`this.webApplicationType = WebApplicationType.deduceFromClasspath();`代码用于推断当前 Spring Boot 应用类型

Spring Boot 2.0 后，应用可以分为下面三种类型：

- WebApplicationType.NONE：非 WEB 类型；
- WebApplicationType.REACTIVE：Web Reactive 类型；
- WebApplicationType.SERVLET：Web Servlet 类型。

?> WebApplicationType.deduceFromClasspath()方法根据当前应用 ClassPath 中是否存在相关的实现类来判断应用类型到底是哪个

deduceFromClasspath 方法的源码如下所示:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/9MBfp6.png)

?> 我们也可以直接通过 SpringApplication 的 setWebApplicationType 方法或 SpringApplicationBuilder 的 web 方法来指定当前应用的类型。

##### 2.3.加载应用上下文初始器

接着下一行代码`setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));`
用于加载应用上下文初始器`ApplicationContextInitializer`。

`getSpringFactoriesInstances`方法的源码如下所示：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/98opL6.png)

上面代码利用 Spring 工厂加载机制，实例化 ApplicationContextInitializer 实现类，并进行排序。

所以我们可以通过实现 ApplicationContextInitializer 接口用于在 Spring Boot 应用初始化之前执行一些自定义操作。

举例测试:

**编写 ApplicationContextInitializer 实现类**

```java

@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class HelloApplicationContextInitializer implements ApplicationContextInitializer {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        log.info("ConfigurableApplicationContext.id - {}", applicationContext.getId());
    }
}
```

上面代码中实现了 initialize 方法，并且使用@Order 注解指定优先级

其中`Ordered.HIGHEST_PRECEDENCE`等于`Integer.MIN_VALUE`，`Ordered.LOWEST_PRECEDENCE`等于`Integer.MAX_VALUE`。所以数值越小，优先级越高。

除了使用`@Order`注解来指定优先级外，我们也可以通过实现`org.springframework.core.Ordered`接口的`getOrder`方法来指定优先级。

接着我们来创建一个优先级比 HelloApplicationContextInitializer 低的 Initializer —— AfterHelloApplicationContextInitializer：

```java

@Slf4j
public class AfterHelloApplicationContextInitializer implements ApplicationContextInitializer, Ordered {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        log.info("AfterHelloApplicationContextInitializer:{}", applicationContext.getId());
    }
    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}
```

**编写 spring 工厂配置文件**

在 resources 目录下新建 META-INF 目录，并创建 spring.factories 文件

```properties
# initializers
org.springframework.context.ApplicationContextInitializer=\
com.xujiajun.initializer.HelloApplicationContextInitializer,\
com.xujiajun.initializer.AfterHelloApplicationContextInitializer
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/O5VVh4.png)

?> 启动 Spring Boot 项目，会发现控制台在打印 Banner 后就执行了这两个初始化器，并且 HelloApplicationContextInitializer 的`initialize`
方法执行时机先于 AfterHelloApplicationContextInitializer 的`initialize`方法：

##### 2.4.加载应用事件监听器

在加载完应用上下文初始器后，下一行的`setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));`代码加载了应用事件监听器。

与加载事件上下文初始器类似，Spring Boot 也是通过 Spring 的工厂方法来实例化`ApplicationListener`的实现类，并进行排序。

既然是事件监听，那么其可以监听什么事件呢？其监听的是`ApplicationEvent`接口的实现类，我们查看一下都有哪些事件实现了这个接口：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/WuJVHW.png)

这里我们以`ContextClosedEvent`为例子来编写自定义的应用事件监听器，监听 Spring 上下文关闭事件。

**编写 ApplicationListerer 实现类**

```java

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ContextClosedEventListener implements ApplicationListener<ContextClosedEvent> {
    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
        log.info("ContextClosedEvent: {}", event.getApplicationContext().getId());
    }
}
```

上面代码实现了对`ContextClosedEvent`事件的监听，并且分配了最高优先级。

接着创建一个优先级比`ContextClosedEventListener`低的监听器`AfterContextClosedEventListener`：

```java

@Slf4j
public class AfterContextClosedEventListener implements ApplicationListener<ContextClosedEvent>, Ordered {
    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
        log.info("AfterContextClosedEvent: {}", event.getApplicationContext().getId());
    }
    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 1;
    }
}
```

**spring 工程配置文件**

```properties
# application listeners
org.springframework.context.ApplicationListener=\
  com.xujiajun.listener.ContextClosedEventListener,\
  com.xujiajun.listener.AfterContextClosedEventListener
```

**入口类**

```java

@SpringBootApplication
public class SourceStudyApplication17 {
    public static void main(String[] args) {
        new SpringApplicationBuilder(SourceStudyApplication17.class)
                .web(WebApplicationType.NONE)
                .run(args);
    }
}
```

?> 在 Spring Boot 入口类中将环境指定为非 WEB 环境（这样在启动后应用会马上关闭)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/ipT6Tc.png)

##### 2.5.推断入口类

接着构造器里的代码下一行`this.mainApplicationClass = deduceMainApplicationClass();`用于推断运行 Spring Boot 应用的入口类。

查看`deduceMainApplicationClass`方法源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/2ONVlH.png)

代码主要逻辑是根据 Main 线程执行堆栈判断实际的入口类。

准备阶段介绍完毕后，接下来开始介绍运行阶段。

#### 3.SpringApplication 运行阶段

SpringApplication 的运行阶段对应 SpringApplication 的 run 方法，我们查看其源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/zmh60f.png)

运行阶段大致可以分为下面这几个过程：

##### 3.1.开启时间监听

`run`方法开头的这两行代码用于开启时间监听:

```java
StopWatch stopWatch=new StopWatch();
        stopWatch.start();
```

上面代码用于开启 Spring Boot 应用启动时间监听，配合下面的`stopWatch.stop();`便可以计算出完整的启动时间。

##### 3.2.开启运行监听器

spring 应用运行监听器(SpringApplicationRunListener)

```java
SpringApplicationRunListeners listeners=getRunListeners(args);
        listeners.started();
```

`getRunListeners`源码:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/XMrAfM.png)

上面代码通过`SpringFactoriesLoader`检索`META-INF/spring.factories`找到声明的所有`SpringApplicationRunListener`
的实现类并将其实例化，然后装配到`List<SpringApplicationRunListener>`运行监听器集合中。

`listeners.started();`用于遍历运行监听器集合中的所有`SpringApplicationRunListener`的实现类，并逐一调用它们的`starting`方法，广播 Spring Boot 应用要开始启动了。

在 Spring Boot 中`SpringApplicationRunListener`接口用于监听整个 Spring Boot 应用生命周期，其代码如下所示：

```java
public interface SpringApplicationRunListener {
    void starting();
    void environmentPrepared(ConfigurableEnvironment environment);
    void contextPrepared(ConfigurableApplicationContext context);
    void contextLoaded(ConfigurableApplicationContext context);
    void started(ConfigurableApplicationContext context);
    void running(ConfigurableApplicationContext context);
    void failed(ConfigurableApplicationContext context, Throwable exception);
}
```

这些方法对应着 Spring Boot 应用生命周期的各个阶段：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/iPxnqc.png)

**编写 SpringApplicationRunListener 实现类**

```java
//@Slf4j
public class HelloApplicationRunListener implements SpringApplicationRunListener {
    public HelloApplicationRunListener(SpringApplication application, String... args) {
    }
    @Override
    public void starting(ConfigurableBootstrapContext bootstrapContext) {
        //log.info("HelloApplicationRunListener starting ...");
        System.out.println("HelloApplicationRunListener starting ...");
    }
    @Override
    public void environmentPrepared(ConfigurableBootstrapContext bootstrapContext, ConfigurableEnvironment environment) {
    }
    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
    }
    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
    }
    @Override
    public void started(ConfigurableApplicationContext context) {
    }
    @Override
    public void running(ConfigurableApplicationContext context) {
    }
    @Override
    public void failed(ConfigurableApplicationContext context, Throwable exception) {
    }
}
```

**Spring 工厂配置**

```properties
# application run listeners
org.springframework.boot.SpringApplicationRunListener=com.xujiajun.runlistener.HelloApplicationRunListener
```

因为其基于 Spring 的工厂方法来实现，所以我们需要在 spring.factories 文件里配置这个实现类:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/OUU3i1.png)

!> Spring Boot 应用刚启动的时候 Slf4j 还没有加载,日志如法打印.需要使用 System 输出流打印

##### 3.3.创建 Environment

run 方法中的这行代码用于创建并配置当前 SpringBoot 应用将要使用的 Environment（包括配置要使用的 PropertySource 以及 Profile）：

```java
ConfigurableEnvironment environment=prepareEnvironment(listeners,applicationArguments);
```

我们已经在准备阶段里推断出了应用类型，这里只要根据相应的应用类型来创建相应的应用环境即可，类型和环境对应关系如下：

- Web Reactive： StandardReactiveWebEnvironment
- Web Servlet： StandardServletEnvironment
- 非 Web： StandardEnvironment

?> 在 prepareEnvironment 方法中会执行`listeners.environmentPrepared(environment);`
，用于遍历调用所有`SpringApplicationRunListener`
实现类的`environmentPrepared()`方法，广播 Environment 准备完毕

##### 3.4.是否打印 banner

run 方法中的这行代码会根据我们的配置来决定是否打印 Banner：

```java
Banner printedBanner=printBanner(environment);
```

##### 3.5.创建 Context

run 方法中的这行代码用于创建 ApplicationContext：

```java
context=createApplicationContext();

```

不同的环境对应不同的 ApplicationContext：

- Web Reactive： AnnotationConfigReactiveWebServerApplicationContext
- Web Servlet： AnnotationConfigServletWebServerApplicationContext
- 非 Web： AnnotationConfigApplicationContext

##### 3.6.装配 Context

run 方法中的这行代码用于装配 Context：

```java
prepareContext(context,environment,listeners,applicationArguments,printedBanner);
```

源码:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/CBUbKq.png)

`prepareContext`方法

- 开头为 ApplicationContext 加载了 environment
- 之后通过 applyInitializers 方法逐个执行 ApplicationContextInitializer 的`initialize`方法来进一步封装 ApplicationContext，
  并调用所有的 SpringApplicationRunListener 实现类的 contextPrepared 方法， 广播 ApplicationContext 已经准备完毕了。
- 之后初始化 IOC 容器，并调用 SpringApplicationRunListener 实现类的 contextLoaded 方法，广播 ApplicationContext 加载完成，这里就包括通过`@EnableAutoConfiguration`
  导入的各种自动配置类。

##### 3.7.Refresh Context

run 方法中的这行代码用于初始化所有自动配置类，并调用 ApplicationContext 的 refresh 方法：

```java
refreshContext(context);
```

##### 3.8.广播应用已启动

run 方法中的这行代码用于广播 Spring Boot 应用已启动：

```java
listeners.started(context);
```

?> `started`方法会调用所有的 SpringApplicationRunListener 的`finished`方法，广播 SpringBoot 应用已经成功启动。

##### 3.9.执行 Runner

run 方法中的这行代码`callRunners(context, applicationArguments);`遍历所有 ApplicationRunner 和 CommandLineRunner 的实现类，并执行其 run 方法。

我们可以实现自己的 ApplicationRunner 或者 CommandLineRunner，来对 Spring Boot 的启动过程进行扩展。

**编写 ApplicationRunner 实现类**

```java
package com.xujiajun.runner;

@Component
@Slf4j
public class HelloApplicationRunner implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("HelloApplicationRunner: hello spring boot");
    }
}
```

?> 这里我们需要将 HelloApplicationRunner 使用@Component 注解标注，让其注册到 IOC 容器中。

**编写 CommandLineRunner 实现类**

```java
package com.xujiajun.runner;

@Slf4j
@Component
public class HelloCommandLineRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        log.warn("HelloCommandLineRunner: hello spring boot");
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/lb5ehi.png)

##### 3.10.广播应用运行中

run 方法中的这行代码`listeners.running(context);`用于调用 SpringApplicationRunListener 的 running 方法，广播 Spring Boot 应用正在运行中。

当 run 方法运行出现异常时，便会调用`handleRunFailure`方法来处理异常，该方法里会通过`listeners.failed(context, exception);`
来调用 SpringApplicationRunListener 的 f`ailed`方法，广播应用启动失败，并将异常扩散出去。

?> 上面所有的广播事件都是使用 Spring 的应用事件广播器接口 ApplicationEventMulticaster 的实现类 SimpleApplicationEventMulticaster 来进行广播的。
