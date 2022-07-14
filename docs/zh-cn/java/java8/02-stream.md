### Java8 - Stream 流 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

Java 8 中的 Stream 俗称为流

Stream 用于对集合对象进行各种非常便利、高效的聚合操作，或者大批量数据操作。

Stream API 借助于 Lambda 表达式，极大的提高编程效率和程序可读性。

同时它提供串行和并行两种模式进行汇聚操作，并发模式能够充分利用多核处理器的优势。

!> 与 java.io 包里的 InputStream 和 OutputStream 是完全不同的概念

#### 1.初探

有如下一个 List，现要从中筛选出以`J`开头的元素，然后转换为大写，最后输出结果。Java 8 之前我们是这样做的：

```java
public class init {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Java", "JavaScript", "python", "PHP", "C#", "Golang", "Swift");
        // java8之前
        List<String> filterList = new ArrayList<>();
        for (String s : list) {
            if (s.startsWith("J")) {
                filterList.add(s.toUpperCase());
            }
        }
        for (String s : filterList) {
            System.out.println(s);
        }
        System.out.println("-----------------------");
        // java8
        list.stream().filter(s -> s.startsWith("J")).map(String::toUpperCase).forEach(System.out::println);
    }
}
```

是不是很方便？上面的例子中，集合使用`stream`方法创建了一个流，然后使用`filter`和`map`方法来处理这个集合，它们统称为**中间操作**。

中间操作都会返回另一个流，以便于将各种对集合的操作连接起来形成一条流水线。

最后我们使用了`forEach`方法迭代筛选结果，这种位于流的末端，对流进行处理并且生成结果的方法称为**终端操作**。

总而言之，流的使用一般包括三件事情：

1. 一个**数据源**（如集合）来执行一个查询；
2. 一个**中间操作**链，形成一条流的流水线；
3. 一个**终端操作**，执行流水线，并能生成结果。

下表列出了流中常见的中间操作和终端操作：

| 操作                                         | 类型 | 返回类型      | 使用的类型/函数式接口    | 函数描述符       |
| :------------------------------------------- | :--- | :------------ | :----------------------- | :--------------- |
| filter                                       | 中间 | `Stream<T>`   | `Predicate<T>`           | `T -> boolean`   |
| distinct                                     | 中间 | `Stream<T>`   |                          |                  |
| skip                                         | 中间 | `Stream<T>`   | `long`                   |                  |
| limit                                        | 中间 | `Stream<T>`   | `long`                   |                  |
| map                                          | 中间 | `Stream<R>`   | `Function<T, R>`         | `T -> R`         |
| flatMap                                      | 中间 | `Stream<R>`   | `Function<T, Stream<R>>` | `T -> Stream<R>` |
| sorted                                       | 中间 | `Stream<T>`   | `Comparator<T>`          | `(T, T) -> int`  |
| anyMatch                                     | 终端 | `boolean`     | `Predicate<T>`           | `T -> boolean`   |
| noneMatch                                    | 终端 | `boolean`     | `Predicate<T>`           | `T -> boolean`   |
| allMatch                                     | 终端 | `boolean`     | `Predicate<T>`           | `T -> boolean`   |
| findAny                                      | 终端 | `Optional<T>` |                          |                  |
| findFirst                                    | 终端 | `Optional<T>` |                          |                  |
| forEach                                      | 终端 | `void`        | `Consumer<T>`            | `T -> void`      |
| [collect](zh-cn/java/java8/03-collect.md.md) | 终端 | `R`           | `Collector<T, A, R>`     |                  |
| reduce                                       | 终端 | `Optional<T>` | `BinaryOperator<T>`      | `(T, T) -> T`    |
| count                                        | 终端 | `long`        |                          |                  |

!> 下面详细介绍这些操作的使用。除了特殊说明，默认使用下面这个集合作为演示：

```java
List<String> list=Arrays.asList("Java","JavaScript","python","PHP","C#","Golang","Swift","C++","Ruby");
```

#### 2.中间操作

##### 2.1.filter

Streams 接口支持·`filter`方法，该方法接收一个`Predicate<T>`，函数描述符为`T -> boolean`，用于对集合进行筛选，返回所有满足的元素：

```java
list.stream()
        .filter(s->s.contains("#"))
        .forEach(System.out::println);
```

结果输出`C#`。

##### 2.2.distinct

`distinct`方法用于排除流中重复的元素，类似于 SQL 中的 distinct 操作。比如筛选中集合中所有的偶数，并排除重复的结果：

```java
List<Integer> numbers=Arrays.asList(1,2,1,3,3,2,4);
        numbers.stream()
        .filter(i->i%2==0)
        .distinct()
        .forEach(System.out::println);
```

结果输出`2 4`。

##### 2.3.skip

`skip(n)`方法用于跳过流中的前 n 个元素，如果集合元素小于 n，则返回空流。比如筛选出以`J`开头的元素，并排除第一个：

