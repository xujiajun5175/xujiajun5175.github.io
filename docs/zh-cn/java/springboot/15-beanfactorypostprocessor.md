### BeanFactoryPostProcessor & BeanDefinitionRegistryPostProcess <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.BeanFactoryPostProcessor

**源码**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/sF2eda.png)

根据注释我们了解到 postProcessBeanFactory 方法的执行时机为：BeanFactory 标准初始化之后，所有的 Bean 定义已经被加载，但 Bean 的实例还没被创建（不包括 BeanFactoryPostProcessor 类型）。

该方法通常用于修改 bean 的定义，Bean 的属性值等，甚至可以在此快速初始化 Bean。

下面测试:

**新建 BeanFactoryPostProcessor 实现类**

```java

@Component
@Slf4j
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
	public MyBeanFactoryPostProcessor() {
		log.info("实例化MyBeanFactoryPostProcessor Bean");
	}

	@Override
	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
		int beanDefinitionCount = beanFactory.getBeanDefinitionCount();
		log.info("Bean定义个数:{}", beanDefinitionCount);
	}

	@Component
	static class TestBean {
		public TestBean() {
			log.info("实例话TestBean");
		}
	}
}

```

在 postProcessBeanFactory 方法内，我们打印了当前已加载 Bean 定义的个数，并且在 MyBeanFactoryPostProcessor 类中，注册了 TestBean。

MyBeanFactoryPostProcessor 和 TestBean 的构造函数输出的日志用于观察 Bean 实例化时机。

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/j4SPIu.png)

上面的日志证实了方法的执行时机的确是在 BeanFactory 标准初始化之后，所有的 Bean 定义已经被加载，但 Bean 的实例还没被创建（此时 TestBean 还未被实例化，日志还没有输出”实例化 TestBean”，但这不包括 BeanFactoryPostProcessor 类型 Bean，该方法执行之前，日志就已经输出了”实例化 MyBeanFactoryPostProcessor
Bean”）。

在 postProcessBeanFactory 方法上打个断点：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/36Xdh6.png)

以 debug 方式启动程序
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/6dA1YW.png)

通过追踪方法调用栈，我们可以总结出 BeanFactoryPostProcessor 的 postProcessBeanFactory 方法执行时机和原理

1. SpringApplication.run(MyApplication.class, args)启动 Boot 程序：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Ey2PB2.png)

2. run 方法内部调用 refreshContext 方法刷新上下文：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/qJukJy.png)

3. refresh 方法内部调用 invokeBeanFactoryPostProcessors 方法：
   ![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/xBHGaU.png)

4. PostProcessorRegistrationDelegate 的 invokeBeanFactoryPostProcessors 方法内部：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/zNxR0X.png)
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/1oSyvp.png)

#### 2.BeanDefinitionregistryPostProcessor

BeanDefinitionRegistryPostProcessor 继承自 BeanFactoryPostProcessor，新增了一个 postProcessBeanDefinitionRegistry 方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/DiEEuF.png)

通过注释我们了解到 postProcessBeanDefinitionRegistry 方法的执行时机为：所有的 Bean 定义即将被加载，但 Bean 的实例还没被创建时。

也就是说，BeanDefinitionRegistryPostProcessor 的 postProcessBeanDefinitionRegistry 方法执行时机先于 BeanFactoryPostProcessor 的 postProcessBeanFactory 方法。

?> 这个方法通常用于给 IOC 容器添加额外的组件。

测试:

**新建实现类**

```java
@Component
@Slf4j
public class MyBeanDefinitionRegistryPostProcessor implements BeanDefinitionRegistryPostProcessor {
	@Override
	public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
		int beanDefinitionCount = registry.getBeanDefinitionCount();
		log.info("Bean定义个数:{}", beanDefinitionCount);
		//添加一个新的Bean定义
		RootBeanDefinition definition = new RootBeanDefinition(Object.class);
		registry.registerBeanDefinition("hello", definition);
	}

	@Override
	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
	}
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/n70VTo.png)

可以看到，BeanDefinitionRegistryPostProcessor 的 postProcessBeanDefinitionRegistry 方法执行时机的确先于 BeanFactoryPostProcessor 的 postProcessBeanFactory 方法。

通过查看 PostProcessorRegistrationDelegate 的 invokeBeanFactoryPostProcessors 方法源码也可以证实这一点：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/0fJmvv.png)
