# 列表 & Key<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

## 渲染多个组件

可以通过使用 {} 在 JSX 内构建一个元素集合。

下面，我们使用 Javascript 中的 `map()` 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>`标签，最后我们将得到的数组赋值给 `listItems`:

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们把整个 `listItems` 插入到 `<ul>` 元素中，然后渲染进 DOM：

```js
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

---

## 基础列表组件

通常你需要在一个组件中渲染列表。

我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

?> 警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 key 属性

---

## key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

?> 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

?> 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题

<!-- todo -->

> [深入解析为什么 key 是必须的可以参考](https://react.docschina.org/docs/reconciliation.html#recursing-on-children)

---

## 用 key 提取组件

?> 元素的 key 只有放在就近的数组上下文中才有意义。

比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个`<ListItem />` 元素上，而不是放在 ListItem 组件中的 `<li>` 元素上。

**例子：不正确的使用 key 的方式**

```js
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**例子：正确的使用 key 的方式**

```js
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()}              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

?> 一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

---

## key 只是在兄弟节点之间必须唯一

- 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的
- 它们不需要是全局唯一的。
- 当我们生成两个不同的数组时，我们可以使用相同的 key 值

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

?> key 会传递信息给 React ，但不会传递给你的组件。

如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：

```js
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key。

---

## 在 JSX 中嵌入 map()

JSX 允许在大括号中嵌入任何表达式，所以我们可以内联`map()` 返回的结果：

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
