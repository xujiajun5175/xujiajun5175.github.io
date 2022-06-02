### spring 组件注册 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

接触过 Spring 的同学肯定都听过 IOC。在传统的 Java 编程中，当需要用到某个对象的时候，我们都是主动显式创建一个对象实例（new）。

使用 Spring 后就不需要这样做了，因为 Spring 会帮我们在需要用到某些对象的地方自动注入该对象，而无须我们自己去创建。

这种模式俗称控制反转，即 IOC（Inversion of
Control）。

那么 Spring 是从什么地方获取到我们所需要的对象呢？其实 Spring 给我们提供了一个 IOC 容器，里面管理着所有我们需要的对象，组件注册就是我们去告诉 Spring 哪些类需要交给 IOC 容器管理。

这里主要记录组件注册的一些细节。

#### 1.通过@Bean 注册组件

在较早版本的 Spring 中，我们都是通过 XML 的方式来往 IOC 容器中注册组件的，下面这段代码大家肯定不会陌生：

```java
// 返回 IOC 容器，基于 XML配置，传入配置文件的位置
ApplicationContext applicationContext=new ClassPathXmlApplicationContext("xxx.xml");
		User user=(User)applicationContext.getBean("user");
```

Spring 4 后推荐我们使用 Java Config 的方式来注册组件:

##### 1.1.演示

**创建一个 User 类**

```java

@ToString
@Data
@AllArgsConstructor
public class User {
	private String name;
	private Integer age;
}
```

**创建一个配置类**

```java

@Configuration
public class WebConfig {
	@Bean
	public User user() {
		return new User("xujiajun", 18);
	}
}
```

?> 通过@Bean 注解，我们向 IOC 容器注册了一个名称为 user（Bean 名称默认为方法名，我们也可以通过@Bean("myUser")方式来将组件名称指定为 myUser）。

**编写入口类**

```java

@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		//返回IOC容器,使用注解配置,传入配置类
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		User user = context.getBean(User.class);
		System.out.println(user);
	}
}

```

因为我们是通过注解方式来注册组件的，所以需要使用`AnnotationConfigApplicationContext`来获取相应的 IOC 容器，入参为配置类。

**运行结果**
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/kk4Sco.png)
说明组件注册成功。

我们将组件的名称改为`myUser`，然后看看 IOC 容器中，User 类型组件是否叫 myUser：

```java

@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		//返回IOC容器,使用注解配置,传入配置类
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
//		User user = context.getBean(User.class);
//		System.out.println(user);
		String[] beanName = context.getBeanNamesForType(User.class);
		Arrays.stream(beanName).forEach(System.out::println);
	}
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/0QtRBc.png)

#### 2.使用@ComponentScan 扫描

在使用 XML 配置组件扫描的时候，我们都是这样配置的：

```xml

<context:component-scan base-package=""></context:component-scan>

```

其中 base-package 指定了扫描的路径。路径下所有被@Controller、@Service、@Repository 和@Component 注解标注的类都会被纳入 IOC 容器中。

##### 2.1.演示

**创建 controller,service，dao**

```java

@RestController
public class UserController {
}

```

```java

@Service
public class UserService {
}
```

```java

@Repository
public class UserMapper {
}

```

```java

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class User {
	private String name;
	private Integer age;
}
```

**修改配置类**

```java

@Configuration
@ComponentScan("com.xujiajun.register")
public class WebConfig {
}
```

!> 值得注意的是，我们不能将 Spring Boot 的入口类纳入扫描范围中，否则项目启动将出错。

```java

@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		ApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		// 查看基于注解的 IOC容器中所有组件名称
		String[] beanNames = context.getBeanDefinitionNames();
		Arrays.stream(beanNames).forEach(System.out::println);
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/jaKND0.png)

?> 可见，组件已经成功被扫描进去了，并且名称默认为类名首字母小写

这里，配置类 WebConfig 也被扫描并注册了，查看@Configuration 源码就会发现原因：

