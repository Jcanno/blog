# 双端队列

队列头部和尾部都可以插入和移除元素,同时遵循「先进先出」、「后进先出」原则

提供以下功能:

- addFront 队列头部添加元素
- addBack 队列尾部添加元素
- removeFront 移除队列头部元素并返回
- removeBack 移除队列尾部元素并返回
- peekFront 返回队列头部元素
- peekBack 返回队列尾部元素
- size 返回队列内元素数量
- isEmpty 返回队列是否为空

```js
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.count];
    delete this.items[this.count];
    this.count--;
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }
}
```
