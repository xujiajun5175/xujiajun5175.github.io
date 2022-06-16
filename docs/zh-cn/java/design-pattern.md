### Java 设计模式 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

简单记录 Java 中 23 种设计模式的应用

#### 1.创建型模式

##### 1.1.简单工厂模式

简单工厂模式严格意义上来说，并不属于设计模式中的一种，不过这里还是简单记录下。

- 定义：由一个工厂对象决定创建出哪一种类型实例。客户端只需传入工厂类的参数，无心关心创建过程。
- 优点：具体产品从客户端代码中抽离出来，解耦。
- 缺点：工厂类职责过重，增加新的类型时，得修改工程类得代码，违背开闭原则。

**举例**

```java
package com.xujiajun.creation.factory;


public abstract class Fruit {
    public abstract void eat();
}

class Apple extends Fruit {
    @Override
    public void eat() {
        System.out.println("eat apple");
    }
}

class FruitFactory {
    Fruit produce(String name) {
        if ("apple".equals(name)) {
            return new Apple();
        } else {
            return null;
        }
    }
}


class Application {
    public static void main(String[] args) {
        FruitFactory factory = new FruitFactory();
        Fruit fruit = factory.produce("apple");
        fruit.eat();
    }
}
```

**输出**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/H56Sn7.png)

可以看到，客户端 Application 并未依赖具体的水果类型，只关心 FruitFactory 的入参，这就是客户端和具体产品解耦的体现，

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/eI4maK.png)

##### 1.2.工厂方法模式

为了解决简单工厂模式的缺点，诞生了工厂方法模式（Factory method pattern）。

- 定义：定义创建对象的接口，让实现这个接口的类来决定实例化哪个类，工厂方法让类的实例化推迟到了子类进行。
- 优点:
  - 具体产品从客户端代码中抽离出来，解耦。
  - 加入新的类型时，只需添加新的工厂方法（无需修改旧的工厂方法代码），符合开闭原则。
- 缺点：类的个数容易过多，增加复杂度。

**举例**

```java
package com.xujiajun.creation.factorymethod;

public abstract class Fruit {
    public abstract void eat();
}

//新建FruitFactory抽象工厂，定义produceFruit抽象方法：
abstract class FruitFactory {
    abstract Fruit produce();
}

//新建Fruit的实现类，Apple：
class Apple extends Fruit {

    @Override
    public void eat() {
        System.out.println("eat apple");
    }
}

//新建FruitFactory的实现类，用于生产具体类型的水果 —— 苹果：
class AppleFactory extends FruitFactory {

    @Override
    Fruit produce() {
        return new Apple();
    }

}


class Application {
    public static void main(String[] args) {
        AppleFactory appleFactory = new AppleFactory();
        Fruit produce = appleFactory.produce();
        produce.eat();
    }
}
```

**结果**
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/xtWOcy.png)

?> 现在要新增 Banana 类型的水果，只需要新增 Banana 类型的工厂类即可，无需修改现有的 AppleFruitFactory 代码，符合开闭原则。

!> 但是这种模式的缺点也显而易见，就是类的个数容易过多，增加复杂度。

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/wwzVVI.png)

##### 1.3.抽象工厂模式

抽象工厂模式（Abstract factory pattern）提供了一系列相关或者相互依赖的对象的接口，关键字是“一系列”。

- 优点：

  1. 具体产品从客户端代码中抽离出来，解耦。
  2. 将一个系列的产品族统一到一起创建。

- 缺点：拓展新的功能困难，需要修改抽象工厂的接口；

?> 综上所述，抽象工厂模式适合那些功能相对固定的产品族的创建。

**举例**

```java
package com.xujiajun.creation.abstractfactory;

//新建水果抽象类Fruit
public abstract class Fruit {
    public abstract void buy();
}

//新建价格抽象类Price
abstract class Price {
    abstract void pay();
}


//新建水果创建工厂接口FruitFactory，包含获取水果和价格抽象方法（产品族的体现是，一组产品包含水果和对应的价格）
interface FruitFactory {
    Fruit getFruit();

    Price getPrice();
}

//接下来开始创建具体产品族
class AppleFruit extends Fruit {


    @Override
    public void buy() {
        System.out.println("购买苹果");
    }
}

//对应的苹果价格实现ApplePrice
class ApplePrice extends Price {

    @Override
    void pay() {
        System.out.println("苹果:单价2元");
    }
}

//实现水果工厂接口
class AppleFruitFactory implements FruitFactory {

    @Override
    public Fruit getFruit() {
        return new AppleFruit();
    }

    @Override
    public Price getPrice() {
        return new ApplePrice();
    }
}

class Application {
    public static void main(String[] args) {
        AppleFruitFactory appleFruitFactory = new AppleFruitFactory();
        appleFruitFactory.getFruit().buy();
        appleFruitFactory.getPrice().pay();

    }
}
```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/KGgVJn.png)

?> 客户端只需要通过创建 AppleFruitFactory 就可以获得苹果这个产品族的所有内容，包括苹果对象，苹果价格。要新建 🍌 的产品族，只需要实现 FruitFactory、Price 和 Fruit 接口即可。

!> 这种模式的缺点和工厂方法差不多，就是类的个数容易过多，增加复杂度。

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/efwVMS.png)

##### 1.4.建造者模式

建造者模式也称为生成器模式（Builder Pattern），将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。

简单来说就是，相同的过程可以创建不同的产品。

适用于：

1. 一个对象有非常复杂的内部结构（很多属性）
2. 想将复杂对象的创建和使用分离。

- 优点：
  - 封装性好，创建和使用分离
  - 拓展性好，建造类之间独立，一定程度上解耦。
- 缺点：
  - 产生多余的 Builder 对象；
  - 产品内部发生变化，建造者需要更改，成本较大。

<!-- tabs:start -->

###### **举例 1**

