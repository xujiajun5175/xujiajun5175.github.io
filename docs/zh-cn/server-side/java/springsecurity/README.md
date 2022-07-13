# Spring Security

**文档更新日期: {docsify-updated}**

!> 如果你能看到，请仅用于**学习**，禁止**商用或是任何形式的牟利**

?> 参考地址： [一名蒟蒻的博客](https://blog.csdn.net/weixin_43738764/category_11231664.html)

### 概述

#### 核心功能

**用户认证（Authentication）和用户授权（Authorization）**

#### 相关概念

1. 主体：
   英文单词：principal
   使用系统的用户或设备或从其他系统远程登录的用户等等。简单说就是**谁使用系统谁就是主体**。
2. 认证：
   英文单词：authentication
   权限管理系统确认一个主体的身份，允许主体进入系统。简单说就是**“主体”证明自己是谁**。笼统的认为就是以前所做的登录操作。
3. 授权 authorization
   将操作系统的“权力” “授予” “主体”，这样主体就具备了操作系统中特定功能的能力。

#### 重点过滤器

1. `FilterSecurityInterceptor`
   该过滤器是过滤器链的最后一个过滤器，根据资源权限配置来判断当前请求是否有权限访问对应的资源。

   如果访问受限会抛出相关异常，并由 **ExceptionTranslationFilter** 过滤器进行捕获和处理。

2. `ExceptionTranslationFilter`：
   是个异常过滤器，用来处理在认证授权过程中抛出的异常

   该过滤器不需要我们配置，对于前端提交的请求会直接放行，捕获后续抛出的异常并进行处理

3. `UsernamePasswordAuthenticationFilter` ：

   该过滤器会拦截前端提交的 POST 方式的登录表单请求，并进行身份认证（校验表单中用户名，密码）

#### 重点接口

1. `UserDetailsService`
   当什么也没有配置的时候，账号和密码是由 Spring Security 定义生成的。

   而在实际项目中**账号和密码都是从数据库中查询出来的。 所以我们要通过自定义逻辑控制认证逻辑。**

   **如果需要自定义逻辑时，只需要实现 UserDetailsService 接口即可。**
   返回值 `UserDetails` ：
   ?> 这个类是系统默认的用户“主体”
   方法参数 `username`：
   表示用户名。此值是客户端表单传递过来的数据。

   默认情况下必须叫 username，否则无法接收。

2. `PasswordEncoder` 接口
   有两个方法 `encode` 、 `matches`需要实现
   `encode` 方法：
   **表示验证从存储中获取的编码密码与编码后提交的原始密码是否匹配。**

   如果密码匹配，则返回 true；如果不匹配，则返回 false。

   第一个参数表示需要被解析的密码。第二个参数表示存储的密码。
   `matches` 方法：
   表示如果解析的密码能够再次进行解析且达到更安全的结果则返回 true，否则返回 false。默认返回 false。

### **SpringSecurity Web** **权限方案**

#### 设置登录账号密码

- 直接写死 略

- 调用数据库获取

  - 编写自定义实现 UserDetailsService 接口

    ```java
    //编写自定义类实现UserDetailsService接口
    @Service
    public class MyUserDetailsService implements UserDetailsService {

        @Autowired
        private UsersMapper usersMapper;

        @Override
        public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
            QueryWrapper<Users> wrapper = new QueryWrapper<>();
            wrapper.eq("username",s);
            Users users = usersMapper.selectOne(wrapper);
            //以上是MybatisPlus从数据库查询用户信息相关操作，自行学习
            if( users == null){
                throw new UsernameNotFoundException("用户名不存在！");
            }
            //给用户赋值权限、或者角色，也可以从数据库查询
            List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList("test");
            return new User(users.getUsername(), users.getPassword(), auths);
        }
    }

    ```

  - 配置类

    ```java
    //编写配置类
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        private UserDetailsService userDetailsService;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsService).passwordEncoder(new PasswordEncoder() {
                @Override
                public String encode(CharSequence charSequence) {
                    return charSequence.toString();
                }

                @Override
                public boolean matches(CharSequence charSequence, String s) {
                    return s.equals(charSequence.toString());
                }
            });
        }
    }

    ```

#### 自定义前端页面

包含登录页面、403 页面、登出页面

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.logout().logoutUrl("/logout").//自定义登出路径
                logoutSuccessUrl("/test/hello").permitAll();//登出后跳转到的页面

        //自定义403访问页面
        http.exceptionHandling().accessDeniedPage("/unauth.html");

        http.formLogin()
                .loginPage("/login.html")
                .loginProcessingUrl("/user/login")
                .defaultSuccessUrl("/test/index").permitAll();//成功后跳转的路径

        http.authorizeRequests()
                .antMatchers("/", "/user/login").permitAll()
                .antMatchers("/test/hello").hasAnyRole("admin,test")
                .anyRequest().authenticated();

        http.csrf().disable();
    }
}

