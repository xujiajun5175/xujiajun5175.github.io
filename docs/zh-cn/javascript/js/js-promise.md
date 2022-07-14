### JavaScript Promise对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### Promise接口

Promise接口的基本思想是，异步任务返回一个Promise对象。

Promise对象只有三种状态。

- 异步操作“未完成”（pending）
- 异步操作“已完成”（resolved，又称fulfilled）
- 异步操作“失败”（rejected）

这三种的状态的变化途径只有两种。

- 异步操作从“未完成”到“已完成”
- 异步操作从“未完成”到“失败”。

这种变化只能发生一次，一旦当前状态变为“已完成”或“失败”，就意味着不会再有新的状态变化了。因此，Promise对象的最终结果只有两种。

- 异步操作成功，Promise对象传回一个值，状态变为`resolved`。
- 异步操作失败，Promise对象抛出一个错误，状态变为`rejected`。

Promise对象使用`then`方法添加回调函数。`then`方法可以接受两个回调函数，第一个是异步操作成功时（变为`resolved`状态）时的回调函数，第二个是异步操作失败（变为`rejected`）时的回调函数（可以省略）。一旦状态改变，就调用相应的回调函数。

#### Promise对象的生成

ES6提供了原生的Promise构造函数，用来生成Promise实例。

```js
var promise = new Promise(function(resolve, reject) {
  // 异步操作的代码

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由JavaScript引擎提供，不用自己部署。

`resolve`函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从`Pending`变为`Resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

`reject`函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从`Pending`变为`Rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用`then`方法分别指定`Resolved`状态和`Reject`状态的回调函数

```js
po.then(function(value) {
  // success
}, function(value) {
  // failure
});
```

