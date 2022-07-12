### Spring Boot 单元测试 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.引入依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**依赖树**
![依赖树](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/z9iLpp.png)

1. JUnit，标准的单元测试 Java 应用程序；
2. Spring Test & Spring Boot Test，对 Spring Boot 应用程序的单元测试提供支持；
3. Mockito, Java mocking 框架，用于模拟任何 Spring 管理的 Bean，比如在单元测试中模拟一个第三方系统 Service 接口返回的数据，而不会去真正调用第三方系统；
4. AssertJ，一个流畅的 assertion 库，同时也提供了更多的期望值与测试返回值的比较方式；
5. Hamcrest，库的匹配对象（也称为约束或谓词）；
6. JsonPath，提供类似 XPath 那样的符号来获取 JSON 数据片段；
7. JSONassert，对 JSON 对象或者 JSON 字符串断言的库。

---

!> Spring Boot Test 在 2 版本后是引入 junit5, <br>junit4 和 junit5 写法不一样 <br>本项目用的 springboot 版本是 2.5.13

#### 2.普通测试

**junit4**

```java

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestApplicationTests {
    @BeforeClass
    public static void beforeClassTest() {
        System.out.println("before class test");
    }
    @Before
    public void beforeTest() {
        System.out.println("before test");
    }
    @Test
    public void Test1() {
        System.out.println("test 1+1=2");
        Assert.assertEquals(2, 1 + 1);
    }
    @Test
    public void Test2() {
        System.out.println("test 2+2=4");
        Assert.assertEquals(4, 2 + 2);
    }
    @After
    public void afterTest() {
        System.out.println("after test");
    }
    @AfterClass
    public static void afterClassTest() {
        System.out.println("after class test");
    }
}
```

**junit5**

```java
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringBootTest(classes = SourceStudyApplication08.class)
//@ExtendWith(SpringExtension.class)
@SpringJUnitConfig
@Slf4j
public class ApplicationTest {
    @BeforeAll
    public static void beforeTest() {
        log.info("before test");
    }
    @BeforeEach
    public void beforeMethod() {
        log.info("before test method");
    }
    @AfterEach
    public void afterMethod() {
        log.info("after test method");
    }
    @Test
    public void Test1() {
        log.info("test 1+1 = 2");
        Assertions.assertEquals(2, 1 + 1);
    }
    @Test
    public void Test2() {
        log.info("test 2+2 = 4");
        Assertions.assertEquals(4, 2 + 2);
    }
    @AfterAll
    public static void afterTest() {
        log.info("after test");
    }
}
```

!> junit5 使用`org.junit.jupiter.api.Assertions;`代替 junit4 的 Assert 类,提供了常用 assert 方法

- assertEquals(int expected, int actual, String message)，判断 A 对象和 B 对象是否相等，这个判断在比较两个对象时调用了 equals()方法。
- assertNotSame(Object unexpected, Object actual, String message) 判断 A 对象与 B 对象是否相同，使用的是==操作符。
- assertTrue(BooleanSupplier booleanSupplier, String message) 判断 A 条件是否为真。
- assertFalse(BooleanSupplier booleanSupplier, String message) 判断 A 条件是否不为真。
- assertNotNull(Object actual, String message) 判断 A 对象是否不为 null。
- assertArrayEquals(boolean[] expected, boolean[] actual, String message) 判断 A 数组与 B 数组是否相等。
  **测试结果**
  ![测试结果](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/QSZcgj.png)
  !> 可以使用`@SpringJUnitConfig`代替`@ExtendWith`  
  ![SpringJUnitConfig](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Ih6hi6.png)

#### 3.Mock Mvc 测试

##### 3.1.Mock 初始化

```java

@SpringBootTest
@SpringJUnitConfig
@Slf4j
public class MockTest {
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext context;
    /** mock初始化 */
    @BeforeEach
    public void setuoMockMvc() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
  ...
}
```

##### 3.2.1.模拟 MVC 请求

- 模拟 get 请求

```java
mockMvc.perform(MockMvcRequestBuilders.get("/hello?name={name}","mrbird"));
```

- 模拟 post 请求

```java
mockMvc.perform(MockMvcRequestBuilders.post("/user/{id}",1));
```

- 模拟文件上传

```java
mockMvc.perform(MockMvcRequestBuilders.fileUpload("/fileupload").file("file","文件内容".getBytes("utf-8")));
```

- 模拟请求参数

