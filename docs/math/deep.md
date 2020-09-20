# 深度优先遍历

有这样一个数据：
```js
const tree = {
	name: 'root',
	children: [
		{
			name: 'c1',
			children: [
				{
					name: 'c11',
					children: []        
					},
					{
					name: 'c12',
					children: []        
				}
			]
		},
		{
			name: 'c2',
			children: [
				{
					name: 'c21',
					children: []        
					},
					{
					name: 'c22',
					children: []        
				}
			]
		}
	]
}
```

需要依次打印**'root', 'c1', 'c11',  'c12', 'c2', 'c21', 'c22'**，这是很明显的深度优先的遍历算法

### 递归版

```js
function depthFirst(tree) {
  console.log(tree.name)

  const children = tree.children
  if(children && Array.isArray(children)) {
    for(let child of children) {
      depthFirst(child)
    }
  }
}
```

### 栈形式深度遍历

```js
function stackDeep(tree) {
  const stack = []

  stack.unshift(tree)
  while(stack.length) {
    const tree = stack.shift()
    const children = tree.children
    console.log(tree.name)

    let i = children.length
    while(i--) {
      stack.unshift(children[i])
    }
  }
}
```

这种避免爆栈的情况