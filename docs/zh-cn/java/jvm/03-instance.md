### JVM Java对象实例化过程 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.对象实例化几种方式

Java程序中，创建对象主要有以下几种方式：

1. new 关键字创建；
    - 通过new关键字调用类构造器创建对象；
    - 调用对象的getXXXInstance方法（单例模式）；
    - XXXBuilder/XXXFactory。
2. 反射，Class的newInstance方法或者Constructor的newInstance方法；
3. 使用类的clone方法；
4. 使用反序列化；
5. 第三方库Objenesis。

#### 2.对象创建步骤

创建对象过程分为以下几个步骤：

1. 判断对象对应的类是否已经加载（类加载三个步骤：加载、链接和初始化）；

2. 为对象分配内存。

   计算对象占用空间大小，然后在堆中划分一块内存存放对象。内存分配存在以下两种情况：

    - 内存规整时，使用指针碰撞。所有用过的内存在一边，空闲的内存在另一边，中间放着一个指针作为分界点的指示器，分配内存就仅仅是把指针往空闲那一边挪一段与对象大小相等的距离即可。
    - 内存不规整时，虚拟机需要维护一个列表，使用空闲列表分配。这种情况下，已使用的内存和未使用的内存相互交错，虚拟机维护了一个列表，记录哪些内存块是可用的，在分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新空闲列表。

   !> 选择哪种分配方式由Java堆内存是否规整决定，而Java堆内存是否规整又取决于垃圾收集器是否带有压缩的功能。

3. 处理并发安全问题。虚拟机通过CAS和TLAB来确保并对象创建时的线程安全问题；

4. 初始化分配到的空间。内存分配好后，虚拟机将分配到的内存空间都初始化为零值（即默认值，不包括对象头）。

5. 设置对象头。将对象的所属类（即类的元数据信息）、对象的HashCode和对象的GC信息、锁信息等数据存放在对象的对象头中。

6. 执行`<init>`方法进行初始化。`<init>`方法包含了初始化成员变量、执行实例化代码块和调用类的构造方法：

```java
package com.xujiajun.isntance;

public class Test {

    private int a = 111;
    private int b;
    private int c;
    {
        b = 222;
    }
    public Test() {
        c = 333;
    }
}
```

使用jclasslib查看其<init>method：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uSCiP6.png)

再次证明了<init>方法包含了初始化成员变量、执行实例化代码块和调用类的构造方法。

#### 3.对象内存布局

堆空间里的对象内部包含了以下几个结构：

1. 对象头。

   对象头包含两部分数据：

    - 运行时元数据：HashCode、对象年龄、锁状态标志、线程持有的锁等信息；
    - 类型指针：指向类元数据，确定对象所属的类型。

   如果对象是数组，则还需记录数组的长度。

2. 实例数据。

   即类中定义的各种类型属性（包括从父类继承下来的和本身定义的）。实例数据存放具有一定规则：相同宽度的字段总是被分配在一起；父类中定义的变量会出现在子类之前。

3. 对齐填充：不是必须的，也没有特殊含义，起到占位符的作用。

下面通过一个例子来演示对象的内存布局。现有如下代码：

```java
package com.xujiajun.isntance;

public class Customer {

    int id = 100;
    String name;
    Account account;
    {
        name = "大客户";
    }
    public Customer() {
        account = new Account();
    }

    public static void main(String[] args) {
        Customer customer = new Customer();
    }
}

class Account {

}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/xaCqIb.png)
