# 斐波那契数列

### 递归版斐波那契数列

```js
function fibonaic(n) {
	if(n <= 2) return 1

	return fibonaic(n - 1) + fibonaic(n - 2)
}
```

### 尾递归版斐波那契数列

```js
function fibonaic(n, last = 1, res = 1) {
	if (n <= 2) return res;
  
  return fibonaic(n - 1, res, last + res)
}
```

优化了递归版n数值较大时容易爆栈并且运算较慢的问题