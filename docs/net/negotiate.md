### 内容协商

TCP/IP 协议里，TCP、UDP 负责传输数据到目标地址，上层 HTTP 则需要对数据内容做一些工作，需要让应答双方知道这次请求数据内容是什么，总不能让服务端进行数据解析，这就降低了效率，因此有了数据协商，让双方按照约定内容定义数据格式。

HTTP 使用了邮件系统里的数据定义方案，叫做“多用途互联网邮件扩展”（Multipurpose Internet Mail Extensions），简称为 MIME。

常见的 MIME：

1. text：即文本格式的可读数据，我们最熟悉的应该就是 text/html 了，表示超文本文档，此外还有纯文本 text/plain、样式表 text/css 等。
2. image：即图像文件，有 image/gif、image/jpeg、image/png 等。
3. audio/video：音频和视频数据，例如 audio/mpeg、video/mp4 等。
4. application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有 application/json，application/javascript、application/pdf 等，另外，如果实在是不知道数据是什么类型，像刚才说的“黑盒”，就会是 application/octet-stream，即不透明的二进制数据。

同时 HTTP 在传输时会压缩数据，这时就通过 Encoding 定义压缩类型，常见压缩类型有：

1. gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
2. deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
3. br：一种专门为 HTTP 优化的新压缩算法（Brotli）

这样，客户端可以发送**Accept**和**Accept Encoding**来确定可以接收数据类型，服务端通过**Content-Type**返回命中的数据类型。

除了以上两种内容协商请求头外，还有两个关于语言类型协商的请求头。

**Accept-Language**字段标记了客户端可理解的自然语言，也允许用“,”做分隔符列出多个类型，例如：

```jsx

Accept-Language: zh-CN, zh, en
```

相应的，服务器应该在响应报文里用头字段**Content-Language**告诉客户端实体数据使用的实际语言类型：

```jsx

Content-Language: zh-CN
```

字符集在 HTTP 里使用的请求头字段是**Accept-Charset**，但响应头里却没有对应的 Content-Charset，而是在**Content-Type**字段的数据类型后面用“charset=xxx”来表示，这点需要特别注意。

例如，浏览器请求 GBK 或 UTF-8 的字符集，然后服务器返回的是 UTF-8 编码，就是下面这样：

```jsx
Accept-Charset: gbk, utf-8
Content-Type: text/html; charset=utf-8
```

不过现在的浏览器都支持多种字符集，通常不会发送 Accept-Charset，而服务器也不会发送 Content-Language，因为使用的语言完全可以由字符集推断出来，所以在请求头里一般只会有 Accept-Language 字段，响应头里只会有 Content-Type 字段。
