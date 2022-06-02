### springboot 自动装配 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.模式注解

Stereotype Annotation 俗称为模式注解，Spring 中常见的模式注解有`@Service`，`@Repository`，`@Controller`等，它们都“派生”自`@Component`
注解。我们都知道，凡是被@Component 标注的类都会被 Spring 扫描并纳入到 IOC 容器中，那么由`@Component`派生的注解所标注的类也会被扫描到 IOC 容器中。下面我们主要通过自定义模式注解来了解`@Component`
的“派生性”和“层次性”。

##### 1.1.@Component 的派生性

**新建注解类**

```java
package com.xujiajun.annotation;

import org.springframework.stereotype.Service;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Service
public @interface FirstService {
	String vlaue() default "";
}

```

使用`@service`注解标注,`@service`源码被`@component`注解标注
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/4bGlj3.png)

所以它们层级是

```
└─@Component
   └─@Service
      └─@FirstService
```

即@FirstLevelService 为@Component 派生出来的模式注解

**测试是否被扫描到 IOC 容器中**

编写测试 service 类

```java

@FirstService
public class TestService {
}

```

编写测试类

```java

@ComponentScan("com.xujiajun.service")
public class ServiceBootStrap {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(ServiceBootStrap.class)
				.web(WebApplicationType.NONE)
				.run(args);
		TestService testService = context.getBean("testService", TestService.class);
		System.out.println("TestService Bean: " + testService);
		context.close();
	}
}
```

运行结果
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/a5v9Sz.png)

##### 1.2.@Component 的层次性

编写由`@FirstService`标注的注解

```java

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@FirstService
public @interface SecondService {
	String vlaue() default "";
}

```

此时层级关系是

```
└─@Component
   └─@Service
      └─@FirstService
            └─@SecondService
```

替换`TestService`中的注解,运行测试结果相同

!> **这里有一点需要注意的是：@Component 注解只包含一个 value 属性定义，所以其“派生”的注解也只能包含一个 value 属性定义。**

#### 2.@Enable 模式驱动

@Enable 模块驱动在 Spring Framework 3.1 后开始支持。这里的模块通俗的来说就是一些为了实现某个功能的组件的集合。通过@Enable 模块驱动，我们可以开启相应的模块功能。

@Enable 模块驱动可以分为“注解驱动”和“接口编程”两种实现方式，下面逐一进行演示：

##### 2.1.注解驱动

Spring 中，基于注解驱动的示例可以查看`@EnableWebMvc`源码：

```java
package org.springframework.web.servlet.config.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.context.annotation.Import;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({DelegatingWebMvcConfiguration.class})
public @interface EnableWebMvc {
}
```

该注解通过`@Import`导入一个配置类`DelegatingWebMvcConfiguration`：

```java

@Configuration(proxyBeanMethods = false)
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
	private final WebMvcConfigurerComposite configurers = new WebMvcConfigurerComposite();
}
```

该配置类又继承自`WebMvcConfigurationSupport`，里面定义了一些 Bean 的声明。

?> 所以，基于注解驱动的@Enable 模块驱动其实就是通过@Import 来导入一个配置类，以此实现相应模块的组件注册，当这些组件注册到 IOC 容器中，这个模块对应的功能也就可以使用了。

##### 2.2.自定义注解驱动

**新建配置类**

```java

@Configuration
public class HelloWorldConfiguration {
	@Bean
	public String hello() {
		return "hello world";
	}
}

```

**新建注解**

```java

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(HelloWorldConfiguration.class)
public @interface EnableHelloWorld {
}

```

**新建测试类**

```java

@EnableHelloWorld
public class TestEnableBootStrap {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(TestEnableBootStrap.class)
				.web(WebApplicationType.NONE)
				.run(args);
		String hello = context.getBean("hello", String.class);
		System.out.println("hello bean: " + hello);
		context.close();
	}
}
```

**运行结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/NE6dI4.png)

?> 说明我们自定义的基于注解驱动的@EnableHelloWorld 是可行的。

