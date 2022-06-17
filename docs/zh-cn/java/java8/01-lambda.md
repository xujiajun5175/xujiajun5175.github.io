### Java8 - Lambda 表达式 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

Java 8 的 Lambda 表达式借鉴了 C#和 Scala 等语言中的类似特性，简化了匿名函数的表达方式。

Lambda 表达式可以直接以内联的形式为函数式接口的抽象方法提供实现，并把整个表达式作为函数式接口的实例。

什么是函数式接口？

简单来说就是只包含一个抽象方法的接口，允许有默认的实现（使用 default 关键字描述方法）。

函数式接口建议使用`@FunctionalInterface`注解标注，虽然这不是必须的，但是这样做更符合规范。

在 Java 8 之前，实现 Runnable 常用方式是编写一个匿名类：

```java
Thread thread=new Thread(new Runnable(){
@Override
public void run(){
        System.out.println("hello");
    }
});
thread.start();
```

使用 Lambda 表达式后，上面的代码可以改造为：

```java
Thread thread=new Thread(()->System.out.println("hello"));
thread.start();
```

#### 1.Lambda 表达式解析

Lambda 表达式的基本语法如下：

```
(parameters) -> expression
or
(parameters) -> { statements; }

```

由语法可以看到，Lambda 表达式包含了三个部分：

- 参数列表；
- 箭头`->`把参数列表与 Lambda 主体分隔开；
- Lambda 主体，只有一行代码的时候可以省略大括号和`return`关键字。

以下都是合法的

```java
(String str)->str.length()
(String str)->{return str.length();}

()->System.out.println("hello")

()->{}
()->17

(int x,int y)->{
System.out.println(x);
System.out.println(y);
}
```

#### 2.Lambda 的使用场合

使用 Lambda 必须满足以下两个条件：

1. 实现的对象是函数式接口的抽象方法；
2. 函数式接口的抽象方法的函数描述符和 Lambda 表达式的函数描述符一致。

##### 2.1.函数式接口

函数式接口的定义开头已经说了，这里就不再赘述。

在 Java 8 之前，常见的函数式接口有 `java.util.Comparator`，`java.lang.Runnable` 等。

拿 `java.util.Runnable` 来说，查看其源码如下：

```java

@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

这个接口只有一个抽象方法，并且使用`@FunctionalInterface`注解标注。

接口现在还可以拥有默认方法（即在类没有对方法进行实现时，其主体为方法提供默认实现的方法）。

哪怕有很多默认方法，只要接口只定义了一个抽象方法，它就仍然是一个函数式接口。

##### 2.2.函数描述符

**函数描述符**其实也可以理解为方法的签名。

比如上述的 Runnable 抽象方法不接受参数，并且返回 void，所以其函数描述符为`() -> void`。而`() -> System.out.println("hello")`
Lambda 表达式也是不接受参数，并且返回 void，即其函数描述符也是`() -> void`。

所以代码`Runnable r = () -> System.out.println("hello");`是合法的。

!> 特殊的 void 兼容规则<br>如果一个 Lambda 的主体是一个语句表达式， 它就和一个返回 void 的函数描述符兼容（当然需要参数列表也兼容）。<br>例如，以下 Lambda 是合法的，尽管 List 的 `add` 方法返回了一个
`boolean，而不是` `Runnable` 抽象方法函数描述符() -> void 所要求的 void：

```java
List<String> list=new ArrayList<>();
Runnable r=()->list.add("hello");
```

#### 3.更简洁的 Lambda

编写一个类型转换的函数式接口：

```java
package com.xujiajun.lambda;

@FunctionalInterface
public interface TransForm<T, R> {
    R transform(T t);
}

class TransFormApplication {
    public static void main(String[] args) {
        TransForm<String, Integer> transForm = (String str) -> Integer.valueOf(str);
        System.out.println(transForm.transform("123"));

        //简化
        TransForm<String, Integer> t = (str) -> Integer.valueOf(str);
        System.out.println(t.transform("123"));

        //最简化
        TransForm<String, Integer> tt = Integer::valueOf;
        System.out.println(tt.transform("123"));
    }
}

