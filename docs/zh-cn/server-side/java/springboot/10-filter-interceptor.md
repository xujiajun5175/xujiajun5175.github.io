### springboot 中使用过滤器和拦截器 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

过滤器（Filter）和拦截器（Interceptor）是 Web 项目中常用的两个功能，本文将简单介绍在 Spring Boot 中使用过滤器和拦截器来计算 Controller 中方法的执行时长，并且简单对比两者的区别

#### 1.过滤器

**准备一个 controller**

```java
@RestController
@Slf4j
public class IndexController {
	@SneakyThrows
	@GetMapping("/index")
	public String index() {
		int sum = 0;
		for (int i = 0; i < 100000; i++) {
			sum += i;
		}
		return String.valueOf(sum);
	}
}

```

**编写 filter**

```java
@Slf4j
@Component
@WebFilter(urlPatterns = {"/*"})
public class TimeFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		log.warn("=========过滤器初始化=========");
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		log.info("=========开始执行过滤器方法=========");
		Long start = LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli();
		filterChain.doFilter(servletRequest, servletResponse);
		log.info("=========过滤器耗时:{} ms=========", LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli() - start);
		log.info("=========结束过滤器方法=========");
	}

	@Override
	public void destroy() {
		log.warn("=========过滤器销毁=========");
	}
}
```

---

##### 过滤器配置方法

配置方法分为两种

1. 使用`@Component`和`WebFilter`注解
   - @Component 注解让 TimeFilter 成为 Spring 上下文中的一个 Bean
   - @WebFilter 注解的 urlPatterns 属性配置了哪些请求可以进入该过滤器，`/*`表示所有请求。
2. 编写配置类注册 Bean

```java
@Configuration
public class WebConfig {
   @Bean
   public FilterRegistrationBean timeFilter() {
      FilterRegistrationBean registrationBean = new FilterRegistrationBean();
      TimeFilter filter = new TimeFilter();
      registrationBean.setFilter(filter);
      List<String> list = new ArrayList<>();
      list.add("/*");
      registrationBean.setUrlPatterns(list);
      return registrationBean;
   }
}

```

!> 通过过滤器我们只可以获取到 servletRequest 对象，所以并不能获取到方法的名称，所属类，参数等额外的信息。

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/hSUyPx.png)

#### 2.拦截器

**编写拦截器**

```java
@Slf4j
@Component
public class TimeInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		log.info("==========拦截之前==========");
		request.setAttribute("startTime", LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli());
		log.info("==========拦截的方法类是:{}", ((HandlerMethod) handler).getBean().getClass().getName());
		log.info("==========拦截的方法是:{}", ((HandlerMethod) handler).getMethod().getName());
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		log.info("==========开始拦截==========");
		Long start = (Long) request.getAttribute("startTime");
		log.info("==========拦截器耗时:{} ms==========", LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli() - start);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		log.info("==========拦截之后==========");
		Long start = (Long) request.getAttribute("startTime");
		log.info("==========拦截器耗时:{} ms==========", LocalDateTime.now().toInstant(ZoneOffset.of("+8")).toEpochMilli() - start);
		log.warn("异常信息:{}", ex);
	}
}
```

**编写配置**

```java
@Configuration
// WebMvcConfigurerAdapter@Deprecated已经弃用
public class WebConfig implements WebMvcConfigurer {
	@Autowired
	private TimeInterceptor timeInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(timeInterceptor);
	}
}
```

!> ` WebMvcConfigurerAdapter`在 springboot2.0 及 spring5 之后已经弃用,改为实现`WebMvcConfigurer`

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/vSM9At.png)

- `preHandle`方法在处理拦截之前运行
- `postHandle`只有当被拦截的方法没有抛出异常成功时才会处理
- `afterCompletion`方法无论被拦截的方法抛出异常与否都会执行

?> 通过这三个方法的参数可以看到，相较于过滤器，拦截器多了 Object 和 Exception 对象，所以可以获取的信息比过滤器要多的多。但过滤器仍无法获取到方法的参数等信息，我们可以通过切面编程来实现这个目的

**测试异常信息拦截**

controller 方法中添加`throw new RuntimeException("这里手动抛出异常");`语句

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/gIFrFi.png)

#### 拦截器+过滤器

同时配置拦截器和过滤器,查看运行时机

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/5yDH6y.png)

!> 过滤器先于拦截器执行,晚于拦截器结束
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/h8XsV2.png)
