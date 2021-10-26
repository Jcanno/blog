### 包体及相关头部

- 定长包体

定长包体通过Content-Length明确定义包体字节长度，例如`HelloWorld`是11字符，如果服务端定义Content-Length为10，客户端会收到截断的字符:`HelloWorl`，如果服务端定义Content-Length为20，客户端则不能正常解析字符报错。

- 不定长包体

不定长包体通过Transfer-Encoding头部指明Chunk传输方式

Content-Disposition头部

- inline: 包体以内联方式展示
- attachment: 指定浏览器以附件方式下载
    - 如Content-Disposition: attachment; filename="filename.jpg"
- 在multipart/form-data类型应答中，可以用于子消息部分
    - 如Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"

- form表单

    HTML Form提交表单相关属性：

    - action: 提交时发起的HTTP请求url
    - method: HTTP请求方法
    - enctype: 在method为POST下，对表单进行编码的方式
        - application/x-www-form-urlencoded(默认的编码方式)
            - 数据编码成以&分隔的键-值对，同时以=分隔键和值，字符以URL编码方式编码
        - multipart/form-data
            - boundary分隔符
            - 每部分都有HTTP头部描述子包体，例如Content-Type
            - last boundary结尾