```

#### 自动登录 “记住我”功能实现

![image-20220329230930334](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329230930334.png)

![image-20220329230948298](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329230948298.png)

配置类中要注入数据源，配置操作数据库对象

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

        @Bean
    public PersistentTokenRepository persistentTokenRepository(){
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }
}

```

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Bean
    public PersistentTokenRepository persistentTokenRepository(){
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource);
        return jdbcTokenRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.logout().logoutUrl("/logout").
                logoutSuccessUrl("/test/hello").permitAll();

        http.exceptionHandling().accessDeniedPage("/unauth.html");

        http.formLogin()
                .loginPage("/login.html")
                .loginProcessingUrl("/user/login")
                .defaultSuccessUrl("/test/index").permitAll();

        http.authorizeRequests()
                .antMatchers("/", "/user/login").permitAll()
                .antMatchers("/test/hello").hasAnyRole("admin,test")
                .anyRequest().authenticated();

        http.rememberMe().tokenRepository(persistentTokenRepository())//开启记住用户的选项
                .tokenValiditySeconds(60)//设置有效时长，单位秒
                .userDetailsService(userDetailsService);

        http.csrf().disable();
    }
}

```

### **基于角色或权限进行访问控制**

- **hasAuthority** **方法**
  如果当前的主体具有指定的权限，则返回 true,否则返回 false

  ```java
  .antMatchers("/test/hello").hasAuthority("admin")
  ```

- **hasAnyAuthority** **方法**

  如果当前的主体有任何提供的角色（给定的作为一个逗号分隔的字符串列表）的话，返回 true

  ```java
  .antMatchers("/test/hello").hasAnyAuthority("admin,test")
  ```

- **hasRole** **方法**

  如果用户具备给定角色就允许访问,否则出现 403。如果当前主体具有指定的角色，则返回 true。

  ```java
  .antMatchers("/test/hello").hasRole("test")
  ```

  !> 源码底层会在校验时在角色前面加上`ROLE_`

- **hasAnyRole**

  表示用户具备任何一个角色都可以访问。

  ```java
  .antMatchers("/test/hello").hasAnyRole("admin,test")
  ```

### 认证授权注解使用

- **@Secured**

  - 需要在配置类上先开启注解功能**@EnableGlobalMethodSecurity(securedEnabled=true)**

  - 判断是否具有角色，另外需要注意的是**这里匹配的字符串需要添加前缀“ROLE\_“**。

  - ```java
    @RestController
    @RequestMapping("test")
    public class IndexController {

        @GetMapping("hello")
        @Secured({"ROLE_role"})
        public String hello() {
            return "hello security";
        }
    }
    ```

- **@PreAuthorize**

  - 需要在配置类上先开启注解功能**@EnableGlobalMethodSecurity(prePostEnabled = **true**)**

  - 在方法执行后再进行权限验证。是否有权限返回

    ```java
    @RestController
    @RequestMapping("test")
    public class IndexController {

        @GetMapping("hello")
        @PostAuthorize("hasAnyAuthority('admin,test')")
        public String hello() {
            return "hello security";
        }
    }
    ```

- **@PreFilter**

  - 进入控制器之前对数据进行过滤。

    ```java
    @RestController
    @RequestMapping("test")
    public class IndexController {

        @GetMapping("hello")
        @PreFilter(value = "filterObject.id%2==0")//只允许id为偶数的进入方法
        public String hello() {
            return "hello security";
        }
    }

    ```

- **@PostFilter**

  - 方法返回时对数据进行过滤。

    ```java
    @RestController
    @RequestMapping("test")
    public class IndexController {

        @GetMapping("hello")
        @PostFilter("filterObject.username == 'admin1'")//只留下用户名是 admin1 的数据
        public String hello() {
            return "hello security";
        }
    }

    ```

#### **CSRF 应用**

##### 理解

- 跨站请求伪造也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF
- 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
- 跨站请求攻击，简单地说，是**攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）**。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。
- 利用了 web 中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的

##### Spring Security 实现 CSRF 的原理：

- 生成 csrfToken 保存到 HttpSession 或者 Cookie 中。
- 请求到来时，从请求中提取 csrfToken，和保存的 csrfToken 做比较，进而判断当前请求是否合法。主要通过 CsrfFilter 过滤器来完成。

![image-20220329232011331](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329232011331.png)

### 前后端分离方案

#### 基本原理

1. 登录过程是 SpringSecurity 原理，然后验证成功后利用 Jwt 生产用户 Token，用 Key 为 Token，Value 为用户信息存入 Redis 中完成首次登录。
2. 之后的请求中，过滤器去判断请求中是否携带了 Token，如果有就直接放行继续接下来的操作，否则无权访问需要登录。
3. ![image-20220329232641039](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329232641039.png)

#### 代码

配置类

```java
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;
    @Autowired
    private AuthenticationFailureHandler authenticationFailureHandler;
    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private TokenFilter tokenFilter;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //关闭CSRF防护
        http.csrf().disable();

        //基于Token，不需要Session
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //对于路径请求
        http.authorizeRequests()
                .antMatchers("/user/all","/user/login").permitAll()//这些路径放行
                .anyRequest()//其他任何请求
                .authenticated();//都需要验证

        http.formLogin()
            	//登录的路径请求，usernameParameter设置了表单中username的参数名，passwordParameter设置了表单中password的参数名
                .loginProcessingUrl("/user/login").usernameParameter("username").passwordParameter("password")
            	//成功会进入这个处理器
                .successHandler(authenticationSuccessHandler)
            	//失败会进入这个处理器
                .failureHandler(authenticationFailureHandler)
            	//没有权限会进入这个处理器
                .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

        //退出的路径请求，logoutSuccessHandler表示退出成功后进入这个处理器
        http.logout().logoutUrl("user/logout").logoutSuccessHandler(logoutSuccessHandler);

        //表示在UsernamePasswordAuthenticationFilter这个过滤器执行前，先执行tokenFilter过滤器
        http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new PasswordEncoder() {
            @Override
            public String encode(CharSequence charSequence) {
                return MD5.encrypt(charSequence.toString());
            }

            @Override
            public boolean matches(CharSequence charSequence, String s) {
                String encode = MD5.encrypt(charSequence.toString());
                return s.equals(encode);
            }
        });
    }
}