```java
list.stream()
        .filter(s->s.startsWith("J"))
        .skip(1)
        .forEach(System.out::println);
```

结果输出`JavaScript`。

##### 2.4.limit

`limit(n)`方法返回一个长度不超过 n 的流，比如下面的例子将输出`Java JavaScript python`：

```java
list.stream()
        .limit(3)
        .forEach(System.out::println);
```

##### 2.5.map

`map`方法接收一个函数作为参数。这个函数会被应用到每个元素上，并将其映射成一个新的元素。如：

```java
list.stream()
        .map(String::length)
        .forEach(System.out::println);
```

结果输出`4 10 6 3 2 6 5 3 4`。

`map`还支持将流特化为指定原始类型的流，如通过`mapToInt`，`mapToDouble`和`mapToLong`方法，可以将流转换为`IntStream`，`DoubleStream`和`LongStream`
。特化后的流支持`sum`，`min`和`max`方法来对流中的元素进行计算。比如：

```java
List<Integer> numbers=Arrays.asList(1,2,1,3,3,2,4);
        IntStream intStream=numbers.stream().mapToInt(a->a);
        System.out.println(intStream.sum()); // 16
```

也可以通过下面的方法，将`IntStream`转换为`Stream`：

```java
Stream<Integer> s=intStream.boxed();
```

##### 2.6.flatMap

`flatMap`用于将多个流合并成一个流，俗称流的扁平化。这么说有点抽象，举个例子，比如现在需要将 list 中的各个元素拆分为一个个字母，并过滤掉重复的结果，你可能会这样做：

```java
list.stream()
        .map(s->s.split(""))
        .distinct()
        .forEach(System.out::println);
```

输出如下：

```bash
[Ljava.lang.String;@e9e54c2
[Ljava.lang.String;@65ab7765
[Ljava.lang.String;@1b28cdfa
[Ljava.lang.String;@eed1f14
[Ljava.lang.String;@7229724f
[Ljava.lang.String;@4c873330
[Ljava.lang.String;@119d7047
[Ljava.lang.String;@776ec8df
[Ljava.lang.String;@4eec7777
```

这明显不符合我们的预期。实际上在`map(s -> s.split(""))`操作后，返回了一个`Stream<String[]>`类型的流，所以输出结果为每个数组对象的句柄，而我们真正想要的结果是`Stream<String>`！

在 Stream 中，可以使用`Arrays.stream()`方法来将数组转换为流，改造上面的方法：

```java
list.stream()
        .map(s->s.split(""))
        .map(Arrays::stream)
        .distinct()
        .forEach(System.out::println);
```

输出如下：

```bash
java.util.stream.ReferencePipeline$Head@eed1f14
java.util.stream.ReferencePipeline$Head@7229724f
java.util.stream.ReferencePipeline$Head@4c873330
java.util.stream.ReferencePipeline$Head@119d7047
java.util.stream.ReferencePipeline$Head@776ec8df
java.util.stream.ReferencePipeline$Head@4eec7777
java.util.stream.ReferencePipeline$Head@3b07d329
java.util.stream.ReferencePipeline$Head@41629346
java.util.stream.ReferencePipeline$Head@404b9385
```

因为上面的流经过`map(Arrays::stream)`处理后，将每个数组变成了一个新的流，返回结果为流的数组`Stream<String>[]`，所以输出是各个流的句柄。我们还需将这些新的流连接成一个流，使用`flatMap`
来改写上面的例子：

```java
list.stream()
        .map(s->s.split(""))
        .flatMap(Arrays::stream)
        .distinct()
        .forEach(s->System.out.print(s+" "));
```

输出如下：

```bash
J a v S c r i p t y h o n P H C # G l g w f + R u b
```

和`map`类似，`flatMap`方法也有相应的原始类型特化方法，如`flatMapToInt`等。

#### 3.终端操作

##### 3.1.anyMatch

`anyMatch`方法用于判断流中是否有符合判断条件的元素，返回值为 boolean 类型。比如判断 list 中是否含有`SQL`元素：

```java
list.stream()
        .anyMatch(s->"SQL".equals(s)); // false
```

##### 3.2.allMatch

`allMatch`方法用于判断流中是否所有元素都满足给定的判断条件，返回值为 boolean 类型。比如判断 list 中是否所有元素长度都不大于 10：

```java
list.stream()
        .allMatch(s->s.length()<=10); // true
```

##### 3.3.noneMatch

`noneMatch`方法用于判断流中是否所有元素都不满足给定的判断条件，返回值为 boolean 类型。比如判断 list 中不存在长度大于 10 的元素：

```java
list.stream()
        .noneMatch(s->s.length()>10); // true
```

##### 3.4.findAny

`findAny`方法用于返回流中的任意元素的 Optional 类型，例如筛选出 list 中任意一个以`J`开头的元素，如果存在，则输出它：

