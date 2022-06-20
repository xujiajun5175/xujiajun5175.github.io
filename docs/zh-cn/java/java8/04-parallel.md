Java8 - 并行流 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---
除了顺序流外，Java 8中也可以对集合对象调用`parallelStream`方法或者对顺序流调用`parallel`方法来生成并行流。

并行流就是一个把内容分成多个数据块，并用不同的线程分别处理每个数据块的流。

这样在使用流处理数据规模较大的集合对象时可以充分的利用多核CPU来提高处理效率。

不过在一些情况下，并行流未必会比顺序流快，甚至会慢很多，所以了解如何高效的使用并行流也至关重要。

此外，我们也可以调用流的`sequential`方法，将并行流转换为顺序流。

#### 1.测试性能

```java
package com.xujiajun.parallel;

import java.util.function.LongConsumer;
import java.util.stream.LongStream;

public class ParallelTest {
    public static void main(String[] args) {
        test(m -> LongStream.rangeClosed(1L, m).reduce(0L, Long::sum), 10000000000L, "顺序流");
        test(m -> LongStream.rangeClosed(1L, m).parallel().reduce(0L, Long::sum), 10000000000L, "并行流");
    }

    static void test(LongConsumer c, Long n, String nn) {
        long start = System.currentTimeMillis();
        c.accept(n);
        long end = System.currentTimeMillis();
        System.out.println(nn + ":处理时间：" + (end - start) + "msc");
    }
}

```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/yLYExB.png)

?> 对于较小的数据量，选择并行流不是一个好的决定。<br>并行处理少数几个元素的好处还抵不上并行化造成的额外开销。<br>设N是要处理的元素的总数，Q是一个元素通过流水线的大致处理成本，则N*Q就是这个对成本的一个粗略的定性估计。<br>
Q值较高就意味着使用并行流时性能好的可能性比较大。

接着对比下使用并行流处理包装类型的求和与原始类型的求和运行时间对比：

```java
test((n)->Stream.iterate(1L,a->a+1L).limit(n).reduce(0L,Long::sum),1000000000L,"自动拆箱");
        test((n)->LongStream.rangeClosed(1L,n).parallel().reduce(0L,Long::sum),1000000000L,"并行");
```

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/CuB30B.png)

因为iterate生成的是包装类型的对象，必须拆箱成原始类型才能求和，而且我们很难把iterate分成多个独立块来并行执行。

!> 在实际中应避免频繁拆装箱；有些操作本身在并行流上的性能就比顺序流差。特别是limit和findFirst等依赖于元 素顺序的操作，它们在并行流上执行的代价非常大。例如，findAny会比findFirst性
能好，因为它不一定要按顺序来执行。

```java
package com.xujiajun.parallel;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class parallelTest2 {
    public static void main(String[] args) {
        ArrayList<Long> arrayList = Stream.iterate(1L, a -> a + 1L).limit(100000000L).collect(Collectors.toCollection(ArrayList::new));
        LinkedList<Long> linkedList = Stream.iterate(1L, a -> a + 1L).limit(100000000L).collect(Collectors.toCollection(LinkedList::new));
        test(() -> arrayList.parallelStream().reduce(0L, Long::sum), "ArrayList");
        test(() -> linkedList.parallelStream().reduce(0L, Long::sum), "LinkedList");
    }

    static void test(Runner runner, String nn) {
        long start = System.currentTimeMillis();
        runner.run();
        long end = System.currentTimeMillis();
        System.out.println(nn + ":处理时间：" + (end - start) + "msc");
    }
}

@FunctionalInterface
interface Runner {
    void run();
}
```

上面代码对比了使用并行流处理ArrayList和使用并行流处理LinkedList的性能对比，运行结果如下：

!> 使用并行流要考虑流背后的数据结构是否易于分解。用range方法创建的原始类型流也可以快速分解。

下表列出了流的数据源和可分解性：

| 数据源          | 可分解性 |
| :-------------- | :------- |
| ArrayList       | 很好     |
| LinkedList      | 很差     |
| IntStream.range | 很好     |
| Stream.iterate  | 很差     |
| HashSet         | 好       |
| TreeSet         | 好       |

#### 2.总结

总而言之，使用并行流应该考虑以下几点：

- 留意拆装箱成本；
- 流中依赖于元素顺序的操作，在并行流上执行的代价非常大；
- 考虑流的流水线操作总成本，对于较小的数据量，并不适合使用并行流；
- 考虑流背后的数据结构是否易于分解，不易分解的数据结构不适合使用并行流。




