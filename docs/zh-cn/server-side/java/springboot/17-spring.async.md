### Spring Boot 异步调用 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

通常我们开发的程序都是同步调用的，即程序按照代码的顺序一行一行的逐步往下执行，每一行代码都必须等待上一行代码执行完毕才能开始执行。

而异步编程则没有这个限制，代码的调用不再是阻塞的。所以在一些情景下，通过异步编程可以提高效率，提升接口的吞吐量

#### 1.开启异步

**入口类**

```java

@SpringBootApplication
@EnableAsync
public class SourceStudyApplication19 {
    public static void main(String[] args) {
        SpringApplication.run(SourceStudyApplication19.class);
    }
}
```

**异步方法**

```java

@Slf4j
@Service
public class TestService {
    @Async
    public void asyncMethod() {
        sleep();
        log.info("异步方法内部线程名称:{}", Thread.currentThread().getName());
    }

    public void syncMethod() {
        sleep();
        log.info("线程名称:{}", Thread.currentThread().getName());
    }


    private void sleep() {
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

上面的 Service 中包含一个异步方法`asyncMethod`（开启异步支持后，只需要在方法上加上`@Async` 注解便是异步方法了）和同步方法 `syncMethod`。`sleep` 方法用于让当前线程阻塞 2 秒钟。

**Controller**

```java

@RestController
@Slf4j
public class TestController {
    @Autowired
    private TestService testService;


    @GetMapping("async")
    public void testAsync() {
        long start = System.currentTimeMillis();
        log.info("异步方法开始:");
        testService.asyncMethod();
        log.info("异步方法结束");
        long end = System.currentTimeMillis();
        log.info("异步方法总计耗时:{} ms", end - start);

    }


    @GetMapping("sync")
    public void testSync() {
        long start = System.currentTimeMillis();
        log.info("同步方法开始:");
        testService.syncMethod();
        log.info("同步方法结束");
        long end = System.currentTimeMillis();
        log.info("同步方法总计耗时:{} ms", end - start);

    }


}
```

同步调用结果:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/PnnEvQ.png)

异步调用结果:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/nUQWtc.png)

可看到 `testAsync` 方法耗时极少，因为异步的原因，程序并没有被 `sleep` 方法阻塞，这就是异步调用的好处。同时异步方法内部会新启一个线程来执行，这里线程名称为 task - 1。

?> 默认情况下的异步线程池配置使得线程不能被重用，每次调用异步方法都会新建一个线程，我们可以自己定义异步线程池来优化

#### 2.自定义异步线程池

**config 配置类**

```java

@Configuration
public class AsyncPoolConfig {
    @Bean
    public ThreadPoolTaskExecutor asyncThreadPoolTaskExec() {
        ThreadPoolTaskExecutor pool = new ThreadPoolTaskExecutor();
        pool.setCorePoolSize(20);
        pool.setMaxPoolSize(200);
        pool.setQueueCapacity(25);
        pool.setKeepAliveSeconds(200);
        pool.setThreadNamePrefix("asyncThread");
        pool.setWaitForTasksToCompleteOnShutdown(true);
        pool.setAwaitTerminationSeconds(60);
        pool.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        pool.initialize();
        return pool;

    }
}
```

上面我们通过 `ThreadPoolTaskExecutor` 的一些方法自定义了一个线程池，这些方法的含义如下所示：

- corePoolSize：线程池核心线程的数量，默认值为 1（这就是默认情况下的异步线程池配置使得线程不能被重用的原因）。
- maxPoolSize：线程池维护的线程的最大数量，只有当核心线程都被用完并且缓冲队列满后，才会开始申超过请核心线程数的线程，默认值为 `Integer.MAX_VALUE`。
- queueCapacity：缓冲队列。
- keepAliveSeconds：超出核心线程数外的线程在空闲时候的最大存活时间，默认为 60 秒。
- threadNamePrefix：线程名前缀。
- waitForTasksToCompleteOnShutdown：是否等待所有线程执行完毕才关闭线程池，默认值为 `false`。
- awaitTerminationSeconds：`waitForTasksToCompleteOnShutdown` 的等待的时长，默认值为 0，即不等待。
- rejectedExecutionHandler：当没有线程可以被使用时的处理策略（拒绝任务），默认策略为 `abortPolicy`，包含下面四种策略：
  ![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uUuq3I.png)
  - callerRunsPolicy：用于被拒绝任务的处理程序，它直接在 `execute` 方法的调用线程中运行被拒绝的任务；如果执行程序已关闭，则会丢弃该任务。
  - abortPolicy：直接抛出 `java.util.concurrent.RejectedExecutionException` 异常。
  - discardOldestPolicy：当线程池中的数量等于最大线程数时、抛弃线程池中最后一个要执行的任务，并执行新传入的任务。
  - discardPolicy：当线程池中的数量等于最大线程数时，不做任何动作。

**使用**
要使用该线程池，只需要在`@Async` 注解上指定线程池 `Bean` 名称即可：

```java

@Slf4j
@Service
public class TestService {
    ......

    @Async("asyncThreadoolTaskExecutor")
    public void asyncMethod() {
        sleep();
        log.info("异步方法内部线程名称:{}", Thread.currentThread().getName());
    }

    ......
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/70SIXT.png)

#### 3.处理异步回调

如果异步方法具有返回值的话，需要使用 `Future` 来接收回调值。

**异步方法**

我们修改 `TestService` 的 `asyncMethod` 方法，给其添加返回值：

```java

@Slf4j
@Service
public class TestService {
    @Async("asyncThreadPoolTaskExec")
    public Future<String> asyncMethod() {
        sleep();
        log.info("异步方法内部线程名称:{}", Thread.currentThread().getName());
        return new AsyncResult<>("hello async");
    }

    ......
}

```

泛型指定返回值的类型，`AsyncResult` 为 Spring 实现的 `Future` 实现类：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/msbhpE.png)

**controller**

```java

@RestController
@Slf4j
public class TestController {
    @Autowired
    private TestService testService;


    @SneakyThrows
    @GetMapping("async")
    public String testAsync() {
        long start = System.currentTimeMillis();
        log.info("异步方法开始:");
        Future<String> stringFuture = testService.asyncMethod();
        String result = stringFuture.get();
        log.info("异步方法的返回值是:{}", result);
        log.info("异步方法结束");
        long end = System.currentTimeMillis();
        log.info("异步方法总计耗时:{} ms", end - start);
        return result;

    }
}
```

?> `Future`接口的`get`方法用于获取异步调用的返回值。

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Nygu7l.png)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/G9IV60.png)

通过返回结果我们可以看出`Future`的`get`方法为阻塞方法，只有当异步方法返回内容了，程序才会继续往下执行。

`get`还有一个`get(long timeout, TimeUnit unit)`
重载方法，我们可以通过这个重载方法设置超时时间，即异步方法在设定时间内没有返回值的话，直接抛出`java.util.concurrent.TimeoutException`异常。

比如设置超时时间为 60 秒：

```java
String result=stringFuture.get(60,TimeUnit.SECONDS);
```