```java
list.stream()
        .filter(s->s.startsWith("J"))
        .findAny()
        .ifPresent(System.out::println); // Java
```

##### 3.5.findFirst

`findFirst`方法用于返回流中的第一个元素的 Optional 类型，例如筛选出 list 中长度大于 5 的元素，如果存在，则输出第一个：

```java
list.stream()
        .filter(s->s.length()>5)
        .findFirst()
        .ifPresent(System.out::println); // JavaScript
```

##### 3.6.reduce

`reduce`函数从字面上来看就是压缩，缩减的意思，它可以用于数字类型的流的求和，求最大值和最小值。如对 numbers 中的元素求和：

```java
List<Integer> numbers=Arrays.asList(1,2,1,3,3,2,4);
        numbers.stream()
        .reduce(0,Integer::sum); // 16
```

`reduce`函数也可以不指定初始值，但这时候将返回一个 Optional 对象，比如求最大值和最小值：

```java
numbers.stream()
        .reduce(Integer::max)
        .ifPresent(System.out::println); // 4
        numbers.stream()
        .reduce(Integer::min)
        .ifPresent(System.out::println); // 1
```

##### 3.7.forEach

`forEach`用于迭代流中的每个元素，最为常见的就是迭代输出，如：

```java
list.stream().forEach(System.out::println);
```

##### 3.8.count

`count`方法用于统计流中元素的个数，比如：

```java
list.stream().count(); // 9
```

##### 3.9.[collect](zh-cn/java/java8/03-collect.md)

`collect`方法用于收集流中的元素，并放到不同类型的结果中，比如`List`、`Set`或者`Map`。举个例子：

```java
List<String> filterList=list.stream()
        .filter(s->s.startsWith("J")).collect(Collectors.toList());
```

如果需要以`Set`来替代`List`，只需要使用`Collectors.toSet()`就好了。

#### 4.流的创建

除了使用集合对象的 stream 方法构建流之外，我们可以手动构建一些流。

<!-- tabs:start -->

##### **数值范围构建**

`IntStream`和`LongStream`对象支持`range`和`rangeClosed`方法来构建数值流。

两个方法都是两个参数

1. 第一个参数接受起始值
2. 第二个参数接受结束值。

!> range 是不包含结束值的，而 rangeClosed 则包含结束值。

比如对 1 到 100 的整数求和：

```java
IntStream.rangeClosed(1,100).sum(); // 5050
```

##### **由值构建**

静态方法`Stream.of`可以显式值创建一个流。它可以接受任意数量的参数。

例如，以下代码直接使用`Stream.of`创建了一个字符串流:

```java
Stream<String> s=Stream.of("Java","JavaScript","C++","Ruby");
```

也可以使用`Stream.empty()`构建一个空流：

```java
Stream<Object> emptyStream=Stream.empty();
```

##### **由数组构建**

静态方法`Arrays.stream`可以通过数组创建一个流。它接受一个数组作为参数

例如：

```java
int[]arr={1,2,3,4,5};
        IntStream intStream=Arrays.stream(arr);
```

##### **由文件生成流**

`java.nio.file.Files`中的很多静态方法都会返回一个流。

例如`Files.lines`方法会返回一个由指定文件中的各行构成的字符串流。比如统计一个文件中共有多少个字：

```java
long wordCout=0L;
        try(Stream<String> lines=Files.lines(Paths.get("file.txt"),Charset.defaultCharset())){
        wordCout=lines.map(l->l.split(""))
        .flatMap(Arrays::stream)
        .count();
        }catch(Exception ignore){}
```

##### **由函数构造**

Stream API 提供了两个静态方法来从函数生成流：`Stream.iterate`和`Stream.generate`。这两个操作可以创建所谓的无限流。比如下面的例子构建了 10 个偶数：

```java
Stream.iterate(0,n->n+2)
        .limit(10).forEach(System.out::println);
```

`iterate方`法接受一个初始值（在这里是 0），还有一个依次应用在每个产生的新值上的 Lambda（UnaryOperator 类型）。这里，我们使用 Lambda `n -> n + 2`，返回的是前一个元
素加上 2。因此，`iterate`方法生成了一个所有正偶数的流：流的第一个元素是初始值 0。然后加上 2 来生成新的值 2，再加上 2 来得到新的值 4，以此类推。

与`iterate`方法类似，`generate`方法也可让你按需生成一个无限流。但`generate`不是依次对每个新生成的值应用函数，比如下面的例子生成了 5 个 0 到 1 之间的随机双精度数：

```java
Stream.generate(Math::random)
        .limit(5)
        .forEach(System.out::println);
```

输出结果如下：

```java
0.6334646850587863
        0.4190147641834009
        0.4361968394515475
        0.6911796456838655
        0.08156838267267075
```

<!-- tabs:end -->
