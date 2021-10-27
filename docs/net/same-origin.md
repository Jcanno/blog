### 同源策略

- 为什么需要同源策略？

  没有同源策略将加大网络操作的风险，例如 B 站点的脚本访问 A 站点，获取到 A 站点的 Cookie，模拟发起请求，让 A 站点的服务端执行某些请求。或者 B 站点脚本修改 A 站点的 DOM 结构,例如表单 action，这是 B 站点可以获取到 A 站点所提交的敏感信息。

- 什么是同源策略?

  限制从同一个源加载的文档或脚本与另一个源如何交互的策略

- 何为同源？

  协议、主机、端口必须完全相同

同源策略提供了安全性，但降低网络通信的便利性，为提供一定的可用，体现在以下几个方面:

- <script><img><link><video>的src属性可以跨域访问
- 允许跨域写操作：例如表单提交，但可能会存在 CSRF 安全性问题

从安全性考虑，同源策略禁止以下行为：

- 无法读取 Cookie、LocalStorage、IndexDB 中的数据
- 无法获取 DOM 或篡改 DOM 结构
- 不能发送 AJAX 请求

CORS: Cross-Origin Resource Sharing

浏览器同源策略下跨域解决方案：通过服务端响应告知浏览器该站点是否可以跨域访问，分为两种跨域方案，简单请求跨域和复杂请求跨域：

何为简单请求？

- GET/POST/HEAD 请求方法之一
- 仅使用 CORS 安全的头部：Accept、Accept-Language、Content-Language、Content-Type
- Content-Type 值只能是：text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一

复杂请求则会发起预检(Options)询问请求是否合法

- 简单请求跨域
  - 请求中携带 Origin 头部告知来自哪个域
  - 响应中携带 Access-Control-Allow-Origin 头部允许哪些域
  - 浏览器放行
- 复杂请求跨域
  - 预检请求头部
    - Access-Control-Request-Method
    - Access-Control-Request-Headers
  - 预检请求响应
    - Access-Control-Allow-Method
    - Access-Control-Allow-Method
    - Access-Control-Max-Age
