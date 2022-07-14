# 初始 Security 授权

**文档更新日期: {docsify-updated}**

!> 如果你能看到，请仅用于**学习**，禁止**商用或是任何形式的牟利**

### 什么是授权？

所谓的授权，就是用户如果要访问某一个资源，我们要去检查用户是否具备这样的权限，如果具备就允许访问，如果不具备，则不允许访问。

### 准备测试用户

暂时还没有连接数据库，所以测试用户还是基于内存来配置。

基于内存配置测试用户，我们有两种方式：

1. 第一种如下：

   ```java
   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth.inMemoryAuthentication()
               .withUser("javaboy")
               .password("123").roles("admin")
               .and()
               .withUser("江南一点雨")
               .password("123")
               .roles("user");
   }
   ```

2. 实现`UserDetailService`接口

   由于 Spring Security 支持多种数据源，例如内存、数据库、LDAP 等，这些不同来源的数据被共同封装成了一个 UserDetailService 接口，任何实现了该接口的对象都可以作为认证数据源

   通过重写 WebSecurityConfigurerAdapter 中的 userDetailsService 方法来提供一个 UserDetailService 实例进而配置多个用户：

   ```java
   @Bean
   protected UserDetailsService userDetailsService() {
       InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
       manager.createUser(User.withUsername("javaboy").password("123").roles("admin").build());
       manager.createUser(User.withUsername("江南一点雨").password("123").roles("user").build());
       return manager;
   }
   ```

### 准备测试接口

```java
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/admin/hello")
    public String admin() {
        return "admin";
    }

    @GetMapping("/user/hello")
    public String user() {
        return "user";
    }
}
```

接口规划为：

1. /hello 是任何人都可以访问的接口
2. /admin/hello 是具有 admin 身份的人才能访问的接口
3. /user/hello 是具有 user 身份的人才能访问的接口
4. 所有 user 能够访问的资源，admin 都能够访问

?> **注意第四条规范意味着所有具备 admin 身份的人自动具备 user 身份。**

### 配置

```java
http.authorizeRequests()
        .antMatchers("/admin/**").hasRole("admin")  //只有admin可以访问
        .antMatchers("/user/**").hasRole("user")  //只有user可以访问
        .anyRequest().authenticated()   //只需要认证就可以访问
        .and()
        ...
        ...
```

!> `hasRole`会为`authority`添加上`ROLE_`前缀

![image-20220328225234083](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220328225234083.png)

这里的匹配规则我们采用了 Ant 风格的路径匹配符，Ant 风格的路径匹配符在 Spring 家族中使用非常广泛，它的匹配规则也非常简单：

| 通配符 | 含义             |
| :----- | :--------------- |
| \*\*   | 匹配多层路径     |
| \*     | 匹配一层路径     |
| ?      | 匹配任意单个字符 |

!> 注意代码中配置的三条规则的顺序非常重要，和 Shiro 类似，Spring Security 在匹配的时候也是按照从上往下的顺序来匹配，一旦匹配到了就不继续匹配了，**所以拦截规则的顺序不能写错**。

强制将 anyRequest 配置在 antMatchers 前面

```java
http.authorizeRequests()
        .anyRequest().authenticated()
        .antMatchers("/admin/**").hasRole("admin")
        .antMatchers("/user/**").hasRole("user")
        .and()
```

此时项目在启动的时候，就会报错，会提示不能在 anyRequest 之后添加 antMatchers：

![security-05-01](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/security-05-01-20220328224944339.png)

!> 从语义上理解，anyRequest 应该放在最后，表示除了前面拦截规则之外，剩下的请求要如何处理。

##### 源码查看为何要把 anyRequest 放到最后

在拦截规则的配置类 AbstractRequestMatcherRegistry 中，我们可以看到如下一些代码（部分源码）：

```java
public abstract class AbstractRequestMatcherRegistry<C> {
	private boolean anyRequestConfigured = false;
	public C anyRequest() {
		Assert.state(!this.anyRequestConfigured, "Can't configure anyRequest after itself");
		this.anyRequestConfigured = true;
		return configurer;
	}
	public C antMatchers(HttpMethod method, String... antPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.antMatchers(method, antPatterns));
	}
	public C antMatchers(String... antPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.antMatchers(antPatterns));
	}
	protected final List<MvcRequestMatcher> createMvcMatchers(HttpMethod method,
			String... mvcPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure mvcMatchers after anyRequest");
		return matchers;
	}
	public C regexMatchers(HttpMethod method, String... regexPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure regexMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.regexMatchers(method, regexPatterns));
	}
	public C regexMatchers(String... regexPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure regexMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.regexMatchers(regexPatterns));
	}
	public C requestMatchers(RequestMatcher... requestMatchers) {
		Assert.state(!this.anyRequestConfigured, "Can't configure requestMatchers after anyRequest");
		return chainRequestMatchers(Arrays.asList(requestMatchers));
	}
}
```

从这段源码中，我们可以看到，在任何拦截规则之前（包括 anyRequest 自身），都会先判断 anyRequest 是否已经配置，如果已经配置，则会抛出异常，系统启动失败。

## 角色继承

要实现所有 user 能够访问的资源，admin 都能够访问，叫做角色继承。

上级可能具备下级的所有权限，只需要在 SecurityConfig 中添加如下代码来配置角色继承关系即可：

```java
@Bean
RoleHierarchy roleHierarchy() {
    RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
    hierarchy.setHierarchy("ROLE_admin > ROLE_user");
    return hierarchy;
}
```

!> 注意，在配置时，需要给角色手动加上 `ROLE_` 前缀。上面的配置表示 `ROLE_admin` 自动具备 `ROLE_user` 的权限。
