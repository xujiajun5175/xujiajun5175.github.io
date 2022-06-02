# 登录配置

**文档更新日期: {docsify-updated}**

!> 如果你能看到，请仅用于**学习**，禁止**商用或是任何形式的牟利**

在 SecurityConfig 类中,重写它的 `configure(WebSecurity web)` 和 `configure(HttpSecurity http)` 方法

### 登陆接口

在 Spring Security 中，如果我们不做任何配置，默认的登录页面和登录接口的地址都是 `/login`

**配置登录页面地址**

```java
.and()
.formLogin()
.loginPage("/login.html")
.permitAll()
.and()
```

**配置登录接口地址**

```java
.and()
.formLogin()
.loginPage("/login.html")
.loginProcessingUrl("/doLogin")
.permitAll()
.and()
```

#### 为什么默认登陆页面和登陆接口是一致的?

form 表单的相关配置在 FormLoginConfigurer 中，该类继承自 AbstractAuthenticationFilterConfigurer ，所以当 FormLoginConfigurer 初始化的时候，AbstractAuthenticationFilterConfigurer 也会初始化，在 AbstractAuthenticationFilterConfigurer 的构造方法中，我们可以看到：

```java
protected AbstractAuthenticationFilterConfigurer() {
	setLoginPage("/login");
}
```

这就是配置默认的 loginPage 为 `/login`。

另一方面，FormLoginConfigurer 的初始化方法 init 方法中也调用了父类的 init 方法：

```java
public void init(H http) throws Exception {
	super.init(http);
	initDefaultLoginFilter(http);
}
```

而在父类的 init 方法中，又调用了 updateAuthenticationDefaults，我们来看下这个方法：

```java
protected final void updateAuthenticationDefaults() {
	if (loginProcessingUrl == null) {
		loginProcessingUrl(loginPage);
	}
	//省略
}
```

从这个方法的逻辑中我们就可以看到，如果用户没有给 loginProcessingUrl 设置值的话，默认就使用 loginPage 作为 loginProcessingUrl。

而如果用户配置了 loginPage，在配置完 loginPage 之后，updateAuthenticationDefaults 方法还是会被调用，此时如果没有配置 loginProcessingUrl，则使用新配置的 loginPage 作为 loginProcessingUrl。

### 登陆参数

默认登录表单中的参数是 `username` 和 `password`

**自定义配置登陆参数**

```java
.and()
.formLogin()
.loginPage("/login.html")
.loginProcessingUrl("/doLogin")
.usernameParameter("name")
.passwordParameter("passwd")
.permitAll()
.and()
```

!> 配置登陆参数之后,前端需要相应做改变

#### 为什么默认是 username 和 password?

还是回到 FormLoginConfigurer 类中，在它的构造方法中，我们可以看到有两个配置用户名密码的方法：

```java
public FormLoginConfigurer() {
	super(new UsernamePasswordAuthenticationFilter(), null);
	usernameParameter("username");
	passwordParameter("password");
}
```

在这里，首先 super 调用了父类的构造方法，传入了 UsernamePasswordAuthenticationFilter 实例，该实例将被赋值给父类的 authFilter 属性。

接下来 usernameParameter 方法如下：

```java
public FormLoginConfigurer<H> usernameParameter(String usernameParameter) {
	getAuthenticationFilter().setUsernameParameter(usernameParameter);
	return this;
}
```

getAuthenticationFilter 实际上是父类的方法，在这个方法中返回了 authFilter 属性，也就是一开始设置的 UsernamePasswordAuthenticationFilter 实例，然后调用该实例的 setUsernameParameter 方法去设置登录用户名的参数：

```java
public void setUsernameParameter(String usernameParameter) {
	this.usernameParameter = usernameParameter;
}
```

这里的设置有什么用呢？当登录请求从浏览器来到服务端之后，我们要从请求的 HttpServletRequest 中取出来用户的登录用户名和登录密码，怎么取呢？还是在 UsernamePasswordAuthenticationFilter 类中，有如下两个方法：

```java
protected String obtainPassword(HttpServletRequest request) {
	return request.getParameter(passwordParameter);
}
protected String obtainUsername(HttpServletRequest request) {
	return request.getParameter(usernameParameter);
}
```

可以看到，这个时候，就用到默认配置的 username 和 password 了。

### 登陆回调

在登录成功之后，我们就要分情况处理了，大体上来说，无非就是分为两种情况：

- 前后端分离登录
- 前后端不分登录