```

因为 Java 编译器会从上下文（目标类型）推断出用什么函数式接口来配合 Lambda 表达式，这意味着它也可以推断出适合 Lambda 的签名。

就拿这个例子来说，TransForm 的抽象方法 `transForm` 在本例中的函数描述符为`(String) ->Integer`，所以对应的 Lambda 的签名也是如此，即 Lambda 的参数即使不声名类型，Java 编译器可以知道其参数实际上为 String 类型。

?> 双冒号,叫做方法的引用。

方法引用可以被看作仅仅调用特定方法的 Lambda 的一种快捷写法。

它的基本思想是，如果一个 Lambda 代表的只是“直接调用这个方法”，那最好还是用名称来调用它，而不是去描述如何调用它，这样代码可读性更好。

基本写法就是目标引用放在分隔符::前，方法的名称放在后面。

| Lambda 表达式                            | 等效方法引用                      |
| :--------------------------------------- | :-------------------------------- |
| (String s) -> System.out.println(s)      | System.out::println               |
| (str, i) -> str.substring(i)             | String::substring                 |
| () -> Thread.currentThread().dumpStack() | Thread.currentThread()::dumpStack |

!> 符号::除了出现在方法的引用外，它还常见于构造函数的引用中

```java
package com.xujiajun.lambda;

import lombok.AllArgsConstructor;
import lombok.Data;

@FunctionalInterface
public interface Generator<T, R> {
    R create(T t);
}


@Data
@AllArgsConstructor
class Apple {
    private String color;
}


class GeneratorApplication {
    public static void main(String[] args) {
        Generator<String, Apple> aNew = Apple::new;
        Apple apple = aNew.create("red");
    }
}
```

这种通过`ClassName::new`的写法就是构造函数的引用。

在这里 Generator 的抽象方法接收一个 String 类型参数，返回值类型为 Apple，这和 Apple 类的构造函数相符合，所以这里编译可以通过。

#### 4.Lambda 表达式访问变量

Lambda 表达式可以访问局部 final 变量，成员变量和静态变量。

!> 这里主要说下局部 `final` 变量。有无 `final` 关键字不重要，重要的是确保该变量的值不会被改变就行了。

比如下面的例子可以编译通过：

```java
String hello="hello lambda";
        Runnable r=()->System.out.println(hello);

```

而下面的这个就会编译出错，因为变量 hello 的值被改变了：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/8jRB6K.png)

#### 5.Lambda 表达式实战

假如现在有如下需求：现有一个包含了各种颜色不同重量的苹果的 List，编写一个方法，从中筛选出满足要求的苹果。

比如筛选出红色的苹果、红色并且重量大于 1kg 的苹果、绿色重量小于 0.5kg 的苹果或者红色大于 0.5kg 的苹果等等。

```java
package com.xujiajun.lambda;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xujiajun
 * @date 2022/6/16
 * @apiNote
 */


public interface AppleFilter {
    boolean test(Apple2 apple);
}


@Data
@AllArgsConstructor
class Apple2 {
    private String color;
    private Double weight;
}


class AppleFilterMethod {
    static List<Apple2> filterApple(List<Apple2> list, AppleFilter filter) {
        List<Apple2> fileterList = new ArrayList<>();
        for (Apple2 apple : list) {
            if (filter.test(apple)) {
                fileterList.add(apple);
            }
        }
        return fileterList;
    }
}


class AppleFilterApplication {
    public static void main(String[] args) {
        List<Apple2> appleList = new ArrayList<>();
        appleList.add(new Apple2("red", 0.4));
        appleList.add(new Apple2("red", 0.6));
        appleList.add(new Apple2("red", 1.3));
        appleList.add(new Apple2("green", 0.2));
        appleList.add(new Apple2("green", 0.35));
        appleList.add(new Apple2("green", 1.1));

        //筛选红色的苹果
        List<Apple2> appleFilterList = AppleFilterMethod.filterApple(appleList, apple -> "red".equalsIgnoreCase(apple.getColor()));
        for (Apple2 apple : appleFilterList) {
            System.out.println(apple.getColor() + " apple,weight:" + apple.getWeight());
        }

        System.out.println("---------------------------------");

        //筛选出红色并且重量大于1kg的苹果:
        appleFilterList = AppleFilterMethod.filterApple(appleList, apple -> "red".equalsIgnoreCase(apple.getColor()) && apple.getWeight() > 1.0);
        for (Apple2 apple : appleFilterList) {
            System.out.println(apple.getColor() + " apple,weight:" + apple.getWeight());
        }

        System.out.println("---------------------------------");

        //筛选出绿色重量小于0.5kg的苹果或者红色大于0.5kg的苹果:
        appleFilterList = AppleFilterMethod.filterApple(appleList,
                (apple) -> ("green".equalsIgnoreCase(apple.getColor()) && apple.getWeight() < 0.5) ||
                        ("red".equalsIgnoreCase(apple.getColor()) && apple.getWeight() > 0.5));
        for (Apple2 apple : appleFilterList) {
            System.out.println(apple.getColor() + " apple,weight:" + apple.getWeight());
        }

    }


}
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/nOYgkw.png)

