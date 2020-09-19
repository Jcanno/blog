# JavaScript中的原型

### 原型本质

原型本质是一个对象，在JavaScript中原型中的属性和方法被用作共享，更明确的说，原型是一个「描述一个类共性的属性和方法」的`对象`，同时也是继承的基础。

### 原型的获取

- 获取对象上原型
  1. 隐式获取
  ```js
    let a = {}
    console.log(a.__proto__)
  ```

  2. 显式获取
  ```js
    let a = {}
    console.log(Object.getPrototypeOf(a))
  ```
  对象上获取原型实际上获取的是该对象构造函数上的原型对象
  
  `__proto__`是历史原因的产物，原因在于各大浏览器在规范前实现了通过`__proto__`获取原型的功能，以至于ES2015不得不将`__proto__`纳入规范，现在我们可以直接获取或修改`__proto__`来操作原型对象，`__proto__`实际上还是在隐式的调用`Object.prototype`上的`__proto__`的`get、set`方法
- 获取函数原型

  ```js
    function A() {}
    console.log(A.prototype)
  ```
  函数A不仅有`__proto__`，还有`prototype`(原型属性)获取该函数的原型对象，原型对象上有一个`constructor`属性，指向原来的构造函数。
  描述不同类型的构造函数它的`prototype`类型也不同，例如`Object.prototype`为对象类型、`Array.prototype`为数组类型、`Function.prototype`为函数类型。

### 原型链

原型对象上它也有原型对象，`Object.prototype`的原型对象即`__proto__`为null。原型对象的嵌套行为就构成了原型链，对象在查找属性或方法时就是按照`自身属性->原型对象->...->null`原型链的方式查找。