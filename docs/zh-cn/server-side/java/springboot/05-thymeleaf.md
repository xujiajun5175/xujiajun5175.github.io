### thymeleaf 模版 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

> Thymeleaf is a modern server-side Java template engine for both web and standalone environments.  
> from https://www.thymeleaf.org/

Spring Boot 支持 FreeMarker、Groovy、Thymeleaf 和 Mustache 四种模板解析引擎，官方推荐使用 Thymeleaf。

#### 1.引入依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
</dependencies>
```

!> 在 Spring Boot 中，默认的 html 页面地址为 src/main/resources/templates，默认的静态资源地址为 src/main/resources/static。

#### 2.默认配置

SpringBoot 配置文件

```properties
#开启模板缓存（默认值：true）
spring.thymeleaf.cache=true
#在呈现模板之前，检查模板是否存在。
spring.thymeleaf.check-template=true
#检查模板位置是否正确（默认值:true）
spring.thymeleaf.check-template-location=true
#Content-Type的值（默认值：text/html）
spring.thymeleaf.content-type=text/html
#开启MVC Thymeleaf视图解析（默认值：true）
spring.thymeleaf.enabled=true
#模板编码
spring.thymeleaf.encoding=UTF-8
#要被排除在解析之外的视图名称列表，用逗号分隔
spring.thymeleaf.excluded-view-names=
#要运用于模板之上的模板模式。另见StandardTemplate-ModeHandlers(默认值：HTML5)
spring.thymeleaf.mode=HTML5
#在构建URL时添加到视图名称前的前缀（默认值：classpath:/templates/）
spring.thymeleaf.prefix=classpath:/templates/
#在构建URL时添加到视图名称后的后缀（默认值：.html）
spring.thymeleaf.suffix=.html
#Thymeleaf模板解析器在解析器链中的顺序。默认情况下，它排第一位。顺序从1开始，只有在定义了额外的TemplateResolver Bean时才需要设置这个属性。
spring.thymeleaf.template-resolver-order=
#可解析的视图名称列表，用逗号分隔
spring.thymeleaf.view-names=

```

!> 一般开发中将 spring.thymeleaf.cache 设置为 false，其他保持默认值即可。
