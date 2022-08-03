# state & 生命周期<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

参考前一章节中时钟的例子:

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);

```

---

## 将函数组件转换成 class 组件

通过以下五步将 Clock 的函数组件转成 class 组件：

1. 创建一个同名的 ES6 class，并且继承于 `React.Component`。
2. 添加一个空的 `render()` 方法。
3. 将函数体移动到 `render()`方法之中。
4. 在 `render()` 方法中使用 this.props 替换 `props`
5. 删除剩余的空函数声明。

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

?> 每次组件更新时 render 方法都会被调用

?> 只要在相同的 DOM 节点中渲染 <Clock /> ，就仅有一个 Clock 组件的 class 实例被创建使用

---

## 向 class 组件中添加局部的 state

- 我们通过以下三步将 date 从 props 移动到 state 中：

1. 把 `render()` 方法中的 `this.props.date` 替换成 `this.state.date` ：

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. 添加一个 **class 构造函数**，然后在该函数中为 `this.state` 赋初值：

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

通过以下方式将 `props` 传递到父类的构造函数中：

```js
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

?> Class 组件应该始终使用 props 参数来调用父类的构造函数。

3. 移除 `<Clock />` 元素中的 date 属性：

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

完整代码:

```js
function tick(){
  class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Clock />)
}

setInterval(tick, 1000);
```

> <https://codepen.io/gaearon/pen/KgQpJd?editors=0010>

---

## 将生命周期方法添加到 Class 中

?> 在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的

- 当 Clock 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。

- 当 DOM 中 Clock 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）

?> 我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法,这些方法叫做“生命周期方法”。

1. `componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行,所以，最好在这里设置计时器：

```js
 componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  ```

接下来把计时器的 ID 保存在 this 之中（`this.timerID`）。

尽管 `this.props` 和 `this.state` 是 React 本身设置的，且都拥有特殊的含义，但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。

2. `componentWillUnmount()` 生命周期方法中清除计时器

```js
 componentWillUnmount() {
    clearInterval(this.timerID);
  }
  ```

最后，我们会实现一个叫 `tick()` 的方法，Clock 组件每秒都会调用它。

使用 `this.setState()` 来时刻更新组件 state：

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

让我们来快速概括一下发生了什么和这些方法的调用顺序：

1. 当 `<Clock />` 被传给 `ReactDOM.render()` 的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 state。

2. 之后 React 会调用组件的 `render()` 方法。
这就是 React 确定该在页面上展示什么的方式。
然后 React 更新 DOM 来匹配 Clock 渲染的输出。

3. 当 Clock 的输出被插入到 DOM 中后，React 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法。

4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，Clock 组件会通过调用 `setState()` 来计划进行一次 UI 更新。
得益于 `setState()` 的调用，React 能够知道 state 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么。
这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。
React 也会相应的更新 DOM。

5. 一旦 Clock 组件从 DOM 中被移除，React 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了。

---

## 正确地使用 State

关于 `setState()` 你应该了解三件事：

### 不要直接修改 State

例如，此代码不会重新渲染组件：

```js
// Wrong
this.state.comment = 'Hello';
```

而是应该使用 `setState()`:

```js
// Correct
this.setState({comment: 'Hello'});
```

!> 构造函数是唯一可以给 `this.state` 赋值的地方

### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象

这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### State 的更新会被合并

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

例如，你的 state 包含几个独立的变量：

```js
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
  ```

  然后你可以分别调用 `setState()` 来单独地更新它们：

```js
 componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
  ```

这里的合并是浅合并，所以 `this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`。

---

## 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

?> 这就是为什么称 state 为局部的或是封装的的原因.除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这对于自定义组件同样适用：

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state，或是 Clock 的 props，还是手动输入的：

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[在 CodePen 上尝试](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

这通常会被叫做“自上而下”或是“单向”的数据流。

任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
