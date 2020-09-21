# Promise

### Promise解决了什么？

在Promise未出现之前，我们处理异步任务都是使用回调函数来处理异步任务结果，但回调函数嵌套太多则会造成代码层级多，不易读，也就是**回调地狱**问题

```js
fs.readFile('file1', (err, data) => {
  if (err) throw err;
  console.log(data);

  fs.readFile('file2', (err, data) => {
    if (err) throw err;
    console.log(data);

    fs.readFile('file3', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  });
});
```

那使用Promise会是怎样？

```js
fs.readFile('file1')
  .then(data => {
    console.log(data);
    return fs.readFile('file2')
  }, err => {
    throw err;
  }).then(data => {
    console.log(data);
    return fs.readFile('file3')
  }, err => {
    throw err;
  }).then(data => {
    console.log(data);
  }, err => {
    throw err;
  })
});
```

`Promise`使用**回调延迟绑定**的方式来处理异步任务的结果，这就让我们写出易读的异步代码

### 什么时机处理异步结果(执行then方法)

JS引擎在碰到异步任务后会将该任务交给异步线程处理，等异步线程处理完成后会将任务结果放置在任务队列中，JS引擎在当前宏任务处理完成后取出队列中的首个任务处理，依次执行形成事件循环

1. 同步执行回调
2. 异步执行回调，把任务放到宏任务队列最后一个
3. 异步执行回调，把任务放到当前宏任务的末尾
   
若是第一种，则会将优先处理回调任务，若异步任务耗时长，则造成当前JS代码执行阻塞
若是第二种，任务队列中宏任务数量多，则回调任务的结果会有延迟

Promise使用第三种方式，同时引入了微任务，让回调执行的时机放在了每个宏任务的结尾

### 实现一个promise

#### promise构造函数

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(execute) {
  const self = this;
  self.status = PENDING;
  self.value = null;
  self.error = null;
  self.fulfillCallbacks = [];
  self.rejectCallbacks = [];
  
  // 改变状态，遍历所有reslove回调
  const resolve = value => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.fulfillCallbacks.forEach(cb => cb(value));
    });
  }

  // 改变状态，遍历所有reject回调
  const reject = error => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.rejectCallbacks.forEach(cb => cb(error));
    });
  }

  execute(resolve, reject);
}
```

- Promise接收一个构造器函数，构造器函数又接收两个参数：resolve和reject函数
- Promise有三种状态，状态一经改变不能更改
- Promise构造函数持有当前任务的返回值和错误信息
- Promise同时还持有成功和失败的回调函数数组，这里为数组是因为then方法可以被多次调用，当任务完成时，要遍历数组里所有回调改变状态并赋值，这就提供了延迟绑定回调功能

#### 实现`then`方法:

```js
MyPromise.prototype.then = function(fulfilled, rejected) {
  // 检查传入的参数
  fulfilled = typeof fulfilled === 'function' ? fulfilled : (value) => value;
  rejected = typeof rejected === 'function' ? rejected : (error) => {throw error};

  let self = this;
  if(self.status === PENDING) {
    // 要返回一个promise
    return new MyPromise((resolve, reject) => {
      self.fulfillCallbacks.push(value => {
        try {
          const x = fulfilled(value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
      self.rejectCallbacks.push(error => {
        try {
          const x = rejected(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if(self.status === FULFILLED) {
    return new MyPromise((resolve, reject) => {
      try {
        // 状态变为成功，会有相应的 self.value
        let x = fulfilled(self.value);
        // 拆解x
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (e) {
        reject(e);
      }
    })
  }
  if(self.status === REJECTED) {
    return new MyPromise((resolve, reject) => {
      try {
        // 状态变为成功，会有相应的 self.error
        let x = rejected(self.error);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (e) {
        reject(e);
      }
    })
  }
}
```

- then方法中参数是期待传入函数的，因此传入的不是函数，则原样的将上次的结果传给下一个then，也就是`值透传`
- then方法实际上是返回一个promise
- 在pending状态下，将处理推入到回调数组中，等待异步任务resolve，状态改为resolve后会执行回调逻辑，主要是执行then方法的函数参数，同时可能会返回一个promise，我们还需要拆解这个promise
- fulfilled和rejected状态直接执行相应的then函数参数和拆解promise返回值即可，promise保存了异步任务的结果

#### 实现catch

```js
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}
```

`catch`就是then的语法糖

#### 实现Promise.resolve和Promise.reject

这是prosmise上的静态方法:

```js
MyPromise.resolve = (param) => {
  if(param instanceof MyPromise) return param;
  return new MyPromise((resolve, reject) => {
    resolve(param);
  })
}

MyPromise.reject = function (error) {
  return new MyPromise((resolve, reject) => {
    reject(error);
  });
}
```

- `resolve`和`reject`方法就是返回一个promise，然后执行相应的`resolve`或`reject`逻辑

#### 实现Promise.finnaly

```js
MyPromise.prototype.finally = function(callback) {
  return this.then(value => {
    return MyPromise.resolve(callback()).then(() => value);
  }, error => {
    return MyPromise.resolve(callback()).then(() => {throw error;})
  })
}
```

- `finnaly`无论怎样都要执行回调，同时将上次then的结果传递给下个then方法

#### 实现Promise.all

```js
MyPromise.all = function(promiseArr) {
  let index = 0
  let result = []
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        val => {
          index++
          result[i] = val
          if(index === promiseArr.length) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
    })
  })
}
```

- all方法返回一个promise，遍历promise数组，通过下标来维护已完成的长度，并在每个promise完成时放入到对应下标的结果数组中，当下标和长度相等时则resolve外层的promise


#### 实现Promise.race

```js
MyPromise.race = function(promiseArr) {
  return new MyPromise((resolve, reject) => {
    //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
    for (let p of promiseArr) {
      MyPromise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
        value => {
          resolve(value)        //注意这个resolve是上边new MyPromise的
        },
        err => {
          reject(err)
        }
      )
    }
  })
}
```

- race方法返回一个promise，同时执行每个promise，当第一个promise完成时resolve外层promise，当然其余任务也还是在执行