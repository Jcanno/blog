### 域名

域名用途：用容易记忆的字符映射 IP 地址

### 域名解析

域名格式为`www.baidu.com`，以.分隔，其中.com 是顶级域名，当查询域名时，需要访问根域名服务器，根域名服务器返回匹配的顶级域名服务器，再去查找顶级域名服务器的匹配结果。最终返回 IP 地址。

全世界有 13 台根域名服务器，运行性能也非常强大，但面对巨大流量的网络请求时，还是会有瘫痪的风险。因此有了**域名缓存**，主要有以下几个域名缓存

- 浏览器域名缓存
- 操作系统域名缓存
- hosts 文件缓存
- 运营商/公司服务器域名缓存(非权威域名服务器缓存)

域名缓存减缓了根域名服务器的压力，加快了域名解析的过程，有了域名缓存后，域名解析的过程是**浏览器域名缓存 → 操作系统域名缓存 → hosts 文件缓存 → 非权威域名服务器缓存 → dns**
