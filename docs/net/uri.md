### URI

IP 解决了访问主机的问题，URI 则是提供了访问具体主机资源的功能

URI 例子

```jsx
http://nginx.org/en/download.html
```

主要有三个基本的部分构成：

1. 协议名(scheme)：即访问该资源应当使用的协议，在这里是“http”；
2. 主机名(authority)：即互联网上主机的标记，可以是域名或 IP 地址，在这里是“nginx.org”；
3. 路径(path)：即资源在主机上的位置，使用“/”分隔多级目录，在这里是“/en/download.html”。

为什么对 URI 编码？

- 不在 ASCII 编码中的字符
- 产生歧义的分隔符

例如：

- https://www.baidu.com/s?wd=?#!
- https://www.baidu.com/s?wd=你好 哈哈

以上链接不做编码会造成链接无法被识别

如何编码？

- 通过百分号编码的方式，% + 两位 16 进制数
- 非 ASCII 字符编码(比如中文): 先进行 UTF-8 编码，再进行 US-ASCII 编码

js 可通过 encodeURI 进行整个 URI 编码
