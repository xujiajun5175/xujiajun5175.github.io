### Spring Boot 整合 WebSocket

本节简单介绍下如何在 Spring Boot 引入 WebSocket，实现简单的客户端与服务端建立长连接并互发送文本消息。

#### 1.依赖

```xml

<dependencies>
    <!-- web -->
    ......

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>
</dependencies>

<build>
<plugins>
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
</plugins>
</build>
```

#### 2.服务端

**handler 类**

```java
package com.xujiajun.handler;

@Component
@Slf4j
public class MyStringWebSocketHandler extends TextWebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("和客户端建立连接");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 获取客户端发来的信息
        String receiveMessage = message.getPayload();
        log.info("接收消息:{}", receiveMessage);
        // 发送消息给客户端
        session.sendMessage(new TextMessage(fakeAi(receiveMessage)));
        // 关闭连接
        // session.close(CloseStatus.NORMAL)
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        session.close(CloseStatus.SERVER_ERROR);
        log.error("连接异常", exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("和客户端断开连接");
    }


    private static String fakeAi(String input) {
        if (input == null || "".equals(input)) {
            return "你说什么？没听清︎";
        }
        return input.replace('你', '我')
                .replace("吗", "")
                .replace('?', '!')
                .replace('？', '！');
    }
}
```

该类重写了父类 `AbstractWebSocketHandler` 的四个方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/oeusU2.png)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/ytN0Jr.png)

- afterConnectionEstablished，和客户端链接成功的时候触发该方法；
- handleTransportError，和客户端连接失败的时候触发该方法；
- afterConnectionClosed，和客户端断开连接的时候触发该方法；
- handleTextMessage，和客户端建立连接后，处理客户端发送的请求。

`WebSocketSession` 对象代表每个客户端会话，包含许多实用方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Y5zSLX.png)

?> 此外，因为我们的目的是实现和客户端的通信，并且内容为文本内容，所以我们继承的是 `TextWebSocketHandler`；

?> 如果传输的是二进制内容，则可以继承 `BinaryWebSocketHandler` ，更多信息可以自行查看 `WebSocketHandler` 的子类。

**配置类**

```java
package com.xujiajun.config;

@Configuration
@EnableWebSocket
public class WebSocketServerConfigure implements WebSocketConfigurer {
    @Autowired
    private MyStringWebSocketHandler myStringWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myStringWebSocketHandler, "/connnect").withSockJS();
    }
}
```

`@EnableWebSocket` 用于开启 WebSocket 相关功能，我们注入了上面创建的 `MyStringWebSocketHandler`，并将其注册到了 `WebSocketHandlerRegistry`。

上面代码的含义是，当客户端通过/connecturl 和服务端连接通信时，使用 `MyStringWebSocketHandler` 处理会话。`withSockJS` 的含义是，通信的客户端是通过 SockJS 实现的，下面会介绍到。

#### 3.客户端

[SockJS](https://github.com/sockjs/sockjs-client)是一个 JS 插件，用于构建 WebSocket，兼容性好。

**HTML**

在 resources 目录下新建 static 包，然后在该包下新建 client.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>WebSocket客户端</title>
    <script src="https://cdn.bootcss.com/sockjs-client/0.3.4/sockjs.min.js"></script>
    <link
      href="https://cdn.bootcss.com/twitter-bootstrap/4.4.1/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <style>
      .jumbotron {
        width: 100%;
      }

      #text {
        height: 3rem;
        font-size: 1rem;
        line-height: 3rem;
        margin: 1rem;
      }

      .btn {
        margin-right: 5px;
      }

      #connect {
        margin-left: 1rem;
      }

      #log {
        margin: 1rem 0 0 1rem;
      }
    </style>
    <div class="container">
      <div class="row">
        <div class="jumbotron">
          <input
            type="text"
            placeholder="请输入你想传输的内容"
            id="text"
            class="col-lg-12"
          />
          <input
            type="button"
            value="连接"
            class="btn btn-info"
            id="connect"
            onclick="connect()"
          />
          <input
            type="button"
            value="发送"
            class="btn btn-success"
            id="sent"
            disabled="disabled"
            onclick="sent()"
          />
          <input
            type="button"
            value="断开"
            class="btn btn-danger"
            id="disconnect"
            disabled="disabled"
            onclick="disconnect()"
          />

          <div id="log">
            <p>聊天记录:</p>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript">
      let text = document.querySelector('#text')
      let connectBtn = document.querySelector('#connect')
      let sentBtn = document.querySelector('#sent')
      let disconnectBtn = document.querySelector('#disconnect')
      let logDiv = document.querySelector('#log')

      let ws = null

      function connect() {
        let targetUri = '/connect'
        ws = new SockJS(targetUri)
        ws.onopen = function () {
          setConnected(true)
          log('和服务端连接成功！')
        }
        ws.onmessage = function (event) {
          log('服务端说：' + event.data)
        }
        ws.onclose = function () {
          setConnected(false)
          log('和服务端断开连接！')
        }
      }

      function sent() {
        if (ws != null) {
          ws.send(text.value)
          log('客户端说：' + text.value)
        } else {
          log('请先建立连接！')
        }
      }

      function disconnect() {
        if (ws != null) {
          ws.close()
          ws = null
        }
        setConnected(false)
      }

      function log(value) {
        let content = document.createElement('p')
        content.innerHTML = value
        logDiv.appendChild(content)
        text.value = ''
      }

      function setConnected(connected) {
        connectBtn.disabled = connected
        disconnectBtn.disabled = !connected
        sentBtn.disabled = !connected
      }
    </script>
  </body>
</html>
```

html，css 那些都不重要，重要的是我们引入了 SockJS 库。

在 `connect()`方法中，我们通过 `new SockJS(/connect)`和上面的服务端建立了 Socket 通信。SockJS 对象包含几个常用的实用方法：

- onopen，和服务端讲了连接后的回调方法；
- onmessage，服务端返回消息时的回调方法；
- onclose，和服务端断开连接的回调方法；
- send，发送消息给服务端；
- close，断开和服务端的连接。

上面的 JS 较为简单，其他逻辑自己看看吧。

#### 4.测试

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Bi8P0V.png)

#### 5.其他参考文档

https://blog.csdn.net/qq_35387940/article/details/93483678/
