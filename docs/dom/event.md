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
- `onclick`同个事件只能绑定一个回调函数，可以看做在不断改变`onclick`引用，并且事件只能在冒泡阶段执行
- `addEventListener`通过监听同个事件可以触发多个回调函数，可以猜测`addEventListener`内部维护回调函数数组，触发事件调用数组里每一个回调函数，第三个参数可以设置事件在冒泡或捕获阶段执行

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

- 不同层级DOM元素需要定义同个事件的回调，事件传播会触发回调
- 点击按钮触发事件，最外层window的捕获事件先触发，按着`window -> document -> ul -> li -> btn`依次向里触发捕获回调
- `btn`是本次事件的目标节点，从输出结果看，`btn冒泡`先于`btn捕获`触发，原因在于目标节点的捕获和冒泡`谁先监听就先触发谁`，模板里先监听了`click`冒泡阶段，后在js监听捕获阶段，因此与结果一致

### 阻止事件传播

我们给上面例子中的`btn`捕获回调函数添加阻止事件传播的逻辑

```js
btn.addEventListener('click', function(e) {
  console.log('btn捕获')
  e.stopPropagation()
}, true)

// 点击按钮  输出:
// window捕获
// document捕获
// ul捕获
// li捕获
// btn冒泡
// btn捕获
```

`e.stopPropagation()`阻断了事件的传播，后面的回调不再触发，看到很多文章在说`e.stopPropagation()`是阻止冒泡，但`e.stopPropagation()`实际上是阻止事件传播的意思，也就意味着可以阻止任何阶段事件的传播，我们可以在`li`的捕获回调加入`e.stopPropagation()`，它同样能在捕获阶段阻止事件的传播

```js
li.addEventListener('click', function(e) {
  console.log('li捕获')
  e.stopPropagation()
}, true)
// 点击按钮  输出:
// window捕获
// document捕获
// ul捕获
// li捕获
```

### e.target与e.currentTarget

在`document`冒泡回调逻辑中打印`e.target`与`e.currentTarget`

```js
document.addEventListener('click', function (e) {
  console.log('document冒泡')
  console.log(e.currentTarget)   // #document
  console.log(e.target)          // <button></button>
})
```

看到这个输出就可以猜到：
- `e.currentTarget`就是**事件在传播中当前触发回调的DOM元素**
- `e.target`是**触发事件的目标DOM元素**

### 事件委托

事件委托主要利用**冒泡**的特性，将子元素的事件交给父元素委托处理，可以起到`减少内存消耗`和`动态绑定事件`的功能。

```html
<body>
  <ul id="ul">
    <li>我是1号</li>
    <li>我是2号</li>
    <li>我是3号</li>
    <li>我是4号</li>
  </ul>
  <button id="btn">添加</button>
</body>
<script>
  let ul = document.getElementById("ul");
  let il = document.getElementsByTagName('li')
  ul.onclick = function(ev){
    ev = ev || window.event;
    let target = ev.target || ev.srcElement;           
    if(target.nodeName.toLowerCase() == "li"){
      console.log(target.innerText);
    }
  };
  let btn = document.getElementById("btn");
  btn.onclick = function(ev){
    let newLi = document.createElement("li");
    newLi.innerHTML = `我是${il.length + 1}号`;
    ul.appendChild(newLi);
  };
</script>
```

- 在`ul`每个`li`绑定事件，`li`数目多会大大增加内存消耗，通过给父元素`ul`添加同名事件，找到触发事件的目标元素，可以根据元素的不同做不同的处理。
- 同时还能给动态添加的`li`自动绑定了事件

以上就是事件绑定的优势

### 如何添加自定义事件?

有三种方式添加自定义事件:

1. Event构造函数

```js
// 新建事件实例
let e = new Event('hi', {
  cancelable: true,
  bubbles: true
})
// 监听事件
document.addEventListener('hi', function(e) {
  console.log(e)
})
// 分发事件，触发监听回调
document.dispatchEvent(e)
```

2. CustomEvent

```js
let e = new CustomEvent('hi', {
  cancelable: true,
  bubbles: true,
  // 可以传参数
  detail: {
    message: 'from earth'
  }
})

document.addEventListener('hi', function(e) {
  // 获取传参
  console.log(e.detail)
})
document.dispatchEvent(e)
```

3. createEvent

```js
// 构造函数需要传CustomEvent
let e = document.createEvent('CustomEvent')
// 初始化hi事件
e.initEvent('hi', true)

document.addEventListener('hi', function(e) {
  console.log(e)
})

document.dispatchEvent(e)
```

自定义事件有什么用？
自定义事件实际上是订阅-观察模式，有利于逻辑的解耦

```html
<body>
  <button id="btn">click</button>
</body>
<script>
  const btn = document.getElementById('btn')
  btn.onclick = function(e) {
    doAWork()
    doBWork()
    doCWork()
    /* ... */
  }
</script>
```

`btn`执行点击时要处理其他函数逻辑，这样是与`btn`事件强绑定的，利用自定义事件进行逻辑解耦

```html
<body>
  <button id="btn">click</button>
</body>
<script>
  let e = new Event('hi')

  const btn = document.getElementById('btn')
  btn.onclick = function(e) {
    document.dispatchEvent(e)
  }

  document.addEventListener('hi', function(e) {
    doAWork()
  })

  document.addEventListener('hi', function(e) {
    doBWork()
    doCWork()
  })
  /* ... */
</script>
```

现在`btn`只需发布事件即可，监听逻辑可以分散到各自模块中去。

