### Actuator 监控 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.引入依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

#### 2.配置

```yaml
management:
  endpoint:
    health:
      #显示所有健康信息 ，默认never
      show-details: always
  server:
    #监控服务ip
    address: 127.0.0.1
    #监控服务端口
    port: 9876
  endpoints:
    web:
      exposure:
        #设置暴露所有端点
        include: '*'
        #排除
        exclude: env
      #访问的baseUrl（默认为/actuator）
      base-path: /h-actuator
```

?> 浏览器 http://localhost:9876/h-actuator

![asdsad](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/1LUAfa.png)

#### 3.接口列表

![asds](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/c1ZRmE.png)
