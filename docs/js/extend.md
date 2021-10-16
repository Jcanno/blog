# JavaScript 中的继承

JavaScript 要实现继承，子类需要继承父类什么东西？要怎么继承？带着两个问题来看 JavaScript 中的继承

### 继承什么？

从类的角度看子类需要继承父类所有的属性和方法，那 JavaScript 中哪里保存着父类所有的共性的属性和方法呢？答案就在父类的`this`上。`this`保存的属性和方法又分为两类，一类是`自身的属性`，另一类是`原型链上的属性`，因此最终要继承的就是父类`自身的属性和方法`和`原型链上的属性和方法`

### 怎么继承？

ES5 中总共有六种继承方式：

1. 原型链继承

```js
function Super() {
  this.name = "Jacano"
  this.colors = ["red", "yellow", "blue"]
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
  this.name = "Jacano"
  this.colors = ["red", "yellow", "blue"]
  this.getName = function() {
    return this.name
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
  this.name = "Jacano"
  this.colors = ["red", "yellow", "blue"]
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
  function F() {}
  F.prototype = o
  return new F()
}
```

`createSub`其实是`Object.create()`的模拟实现，通过传入的父类原型构造出一个新对象给子类，这其实和原型链差不多，子类实例同样是在共享父类的原型

5. 寄生式继承

```js
function createSub(o) {
  function F() {}
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
  this.name = "Jacano"
  this.colors = ["red", "yellow", "blue"]
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

### ES6 继承

ES6 使用关键字`class`定义类，使用`extends`继承父类，使用`super`调用父类的构造函数

```js
class A {
  constructor() {
    this.name = "jay"
  }
}

class B extends A {
  constructor() {
    super()
    this.name = "jay"
  }
}
```

注意：使用 class 继承时必须要调用`super`来调用父类的构造方法

可以看下[Babel](https://babeljs.io/repl#?browsers=&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYGwhgzhAEDKCuAHApgJ2gbwFAEhgHsA7CAF1XmBP1QAoBKTLaZlkgCwEsIA6QsAW2TQAvNADkARgBMAZjFMWAXyzKsoSDAQAjaMgAeJZIQAmmpGmx4ipcpWr1GLFhHO06Cp-y68BQ0ZNl5J2VFIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=true&timeTravel=true&sourceType=module&lineWrap=true&presets=env&prettier=true&targets=&version=7.15.8&externalPlugins=&assumptions=%7B%7D)如何处理 class 的继承。

```js
"use strict"

function _typeof(obj) {
  "@babel/helpers - typeof"
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj
    }
  }
  return _typeof(obj)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function")
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    )
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return self
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === "function") return true
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    )
    return true
  } catch (e) {
    return false
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var Super = function Super() {
  _classCallCheck(this, Super)

  this.name = "123"
}

var Sub = /*#__PURE__*/ (function(_Super) {
  _inherits(Sub, _Super)

  var _super = _createSuper(Sub)

  function Sub() {
    var _this

    _classCallCheck(this, Sub)

    _this = _super.call(this)
    _this.name = "123"
    return _this
  }

  return Sub
})(Super)
```

在`_inherits`方法中，class 同样是通过`Object.create`实现子类原型继承父类的原型，调用`_createSuper`生成内部的创建 this 的函数，每当实例化子类构造函数时，Sub 会调用`_super`函数，内部则是对 Super 构造函数的调用。

### ES6 继承与 ES5 继承的区别

ES6 class 中的子类在构造函数中如果要使用 this，则必须先要调用`super`关键字来调用父类的构造函数，实际上这与 ES5 中`Parent.apply(this, args)`相似，但 ES5 子类构造函数中的 this 并不需要调用父类构造函数生成，这一点是 ES5 不能模拟的。换句话说：

ES6 子类构造函数要使用`this`，必须要调用`super`，子类的`this`是`super`继承而来

ES5 子类构造函数中的`this`本身就存在，而是通过集成将父类属性整合到子类`this`上
