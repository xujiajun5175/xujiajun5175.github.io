### springboot 集成 mybatis-plus

**文档更新日期: {docsify-updated}**

---

#### 1.引入依赖

```xml

<dependencies>
    <!-- SpringBoot集成mybatis-plus框架 -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
    </dependency>
    <!-- mybatis-plus generator 代码生成器(按需引入) -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
    </dependency>
    <!-- mybatis-plus 代码生成器模版(按需引入)-->
    <dependency>
        <groupId>org.freemarker</groupId>
        <artifactId>freemarker</artifactId>
    </dependency>
    <!--Mysql驱动包(单独作用于代码生成器)-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <!-- <version>8.0.28</version>-->
    </dependency>
</dependencies>
```

!> 项目依赖 druid 数据连接池,无需单独引入 mysql 驱动.

##### 2.代码生成器

```java
public class MybatisPlusGenerator {
    public static void main(String[] args) {
        List<String> tables = new ArrayList<String>();
        tables.add("sys_log");
        String projectPath = System.getProperty("user.dir");
        FastAutoGenerator.create(
                        "jdbc:mysql://*******:3306/source-study-01?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8",
                        "*****",
                        "*****")
                .globalConfig(builder -> {
                    builder.author("xujiajun") // 设置作者
                            //.enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .disableOpenDir()
                            .outputDir(projectPath + "/${项目模块名称}/src/main/java"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("${groupId}") // 设置父包名
                            //.moduleName("") // 设置父包模块名
                            .entity("domain") //实体类存放包名
                            .service("service")
                            .serviceImpl("service.impl")
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, projectPath + "/${项目模块名称}/src/main/resources/mapper")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude(tables) // 设置需要生成的表名
                            .serviceBuilder().formatServiceFileName("%sService")
                            .formatServiceImplFileName("%sServiceImpl")
                            .entityBuilder()
                            .enableLombok()
                            //.enableChainModel()
                            .enableTableFieldAnnotation()
                            .idType(IdType.AUTO)
                            //.addSuperEntityColumns( "create_by", "create_time", "update_by", "update_time")
                            //.addTableFills(new Property("createTime", FieldFill.INSERT))
                            //.addTableFills(new Property("updateTime", FieldFill.INSERT_UPDATE))
                            //.controllerBuilder()
                            //.formatFileName("%sController")
                            //.superClass(BaseController.class)
                            //.enableRestStyle()
                            .mapperBuilder()
                            .enableBaseResultMap()
                            .superClass(BaseMapper.class)
                            .formatMapperFileName("%sMapper")
                            .enableMapperAnnotation()
                            .formatXmlFileName("%sMapper");
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}
```

?> 修改 Collection 添加表名后运行即可

!> 无需单独配置 myabtis 的 mapper 扫描路径
