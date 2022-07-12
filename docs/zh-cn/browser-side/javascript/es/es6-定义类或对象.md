### 定义类或对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



**使用预定义对象只是面向对象语言的能力的一部分，它真正强大之处在于能够创建自己专用的类和对象。**

**ECMAScript 拥有很多创建对象或类的方法。**



#### 工厂方式

---

##### 工厂函数（factory function）

```js
function createCar() {
  var oTempCar = new Object;
  oTempCar.color = "blue";
  oTempCar.doors = 4;
  oTempCar.mpg = 25;
  oTempCar.showColor = function() {
    alert(this.color);
  };
  return oTempCar;
}

var oCar1 = createCar();
var oCar2 = createCar();
```



##### 为函数传递参数

我们还可以修改 createCar() 函数，给它传递各个属性的默认值，而不是简单地赋予属性默认值

```js
function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = function() {
    alert(this.color);
  };
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```



##### 在工厂函数外定义对象的方法

```js
function showColor() {
  alert(this.color);
}

function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = showColor;
  
  return oTempCar;
}

var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);

oCar1.showColor();		//输出 "red"
oCar2.showColor();		//输出 "blue"
```







#### 构造函数方式

---

创建构造函数就像创建工厂函数一样容易。

```js
function Car(sColor, iDoors, iMpg) {

    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.showColor = function() {
            alert(this.color);
        };
}

var oCar1 = new Car("red", 4, 23);
var oCar2 = new Car("blue", 3, 25);
```

下面为您解释上面的代码与工厂方式的差别:

- 首先在构造函数内没有创建对象，而是使用 this 关键字。
- 使用 new 运算符构造函数时，在执行第一行代码前先创建一个对象，只有用 this 才能访问该对象。
- 然后可以直接赋予 this 属性，默认情况下是构造函数的返回值（不必明确使用 return 运算符）。

用 new 运算符和类名 Car 创建对象，就更像 ECMAScript 中一般对象的创建方式了。





#### 原型方式

---

该方式利用了对象的 prototype 属性，可以把它看成创建新对象所依赖的原型。

这里，首先用空构造函数来设置类名。然后所有的属性和方法都被直接赋予 prototype 属性。我们重写了前面的例子，代码如下：

```js
function Car() {
}

Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();

```

此外，使用这种方式，还能用 instanceof 运算符检查给定变量指向的对象的类型。因此，下面的代码将输出 `true`：

```js
alert(oCar1 instanceof Car);	//输出 "true"
```





##### 原型方式的问题

使用原型方式，不能通过给构造函数传递参数来初始化属性的值,这意味着必须在对象创建后才能改变属性的默认值









#### 混合的构造函数/原型方式

---

联合使用构造函数和原型方式，就可像用其他程序设计语言一样创建对象。这种概念非常简单，即用构造函数定义对象的所有非函数属性，用原型方式定义对象的函数属性（方法）。结果是，所有函数都只创建一次，而每个对象都具有自己的对象属性实例。

```js
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
}

Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "Mike,John,Bill"
alert(oCar2.drivers);	//输出 "Mike,John"
```







#### 动态原型方法

---

动态原型方法的基本想法与混合的构造函数/原型方式相同，即在构造函数内定义非函数属性，而函数属性则利用原型属性定义

?> 唯一的区别是赋予对象方法的位置

```js
unction Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (
typeof Car._initialized == "undefined"
) {
    Car.prototype.showColor = function() {
      alert(this.color);
    };
	
    
Car._initialized = true;

  }
}
```







#### 混合工厂方式

---

这种方式通常是在不能应用前一种方式时的变通方法。

它的目的是创建假构造函数，只返回另一种对象的新实例。

这段代码看起来与工厂函数非常相似：

```js
function Car() {
  var oTempCar = new Object;
  oTempCar.color = "blue";
  oTempCar.doors = 4;
  oTempCar.mpg = 25;
  oTempCar.showColor = function() {
    alert(this.color);
  };

  return oTempCar;
}

var car = new Car();
```

!> 强烈建议：除非万不得已，还是避免使用这种方式。





#### 采用哪种方式

---

目前使用最广泛的是混合的构造函数/原型方式

此外，动态原始方法也很流行，在功能上与构造函数/原型方式等价