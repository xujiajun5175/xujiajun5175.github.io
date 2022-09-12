# smart 项目开发规范<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

# 后端

## 代码格式

Java代码格式按照《Alibaba Java Coding Guidelines》

不同的IDE中如何使用Alibaba代码规范插件，可自行百度

如：idea

1、安装该插件，可以检查代码规范

![image-20220819101658199](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/NsjNnQ000image-20220819101658199.png)

2、安装该插件，可以设置保存动作，格式化代码

![image-20220819101703780](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/eDhbic000image-20220819101703780.png)

3、配置插件

![image-20220819101707783](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/6eaHeN000image-20220819101707783.png)

这样在文件保存时，就会自动格式化到规范格式了

---

## 注释

类、接口、泛型等java文件的注释

[TABLE]

类的方法、属性注释也要使用javadoc形式，而且如果方法声明有变化，要注意修改注释，避免以下警告

![](media/image4.jpeg)

## 注解

1、Controller层注解

[TABLE]

2、Controller方法注解

接口请求类型分为：PUT（新增、更新）、DELETE（删除）、POST（查询）

| @PostMapping("/getMenuLangList") |
|----------------------------------|

## 自动注入

使用构造器形式注入

![文本 描述已自动生成](media/image5.png)

## 命名

1、Controller层命名

以简洁的业务名称（尽量不用缩写）+Controller

2、业务层接口命名

以简洁的业务名称（尽量不用缩写，同Controller）+Service

3、业务层实现命名

业务层接口名+Impl

## 日志记录

1、输出日志时在类上使用注解@Slf4j

使用log.info()、error()等打印日志，输出内容要有价值，有利于排查问题

2、关键操作需要包含操作记录调用

OptLogAssembly.getInstance().recordUpdateLog(......

详细使用方式参考开发手册

## 缓存

1、业务层接口数据缓存使用注解

- *key的值*

- *在需要手动维护，特定时机删除时，就是用自定义的唯一标识*

- *在不需要手动维护时，使用keyGenerator即可自动维护*

- *unless一定要设置，判断有效信息才缓存，避免缓存空值、空数组等*

| @Cacheable(value = "dicDataCache", key = "'DicDataByType\[' + \#type + '\]'", unless = "#result?.size() == 0") |
|----------------------------------------------------------------------------------------------------------------|

2、业务逻辑中使用缓存使用RedisUtil

使用方法参考开发手册，使用时，非重要数据，记得要设置超时时间

## 数据库

每个微服务数据库独立，每个数据库用于一个微服务业务内，业务间数据通过feign接口传递

## 全局事务注解

![图形用户界面, 文本, 网站 描述已自动生成](media/image6.png)

增删改的方法必须加事务管理注解@GlobalTransactional，可以加在控制层、业务层，可以管理服务内、跨服务（Feign调用）

## 避免魔法值

字典表的值，在后台使用的时候，避免魔法值后期维护找不到，找不全，需要维护成枚举，为保证统一状态，枚举类型为全局使用，如有确实联系相关人员不可自行创建

## 响应String类型接口

由于Spring对String类型的响应处理方式，当Controller声明String响应后，响应的信息（封装的响应对象）就会被序列化成字符串，如果希望得到封装对象，使其中的data值为String，如下方式书写直接返回封装对象GlobalResponseResult，成功与失败自行声明

[TABLE]

## 字典表规范

声明字典表尽可能使用简短的字符标识字典的Key值，Value为显示的内容

如Type类型（全大写字母加下划线）为GENDER，TypeName为性别

Key有male，Value为男

Key有female，Value为女

# 前端

## 页面名称

前台页面的这个name和页面叶子目录一个名，否则几个页面的名就重复了，跳页的时候会发生问题

![image-20220819101748421](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/3Rap3i000image-20220819101748421.png)

---

## 格式化

前端使用ESLint规范代码，严格按照ESLint规范，不允许忽略ESLint检查，建议使用VS Code IDE

安装扩展ESLint

![image-20220819101756971](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/eOpwMG000image-20220819101756971.png)

![image-20220819101800409](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/c39y8N000image-20220819101800409.png)

![image-20220819101804029](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/emPTXO000image-20220819101804029.png)

![image-20220819101807679](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/60xyAn000image-20220819101807679.png)

---

## 国际化

国际化信息配置时，中文必须有值，默认文本为中文

---

## 页面标识

vue页面需要设置name值

```js
export default {
  name: 'OperaRecordBrower',
}
```

---

## 接口调用

接口调用一定要判断succes，并展示失败处理，提示信息

```js
if (!response.success) return
```

提示统一使用该方法

```js
this.$message({
type: 'success', // success/warning/info/error
message: ‘消息内容’ // 国际化
})
```