```java
package com.xujiajun.creation.builder;

import lombok.Data;
import lombok.ToString;

/**
 * 商铺类Shop，包含名称，地点和类型属性
 */
@Data
public class Shop {
    private String name;
    private String location;
    private String type;

}


/**
 * Shop抽象生成器ShopBuilder
 * 包含和Shop相同的属性及对应的抽象构建方法。
 */
abstract class ShopBuilder {
    private String name;
    private String location;
    private String type;

    abstract void name(String name);

    abstract void location(String location);

    abstract void type(String type);

    abstract Shop build();
}

/**
 * 创建ShopBuilder的实现，水果店构造器FruitShopBuilder
 */
class FruitShopBuilder extends ShopBuilder {

    private Shop shop = new Shop();

    @Override
    void name(String name) {
        this.shop.setName(name);
    }

    @Override
    void location(String location) {
        this.shop.setLocation(location);
    }

    @Override
    void type(String type) {
        this.shop.setType(type);
    }

    @Override
    Shop build() {
        return shop;
    }
}


/**
 * 经销商类Dealer，用于通过ShopBuilder构建具体的商店
 */
class Dealer {
    private ShopBuilder builder;

    void setBuilder(ShopBuilder builder) {
        this.builder = builder;
    }

    Shop build(String name, String location, String type) {
        this.builder.name(name);
        this.builder.location(location);
        this.builder.type(type);
        return builder.build();
    }
}


class Application {
    public static void main(String[] args) {
        FruitShopBuilder builder = new FruitShopBuilder();
        Dealer dealer = new Dealer();
        dealer.setBuilder(builder);

        Shop shop = dealer.build("xxx水果店", "xxx地址", "高级水果,好吃不贵");
        System.out.println(shop);
    }
}


```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Xl32qZ.png)

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/ASt7iw.png)

###### **举例 2**

```java
package com.xujiajun.creation.builder;


import lombok.Data;


@Data
public class Shop2 {
    private String name;
    private String location;
    private String type;


    public Shop2(Shop2Builder builder) {
        this.name = builder.name;
        this.location = builder.location;
        this.type = builder.type;
    }

    public static class Shop2Builder {
        private String name;
        private String location;
        private String type;

        public Shop2Builder name(String name) {
            this.name = name;
            return this;
        }

        public Shop2Builder location(String location) {
            this.location = location;
            return this;
        }


        public Shop2Builder type(String type) {
            this.type = type;
            return this;
        }

        public Shop2 build() {
            return new Shop2(this);
        }
    }
}


class Application2 {
    public static void main(String[] args) {
        Shop2 shop = new Shop2.Shop2Builder()
                .name("xx水果店")
                .location("xxx地址")
                .type("水果经营")
                .build();
        System.out.println(shop);
    }
}

```

?> 这种用法和 Lombok 的@Builder 注解效果是一样的

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/GRKJW8.png)

<!-- tabs:end -->

##### 1.5.单例模式

单例模式目的是为了一个类只有一个实例。

- 优点：
  - 内存中只有一个实例，减少了内存开销；
  - 可以避免对资源的多重占用；
  - 设置全局访问点，严格控制访问。
- 缺点：
  - 没有接口，拓展困难。

<!-- tabs:start -->

###### **懒汉模式**

!> 懒汉模式下的单例写法是最简单的，但它是线程不安全的：

```java
package com.xujiajun.creation.singleton;

public class LazySingleton {
    private static LazySingleton lazySingleton = null;

    private LazySingleton() {
    }

    public static LazySingleton getInstance() {
        if (lazySingleton == null) {
            lazySingleton = new LazySingleton();
        }
        return lazySingleton;
    }
}

```

?> 可加同步锁解决线程安全问题：

```java
public class LazySingleton {
    private static LazySingleton lazySingleton = null;

    private LazySingleton() {
    }

    public static LazySingleton getInstance() {
        synchronized (LazySingleton.class) {
            if (lazySingleton == null) {
                lazySingleton = new LazySingleton();
            }
        }
        return lazySingleton;
    }
}
```

!> 但是同步锁锁的是整个类，比较消耗资源，并且即使运行内存中已经存在 LazySingleton，调用其`getInstance`还是会上锁，所以这种写法也不是很好。<br>参考"双重同步锁单例模式"

###### **双重同步锁单例模式**

```java
package com.xujiajun.creation.singleton;

public class LazyDoubleCheckSingleton {
    private static LazyDoubleCheckSingleton instance = null;

    private LazyDoubleCheckSingleton() {
    }

    public static LazyDoubleCheckSingleton getInstance() {
        if (instance == null) {
            synchronized (LazyDoubleCheckSingleton.class) {
                if (instance == null) {
                    instance = new LazyDoubleCheckSingleton();
                }
            }
        }
        return instance;
    }

}

```

!> 上面例子虽然加了同步锁，但它还是线程不安全的。虽然上面的例子不会出现多次初始化 LazyDoubleCheckSingleton 实例的情况，但是由于指令重排的原因，某些线程可能会获取到空对象，后续对该对象的操作将触发空指针异常。

?> 要修复这个问题，只需要阻止指令重排即可，所以可以给 instance 属性加上 volatile 关键字：

```java
package com.xujiajun.creation.singleton;

public class LazyDoubleCheckSingleton {
    private volatile static LazyDoubleCheckSingleton instance = null;

    private LazyDoubleCheckSingleton() {
    }

    public static LazyDoubleCheckSingleton getInstance() {
        if (instance == null) {
            synchronized (LazyDoubleCheckSingleton.class) {
                if (instance == null) {
                    instance = new LazyDoubleCheckSingleton();
                }
            }
        }
        return instance;
    }

}

```

?> 上面这种写法是不但确保了线程安全，并且当 LazyDoubleCheckSingleton 实例创建好后，后续再调用其 getInstance 方法不会上锁。

###### **静态内部类单例模式**

```java
package com.xujiajun.creation.singleton;

import lombok.NoArgsConstructor;

/**
 * @author xujiajun
 * @date 2022/6/7
 * @apiNote
 */
@NoArgsConstructor
public class StaticInnerClassSingleton {
    private static class InnerClass {
        private static StaticInnerClassSingleton instance = new StaticInnerClassSingleton();
    }

    public static StaticInnerClassSingleton getInstance() {
        return InnerClass.instance;
    }

}

```

为什么这个例子是可行的呢？主要有两个原因：

1. JVM 在类的初始化阶段会加 Class 对象初始化同步锁，同步多个线程对该类的初始化操作；
2. 静态内部类 InnerClass 的静态成员变量 instance 在方法区中只会有一个实例。

在 Java 规范中，当以下这些情况首次发生时，A 类将会立刻被初始化：

