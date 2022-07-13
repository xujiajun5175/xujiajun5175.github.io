### 对象作用域 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



**作用域指的是变量的适用范围。**



#### 公用、私有和受保护作用域

---

##### ECMAScript 只有公用作用域

对 ECMAScript 讨论上面这些作用域几乎毫无意义，因为 ECMAScript 中只存在一种作用域 - 公用作用域。

ECMAScript 中的所有对象的所有属性和方法都是公用的。

因此，定义自己的类和对象时，必须格外小心。

!> 记住，所有属性和方法默认都是公用的！

##### 建议性的解决方法

许多开发者都在网上提出了有效的属性作用域模式，解决了 ECMAScript 的这种问题。

由于缺少私有作用域，开发者确定了一个规约，说明哪些属性和方法应该被看做私有的。这种规约规定在属性前后加下划线：

```
obj._color_ = "blue";
```

这段代码中，属性 color 是私有的。

!> 注意，下划线并不改变属性是公用属性的事实，它只是告诉其他开发者，应该把该属性看作私有的。

有些开发者还喜欢用单下划线说明私有成员，例如：obj._color。





#### 静态作用域

---

静态作用域定义的属性和方法任何时候都能从同一位置访问。



##### ECMAScript 没有静态作用域

?> 严格来说，ECMAScript 并没有静态作用域。

不过，它可以给构造函数提供属性和方法。还记得吗，构造函数只是函数。函数是对象，对象可以有属性和方法。例如：

```js
function sayHello() {
  alert("hello");
}

sayHello.alternate = function() {
  alert("hi");
}

sayHello();		//输出 "hello"
sayHello.alternate();	//输出 "hi"
```

这里，方法 alternate() 实际上是函数 sayHello 的方法。可以像调用常规函数一样调用 sayHello() 输出 "hello"，也可以调用 sayHello.alternate() 输出 "hi"。即使如此，alternate() 也是 sayHello() 公用作用域中的方法，而不是静态方法。







#### 关键字 this

---

##### this 的功能

?> 关键字 `this` 总是指向调用该方法的对象



##### 使用 this 的原因

使用 this，即可在任何多个地方重用同一个函数