```

编写 TokenFilter 过滤器

?> 验证前去过滤请求中是否包含了 token，如果包含了就从 Redis 中获取用户信息，否则继续验证

```java
@Component
@Slf4j
@Order(value = Integer.MAX_VALUE - 2)
public class TokenFilter extends OncePerRequestFilter {

    public static final String TOKEN_KEY = "Authorization";

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final Long MINUTES_10 = 10 * 60 * 1000L;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //从请求中获取token
        String token = getToken(request);

        //如果token不为空
        if(!StringUtils.isEmpty(token)){
            //就从redis中获取用户信息
            LoginUser loginUser = tokenService.getLoginUser(token);
            if(loginUser != null ){
                //如果不为空，就检查缓存中的时间是否小于10分钟，如果小于就更新缓存
                loginUser =checkLoginTime(loginUser);
                //把用户对象封装成UsernamePasswordAuthenticationToken对象
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser,null,loginUser.getAuthorities());
                //把UsernamePasswordAuthenticationToken对象放入Security上下文中
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request,response);
    }

    public static String getToken(HttpServletRequest request) {
        String token = request.getParameter(TOKEN_KEY);
        if (StringUtils.isEmpty(token)) {
            token = request.getHeader(TOKEN_KEY);
        }
        if (StringUtils.isEmpty(token)) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (TOKEN_KEY.equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }
        return token;
    }

    /**
     * 校验时间<br>
     * 过期时间与当前时间对比，临近过期10分钟内的话，自动刷新缓存
     *
     * @param loginUser
     * @return
     */
    public LoginUser checkLoginTime(LoginUser loginUser) {
        long expireTime = loginUser.getExpireTime();
        long currentTime = System.currentTimeMillis();
        if (expireTime - currentTime <= MINUTES_10) {
            String token = loginUser.getToken();

            loginUser = (LoginUser) userDetailsService.loadUserByUsername(loginUser.getUsername());
            loginUser.setToken(token);
            tokenService.refresh(loginUser);
        }
        return loginUser;
    }
}

