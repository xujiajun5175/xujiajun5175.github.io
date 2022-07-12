### Bean 生命周期 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

所谓 Spring Bean 的生命周期指的是 Bean 从创建到初始化再到销毁的过程，这个过程由 IOC 容器管理

#### 1.Beand 的初始化和销毁

在整个生命周期过程中，我们可以自定义 Bean 的初始化和销毁钩子函数，当 Bean 的生命周期到达相应的阶段的时候，Spring 会调用我们自定义的 Bean 的初始化和销毁方法。自定义 Bean 初始化和销毁方法有多种方式，下面逐一介绍。

##### 1.1.@Bean

上一节中介绍了可以在配置类中通过@Bean 注解来注册 Bean，我们也可以通过它来指定 Bean 的初始化和方法。

**新建 User 类**

```java
@Slf4j
public class User {
	public User() {
		log.info("调用User无参构造方法");
	}

	public void init() {
		log.info("初始化User");
	}

	public void destory() {
		log.info("销毁User");
	}
}

```

**配置类**

```java
@Configuration
public class WebConfig {
	@Bean(initMethod = "init", destroyMethod = "destory")
	public User user() {
		return new User();
	}
}

```

?> 其中 initMethod = "init"和 destroyMethod = "destory"与 User 类里的 init，destory 方法相对应。

**入口类**

```java
@SpringBootApplication
@Slf4j
public class SourceStudyApplication14 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication14.class, args);
		//返回IOC容器
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		log.info("容器创建完毕");
		User bean = context.getBean(User.class);
		//关闭IOC容器
		context.close();
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/qk2kUn.png)

1. 先调用构造方法
2. 调用初始化方法
3. 容器关闭的时候调用销毁方法

上面的情况是对于单例而言的，如果组件是多例模式又是什么情况呢？我们把上面的组件注册配置改为多例，然后再次启动项目，观察控制台输出:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/UMBUbq.png)

?> 在多例模式下，IOC 容器启动的时候并不会去创建对象，而是在每次获取的时候才会去调用方法创建对象，创建完对象后再调用初始化方法。

!> 但在容器关闭后，Spring 并没有调用相应的销毁方法，这是因为在多例模式下，容器不会管理这个组件（只负责在你需要的时候创建这个组件），所以容器在关闭的时候并不会调用相应的销毁方法。

##### 1.2.InitalizingBean & DisposableBean

除了上面这种方式指定初始化和销毁方法外，Spring 还为我们提供了和初始化，销毁相对应的接口：

1. `InitializingBean`接口包含一个`afterPropertiesSet`方法，我们可以通过实现该接口，然后在这个方法中编写初始化逻辑。
2. `DisposableBean`接口包含一个`destory`方法，我们可以通过实现该接口，然后再这个方法中编写销毁逻辑。

**新建类实现接口**

```java
@Slf4j
public class Bird implements InitializingBean, DisposableBean {
	public Bird() {
		log.info("调用Bird无参构造器");
	}

	@Override
	public void destroy() throws Exception {
		log.info("销毁User");
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		log.info("初始化User");
	}
}
```

**注册 Bean**

```java
@Configuration
public class WebConfig {
	@Bean
	public Bird bird(){
		return new Bird();
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/SyKKt5.png)

##### 1.3.@PostConstruct & @PreDestory

除了上面两种指定初始化和销毁方法的方式外，我们还可以使用@PostConstruct 和@PreDestroy 注解修饰方法来指定相应的初始化和销毁方法。
**新建类**

```java

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Slf4j
public class Fish {
	public Fish() {
		log.info("调用Fish无参构造方法");
	}

	@PostConstruct
	public void init() {
		log.info("初始化Fish");
	}

	@PreDestroy
	public void destory() {
		log.info("销毁Fish");
	}
}
```

**注册组件**

略

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/E4y5iH.png)

!> 这两个注解并非 Spring 提供，而是 JSR250 规范提供。

#### 2.BeanPostProcessor

Spring 提供了一个`BeanPostProcessor`接口，俗称**Bean 后置通知处理器**，它提供了两个方法`postProcessBeforeInitialization`和`postProcessAfterInitialization`。

- `postProcessBeforeInitialization`在组件的初始化方法调用之前执行
- `postProcessAfterInitialization`在组件的初始化方法调用之后执行。
- 它们都包含两个入参：
  - bean：当前组件对象；
  - beanName：当前组件在容器中的名称。
- 两个方法都返回一个 Object 类型，我们可以直接返回当前组件对象，或者包装后返回。

**定义接口实现类**

```java
@Slf4j
public class MyBeanPostProcessor implements BeanPostProcessor {
	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		log.info("{}:初始化之前调用", beanName);
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		log.info("{}:初始化之后调用", beanName);
		return bean;
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/DrtyDj.png)
