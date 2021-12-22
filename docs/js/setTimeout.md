### setTimeout 介绍

setTimeout 用于延时执行函数，它是一个全局方法。

### 语法

setTimeout 接收`回调函数`、`延时时间`以及`传入回调函数的参数`三种参数类型

```tsx
var timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
var timeoutID = setTimeout(function[, delay]);
var timeoutID = setTimeout(code[, delay]);
```

```tsx
// 可向回调函数传递参数
setTimeout(
  (num) => {
    console.log(num)
  },
  1000,
  1
)
```

setTimeout 返回定时器的 ID，可用于 clearTimeout 取消定时器

定时器 ID 是一个正数，当 setTimeout 被同一个对象调用时(Window 或 Web Worker)，产生的 ID 是唯一的。

### this 绑定

setTimeout 的回调函数若没有显式的绑定 this 指向，则 this 默认指向 window 或 global。例如：

```tsx
const myArray = ["zero", "one", "two"]
myArray.myMethod = function(sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this)
}

myArray.myMethod() // prints "zero,one,two"
myArray.myMethod(1) // prints "one"
```

```tsx
setTimeout(myArray.myMethod, 1.0 * 1000) // prints "[object Window]" after 1 second
setTimeout(myArray.myMethod, 1.5 * 1000, "1") // prints "undefined" after 1.5 seconds
```

从执行栈及事件循环的角度理解 setTimeout this 绑定，当执行 setTimeout 时，会向延迟队列中注册一个延迟任务，当时间满足时被推入回调队列中，若当前 JS 引擎处于空闲状态，JS 事件循环(Event Loop)会将回调函数交给 JS 引擎，JS 引擎根据函数生成函数上下文执行栈，推入 JS 引擎的执行栈中，此时函数 this 若没有特殊绑定，则默认指向 window，其上下文执行栈 this 默认绑定 window。

### 嵌套 setTimeout 最小时间间隔

根据[HTML 标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)，setTimeout 如果被嵌套调度 5 次时，接下来的嵌套 setTimeout 浏览器需要保持最小 4ms 的时间间隔。

为什么这么设计？

可以这样想象，setTimeout 被连续调用，可能会使回调队列中充满了回调函数任务，从而引起 JS 引擎阻塞，加入最小时间间隔可以让主线程有时间执行其他任务。

### setInterval 的问题

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4da60a2c-5d01-4eef-9b92-b5fe671f5346/Untitled.png)

setInterval 设置的时间间隔是固定的，但若回调函数中的操作是耗时操作，则会造成主线程阻塞，而下一个回调任务可能会被跳过。

因此，我们会使用递归 setTimeout 模拟 setInterval，当然 setTimeout 也有最小的时间间隔，理论上 setTimeout 和 setInterval 都不能精准的做定时操作