```

编写 Handler 配置类

```java
@Configuration
public class SecurityHandlerConfig {

    @Autowired
    private TokenService tokenService;



	//登录成功后的处理器
    @Bean
    public AuthenticationSuccessHandler loginSuccsessHandler(){
        return (request, response, authentication) -> {
            //从SpringSecurity上下文中获取已经通过认证的用户对象
            LoginUser loginUser = (LoginUser) authentication.getPrincipal();

            //登录成功的相应逻辑操作
            loginSuccessReturn(request,response,loginUser);
        };
    }

    public void loginSuccessReturn(HttpServletRequest request, HttpServletResponse response, LoginUser loginUser) {
        //响应容器
        Map map = new HashMap();

        //根据用户生产一个Token，并存入redis
        Token token = tokenService.saveToken(loginUser);

        //放入加密token
        map.put("id", loginUser.getId());
        map.put("token", token.getToken());


        Cookie cookie = new Cookie("token", map.get("token").toString());
        cookie.setPath("/");
        response.addCookie(cookie);
        //封装返回
        responseJson(response, HttpStatus.OK.value(), map);
    }

	//登录失败的处理器
    @Bean
    public AuthenticationFailureHandler loginFailureHandler(){
        return (request, response, exception) -> {
            String msg;
            if(exception instanceof BadCredentialsException){
                msg = "密码错误！";
            } else {
                msg = exception.getMessage();
            }
            Map<String, Object> data = new HashMap<>();
            data.put("loginType", 5);
            data.put("loginMsg", msg);
            responseJson(response, HttpStatus.OK.value(), data);
        };
    }

    //无权限处理器
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint(){
        return (request, response, exception) -> {
            String url = request.getRequestURI();
            if(url.endsWith(".html")) {
                response.sendRedirect("/");
            } else {
                responseJson(response, HttpStatus.UNAUTHORIZED.value(), "请先登录");

            }
        };
    }

    //登出处理器
    @Bean
    public LogoutSuccessHandler logoutSuccessHandler(){
        return (request, response, authentication) -> {

            String token = TokenFilter.getToken(request);
            tokenService.deleteToken(token);

            responseJson(response, HttpStatus.OK.value(), "退出成功");
        };
    }