```java

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
	@AliasFor(
			annotation = Component.class
	)
	String value() default "";

	boolean proxyBeanMethods() default true;
}
```

##### 2.2.制定扫描策略

@ComponentScan 注解允许我们指定扫描策略，即指定哪些被扫描，哪些不被扫描，查看其源码可发现这两个属性：

```java
/**
 * Specifies which types are eligible for component scanning.
 * <p>Further narrows the set of candidate components from everything in {@link #basePackages}
 * to everything in the base packages that matches the given filter or filters.
 * <p>Note that these filters will be applied in addition to the default filters, if specified.
 * Any type under the specified base packages which matches a given filter will be included,
 * even if it does not match the default filters (i.e. is not annotated with {@code @Component}).
 * @see #resourcePattern()
 * @see #useDefaultFilters()
 */
Filter[]includeFilters()default {};
/**
 * Specifies which types are not eligible for component scanning.
 * @see #resourcePattern
 */
		Filter[]excludeFilters()default {};
```

其中 Filter 也是一个注解:

```java
/**
 * Declares the type filter to be used as an {@linkplain ComponentScan#includeFilters
 * include filter} or {@linkplain ComponentScan#excludeFilters exclude filter}.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({})
@interface Filter {

	FilterType type() default FilterType.ANNOTATION;

	@AliasFor("classes")
	Class<?>[] value() default {};

	@AliasFor("value")
	Class<?>[] classes() default {};

	String[] pattern() default {};
}
```

接下来我们使用 excludeFilters 来排除一些组件的扫描：

```java

@Configuration
@ComponentScan(value = "com.xujiajun.register",
		excludeFilters = {
				@ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class, Repository.class}),
				@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = User.class)
		})
public class WebConfig {
}
```

上面我们指定了两种排除扫描的规则：

1. 根据注解来排除`（type = FilterType.ANNOTATION）`,这些注解的类型为`classes = {Controller.class, Repository.class}`
   。即 Controller 和 Repository 注解标注的类不再被纳入到 IOC 容器中。
2. 根据指定类型类排除`（type = FilterType.ASSIGNABLE_TYPE）`，排除类型为 User.class，其子类，实现类都会被排除

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/WVphZk.png)
可见排除成功。  
除了上面两种常用的规则外，我们还可以使用别的规则，查看`FilterType`源码：

```java
public enum FilterType {

	ANNOTATION,

	ASSIGNABLE_TYPE,

	ASPECTJ,

	REGEX,

	CUSTOM
}

```

includeFilters 的作用和 excludeFilters 相反，其指定的是哪些组件需要被扫描：

```java
@Configuration
@ComponentScan(value = "com.xujiajun.register",
		includeFilters = {
		@ComponentScan.Filter(type = FilterType.ANNOTATION,classes = Service.class),
		},useDefaultFilters = false
		)
public class WebConfig {
}
```

上面配置了只将 Service 纳入 IOC 容器，并且需要用`useDefaultFilters = false`来关闭 Spring 默认的扫描策略才能让我们的配置生效
?> Spring Boot 入口类的@SpringBootApplication 注解包含了一些默认的扫描策略

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/WDA6aG.png)

可看到，IOC 容器中将不再包含 dao，controller。

##### 2.3.多扫描策略配置

在 Java 8 之前，我们可以使用@ComponentScans 来配置多个@ComponentScan 以实现多扫描规则配置：
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uriCff.png)

而在 Java 8 中，新增了@Repeatable 注解，使用该注解修饰的注解可以重复使用，查看@ComponentScan 源码会发现其已经被该注解标注：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/zD0ygK.png)

所以除了使用@ComponentScans 来配置多扫描规则外，我们还可以通过多次使用@ComponentScan 来指定多个不同的扫描规则。

##### 2.4.自定义扫描策略

自定义扫描策略需要我们实现`org.springframework.core.type.filter.TypeFilter`接口，创建 MyTypeFilter 实现该接口：

```java
public class MyTypeFilter implements TypeFilter {
	@Override
	public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
		return false;
	}
}
```