```java
// 模拟发送一个message参数，值为hello
mockMvc.perform(MockMvcRequestBuilders.get("/hello").param("message","hello"));
// 模拟提交一个checkbox值，name为hobby，值为sleep和eat
        mockMvc.perform(MockMvcRequestBuilders.get("/saveHobby").param("hobby","sleep","eat"));

```

- 使用 MultiValueMap 构建参数：

```java
MultiValueMap<String, String> params=new LinkedMultiValueMap<String, String>();
        params.add("name","mrbird");
        params.add("hobby","sleep");
        params.add("hobby","eat");
        mockMvc.perform(MockMvcRequestBuilders.get("/hobby/save").params(params));
```

- 模拟发送 JSON 参数：

```java
String jsonStr="{\"username\":\"Dopa\",\"passwd\":\"ac3af72d9f95161a502fd326865c2f15\",\"status\":\"1\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/user/save").content(jsonStr.getBytes()));
```

- 模拟 Session 和 Cookie：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index").sessionAttr(name,value));
        mockMvc.perform(MockMvcRequestBuilders.get("/index").cookie(new Cookie(name,value)));
```

- 设置请求的 Content-Type：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index").contentType(MediaType.APPLICATION_JSON_UTF8));
```

- 设置返回格式为 JSON：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1).accept(MediaType.APPLICATION_JSON));
```

- 模拟 HTTP 请求头：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1).header(name,values));
```

##### 3.2.2.处理返回结果

- 期望成功调用，即 HTTP Status 为 200：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1)).andExpect(MockMvcResultMatchers.status().isOk());
```

- 期望返回内容是 application/json：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1)).andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
```

\*检查返回 JSON 数据中某个值的内容：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1)).andExpect(MockMvcResultMatchers.jsonPath("$.username").value("mrbird"));
```

?> 这里使用到了 jsonPath，$代表了 JSON 的根节点 更多关于 jsonPath 的介绍可参考 https://github.com/json-path/JsonPath。

- 判断 Controller 方法是否返回某视图：

```java
mockMvc.perform(MockMvcRequestBuilders.post("/index")).andExpect(MockMvcResultMatchers.view().name("index.html"));
```

- 比较 Model：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}",1))
        .andExpect(MockMvcResultMatchers.model().size(1))
        .andExpect(MockMvcResultMatchers.model().attributeExists("password"))
        .andExpect(MockMvcResultMatchers.model().attribute("username","mrbird"));
```

- 比较 forward 或者 redirect：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
        .andExpect(MockMvcResultMatchers.forwardedUrl("index.html"));
// 或者
        mockMvc.perform(MockMvcRequestBuilders.get("/index"))
        .andExpect(MockMvcResultMatchers.redirectedUrl("index.html"));
```

- 比较返回内容，使用 content()：

```java
// 返回内容为hello
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
        .andExpect(MockMvcResultMatchers.content().string("hello"));
// 返回内容是XML，并且与xmlCotent一样
        mockMvc.perform(
        MockMvcRequestBuilders.get("/index"))
        .andExpect(MockMvcResultMatchers.content().xml(xmlContent));
// 返回内容是JSON ，并且与jsonContent一样
        mockMvc.perform(
        MockMvcRequestBuilders.get("/index"))
        .andExpect(MockMvcResultMatchers.content().json(jsonContent));

```

- 输出响应结果：

```java
 mockMvc.perform(MockMvcRequestBuilders.get("/index")).andDo(MockMvcResultHandlers.print());
```

##### 3.3.controller 测试

**controller**

```java

@RestController
public class SysLogController {
    @Autowired
    private SysLogService service;
    @GetMapping("/test/{id}")
    public SysLog getSysLogById(@PathVariable Integer id) {
        return service.getById(id);
    }
}
```

**测试类**

```java

@SpringBootTest(classes = SourceStudyApplication08.class)
@SpringJUnitConfig
@Slf4j
public class MockTest {
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext context;
    @BeforeEach
    public void setuoMockMvc() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
    @Test
    public void testController() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/test/{id}", 1)
                                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andDo(MockMvcResultHandlers.print()
                );
    }
}
```

**测试结果**

![测试结果](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/AOWiMa.png)

#### 3.4.模拟 session

模拟一个登录用户信息 Session.

```java
private MockMvc mockMvc;
private MockHttpSession session;
@Autowired
private WebApplicationContext wac;
@Before
public void setupMockMvc(){
        mockMvc=MockMvcBuilders.webAppContextSetup(wac).build();
        session=new MockHttpSession();
        User user=new User();
        user.setUsername("Dopa");
        user.setPasswd("ac3af72d9f95161a502fd326865c2f15");
        session.setAttribute("user",user);
        }
```