?> 前后端分离请参考：[前后端分离登录并实现 JSON 传参](zh-cn/java/springsecurity/前后端分离,使用JSON登录.md.md)

#### 前后端不分登录

###### 登录成功回调

在 Spring Security 中，和登录成功重定向 URL 相关的方法有两个：

- defaultSuccessUrl

- successForwardUrl

两个的区别如下：

1. defaultSuccessUrl

   1. defaultSuccessUrl(String url)

      指定默认登录成功的跳转页面

      如果你是直接在浏览器中输入的登录地址，登录成功后，就直接跳转到指定的默认页面;

      如果你是在浏览器中输入了其他地址,结果因为没有登录，又重定向到登录页面，此时登录成功后，就不会去其他地址

   2. defaultSuccessUrl(String url,boolean alwaysUse)

      默认是 false,等同于上面的方法

      如果是 true,等同于下面的方法

2. successForwardUrl(String url)

   表示不管你是从哪里来的，登录后一律跳转到 successForwardUrl 指定的地址

```java
.and()
.formLogin()
.loginPage("/login.html")
.loginProcessingUrl("/doLogin")
.usernameParameter("name")
.passwordParameter("passwd")
.defaultSuccessUrl("/index")
.successForwardUrl("/index")
.permitAll()
.and()
```

!> **实际操作中，defaultSuccessUrl 和 successForwardUrl 只需要配置一个即可。**

我们可以在 successHandler 方法中，配置登录成功的回调，如果是前后端分离开发的话，登录成功后返回 JSON 即可，同理，failureHandler 方法中配置登录失败的回调，logoutSuccessHandler 中则配置注销成功的回调。

###### 登录失败回调

与登录成功相似，登录失败也是有两个方法：

- failureForwardUrl
- failureUrl

!> **这两个方法在设置的时候也是设置一个即可**。<br>failureForwardUrl 是登录失败之后会发生服务端跳转，failureUrl 则在登录失败之后，会发生重定向。

### 注销登录

```java
.and()
.logout()
.logoutUrl("/logout")
.logoutRequestMatcher(new AntPathRequestMatcher("/logout","POST"))
.logoutSuccessUrl("/index")
.deleteCookies()
.clearAuthentication(true)
.invalidateHttpSession(true)
.permitAll()
.and()
```

1. 默认注销的 URL 是 `/logout`，是一个 GET 请求，我们可以通过 logoutUrl 方法来修改默认的注销 URL。

2. logoutRequestMatcher 方法不仅可以修改注销 URL，还可以修改请求方式，

   !> 实际项目中，这个方法和 logoutUrl 任意设置一个即可。

3. logoutSuccessUrl 表示注销成功后要跳转的页面。

4. deleteCookies 用来清除 cookie。

5. clearAuthentication 和 invalidateHttpSession 分别表示清除认证信息和使 HttpSession 失效，默认可以不用配置，默认就会清除。

### 配置示例

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    VerifyCodeFilter verifyCodeFilter;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(verifyCodeFilter, UsernamePasswordAuthenticationFilter.class);
        http
        .authorizeRequests()//开启登录配置
        .antMatchers("/hello").hasRole("admin")//表示访问 /hello 这个接口，需要具备 admin 这个角色
        .anyRequest().authenticated()//表示剩余的其他接口，登录之后就能访问
        .and()
        .formLogin()
        //定义登录页面，未登录时，访问一个需要登录之后才能访问的接口，会自动跳转到该页面
        .loginPage("/login_p")
        //登录处理接口
        .loginProcessingUrl("/doLogin")
        //定义登录时，用户名的 key，默认为 username
        .usernameParameter("uname")
        //定义登录时，用户密码的 key，默认为 password
        .passwordParameter("passwd")
        //登录成功的处理器
        .successHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse resp, Authentication authentication) throws IOException, ServletException {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("success");
                    out.flush();
                }
            })
            .failureHandler(new AuthenticationFailureHandler() {
                @Override
                public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse resp, AuthenticationException exception) throws IOException, ServletException {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("fail");
                    out.flush();
                }
            })
            .permitAll()//和表单登录相关的接口统统都直接通过
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessHandler(new LogoutSuccessHandler() {
                @Override
                public void onLogoutSuccess(HttpServletRequest req, HttpServletResponse resp, Authentication authentication) throws IOException, ServletException {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write("logout success");
                    out.flush();
                }
            })
            .permitAll()
            .and()
            .httpBasic()
            .and()
            .csrf().disable();
    }
}
```
