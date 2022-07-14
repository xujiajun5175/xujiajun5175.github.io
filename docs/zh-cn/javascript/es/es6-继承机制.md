### 修改对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



#### 继承机制的实现

---

要用 ECMAScript 实现继承机制，您可以从要继承的基类入手。

所有开发者定义的类都可作为基类

!> 出于安全原因，本地类和宿主类不能作为基类，这样可以防止公用访问编译过的浏览器级的代码，因为这些代码可以被用于恶意攻击。

尽管 ECMAScript 并没有像其他语言那样严格地定义抽象类，但有时它的确会创建一些不允许使用的类。通常，我们称这种类为抽象类。



创建的子类将继承超类的所有属性和方法，包括构造函数及方法的实现。

所有属性和方法都是公用的，因此子类可直接访问这些方法。子类还可添加超类中没有的新属性和方法，也可以覆盖超类的属性和方法。





#### 继承的方式

---

##### 对象冒充

其原理如下：构造函数使用 this 关键字给所有属性和方法赋值（即采用类声明的构造函数方式）。

```js
function ClassA(sColor) {
    this.color = sColor;
    this.sayColor = function () {
        alert(this.color);
    };
}

function ClassB(sColor) {
    this.newMethod = ClassA;
    this.newMethod(sColor);
    delete this.newMethod;
}
```

所有新属性和新方法都必须在删除了新方法的代码行后定义。否则，可能会覆盖超类的相关属性和方法：

```js
function ClassB(sColor, sName) {
    this.newMethod = ClassA;
    this.newMethod(sColor);
    delete this.newMethod;

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
```

```js
var objA = new ClassA("blue");
var objB = new ClassB("red", "John");
objA.sayColor();	//输出 "blue"
objB.sayColor();	//输出 "red"
objB.sayName();		//输出 "John"
```



##### 对象冒充可以实现多重继承

有趣的是，对象冒充可以支持多重继承。也就是说，一个类可以继承多个超类。用 UML 表示的多重继承机制如下图所示：

![继承机制 UML 图示实例](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/IPRcDc000201609211757355298.gif)

例如，如果存在两个类 ClassX 和 ClassY，ClassZ 想继承这两个类，可以使用下面的代码：

```js
function ClassZ() {
    this.newMethod = ClassX;
    this.newMethod();
    delete this.newMethod;

    this.newMethod = ClassY;
    this.newMethod();
    delete this.newMethod;
}
```

这里存在一个弊端，如果存在两个类 ClassX 和 ClassY 具有同名的属性或方法，ClassY 具有高优先级。因为它从后面的类继承。





##### call() 方法

call() 方法是与经典的对象冒充方法最相似的方法。

它的第一个参数用作 this 的对象

其他参数都直接传递给函数自身

```js
function sayColor(sPrefix,sSuffix) {
    alert(sPrefix + this.color + sSuffix);
};

var obj = new Object();
obj.color = "blue";

sayColor.call(obj, "The color is ", " a very nice color indeed.");
```

要与继承机制的对象冒充方法一起使用该方法，只需将前三行的赋值、调用和删除代码替换即可

```js
function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(sColor);
    //delete this.newMethod;
    ClassA.call(this, sColor);

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
```

这里，我们需要让 ClassA 中的关键字 this 等于新创建的 ClassB 对象，因此 this 是第一个参数。第二个参数 sColor 对两个类来说都是唯一的参数。





##### apply() 方法

apply() 方法有两个参数，用作 this 的对象和要传递给函数的参数的数组。例如：

```js
function sayColor(sPrefix,sSuffix) {
    alert(sPrefix + this.color + sSuffix);
};

var obj = new Object();
obj.color = "blue";

sayColor.apply(obj, new Array("The color is ", "a very nice color indeed."));
```

```js
function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(color);
    //delete this.newMethod;
    ClassA.apply(this, new Array(sColor));

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
```

可以把 ClassB 的整个 arguments 对象作为第二个参数传递给 apply() 方法：

```js
function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(color);
    //delete this.newMethod;
    ClassA.apply(this, arguments);

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}
```

?> 只有超类中的参数顺序与子类中的参数顺序完全一致时才可以传递参数对象。如果不是，就必须创建一个单独的数组，按照正确的顺序放置参数。此外，还可使用 call() 方法。







##### 原型链（prototype chaining）

继承这种形式在 ECMAScript 中原本是用于原型链的。

```js
function ClassA() {
}

ClassA.prototype.color = "blue";
ClassA.prototype.sayColor = function () {
    alert(this.color);
};

function ClassB() {
}

ClassB.prototype = new ClassA();


ClassB.prototype.name = "";
ClassB.prototype.sayName = function () {
    alert(this.name);
};

var objA = new ClassA();
var objB = new ClassB();
objA.color = "blue";
objB.color = "red";
objB.name = "John";
objA.sayColor();
objB.sayColor();
objB.sayName();

```

!> 注意：调用 ClassA 的构造函数，没有给它传递参数。这在原型链中是标准做法。要确保构造函数没有任何参数。

此外，在原型链中，instanceof 运算符的运行方式也很独特。对 ClassB 的所有实例，instanceof 为 ClassA 和 ClassB 都返回 true。例如：

```js
var objB = new ClassB();
alert(objB instanceof ClassA);	//输出 "true"
alert(objB instanceof ClassB);	//输出 "true"
```

在 ECMAScript 的弱类型世界中，这是极其有用的工具，不过使用对象冒充时不能使用它。

!> 原型链的弊端是不支持多重继承。记住，原型链会用另一类型的对象重写类的 prototype 属性。





##### 混合方式

这种继承方式使用构造函数定义类，并非使用任何原型

```js
function ClassA(sColor){
    this.color = sColor;
}


ClassA.prototype.sayColor = function(){
    console.log(this.color)
}

function ClassB(sColor,sName){
    ClassA.call(this,sColor);
    this.name = sName;
}

ClassB.prototype = new ClassA();


ClassB.prototype.sayName = function(){
    console.log(this.name)
} 



var obja = new ClassA("blue")
var objb = new ClassB("red","john")


obja.sayColor();	//输出 "blue"
objb.sayColor();	//输出 "red"
objb.sayName();	//输出 "John"


console.log(obja instanceof ClassB)
console.log(objb instanceof ClassA)
```