- A 类型实例被创建；
- A 类中声明的静态方法被调用；
- A 类中的静态成员变量被赋值；
- A 类中的静态成员被使用（非常量）；

###### **饿汉单例模式**

?> “饿汉”意指在类加载的时候就初始化

```java
package com.xujiajun.creation.singleton;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class HungrySingleton {
    private final static HungrySingleton instance = new HungrySingleton();

    public static HungrySingleton getInstance() {
        return instance;
    }
}
```

这种模式在类加载的时候就完成了初始化，所以并不存在线程安全性问题；

但由于不是懒加载，饿汉模式不管需不需要用到实例都要去创建实例，如果创建了不使用，则会造成内存浪费。

###### **序列化破坏单例模式**

前面的单例例子在实现序列化接口后都能被序列化的方式破坏，比如 HungrySingleton，让其实现序列化接口：

```java

@NoArgsConstructor
public class HungrySingleton implements Serializable {

    private static final long serialVersionUID = -90312930L;

    private final static HungrySingleton instance = new HungrySingleton();

    public static HungrySingleton getInstance() {
        return instance;
    }
}


class application3 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // 演示序列化破坏单例
        HungrySingleton instance = HungrySingleton.getInstance();
        ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream("file"));
        outputStream.writeObject(instance);

        ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("file"));
        HungrySingleton newInstance = (HungrySingleton) inputStream.readObject();

        System.out.println(instance);
        System.out.println(newInstance);
        System.out.println(instance == newInstance);
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/DjIM96.png)

可以看到，虽然是单例模式，但却成功创建出了两个不一样的实例，单例遭到了破坏。

要让反序列化后的对象和序列化前的对象是同一个对象的话，可以在 HungrySingleton 里加上`readResolve`方法：

```java

@NoArgsConstructor
public class HungrySingleton implements Serializable {

  ......

    private Object readResolve() {
        return instance;
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/aYxmCG.png)

可以看到，这种方式最终反序列化出来的对象和序列化对象是同一个对象。

?> 这种方式反序列化过程内部还是会重新创建 HungrySingleton 实例，只不过因为 HungrySingleton 类定义了 readResolve 方法（方法内部返回 instance
引用），反序列化过程会判断目标类是否定义了 readResolve 该方法，是的话则通过反射调用该方法。

###### **反射破坏单例模式**

除了序列化能破坏单例外，反射也可以，举个反射破坏 HungrySingleton 的例子：

```java
class application3 {

    public static void main(String[] args) throws Exception {
        HungrySingleton instance = HungrySingleton.getInstance();
        // 反射创建实例
        Class<HungrySingleton> c = HungrySingleton.class;
        // 获取构造器
        Constructor<HungrySingleton> constructor = c.getDeclaredConstructor();
        // 打开构造器权限
        constructor.setAccessible(true);
        HungrySingleton newInstance = constructor.newInstance();

        System.out.println(instance);
        System.out.println(newInstance);
        System.out.println(instance == newInstance);
    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/6ASiJ4.png)

可以看到，我们通过反射破坏了私有构造器权限，成功创建了新的实例。

对于这种情况，饿汉模式下的例子可以在构造器中添加判断逻辑来防御（懒汉模式的就没有办法了），比如修改 HungrySingleton 的代码如下所示：

```java
public class HungrySingleton implements Serializable {

    private HungrySingleton() {
        if (instance != null) {
            throw new RuntimeException("forbidden");
        }
    }

  ......
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/ZwXJQp.png)

###### **枚举单例模式**

枚举单例模式是推荐的单例模式，它不仅可以防御序列化攻击，也可以防御反射攻击。举个枚举单例模式的代码：

```java
package com.xujiajun.creation.singleton;

public enum EnumSingleton {
    INSTANCE;

    private Object data;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static EnumSingleton getInstance() {
        return INSTANCE;
    }
}

```

**测试**

```java
class Application4 {

    public static void main(String[] args) throws Exception {

        EnumSingleton instance = EnumSingleton.getInstance();
        instance.setData(new Object());
        EnumSingleton newInstance = EnumSingleton.getInstance();

        System.out.println(instance);
        System.out.println(newInstance);
        System.out.println(instance.getData());
        System.out.println(newInstance.getData());
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/SNhTOI.png)

**测试序列化攻击**

```java
class Application5 {

    public static void main(String[] args) throws Exception {
        EnumSingleton instance = EnumSingleton.getInstance();
        instance.setData(new Object());
        ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream("file"));
        outputStream.writeObject(instance);

        ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("file"));
        EnumSingleton newInstance = (EnumSingleton) inputStream.readObject();

        System.out.println(instance);
        System.out.println(newInstance);
        System.out.println(instance == newInstance);

        System.out.println(instance.getData());
        System.out.println(newInstance.getData());
        System.out.println(instance.getData() == newInstance.getData());
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/2hY7L5.png)

?> 可以看到序列化和反序列化后的对象是同一个。

原理：跟踪 ObjectInputStream#readObject 源码，其中当反编译对象为枚举类型时，将调用 readEnum 方法：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/I4nhMI.png)

?> name 为枚举类里的枚举常量，对于线程来说它是唯一的，存在方法区，所以通过`Enum.valueOf((Class)cl, name)`方法得到的枚举对象都是同一个。

**测试反射攻击**

```java
class Application6 {
    public static void main(String[] args) throws Exception {
        EnumSingleton instance = EnumSingleton.getInstance();
        Class<EnumSingleton> c = EnumSingleton.class;
        // 枚举类只包含一个(String,int)类型构造器
        Constructor<EnumSingleton> constructor = c.getDeclaredConstructor(String.class, int.class);
        constructor.setAccessible(true);
        EnumSingleton newInstance = constructor.newInstance("hello", 1);
        System.out.println(instance == newInstance);
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/sWRT3h.png)

可以看到抛异常了，查看`Constructor`类的 417 行代码可以发现原因：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/F5RjbW.png)

?> Java 禁止通过反射创建枚举对象。

正是因为枚举类型拥有这些天然的优势，所以用它创建单例是不错的选择，这也是 Effective Java 推荐的方式。

<!-- tabs:end -->

##### 1.6.原型模式

原型实例指定创建对象的种类，通过拷贝这些原型创建新的对象。

适用于：

- 类初始化消耗较多资源；
- 循环体中生产大量对象的时候。

- 优点：

  - 原型模式性能比直接 new 一个对象性能好；
  - 简化创建对象过程。

- 缺点：

  - 对象必须重写 Object 克隆方法；
  - 复杂对象的克隆方法写起来较麻烦（深克隆、浅克隆）

<!-- tabs:start  -->

###### **浅拷贝(克隆)**

**举例**

```java
/** 新建一个学生类Student，实现克隆接口，并重写Object的克隆方法（因为都是简单属性，所以浅克隆即可）： */
package com.xujiajun.creation.prototype;

