### aop 记录日志

**文档更新日期: {docsify-updated}**

---

#### 1.引入依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>
</dependencies>
```

#### 2.自定义注解

```java

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    String value() default "";
}
```

#### 3.数据库设计

```mysql
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log`
(
    `id`          int NOT NULL AUTO_INCREMENT COMMENT 'id',
    `username`    varchar(255) DEFAULT NULL COMMENT '用户名',
    `operation`   varchar(255) DEFAULT NULL COMMENT '用户操作',
    `time`        bigint       DEFAULT NULL COMMENT '响应时间',
    `method`      varchar(255) DEFAULT NULL COMMENT '请求方法',
    `params`      varchar(255) DEFAULT NULL COMMENT '请求参数',
    `ip`          varchar(255) DEFAULT NULL COMMENT 'IP地址',
    `create_time` datetime     DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;
```

?> 根据 table 创建对应的实体类且引入了`mybatis-plus`,保存方法为`SysLogSservice.save(SysLog syslog)`

#### 4.切面和切点

##### 4.1.IPUtils

```java

@Slf4j
public class IPUtils {
    /**
     * 获取IP地址
     * <p>
     * 使用Nginx等反向代理软件， 则不能通过request.getRemoteAddr()获取IP地址
     * 如果使用了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP地址，X-Forwarded-For中第一个非unknown的有效IP字符串，则为真实IP地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = null, unknown = "unknown", seperator = ",";
        int maxLength = 15;
        try {
            ip = request.getHeader("x-forwarded-for");
            if (StrUtil.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("Proxy-Client-IP");
            }
            if (StrUtil.isEmpty(ip) || ip.length() == 0 || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("WL-Proxy-Client-IP");
            }
            if (StrUtil.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_CLIENT_IP");
            }
            if (StrUtil.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            }
            if (StrUtil.isEmpty(ip) || unknown.equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr();
            }
        } catch (Exception e) {
            log.error("IpUtils ERROR ", e);
        }
        // 使用代理，则获取第一个IP地址
        if (StrUtil.isEmpty(ip) && ip.length() > maxLength) {
            int idx = ip.indexOf(seperator);
            if (idx > 0) {
                ip = ip.substring(0, idx);
            }
        }
        return ip;
    }
    /**
     * 获取ip地址
     *
     * @return
     */
    public static String getIpAddr() {
        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
        return getIpAddr(request);
    }
}
```

##### 4.2.HttpContextUtils

```java

@NoArgsConstructor
public class HttpContextUtils {
    public static HttpServletRequest getHttpServletRequest() {
        return ((ServletRequestAttributes) Objects.requireNonNull(
                RequestContextHolder.getRequestAttributes())).getRequest();
    }
}
```

##### 4.3.LogAspect

```java

@Aspect
@Component
public class LogAspect {
    @Autowired
    private SysLogService logService;
    @Pointcut("@annotation(com.xujiajun.anno.Log)")
    public void pointcut() {
    }
    @Around("pointcut()")
    public Object around(ProceedingJoinPoint point) {
        Object result = null;
        long beginTime = System.currentTimeMillis();
        try {
            //执行方法
            result = point.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        //执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        //保存日志
        saveLog(point, time);
        return result;
    }
    private void saveLog(ProceedingJoinPoint point, long time) {
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        SysLog log = new SysLog();
        Log annotation = method.getAnnotation(Log.class);
        if (annotation != null) {
            //注解上的描述
            log.setOperation(annotation.value());
        }
        //请求的方法名
        String className = point.getTarget().getClass().getName();
        String methodName = signature.getName();
        log.setMethod(className + "." + methodName + "()");
        //请求的方法参数值
        Object[] args = point.getArgs();
        //请求的方法参数名称
        LocalVariableTableParameterNameDiscoverer u = new LocalVariableTableParameterNameDiscoverer();
        String[] paramNames = u.getParameterNames(method);
        if (args != null && paramNames != null) {
            String params = "";
            for (int i = 0; i < args.length; i++) {
                params += "  " + paramNames[i] + ": " + args[i];
            }
            log.setParams(params);
        }
        //获取request
        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
        //设置ip地址
        log.setIp(IPUtils.getIpAddr(request));
        //模拟一个用户名
        log.setUsername("xujiajun");
        log.setTime(time);
        log.setCreateTime(LocalDateTime.now());
        //保存
        logService.save(log);
    }
}
```

#### 5.测试 controller

```java

@RestController
public class TestController {
    @Log("执行方法一")
    @GetMapping("/one")
    public void methodOne(String name) {
    }
    @Log("执行方法二")
    @GetMapping("/two")
    public void methodTwo() throws InterruptedException {
        Thread.sleep(2000);
    }
    @Log("执行方法三")
    @GetMapping("/three")
    public void methodThree(String name, String age) {
    }
}
```
