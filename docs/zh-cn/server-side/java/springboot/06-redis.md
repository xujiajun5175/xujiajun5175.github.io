### redis 缓存 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.引入依赖

```xml

<dependenices>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <!-- 阿里JSON解析器 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <!--<fastjson.version>1.2.80</fastjson.version>-->
    </dependency>
</dependenices>
```

?> 使用 fastjson 替换默认的 jackjson,解决某些类型转换的问题

#### 2.配置

```yaml
spring:
  redis:
    # Redis数据库索引（默认为0）
    database: 0
    # Redis服务器地址
    host: **************
    # Redis服务器连接端口
    port: 6379
    # 按需填写
    password: *******
    pool:
      # 连接池最大连接数（使用负值表示没有限制）
      max-active: 8
      # 连接池最大阻塞等待时间（使用负值表示没有限制）
      max-wait: -1
      # 连接池中的最大空闲连接
      max-idle: 8
      # 连接池中的最小空闲连接
      min-idle: 0
    # 连接超时时间（毫秒）
    timeout: 10s
```

!> timeout 不能设置为 0,需要设置一个大于 0 的数值,否则会无法连接 redis 的错误(ConnectionException)

?> redis 安装和配置略,默认端口 6379

##### 2.1.FastJson2JsonRedisSerializer 自定义序列化器

```java
public class FastJson2JsonRedisSerializer<T> implements RedisSerializer<T> {
    @SuppressWarnings("unused")
    private ObjectMapper objectMapper = new ObjectMapper();
    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");
    private Class<T> clazz;
    static {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }
    public FastJson2JsonRedisSerializer(Class<T> clazz) {
        super();
        this.clazz = clazz;
    }
    @Override
    public byte[] serialize(T t) throws SerializationException {
        if (t == null) {
            return new byte[0];
        }
        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }
    @Override
    public T deserialize(byte[] bytes) throws SerializationException {
        if (bytes == null || bytes.length <= 0) {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);
        return JSON.parseObject(str, clazz);
    }
    public void setObjectMapper(ObjectMapper objectMapper) {
        Assert.notNull(objectMapper, "'objectMapper' must not be null");
        this.objectMapper = objectMapper;
    }
    protected JavaType getJavaType(Class<?> clazz) {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}
```

##### 2.2.RedisConfig

```java

@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {
    //自定义缓存key生成策略
    @Bean
    public KeyGenerator keyGenerator() {
        return new KeyGenerator() {
            @Override
            public Object generate(Object target, Method method, Object... params) {
                StringBuffer sb = new StringBuffer();
                sb.append(target.getClass().getName());
                sb.append(method.getName());
                for (Object param : params) {
                    sb.append(param.toString());
                }
                return sb.toString();
            }
        };
    }
    //创建序列化器
    @Bean
    public RedisSerializer<Object> redisSerializer() {
        FastJson2JsonRedisSerializer serializer = new FastJson2JsonRedisSerializer(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        //必须设置，否则无法将JSON转化为对象，会转化成Map类型
        objectMapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        serializer.setObjectMapper(objectMapper);
        return serializer;
    }
    //缓存管理器
    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory factory) {
        RedisCacheWriter cacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(factory);
        //设置缓存有效期1天
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer())).entryTtl(Duration.ofDays(1));
        return new RedisCacheManager(cacheWriter, configuration);
    }
    @Bean
    @SuppressWarnings(value = {"unchecked", "rawtypes"})
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(redisSerializer());
        // Hash的key也采用StringRedisSerializer的序列化方式
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(redisSerializer());
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
```

?> @EnableCaching 可以用在启动类上或者配置文件上

#### 3.使用和测试

?> 由于集成了 `mybatis-plus`,`service`层自带 CRUD 方法,测试可以重写或者自定义方法使用

```java

@CacheConfig(cacheNames = "syslog")
public interface SysLogService extends IService<SysLog> {
    @Override
    @Cacheable(key = "#p0")
    default SysLog getById(Serializable id) {
        return IService.super.getById(id);
    }
    @Override
    @CachePut(key = "#p0.id")
    default boolean updateById(SysLog entity) {
        return IService.super.updateById(entity);
    }
    @Override
    @CacheEvict(key = "#p0", allEntries = true)
    default boolean removeById(SysLog entity) {
        return IService.super.removeById(entity);
    }
}
```

- `@CacheConfig`开启注解,主要用于配置该类中会用到的一些共用的缓存配置
- `@Cacheable(key = "#p0")`是将 id 作为 redis 中的 key 值,方法返回值加入缓存,
  - 参数`value`和`cacheNames`同样,用于指定缓存存储的集合名称,
  - 参数`key`:`#p0`是指方法第一个参数作为缓存的 key 值,
  - 参数`condition`:缓存对象的条件，非必需，也需使用 SpEL 表达式，只有满足表达式条件的内容才会被缓存
  - 参数`unless`:另外一个缓存条件参数，非必需，需使用 SpEL 表达式。在方法被调用之后判断,可以对结果判断
  - 参数`keyGenerator`:用于指定 key 生成器，非必需。若需要指定一个自定义的 key 生成器，我们需要去实现`org.springframework.cache.interceptor.KeyGenerator`
  - 参数`cacheManager`:用于指定使用哪个缓存管理器，非必需。只有当有多个时才需要使用；
  - 参数`cacheResolver`:用于指定使用那个缓存解析器，非必需。需通过`org.springframework.cache.interceptor.CacheResolver`接口来实现自己的缓存解析器，并用该参数指定
- `@CachePut(key="#p0.id")`
  配置于函数上，能够根据参数定义条件来进行缓存，其缓存的是方法的返回值，它与`@Cacheable`不同的是，它每次都会真实调用函数，所以主要用于数据新增和修改操作上。它的参数与`@Cacheable`
  类似，具体功能可参考上面对`@Cacheable`参数的解析；
- `@CacheEvict(key = "#p0", allEntries = true)`配置于函数上，通常用在删除方法上，用来从缓存中移除相应数据。除了同@Cacheable 一样的参数之外，它还有下面两个参数
  - `allEntries`：非必需，默认为 false。当为 true 时，会移除所有数据；
  - `beforeInvocation`：非必需，默认为 false，会在调用方法之后移除数据。当为 true 时，会在调用方法之前移除数据。

---

要使用上 Spring Boot 的缓存功能，还需要提供一个缓存的具体实现。Spring Boot 根据下面的顺序去侦测缓存实现：

1. Generic
2. JCache (JSR-107)
3. EhCache 2.x
4. Hazelcast
5. Infinispan
6. Redis
7. Guava
8. Simple 除了按顺序侦测外，我们也可以通过配置属性 spring.cache.type 来强制指定。
