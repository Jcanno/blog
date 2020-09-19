# 理解JavaScript中的执行上下文及执行栈

### 什么上下文?

说到上下文，大家肯定对「请结合上下文理解这个词的含义」这句话不会陌生，笼统的讲上下文就是当前的环境，「同一个词」在不同上下文环境中会有不同的含义。编程的世界也是如此，如果你使用过Vue，那每一个Vue实例`vm`就可以看做是一个上下文，`vm`记录了当前`状态`、`模板`、`方法`、`父子组件实例`等所有的信息。

### 什么是执行上下文？

理解了上下文的含义，那执行上下文就是指**JavaScript代码运行时所处的环境**，这个环境记录了当前代码可以访问的所有信息比如参数、变量等。执行上下文还涉及到闭包、变量提升、作用域链等概念，可以说这是理解其他概念的基础。

### 执行上下文类型

在JavaScript中执行上下文的类型有三种:

- 全局执行上下文：在JavaScript程序中全局执行上下文有且只有一个，JavaScript程序运行时就会创建全局执行上下文，全局执行上下文会初始化`window`对象，`window`对象提供了`Math、Date`常用内置方法，创建全局执行上下文时还做了`this 绑定`的工作，在非严格模式下，全局执行上下文中的代码访问`this`实际就是`window对象`。

- 函数执行上下文：每次函数被调用时就会创建函数执行上下文，提供函数中代码执行的环境。

- eval函数执行上下文：eval函数也会创建自己的上下文，当然平时用的不多。

### 什么是执行栈？

执行栈就是来储存所有的执行上下文，是`先进后出`的栈结构

### 创建执行上下文

上面我们大概了解执行上下文相关概念，我们使用代码来解释执行上下文的创建过程。


```js
var a = 'hi'

function fn(arg) {
  var a = 'hello'

}

fn(a)
```

JS引擎在执行代码时会创建全局执行上下文，创建上下文主要做了这三件事：
1. 创建词法环境
2. 创建变量环境
3. this绑定

用伪代码表示:
```js
ExecutionContext = {
  This = <this value>,              // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = { ... },    // 变量环境
}
```

在例子中初始时创建的全局上下文就是这样：
```js
GlobalExecutionContext = {
  This = window,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      a: undefined
    },
    outer: null
  },                                
}
```

执行`fn`函数，则会创建函数上下文，同时将函数上下文压入执行栈的栈顶:
```js
FunctionExecutionContext = {
  This = global,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      Arguments: {0: 'hi', length: 1},
      a: undefined
    },
    outer: GlobalEnvironmentRecord
  },                                
}
```

### 执行上下文

上下文创建后，会执行该上下文中的逻辑，函数上下文里的变量a会被赋值：

```js
FunctionExecutionContext = {
  This = global,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      Arguments: {0: 'hi', length: 1},
      a: 'hello'
    },
    outer: GlobalEnvironmentRecord
  },                                
}
```

### 变量提升

用var命名的变量会存在变量提升的现象，这也是和执行上下文有关
```js
console.log(a)          // undefined
var a = 'hi'

function fn(arg) {
  var a = 'hello'

}

fn(a)
```
这里在命名a变量前访问a能输出undefined，这是在创建全局上下文是默认给a变量的初始值:

```js
GlobalExecutionContext = {
  This = window,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      a: undefined
    },
    outer: null
  },                                
}
```

因此`console.log(a)`访问的就是全局上下文中变量环境中的a变量，此时输出undefined，这就造成了变量提升现象

ES6加入了`let`、`const`来取消这不合常理的变量提升，从我们的实践知道提前访问let定义的变量会报错，那`let`、`const`又是如何结合上下文实现这功能，其实我们看到上下文中还有词法环境没有用到，它就是用来存放`let`、`const`定义的变量

```js
console.log(a)          // undefined
var a = 'hi'
let b = 'world'
function fn(arg) {
  var a = 'hello'

}

fn(a)
```

此时创建全局上下文为：

```js
GlobalExecutionContext = {
  This = window,                    // this 绑定值
  LexicalEnvironment = {            // 词法环境
    EnvironmentRecord: {
      b: uninitialized              // 未初始化
    },
  },     
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      a: undefined
    },
    outer: null
  },                                
}
```

此时变量b未初始化，访问b时就会出现`暂时性死区`

### 作用域链

上下文对象会保存外部环境的环境记录，供当前上下文对象访问，全局上下文外部环境为null，函数上下文外部环境为外部上下文的环境记录，由此就形成当前函数上下文环境记录->外部上下文环境记录->全局上下文环境记录的作用域链，函数在执行过程中就是按照作用域链一次查找变量。

### 闭包

执行上下文还跟闭包有关，从实践的角度来看，我总结闭包为`内部函数引用了外部函数的变量，并被外部函数返回，这被引用的变量就是闭包`。

```js

function outer() {
  var a = 1

  function inner() {
    return a++;
  }

  return inner
}

var inner = outer()
inner()              // 1
inner()              // 2
inner()              // 3
```

这里的函数上下文关系为:

```js
OuterFunctionExecutionContext = {
  This = global,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
      a: 1
    },
    outer: GlobalEnvironmentRecord
  },                                
}

InnerFunctionExecutionContext = {
  This = global,                    // this 绑定值
  LexicalEnvironment = { ... },     // 词法环境
  VariableEnvironment = {           // 变量环境
    EnvironmentRecord: {
    },
    outer: OuterFunctionEnvironmentRecord
  },                                
}
```

在执行完outer函数后，a变量应该被回收，但却被内部函数inner引用，inner函数又被outer返回，这就形成了闭包，inner在执行`a++`语句查找a变量就是在outer的环境记录里查找，此时outer环境记录已被销毁，因此a变量被存储到闭包中`Closure (outer){ a: 1 }`。

闭包使用场景：可以通过闭包来封装私有变量

