# smart 项目开发手册<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

# 环境准备

## 本地必备开发环境

- [Nacos v2.0.4（Win）](https://github.com/alibaba/nacos/releases/download/2.0.4/nacos-server-2.0.4.zip)/[Nacos v2.0.4（Mac）](https://github.com/alibaba/nacos/releases/download/2.0.4/nacos-server-2.0.4.tar.gz)：<https://nacos.io/zh-cn/docs/quick-start.html>

- [Seata v1.3.0（Win）](https://github.com/seata/seata/releases/download/v1.3.0/seata-server-1.3.0.zip)/[Seata v1.3.0（Mac）](https://github.com/seata/seata/releases/download/v1.3.0/seata-server-1.3.0.tar.gz)

- Node：<http://nodejs.cn/download/>，下载最新的长期支持版就可以

- Git

- JDK1.8_202

- Maven 3.2.x+

- Docker v20.10.17（开发时在此下载适合本机环境的Docker，安装、启动即可<https://www.docker.com/get-started>）

---

## 本地非必须环境、服务

- [Sentinel v1.8.0](https://github.com/alibaba/Sentinel/releases/download/v1.8.0/sentinel-dashboard-1.8.0.jar)

- SkyWalking v9

- RocketMQ v4.4.0

- ElasticSearch v7.9.3

- Redis\>=4.0.0

- MySql8

- Kubernetes v1.23.7（生产环境使用，开发不需要）

---

# 参考文档

表单设计器：<http://designer.form-create.com/guide/>

表单解析器：<http://www.form-create.com/v2/guide/>

前端框架：<https://panjiachen.github.io/vue-element-admin-site/zh/>

UI组件：<https://element.eleme.io/#/zh-CN/component/installation>

Vue：<https://cn.vuejs.org/v2/guide/index.html>

Nacos：<https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html>

Mybatis-Plus：<https://baomidou.com/>

---

# 项目启动

?> 建议本地运行的已标明，未标明的可以使用远端服务

## 开发必须运行

### Nacos

!> 建议本地

1. 访问<http://121.5.178.211:8808/nacos/>即可，如需安装按照以下流程进行

安装nacos，将nacos解压到本地，到nacos/bin目录下

![image-20220818134039279](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/gOjmPo000image-20220818134039279.png)

2. 覆盖配置文件到nacos目录下conf目录中即可

![image-20220818134044583](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/fwh0jv000image-20220818134044583.png)

3. 执行命令

```bash
.\startup.cmd -m standalone
```

![image-20220818134109932](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/xxVf5K000image-20220818134109932.png)

4. 访问`127.0.0.1:8848`，账号/密码向相关人员询问

![image-20220818134134389](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/NbSyHG000image-20220818134134389.png)

5. 配置列表用来管理各个微服务的配置，服务需要连接`nacos`时，注意端口、账号密码、命名空间、`GROUP`等信息，否则将无法连接到`nacos`

![image-20220818134200079](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Kry8LL000image-20220818134200079.png)

6. 增减配置，需要共享一下以免不知情发生问题

7. 服务列表可以管理已注册的服务

![image-20220818134207579](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/0ugm1i000image-20220818134207579.png)

---

### Seata

!> 建议本地

?> 已改为在线运行无需本地启动

1. 下载[Seata1.3.0](https://objects.githubusercontent.com/github-production-release-asset-2e65be/163387337/842fba00-c6fc-11ea-94f9-c3cd939ec9b2?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20220614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220614T090749Z&X-Amz-Expires=300&X-Amz-Signature=4d1fbd2ec455302ffbc6e0c98b173d91e37aa84371efa8f8ca403deb35d764c3&X-Amz-SignedHeaders=host&actor_id=40223329&key_id=0&repo_id=163387337&response-content-disposition=attachment%3B%20filename%3Dseata-server-1.3.0.zip&response-content-type=application%2Foctet-stream)

2. 使用项目中的seata配置文件替换conf目录下的registry.conf，再启动

![image-20220818134302292](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/ZhjfYu000image-20220818134302292.png)

- Linux/Mac :

```shell
sh ./bin/seata-server.sh -p 8099
```

- Windows :

```shell
bin\seata-server.bat -p 8099
```

---

### 前端

!> 建议本地

1. 拉取代码,[git地址](https://devel.misetech.cn/smart/smart-platform.git)

2. 打开文件夹，执行`npm install`

3. 执行`npm run dev`

?> 后端增加服务后，开发环境需要更新接口代理，在根目录中的`proxy.js`中按照已有配置，增加服务名和端口的配置，然后重启前端项目即可

![image-20220818134801454](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/IJAeRA000image-20220818134801454.png)

---

### 后端

!> 本地，部分使用Docker

1. 拉取代码,[git地址](https://devel.misetech.cn/smart/smart-master-build.git)

2. 后端项目是微服务体系，核心依赖已构建为依赖包

3. 先执行一下bin目录下的**`install-depends.bat(sh)`**脚本，在安装`common`和`common-web`的maven依赖即可

4. `Gateway`网关服务，端口`8200`，所有的请求都将通过网关转发，并在此对请求进行处理，微服务无法被直接请求，所以无论访问或开发哪个微服务都必须启动该服务

?>（**推荐**）如本地有Docker环境，执行bin目录下的`startup-by-docker.bat（sh）`脚本， 如果是ARM架构平台，执行`bin`目录下的`startup-by-docker-arm.bat（sh）`脚本，将会启动网关和其他共通依赖服务容器

!> 需要先docker登录gitlab

```shell
docker login devel-registry.misetech.cn
```

?> 没有Docker环境，执行bin目录下的 `startup.bat（sh)` 脚本，会以Java进程启动网关和其他共通依赖服务

![image-20220818134929724](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/CJlZ1O000image-20220818134929724.png)

5. 系统管理system、人事hr、微博wb、流程lc……，都是一样的，该类子工程中只需要开发业务接口即可，其他的内容，框架都已全局实现并依赖

6. 业务系统启动，如system，页面要访问什么功能就启动什么服务用来提供接口，运行`SmartSystemApplication`，端口号`8306`，业务系统端口号后续开发时可自定义，只要不冲突就行

![image-20220818134944124](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/IrLxjn000image-20220818134944124.png)

---

## 开发非必须运行

### Sentinel Dashboard

!> 开发本地无需启动

启动`Sentineljar`包

```bash
java -Dserver.port=8188 -Dcsp.sentinel.dashboard.server=localhost:8188 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.8.0.jar
```

---

### Redis\>=4.0.0

!> 开发暂时使用服务器资源即可，有特殊需要可以连接本地

---

### 数据库

使用开发服务器已有的Mysql实例，数据库为`smart_db`，每个微服务的数据库独立

上述nacos中导入的配置文件中，有数据库连接信息，自行使用工具连接访问即可

---

## 访问项目

至此，本地的开发环境项目可以使用了。访问`http://localhost:9528/`就可以了，如果前端启动后提示的端口，至此开发人员仅需要运行前端代码和后端业务服务代码即可

---

## Docker容器更新

### 查看正在运行的容器

```shell
docker ps
```

![image-20220818135131579](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Ammz4P000image-20220818135131579.png)

### 停止当前运行的容器

```bash
docker stop containerID  //第一列的信息，要停哪个用哪个
```

### 移除当前容器

```bash
docker rm containerID  //第一列的信息，要停删哪个用哪个
```

### 更新镜像

```bash
docker pull containerName //第二列的信息，要更新哪个用哪个，建议每个都获取一下更新
```

### 重新运行

执行`startup-by-docker.bat（sh）`脚本

---

# 开发流程概述

## 后端

1. 新建子工程

已存在的子工程可以直接借用，如要新建门户微服务，复制smart-wb再同级目录下，并命名

![image-20220818135407805](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/8pmr9K000image-20220818135407805.png)

2. 会出现新的文件夹，为新建的子工程，修改工程的pom文件为项目名

![image-20220818135411283](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/o1Ein2000image-20220818135411283.png)

3. 修改后如图

![image-20220818135415149](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/xdDhe8000image-20220818135415149.png)

4. 修改父工程的pom，添加子工程

![image-20220818135421038](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/oiMAcs000image-20220818135421038.png)

5. 重载maven依赖配置，便可看到新的子工程识别为java项目类型

![image-20220818141835091](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/0nXTj7000image-20220818141835091.png)

6. 修改启动类

![image-20220818141831805](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/nifGcf000image-20220818141831805.png)

7. 检查该子工程的pom文件中，主类（打包启动类）是否同步更改为新的启动类名，如没有手动修改一下

![image-20220818142847435](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/EHDvPi000image-20220818142847435.png)

8. 修改`bootstrap`配置，用来访问nacos中所需的配置文件，现在访问nacos配置文件的规则定义为：在设定的GROUP中，查找=应用名+应用环境.yaml，如该子工程找的配置文件为`smart-portal-dev.yaml`

![image-20220818142905192](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/j44dwL000image-20220818142905192.png)

9. 环境信息在application中配置

![image-20220818142912184](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/SnBU1F000image-20220818142912184.png)

10. 编辑子工程介绍

![image-20220818142924866](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/wMAJHc000image-20220818142924866.png)

11. 创建新的子工程所需配置

![image-20220818142931585](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/AuZzjm000image-20220818142931585.png)

12. 修改配置文件

![image-20220818142938979](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/An0VLk000image-20220818142938979.png)

13. 主要修改服务端口号和服务名，其他的根据业务需要增减，端口号只要和其他服务不冲突即可，因为所有访问到服务的请求都由网关代理，网关基于服务名发现、转发，所以端口信息目前这快不敏感

![image-20220818142945491](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/sFKOj3000image-20220818142945491.png)

14. 发布新的配置后，就可以启动新的服务了，启动SmartPortalApplication

![image-20220818142951566](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Oc31yu000image-20220818142951566.png)

![image-20220818142956961](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/KW0PpI000image-20220818142956961.png)

15. 开发接口，使用hr的的demo接口举例，生成数据库相关的基础代码

![image-20220818143003507](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/97vqD3000image-20220818143003507.png)

16. 运行后按照提示输入信息，如本次创建表t_smart_demo_user相关的基础代码

![image-20220818143014096](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/PqP4ZV000image-20220818143014096.png)

17. 回车后将会自动生成代码，并自动打开文件夹

![image-20220818143019479](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/jtoDtv000image-20220818143019479.png)

18. 从控制层到持久层的代码都有，按需使用，放到业务工程中的目录下

![image-20220818143026038](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/DQ6hhM000image-20220818143026038.png)

19. 接口开发完成后

![image-20220818143032387](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Tc8SIF000image-20220818143032387.png)

20. 直接访问该服务端口加接口路径是无法访问的，因为只有网关来源和服务之间可以信任访问，微服务不直接对外提供服务

![image-20220818143037575](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/PjKqyi000image-20220818143037575.png)

21. 需要配置网关的路由规则

![image-20220818143045632](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/FPll3S000image-20220818143045632.png)

![image-20220818143050338](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/StBOpv000image-20220818143050338.png)

22. 访问接口的方式为：网关+服务标识+API-URL

![image-20220818143058340](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/tAsBM2000image-20220818143058340.png)

---

### 微服务间调用

!> \*：调用dic、static、i18n共通服务的接口或者Feign，联系相关开发人员协助。

1、如微博服务有该接口

![image-20220818143235425](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/pbWe8D000image-20220818143235425.png)

2、参考该接口，在hr创建feign接口定义

![image-20220818143239865](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/10xuqZ000image-20220818143239865.png)

3、调用，在需要使用的地方，把feign客户端的接口定义，当做service层使用即可

![image-20220818143244319](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/CIycHr000image-20220818143244319.png)

---

### 自动注入开发规范

对象的自动注入，如非特殊情况使用构造器形式，不要用Autowired或Resource注释，避免因注入时机或调用先后导致的空指针问题

![image-20220818143249014](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/1B0fsr000image-20220818143249014.png)

---

### Console日志输出规范

在类上使用注解`@Slf4j`

![image-20220818143256577](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/tkUYJv000image-20220818143256577.png)

输出日志使用参数（占位符为：{}，可以有任意个）式，不要拼字符串，如下例子

![image-20220818143301893](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Az7t5F000image-20220818143301893.png)

---

### String工具类

![image-20220818143308737](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/kHCJHU000image-20220818143308737.png)

---

## 前端

1. 以这3个文件夹为主

![image-20220818143433352](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/iLguS8000image-20220818143433352.png)

2. 在views下创建新页面的目录，目录结构最好与菜单结构一致，这里直接创建一个table目录，里面新建一个vue文件，默认就index即可

![image-20220818143437534](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/WE19aj000image-20220818143437534.png)

3. 创建访问该页面的路由

![image-20220818143442563](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/ORpA1F000image-20220818143442563.png)

4. 指向`table/index.vue`的路由

![image-20220818143449480](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/95jQXb000image-20220818143449480.png)

5. 配置完成后，访问页面即可访问到刚刚创建的index页面内容，<http://localhost:9528/#/example/table>

![image-20220818143500608](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/pM8Exz000image-20220818143500608.png)

6. 页面布局及设计可以简单根据[ElementUI](https://element.eleme.io/#/zh-CN/component/installation)编写

---

### 页面集成接口

1. 创建接口文件

在api目录下创建与页面目录同名的js文件

![image-20220818143543509](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/MMFVLe000image-20220818143543509.png)

2. 页面引用该接口文件

![image-20220818143552259](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/YszbND000image-20220818143552259.png)

3. 在要调用接口的方法中使用

![image-20220818143556122](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/54UoDi000image-20220818143556122.png)

---

## 代码拉取/提交

!> 注意：提交代码时，如果有相关的配置文件，需要将配置变更点附加说明<br>本项目使用Git，和SVN的使用有很多不用，使用中有疑问随时提出

1. 首次下载代码：

找一个目录，不用创建项目文件夹，拉取会自动创建

```bash
git clone \<代码仓库地址\>
```

?> 根据提示输入用户名、密码

2. 更新代码

```bash
git pull
```

3. 提交代码

```bash
git commit -m “提交描述”

git push
```

---

## 错误代码

`51000` 自定义异常

`51001` 参数校验错误

`55300` 无访问权限

`55500` 无效的鉴权信息，身份验证失败，需重新登录

!> 注意：使用错误代码枚举避免代码使用不确定的问题

![image-20220818143831603](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/hApYB8000image-20220818143831603.png)

---

# 共通方法

## 后端

### 分布ID

Web服务的配置文件中需要增加分布式ID相关配置

![image-20220818143852318](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/m0Z1sk000image-20220818143852318.png)

在需要使用生成分布式ID的地方，得com.mise.smart.utils.IdGenerator类

![image-20220818143856458](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Od1JS8000image-20220818143856458.png)

使用getId获取ID，即可生成Long型的分布式ID

![image-20220818143900108](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/W1R5ys000image-20220818143900108.png)

---

### 自定义@RequestList

当前端需要将数组作为请求参数时，接口希望直接使用参数，而非对象内属性接收到List的话，使用该注解

前端直接将数组作为请求参数，如perms: \[......\]，这里两个参数并非一个对象内属性，希望分别接收

![文本 描述已自动生成](media/image61.png)

接口参数使用perms接收为List，并定义List内数据类型，Spring Boot本身是不支持接收List的

![图形用户界面 描述已自动生成](media/image62.png)

配置项参考注解定义

![文本 描述已自动生成](media/image63.png)

---

### 后端获取当前用户信息

在需要使用用户信息的接口的Controller层增加注解及属性@CurProcessor Processor processor

![文本 描述已自动生成](media/image64.png)

Processor对象中有用户信息，后续可以按需调整对象属性

---

### 数据缓存-注解@ Cacheable

在需要数据缓存的业务层增加注解

@Cacheable(value = "userInfoCache", keyGenerator = "keyGenerator")

![文本 描述已自动生成](media/image65.png)

在redis中开启key为userInfoCache开头的存储空间，存储空间中的数据key为类全路径+方法名+参数，数据为方法返回值，下次请求如果该数据，就直接从Redis返回

注意：@Cacheable的key和keyGenerator是互斥的，两个只能使用一个，使用key需要自行输入，keyGenerator生成的默认为类全路径+方法名+参数

注意需要增加unless判断，满足条件返回true的将不缓存，例如空list不缓存

unless = "#result?.result.size() == 0"

![图形用户界面, 文本 描述已自动生成](media/image66.png)

---

### 数据缓存-RedisUtil

注入Redis工具

![文本 描述已自动生成](media/image67.png)

常用方法：

增加缓存：redisUtil.set(key, value);

获取缓存有效时间（-1为无期限）：long t = redisUtil.getExpire(key);

设置缓存有效时间（小于等于0为无期限）：redisUtil.expire(key, 0);

获取缓存：SysUser sss = (SysUser) redisUtil.get(key);

\*：更多方法参考工具类

---

### 分布式锁

作用：分布式的微服务操作同一数据时，避免数据的错误修改，获取锁之后就保证同时只有一个事务在操作数据

注入分布式锁工具RedisLockRegistry redisLockRegistry

![文本 描述已自动生成](media/image68.png)

业务使用锁时如图，关键内容为红框内，锁的内容必须为String

![文本 描述已自动生成](media/image69.png)

---

### 保存操作记录

在需要记录操作的地方调用该方法获取实例

![文本 描述已自动生成](media/image70.png)

有以下方法，按需传参即可

| 方法            | 说明                         |
|-----------------|------------------------------|
| recordNormalLog | 一般记录，非数据库操作       |
| recordExportLog | 导出操作，记录信息包含表信息 |
| recordQueryLog  | 查询操作，记录信息包含表信息 |
| recordDeleteLog | 删除操作，记录信息包含表信息 |
| recordInsertLog | 插入操作，记录信息包含表信息 |
| recordUpdateLog | 更新操作，记录信息包含表信息 |

---

### 后台获取国际化标识

注解@LocalLanguage获取国际化标识，和Locale进行判断当前语言环境，如：

![图形用户界面, 文本 中度可信度描述已自动生成](media/image71.png)

---

### 全局事务注解

![图形用户界面, 文本, 网站 描述已自动生成](media/image72.png)

注解@GlobalTransactional，可以加在控制层、业务层，可以管理服务内、跨服务（Feign调用）的事务

---

### 限流

在业务层代码块上方添加@SentinelResource("HelloWorld")

![图形用户界面, 文本, 聊天或短信 描述已自动生成](media/image73.png)

---

### 降级

实现Feign调用接口，实现类中写降级响应信息及返回值

![文本 描述已自动生成](media/image74.png)

---

在Feign调用时增加fallback属性，fallback指定feign实现类即可，在feign调用失败时，就会自动使用实现类的响应，同时注意在接口上增加注解@Primary，否则Fallback实现类和接口的bean将冲突

![手机屏幕的截图 描述已自动生成](media/image75.png)

---

### 消息队列发布

定义RocketMQ工具类

![](media/image76.png)

调用异步发布消息方法

![图形用户界面, 应用程序 描述已自动生成](media/image77.png)

---

### 消息队列订阅

仅需创建业务层实现RocketMQListener接口，并添加注解信息即可，topic为发布消息的topic

![文本 描述已自动生成](media/image78.png)

![文本 描述已自动生成](media/image79.png)

---

### 全文检索数据同步声明

在需要检索的数据业务层增加注解：@SyncElasticSearch配置如下

![图形用户界面, 文本 描述已自动生成](media/image80.png)

参数说明：

value：同步数据类型

operate：同步操作类型

dataParamsIndex：同步数据在参数中的位置

---

### 数据库加密字段开发

核心类：com.mise.smart.resolver.DBFieldEncryptHandler

实体修改，修改后仅会在Mybatis操作数据库时受影响

![文本 描述已自动生成](media/image81.png)

由于安全策略，相同的明文值加密后的密文也是不一样的，所以无法目前无法实现对加密字段条件查询，暂时可以使用查询后由代码过滤（持久层查询出来是解密后的）得到需要数据

---

### 分表查询

由于SaaS平台多租户的特性，所以对于不同租户数据理应是隔离的，出于系统性能和数据的隔离性考虑，对不同租户进行的分表处理如：t_user表，分表后为：t_user_tenant1、t_user_tenant2，但是数据的结构还是t_user的结构，程序中还是t_user的实体，那查询的时候就要根据当前用户所属租户，自动匹配分表查询，方式如下

在持久层操作之前，先声明租户信息，再进行操作，声明租户信息后的一次操作会被动态更新为声明的租户分表进行操作（注意：仅对相邻的一次操作有效）

[TABLE]

---

### 分表查询忽略配置

mybatis-plus.custom-config. dynamicTableNameIgnore

配置内容为表名（支持正则表达式）数组

![](media/image82.png)

---

## 前端

### 新增菜单及权限配置

前端新增功能的页面目录

![image-20220818144159702](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/cnkRSt000image-20220818144159702.png)

目录内新增vue页面

![image-20220818144205795](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/W6yzvX000image-20220818144205795.png)

增加空页面代码

![image-20220818144211569](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/SNBurN000image-20220818144211569.png)

增加页面路由组件引用

![image-20220818144257251](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/jlj3B0000image-20220818144257251.png)

使用菜单管理功能新增路由信息

![image-20220818144304064](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/LFiBYD000image-20220818144304064.png)

点击保存菜单即可

配置菜单到用户角色

![image-20220818144308627](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/j87my2000image-20220818144308627.png)

分配路由权限，保存即可

![image-20220818144312135](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/OmaX0d000image-20220818144312135.png)

拥有该角色的用户，重新登录就可以访问新的菜单了

![image-20220818144315861](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/LG1eeN000image-20220818144315861.png)

---

### 菜单功能权限配置

![image-20220818144320251](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/e1Ylgz000image-20220818144320251.png)

如上图的菜单管理功能的配置

效果为：

1. 用户有该页面路由权限，也就是说，用户可以访问由该路由页面发出的API请求

2. 如果用户的权限没有该页面路由（菜单），则无权限访问该页面【菜单权限】下的任何接口

3. 如果用户的权限有该页面路由 （菜单），则继续校验【菜单权限】中，分配给该用户的 菜单权限，是否符合本次访问的接口地址

4. 接口地址不符合该用户拥有的【菜单权限】，返回无访问权限

5. 接口地址符合该用户拥有的【菜单权限】，正常调用接口

---

### 判断用户身份？

---

### 前台国际化

在对应的语言下创建和页面目录一致的国际化配置目录

![image-20220818144331807](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/UwCg3D000image-20220818144331807.png)

在与页面同名的js中写语言内容

![image-20220818144337551](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/r5pC0Y000image-20220818144337551.png)

页面使用

![image-20220818144352388](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/4ZiCzs000image-20220818144352388.png)

![image-20220818144358039](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/DyDVQQ000image-20220818144358039.png)

---

### 字典表数据获取

如表中有该数据

![image-20220818144406679](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bYhhqi000image-20220818144406679.png)

在需要指定类型（type）的数据字典列表时，在页面调用以下两种方法即可获取列表数据

![image-20220818144411392](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/FDScQi000image-20220818144411392.png)

使用哪种方法，根据自己需要即可

---

### 字典表数据转换

当取出的数据都是字典的Key时，需要转换成Label，就可以先用上面的方法获取这个key所在的字典type列表，然后调用如下方法，就可以得到label

在页面元素UI标签中使用，第一个参数是字典type列表，第二个参数是当前数据的key

![image-20220818144417562](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/19hq86000image-20220818144417562.png)

---

### 附件与业务数据保存

使用前台附件上传组件上传文件，是即时上传的，就是选择文件后就开始上传了，因为考虑到，避免上传文件的进度和时长影响保存业务数据的响应

所以需要先上传文件，上传后需要更改或删除已上传文件，再未提交业务数据之前（未保存，也就是没有关联业务数据，下面说的），点击后面的【x】可以撤销已选择上传的文件

![image-20220818144422435](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/ldcrmu000image-20220818144422435.png)

获取到上传文件的响应数据，数据中每个对象有属性【id】，就是文件数据的ID

![image-20220818144426972](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/1q65VQ000image-20220818144426972.png)

业务数据保存的时候，将该信息带入，保存完业务数据后，拿到业务数据的ID，去更新每一条文件数据（根据文件ID遍历）的f_business_table、f_business_id信息，这样业务数据和文件数据就关联了

![image-20220818144434381](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/61vTBP000image-20220818144434381.png)

---

# 前端组件

## UEditor-富文本编辑器

![image-20220818144442570](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/FY3x0S000image-20220818144442570.png)

---

## Markdown编辑器

![image-20220818144446323](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/AoGz51000image-20220818144446323.png)

---

## Video播放插件

![image-20220818144450007](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/1o0xNl000image-20220818144450007.png)

---

## 浏览器指纹

获取浏览器唯一标识，用于通过用户的客户端判断用户的唯一性，同一台设备同一个系统设置系统版本的浏览器都是一个（可以较大的概率辨别用户客户端唯一的标识，但不是100%），主要用于没有用户信息或用户ID时，辨别不同的客户端访问![image-20220818144454209](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/huRQM3000image-20220818144454209.png)

---

## Web代码编辑器？

---

## 文本差异比对器

用于展示信息变化

![image-20220818144500088](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Uap08c000image-20220818144500088.png)

状态为只读，左右比对差异

![image-20220818144504629](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/NcnMkB000image-20220818144504629.png)

---

## 文件上传

启动smart-static微服务即可使用上传、下载文件接口

![image-20220818144510027](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/L6lj8G000image-20220818144510027.png)

前端在需要使用上传组件的地方如下即可

![image-20220818144515299](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/OJEOMH000image-20220818144515299.png)

| 属性           | 类型    | 默认值   | 说明                                                                              |
|----------------|---------|----------|-----------------------------------------------------------------------------------|
| v-model        | Array   | \[\]     | 文件列表                                                                          |
| multiple       | Boolean | true     | 是否多选                                                                          |
| business-dir   | String  | ‘’       | 服务器附件业务目录                                                                |
| is-access      | Boolean | true     | 是否需要授权访问文件资源                                                          |
| show-file-list | Boolean | true     | 是否显示上传文件列表                                                              |
| drag           | Boolean | false    | 是否可以拖拽                                                                      |
| accept         | String  | ‘’       | 参考：<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept> |
| limit          | Number  | 1        | 上传文件数量限制                                                                  |
| list-type      | String  | text     | text/picture/picture-card                                                         |
| button-text    | String  | 点击上传 | 上传按钮文字                                                                      |
| tip-text       | String  | ‘’       | 上传提示文字                                                                      |

| 事件              | 回调参数 | 说明                                |
|-------------------|----------|-------------------------------------|
| previewEvent      | file     | 点击文件列表文件的事件              |
| beforeUploadEvent | file     | 上传文件前判断，返回false即停止上传 |

---

## 文件下载

引入下载文件API

![image-20220818144522607](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/rZL0p5000image-20220818144522607.png)

调用API传入文件数据ID即可下载文件

![image-20220818144527182](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/ExkQE6000image-20220818144527182.png)

---

## 文件展示

引入文件展示浏览器本地URL的API

![image-20220818144534905](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/HHfnPz000image-20220818144534905.png)

调用API传入文件数据ID即可获取用于展示的浏览器本地url

![image-20220818144538600](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/w5vcZY000image-20220818144538600.png)

如图片，url就可以直接放在src显示元素

![image-20220818144543385](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/pFJje9000image-20220818144543385.png)

---

## 表单设计/解析器

![image-20220818144548029](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/8BCYUR000image-20220818144548029.png)

![image-20220818144553246](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Tts8wq000image-20220818144553246.png)

---

## 拖拽流程图

![image-20220818144557651](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/0642lG000image-20220818144557651.png)

---

# 后端模块开发

## 定时任务开发

在配置文件增加如下配置，并保证运行服务主机和调度器主机见8029端口可以通信

[TABLE]

在包下创建schedule文件夹，作为定时任务的“controller层”入口文件目录

![图形用户界面, 文本, 应用程序 描述已自动生成](media/image118.png)

创建文件并编写任务，除了如图中的注解以外和controller写法一致，可调用业务层

![文本 描述已自动生成](media/image119.png)

特殊说明：日志输出，使用log.()仅会输出到控制台、java的日志，不会在定时任务调度器中查看日志，如果需要在定时任务调度器中也看到日志，使用XxlJobHelper.log()输出日志即可

![图形用户界面, 文本 描述已自动生成](media/image120.png)

---

## 定时任务调度器使用

启动smart-job-admin服务

访问定时任务调度器：<http://127.0.0.1:8030/smart-job-admin>，并保证运行服务主机和调度器主机见8029端口可以通信，暂不考虑单机负载端口，就是8029即可

![图形用户界面, 网站 描述已自动生成](media/image121.png)

到调度器添加定时任务，“任务管理”-“执行器”，选择项目所在执行器（执行器由管理员管理），点击新增

![图形用户界面, 应用程序 描述已自动生成](media/image122.png)

填写任务信息，注意JobHandler填写@XxlJob("xx")中的参数，任务的唯一标识，Cron填写cron表达式，使任务按照定时规则运行，其余的按需填写

![图形用户界面, 文本, 应用程序 描述已自动生成](media/image123.png)

对任务操作；

执行一次：主动执行一次，不会按照cron定时执行

启动：开始按照cron定时执行

停止：停止按照cron定时执行

![图形用户界面, 文本, 应用程序 描述已自动生成](media/image124.png)

查看日志：可以查看任务执行情况

![图形用户界面, 文本, 应用程序 描述已自动生成](media/image125.png)

执行情况的操作-执行日志可以查看XxlJobHelper.log()输出的日志

![社交网站的手机截图 描述已自动生成](media/image126.png)

![图形用户界面, 文本, 应用程序, 电子邮件 描述已自动生成](media/image127.png)

---

## 接口文档生成

开发业务接口时，在需要生成接口文档的控制层添加注解

在类上增加@Api(value = "用户管理业务接口", tags = "sysUser")，描述接口跟路径用途

![文本 描述已自动生成](media/image128.png)

*在方法上增加注解：*

*接口方法描述*

@ApiOperation(value = "查用户列表", notes = "页码、每页条数必传")

*接口入参描述*

@ApiImplicitParams({

@ApiImplicitParam(paramType = "header", dataType = "String", name = "MS-TOKEN", value = "token", required = true),

@ApiImplicitParam(paramType = "query", dataTypeClass = SysUser.class, name = "sysUser", value = "查询条件", required = false)

})

[TABLE]

*接口响应描述*

@ApiResponses({

@ApiResponse(responseCode = "51000", description = "请求发生错误"),

@ApiResponse(responseCode = "404", description = "请求走丢了"),

@ApiResponse(responseCode = "200", description = "请求成功")

})

![电脑屏幕的截图 描述已自动生成](media/image129.png)

重启该服务

---

## 接口文档查看

启动并访问接口文档服务smart-doc（本地的话需要自行启动），端口为8211

<http://127.0.0.1:8211/doc.html>

*tips：*

暂时因为nacos的安全配置，无法自动聚合各服务接口文档，所以需要自行访问各个服务的文档UI在服务的pom中添加

\<dependency\>

\<groupId\>com.github.xiaoymin\</groupId\>

\<artifactId\>knife4j-spring-ui\</artifactId\>

\<version\>\${knife4j.micro.version}\</version\>

\</dependency\>

不用提交，本地用就行，然后访问对应服务的端口+/doc.html#/home，如system：<http://127.0.0.1:8206/doc.html#/home>

便可进行接口的查看及基本调用调试

![image-20220818144626886](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/yAkxW1000image-20220818144626886.png)

![image-20220818144631351](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/MfQMGY000image-20220818144631351.png)

---