该接口包含 match 方法，其两个入参 MetadataReader 和 MetadataReaderFactory 含义如下：

1. MetadataReader：当前正在扫描的类的信息；
2. MetadataReaderFactory：可以通过它来获取其他类的信息。

?> 当 match 方法返回 true 时说明匹配成功，false 则说明匹配失败
**修改 fitler**

```java
public class MyTypeFilter implements TypeFilter {
	@Override
	public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
		//获取当前正在扫描的类的注解信息
		AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
		//获取当前正在扫描的类的信息
		ClassMetadata classMetadata = metadataReader.getClassMetadata();
		//获取当前正在扫描的类的路径等信息
		Resource resource = metadataReader.getResource();
		String className = classMetadata.getClassName();
		return StringUtils.hasText("er");
	}
}

```

上面指定了当被扫描的类名包含 er 时候，匹配成功，配合`excludeFilters`使用意指当被扫描的类名包含 er 时，该类不被纳入 IOC 容器中。
**修改 webconfig**

```java
@Configuration
@ComponentScan(value = "com.xujiajun.register",
		excludeFilters = {
				@ComponentScan.Filter
						(type = FilterType.CUSTOM, classes = MyTypeFilter.class)
		}
)
public class WebConfig {
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/oOQsVC.png)
因为 User，UserMapper，UserService 和 UserController 等类的类名都包含 er，所以它们都没有被纳入到 IOC 容器中。

#### 3.组件作用域@Scope

默认情况下，在 Spring 的 IOC 容器中每个组件都是单例的，即无论在任何地方注入多少次，这些对象都是同一个，我们来看下例子。  
首先将 User 对象中的@Component 注解去除，然后在配置类中配置 User Bean：

```java
@Configuration
public class WebConfig {
	@Bean
	public User user(){
		return new User("xujiajun", 18);
	}
}
```

接着多次从 IOC 容器中获取这个组件，看看是否为同一个：

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		ApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		Object user1 = context.getBean("user");
		Object user2 = context.getBean("user");
		System.out.println(user1 == user2);

	}
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/dk7hCe.png)

在 Spring 中我们可以使用`@Scope`注解来改变组件的作用域：
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Xf0zUC.png)

1. singleton: 单例(默认),在 Spring IOC 容器启动的时候会调用方法创建对象然后纳入到 IOC 容器中，以后每次获取都是直接从 IOC 容器中获取（`map.get()`）；
2. prototype：原型,多实例，IOC 容器启动的时候并不会去创建对象，而是在每次获取的时候才会去调用方法创建对象；
3. request：一个请求对应一个实例；
4. 同一个 session 对应一个实例。

#### 4.懒加载@Lazy

懒加载是针对单例模式而言的，正如前面所说，IOC 容器中的组件默认是单例的，容器启动的时候会调用方法创建对象然后纳入到 IOC 容器中。

```java
@Configuration
public class WebConfig {
	@Bean
	public User user(){
		System.out.println("往IOC容器中注册user bean");
		return new User("xujiajun", 18);
	}
}
```

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		ApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		System.out.println("容器创建完毕");
//		Object user1 = context.getBean("user");
//		Object user2 = context.getBean("user");
//		System.out.println(user1 == user2);

	}
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/9XfAMl.png)

?> 可以看到，在 IOC 容器创建完毕之前，组件已经添加到容器中了。

**改成懒加载的方式**

```java
@Configuration
public class WebConfig {
	@Bean
	@Lazy
	public User user(){
		System.out.println("往IOC容器中注册user bean");
		return new User("xujiajun", 18);
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/PJDaXL.png)

?> 可看到，容器创建完的时候，User Bean 这个组件并未添加到容器中。

!> 所以懒加载的功能是，在单例模式中，IOC 容器创建的时候不会马上去调用方法创建对象并注册，只有当组件第一次被使用的时候才会调用方法创建对象并加入到容器中。

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		SpringApplication.run(SourceStudyApplication13.class, args);
		ApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		System.out.println("容器创建完毕");
		Object user1 = context.getBean("user");
		Object user2 = context.getBean("user");

	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/DwdXqs.png)

