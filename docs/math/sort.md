# 常见排序算法

### 冒泡排序

思路：越大的数往后排，相当于鱼水中吐泡泡，泡泡越来越大。外层循环控制已完成排序的数的个数，内层循环进行冒泡排序操作。

```js
function bubbleSort(arr) {
  const len = arr.length

  for(let i = 0; i < len; i++) {
    let flag = true
    for(let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j + 1]) {
        flag = false
        const temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
    if(flag) break
  }

  return arr
}
```

### 插入排序

思路：外层循环控制已完成排序的下标，内层循环依次向前对比，当前循环数越小，越往前插入

```js
function insertSort(arr) {
  const len = arr.length

  for(let i = 1; i < len; i++) {
    const temp = arr[i]
    let j = i
    while(j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }

    arr[j] = temp
  }

  return arr
}
```

### 选择排序

思路：外层循环控制已完成排序的下标，内层循环找到未排序中的最小数的下标，往前插入

```js
function selectSort(arr) {
  const len = arr.length

  for(let i = 0; i < len; i++) {
    let minIndex = i
    
    for(let j = i + 1; j < len; j++) {
      if(arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }

    if(minIndex !== i) {
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
  }

  return arr
}
```


### 快速排序

思路：以中间下标数为基准二分数组进行排序，递归二分排序直到数组长度最小为一，再重新整合成原数组长度

```js
function quickSort(arr) {
  if(arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const midItem = arr.splice(mid, 1)[0]
  const left = []
  const right = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > midItem) {
      right.push(arr[i])
    }else {
      left.push(arr[i])
    }
  }

  return quickSort(left).concat(midItem, quickSort(right))
}
```

### 归并排序

思路：和快速排序类似，二分数组，通过merge将最小长度数组整合起来

```js
function mergeSort(arr) {
  if(arr.length <= 1) {
    return arr
  }
  
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let ir = 0
  let il = 0
  const result = []

  while(ir < right.length && il < left.length) {
    if(left[il] > right[ir]) {
      result.push(right[ir++])
    }else {
      result.push(left[il++])
    }
  }

  while(ir < right.length) {
    result.push(right[ir++])
  }

   while(il < left.length) {
    result.push(left[il++])
  }

  return result
}
```