##### 2.3.接口编程

除了使用上面这个方式外，我们还可以通过接口编程的方式来实现`@Enable`模块驱动。Spring 中，基于接口编程方式的有`@EnableCaching`注解，查看其源码：

```java

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import({CachingConfigurationSelector.class})
public @interface EnableCaching {
	boolean proxyTargetClass() default false;

	AdviceMode mode() default AdviceMode.PROXY;

	int order() default 2147483647;
}
```

EnableCaching 注解通过`@Import`导入了`CachingConfigurationSelector`类，该类间接实现了`ImportSelector`接口，用来实现组件注册。

!> spring 组件组册 参考文档地址:https://mrbird.cc/Spring-Bean-Regist.html

?> 所以通过接口编程实现`@Enable`模块驱动的本质是：通过`@Import`来导入接口`ImportSelector`实现类，该实现类里可以定义需要注册到 IOC 容器中的组件，以此实现相应模块对应组件的注册。

##### 2.4.自定义接口编程

**编写 selector**

```java
public class HelloWorldImportSeletor implements ImportSelector {
	@Override
	public String[] selectImports(AnnotationMetadata importingClassMetadata) {
		return new String[]{HelloWorldConfiguration.class.getName()};
	}
}
```

**修改`EnableHelloWorld`**

```java

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
//@Import(HelloWorldConfiguration.class)
@Import(HelloWorldImportSeletor.class)
public @interface EnableHelloWorld {

}
```

运行测试,结果一致

#### 3.自动装配

Spring Boot 中的自动装配技术底层主要用到了下面这些技术:

1. Spring 模式注解装配
2. Spring @Enable 模块装配
3. Spring 条件装配装（详见 Spring 组件注册）
4. Spring 工厂加载机制

##### 3.1.工厂加载机制

spring 工厂加载机制的实现类是`SpringFactoriesLoader`，查看其源码：
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Dl9yDV.png)

该类的方法会读取`META-INF/spring.factories`配置文件,从 jar 中找到该文件:
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/r9krGh.png)
当启动类被`@EnableAutoConfiguration`标注后，上面截图中的所有类 Spring 都会去扫描，看是否可以纳入到 IOC 容器中进行管理。

---

比如我们查看 org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration 的源码：  
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/GLtQ3X.png)

?> 可看到该类上标注了一些注解，其中`@Configuration`为模式注解，`@EnableConfigurationProperties`为模块装配技术，`@ConditionalOnClass`为条件装配技术

##### 3.2.自定义自动装配

**新建配置类**

```java
@Configuration
@EnableHelloWorld
@ConditionalOnProperty(name = "helloworld" ,havingValue = "true")
public class HelloWorldAutoConfiguration {
}

```

**新建配置文件**
`resources`文件夹下新建 META-INF/spring.factoies 文件

```properties
# auto configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.xujiajun.config.HelloWorldAutoConfiguration
```

**修改 application 配置文件**

```properties
helloworld=true
```

**创建测试类**

```java
@EnableAutoConfiguration
public class EnableAutoConfigurationBootstrap {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new SpringApplicationBuilder(EnableAutoConfigurationBootstrap.class)
				.web(WebApplicationType.NONE)
				.run(args);
		String hello = context.getBean("hello", String.class);
		System.out.println("hello bean: " + hello);
		context.close();

	}
}

```

**运行结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/TIUqpN.png)

**分析运行逻辑**

1. 工厂机制会自动读取 META-INF 目录下的 spring.factoies 文件内容
2. 测试类使用`@EnableAutoConfiguration`注解用来扫描 spring.factoies 中定义的内容,如果符合就会纳入到 IOC 容器中
3. `@ConditionalOnClass`注解作用是:当配置文件中`helloworld=true`则符合扫描规则
4. `@EnableHelloWorld`注解是自定义的模块驱动注解，引入了`hello`这个 bean
5. 最后通过上下文就获取到`hello`的 bean