#### 5.条件注册组件

##### 5.1.@Conditional

使用`@Conditional`注解我们可以指定组件注册的条件，即满足特定条件才将组件纳入到 IOC 容器中
在使用该注解之前，我们需要创建一个类，实现 Condition 接口

```java
public class MyCondition implements Condition {
	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		return false;
	}
}
```

该接口包含一个 matches 方法，包含两个入参:

1. ConditionContext：上下文信息；
2. AnnotatedTypeMetadata：注解信息。

**完善实现类**

```java
@Slf4j
public class MyCondition implements Condition {
	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		String osName = context.getEnvironment().getProperty("os.name");
		log.info("osName:{}", osName);
		return osName != null && osName.contains("Mac OS X"); //Windows
	}
}
```

接着将这个条件添加到 User Bean 注册的地方

```java
@Configuration
public class WebConfig {
	@Bean
	@Conditional(MyCondition.class)
	public User user(){
		System.out.println("往IOC容器中注册user bean");
		return new User("xujiajun", 18);
	}
}

```

在 Mac 环境下，User 这个组件将被成功注册，如果是别的操作系统，这个组件将不会被注册到 IOC 容器中。

##### 5.2.@Profile

`@Profile`可以根据不同的环境变量来注册不同的组件，下面我们来学一下它的用法。
**新建 service**

```java
public interface CalculateService {
	Integer sum(Integer... value);
}

```

**两个实现类**

```java
@Service
@Profile("java7")
@Slf4j
public class Java7CalculateServiceImpl implements CalculateService {

	@Override
	public Integer sum(Integer... value) {
	log.info("Java7 环境下进行");
		int result = 0;
		for (int i = 0; i <= value.length; i++) {
			result += i;
		}
		return result;
	}

}
```

```java
@Service
@Profile("java8")
@Slf4j
public class Java8CalculateServiceImpl implements CalculateService {
	@Override
	public Integer sum(Integer... value) {
		log.info("java 8 环境下执行");
		return Arrays.stream(value).reduce(0, Integer::sum);
	}
}

```

**入口类**

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(SourceStudyApplication13.class)
				.web(WebApplicationType.NONE)
				.profiles("java7")
				.run(args);
		CalculateService service = context.getBean(CalculateService.class);
		System.out.println("求合结果： " + service.sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/arGqlh.png)
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/d6Ov5n.png)

#### 6.导入组件

##### 6.1.@Import

到目前为止，我们可以使用包扫描和@Bean 来实现组件注册。除此之外，我们还可以使用@Import 来快速地往 IOC 容器中添加组件。

**新建类**

```java
public class Hello {
}

```

**配置类**

```java
@Configuration
@Import({Hello.class})
public class WebConfig {

}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/gsZjoH.png)

?> 可看到，通过@Import 我们可以快速地往 IOC 容器中添加组件，Id 默认为全类名

##### 6.2.ImportSelector

通过@Import 我们已经实现了组件的导入，如果需要一次性导入较多组件，我们可以使用 ImportSelector 来实现。

**新增 Apple,Banana,Watermelon 类**

略

查看`ImportSelector`源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/YaThn9.png)

`ImportSelector`是一个接口，包含一个`selectImports`方法，方法返回类的全类名数组（即需要导入到 IOC 容器中组件的全类名数组），包含一个 AnnotationMetadata 类型入参，通过这个参数我们可以获取到使用 ImportSelector 的类的全部注解信息。

**新建 ImportSelector 实现**

```java
public class MyImportSelector implements ImportSelector {
	@Override
	public String[] selectImports(AnnotationMetadata importingClassMetadata) {
		return new String[]{
				"com.xujiajun.register.domain.Apple",
				"com.xujiajun.register.domain.Banana",
				"com.xujiajun.register.domain.Watermelon"
		};
	}
}

