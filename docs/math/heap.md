# 二叉堆

二叉堆可分为大顶堆和小顶堆，顶点为最大值为大顶堆，顶点为最小值为小顶堆。
堆排序需要构建一个大顶堆(或小顶堆)，之后依次对节点进行排序

```js
function shiftUp(A, i, length) {
  let temp = A[i] // 当前父节点
  // j<length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = A[i] // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
    if (j + 1 < length && A[j] < A[j + 1]) {
      j++ // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < A[j]) {
      swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
      i = j // 交换后，temp 的下标变为 j
    } else {
      break
    }
  }
}

// 堆排序
function heapSort(A) {
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
    shiftUp(A, i, A.length)
  }
  // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(A.length - 1); i > 0; i--) {
    swap(A, 0, i) // 根节点与最后一个节点交换
    shiftUp(A, 0, i) // 从根节点开始调整，并且最后一个结点已经为当
    // 前最大值，不需要再参与比较，所以第三个参数
    // 为 i，即比较到最后一个结点前一个即可
  }
}
```