import lombok.Data;

import java.util.ArrayList;


@Data
public class Student implements Cloneable {
    private String name;
    private int age;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

}


class PrototypeApplication {
    public static void main(String[] args) throws CloneNotSupportedException {
        Student student = new Student();
        ArrayList<Student> list = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Student s = (Student) student.clone();
            s.setAge(20 + i);
            s.setName("学生:" + i);
            list.add(s);
        }
        System.out.println(list);
    }
}
```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/BF2wmo.png)

?> 这种方式会比直接在循环中创建 Student 性能好。

###### **深拷贝(克隆)**

!> 当对象包含引用类型属性时，需要使用深克隆，比如 Student 包含 Date 属性时：

**举例**

```java

@Data
public class Student implements Cloneable {
    private String name;
    private int age;
    private Date birthday;


    @Override
    protected Object clone() throws CloneNotSupportedException {
        Student student = (Student) super.clone();
        Date birthday = (Date) student.getBirthday().clone();
        student.setBirthday(birthday);
        return student;
    }

}
```

!> 克隆会破坏实现了 Cloneable 接口的单例对象

<!-- tabs:end -->

#### 2.结构型模式

##### 2.1.外观模式

外观模式又叫门面模式，提供了统一得接口，用来访问子系统中的一群接口。

适用于：

- 子系统越来越复杂，增加外观模式提供简单接口调用；
- 构建多层系统结构，利用外观对象作为每层的入口，简化层间调用。

优点：

- 简化了调用过程，无需了解深入子系统；
- 减低耦合度；
- 更好的层次划分；
- 符合迪米特法则。

缺点：

- 增加子系统，拓展子系统行为容易引入风险；
- 不符合开闭原则。

**举例**

```java
package com.xujiajun.structure.appearance;

import lombok.Data;

/**
 * 外卖实体类Takeaway：
 */
@Data
public class Takeway {
    private String name;
}


//订外卖过程一般分为三个步骤：下单、支付和配送，所以我们创建三个Service对应这三个过程。


/**
 * 新建下单服务OrderService：
 */
class OrderService {
    boolean placeAnOrder(Takeway takeway) {
        System.out.println("商品" + takeway.getName() + ":下单成功");
        return true;
    }
}

/**
 * 支付服务
 */
class PayService {
    boolean pay(Takeway takeway) {
        System.out.println("商品" + takeway.getName() + ":支付成功");
        return true;
    }
}


/**
 * 配送服务
 */
class DeliveryService {
    void delivery(Takeway takeway) {
        System.out.println(takeway.getName() + ":由骑手甲接单,订单配送中");
    }
}


/**
 * 基于外观模式法则，我们需要创建一个Service来聚合这三个服务，客户端只需要和这个Service交互即可
 */
class TakewayService {
    private OrderService orderService = new OrderService();
    private PayService payService = new PayService();
    private DeliveryService deliveryService = new DeliveryService();


    void takeOrder(Takeway takeway) {
        if (orderService.placeAnOrder(takeway)) {
            if (payService.pay(takeway)) {
                deliveryService.delivery(takeway);
            }
        }
    }

}


class AppearanceApplication {
    public static void main(String[] args) {
        Takeway takeway = new Takeway();
        takeway.setName("黄焖鸡米饭");
        TakewayService service = new TakewayService();
        service.takeOrder(takeway);

    }
}

```

**结果**
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/T4iAdA.png)

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/L0RlQD.png)

##### 2.2.装饰者模式

在不改变原有对象的基础之上，将功能附加到对象上，提供了比继承更有弹性的替代方案。

适用于：

- 拓展一个类的功能；
- 动态给对象添加功能，并且动态撤销。

优点：

- 继承的有力补充，不改变原有对象的情况下给对象拓展功能；
- 通过使用不同的装饰类、不同的组合方式，实现不同的效果。
- 符合开闭原则。

缺点：

- 增加程序复杂性；

**举例**

举个水果沙拉的例子。

比如在点水果沙拉外卖时，可以往水果沙拉里加各种水果，价格也会相应的调整，要让程序支持不同水果自由组合，并计算相应的价格，则可以使用装饰者模式来完成。

```java
package com.xujiajun.structure.decorator;

/**
 * 定义一个抽象的水果沙拉类AbstractFruitSalad：
 */
public abstract class AbstractFruitSalad {
    public abstract String remark();

    public abstract int price();
}


/**
 * 创建一个抽象的装饰器AbstractDecorator（关键点，继承抽象水果沙拉类）
 */
class AbstractDecorator extends AbstractFruitSalad {

    private AbstractFruitSalad fruitSalad;


    AbstractDecorator(AbstractFruitSalad salad) {
        this.fruitSalad = salad;
    }

    @Override
    public String remark() {
        return fruitSalad.remark();
    }

    @Override
    public int price() {
        return fruitSalad.price();
    }

}


/**
 * 创建具体的水果沙拉类FruitSalad：
 */
class FruitSalad extends AbstractFruitSalad {

    @Override
    public String remark() {
        return "水果沙拉(标准) \n";
    }

    @Override
    public int price() {
        return 11;
    }
}


/**
 * 如果我们的水果沙拉还允许客户添加猕猴桃和西瓜，那么我们可以添加两个新的装饰器。添加猕猴桃装饰器KiwiDecorator：
 */
class KiwiDecorator extends AbstractDecorator {

    KiwiDecorator(AbstractFruitSalad salad) {
        super(salad);
    }

    @Override
    public String remark() {
        return super.remark() + "加份猕猴桃果切\n";
    }

    @Override
    public int price() {
        return super.price() + 2;
    }
}

class WaterMelonDecorator extends AbstractDecorator {

    WaterMelonDecorator(AbstractFruitSalad salad) {
        super(salad);
    }

    @Override
    public String remark() {
        return super.remark() + "加份西瓜果切\n";
    }

