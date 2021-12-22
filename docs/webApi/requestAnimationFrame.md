### requestAnimationFrame 介绍

requestAnimationFrame 可以在浏览器重新绘制前执行回调方法，触发时机和浏览器刷新频率(帧 frame)相关，即每帧都会触发 requestAnimationFrame 回调，由于是浏览器重绘前的触发时机，通过在 requestAnimationFrame 回调中执行动画操作。

### 语法

`window.requestAnimationFrame(callback);`

### 特点

- 触发时机和设备刷新频率相关
- 为了节省电源，浏览器会在 tab 页签进入后台或隐藏时暂停触发`requestAnimationFrame`
- `requestAnimationFrame` 返回当前请求的 ID，可以通过 cancelAnimationFrame 取消下一帧`requestAnimationFrame` 的触发

### 与 setTimeout/setInterval 的区别

由于 setTimeout/setInterval 底层是将任务放到回调任务队列中，会受主线程当前执行任务的影响，因此触发时机不够精准，`requestAnimationFrame`可以跟随设备刷新频率进行固定回调逻辑，相对更加准确。当然，使用`requestAnimationFrame` 会面临设备刷新频率不同的问题，同时，在主线程被过渡占用的情况下，`requestAnimationFrame` 触发会变得不稳定。
