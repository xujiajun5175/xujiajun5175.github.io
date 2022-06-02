# 快速开始及入门

**文档更新日期: {docsify-updated}**

!> 如果你能看到，请仅用于**学习**，禁止**商用或是任何形式的牟利**

?> [参考文档](http://springboot.javaboy.org/2019/0725/springboot-springsecurity#1%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA)

### 1.项目创建

在 Spring Boot 中使用 Spring Security 非常容易，引入依赖即可：

![img](https://gitee.com/xujiajun0319/typora_imgs/raw/master/picgo/25-1.png)

pom.xml 中的 Spring Security 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

只要加入依赖，项目的所有接口都会被自动保护起来。

### 2.初次体验

我们创建一个 HelloController:

```java
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
```

访问 `/hello` ，需要登录之后才能访问。

![img](https://gitee.com/xujiajun0319/typora_imgs/raw/master/picgo/25-2-20220327010958476.png)

当用户从浏览器发送请求访问 `/hello` 接口时，服务端会返回 `302` 响应码，让客户端重定向到 `/login` 页面，用户在 `/login` 页面登录，登陆成功之后，就会自动跳转到 `/hello` 接口。

通过以上两种不同的登录方式，可以看出，Spring Security 支持两种不同的认证方式：

- 可以通过 `form` 表单来认证
- 可以通过 `HttpBasic` 来认证

### 3.用户名配置

默认情况下，登录的用户名是 `user` ，密码则是项目启动时随机生成的字符串，可以从启动的控制台日志中看到默认密码：

![img](https://gitee.com/xujiajun0319/typora_imgs/raw/master/picgo/25-4.png)

这个随机生成的密码，每次启动时都会变。

和用户相关的自动化配置类在 `UserDetailsServiceAutoConfiguration` 里边，在该类的 `getOrDeducePassword` 方法中，我们看到如下一行日志：

```java
if (user.isPasswordGenerated()) {
	logger.info(String.format("%n%nUsing generated security password: %s%n", user.getPassword()));
}
```

打印的条件是 isPasswordGenerated 方法返回 true，即密码是默认生成的。

user.getPassword 出现在 SecurityProperties 中，在 SecurityProperties 中我们看到如下定义：

```java
/**
 * Default user name.
 */
private String name = "user";
/**
 * Password for the default user name.
 */
private String password = UUID.randomUUID().toString();
private boolean passwordGenerated = true;
```

对登录的用户名/密码进行配置，有三种不同的方式：

- 在 application.properties 中进行配置
- 通过 Java 代码配置在内存中
- 通过 Java 从数据库中加载

?> 前两种比较简单，第三种代码量略大，本文就先来看看前两种

#### 3.1 配置文件配置用户名/密码

可以直接在 application.properties 文件中配置用户的基本信息：

```
spring.security.user.name=javaboy
spring.security.user.password=123
```

配置完成后，重启项目，就可以使用这里配置的用户名/密码登录了。

#### 3.2 Java 配置用户名/密码

也可以在 Java 代码中配置用户名密码，首先需要我们创建一个 Spring Security 的配置类，集成自 WebSecurityConfigurerAdapter 类，如下：

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //下面这两行配置表示在内存中配置了两个用户
        auth.inMemoryAuthentication()
                .withUser("javaboy").roles("admin").password("$2a$10$OR3VSksVAmCzc.7WeaRPR.t0wyCsIj24k0Bne8iKWV1o.V9wsP8Xe")
                .and()
                .withUser("lisi").roles("user").password("$2a$10$p1H8iWa8I4.CA.7Z8bwLjes91ZpY.rYREGHQEInNtAp4NzL6PLKxi");
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

1. 首先我们自定义 SecurityConfig 继承自 WebSecurityConfigurerAdapter，重写里边的 configure 方法。
2. 首先我们提供了一个 PasswordEncoder 的实例，因为目前的案例还比较简单，因此我暂时先不给密码进行加密，所以返回 NoOpPasswordEncoder 的实例即可。
3. configure 方法中，我们通过 inMemoryAuthentication 来开启在内存中定义用户，withUser 中是用户名，password 中则是用户密码，roles 中是用户角色。
4. 如果需要配置多个用户，用 and 相连。

> 在没有 Spring Boot 的时候，我们都是 SSM 中使用 Spring Security，这种时候都是在 XML 文件中配置 Spring Security，既然是 XML 文件，标签就有开始有结束，现在的 and 符号相当于就是 XML 标签的结束符，表示结束当前标签，这是个时候上下文会回到 inMemoryAuthentication 方法中，然后开启新用户的配置。

这里我们在 configure 方法中配置了两个用户，用户的密码都是加密之后的字符串(明文是 123)，从 Spring5 开始，强制要求密码要加密，如果非不想加密，可以使用一个过期的 PasswordEncoder 的实例 NoOpPasswordEncoder，但是不建议这么做，毕竟不安全。

!> NoOpPasswordEncoder 已经舍弃

Spring Security 中提供了 `BCryptPasswordEncoder` 密码编码工具，可以非常方便的实现密码的加密加盐，相同明文加密出来的结果总是不同，这样就不需要用户去额外保存`盐`的字段了，这一点比 Shiro 要方便很多。

### 5.忽略拦截

如果某一个请求地址不需要拦截的话，有两种方式实现：

- 设置该地址匿名访问
- 直接过滤掉该地址，即该地址不走 Spring Security 过滤器链

推荐使用第二种方案，配置如下：

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/vercode");
    }
}
```