    @Override
    public int price() {
        return super.price() + 3;
    }
}


class DecoratorApplication {
    public static void main(String[] args) {
        // 点了份水果沙拉，并加了两份猕猴桃和一份西瓜，看看最终价格是多少？
        AbstractFruitSalad fruitSalad = new FruitSalad();
        fruitSalad = new KiwiDecorator(fruitSalad);
        fruitSalad = new KiwiDecorator(fruitSalad);
        fruitSalad = new WaterMelonDecorator(fruitSalad);
        System.out.println(fruitSalad.remark() + "总计价格是:" + fruitSalad.price());
    }
}

// 或者改写为

class DecoratorApplication2 {
    public static void main(String[] args) {
        // 点了份水果沙拉，并加了两份猕猴桃和一份西瓜，看看最终价格是多少？
        AbstractFruitSalad fruitSalad = new FruitSalad();
        fruitSalad = new WaterMelonDecorator(new KiwiDecorator(new KiwiDecorator(fruitSalad)));
        System.out.println(fruitSalad.remark() + "总计价格是:" + fruitSalad.price());
    }
}

```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/P0QUqH.png)

?> 通过不同的装饰器自由组合，我们可以灵活的组装出各式各样的水果沙拉，这正是装饰者模式的优点，但明显可以看出代码变复杂了。

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/OkHFP3.png)

##### 2.3.适配器模式

将一个类的接口转换为期望的另一个接口，使原本不兼容的类可以一起工作。

适用于： 已存在的类，它的方法和需求不匹配时（方法结果相同或者相似）

优点:

- 提高类的透明性和复用，现有的类复用但不需改变；
- 目标类和适配器类解耦，提高程序拓展性；
- 符合开闭原则。

缺点：

- 适配器编写过程需要全面考虑，可能会增加系统的复杂性；
- 降低代码可读性。

!> 分为：类适配器模式和对象适配器模式。

<!-- tabs:start -->

###### **类适配器**

**举例**

```java
package com.xujiajun.structure.adapter.clazz;

/**
 * 假如项目里原有一条水果的产品线，比如包含一个树莓类Raspberry：
 */
public class Raspberry {
    void addRasverry() {
        System.out.println("添加点树莓");
    }
}


/**
 * 随着项目的拓展，现在新增了水果派产品线，新建Pie接口：
 */
interface Pie {
    void make();
}


/**
 * 要将Raspberry加入到Pie产品线，又不想修改Raspberry类的代码，则可以创建一个适配器RaspberryPieAdaptor：
 * 适配器继承被适配的类，实现新的产品线接口。
 */
class RaspberryPirAdapter extends Raspberry implements Pie {

    @Override
    public void make() {
        System.out.println("制作一个派");
        super.addRasverry();

    }
}

class AdapterApplication {
    public static void main(String[] args) {
        Pie pie = new RaspberryPirAdapter();
        pie.make();
    }
}





```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/gEHAuy.png)

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/3o3QdZ.png)

###### **对象适配器**

对象适配器模式只需要将 RaspberryPieAdaptor 修改为：

```java
package com.xujiajun.structure.adapter.objectt;

......

/**
 * 要将Raspberry加入到Pie产品线，又不想修改Raspberry类的代码，则可以创建一个适配器RaspberryPieAdaptor：
 * 适配器继承被适配的类，实现新的产品线接口。
 */
class RaspberryPirAdapter implements Pie {

    private Raspberry raspberry = new Raspberry();

    @Override
    public void make() {
        System.out.println("制作一个派");
        raspberry.addRasverry();

    }
}

......

```

?> 这种模式不直接继承被适配者，而是在适配器里创建被适配者。这种模式的 UML 图：

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/j2x9J8.png)

<!-- tabs:end -->

##### 2.4.享元模式

提供了减少对象数量从而改善应用所需的对象结构的方式，运用共享技术有效地支持大量细粒度的对象。

适用于：

- 底层系统开发，解决性能问题；
- 系统拥有大量相似对象，需要缓冲池的场景。

优点：

- 减少对象的创建，降低内存占用；

缺点：

- 关注内/外部状态，关注线程安全问题；
- 程序的逻辑复杂化。

?> 内部状态：简单理解为享元对象的属性状态，不会因为外部的改变而改变； <br>外部状态：简单理解为方法参数。

**举例**

```java
package com.xujiajun.structure.enjoyment;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.stream.IntStream;

public interface Pie {
    void make() throws InterruptedException;
}


class FruitPie implements Pie {
    private String name;
    private LocalDateTime productTime;

    FruitPie(String name) {
        this.name = name;
    }

    void setProductTime(LocalDateTime productTime) {
        this.productTime = productTime;
    }

    @Override
    public void make() throws InterruptedException {
        try {
            Thread.sleep(100);
            System.out.println(name + "生产时间" + this.productTime);

        } catch (InterruptedException e) {
            e.printStackTrace();

        }
    }
}


class FruitPieFactory {
    private static final HashMap<String, FruitPie> PIE_HASH_MAP = new HashMap<>();

    static FruitPie produce(String name) {
        FruitPie fruitPie = PIE_HASH_MAP.get(name);
        if (fruitPie == null) {
            System.out.println("没有" + name + "的制作方法,学习制作...");
            fruitPie = new FruitPie(name);
            PIE_HASH_MAP.put(name, fruitPie);
        }
        return fruitPie;
    }
}


class EnjoymentApplication {
    static final String[] PIE = {"树莓派", "粽子派", "巧克力派", "苹果派"};

