### Spring BeanPostProcessor & InstantiationAwareBeanPostProcessor <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

BeanPostProcessor 的子类 InstantiationAwareBeanPostProcessor，用于 Bean 实例化前后处理

#### 1.两者比较

nitialization 为初始化的意思，Instantiation 为实例化的意思。

在 Spring Bean 生命周期中，实例化指的是创建 Bean 的过程，初始化指的是 Bean 创建后，对其属性进行赋值（populate bean）、后置处理等操作的过程，所以 Instantiation 执行时机先于 Initialization。

##### 1.1.类关系

先看看 BeanPostProcessor
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/05ClGN.png)
InstantiationAwareBeanPostProcessor 为 BeanPostProcessor 的子类，新增了三个额外的方法：
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/jlwm7J.png)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/lLuONj.png)

##### 1.2.方法解析

- **BeanPostProcessor**
  - `postProcessBeforeInitialization(Object bean, String beanName)`：
    <br>`bean`：Bean 实例；
    <br>beanName：Bean 名称。
    <br>方法将在 Bean 实例的`afterPropertiesSet`方法或者自定义的 init 方法被调用前调用，此时 Bean 属性已经被赋值。<br>方法返回原始 Bean 实例或者包装后的 Bean 实例，如果返回 null，则后续的后置处理方法不再被调用。
  - `postProcessAfterInitialization(Object bean, String beanName)`：<br>bean：Bean 实例；<br>beanName：Bean 名称。<br>方法将在 Bean 实例的 afterPropertiesSet 方法或者自定义的 init 方法被调用后调用，此时 Bean 属性已经被赋值。<br>方法返回原始 Bean 实例或者包装后的 Bean 实例，如果返回 null，则后续的后置处理方法不再被调用。
- **InstantiationAwareBeanPostProcessor**
  - `postProcessBeforeInstantiation(Class<?> beanClass, String beanName)`：<br>beanClass：待实例化的 Bean 类型；<br>beanName：待实例化的 Bean 名称。方<br>法作用为：在 Bean 实例化前调用该方法，返回值可以为代理后的 Bean，以此代替 Bean 默认的实例化过程。<br>返回值不为 null 时，后续只会调用 BeanPostProcessor 的 postProcessAfterInitialization 方法，而不会调用别的后续后置处理方法（如 postProcessAfterInitialization、postProcessBeforeInstantiation 等方法）；<br>返回值也可以为 null，这时候 Bean 将按默认方式初始化。
  - `postProcessAfterInstantiation(Object bean, String beanName)`：<br>bean：实例化后的 Bean，此时属性还没有被赋值；<br>beanName：Bean 名称。<br>方法作用为：当 Bean 通过构造器或者工厂方法被实例化后，当属性还未被赋值前，该方法会被调用，一般用于自定义属性赋值。<br>方法返回值为布尔类型，返回 true 时，表示 Bean 属性需要被赋值；<br>返回 false 表示跳过 Bean 属性赋值，并且 InstantiationAwareBeanPostProcessor 的 postProcessProperties 方法不会被调用。

##### 1.3.执行时机对比

**新建 BeanPostProcessor 实现类**

```java
@Component
@Slf4j
public class MyBeanPostProcessor implements BeanPostProcessor {
  @Override
  public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
    if ("sourceStudyApplication15".equals(beanName)) {
      log.info("post processor before '{}' initialization ",beanName);
    }
    return bean;
  }

  @Override
  public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
    if ("sourceStudyApplication15".equals(beanName)) {
      log.info("post processor after '{}' initialization",beanName);
    }
    return bean;
  }
}
```

?> 因为对所有的 Bean 生效，所以为了方便观察输出，这里仅当 Bean 名称为 sourceStudyApplication15(该模块入口类名称)时才打印输出。

**新建 InstantiationAwareBeanPostProcessor 实现类**

```java
@Component
@Slf4j
public class MyInstantiationAwareBeanPostProcessor implements InstantiationAwareBeanPostProcessor {
	@Override
	public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
		if ("sourceStudyApplication15".equals(beanName)) {
			log.info("post proces before '{}' instantiation",beanName);
		}
		return null;
	}

	@Override
	public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
		if ("sourceStudyApplication15".equals(beanName)) {
			log.info("post proces after '{}' instantiation",beanName);
		}
		return true;
	}

	@Override
	public PropertyValues postProcessProperties(PropertyValues pvs, Object bean, String beanName) throws BeansException {
		if ("sourceStudyApplication15".equals(beanName)) {
			log.info("post proces  '{}' properties",beanName);
		}
		return pvs;
	}
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/wsg7e2.png)

如果将`MyInstantiationAwareBeanPostProcessor`的`postProcessorAfterInstantation`返回`false`
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/TN4Sm1.png)

#### 2.原理解析

`BeanPostProcessor`和`InstantiationAwareBeanPostProcessor`的方法都和 Bean 生命周期有关，要分析它们的实现原理自然要从 Bean 的创建过程入手

Bean 创建的入口为`AbstractAutowireCapableBeanFactory`的 createBean 方法，查看其源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/qJgQPC.png)

resolveBeforeInstantiation 方法源码如下所示：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/yczSqX.png)

上面方法返回的 bean 如果为空的话，AbstractAutowireCapableBeanFactory 的 createBean 方法将继续往下执行 doCreateBean 方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/N7XNwB.png)

查看 doCreateBean 方法源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/TVmes6.png)

其他部分和本节讨论内容关系不大（Bean 生命周期其他部分），重点关注 populateBean 和 initializeBean 方法。查看 populateBean 方法源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/8TiHtn.png)

接着查看 initializeBean 方法源码：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/eNhevK.png)

至此我们通过查看 Bean 生命周期相关源码弄清楚了 BeanPostProcessor 和 InstantiationAwareBeanPostProcessor 相关方法的执行时机以及原理。

上面源码的追踪其实不仅涉及到了 BeanPostProcessor 和 InstantiationAwareBeanPostProcessor 相关方法的执行时机以及原理，更是整个 Bean 生命周期创建过程，

#### 3.流程图

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/zr6fDx.png)
