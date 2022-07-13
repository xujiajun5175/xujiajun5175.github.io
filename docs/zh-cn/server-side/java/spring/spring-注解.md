### 注解

##### spring注解

1. @Configuration 表明配置类,为应用上下文提供beans

2. @Bean 
    
    作用在类方法,指明返回的对象作为beans添加到应用上下文中
    
    bean IDs 将与定义它们的方法的名称相同
    
2. @SpringBootApplication 作用在引导应用程序,是其他三个注释的复合应用程序
    
    - @SpringBootConfiguration 是@Configuration注释的特殊形式
    - @EnableAutoConfiguration 启用自动配置
    - @ComponentScan 启用组件扫描,发现声明的@Component,@Controller,@Service,@Repository
    
4. @WebMvcTest 这是 Spring Boot 提供的一个特殊测试注释，它安排测试在 Spring MVC 应用程序的上下文中运行





#### lombok

1. @Slf4j

   ```java
   private static final org.slf4j.Logger log = 
          org.slf4j.LoggerFactory.getLogger(DesignTacoController.class);
   ```

   



#### 自动配置

即**自动装配**和**组件扫描**

借助组件扫描，Spring 可以自动从应用程序的类路径中发现组件，并将其创建为 Spring 应用程序上下文中的 bean。

通过自动装配，Spring 会自动将组件与它们依赖的其他 bean 一起注入。