    public static void main(String[] args) {
        IntStream.range(0, 10).forEach(i -> {
            String name = PIE[(int) (Math.random() * PIE.length)];
            FruitPie fruitPie = FruitPieFactory.produce(name);
            fruitPie.setProductTime(LocalDateTime.now());
            try {
                fruitPie.make();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }
}
```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/icAl7p.png)

从结果看，在 10 次循环中，只生产了 4 个对象，这很好的描述了系统有大量相似对象，需要缓冲池的场景。

?> JDK 中的字符串常量池，数据库连接池等都是用的享元模式。

##### 2.5.组合模式

将对象组合成树形结构以表示“部分-整体”的层次结构，使客户端对单个对象和组合对象保持一致的方式处理。

适用于：

1. 客户端可以忽略组合对象与单个对象的差异；
2. 处理树形结构数据。

优点:

1. 层次清晰；
2. 客户端不必关系层次差异，方便控制；
3. 符合开闭原则。

缺点：

1. 树形处理较为复杂。

**举例**

```java
package com.xujiajun.structure.combin;

import java.util.ArrayList;
import java.util.List;

/**
 * 举个菜单按钮组成的树形例子。
 * <p>
 * 新建菜单按钮的组合抽象类AbstractMenuButton：
 */
public class AbstractMenuButton {
    public void add(AbstractMenuButton abstractMenuButton) {
        throw new UnsupportedOperationException("不支持创建操作");
    }

    public String getName() {
        throw new UnsupportedOperationException("不支持名称获取");
    }

    public String getType() {
        throw new UnsupportedOperationException("不支持类型获取");
    }

    public String getIcon() {
        throw new UnsupportedOperationException("不支持图标");
    }

    public void print() {
        throw new UnsupportedOperationException("不支持打印操作");
    }
}

/**
 * 按钮拥有名称属性，并且支持名称获取，类型获取和打印方法，所以重写了这三个父类方法
 */
class Button extends AbstractMenuButton {

    private String name;

    public Button(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getType() {
        return "按钮";
    }

    @Override
    public void print() {
        System.out.println(getName() + "【" + getType() + "】");
    }
}

/**
 * 菜单包含名称、图标和层级属性，并且菜单可以包含下级（比如下级菜单，下级按钮），所以它包含一个List类型的属性items。
 * 菜单包含添加下级、名称获取、类型获取、图标获取和打印方法。
 */
class Menu extends AbstractMenuButton {

    private List<AbstractMenuButton> items = new ArrayList<>();
    private String name;
    private String icon;
    private Integer level;

    public Menu(String name, String icon, Integer level) {
        this.name = name;
        this.icon = icon;
        this.level = level;
    }

    @Override
    public void add(AbstractMenuButton abstractMenuButton) {
        items.add(abstractMenuButton);
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getType() {
        return "菜单";
    }

    @Override
    public String getIcon() {
        return this.icon;
    }

    @Override
    public void print() {
        System.out.println(getIcon() + getName() + "【" + getType() + "】");
        for (AbstractMenuButton item : items) {
            if (this.level != null) {
                for (int i = 0; i < this.level; i++) {
                    System.out.print("    ");
                }
            }
            item.print();
        }
    }
}

class CombinApplication {
    public static void main(String[] args) {
        Menu userMenu = new Menu("用户管理", "🧑", 2);
        Button createUser = new Button("新增用户");
        Button updateUser = new Button("修改用户");
        Button deleteUser = new Button("删除用户");
        userMenu.add(createUser);
        userMenu.add(updateUser);
        userMenu.add(deleteUser);

        Menu logMenu = new Menu("操作日志", "📃", 2);
        Button export = new Button("导出Excel");
        logMenu.add(export);

        Menu systemMenu = new Menu("系统管理", "🔨", 1);
        systemMenu.add(userMenu);
        systemMenu.add(logMenu);

        systemMenu.print();
    }
}
```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/O19nBz.png)

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/9s7ZSM.png)

##### 2.6.桥接模式

将抽象部分和具体实现部分分离，使它们都可以独立变化。通过组合的方式建立两个类之间的关系，而不是通过继承。

适用于：

1. 抽象和实体实现之间增加更多的灵活性；
2. 一个类存在多个独立变化的维度，并且需要独立拓展；
3. 不希望使用继承。

优点：

1. 分离抽象部分和具体实现部分；
2. 提高了系统可拓展性；
3. 符合开闭原则和合成复用原则。

缺点：

1. 增加了系统的理解和设计难度；

**举例**

```java
package com.xujiajun.structure.bridge;

/**
 * 包含制作派和获取派类型抽象方法。
 */
public interface Pie {
    Pie makePie();

    void getType();
}

/**
 * Pie的实现类，苹果派AppliePie：
 */
class ApplePie implements Pie {
    @Override
    public Pie makePie() {
        System.out.println("制作苹果派");
        return new ApplePie();
    }

    @Override
    public void getType() {
        System.out.println("水果派");
    }
}

/**
 * Pie的实现类，胡萝卜派CarrotPie：：
 */
class CarrotPie implements Pie {
    @Override
    public Pie makePie() {
        System.out.println("制作胡萝卜派");
        return new CarrotPie();
    }

    @Override
    public void getType() {
        System.out.println("蔬菜沙拉派");
    }
}


/**
 * 接着创建一个店铺抽象类Store，通过属性的方式和Pie相关联，目的是可以在不同的店铺实现类中灵活地制作各种派
 */

abstract class Store {
    protected Pie pie;

    public Store(Pie pie) {
        this.pie = pie;
    }

    abstract Pie makePie();

}

class SamStore extends Store {
    SamStore(Pie pie) {
        super(pie);
    }

    @Override
    Pie makePie() {
        System.out.println("山姆大叔的小店");
        return pie.makePie();
    }
}


class JackStore extends Store {
    JackStore(Pie pie) {
        super(pie);
    }

    @Override
    Pie makePie() {
        System.out.println("杰克的小店");
        return pie.makePie();
    }
}


class BridgeApplication {
    public static void main(String[] args) {
        Store samStore = new SamStore(new ApplePie());
        Pie samStorePie = samStore.makePie();
        samStorePie.getType();

        Store jackStore = new JackStore(new CarrotPie());
        Pie jackStorePie = jackStore.makePie();
        jackStorePie.getType();

    }
}
```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/UB5Vnw.png)

**UML 图**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/aTweeN.png)

##### 2.7.代理模式

为其他对象提供一种代理，以控制对这个对象的访问，代理对象在客户端和目标对象之间起到了中介的作用。

适用于：

1. 保护目标对象；
2. 增强目标对象。

优点：

1. 将代理对象和真实被调用的目标对象分离；
2. 降低耦合，拓展性好；
3. 保护目标对象，增强目标对象。

缺点：

1. 造成类的数目增加，增加复杂度；
2. 客户端和目标对象增加代理对象，会造成处理速度变慢。

<!-- tabs:start -->

###### **静态代理**

通过在代码中显式地定义了一个代理类，在代理类中通过同名的方法对目标对象的方法进行包装，客户端通过调用代理类的方法来调用目标对象的方法。

**举例**

```java
package com.xujiajun.structure.proxy.staticc;

/**
 * 派的制作接口
 */
public interface PieService {
    void makePie();
}


class PieServiceImpl implements PieService {

    public void makePie() {
        System.out.println("制作派");
    }
}


/**
 * 要对PieServiceImpl的makePie方法增强，我们需要创建一个代理对象PieServiceProxy
 * 在PieServiceProxy中我们创建了一个和PieServcie一致的同名方法makePie，方法内部调用了PieServiceImpl的makePie方法，并且在方法调用前调用了代理类的beforeMethod方法，方法调用后调用了代理类的afterMethod方法。
 */
class PieServiceProxy {
    private PieService pieService;

    void makePie() {
        beforeMethod();
        pieService = new PieServiceImpl();
        pieService.makePie();
        afterMethod();
    }


    private void beforeMethod() {
        System.out.println("准备材料");
    }


    private void afterMethod() {
        System.out.println("保鲜");
    }
}


class ProxyApplication {
    public static void main(String[] args) {
        PieServiceProxy proxy = new PieServiceProxy();
        proxy.makePie();

    }
}

```

**结果**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/bLL5IF.png)

**UML**

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/NC7xF0.png)

###### **动态代理**

JDK 的动态代理只能代理接口，通过接口的方法名在动态生成的代理类中调用业务实现类的同名方法。

静态代理的缺点就是每需要代理一个类，就需要手写对应的代理类。

**举例**

```java
package com.xujiajun.structure.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public interface IceCreamService {
    void makeIceCream(String fruit);
}


class IceCreanServiceImpl implements IceCreamService {
    @Override
    public void makeIceCream(String fruit) {
        System.out.println("制作" + fruit + "🍦");
    }
}


class DynamicProxy implements InvocationHandler {
    //代理目标对象
    private Object obj;

    public DynamicProxy(Object obj) {
        this.obj = obj;
    }


    public Object proxy() {
        Class<?> clazz = obj.getClass();
        //生成代理对象
        return Proxy.newProxyInstance(clazz.getClassLoader(), clazz.getInterfaces(), this);
    }


    /**
     * @param proxy  动态生成的代理对象
     * @param method 代理方法
     * @param args   代理方法的方法参数
     * @return 结果
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        beforeMethod(obj);
        // 反射执行代理对象的目标方法
        Object result = method.invoke(obj, args);
        afterMethod(obj);
        return result;
    }


    private void beforeMethod(Object object) {
        if (object instanceof PieService) {
            System.out.println("准备派的材料");
        } else if (object instanceof IceCreamService) {
            System.out.println("准备冰淇淋材料");
        } else {
            throw new RuntimeException("暂不支持代理" + object.getClass() + "类型");
        }
    }

    private void afterMethod(Object object) {
        if (object instanceof PieService) {
            System.out.println("保鲜派");
        } else if (object instanceof IceCreamService) {
            System.out.println("保鲜冰淇淋");
        } else {
            throw new RuntimeException("暂不支持代理" + object.getClass() + "类型");
        }
    }
}


class DynamicProxyApplication {
    public static void main(String[] args) {
        PieService pieService = (PieService) new DynamicProxy(new PieServiceImpl()).proxy();
        pieService.makePie();
        System.out.println("----------------------");
        IceCreamService iceCreamService = (IceCreamService) new DynamicProxy(new IceCreanServiceImpl()).proxy();
        iceCreamService.makeIceCream("草莓");

    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/LlTy9C.png)

###### **CGLib 代理**

通过继承来实现，生成的代理类就是目标对象类的子类，通过重写业务方法来实现代理。

###### **Spring 对代理模式的拓展**

1. 当 Bean 有实现接口时，使用 JDK 动态代理；
2. 当 Bean 没有实现接口时，使用 CGLib 代理。

可以通过以下配置强制使用 CGLib 代理：

```yaml
spring:
  aop:
    proxy-target-class: true
```

<!-- tabs:end -->

#### 3.行为型模式

##### 3.1.模版方法模式

模板方法模式定义了一个流程的骨架，由多个方法组成。并允许子类为一个或多个步骤提供实现。简而言之就是公共的不变的部分由父类统一实现，变化的部分由子类来个性化实现。

优点：

1. 提高复用性；
2. 提高拓展性；
3. 符合开闭原则。

缺点：

1. 类的数目增加；
2. 增加了系统实现的复杂度；
3. 父类添加新的抽象方法，所有子类都要改一遍。

**举例**

```java
package com.xujiajun.behavior.template;


public abstract class Takeaway {
    final void order() {
        System.out.println("下单");
    }

    final void packageSend() {
        System.out.println("打包派送");
    }

    protected abstract void make();

    protected boolean needTableware() {
        return true;
    }

    final void flow() {
        this.order();
        this.make();
        if (needTableware()) {
            System.out.println("赠送一次性餐具");
        }
        this.packageSend();
    }
}

class BarbecueTakeaway extends Takeaway {

    private final boolean needTableware;

    public BarbecueTakeaway(boolean needTableware) {
        this.needTableware = needTableware;
    }

    @Override
    protected void make() {
        System.out.println("制作烤肉");
    }

    @Override
    protected boolean needTableware() {
        return this.needTableware;
    }
}


class FruitTakeaway extends Takeaway {

    @Override
    protected void make() {
        System.out.println("水果配货");
    }

    @Override
    protected boolean needTableware() {
        return false;
    }
}


class TemplateApplication {
    public static void main(String[] args) {

        Takeaway barbecue = new BarbecueTakeaway(true);
        barbecue.flow();
        System.out.println("-----------------------");
        FruitTakeaway fruit = new FruitTakeaway();
        fruit.flow();
    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/gvBvCO.png)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/1u7X98.png)

##### 3.2.迭代器模式

##### 3.3.策略模式

策略模式定义了算法家族，分别封装起来，让它们之间可以互相替换。此模式让算法的变化不会影响到使用算法的用户。策略模式常用于消除大量的 if else 代码。

适用场景：

1. 系统有很多类，它们的区别仅仅在于行为不同；
2. 一个系统需要动态地在几种算法中选择一种；

```java
package com.xujiajun.behavior.strategy;

public interface PromotionStrategy {
    void promotion();
}


class FullReductionPromotionStrategy implements PromotionStrategy {
    public void promotion() {
        System.out.println("满1000立减1");
    }
}


class DiscountPromotionStrategy implements PromotionStrategy {
    public void promotion() {
        System.out.println("9.9折钜惠");
    }
}


class StrategyApplication {
    public static void main(String[] args) {
        // 模拟客户端传递的促销策略key
        String promotionKey = "fr";
        PromotionStrategy strategy;
        if ("fr".equals(promotionKey)) {
            strategy = new FullReductionPromotionStrategy();
        } else if ("ds".equals(promotionKey)) {
            strategy = new DiscountPromotionStrategy();
        } else {
            throw new RuntimeException("暂不支持该促销活动");
        }
        strategy.promotion();
    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/iQkNvN.png)

?> 策略模式常结合工厂模式来消除大量的 if else 代码，我们新建一个促销策略的创建工厂

```java
class PromotionStrategyFactory {

    private static final Map<String, PromotionStrategy> PROMOTION_STRATEGY_MAP = new HashMap<>();

    private static final PromotionStrategy NON_PROMOTION = () -> System.out.println("无促销活动");

    static {
        PROMOTION_STRATEGY_MAP.put(PromotionKey.FR, new FullReductionPromotionStrategy());
        PROMOTION_STRATEGY_MAP.put(PromotionKey.DS, new DiscountPromotionStrategy());
    }

    private PromotionStrategyFactory() {
    }

    public static PromotionStrategy getPromotionStrategy(String promotionKey) {
        PromotionStrategy strategy = PROMOTION_STRATEGY_MAP.get(promotionKey);
        return strategy == null ? NON_PROMOTION : strategy;
    }

    private interface PromotionKey {
        String FR = "fr";
        String DS = "ds";
    }
}


class StrategyApplication {
    public static void main(String[] args) {
        // 模拟客户端传递的促销策略key
        String promotionKey = "fr";
        PromotionStrategy promotionStrategy = PromotionStrategyFactory.getPromotionStrategy(promotionKey);
        promotionStrategy.promotion();
    }
}
```

##### 3.4.解释器模式

##### 3.5.观察者模式

观察者模式定义了对象之间的一对多依赖，让多个观察者同时监听某个主题对象，当主体对象发生变化时，它的所有观察者都会收到响应的通知。

优点：

1. 观察者和被观察者之间建立一个抽象的耦合；
2. 观察者模式支持广播通信。

缺点：

1. 观察者之间有过多的细节依赖，提高时间消耗及程序复杂度；
2. 应避免循环调用。

```java
package com.xujiajun.behavior.observable;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Observable;

@AllArgsConstructor
@Getter
public class Blog extends Observable {
    private String title;

    public void comment(Comment comment) {
        System.out.println(comment.getNickName() + "评论了<" + this.title + ">,评论内容" + comment.getValue());
        // 设置标识位 changed = true，表示被观察者发生了改变
        setChanged();
        // 通知观察者，可以给观察者传递数据
        notifyObservers(comment);
    }


}


@AllArgsConstructor
@Getter
class Comment {
    private String nickName;
    private String value;

}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/Jwewc4.png)

!> 这些方法都是线程安全方法（加了 synchronized 同步锁）。

```java

@AllArgsConstructor
class Author implements Observer {
    private String name;


    /**
     * 观察者被通知后，就会调用这个方法
     *
     * @param o   被观察者对象
     * @param arg 被观察者传递过来的数据
     */
    @Override
    public void update(Observable o, Object arg) {
        Blog blog = (Blog) o;
        Comment comment = (Comment) arg;
        System.out.println("系统感知到" + this.name + "撰写的博文<" +
                blog.getTitle() + ">收到了" + comment.getNickName() +
                "的评论，评论内容为：" + comment.getValue());
    }
}


class ObservableApplication {
    public static void main(String[] args) {
        Blog blog = new Blog("Java从入门到放弃");
        Author author = new Author("MrBird");

        // 添加观察者
        blog.addObserver(author);

        Comment comment = new Comment("Scott",
                "感谢楼主的文章，让我及时放弃Java，回家继承了千万家产。");
        blog.comment(comment);
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/rjbICW.png)

?> 观察者的 update 方法里的逻辑最好进行异步化，这样在并发环境下可以提升程序性能

##### 3.6.备忘录模式

https://www.cnblogs.com/jimoer/p/9537997.html

##### 3.7.命令模式

##### 3.8.中介者模式

##### 3.9.职责链模式

职责链模式为请求创建一个接收此次请求对象的链。

适用于：

- 一个请求的处理需要多个对象当中的一个或几个协作处理；

优点：

1. 请求的发送者和接受者（请求的处理）解耦；
2. 职责链可以动态的组合。

缺点：

1. 职责链太长或者处理时间过长，影响性能；
2. 职责链可能过多。

```java
package com.xujiajun.duty;

/**
 * @author xujiajun
 * @date 2022/6/16
 * @apiNote
 */
public abstract class StringValidator {
    protected StringValidator validator;

    public void setNextValidator(StringValidator validator) {
        this.validator = validator;
    }

    public abstract void check(String value);
}


class StringLengthValidator extends StringValidator {
    @Override
    public void check(String value) {
        if (value != null && value.length() != 0) {
            System.out.println("字符串长度合法");
            if (validator != null) {
                validator.check(value);
            }
        } else {
            System.out.println("字符串长度不合法");
        }
    }
}


class StringValueValidator extends StringValidator {
    @Override
    public void check(String value) {
        if (value.contains("fuck")) {
            System.out.println("字符串值不合法");
            if (validator != null) {
                validator.check(value);
            }
        } else {
            System.out.println("字符串值合法");
        }
    }
}

class DutyApplication {

    public static void main(String[] args) {
        StringValidator lengthValidator = new StringLengthValidator();
        StringValidator valueValidator = new StringValueValidator();

        lengthValidator.setNextValidator(valueValidator);
        lengthValidator.check("hello");
    }
}

```

!> 类包含了一个自身类型的成员变量，这也是该模式的设计核心，以此形成链条

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/2bT3mv.png)

##### 3.10.访问者模式

##### 3.11.状态模式

> 参考连接：https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F_(%E8%AE%A1%E7%AE%97%E6%9C%BA)
