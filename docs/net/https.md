### HTTPS

- 对称加密：通信双方使用相同密钥加密解密信息
  - 加密算法：AES
  - 问题：无法解决密钥交换的问题
- 非对称加密：通信双方使用公钥加密信息，用私钥解密
  - 加密算法：RSA
  - 问题：加密方法运算效率低，不实用
- 混合加密：通信双方使用非对称加密加密密钥，解密后用密钥进行对称加解密
  - 特点：解决了非对称加密效率低的问题，同时解决了密钥交换的问题
  - 问题：无法确认对方是可信的，例如黑客可以通过 DNS 劫持，伪装成目标网站，发布自己的公钥，同样使用混合加密，此时敏感信息会遭到泄露
- 摘要算法：通过将明文+摘要(hash 计算后，不可逆)传递给对方，对方可根据相同算法 hash 计算，并与摘要比对
  - 作用：证明明文在传输过程中没有被篡改
  - 算法：SHA-2
- 数字签名：双方交换公钥，一方使用私钥进行“签名”，对方使用公钥“验签”，保证通信的可靠

### TLS 连接过程

- 客户端向服务端发送**Client Hello**消息，消息中包含了一个客户端生成的随机数**Random1**、客户端支持的加密套件以及 SSL Version 信息
- 服务端向客户端发送**Server Hello**消息，消息中包含选中的加密套件，一个随机数**Random2**
- 服务端下发证书到客户端
- 客户端收到证书后，从 CA 验证证书的合法性，接着取出证书中的服务端公钥，生成一个随机数**Random3**，使用服务端公钥生成**PreMaster Key**，发送给服务端
- 服务端接收到**PreMaster Key**后使用私钥非对称解密到随机数**Random3**，此时客户端和服务端同时拥有 3 个随机数：**Random1、Random2、Random3**
- 客户端和服务端将这三个随机数使用相同的算法生成一份密钥，TLS 连接后就使用该密钥进行加密
