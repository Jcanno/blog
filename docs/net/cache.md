### 浏览器缓存

缓存是提高性能不可缺少的一项技术，浏览器实现了相应的缓存机制。

- 强制缓存

  通过 Cache-Control 和 Expires 表示缓存条件，若命中缓存，浏览器则不发起请求，直接拿缓存数据渲染页面

  强制缓存相关头部优先级:

  s-maxage > max-age > Expires > 预估过期时间

  例如:

  - Cache-Control: s-maxage=3600 (表示共享缓存为 3600 秒，代理服务器也可以缓存)
  - Cache-Control: max-age=86400
  - Expires: Fri, 03 May 2019 03:15:20 GMT(绝对的过期时间)

- 协商缓存

  通过 E-tag 和 Last-Modified 表示缓存条件，浏览器通过加入 If-Match(服务端匹配 E-tag)和 If-Last-Modified(服务端匹配 Last-Modified)请求头询问缓存是否可用，若服务端判断缓存可用，则返回 304 Not Modified，表示服务端资源没有被修改，浏览器可以使用缓存，否则服务端返回最新资源数据
