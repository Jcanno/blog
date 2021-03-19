# 链表

提供以下功能:

- push 链表尾部添加元素
- removeAt 根据下标移除链表元素
- getElementAt 获取到链表下标元素
- insert 插入元素到链表中
- indexOf 返回元素在链表中的下标
- remove 移除目标链表元素
- size 返回链表元素数量
- isEmpty 返回链表是否为空
- getHead 返回链表头部元素

```js
function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.head = null;
    this.count = 0;
  }

  push(element) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }

      current.next = node;
    }

    this.count++;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);

        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }

      return node;
    }

    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++;
      return true;
    }

    return false;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current !== null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }

      current = current.next;
    }

    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count() === 0;
  }

  getHead() {
    return this.head;
  }
}
```
