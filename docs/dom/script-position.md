# script 标签

HTML 文档中添加 js 脚本非常容易，主要使用 script 标签，有三种方式：

- 直接在 script 标签中添加 js 代码
- script 标签 src 属性引用外部的 js 脚本文件
- 动态添加 script 脚本

### script 标签在 HTML 文档中的位置

浏览器在渲染 HTML 文档时，会从上而下依次分析解释 HTML 各个标签内容，若我们将 script 标签放在 head 中，例如:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="./example.js"></script>
    <title>Document</title>
  </head>
  <body></body>
</html>
```

浏览器会下载、解析 script 标签对应的 js 脚本文件，当完成后才进行下面标签的解析工作，这时我们若把大量的 js 脚本文件放在 head 标签中，则会造成浏览器解析负担，从而影响页面加载效率，为解决这种情况，有两种方式:

- 将 script 移至 body 标签后，这样浏览器则会优先解析页面内容
- 给 script 标签加上 defer 属性，此时浏览器会异步下载该 js 脚本，但执行过程则延迟在 HTML 文档解析之后，这就保证了页面元素的渲染

### script 的 defer 与 async 的异同

defer 和 async 属性都会让浏览器异步下载 js 脚本文件，defer 对应的 js 脚本会在 DOMContentLoaded 事件之前执行，多个 defer 声明的 js 脚本文件执行顺序为 HTML 中声明的顺序。async 则是下载脚本后执行，一定会在 loaded 事件前执行，async 不能保证 js 脚本执行的顺序，可能会出现 js 脚本冲突的情况，因此并不推荐使用 async 声明 script 标签。