    //封装返回
    public void responseJson(HttpServletResponse response, int status, Object data) {
        try {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "*");
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(status);

            response.getWriter().write(JSONObject.toJSONString(data));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

编写 UserDetailsService 接口实现类

```java
@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;
        if (StringUtils.isEmpty(username) || (user = getByUserName(username)) == null) {
            // 返回用户名不存在
            // 抛出异常后 框架会去调用 loginFailureHandler()
            throw new RuntimeException("用户名不存在");
        }

        LoginUser loginUser = new LoginUser();
        if(user != null ){
            BeanUtils.copyProperties(user,loginUser);
            //设置用户权限，可自行修改从数据库获取
            if(loginUser.getUsername().equals("admin")){
                List<String> authorities = new ArrayList<String>();
                authorities.add("ROLE_admin");
                loginUser.setPermissionValueList(authorities);
            } else {
                List<String> authorities = new ArrayList<String>();
                authorities.add("ROLE_admin1");
                loginUser.setPermissionValueList(authorities);
            }
        }
        return loginUser;
    }

    private User getByUserName(String username) {
        QueryWrapper<User> query = new QueryWrapper<>();
        query.lambda().eq(User::getUsername,username);
        User user = userMapper.selectOne(query);
        return user;
    }

```

编写 UserDetails 接口实体类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUser extends User implements UserDetails {

    private String token;

    private Long loginTime;

    private Long expireTime;

    private List<String> permissionValueList;

    private List<GrantedAuthority> authorities;


    //获得用户权限
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        authorities = new ArrayList<>();
        for (String permissionValue : permissionValueList) {
            if(StringUtils.isEmpty(permissionValue))continue;
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(permissionValue);
            authorities.add(authority);
        }
        return authorities;
//        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

```

```java
//User实体类对应数据库表的实体类
@Data
public class User {
    private Integer id;
    private String username;
    private String password;

}

```

提供个人写的 TokenService 供大家参考，也可自行编写（主要逻辑是生产 Token，存入 Redis）

```java
@Service
@Slf4j
public class TokenService {

    /**
     * token过期秒数
     */
    @Value("${token.expire.seconds}")
    private Integer expireSeconds;

    /**
     * 私钥
     */
    @Value("${token.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private JedisClient jedisClient;

    private static Key KEY = null;

    private static final String LOGIN_USER_KEY = "LOGIN_USER_KEY";

    /**
     * 保存用户信息至缓存，key为uuid，返回生成token
     * @param loginUser
     * @return
     */
    public Token saveToken(LoginUser loginUser) {
        loginUser.setToken(UUID.randomUUID().toString());
        loginUser.setLoginTime(System.currentTimeMillis());
        loginUser.setExpireTime(loginUser.getLoginTime() + expireSeconds * 1000);

        jedisClient.setnx(loginUser.getToken(), JSONObject.toJSONString(loginUser), Long.valueOf(expireSeconds * 1000));

        String jwtToken = createJWTToken(loginUser);

        return new Token(jwtToken, loginUser.getLoginTime());
    }

    /**
     * 生成jwt
     *
     * @param loginUser
     * @return
     */
    private String createJWTToken(LoginUser loginUser) {
        Map<String, Object> claims = new HashMap<>();
        // 放入一个随机字符串，通过该串可找到登陆用户
        claims.put(LOGIN_USER_KEY, loginUser.getToken());

        String jwtToken = Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS256, getKeyInstance())
                .compact();

        return jwtToken;
    }

    /**
     * 刷新缓存
     * @param loginUser
     */
    public void refresh(LoginUser loginUser) {
        loginUser.setLoginTime(System.currentTimeMillis());
        loginUser.setExpireTime(loginUser.getLoginTime() + expireSeconds * 1000);

        jedisClient.setnx(loginUser.getToken(), JSONObject.toJSONString(loginUser), Long.valueOf(expireSeconds * 1000));
    }

    /**
     * 根据jwt获取登录用户信息
     * @param jwtToken
     * @return
     */
    public LoginUser getLoginUser(String jwtToken) {
        String uuid = getUUIDFromJWT(jwtToken);
        if (uuid != null) {
            return toLoginUser(uuid);
        }
        return null;
    }

    /**
     * 删除缓存中的用户信息
     * @param jwtToken
     * @return
     */
    public boolean deleteToken(String jwtToken) {
        String uuid = getUUIDFromJWT(jwtToken);
        if (uuid != null) {
            LoginUser loginUser = toLoginUser(uuid);
            if (loginUser != null) {
                jedisClient.del(uuid);
                return true;
            }
        }
        return false;
    }

    /**
     * 加锁获取加密key
     * @return
     */
    private Key getKeyInstance() {
        if (KEY == null) {
            synchronized (TokenService.class) {
                if (KEY == null) {
                    // 双重锁
                    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(jwtSecret);
                    KEY = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
                }
            }
        }

        return KEY;
    }

    /**
     * 解析jwt获取uuid
     * @param jwt
     * @return
     */
    private String getUUIDFromJWT(String jwt) {
        if ("null".equals(jwt) || StringUtils.isEmpty(jwt)) {
            return null;
        }
        Map<String, Object> jwtClaims = null;
        try {
            jwtClaims = Jwts.parser().setSigningKey(getKeyInstance()).parseClaimsJws(jwt).getBody();
            if (jwtClaims.containsKey(LOGIN_USER_KEY)) {
                return (String) jwtClaims.get(LOGIN_USER_KEY);
            }
            return null;
        } catch (ExpiredJwtException e) {
            log.error("token:{}已过期", jwt);
        } catch (Exception e) {
            log.error("解析token异常，token:{}", e);
        }
        return null;
    }

    /**
     * 根据key获取缓存中的用户信息
     * @param key  缓存key
     * @return
     */
    private LoginUser toLoginUser(String key) {
        if (key == null) {
            return null;
        }

        String value = jedisClient.get(key);

        // 校验是否已过期，已过期value为null
        if (StringUtils.isNotEmpty(value)) {
            LoginUser loginUser = JSONObject.parseObject(value, LoginUser.class);
            return loginUser;
        }
        return null;
    }
}

```

### 底层原理

#### Spring Security 过滤器链

SpringSecurity 采用的是责任链的设计模式，它有一条很长的过滤器链

1. `WebAsyncManagerIntegrationFilter`

   将 `Security` 上下文与 `Spring Web` 中用于处理异步请求映射的 `WebAsyncManager` 进行集成。

2. `SecurityContextPersistenceFilter`

   在每次请求处理之前将该请求相关的安全上下文信息加载到 `SecurityContextHolder` 中，然后在该次请求处理完成之后，将 `SecurityContextHolder `中关于这次请求的信息存储到一个“仓储”中，然后将 `SecurityContextHolder`中的信息清除，例如在`Session`中维护一个用户的安全信息就是这个过滤器处理的。

3. `HeaderWriterFilter`

   用于将头信息加入响应中。

4. `CsrfFilter`

   用于处理跨站请求伪造。

5. `LogoutFilter`

   用于处理退出登录。

6. `UsernamePasswordAuthenticationFilter`

   用于处理基于表单的登录请求，从表单中获取用户名和密码。默认情况下处理来自` /login` 的请求。从表单中获取用户名和密码时，默认使用的表单 name 值为 `username `和 `password`，这两个值可以通过设置这个过滤器的`usernameParameter` 和 `passwordParameter` 两个参数的值进行修改

7. `DefaultLoginPageGeneratingFilter`

   如果没有配置登录页面，那系统初始化时就会配置这个过滤器，并且用于在需要进行登录时生成一个登录表单页面。

8. `BasicAuthenticationFilter`

   检测和处理 `http basic` 认证。

9. `RequestCacheAwareFilter`

   用来处理请求的缓存。

10. `SecurityContextHolderAwareRequestFilter`

    主要是包装请求对象`request`。

11. `AnonymousAuthenticationFilter`

    检测 `SecurityContextHolder` 中是否存在 `Authentication` 对象，如果不存在为其提供一个匿名 `Authentication`。

12. `SessionManagementFilter`

    管理 `session` 的过滤器

13. `ExceptionTranslationFilter`

    处理 `AccessDeniedException` 和`AuthenticationException` 异常。

14. `FilterSecurityInterceptor`

    可以看做过滤器链的出口。

15. `RememberMeAuthenticationFilter`

    当用户没有登录而直接访问资源时, 从 `cookie` 里找出用户的信息, 如果 `Spring Security `能够识别出用户提供的`remember me cookie`, 用户将不必填写用户名和密码, 而是直接登录进入系统，该过滤器默认==不开启==。

#### SpringSecurity 流程

![640?wx_fmt=png](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/d359fe34bc7860c11a1b6e50bfd0e086-20220326172459218-20220329233535692.jpeg)

##### 流程说明

1. 客户端发起一个请求，进入 `Security` 过滤器链。

2. 当到 `LogoutFilter` 的时候判断是否是登出路径，如果是登出路径则到 `logoutHandler` ，如果登出成功则到 `logoutSuccessHandler` 登出成功处理，如果登出失败则由 `ExceptionTranslationFilter` ；如果不是登出路径则直接进入下一个过滤器。

3. 当到 `UsernamePasswordAuthenticationFilter`的时候判断是否为登录路径，如果是，则进入该过滤器进行登录操作，如果登录失败则到 `AuthenticationFailureHandler` 登录失败处理器处理，如果登录成功则到`AuthenticationSuccessHandler` 登录成功处理器处理，如果不是登录请求则不进入该过滤器。

4. 当到 `FilterSecurityInterceptor` 的时候会拿到 `uri` ，根据 `uri`去找对应的鉴权管理器，鉴权管理器做鉴权工作，鉴权成功则到 `Controller` 层否则到 `AccessDeniedHandler `鉴权失败处理器处理。

![image-20220329233451100](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329233451100.png)

#### 认证流程 **重点**

![image-20220329233820775](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329233820775.png)

##### 源码分析

**UsernamePasswordAuthenticationFilter 源码**

当前端提交的是一个 POST 方式的登录表单请求，就会被该过滤器拦截，并进行身份认证。

该过滤器的 doFilter() 方法实现在其抽象父类**AbstractAuthenticationProcessingFilter 中**

![image-20210824143821136](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/56d77dd06a49b1c5a8bbe1cdf903841b.png)

![image-20210824144331667](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/9e3f6832e34e7bf4525a913f5379f64b.png)

![image-20210824144556588](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/b264c04b22906a9f52909a0bf5cfab90.png)

![image-20210824144718624](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/49af320d16a3a6d58335c16a85d93364.png)

![image-20210824144956513](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/8cb4a997896222638ababaebb5671620.png)

?> 上述的 第二 过程调用了 UsernamePasswordAuthenticationFilter 的 attemptAuthentication() 方法，源码如下：

![image-20210824145831124](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/d1d727949c6649b795647c4bd66ae78f.png)

![image-20210824171033872](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/7a4754b6302010f2c388949d54441ab6.png)

?> **上述的（3）过程创建的** **UsernamePasswordAuthenticationToken 是 Authentication 接口的实现类，该类有两个构造器，一个用于封装前端请求传入的未认证的用户信息，一个用于封装认证成功后的用户信息：**

![image-20210824171514677](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/e606edf9e3acaea53f06f0f840ececa1.png)

![image-20210824172407929](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/a0ba0210a6fe989afd9680c448a7241c.png)

?> **Authentication 接口的实现类用于存储用户认证信息，查看该接口具体定义：**

![image-20210824172835092](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/6e472cb3ec0c53e54d06b8fc85ba9d73.png)

**ProviderManager 源码**

1. 上述过程中，`UsernamePasswordAuthenticationFilter` 过滤器的 `attemptAuthentication`() 方法的**（5）过程**将未认证的 `Authentication` 对象传入`ProviderManager` 类的 `authenticate`() 方法进行身份认证。

2. `ProviderManager` 是 `AuthenticationManager` 接口的实现类，该接口是认证相关的核心接口，也是认证的入口。

   在实际开发中，我们可能有多种不同的认证方式，例如：`用户名+密码`、`邮箱+密码`、`手机号+验证码`等，而这些认证方式的入口始终只有一个，那就是`AuthenticationManager`。

   在该接口的常用实现类 `ProviderManager` 内部会维护一个**`List<AuthenticationProvider>`**列表，存放多种认证方式，实际上这是`委托者模式（Delegate）`的应用。每种认证方式对应着一个 `AuthenticationProvider`，`AuthenticationManager` 根据认证方式的不同（根据传入的 `Authentication` 类型判断）委托对应的 `AuthenticationProvider` 进行用户认证。

![image-20210824174402462](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/b26d178843f1dcba039ab33362a7e065.png)

![image-20210825091550348](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/1b884f52c83a62f6ba80f40853c7ad44.png)

![image-20210825092028834](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/145b06718e9346e2a83e0d1e2850a542.png)

![image-20210825092158156](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/4a2f1651549c958c07cd1f77e8a77e78.png)

?> 上述认证成功之后的**（6）过程**，调用 `CredentialsContainer` 接口定义的`eraseCredentials()` 方法去除敏感信息。<br>查看`UsernamePasswordAuthenticationToken` 实现的 `eraseCredentials() `方法，该方法实现在其父类中：

![image-20210825092841825](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/edebe1482e74c6fc9ee6bbdfc9147c1f.png)

##### **认证成功/失败处理**

上述过程就是认证流程的最核心部分，接下来重新回到**UsernamePasswordAuthenticationFilter** 过滤器的 `doFilter()` 方法，查看认证成功/失败的处理：

![image-20210825093609101](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/6b899dec285972db130eec4789c346b4.png)

?> 查看`successfulAuthentication()`和`unsuccessfulAuthentication()`方法源码

![image-20210825094307885](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/350a8de578bffb8937f1f27aee14c050.png)

##### 总体方法结构

![image-20220329234713524](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329234713524.png)

1. `UsernamePasswordAuthenticationFilter` 父类 `AbstractAuthenticationProcessingFilter` 的 `doFilter` 方法
2. `UsernamePasswordAuthenticationFilter` 的 `attemptAuthentication` 方法对前端传过来的用户名和密码进行封装
3. `ProviderManager` 的 `authenticate` 方法开始认证
4. `DaoAuthenticationProvider` 父类 `AbstractUserDetailsAuthenticationProvider` 的 `authenticate` 方法
5. `DaoAuthenticationProvider` 的 `retrieveUser` 方法
6. `UserDetailsService`接口 的 `loadUserByUsername`方法（一般都由我们自己实现）从数据库获得用户具体数据
7. `AbstractAuthenticationProcessingFilter` 的 `successfulAuthentication`(我们可以重写返回自定义成功)

#### 权限访问流程

主要是对**`ExceptionTranslationFilter`** 过滤器和 **`FilterSecurityInterceptor`** 过滤器进行介绍。

**ExceptionTranslationFilter 过滤器**

该过滤器是用于处理异常的，不需要我们配置，对于前端提交的请求会直接放行，捕获后续抛出的异常并进行处理（例如：权限访问限制）。具体源码如下：

![image-20210825094732062](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/6b90a9dc81851b2d60fb7f40b216bd6a.png)

**FilterSecurityInterceptor** **过滤器**

`FilterSecurityInterceptor` 是过滤器链的最后一个过滤器，该过滤器是过滤器链的最后一个过滤器，根据资源权限配置来判断当前请求是否有权限访问对应的资源。如果访问受限会抛出相关异常，最终所抛出的异常会由前一个过滤器`ExceptionTranslationFilter` 进行捕获和处理。具体源码如下：

![image-20210825094939801](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/f66c02f3b0c1dd75fb2920f17c3268cd.png)

![image-20210825095108336](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/fa20c2df8399fe4791b8115e87ff39b7.png)

##### **SpringSecurity 请求间共享认证信息**

一般认证成功后的用户信息是通过 Session 在多个请求之间共享，那么 **Spring** **Security** 中是如何实现将已认证的用户信息对象 Authentication 与 Session 绑定的进行具体分析。

![image-20220329235042174](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/image-20220329235042174.png)

在前面讲解认证成功的处理方法 successfulAuthentication() 时，有以下代码：

![image-20210825095414768](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/e67bbd653999ab2e795a12bd10644f2e.png)

查 看 SecurityContext 接 口 及 其 实 现 类 SecurityContextImpl ， 该 类 其 实 就 是 对 Authentication 的封装

查 看 SecurityContextHolder 类 ， 该 类 其 实 是 对 ThreadLocal 的 封 装 ， 存 储 SecurityContext 对象

![image-20210825095821705](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/a40e3f1955fdc987809b938e1232937b.png)

![image-20210825100128004](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/386e16195eaadb74f57169ef9f07b38e.png)

![image-20210825100327759](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/3dbf3da92dc9d065ecd0963843c1a327.png)

![image-20210825100449178](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/41e2b47c8f47bb7a8ab0f6bfc1150442.png)

**SecurityContextPersistenceFilter 过滤器**

在 UsernamePasswordAuthenticationFilter 过滤器认证成功之后，会在认证成功的处理方法中将已认证的用户信息对象 Authentication 封装进 SecurityContext，并存入 SecurityContextHolder。
之后，响应会通过 SecurityContextPersistenceFilter 过滤器，该过滤器的位置在所有过滤器的最前面，请求到来先进它，响应返回最后一个通过它，所以在该过滤器中处理已认证的用户信息对象 Authentication 与 Session 绑定。
认证成功的响应通过 SecurityContextPersistenceFilter 过滤器时，会从 SecurityContextHolder 中取出封装了已认证用户信息对象 Authentication 的 SecurityContext，放进 Session 中。当请求再次到来时，请求首先经过该过滤器，该过滤器会判断当前请求的 Session 是否存有 SecurityContext 对象，如果有则将该对象取出再次放入 SecurityContextHolder 中，之后该请求所在的线程获得认证用户信息，后续的资源访问不需要进行身份认证；当响应再次返回时，该过滤器同样从 SecurityContextHolder 取出 SecurityContext 对象，放入 Session 中。具体源码如下：

![image-20210825100929352](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/702b826c9c773764eb4f3bc0f772df27.png)

![image-20210825101133653](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/c0230de99b028cffd707285bc5cb22a5.png)q
