# Spring Security+Spring Data Jpa

**文档更新日期: {docsify-updated}**

!> 如果你能看到，请仅用于**学习**，禁止**商用或是任何形式的牟利***

虽然前文实现利用JdbcUserDetailsManager实现数据库存储用户，但还是不方便

本文采用**自己来定义授权数据库**的模型。

### 创建项目

引入Spring Data Jpa 略



### 准备模型

准备两个实体类，角色和用户

```java
@Entity(name = "t_role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nameZh;
    //省略 getter/setter
}
```

```java
@Entity(name = "t_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
    private List<Role> roles;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
    //省略其他 get/set 方法
}
```

用户实体类主要需要**实现 `UserDetails` 接口**，并实现接口中的方法。

这里的字段基本都好理解，几个特殊的我来稍微说一下：

1. `accountNonExpired`用来描述用户的状态
2. `accountNonLocked`表示账户是否没有过期
3. `credentialsNonExpired`账户是否没有被锁定
4. `enabled` 密码是否没有过期、以及账户是否可用。
5. `roles` 属性表示用户的角色，User 和 Role 是多对多关系，用一个 @ManyToMany 注解来描述。
6. `getAuthorities` 方法返回用户的角色信息，我们在这个方法中把自己的 `Role` 稍微转化一下即可。





### 配置

数据模型准备好之后，我们再来定义一个 UserDao：

```java
public interface UserDao extends JpaRepository<User,Long> {
    User findUserByUsername(String username);
}
```

这里的东西很简单，我们只需要继承 JpaRepository 然后提供一个根据 username 查询 user 的方法即可。

接下来定义 UserService ，如下：

```java
@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserDao userDao;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在");
        }
        return user;
    }
}
```

我们自己定义的 UserService 需要实现 UserDetailsService 接口，实现该接口，就要实现接口中的方法，也就是 loadUserByUsername ，这个方法的参数就是用户在登录的时候传入的用户名，根据用户名去查询用户信息（查出来之后，系统会自动进行密码比对）。



在 `SecurityConfig` 中，我们通过如下方式来配置用户：

```java
@Autowired
UserService userService;
@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userService);
}
```

大家注意，还是重写 `configure` 方法，只不过这次我们不是基于内存，也不是基于 `JdbcUserDetailsManager`，而是使用自定义的 `UserService`，就这样配置就 OK 了。

