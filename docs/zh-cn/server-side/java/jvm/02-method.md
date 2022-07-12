### JVM 方法调用细节 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

JVM中，类加载过程链接阶段的解析步骤包含将符号引用转换为调用方法的直接引用过程，该过程与方法的绑定机制有关，这节记录下Java方法调用的一些细节。

#### 1.方法绑定机制

在聊方法绑定机制之前，我们需要先知道什么是**静态链接**和**动态链接**。

- 静态链接：类加载过程中，如果**被调用的目标方法在编译期就可以唯一确定，运行期间不会发生改变**，这种情况下将调用方法的符号引用转换为直接引用的过程称之为静态链接。
- 动态链接：和静态链接相反，如果**被调用的目标方法在编译期无法确定下来，只能够在运行期间将调用方法的符号引用转换为直接引用**，这种情况被称为动态链接。

静态链接和动态链接对应的方法绑定机制分别为**早期绑定**和**晚期绑定**。**绑定**是一个字段、方法或者类在符号引用被替换为直接引用的过程，仅仅发生一次。

举个例子，新建TEST类：

```java
package com.xujiajun.reference.method;

public class Test {

    public void showBrand(Car car) {
        car.brand();
    }

    public void showPower(Engine engine) {
        engine.power();
    }
}

interface Car {
    void brand();
}

class Engine {

    void power() {
        System.out.println("0马力");
    }
}

class Volvo extends Engine implements Car {

    @Override
    public void brand() {
        System.out.println("Volvo V60 T5");
    }

    @Override
    void power() {
        System.out.println("254马力");
    }
}

class Benz extends Engine implements Car {

    @Override
    public void brand() {
        System.out.println("C 200L");
    }

    @Override
    void power() {
        System.out.println("156马力");
    }
}
```

?> 。Test类的showBrand方法参数为Car接口，showPower方法的参数为Engine类，因为它们在编译期都无法确定参数具体是哪一个类，所以都为晚期绑定。

改造Volvo类:

```java
class Volvo extends Engine implements Car {

    public Volvo() {
        super();
    }

    @Override
    public void brand() {
        System.out.println("Volvo V60 T5");
    }

    @Override
    void power() {
        System.out.println("254马力");
    }
}
```

我们在Volvo类中添加了一个空参构造器，并调用了父类的空参构造器，因为父类空参构造器可以唯一确定下来就是Engine的空参构造器，在编译期就可以唯一确定，所以这种称为早期绑定。

?> 构造方法可以看成是一种特殊的方法，通过jclasslib插件也可以看到，类的构造器也划分在Methods列表中：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/mni24b.png)

#### 2.虚方法和非虚方法

- 非虚方法：方法在编译期就确定了具体的调用版本，这个版本在运行时是不可变的，这样的方法称为**非虚方法**。静态方法、私有方法、final方法、实例构造器和父类方法都是非虚方法，其余的方法都称为**虚方法**；
- 虚方法：和非虚方法相反。

#### 3.方法调用虚拟机指令

虚拟机中提供了以下几条方法调用指令：

- invokestatic：调用静态方法；
- invokespecial：调用方法（构造器）、私有方法及父类方法；
- invokevirtual：调用所有虚方法和final修饰的方法；
- invokeinterface：调用接口方法。

Java7后，虚拟机又新增了一个动态调用指令：

- invokedynamic：动态解析处需要调用的方法，然后执行（实际应用体现在Java8的lambda表达式）。

```java
public class Father {
    public static void staticMethod() {
    }

    public void superMethod() {
    }

    protected final void finalMethod() {
    }
}

class Son extends Father {

    public Son() {
        super();
    }

    public void test() {
        Father.staticMethod();
        privateMethod();
        super.superMethod();
        finalMethod();
    }

    private void privateMethod() {
    }
}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/7VYhy2.png)

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/WX1oef.png)

invokedynamic指令lambda表达式例子（修改Son类，添加dynamicMethod）：

```java
class Son extends Father {

    public Son() {
        super();
    }

    public void test() {
        Father.staticMethod();
        privateMethod();
        super.superMethod();
        finalMethod();
        dynamicMethod(System.out::println);
    }

    private void privateMethod() {
    }

    public void dynamicMethod(Consumer<String> consumer) {
    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/7ui9lH.png)

#### 4.方法重写本质

Java方法在被调用时遵循以下几个步骤：

1. 找到操作数栈顶的第一个元素所执行的对象的实际类型，记作C；
2. 如果在类型C中找到与常量中的描述相符合的方法，则进行访问权限校验，如果校验通过则返回这个方法的直接引用，查找过程结束； 如果不通过，则返回<span style="color:red;">java.lang.IllegalAccessError</span>异常；
3. 否则，按照继承关系从下往上依次对C的各个父类进行第2步的搜索和验证过程；
4. 如果始终没找到合适的方法，则抛出<span style="color:red;">java.lang.AbstractMethodError</span>异常。

?> 如果方法调用每次都需要按照上面四个步骤搜索的话，势必会消耗一定的性能。<br>所以为了提高性能，JVM采用在类的方法区建立一个虚方法表来实现（非虚方法可以唯一确定，不需要查找，所以没有非虚方法表），使用索引表来代替查找。

?> 虚方法表在类加载的链接阶段（解析阶段）被创建。