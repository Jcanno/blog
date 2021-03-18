# 栈

栈遵循（后进先出）LIFO 的原则

提供以下功能:

- push 推送元素到栈顶
- pop 移除并返回栈顶元素
- peek 只是返回栈顶元素
- isEmpty 判断栈内是否为空
- size 返回栈内元素数量
- clear 清空栈所有元素

```js
class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }
}
```
