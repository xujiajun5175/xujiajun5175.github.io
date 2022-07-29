# JSX<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

JSX，是一个 JavaScript 的语法扩展

JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式

## 为什么使用 JSX？

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合

React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中,来实现**关注点分离**

?> React 不强制要求使用 JSX

## 在 JSX 中嵌入表达式

在下面的例子中，我们声明了一个名为 name 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);

```

?> 建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱

## JSX 也是一个表达式

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## JSX 特定属性

你可以通过使用引号，来将属性值指定为字符串字面量：

```js
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```js
const element = <img src={user.avatarUrl}></img>;
```

?> 在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

!> 警告：<br>因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。<br>例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。

## 使用 JSX 指定子元素

假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

```js
const element = <img src={user.avatarUrl} />;
```

JSX 标签里能够包含很多子元素:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX 防止注入攻击
