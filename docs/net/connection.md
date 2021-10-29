### 连接管理

**HTTP/0.9**版本每次发送 HTTP 数据包会进行 TCP 连接，但每次发送 HTTP 数据包都需要进行 TCP 三次握手连接，非常消耗性能

HTTP/1.1 版本默认长连接管理

- 客户端请求长连接: Connection: Keep-Alive
- 服务端表示支持长连接: Connection: Keep-Alive
- 客户端复用连接
- Connection: close 短连接
- HTTP/1.1 Connection: Keep-Alive 无意义，默认开启
- Connection 仅对当前连接有效(即请求链路中代理服务器 Connection 可开启或关闭)