#### 6.Java8 中的函数式接口

下表列出了 Java8 中常见的函数式接口：

| 函数式接口        | 函数描述符     | 原始类型特化                                                                                                                                                                |
| :---------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Predicate         | T->boolean     | IntPredicate,LongPredicate, DoublePredicate                                                                                                                                 |
| Consumer          | T->void        | IntConsumer,LongConsumer, DoubleConsumer                                                                                                                                    |
| Function<T,R>     | T->R           | IntFunction, IntToDoubleFunction, IntToLongFunction, LongFunction, LongToDoubleFunction, LongToIntFunction, DoubleFunction, ToIntFunction, ToDoubleFunction, ToLongFunction |
| Supplier          | ()->T          | BooleanSupplier,IntSupplier, LongSupplier, DoubleSupplier                                                                                                                   |
| UnaryOperator     | T->T           | IntUnaryOperator, LongUnaryOperator, DoubleUnaryOperator                                                                                                                    |
| BinaryOperator    | (T,T)->T       | IntBinaryOperator, LongBinaryOperator, DoubleBinaryOperator                                                                                                                 |
| BiPredicate<L,R>  | (L,R)->boolean |                                                                                                                                                                             |
| BiConsumer<T,U>   | (T,U)->void    | ObjIntConsumer, ObjLongConsumer, ObjDoubleConsumer                                                                                                                          |
| BiFunction<T,U,R> | (T,U)->R       | ToIntBiFunction<T,U>, ToLongBiFunction<T,U>, ToDoubleBiFunction<T,U>                                                                                                        |

##### 6.1.Predicate

predicate: 英 [ˈpredɪkət] 美 [ˈpredɪkət] 断言，断定的意思。

从接口的名称就可以推断出这个函数式接口的主要作用就是用于判断作用，Predicate 源码如下所示：

```java

@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

可看到`java.util.function.Predicate<T>`接口定义了一个名叫 test 的抽象方法，它接受泛型 T 对象，并返回一个 boolean，函数描述符为`(T) -> boolean`举几个例子:

```java
// 偶数判断
Predicate<Integer> isEven=(in)->in%2==0;
        isEven.test(17); // false

// 判断字符串的长度是否为0
        Predicate<String> isEmptyString=String::isEmpty;
        isEmptyString.test(""); // true
```

除了抽象方法外，`java.util.function.Predicate<T>`接口还定义了三个默认方法：and，negate 和 or，对应“与”，“非”和“或”操作，这样我们便可以复合 Lambda 表达式了，比如：

```java
// 判断是偶数，并且大于30
Predicate<Integer> isEven=(in)->in%2==0;
        isEven.and((in)->in>30).test(40); // true

// 奇数判断
        Predicate<Integer> isEven=(in)->in%2==0;
        Predicate<Integer> isOdd=isEven.negate();
        isOdd.test(17); // true
```

##### 6.2.Consumer

英 [kənˈsju:mə(r)] 美 [kənˈsu:mə(r)] n.消费者。该函数式接口用于消费一个对象，即接收一个对象，对其执行某些操作，然后没有返回值。Consumer 源码如下所示：

```java

@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> {
            accept(t);
            after.accept(t);
        };
    }
```

可看到`java.util.function.Consumer<T>`定义了一个名叫 `accept` 的抽象方法，它接受泛型 `T` 的对象，没有返回`(void)`，函数描述符为`(T) -> void`。

其还提供了一个默认方法 `andThen`。举个例子：

```java
Consumer<Apple> printAppleColor=(a)->System.out.println(a.getColor());
        printAppleColor.accept(new Apple("red",17)); // red

        printAppleColor.andThen((a)->System.out.println(a.getWeight())).accept(new Apple("red",17)); // red 17.0
