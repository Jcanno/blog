### Cookie

HTTP 协议是无状态的，前后的 HTTP 请求完全是独立的，不像 TCP 协议，TCP 内部会管理当前连接的状态(开启、关闭等)。为了让 HTTP 请求在某些场景保持”记忆“，HTTP 请求可以通过 Cookie 请求头保持状态。

Cookie 特点:

- 保存在内存中
- 服务端生成 Cookie 通过 Set-Cookie 头部(一次只能传递一个 key-value 键值对)告知浏览器保存 Cookie 信息
- 客户端得到 Cookie 后，后续请求都会自动加上 Cookie 头部到请求中

Cookie 属性:

- expires: cookie 到期后失效
- max-age: 经过多少秒后失效，优先级高于 expires
- domain: 指定域名使用 Cookie，默认当前域名
- path: 指定路径使用 Cookie
- secure: 只有 HTTPS 才能使用 Cookie
- httponly: 不能使用 JavaScript 访问 Cookie，只能通过 HTTP 协议传输 Cookie

Cookie 的限制:

- 存储大小为 4kb
- 增加了带宽(每个请求都会携带 Cookie)
- Cookie 是明文传输的，有潜在安全性问题(https 除外)
