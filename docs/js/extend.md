# JavaScript中的继承

JavaScript要实现继承，子类需要继承父类什么东西？要怎么继承？带着两个问题来看JavaScript中的继承

### 继承什么？

从类的角度看子类需要继承父类所有的属性和方法，那JavaScript中哪里保存着父类所有的共性的属性和方法呢？答案就在父类的`this`上。`this`保存的属性和方法又分为两类，一类是`自身的属性`，另一类是`原型链上的属性`，因此最终要继承的就是父类`自身的属性和方法`和`原型链上的属性和方法`

### 怎么继承？

ES5中总共有六种继承方式：

1. 原型链继承

```js
function Super() {
  this.name = 'Jacano'
  this.colors = ['red', 'yellow', 'blue']
}

Super.prototype.getName = function() {
  return this.name
}

function Sub() {
  this.age = 20
}

// new Super后的实例保存了父类自身的属性和原型链上的属性，因此符合我们的继承要求
Sub.prototype = new Super()
// 此时Sub.prototype.constructor还是指向Super, 要修复指向
Sub.prototype.constructor = Sub
```

缺点：
- 原型链继承实质是在共享父类实例，但父类存在引用属性如`colors`时，子类某个实例通过数组方法改变`colors`值时会改变子类全部实例的`colors`值
- 子类不同向父类传参


2. 构造函数继承

```js
function Super() {
  this.name = 'Jacano'
  this.colors = ['red', 'yellow', 'blue']
  this.getName = function() {
		return this.name;
	}
}

function Sub() {
  this.age = 20
  Super.call(this)
}
```

构造函数继承在每次子类实例化时通过`call`调用父类，从而避免引用属性被所有实例共享，同时子类还可以给父类传参

缺点：
- 继承的方法需要定义在父类构造函数里，每次实例化子类都要创建一遍父类方法

3. 组合继承

```js
function Super() {
  this.name = 'Jacano'
  this.colors = ['red', 'yellow', 'blue']
}

Super.prototype.getName = function() {
  return this.name
}

function Sub() {
  this.age = 20
  Super.call(this)
}

// 继承父类方法
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
```

组合继承的优势在于既能实现引用属性不会被子类实例共享，又能保证方法不会重复定义，可以说结合了原型链和构造函数继承的优点

4. 原型式继承

```js
function createSub(o) {
  function F(){}
  F.prototype = o
  return new F()
}
```

`createSub`其实是`Object.create()`的模拟实现，通过传入的父类原型构造出一个新对象给子类，这其实和原型链差不多，子类实例同样是在共享父类的原型


5. 寄生式继承

```js
function createSub(o) {
  function F(){}
  F.prototype = o
  const sub = new F()
  
  sub.getName = function() {
    return this.name
  }
  return sub
}
```

寄生式继承和构造函数继承相似，子类继承时都需要创建方法

6. 寄生组合继承

```js
function Super() {
  this.name = 'Jacano'
  this.colors = ['red', 'yellow', 'blue']
}

Super.prototype.getName = function() {
  return this.name
}

function Sub() {
  this.age = 20
  Super.call(this)
}

// 通过寄生式继承父类原型
Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub
```

组合继承的缺点是调用了两次父类构造函数，这就造成子类实例在`自身属性`和`原型`上都存在一样的属性，寄生组合继承主要通过寄生式继承继承了父类原型上的方法，通过构造函数来继承父类的自身属性


### ES6继承

ES6使用关键字`class`定义类，使用`extends`继承父类，使用`super`调用父类的构造函数

```js
class A {
  constructor() {
    this.name = 'jay'
  }
}

class B extends A{
  constructor() {
    super()
    this.name = 'jay'
  }
}
```

注意：使用class继承时必须要调用`super`来调用父类的构造方法

### ES6继承与ES5继承的区别

ES6中的子类是先生成父类的`this`，根据父类的`this`修饰返回这个`this`对象
ES5是先生成了父类和子类的`this`，然后通过子类调用父类的构造函数将父类属性和方法集成到子类`this`上