```

**配置类**

```java
@Configuration
@Import({MyImportSelector.class})
public class WebConfig {

}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/aiQ6Xy.png)

##### 6.3.ImportBeanDefinitionRegistrar

除了上面来两种,还可以使用`ImportBeanDefinitionRegistrar`手动往 IOC 容器导入组件  
查看源码

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/E8e2vf.png)

`ImportBeanDefinitionRegistrar`是一个接口，包含一个`registerBeanDefinitions`方法，该方法包含两个入参：

1. `AnnotationMetadata`：可以通过它获取到类的注解信息；
2. `BeanDefinitionRegistry`：Bean 定义注册器，包含了一些和 Bean 有关的方法：
   ![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/0ZFYV0.png)

这里我们需要借助`BeanDefinitionRegistry`的`registerBeanDefinition`方法来往 IOC 容器中注册 Bean。该方法包含两个入参，第一个为需要注册的 Bean 名称（Id）,第二个参数为 Bean 的定义信息，它是一个接口，我们可以使用其实现类`RootBeanDefinition`来完成：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/u1a2Ds.png)

**新增 Strawberry 类**

```java
public class Strawberry {
}
```

**新增 ImportBeanDefinitionRegistrar 实现类**

```java
public class MyImportBeanDefinitionregistrar implements ImportBeanDefinitionRegistrar {
	@Override
	public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
		final String beanName = "strawberry";
		boolean contain = registry.containsBeanDefinition(beanName);
		if (!contain) {
			RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(Strawberry.class);
			registry.registerBeanDefinition(beanName, rootBeanDefinition);
		}

	}
}

```

?> 在上面的实现类中，我们先通过 BeanDefinitionRegistry 的 containsBeanDefinition 方法判断 IOC 容器中是否包含了名称为 strawberry 的组件，如果没有，则手动通过 BeanDefinitionRegistry 的 registerBeanDefinition 方法注册一个。

**配置类**

```java
@Configuration
@Import({MyImportBeanDefinitionregistrar.class})
public class WebConfig {

}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/rXdhGY.png)

#### 7.FactoryBean 注册组件

Spring 还提供了一个 FactoryBean 接口，我们可以通过实现该接口来注册组件，该接口包含了两个抽象方法和一个默认方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/TJJJPl.png)

**新增类**

```java
public class Cherry {
}
```

**创建 FactoryBean 实现类**

```java
public class MyFactoryBean implements FactoryBean {
	@Override
	public Object getObject() throws Exception {
		return new Cherry();
	}

	@Override
	public Class<?> getObjectType() {
		return Cherry.class;
	}

	@Override
	public boolean isSingleton() {
		return false;
	}
}
```

- getObject 返回需要注册的组件对象，
- getObjectType 返回需要注册的组件类型，
- isSingleton 指明该组件是否为单例。

?> 如果为多例的话，每次从容器中获取该组件都会调用其 getObject 方法。

**配置类**

在配置类中注册这个类

```java
@Configuration
//@Import({MyImportBeanDefinitionregistrar.class})
public class WebConfig {

	@Bean
	public MyFactoryBean myFactoryBean(){
		return new MyFactoryBean();
	}
}
```

**入口类**

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		Object myFactoryBean = context.getBean("myFactoryBean");
		System.out.println(myFactoryBean.getClass());

	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/jhqY89.png)

?> 可看到，虽然我们获取的是 Id 为 cherryFactoryBean 的组件，但其获取到的实际是 getObject 方法里返回的对象。

如果我们要获取 cherryFactoryBean 本身，则可以这样做：

```java
@SpringBootApplication
public class SourceStudyApplication13 {
	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(WebConfig.class);
		Object myFactoryBean = context.getBean("&myFactoryBean");
		System.out.println(myFactoryBean.getClass());

	}
}
```

为什么加上&前缀就可以获取到相应的工厂类了呢，查看 BeanFactory 的源码会发现原因:

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/3YssRK.png)