```

##### 6.3.Supplier

supplier 英 [səˈplaɪə(r)] 美 [səˈplaɪər] n.供应商;供应者;供给者。其源码如下：

```java

@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

可看到 `java.util.function.Supplier<T`>定义了一个名叫 `get` 的抽象方法，它不接收参数，返回泛型 `T` 的对象，函数描述符为`() -> T`。举个例子：

```java
Supplier<Person> personSupplier=Person::new;
        personSupplier.get();   // new Person
```

##### 6.4.Functions

源码

```java

@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

`java.util.function.Function<T, R>`接口定义了一个叫作`apply`的方法，它接受一个泛型 T 的对象，并返回一个泛型 `R` 的对象，函数描述符为`(T) -> R`。

举个例子：

```java
Function<Apple, Double> getAppleWeight=(a)->{
        return a.getWeight();
        };
        getAppleWeight.apply(new Apple(17)); // 17.0
```

Functions 接口还提供了两个抽象方法`compose`和`andThen`，从源码可以看出两者的根本区别。举个 compose 例子：

```java
Function<Integer, Integer> f=(x)->x+1;
        Function<Integer, Integer> g=(x)->x*2;
        f.compose(g).apply(2); // 5
```

?> 过程为：`f(g(2))`，也就是`1+(2*2)`。

举个 andThen 的例子：

```java
Function<Integer, Integer> f=(x)->x+1;
        Function<Integer, Integer> g=(x)->x*2;
        f.andThen(g).apply(2); // 6
```

过程为：`g(f(2))`，也就是`(2+1)*2`。

##### 6.5.原始类型特化

在学习 Function 接口的时候，我们定义了 f 函数：

```java
Function<Integer, Integer> f=(x)->x+1;

```

x 的类型为`Integer`类型，1 为`int`类型，返回值为`Integer`类型，整个过程实际上为`Integer.valueOf(x.intValue() + 1)`。

虽然编译器可以自动帮我们完成拆装箱，但这会造成不必要的性能消耗。

考虑到了这一点，Java8 为我们提供了 int 类型的 Function 接口：`IntFunction`:

```java

@FunctionalInterface
public interface IntFunction<R> {
    R apply(int value);
}
```

所以`f`最好重构为:

```java
IntFunction<Integer> f=(x)->x+1;
```

#### 7.Java8 中增强的 Comparator

在 Java8 之前，Comparator 接口用于实现简单的比较排序算法。比如有如下 List：

```java
List<Double> list=new ArrayList<>();
        list.add(12.3);
        list.add(100.2);
        list.add(3.14);
        list.add(27.7);
        list.add(-9.8);
```

使用 Comparator 接口对其从小到大排序：

```java
Collections.sort(list,new Comparator<Double>(){
@Override
public int compare(Double o1,Double o2){
        return o1.compareTo(o2);
        }
        });
```

`Comparator`接口也是一个函数式接口，函数描述符为`(T,T) -> int`，Java8 中可以使用 Lambda 改造上面的排序方法：

```java
Collections.sort(list,(o1,o2)->o1.compareTo(o2));
```

Java8 对 List 提供了 sort 方法，可以替代 Collections.sort，所以上面的代码可以简化为：

```java
list.sort(()o1,o2)->o1.compareTo(o2))

```

使用方法的引用来进一步简化

```java
list.sort(Double::compareTo);
```

Java8 对 Comparator 进行了增强，加入了一些实用的默认方法，比如对排序结果反转：

```java
Comparator<Double> comparator=Double::compareTo;
        list.sort(comparator.reversed());
```

!> 查看 Comparator 的时候发现其虽然是函数式接口，但是却包含了 compare 和 equals 这两个抽象方法，顿时有点懵逼，函数式接口不是只能有一个抽象方法么？<br>
查找资料后发现：函数式接口中可以额外定义多个抽象方法，但这些抽象方法签名必须和 Object 的 public 方法一样，接口最终有确定的类实现，而类的最终父类是 Object 。<br>因此函数式接口可以定义 Object 的 public 方法。
