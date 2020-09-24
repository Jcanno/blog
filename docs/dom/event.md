# DOM事件机制

### 如何给DOM元素添加事件?

HTML文档中有一个button标签

```html
<body>
  <button id="btn">click</button>
</body>
```

我们可以通过两种方式添加事件:

1. el.onclick = function() {}
```js
const btn = document.getElementById('btn')
btn.onclick = function(e) {
  console.log('btn 1')
}
```
2. el.addEventListener(event, callback, useCapture)

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', function() {
  console.log('btn 2')
})
```

`onclick`与`addEventListener`区别就是:
- `onclick`同个事件只能绑定一个回调函数，并且事件只能在冒泡阶段执行
- `addEventListener`通过监听同个事件可以触发多个回调函数，第三个参数可以设置事件在冒泡或捕获阶段执行

例子:
```js
const btn = document.getElementById('btn')
btn.onclick = function(e) {
  console.log('btn 1')
}

btn.onclick = function(e) {
  console.log('btn 2')
}

btn.onclick = function(e) {
  console.log('btn 3')
}

btn.addEventListener('click', function() {
  console.log('btn 4')
})

btn.addEventListener('click', function() {
  console.log('btn 5')
})

// 点击按钮 输出:
// btn 3
// btn 4
// btn 5
```

### 事件冒泡和捕获

触发一个事件，会经历三个阶段:

1. 捕获阶段:从最外层`window`依次向目标节点传播事件的阶段
2. 目标阶段:目标节点触发回调函数
3. 冒泡阶段:从目标节点向`window`传播事件的阶段

例子:
```html
<body>
  <ul id="ul" onclick="console.log('ul冒泡')">
    <li id="li" onclick="console.log('li冒泡')">
      <button id="btn" onclick="console.log('btn冒泡')">点击</button>
    </li>
  </ul>
  <script>
    const btn = document.getElementById('btn')
    const li = document.getElementById('li')
    const ul = document.getElementById('ul')
    
    btn.addEventListener('click', function(e) {
      console.log('btn捕获')
    }, true)
    li.addEventListener('click', function(e) {
      console.log('li捕获')
    }, true)
    ul.addEventListener('click', function(e) {
      console.log('ul捕获')
    }, true)
    document.addEventListener('click', function (e) {
      console.log('document冒泡')
    })
    window.addEventListener('click', function (e) {
      console.log('window冒泡')
    })
    document.addEventListener('click', function (e) {
      console.log('document捕获')
    }, true)
    window.addEventListener('click', function (e) {
      console.log('window捕获')
    }, true)
  </script>
</body>

<!-- 点击按钮  输出: -->
<!-- window捕获 -->
<!-- document捕获 -->
<!-- ul捕获 -->
<!-- li捕获 -->
<!-- btn冒泡-->
<!-- btn捕获 -->
<!-- li冒泡 -->
<!-- document冒泡-->
<!-- window冒泡 -->
```

这里总结几点:

- 点击按钮触发事件，最外层window的捕获事件先触发，按着`window -> document -> ul -> li -> btn`依次向里触发捕获回调
- `btn`是本次事件的目标节点，从输出结果看，`btn冒泡`先于`btn捕获`触发，原因在于目标节点的捕获和冒泡`谁先监听就先触发谁`，模板里先监听了`click`冒泡阶段，后在js监听捕获阶段，因此与结果一致

### 阻止冒泡

```js

```
修改上面例子中
